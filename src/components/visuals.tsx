"use client";

import { useEffect, useRef, useState } from "react";
import type { Lang, Project } from "@/content";

// Projelerin mekanizmasını gösteren canlı çizimler. Veriler gösterim amaçlı, uydurma değil örnek.
// Görünürken ve hareket azaltma kapalıyken zaman ilerler; aksi halde sabit, tamamlanmış bir kare çizilir.

function useClock(still: number) {
  const ref = useRef<SVGSVGElement>(null);
  const [t, setT] = useState(still);
  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let visible = false;
    let start = 0;
    const loop = (now: number) => {
      if (!start) start = now - still * 1000;
      setT((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [still]);
  return { ref, t };
}

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - Math.pow(1 - clamp(x), 3);
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

// step: kaydırma hikâyesindeki adım (0 = özet), progress: sahnenin tamamındaki ilerleme (0…1)
type V = { lang: Lang; className?: string; label: string; step?: number; progress?: number };

function Frame({ svgRef, children, className = "", label }: { svgRef: React.RefObject<SVGSVGElement | null>; children: React.ReactNode; className?: string; label: string }) {
  return (
    <svg ref={svgRef} viewBox="0 0 480 360" className={className} role="img" aria-label={label} fill="none">
      {children}
    </svg>
  );
}

/* ---------- Advisory System: ders programında çakışma çözülür ---------- */
export function ScheduleVisual({ lang, className, label, step, progress }: V) {
  const { ref, t } = useClock(3.4);
  const days = lang === "tr" ? ["Pzt", "Sal", "Çar", "Per", "Cum"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const hours = ["09", "10", "11", "13", "14"];
  const x0 = 70, y0 = 92, cw = 78, rh = 50;
  const fixed = [
    { d: 0, r: 0, l: "CENG 301" },
    { d: 1, r: 2, l: "MATH 202" },
    { d: 2, r: 1, l: "CENG 315" },
    { d: 3, r: 0, l: "ENG 102" },
    { d: 4, r: 3, l: "CENG 352" },
    { d: 0, r: 3, l: "PHYS 104" },
  ];
  // Hikâyede: çakışma 2. adımda kaydırdıkça çözülür; tek başına: zamanla döngü
  const story = progress !== undefined;
  const c = story ? lerp(0.9, 4.2, clamp((progress - 0.45) / 0.3)) : t % 5;
  const move = ease((c - 1.6) / 1.1);
  const resolved = c > 2.7;
  const activeRole = story && step === 1 ? Math.floor(t * 0.8) % 3 : 0;
  const from = { d: 2, r: 1 }, to = { d: 3, r: 3 };
  const cx = x0 + lerp(from.d, to.d, move) * cw + (1 - move) * 14;
  const cy = y0 + lerp(from.r, to.r, move) * rh + (1 - move) * 12;
  const fade = !story && c > 4.6 ? 1 - (c - 4.6) / 0.4 : 1;
  const roles = lang === "tr" ? ["Öğrenci", "Danışman", "Yönetici"] : ["Student", "Advisor", "Admin"];

  return (
    <Frame svgRef={ref} className={className} label={label}>
      {roles.map((r, i) => (
        <g key={r} transform={`translate(${70 + i * 92} 16)`}>
          <rect width="84" height="26" rx="13" fill={i === activeRole ? "var(--web)" : "var(--surface)"} stroke="var(--line)" style={{ transition: "fill .4s" }} />
          <text x="42" y="17.5" textAnchor="middle" fontSize="12" fontWeight="600" fill={i === activeRole ? "#fff" : "var(--muted)"}>
            {r}
          </text>
        </g>
      ))}
      {days.map((d, i) => (
        <text key={d} x={x0 + i * cw + cw / 2} y={y0 - 10} textAnchor="middle" fontSize="12" fill="var(--muted)">
          {d}
        </text>
      ))}
      {hours.map((h, i) => (
        <text key={h} x={x0 - 14} y={y0 + i * rh + 30} textAnchor="end" fontSize="12" fill="var(--muted)" className="tnum">
          {h}:00
        </text>
      ))}
      {days.map((_, i) =>
        hours.map((__, j) => <rect key={`${i}${j}`} x={x0 + i * cw} y={y0 + j * rh} width={cw - 6} height={rh - 6} rx="8" fill="var(--surface)" />),
      )}
      {fixed.map((b) => (
        <g key={b.l} transform={`translate(${x0 + b.d * cw} ${y0 + b.r * rh})`}>
          <rect width={cw - 6} height={rh - 6} rx="8" fill="var(--web)" opacity="0.16" />
          <rect width="3" height={rh - 18} x="6" y="6" rx="1.5" fill="var(--web)" />
          <text x="15" y="27" fontSize="11.5" fontWeight="600" fill="var(--ink)">
            {b.l}
          </text>
        </g>
      ))}
      <g transform={`translate(${cx} ${cy})`} opacity={fade}>
        <rect width={cw - 6} height={rh - 6} rx="8" fill={resolved ? "var(--web)" : "var(--bg)"} stroke={resolved ? "var(--web)" : "var(--desktop)"} strokeWidth="2" />
        <text x="9" y="27" fontSize="11" fontWeight="700" fill={resolved ? "#fff" : "var(--desktop)"}>
          CENG 302
        </text>
        <g transform={`translate(${cw - 13} -5)`}>
          <circle r="8" cx="4" cy="4" fill={resolved ? "var(--game)" : "var(--desktop)"} stroke="var(--surface)" strokeWidth="2" />
          {resolved ? (
            <path d="M0 4.5l2.6 2.4L8 1.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          ) : (
            <path d="M4 0.5v4.2M4 7.2v0.3" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          )}
        </g>
      </g>
    </Frame>
  );
}

/* ---------- AI Music Visualizer: çalan müziğe göre spektrum ve palet ---------- */
const PALETTES = [
  ["#ff5e7e", "#ffb057", "#ffe066", "#7cd4ff", "#8b6cff"],
  ["#22d3ee", "#3b82f6", "#a855f7", "#ec4899", "#f97316"],
  ["#34d399", "#a3e635", "#facc15", "#fb7185", "#818cf8"],
];
export function SpectrumVisual({ className, label, step }: V) {
  const { ref, t } = useClock(1.3);
  const n = 44;
  const kick = Math.exp(-((t % 0.5) * 9));
  // Hikâyede: 2. adımda çubuklar 8 banda toplanır, 3. adımda palet modelden gelir
  const story = step !== undefined;
  const banded = story && step >= 2;
  const pal = story ? PALETTES[step >= 3 ? 1 : 0] : PALETTES[Math.floor(t / 3) % PALETTES.length];
  const level = (i: number) => {
    const low = 1 - i / n;
    return 0.18 + 0.55 * Math.abs(Math.sin(i * 0.43 + t * 2.3)) * (0.5 + 0.5 * Math.sin(t * 0.7 + i * 0.11)) + kick * 0.45 * low * low;
  };
  const band = (i: number) => {
    const b = Math.floor((i / n) * 8);
    let sum = 0, cnt = 0;
    for (let j = 0; j < n; j++) if (Math.floor((j / n) * 8) === b) { sum += level(j); cnt++; }
    return sum / cnt;
  };
  return (
    <Frame svgRef={ref} className={className} label={label}>
      {Array.from({ length: n }, (_, i) => {
        const v = banded ? band(i) : level(i);
        const h = Math.min(130, 18 + v * 110);
        const x = 30 + i * 9.8 + (banded ? Math.floor((i / n) * 8) * 1.2 - 4 : 0);
        const col = pal[Math.min(4, Math.floor((i / n) * 5))];
        return (
          <g key={i}>
            <rect x={x} y={180 - h} width="6.4" height={h} rx="3.2" fill={col} style={{ transition: "fill .6s" }} />
            <rect x={x} y={186} width="6.4" height={h * 0.55} rx="3.2" fill={col} opacity="0.28" />
          </g>
        );
      })}
      <g transform="translate(150 300)">
        {pal.map((c, i) => (
          <rect key={i} x={i * 38} width="30" height="30" rx="8" fill={c} style={{ transition: "fill .6s" }} />
        ))}
      </g>
      <text x="240" y="352" textAnchor="middle" fontSize="12" fill="var(--muted)" className="tnum">
        60 FPS
      </text>
    </Frame>
  );
}

/* ---------- Hand Gesture Media Controller: el iskeleti ve ses seviyesi ---------- */
const OPEN: [number, number][] = [
  [230, 320], [196, 300], [172, 270], [158, 241], [146, 214], [206, 226], [199, 182], [195, 152], [192, 124],
  [233, 221], [233, 172], [233, 140], [233, 110], [258, 227], [264, 182], [268, 152], [271, 126], [280, 241], [292, 207], [300, 184], [306, 162],
];
const PINCH: [number, number][] = [
  [230, 320], [200, 300], [184, 272], [182, 246], [190, 222], [210, 228], [206, 194], [197, 206], [192, 220],
  [236, 222], [240, 180], [242, 154], [243, 130], [260, 228], [267, 188], [271, 162], [274, 140], [281, 242], [293, 212], [300, 192], [305, 174],
];
const BONES = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 6], [6, 7], [7, 8], [5, 9], [9, 10], [10, 11], [11, 12], [9, 13], [13, 14], [14, 15], [15, 16], [13, 17], [17, 18], [18, 19], [19, 20], [0, 17]];

export function HandVisual({ lang, className, label, step, progress }: V) {
  const { ref, t } = useClock(1.9);
  // Hikâyede: kaydırdıkça el iki kez kıstırır, ses seviyesi onunla değişir
  const k = progress !== undefined ? 0.5 - 0.5 * Math.cos(progress * Math.PI * 4) : 0.5 - 0.5 * Math.cos(t * 1.6);
  const voice = step !== undefined && step >= 2;
  const pts = OPEN.map((p, i) => [lerp(p[0], PINCH[i][0], k), lerp(p[1], PINCH[i][1], k)] as [number, number]);
  const d = Math.hypot(pts[4][0] - pts[8][0], pts[4][1] - pts[8][1]);
  const vol = Math.round(clamp((d - 4) / 92) * 100);
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="110" y="70" width="240" height="270" rx="18" stroke="var(--line)" strokeDasharray="4 6" />
      {BONES.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} stroke="var(--vision)" strokeWidth="3" strokeLinecap="round" />
      ))}
      <line x1={pts[4][0]} y1={pts[4][1]} x2={pts[8][0]} y2={pts[8][1]} stroke="var(--desktop)" strokeWidth="2" strokeDasharray="3 4" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === 4 || i === 8 ? 6 : 4.5} fill={i === 4 || i === 8 ? "var(--desktop)" : "var(--bg)"} stroke="var(--vision)" strokeWidth="2" />
      ))}
      {voice && (
        <g transform="translate(118 26)">
          <rect width={lang === "tr" ? 184 : 140} height="32" rx="16" fill="var(--vision)" />
          <circle cx="18" cy="16" r={5 + Math.abs(Math.sin(t * 6)) * 3} fill="#fff" opacity="0.9" />
          <text x="34" y="20.5" fontSize="12.5" fontWeight="600" fill="#fff">
            {lang === "tr" ? "Sesli komut · Spotify" : "Voice · Spotify"}
          </text>
        </g>
      )}
      <g transform="translate(390 90)">
        <rect width="16" height="210" rx="8" fill="var(--surface)" stroke="var(--line)" />
        <rect y={210 - vol * 2.1} width="16" height={vol * 2.1} rx="8" fill="var(--vision)" />
        <text x="8" y="236" textAnchor="middle" fontSize="13" fontWeight="600" fill="var(--ink)" className="tnum">
          {vol}%
        </text>
        <text x="8" y="-14" textAnchor="middle" fontSize="12" fill="var(--muted)">
          {lang === "tr" ? "Ses" : "Volume"}
        </text>
      </g>
    </Frame>
  );
}

