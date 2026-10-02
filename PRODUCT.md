# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Employers evaluating Arda Özan as a candidate, in Turkey and abroad with equal weight: recruiters, HR, and technical leads. They arrive from a CV, LinkedIn, or GitHub link, usually skimming between other candidates, and need to judge within a minute or two what he has built, where he has worked, and how to reach him. Bilingual by necessity: Turkish and English carry equal importance.

## Product Purpose

A personal portfolio at ardaozan.dev that presents Arda as a well-rounded computer engineer and gets the right people to email him. Success is a visitor leaving with a clear picture of his range and a reason to make contact.

## Positioning

A broad engineer rather than a single-lane specialist. No one identity dominates: full-stack web work (Advisory System, React, Spring Boot, .NET), curious tool-building (computer vision, real-time audio, automation), cloud experience, a project-assistant role on IFC-financed work, and co-founding Neuvikon, a four-person software / games / robotics studio. The combination itself is the claim.

## Operating Context

- Visitors come from his CV (which links GitHub, LinkedIn and ardaozan.dev), LinkedIn, and GitHub.
- Viewed on phones and desktops alike; must work from 320px to large monitors.
- Hosted on Vercel; every push to `main` on GitHub (4RD4024N/portfolio) deploys to ardaozan.dev.
- Content is edited by Arda in a single file, `src/content.ts`; every string exists in TR and EN.

## Capabilities and Constraints

- Next.js 16 (App Router, static), Tailwind CSS 4, TypeScript. Client-side TR/EN toggle remembered per browser.
- Routes: `/`, `/projects`, `/projects/[slug]` (15 projects), `/experience`, `/about`, `/contact`, plus a 404.
- Projects carry year, category (Web & Backend, Vision & AI, Desktop & Automation, Game), stack, overview, highlights, and optional GitHub / demo / org links. Some are private repos or in progress and must say so.
- Experience: SEGG International (Project Assistant, Aug 2026 – present, remote from Ankara; Engineer Intern, Jun 2025 – Jun 2026, remote from Ankara on projects in Lviv), Neuvikon (co-founder, volunteer, 2026 – present), Ave Bilişim (Frontend Developer Intern, Jul 2024), LimonCloud (Cloud Engineer Intern, Aug 2023).
- Education: Başkent University, B.Sc. Computer Engineering, 2021 – 2026. Languages: Turkish (native), English (B2).
- "Open to new opportunities" status stays visible.

## Brand Commitments

- Name: Arda Özan. Domain: ardaozan.dev. Contact: arda.ozan.dev@gmail.com, GitHub 4RD4024N, LinkedIn.
- Voice: first person, plain and direct, no buzzwords.
- Neuvikon project names, taglines and app icons (`public/neuvikon/`) belong to the studio and are shown as the studio's work.

## Evidence on Hand

- Project descriptions drawn from the actual repositories and the CV; no screenshots or demo videos of personal projects exist yet.
- Neuvikon app icons in `public/neuvikon/`.
- No testimonials, metrics, or client logos. Do not invent any.
- Must never publish: phone numbers, home address, or the CV's reference contacts.

## Product Principles

1. Range is the story: show the breadth of what he builds without letting any one area swallow the rest.
2. Every claim traces back to a repo, the CV, or Neuvikon's own site.
3. Contact is never more than one step away.
4. Turkish and English are equals; neither reads like a translation.
5. Content changes happen in `src/content.ts`, not in components.

## Accessibility & Inclusion

Respect reduced-motion preferences; all content must stay readable without JavaScript-driven animation.
