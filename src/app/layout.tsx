import type { Metadata, Viewport } from "next";
import { Barlow, Barlow_Semi_Condensed } from "next/font/google";
import { Footer } from "@/components/footer";
import { LangProvider } from "@/components/lang";
import { Nav } from "@/components/nav";
import { themeScript } from "@/components/theme-script";
import { profile } from "@/content";
import "./globals.css";

// Barlow: mimari çizimlerdeki DIN tarzı yazıya yakın; metin için normal, plaketler için yarı dar
const barlow = Barlow({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], variable: "--font-barlow" });
const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-barlow-semi",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000",
  ),
  title: {
    default: `${profile.name} · ${profile.role.en}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.intro.en,
  openGraph: {
    title: profile.name,
    description: profile.headline.en,
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#dcdbd6" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1c1b" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${barlow.variable} ${barlowSemi.variable}`} suppressHydrationWarning>
      <head>
        {/* Tema, sayfa çizilmeden önce ayarlanır */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col font-sans text-[1.0625rem] leading-relaxed antialiased">
        <LangProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