/* ---------- Secure Voice App: iki uç arasında şifreli ses paketleri ---------- */
export function VoiceVisual({ className, label, step }: V) {
  const { ref, t } = useClock(0.8);
  const ends = [
    { x: 78, l: "A" },
    { x: 402, l: "B" },
  ];
  // Hikâyede: 1. adımda paketler kilitlenir, 2. adımda sunucu yalnız bağlantıyı kurar, 3. adımda gürültü bastırılır
  const story = step !== undefined;
  const locked = !story || step >= 1;
  const server = story && step >= 2;
  const clean = !story || step >= 3;
  const lock = (x: number, y: number, key: string) =>
    !locked ? (
      <circle key={key} cx={x} cy={y} r="7" fill="var(--muted)" opacity="0.7" />
    ) : (
    <g key={key} transform={`translate(${x - 13} ${y - 11})`}>
      <rect width="26" height="22" rx="6" fill="var(--web)" />
      <rect x="8.5" y="9" width="9" height="7" rx="1.5" fill="#fff" />
      <path d="M10.5 9V7.2a2.5 2.5 0 0 1 5 0V9" stroke="#fff" strokeWidth="1.6" />
    </g>
  );
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <line x1="118" y1="160" x2="362" y2="160" stroke="var(--line)" strokeWidth="2" />
      <line x1="118" y1="200" x2="362" y2="200" stroke="var(--line)" strokeWidth="2" />
      {Array.from({ length: 4 }, (_, i) => {
        const p = ((t * 0.32 + i / 4) % 1) * 244;
        return lock(118 + p, 160, `a${i}`);
      })}
      {Array.from({ length: 3 }, (_, i) => {
        const p = ((t * 0.27 + i / 3 + 0.15) % 1) * 244;
        return lock(362 - p, 200, `b${i}`);
      })}
      {ends.map((e, j) => (
        <g key={e.l}>
          <circle cx={e.x} cy="180" r="34" fill="var(--surface)" stroke="var(--line)" />
          <text x={e.x} y="187" textAnchor="middle" fontSize="20" fontWeight="700" fill="var(--ink)">
            {e.l}
          </text>
          {Array.from({ length: 11 }, (_, i) => {
            const noise = clean ? 0 : Math.abs(Math.sin(t * 37 + i * 5.1)) * 14;
            const h = 6 + Math.abs(Math.sin(t * (5 + j) + i * 0.9)) * 26 * (j === 0 ? 1 : 0.7) + noise;
            return <rect key={i} x={e.x - 40 + i * 7.6} y={262 - h / 2} width="4" height={h} rx="2" fill="var(--web)" opacity={0.85} />;
          })}
        </g>
      ))}
      {server && (
        <g>
          <path d="M118 150 Q240 60 362 150" stroke="var(--muted)" strokeWidth="1.5" strokeDasharray="4 6" />
          <rect x="196" y="70" width="88" height="30" rx="8" fill="var(--surface)" stroke="var(--line)" />
          <text x="240" y="90" textAnchor="middle" fontSize="11.5" fontWeight="600" fill="var(--muted)">
            signaling
          </text>
        </g>
      )}
      <text x="240" y={server ? 132 : 118} textAnchor="middle" fontSize="12.5" fill="var(--muted)">
        WebRTC · P2P
      </text>
    </Frame>
  );
}

