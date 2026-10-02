export function PageHeader({ title, text, dot = "bg-violet" }: { title: string; text?: string; dot?: string }) {
  return (
    <header className="pt-10 pb-10 sm:pt-14">
      <h1 className="rise flex items-center gap-3 text-[2rem] font-semibold leading-tight tracking-tight sm:text-4xl">
        <span className={`size-3 shrink-0 rounded-full ${dot}`} />
        {title}
      </h1>
      {text && (
        <p className="rise mt-4 max-w-2xl text-[1.0625rem] text-muted" style={{ animationDelay: "90ms" }}>
          {text}
        </p>
      )}
    </header>
  );
}

export function SectionTitle({ children, dot = "bg-violet" }: { children: React.ReactNode; dot?: string }) {
  return (
    <h2 className="mb-5 flex items-center gap-2.5 text-lg font-semibold tracking-tight">
      <span className={`size-2 rounded-full ${dot}`} />
      {children}
    </h2>
  );
}
