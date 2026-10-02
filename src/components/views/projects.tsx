"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
import { MassChip } from "@/components/model";
import { ProjectList } from "@/components/project-card";
import { ContactClose } from "@/components/views/home";
import { categories, projects, ui, type Category } from "@/content";

const isCategory = (v: string | null): v is Category => !!v && v in categories;

export function ProjectsView() {
  const { t } = useLang();
  const router = useRouter();
  const params = useSearchParams();
  const c = params.get("c");
  const filter: Category | "all" = isCategory(c) ? c : "all";

  const setFilter = (key: Category | "all") =>
    router.replace(key === "all" ? "/projects" : `/projects?c=${key}`, { scroll: false });

  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const years = [...new Set(list.map((p) => p.year))].sort().reverse();
  const options: [Category | "all", string, number][] = [
    ["all", t(ui.all), projects.length],
    ...(Object.keys(categories) as Category[]).map(
      (k) => [k, t(categories[k]), projects.filter((p) => p.category === k).length] as [Category, string, number],
    ),
  ];

  return (
    <>
      <PageHeader title={t(ui.nav.projects)} text={t(ui.projectsIntro)} />

      <Container>
        {/* Filtre: maket anahtarı gibi; seçili olan masadan kalkar */}
        <div role="group" aria-label={t(ui.all)} className="flex flex-wrap gap-2">
          {options.map(([key, label, count]) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={`${key === "all" ? "cat-red" : `cat-${key}`} board lift flex items-center gap-2.5 px-3 py-2 text-left ${
                  active ? "-translate-y-[3px] shadow-[var(--shadow-lift)] ring-2 ring-[var(--c)]" : ""
                }`}
              >
                <MassChip className="size-5" />
                <span className="label text-[0.8rem]">{label}</span>
                <span className="tnum text-sm text-muted">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Yıllar: her yıl ayrı bir pano */}
        <div key={filter} className="mt-8 space-y-6">
          {years.map((y) => (
            <section key={y} className="board px-4 pt-4 sm:px-6 sm:pt-5">
              <h2 className="title tnum border-b border-rule pb-3 text-2xl">{y}</h2>
              <ProjectList projects={list.filter((p) => p.year === y)} showYear={false} />
            </section>
          ))}
        </div>
      </Container>

      <ContactClose />
    </>
  );
}
