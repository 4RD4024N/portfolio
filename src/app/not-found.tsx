"use client";

import { Container } from "@/components/chrome";
import { useLang } from "@/components/lang";
import { ArrowLink } from "@/components/parts";
import { ui } from "@/content";

export default function NotFound() {
  const { t } = useLang();
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <p className="display text-[clamp(5rem,18vw,6rem)] text-muted tnum">404</p>
      <h1 className="headline mt-6 text-[clamp(1.75rem,4vw,2.6rem)]">{t(ui.notFound)}</h1>
      <ArrowLink href="/" className="mt-8">
        {t(ui.goHome)}
      </ArrowLink>
    </Container>
  );
}
