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
  const options: [Category | "all", string][] = [
    ["all", t(ui.all)],
    ...(Object.keys(categories) as Category[]).map((c) => [c, t(categories[c])] as [Category, string]),
  ];

  return (
    <Container>
      <PageHeader title={t(ui.nav.projects)} text={t(ui.projectsIntro)} />

      <div className="flex flex-wrap gap-x-4 gap-y-2 text-[15px]">
        {options.map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            aria-pressed={filter === key}
            className={
              filter === key ? "text-fg underline decoration-1 underline-offset-[6px]" : "text-muted hover:text-fg"
            }
          >
            {label}
          </button>
        ))}
      </div>

      {years.map((y) => (
        <section key={y} className="mt-10">
          <h2 className="border-b border-line pb-2 font-mono text-sm text-muted">{y}</h2>
          <ProjectList projects={list.filter((p) => p.year === y)} showYear={false} />
        </section>
      ))}
    </Container>
  );
}
