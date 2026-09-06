/*
 * Screenshot the built site for design review.
 *
 * Development only. Not part of the build, not shipped, and not required
 * to contribute: it exists so a design pass can look at real pages at real
 * widths instead of guessing.
 */
import puppeteer from 'puppeteer-core';
import { mkdirSync } from 'node:fs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const BASE = process.env.BASE ?? 'http://localhost:4321';
const OUT = '.impeccable/review';

const shots = [
  { name: 'desktop', path: '/en', width: 1440, height: 900, theme: 'light' },
  { name: 'desktop-dark-full', path: '/en', width: 1440, height: 900, theme: 'dark' },
  { name: 'mobile', path: '/en', width: 390, height: 844, theme: 'light' },
  { name: 'desktop-it', path: '/it', width: 1440, height: 900 },
  { name: 'desktop-entry', path: '/en/titles/iron-man', width: 1440, height: 900, theme: 'light' },
  { name: 'mobile-entry', path: '/en/titles/iron-man', width: 390, height: 844 },
  { name: 'desktop-dark', path: '/en', width: 1440, height: 900, theme: 'dark' },
];

mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  args: ['--no-sandbox', '--force-color-profile=srgb', '--hide-scrollbars'],
});

for (const shot of shots) {
  const page = await browser.newPage();
  await page.setViewport({ width: shot.width, height: shot.height, deviceScaleFactor: 2 });

  if (shot.theme) {
    await page.evaluateOnNewDocument((theme) => {
      window.localStorage.setItem('phasezero.v1', JSON.stringify({ version: 1, theme, watched: [] }));
    }, shot.theme);
  }

  await page.goto(BASE + shot.path, { waitUntil: 'networkidle0' });
  await page.evaluate(() => document.fonts.ready);

  // Settle any entrance motion so a capture never reads an animating
  // element as a missing one.
  await new Promise((resolve) => setTimeout(resolve, 350));
  await page.evaluate(() => window.scrollTo(0, 0));

  await page.screenshot({ path: `${OUT}/${shot.name}.png`, fullPage: true });
  console.log(`${shot.name}  ${shot.width}x${shot.height}  ${shot.path}${shot.theme ? `  (${shot.theme})` : ''}`);
  await page.close();
}

await browser.close();
