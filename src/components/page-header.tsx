export function PageHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <header className="pt-16 pb-12 sm:pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      {text && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{text}</p>}
    </header>
  );
}
