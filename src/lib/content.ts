import { getCollection, getEntry } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { defaultLanguage } from './i18n';

/*
 * Joining facts to prose.
 *
 * Facts live in data/ once, prose lives in content/<code>/ per language. These
 * helpers put them back together, and make the fallback explicit rather than
 * silent: a page that is showing the source language instead of the reader's
 * language says so, and offers a link to translate it.
 */

export type ProseCollection =
  | 'titleProse'
  | 'characterProse'
  | 'setProse'
  | 'pieceProse'
  | 'glossaryProse'
  | 'guides';

/* Where each prose collection lives under content/<code>/. A piece's slug
   carries its set, as in "infinity-stones/space-stone". */
const AREA: Record<ProseCollection, string> = {
  titleProse: 'titles',
  characterProse: 'characters',
  setProse: 'sets',
  pieceProse: 'sets',
  glossaryProse: 'glossary',
  guides: 'guides',
};

export interface Resolved<T> {
  entry: T;
  /** The language actually being shown, which may not be the one asked for. */
  language: string;
  /** True when the reader asked for a language that has no translation yet. */
  isFallback: boolean;
}

/**
 * Find prose in the requested language, falling back to the source language.
 * Returns null only when the entry does not exist in any language, which the
 * fact check treats as an error at build time.
 */
export async function resolveProse<C extends ProseCollection>(
  collection: C,
  language: string,
  slug: string,
): Promise<Resolved<CollectionEntry<C>> | null> {
  const area = AREA[collection];

  const requested = await getEntry(collection, `${language}/${area}/${slug}`);
  if (requested) {
    return { entry: requested as CollectionEntry<C>, language, isFallback: false };
  }

  if (language === defaultLanguage.code) return null;

  const fallback = await getEntry(collection, `${defaultLanguage.code}/${area}/${slug}`);
  if (!fallback) return null;

  return {
    entry: fallback as CollectionEntry<C>,
    language: defaultLanguage.code,
    isFallback: true,
  };
}

/** Every slug that exists in the source language, which defines what pages exist. */
export async function sourceSlugs(collection: ProseCollection): Promise<string[]> {
  const entries = await getCollection(collection, ({ id }: { id: string }) =>
    id.startsWith(`${defaultLanguage.code}/`),
  );
  const prefix = `${defaultLanguage.code}/${AREA[collection]}/`;
  // A piece's slug keeps its set, so "en/sets/infinity-stones/space-stone"
  // resolves back to "infinity-stones/space-stone" and not just the leaf.
  return entries.map((entry: { id: string }) => entry.id.slice(prefix.length));
}

/** The path of a content file on disk, used to build "translate this page" links. */
export function contentPath(language: string, area: string, slug: string): string {
  return `content/${language}/${area}/${slug}.md`;
}
