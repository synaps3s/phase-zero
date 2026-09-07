import { visit } from 'unist-util-visit';
import { readFileSync, readdirSync, existsSync } from 'node:fs';

/**
 * Links the first mention of a glossary term to its entry.
 *
 * This is what "explain, do not list" means in practice: a reader who hits
 * "multiverse" in the middle of a film's page can follow it instead of
 * having to know they should go looking.
 *
 * Only the first occurrence in a document is linked. Marking every one turns
 * a paragraph into a field of links and stops meaning anything.
 *
 * Terms come from the glossary of the language being rendered, so the Italian
 * page links "multiverso" and the English one links "multiverse", with no
 * shared list to keep in sync.
 */

const cache = new Map();

function termsFor(language) {
  if (cache.has(language)) return cache.get(language);

  const directory = `content/${language}/glossary`;
  const terms = [];

  if (existsSync(directory)) {
    for (const file of readdirSync(directory).filter((name) => name.endsWith('.md'))) {
      const id = file.replace(/\.md$/, '');
      const source = readFileSync(`${directory}/${file}`, 'utf8');
      const frontmatter = /^---\n([\s\S]*?)\n---/.exec(source);
      if (!frontmatter) continue;

      const title = /^title:\s*(.+)$/m.exec(frontmatter[1]);
      const aliases = /^aliases:\s*\[(.*?)\]$/m.exec(frontmatter[1]);

      const names = [];
      if (title) names.push(title[1].trim().replace(/^["']|["']$/g, ''));
      if (aliases) {
        for (const alias of aliases[1].split(',')) {
          const cleaned = alias.trim().replace(/^["']|["']$/g, '');
          if (cleaned) names.push(cleaned);
        }
      }
      for (const name of names) terms.push({ id, name });
    }
  }

  // Longest first, so "Time Variance Authority" wins over a shorter term
  // sitting inside it.
  terms.sort((a, b) => b.name.length - a.name.length);
  cache.set(language, terms);
  return terms;
}

function languageOf(file) {
  const path = file?.path ?? file?.history?.[0] ?? '';
  const match = /[/\\]content[/\\]([^/\\]+)[/\\]/.exec(path);
  return match ? match[1] : null;
}

/** The page this file belongs to, so a term never links to its own entry. */
function ownGlossaryId(file) {
  const path = file?.path ?? file?.history?.[0] ?? '';
  const match = /[/\\]glossary[/\\]([^/\\]+)\.md$/.exec(path);
  return match ? match[1] : null;
}

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

export default function remarkGlossary() {
  return (tree, file) => {
    const language = languageOf(file);
    if (!language) return;

    const own = ownGlossaryId(file);
    const terms = termsFor(language).filter((term) => term.id !== own);
    if (terms.length === 0) return;

    const used = new Set();

    visit(tree, 'text', (node, index, parent) => {
      if (!parent || index === null) return;
      // Never annotate inside something that is already a link, a heading, or
      // code: the first would nest links, the others would be noise.
      if (['link', 'linkReference', 'heading', 'inlineCode', 'code'].includes(parent.type)) return;

      for (const term of terms) {
        if (used.has(term.id)) continue;

        const pattern = new RegExp(`\\b${escapeRegExp(term.name)}\\b`, 'i');
        const match = pattern.exec(node.value);
        if (!match) continue;

        used.add(term.id);

        const before = node.value.slice(0, match.index);
        const hit = node.value.slice(match.index, match.index + match[0].length);
        const after = node.value.slice(match.index + match[0].length);

        const replacement = [];
        if (before) replacement.push({ type: 'text', value: before });
        replacement.push({
          type: 'link',
          url: `/${language}/glossary#${term.id}`,
          data: { hProperties: { className: ['term-link'] } },
          children: [{ type: 'text', value: hit }],
        });
        if (after) replacement.push({ type: 'text', value: after });

        parent.children.splice(index, 1, ...replacement);
        // The remaining text moved into a new node; the visitor will reach it.
        return index + replacement.length - 1;
      }
    });
  };
}
