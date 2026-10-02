"use client";

import { Container } from "@/components/container";
import { useLang } from "@/components/lang";
import { PageHeader, SectionTitle } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { Entry } from "@/components/views/home";
import { education, experience, focus, profile, skills, ui } from "@/content";

const colors = ["cat-web", "cat-vision", "cat-desktop", "cat-game"];

export function AboutView() {
  const { t } = useLang();

  return (
    <Container>
      <PageHeader title={t(ui.aboutTitle)} dot="bg-mint" />

      <div className="space-y-4 text-[1.0625rem]">
        {[t(profile.intro), ...t(profile.about).split("\n\n")].map((para, i) => (
          <Reveal key={i} delay={i * 60}>
            <p>{para}</p>
          </Reveal>
        ))}
      </div>

      <section className="pt-14">
        <Reveal>
          <SectionTitle dot="bg-violet">{t(ui.focus)}</SectionTitle>
        </Reveal>
        <div className="grid gap-3 sm:grid-cols-3">
          {focus.map((f, i) => (
            <Reveal key={f.title.en} delay={i * 90} className={colors[i % colors.length]}>
              <div className="tile h-full rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1">
                <h3 className="font-semibold">{t(f.title)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-fg/75">{t(f.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-14">
        <Reveal>
          <SectionTitle dot="bg-coral">{t(ui.skills)}</SectionTitle>
        </Reveal>
        <div className="space-y-5">
          {skills.map((s, i) => (
            <Reveal key={s.group.en} delay={i * 60} className={colors[i % colors.length]}>
              <h3 className="mb-2 text-sm text-muted">{t(s.group)}</h3>
              <ul className="flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-line bg-surface px-3 py-1 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--c)] hover:text-[var(--c)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pt-14">
        <Reveal>
          <SectionTitle dot="bg-amber">{t(ui.experienceTitle)}</SectionTitle>
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

      {profile.cv && (
        <p className="pt-10">
          <a href={profile.cv} className="link font-medium">
            {t(ui.cv)}
          </a>
        </p>
      )}
    </Container>
  );
}
