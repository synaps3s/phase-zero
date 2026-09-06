#!/usr/bin/env node
/*
 * Text lint.
 *
 * Enforces the two house style rules that apply to every file in the
 * repository, so that they never have to be argued about in review:
 *
 *   1. No emoji. Icons are drawn as SVG.
 *   2. No em dash. An en dash is allowed only between digits, as in 2008-2012.
 *
 * The banned characters are written as escape sequences on purpose, so that
 * this file does not trip its own check.
 */
import { readFileSync } from 'node:fs';
import { readdir } from 'node:fs/promises';
import { join, extname, relative, sep } from 'node:path';

const ROOT = process.cwd();

const SKIP_DIRECTORIES = new Set([
  'node_modules',
  '.git',
  'dist',
  '.astro',
  '.wrangler',
]);

const TEXT_EXTENSIONS = new Set([
  '.md', '.mdx', '.json', '.yml', '.yaml', '.ts', '.tsx', '.js', '.mjs',
  '.cjs', '.astro', '.css', '.html', '.txt', '.svg',
]);

const EXTENSIONLESS_FILES = new Set(['LICENSE', 'LICENSE-CONTENT']);

const EM_DASH = '\u2014';
const HORIZONTAL_BAR = '\u2015';
const EN_DASH = '\u2013';

const RULES = [
  {
    name: 'emoji',
    test: /\p{Extended_Pictographic}/u,
    message: 'emoji are not allowed, use an SVG icon instead',
  },
  {
    name: 'em-dash',
    test: new RegExp(`[${EM_DASH}${HORIZONTAL_BAR}]`, 'u'),
    message: 'em dash is not allowed, use a comma, a colon or parentheses',
  },
  {
    name: 'en-dash',
    // Allowed between digits (2008-2012). Anywhere else it is being used as a
    // substitute for the banned em dash.
    test: new RegExp(`(?<!\\d)${EN_DASH}|${EN_DASH}(?!\\d)`, 'u'),
    message: 'en dash is only allowed between digits, as in a year range',
  },
];

/** Legal marks that the emoji rule would otherwise flag. */
const ALLOWED_PICTOGRAPHIC = /[\u00a9\u00ae\u2122]/gu;

async function collectFiles(directory) {
  const found = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.') && entry.isDirectory() && entry.name !== '.github') {
      continue;
    }
    if (SKIP_DIRECTORIES.has(entry.name)) continue;

    const full = join(directory, entry.name);
    if (entry.isDirectory()) {
      found.push(...(await collectFiles(full)));
      continue;
    }
    const isText =
      TEXT_EXTENSIONS.has(extname(entry.name)) || EXTENSIONLESS_FILES.has(entry.name);
    if (isText) found.push(full);
  }
  return found;
}

function checkFile(path) {
  const problems = [];
  const lines = readFileSync(path, 'utf8').split('\n');

  lines.forEach((line, index) => {
    const cleaned = line.replace(ALLOWED_PICTOGRAPHIC, '');
    for (const rule of RULES) {
      const match = cleaned.match(rule.test);
      if (!match) continue;
      problems.push({
        file: relative(ROOT, path),
        line: index + 1,
        column: (match.index ?? 0) + 1,
        rule: rule.name,
        message: rule.message,
        excerpt: line.trim().slice(0, 90),
      });
    }
  });

  return problems;
}

const files = await collectFiles(ROOT);
const problems = files.flatMap(checkFile);

if (problems.length === 0) {
  console.log(`Text lint passed. Checked ${files.length} files.`);
  process.exit(0);
}

console.error(`Text lint failed with ${problems.length} problem(s).\n`);
for (const problem of problems) {
  console.error(`  ${problem.file}:${problem.line}:${problem.column}`);
  console.error(`    ${problem.rule}: ${problem.message}`);
  console.error(`    ${problem.excerpt}\n`);
}
console.error(`Checked ${files.length} files under ${ROOT}${sep}`);
process.exit(1);
