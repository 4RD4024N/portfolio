"use client";

import { useState } from "react";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
import { ProjectCard } from "@/components/project-card";
import { categories, projects, ui, type Category } from "@/content";

export function ProjectsView() {
  const { t } = useLang();
  const [filter, setFilter] = useState<Category | "all">("all");

  const counts = Object.fromEntries(
    (Object.keys(categories) as Category[]).map((c) => [c, projects.filter((p) => p.category === c).length]),
  ) as Record<Category, number>;
  const list = filter === "all" ? projects : projects.filter((p) => p.category === filter);

  const chip = (key: Category | "all", label: string, count: number) => (
    <button
      key={key}
      onClick={() => setFilter(key)}
      aria-pressed={filter === key}
      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-colors ${
        filter === key ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-line-strong hover:text-fg"
      }`}
    >
      {key !== "all" && <span className={`size-1.5 rounded-full cat-${key}`} />}
      {label}
      <span className={`font-mono text-xs ${filter === key ? "text-bg/60" : "text-muted/70"}`}>{count}</span>
    </button>
  );

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <PageHeader eyebrow={t(ui.nav.projects)} title={t(ui.allProjects)} text={t(ui.projectsIntro)} />
      <div className="mb-8 flex flex-wrap gap-2">
        {chip("all", t(ui.all), projects.length)}
        {(Object.keys(categories) as Category[]).map((c) => chip(c, t(categories[c]), counts[c]))}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
