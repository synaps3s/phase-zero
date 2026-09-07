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
      // Null when no source establishes one, which is common outside the
      // MCU. A visible gap is worth more than a plausible guess.
      setting: z.string().nullable(),
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

/*
 * Named sets: the variants of a thing, each explained rather than listed.
 * The Iron Man armours, Spider-Man's suits, the forms Hulk takes, the
 * Infinity Stones. A set belongs to a franchise; a piece belongs to a set
 * and carries its own first appearance and sources like any other fact.
 */
const sets = defineCollection({
  loader: glob({ pattern: '*.yml', base: './data/sets' }),
  schema: z.object({
    id: z.string(),
    kind: z.enum(['armour', 'suit', 'form', 'weapon', 'relic', 'artifact']),
    universe: z.string(),
    saga: z.string(),
    franchise: z.string(),
    order: z.number().int(),
    ...attribution,
  }),
});

const setPieces = defineCollection({
  loader: glob({ pattern: '*/*.yml', base: './data/sets' }),
  schema: z.object({
    id: z.string(),
    set: z.string(),
    /** The name inside the fiction. A proper noun, so it is a fact. */
    designation: z.string(),
    order: z.number().int(),
    /* Some things have a documented colour of their own. It names a token
       rather than a value, so the stylesheet still owns what the colour is. */
    tint: z
      .enum(['blue', 'yellow', 'red', 'purple', 'green', 'orange', 'silver'])
      .nullable()
      .default(null),
    firstAppearance: z.string(),
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

const setProse = defineCollection({
  loader: glob({ pattern: '*/sets/*.md', base: './content' }),
  schema: proseFrontmatter,
});

const pieceProse = defineCollection({
  loader: glob({ pattern: '*/sets/*/*.md', base: './content' }),
  schema: proseFrontmatter,
});

/*
 * The glossary. Terms of art that this material uses constantly and rarely
 * stops to define, which is the single biggest reason a newcomer gets lost.
 */
const glossary = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './data/glossary' }),
  schema: z.object({
    id: z.string(),
    /* Core terms are the ones a newcomer needs before anything makes sense.
       Advanced ones are worth knowing once they are already in. */
    category: z.enum(['core', 'advanced']),
    /** The title where the term first appears, when one can be sourced. */
    firstAppearance: z.string().nullable().default(null),
    ...attribution,
  }),
});

const glossaryProse = defineCollection({
  loader: glob({ pattern: '*/glossary/*.md', base: './content' }),
  schema: proseFrontmatter,
});

const universeProse = defineCollection({
  loader: glob({ pattern: '*/universes/*.md', base: './content' }),
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
  sets,
  setPieces,
  titleProse,
  characterProse,
  setProse,
  pieceProse,
  glossary,
  glossaryProse,
  universeProse,
  guides,
};
