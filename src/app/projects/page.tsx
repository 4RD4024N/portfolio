import type { Metadata } from "next";
import { ProjectsView } from "@/components/views/projects";
import { ui } from "@/content";

export const metadata: Metadata = {
  title: "Projects",
  description: ui.projectsIntro.en,
};

export default function Page() {
  return <ProjectsView />;
}
