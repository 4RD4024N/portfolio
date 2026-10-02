"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, GitHub, Lock } from "@/components/icons";
import { neuHref } from "@/components/neu-project-card";
import { categories, projects, ui } from "@/content";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const next = projects[(i + 1) % projects.length];

  return (
    <article className="mx-auto max-w-5xl px-4 sm:px-6">
      <Link href="/projects" className="group mt-10 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
        {t(ui.back)}
      </Link>

      <header className="border-b border-line pt-10 pb-12">
        <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted">
          <span className={`size-1.5 rounded-full cat-${p.category}`} />
          {t(categories[p.category])} · {p.year}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{p.title}</h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-fg/80">{t(p.summary)}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {p.github && (
            <a
              href={p.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <GitHub /> {t(ui.sourceCode)}
            </a>
          )}
          {p.org && (
            <a
              href={neuHref(p.org.href, lang)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-sm transition-colors hover:bg-surface-2"
            >
              <span className="text-muted">{t(ui.partOf)}</span> {p.org.name} <ArrowUpRight />
            </a>
          )}
          {p.private && (
            <span className="flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm text-muted">
              <Lock className="size-3.5" /> {t(ui.privateNote)}
            </span>
          )}
          {p.wip && (
            <span className="flex items-center gap-2 rounded-full border border-amber-300/25 px-4 py-2.5 text-sm text-amber-300/90">
              <span className="size-1.5 rounded-full bg-amber-300" /> {t(ui.wip)}
            </span>
          )}
          {p.demo && (
            <a
              href={p.demo}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              {t(ui.liveDemo)} <ArrowUpRight />
            </a>
          )}
        </div>
      </header>

      <div className="grid gap-12 py-12 md:grid-cols-[1fr_260px]">
        <div className="space-y-12">
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.overview)}</h2>
            <p className="mt-4 text-lg leading-relaxed text-fg/85">{t(p.overview)}</p>
          </section>
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.highlights)}</h2>
            <ul className="mt-5 space-y-3">
              {p.highlights[lang].map((h) => (
                <li key={h} className="flex gap-3 leading-relaxed text-fg/85">
                  <Check className="mt-1 size-4 shrink-0 text-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="h-fit space-y-6 rounded-2xl border border-line bg-surface p-6 text-sm md:sticky md:top-24">
          <div>
            <h3 className="text-xs text-muted">{t(ui.stack)}</h3>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-fg/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4 border-t border-line pt-6">
            <div>
              <h3 className="text-xs text-muted">{t(ui.year)}</h3>
              <p className="mt-1">{p.year}</p>
            </div>
            <div>
              <h3 className="text-xs text-muted">{t(ui.category)}</h3>
              <p className="mt-1">{t(categories[p.category])}</p>
            </div>
          </div>
          {(p.github || p.related?.length) && (
            <div className="border-t border-line pt-6">
              <h3 className="text-xs text-muted">{t(ui.links)}</h3>
              <ul className="mt-3 space-y-2">
                {p.github && (
                  <li>
                    <a href={p.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
                      GitHub <ArrowUpRight />
                    </a>
                  </li>
                )}
                {p.related?.map((r) => (
                  <li key={r.href}>
                    <a href={r.href} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent">
                      {r.label} <ArrowUpRight />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>

      <Link
        href={`/projects/${next.slug}`}
        className="group flex items-center justify-between rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2"
      >
        <div>
          <p className="text-xs text-muted">{t(ui.next)}</p>
          <p className="mt-1 text-xl font-semibold tracking-tight">{next.title}</p>
        </div>
        <ArrowRight className="size-5 text-muted transition-all group-hover:translate-x-1 group-hover:text-fg" />
      </Link>
    </article>
  );
}