/* ---------- Spotify Overlay: Windows'un kaldırdığı medya penceresi ---------- */
export function OverlayVisual({ className, label }: V) {
  const { ref, t } = useClock(2.2);
  const prog = (t * 0.06) % 1;
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="30" y="30" width="420" height="260" rx="10" fill="var(--bg)" stroke="var(--line)" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x="56" y={64 + i * 26} width={200 - i * 30} height="9" rx="4.5" fill="var(--muted)" opacity="0.15" />
      ))}
      <rect x="30" y="300" width="420" height="30" rx="8" fill="var(--surface)" stroke="var(--line)" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={186 + i * 24} y="309" width="12" height="12" rx="3" fill="var(--muted)" opacity="0.35" />
      ))}
      <g transform="translate(176 150)">
        <rect width="260" height="128" rx="14" fill="var(--surface)" stroke="var(--line)" />
        <g transform="translate(14 14)">
          <rect width="64" height="64" rx="8" fill="var(--desktop)" />
          <circle cx="32" cy="32" r="18" fill="none" stroke="var(--bg)" strokeWidth="3" opacity="0.6" />
          <circle cx="32" cy="32" r="4" fill="var(--bg)" opacity="0.8" />
        </g>
        <rect x="92" y="22" width="120" height="10" rx="5" fill="var(--ink)" opacity="0.8" />
        <rect x="92" y="40" width="80" height="8" rx="4" fill="var(--muted)" opacity="0.5" />
        <path d="M100 64l-8 6 8 6zM108 64h-3v12h3z" fill="var(--ink)" opacity="0.7" />
        <g transform="translate(124 62)">
          <rect width="16" height="16" rx="8" fill="var(--ink)" />
          <rect x="5.5" y="4.5" width="2" height="7" fill="var(--bg)" />
          <rect x="8.5" y="4.5" width="2" height="7" fill="var(--bg)" />
        </g>
        <path d="M152 64l8 6-8 6zM162 64h3v12h-3z" fill="var(--ink)" opacity="0.7" />
        <rect x="14" y="100" width="232" height="4" rx="2" fill="var(--line)" />
        <rect x="14" y="100" width={232 * prog} height="4" rx="2" fill="var(--desktop)" />
        <circle cx={14 + 232 * prog} cy="102" r="5" fill="var(--desktop)" />
      </g>
    </Frame>
  );
}

