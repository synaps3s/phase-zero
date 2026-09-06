# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro 7 (TypeScript), fully static output, deployed to Cloudflare Pages through
GitHub Actions. Content is authored as YAML, JSON and Markdown and validated with
zod at build time. No backend, no database, no server-side state. The foundation
is already built in this repository; the stack is settled, not open.

## Users

Two audiences reading the same page at the same time. This is the defining
constraint of the product, not a nice-to-have.

**Newcomers** who have never seen any of this material and are looking at more
than a hundred and twenty titles with no idea where the entrance is. They want to
be told where to start, in what order, and what they can skip.

**Experts** who have seen everything and arrive with a specific question: why one
release date contradicts another, which source supports a claim, what happened to
a plot thread that was set up and dropped.

Both are global. English is the source language, Italian is complete, and any
other language can be added by a contributor without touching code.

A third group matters structurally: **contributors**, who may be developers,
translators, or simply people who noticed a wrong date. The project only works if
someone who has never opened a pull request can fix a fact.

## Product Purpose

Explain the Marvel cinematic universes to someone starting from nothing, without
being useless to someone who knows them completely.

Not a watch-order list. Lists already exist and they answer one question. This
answers the questions underneath it: why a character becomes who they are, how
separate productions ended up connected, what "multiverse" actually means in
practice, which threads were resolved and which were quietly abandoned.

Success means a newcomer can work through the material without getting lost, and
an expert finds the site is right about the detail they came to check.

## Positioning

Three things a neighboring site could not truthfully copy without rebuilding
itself around them.

**Every fact carries its source and the date a human last checked it.** This is
enforced by the build, not by good intentions. It makes the project checkable
rather than merely confident, and it makes review objective: a maintainer does
not have to know more than a contributor, only whether the source says what the
entry says.

**Layered for two audiences at once.** A plain sentence for the newcomer, a
normal read in the middle, collapsible depth for the expert, and separate
collapsible protection for spoilers. Sites usually pick an audience. This one
refuses to.

**Genuinely multilingual and genuinely open.** Facts are stored once and prose
per language, so a translator never edits a date and a date correction never has
to be repeated. A missing translation falls back and invites, rather than
breaking.

## Operating Context

**Phone and desktop are both primary, and neither is a reduction of the other.**
Someone arriving from a search engine reads a single entry on a phone, often with
a television already on. Someone planning a run through the material opens the
timeline on a desktop and wants to see structure that cannot fit on a phone.
Views that carry real structure have to be designed twice rather than shrunk.

Reading happens over months, not in one session. People leave and come back, and
the site has to help them remember where they were.

Preferences a reader sets are remembered in their browser so they never have to
set them twice: which titles they have watched, how much of the catalogue they
want to see, and whether they want a light theme, a dark theme, or whatever their
system is set to. All of it stays local, is never sent anywhere, and moves
between devices only through an explicit export and import.

## Capabilities and Constraints

**Catalogue scope.** All live-action Marvel cinema, which is wider than the
connected universes alone. It covers the Marvel Cinematic Universe, the Fox
X-Men and Deadpool films, the Sony Spider-Man and Venom films, and the older or
unconnected adaptations such as Blade, the 2005 Fantastic Four, Ghost Rider,
Elektra, Daredevil, the Punisher films and Howard the Duck.

Titles outside the shared continuity are **included and clearly marked as
outside, never omitted**. The reason is product truth rather than completeness
for its own sake: characters and performers from those films keep re-entering the
connected ones, so the relationship between a separate film and the main story is
itself something the guide has to explain. Animated adaptations are a planned
later expansion, so nothing in the model may assume live action.

**Facts are researched, never assumed.** The wider the catalogue gets, the more
this matters. An entry without a source does not ship.

**Named sets.** Catalogues of the named variants of a thing, each entry
explained rather than merely listed: the Iron Man armours by mark, Spider-Man's
suits, the forms Hulk takes, the Infinity Stones, Thor's weapons, Doctor
Strange's relics. This is material readers actively search for and rarely find
explained well in one place, and it is where the expert audience is best served.
Each set belongs to a character or a franchise, and each entry carries its own
first appearance and sources like any other fact in the project.

