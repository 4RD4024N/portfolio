import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Link paylaşıldığında (LinkedIn, WhatsApp, X…) görünen önizleme görseli
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fields = ["#1f45d6", "#f2b705", "#0f7a50", "#111111", "#e4e4de", "#e4e4de"];

export default function OpengraphImage() {
  const [first, ...rest] = profile.name.split(" ");
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#f7f7f7", color: "#111111" }}>
        <div style={{ display: "flex", flex: 1, padding: "64px 72px 40px", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 150, fontWeight: 800, letterSpacing: -6, lineHeight: 0.9 }}>
            <span>{first}</span>
            <span style={{ color: "#cf2a1a" }}>{rest.join(" ")}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 30, fontWeight: 700, alignItems: "flex-end" }}>
            <span>{profile.role.en}</span>
            <span style={{ color: "#5b5b57" }}>{profile.location.en}</span>
          </div>
        </div>
        <div style={{ display: "flex", height: 120, borderTop: "3px solid #111111", gap: 3, background: "#111111" }}>
          {fields.map((c, i) => (
            <div key={i} style={{ flex: 1, background: c }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
