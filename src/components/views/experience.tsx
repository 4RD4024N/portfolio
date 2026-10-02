"use client";

import { Container, grid } from "@/components/container";
import { ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { NeuProjectRow } from "@/components/neu-project-card";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { ContactClose } from "@/components/views/home";
import { experience, neuvikon, ui } from "@/content";

// Neuvikon bölümleri sitenin renk rollerini kullanır
const divisionCls: Record<string, string> = { games: "cat-game", tech: "cat-web", robotics: "cat-desktop" };

export function ExperienceView() {
  const { lang, t } = useLang();
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const groups = neuvikon.divisions
    .map((d) => ({ ...d, projects: neuvikon.projects.filter((p) => p.division === d.key) }))
    .filter((d) => d.projects.length > 0);

  return (
    <>
      <PageHeader title={t(ui.experienceTitle)} text={t(ui.experienceIntro)} />

      {/* Görevler: tarih, görev, maddeler */}
      <Container>
        <ol>
          {experience.map((e, i) => (
            <li
              key={e.org + e.period.en}
              className={`wipe-in ${grid} gap-y-3 border-b border-rule py-8 sm:py-10`}
              style={{ animationDelay: `${200 + i * 90}ms` }}
            >
              <div className="col-span-4 md:col-span-2 lg:col-span-3">
                <p className="tnum font-semibold">{t(e.period)}</p>
                {e.location && <p className="text-sm font-semibold text-muted">{t(e.location)}</p>}
              </div>
              <div className="col-span-4 md:col-span-4 lg:col-span-4">
                <h2 className="condensed text-2xl leading-tight font-extrabold tracking-tight sm:text-[1.75rem]">{t(e.role)}</h2>
                <p className="mt-1 flex flex-wrap items-center gap-2 font-semibold">
                  {e.href ? (
                    <a href="#neuvikon" className="link">
                      {e.org}
                    </a>
                  ) : (
                    e.org
                  )}
                  {e.type !== "work" && (
                    <span className="bg-ink px-1.5 py-0.5 text-xs font-bold text-paper uppercase">
                      {t(e.type === "intern" ? ui.intern : ui.volunteer)}
                    </span>
                  )}
                </p>
              </div>
              <ul className="col-span-4 space-y-2 md:col-span-4 md:col-start-3 lg:col-span-5 lg:col-start-auto">
                {e.points[lang].map((pt) => (
                  <li key={pt} className="flex gap-3">
                    <span className="mt-[0.6rem] size-1.5 shrink-0 bg-red" />
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
              <a href={neuSite} target="_blank" rel="noreferrer" className="link inline-flex shrink-0 items-center gap-1 text-[0.95rem] font-semibold">
                neuvikon-labs.github.io <ArrowUpRight />
              </a>
            }
          >
            Neuvikon
          </SectionTitle>
          <div className={`${grid} gap-y-8 pt-6`}>
            <p className="condensed col-span-4 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.25] font-semibold tracking-tight md:col-span-6 lg:col-span-8">
              {t(neuvikon.description)}
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-1 gap-px bg-ink md:grid-cols-3">
            {neuvikon.divisions.map((d) => (
              <li key={d.key} className={`${divisionCls[d.key]} flex min-h-[9rem] flex-col justify-between gap-6 bg-[var(--c)] p-5 text-[var(--on)] sm:p-6`}>
                <p className="condensed text-2xl font-extrabold tracking-tight">{d.name}</p>
                <p className="text-[0.98rem] leading-snug opacity-90">{t(d.text)}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="pt-16 sm:pt-20">
          <SectionTitle>{t(ui.studioProjects)}</SectionTitle>
          <p className="max-w-[60ch] pt-2 text-muted">{t(ui.studioProjectsNote)}</p>
          {groups.map((g) => (
            <div key={g.key} className="pt-8">
              <h3 className={`${divisionCls[g.key]} flex items-center gap-2.5 border-b border-ink pb-2 font-bold`}>
                <span className="size-3 bg-[var(--c)]" />
                {g.name}
                <span className="tnum font-semibold text-muted">{g.projects.length}</span>
              </h3>
              <ul>
                {g.projects.map((p) => (
                  <NeuProjectRow key={p.name} project={p} />
                ))}
              </ul>
            </div>
          ))}
        </section>
      </Container>

      <ContactClose />
    </>
  );
}
