---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/about/page.tsx","src/app/contact/page.tsx"]
---

# Surface: whole site (home, projects, project detail, experience, about, contact)

Scope: replacement visual world for ardaozan.dev. Previous attempts were rejected for these reasons:
- code editor: too technical;
- origami: too ornamental;
- canon: rejected before review.

Visitor mode: Experience. Audience, constraints and content live in PRODUCT.md. Light and dark themes are a user commitment.

Job: in one viewport a recruiter knows who Arda is. As they scroll, his range plays out like a product launch, and email is always one click away.

Memorable moment:
- A sentence about what he builds lights up word by word as you scroll.
- Each featured project then gets its own full-screen scene with a live, code-drawn visual of what the project does.

## Direction contract

THESIS:
- The site is a product-launch page where the product is Arda's range: scenes, not cards.
- Each project is demonstrated by a live visual of its mechanism.
- It refuses metaphor costumes (no editor, origami or charts) and the card grid.

OWN-WORLD:
- Near-white ground, or true black in dark, with graphite ink.
- Huge, tight Geist display type.
- Discipline colours do real jobs in the visuals: blue web, violet vision, amber desktop, green games.
- Visuals are crisp vector and canvas drawings of the actual mechanism (schedule grid, audio spectrum, hand landmarks, encrypted voice stream).
- A translucent top bar is the only chrome. No shadows except the bar's hairline. No gradient text.

STORY:
- First, they learn who he is.
- Then, word by word, what he builds.
- Then they watch four projects work, scan his experience and the rest of his projects, and email him at the close.

FIRST VIEWPORT:
- Centred: the name at display scale (about 6rem), the role and city, and a one-line headline.
- Two actions: a solid "Send email" button and a "See projects" link.
- The top bar holds the name, the pages, language and theme.
- Below the fold the word-reveal statement begins.

FORM: Cinematic product-launch scroll, candidate 1 on my ordered list, picked by the user over the assigned museum exhibition. Seed key 56bb7cce (re-roll 3).

SIGNATURE:
- Scroll-linked word reveal.
- Sticky project scenes whose visuals scale in and animate:
  - spectrum bars driven by a synthetic beat;
  - a hand skeleton morphing between gestures;
  - schedule blocks resolving a conflict;
  - packets crossing an encrypted link.
- Reduced motion shows everything static and complete.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
