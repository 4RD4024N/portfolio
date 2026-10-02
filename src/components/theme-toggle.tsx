"use client";

import { useEffect, useState } from "react";
import { Contrast } from "@/components/icons";
import { useLang } from "@/components/lang";
import { ui } from "@/content";

type Theme = "light" | "dark";

// Açık / koyu tema düğmesi
export function ThemeToggle({ className = "" }: { className?: string }) {
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
    <button onClick={toggle} aria-label={label} title={label} className={`group grid place-items-center transition-colors ${className}`}>
      <Contrast className="size-[1.1rem] transition-transform duration-500 ease-out-expo group-hover:rotate-180" />
    </button>
  );
}
