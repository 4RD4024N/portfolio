"use client";

import Link from "next/link";
import { Container, grid } from "@/components/container";
import { ArrowRight, ArrowUpRight } from "@/components/icons";
import { useLang } from "@/components/lang";
import { SectionTitle } from "@/components/page-header";
import { ProjectList } from "@/components/project-card";
import { RangeBar } from "@/components/range-bar";
import { education, experience, neuvikon, profile, projects, ui } from "@/content";

// Arka plandaki görünür ızgara çizgileri
export function GridRules() {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 hidden ${grid} px-5 sm:px-8 lg:grid lg:px-12`}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span
          key={i}
          className={`border-l border-rule/70 ${i < 4 ? "" : i < 6 ? "hidden md:block" : "hidden lg:block"}`}
        />
      ))}
    </div>
  );
}

export function HomeView() {
  const { lang, t } = useLang();
  const featured = projects.filter((p) => p.featured);
  const neuSite = lang === "en" ? `${neuvikon.site}/en` : neuvikon.site;
  const [first, ...rest] = profile.name.split(" ");

  return (
    <>
      {/* İlk ekran: isim + yelpaze */}
      <section className="relative">
        <Container className="relative">
          <GridRules />
          <div className={`relative ${grid} gap-y-8 pt-10 pb-8 sm:pt-16 lg:min-h-[calc(100svh-4.25rem-clamp(10rem,22vh,14rem))] lg:content-end lg:pt-12 lg:pb-8`}>
            {/* Kap: ismin boyutu bu 8 sütunluk genişlikten hesaplanır */}
            <div className="col-span-4 @container md:col-span-6 lg:col-span-8 lg:self-end">
              <h1 className="display display-name">
                <span className="block overflow-hidden pb-[0.04em]">
                  <span className="line-up" style={{ animationDelay: "60ms" }}>
                    {first}
                  </span>
                </span>
                <span className="block overflow-hidden pb-[0.04em]">
                  <span className="line-up text-red-ink" style={{ animationDelay: "160ms" }}>
                    {rest.join(" ")}
                  </span>
                </span>
              </h1>
            </div>

            <div className="relative col-span-4 flex flex-col justify-end gap-6 bg-paper md:col-span-4 lg:col-span-4 lg:-ml-3 lg:self-end lg:py-3 lg:pl-3">
              <div>
                <p className="condensed text-2xl font-bold leading-tight tracking-tight">{t(profile.role)}</p>
                <p className="mt-1 font-semibold text-muted">{t(profile.location)}</p>
              </div>
              <p className="flex items-center gap-2.5 text-[0.95rem] font-semibold">
                <span className="relative flex size-2.5">
                  <span className="absolute inset-0 animate-ping bg-green opacity-60" />
                  <span className="relative size-2.5 bg-green" />
                </span>
                {t(ui.available).replace(/\.$/, "")}
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="group flex items-center justify-between gap-4 bg-red px-4 py-3.5 font-semibold text-white transition-colors hover:bg-[#a51f12]"
                >
                  <span className="truncate">{profile.email}</span>
                  <ArrowRight className="size-5 shrink-0 transition-transform duration-500 ease-out-expo group-hover:translate-x-1" />
                </a>
                <p className="flex gap-5 text-[0.95rem] font-semibold">
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
          </div>
          <RangeBar />
        </Container>
      </section>

      {/* Tanıtım */}
      <Container>
        <div className={`${grid} gap-y-6 pt-16 sm:pt-24`}>
          <p className="condensed col-span-4 text-[clamp(1.5rem,2.6vw,2.25rem)] leading-[1.2] font-semibold tracking-tight md:col-span-6 lg:col-span-9">
            {t(profile.intro)}{" "}
            <span className="text-muted">
              {t(ui.nowPrefix)}
              <a href={neuSite} target="_blank" rel="noreferrer" className="link text-ink">
                Neuvikon
              </a>
              {t(ui.nowSuffix)}
            </span>
          </p>
        </div>
      </Container>

      {/* Seçili projeler */}
      <Container className="pt-16 sm:pt-24">
        <SectionTitle
          aside={
            <Link href="/projects" className="link inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-semibold">
              {t(ui.allProjects)} ({projects.length}) <ArrowRight className="size-4" />
            </Link>
          }
        >
          {t(ui.selected)}
        </SectionTitle>
        <ProjectList projects={featured} />
      </Container>

      {/* Deneyim ve eğitim */}
      <Container className="pt-16 sm:pt-24">
        <SectionTitle
          aside={
            <Link href="/experience" className="link inline-flex shrink-0 items-center gap-1.5 text-[0.95rem] font-semibold">
              {t(ui.details)} <ArrowRight className="size-4" />
            </Link>
          }
        >
          {t(ui.experienceTitle)}
        </SectionTitle>
        <ul>
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
      <span className="tnum row-muted col-span-4 text-sm font-semibold text-muted md:col-span-2 lg:col-span-3">{date}</span>
      <span className="condensed col-span-4 text-lg font-bold leading-tight tracking-tight md:col-span-2 lg:col-span-4">
        {title}
      </span>
      <span className="row-muted col-span-4 font-semibold text-muted md:col-span-2 lg:col-span-5">{sub}</span>
    </>
  );
  const cls = `${grid} items-baseline gap-y-0.5 py-4`;
  return (
    <li className="cat-neutral border-b border-rule">
      {href ? (
        <Link href={href} className={`row-wipe ${cls}`}>
          {inner}
        </Link>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}

// Sayfaların sonundaki kırmızı iletişim alanı
export function ContactClose() {
  const { t } = useLang();
  return (
    <Container className="pt-20 sm:pt-28">
      <section className="cat-red bg-red text-white">
        <div className={`${grid} gap-y-6 p-6 sm:p-10 lg:p-12`}>
          <h2 className="display col-span-4 text-[clamp(3rem,8vw,6rem)] md:col-span-6 lg:col-span-7">{t(ui.contactTitle)}</h2>
          <div className="col-span-4 flex flex-col justify-end gap-5 md:col-span-6 lg:col-span-5">
            <p className="max-w-[40ch] text-white/90">{t(ui.contactText)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="group flex items-center justify-between gap-4 border-t-2 border-white pt-4 text-[clamp(1.15rem,2.2vw,1.6rem)] font-bold"
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
