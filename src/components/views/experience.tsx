"use client";

import Image from "next/image";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { NeuProjectRow } from "@/components/neu-project-card";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { experience, neuvikon, ui, type Job } from "@/content";

const divColors: Record<string, string> = { games: "cat-game", tech: "cat-web", robotics: "cat-desktop" };
export const jobColor: Record<Job["type"], string> = { work: "cat-web", volunteer: "cat-vision", intern: "cat-desktop" };

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <Container>
      <PageHeader title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} dot="bg-coral" />

      {/* Zaman çizelgesi */}
      <ol className="relative">
        <span aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line" />
        {experience.map((e, i) => (
          <Reveal
            as="li"
            key={e.org + e.period.en}
            delay={i * 60}
            className={`${jobColor[e.type]} relative pb-10 pl-9 last:pb-0`}
          >
              <span className="absolute top-1.5 left-0 grid size-[15px] place-items-center rounded-full border-2 border-[var(--c)] bg-bg">
                <span className="size-[5px] rounded-full bg-[var(--c)]" />
              </span>
              <p className="font-mono text-sm text-muted">{t(e.period)}</p>
              <h2 className="mt-1 text-lg font-semibold">
                {t(e.role)}
                <span className="font-normal text-muted"> · </span>
                {e.href ? (
                  <a href="#neuvikon" className="link text-[var(--c)]">
                    {e.org}
                  </a>
                ) : (
                  <span className="text-[var(--c)]">{e.org}</span>
                )}
              </h2>
              <p className="mt-0.5 flex flex-wrap items-center gap-2 text-sm text-muted empty:hidden">
                {e.location && t(e.location)}
                {e.type !== "work" && (
                  <span className="tile rounded-full px-2 py-px text-xs font-medium">
                    {t(e.type === "intern" ? ui.intern : ui.volunteer)}
                  </span>
                )}
              </p>
              <ul className="mt-3 space-y-1.5">
                {e.points[lang].map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-[var(--c)] opacity-70" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
          </Reveal>
        ))}
      </ol>

      {/* Neuvikon */}
      <section id="neuvikon" className="scroll-mt-24 pt-20">
        <Reveal>
          <article className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <div aria-hidden className="blob -right-16 -top-20 size-64 bg-coral" style={{ animation: "drift-1 18s ease-in-out infinite" }} />
            <div aria-hidden className="blob -bottom-24 -left-10 size-56 bg-violet" style={{ animation: "drift-3 22s ease-in-out infinite" }} />

            <div className="relative">
              <p className="text-sm text-muted">{t(ui.aboutNeuvikon)}</p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                <a href={neuSite} target="_blank" rel="noreferrer" className="link">
                  Neuvikon ↗
                </a>
              </h2>
              <p className="mt-4">{t(neuvikon.description)}</p>

              <div className="mt-6 flex -space-x-2">
                {neuvikon.projects
                  .filter((p) => p.image)
                  .map((p) => (
                    <Image
                      key={p.name}
                      src={p.image!}
                      alt={p.name}
                      title={p.name}
                      width={40}
                      height={40}
                      className="size-10 rounded-xl border-2 border-surface transition-transform duration-300 hover:z-10 hover:-translate-y-1.5 hover:scale-110"
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
      </section>

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
