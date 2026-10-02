import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <p className="mx-auto max-w-5xl px-4 py-8 text-xs text-muted sm:px-6">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
