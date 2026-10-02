"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { Reveal } from "@/components/reveal";
import { ui, type Project } from "@/content";

// Proje adından iki harflik kısaltma: "Advisory System" → "AS"
export function initials(title: string) {
  const words = title.replace(/[^\p{L}\p{N} ]/gu, " ").split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words[0][0] + words[1][0] : title.slice(0, 2)).toUpperCase();
}

export function ProjectRow({ project: p, showYear = true, index = 0 }: { project: Project; showYear?: boolean; index?: number }) {
  const { t } = useLang();
  const notes = [p.org?.name, p.private ? t(ui.privateRepo) : null, p.wip ? t(ui.wip) : null].filter(Boolean);

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 70} className={`cat-${p.category}`}>
      <Link
        href={`/projects/${p.slug}`}
        className="group relative -mx-3 flex gap-4 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-[color-mix(in_oklab,var(--c)_8%,transparent)] sm:-mx-4 sm:gap-5 sm:px-4"
      >
        <span className="tile mt-0.5 grid size-11 shrink-0 place-items-center rounded-xl font-mono text-sm font-medium transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
          {initials(p.title)}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="flex flex-wrap items-baseline gap-x-2 font-semibold">
            <span className="transition-colors duration-200 group-hover:text-[var(--c)]">{p.title}</span>
            {showYear && <span className="font-mono text-xs font-normal text-muted">{p.year}</span>}
          </h3>
          <p className="mt-1 text-muted">{t(p.summary)}</p>
          <p className="mt-2 text-sm text-muted/90">
            {p.stack.join(" · ")}
            {notes.length > 0 && <span className="font-medium text-[var(--c)]"> · {notes.join(" · ")}</span>}
          </p>
        </div>
        <span className="mt-3 hidden text-lg text-[var(--c)] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:block">
          →
        </span>
      </Link>
    </Reveal>
  );
}

export function ProjectList({ projects, showYear = true }: { projects: Project[]; showYear?: boolean }) {
  return (
    <ul className="space-y-1">
      {projects.map((p, i) => (
        <ProjectRow key={p.slug} project={p} showYear={showYear} index={i} />
      ))}
    </ul>
  );
}
