"use client";

import Image from "next/image";
import { grid } from "@/components/container";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { neuvikon, ui, type Lang, type NeuProject } from "@/content";

// Neuvikon sitesindeki İngilizce sayfalar /en altında
export function neuHref(href: string, lang: Lang) {
  return lang === "en" && href.startsWith(neuvikon.site) ? href.replace(neuvikon.site, `${neuvikon.site}/en`) : href;
}

export function NeuProjectRow({ project: p }: { project: NeuProject }) {
  const { lang, t } = useLang();
  const internal = p.href.startsWith("/");
  const live = p.status === "live";

  return (
    <li className={`cat-neutral relative border-b border-rule`}>
      <div className={`row-wipe group ${grid} gap-y-2 py-4`}>
        <div className="col-span-4 flex items-center gap-4 md:col-span-3 lg:col-span-4">
          {p.image ? (
            <Image src={p.image} alt="" width={48} height={48} className="size-12 shrink-0" />
          ) : (
            <span className="grid size-12 shrink-0 place-items-center bg-ink text-sm font-bold text-paper">
              {p.name.slice(0, 2).toUpperCase()}
            </span>
          )}
          <div className="min-w-0">
            <h4 className="condensed text-xl leading-tight font-bold tracking-tight">
              <a
                href={neuHref(p.href, lang)}
                target={internal ? undefined : "_blank"}
                rel={internal ? undefined : "noreferrer"}
                className="after:absolute after:inset-0"
              >
                {p.name}
              </a>
            </h4>
            <p className="flex items-center gap-1.5 text-sm font-semibold">
              <span className={`size-2 ${live ? "bg-green" : "bg-yellow"}`} />
              {live ? t(ui.live) : t(ui.inDev)}
            </p>
          </div>
        </div>
        <p className="row-muted col-span-4 leading-snug text-muted md:col-span-3 lg:col-span-5">{t(p.description)}</p>
        <p className="row-muted relative z-10 col-span-4 flex flex-wrap items-start gap-x-3 gap-y-1 text-sm font-semibold text-muted md:col-span-6 lg:col-span-3 lg:justify-end lg:text-right">
          <span>{p.tags.join(", ")}</span>
          {p.links?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1 text-ink">
              {l.label} <ArrowUpRight />
            </a>
          ))}
        </p>
      </div>
    </li>
  );
}
