---
name: Phase Zero
description: A navigable void where colour classifies, amber means watched, and every page reads without JavaScript.
colors:
  void: "#05080f"
  panel: "rgba(15, 22, 37, 0.66)"
  panel-solid: "#0e1626"
  hairline: "rgba(176, 199, 236, 0.14)"
  hairline-strong: "rgba(176, 199, 236, 0.28)"
  core: "#eef3fb"
  ink: "#dbe4f2"
  ink-soft: "#a3b4cf"
  ink-faint: "#8395b3"
  livery-infinity: "#e0a13c"
  livery-multiverse: "#b07be8"
  livery-next: "#45c6c0"
  livery-fox: "#6ea8e6"
  livery-sony: "#ec5f93"
  livery-unbound: "#8fa3b8"
  tint-blue: "#6fc3f5"
  tint-yellow: "#f2d14a"
  tint-red: "#f2727e"
  tint-purple: "#b98cf0"
  tint-green: "#57d6a0"
  tint-orange: "#f79e52"
  tint-silver: "#b6c2d4"
  watched: "#ffc47a"
  watched-glow: "rgba(255, 196, 122, 0.42)"
  watched-soft: "rgba(255, 196, 122, 0.13)"
  day-void: "#f5f6f8"
  day-panel: "rgba(255, 255, 255, 0.78)"
  day-panel-solid: "#ffffff"
  day-hairline: "rgba(24, 34, 56, 0.14)"
  day-hairline-strong: "rgba(24, 34, 56, 0.3)"
  day-core: "#0c0f16"
  day-ink: "#12151c"
  day-ink-soft: "#3f4855"
  day-ink-faint: "#5b6474"
  day-livery-infinity: "#8a5a12"
  day-livery-multiverse: "#6b3fa8"
  day-livery-next: "#146b66"
  day-livery-fox: "#26578f"
  day-livery-sony: "#a82b57"
  day-livery-unbound: "#4a5866"
  day-tint-blue: "#125e8a"
  day-tint-yellow: "#7a5a0b"
  day-tint-red: "#a32330"
  day-tint-purple: "#5b3399"
  day-tint-green: "#0e6b4c"
  day-tint-orange: "#8a4b10"
  day-tint-silver: "#4a5666"
  day-watched: "#8a5a12"
typography:
  plate:
    fontFamily: "'Jost Variable', 'Century Gothic', system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 1.4rem + 5.4vw, 5.2rem)"
    fontWeight: 300
    lineHeight: 1.02
    letterSpacing: "0.015em"
  title:
    fontFamily: "'Jost Variable', 'Century Gothic', system-ui, sans-serif"
    fontSize: "clamp(1.7rem, 1.15rem + 2.4vw, 2.7rem)"
    fontWeight: 300
    lineHeight: 1.12
    letterSpacing: "0.012em"
  head:
    fontFamily: "'Jost Variable', 'Century Gothic', system-ui, sans-serif"
    fontSize: "clamp(1.2rem, 1.05rem + 0.7vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.25
    letterSpacing: "0.01em"
  lede:
    fontFamily: "'Hanken Grotesk Variable', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.05rem, 1rem + 0.35vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "'Hanken Grotesk Variable', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
  data:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    fontFeature: "tnum 1"
  label:
    fontFamily: "'JetBrains Mono Variable', ui-monospace, 'SFMono-Regular', Menlo, monospace"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  none: "0"
spacing:
  s1: "0.25rem"
  s2: "0.5rem"
  s3: "0.75rem"
  s4: "1rem"
  s5: "1.5rem"
  s6: "2rem"
  s7: "3rem"
  s8: "4.5rem"
  s9: "7rem"
  gutter: "clamp(1.25rem, 0.5rem + 3vw, 3.5rem)"
  page: "78rem"
