"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { neuHref } from "@/components/neu-project-card";
import { categories, projects, ui } from "@/content";

export function ProjectDetailView({ slug }: { slug: string }) {
  const { lang, t } = useLang();
  const i = projects.findIndex((p) => p.slug === slug);
  const p = projects[i];
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];

  const meta = [p.year, t(categories[p.category]), p.private ? t(ui.privateRepo) : null, p.wip ? t(ui.wip) : null];
  const links = [
    p.github && { label: t(ui.sourceCode), href: p.github },
    p.demo && { label: t(ui.liveDemo), href: p.demo },
    p.org && { label: p.org.name, href: neuHref(p.org.href, lang) },
    ...(p.related ?? []),
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <Container>
      <article>
        <header className="pt-10 sm:pt-16">
          <Link href="/projects" className="link text-sm text-muted">
            ← {t(ui.nav.projects)}
          </Link>
          <h1 className="mt-6 text-[1.75rem] font-medium leading-tight tracking-tight sm:text-3xl">{p.title}</h1>
          <p className="mt-2 font-mono text-sm text-muted">{meta.filter(Boolean).join(" · ")}</p>
          <p className="mt-6 text-[1.0625rem]">{t(p.summary)}</p>
          {links.length > 0 && (
            <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
              {links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link">
                  {l.label} ↗
                </a>
              ))}
            </p>
          )}
        </header>

        <section className="mt-12">
          <h2 className="mb-3 font-medium">{t(ui.overview)}</h2>
          <p>{t(p.overview)}</p>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-medium">{t(ui.highlights)}</h2>
          <ul className="list-disc space-y-1.5 pl-5 marker:text-muted">
            {p.highlights[lang].map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="mb-3 font-medium">{t(ui.stack)}</h2>
          <p className="text-muted">{p.stack.join(", ")}</p>
        </section>
      </article>

      <nav className="mt-16 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
        <Link href={`/projects/${prev.slug}`} className="group">
          <span className="text-muted">← {t(ui.prev)}</span>
          <span className="mt-1 block font-medium group-hover:text-accent">{prev.title}</span>
        </Link>
        <Link href={`/projects/${next.slug}`} className="group text-right">
          <span className="text-muted">{t(ui.next)} →</span>
          <span className="mt-1 block font-medium group-hover:text-accent">{next.title}</span>
        </Link>
      </nav>
    </Container>
  );
}
