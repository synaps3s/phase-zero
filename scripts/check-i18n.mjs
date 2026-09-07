#!/usr/bin/env node
/*
 * Translation report.
 *
 * The rule this enforces is deliberately narrow: a missing translation is a
 * working state, not a failure. What actually breaks the site is a declared
 * language with no interface strings, an invalid file, or a key that exists in
 * a translation but not in the source language, which means it will never be
 * used and is usually a typo.
 *
 * Everything else is reported as coverage, so that contributors can see where
 * help is needed.
 */
import { readFileSync, existsSync } from 'node:fs';
import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const languages = JSON.parse(readFileSync('config/languages.json', 'utf8'));
const source = languages.find((language) => language.default) ?? languages[0];

const errors = [];
const report = [];

function readJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    errors.push(`${path}: ${error.message}`);
    return null;
  }
}

function listMarkdown(directory) {
  if (!existsSync(directory)) return [];
  const found = [];
  for (const entry of readdirSync(directory)) {
    const full = join(directory, entry);
    if (statSync(full).isDirectory()) {
      found.push(...listMarkdown(full).map((name) => join(entry, name)));
    } else if (entry.endsWith('.md')) {
      found.push(entry);
    }
  }
  return found;
}

const sourceStrings = readJson(`content/${source.code}/ui.json`);
if (!sourceStrings) {
  console.error(`The source language "${source.code}" has no readable ui.json.`);
  process.exit(1);
}
const sourceKeys = Object.keys(sourceStrings);

const AREAS = ['titles', 'characters', 'sets', 'glossary', 'universes', 'guides'];
const sourceContent = Object.fromEntries(
  AREAS.map((area) => [area, listMarkdown(`content/${source.code}/${area}`)]),
);

for (const language of languages) {
  const isSource = language.code === source.code;
  const stringsPath = `content/${language.code}/ui.json`;

  if (!existsSync(stringsPath)) {
    errors.push(
      `Language "${language.code}" is declared in config/languages.json but ${stringsPath} does not exist. ` +
        `Interface strings are the one file a language cannot start without.`,
    );
    continue;
  }

  const strings = readJson(stringsPath);
  if (!strings) continue;

  const translated = Object.keys(strings);
  const missing = sourceKeys.filter((key) => !(key in strings));
  const unknown = translated.filter((key) => !(key in sourceStrings));
  const empty = translated.filter((key) => String(strings[key]).trim() === '');

  for (const key of unknown) {
    errors.push(
      `${stringsPath}: key "${key}" does not exist in ${source.code}, so it will never be shown. ` +
        `Remove it, or add it to the source language first.`,
    );
  }
  for (const key of empty) {
    errors.push(`${stringsPath}: key "${key}" is empty.`);
  }

  const coverage = AREAS.map((area) => {
    const present = new Set(listMarkdown(`content/${language.code}/${area}`));
    const total = sourceContent[area].length;
    const done = sourceContent[area].filter((name) => present.has(name)).length;
    return { area, done, total };
  });

  report.push({
    language,
    isSource,
    strings: { done: sourceKeys.length - missing.length, total: sourceKeys.length },
    coverage,
  });
}

const bar = (done, total) => {
  if (total === 0) return '        ';
  const filled = Math.round((done / total) * 8);
  return '#'.repeat(filled) + '.'.repeat(8 - filled);
};

console.log('Translation coverage\n');
for (const entry of report) {
  const tag = entry.isSource ? ' (source)' : '';
  console.log(`  ${entry.language.endonym}${tag}`);
  console.log(
    `    interface  ${bar(entry.strings.done, entry.strings.total)}  ${entry.strings.done}/${entry.strings.total}`,
  );
  for (const area of entry.coverage) {
    console.log(
      `    ${area.area.padEnd(10)} ${bar(area.done, area.total)}  ${area.done}/${area.total}`,
    );
  }
  console.log('');
}

if (errors.length > 0) {
  console.error(`Translation check failed with ${errors.length} problem(s).\n`);
  for (const error of errors) console.error(`  ${error}\n`);
  process.exit(1);
}

console.log('Translation check passed. Missing translations fall back to the source language.');