components:
  plate:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.core}"
    rounded: "{rounded.none}"
    padding: "2rem"
    width: "46rem"
  spine:
    backgroundColor: "transparent"
    textColor: "{colors.core}"
    rounded: "{rounded.none}"
    padding: "1rem 1rem 1rem 0"
  spine-watched:
    textColor: "{colors.watched}"
  spine-mark:
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.none}"
    height: "2.25rem"
    width: "2.25rem"
  spine-mark-watched:
    textColor: "{colors.watched}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.core}"
    rounded: "{rounded.none}"
    padding: "0.5rem 0.75rem"
    typography: "{typography.data}"
  switch-button:
    backgroundColor: "transparent"
    textColor: "{colors.ink-faint}"
    rounded: "{rounded.none}"
    padding: "0.45rem 0.72rem"
    typography: "{typography.label}"
  switch-button-pressed:
    backgroundColor: "{colors.watched-soft}"
    textColor: "{colors.watched}"
  search-input:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.core}"
    rounded: "{rounded.none}"
    padding: "0.6rem 0.8rem"
    typography: "{typography.data}"
    width: "26rem"
  onward-link:
    backgroundColor: "transparent"
    textColor: "{colors.watched}"
    rounded: "{rounded.none}"
    padding: "0.75rem 1rem"
  set-card:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.core}"
    rounded: "{rounded.none}"
    padding: "1.5rem"
---

# Design System: Phase Zero

## Overview

**Creative North Star: "The Navigable Void"**

Phase Zero is deep space you can read. There is no page background in the
conventional sense: there is a void, three slow nebula fields that give it a
direction of light, and a drifting particle field in front of them. Everything
else floats. Content does not sit inside boxes stamped onto a canvas; it is lit
by the void, edged by light, and separated by hairlines that are tinted blue
rather than flat grey.

Colour in this system is not decoration and it is not brand. Colour is the
classification. Every saga owns one luminous livery, every franchise steps a
bounded shade within its saga's livery, and that colour follows a title
everywhere it appears: the shelf, the era grid, the map of connections, the
entry page. A reader learns what a thing is before reading a word. Exactly one
colour is exempt from classification. Amber is the single universal state in the
system and it means one thing only: a title you have watched. It never labels a
saga, a franchise, a section or a brand.

Night is the world's true form and it is where the world was designed. Day is a
real second variant, not an inversion: the void becomes paper, the liveries
become the same hues rendered dark enough to be read on paper, and every value
was checked against its own ground rather than assumed to survive the flip. The
whole identity is generated vector work and typography, because it has to be:
there is no imagery of the films in this project and there never will be. The
only mark from outside is the GitHub logo in the colophon, drawn here, pointing
at the repository.

**Key Characteristics:**

- Content floats on a void, lit from behind rather than filled in front.
- Colour classifies; amber states. The two never overlap.
- Zero corner radius everywhere. Nothing in this world is rounded.
- Three faces with strict jobs: a light geometric display, a humanist body, a monospace for data and labels.
- Two grounds, both first class, both numerically contrast checked.
- Every page is complete and readable with JavaScript off.

### The one rounded thing

Every surface in this system has square corners. The character emblem does
not: it carries a 30 percent radius, and its inner edge 13.6 units on a 48
unit frame.

That is deliberate and it is the only exception. The emblem is not chrome, it
is the project's only figurative artwork and its entire answer to having no
photographs. It behaves like an object placed on the page rather than like a
panel the page is made of, and objects are allowed a shape of their own.
Nothing else earns this.

## Colors

A luminous classification palette on a near-black blue void, with a single amber
state colour and a bounded set of fictional tints.

### Primary

The liveries. Each saga owns one, named in `data/sagas.json`, resolved to a
custom property by `src/lib/livery.ts`, and given its actual colour only in
`src/styles/tokens.css`. Data names a livery; the stylesheet owns what that
colour is. A colour is never written into a data file.

- **Infinity Amber-Gold** (`--livery-infinity`): the Infinity Saga, Phases one to three.
- **Multiverse Violet** (`--livery-multiverse`): the Multiverse Saga, Phases four to six.
- **Next Teal** (`--livery-next`): the sagas that follow, Phase seven onward. Also the accent of the missing-translation notice, which is the one place a livery is used outside classification.
- **Fox Cold Blue** (`--livery-fox`): the Fox X-Men and Deadpool continuity.
- **Sony Magenta-Rose** (`--livery-sony`): the Sony Spider-Man and Venom continuity. Also the colour of a spoiler layer's kind label.
- **Unbound Slate** (`--livery-unbound`): everything outside any shared story. Deliberately the least saturated livery in the set: unbound titles are included and marked, never dressed up and never hidden.

### Secondary

