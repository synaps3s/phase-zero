/*
 * Client behaviour.
 *
 * Both features here are enhancements. The page is readable and complete
 * with this script blocked, and every control it wires up is inert but
 * harmless if it never runs.
 */
import { applyTheme, getTheme, getWatched, setTheme, toggleWatched, type Theme } from '../lib/prefs';

/* --- Theme ------------------------------------------------------- */

/*
 * One button, three states, cycling in that order. A row of three buttons
 * spent horizontal room the language list now needs, and with more languages
 * coming that room only gets scarcer.
 */
const ORDER: Theme[] = ['system', 'light', 'dark'];

function wireTheme(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-theme-cycle]');
  if (!button) return;

  const label = button.querySelector<HTMLElement>('[data-theme-label]');
  const names: Record<Theme, string> = {
    light: button.dataset.labelLight ?? 'Light',
    dark: button.dataset.labelDark ?? 'Dark',
    system: button.dataset.labelSystem ?? 'System',
  };

  const show = (theme: Theme) => {
    applyTheme(theme);
    button.dataset.theme = theme;
    if (label) label.textContent = names[theme];
    // The accessible name says which state the control is in, not just what
    // it does, so somebody who cannot see the icon is not guessing.
    button.setAttribute(
      'aria-label',
      (button.dataset.announce ?? '{current}').replace('{current}', names[theme]),
    );
  };

  show(getTheme());

  button.addEventListener('click', () => {
    const next = ORDER[(ORDER.indexOf(getTheme()) + 1) % ORDER.length]!;
    setTheme(next);
    show(next);
    document.dispatchEvent(new CustomEvent('themechange'));
  });
}

/* The language list closes when the reader clicks away from it or presses
   escape, which a bare disclosure element does not do on its own. */
function wireLanguagePicker(): void {
  const picker = document.querySelector<HTMLDetailsElement>('[data-language-picker]');
  if (!picker) return;

  document.addEventListener('click', (event) => {
    if (picker.open && !picker.contains(event.target as Node)) picker.open = false;
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && picker.open) {
      picker.open = false;
      picker.querySelector('summary')?.focus();
    }
  });
}

/* --- Watched ----------------------------------------------------- */

function paint(spine: HTMLElement, watched: boolean, label: { mark: string; unmark: string }): void {
  spine.dataset.watched = String(watched);
  const button = spine.querySelector<HTMLButtonElement>('[data-watch-toggle]');
  if (!button) return;
  button.setAttribute('aria-pressed', String(watched));
  button.setAttribute('aria-label', watched ? label.unmark : label.mark);
}

/** The first unwatched title is the answer to "what now", so it is the one
    thing on the shelf that is called out. */
function markNext(spines: HTMLElement[], watched: Set<string>): void {
  let found = false;
  for (const spine of spines) {
    const isNext = !found && !watched.has(spine.dataset.titleId!);
    if (isNext) found = true;
    spine.dataset.next = String(isNext);
  }
}

function wireWatched(): void {
  const shelf = document.querySelector<HTMLElement>('[data-shelf]');
  // The timeline ships its own richer handling, so this one steps aside.
  if (!shelf || shelf.hasAttribute('data-timeline')) return;

  const label = {
    mark: shelf.dataset.labelMark ?? 'Mark as watched',
    unmark: shelf.dataset.labelUnmark ?? 'Mark as not watched',
  };

  let watched = getWatched();
  const spines = [...shelf.querySelectorAll<HTMLElement>('[data-title-id]')];

  const paintAll = (): void => {
    for (const spine of spines) {
      paint(spine, watched.has(spine.dataset.titleId!), label);
    }
    markNext(spines, watched);
  };
  paintAll();

  /* Coming back from history restores the shelf as it was left, not as the
     storage now is: a title marked on the timeline in between would still
     show as unwatched here, and be called the next one. */
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    watched = getWatched();
    paintAll();
  });

  shelf.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-watch-toggle]');
    if (!button) return;
    const spine = button.closest<HTMLElement>('[data-title-id]');
    if (!spine) return;

    const id = spine.dataset.titleId!;
    const nowWatched = toggleWatched(id);
    paint(spine, nowWatched, label);

    if (nowWatched) watched.add(id);
    else watched.delete(id);
    markNext(spines, watched);
  });
}

wireTheme();
wireLanguagePicker();
wireWatched();


/* --- Back to the top --------------------------------------------- */

/*
 * The catalogue is long. Somebody who has scrolled to the end of a hundred
 * and sixty entries should not have to scroll back. The button is hidden in
 * the markup and only ever appears once there is something to go back up to,
 * so a short page never grows a control it does not need.
 */
function wireBackToTop(): void {
  const button = document.querySelector<HTMLButtonElement>('[data-to-top]');
  if (!button) return;

  const update = () => {
    button.hidden = window.scrollY < window.innerHeight;
  };

  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  button.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
  });

  // Passive, because this listener never prevents the scroll it observes.
  window.addEventListener('scroll', update, { passive: true });
  update();
}

wireBackToTop();
