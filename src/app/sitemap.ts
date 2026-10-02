import type { MetadataRoute } from "next";
import { projects } from "@/content";

// Vercel'de canlı adres otomatik geliyor; özel alan adı bağlanınca da o kullanılır
const BASE = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/experience", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${BASE}${p}` })),
    ...projects.map((p) => ({ url: `${BASE}/projects/${p.slug}` })),
  ];
}
