"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { ArrowUpRight, Lock } from "@/components/icons";
import { categories, ui, type Project } from "@/content";

export function ProjectCard({ project: p, large = false }: { project: Project; large?: boolean }) {
  const { t } = useLang();
  return (
    <Link
      href={`/projects/${p.slug}`}
      className="group relative flex flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-surface-2"
    >
      <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted">
        <span className="flex items-center gap-2">
          <span className={`size-1.5 rounded-full cat-${p.category}`} />
          {t(categories[p.category])}
        </span>
        <span>{p.year}</span>
      </div>
      <h3 className={`mt-5 font-semibold tracking-tight ${large ? "text-2xl" : "text-xl"}`}>
        {p.title}
        <ArrowUpRight className="ml-1.5 inline size-4 -translate-y-0.5 text-muted opacity-0 transition-all group-hover:translate-x-0.5 group-hover:text-accent group-hover:opacity-100" />
      </h3>
      <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{t(p.summary)}</p>
      <ul className="mt-6 flex flex-wrap gap-1.5">
        {p.stack.slice(0, large ? 6 : 4).map((s) => (
          <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-fg/70">
            {s}
          </li>
        ))}
      </ul>
      {(p.private || p.wip) && (
        <div className="mt-4 flex gap-2 border-t border-line pt-4 text-xs text-muted">
          {p.private && (
            <span className="flex items-center gap-1.5">
              <Lock className="size-3" /> {t(ui.privateRepo)}
            </span>
          )}
          {p.private && p.wip && <span className="text-line-strong">·</span>}
          {p.wip && <span className="text-amber-300/80">{t(ui.wip)}</span>}
        </div>
      )}
    </Link>
  );
}
