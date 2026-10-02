"use client";

import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { categories, neuvikon, projects, ui, type Category, type T } from "@/content";

type Field = { key: string; cls: string; label: T; count: string; detail: string; href: string };

// İsmin altındaki yelpaze şeridi: her disiplin bir renk alanı, üzerine gelince ızgara boyunca açılır
export function RangeBar() {
  const { t } = useLang();

  const byCat = (c: Category) => projects.filter((p) => p.category === c);
  const projectField = (c: Category): Field => {
    const list = byCat(c);
    return {
      key: c,
      cls: `cat-${c}`,
      label: categories[c],
      count: `${list.length} ${t(ui.projectsWord)}`,
      detail: list
        .slice(0, 3)
        .map((p) => p.title)
        .join(", "),
      href: `/projects?c=${c}`,
    };
  };

  const studioGames = neuvikon.projects.filter((p) => p.division === "games").length;
  const fields: Field[] = [
    projectField("web"),
    projectField("vision"),
    projectField("desktop"),
    { ...projectField("game"), detail: `${t(ui.gamesSub)} (${studioGames})`, href: "/experience#neuvikon" },
    { key: "cloud", cls: "cat-neutral", label: ui.cloud, count: `1 ${t(ui.internshipWord)}`, detail: t(ui.cloudSub), href: "/experience" },
    {
      key: "pm",
      cls: "cat-neutral",
      label: ui.projectWork,
      count: `2 ${t(ui.positionsWord)}`,
      detail: t(ui.projectWorkSub),
      href: "/experience",
    },
  ];

  return (
    <nav aria-label={t(ui.rangeLabel)} className="relative z-10">
      <ul className="grid grid-cols-1 gap-px bg-ink sm:grid-cols-2 md:grid-cols-3 lg:flex lg:h-[clamp(10rem,22vh,14rem)]">
        {fields.map((f, i) => (
          <li
            key={f.key}
            className={`${f.cls} wipe-in group/field lg:flex-1 lg:transition-[flex-grow] lg:duration-700 lg:ease-out-expo lg:hover:grow-[2.3] lg:has-[:focus-visible]:grow-[2.3]`}
            style={{ animationDelay: `${350 + i * 90}ms` }}
          >
            <Link
              href={f.href}
              className="flex h-full min-h-[5.5rem] flex-col justify-between gap-3 bg-[var(--c)] p-4 text-[var(--on)] outline-offset-[-3px] focus-visible:outline-[var(--on)] sm:p-5"
            >
              <span className="flex items-start justify-between gap-3">
                <span className="condensed text-xl leading-tight font-extrabold tracking-tight lg:text-[1.6rem]">
                  {t(f.label).replace(" & ", "\u00A0& ")}
                </span>
                <ArrowRight className="mt-1 size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover/field:translate-x-1" />
              </span>
              <span className="block">
                <span className="tnum block text-sm font-semibold">{f.count}</span>
                {/* Ayrıntı: telefonda hep görünür, geniş ekranda alan açılınca belirir */}
                <span className="mt-1 block text-sm leading-snug opacity-80 lg:max-h-0 lg:overflow-hidden lg:opacity-0 lg:transition-all lg:duration-500 lg:ease-out-expo lg:group-hover/field:max-h-16 lg:group-hover/field:opacity-90 lg:group-has-[:focus-visible]/field:max-h-16 lg:group-has-[:focus-visible]/field:opacity-90">
                  {f.detail}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
