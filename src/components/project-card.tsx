"use client";

import Link from "next/link";
import { grid } from "@/components/container";
import { ArrowRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { categories, ui, type Project } from "@/content";

// Proje dizinindeki tek satır: üzerine gelince kategori rengi soldan dolar
export function ProjectRow({ project: p, showYear = true }: { project: Project; showYear?: boolean }) {
  const { t } = useLang();
  const notes = [p.org?.name, p.private ? t(ui.privateRepo) : null, p.wip ? t(ui.wip) : null].filter(Boolean);

  return (
    <li className={`cat-${p.category} border-b border-rule`}>
      <Link href={`/projects/${p.slug}`} className={`row-wipe group ${grid} gap-y-1 px-0 py-5 outline-offset-0 sm:py-6`}>
        <span className="tnum row-muted col-span-1 hidden pt-1 text-sm font-semibold text-muted lg:block">
          {showYear ? p.year : ""}
        </span>
        <div className="col-span-4 flex items-start gap-3 md:col-span-3 lg:col-span-4">
          <span className="mt-[0.45rem] size-3 shrink-0 bg-[var(--c)] transition-colors group-hover:bg-[var(--on)]" />
          <div className="min-w-0">
            <h3 className="condensed text-xl font-bold leading-tight tracking-tight sm:text-2xl">{p.title}</h3>
            <p className="row-muted mt-1 text-sm font-semibold text-muted">
              {t(categories[p.category])}
              {showYear && <span className="tnum lg:hidden"> · {p.year}</span>}
              {notes.length > 0 && <span> · {notes.join(" · ")}</span>}
            </p>
          </div>
        </div>
        <p className="row-muted col-span-4 pl-6 text-[0.98rem] leading-snug text-muted md:col-span-3 md:pl-0 lg:col-span-5">
          {t(p.summary)}
        </p>
        <div className="col-span-4 hidden items-start justify-end md:col-span-6 lg:col-span-2 lg:flex">
          <ArrowRight className="size-6 -translate-x-2 opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </Link>
    </li>
  );
}

export function ProjectList({ projects, showYear = true }: { projects: Project[]; showYear?: boolean }) {
  return (
    <ul>
      {projects.map((p) => (
        <ProjectRow key={p.slug} project={p} showYear={showYear} />
      ))}
    </ul>
  );
}