**Watch paths.** Curated, permanent, composable routes through the catalogue,
such as everything needed before a specific upcoming film, or one character's
story on its own. They are defined as data so that new ones can be added later
without rewriting anything. They are not dated posts and they are not meant to
expire.

**Ordering and depth.** The catalogue can be ordered by release or by in-story
chronology, and filtered by how complete a run the reader wants. The chosen
setting persists in the browser.

**Progress.** Readers can mark titles as watched. Stored in localStorage only,
never transmitted, with explicit export and import to move between devices.

**Theme.** Light, dark, or follow the system. The reader's choice is remembered.

**No third-party imagery of any kind.** No posters, no studio logos, no
promotional art, no screenshots. These are copyrighted and hosting them would
transfer risk to everyone who forks the project. The entire visual identity has
to be generated vector artwork derived from the data in the repository. This is a
legal boundary and is not negotiable for aesthetic reasons.

**House style, enforced by CI.** No emoji anywhere, ever. No em dash; an en dash
is permitted only between digits. All code, comments, identifiers and commit
messages in English. No text hardcoded in components: every string comes from the
per-language interface file.

**Fully static and public.** No accounts, no login, no server-side storage of
anything a reader does, no analytics that identify individuals, no third-party
script that is not required to draw the page.

## Brand Commitments

- The product is called **Phase Zero**. The name refers to the point before you
  have started, which is the reader it is built for.
- Tagline: "Start from nothing. Understand everything." In Italian: "Parti da
  zero. Capisci tutto."
- Voice: a well informed friend explaining something they love to someone they
  respect. Warm, plain, specific. No hype, no superlatives, no fan shorthand used
  without explanation, and no condescension in the other direction.
- Precise about uncertainty. When sources disagree, the disagreement is shown
  rather than resolved silently.
- Unofficial and independent. The project must never imply affiliation with or
  endorsement by Marvel Studios, The Walt Disney Company, 20th Century Studios or
  Sony Pictures, and says so plainly in the footer of every page.
- Code is MIT. Content is CC BY-SA 4.0. Both are already committed.

## Evidence on Hand

- A working foundation in this repository: content schemas, the two-language
  pipeline with tested fallback, three validation scripts, CI and deploy
  workflows, and Iron Man plus Tony Stark as complete worked examples in English
  and Italian.
- A recovered dataset from an earlier private project at
  `/Users/davide/car/timelinesacra`, holding 126 titles and 101 characters with
  Italian prose, narrative-line metadata with contrast-checked colors, a
  glossary, and actor cross-references. It is a starting point for migration and
  expansion, not a finished source: it predates the wider catalogue scope and its
  facts still need sources attached before they can ship.
- No imagery of any kind exists or may be created from third-party material.
  There are no photographs, posters or logos in this project and there never will
  be.
- Nothing in the catalogue may be invented. Where a fact cannot be sourced, the
  gap is recorded rather than filled.

## Product Principles

1. **Explain, do not list.** Every feature has to reduce the disorientation of
   someone starting from zero. Context before order, why before what.
2. **Never make the reader choose which audience they are.** Depth is layered on
   the page, not split across separate sites or separate modes.
3. **Checkable beats confident.** A sourced fact with a visible verification date
   is worth more than a fluent paragraph, and an honest gap is worth more than a
   plausible guess.
4. **Contribution is a product feature.** If a translator, a fact-checker or a
   first-time contributor cannot act without help, that is a defect in the
   project and not in the person.
5. **The identity is generated, never borrowed.** What the site looks like is
   built from its own data, which is both a legal necessity and the reason it
   will not look like every other site about this material.

## Accessibility & Inclusion

- WCAG 2.2 AA as the working standard for the public site, with text contrast
  checked in every theme rather than only in the one the designer used.
- Everything usable by keyboard, including the collapsible detail and spoiler
  blocks, the ordering controls, and the watched markers, with visible focus.
- Respect `prefers-reduced-motion` and `prefers-color-scheme`.
- Every page has to be complete and readable with JavaScript disabled. Progress
  marking and theme switching are enhancements layered on top, never the means of
  reaching the content.
- Language is declared per page with correct `lang` and `dir`, and the layout
  must survive translations that run substantially longer than English.
