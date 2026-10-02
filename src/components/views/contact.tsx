"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { profile, ui } from "@/content";

export function ContactView() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <Container>
      <PageHeader title={t(ui.contactTitle)} text={t(ui.contactText)} dot="bg-amber" />

      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8">
          <div aria-hidden className="blob -right-12 -top-16 size-56 bg-amber" style={{ animation: "drift-2 17s ease-in-out infinite" }} />
          <div aria-hidden className="blob -bottom-20 left-1/3 size-48 bg-violet" style={{ animation: "drift-1 21s ease-in-out infinite" }} />
          <div className="relative">
            <p className="text-sm text-muted">{t(ui.email)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-2 block break-all text-2xl font-semibold tracking-tight transition-colors hover:text-violet sm:text-3xl"
            >
              {profile.email}
            </a>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5"
              >
                {t(ui.contactTitle)}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
              <button
                onClick={copy}
                className={`rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  copied ? "border-mint bg-mint/10 text-mint" : "border-line hover:border-fg"
                }`}
              >
                {copied ? `✓ ${t(ui.copied)}` : t(ui.copy)}
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      <dl className="mt-8">
        {profile.socials.map((s, i) => (
          <Reveal key={s.label} delay={80 + i * 60}>
            <Row label={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link font-medium">
                {s.href.replace(/^https?:\/\/(www\.)?/, "")} ↗
              </a>
            </Row>
          </Reveal>
        ))}
        <Reveal delay={200}>
          <Row label={t(ui.location)}>{t(profile.location)}</Row>
        </Reveal>
      </dl>
    </Container>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 border-b border-line py-3.5 sm:grid-cols-[8rem_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
