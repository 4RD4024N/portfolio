"use client";

import Image from "next/image";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { neuvikon, ui, type Lang, type NeuProject } from "@/content";

// Neuvikon sitesindeki İngilizce sayfalar /en altında
export function neuHref(href: string, lang: Lang) {
  return lang === "en" && href.startsWith(neuvikon.site) ? href.replace(neuvikon.site, `${neuvikon.site}/en`) : href;
}

export function NeuProjectRow({ project: p }: { project: NeuProject }) {
  const { lang, t } = useLang();
  const live = p.status === "live";

  return (
    <li className="relative border-t border-line">
      <div className="group grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-2 py-5 sm:grid-cols-[3rem_minmax(0,1fr)_auto]">
        {p.image ? (
          <Image src={p.image} alt="" width={48} height={48} className="size-12 rounded-[12px]" />
        ) : (
          <span className="grid size-12 place-items-center rounded-[12px] bg-surface text-[0.9rem] font-bold text-[var(--c)]">{p.name.replace(/[^A-Za-z]/g, "").slice(0, 2)}</span>
        )}
        <div className="min-w-0">
          <h5 className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a
              href={neuHref(p.href, lang)}
              target="_blank"
              rel="noreferrer"
              className="text-[1.15rem] font-semibold tracking-[-0.015em] transition-colors group-hover:text-accent after:absolute after:inset-0"
            >
              {p.name}
            </a>
            <span className={`rounded-full px-2.5 py-0.5 text-[0.78rem] font-medium ${live ? "bg-[var(--c)] text-bg" : "bg-surface text-muted"}`}>
              {live ? t(ui.live) : t(ui.inDev)}
            </span>
          </h5>
          <p className="mt-1 leading-relaxed text-muted">{t(p.description)}</p>
          <p className="mt-1 text-[0.88rem] text-muted">{p.tags.join(" · ")}</p>
        </div>
        {p.links && (
          <p className="relative z-10 col-start-2 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] sm:col-start-3 sm:flex-col sm:items-end">
            {p.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                {l.label} <ArrowUpRight />
              </a>
            ))}
          </p>
        )}
      </div>
    </li>
  );
}
