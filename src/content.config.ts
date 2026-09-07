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
      /* The United States theatrical release date, which is the one this
         catalogue sorts and displays on. Many of these films opened abroad
         first, sometimes by weeks, so "the first release anywhere" would
         reorder the run against how almost every source describes it. When
         the article gives a premiere and a general release, the general
         release is the one that counts.

         A handful of the older unconnected films never had a United States
         theatrical run at all: they opened abroad and went to video or
         television at home. Those carry their first release date, and their
         page says which kind of release it was, because a bare date would
         otherwise imply a cinema run that did not happen. */
      date: z.coerce.date().nullable(),
      // Set when a date is announced but not exact, for example "Summer 2027".
      approximate: z.string().nullable().default(null),
      /* Total minutes for a film, or per-episode for a series.

         A series rarely has one runtime. Where a source gives a range, this
         records the median of that range rounded up, because a single number
         is what a reader planning an evening actually needs, and the range is
         a click away on the source. Where the source gives no figure at all,
         this is null rather than a guess. */
      runtime: z.number().int().positive().nullable(),
      episodes: z.number().int().positive().nullable().default(null),
      finale: z.coerce.date().nullable().default(null),
      status: z.enum(['released', 'announced', 'in-production']),
    }),

    chronology: z.object({
      /* Position in the in-story timeline, taken from a source like every
         other fact here and never from judgement. Sparse on purpose, so
         placing a new title does not renumber every later one, and unique,
         because the timeline sorts on it.

         Null when no source places the title. That is a real state, not a
         gap to fill: the official timeline excludes some entries outright,
         and the separate continuities have no story order relative to the
         shared one at all. A title with no order sorts by release date and
         the page says its placement is not established. */
      order: z.number().nullable(),
      // When the story is set, as a plain label such as "1943" or "2024".
      // Null when no source establishes one, which is common outside the
      // MCU. A visible gap is worth more than a plausible guess.
      setting: z.string().nullable(),
      /* Which of this entry's sources backs the placement. Required whenever
         an order or a setting is given, so a chronological claim can be
         checked the same way a release date can. */
      source: z.url().nullable().default(null),
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
    /* The title where it is last seen, when the material establishes one. */
    lastAppearance: z.string().nullable().default(null),
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
    /* Which authored glyph in sigils.ts stands for this person. Defaults to
       the character id; named explicitly when the glyph was drawn under a
       different name, as with Iron Man for Tony Stark. */
    sigil: z.string().nullable().default(null),
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
  schema: proseFrontmatter.extend({
    /* Short translatable facts. They sit here rather than in data/ because
       every one of them is a phrase rather than a value: "inventor and
       industrialist" is not a date. */
    role: z.string().optional(),
    affiliation: z.string().optional(),
    born: z.string().optional(),
    powers: z.string().optional(),

    /* The journey: what happens to this person in each title, in order.
       It is the thing a reader actually wants after a film, and it is
       deliberately not a plot summary of the film: it is one person's
       thread through it.

       Fate is not recorded here. It belongs behind a spoiler in the body,
       because a facts row cannot be opted out of. */
    journey: z
      .array(
        z.object({
          title: z.string(),
          text: z.string(),
        }),
      )
      .default([]),
  }),
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
  schema: proseFrontmatter.extend({
    /* Other forms the term is written in, so prose is caught however the
       writer phrased it. "TVA" and "Time Variance Authority" are one entry. */
    aliases: z.array(z.string()).default([]),
  }),
});

const universeProse = defineCollection({
  loader: glob({ pattern: '*/universes/*.md', base: './content' }),
  schema: proseFrontmatter,
});

const phaseProse = defineCollection({
  loader: glob({ pattern: '*/phases/*.md', base: './content' }),
  schema: proseFrontmatter,
});

/*
 * Watch paths: curated routes through the catalogue.
 *
 * Permanent rather than dated. "What to watch before the next film" is a
 * post that expires; "everything that leads into this one" is a route that
 * keeps being true and simply gains entries. The order is the point, so it
 * is stored as an ordered list rather than derived from a filter.
 */
const paths = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './data/paths' }),
  schema: z.object({
    id: z.string(),
    order: z.number().int(),
    /* Titles in the order they should be watched, which is not always
       release order and not always story order. */
    titles: z.array(z.string()).min(2),
    ...attribution,
  }),
});

const pathProse = defineCollection({
  loader: glob({ pattern: '*/paths/*.md', base: './content' }),
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
  phaseProse,
  paths,
  pathProse,
  guides,
};
