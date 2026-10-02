"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/components/lang";
import { profile, ui } from "@/content";

const links = [
  { href: "/", label: ui.nav.home },
  { href: "/projects", label: ui.nav.projects },
  { href: "/experience", label: ui.nav.experience },
  { href: "/about", label: ui.nav.about },
  { href: "/contact", label: ui.nav.contact },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("");

  const langToggle = (
    <div className="flex rounded-full border border-line p-0.5 font-mono text-[11px]">
      {(["tr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === l ? "bg-fg text-bg" : "text-muted hover:text-fg"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-bg/75 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border border-line bg-surface font-mono text-xs font-semibold transition-colors group-hover:border-accent/60">
            {initials}
          </span>
          <span className="text-sm font-medium">{profile.name}</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                isActive(l.href) ? "bg-surface-2 text-fg" : "text-muted hover:text-fg"
              }`}
            >
              {t(l.label)}
            </Link>
          ))}
          <div className="ml-3">{langToggle}</div>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          {langToggle}
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid size-9 place-items-center rounded-lg border border-line"
          >
            <svg viewBox="0 0 16 16" className="size-4" fill="none" aria-hidden>
              {open ? (
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              ) : (
                <path d="M2.5 5h11M2.5 11h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-line md:hidden">
          <div className="mx-auto flex max-w-5xl flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-2.5 text-sm ${isActive(l.href) ? "bg-surface-2 text-fg" : "text-muted"}`}
              >
                {t(l.label)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
