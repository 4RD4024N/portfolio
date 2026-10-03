"use client";

import Link from "next/link";
import { useEffect, useRef, useState, ViewTransition } from "react";
import { Container, useProgress, useSticky } from "@/components/chrome";
import { ArrowRight, Check, Copy, Lock } from "@/components/icons";
import { useLang } from "@/components/lang";
import { ProjectVisual } from "@/components/visuals";
import { categories, education, experience, profile, ui, type Job, type Lang, type Project } from "@/content";

export const catCls = (c: Project["category"]) => `cat-${c}`;

export function CategoryTag({ p }: { p: Project }) {
  const { t } = useLang();
  return (
    <span className={`${catCls(p.category)} inline-flex items-center gap-2 text-[0.92rem] font-medium text-[var(--c)]`}>
      <span className="size-2 rounded-full bg-[var(--c)]" aria-hidden />
      {t(categories[p.category])}
    </span>
  );
}

export function Status({ p, t }: { p: Project; t: (s: Record<Lang, string>) => string }) {
  if (!p.private && !p.wip && !p.org) return null;
  return (
    <span className="inline-flex flex-wrap gap-x-3 gap-y-1 text-[0.88rem] text-muted">
      {p.org && <span>{p.org.name}</span>}
      {p.private && (
        <span className="inline-flex items-center gap-1">
          <Lock className="size-3.5" />
          {t(ui.privateRepo)}
        </span>
      )}
      {p.wip && <span>{t(ui.wip)}</span>}
    </span>
  );
}

