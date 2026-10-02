"use client";

import Link from "next/link";
import { Container, grid } from "@/components/container";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { neuHref } from "@/components/neu-project-card";
import { ContactClose } from "@/components/views/home";
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

  const facts = [
    [t(ui.year), p.year],
    [t(ui.category), t(categories[p.category])],
    ...(p.private ? [[t(ui.source), t(ui.privateRepo)]] : []),
    ...(p.wip ? [[t(ui.status), t(ui.wip)]] : []),
  ];

  return (
    <article className={`cat-${p.category}`}>
      <Container className="pt-8 sm:pt-12">
        <Link href="/projects" className="link inline-flex items-center gap-1.5 text-[0.95rem] font-semibold">
          <ArrowLeft className="size-4" /> {t(ui.nav.projects)}
        </Link>

        {/* Kategori renginde afiş alanı */}
        <header className="wipe-in mt-6 bg-[var(--c)] text-[var(--on)]">
          <div className={`${grid} gap-y-8 p-6 sm:p-10 lg:p-12`}>
            <h1 className="display col-span-4 text-[clamp(2.75rem,7.5vw,6rem)] md:col-span-6 lg:col-span-9">
              <span className="block overflow-hidden pb-[0.05em]">
                <span className="line-up" style={{ animationDelay: "250ms" }}>
                  {p.title}
                </span>
              </span>
            </h1>
            <dl className="col-span-4 grid grid-cols-2 gap-x-4 gap-y-3 self-end text-sm md:col-span-6 md:grid-cols-4 lg:col-span-12">
              {facts.map(([k, v]) => (
                <div key={k} className="border-t border-current/40 pt-2">
                  <dt className="opacity-75">{k}</dt>
                  <dd className="tnum font-bold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        {/* Gövde: solda başlık, sağda metin */}
        <div className={`${grid} gap-y-4 pt-10 sm:pt-14`}>
          <p className="condensed col-span-4 text-[clamp(1.4rem,2.4vw,2rem)] leading-[1.2] font-semibold tracking-tight md:col-span-6 lg:col-span-8 lg:col-start-4">
            {t(p.summary)}
          </p>
          {links.length > 0 && (
            <div className="col-span-4 flex flex-wrap gap-px md:col-span-6 lg:col-span-9 lg:col-start-4">
              {links.map((l, k) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`group inline-flex items-center gap-2 px-4 py-3 font-semibold whitespace-nowrap transition-colors ${
                    k === 0 ? "bg-ink text-paper hover:bg-red" : "bg-field hover:bg-ink hover:text-paper"
                  }`}
                >
                  {l.label}
                  <ArrowUpRight className="transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              ))}
            </div>
          )}
        </div>

        <Block title={t(ui.overview)}>
          <p className="max-w-[68ch]">{t(p.overview)}</p>
        </Block>

        <Block title={t(ui.highlights)}>
          <ul className="max-w-[68ch] space-y-2.5">
            {p.highlights[lang].map((h) => (
              <li key={h} className="flex gap-3">
                <span className="mt-[0.55rem] size-2 shrink-0 bg-[var(--c)] outline outline-1 outline-ink/15" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t(ui.stack)}>
          <p className="max-w-[68ch] font-semibold">{p.stack.join(", ")}</p>
        </Block>

        {/* Önceki / sonraki */}
        <nav className="mt-16 grid grid-cols-2 gap-px border-y border-ink bg-ink sm:mt-24">
          {[
            { q: prev, label: t(ui.prev), dir: "prev" },
            { q: next, label: t(ui.next), dir: "next" },
          ].map(({ q, label, dir }) => (
            <Link
              key={dir}
              href={`/projects/${q.slug}`}
              className={`cat-${q.category} row-wipe group bg-paper p-4 sm:p-6 ${dir === "next" ? "text-right" : ""}`}
            >
              <span className={`row-muted flex items-center gap-1.5 text-sm font-semibold text-muted ${dir === "next" ? "justify-end" : ""}`}>
                {dir === "prev" && <ArrowLeft className="size-4" />}
                {label}
                {dir === "next" && <ArrowRight className="size-4" />}
              </span>
              <span className="condensed mt-1 block text-lg font-bold leading-tight tracking-tight sm:text-2xl">{q.title}</span>
            </Link>
          ))}
        </nav>
      </Container>

      <ContactClose />
    </article>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={`${grid} mt-12 gap-y-3 border-t border-ink pt-4 sm:mt-16`}>
      <h2 className="condensed col-span-4 text-xl font-extrabold tracking-tight md:col-span-2 lg:col-span-3">{title}</h2>
      <div className="col-span-4 md:col-span-4 lg:col-span-8">{children}</div>
    </section>
  );
}
