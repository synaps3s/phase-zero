/*
 * The "View in 3D" control on a collection piece.
 *
 * This file is small on purpose. It only decides whether the browser can open
 * a model at all, shows the button if it can, and on the first press fetches
 * the sealed model, opens it, and hands it to the viewer. The viewer and the
 * 3D library it needs are a separate chunk, imported then and not before, so
 * a reader who never presses the button never downloads them.
 *
 * The model is sealed with AES-GCM over its gzip (see
 * scripts/encrypt-model.mjs). Both are undone here with the browser's own
 * Web Crypto and DecompressionStream, so no decoder ships with the page.
 *
 * With this file blocked, the button stays hidden and the piece is unchanged.
 */

type Viewer = import('./piece-model-viewer').Viewer;
type Control = import('./piece-model-viewer').Control;

const MAGIC = 'PZM1';

function canOpen(): boolean {
  if (!('crypto' in window) || !crypto.subtle) return false;
  if (typeof DecompressionStream === 'undefined') return false;
  try {
    return !!document.createElement('canvas').getContext('webgl2');
  } catch {
    return false;
  }
}

async function unseal(url: string, keyText: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`The model answered ${response.status}.`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (new TextDecoder().decode(bytes.subarray(0, 4)) !== MAGIC) throw new Error('Not a sealed model.');

  const raw = Uint8Array.from(atob(keyText.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
  const key = await crypto.subtle.importKey('raw', raw, 'AES-GCM', false, ['decrypt']);
  const packed = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: bytes.subarray(4, 16) },
    key,
    bytes.subarray(16),
  );
  const stream = new Blob([packed]).stream().pipeThrough(new DecompressionStream('gzip'));
  return new Response(stream).arrayBuffer();
}

function setUp(root: HTMLElement): void {
  const toggle = root.querySelector<HTMLButtonElement>('[data-piece-model-toggle]');
  const figure = root.querySelector<HTMLElement>('[data-piece-model-figure]');
  const canvas = root.querySelector<HTMLCanvasElement>('canvas');
  const status = root.querySelector<HTMLElement>('[data-piece-model-status]');
  if (!toggle || !figure || !canvas || !status) return;

  let viewer: Viewer | null = null;
  let opening: Promise<void> | null = null;

  const open = async () => {
    status.textContent = root.dataset.loading ?? '';
    status.hidden = false;
    try {
      const [{ createViewer }, model] = await Promise.all([
        import('./piece-model-viewer'),
        unseal(root.dataset.file ?? '', root.dataset.key ?? ''),
      ]);
      viewer = await createViewer(canvas, model, root);
      status.hidden = true;
      // A reader who has asked for less motion gets a model that holds still until told otherwise.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        root.querySelector('[data-control="rotate"]')?.setAttribute('aria-pressed', 'false');
      }
      for (const control of root.querySelectorAll<HTMLButtonElement>('[data-control]')) {
        const name = control.dataset.control as Control;
        control.addEventListener('click', () => {
          const on = control.getAttribute('aria-pressed') !== 'true';
          control.setAttribute('aria-pressed', String(on));
          viewer?.set(name, on);
        });
        viewer.set(name, control.getAttribute('aria-pressed') === 'true');
      }
    } catch (error) {
      console.error(error);
      status.textContent = root.dataset.error ?? '';
      opening = null;
    }
  };

  toggle.addEventListener('click', () => {
    const show = figure.hidden;
    figure.hidden = !show;
    toggle.setAttribute('aria-expanded', String(show));
    toggle.textContent = (show ? toggle.dataset.hide : toggle.dataset.show) ?? '';
    if (show && !opening) opening = open();
    viewer?.setVisible(show);
  });

  toggle.hidden = false;
}

if (canOpen()) {
  for (const root of document.querySelectorAll<HTMLElement>('[data-piece-model]')) setUp(root);
}
