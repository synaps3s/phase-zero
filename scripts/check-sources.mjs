#!/usr/bin/env node
/*
 * Fact integrity check.
 *
 * This is the script that makes review objective. It does not know anything
 * about Marvel. It checks that every claim in data/ is attributed, recently
 * looked at by a human, and connected to entries that actually exist.
 *
 * A reviewer therefore never has to be a bigger expert than the contributor.
 * They have to check that the source says what the entry says.
 */
import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join, basename } from 'node:path';
import { parse } from 'yaml';

const errors = [];
const warnings = [];

const readYaml = (path) => {
  try {
    return parse(readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${path}: could not be parsed. ${error.message}`);
    return null;
  }
};

const readJson = (path) => JSON.parse(readFileSync(path, 'utf8'));

const listYaml = (directory) =>
  existsSync(directory)
    ? readdirSync(directory).filter((name) => name.endsWith('.yml')).sort()
    : [];

/* --- Load everything --- */

const languages = readJson('config/languages.json');
const sourceLanguage = languages.find((language) => language.default) ?? languages[0];

const universes = new Set(readJson('data/universes.json').map((entry) => entry.id));
const franchises = new Set(readJson('data/franchises.json').map((entry) => entry.id));
const sagas = new Set(readJson('data/sagas.json').map((entry) => entry.id));
const phases = new Set(readJson('data/phases.json').map((entry) => entry.number));

const titles = new Map();
for (const file of listYaml('data/titles')) {
  const path = join('data/titles', file);
  const entry = readYaml(path);
  if (entry) titles.set(basename(file, '.yml'), { path, entry });
}

const characters = new Map();
for (const file of listYaml('data/characters')) {
  const path = join('data/characters', file);
  const entry = readYaml(path);
  if (entry) characters.set(basename(file, '.yml'), { path, entry });
}

/* --- Shared checks --- */

/*
 * A plain date carries no time zone, and a contributor writes the date it is
 * where they are. Local time runs from UTC-12 to UTC+14, so a date up to one
 * day ahead of UTC is somebody's legitimate today. Past that it is a real
 * mistake, usually a typo in the year.
 */
const latestPlausibleDate = new Date();
latestPlausibleDate.setUTCDate(latestPlausibleDate.getUTCDate() + 1);
latestPlausibleDate.setUTCHours(23, 59, 59, 999);

/** A source is only useful if you can go and look at it. */
function checkAttribution(path, entry) {
  if (!Array.isArray(entry.sources) || entry.sources.length === 0) {
    errors.push(
      `${path}: has no sources. Every fact in this project has to say where it came from. ` +
        `See the sourcing rule in CONTRIBUTING.md.`,
    );
    return;
  }

  entry.sources.forEach((source, index) => {
    const label = `${path}: sources[${index}]`;
    if (typeof source?.url !== 'string' || !/^https?:\/\//.test(source.url)) {
      errors.push(`${label} needs a url starting with http or https.`);
    }
    if (!source?.accessed) {
      errors.push(`${label} needs an "accessed" date saying when you looked at it.`);
    } else if (new Date(source.accessed) > latestPlausibleDate) {
      errors.push(
        `${label} has an "accessed" date in the future. Check the year.`,
      );
    }
  });

  if (!entry.verified) {
    errors.push(
      `${path}: needs a "verified" date, meaning the day a human last checked ` +
        `this entry against its sources.`,
    );
  } else if (new Date(entry.verified) > latestPlausibleDate) {
    errors.push(`${path}: "verified" is a date in the future. Check the year.`);
  }
}

/** Reference to something that has to exist, or the page will render a dead end. */
function checkReference(path, field, value, pool, poolName) {
  if (value === null || value === undefined) return;
  if (!pool.has(value)) {
    errors.push(
      `${path}: ${field} points at "${value}", which is not in ${poolName}. ` +
        `Either the id is misspelled or the entry has not been added yet.`,
    );
  }
}

/* --- Titles --- */

for (const [id, { path, entry }] of titles) {
  if (entry.id !== id) {
    errors.push(`${path}: the id field is "${entry.id}" but the file is named "${id}.yml". They have to match.`);
  }

  checkAttribution(path, entry);
  checkReference(path, 'universe', entry.universe, universes, 'data/universes.json');
  checkReference(path, 'franchise', entry.franchise, franchises, 'data/franchises.json');
  checkReference(path, 'saga', entry.saga, sagas, 'data/sagas.json');
  if (entry.phase !== null && entry.phase !== undefined) {
    checkReference(path, 'phase', entry.phase, phases, 'data/phases.json');
  }

  for (const field of ['requires', 'leadsTo']) {
    for (const reference of entry[field] ?? []) {
      checkReference(path, `${field}`, reference, new Set(titles.keys()), 'data/titles');
    }
  }

  for (const member of entry.cast ?? []) {
    checkReference(path, 'cast.character', member.character, new Set(characters.keys()), 'data/characters');
  }

  const release = entry.release ?? {};
  if (release.status === 'released' && !release.date) {
    errors.push(`${path}: is marked released but has no release date.`);
  }
  if (release.date && new Date(release.date) > latestPlausibleDate && release.status === 'released') {
    warnings.push(`${path}: is marked released but the date is in the future.`);
  }

  // English is what every other language falls back to, so it is the one
  // translation that cannot be missing.
  const prose = `content/${sourceLanguage.code}/titles/${id}.md`;
  if (!existsSync(prose)) {
    errors.push(
      `${path}: has no ${sourceLanguage.code} prose at ${prose}. ` +
        `Every other language falls back to it, so it cannot be missing.`,
    );
  }
}

/* --- Characters --- */

for (const [id, { path, entry }] of characters) {
  if (entry.id !== id) {
    errors.push(`${path}: the id field is "${entry.id}" but the file is named "${id}.yml". They have to match.`);
  }

  checkAttribution(path, entry);
  checkReference(path, 'universe', entry.universe, universes, 'data/universes.json');
  checkReference(path, 'franchise', entry.franchise, franchises, 'data/franchises.json');
  checkReference(path, 'firstAppearance', entry.firstAppearance, new Set(titles.keys()), 'data/titles');

  for (const reference of entry.appearsIn ?? []) {
    checkReference(path, 'appearsIn', reference, new Set(titles.keys()), 'data/titles');
  }

  const prose = `content/${sourceLanguage.code}/characters/${id}.md`;
  if (!existsSync(prose)) {
    errors.push(
      `${path}: has no ${sourceLanguage.code} prose at ${prose}. ` +
        `Every other language falls back to it, so it cannot be missing.`,
    );
  }
}

/* --- Report --- */

console.log(
  `Checked ${titles.size} title(s) and ${characters.size} character(s) ` +
    `against ${universes.size} universes, ${franchises.size} franchises and ${sagas.size} sagas.`,
);

for (const warning of warnings) console.warn(`  warning: ${warning}`);

if (errors.length > 0) {
  console.error(`\nFact check failed with ${errors.length} problem(s).\n`);
  for (const error of errors) console.error(`  ${error}\n`);
  process.exit(1);
}

console.log('Fact check passed. Everything is attributed and every reference resolves.');
