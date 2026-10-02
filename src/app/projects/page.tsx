import type { Metadata } from "next";
import { Suspense } from "react";
import { ProjectsView } from "@/components/views/projects";
import { ui } from "@/content";

export const metadata: Metadata = {
  title: "Projects",
  description: ui.projectsIntro.en,
};

export default function Page() {
  // Filtre adres satırındaki ?c= değerinden okunuyor
  return (
    <Suspense>
      <ProjectsView />
    </Suspense>
  );
}
