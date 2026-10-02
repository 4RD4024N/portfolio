"use client";

import Image from "next/image";
import { Container, grid } from "@/components/container";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { MassChip } from "@/components/model";
import { NeuProjectRow } from "@/components/neu-project-card";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { ContactClose } from "@/components/views/home";
import { experience, neuvikon, ui, type Job } from "@/content";

// Neuvikon bölümleri sitenin akrilik renklerini kullanır
const divisionCls: Record<string, string> = { games: "cat-game", tech: "cat-web", robotics: "cat-desktop" };
// İş türüne göre zaman çizelgesi işareti
const jobCls: Record<Job["type"], string> = { work: "cat-red", volunteer: "cat-wood", intern: "cat-web" };

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <>
      <PageHeader title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} />

      {/* Görevler: her biri bir pano */}
      <Container>
        <ol className="space-y-4">
          {experience.map((e) => (
            <li key={e.org + e.period.en} className={`${jobCls[e.type]} board ${grid} gap-y-3 p-5 sm:p-7`}>
              <div className="col-span-4 md:col-span-2 lg:col-span-3">
                <p className="tnum font-semibold">{t(e.period)}</p>
                {e.location && <p className="text-sm text-muted">{t(e.location)}</p>}
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-4">
                <h2 className="title text-2xl">{t(e.role)}</h2>
                <p className="mt-1.5 flex flex-wrap items-center gap-2 font-medium">
                  <MassChip className="size-5" />
                  {e.href ? (
                    <a href="#neuvikon" className="link">
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                  {e.type !== "work" && (
                    <span className="plaque label px-1.5 py-0.5 text-[0.68rem]">
                      {t(e.type === "intern" ? ui.intern : ui.volunteer)}
                    </span>
                  )}
                </p>
              </div>
              <ul className="col-span-4 space-y-2 md:col-span-4 md:col-start-3 lg:col-span-5 lg:col-start-auto">
                {e.points[lang].map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 rounded-full bg-muted" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>

      {/* Neuvikon */}
      <Container className="pt-20 sm:pt-28">
        <section id="neuvikon" className="scroll-mt-24">
          <SectionTitle
            aside={
              <a href={neuSite} target="_blank" rel="noreferrer" className="link inline-flex shrink-0 items-center gap-1 text-[0.95rem]">
                neuvikon-labs.github.io <ArrowUpRight />
              </a>
            }
          >
            Neuvikon
          </SectionTitle>
          <div className={`${grid} gap-y-6`}>
            <p className="col-span-4 text-[1.15rem] leading-relaxed md:col-span-6 lg:col-span-8">{t(neuvikon.description)}</p>
            <div className="col-span-4 flex -space-x-2 md:col-span-6 lg:col-span-4 lg:justify-end">
              {neuvikon.projects
                .filter((p) => p.image)
                .map((p) => (
                  <Image
                    key={p.name}
                    src={p.image!}
                    alt={p.name}
                    title={p.name}
                    width={44}
                    height={44}
                    className="size-11 rounded-[8px] border-2 border-table shadow-[var(--shadow-board)] transition-transform duration-500 ease-out-expo hover:z-10 hover:-translate-y-1.5"
                  />
                ))}
            </div>
          </div>

          <ul className="board mt-8 px-4 sm:px-6">
            {neuvikon.divisions.map((d) => (
              <li key={d.key} className={`${divisionCls[d.key]} ${grid} items-baseline gap-y-1 border-b border-rule py-4 last:border-b-0`}>
                <p className="title col-span-4 flex items-center gap-3 text-xl md:col-span-2 lg:col-span-4">
                  <MassChip className="size-6 self-center" />
                  {d.name}
                </p>
                <p className="col-span-4 text-muted md:col-span-4 lg:col-span-8">{t(d.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-16 sm:pt-20">
          <SectionTitle>{t(ui.studioProjects)}</SectionTitle>
          <p className="-mt-2 mb-4 max-w-[60ch] text-muted">{t(ui.studioProjectsNote)}</p>
          <div className="space-y-4">
            {groups.map((g) => (
              <div key={g.key} className="board px-4 pt-4 sm:px-6">
                <h3 className={`${divisionCls[g.key]} label flex items-center gap-2.5 border-b border-rule pb-3 text-[0.82rem]`}>
                  <MassChip className="size-5" />
                  {g.name}
                  <span className="tnum text-muted">{g.projects.length}</span>
                </h3>
                <ul>
                  {g.projects.map((p) => (
                    <NeuProjectRow key={p.name} project={p} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </Container>

      <ContactClose />
    </>
  );
}
