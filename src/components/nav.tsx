"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container, grid } from "@/components/container";
import { useLang } from "@/components/lang";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile, ui } from "@/content";

const links = [
  { href: "/projects", label: ui.nav.projects },
  { href: "/experience", label: ui.nav.experience },
  { href: "/about", label: ui.nav.about },
  { href: "/contact", label: ui.nav.contact },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-paper">
      <Container className={`${grid} items-center gap-y-2 py-3 sm:py-4`}>
        <Link href="/" className="group col-span-2 flex items-center gap-2.5 font-bold md:col-span-2 lg:col-span-3">
          <span className="size-3 bg-red transition-transform duration-300 ease-out-expo group-hover:rotate-45" />
          <span className="condensed text-lg tracking-tight">{profile.name}</span>
        </Link>

        {/* Dil seçimi: telefonda isimle aynı satırda */}
        <div className="col-span-2 flex items-center justify-end gap-2 text-sm font-semibold md:order-3 md:col-span-1 lg:col-span-2">
          <ThemeToggle />
          {(["tr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`px-1.5 py-1 uppercase transition-colors ${lang === l ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              {l}
            </button>
          ))}
        </div>

        <nav
          aria-label={t(ui.menu)}
          className="col-span-4 -mx-1 flex flex-wrap gap-x-1 text-[0.95rem] font-semibold md:order-2 md:col-span-3 md:justify-end lg:col-span-7"
        >
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`flex items-center gap-1.5 px-1 py-1 transition-colors max-[360px]:text-[0.85rem] ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  className={`size-1.5 bg-red transition-transform duration-300 ease-out-expo ${active ? "scale-100" : "scale-0"}`}
                />
                {t(l.label)}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
