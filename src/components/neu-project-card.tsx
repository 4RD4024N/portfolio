"use client";

import Image from "next/image";
import { useLang } from "@/components/lang";
import { ArrowUpRight } from "@/components/icons";
import { neuvikon, ui, type Lang, type NeuProject } from "@/content";

// Neuvikon sitesindeki İngilizce sayfalar /en altında
export function neuHref(href: string, lang: Lang) {
  return lang === "en" && href.startsWith(neuvikon.site) ? href.replace(neuvikon.site, `${neuvikon.site}/en`) : href;
}

export function NeuProjectCard({ project: p }: { project: NeuProject }) {
  const { lang, t } = useLang();
  const internal = p.href.startsWith("/");

  return (
    <div className="group relative flex flex-col rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-line-strong hover:bg-surface-2">
      <div className="flex items-start gap-4">
        {p.image ? (
          <Image src={p.image} alt="" width={56} height={56} className="size-14 shrink-0 rounded-xl border border-line" />
        ) : (
          <span className="grid size-14 shrink-0 place-items-center rounded-xl border border-line bg-surface-2 font-mono text-sm text-muted">
            {p.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-semibold tracking-tight">
            <a
              href={neuHref(p.href, lang)}
              target={internal ? undefined : "_blank"}
              rel={internal ? undefined : "noreferrer"}
              className="after:absolute after:inset-0"
            >
              {p.name}
            </a>
          </h3>
          <p className="mt-0.5 text-sm text-fg/75">{t(p.tagline)}</p>
        </div>
        <ArrowUpRight className="ml-auto size-3.5 shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">{t(p.description)}</p>
      <div className="mt-4 flex flex-wrap items-center gap-1.5">
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
            p.status === "live" ? "bg-emerald-400/10 text-emerald-300" : "bg-amber-300/10 text-amber-300/90"
          }`}
        >
          {p.status === "live" ? t(ui.live) : t(ui.inDev)}
        </span>
        {p.tags.map((tag) => (
          <span key={tag} className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-fg/70">
            {tag}
          </span>
        ))}
      </div>
      {p.links && (
        <div className="relative z-10 mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-line pt-3 text-xs">
          {p.links.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-muted hover:text-accent">
              {l.label} <ArrowUpRight className="size-3" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