/* ---------- Muavin Sim: şehirlerarası otobüs yolda ---------- */
export function BusVisual({ className, label }: V) {
  const { ref, t } = useClock(0.5);
  const off = (t * 90) % 60;
  const wheel = (cx: number) => (
    <g key={cx} transform={`translate(${cx} 262) rotate(${(t * 360) % 360})`}>
      <circle r="17" fill="var(--ink)" />
      <circle r="7" fill="var(--surface)" />
      <rect x="-1.5" y="-14" width="3" height="10" fill="var(--surface)" opacity="0.6" />
    </g>
  );
  return (
    <Frame svgRef={ref} className={className} label={label}>
      {[0, 1, 2].map((i) => {
        const x = (((i * 190 - t * 30) % 570) + 570) % 570 - 60;
        return <path key={i} d={`M${x} 196 l40 -46 l40 46 Z`} fill="var(--game)" opacity="0.18" />;
      })}
      <rect x="0" y="280" width="480" height="60" fill="var(--surface)" />
      {Array.from({ length: 10 }, (_, i) => (
        <rect key={i} x={i * 60 - off} y="308" width="34" height="5" rx="2.5" fill="var(--muted)" opacity="0.5" />
      ))}
      <g transform={`translate(0 ${Math.sin(t * 9) * 1.2})`}>
        <path d="M70 150 h300 q28 0 34 26 l8 64 q2 18 -16 18 H70 q-14 0 -14 -14 V164 q0 -14 14 -14z" fill="var(--game)" />
        {Array.from({ length: 6 }, (_, i) => (
          <rect key={i} x={86 + i * 46} y="166" width="38" height="34" rx="5" fill="var(--bg)" opacity="0.9" />
        ))}
        <path d="M368 166 h18 q12 0 15 14 l4 22 h-37z" fill="var(--bg)" opacity="0.9" />
        <rect x="70" y="214" width="320" height="6" fill="var(--bg)" opacity="0.35" />
        <rect x="96" y="124" width="150" height="22" rx="5" fill="var(--ink)" />
        <text x="171" y="139.5" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="var(--desktop)" letterSpacing="0.06em">
          ANKARA → İSTANBUL
        </text>
      </g>
      {wheel(126)}
      {wheel(344)}
    </Frame>
  );
}

