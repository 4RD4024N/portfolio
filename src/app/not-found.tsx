"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { ArrowLeft } from "@/components/icons";
import { useLang } from "@/components/lang";
import { ui } from "@/content";

export default function NotFound() {
  const { t } = useLang();
  return (
    <Container className="pt-16 sm:pt-24">
      <p className="title tnum text-[clamp(5rem,18vw,11rem)] text-vermilion-ink">404</p>
      <h1 className="title mt-4 max-w-[24ch] text-3xl">{t(ui.notFound)}</h1>
      <Link href="/" className="link mt-8 inline-flex items-center gap-1.5 font-semibold">
        <ArrowLeft className="size-4" /> {t(ui.goHome)}
      </Link>
    </Container>
  );
}
