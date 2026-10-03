"use client";

import Link from "next/link";
import { ViewTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/chrome";
import { useLang } from "@/components/lang";
import { catCls, CategoryTag, Closing, PageHero, Status } from "@/components/parts";
import { ProjectVisual } from "@/components/visuals";
import { categories, projects, ui, type Category } from "@/content";

const isCategory = (v: string | null): v is Category => !!v && v in categories;

export function ProjectsView() {
  const { lang, t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const c = params.get("c");
  const filter: Category | "all" = isCategory(c) ? c : "all";

  const setFilter = (key: Category | "all") => router.replace(key === "all" ? "/projects" : `/projects?c=${key}`, { scroll: false });
  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const options: [Category | "all", string, number][] = [
    ["all", t(ui.all), projects.length],
    ...(Object.keys(categories) as Category[]).map((k) => [k, t(categories[k]), projects.filter((p) => p.category === k).length] as [Category, string, number]),
  ];

  return (
    <>
      <PageHero title={t(ui.nav.projects)} text={t(ui.projectsIntro)} />

      <Container>
        <div role="group" aria-label={t(ui.category)} className="flex flex-wrap gap-2">
          {options.map(([key, label, count]) => {
            const on = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={on}
                className={`${key === "all" ? "" : catCls(key)} flex items-center gap-2 rounded-full px-4 py-2 text-[0.92rem] font-medium transition-colors ${
                  on ? "bg-ink text-bg" : "bg-surface text-muted hover:text-ink"
                }`}
              >
                {key !== "all" && <span className="size-2 rounded-full bg-[var(--c)]" aria-hidden />}
                {label}
                <span className="tnum opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        <ul key={filter} className="mt-12 grid gap-x-10 gap-y-16 md:grid-cols-2">
          {list.map((p, i) => (
            <li key={p.slug} className={`${catCls(p.category)} rise`} style={{ "--d": `${Math.min(i, 6) * 60}ms` } as React.CSSProperties}>
              <Link href={`/projects/${p.slug}`} className="group block">
                <ViewTransition name={`pv-${p.slug}`} share="morph" default="none">
                  <div className="overflow-hidden rounded-[1.5rem] bg-surface p-4 transition-transform duration-500 ease-out-expo group-hover:scale-[1.015] sm:p-6">
                    <ProjectVisual project={p} lang={lang} className="h-auto w-full" />
                  </div>
                </ViewTransition>
                <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                  <CategoryTag p={p} />
                  <span className="text-[0.92rem] text-muted tnum">{p.year}</span>
                  <Status p={p} t={t} />
                </div>
                <h2 className="headline mt-2 text-[1.75rem] transition-colors group-hover:text-accent">{p.title}</h2>
                <p className="mt-2 leading-relaxed text-muted">{t(p.summary)}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Container>

      <Closing />
    </>
  );
}
