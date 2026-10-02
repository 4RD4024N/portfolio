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
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(ellipse 80% 70% at 50% 0%, #10303f 0%, #09090b 70%)",
          color: "#ededef",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 72,
            height: 72,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            border: "2px solid #34343c",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          AÖ
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -2 }}>{profile.name}</div>
          <div style={{ marginTop: 16, fontSize: 36, color: "#8e8e98" }}>{profile.role.en}</div>
          <div style={{ marginTop: 32, fontSize: 30, color: "#7dd3fc" }}>{profile.headline.en}</div>
        </div>
      </div>
    ),
    size,
  );
}
