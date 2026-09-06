# Working on Phase Zero

This file is read automatically by Claude Code and other agents that support it.
If you are a human, read it anyway. It is shorter than CONTRIBUTING.md and it
tells you the things that will get a pull request rejected.

## What this project is

Phase Zero is an open, multilingual guide to the Marvel cinematic universes:
the Marvel Cinematic Universe plus the connected non-Marvel-Studios universes
(the Fox X-Men and Deadpool films, and Sony's Spider-Man and Venom films).

It exists for two people at once, and this is the hardest constraint in the
project. One has never seen a single film and wants to know where to start. The
other has seen everything twice and wants to know why a specific date in a
specific series contradicts a line of dialogue. Both are reading the same page.
Writing only for one of them is the most common way to make this project worse.

## Absolute rules

These are enforced by CI. A pull request that breaks them cannot be merged.

1. **No emoji.** Anywhere. Not in content, not in code, not in commit messages,
   not in pull request descriptions. Icons are drawn as SVG.
2. **No em dash.** The character U+2014 is banned. Rewrite the sentence, or use
   a comma, a colon, or parentheses. An en dash (U+2013) is allowed only between
   digits, as in 2008–2012.
3. **English everywhere in code.** File names, variable names, function names,
   comments, commit messages, branch names, documentation. The only place Italian
   or any other language appears is inside `content/<code>/`.
4. **Open the source before you write the fact. Every time, without
   exception.** Not "recall it and attach a plausible link". Fetch the page,
   read the value off it, then write it down. Recall is not evidence, and
   confidence is not evidence.

   This rule exists because it was already broken once here. The first six
   title entries in this repository were written from memory by a model that
   was sure of all of them, with real source URLs attached that were never
   opened. Checking them found two wrong runtimes. The facts were famous, the
   model was confident, and it was still wrong twice out of six.

   The `accessed` field is a statement that someone actually opened that URL on
   that day. Writing it without opening the page puts a false claim inside the
   one field the project's credibility rests on. If you cannot open a source,
   do not write the claim.
5. **No third-party images.** No posters, no logos, no promotional art, no
   screenshots. The visual identity is built from vector artwork generated in
   this repository. This is a legal boundary, not a stylistic preference.

## Verifying a fact

The workflow is the same whether you are a person or an agent:

1. Fetch the source. Actually retrieve the page.
2. Read the specific value off it. Not the summary, the value.
3. Write the value, the URL, and today's date as `accessed`.
4. If two sources disagree, record both and explain the disagreement in a
   `:::detail` block. Do not silently pick a winner.
5. If no source can be retrieved, leave the field out and say so in the pull
   request. A visible gap is worth more than a confident guess.

`npm run check:links` confirms every source URL still resolves. It cannot
confirm the page says what your entry claims, which is the part that is on you.

## Where things go

```
config/     languages and site settings
data/       facts, one file per entity, no language
content/    prose, one directory per language
src/        code, no hardcoded text of any kind
scripts/    validation used by CI
```

The split between `data/` and `content/` is the backbone of the project.

**`data/` holds what does not change between languages.** Release dates,
runtimes, phase numbers, chronological order, relationships between entries,
actor names. Written once, used by every language.

**`content/<code>/` holds what has to be translated.** Synopses, biographies,
glossary definitions, guides, interface strings.

If you find yourself writing a date inside a Markdown file, or a sentence inside
a YAML file, you are on the wrong side of that line.

**One file per entity.** One film is one file. One character is one file. This
is deliberate: it means two contributors editing two different films never
collide, and a reviewer can see exactly what changed. Never merge entries back
into a single large file.

## Writing for both audiences at once

Every prose entry is layered. Use the layers instead of picking an audience.

- **`oneLine`** in the frontmatter. One sentence, no jargon, no names the reader
  has not met yet. Someone who reads only this sentence should not be misled.
- **The body.** The normal read. Assume curiosity, not knowledge. The first time
  a term of art appears, it is explained or linked to the glossary.
- **`:::detail`** blocks. Collapsed by default. Production history, continuity
  problems, retcons, disagreements between sources, the things a newcomer does
  not need and an expert came for. Never put load-bearing information here.
- **`:::spoiler`** blocks. Also collapsed, but for a different reason: they
  protect the reader from the plot rather than from depth. A block can be both.

Section headings are rendered by the template from `ui.json`. Do not write
headings like `## Synopsis` into content files, or every translator will have to
translate the structure as well as the text.

## Tone

Write like a well informed friend explaining something they love, to someone
they respect. Warm, plain, specific.

Avoid: hype, superlatives, "iconic", "epic", "game-changing", fan shorthand used
without explanation, and the assumption that the reader already agrees with you.

Avoid the opposite failure too. Do not over-explain to the point of being
condescending. If a term is explained once, it stays explained.

Be precise about uncertainty. "Marvel has not confirmed a release date" is
useful. "Coming soon" is not. When sources disagree, say so and cite both. That
disagreement is often the most interesting thing on the page.

## Adding a title

1. Create `data/titles/<id>.yml` with the facts and at least one source.
2. Create `content/en/titles/<id>.md` with the prose. English is required.
3. Add other languages if you can. If you cannot, the site falls back to English
   and shows a link inviting someone to translate it. That is a working state,
   not a broken one.
4. Run `npm run validate`.

## Adding a language

1. Add an entry to `config/languages.json`.
2. Create `content/<code>/` and translate `ui.json` first, since that is what
   makes the interface usable.
3. Translate content at your own pace. Anything missing falls back to English.

You do not need to touch a single line of code to add a language. If you think
you do, something is wrong with the code, and that is the bug to fix.

## Before you open a pull request

```sh
npm run validate
```

This runs the text lint, the translation report, the source check and the type
check. CI runs the same thing, so if it passes locally it will pass there.

## Progress tracking

Readers can mark a title as watched. It is stored in the browser with
localStorage and nowhere else.

Anything that touches this must follow these rules:

- It never leaves the browser. No network request carries it, ever.
- The page renders correctly before stored values are read. Storage being empty,
  unavailable or blocked is a normal state, not an error.
- Every read and write is wrapped in try/catch. Some browsers throw on access
  rather than returning null, including during preview and thumbnail rendering.
- It is an enhancement and never a requirement. Every page is complete and
  useful with storage switched off.
- The stored value is versioned and small, so a value written by an older visit
  can be migrated instead of thrown away.
- Progress moves between devices through an explicit export and import of a
  small file. Never by sending it somewhere.

## Things that are deliberately not here

Do not add them without opening an issue first.

- User accounts, login, passwords. The site is fully static and public.
- Any server-side storage of what a reader has watched.
- Analytics that identify individuals, and any third-party script that is not
  strictly required to render the page.
- A backend. If a feature needs a server, it needs a discussion first.

## Commit conventions

Commit messages are plain English, imperative mood, lowercase after the prefix:

```
add: black widow title entry
fix: correct runtime for eternals
docs: explain the spoiler policy
i18n: italian translation for phase one titles
```

No emoji. No em dash.
