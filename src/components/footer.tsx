import { Container } from "@/components/container";
import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-ink sm:mt-32">
      <Container className="py-6">
        <p className="tnum text-sm font-semibold">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
