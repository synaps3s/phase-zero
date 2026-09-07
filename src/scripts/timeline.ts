/*
 * Timeline behaviour.
 *
 * The server already sent every title in release order, so this file only
 * reorders and hides what is there. Sorting sets each row's flex order
 * rather than moving nodes, which keeps the document order the server sent
 * and keeps the tab sequence stable.
 *
 * With this script blocked the page is still the complete catalogue in a
 * sensible order. Nothing here is required to read it.
 */
import {
  getDepth,
  getOrder,
  getSeparate,
  getWatched,
  setDepth,
  setOrder,
  setSeparate,
  toggleWatched,
  type Depth,
  type Order,
} from '../lib/prefs';

const timeline = document.querySelector<HTMLElement>('[data-timeline]');

if (timeline) {
  const shelf = timeline;
  const rows = [...shelf.querySelectorAll<HTMLElement>('[data-title-id]')];
  const controls = document.querySelector<HTMLElement>('[data-controls]');
  const tally = document.querySelector<HTMLElement>('[data-tally]');
  const empty = document.querySelector<HTMLElement>('[data-empty]');
  const filterInput = document.querySelector<HTMLInputElement>('[data-filter]');
  const orderHelp = document.querySelector<HTMLElement>('[data-order-help]');
  const depthHelp = document.querySelector<HTMLElement>('[data-tier-help]');

  const labels = {
    mark: shelf.dataset.labelMark ?? '',
    unmark: shelf.dataset.labelUnmark ?? '',
  };

  const state = {
    order: getOrder(),
    depth: getDepth(),
    separate: getSeparate(),
    query: '',
  };

  const watched = getWatched();

  /* The help lines live in the markup rather than in this file, so they are
     translated with everything else. */
  const helpFor = (element: HTMLElement | null, key: string) => element?.dataset[key] ?? '';

  function apply(): void {
    let shown = 0;
    let watchedShown = 0;
    let minutesLeft = 0;

    for (const row of rows) {
      /* Depth one is a question about format rather than about how deep the
         reader wants to go: it means feature films and nothing else. */
      const withinDepth =
        state.depth === 1
          ? row.dataset.kind === 'film'
          : Number(row.dataset.tier ?? '3') <= state.depth;

      /* The separate continuities are a different story rather than a later
         part of this one, so they are their own axis. They also need the
         fullest depth: asking for films only and getting another studio's
         twenty-year run is not what that control means. */
      const continuity = row.dataset.continuity ?? 'shared';
      const isSeparate = continuity === 'separate' || continuity === 'unbound';
      const isAlternate = continuity === 'alternate';

      let allowed: boolean;
      if (isSeparate) allowed = state.separate && state.depth === 3;
      else if (isAlternate) allowed = state.separate && withinDepth;
      else allowed = withinDepth;

      const matches = state.query === '' || (row.dataset.search ?? '').includes(state.query);
      const visible = allowed && matches;

      row.hidden = !visible;
      row.style.order = String(
        Number(row.dataset[state.order === 'release' ? 'release' : 'chrono'] ?? '0'),
      );

      if (!visible) continue;
      shown += 1;
      if (watched.has(row.dataset.titleId!)) watchedShown += 1;
      else minutesLeft += Number(row.dataset.runtime ?? '0');
    }

    numberAndMarkNext();
    report(shown, watchedShown, minutesLeft);
    if (empty) empty.hidden = shown > 0;
    // A screenshot taken before this point shows every row, filtered or not,
    // which reads as a broken filter. Tooling waits for this rather than for
    // a guessed number of milliseconds.
    shelf.dataset.ready = 'true';
  }

  /**
   * Numbers the visible rows and marks the next one.
   *
   * The number is the reader's position in the run they have chosen, not the
   * title's absolute place in release history. With a filter on, an absolute
   * number skips, and a watch order whose steps go 3, 4, 5, 9 is telling the
   * reader about the catalogue instead of about their evening.
   */
  function numberAndMarkNext(): void {
    const ordered = rows
      .filter((row) => !row.hidden)
      .sort((a, b) => Number(a.style.order) - Number(b.style.order));

    for (const row of rows) row.dataset.next = 'false';

    let found = false;
    ordered.forEach((row, index) => {
      const set = row.querySelector<HTMLElement>('.spine-set');
      if (set) set.textContent = String(index + 1);

      if (!found && !watched.has(row.dataset.titleId!)) {
        row.dataset.next = 'true';
        found = true;
      }
    });
  }

  const plural = new Intl.PluralRules(document.documentElement.lang || 'en');

  function report(shown: number, done: number, minutesLeft: number): void {
    if (!tally) return;
    // The count that decides the plural form is the one the sentence is
    // about, which here is how many titles have been watched.
    const form = plural.select(done) === 'one' ? tally.dataset.progressOne : tally.dataset.progressOther;
    const parts = [
      tally.dataset.showing?.replace('{count}', String(shown)).replace('{total}', String(rows.length)),
      form?.replace('{done}', String(done)).replace('{total}', String(shown)),
      minutesLeft > 0
        ? tally.dataset.remaining?.replace('{hours}', String(Math.round(minutesLeft / 60)))
        : shown > 0
          ? tally.dataset.remainingDone
          : '',
    ].filter(Boolean);
    tally.textContent = parts.join('   ');
  }

  function press(group: string, value: string): void {
    for (const button of controls?.querySelectorAll<HTMLButtonElement>(`[data-${group}]`) ?? []) {
      button.setAttribute('aria-pressed', String(button.dataset[group] === value));
    }
  }

  controls?.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
      'button[data-order], button[data-tier], button[data-separate]',
    );
    if (!button) return;

    if (button.dataset.order) {
      state.order = button.dataset.order as Order;
      setOrder(state.order);
      press('order', state.order);
      if (orderHelp) {
        orderHelp.textContent = helpFor(orderHelp, state.order === 'release' ? 'release' : 'chrono');
      }
    } else if (button.dataset.tier) {
      state.depth = Number(button.dataset.tier) as Depth;
      setDepth(state.depth);
      press('tier', String(state.depth));
      if (depthHelp) depthHelp.textContent = helpFor(depthHelp, `d${state.depth}`);
    } else if (button.dataset.separate) {
      state.separate = button.dataset.separate === 'on';
      setSeparate(state.separate);
      press('separate', state.separate ? 'on' : 'off');
    }
    apply();
  });

  filterInput?.addEventListener('input', () => {
    state.query = filterInput.value.trim().toLowerCase();
    apply();
  });

  document.querySelector('[data-clear-filter]')?.addEventListener('click', () => {
    if (filterInput) filterInput.value = '';
    state.query = '';
    apply();
    filterInput?.focus();
  });

  shelf.addEventListener('click', (event) => {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-watch-toggle]');
    const row = button?.closest<HTMLElement>('[data-title-id]');
    if (!button || !row) return;

    const id = row.dataset.titleId!;
    const now = toggleWatched(id);
    if (now) watched.add(id);
    else watched.delete(id);

    row.dataset.watched = String(now);
    button.setAttribute('aria-pressed', String(now));
    button.setAttribute('aria-label', now ? labels.unmark : labels.mark);
    apply();
  });

  /* Restore what the reader chose last time before the first paint of the
     list, so they never have to set it twice. */
  press('order', state.order);
  press('tier', String(state.depth));
  press('separate', state.separate ? 'on' : 'off');
  if (orderHelp) orderHelp.textContent = helpFor(orderHelp, state.order === 'release' ? 'release' : 'chrono');
  if (depthHelp) depthHelp.textContent = helpFor(depthHelp, `d${state.depth}`);
  for (const row of rows) {
    const isWatched = watched.has(row.dataset.titleId!);
    row.dataset.watched = String(isWatched);
    const button = row.querySelector<HTMLButtonElement>('[data-watch-toggle]');
    button?.setAttribute('aria-pressed', String(isWatched));
    button?.setAttribute('aria-label', isWatched ? labels.unmark : labels.mark);
  }
  apply();
}

/* --- The map of connections ---------------------------------------- */

/*
 * Enhancement only. The node labels already appear on hover and on keyboard
 * focus without this, because that part is CSS. What this adds is the thing
 * CSS cannot express: lighting up the specific curves that touch the node
 * the reader is pointing at, and dimming the rest.
 */
const map = document.querySelector<SVGSVGElement>('.map-svg');

if (map) {
  const links = [...map.querySelectorAll<SVGPathElement>('.map-link')];

  const clear = (): void => {
    map.removeAttribute('data-focused');
    for (const link of links) link.removeAttribute('data-lit');
  };

  const light = (id: string): void => {
    map.setAttribute('data-focused', id);
    for (const link of links) {
      if (link.dataset.from === id || link.dataset.to === id) link.setAttribute('data-lit', 'true');
      else link.removeAttribute('data-lit');
    }
  };

  for (const node of map.querySelectorAll<SVGAElement>('[data-node]')) {
    const id = node.dataset.node;
    if (!id) continue;
    node.addEventListener('pointerenter', () => light(id));
    node.addEventListener('focus', () => light(id));
    node.addEventListener('pointerleave', clear);
    node.addEventListener('blur', clear);
  }

  map.addEventListener('pointerleave', clear);
}
