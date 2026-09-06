/*
 * Client behaviour.
 *
 * Both features here are enhancements. The page is readable and complete
 * with this script blocked, and every control it wires up is inert but
 * harmless if it never runs.
 */
import { applyTheme, getTheme, getWatched, setTheme, toggleWatched, type Theme } from '../lib/prefs';

/* --- Theme ------------------------------------------------------- */

function markActiveTheme(current: Theme): void {
  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-set]')) {
    button.setAttribute('aria-pressed', String(button.dataset.themeSet === current));
  }
}

function wireTheme(): void {
  const current = getTheme();
  applyTheme(current);
  markActiveTheme(current);

  for (const button of document.querySelectorAll<HTMLButtonElement>('[data-theme-set]')) {
    button.addEventListener('click', () => {
      const next = button.dataset.themeSet as Theme;
      setTheme(next);
      markActiveTheme(next);
    });
  }
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
  if (!shelf) return;

  const label = {
    mark: shelf.dataset.labelMark ?? 'Mark as watched',
    unmark: shelf.dataset.labelUnmark ?? 'Mark as not watched',
  };

  const watched = getWatched();
  const spines = [...shelf.querySelectorAll<HTMLElement>('[data-title-id]')];

  for (const spine of spines) {
    paint(spine, watched.has(spine.dataset.titleId!), label);
  }
  markNext(spines, watched);

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
wireWatched();
