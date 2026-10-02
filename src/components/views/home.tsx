"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { SectionTitle } from "@/components/page-header";
import { ProjectList } from "@/components/project-card";
import { Reveal } from "@/components/reveal";
import { education, experience, neuvikon, profile, projects, skills, ui } from "@/content";

export function HomeView() {
  const { lang, t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const tech = skills.flatMap((s) => s.items);

  return (
    <>
      {/* Hero */}
      <section className="relative -mt-24 overflow-hidden pt-24">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="blob left-[8%] top-[10%] size-72 bg-violet" style={{ animation: "drift-1 16s ease-in-out infinite" }} />
          <div className="blob right-[6%] top-[4%] size-64 bg-coral" style={{ animation: "drift-2 19s ease-in-out infinite" }} />
          <div className="blob left-[40%] top-[45%] size-56 bg-mint" style={{ animation: "drift-3 22s ease-in-out infinite" }} />
        </div>

        <Container className="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
          <p className="rise inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-sm text-muted backdrop-blur">
            <span className="pulse size-2 rounded-full bg-mint" />
            {t(ui.available).replace(/\.$/, "")}
          </p>

          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl" aria-label={profile.name}>
            {profile.name.split("").map((ch, i) => (
              <span key={i} aria-hidden className="rise inline-block" style={{ animationDelay: `${120 + i * 35}ms` }}>
                {ch === " " ? " " : ch}
              </span>
            ))}
          </h1>

          <p className="rise mt-3 text-lg text-muted" style={{ animationDelay: "500ms" }}>
            {t(profile.role)} · {t(profile.location)}
          </p>

          <div className="rise mt-8 max-w-2xl space-y-4 text-[1.0625rem]" style={{ animationDelay: "620ms" }}>
            <p>{t(profile.intro)}</p>
            <p>
              {t(ui.nowPrefix)}
              <a href={neuSite} target="_blank" rel="noreferrer" className="link font-medium text-coral">
                Neuvikon
              </a>
              {t(ui.nowSuffix)}
            </p>
          </div>

          <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "740ms" }}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-transform duration-200 hover:-translate-y-0.5"
            >
              {t(ui.nav.projects)}
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center rounded-full border border-line bg-surface/70 px-5 py-2.5 text-sm font-medium backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-violet hover:text-violet"
            >
              {profile.email}
            </a>
            {profile.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link px-2 text-sm font-medium">
                {s.label}
              </a>
            ))}
            {profile.cv && (
              <a href={profile.cv} className="link px-2 text-sm font-medium">
                {t(ui.cv)}
              </a>
            )}
          </div>
        </Container>
      </section>

      {/* Kayan teknoloji şeridi */}
      <div className="marquee-wrap fade-edges overflow-hidden border-y border-line py-3">
        <div className="marquee flex w-max gap-8 font-mono text-sm text-muted">
          {[...tech, ...tech].map((s, i) => (
            <span key={i} className="flex items-center gap-8 whitespace-nowrap">
              {s}
              <span className={["text-violet", "text-coral", "text-mint", "text-amber"][i % 4]}>✦</span>
            </span>
          ))}
        </div>
      </div>

      <Container>
        <section className="pt-16">
          <Reveal>
            <SectionTitle>{t(ui.selected)}</SectionTitle>
          </Reveal>
          <ProjectList projects={featured} />
          <Reveal>
            <Link href="/projects" className="group mt-4 inline-flex items-center gap-1.5 font-medium text-violet">
              <span className="link">
                {t(ui.allProjects)} ({projects.length})
              </span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </section>

        <section className="pt-16">
          <Reveal>
            <SectionTitle dot="bg-coral">{t(ui.experienceTitle)}</SectionTitle>
          </Reveal>
          <ul>
            {experience.map((e) => (
              <Entry key={e.org} title={e.org} href="/experience" sub={t(e.role)} date={t(e.period)} dot="bg-coral" />
            ))}
            {education.map((e) => (
              <Entry key={e.school} title={e.school} sub={t(e.degree)} date={t(e.period)} dot="bg-mint" delay={80} />
            ))}
          </ul>
        </section>

        {/* İletişim kutusu */}
        <Reveal className="pt-16">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
            <div aria-hidden className="blob -right-10 -top-16 size-56 bg-violet" style={{ animation: "drift-2 18s ease-in-out infinite" }} />
            <div aria-hidden className="blob -bottom-20 left-10 size-48 bg-coral" style={{ animation: "drift-1 20s ease-in-out infinite" }} />
            <div className="relative">
              <h2 className="text-2xl font-semibold tracking-tight">{t(ui.contactTitle)}</h2>
              <p className="mt-2 max-w-md text-muted">{t(ui.contactText)}</p>
              <a
                href={`mailto:${profile.email}`}
                className="group mt-6 inline-flex items-center gap-2 rounded-full bg-violet px-5 py-2.5 text-sm font-medium text-white transition-transform duration-200 hover:-translate-y-0.5 dark:text-bg"
              >
                {profile.email}
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </>
  );
}

// Deneyim ve eğitim satırı
export function Entry({
  title,
  sub,
  date,
  href,
  dot = "bg-violet",
  delay = 0,
}: {
  title: string;
  sub: string;
  date: string;
  href?: string;
  dot?: string;
  delay?: number;
}) {
  const body = (
    <>
      <span className={`mt-2 size-2 shrink-0 rounded-full ${dot} transition-transform duration-300 group-hover:scale-150`} />
      <div className="flex min-w-0 flex-1 flex-col gap-x-6 sm:flex-row sm:items-baseline sm:justify-between">
        <div>
          <span className="font-semibold transition-colors group-hover:text-accent">{title}</span>
          <span className="text-muted"> · {sub}</span>
        </div>
        <span className="shrink-0 font-mono text-sm text-muted">{date}</span>
      </div>
    </>
  );
  return (
    <Reveal as="li" delay={delay}>
      {href ? (
        <Link href={href} className="group -mx-3 flex gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-surface">
          {body}
        </Link>
      ) : (
        <div className="-mx-3 flex gap-3 px-3 py-3">{body}</div>
      )}
    </Reveal>
  );
}
