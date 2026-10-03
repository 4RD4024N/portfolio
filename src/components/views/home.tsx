"use client";

import Link from "next/link";
import { Container } from "@/components/chrome";
import { ArrowRight } from "@/components/icons";
import { ArrowLink, Closing, JobList, ProjectStrip, Scene, Statement } from "@/components/parts";
import { useLang } from "@/components/lang";
import { profile, projects, ui } from "@/content";

export function HomeView() {
  const { t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

  return (
    <>
      {/* Açılış */}
      <section className="flex min-h-[calc(100svh-3rem)] items-center py-20">
        <Container className="text-center">
          <p className="rise text-[1.15rem] font-medium text-muted" style={d(0)}>
            {t(profile.role)} · {t(profile.location)}
          </p>
          <h1 className="display rise mt-4 text-[clamp(3.6rem,13vw,6rem)]" style={d(90)}>
            {profile.name}
          </h1>
          <p className="headline rise mx-auto mt-6 max-w-[22ch] text-[clamp(1.5rem,3.4vw,2.4rem)] text-muted" style={d(200)}>
            {t(profile.headline)}
          </p>
          <div className="rise mt-10 flex flex-wrap items-center justify-center gap-x-7 gap-y-4" style={d(320)}>
            <a href={`mailto:${profile.email}`} className="rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-opacity hover:opacity-90">
              {t(ui.sendEmail)}
            </a>
            <Link href="#work" className="group inline-flex items-center gap-1.5 font-medium text-accent">
              {t(ui.seeProjects)}
              <ArrowRight className="size-4 rotate-90 transition-transform duration-300 group-hover:translate-y-0.5" />
            </Link>
          </div>
          <p className="rise mt-10 inline-flex items-center gap-2 text-[0.95rem] text-muted" style={d(420)}>
            <span className="size-2 rounded-full bg-[var(--game)]" aria-hidden />
            {t(ui.available).replace(/\.$/, "")}
          </p>
        </Container>
      </section>

      <Statement text={t(ui.statement)} />

      {/* Öne çıkan projeler: her biri bir sahne */}
      <div id="work" className="scroll-mt-12">
        {featured.map((p, i) => (
          <Scene key={p.slug} project={p} flip={i % 2 === 1} />
        ))}
      </div>

      {/* Diğer projeler: yatay şerit */}
      <ProjectStrip
        items={rest}
        title={t(ui.moreProjects)}
        action={<ArrowLink href="/projects">{`${t(ui.allProjects)} (${projects.length})`}</ArrowLink>}
      />

      {/* Deneyim */}
      <Container className="pt-28 sm:pt-40">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">{t(ui.experienceTitle)}</h2>
          <ArrowLink href="/experience">{t(ui.allExperience)}</ArrowLink>
        </div>
        <div className="mt-10">
          <JobList />
        </div>
      </Container>

      <Closing />
    </>
  );
}
