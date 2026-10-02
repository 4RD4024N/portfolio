---
name: Arda Özan
description: Swiss International Typographic Style portfolio; the visible grid is the index.
colors:
  paper: "#f7f7f7"
  ink: "#111111"
  muted: "#5b5b57"
  rule: "#d4d4ce"
  field: "#e4e4de"
  signal-red: "#cf2a1a"
  ultramarine: "#1f45d6"
  chrome-yellow: "#f2b705"
  press-green: "#0f7a50"
  on-field-white: "#ffffff"
typography:
  display:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(3rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 72"
  display-name:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "min(52cqi, calc((78svh - 11rem) / 1.95))"
    fontWeight: 800
    lineHeight: 0.92
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 72"
  lede:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 80"
  headline:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 800
    lineHeight: 1.2
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 80"
  title:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
    fontVariation: "'wdth' 80"
  body:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Archivo, Helvetica Neue, Arial, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
    fontFeature: "'tnum' 1"
rounded:
  none: "0px"
spacing:
  gutter-phone: "16px"
  gutter-tablet: "20px"
  gutter-desktop: "24px"
  margin-phone: "20px"
  margin-tablet: "32px"
  margin-desktop: "48px"
  section: "96px"
  section-phone: "64px"
  container-max: "1440px"
components:
  button-contact:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.on-field-white}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "14px 16px"
  button-contact-hover:
    backgroundColor: "{colors.ink}"
  button-link-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  button-link-primary-hover:
    backgroundColor: "{colors.signal-red}"
  button-link-secondary:
    backgroundColor: "{colors.field}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  button-link-secondary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  filter-cell:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  filter-cell-hover:
    backgroundColor: "{colors.field}"
  range-field-web:
    backgroundColor: "{colors.ultramarine}"
    textColor: "{colors.on-field-white}"
    rounded: "{rounded.none}"
    padding: "20px"
  range-field-vision:
    backgroundColor: "{colors.chrome-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "20px"
  lang-toggle-active:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.none}"
    padding: "4px 6px"
---

# Design System: Arda Özan

## Overview

**Creative North Star: "The Poster That Is the Index"**

A Swiss International Typographic Style poster that also works as the site's index. A visible modular grid (12 columns on desktop, 6 on tablet, 4 on phones) organises every page, and its hairline rules show behind the home hero and as ruler ticks under page headers. Type and flat colour fields do all the work: one grotesk (Archivo) at two widths, near-black ink on a light neutral ground, and a small set of saturated fields, each owning exactly one meaning.

The tone is calm, exact and adult. The user turned down results that felt "too toy-like", so the system gets its energy from scale contrast and colour mass, not from playful shapes, rounding or ornament. The site is light-ground only. That was chosen for the use scene: employers reading on desktops and phones in daylight. No dark mode exists and none should be added.

Motion follows one grammar: straight wipes along the grid axes with an exponential ease-out. Content is visible by default, and nothing animates under reduced motion.

**Key Characteristics:**
- Visible modular grid: hairline column rules and ruler ticks are structural, not decoration.
- One family, two widths: heavy condensed Archivo for display, normal width for reading.
- Flat colour fields with square corners, no shadow and no gradient; each colour owns one role.
- Rows, not cards: content sits in full-width ruled rows that fill with their category colour on hover.
- Wipes along x or y with `cubic-bezier(0.16, 1, 0.3, 1)`; nothing bounces, fades in from blur or scales.

## Colors

A neutral paper-and-ink ground with four saturated poster colours, each assigned to one role and never used just for decoration.

### Primary
- **Signal Red** (signal-red): Arda himself and every contact action. Used for the surname line in the home name, the email button, the red contact block that closes every page, the active-nav marker, the brand square, the focus ring and text selection.

### Secondary (category colours)
- **Ultramarine** (ultramarine): Web & Backend. White text on the field.
- **Chrome Yellow** (chrome-yellow): Vision & AI. Ink text on the field, never white.
- **Press Green** (press-green): Desktop & Automation. White text on the field.
- **Ink as field** (ink): Games. White text on the field.
- **Field Grey** (field): areas proven by work experience rather than projects (cloud, project work). Also the resting fill of secondary link buttons and the hover fill of filter cells. Ink text on the field.

