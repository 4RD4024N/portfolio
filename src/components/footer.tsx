import { Container } from "@/components/container";
import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="mt-24 sm:mt-32">
      <Container className="pb-8">
        <p className="tnum label border-t border-rule pt-5 text-xs text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
