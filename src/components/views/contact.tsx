"use client";

import { Container } from "@/components/chrome";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { Closing } from "@/components/parts";
import { profile, ui } from "@/content";

export function ContactView() {
  const { t } = useLang();
  return (
    <>
      <Closing heading="h1" />
      <Container className="pb-24">
        <dl className="mx-auto grid max-w-[48rem] gap-4 sm:grid-cols-3">
          {profile.socials.map((s) => (
            <div key={s.label} className="rounded-[1.5rem] bg-surface p-6">
              <dt className="text-[0.92rem] text-muted">{s.label}</dt>
              <dd className="mt-1.5">
                <a href={s.href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium break-all text-accent hover:underline">
                  {decodeURIComponent(s.href).replace(/^https?:\/\/(www\.)?/, "").replace(/^linkedin\.com\/in\//, "in/")} <ArrowUpRight />
                </a>
              </dd>
            </div>
          ))}
          <div className="rounded-[1.5rem] bg-surface p-6">
            <dt className="text-[0.92rem] text-muted">{t(ui.location)}</dt>
            <dd className="mt-1.5 font-medium">{t(profile.location)}</dd>
          </div>
        </dl>
      </Container>
    </>
  );
}
