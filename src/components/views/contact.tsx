"use client";

import { useState } from "react";
import { Container, grid } from "@/components/container";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
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
    <>
      <PageHeader title={t(ui.contactTitle)} text={t(ui.contactText)} />

      <Container>
        {/* E-posta: sayfanın tek kırmızı plaketi */}
        <section className="@container rounded-[3px] bg-vermilion text-white shadow-[var(--shadow-board)]">
          <div className={`${grid} gap-y-6 p-6 sm:p-10 lg:p-12`}>
            <a
              href={`mailto:${profile.email}`}
              aria-label={`${t(ui.email)}: ${profile.email}`}
              className="group title col-span-4 flex items-end justify-between gap-4 text-[min(8.2cqi,4.75rem)] whitespace-nowrap md:col-span-6 lg:col-span-12"
            >
              <span>{profile.email}</span>
              <ArrowRight className="mb-[0.1em] size-[0.7em] shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-2" />
            </a>
            <div className="col-span-4 md:col-span-6 lg:col-span-12">
              <button
                onClick={copy}
                className="lift rounded-[2px] bg-white px-4 py-2.5 font-semibold text-vermilion shadow-[var(--shadow-board)]"
              >
                {copied ? t(ui.copied) : t(ui.copy)}
              </button>
            </div>
          </div>
        </section>

        <dl className="board mt-6 px-4 sm:px-6">
          {profile.socials.map((s) => (
            <Row key={s.label} label={s.label}>
              <a href={s.href} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1.5 break-all">
                {decodeURIComponent(s.href).replace(/^https?:\/\/(www\.)?/, "")} <ArrowUpRight />
              </a>
            </Row>
          ))}
          <Row label={t(ui.location)}>{t(profile.location)}</Row>
        </dl>
      </Container>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={`${grid} gap-y-1 border-b border-rule py-4 last:border-b-0`}>
      <dt className="label col-span-4 text-[0.78rem] text-muted md:col-span-2 lg:col-span-3">{label}</dt>
      <dd className="col-span-4 text-lg font-medium md:col-span-4 lg:col-span-9">{children}</dd>
    </div>
  );
}
