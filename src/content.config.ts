import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

/*
 * Content collections for Phase Zero.
 *
 * There are two kinds of collection here, and the split is the backbone of the
 * project.
 *
 *   Fact collections read from data/. They hold everything that does not change
 *   between languages, they are written once, and every language reads them.
 *
 *   Prose collections read from content/<code>/. The language is part of the
 *   entry id, which is why adding a language never requires touching this file:
 *   a new directory is picked up by the same glob.
 *
 * Everything is validated at build time. A malformed date, an unknown franchise
 * or a reference to a film that does not exist fails the build rather than
 * shipping a broken page.
 */

/** A source backing up the facts in an entry. */
const source = z.object({
  url: z.url(),
  title: z.string().optional(),
  accessed: z.coerce.date(),
});

/** Fields every fact file carries, so that nothing is unattributed. */
const attribution = {
  sources: z.array(source).min(1),
  verified: z.coerce.date(),
};

/** How much of the story a viewer wants. Used to build the watch orders. */
const tier = z.enum(['essential', 'extended', 'complete']);

const titles = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './data/titles' }),
  schema: z.object({
    id: z.string(),
    type: z.enum(['film', 'series', 'special', 'short']),
    universe: z.string(),
    franchise: z.string(),
    saga: z.string(),
    phase: z.number().int().nullable(),
    tier,

    release: z.object({
      date: z.coerce.date().nullable(),
      // Set when a date is announced but not exact, for example "Summer 2027".
      approximate: z.string().nullable().default(null),
      // Total minutes for a film, or per-episode for a series.
      runtime: z.number().int().positive().nullable(),
      episodes: z.number().int().positive().nullable().default(null),
      finale: z.coerce.date().nullable().default(null),
      status: z.enum(['released', 'announced', 'in-production']),
    }),

    chronology: z.object({
      // Position in the in-story timeline. Sparse on purpose so that a newly
      // placed title does not force every later entry to be renumbered.
      order: z.number(),
      // When the story is set, as a plain label such as "1943" or "2024".
      setting: z.string(),
    }),

    // Titles that are best watched before this one to understand it.
    requires: z.array(z.string()).default([]),
    // Titles this one sets up, including through post-credits scenes.
    leadsTo: z.array(z.string()).default([]),

    cast: z
      .array(
        z.object({
          character: z.string(),
          actor: z.string(),
          note: z.string().optional(),
        }),
      )
      .default([]),

    // Set when the title is not part of the main continuity, with the reason.
    alternateUniverse: z.boolean().default(false),

    ...attribution,
  }),
});

const characters = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './data/characters' }),
  schema: z.object({
    id: z.string(),
    universe: z.string(),
    franchise: z.string(),
    // Real name where the character has one, for search and disambiguation.
    realName: z.string().nullable().default(null),
    actors: z
      .array(
        z.object({
          name: z.string(),
          note: z.string().optional(),
        }),
      )
      .default([]),
    firstAppearance: z.string(),
    // Titles the character appears in, in release order.
    appearsIn: z.array(z.string()).default([]),
    ...attribution,
  }),
});

/* --- Prose. The language is the first segment of every entry id. --- */

/** Shared frontmatter for prose about a single entity. */
const proseFrontmatter = z.object({
  title: z.string(),
  /* One sentence for a reader who knows nothing yet. No jargon, no names they
     have not met. Someone who reads only this should not come away misled. */
  oneLine: z.string(),
  /* Optional short subtitle shown under the title. */
  tagline: z.string().optional(),
});

const titleProse = defineCollection({
  loader: glob({ pattern: '*/titles/**/*.md', base: './content' }),
  schema: proseFrontmatter,
});

const characterProse = defineCollection({
  loader: glob({ pattern: '*/characters/**/*.md', base: './content' }),
  schema: proseFrontmatter,
});

const guides = defineCollection({
  loader: glob({ pattern: '*/guides/**/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    oneLine: z.string(),
    /* Lower numbers come first in listings. */
    order: z.number().int().default(100),
    /* Who the guide is written for, so the site can point newcomers and
       returning readers at different starting points. */
    audience: z.enum(['newcomer', 'returning', 'everyone']).default('everyone'),
  }),
});

export const collections = {
  titles,
  characters,
  titleProse,
  characterProse,
  guides,
};
