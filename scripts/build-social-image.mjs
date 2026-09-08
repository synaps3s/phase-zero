#!/usr/bin/env node
/*
 * The picture a shared link shows.
 *
 * Development only, like the screenshot script: it needs a browser on the
 * machine, so it is not part of the build and CI never runs it. The images it
 * writes are committed, because a preview card has to exist as a real file at
 * a stable address before anyone pastes a link.
 *
 * Everything in the card is drawn here from the project's own material: the
 * tokens in src/styles/tokens.css, the typeface the site already ships, and
 * the one shape the wordmark uses. No poster, no logo, no still. The card is
 * the site's own metaphor at a readable size: a shelf of titles seen edge on,
 * each spine lit by the colour of the saga it belongs to.
 *
 *   node scripts/build-social-image.mjs
 *
 * Running it twice on the same card does not produce the same file twice.
 * Antialiasing and the gradients land a value or two apart between runs, so
 * git reports both images as changed while the picture is identical. Commit a
 * re-render only when the card has actually changed: a megabyte of binary in
 * the history, permanently, buys nothing when nobody can see the difference.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import puppeteer from 'puppeteer-core';
import languages from '../config/languages.json' with { type: 'json' };
import site from '../config/site.json' with { type: 'json' };

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const OUT = 'public/social';
const defaultLanguage = languages.find((language) => language.default) ?? languages[0];

/* Two sizes, because the two places a link gets shared crop differently.
   1200 by 630 is what social networks expect; GitHub asks for 1280 by 640 for
   the picture on a repository. Both are rendered at twice the size so they
   stay sharp on a dense screen. */
const WIDTH = 1200;
const HEIGHT = 630;
const GITHUB = { width: 1280, height: 640 };

/** Read straight from the stylesheet, so the card cannot drift from the site. */
function tokens() {
  const css = readFileSync('src/styles/tokens.css', 'utf8');
  const read = (name) => {
    const match = new RegExp(`--${name}:\\s*([^;]+);`).exec(css);
    if (!match) throw new Error(`token --${name} is not defined`);
    return match[1].trim();
  };
  return {
    void: read('void'),
    core: read('core'),
    inkSoft: read('ink-soft'),
    watched: read('watched'),
    hairline: read('hairline'),
    sagas: ['infinity', 'multiverse', 'next', 'fox', 'sony', 'unbound'].map((saga) => ({
      saga,
      colour: read(`livery-${saga}`),
    })),
  };
}

const font = readFileSync(
  'node_modules/@fontsource-variable/jost/files/jost-latin-wght-normal.woff2',
).toString('base64');