/* ---------- Ekonomik Danışman: piyasa verisi, haberler, LLM yorumu ---------- */
const SERIES = [62, 58, 64, 61, 70, 66, 74, 71, 79, 76, 84, 80, 88, 86, 93];
export function MarketVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(4);
  const shown = Math.min(SERIES.length, 2 + ((t * 3) % (SERIES.length + 6)));
  const pts = SERIES.slice(0, Math.floor(shown)).map((v, i) => `${40 + i * 18},${200 - v * 1.5}`);
  const last = pts.at(-1)?.split(",").map(Number) ?? [40, 100];
  const tr = lang === "tr";
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="24" y="24" width="282" height="200" rx="14" fill="var(--bg)" stroke="var(--line)" />
      {[0, 1, 2, 3].map((i) => (
        <line key={i} x1="40" x2="290" y1={70 + i * 40} y2={70 + i * 40} stroke="var(--line)" />
      ))}
      <polyline points={pts.join(" ")} stroke="var(--web)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="5" fill="var(--web)" />
      <text x="40" y="50" fontSize="12" fontWeight="600" fill="var(--muted)">
        {tr ? "Piyasa" : "Market"}
      </text>
      <g transform="translate(322 24)">
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(0 ${i * 68})`}>
            <rect width="134" height="58" rx="12" fill="var(--surface)" stroke="var(--line)" />
            <rect x="12" y="14" width="18" height="18" rx="5" fill="var(--web)" opacity={0.25 + i * 0.2} />
            <rect x="38" y="16" width="82" height="7" rx="3.5" fill="var(--ink)" opacity="0.6" />
            <rect x="38" y="30" width="60" height="6" rx="3" fill="var(--muted)" opacity="0.4" />
          </g>
        ))}
      </g>
      <g transform="translate(24 240)">
        <rect width="432" height="96" rx="14" fill="var(--surface)" stroke="var(--line)" />
        <text x="18" y="28" fontSize="12" fontWeight="700" fill="var(--web)">
          {tr ? "Yerel LLM analizi" : "Local LLM analysis"}
        </text>
        {[0, 1, 2].map((i) => {
          const w = [380, 340, 220][i] * Math.min(1, Math.max(0, (t % 6) * 0.9 - i * 0.6));
          return <rect key={i} x="18" y={42 + i * 16} width={w} height="7" rx="3.5" fill="var(--muted)" opacity="0.45" />;
        })}
      </g>
    </Frame>
  );
}

/* ---------- Shorts Pipeline: senaryodan yüklemeye ---------- */
export function PipelineVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(5.5);
  const tr = lang === "tr";
  const steps = tr ? ["Senaryo", "Seslendirme", "Kurgu", "Yükleme"] : ["Script", "Voice", "Edit", "Upload"];
  const active = Math.floor(t / 1.4) % 5;
  return (
    <Frame svgRef={ref} className={className} label={label}>
      {steps.map((s, i) => {
        const done = i < active;
        const on = i === active;
        return (
          <g key={s} transform={`translate(28 ${44 + i * 70})`}>
            <rect width="190" height="54" rx="14" fill={on ? "var(--vision)" : "var(--bg)"} stroke={done || on ? "var(--vision)" : "var(--line)"} />
            <circle cx="28" cy="27" r="11" fill={on ? "var(--bg)" : done ? "var(--vision)" : "var(--surface)"} />
            {done && <path d="M23 27.5l3.5 3.5 6.5-7" stroke="var(--bg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            <text x="50" y="32" fontSize="14" fontWeight="600" fill={on ? "var(--bg)" : "var(--ink)"}>
              {s}
            </text>
            {i < 3 && <line x1="28" x2="28" y1="54" y2="70" stroke={done ? "var(--vision)" : "var(--line)"} strokeWidth="2" />}
          </g>
        );
      })}
      <g transform="translate(276 30)">
        <rect width="168" height="300" rx="22" fill="var(--ink)" />
        <rect x="8" y="8" width="152" height="284" rx="16" fill="var(--vision)" opacity={active >= 2 ? 0.9 : 0.25} />
        {active >= 2 &&
          [0, 1, 2].map((i) => <rect key={i} x="30" y={70 + i * 34 + Math.sin(t * 2 + i) * 4} width={108 - i * 14} height="20" rx="6" fill="var(--bg)" opacity="0.25" />)}
        {active >= 1 && (
          <g transform="translate(24 214)">
            <rect width="120" height="26" rx="6" fill="var(--bg)" />
            <rect x="10" y="9" width={Math.min(100, (t * 40) % 140)} height="8" rx="4" fill="var(--ink)" opacity="0.7" />
          </g>
        )}
        <rect x="24" y="256" width="120" height="4" rx="2" fill="var(--bg)" opacity="0.35" />
        <rect x="24" y="256" width={active >= 3 ? 120 : (active / 3) * 120} height="4" rx="2" fill="var(--bg)" />
      </g>
    </Frame>
  );
}

/* ---------- Staj Kontrol: transkript okunur, şartlar tek tek işaretlenir ---------- */
export function TranscriptVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(6);
  const tr = lang === "tr";
  const rows = [
    ["CENG 201", "AA"],
    ["CENG 213", "BA"],
    ["CENG 242", "BB"],
    ["MATH 260", "CB"],
    ["CENG 300", "AA"],
    ["ENG 201", "BA"],
  ];
  const reqs = tr ? ["Kredi şartı", "Zorunlu dersler", "Not ortalaması", "Önceki staj"] : ["Credit count", "Required courses", "GPA", "Prior internship"];
  const c = t % 6.5;
  const scan = Math.min(1, c / 1.6);
  const ticks = Math.floor(Math.max(0, c - 1.6) / 0.6);
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="30" y="30" width="200" height="300" rx="10" fill="var(--bg)" stroke="var(--line)" />
      <rect x="50" y="50" width="110" height="10" rx="5" fill="var(--ink)" opacity="0.7" />
      {rows.map(([code, g], i) => (
        <g key={code} transform={`translate(50 ${84 + i * 36})`}>
          <text fontSize="12.5" fontWeight="600" fill="var(--ink)" y="12">
            {code}
          </text>
          <text x="160" y="12" textAnchor="end" fontSize="12.5" fontWeight="700" fill="var(--desktop)">
            {g}
          </text>
          <line x1="0" x2="160" y1="24" y2="24" stroke="var(--line)" />
        </g>
      ))}
      <rect x="30" y={30 + scan * 280} width="200" height="20" fill="var(--desktop)" opacity={scan < 1 ? 0.25 : 0} />
      {reqs.map((r, i) => {
        const ok = i < ticks;
        return (
          <g key={r} transform={`translate(254 ${54 + i * 52})`}>
            <rect width="196" height="40" rx="12" fill="var(--surface)" stroke={ok ? "var(--desktop)" : "var(--line)"} />
            <circle cx="20" cy="20" r="9" fill={ok ? "var(--desktop)" : "var(--bg)"} stroke={ok ? "var(--desktop)" : "var(--line)"} />
            {ok && <path d="M15.5 20.5l3 3 6-6.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
            <text x="38" y="25" fontSize="12.5" fontWeight="600" fill="var(--ink)">
              {r}
            </text>
          </g>
        );
      })}
      <g transform="translate(254 270)" opacity={ticks >= 4 ? 1 : 0.25}>
        <rect width="196" height="44" rx="22" fill="var(--desktop)" />
        <text x="98" y="27.5" textAnchor="middle" fontSize="14" fontWeight="700" fill="#fff">
          {tr ? "Staja uygun" : "Eligible"}
        </text>
      </g>
    </Frame>
  );
}

/* ---------- Coin Counter: fotoğraftaki paralar bulunur ve toplanır ---------- */
const COINS: [number, number, number, string, number][] = [
  [110, 120, 46, "1 TL", 100],
  [214, 98, 40, "50 kr", 50],
  [312, 132, 34, "25 kr", 25],
  [150, 232, 30, "10 kr", 10],
  [256, 214, 46, "1 TL", 100],
  [358, 238, 26, "5 kr", 5],
  [74, 230, 34, "25 kr", 25],
];
export function CoinsVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(5);
  const found = Math.min(COINS.length, Math.floor((t % 6) * 1.6));
  const total = COINS.slice(0, found).reduce((sum, coin) => sum + coin[4], 0);
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="20" y="20" width="440" height="290" rx="14" fill="var(--surface)" />
      {COINS.map(([x, y, r], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={r} fill="var(--desktop)" opacity="0.55" />
          <circle cx={x} cy={y} r={r * 0.72} fill="none" stroke="var(--bg)" strokeWidth="2" opacity="0.5" />
        </g>
      ))}
      {COINS.slice(0, found).map(([x, y, r, l], i) => (
        <g key={`f${i}`}>
          <circle cx={x} cy={y} r={r + 5} fill="none" stroke="var(--vision)" strokeWidth="2.5" />
          <rect x={x - 26} y={y - r - 26} width="52" height="18" rx="5" fill="var(--vision)" />
          <text x={x} y={y - r - 13} textAnchor="middle" fontSize="11" fontWeight="700" fill="#fff">
            {l}
          </text>
        </g>
      ))}
      <g transform="translate(20 318)">
        <text y="24" fontSize="15" fontWeight="600" fill="var(--muted)">
          {lang === "tr" ? "Toplam" : "Total"}
        </text>
        <text x="440" y="24" textAnchor="end" fontSize="18" fontWeight="700" fill="var(--ink)" className="tnum">
          {(total / 100).toFixed(2).replace(".", lang === "tr" ? "," : ".")} TL
        </text>
      </g>
    </Frame>
  );
}

/* ---------- Eğitim Yönetim Sistemi: menü, duyurular, mesajlar ---------- */
export function CampusVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(3);
  const tr = lang === "tr";
  const nav = tr ? ["Dersler", "Bölümler", "Duyurular", "Mesajlar"] : ["Courses", "Departments", "Announcements", "Messages"];
  const active = Math.floor(t / 2) % 4;
  const msg = Math.min(1, (t % 4) * 1.5);
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="20" y="20" width="440" height="320" rx="14" fill="var(--bg)" stroke="var(--line)" />
      <rect x="20" y="20" width="132" height="320" rx="14" fill="var(--surface)" />
      {nav.map((item, i) => (
        <g key={item} transform={`translate(32 ${50 + i * 42})`}>
          <rect width="108" height="32" rx="9" fill={i === active ? "var(--web)" : "transparent"} />
          <text x="12" y="20.5" fontSize="12" fontWeight="600" fill={i === active ? "#fff" : "var(--muted)"}>
            {item}
          </text>
        </g>
      ))}
      {[0, 1].map((i) => (
        <g key={i} transform={`translate(170 ${44 + i * 74})`}>
          <rect width="270" height="62" rx="12" fill="var(--surface)" />
          <rect x="14" y="14" width="6" height="34" rx="3" fill="var(--web)" />
          <rect x="30" y="16" width="150" height="8" rx="4" fill="var(--ink)" opacity="0.7" />
          <rect x="30" y="32" width="210" height="6" rx="3" fill="var(--muted)" opacity="0.4" />
          <rect x="30" y="44" width="170" height="6" rx="3" fill="var(--muted)" opacity="0.4" />
        </g>
      ))}
      <g transform="translate(170 206)">
        <rect width="190" height="34" rx="14" fill="var(--surface)" />
        <rect x="14" y="13" width="140" height="8" rx="4" fill="var(--muted)" opacity="0.5" />
        <g transform={`translate(80 ${46 + (1 - msg) * 10})`} opacity={msg}>
          <rect width="190" height="34" rx="14" fill="var(--web)" />
          <rect x="16" y="13" width="120" height="8" rx="4" fill="#fff" opacity="0.8" />
        </g>
      </g>
    </Frame>
  );
}

/* ---------- Mayın tarlası botu: tahtayı okur ve oynar ---------- */
const BOARD = ["1F2.....", "123.....", "..1F1...", "..111...", "........"];
export function MinesVisual({ className, label }: V) {
  const { ref, t } = useClock(3);
  const cols = 8,
    rows = 5,
    s = 46,
    x0 = 56,
    y0 = 50;
  const cells = Array.from({ length: cols * rows }, (_, i) => i);
  const opened = Math.floor((t % 8) * 4);
  const cur = Math.min(opened, cells.length - 1);
  const scanX = x0 + ((t * 120) % (cols * s));
  const color: Record<string, string> = { "1": "var(--web)", "2": "var(--game)", "3": "var(--vision)" };
  return (
    <Frame svgRef={ref} className={className} label={label}>
      {cells.map((i) => {
        const c = i % cols,
          r = Math.floor(i / cols);
        const v = BOARD[r][c];
        const open = i < opened && v !== ".";
        const empty = i < opened && v === ".";
        return (
          <g key={i} transform={`translate(${x0 + c * s} ${y0 + r * s})`}>
            <rect width={s - 4} height={s - 4} rx="6" fill={open || empty ? "var(--bg)" : "var(--surface)"} stroke="var(--line)" />
            {open && v === "F" && <path d="M16 31V11l13 6-13 6" fill="var(--desktop)" stroke="var(--desktop)" strokeWidth="2" strokeLinejoin="round" />}
            {open && v !== "F" && (
              <text x={(s - 4) / 2} y="28" textAnchor="middle" fontSize="18" fontWeight="700" fill={color[v]}>
                {v}
              </text>
            )}
          </g>
        );
      })}
      <rect x={scanX} y={y0 - 6} width="3" height={rows * s + 8} fill="var(--desktop)" opacity="0.5" />
      <g transform={`translate(${x0 + (cur % cols) * s + 24} ${y0 + Math.floor(cur / cols) * s + 24})`}>
        <path d="M0 0v20l5.5-5 4 8.5 3.5-1.6-4-8.4H16z" fill="var(--ink)" stroke="var(--bg)" strokeWidth="1.5" strokeLinejoin="round" />
      </g>
      <text x="240" y="318" textAnchor="middle" fontSize="12.5" fill="var(--muted)">
        OpenCV · OCR · PyAutoGUI
      </text>
    </Frame>
  );
}

/* ---------- Hava durumu uygulaması ---------- */
export function WeatherVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(1);
  const tr = lang === "tr";
  const days = tr ? ["Pzt", "Sal", "Çar", "Per", "Cum"] : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const temps = [18, 21, 17, 14, 19];
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <rect x="30" y="24" width="250" height="196" rx="20" fill="var(--web)" />
      <text x="54" y="60" fontSize="15" fontWeight="600" fill="#fff" opacity="0.85">
        Ankara
      </text>
      <text x="52" y="140" fontSize="64" fontWeight="700" fill="#fff" letterSpacing="-3" className="tnum">
        18°
      </text>
      <text x="54" y="176" fontSize="13" fill="#fff" opacity="0.8">
        {tr ? "Parçalı bulutlu" : "Partly cloudy"}
      </text>
      <g transform={`translate(214 96) rotate(${t * 12})`}>
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="-2" y="-34" width="4" height="10" rx="2" fill="#ffd166" transform={`rotate(${i * 45})`} />
        ))}
        <circle r="18" fill="#ffd166" />
      </g>
      <path d="M190 132a18 18 0 0 1 34-6 14 14 0 1 1 6 27h-38a12 12 0 0 1-2-21z" fill="#fff" opacity="0.92" transform={`translate(${Math.sin(t) * 4} 0)`} />
      <g transform="translate(300 24)">
        <rect width="150" height="196" rx="20" fill="var(--surface)" stroke="var(--line)" />
        <path d="M0 120 C40 100 60 150 100 120 S150 110 150 110" stroke="var(--line)" strokeWidth="2" />
        <path d="M0 70 C50 90 70 40 150 60" stroke="var(--line)" strokeWidth="2" />
        <g transform="translate(75 92)">
          <path d="M0 -26c-11 0-19 8-19 18 0 14 19 32 19 32s19-18 19-32c0-10-8-18-19-18z" fill="var(--web)" />
          <circle cy="-8" r="6" fill="var(--bg)" />
        </g>
      </g>
      {days.map((d, i) => (
        <g key={d} transform={`translate(${30 + i * 86} 240)`}>
          <rect width="76" height="96" rx="16" fill="var(--surface)" stroke={i === 0 ? "var(--web)" : "none"} />
          <text x="38" y="26" textAnchor="middle" fontSize="12" fill="var(--muted)">
            {d}
          </text>
          <circle cx="38" cy="50" r="9" fill={temps[i] > 16 ? "#ffb703" : "var(--muted)"} opacity={temps[i] > 16 ? 1 : 0.5} />
          <text x="38" y="84" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--ink)" className="tnum">
            {temps[i]}°
          </text>
        </g>
      ))}
    </Frame>
  );
}

/* ---------- E-alışveriş: ürünler ve sepet ---------- */
export function ShopVisual({ lang, className, label }: V) {
  const { ref, t } = useClock(2.5);
  const tr = lang === "tr";
  const c = t % 6;
  const count = 1 + (c > 2 ? 1 : 0) + (c > 4 ? 1 : 0);
  const items = ["var(--web)", "var(--desktop)", "var(--game)"];
  return (
    <Frame svgRef={ref} className={className} label={label}>
      <g transform="translate(398 22)">
        <path d="M4 8h8l6 30h26l6-20H16" stroke="var(--ink)" strokeWidth="3" fill="none" strokeLinejoin="round" strokeLinecap="round" />
        <circle cx="22" cy="46" r="4" fill="var(--ink)" />
        <circle cx="40" cy="46" r="4" fill="var(--ink)" />
        <g transform="translate(48 6)">
          <circle r="12" fill="var(--web)" />
          <text y="4.5" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" className="tnum">
            {count}
          </text>
        </g>
      </g>
      {items.map((col, i) => {
        const hot = (i === 1 && c > 1.4 && c < 2.2) || (i === 2 && c > 3.4 && c < 4.2);
        return (
          <g key={i} transform={`translate(${24 + i * 148} 84)`}>
            <rect width="136" height="252" rx="16" fill="var(--surface)" stroke={hot ? "var(--web)" : "var(--line)"} strokeWidth={hot ? 2 : 1} />
            <rect x="14" y="14" width="108" height="108" rx="12" fill={col} opacity="0.85" />
            <rect x="14" y="138" width="90" height="9" rx="4.5" fill="var(--ink)" opacity="0.7" />
            <rect x="14" y="154" width="60" height="7" rx="3.5" fill="var(--muted)" opacity="0.4" />
            <rect x="14" y="176" width="44" height="12" rx="4" fill="var(--ink)" opacity="0.85" />
            <rect x="14" y="204" width="108" height="32" rx="10" fill={hot ? "var(--web)" : "var(--bg)"} stroke="var(--line)" />
            <text x="68" y="224.5" textAnchor="middle" fontSize="12" fontWeight="600" fill={hot ? "#fff" : "var(--ink)"}>
              {tr ? "Sepete ekle" : "Add to cart"}
            </text>
          </g>
        );
      })}
    </Frame>
  );
}

// Her projenin kendi görseli; listede olmayan yeni bir proje kategorisine göre bir görsel alır
const BY_SLUG: Record<string, (p: V) => React.ReactElement> = {
  "advisory-system": ScheduleVisual,
  "ai-music-visualizer": SpectrumVisual,
  "hand-gesture-media-controller": HandVisual,
  "secure-voice-app": VoiceVisual,
  "muavin-sim": BusVisual,
  "economic-advisor": MarketVisual,
  "shorts-pipeline": PipelineVisual,
  "internship-checker": TranscriptVisual,
  "coin-counter": CoinsVisual,
  "spotify-overlay": OverlayVisual,
  "education-management-system": CampusVisual,
  "minesweeper-bot": MinesVisual,
  "weather-app": WeatherVisual,
  "e-shopping-app": ShopVisual,
};
const BY_CAT: Record<Project["category"], (p: V) => React.ReactElement> = {
  web: CampusVisual,
  vision: CoinsVisual,
  desktop: OverlayVisual,
  game: BusVisual,
};

export function ProjectVisual({ project, lang, className, step, progress }: { project: Project; lang: Lang; className?: string; step?: number; progress?: number }) {
  const C = BY_SLUG[project.slug] ?? BY_CAT[project.category];
  return <C lang={lang} className={className} label={project.title} step={step} progress={progress} />;
}
