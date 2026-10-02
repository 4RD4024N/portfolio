"use client";

import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { Entry } from "@/components/views/home";
import { education, experience, focus, profile, skills, ui } from "@/content";

export function AboutView() {
  const { t } = useLang();

  return (
    <Container>
      <PageHeader title={t(ui.aboutTitle)} />

      <div className="space-y-4 text-[1.0625rem]">
        <p>{t(profile.intro)}</p>
        {t(profile.about)
          .split("\n\n")
          .map((para, i) => (
            <p key={i}>{para}</p>
          ))}
      </div>

      <section className="pt-14">
        <SectionTitle>{t(ui.focus)}</SectionTitle>
        <dl className="space-y-4">
          {focus.map((f) => (
            <div key={f.title.en}>
              <dt className="font-medium">{t(f.title)}</dt>
              <dd className="text-muted">{t(f.text)}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-14">
        <SectionTitle>{t(ui.skills)}</SectionTitle>
        <dl>
          {skills.map((s) => (
            <div
              key={s.group.en}
              className="grid gap-x-6 border-t border-line py-3 first:border-t-0 sm:grid-cols-[11rem_1fr]"
            >
              <dt className="text-muted">{t(s.group)}</dt>
              <dd>{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="pt-14">
        <SectionTitle>{t(ui.experienceTitle)}</SectionTitle>
        <ul>
          {experience.map((e) => (
            <Entry key={e.org} title={e.org} href="/experience" sub={t(e.role)} date={t(e.period)} />
          ))}
        </ul>
      </section>

      <section className="pt-14">
        <SectionTitle>{t(ui.education)}</SectionTitle>
        <ul>
          {education.map((e) => (
            <Entry key={e.school} title={e.school} sub={t(e.degree)} date={t(e.period)} />
          ))}
        </ul>
      </section>

      {profile.cv && (
        <p className="pt-10">
          <a href={profile.cv} className="link">
            {t(ui.cv)}
          </a>
        </p>
      )}
    </Container>
  );
}