### Neutral
- **Paper** (paper): the page ground and the browser theme colour.
- **Ink** (ink): text, heavy 1px structural rules (header, section titles, page-header base), and the 1px gaps between fields in field grids.
- **Muted** (muted): secondary text such as dates, locations, summaries and inactive nav.
- **Rule** (rule): hairlines between list rows. At 70% opacity it draws the background column rules.

### Named Rules
**The One Role Rule.** Each saturated colour means one thing on every page. A category colour shows up only where that category is meant: its range field, its row's hover fill, its square marker, its project poster header.

**The Text-On Pairing Rule.** Each field carries its own text colour as a pair: white on red, ultramarine, green and ink; ink on yellow and grey. Never set white on chrome yellow.

## Typography

**Display Font:** Archivo at width 72, weight 800 (falls back to Helvetica Neue, Arial)
**Body Font:** Archivo at normal width (same family)
**Label Font:** Archivo semibold with tabular figures

**Character:** One grotesk with a width axis does every job. Narrow and heavy, it gives the poster voice. At normal width it reads quietly. Hierarchy comes from width and weight contrast, never from a second family.

### Hierarchy
- **Display** (800, width 72, clamp(3rem, 9vw, 6rem), line-height 0.92, -0.035em): page titles, the project poster title and the closing contact title. It enters with a line-up reveal inside an overflow mask.
- **Display Name** (same settings, sized to its container): the home name only. Two lines, first name in ink and surname in signal red, filling the hero height between the header and the range bar. The user chose this two-line form over a one-line name.
- **Lede** (600, width 80, clamp(1.5rem, 2.6vw, 2.25rem), line-height 1.2): one intro statement per page, spanning up to 9 columns. Trailing clauses switch to muted.
- **Headline** (800, width 80, 1.5rem rising to 1.875rem): section titles, always sitting on a 1px ink rule that runs the full width.
- **Title** (700, width 80, 1.125 to 1.5rem, tight leading): row titles for projects, roles and studio apps.
- **Body** (400, 1.0625rem, line-height 1.625): running text, capped at 68ch on detail pages and 40 to 44ch beside headers.
- **Label** (600, 0.875rem, tabular figures): dates, counts, years and category names. Sentence case.

### Named Rules
**The Two Widths Rule.** Condensed width belongs to headings and row titles. Body and labels stay at normal width. No other family is introduced.

**The Tabular Dates Rule.** Every year, period and count uses tabular figures so that columns of dates align on the grid.

## Layout

The grid is a 12-column structure with 24px gutters on desktop, 6 columns with 20px on tablet and 4 columns with 16px on phones. It sits inside a container that stops at 1440px (90rem), with side margins of 20, 32 and 48px. The root font steps up to 17px from 1600px wide and to 18px from 2200px.

Pages follow a fixed rhythm: a page header (display title on the left across 7 columns, muted explanation on the right across 5, an ink base rule with column ticks), then sections separated by 64px (phone) or 96px. Each section opens with a ruled section title. Lists are full-width ruled rows mapped to the columns: date 1 to 3 columns, title 4, description 5, action 2. Detail pages use two-column blocks, with the heading in 3 columns and content in 8, each topped by an ink rule. Every page ends with the red contact block, then a footer with an ink top rule.

