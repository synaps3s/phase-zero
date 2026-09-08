import languageConfig from '../../config/languages.json';

/*
 * Interface strings and language resolution.
 *
 * Adding a language means adding an entry to config/languages.json and a
 * content/<code>/ directory. Nothing in this file needs to change, because the
 * strings are discovered by pattern rather than listed by hand. If a change
 * here is ever required to add a language, that is the bug to fix.
 */

export interface Language {
  code: string;
  name: string;
  endonym: string;
  dir: 'ltr' | 'rtl';
  default?: boolean;
}

export const languages = languageConfig as Language[];

export const defaultLanguage: Language =
  languages.find((language) => language.default) ?? languages[0]!;

export const languageCodes = languages.map((language) => language.code);

export function getLanguage(code: string): Language {
  return languages.find((language) => language.code === code) ?? defaultLanguage;
}

/* --- Interface strings --- */

type Strings = Record<string, string>;

const stringModules = import.meta.glob<Strings>('../../content/*/ui.json', {
  eager: true,
  import: 'default',
});

const stringsByLanguage: Record<string, Strings> = {};
for (const [path, strings] of Object.entries(stringModules)) {
  const code = path.split('/').at(-2);
  if (code) stringsByLanguage[code] = strings;
}

const fallbackStrings = stringsByLanguage[defaultLanguage.code] ?? {};

const pluralRules = new Map<string, Intl.PluralRules>();

function pluralCategory(code: string, count: number): string {
  let rules = pluralRules.get(code);
  if (!rules) {
    rules = new Intl.PluralRules(code);
    pluralRules.set(code, rules);
  }
  return rules.select(count);
}

/**
 * Look up an interface string, falling back to the source language when a
 * translation is missing. Placeholders are written as {name}.
 *
 * When a `count` is passed, the key is resolved through the language's own
 * plural rules: `key.one`, `key.other`, and whatever else that language
 * needs. English has two forms and Italian has two, but Polish has four and
 * Arabic six, so the categories come from Intl rather than from an `if`. A
 * translator adds the forms their language requires and nothing in the code
 * has to know about them.
 */
export function useTranslations(code: string) {
  const strings = stringsByLanguage[code] ?? {};

  return function t(key: string, values: Record<string, string | number> = {}): string {
    let template: string | undefined;

    if (typeof values.count === 'number') {
      const category = pluralCategory(code, values.count);
      template =
        strings[`${key}.${category}`] ??
        strings[`${key}.other`] ??
        fallbackStrings[`${key}.${pluralCategory(defaultLanguage.code, values.count)}`] ??
        fallbackStrings[`${key}.other`];
    }

    template ??= strings[key] ?? fallbackStrings[key];

    if (template === undefined) {
      // Better to show the key than to show nothing, so the gap is obvious in
      // review instead of silently rendering an empty element.
      if (import.meta.env.DEV) console.warn(`Missing interface string: ${key}`);
      return key;
    }

    return template.replace(/\{(\w+)\}/g, (whole, name: string) =>
      name in values ? String(values[name]) : whole,
    );
  };
}

/* --- Routing --- */

/** Build a path inside a language, for example localePath('it', 'timeline'). */
export function localePath(code: string, ...segments: string[]): string {
  const path = segments.filter(Boolean).join('/').replace(/^\/+|\/+$/g, '');
  return path ? `/${code}/${path}` : `/${code}`;
}

/** The language segment of a path, or the default language when there is none. */
export function languageFromPath(pathname: string): Language {
  const segment = pathname.split('/').filter(Boolean)[0];
  return segment ? getLanguage(segment) : defaultLanguage;
}

/**
 * An announced window, in the reader's language.
 *
 * The data holds YYYY-MM or YYYY, because a file every language reads cannot
 * hold an English sentence. This turns it into "marzo 2027" or "March 2027"
 * as needed, and leaves a bare year alone since a year reads the same either
 * way.
 */
export function formatWindow(code: string, value: string): string {
  const [year, month] = value.split('-');
  if (!month) return year;
  const when = new Date(Date.UTC(Number(year), Number(month) - 1, 1));
  return new Intl.DateTimeFormat(code, { year: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    when,
  );
}
