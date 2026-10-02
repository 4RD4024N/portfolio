import { Container } from "@/components/container";
import { profile } from "@/content";

export function Footer() {
  return (
    <footer className="mt-24 pb-10">
      <Container>
        <p className="border-t border-line pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </Container>
    </footer>
  );
}
