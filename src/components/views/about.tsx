"use client";

import { Container, grid } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { ContactClose, Entry } from "@/components/views/home";
import { education, experience, focus, profile, skills, ui } from "@/content";

// Odak alanlarının renkleri, projelerdeki kategori renkleriyle aynı rolde
const focusCls = ["cat-web", "cat-web", "cat-neutral", "cat-vision"];

export function AboutView() {
  const { t } = useLang();
  const paragraphs = t(profile.about).split("\n\n");

  return (
    <>
      <PageHeader title={t(ui.aboutTitle)} text={t(profile.intro)} />

      <Container>
        <div className={`${grid} gap-y-5 pt-10 sm:pt-14`}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "condensed col-span-4 text-[clamp(1.35rem,2.2vw,1.85rem)] leading-[1.25] font-semibold tracking-tight md:col-span-6 lg:col-span-8"
                  : "col-span-4 max-w-[68ch] md:col-span-5 lg:col-span-7 lg:col-start-4"
              }
            >
              {para}
            </p>
          ))}
        </div>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <SectionTitle>{t(ui.focus)}</SectionTitle>
        <ul className="mt-6 grid grid-cols-1 gap-px bg-ink sm:grid-cols-2 lg:grid-cols-4">
          {focus.map((f, i) => (
            <li key={f.title.en} className={`${focusCls[i]} flex min-h-[11rem] flex-col justify-between gap-6 bg-[var(--c)] p-5 text-[var(--on)] sm:p-6`}>
              <h3 className="condensed text-2xl leading-tight font-extrabold tracking-tight">{t(f.title)}</h3>
              <p className="text-[0.98rem] leading-snug opacity-90">{t(f.text)}</p>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <SectionTitle>{t(ui.skills)}</SectionTitle>
        <dl>
          {skills.map((s) => (
            <div key={s.group.en} className={`${grid} gap-y-1 border-b border-rule py-4`}>
              <dt className="col-span-4 font-semibold text-muted md:col-span-2 lg:col-span-3">{t(s.group)}</dt>
              <dd className="condensed col-span-4 text-lg font-bold tracking-tight md:col-span-4 lg:col-span-9">
                {s.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <SectionTitle>{t(ui.experienceTitle)}</SectionTitle>
        <ul>
          {experience.map((e) => (
            <Entry key={e.org + e.period.en} href="/experience" date={t(e.period)} title={t(e.role)} sub={e.org} />
          ))}
        </ul>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <div className={`${grid} gap-y-16`}>
          <section className="col-span-4 md:col-span-3 lg:col-span-6">
            <SectionTitle>{t(ui.education)}</SectionTitle>
            {education.map((e) => (
              <div key={e.school} className="border-b border-rule py-4">
                <p className="condensed text-lg font-bold tracking-tight">{e.school}</p>
                <p className="font-semibold text-muted">
                  {t(e.degree)} · <span className="tnum">{t(e.period)}</span>
                </p>
              </div>
            ))}
          </section>
          <section className="col-span-4 md:col-span-3 lg:col-span-6">
            <SectionTitle>{t(ui.spoken)}</SectionTitle>
            {profile.languages.map((l) => (
              <div key={l.name.en} className="flex items-baseline justify-between border-b border-rule py-4">
                <p className="condensed text-lg font-bold tracking-tight">{t(l.name)}</p>
                <p className="font-semibold text-muted">{t(l.level)}</p>
              </div>
            ))}
          </section>
        </div>
        {profile.cv && (
          <p className="pt-10">
            <a href={profile.cv} className="link font-semibold">
              {t(ui.cv)}
            </a>
          </p>
        )}
      </Container>

      <ContactClose />
    </>
  );
}