On the home page at desktop size the hero fills the first viewport. The name sits in the left 8-column track as two condensed lines sized to fill the hero height (it reaches about 5 of the 8 columns at 1440; height wins over span by the owner's choice), and role, status and the email action sit in the right 4. The range bar spans the full container at the bottom. On phones everything stacks into the 4-column grid and the range bar becomes a 1-, 2- or 3-column field grid.

**The Grid Shows Rule.** The grid stays legible: background column rules on the hero, ruler ticks under page headers, and 1px ink gaps between colour fields. Content aligns to columns, never to arbitrary offsets.

## Elevation & Depth

The system is completely flat. No surface has a shadow. Depth comes only from colour mass (a saturated field against paper), 1px ink rules and the paper-coloured backing that lets the hero meta column sit over the grid rules. Layering is limited to the sticky header, a paper band with an ink base rule.

**The Flat Field Rule.** No box-shadow, no gradient fills, no blur and no translucent glass. A surface is either paper or a solid field.

## Shapes

All corners are square (0px). Shapes are rectangles: fields, rows, buttons, the 12px brand square, 6px to 12px square bullets and category markers. Rules are 1px ink for structure and 1px rule-grey between rows. The single 2px stroke is the white top rule over the email inside the contact block. Arrows are drawn as single-stroke SVGs (1.75 stroke on a 20px box, square caps).

## Components

### Buttons
Solid rectangles that change fill on hover; they never lift or grow.
- **Shape:** square corners (0px).
- **Contact (primary):** signal red with white semibold text, 14px by 16px padding, the email on the left and an arrow on the right. Hover turns the fill to ink and slides the arrow 4px right.
- **Link primary:** an ink field with paper text. Hover turns it red. Used for the first external link on a project.
- **Link secondary:** a field-grey fill. Hover inverts it to ink with paper text. Buttons in a link group are joined by 1px gaps.
- **Focus:** 2px signal-red outline with a 3px offset, applied site-wide. Inside colour fields the outline switches to the field's own text colour and is inset.

### Inline Links
Text links carry a 1px ink underline drawn as a background. On hover a 2px red underline wipes in from left to right (0.45s ease-out-expo) and the text turns red. External links add a small up-right arrow.

### Filter Cells
A tight grid of paper cells with 1px ink gaps inside an ink frame, five across on desktop. Each cell holds a label and its tabular count. Hover fills the cell field-grey. The active cell takes on its category's field and text pairing.

### Rows (Project, Entry, Studio)
- **Structure:** full-width rows on the grid with a 1px rule-grey bottom border and 16px to 24px vertical padding.
- **Marker:** a 12px square in the category colour sits in front of the title.
- **Hover / Focus:** the category field wipes in from the left (clip-path, 0.55s ease-out-expo). The text switches to the field's text colour, muted text to 78% of it, and on desktop the arrow slides in.

### Navigation
A sticky paper header with an ink base rule. On the left are the red brand square and the condensed name. Nav links are 0.95rem semibold in muted, turning ink on hover. The active link is ink with a 6px red square marker that scales in. The TR/EN toggle is a pair of small uppercase codes, with the active one as an ink tile. On phones the links wrap onto a second row under the name and toggle.

### Range Bar (signature)
A full-width row of colour fields under the home name, one per discipline: web, vision, desktop, games, cloud and project work. Each field shows a condensed label, an arrow and a tabular count, with 1px ink gaps between fields. The fields wipe in one after another (90ms stagger). On desktop, hovering or focusing a field widens it (flex-grow to 2.3, 0.7s ease-out-expo) while its neighbours yield, and reveals its detail line. On phones the fields stack in a grid, the detail is always visible, and every field is a link.

### Poster Header and Field Grids
Project detail pages open with a solid field in the project's category colour. It holds the display title and a fact list of label/value pairs on translucent current-colour rules. The same field language forms the Neuvikon division grid and the About focus grid: solid fields joined by 1px ink gaps, with a condensed title above and body text at 90% opacity.

### Contact Block
A signal-red field closes every page, padded 24, 40 or 48px depending on width. It holds the display title on the left and the email on the right under a 2px white rule.

## Do's and Don'ts

### Do:
- **Do** place every element on the 12/6/4 column grid and keep the grid visible through hairline rules, ruler ticks or 1px ink gaps.
- **Do** give each saturated colour exactly one role and pair it with its fixed text colour.
- **Do** set headings in heavy condensed Archivo and reading text in normal-width Archivo, with tabular figures for every date and count.
- **Do** animate only with straight wipes or line-up reveals along x or y, using `cubic-bezier(0.16, 1, 0.3, 1)`, and render everything statically under reduced motion.
- **Do** end every page with the signal-red contact block.

### Don't:
- **Don't** add a dark theme. The ground is light neutral paper, by the user's choice.
- **Don't** round corners, add shadows, gradients or blur, or use glows behind fields.
- **Don't** make the system toy-like with bouncy motion, playful shapes or decorative illustration. The user rejected that register.
- **Don't** lay projects out as a row of equal cards with images. Projects are ruled index rows.
- **Don't** use emoji or icon-font glyphs. Arrows and markers are drawn SVG strokes or plain squares.
- **Don't** introduce a second typeface. Width and weight carry the hierarchy.
