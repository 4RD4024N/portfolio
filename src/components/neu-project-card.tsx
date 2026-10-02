"use client";

import Image from "next/image";
import { useLang } from "@/components/lang";
import { neuvikon, ui, type Lang, type NeuProject } from "@/content";

// Neuvikon sitesindeki İngilizce sayfalar /en altında
export function neuHref(href: string, lang: Lang) {
  return lang === "en" && href.startsWith(neuvikon.site) ? href.replace(neuvikon.site, `${neuvikon.site}/en`) : href;
}

export function NeuProjectRow({ project: p }: { project: NeuProject }) {
  const { lang, t } = useLang();
  const internal = p.href.startsWith("/");

  return (
    <li className="flex gap-4 border-t border-line py-5 first:border-t-0">
      {p.image ? (
        <Image src={p.image} alt="" width={40} height={40} className="mt-0.5 size-10 shrink-0 rounded-lg" />
      ) : (
        <span className="mt-0.5 size-10 shrink-0 rounded-lg border border-line" aria-hidden />
      )}
      <div className="min-w-0">
        <h3 className="font-medium">
          <a
            href={neuHref(p.href, lang)}
            target={internal ? undefined : "_blank"}
            rel={internal ? undefined : "noreferrer"}
            className="link"
          >
            {p.name}
          </a>
          <span className="ml-2 text-sm font-normal text-muted">{p.status === "live" ? t(ui.live) : t(ui.inDev)}</span>
        </h3>
        <p className="mt-1 text-muted">{t(p.description)}</p>
        <p className="mt-2 text-sm text-muted">
          {p.tags.join(", ")}
          {p.links?.map((l) => (
            <span key={l.href}>
              {" · "}
              <a href={l.href} target="_blank" rel="noreferrer" className="link text-fg/80">
                {l.label}
              </a>
            </span>
          ))}
        </p>
      </div>
    </li>
  );
}
