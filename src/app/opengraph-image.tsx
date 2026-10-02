import { ImageResponse } from "next/og";
import { profile } from "@/content";

// Link paylaşıldığında (LinkedIn, WhatsApp, X…) görünen önizleme görseli
export const alt = profile.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 96,
          background: "#faf9f6",
          color: "#1c1b19",
        }}
      >
        <div style={{ fontSize: 80, fontWeight: 600, letterSpacing: -1.5 }}>{profile.name}</div>
        <div style={{ marginTop: 12, fontSize: 36, color: "#6d6a63" }}>
          {`${profile.role.en}, ${profile.location.en}`}
        </div>
        <div style={{ marginTop: 48, width: 96, height: 4, background: "#b5482a" }} />
      </div>
    ),
    size,
  );
}
