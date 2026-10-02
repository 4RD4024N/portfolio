export function PageHeader({ title, text }: { title: string; text?: string }) {
  return (
    <header className="pt-10 pb-10 sm:pt-16">
      <h1 className="text-[1.75rem] font-medium leading-tight tracking-tight sm:text-3xl">{title}</h1>
      {text && <p className="mt-4 text-muted">{text}</p>}
    </header>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-5 font-medium">{children}</h2>;
}
