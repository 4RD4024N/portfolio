"use client";

import { useState } from "react";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader } from "@/components/page-header";
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
      <PageHeader title={t(ui.contactTitle)} text={t(ui.contactText)} />

      <dl>
        <Row label={t(ui.email)}>
          <a href={`mailto:${profile.email}`} className="link break-all">
            {profile.email}
          </a>
          <button onClick={copy} className="ml-3 text-sm text-muted hover:text-fg">
            {copied ? t(ui.copied) : t(ui.copy)}
          </button>
        </Row>
        {profile.socials.map((s) => (
          <Row key={s.label} label={s.label}>
            <a href={s.href} target="_blank" rel="noreferrer" className="link break-all">
              {s.href.replace(/^https?:\/\/(www\.)?/, "")}
            </a>
          </Row>
        ))}
        <Row label={t(ui.location)}>{t(profile.location)}</Row>
      </dl>
    </Container>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-x-6 border-t border-line py-3 first:border-t-0 sm:grid-cols-[8rem_1fr]">
      <dt className="text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
