/*
 * A picture of how far the reader has got, drawn in their own browser.
 *
 * What somebody has watched is the one piece of information this project
 * holds about a person, and the rule is that it never leaves the browser. So
 * the card is drawn on a canvas here rather than asked for from a server:
 * nothing is uploaded, nothing is rendered anywhere else, and the file lands
 * in the reader's downloads without a single request being made.
 *
 * Every colour is read from the stylesheet at the moment the card is drawn,
 * so it follows the tokens and the theme the reader is actually looking at
 * rather than a copy of them kept here.
 *
 * With this file blocked, the button is not shown and the page is unchanged.
 */
import { ask } from '../lib/dialog';
import { getWatched } from '../lib/prefs';

/** The size every network crops a shared picture against, drawn at twice it. */
const WIDTH = 1200;
const HEIGHT = 630;
const SCALE = 2;

/* The sagas, in the order the catalogue tells its story. Unbound is last
   because it is the material that belongs to no run. */
const SAGAS = ['infinity', 'multiverse', 'next', 'fox', 'sony', 'unbound'];

interface Labels {
  watched: string;
  released: string;
  hoursWatched: string;
  hoursLeft: string;
  bySaga: string;
  sagas: Record<string, string>;
  filename: string;
}

interface Tally {
  total: number;
  done: number;
  minutesWatched: number;
  minutesLeft: number;
  bySaga: { saga: string; total: number; done: number }[];
}

/**
 * Reads the shelf.
 *
 * The card is about the whole catalogue rather than about whatever the
 * filters are showing, because a number that moves when a control is pressed
 * is not a number worth sharing. Titles that have not come out are left out
 * of both sides: they cannot be watched, so counting them would only ever
 * make the reader look further behind than they are.
 */
function read(rows: HTMLElement[]): Tally {
  const watched = getWatched();
  const tally: Tally = {
    total: 0,
    done: 0,
    minutesWatched: 0,
    minutesLeft: 0,
    bySaga: SAGAS.map((saga) => ({ saga, total: 0, done: 0 })),
  };

  for (const row of rows) {
    if (row.dataset.unreleased === 'true') continue;
    const minutes = Number(row.dataset.minutes ?? '0');
    const seen = watched.has(row.dataset.titleId ?? '');
    const saga = tally.bySaga.find((entry) => entry.saga === row.dataset.saga);

    tally.total += 1;
    if (saga) saga.total += 1;
    if (seen) {
      tally.done += 1;
      tally.minutesWatched += minutes;
      if (saga) saga.done += 1;
    } else {
      tally.minutesLeft += minutes;
    }
  }

  return tally;
}

/** A token, read from the page so the card cannot drift from the site. */
function token(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}

