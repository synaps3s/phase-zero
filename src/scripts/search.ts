/*
 * Search and filter behaviour.
 *
 * The whole index is already in the page, so this only hides what does not
 * match. Nothing is fetched, nothing is indexed at runtime, and with this
 * script blocked the page is still a complete, linked list of everything on
 * the site.
 */
import { searchWords } from '../lib/search-text';

const input = document.querySelector<HTMLInputElement>('[data-search-input]');
const list = document.querySelector<HTMLElement>('[data-results]');

if (input && list) {
  const rows = [...list.querySelectorAll<HTMLElement>('[data-haystack]')];
  const tally = document.querySelector<HTMLElement>('[data-search-tally]');
  const empty = document.querySelector<HTMLElement>('[data-search-empty]');
  const clear = document.querySelector<HTMLButtonElement>('[data-search-clear]');
  const filters = [...document.querySelectorAll<HTMLButtonElement>('[data-alignment]')];

  /* What somebody is cannot be typed into a search box, because the
     classification is not a word on the page. It is a second axis, and the
     two combine rather than replace each other.

     It is read back out of the buttons rather than assumed, because this
     script is not the only thing that writes it. A browser returning to this
     page through history can hand back a document that has already been
     filtered, and a variable initialised to 'all' would then disagree with
     what the reader is looking at. The DOM is the record; this follows it. */
  const pressed = () =>
    filters.find((button) => button.getAttribute('aria-pressed') === 'true')?.dataset.alignment ??
    'all';
  let alignment = pressed();

  function apply(): void {
    /* Reduced the same way the haystacks were, so a hyphen inside a name
       cannot decide whether it is found. Every word has to match, in any
       order, so "iron 2010" finds what "2010 iron" finds. */
    const words = searchWords(input!.value);
    let shown = 0;

    for (const row of rows) {
      const haystack = row.dataset.haystack ?? '';
      const hit =
        words.every((word) => haystack.includes(word)) &&
        (alignment === 'all' || row.dataset.alignment === alignment);
      row.hidden = !hit;
      if (hit) shown += 1;
    }

    if (tally?.dataset.showing) {
      tally.textContent = tally.dataset.showing
        .replace('{count}', String(shown))
        .replace('{total}', String(rows.length));
    }
    if (empty) empty.hidden = shown > 0;
    if (clear) clear.hidden = words.length === 0;
    list!.dataset.ready = 'true';
  }

  input.addEventListener('input', apply);
  clear?.addEventListener('click', () => {
    input.value = '';
    apply();
    input.focus();
  });

  for (const button of filters) {
    button.addEventListener('click', () => {
      alignment = button.dataset.alignment ?? 'all';
      for (const other of filters) {
        other.setAttribute('aria-pressed', String(other === button));
      }
      apply();
    });
  }

  apply();

  /* Restoring a page from history does not re-run this module, and different
     browsers restore different amounts of it: the typed query and the pressed
     filter can come back without the rows they were hiding, which leaves a
     tally counting one thing and a list showing another. Re-reading both
     sides here makes them agree again, however much came back. */
  window.addEventListener('pageshow', () => {
    alignment = pressed();
    apply();
  });
}
