"use client";

import { useState } from "react";
import { useLang } from "@/components/lang";
import { ArrowUpRight, Check, Copy, Mail, MapPin, SocialIcon } from "@/components/icons";
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
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <PageHeader eyebrow={t(ui.nav.contact)} title={t(ui.contactTitle)} text={t(ui.contactText)} />

      <div className="grid gap-4 md:grid-cols-[1.5fr_1fr]">
        <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
          <p className="flex items-center gap-2 text-sm text-muted">
            <Mail /> {t(ui.email)}
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 block break-all text-2xl font-medium tracking-tight hover:text-accent sm:text-3xl"
          >
            {profile.email}
          </a>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg hover:opacity-90"
            >
              {t(ui.getInTouch)} <ArrowUpRight />
            </a>
            <button
              onClick={copy}
              className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium hover:bg-surface-2"
            >
              {copied ? <Check className="size-4 text-emerald-400" /> : <Copy />}
              {copied ? t(ui.copied) : t(ui.copy)}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-sm text-muted">{t(ui.elsewhere)}</p>
            <ul className="mt-4 space-y-3">
              {profile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between rounded-lg border border-line px-4 py-3 hover:border-line-strong"
                  >
                    <span className="flex items-center gap-2.5">
                      <SocialIcon label={s.label} /> {s.label}
                    </span>
                    <ArrowUpRight className="size-3.5 text-muted group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface p-6 text-sm text-muted">
            <MapPin /> {t(profile.location)}
          </div>
        </div>
      </div>
    </div>
  );
}