function draw(tally: Tally, labels: Labels, language: string): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = WIDTH * SCALE;
  canvas.height = HEIGHT * SCALE;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('no 2d context');
  context.scale(SCALE, SCALE);

  const ink = token('--core');
  const soft = token('--ink-soft');
  const faint = token('--ink-faint');
  const hairline = token('--hairline');
  const amber = token('--watched');
  const colours = Object.fromEntries(SAGAS.map((saga) => [saga, token(`--livery-${saga}`)]));
  const figures = new Intl.NumberFormat(language);

  context.fillStyle = token('--void');
  context.fillRect(0, 0, WIDTH, HEIGHT);

  /* The same light the site puts behind a band, from the three saga colours
     that carry most of the catalogue. */
  for (const [x, y, radius, colour] of [
    [100, 0, 520, colours.infinity],
    [1150, 80, 460, colours.multiverse],
    [720, 660, 520, colours.fox],
  ] as [number, number, number, string][]) {
    const glow = context.createRadialGradient(x, y, 0, x, y, radius);
    glow.addColorStop(0, colour);
    glow.addColorStop(1, 'transparent');
    context.globalAlpha = 0.13;
    context.fillStyle = glow;
    context.fillRect(0, 0, WIDTH, HEIGHT);
  }
  context.globalAlpha = 1;

  // The wordmark: the same square, turned, that the masthead uses.
  context.save();
  context.translate(96, 92);
  context.rotate(Math.PI / 4);
  context.fillStyle = amber;
  context.shadowColor = amber;
  context.shadowBlur = 28;
  context.fillRect(-13, -13, 26, 26);
  context.restore();
  context.shadowBlur = 0;

  context.fillStyle = ink;
  context.font = '300 40px "Jost Variable", sans-serif';
  context.textBaseline = 'middle';
  context.letterSpacing = '0.14em';
  context.fillText('PHASE ZERO', 132, 93);
  context.letterSpacing = '0px';

  context.strokeStyle = hairline;
  context.lineWidth = 1;
  context.beginPath();
  context.moveTo(80, 148);
  context.lineTo(WIDTH - 80, 148);
  context.stroke();

  // The number the card exists to show.
  const done = figures.format(tally.done);
  context.fillStyle = ink;
  context.font = '300 148px "Jost Variable", sans-serif';
  context.textBaseline = 'alphabetic';
  context.fillText(done, 80, 320);
  const doneWidth = context.measureText(done).width;

  context.fillStyle = faint;
  context.font = '300 52px "Jost Variable", sans-serif';
  context.fillText(`/ ${figures.format(tally.total)}`, 92 + doneWidth, 320);

  context.fillStyle = soft;
  context.font = '400 26px "Hanken Grotesk Variable", sans-serif';
  context.fillText(labels.watched, 80, 366);
  context.fillStyle = faint;
  context.font = '400 20px "Hanken Grotesk Variable", sans-serif';
  context.fillText(labels.released, 80, 398);

  // The two figures underneath, set in the face the site uses for numbers.
  const hours = (minutes: number) => figures.format(Math.round(minutes / 60));
  context.font = '400 22px "JetBrains Mono Variable", monospace';
  context.fillStyle = amber;
  context.fillText(labels.hoursWatched.replace('{hours}', hours(tally.minutesWatched)), 80, 466);
  context.fillStyle = soft;
  context.fillText(labels.hoursLeft.replace('{hours}', hours(tally.minutesLeft)), 80, 502);

  context.fillStyle = faint;
  context.font = '400 18px "JetBrains Mono Variable", monospace';
  context.letterSpacing = '0.2em';
  context.fillText('PHASEZERO.PAGES.DEV', 80, 566);
  context.letterSpacing = '0px';

  /* The breakdown: one lit edge per saga, which is the site's own system.
     A saga with nothing out yet is left off rather than drawn as nought of
     nought, which reads as a failure to load rather than as a saga that has
     not started. */
  const sagas = tally.bySaga.filter((entry) => entry.total > 0);
  const left = 640;
  // Ends on the same line as the rule above it.
  const barWidth = WIDTH - 80 - left;
  context.font = '400 15px "JetBrains Mono Variable", monospace';
  context.fillStyle = faint;
  context.letterSpacing = '0.16em';
  context.fillText(labels.bySaga.toUpperCase(), left, 210);
  context.letterSpacing = '0px';

  sagas.forEach((entry, index) => {
    const y = 250 + index * 52;
    const colour = colours[entry.saga] ?? soft;
    const share = entry.total > 0 ? entry.done / entry.total : 0;

    context.fillStyle = colour;
    context.fillRect(left, y - 12, 3, 16);

    context.fillStyle = soft;
    context.font = '400 18px "Hanken Grotesk Variable", sans-serif';
    context.fillText(labels.sagas[entry.saga] ?? entry.saga, left + 16, y);

    const count = `${figures.format(entry.done)}/${figures.format(entry.total)}`;
    context.font = '400 16px "JetBrains Mono Variable", monospace';
    context.fillStyle = faint;
    context.textAlign = 'right';
    context.fillText(count, left + barWidth, y);
    context.textAlign = 'left';

    context.fillStyle = hairline;
    context.fillRect(left + 16, y + 12, barWidth - 16, 4);
    if (share > 0) {
      context.fillStyle = colour;
      context.fillRect(left + 16, y + 12, (barWidth - 16) * share, 4);
    }
  });

  return canvas;
}

const button = document.querySelector<HTMLButtonElement>('[data-share-card]');
const shelf = document.querySelector<HTMLElement>('[data-timeline]');

/* Shown only once this file has run and the browser has been asked whether it
   can produce a file at all, so nothing offers a button that cannot work. */
if (button && shelf && typeof HTMLCanvasElement.prototype.toBlob === 'function') {
  button.hidden = false;

  button.addEventListener('click', async () => {
    const labels: Labels = {
      watched: button.dataset.watched ?? '',
      released: button.dataset.released ?? '',
      hoursWatched: button.dataset.hoursWatched ?? '',
      hoursLeft: button.dataset.hoursLeft ?? '',
      bySaga: button.dataset.bySaga ?? '',
      sagas: JSON.parse(button.dataset.sagas ?? '{}'),
      filename: button.dataset.filename ?? 'phase-zero.png',
    };

    const busy = button.dataset.busy ?? '';
    const label = button.textContent;
    button.disabled = true;
    if (busy) button.textContent = busy;

    try {
      /* The card is one line of large type. A face that arrives after the
         drawing does is a card set in the fallback. */
      await document.fonts.ready;
      const rows = [...shelf.querySelectorAll<HTMLElement>('[data-title-id]')];
      const canvas = draw(read(rows), labels, document.documentElement.lang || 'en');

      /* Shown before it is saved, because a file that appears in the
         downloads without being asked for is a small ambush, and because
         nobody should have to open a picture to find out what is in it.

         The canvas itself goes in the dialog rather than a copy of it as an
         image, which keeps the whole thing inside the page: no blob address
         is made until the reader actually asks for the file. */
      canvas.className = 'dialog-card';
      canvas.setAttribute('role', 'img');
      canvas.setAttribute('aria-label', button.dataset.previewTitle ?? '');
      const wanted = await ask({
        title: button.dataset.previewTitle ?? '',
        body: canvas,
        confirm: button.dataset.download ?? '',
        cancel: button.dataset.cancel ?? '',
      });
      if (!wanted) return;

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((result) => resolve(result), 'image/png'),
      );
      if (!blob) throw new Error('the canvas produced no file');

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = labels.filename;
      link.click();
      // Revoked on the next frame, so the download has taken the URL first.
      requestAnimationFrame(() => URL.revokeObjectURL(url));
    } catch (error) {
      /* Nothing here is load bearing: the page and the progress are unaffected
         by a card that could not be drawn. */
      console.error('The card could not be drawn.', error);
    } finally {
      button.disabled = false;
      if (busy) button.textContent = label;
    }
  });
}
