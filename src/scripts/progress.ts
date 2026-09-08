/*
 * Carrying progress between browsers.
 *
 * No account and no server means the only honest way to move what somebody
 * marked is to hand them the file. The controls are an enhancement: with this
 * script blocked they simply are not there, and nothing else on the page
 * depends on them.
 */
import { ask } from '../lib/dialog';
import { clearWatched, exportProgress, importProgress } from '../lib/prefs';

const panel = document.querySelector<HTMLElement>('[data-progress]');

if (panel) {
  const say = (message: string) => {
    const status = panel.querySelector<HTMLElement>('[data-progress-status]');
    if (status) status.textContent = message;
  };

  const text = {
    imported: panel.dataset.imported ?? '',
    importedNone: panel.dataset.importedNone ?? '',
    failed: panel.dataset.importFailed ?? '',
    cleared: panel.dataset.cleared ?? '',
    confirm: panel.dataset.resetConfirm ?? '',
    resetTitle: panel.dataset.resetTitle ?? '',
    resetAction: panel.dataset.resetAction ?? '',
    cancel: panel.dataset.cancel ?? '',
  };

  panel.querySelector('[data-progress-export]')?.addEventListener('click', () => {
    const file = exportProgress();
    const blob = new Blob([JSON.stringify(file, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `phase-zero-progress-${file.exported}.json`;
    link.click();
    // Revoked on the next turn of the loop, once the download has started.
    setTimeout(() => URL.revokeObjectURL(url), 0);
  });

  const input = panel.querySelector<HTMLInputElement>('[data-progress-import]');
  input?.addEventListener('change', async () => {
    const file = input.files?.[0];
    if (!file) return;

    const result = importProgress(await file.text());
    input.value = '';

    if (!result.ok) {
      say(text.failed);
      return;
    }
    say(
      result.added === 0
        ? text.importedNone
        : text.imported
            .replace('{count}', String(result.added))
            .replace('{total}', String(result.total)),
    );
    // The list on this page was drawn from the old state, so it is redrawn.
    window.location.reload();
  });

  panel.querySelector('[data-progress-clear]')?.addEventListener('click', async () => {
    const sure = await ask({
      title: text.resetTitle,
      body: text.confirm,
      confirm: text.resetAction,
      cancel: text.cancel,
      destructive: true,
    });
    if (!sure) return;
    clearWatched();
    say(text.cleared);
    window.location.reload();
  });
}