export function ArrowLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-1.5 font-medium text-accent ${className}`}>
      {children}
      <ArrowRight className="size-4 transition-transform duration-300 ease-out-expo group-hover:translate-x-1" />
    </Link>
  );
}

// Kaydırdıkça sözcük sözcük yanan cümle
export function Statement({ text }: { text: string }) {
  const { ref, p } = useProgress<HTMLElement>();
  const words = text.split(" ");
  // Bölüm ekrandan geçerken 0.25…0.6 aralığında tüm sözcükler yanar
  const k = Math.min(1, Math.max(0, (p - 0.22) / 0.4)) * words.length;
  return (
    <section ref={ref} className="h-[170svh] sm:h-[200svh]">
      <div className="sticky top-12 flex h-[calc(100svh-3rem)] items-center">
        <Container>
          <p className="headline max-w-[26ch] text-[clamp(2rem,5vw,4.25rem)]">
            {words.map((w, i) => (
              <span key={i} className="transition-opacity duration-300" style={{ opacity: Math.max(0.16, Math.min(1, k - i + 0.6)) }}>
                {w}{" "}
              </span>
            ))}
          </p>
        </Container>
      </div>
    </section>
  );
}

// Proje sahnesi: görsel ekrana yapışır, kaydırdıkça özet ve özellikler tek tek okunur, görsel de o adımı canlandırır
export function Scene({ project: p, flip }: { project: Project; flip?: boolean }) {
  const { lang, t } = useLang();
  const steps = [t(p.summary), ...p.highlights[lang].slice(0, 3)];
  const n = steps.length;
  const { ref, p: pr } = useSticky<HTMLElement>();
  const pos = pr * n;
  const step = Math.min(n - 1, Math.floor(pos));
  return (
    <section ref={ref} data-wash={p.category} className={`${catCls(p.category)} relative`} style={{ height: `${n * 70 + 30}svh` }}>
      <div className="sticky top-12 flex h-[calc(100svh-3rem)] items-center py-6">
        <Container className="grid items-center gap-6 lg:grid-cols-12 lg:gap-16">
          <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
            <CategoryTag p={p} />
            <h2 className="display mt-3 text-[clamp(2.2rem,5.2vw,4.75rem)]">{p.title}</h2>
            {/* Adımlar üst üste durur, yalnız geçerli olan görünür */}
            <div className="mt-5 grid" aria-hidden>
              {steps.map((s, i) => (
                <p
                  key={i}
                  data-on={i === step ? "true" : i < step ? "past" : "false"}
                  className={`step col-start-1 row-start-1 max-w-[40ch] leading-relaxed ${i === 0 ? "text-[clamp(1.05rem,1.6vw,1.25rem)] text-muted" : "text-[clamp(1.2rem,2vw,1.6rem)] font-semibold tracking-[-0.015em]"}`}
                >
                  {s}
                </p>
              ))}
            </div>
            <ul className="sr-only">
              {steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="mt-6 flex gap-1.5" aria-hidden>
              {steps.map((_, i) => (
                <span key={i} className="h-1 w-10 overflow-hidden rounded-full bg-line">
                  <span className="block h-full origin-left bg-[var(--c)]" style={{ transform: `scaleX(${Math.min(1, Math.max(0, pos - i))})` }} />
                </span>
              ))}
            </div>
            <ArrowLink href={`/projects/${p.slug}`} className="mt-6">
              {t(ui.details)}
            </ArrowLink>
          </div>
          <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
            <ViewTransition name={`pv-${p.slug}`} share="morph" default="none">
              <div className="scene-surface overflow-hidden rounded-[2rem] p-3 will-change-transform sm:p-8" style={{ transform: `scale(${0.94 + Math.min(1, pos) * 0.06})` }}>
                <ProjectVisual project={p} lang={lang} step={step} progress={pr} className="mx-auto h-auto max-h-[30svh] w-full lg:max-h-none" />
              </div>
            </ViewTransition>
          </div>
        </Container>
      </div>
    </section>
  );
}

// Diğer projeler: geniş ekranda dikey kaydırma şeridi yatay kaydırır; telefonda parmakla kaydırılır
export function ProjectStrip({ items, title, action }: { items: Project[]; title: string; action: React.ReactNode }) {
  const { lang, t } = useLang();
  const { ref, p } = useSticky<HTMLElement>();
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  useEffect(() => {
    const measure = () => {
      const el = track.current;
      const wide = matchMedia("(min-width: 768px)").matches && !matchMedia("(prefers-reduced-motion: reduce)").matches;
      setDist(el && wide ? Math.max(0, el.scrollWidth - el.clientWidth) : 0);
    };
    measure();
    addEventListener("resize", measure);
    return () => removeEventListener("resize", measure);
  }, []);
  return (
    <section ref={ref} style={{ height: dist ? `calc(100svh + ${dist}px)` : undefined }}>
      <div className={dist ? "sticky top-12 flex h-[calc(100svh-3rem)] flex-col justify-center overflow-hidden" : "pt-16 sm:pt-24"}>
        <Container className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="display text-[clamp(2.4rem,6vw,4.5rem)]">{title}</h2>
          {action}
        </Container>
        <div
          ref={track}
          className={`mt-10 flex gap-5 px-5 sm:px-8 lg:px-[max(3rem,calc((100vw-80rem)/2+3rem))] ${dist ? "" : "snap-x snap-mandatory overflow-x-auto pb-4"}`}
          style={dist ? { transform: `translateX(${-p * dist}px)` } : undefined}
        >
          {items.map((q) => (
            <Link key={q.slug} href={`/projects/${q.slug}`} className={`${catCls(q.category)} group w-[78vw] max-w-[26rem] shrink-0 snap-start`}>
              <ViewTransition name={`pv-${q.slug}`} share="morph" default="none">
                <div className="overflow-hidden rounded-[1.5rem] bg-surface p-3 transition-transform duration-500 ease-out-expo group-hover:scale-[1.02] sm:p-4">
                  <ProjectVisual project={q} lang={lang} className="h-auto w-full" />
                </div>
              </ViewTransition>
              <span className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                <CategoryTag p={q} />
                <span className="text-[0.92rem] text-muted tnum">{q.year}</span>
              </span>
              <span className="headline mt-2 block text-[1.5rem] transition-colors group-hover:text-accent">{q.title}</span>
              <span className="mt-1.5 line-clamp-2 block leading-relaxed text-muted">{t(q.summary)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export const jobTag = (j: Job) => (j.type === "intern" ? ui.intern : j.type === "volunteer" ? ui.volunteer : null);

// Kaydırdıkça kendini çizen zaman çizgisi: çizgi ekranın ortasının biraz altına kadar dolar
function useLine<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFill(1);
      return;
    }
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (innerHeight * 0.62 - r.top) / r.height)));
    };
    const on = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { ref, fill };
}

// Deneyim listesi: solda kendini çizen çizgi, sırası gelen görev yanar
export function JobList({ full = false }: { full?: boolean }) {
  const { lang, t } = useLang();
  const { ref, fill } = useLine<HTMLOListElement>();
  const total = experience.length + education.length;
  const lit = (i: number) => fill >= (i + 0.35) / total;
  const dot = (on: boolean) => (
    <span
      aria-hidden
      className={`absolute top-[2.35rem] -left-8 size-3 -translate-x-1/2 rounded-full border-2 transition-all duration-500 ease-out-expo sm:-left-10 ${on ? "scale-110 border-accent bg-accent" : "border-line bg-[var(--page)]"}`}
    />
  );
  const row = (on: boolean) => `relative grid gap-x-10 gap-y-2 border-t border-line py-8 transition-opacity duration-700 md:grid-cols-[13rem_minmax(0,1fr)] ${on ? "opacity-100" : "opacity-55"}`;
  return (
    <ol ref={ref} className="relative pl-8 sm:pl-10">
      <span aria-hidden className="absolute top-[2.7rem] bottom-8 left-0 w-px bg-line">
        <span className="block h-full w-full origin-top bg-accent" style={{ transform: `scaleY(${fill})` }} />
      </span>
      {experience.map((j, i) => {
        const tag = jobTag(j);
        const on = lit(i);
        return (
          <li key={j.org + j.period.en} className={row(on)}>
            {dot(on)}
            <p className="text-[0.95rem] text-muted tnum">{t(j.period)}</p>
            <div>
              <h3 className="headline text-[clamp(1.5rem,2.6vw,2rem)]">{t(j.role)}</h3>
              <p className="mt-1.5 text-[1.05rem]">
                {j.href ? (
                  <a href={full ? "#neuvikon" : j.href} target={full ? undefined : "_blank"} rel="noreferrer" className="link">
                    {j.org}
                  </a>
                ) : (
                  j.org
                )}
                <span className="text-muted">
                  {j.location && ` · ${t(j.location)}`}
                  {tag && ` · ${t(tag)}`}
                </span>
              </p>
              {full && (
                <ul className="mt-4 max-w-[62ch] space-y-2 leading-relaxed text-muted">
                  {j.points[lang].map((pt) => (
                    <li key={pt} className="relative pl-5 before:absolute before:top-[0.72em] before:left-0 before:h-px before:w-2.5 before:bg-muted">
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        );
      })}
      {education.map((e, k) => {
        const on = lit(experience.length + k);
        return (
          <li key={e.school} className={row(on)}>
            {dot(on)}
            <p className="text-[0.95rem] text-muted tnum">{t(e.period)}</p>
            <div>
              <h3 className="headline text-[clamp(1.5rem,2.6vw,2rem)]">{t(e.degree)}</h3>
              <p className="mt-1.5 text-[1.05rem]">{e.school}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

// Kapanış: iletişim
export function Closing({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);
  const H = heading;
  // Sayfa başlığı olarak kullanıldığında diğer sayfalardaki gibi kademeli belirir
  const rise = heading === "h1" ? "rise" : "";
  const d = (ms: number) => (heading === "h1" ? ({ "--d": `${ms}ms` } as React.CSSProperties) : undefined);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <section className="py-28 sm:py-40">
      <Container className="text-center">
        <H className={`display ${rise} text-[clamp(3rem,9vw,6rem)]`}>{t(ui.contactTitle)}</H>
        <p className={`${rise} mx-auto mt-6 max-w-[44ch] text-[1.2rem] leading-relaxed text-muted`} style={d(120)}>
          {t(ui.contactText)}
        </p>
        <a href={`mailto:${profile.email}`} style={d(200)} className={`${rise} mt-10 inline-block text-[clamp(1.25rem,4.4vw,2.25rem)] font-semibold tracking-[-0.03em] break-all text-accent hover:underline`}>
          {profile.email}
        </a>
        <div className={`${rise} mt-8 flex flex-wrap justify-center gap-3`} style={d(280)}>
          <a href={`mailto:${profile.email}`} className="rounded-full bg-accent px-6 py-3 font-medium text-on-accent transition-opacity hover:opacity-90">
            {t(ui.sendEmail)}
          </a>
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-full bg-surface px-6 py-3 font-medium transition-colors hover:bg-line">
            {copied ? <Check className="size-4 text-[var(--game)]" /> : <Copy className="size-4 text-muted" />}
            {copied ? t(ui.copied) : t(ui.copy)}
          </button>
        </div>
      </Container>
    </section>
  );
}

// Alt sayfa başlığı
export function PageHero({ title, text }: { title: string; text?: string }) {
  return (
    <Container className="pt-20 pb-12 sm:pt-28 sm:pb-16">
      <h1 className="display rise text-[clamp(3rem,8vw,6rem)]">{title}</h1>
      {text && (
        <p className="rise mt-6 max-w-[48ch] text-[1.25rem] leading-relaxed text-muted" style={{ "--d": "120ms" } as React.CSSProperties}>
          {text}
        </p>
      )}
    </Container>
  );
}
