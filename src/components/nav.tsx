"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
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
    <header className="pt-8 pb-4 sm:pt-12">
      {/* Mobilde: 1. satır isim + dil, 2. satır linkler. Geniş ekranda hepsi tek satır. */}
      <Container className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-3">
        <Link href="/" className="order-1 font-medium hover:text-accent">
          {profile.name}
        </Link>

        <span className="order-2 font-mono text-[13px] text-muted sm:order-3">
          {(["tr", "en"] as const).map((l, i) => (
            <span key={l}>
              {i > 0 && <span className="px-1">/</span>}
              <button
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={`uppercase ${lang === l ? "text-fg" : "hover:text-fg"}`}
              >
                {l}
              </button>
            </span>
          ))}
        </span>

        <nav className="order-3 flex w-full flex-wrap items-baseline gap-x-4 gap-y-2 text-sm sm:order-2 sm:ml-auto sm:w-auto sm:gap-x-5 sm:text-[15px]">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={active ? "text-fg underline decoration-1 underline-offset-[6px]" : "text-muted hover:text-fg"}
              >
                {t(l.label)}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
