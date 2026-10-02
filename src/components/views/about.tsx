"use client";

import { Container, grid } from "@/components/container";
import { useLang } from "@/components/lang";
import { MassChip } from "@/components/model";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { ContactClose, Entry } from "@/components/views/home";
import { education, experience, focus, profile, skills, ui } from "@/content";

// Odak alanlarının akrilik renkleri, projelerdeki kategori renkleriyle aynı rolde
const focusCls = ["cat-web", "cat-web", "cat-wood", "cat-vision"];

export function AboutView() {
  const { t } = useLang();
  const paragraphs = t(profile.about).split("\n\n");

  return (
    <>
      <PageHeader title={t(ui.aboutTitle)} text={t(profile.intro)} />

      <Container>
        <div className={`board ${grid} gap-y-5 p-5 sm:p-8`}>
          {paragraphs.map((para, i) => (
            <p
              key={i}
              className={
                i === 0
                  ? "col-span-4 text-[1.3rem] leading-snug font-medium md:col-span-6 lg:col-span-8"
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
        <ul className="board px-4 sm:px-6">
          {focus.map((f, i) => (
            <li key={f.title.en} className={`${focusCls[i]} ${grid} items-baseline gap-y-1 border-b border-rule py-4 last:border-b-0`}>
              <h3 className="title col-span-4 flex items-center gap-3 text-xl md:col-span-2 lg:col-span-4">
                <MassChip className="size-6 self-center" />
                {t(f.title)}
              </h3>
              <p className="col-span-4 text-muted md:col-span-4 lg:col-span-8">{t(f.text)}</p>
            </li>
          ))}
        </ul>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <SectionTitle>{t(ui.skills)}</SectionTitle>
        <dl className="board px-4 sm:px-6">
          {skills.map((s) => (
            <div key={s.group.en} className={`${grid} gap-y-1 border-b border-rule py-4 last:border-b-0`}>
              <dt className="label col-span-4 text-[0.78rem] text-muted md:col-span-2 lg:col-span-3">{t(s.group)}</dt>
              <dd className="col-span-4 font-medium md:col-span-4 lg:col-span-9">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <SectionTitle>{t(ui.experienceTitle)}</SectionTitle>
        <ul className="board px-4 sm:px-6">
          {experience.map((e) => (
            <Entry key={e.org + e.period.en} href="/experience" date={t(e.period)} title={t(e.role)} sub={e.org} />
          ))}
        </ul>
      </Container>

      <Container className="pt-16 sm:pt-24">
        <div className={`${grid} gap-y-10`}>
          <section className="col-span-4 md:col-span-3 lg:col-span-6">
            <SectionTitle>{t(ui.education)}</SectionTitle>
            {education.map((e) => (
              <div key={e.school} className="board p-5">
                <p className="title text-xl">{e.school}</p>
                <p className="mt-1 text-muted">
                  {t(e.degree)} · <span className="tnum">{t(e.period)}</span>
                </p>
              </div>
            ))}
          </section>
          <section className="col-span-4 md:col-span-3 lg:col-span-6">
            <SectionTitle>{t(ui.spoken)}</SectionTitle>
            <div className="board px-5">
              {profile.languages.map((l) => (
                <div key={l.name.en} className="flex items-baseline justify-between border-b border-rule py-4 last:border-b-0">
                  <p className="title text-lg">{t(l.name)}</p>
                  <p className="text-muted">{t(l.level)}</p>
                </div>
              ))}
            </div>
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
