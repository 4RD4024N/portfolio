"use client";

import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { NeuProjectRow } from "@/components/neu-project-card";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { experience, neuvikon, ui } from "@/content";

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <Container>
      <PageHeader title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} />

      {experience.map((e) => (
        <section key={e.org}>
          <div className="flex flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
            <h2 className="text-xl font-medium">
              <a href={neuSite} target="_blank" rel="noreferrer" className="link">
                {e.org}
              </a>
            </h2>
            <span className="font-mono text-sm text-muted">{t(e.period)}</span>
          </div>
          <p className="text-muted">{t(e.role)}</p>
          <p className="mt-5">{t(neuvikon.description)}</p>

          <dl className="mt-8">
            {neuvikon.divisions.map((d) => (
              <div
                key={d.key}
                className="grid gap-x-6 border-t border-line py-3 first:border-t-0 sm:grid-cols-[11rem_1fr]"
              >
                <dt className="font-medium">{d.name}</dt>
                <dd className="text-muted">{t(d.text)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}

      <section className="pt-16">
        <SectionTitle>{t(ui.studioProjects)}</SectionTitle>
        <p className="-mt-3 mb-4 text-muted">{t(ui.studioProjectsNote)}</p>
        {groups.map((g) => (
          <div key={g.key} className="mt-8">
            <h3 className="border-b border-line pb-2 text-sm text-muted">{g.name}</h3>
            <ul>
              {g.projects.map((p) => (
                <NeuProjectRow key={p.name} project={p} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Container>
  );
}
