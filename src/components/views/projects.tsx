"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
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
        {/* Filtre: seçili kategori kendi renk alanını giyer */}
        <div role="group" aria-label={t(ui.all)} className="grid grid-cols-2 gap-px border border-ink bg-ink sm:grid-cols-3 lg:grid-cols-5">
          {options.map(([key, label, count]) => {
            const active = filter === key;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                aria-pressed={active}
                className={`${key === "all" ? "cat-red" : `cat-${key}`} flex items-baseline justify-between gap-4 px-4 py-3 text-left text-[0.95rem] font-semibold transition-colors ${
                  active ? "bg-[var(--c)] text-[var(--on)]" : "bg-paper text-ink hover:bg-field"
                }`}
              >
                {label}
                <span className="tnum text-sm opacity-70">{count}</span>
              </button>
            );
          })}
        </div>

        {/* key: filtre değişince satırlar yeniden silinerek gelsin */}
        <div key={filter}>
          {years.map((y, i) => (
            <section key={y} className="wipe-in" style={{ animationDelay: `${i * 80}ms` }}>
              <h2 className="tnum condensed border-b border-rule pt-10 pb-2 text-3xl font-extrabold tracking-tight">{y}</h2>
              <ProjectList projects={list.filter((p) => p.year === y)} showYear={false} />
            </section>
          ))}
        </div>
      </Container>

      <ContactClose />
    </>
  );
}
