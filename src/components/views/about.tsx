"use client";

import Link from "next/link";
import { useLang } from "@/components/lang";
import { ArrowRight } from "@/components/icons";
import { PageHeader } from "@/components/page-header";
import { education, focus, profile, skills, ui } from "@/content";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-line py-12 md:grid-cols-[200px_1fr]">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export function AboutView() {
  const { t } = useLang();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <PageHeader eyebrow={t(ui.nav.about)} title={t(ui.aboutTitle)} text={t(profile.intro)} />

      <Block title={t(ui.aboutTitle)}>
        <div className="max-w-2xl space-y-5 text-lg leading-relaxed text-fg/85">
          {t(profile.about)
            .split("\n\n")
            .map((para, i) => (
              <p key={i}>{para}</p>
            ))}
        </div>
      </Block>

      <Block title={t(ui.focus)}>
        <div className="grid gap-4 sm:grid-cols-3">
          {focus.map((f, i) => (
            <div key={i} className="rounded-2xl border border-line bg-surface p-5">
              <span className="font-mono text-xs text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-medium">{t(f.title)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{t(f.text)}</p>
            </div>
          ))}
        </div>
      </Block>

      <Block title={t(ui.skills)}>
        <dl className="divide-y divide-line">
          {skills.map((s) => (
            <div key={s.group.en} className="grid gap-3 py-4 first:pt-0 sm:grid-cols-[180px_1fr]">
              <dt className="text-sm text-muted">{t(s.group)}</dt>
              <dd className="flex flex-wrap gap-1.5">
                {s.items.map((item) => (
                  <span key={item} className="rounded-md border border-line bg-surface px-2.5 py-1 text-sm">
                    {item}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block title={t(ui.education)}>
        <ul className="space-y-4">
          {education.map((e) => (
            <li key={e.school} className="flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
              <div>
                <p className="font-medium">{e.school}</p>
                <p className="text-muted">{t(e.degree)}</p>
              </div>
              <p className="font-mono text-xs text-muted">{t(e.period)}</p>
            </li>
          ))}
        </ul>
      </Block>

      <div className="flex flex-wrap gap-3 border-t border-line pt-12">
        <Link
          href="/projects"
          className="group flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg hover:opacity-90"
        >
          {t(ui.seeProjects)} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        {profile.cv && (
          <a
            href={profile.cv}
            download
            className="rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium hover:bg-surface-2"
          >
            {t(ui.downloadCv)}
          </a>
        )}
      </div>
    </div>
  );
}
