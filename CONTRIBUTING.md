# Contributing to Phase Zero

Thank you for being here. This guide is long because the project cares about
accuracy, not because contributing is hard. Fixing a typo takes two minutes and
requires nothing but a GitHub account.

If you only read one file, read `CLAUDE.md`. It is the short version.

## Ways to help, from smallest to largest

1. **Report something wrong.** Open an issue. A wrong date you noticed is a real
   contribution, even if you never touch the code.
2. **Fix a fact.** Edit one YAML file, add the source, open a pull request.
3. **Improve the writing.** Make a synopsis clearer for someone starting from
   nothing, or add the depth an expert was looking for.
4. **Translate.** Copy a file from `content/en/`, translate the sentences, open
   a pull request. No coding involved.
5. **Add a language.** One entry in a config file and a new directory.
6. **Add a title or a character.** The full flow, described below.
7. **Work on the site itself.** Design, accessibility, performance, tooling.

## Setting up

You need Node 20 or later. The repository pins a version in `.nvmrc`.

```sh
git clone https://github.com/synaps3s/phase-zero.git
cd phase-zero
nvm use
npm install
npm run dev
```

The site is then at http://localhost:4321.

To translate or fix a fact you do not need any of this. You can edit files
directly on GitHub and open a pull request from the browser.

## The five rules

These are checked automatically. A pull request that breaks one cannot be merged.

### 1. No emoji

Anywhere in the repository, including commit messages and pull request
descriptions. Icons in the interface are SVG drawn in this repository.

### 2. No em dash

The character U+2014 is rejected. Use a comma, a colon, or parentheses, or split
the sentence. An en dash (U+2013) is allowed only between digits, as in
2008–2012.

This is a house style decision and it is applied without exceptions, which is
what makes it possible to check it with a script instead of arguing about it.

### 3. English in code, other languages only in content

File names, identifiers, comments, commit messages and documentation are in
English so that a contributor anywhere in the world can read the repository.
Italian, French or any other language appears only inside `content/<code>/`.

### 4. Every fact carries its source

This is the rule that makes Phase Zero worth trusting. See below.

### 5. No third-party images

No posters, no studio logos, no promotional art, no screenshots. Those are
copyrighted, and hosting them would put the project at risk and force anyone who
forks it to inherit that risk.

Everything you see is vector artwork generated from the data in this repository.
This is also why the site looks like itself and not like every other Marvel site.

## The sourcing rule

Every file in `data/` ends with a block like this:

```yaml
sources:
  - url: https://www.marvel.com/movies/iron-man
    title: Iron Man, Marvel.com
    accessed: 2026-09-07
verified: 2026-09-07
```

`sources` lists where the facts came from. `accessed` is the day someone
actually opened that URL. `verified` is the day someone last checked that the
entry still matches those sources.

**Open the source before you write the fact.** Every time. Not from memory,
however sure you are. This is the rule the whole project rests on, and it was
broken here before it was written down: the first six entries were drafted from
recall with correct-looking links attached, and two of the six runtimes turned
out to be wrong by a minute. Famous facts, total confidence, still wrong.

If you change a fact, update the source and the `verified` date in the same
commit. CI will tell you if you forgot, and `npm run check:links` will tell you
if a source URL has gone dead.

**What counts as a source**, roughly in order of preference:

1. The film or series itself, cited by scene or episode.
2. Official material: Marvel.com, Disney+, a studio press release.
3. Reference works with editorial standards and their own citations, such as
   Wikipedia when the specific claim is itself sourced there.
4. Established trade press: Variety, The Hollywood Reporter, Deadline.

**What does not count**: fan wikis without citations, social media posts from
accounts that are not the studio, aggregator sites, and "everyone knows this".

**When sources disagree**, do not pick a winner silently. Record both, and
explain the disagreement in a `:::detail` block. Contradictions in this material
are real and interesting, and hiding them makes the project less useful to the
readers who care most.

## Writing for two readers at once

Every page is read by someone who has seen nothing and someone who has seen
everything. Do not choose between them. Use the layers.

**`oneLine`** in the frontmatter is for the newcomer. One sentence. No jargon,
no character names they have not met. Someone who reads only this should come
away with a correct impression, not a vague one.

**The body** is the normal read. Assume curiosity, not knowledge. Explain a term
the first time it appears and then treat it as known.

**`:::detail`** is for the expert. Collapsed by default. Production history,
continuity problems, retcons, contradictions, the exact reason a date is odd.
Never put information here that the rest of the page depends on.

**`:::spoiler`** is protection, not depth. It hides what happens. A block can be
both a spoiler and a detail.

```markdown
:::spoiler{level="major" from="avengers-endgame"}
Text that reveals a major plot point.
:::

:::detail{title="Continuity note"}
Text an expert wants and a newcomer can skip.
:::
```

Do not write section headings such as `## Synopsis` into content files. The
template renders headings from `ui.json`, so that translators translate
sentences and never structure.

## A gotcha worth knowing

A value containing a colon has to be quoted, in YAML frontmatter and in data
files alike:

```yaml
title: "Captain America: The Winter Soldier"
```

Without the quotes, YAML reads everything after the colon as a nested key and
the file fails to parse. This has caught this project three times. The build
catches it, which is why `npm run validate` builds the site rather than only
type-checking it.

## Adding a title

1. Pick an id: lowercase, hyphenated, stable, derived from the English title.
   `avengers-endgame`, not `Avengers_Endgame` or `endgame`.
2. Create `data/titles/<id>.yml`. Copy an existing file as a starting point.
3. Create `content/en/titles/<id>.md`. English is required, because it is the
   fallback every other language relies on.
4. Add other languages if you can. Missing translations are fine.
5. Run `npm run validate`.
6. Open a pull request describing what you added and where the facts came from.

## Adding or working on a language

To add a language, add an entry to `config/languages.json`:

```json
{ "code": "fr", "name": "French", "endonym": "Francais", "dir": "ltr" }
```

Then create `content/fr/` and start with `ui.json`, which is what makes the
interface usable. Content can follow at any pace.

Nothing breaks while a language is incomplete. Missing pages fall back to
English and show a notice with a direct link to translate that exact file. Every
gap is an invitation, not an error.

You never need to modify code to add a language. If it looks like you do, that
is a bug in the code and the right fix is to report it.

## Before you open a pull request

```sh
npm run validate
```

This runs the text lint, the translation report, the source check and the type
check. CI runs exactly the same commands.

## Commit messages

Plain English, imperative, with a short prefix:

```
add: shang-chi title entry
fix: correct release date for thunderbolts
docs: clarify the sourcing rule
i18n: italian translations for phase four
style: adjust timeline spacing on narrow screens
```

No emoji, no em dash.

## How review works

Pull requests are reviewed against the rules in this file, not against taste.

A factual change is reviewed by checking the source, which is why the source is
mandatory: it makes review objective, and it means a reviewer does not have to
be a bigger expert than the contributor.

A writing change is reviewed by asking whether it still works for both readers.

Expect questions. They are not objections.

## Licensing your contribution

By contributing you agree to license your work under MIT for code and
CC BY-SA 4.0 for content, as described in `LICENSE` and `LICENSE-CONTENT`. You
keep the copyright on what you wrote.
