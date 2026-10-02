import { Container, grid } from "@/components/container";

// Sayfa başlığı: büyük plaket yazısı
export function PageHeader({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <Container>
      <header className={`${grid} items-end gap-y-5 pt-12 pb-10 sm:pt-20 sm:pb-12`}>
        <div className="col-span-4 md:col-span-6 lg:col-span-7">
          <h1 className="title text-[clamp(2.75rem,7vw,5.5rem)]">{title}</h1>
        </div>
        {text && <p className="col-span-4 max-w-[46ch] text-muted md:col-span-4 lg:col-span-5">{text}</p>}
        {children}
      </header>
    </Container>
  );
}

// Bölüm başlığı
export function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-baseline justify-between gap-6">
      <h2 className="title text-2xl sm:text-3xl">{children}</h2>
      {aside}
    </div>
  );
}
