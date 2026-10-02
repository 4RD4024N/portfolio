"use client";

import Link from "next/link";
import { grid } from "@/components/container";
import { ArrowRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { MassChip } from "@/components/model";
import { categories, ui, type Project } from "@/content";

// Yaş: en yeni yıl 0, her geçen yıl akrilik biraz daha soluk
const NEWEST = 2026;
export const ageOf = (year: string) => String(Math.min(3, Math.max(0, NEWEST - Number(year))));

// Proje satırı: renk akriliği, ad, kategori, özet
export function ProjectRow({ project: p, showYear = true }: { project: Project; showYear?: boolean }) {
  const { t } = useLang();
  const notes = [p.org?.name, p.private ? t(ui.privateRepo) : null, p.wip ? t(ui.wip) : null].filter(Boolean);

  return (
    <li className={`cat-${p.category} border-b border-rule last:border-b-0`} data-age={ageOf(p.year)}>
      <Link href={`/projects/${p.slug}`} className={`group ${grid} gap-y-1 py-5 sm:py-6`}>
        <span className="tnum col-span-1 hidden pt-1 text-sm text-muted lg:block">{showYear ? p.year : ""}</span>
        <div className="col-span-4 flex items-start gap-3.5 md:col-span-3 lg:col-span-4">
          <MassChip className="mt-0.5 size-6 transition-transform duration-500 ease-out-expo group-hover:-translate-y-1" />
          <div className="min-w-0">
            <h3 className="title text-xl transition-colors group-hover:text-vermilion-ink sm:text-[1.4rem]">{p.title}</h3>
            <p className="mt-1 text-sm text-muted">
              {t(categories[p.category])}
              {showYear && <span className="tnum lg:hidden"> · {p.year}</span>}
              {notes.length > 0 && <span> · {notes.join(" · ")}</span>}
            </p>
          </div>
        </div>
        <p className="col-span-4 pl-[2.375rem] leading-snug text-muted md:col-span-3 md:pl-0 lg:col-span-5">{t(p.summary)}</p>
        <div className="col-span-2 hidden items-start justify-end lg:flex">
          <ArrowRight className="size-5 -translate-x-2 text-vermilion-ink opacity-0 transition-all duration-500 ease-out-expo group-hover:translate-x-0 group-hover:opacity-100" />
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
