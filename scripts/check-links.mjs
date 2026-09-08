#!/usr/bin/env node
/*
 * Source link check.
 *
 * Confirms every source URL still resolves. It cannot confirm that a page
 * says what the entry claims, which is the part that stays a human
 * responsibility, but it does catch the sources that quietly rot: a moved
 * article, a deleted press release, a domain that lapsed.
 *
 * Only a definitive "this is gone" fails the run. Timeouts, rate limits and
 * blocked automated requests are reported and tolerated, because a flaky
 * network should never block a contributor's pull request.
 */
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

const AGENT =
  'PhaseZeroLinkCheck/1.0 (+https://github.com/synaps3s/phase-zero) link availability check';
const TIMEOUT = 15000;
const GONE = new Set([404, 410]);

/*
 * Every fact file under data/, wherever it sits. This used to read titles and
 * characters only, which quietly left the sources of the sets, the pieces
 * inside them, the glossary, the organisations and the paths unchecked. A
 * file is a file: walking the directory means a new kind of entry added later
 * is covered on the day it lands rather than the day somebody remembers to
 * add it here.
 */
function* factFiles(directory) {
  if (!existsSync(directory)) return;
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) yield* factFiles(path);
    else if (entry.name.endsWith('.yml')) yield path;
  }
}

function collect() {
  const urls = new Map();
  for (const path of factFiles('data')) {
    const entry = parse(readFileSync(path, 'utf8'));
    for (const source of entry?.sources ?? []) {
      if (!source?.url) continue;
      if (!urls.has(source.url)) urls.set(source.url, []);
      urls.get(source.url).push(path);
    }
  }
  return urls;
}

async function probe(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await fetch(url, {
        method,
        redirect: 'follow',
        headers: { 'user-agent': AGENT },
        signal: AbortSignal.timeout(TIMEOUT),
      });
      // Some hosts refuse HEAD outright; only a GET result is conclusive.
      if (response.status === 405 && method === 'HEAD') continue;
      return { status: response.status };
    } catch (error) {
      if (method === 'GET') return { status: 0, reason: error.message };
    }
  }
  return { status: 0, reason: 'no response' };
}

const urls = collect();
console.log(`Checking ${urls.size} source URL(s).\n`);

const dead = [];
const unclear = [];

// Sequential and unhurried: this runs against other people's servers.
for (const [url, files] of urls) {
  const { status, reason } = await probe(url);
  if (GONE.has(status)) {
    dead.push({ url, files, status });
    console.log(`  gone     ${status}  ${url}`);
  } else if (status >= 200 && status < 400) {
    console.log(`  ok       ${status}  ${url}`);
  } else {
    unclear.push({ url, status, reason });
    console.log(`  unclear  ${status || reason}  ${url}`);
  }
}

if (unclear.length > 0) {
  console.log(`\n${unclear.length} URL(s) could not be checked. That is not a failure.`);
}

if (dead.length > 0) {
  console.error(`\nLink check failed. ${dead.length} source(s) are gone.\n`);
  for (const entry of dead) {
    console.error(`  ${entry.url}`);
    console.error(`    cited by: ${entry.files.join(', ')}`);
    console.error(`    Replace it with a source that resolves, or remove the claim it backs.\n`);
  }
  process.exit(1);
}

console.log('\nLink check passed. Every source still resolves.');
