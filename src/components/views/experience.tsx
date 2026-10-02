"use client";

import Image from "next/image";
import { Container } from "@/components/chrome";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { NeuProjectRow } from "@/components/neu-project-card";
import { Closing, JobList, PageHero } from "@/components/parts";
import { neuvikon, ui } from "@/content";

const divisionCls: Record<string, string> = { games: "cat-game", tech: "cat-web", robotics: "cat-desktop" };

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;

  return (
    <>
      <PageHero title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} />

      <Container>
        <JobList full />
      </Container>

      <Container className="pt-28 sm:pt-40">
        <section id="neuvikon" className="scroll-mt-20">
          <h2 className="display text-[clamp(2.6rem,7vw,5rem)]">Neuvikon</h2>
          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            <p className="headline text-[clamp(1.35rem,2.4vw,1.8rem)] text-muted lg:col-span-8">{t(neuvikon.description)}</p>
            <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
              <div className="flex -space-x-2">
                {neuvikon.projects
                  .filter((p) => p.image)
                  .map((p) => (
                    <Image
                      key={p.name}
                      src={p.image!}
                      alt={p.name}
                      title={p.name}
                      width={52}
                      height={52}
                      className="size-13 rounded-[12px] border-2 border-bg transition-transform duration-300 ease-out-expo hover:z-10 hover:-translate-y-1"
                    />
                  ))}
              </div>
              <a href={neuSite} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                neuvikon-labs.github.io <ArrowUpRight />
              </a>
            </div>
          </div>

          <dl className="mt-12 grid gap-4 md:grid-cols-3">
            {neuvikon.divisions.map((d) => (
              <div key={d.key} className={`${divisionCls[d.key]} rounded-[1.5rem] bg-surface p-6`}>
                <dt className="flex items-center gap-2 text-[1.15rem] font-semibold">
                  <span className="size-2 rounded-full bg-[var(--c)]" aria-hidden />
                  {d.name}
                </dt>
                <dd className="mt-2 leading-relaxed text-muted">{t(d.text)}</dd>
              </div>
            ))}
          </dl>

          <h3 className="headline mt-20 text-[clamp(1.75rem,3vw,2.4rem)]">{t(ui.studioProjects)}</h3>
          <p className="mt-2 max-w-[56ch] text-muted">{t(ui.studioProjectsNote)}</p>
          {neuvikon.divisions.map((d) => {
            const list = neuvikon.projects.filter((p) => p.division === d.key);
            if (!list.length) return null;
            return (
              <section key={d.key} className={`${divisionCls[d.key]} mt-10`}>
                <h4 className="flex items-center gap-2 pb-2 text-[0.95rem] font-semibold text-muted">
                  <span className="size-2 rounded-full bg-[var(--c)]" aria-hidden />
                  {d.name}
                  <span className="tnum">· {list.length}</span>
                </h4>
                <ul>
                  {list.map((p) => (
                    <NeuProjectRow key={p.name} project={p} />
                  ))}
                </ul>
              </section>
            );
          })}
        </section>
      </Container>

      <Closing />
    </>
  );
}
