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

// Masanın üstünde duran beyaz pano; isim küçük bir balsa plaket
export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 bg-board/90 shadow-[var(--shadow-board)] backdrop-blur-sm">
      <Container className={`${grid} items-center gap-y-2 py-2.5 sm:py-3`}>
        <Link href="/" className="col-span-2 md:col-span-2 lg:col-span-3">
          <span className="plaque lift inline-block px-2.5 py-1">
            <span className="title text-[0.95rem] tracking-wide uppercase">{profile.name}</span>
          </span>
        </Link>

        {/* Tema ve dil: telefonda isimle aynı satırda */}
        <div className="col-span-2 flex items-center justify-end gap-1.5 md:order-3 md:col-span-1 lg:col-span-2">
          <ThemeToggle />
          {(["tr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`label rounded-[2px] px-1.5 py-1 text-xs transition-colors ${
                lang === l ? "bg-ink text-board" : "text-muted hover:text-ink"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <nav
          aria-label={t(ui.menu)}
          className="col-span-4 -mx-1.5 flex flex-wrap gap-x-1 md:order-2 md:col-span-3 md:justify-end lg:col-span-7"
        >
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`label relative px-1.5 py-1.5 text-[0.82rem] transition-colors max-[360px]:text-[0.74rem] ${
                  active ? "text-ink" : "text-muted hover:text-ink"
                }`}
              >
                {t(l.label)}
                <span
                  className={`absolute inset-x-1.5 -bottom-0.5 h-[3px] rounded-full bg-vermilion transition-transform duration-500 ease-out-expo ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
