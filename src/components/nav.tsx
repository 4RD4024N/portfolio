"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { profile, ui } from "@/content";

const links = [
  { href: "/projects", label: ui.nav.projects, color: "bg-violet" },
  { href: "/experience", label: ui.nav.experience, color: "bg-coral" },
  { href: "/about", label: ui.nav.about, color: "bg-mint" },
  { href: "/contact", label: ui.nav.contact, color: "bg-amber" },
];

export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-[background-color,border-color,padding] duration-300 ${
        scrolled ? "border-b border-line bg-bg/80 py-3 backdrop-blur-md" : "border-b border-transparent py-5 sm:py-7"
      }`}
    >
      {/* Mobilde: 1. satır isim + dil, 2. satır linkler. Geniş ekranda tek satır. */}
      <Container className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
        <Link href="/" className="group order-1 flex items-center gap-2 font-medium">
          <span className="relative flex size-2.5">
            <span className="size-2.5 rounded-full bg-violet transition-transform duration-300 group-hover:scale-125" />
          </span>
          <span className="transition-colors group-hover:text-accent">{profile.name}</span>
        </Link>

        <div className="order-2 flex rounded-full border border-line p-0.5 font-mono text-[12px] sm:order-3">
          {(["tr", "en"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              aria-pressed={lang === l}
              className={`rounded-full px-2.5 py-0.5 uppercase transition-colors duration-300 ${
                lang === l ? "bg-fg text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <nav className="order-3 flex w-full flex-wrap items-center gap-x-1 text-sm sm:order-2 sm:ml-auto sm:w-auto sm:text-[15px]">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`group relative rounded-full px-2.5 py-1 transition-colors duration-200 first:-ml-2.5 max-[360px]:px-1.5 max-[360px]:text-[13px] max-[360px]:first:-ml-1.5 sm:first:ml-0 ${
                  active ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {t(l.label)}
                <span
                  className={`absolute bottom-0 left-1/2 h-[3px] -translate-x-1/2 rounded-full ${l.color} transition-all duration-300 ${
                    active ? "w-4 opacity-100" : "w-0 opacity-0 group-hover:w-2 group-hover:opacity-70"
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
