import { visit } from 'unist-util-visit';
import { readFileSync } from 'node:fs';

/**
 * Turns the two content layers into real disclosure elements.
 *
 *   :::detail{title="Continuity note"}   depth an expert came for
 *   :::spoiler{level="major"}            protection from the plot
 *
 * Both are closed by default and both are ordinary <details>, so they work
 * with the keyboard, with find-in-page in browsers that support it, and
 * with JavaScript switched off.
 *
 * The labels are taken from the language of the file being rendered, which
 * is the first segment under content/. Authors never write the words
 * "Details" or "Spoiler" into a content file, so translators translate
 * sentences and never structure.
 */

const stringCache = new Map();

function stringsFor(language) {
  if (!stringCache.has(language)) {
    try {
      stringCache.set(language, JSON.parse(readFileSync(`content/${language}/ui.json`, 'utf8')));
    } catch {
      stringCache.set(language, {});
    }
  }
  return stringCache.get(language);
}

function languageOf(file) {
  const path = file?.path ?? file?.history?.[0] ?? '';
  const match = /[/\\]content[/\\]([^/\\]+)[/\\]/.exec(path);
  return match ? match[1] : 'en';
}

const ARROW =
  '<svg class="layer-arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" ' +
  'stroke-width="2" aria-hidden="true"><path d="M3 6l5 5 5-5" stroke-linecap="square"/></svg>';

export default function remarkLayers() {
  return (tree, file) => {
    const language = languageOf(file);
    const strings = stringsFor(language);
    const fallback = stringsFor('en');
    const t = (key) => strings[key] ?? fallback[key] ?? key;

    visit(tree, 'containerDirective', (node) => {
      const kind = node.name;
      if (kind !== 'detail' && kind !== 'spoiler') return;

      const attributes = node.attributes ?? {};
      const isSpoiler = kind === 'spoiler';

      const kindLabel = isSpoiler
        ? t(attributes.level === 'major' ? 'spoiler.majorWarning' : 'spoiler.minorWarning')
        : t('detail.show');

      // A detail block names what is behind it; a spoiler deliberately does
      // not, because naming it is often the spoiler.
      const title = isSpoiler ? '' : (attributes.title ?? '');

      const summary = {
        type: 'paragraph',
        data: { hName: 'summary' },
        children: [
          {
            type: 'emphasis',
            data: { hName: 'span', hProperties: { className: ['layer-kind'] } },
            children: [{ type: 'text', value: kindLabel }],
          },
          ...(title
            ? [
                {
                  type: 'emphasis',
                  data: { hName: 'span', hProperties: { className: ['layer-name'] } },
                  children: [{ type: 'text', value: title }],
                },
              ]
            : []),
          { type: 'html', value: ARROW },
        ],
      };

      const body = {
        type: 'paragraph',
        data: { hName: 'div', hProperties: { className: ['layer-body'] } },
        children: node.children,
      };

      node.data = {
        hName: 'details',
        hProperties: {
          className: ['layer'],
          'data-layer': kind,
          ...(isSpoiler && attributes.from ? { 'data-spoils': attributes.from } : {}),
        },
      };
      node.children = [summary, body];
    });
  };
}