- **Watched Amber** (`--watched`, with `--watched-glow` and `--watched-soft`): the one universal state. A watched title, the wordmark diamond, the focus ring, the caret and accent colour, the selection background, the skip link, the active item in a switch, the current section in the nav, the onward link. If something is glowing amber, the system is saying "you, the reader, did this" or "this is where you are".

### Tertiary

The tints. Some things in the fiction carry a documented colour of their own,
such as the Infinity Stones. A collection piece names a tint in its data and the
stylesheet owns the value: `--tint-blue`, `--tint-yellow`, `--tint-red`,
`--tint-purple`, `--tint-green`, `--tint-orange`, `--tint-silver`. A piece with
no tint falls back to its saga's livery. Tints are for named objects inside the
fiction only. They are never used to classify a title, a saga or a section.

### Neutral

Every token below is referenced by the build. A colour defined and never used
teaches the next contributor a palette that does not exist, so an unused token
is deleted rather than carried.

- **Void** (`--void`): the ground itself. It is the page background and the stroke colour that separates a map node from its neighbours.
- **Panel** (`--panel`) and **Panel Solid** (`--panel-solid`): translucent glass for plates, cards, inputs and the fallback notice; the solid variant only where transparency would make text unreadable, as behind a map node's label.
- **Hairline** and **Hairline Strong** (`--hairline`, `--hairline-strong`): every divider, border and scrollbar thumb. Both are tinted blue, never neutral grey.
- **Core** (`--core`): headings, titles, and text that must sit at full strength.
- **Ink** (`--ink`): body copy, set on `body`.
- **Ink Soft** (`--ink-soft`): supporting prose, ledes under headings, summary rows.
- **Ink Faint** (`--ink-faint`): metadata, counts, crumbs, legends, placeholders. The dimmest text in the system and still above 4.5:1 on both grounds.

### Named Rules

**The Amber Is Not A Livery Rule.** Amber classifies nothing. It is reserved for
the watched state and for where-you-are signals (focus, current page, pressed
control). Never introduce an amber saga, an amber section colour or an amber
brand accent, because doing so makes the reader's own progress unreadable.

**The Data Names, The Stylesheet Owns Rule.** A hex value never appears in
`data/`, in content, or in a component. Data carries a livery name or a tint
name; `src/styles/tokens.css` is the only file that says what that name looks
like. Adding a saga is a two-line data change plus one token per ground. A
palette change touches no data at all.

**The Bounded Shade Rule.** A franchise does not get its own colour. It gets a
`shade` integer, currently 0 to 4, and `[data-livery]` mixes 7 percent per step
from the saga's base toward the current `--ink`. Mixing toward ink means the
shade ladder raises contrast in both themes instead of lowering it in one. Do
not widen the ladder past the range the contrast check clears, and do not invent
a shade that skips levels: the hue says which saga, the shade narrows it, and
the franchise name printed beside it settles it.

**The Both Grounds Rule.** No colour enters this system until it has been
measured against both `--void` and `--panel-solid` in night and in day. See the
accessibility floor in Do's and Don'ts for the method and the measured minimums.

## Typography

**Display Font:** Jost Variable (with Century Gothic, system-ui)
**Body Font:** Hanken Grotesk Variable (with system-ui, -apple-system)
**Label/Data Font:** JetBrains Mono Variable (with ui-monospace, SF Mono, Menlo)

**Character:** A light geometric display that reads as instrument lettering
rather than as a poster, a humanist grotesque that stays comfortable over long
reading, and a monospace that makes every figure a figure. The display voice is
open and thin at large sizes (weight 300 at night, 350 in day because thin
strokes lose weight on paper) and never heavy or tight.

### Hierarchy

- **Plate** (weight 300 night / 350 day, `clamp(2.6rem, 1.4rem + 5.4vw, 5.2rem)`, line-height 1.02, tracking 0.015em): the one large statement at the top of a page, inside a plate. One per page.
- **Title** (`clamp(1.7rem, 1.15rem + 2.4vw, 2.7rem)`, line-height 1.12): section headings.
- **Head** (`clamp(1.2rem, 1.05rem + 0.7vw, 1.5rem)`, weight 400): spine titles, saga names, set names, piece names, the wordmark, the map title. This is where the display face does most of its work.
- **Lede** (`clamp(1.05rem, 1rem + 0.35vw, 1.2rem)`, line-height 1.5): the sentence under a heading and the opening sentence of an entry or a piece. Body face, not display.
- **Body** (1rem, line-height 1.65, max width 66ch): all prose. Narrow columns use 52ch.
- **Data** (0.875rem, monospace, tabular lining figures): years, runtimes, counts, tallies, source lines, summary rows, the search field.
- **Label** (0.6875rem, monospace, weight 500, tracking 0.16em, uppercase): switches, crumbs, franchise names on a spine, map lane names, legends, the NEXT call-out.

