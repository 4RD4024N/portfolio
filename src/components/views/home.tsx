"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/lang";
import { ArrowRight, Mail, MapPin, SocialIcon } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { experience, focus, neuvikon, profile, projects, skills, ui } from "@/content";

export function HomeView() {
  const { t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const tech = skills.flatMap((s) => s.items);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="hero-grid pointer-events-none absolute inset-0" />
        <div className="hero-glow pointer-events-none absolute inset-0" />
        <div className="relative mx-auto max-w-5xl px-4 pt-24 pb-24 sm:px-6 sm:pt-32 sm:pb-32">
          <div className="fade-up inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3 py-1 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {t(ui.available)}
          </div>

          <h1 className="fade-up mt-8 text-5xl font-semibold tracking-tight sm:text-7xl" style={{ animationDelay: "60ms" }}>
            {profile.name}
          </h1>
          <p
            className="fade-up mt-5 max-w-2xl text-2xl leading-snug text-fg/85 sm:text-3xl"
            style={{ animationDelay: "120ms" }}
          >
            {t(profile.headline)}
          </p>
          <p
            className="fade-up mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted"
            style={{ animationDelay: "180ms" }}
          >
            <span>{t(profile.role)}</span>
            <span className="text-line-strong">•</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {t(profile.location)}
            </span>
          </p>

          <div className="fade-up mt-10 flex flex-wrap items-center gap-3" style={{ animationDelay: "240ms" }}>
            <Link
              href="/projects"
              className="group flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              {t(ui.seeProjects)}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium transition-colors hover:bg-surface-2"
            >
              <Mail /> {t(ui.getInTouch)}
            </Link>
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors hover:bg-surface-2 hover:text-fg"
              >
                <SocialIcon label={s.label} />
              </a>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        {/* Öne çıkan projeler */}
        <section className="pt-24">
          <div className="mb-10 flex items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.nav.projects)}</p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">{t(ui.featured)}</h2>
            </div>
            <Link href="/projects" className="group hidden items-center gap-1.5 text-sm text-muted hover:text-fg sm:flex">
              {t(ui.allProjects)} ({projects.length})
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {featured.map((p) => (
              <ProjectCard key={p.slug} project={p} large />
            ))}
          </div>
          <Link
            href="/projects"
            className="mt-6 flex items-center justify-center gap-1.5 rounded-xl border border-line py-3 text-sm text-muted hover:text-fg sm:hidden"
          >
            {t(ui.allProjects)} ({projects.length}) <ArrowRight className="size-3.5" />
          </Link>
        </section>

        {/* Deneyim */}
        <section className="pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.experienceTitle)}</p>
          {experience.map((e) => (
            <Link
              key={e.org}
              href="/experience"
              className="group mt-6 block rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-line-strong hover:bg-surface-2 sm:p-8"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-baseline">
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight">{e.org}</h2>
                  <p className="mt-1 text-fg/80">{t(e.role)}</p>
                </div>
                <p className="font-mono text-xs text-muted">{t(e.period)}</p>
              </div>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{t(e.summary)}</p>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex -space-x-2">
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
                        className="size-10 rounded-xl border-2 border-surface"
                      />
                    ))}
                </div>
                <span className="flex items-center gap-1.5 text-sm text-fg group-hover:text-accent">
                  {t(ui.studioProjects)} ({neuvikon.projects.length})
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </section>

        {/* Odak alanları */}
        <section className="pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.aboutTitle)}</p>
          <div className="mt-3 grid gap-10 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">{t(ui.focus)}</h2>
              <p className="mt-4 leading-relaxed text-muted">{t(profile.intro)}</p>
              <Link href="/about" className="group mt-6 inline-flex items-center gap-1.5 text-sm text-fg hover:text-accent">
                {t(ui.aboutTitle)} <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
            <div className="divide-y divide-line rounded-2xl border border-line bg-surface">
              {focus.map((f, i) => (
                <div key={i} className="flex gap-5 p-6">
                  <span className="font-mono text-xs text-muted">0{i + 1}</span>
                  <div>
                    <h3 className="font-medium">{t(f.title)}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{t(f.text)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teknolojiler */}
        <section className="pt-24">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{t(ui.skills)}</p>
          <ul className="mt-6 flex flex-wrap gap-2">
            {tech.map((s) => (
              <li key={s} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-fg/80">
                {s}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="pt-24">
          <div className="relative overflow-hidden rounded-3xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
            <div className="hero-glow pointer-events-none absolute inset-0" />
            <h2 className="relative text-3xl font-semibold tracking-tight sm:text-4xl">{t(ui.ctaTitle)}</h2>
            <p className="relative mx-auto mt-4 max-w-md text-muted">{t(ui.ctaText)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-opacity hover:opacity-90"
            >
              <Mail /> {profile.email}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
