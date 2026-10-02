"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { ArrowLeft } from "@/components/icons";
import { ui } from "@/content";

export default function NotFound() {
  const { t } = useLang();
  return (
    <div className="mx-auto flex max-w-5xl flex-col items-start px-4 pt-32 sm:px-6">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">{t(ui.notFound)}</h1>
      <Link href="/" className="group mt-8 inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
        <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" /> {t(ui.goHome)}
      </Link>
    </div>
  );
}
