"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { ui, type Project } from "@/content";

// Proje listesindeki tek satır
export function ProjectRow({ project: p, showYear = true }: { project: Project; showYear?: boolean }) {
  const { t } = useLang();
  const notes = [p.org?.name, p.private ? t(ui.privateRepo) : null, p.wip ? t(ui.wip) : null].filter(Boolean);

  return (
    <li className="border-t border-line first:border-t-0">
      <Link href={`/projects/${p.slug}`} className="group grid gap-x-6 py-5 sm:grid-cols-[3rem_1fr]">
        {showYear && <span className="hidden pt-px font-mono text-sm text-muted sm:block">{p.year}</span>}
        <div className={showYear ? "" : "sm:col-span-2"}>
          <h3 className="font-medium decoration-1 underline-offset-4 group-hover:text-accent group-hover:underline">
            {p.title}
            {showYear && <span className="ml-2 font-mono text-sm font-normal text-muted sm:hidden">{p.year}</span>}
          </h3>
          <p className="mt-1 text-muted">{t(p.summary)}</p>
          <p className="mt-2 text-sm text-muted">
            {p.stack.join(", ")}
            {notes.length > 0 && <span className="text-fg/70"> · {notes.join(" · ")}</span>}
          </p>
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
