"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Close, Menu } from "@/components/icons";
import { useLang } from "@/components/lang";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile, ui } from "@/content";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[80rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

const links = [
  { href: "/projects", label: ui.nav.projects },
  { href: "/experience", label: ui.nav.experience },
  { href: "/about", label: ui.nav.about },
  { href: "/contact", label: ui.nav.contact },
];

// Kaydırma ilerlemesi: öğe ekranın altından girince 0, üstünden çıkınca 1
export function useProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(0.5);
      return;
    }
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setP(Math.min(1, Math.max(0, (innerHeight - r.top) / (innerHeight + r.height))));
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { ref, p };
}

// Üst çubuk: yarı saydam, tek ayırıcı çizgi
export function Nav() {
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [pathname]);

  const langSwitch = (
    <div role="group" aria-label={t(ui.language)} className="flex rounded-full bg-surface p-0.5">
      {(["tr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors ${lang === l ? "bg-bg text-ink" : "text-muted hover:text-ink"}`}
        >
          {l}
        </button>
      ))}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl backdrop-saturate-150">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:rounded focus:bg-bg focus:px-3 focus:py-2">
        {t(ui.skip)}
      </a>
      <Container className="flex h-12 items-center justify-between gap-4">
        <Link href="/" className="text-[0.95rem] font-semibold tracking-[-0.01em]">
          {profile.name}
        </Link>
        <nav aria-label={t(ui.menu)} className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const on = pathname.startsWith(l.href);
            return (
              <Link key={l.href} href={l.href} aria-current={on ? "page" : undefined} className={`text-[0.85rem] transition-colors ${on ? "text-ink" : "text-muted hover:text-ink"}`}>
                {t(l.label)}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-1.5">
          <div className="hidden sm:block">{langSwitch}</div>
          <ThemeToggle className="size-9 rounded-full text-muted hover:text-ink" />
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t(ui.menu)} className="grid size-9 place-items-center rounded-full text-muted hover:text-ink md:hidden">
            {open ? <Close className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </Container>
      {open && (
        <div className="border-t border-line md:hidden">
          <Container className="flex flex-col py-3">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="py-2.5 text-[1.35rem] font-semibold tracking-[-0.02em]">
                {t(l.label)}
              </Link>
            ))}
            <div className="mt-3 sm:hidden">{langSwitch}</div>
          </Container>
        </div>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <Container className="py-8 text-sm text-muted tnum">
        © {new Date().getFullYear()} {profile.name}
      </Container>
    </footer>
  );
}