### Named Rules

**The Figures Line Up Rule.** Any number the reader might compare down a column
(year, runtime, set number, count) carries the `.figure` utility: monospace with
`tabular-nums lining-nums` and zero tracking. Figures line up in a column or
they are not data.

**The Uppercase Is Monospace Rule.** Uppercase with wide tracking belongs to the
label role in the monospace face. The display face is never set uppercase at
label size, and body prose is never uppercased for emphasis. The two exceptions
already in the build are the wordmark and the section nav, both display face,
uppercase, at their own looser tracking (0.06em and 0.08em).

**The Longer Translation Rule.** Type is sized in `clamp()` and containers wrap
rather than truncate, because Italian runs longer than English and the next
language may run longer still. Never fix a control's width to the English
string, never use `text-overflow: ellipsis` on a translated label, and check any
new layout against the Italian pages before shipping it.

## Layout

One centred column, `--page` at 78rem maximum, with a fluid `--gutter` that runs
from 1.25rem to 3.5rem. The `.page` utility carries both. Full-width regions
escape it with `.bleed` (`width: 100vw; margin-inline: calc(50% - 50vw)`), which
is how a band lights the whole viewport while its content stays in the column.

Vertical rhythm is a nine-step scale (`--s1` 0.25rem through `--s9` 7rem) and
nothing is spaced off the scale. Sections breathe at `--s8` (4.5rem) block
padding, dropping to `--s7` on narrow screens. Prose stacks at `--s4`.

Breakpoints are few and each exists for one structural reason, all in `rem` so
they respond to the reader's own text size:

- **40rem and below**: the spine's leading column narrows from `--s7` to `--s6`, band padding relaxes, plate padding drops to `--s5`.
- **56rem and up**: the section nav leaves the wrapped third row and sits inline in the masthead; timeline controls become a three-column grid; the collections list becomes two columns.
- **60rem and up**: the era grid becomes two columns, with the first saga spanning both so the entrance to the catalogue stays the widest thing on the page.

Phone and desktop are both primary. Views that carry real structure are designed
twice rather than shrunk: the connection map is a horizontally scrollable SVG
with `overscroll-behavior-x: contain` rather than a squeezed diagram.

## Elevation & Depth

Depth here is atmospheric first and material second. The back of every page is a
fixed layer at `z-index: -2` holding three large radial nebula fields over the
void, then a fixed particle canvas at `z-index: -1`. Both are non-interactive
and hidden from assistive technology. Content sits at the default stacking level
and is lifted by real shadow plus a one-pixel inner highlight, not by borrowed
grey.

The nebula's three fields are declared in `src/styles/base.css` with literal
fallback values through `var(--nebula-1, ...)` hooks; the hooks exist so a page
can retune the atmosphere, and nothing in the build currently sets them.

### Shadow Vocabulary

