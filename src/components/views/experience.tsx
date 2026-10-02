"use client";

import Image from "next/image";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { NeuProjectRow } from "@/components/neu-project-card";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { experience, neuvikon, ui } from "@/content";

const divColors: Record<string, string> = { games: "cat-game", tech: "cat-web", robotics: "cat-desktop" };

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <Container>
      <PageHeader title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} dot="bg-coral" />

      {experience.map((e) => (
        <Reveal key={e.org}>
          <article className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <div aria-hidden className="blob -right-16 -top-20 size-64 bg-coral" style={{ animation: "drift-1 18s ease-in-out infinite" }} />
            <div aria-hidden className="blob -bottom-24 -left-10 size-56 bg-violet" style={{ animation: "drift-3 22s ease-in-out infinite" }} />

            <div className="relative">
              <div className="flex flex-col gap-x-6 gap-y-1 sm:flex-row sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">
                  <a href={neuSite} target="_blank" rel="noreferrer" className="link">
                    {e.org} ↗
                  </a>
                </h2>
                <span className="font-mono text-sm text-muted">{t(e.period)}</span>
              </div>
              <p className="mt-1 font-medium text-coral">{t(e.role)}</p>
              <p className="mt-5">{t(neuvikon.description)}</p>

              <div className="mt-6 flex -space-x-2">
                {neuvikon.projects
                  .filter((p) => p.image)
                  .map((p, i) => (
                    <Image
                      key={p.name}
                      src={p.image!}
                      alt={p.name}
                      title={p.name}
                      width={40}
                      height={40}
                      className="rise size-10 rounded-xl border-2 border-surface transition-transform duration-300 hover:z-10 hover:-translate-y-1.5 hover:scale-110"
                      style={{ animationDelay: `${300 + i * 70}ms` }}
                    />
                  ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {neuvikon.divisions.map((d) => (
                  <div
                    key={d.key}
                    className={`${divColors[d.key]} tile rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1`}
                  >
                    <p className="font-semibold">{d.name}</p>
                    <p className="mt-1 text-sm leading-relaxed text-fg/75">{t(d.text)}</p>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      ))}

      <section className="pt-16">
        <Reveal>
          <SectionTitle dot="bg-violet">{t(ui.studioProjects)}</SectionTitle>
          <p className="-mt-2 mb-4 text-muted">{t(ui.studioProjectsNote)}</p>
        </Reveal>
        {groups.map((g) => (
          <div key={g.key} className="mt-8">
            <h3 className={`${divColors[g.key]} mb-2 flex items-center gap-3 text-sm font-medium text-[var(--c)]`}>
              {g.name}
              <span className="font-mono text-xs text-muted">{g.projects.length}</span>
              <span className="h-px flex-1 bg-line" />
            </h3>
            <ul className="space-y-1">
              {g.projects.map((p, i) => (
                <NeuProjectRow key={p.name} project={p} index={i} />
              ))}
            </ul>
          </div>
        ))}
      </section>
    </Container>
  );
}
