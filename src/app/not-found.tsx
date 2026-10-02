"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { ui } from "@/content";

export default function NotFound() {
  const { t } = useLang();
  return (
    <Container className="pt-16">
      <p className="font-mono text-sm text-muted">404</p>
      <h1 className="mt-3 text-[1.75rem] font-medium leading-tight tracking-tight">{t(ui.notFound)}</h1>
      <Link href="/" className="link mt-6 inline-block">
        ← {t(ui.goHome)}
      </Link>
    </Container>
  );
}
