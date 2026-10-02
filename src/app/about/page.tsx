import type { Metadata } from "next";
import { AboutView } from "@/components/views/about";
import { profile } from "@/content";

export const metadata: Metadata = {
  title: "About",
  description: profile.intro.en,
};

export default function Page() {
  return <AboutView />;
}
