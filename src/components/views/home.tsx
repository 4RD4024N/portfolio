"use client";

import Link from "next/link";
import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { SectionTitle } from "@/components/page-header";
import { ProjectList } from "@/components/project-card";
import { education, experience, neuvikon, profile, projects, ui } from "@/content";

export function HomeView() {
  const { lang, t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;

  return (
    <Container>
      <section className="pt-10 sm:pt-16">
        <h1 className="text-[1.75rem] font-medium leading-tight tracking-tight sm:text-3xl">{profile.name}</h1>
        <p className="mt-1 text-muted">
          {t(profile.role)}, {t(profile.location)}
        </p>

        <div className="mt-8 space-y-4 text-[1.0625rem]">
          <p>{t(profile.intro)}</p>
          <p>
            {t(ui.nowPrefix)}
            <a href={neuSite} target="_blank" rel="noreferrer" className="link">
              Neuvikon
            </a>
            {t(ui.nowSuffix)} {t(ui.available)}
          </p>
        </div>

        <p className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
          <a href={`mailto:${profile.email}`} className="link">
            {profile.email}
          </a>
          {profile.socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link">
              {s.label}
            </a>
          ))}
          {profile.cv && (
            <a href={profile.cv} className="link">
              {t(ui.cv)}
            </a>
          )}
        </p>
      </section>

      <section className="pt-16">
        <SectionTitle>{t(ui.selected)}</SectionTitle>
        <ProjectList projects={featured} />
        <Link href="/projects" className="link mt-2 inline-block text-muted">
          {t(ui.allProjects)} ({projects.length}) →
        </Link>
      </section>

      <section className="pt-16">
        <SectionTitle>{t(ui.experienceTitle)}</SectionTitle>
        <ul>
          {experience.map((e) => (
            <Entry key={e.org} title={e.org} href="/experience" sub={t(e.role)} date={t(e.period)} />
          ))}
          {education.map((e) => (
            <Entry key={e.school} title={e.school} sub={t(e.degree)} date={t(e.period)} />
          ))}
        </ul>
      </section>
    </Container>
  );
}

// Deneyim ve eğitim satırı
export function Entry({ title, sub, date, href }: { title: string; sub: string; date: string; href?: string }) {
  return (
    <li className="flex flex-col gap-x-6 border-t border-line py-4 first:border-t-0 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        {href ? (
          <Link href={href} className="link font-medium">
            {title}
          </Link>
        ) : (
          <span className="font-medium">{title}</span>
        )}
        <span className="text-muted"> · {sub}</span>
      </div>
      <span className="shrink-0 font-mono text-sm text-muted">{date}</span>
    </li>
  );
}
