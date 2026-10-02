import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Link paylaşıldığında (LinkedIn, WhatsApp, X…) görünen önizleme görseli: masada balsa isim plaketi ve renk akrilikleri
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const volumes = [
  { c: "#2c5fd6", h: 180 },
  { c: "#e8b21c", h: 130 },
  { c: "#277a4d", h: 130 },
  { c: "#161616", h: 70 },
  { c: "#caa678", h: 70 },
  { c: "#caa678", h: 100 },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#dcdbd6", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 18, height: 200 }}>
          {volumes.map((v, i) => (
            <div key={i} style={{ width: 90, height: v.h, background: v.c, boxShadow: "0 18px 30px -16px rgba(40,36,30,0.5)" }} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "flex-start",
            background: "#caa678",
            color: "#45311b",
            padding: "28px 36px",
            borderRadius: 4,
            boxShadow: "0 22px 40px -18px rgba(40,36,30,0.55)",
          }}
        >
          <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -1, textTransform: "uppercase" }}>{profile.name}</div>
          <div style={{ fontSize: 30, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", marginTop: 8 }}>
            {`${profile.role.en} · ${profile.location.en}`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