function card(language, t, size = { width: WIDTH, height: HEIGHT }) {
  /* The six saga colours, as the rows they light on the timeline. The labels
     are the project's own vocabulary and need no translation. */
  const spines = t.sagas
    .map(
      ({ saga, colour }, index) => `
      <li class="spine" style="--livery: ${colour}; --delay: ${index}">
        <span class="edge"></span>
        <span class="bar" style="width: ${[86, 64, 74, 52, 68, 40][index]}%"></span>
      </li>`,
    )
    .join('');

  return `<!doctype html>
<html lang="${language.code}">
  <head>
    <meta charset="utf-8" />
    <style>
      @font-face {
        font-family: 'Jost Variable';
        src: url(data:font/woff2;base64,${font}) format('woff2');
        font-weight: 100 900;
        font-display: block;
      }
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body {
        width: ${size.width}px;
        height: ${size.height}px;
        background: ${t.void};
        font-family: 'Jost Variable', sans-serif;
        color: ${t.core};
        overflow: hidden;
        position: relative;
      }
      /* The same light the site puts behind a band, from the three saga
         colours that carry most of the catalogue. */
      body::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(70% 90% at 8% 0%, ${t.sagas[0].colour}22, transparent 70%),
          radial-gradient(60% 80% at 96% 12%, ${t.sagas[1].colour}1f, transparent 70%),
          radial-gradient(80% 70% at 60% 104%, ${t.sagas[3].colour}18, transparent 72%);
      }
      .frame {
        position: relative;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 380px;
        align-items: center;
        gap: 64px;
        padding: 76px 80px;
      }
      .wordmark { display: flex; align-items: center; gap: 26px; }
      /* The one shape the site's own wordmark uses: a square, turned. */
      .mark {
        width: 40px;
        height: 40px;
        background: ${t.watched};
        transform: rotate(45deg);
        box-shadow: 0 0 42px -4px ${t.watched};
      }
      h1 {
        font-size: 92px;
        font-weight: 300;
        letter-spacing: 0.06em;
        line-height: 1;
        text-transform: uppercase;
      }
      .rule {
        height: 1px;
        margin: 40px 0 32px;
        background: linear-gradient(to right, ${t.hairline}, transparent 82%);
      }
      .tagline {
        font-size: 34px;
        font-weight: 300;
        line-height: 1.35;
        color: ${t.core};
        max-width: 15ch;
      }
      .address {
        margin-top: 40px;
        font-size: 22px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: ${t.inkSoft};
      }
      /* A shelf seen edge on, which is what the timeline is. */
      .shelf { list-style: none; display: grid; gap: 26px; }
      .spine { display: flex; align-items: center; gap: 18px; height: 26px; }
      .edge {
        width: 4px;
        height: 100%;
        background: var(--livery);
        box-shadow: 0 0 20px -1px var(--livery);
      }
      .bar {
        height: 9px;
        background: linear-gradient(to right, var(--livery), transparent);
        opacity: 0.72;
      }
    </style>
  </head>
  <body>
    <div class="frame">
      <div>
        <div class="wordmark">
          <span class="mark"></span>
          <h1>Phase Zero</h1>
        </div>
        <div class="rule"></div>
        <p class="tagline">${site.tagline[language.code] ?? site.tagline.en}</p>
        <p class="address">${site.url.replace('https://', '')}</p>
      </div>
      <ul class="shelf">${spines}</ul>
    </div>
  </body>
</html>`;
}

const t = tokens();
mkdirSync(OUT, { recursive: true });

/*
 * A bar of the six saga colours, for the readme.
 *
 * GitHub strips styling from a readme, so the only way to put the project's
 * own colour in front of somebody reading it there is a picture. This one is
 * generated from the same tokens as everything else rather than drawn by hand,
 * so a change to a saga's colour reaches the readme too.
 */
const bar = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 10" width="1200" height="10" role="img" aria-label="The six saga colours of Phase Zero">
${t.sagas
  .map(
    ({ saga, colour }, index) =>
      `  <rect x="${index * 200}" y="0" width="200" height="10" fill="${colour}"><title>${saga}</title></rect>`,
  )
  .join('\n')}
</svg>
`;
writeFileSync(join(OUT, 'livery.svg'), bar);
console.log(`Wrote ${OUT}/livery.svg from ${t.sagas.length} saga colours.`);

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new' });

async function shoot(name, language, size) {
  const file = join(tmpdir(), `phase-zero-card-${name}.html`);
  writeFileSync(file, card(language, t, size));

  const page = await browser.newPage();
  await page.setViewport({ ...size, deviceScaleFactor: 2 });
  await page.goto(`file://${file}`, { waitUntil: 'load' });
  // The card is one line of large type: a font that arrives late ruins it.
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: join(OUT, `${name}.png`) });
  console.log(`Wrote ${OUT}/${name}.png at ${size.width * 2} by ${size.height * 2}.`);
  await page.close();
}

for (const language of languages) {
  await shoot(language.code, language, { width: WIDTH, height: HEIGHT });
}

/* The repository's own picture. English, because that is the language the
   repository itself is written in. */
await shoot('github', defaultLanguage, GITHUB);

await browser.close();
