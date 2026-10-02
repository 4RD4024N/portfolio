"use client";

import Link from "next/link";
import { Container, grid } from "@/components/container";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { MassChip } from "@/components/model";
import { neuHref } from "@/components/neu-project-card";
import { ageOf } from "@/components/project-card";
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

  // Kütlenin boyutu projeden gelir: teknoloji sayısı yükseklik, özellik sayısı genişlik
  const h = Math.min(6, 2 + p.stack.length * 0.6);
  const w = Math.min(5, 2 + p.highlights.en.length * 0.5);

  return (
    <article className={`cat-${p.category}`} data-age={ageOf(p.year)}>
      <Container className="pt-8 sm:pt-12">
        <Link href="/projects" className="link label inline-flex items-center gap-1.5 text-[0.82rem]">
          <ArrowLeft className="size-4" /> {t(ui.nav.projects)}
        </Link>

        <header className={`${grid} mt-6 gap-y-8`}>
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <h1 className="title text-[clamp(2.75rem,6.5vw,5.25rem)]">{p.title}</h1>
            <p className="mt-5 max-w-[50ch] text-[1.15rem] leading-relaxed">{t(p.summary)}</p>
            {links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {links.map((l, k) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`lift group inline-flex items-center gap-2 rounded-[3px] px-4 py-2.5 font-semibold whitespace-nowrap shadow-[var(--shadow-board)] ${
                      k === 0 ? "bg-ink text-board" : "bg-board"
                    }`}
                  >
                    {l.label}
                    <ArrowUpRight />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Görünüşler A, B, C: projenin kütlesi plan, cephe ve eksonometride */}
          <figure className="board col-span-4 p-4 md:col-span-6 lg:col-span-5">
            <div className="grid grid-cols-3 gap-3 text-muted">
              <View letter="A" name={t(ui.viewPlan)}>
                <rect x="20" y="30" width={w * 12} height="40" className="fill-[var(--c)]" />
              </View>
              <View letter="B" name={t(ui.viewElevation)}>
                <line x1="8" y1="90" x2="92" y2="90" stroke="currentColor" />
                <rect x="20" y={90 - h * 12} width={w * 12} height={h * 12} className="fill-[var(--c)]" />
              </View>
              <View letter="C" name={t(ui.viewAxo)}>
                <g transform="translate(50 90)">
                  <path d={`M0 0 L${-w * 6} ${-w * 3.4} L${-w * 6} ${-w * 3.4 - h * 7} L0 ${-h * 7} Z`} className="fill-[color-mix(in_oklab,var(--c),black_22%)]" />
                  <path d={`M0 0 L${w * 6} ${-w * 3.4} L${w * 6} ${-w * 3.4 - h * 7} L0 ${-h * 7} Z`} className="fill-[color-mix(in_oklab,var(--c),black_38%)]" />
                  <path d={`M0 ${-h * 7} L${-w * 6} ${-w * 3.4 - h * 7} L0 ${-w * 6.8 - h * 7} L${w * 6} ${-w * 3.4 - h * 7} Z`} className="fill-[var(--c)]" />
                </g>
              </View>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-rule pt-4 text-sm">
              {facts.map(([k, v]) => (
                <div key={k}>
                  <dt className="label text-[0.72rem] text-muted">{k}</dt>
                  <dd className="tnum font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </header>

        <Block title={t(ui.overview)}>
          <p className="max-w-[68ch]">{t(p.overview)}</p>
        </Block>

        <Block title={t(ui.highlights)}>
          <ul className="max-w-[68ch] space-y-2.5">
            {p.highlights[lang].map((h) => (
              <li key={h} className="flex gap-3">
                <span className="acrylic mt-[0.5rem] size-2.5 shrink-0 rounded-[1px]" />
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </Block>

        <Block title={t(ui.stack)}>
          <ul className="flex flex-wrap gap-2">
            {p.stack.map((s) => (
              <li key={s} className="board px-2.5 py-1 text-sm font-medium">
                {s}
              </li>
            ))}
          </ul>
        </Block>

        <nav className="mt-16 grid grid-cols-2 gap-3 sm:mt-24">
          {[
            { q: prev, label: t(ui.prev), dir: "prev" },
            { q: next, label: t(ui.next), dir: "next" },
          ].map(({ q, label, dir }) => (
            <Link
              key={dir}
              href={`/projects/${q.slug}`}
              data-age={ageOf(q.year)}
              className={`cat-${q.category} board lift group p-4 sm:p-6 ${dir === "next" ? "text-right" : ""}`}
            >
              <span className={`flex items-center gap-2.5 ${dir === "next" ? "flex-row-reverse" : ""}`} aria-label={`${label}: ${q.title}`}>
                {dir === "prev" ? (
                  <ArrowLeft className="size-5 shrink-0 text-muted transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-1" />
                )}
                <MassChip className="size-5" />
                <span className="title text-lg sm:text-2xl">{q.title}</span>
              </span>
            </Link>
          ))}
        </nav>
      </Container>

      <ContactClose />
    </article>
  );
}

function View({ letter, name, children }: { letter: string; name: string; children: React.ReactNode }) {
  return (
    <div>
      <svg viewBox="0 0 100 100" className="aspect-square w-full rounded-[2px] bg-table/60" aria-hidden>
        {children}
      </svg>
      <p className="label mt-2 flex items-center gap-1.5 text-[0.7rem]">
        <span className="grid size-5 place-items-center rounded-full border border-current text-[0.7rem]">{letter}</span>
        {name}
      </p>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className={`${grid} mt-12 gap-y-3 sm:mt-16`}>
      <h2 className="title col-span-4 text-xl md:col-span-2 lg:col-span-3">{title}</h2>
      <div className="col-span-4 md:col-span-4 lg:col-span-8">{children}</div>
    </section>
  );
}
