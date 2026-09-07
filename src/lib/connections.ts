import type { CollectionEntry } from 'astro:content';

/*
 * What a title leads to.
 *
 * Only one direction of this relationship is written down. A title records
 * what it needs first, and what it sets up is the same statement read
 * backwards, so deriving it here means the two can never contradict each
 * other and a contributor only ever has one field to get right.
 *
 * A title may also record a `leadsTo` of its own, for something it sets up
 * that is not a prerequisite: a post-credits scene that introduces a
 * character is a promise rather than a requirement.
 */
export function leadsToMap(titles: CollectionEntry<'titles'>[]): Map<string, string[]> {
  const byOrder = new Map(
    titles.map((title) => [title.data.id, Number(title.data.release.date ?? 0)]),
  );
  const out = new Map<string, Set<string>>();

  const add = (from: string, to: string) => {
    if (from === to) return;
    const set = out.get(from) ?? new Set<string>();
    set.add(to);
    out.set(from, set);
  };

  for (const title of titles) {
    for (const needed of title.data.requires) add(needed, title.data.id);
    for (const setUp of title.data.leadsTo) add(title.data.id, setUp);
  }

  return new Map(
    [...out].map(([id, set]) => [
      id,
      [...set].sort((first, second) => (byOrder.get(first) ?? 0) - (byOrder.get(second) ?? 0)),
    ]),
  );
}
