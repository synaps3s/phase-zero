/*
 * Search and filter behaviour.
 *
 * The whole index is already in the page, so this only hides what does not
 * match. Nothing is fetched, nothing is indexed at runtime, and with this
 * script blocked the page is still a complete, linked list of everything on
 * the site.
 */
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
     two combine rather than replace each other. */
  let alignment = 'all';

  function apply(): void {
    /* Every word has to match, in any order, so "iron 2010" finds what
       "2010 iron" finds. Matching the whole string would not. */
    const words = input!.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
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
}
