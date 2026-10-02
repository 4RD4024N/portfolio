---
version: 1
slug: "src-app-page-tsx"
primary_target: "src/app/page.tsx"
related_targets: ["src/app/projects/page.tsx","src/app/projects/[slug]/page.tsx","src/app/experience/page.tsx","src/app/about/page.tsx","src/app/contact/page.tsx"]
---

# Surface: whole site (home, projects, project detail, experience, about, contact)

Scope: replacement visual world for ardaozan.dev, replacing the Swiss poster world. Visitor mode: Experience. Audience, constraints and content live in PRODUCT.md. Light and dark themes are a user commitment (dark: the same model on a dim studio table).

Job: within one viewport a recruiter or tech lead sees who Arda is and how his work is distributed across disciplines, then opens a discipline, a project, the experience, or his email.

Memorable moment: an architectural study model of his career, seen from above at an angle: one white massing block per discipline, each block as tall as the work inside it, on a base with a basswood name plaque.

Unresolved: no project photos exist; models, plaques and type carry everything.

## Direction contract

THESIS: The site is an architecture studio's study model of a career. Work is shown as massing: volumes you can read by height and colour at a glance. It refuses the developer-portfolio default of a headline over a grid of equal cards, and the previous Swiss poster.

OWN-WORLD: A pale grey studio table as the ground. White foamboard for every surface, with real faces in three tones and offset, soft shadows where objects stand on the table. Basswood tan for plaques and bases. Coloured acrylic only on discipline volumes: ultramarine for web, chrome yellow for vision, green for desktop, ink for games, basswood for experience-only areas. Vermilion for Arda and contact. Barlow, a DIN-like architectural lettering family: semi-condensed caps for plaques and labels, regular for text. A drawn work scale and north arrow on the plaque; volumes are lettered on their own top faces (leader lines dropped after the finish review, since top-face lettering already ties each volume to its name).

STORY: The visitor reads his range as a model, believes he builds across disciplines with care, then opens a block or emails him.

FIRST VIEWPORT: The axonometric model fills the left two thirds of the viewport. Six volumes stand on a foamboard base: web, vision, desktop, games, cloud and project work, each as tall as its count, each with a top-face label. At the empty front-right corner of the base, a basswood plaque reads name, role and city, with the work scale and north arrow (moved from bottom left after the finish review so it never covers a volume). The right third holds the intro, the open-to-work status and the vermilion email action.

FORM: Architectural model table, number 6 on the ordered list, assigned by the roll and chosen by the user. Seed key 0d605e1d.

SIGNATURE: The model itself. Volumes extrude from the base on load. Hover or focus lifts a volume a few millimetres and lights its plaque. Each volume links to its discipline. On phones the model scales down above a plaque list. Raises: the newest work is the most saturated; heights are true to the counts, readable against the scale bar; project pages present views A, B and C. Motion grammar: vertical extrusion and lift with an exponential ease-out; content visible by default; nothing moves under reduced motion.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
