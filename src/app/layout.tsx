import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { Footer, Nav } from "@/components/chrome";
import { LangProvider } from "@/components/lang";
import { themeScript } from "@/components/theme-script";
import { profile } from "@/content";
import "./globals.css";

const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist" });

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
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={geist.variable} suppressHydrationWarning>
      <head>
        {/* Tema, sayfa çizilmeden önce ayarlanır */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-svh flex-col font-sans text-[1.0625rem] leading-relaxed antialiased">
        <LangProvider>
          <Nav />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
