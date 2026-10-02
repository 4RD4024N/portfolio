"use client";

import Image from "next/image";
import { useLang } from "@/components/lang";
import { Reveal } from "@/components/reveal";
import { neuvikon, ui, type Lang, type NeuProject } from "@/content";

// Neuvikon sitesindeki İngilizce sayfalar /en altında
export function neuHref(href: string, lang: Lang) {
  return lang === "en" && href.startsWith(neuvikon.site) ? href.replace(neuvikon.site, `${neuvikon.site}/en`) : href;
}

export function NeuProjectRow({ project: p, index = 0 }: { project: NeuProject; index?: number }) {
  const { lang, t } = useLang();
  const internal = p.href.startsWith("/");
  const live = p.status === "live";

  return (
    <Reveal as="li" delay={Math.min(index, 6) * 70} className={live ? "cat-desktop" : "cat-game"}>
      <div className="group relative -mx-3 flex gap-4 rounded-2xl px-3 py-4 transition-colors duration-300 hover:bg-surface sm:-mx-4 sm:px-4">
        {p.image ? (
          <Image
            src={p.image}
            alt=""
            width={48}
            height={48}
            className="mt-0.5 size-12 shrink-0 rounded-xl shadow-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
          />
        ) : (
          <span className="cat-web tile mt-0.5 grid size-12 shrink-0 place-items-center rounded-xl font-mono text-sm transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
            {p.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold">
            <a
              href={neuHref(p.href, lang)}
              target={internal ? undefined : "_blank"}
              rel={internal ? undefined : "noreferrer"}
              className="transition-colors after:absolute after:inset-0 group-hover:text-accent"
            >
              {p.name}
            </a>
            <span className="tile rounded-full px-2 py-0.5 text-xs font-medium">{live ? t(ui.live) : t(ui.inDev)}</span>
          </h3>
          <p className="mt-1 text-muted">{t(p.description)}</p>
          <p className="relative z-10 mt-2 text-sm text-muted">
            {p.tags.join(" · ")}
            {p.links?.map((l) => (
              <span key={l.href}>
                {"  ·  "}
                <a href={l.href} target="_blank" rel="noreferrer" className="link font-medium text-fg">
                  {l.label} ↗
                </a>
              </span>
            ))}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
