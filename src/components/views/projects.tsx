"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
import { ProjectList } from "@/components/project-card";
import { categories, projects, ui, type Category } from "@/content";

export function ProjectsView() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");

  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);
  const years = [...new Set(list.map((p) => p.year))].sort().reverse();
  const options: [Category | "all", string, number][] = [
    ["all", t(ui.all), projects.length],
    ...(Object.keys(categories) as Category[]).map(
      (c) => [c, t(categories[c]), projects.filter((p) => p.category === c).length] as [Category, string, number],
    ),
  ];

  return (
    <Container>
      <PageHeader title={t(ui.nav.projects)} text={t(ui.projectsIntro)} />

      <div className="rise flex flex-wrap gap-2" style={{ animationDelay: "160ms" }}>
        {options.map(([key, label, count]) => {
          const active = filter === key;
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              aria-pressed={active}
              className={`${key === "all" ? "" : `cat-${key}`} flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm transition-all duration-300 ${
                active
                  ? key === "all"
                    ? "border-fg bg-fg text-bg"
                    : "tile font-medium"
                  : "border-line text-muted hover:-translate-y-0.5 hover:text-fg"
              }`}
            >
              {key !== "all" && <span className="size-2 rounded-full bg-[var(--c)]" />}
              {label}
              <span className="font-mono text-xs opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      {/* key: filtre değişince liste yeniden animasyonla gelsin */}
      <div key={filter}>
        {years.map((y) => (
          <section key={y} className="mt-10">
            <h2 className="mb-2 flex items-center gap-3 font-mono text-sm text-muted">
              {y}
              <span className="h-px flex-1 bg-line" />
            </h2>
            <ProjectList projects={list.filter((p) => p.year === y)} showYear={false} />
          </section>
        ))}
      </div>
    </Container>
  );
}
