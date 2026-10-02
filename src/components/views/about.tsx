"use client";

import { Container } from "@/components/chrome";
import { useLang } from "@/components/lang";
import { Closing, PageHero } from "@/components/parts";
import { education, focus, profile, skills, ui } from "@/content";

const focusCls = ["cat-web", "cat-web", "cat-desktop", "cat-vision"];

export function AboutView() {
  const { t } = useLang();
  const paragraphs = t(profile.about).split("\n\n");

  return (
    <>
      <PageHero title={t(ui.aboutTitle)} />

      <Container>
        <p className="headline max-w-[30ch] text-[clamp(1.6rem,3.4vw,2.6rem)]">{paragraphs[0]}</p>
        <div className="mt-10 max-w-[62ch] space-y-5 text-[1.12rem] leading-relaxed text-muted md:ml-auto">
          {paragraphs.slice(1).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </Container>

      <Container className="pt-28 sm:pt-36">
        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">{t(ui.focus)}</h2>
        <dl className="mt-10 grid gap-4 md:grid-cols-2">
          {focus.map((f, i) => (
            <div key={f.title.en} className={`${focusCls[i]} rounded-[1.5rem] bg-surface p-7`}>
              <dt className="flex items-center gap-2.5 text-[1.3rem] font-semibold tracking-[-0.02em]">
                <span className="size-2.5 rounded-full bg-[var(--c)]" aria-hidden />
                {t(f.title)}
              </dt>
              <dd className="mt-2.5 leading-relaxed text-muted">{t(f.text)}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-28 sm:pt-36">
        <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">{t(ui.skills)}</h2>
        <dl className="mt-10">
          {skills.map((s) => (
            <div key={s.group.en} className="grid gap-x-10 gap-y-2 border-t border-line py-6 md:grid-cols-[13rem_minmax(0,1fr)]">
              <dt className="text-[0.95rem] text-muted">{t(s.group)}</dt>
              <dd className="text-[1.2rem] font-medium tracking-[-0.01em]">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Container>

      <Container className="pt-28 sm:pt-36">
        <div className="grid gap-16 md:grid-cols-2">
          <section>
            <h2 className="headline text-[clamp(1.75rem,3vw,2.4rem)]">{t(ui.education)}</h2>
            {education.map((e) => (
              <div key={e.school} className="mt-5">
                <p className="text-[1.2rem] font-semibold">{e.school}</p>
                <p className="mt-1 text-muted">
                  {t(e.degree)} · <span className="tnum">{t(e.period)}</span>
                </p>
              </div>
            ))}
          </section>
          <section>
            <h2 className="headline text-[clamp(1.75rem,3vw,2.4rem)]">{t(ui.spoken)}</h2>
            <dl className="mt-5">
              {profile.languages.map((l) => (
                <div key={l.name.en} className="flex items-baseline justify-between border-t border-line py-3">
                  <dt className="text-[1.1rem] font-semibold">{t(l.name)}</dt>
                  <dd className="text-muted">{t(l.level)}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
        {profile.cv && (
          <p className="pt-10">
            <a href={profile.cv} className="link font-medium">
              {t(ui.cv)}
            </a>
          </p>
        )}
      </Container>

      <Closing />
    </>
  );
}
