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
export type Order = 'release' | 'chrono';
/** 1 films only, 2 films and series, 3 everything. */
export type Depth = 1 | 2 | 3;

interface Prefs {
  version: number;
  theme: Theme;
  /** Title ids the reader has marked as watched. */
  watched: string[];
  /** How the catalogue is ordered, remembered so it is never set twice. */
  order: Order;
  /** How much of the catalogue the reader wants to see. */
  depth: Depth;
  /** Whether the separate continuities are shown alongside the main one. */
  separate: boolean;
  /** Whether the panel explaining the controls is open. */
  primer: boolean;
}

const EMPTY: Prefs = {
  version: VERSION,
  theme: 'system',
  watched: [],
  order: 'release',
  depth: 2,
  separate: false,
  primer: true,
};

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
      order: parsed.order === 'chrono' ? 'chrono' : 'release',
      depth: parsed.depth === 1 || parsed.depth === 3 ? parsed.depth : 2,
      separate: parsed.separate === true,
      // Open until the reader closes it: somebody arriving for the first time
      // is exactly who it is for, and they have not stored anything yet.
      primer: parsed.primer !== false,
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

export function getOrder(): Order {
  return read().order;
}

export function setOrder(order: Order): void {
  const prefs = read();
  prefs.order = order;
  write(prefs);
}

export function getDepth(): Depth {
  return read().depth;
}

export function setDepth(depth: Depth): void {
  const prefs = read();
  prefs.depth = depth;
  write(prefs);
}

export function getSeparate(): boolean {
  return read().separate;
}

export function setSeparate(separate: boolean): void {
  const prefs = read();
  prefs.separate = separate;
  write(prefs);
}

/*
 * Moving progress between devices.
 *
 * There is no account and no server, so the only honest way to carry what a
 * reader has marked to another browser is to hand them the file and let them
 * take it. Export writes what they marked; import merges it into what is
 * already here rather than replacing it, because someone importing an old
 * export should not lose what they have watched since.
 */

export interface ProgressFile {
  format: 'phasezero.progress';
  version: number;
  exported: string;
  watched: string[];
}

export function exportProgress(): ProgressFile {
  return {
    format: 'phasezero.progress',
    version: VERSION,
    exported: new Date().toISOString().slice(0, 10),
    watched: read().watched,
  };
}

export type ImportResult =
  | { ok: true; added: number; total: number }
  | { ok: false; reason: 'unreadable' | 'wrong-format' };

export function importProgress(raw: string): ImportResult {
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { ok: false, reason: 'unreadable' };
  }

  const file = parsed as Partial<ProgressFile>;
  if (file?.format !== 'phasezero.progress' || !Array.isArray(file.watched)) {
    return { ok: false, reason: 'wrong-format' };
  }

  const prefs = read();
  const merged = new Set(prefs.watched);
  const before = merged.size;
  for (const id of file.watched) if (typeof id === 'string') merged.add(id);

  prefs.watched = [...merged];
  write(prefs);
  return { ok: true, added: merged.size - before, total: merged.size };
}

export function clearWatched(): void {
  const prefs = read();
  prefs.watched = [];
  write(prefs);
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

export function getPrimer(): boolean {
  return read().primer;
}

export function setPrimer(primer: boolean): void {
  write({ ...read(), primer });
}
