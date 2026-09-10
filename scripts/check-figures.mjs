#!/usr/bin/env node
/*
 * The figures in the readmes.
 *
 * Both readmes open with a table of how much is in the catalogue. That table
 * is the first thing anybody reads and it is written by hand, so it goes stale
 * the moment somebody adds a batch of entries and forgets it. It went stale
 * once already: it claimed a hundred and two characters on a day the catalogue
 * held two hundred and twenty.
 *
 * A number a reader cannot trust is worse than no number, and this project's
 * whole argument is that its figures are counted rather than asserted. So the
 * counting happens here, and the readmes are checked against it.
 *
 * Every figure below is counted the same way the site counts it. The one
 * exception is the page total, which the build reports after this runs, so it
 * is checked only when dist/ is present from a previous build.
 */
import { readdirSync, existsSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const errors = [];

/** Every .yml under a directory, at any depth. */
const walk = (directory, depth = Infinity, level = 0) => {
  if (!existsSync(directory)) return [];
  const found = [];
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) {
      if (level < depth) found.push(...walk(path, depth, level + 1));
    } else if (name.endsWith('.yml')) {
      found.push(path);
    }
  }
  return found;
};

const markdown = (directory) => {
  if (!existsSync(directory)) return [];
  const found = [];
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) found.push(...markdown(path));
    else if (name.endsWith('.md')) found.push(path);
  }
  return found;
};

/* Citations are counted the way the colophon counts them: one per source line
   in a fact file, not one per distinct address. The same article backs many
   entries and each of those carries its own date, so this is a count of checks.
   The second number is how many addresses those checks land on. */
const citationFiles = [
  ...walk('data/titles'),
  ...walk('data/characters'),
  ...walk('data/sets'),
  ...walk('data/glossary'),
  ...walk('data/organisations'),
  ...walk('data/paths'),
];
let citations = 0;
const addresses = new Set();
for (const file of citationFiles) {
  for (const match of readFileSync(file, 'utf8').matchAll(/^\s*-\s*url:\s*"?([^"\n]+)"?\s*$/gm)) {
    citations += 1;
    addresses.add(match[1].trim());
  }
}

const counted = {
  titles: walk('data/titles').length,
  characters: walk('data/characters').length,
  glossary: walk('data/glossary').length,
  organisations: walk('data/organisations', 0).length,
  collections: walk('data/sets', 0).length,
  pieces: walk('data/sets').length - walk('data/sets', 0).length,
  paths: walk('data/paths').length,
  questions: markdown('content/en/questions').length,
  guides: markdown('content/en/guides').length,
  languages: JSON.parse(readFileSync('config/languages.json', 'utf8')).length,
  citations,
  sources: addresses.size,
};

if (existsSync('dist')) {
  const html = [];
  const collect = (directory) => {
    for (const name of readdirSync(directory)) {
      const path = join(directory, name);
      if (statSync(path).isDirectory()) collect(path);
      else if (name.endsWith('.html')) html.push(path);
    }
  };
  collect('dist');
  /* The build prints one fewer than the files on disk: 404.html is written by
     the adapter rather than rendered as a route. Count what Astro reports. */
  counted.pages = html.length - 1;
}

/*
 * What each readme has to say, as a pattern that captures the figure. The
 * patterns are deliberately narrow: they match the sentence, not just any
 * number, so a wrong figure fails rather than silently matching somewhere else.
 */
const claims = (labels) => [
  [labels.titles, counted.titles],
  [labels.characters, counted.characters],
  [labels.glossary, counted.glossary],
  [labels.organisations, counted.organisations],
  [labels.collections, counted.collections],
  [labels.pieces, counted.pieces],
  [labels.paths, counted.paths],
  [labels.questions, counted.questions],
  [labels.guides, counted.guides],
  [labels.citations, counted.citations],
  [labels.sources, counted.sources],
  [labels.languages, counted.languages],
  ...(counted.pages === undefined ? [] : [[labels.pages, counted.pages]]),
];

const READMES = [
  [
    'README.md',
    {
      titles: /\*\*(\d+)\*\* titles/,
      characters: /\*\*(\d+)\*\* characters/,
      glossary: /\*\*(\d+)\*\* glossary terms/,
      organisations: /\*\*(\d+)\*\* organisations/,
      collections: /\*\*(\d+)\*\* collections/,
      pieces: /collections, (\d+) pieces/,
      paths: /\*\*(\d+)\*\* watch paths/,
      questions: /\*\*(\d+)\*\* questions answered/,
      guides: /\*\*(\d+)\*\* guides/,
      citations: /\*\*(\d+)\*\* citations/,
      sources: /citations across \*\*(\d+)\*\* sources/,
      languages: /\*\*(\d+)\*\* languages/,
      pages: /\*\*(\d+)\*\* static pages/,
    },
  ],
  [
    'README.it.md',
    {
      titles: /\*\*(\d+)\*\* titoli/,
      characters: /\*\*(\d+)\*\* personaggi/,
      glossary: /\*\*(\d+)\*\* voci di glossario/,
      organisations: /\*\*(\d+)\*\* organizzazioni/,
      collections: /\*\*(\d+)\*\* collezioni/,
      pieces: /collezioni, (\d+) pezzi/,
      paths: /\*\*(\d+)\*\* percorsi/,
      questions: /\*\*(\d+)\*\* domande/,
      guides: /\*\*(\d+)\*\* guide/,
      citations: /\*\*(\d+)\*\* citazioni/,
      sources: /citazioni su \*\*(\d+)\*\* fonti/,
      languages: /\*\*(\d+)\*\* lingue/,
      pages: /\*\*(\d+)\*\* pagine statiche/,
    },
  ],
];

for (const [file, labels] of READMES) {
  if (!existsSync(file)) {
    errors.push(`${file}: missing.`);
    continue;
  }
  const text = readFileSync(file, 'utf8');
  for (const [pattern, expected] of claims(labels)) {
    const match = pattern.exec(text);
    if (!match) {
      errors.push(`${file}: no figure matching ${pattern}. The table has changed shape.`);
    } else if (Number(match[1]) !== expected) {
      errors.push(`${file}: claims ${match[1]} where the catalogue holds ${expected} (${pattern}).`);
    }
  }
}

if (errors.length > 0) {
  console.error('Figure check failed.\n');
  for (const error of errors) console.error(`  ${error}`);
  console.error(
    '\nThe readme tables are written by hand. Update them to the counts above,' +
      '\nand the date beside them, then run this again.',
  );
  process.exit(1);
}

const shown = Object.entries(counted)
  .map(([name, value]) => `${value} ${name}`)
  .join(', ');
console.log(`Figure check passed. Both readmes agree with the catalogue: ${shown}.`);
