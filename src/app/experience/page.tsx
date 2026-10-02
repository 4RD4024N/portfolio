import type { Metadata } from "next";
import { ExperienceView } from "@/components/views/experience";
import { ui } from "@/content";

export const metadata: Metadata = {
  title: "Experience",
  description: ui.experienceIntro.en,
};

export default function Page() {
  return <ExperienceView />;
}
