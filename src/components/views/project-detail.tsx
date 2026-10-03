"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { Container } from "@/components/chrome";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "@/components/icons";
import { useLang } from "@/components/lang";
import { neuHref } from "@/components/neu-project-card";
import { catCls, CategoryTag, Closing, Status } from "@/components/parts";
import { ProjectVisual } from "@/components/visuals";
import { projects, ui } from "@/content";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const i = projects.findIndex((x) => x.slug === slug);
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
    <article data-wash={p.category} className={catCls(p.category)}>
      <Container className="pt-12 text-center sm:pt-20">
        <Link href="/projects" className="group inline-flex items-center gap-1.5 text-[0.95rem] font-medium text-muted hover:text-ink">
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> {t(ui.nav.projects)}
        </Link>
        <div className="rise mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          <CategoryTag p={p} />
          <span className="text-[0.92rem] text-muted tnum">{p.year}</span>
          <Status p={p} t={t} />
        </div>
        <h1 className="display rise mt-4 text-[clamp(3rem,8vw,6rem)]" style={{ "--d": "80ms" } as React.CSSProperties}>
          {p.title}
        </h1>
        <p className="headline rise mx-auto mt-6 max-w-[30ch] text-[clamp(1.35rem,2.6vw,1.9rem)] text-muted" style={{ "--d": "160ms" } as React.CSSProperties}>
          {t(p.summary)}
        </p>
        {links.length > 0 && (
          <div className="rise mt-8 flex flex-wrap justify-center gap-3" style={{ "--d": "240ms" } as React.CSSProperties}>
            {links.map((l, n) => (
              <a
                key={l.href}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 font-medium transition-opacity hover:opacity-85 ${n === 0 ? "bg-accent text-on-accent" : "bg-surface"}`}
              >
                {l.label}
                <ArrowUpRight className="size-3.5" />
              </a>
            ))}
          </div>
        )}
      </Container>

      <Container className="mt-14 sm:mt-20">
        <ViewTransition name={`pv-${p.slug}`} share="morph" default="none">
          <div className="scene-surface mx-auto max-w-[60rem] overflow-hidden rounded-[2rem] p-5 sm:p-10">
            <ProjectVisual project={p} lang={lang} className="h-auto w-full" />
          </div>
        </ViewTransition>
      </Container>

      <Container className="mt-20 sm:mt-28">
        <div className="mx-auto grid max-w-[60rem] gap-14 md:grid-cols-2 md:gap-16">
          <section>
            <h2 className="headline text-[1.75rem]">{t(ui.overview)}</h2>
            <p className="mt-4 leading-relaxed text-muted">{t(p.overview)}</p>
            <h2 className="headline mt-12 text-[1.75rem]">{t(ui.stack)}</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <li key={s} className="rounded-full bg-surface px-3.5 py-1.5 text-[0.92rem]">
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="headline text-[1.75rem]">{t(ui.highlights)}</h2>
            <ul className="mt-4 space-y-3.5">
              {p.highlights[lang].map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed text-muted">
                  <Check className="mt-1 size-4 shrink-0 text-[var(--c)]" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <nav className="mx-auto mt-24 grid max-w-[60rem] grid-cols-2 gap-3 border-t border-line pt-8">
          {[
            { q: prev, label: t(ui.prev), dir: "prev" },
            { q: next, label: t(ui.next), dir: "next" },
          ].map(({ q, label, dir }) => (
            <Link
              key={dir}
              href={`/projects/${q.slug}`}
              aria-label={`${label}: ${q.title}`}
              className={`group flex min-w-0 flex-col gap-1 rounded-2xl p-3 transition-colors hover:bg-surface sm:p-5 ${dir === "next" ? "items-end text-right" : ""}`}
            >
              <span className="flex items-center gap-1.5 text-[0.88rem] text-muted">
                {dir === "prev" && <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />}
                {label}
                {dir === "next" && <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />}
              </span>
              <span className="headline max-w-full text-[1.15rem] break-words sm:text-[1.4rem]">{q.title}</span>
            </Link>
          ))}
        </nav>
      </Container>

      <Closing />
    </article>
  );
}
