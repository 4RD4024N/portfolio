import type { Metadata } from "next";
import { ContactView } from "@/components/views/contact";
import { ui } from "@/content";

export const metadata: Metadata = {
  title: "Contact",
  description: ui.contactText.en,
};

export default function Page() {
  return <ContactView />;
}
