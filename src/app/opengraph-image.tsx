import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Link paylaşıldığında görünen önizleme: isim, rol ve e-posta
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", background: "#0b1120", color: "#e2e8f0" }}>
        <div style={{ fontSize: 104, fontWeight: 700, letterSpacing: -4, lineHeight: 1 }}>{profile.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#9aa6b8" }}>{`${profile.role.en} · ${profile.location.en}`}</div>
        <div style={{ display: "flex", alignItems: "center", marginTop: 56, fontSize: 30, color: "#a9c2ff" }}>
          <div style={{ width: 14, height: 14, borderRadius: 7, background: "#4cc48c", marginRight: 16 }} />
          {profile.email}
        </div>
      </div>
    ),
    size,
  );
}
