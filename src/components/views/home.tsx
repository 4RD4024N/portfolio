"use client";

import Link from "next/link";
import { Container, grid } from "@/components/container";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { CareerModel, ModelKey } from "@/components/model";
import { SectionTitle } from "@/components/page-header";
import { ProjectList } from "@/components/project-card";
import { education, experience, neuvikon, profile, projects, ui } from "@/content";

export function HomeView() {
  const { lang, t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;

  return (
    <>
      {/* İlk ekran: kariyerin maketi + kim olduğu */}
      <Container>
        <section className={`${grid} items-center gap-y-8 pt-8 pb-10 sm:pt-12 lg:min-h-[calc(100svh-4.5rem)] lg:pt-6 lg:pb-8`}>
          <div className="col-span-4 flex justify-center md:col-span-6 lg:col-span-8 lg:justify-start">
            <CareerModel />
          </div>

          <div className="col-span-4 flex flex-col gap-6 md:col-span-6 lg:col-span-4">
            <p className="title max-w-[22ch] text-[clamp(1.6rem,2.3vw,2.1rem)] font-semibold">{t(profile.intro)}</p>
            <p className="max-w-[46ch] text-[1.05rem] leading-relaxed text-muted">
              {t(ui.nowPrefix)}
              <a href={neuSite} target="_blank" rel="noreferrer" className="link text-ink">
                Neuvikon
              </a>
              {t(ui.nowSuffix)}
            </p>
            <p className="flex items-center gap-2.5 text-[0.95rem] font-medium">
              <span className="size-2.5 rounded-full bg-green shadow-[0_0_0_3px_color-mix(in_oklab,var(--green),transparent_75%)]" />
              {t(ui.available).replace(/\.$/, "")}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="lift group flex items-center justify-between gap-4 rounded-[3px] bg-vermilion px-4 py-3.5 font-semibold text-white shadow-[var(--shadow-board)]"
              >
                <span className="truncate">{profile.email}</span>
                <ArrowRight className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
              </a>
              <p className="flex gap-5 text-[0.95rem] font-medium">
                {profile.socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="link inline-flex items-center gap-1">
                    {s.label} <ArrowUpRight />
                  </a>
                ))}
                {profile.cv && (
                  <a href={profile.cv} className="link">
                    {t(ui.cv)}
                  </a>
                )}
              </p>
            </div>
          </div>
        </section>

        <ModelKey />
      </Container>

      {/* Seçili projeler */}
      <Container className="pt-16 sm:pt-24">
        <SectionTitle
          aside={
            <Link href="/projects" className="link inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-medium">
              {t(ui.allProjects)} ({projects.length}) <ArrowRight className="size-4" />
            </Link>
          }
        >
          {t(ui.selected)}
        </SectionTitle>
        <div className="board px-4 sm:px-6">
          <ProjectList projects={featured} />
        </div>
      </Container>

      {/* Deneyim ve eğitim */}
      <Container className="pt-16 sm:pt-24">
        <SectionTitle
          aside={
            <Link href="/experience" className="link inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-medium">
              {t(ui.details)} <ArrowRight className="size-4" />
            </Link>
          }
        >
          {t(ui.experienceTitle)}
        </SectionTitle>
        <ul className="board px-4 sm:px-6">
          {experience.map((e) => (
            <Entry key={e.org + e.period.en} href="/experience" date={t(e.period)} title={t(e.role)} sub={e.org} />
          ))}
          {education.map((e) => (
            <Entry key={e.school} date={t(e.period)} title={e.school} sub={t(e.degree)} />
          ))}
        </ul>
      </Container>

      <ContactClose />
    </>
  );
}

// Deneyim ve eğitim satırı: solda tarih, ortada görev, sağda kurum
export function Entry({ date, title, sub, href }: { date: string; title: string; sub: string; href?: string }) {
  const inner = (
    <>
      <span className="tnum col-span-4 text-sm text-muted md:col-span-2 lg:col-span-3">{date}</span>
      <span className="title col-span-4 text-lg md:col-span-2 lg:col-span-4">{title}</span>
      <span className="col-span-4 text-muted md:col-span-2 lg:col-span-5">{sub}</span>
    </>
  );
  const cls = `${grid} items-baseline gap-y-0.5 py-4`;
  return (
    <li className="border-b border-rule last:border-b-0">
      {href ? (
        <Link href={href} className={`${cls} group transition-colors hover:text-vermilion-ink`}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}

// Sayfaların sonundaki iletişim plaketi
export function ContactClose() {
  const { t } = useLang();
  return (
    <Container className="pt-20 sm:pt-28">
      <section className="rounded-[3px] bg-vermilion text-white shadow-[var(--shadow-board)]">
        <div className={`${grid} gap-y-6 p-6 sm:p-10 lg:p-12`}>
          <h2 className="title col-span-4 text-[clamp(2.5rem,6vw,4.5rem)] md:col-span-6 lg:col-span-6">{t(ui.contactTitle)}</h2>
          <div className="col-span-4 flex flex-col justify-end gap-5 md:col-span-6 lg:col-span-6">
            <p className="max-w-[44ch] text-white/90">{t(ui.contactText)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between gap-4 border-t border-white/60 pt-4 text-[clamp(1.1rem,2vw,1.5rem)] font-semibold"
            >
              <span className="whitespace-nowrap">{profile.email}</span>
              <ArrowRight className="size-6 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1.5" />
            </a>
          </div>
        </div>
      </section>
    </Container>
  );
}