- **Shadow 1** (`0 10px 30px rgba(0, 0, 0, 0.55)` night, `0 10px 26px rgba(16, 24, 40, 0.1)` day): available for modest lift. Both grounds have their own value; the day shadow is a fraction of the night one because paper does not swallow light.
- **Shadow 2** (`0 26px 80px rgba(0, 0, 0, 0.62), 0 4px 14px rgba(0, 0, 0, 0.4)` night): the plate, and only the plate. A deep ambient throw plus a tight contact shadow.
- **Inset Lit** (`inset 0 1px 0 rgba(255, 255, 255, 0.07)` night, `0.9` alpha in day): the top edge of a floating panel catching the light. Always paired with a shadow, never alone.
- **Livery glow** (`0 0 14px -2px var(--livery-glow)` on a spine edge, `0 0 22px -1px var(--watched-glow)` when watched, `0 0 20px -2px` under a collection piece's mark, `0 0 16px -2px` under the wordmark diamond): a coloured light source, not a drop shadow. Zero offset, negative spread, colour from the element itself.

### Named Rules

**The Light Source, Not The Drop Rule.** Coloured shadows in this system are
things glowing, so they have no offset and a negative spread. Neutral shadows
are things floating, so they have real offset and blur. Never give a coloured
shadow an offset, and never render a hard offset shadow with no blur.

**The Glass Is For Floating Rule.** `backdrop-filter: blur(14px)` appears on the
plate alone, because the plate is the one element that genuinely hovers over the
starfield. Cards, the fallback notice and the search field use `--panel` flat
with no blur. Do not add blur to earn importance.

## Shapes

There is no corner radius anywhere in this system. Not on the plate, the cards,
the chips, the switches, the search field, the watched marker or the skip link.
The absence is the form language: rectangles floating in a void read as
instrument panels, and one rounded corner would break it.

Form is carried instead by edge, weight and rotation:

- **Hairline rules** at 1px in `--hairline` separate everything: shelf rows, plate metadata, the masthead, the colophon, disclosure layers, the sources block.
- **Lit edges** at 2px to 3px carry classification. The spine's 3px left edge is the whole shelf metaphor. A saga block is edged 2px inline-start in its livery. A set card and the plate take their livery on the top border only. The fallback notice takes a 2px teal inline-start edge.
- **Diamonds**: the only recurring geometric motif. A square rotated 45 degrees, glowing, used for the wordmark mark (0.6em) and a collection piece's mark (0.85rem). Both take amber or the piece's own colour.
- **Icons are authored SVG**, stroked with `currentColor` at `stroke-width` 2 to 2.5 with `stroke-linecap: square`, sized in `em` or small `rem` values (0.9em arrow, 1.05rem check). There are three of them in the whole build and that is the point.

## Components

### Plate

The one raised surface. Dark glass, blurred, floating on the starfield, carrying
the single largest sentence on the page. Maximum width 46rem, padding `--s6`
(`--s5` under 40rem), background `--panel`, `backdrop-filter: blur(14px)`, 1px
hairline border with the top border replaced by the livery glow, `--shadow-2`
plus `--inset-lit`. The `.plate-subject` span inside the headline takes the
livery, which is how "Start with Iron Man" says which saga Iron Man belongs to.
When the plate is a link it lifts 4px on hover and focus over `--slow` and its
border warms toward the livery. Metadata sits below a hairline in `--ink-soft`
at data size.

### Spine and Shelf

A shelf is a plain vertical stack of spines with a hairline above and a hairline
under each row. A spine is one title seen edge on: a three-column grid of set
number, body, and watched marker, lit along a 3px left edge in its franchise's
shade. On an unread title that edge is the only colour in the row. Hovering
washes the row with 6 percent livery.

Marking a title watched is the signature moment of the system, and it adds
nothing to the row. The edge it already had turns amber and its glow widens, the
light it was already casting floods rightward as `--watched-soft` scaling from
scaleX(0) to scaleX(1) over `--slow`, the title and the set number turn amber,
and the check inside the marker fades and scales from 0.7 to 1. The whole row
already existed; only its state changed.

The full-row link is the title anchor with an `::after` covering the row, so the
marker button (`z-index: 1`) stays independently clickable. The NEXT call-out is
an inline label boxed in 52 percent livery, rendered by the server so it is
correct with no JavaScript and re-derived by the script as titles are marked.

### Watched Marker

A 2.25rem square button, 1px `--hairline-strong` border, `--ink-faint`, holding
an SVG check at zero opacity. Hover and focus lift it to `--core` with an
`--ink-faint` border. Watched turns border, icon and glow amber. It is a real
`<button>` with `aria-pressed` and a translated `aria-label`, never a bare div.

### Switch

The masthead's language and theme controls and the timeline's order and depth
controls are all one pattern: a hairline-bordered inline row of buttons or links
with hairline dividers between them, label typography, `--ink-faint` at rest,
`--core` on hover. The selected item takes `--watched-soft` behind `--watched`
and is marked `aria-pressed="true"` or `aria-current`. Language switching is
links (it changes the URL); theme and ordering are buttons.

### Chip

A title inside an era block. Inline-flex, `--s2`/`--s3` padding, 1px border at 34
percent livery over an 8 percent livery wash, text in `--core` with the year in
`--ink-faint` at label size. Hover raises the wash to 20 percent and the border
to full livery. Chips are the smallest unit where the colour system is visible
as a field of colour.

### Set Card

A collection entry. `--panel` background, hairline border with the top border at
46 percent livery, `--s5` padding, name in livery at head size, line in
`--ink-soft`, count in `--ink-faint`. Lifts 3px on hover with the top border
warming to 60 percent.

### Search Field

Full width to a 26rem maximum, `--panel` background, 1px hairline, `--core`
text, data typography, `--ink-faint` placeholder. Focus and hover raise the
border to `--hairline-strong`; the global amber focus ring does the rest. There
is no filled button anywhere in the build to pair it with.

### Navigation and Site Frame

The masthead is a wrapping flex row: wordmark (display face, uppercase, 0.06em,
preceded by the amber diamond), section nav, then the language and theme
switches. Under 56rem the section nav drops to a full-width third row above a
hairline via `order: 3`; above 56rem it returns inline with `order: 0`. Section
links are display face, uppercase, `--ink-soft`, hovering to `--core`, with the
current page in amber. The colophon is a hairline-topped block of data-sized
`--ink-faint` text at 52ch.

### Layered Prose (disclosure)

The product's core idea set as part of the page rather than as a widget. A
`:::detail` or `:::spoiler` block in Markdown becomes a native `<details
class="layer">` with a hairline top rule, a summary row in data type, a kind
label in uppercase monospace, an optional name, and a chevron pushed to the end
that rotates 180 degrees when open. A detail block names what is behind it; a
spoiler does not, because naming it is often the spoiler, and its kind label is
rendered in Sony magenta. Because it is a real `<details>` element it opens with
no JavaScript and is keyboard operable for free.

### Connection Map

A wide SVG in a horizontally scrollable region inside a `<details>`. One lane per
story, time running left to right, dotted year rules in `--hairline` with
`--ink-faint` monospace year marks. A lane line is 28 percent livery and its
name is full livery in tracked uppercase monospace at 10px. Nodes are livery
fills with a 2px `--void` stroke, growing to r=9 on hover and focus; focus
restrokes them 3px amber. Links are `--ink-faint` at 0.5 opacity, dropping to
0.28 when the map is hovered and to 0.14 when a node is focused, while that
node's own links go to full opacity in `--core` at 1.6px. Node labels are
`--panel-solid` boxes stroked at 50 percent livery, revealed by `:hover` and
`:focus-visible` in CSS rather than by script, so they work before any
JavaScript loads and for a reader tabbing through. A dashed `--hairline-strong`
divider marks where the shared story stops: it is drawn, not implied.

### Fallback Notice

A missing translation is a working state, so it is announced calmly: `--panel`
background, hairline border, a 2px `--livery-next` inline-start edge, data-sized
`--ink-soft` text at 52ch, and a monospace teal link to the one thing that
resolves it.

### Onward Link

The way forward from the opening shelf. An inline-flex sentence with an arrow,
bordered at 46 percent amber, amber text, display face at 0.04em. Hover fills it
with `--watched-soft`, brings the border to full amber, and pushes the arrow 3px
right. It is a sentence with an arrow rather than a filled button, because the
page is a guide and not a form.

## Do's and Don'ts

### Do:

- **Do derive colour from the data.** Put `data-livery` on the region and set it with `liveryStyle(sagaId, franchiseId)` from `src/lib/livery.ts`. Components read `--livery`, `--livery-veil` and `--livery-glow` and never a fixed colour, which is why one component serves any saga in either theme.
- **Do add a saga in four steps.** Add the entry to `data/sagas.json` with its livery name, add `--livery-<name>` to `:root` in `tokens.css`, add the matching value to both day blocks (`@media (prefers-color-scheme: light)` and `:root[data-theme='light']`), then measure. Adding a franchise is one entry in `data/franchises.json` with a `shade` from 0 to 4. Adding a tint is `--tint-<name>` in all three token blocks plus a `.piece[data-tint='<name>']` rule.
- **Do keep both day blocks identical.** The light palette is written twice on purpose: once for `prefers-color-scheme: light` under `:root:not([data-theme='dark'])`, once for an explicit `:root[data-theme='light']`. A value added to one and not the other produces a theme that is right only by accident. Light, dark and system are all first class.
- **Do verify contrast numerically, in both grounds, before shipping a colour.** The rule: every colour used as text or as a meaningful mark clears WCAG 2.2 AA at 4.5:1 against both `--void` and `--panel-solid`, in night and in day. The method: compute the sRGB relative luminance of both colours and take `(Lmax + 0.05) / (Lmin + 0.05)`. There is no CI check for this, so it is a human step in review. As built, the tightest measurements are night Sony magenta at 6.32:1 on the void and 5.70:1 on panel, day Infinity gold and the day watched amber at 5.47:1 on the void, and the dimmest text role, `--ink-faint`, at 6.60:1 night and 5.52:1 day. Nothing in the palette is below 5.4:1 in either ground; treat 4.5:1 as the floor, not the target.
- **Do use the nine-step spacing scale.** `--s1` through `--s9`, plus `--gutter` and `--page`. An arbitrary rem value in a new component is a defect.
- **Do reach for the right face.** Display for titles and the wordmark, body for anything a person reads in sentences, monospace for figures, labels and machine-ish text. Add `.figure` to any number that lines up in a column.
- **Do let the server render the truth.** Every page must be complete and readable with JavaScript disabled. Theme, watched markers, timeline order and depth, and the separate-universes switch are enhancements stored in localStorage only. The NEXT call-out, the map, and the disclosure layers all work before any script runs.
- **Do use `[hidden]` for hiding, and keep the override.** `base.css` declares `[hidden] { display: none !important; }` because the browser's own rule has the lowest possible specificity and loses to any component that sets its own `display`. This already caused a real bug. Anything hiding a grid or flex element depends on it.
- **Do respect reduced motion and honour the two durations.** `--fast` (160ms) for colour, border and opacity; `--slow` (520ms) for transform, position and reveal; `--ease` (`cubic-bezier(0.16, 1, 0.3, 1)`) for everything. Under `prefers-reduced-motion: reduce`, base.css collapses all animation and transition to 0.01ms and the starfield draws one still frame instead of animating.
- **Do pull every string from `content/<lang>/ui.json`.** No text is hardcoded in a component. Plural forms come from `Intl.PluralRules` on the document language, never from an English-shaped guess about what a plural is.
- **Do keep Italian accents.** `scripts/lint-text.mjs` catches the unambiguous cases in CI. The "e" versus "è" distinction cannot be checked mechanically and needs a human reader before merge.

### Don't:

- **Don't use emoji or an em dash anywhere.** CI rejects both, in every text file including CSS comments. An en dash is permitted only between digits, as in a year range. Icons are authored SVG.
- **Don't add imagery of the material this catalogue is about.** No posters, no studio logos, no promotional art, no screenshots, no photographs. This is a legal boundary and not a matter of taste. All identity is generated vector work and typography. The one mark from outside is the GitHub logo in the colophon, authored as SVG here and used only to link to the repository and its author.
- **Don't make amber mean anything but watched or here.** No amber saga, no amber tint, no amber section heading, no amber decoration.
- **Don't write a hex value into `data/`, into content, or into a component.** Data names a livery or a tint; `tokens.css` owns the value.
- **Don't add a corner radius.** The system is `rounded.none` throughout, and the flat rectangle is what makes floating panels read as instruments.
- **Don't invent a franchise colour.** Use a `shade` step within the saga's livery. Widening the ladder beyond the measured range breaks the contrast guarantee for every franchise on it.
- **Don't give a coloured shadow an offset**, and don't ship a hard offset shadow with no blur. Coloured shadows are light being cast; neutral shadows are objects floating.
- **Don't use `backdrop-filter` outside the plate.** Everything else uses `--panel` flat.
- **Don't build a filled button.** There is no solid button in this system. Action is carried by bordered controls, switches, chips and the onward link.
- **Don't hide anything with a bare `display: none` on a component class** when `[hidden]` and a boolean attribute will do; the override exists so state stays in the DOM and readable by assistive technology.
- **Don't fix a control's width to its English string** and don't truncate translated text with an ellipsis. Layouts must survive translations substantially longer than English, and there will be more than two languages.
- **Don't introduce a fourth typeface** or set the display face uppercase at label size. The three faces already cover display, prose and data.
- **Don't let decoration become interactive.** The starfield and the nebula are `pointer-events: none`, `aria-hidden`, behind everything at negative z-index, paused when the tab is hidden, and still under reduced motion. Anything atmospheric added later meets the same four conditions.
