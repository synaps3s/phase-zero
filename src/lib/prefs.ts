/*
 * Reader preferences.
 *
 * Everything here lives in this browser and nowhere else. No request
 * carries it, and the page is complete and correct before any of it is
 * read, so a private window, cleared site data, or a browser that refuses
 * storage are all normal states rather than errors.
 *
 * Some browsers throw on access rather than returning null, including
 * during preview and thumbnail rendering, so every read and write is
 * wrapped.
 */

const VERSION = 1;
const KEY = 'phasezero.v1';

export type Theme = 'light' | 'dark' | 'system';

interface Prefs {
  version: number;
  theme: Theme;
  /** Title ids the reader has marked as watched. */
  watched: string[];
}

const EMPTY: Prefs = { version: VERSION, theme: 'system', watched: [] };

function read(): Prefs {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return { ...EMPTY };
    const parsed = JSON.parse(raw) as Partial<Prefs>;
    // An older shape is migrated rather than discarded: a reader who
    // marked fifty titles a year ago does not lose them to a schema bump.
    return {
      version: VERSION,
      theme: parsed.theme === 'light' || parsed.theme === 'dark' ? parsed.theme : 'system',
      watched: Array.isArray(parsed.watched) ? parsed.watched.filter((id) => typeof id === 'string') : [],
    };
  } catch {
    return { ...EMPTY };
  }
}

function write(prefs: Prefs): boolean {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(prefs));
    return true;
  } catch {
    return false;
  }
}

export function getTheme(): Theme {
  return read().theme;
}

export function setTheme(theme: Theme): void {
  const prefs = read();
  prefs.theme = theme;
  write(prefs);
  applyTheme(theme);
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  if (theme === 'system') root.removeAttribute('data-theme');
  else root.setAttribute('data-theme', theme);
}

export function getWatched(): Set<string> {
  return new Set(read().watched);
}

export function toggleWatched(id: string): boolean {
  const prefs = read();
  const watched = new Set(prefs.watched);
  const nowWatched = !watched.has(id);
  if (nowWatched) watched.add(id);
  else watched.delete(id);
  prefs.watched = [...watched];
  write(prefs);
  return nowWatched;
}

/** True when this browser will actually keep what we write. */
export function storageWorks(): boolean {
  try {
    const probe = `${KEY}.probe`;
    window.localStorage.setItem(probe, '1');
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}
