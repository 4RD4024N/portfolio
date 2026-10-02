"use client";

import { useLang } from "@/components/lang";
import { ArrowUpRight } from "@/components/icons";
import { NeuProjectCard } from "@/components/neu-project-card";
import { PageHeader } from "@/components/page-header";
import { experience, neuvikon, ui } from "@/content";

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      <PageHeader eyebrow={t(ui.nav.experience)} title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} />

      {/* Deneyim kartları */}
      <div className="space-y-4">
        {experience.map((e) => (
          <article key={e.org} className="rounded-2xl border border-line bg-surface p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{e.org}</h2>
                <p className="mt-1 text-fg/80">{t(e.role)}</p>
              </div>
              <p className="font-mono text-xs text-muted">{t(e.period)}</p>
            </div>
            <p className="mt-5 max-w-3xl leading-relaxed text-muted">{t(neuvikon.description)}</p>

            <h3 className="mt-8 text-xs text-muted">{t(ui.divisions)}</h3>
            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {neuvikon.divisions.map((d) => (
                <div key={d.key} className="rounded-xl border border-line p-4">
                  <p className="text-sm font-medium">{d.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{t(d.text)}</p>
                </div>
              ))}
            </div>

            <a
              href={neuSite}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium hover:bg-surface-2"
            >
              {t(ui.visitSite)} <ArrowUpRight />
            </a>
          </article>
        ))}
      </div>

      {/* Neuvikon projeleri */}
      <section className="pt-20">
        <p lang="en" className="font-mono text-xs uppercase tracking-[0.2em] text-accent">Neuvikon</p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t(ui.studioProjects)}</h2>
        <p className="mt-3 max-w-2xl text-muted">{t(ui.studioProjectsNote)}</p>

        {groups.map((g) => (
          <div key={g.key} className="mt-10">
            <h3 className="mb-4 flex items-center gap-3 text-sm font-medium">
              {g.name}
              <span className="font-mono text-xs text-muted">{g.projects.length}</span>
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.projects.map((p) => (
                <NeuProjectCard key={p.name} project={p} />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
