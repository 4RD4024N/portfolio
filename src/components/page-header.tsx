import { Container, grid } from "@/components/container";

// Sayfa başlığı: dar ve kalın başlık sol 8 sütunda, açıklama sağda; altta tam genişlikte çizgi
export function PageHeader({ title, text, children }: { title: string; text?: string; children?: React.ReactNode }) {
  return (
    <Container>
      <header className={`relative ${grid} items-end gap-y-5 border-b border-ink pt-12 pb-8 sm:pt-20 sm:pb-10`}>
        {/* Izgaranın sütun başlarını gösteren cetvel çentikleri */}
        <div aria-hidden className={`pointer-events-none absolute inset-x-0 bottom-0 h-3 ${grid}`}>
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} className={`border-l border-ink ${i < 4 ? "" : i < 6 ? "hidden md:block" : "hidden lg:block"}`} />
          ))}
        </div>
        <h1 className="display col-span-4 overflow-hidden text-[clamp(3rem,9vw,6rem)] md:col-span-6 lg:col-span-7">
          <span className="line-up">{title}</span>
        </h1>
        {text && <p className="col-span-4 max-w-[44ch] text-muted md:col-span-4 lg:col-span-5">{text}</p>}
        {children}
      </header>
    </Container>
  );
}

// Bölüm başlığı: solda başlık, sağa uzanan çizgi
export function SectionTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-6 border-b border-ink pb-3">
      <h2 className="condensed text-2xl font-extrabold tracking-tight sm:text-3xl">{children}</h2>
      {aside}
    </div>
  );
}
