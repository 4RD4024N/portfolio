// Tek çizgi kalınlığında çizilmiş oklar
type P = { className?: string };

export function ArrowRight({ className = "size-[1em]" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M3 10h13M11 4.5l5.5 5.5-5.5 5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowLeft({ className = "size-[1em]" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M17 10H4M9 4.5L3.5 10 9 15.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}

export function ArrowUpRight({ className = "size-[0.85em]" }: P) {
  return (
    <svg viewBox="0 0 20 20" fill="none" className={className} aria-hidden>
      <path d="M5 15L15 5M7 5h8v8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="square" />
    </svg>
  );
}
