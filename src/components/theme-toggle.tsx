"use client";

import { useEffect, useState } from "react";
import { useLang } from "@/components/lang";
import { ui } from "@/content";

type Theme = "light" | "dark";

// Açık / koyu tema düğmesi: yarısı dolu kare, dolu yarı mevcut temanın tersini gösterir
export function ThemeToggle() {
  const { t } = useLang();
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  const label = t(theme === "dark" ? ui.toLight : ui.toDark);

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="group grid size-7 place-items-center text-ink transition-colors hover:text-vermilion-ink"
    >
      <svg viewBox="0 0 16 16" className="size-4 transition-transform duration-500 ease-out-expo group-hover:rotate-180" aria-hidden>
        <rect x="1.5" y="1.5" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1.5 1.5h6.5v13H1.5z" fill="currentColor" />
      </svg>
    </button>
  );
}
