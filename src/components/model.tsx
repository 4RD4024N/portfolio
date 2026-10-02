"use client";

import Link from "next/link";
import { useState } from "react";
import { useLang } from "@/components/lang";
import { categories, neuvikon, profile, projects, ui, type Category, type T } from "@/content";

type Volume = {
  key: string;
  cls: string;
  label: T;
  n: number; // yükseklik: içindeki iş sayısı
  count: string;
  href: string;
  // taban üzerindeki yeri (birim: --u)
  x: number;
  y: number;
  w: number;
  d: number;
};

export function useVolumes(): Volume[] {
  const { t } = useLang();
  const count = (c: Category) => projects.filter((p) => p.category === c).length;
  const proj = (n: number) => `${n} ${t(ui.projectsWord)}`;
  return [
    { key: "web", cls: "cat-web", label: categories.web, n: count("web"), count: proj(count("web")), href: "/projects?c=web", x: 0.7, y: 0.7, w: 4.2, d: 3.1 },
    { key: "vision", cls: "cat-vision", label: categories.vision, n: count("vision"), count: proj(count("vision")), href: "/projects?c=vision", x: 5.3, y: 0.7, w: 3, d: 3.1 },
    { key: "desktop", cls: "cat-desktop", label: categories.desktop, n: count("desktop"), count: proj(count("desktop")), href: "/projects?c=desktop", x: 8.7, y: 0.7, w: 2.6, d: 3.1 },
    {
      key: "game",
      cls: "cat-game",
      label: categories.game,
      n: count("game"),
      count: `${proj(count("game"))} · Neuvikon ${neuvikon.projects.filter((p) => p.division === "games").length}`,
      href: "/experience#neuvikon",
      x: 0.7,
      y: 4.3,
      w: 2.7,
      d: 3,
    },
    { key: "cloud", cls: "cat-wood", label: ui.cloud, n: 1, count: `1 ${t(ui.internshipWord)}`, href: "/experience", x: 3.8, y: 4.3, w: 2.6, d: 3 },
    { key: "pm", cls: "cat-wood", label: ui.projectWork, n: 2, count: `2 ${t(ui.positionsWord)}`, href: "/experience", x: 6.8, y: 4.3, w: 4.5, d: 3 },
  ];
}

// Kariyerin eksonometrik çalışma maketi: her disiplin bir kütle, yüksekliği içindeki iş kadar
export function CareerModel() {
  const { t } = useLang();
  const volumes = useVolumes();
  // Üzerine gelinen kütle: plakette adı ve sayısı görünür
  const [active, setActive] = useState<number | null>(null);
  const shown = active === null ? null : volumes[active];

  return (
    <div className="model-frame">
    <div className="model" role="group" aria-label={t(ui.rangeLabel)}>
      <div className="model-base">
        {volumes.map((v, i) => (
          <Link
            key={v.key}
            href={v.href}
            aria-label={`${t(v.label)}, ${v.count}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(i)}
            onBlur={() => setActive(null)}
            className={`volume ${v.cls}`}
            style={
              {
                "--x": v.x,
                "--y": v.y,
                "--w": v.w,
                "--d": v.d,
                "--n": v.n,
                "--delay": `${250 + i * 110}ms`,
              } as React.CSSProperties
            }
          >
            <span className="face face-front" />
            <span className="face face-back" />
            <span className="face face-east" />
            <span className="face face-west" />
            <span className="face face-top">
              <span className="label text-[calc(var(--u)*0.3)] leading-[1.05]">{t(v.label).replace(" & ", " & ")}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>

      {/* İsim plaketi: geniş ekranda tabanın boş sağ ön köşesinde, telefon ve tablette maketin altında;
          bir kütleye gelinince o kütleyi anlatır */}
      <div
        className="plaque relative mt-3 px-3 py-2 sm:px-4 sm:py-3 lg:absolute lg:right-0 lg:bottom-0 lg:mt-0 lg:min-w-[calc(var(--u)*7.4)]"
        aria-live="polite"
      >
        <h1 className="title text-[max(1.6rem,calc(var(--u)*0.72))] uppercase">{profile.name}</h1>
        <p className="label mt-1 flex items-center gap-2 text-[max(12px,calc(var(--u)*0.32))]">
          {shown ? (
            <>
              <MassChip className={`${shown.cls} size-[1.1em]`} />
              {t(shown.label)} · {shown.count}
            </>
          ) : (
            <span className="opacity-80">
              {t(profile.role)} · {t(profile.location)}
            </span>
          )}
        </p>
        <div className="mt-2 flex items-end justify-between gap-4">
          <WorkScale />
          <NorthArrow className="size-[max(22px,calc(var(--u)*0.9))]" />
        </div>
      </div>
    </div>
  );
}

// İş ölçeği: bir çentik = bir iş; kütle yükseklikleri bununla okunur
function WorkScale() {
  const { t } = useLang();
  // Bir işin ekrandaki yüksekliği: 0.55u × sin(58°)
  const step = "calc(var(--u) * 0.466)";
  return (
    <div className="label text-[max(10px,calc(var(--u)*0.24))]">
      <div className="relative h-2 border-b border-current" style={{ width: `calc(${step} * 6)` }}>
        {[0, 1, 2, 4, 6].map((n) => (
          <span key={n} className="absolute bottom-0 h-2 border-l border-current" style={{ left: `calc(${step} * ${n})` }} />
        ))}
      </div>
      <div className="relative mt-0.5 h-[1.2em]" style={{ width: `calc(${step} * 6)` }}>
        {[0, 1, 2, 4, 6].map((n) => (
          <span key={n} className="tnum absolute -translate-x-1/2" style={{ left: `calc(${step} * ${n})` }}>
            {n}
          </span>
        ))}
        <span className="absolute left-[calc(100%+0.6em)] whitespace-nowrap normal-case">{t(ui.projectsWord)}</span>
      </div>
    </div>
  );
}

// Küçük kütle simgesi: listelerde düz kare yerine
export function MassChip({ className = "size-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" className={`mass shrink-0 ${className}`} aria-hidden>
      <path d="M2 6.5L10 2l8 4.5L10 11z" className="fill-[var(--c)]" />
      <path d="M2 6.5L10 11v7L2 13.5z" className="fill-[color-mix(in_oklab,var(--c),black_12%)]" />
      <path d="M18 6.5L10 11v7l8-4.5z" className="fill-[color-mix(in_oklab,var(--c),black_36%)]" />
    </svg>
  );
}

// Maketin anahtarı: telefonda ve tablette maketin altında plaket listesi (masaüstünde etiketler maketin üstünde)
export function ModelKey() {
  const { t } = useLang();
  const volumes = useVolumes();
  return (
    <ul className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 md:grid-cols-3 lg:hidden">
      {volumes.map((v) => (
        <li key={v.key}>
          <Link href={v.href} className={`plaque lift ${v.cls} flex items-center gap-3 px-3 py-2.5`}>
            <MassChip className="size-5" />
            <span className="min-w-0">
              <span className="label block text-[0.8rem] leading-tight">{t(v.label)}</span>
              <span className="tnum block text-sm opacity-80">{v.count}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

// Kuzey oku
export function NorthArrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="none">
      <circle cx="16" cy="16" r="13" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 5l5 15-5-3-5 3z" fill="currentColor" />
      <path d="M13.5 26.5v-5l5 5v-5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}
