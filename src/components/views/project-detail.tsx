"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { neuHref } from "@/components/neu-project-card";
import { initials } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { categories, projects, ui } from "@/content";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const links = [
    p.github && { label: t(ui.sourceCode), href: p.github },
    p.demo && { label: t(ui.liveDemo), href: p.demo },
    p.org && { label: p.org.name, href: neuHref(p.org.href, lang) },
    ...(p.related ?? []),
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <div className={`cat-${p.category}`}>
      {/* Üst kısım: kategori renginde hafif bir zemin */}
      <div className="relative -mt-24 overflow-hidden pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="blob -left-10 top-0 size-80 bg-[var(--c)]" style={{ animation: "drift-1 18s ease-in-out infinite" }} />
          <div className="blob right-0 top-10 size-56 bg-violet" style={{ animation: "drift-2 21s ease-in-out infinite" }} />
        </div>
        <Container className="relative pt-8 pb-10 sm:pt-12">
          <Link href="/projects" className="group inline-flex items-center gap-1.5 text-sm text-muted hover:text-fg">
            <span className="transition-transform duration-200 group-hover:-translate-x-1">←</span> {t(ui.nav.projects)}
          </Link>

          <div className="rise mt-8 flex items-center gap-4">
            <span className="tile grid size-14 shrink-0 place-items-center rounded-2xl font-mono text-lg font-medium">
              {initials(p.title)}
            </span>
            <div>
              <h1 className="text-[2rem] font-semibold leading-tight tracking-tight sm:text-4xl">{p.title}</h1>
            </div>
          </div>

          <div className="rise mt-5 flex flex-wrap gap-2 text-sm" style={{ animationDelay: "80ms" }}>
            <span className="rounded-full border border-line bg-surface/70 px-3 py-1 font-mono">{p.year}</span>
            <span className="tile rounded-full px-3 py-1 font-medium">{t(categories[p.category])}</span>
            {p.private && <span className="rounded-full border border-line bg-surface/70 px-3 py-1">{t(ui.privateRepo)}</span>}
            {p.wip && (
              <span className="cat-game tile rounded-full px-3 py-1 font-medium">{t(ui.wip)}</span>
            )}
          </div>

          <p className="rise mt-6 max-w-2xl text-lg" style={{ animationDelay: "160ms" }}>
            {t(p.summary)}
          </p>

          {links.length > 0 && (
            <div className="rise mt-6 flex flex-wrap gap-3" style={{ animationDelay: "240ms" }}>
              {links.map((l, k) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
                    k === 0 ? "bg-fg text-bg" : "border border-line bg-surface/70 hover:border-[var(--c)]"
                  }`}
                >
                  {l.label}
                  <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
                </a>
              ))}
            </div>
          )}
        </Container>
      </div>

      <Container>
        <Reveal as="section" className="mt-6">
          <h2 className="mb-3 text-lg font-semibold">{t(ui.overview)}</h2>
          <p className="text-[1.0625rem]">{t(p.overview)}</p>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">{t(ui.highlights)}</h2>
          <ul className="space-y-2.5">
            {p.highlights[lang].map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-[var(--c)]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">{t(ui.stack)}</h2>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="rounded-lg border border-line bg-surface px-3 py-1 text-sm transition-colors duration-200 hover:border-[var(--c)] hover:text-[var(--c)]"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal>
          <nav className="mt-16 grid grid-cols-2 gap-3 text-sm">
            {[
              { p: prev, label: `← ${t(ui.prev)}`, align: "" },
              { p: next, label: `${t(ui.next)} →`, align: "text-right" },
            ].map(({ p: q, label, align }) => (
              <Link
                key={label}
                href={`/projects/${q.slug}`}
                className={`cat-${q.category} group rounded-2xl border border-line bg-surface p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--c)] ${align}`}
              >
                <span className="text-muted">{label}</span>
                <span className="mt-1 block font-semibold transition-colors group-hover:text-[var(--c)]">{q.title}</span>
              </Link>
            ))}
          </nav>
        </Reveal>
      </Container>
    </div>
  );
}
