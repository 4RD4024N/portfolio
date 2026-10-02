// Editör simgeleri: 16 birimlik ızgarada, tek çizgi kalınlığı (1.5)
type P = { className?: string };

function Icon({ className = "size-4", children }: P & { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {children}
    </svg>
  );
}

export const ArrowRight = ({ className = "size-[1em]" }: P) => (
  <Icon className={className}>
    <path d="M2.5 8h10.5M9 4l4 4-4 4" />
  </Icon>
);
export const ArrowLeft = ({ className = "size-[1em]" }: P) => (
  <Icon className={className}>
    <path d="M13.5 8H3M7 4L3 8l4 4" />
  </Icon>
);
export const ArrowUpRight = ({ className = "size-[0.85em]" }: P) => (
  <Icon className={className}>
    <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
  </Icon>
);
export const Files = ({ className }: P) => (
  <Icon className={className}>
    <path d="M5.5 2.5h4.5l3 3v6.5a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1z" />
    <path d="M10 2.5v3h3M2.5 5v8.5a1 1 0 0 0 1 1H10" />
  </Icon>
);
export const Search = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="7" cy="7" r="4.25" />
    <path d="M10.2 10.2l3.3 3.3" />
  </Icon>
);
export const Branch = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="4.5" cy="3.5" r="1.5" />
    <circle cx="4.5" cy="12.5" r="1.5" />
    <circle cx="11.5" cy="5" r="1.5" />
    <path d="M4.5 5v6M11.5 6.5c0 3-7 2-7 4.5" />
  </Icon>
);
export const Mail = ({ className }: P) => (
  <Icon className={className}>
    <rect x="2" y="3.5" width="12" height="9" rx="1" />
    <path d="M2.5 4.5L8 9l5.5-4.5" />
  </Icon>
);
export const GitHub = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
    <path d="M8 .7a7.3 7.3 0 0 0-2.3 14.2c.4.1.5-.2.5-.4v-1.3c-2 .4-2.5-.9-2.5-.9-.3-.8-.8-1.1-.8-1.1-.7-.5 0-.5 0-.5.7.1 1.1.8 1.1.8.7 1.1 1.7.8 2.1.6.1-.5.3-.8.5-1-1.6-.2-3.3-.8-3.3-3.6 0-.8.3-1.4.8-2-.1-.2-.3-.9.1-1.9 0 0 .6-.2 2 .8a6.8 6.8 0 0 1 3.7 0c1.4-1 2-.8 2-.8.4 1 .2 1.7.1 1.9.5.6.8 1.2.8 2 0 2.8-1.7 3.4-3.3 3.6.3.2.5.7.5 1.3v2c0 .2.1.5.5.4A7.3 7.3 0 0 0 8 .7z" />
  </svg>
);
export const LinkedIn = ({ className = "size-4" }: P) => (
  <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
    <path d="M13.6 1H2.4C1.6 1 1 1.6 1 2.4v11.2c0 .8.6 1.4 1.4 1.4h11.2c.8 0 1.4-.6 1.4-1.4V2.4c0-.8-.6-1.4-1.4-1.4zM5.2 13H3.1V6.2h2.1V13zM4.1 5.3a1.2 1.2 0 1 1 0-2.4 1.2 1.2 0 0 1 0 2.4zM13 13h-2.1V9.7c0-.8 0-1.8-1.1-1.8s-1.3.9-1.3 1.8V13H6.4V6.2h2v.9c.3-.5 1-1.1 2.1-1.1 2.2 0 2.6 1.4 2.6 3.3V13z" />
  </svg>
);
export const Chevron = ({ className }: P) => (
  <Icon className={className}>
    <path d="M6 4l4 4-4 4" />
  </Icon>
);
export const Close = ({ className }: P) => (
  <Icon className={className}>
    <path d="M4.5 4.5l7 7M11.5 4.5l-7 7" />
  </Icon>
);
export const Menu = ({ className }: P) => (
  <Icon className={className}>
    <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" />
  </Icon>
);
export const Play = ({ className }: P) => (
  <svg viewBox="0 0 16 16" className={className} fill="currentColor" aria-hidden>
    <path d="M5 3.2v9.6a.5.5 0 0 0 .77.42l7.4-4.8a.5.5 0 0 0 0-.84l-7.4-4.8A.5.5 0 0 0 5 3.2z" />
  </svg>
);
export const Copy = ({ className }: P) => (
  <Icon className={className}>
    <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
    <path d="M10.5 5.5v-2a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2" />
  </Icon>
);
export const Check = ({ className }: P) => (
  <Icon className={className}>
    <path d="M3 8.5l3 3 7-7" />
  </Icon>
);
export const Lock = ({ className }: P) => (
  <Icon className={className}>
    <rect x="3.5" y="7" width="9" height="6.5" rx="1" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </Icon>
);
export const Folder = ({ className, open }: P & { open?: boolean }) => (
  <Icon className={className}>
    {open ? (
      <path d="M2 12.5V4a1 1 0 0 1 1-1h3.2l1.3 1.5H12a1 1 0 0 1 1 1V7M2 12.5l1.8-4.8a1 1 0 0 1 .9-.7H14l-1.9 5.5H2z" />
    ) : (
      <path d="M2 4a1 1 0 0 1 1-1h3.2l1.3 1.5H13a1 1 0 0 1 1 1v6.5a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4z" />
    )}
  </Icon>
);
export const Globe = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="8" cy="8" r="6" />
    <path d="M2 8h12M8 2c1.7 1.8 2.5 3.8 2.5 6S9.7 12.2 8 14c-1.7-1.8-2.5-3.8-2.5-6S6.3 3.8 8 2z" />
  </Icon>
);
export const Contrast = ({ className }: P) => (
  <Icon className={className}>
    <circle cx="8" cy="8" r="5.75" />
    <path d="M8 2.25v11.5a5.75 5.75 0 0 0 0-11.5z" fill="currentColor" stroke="none" />
  </Icon>
);
export const Terminal = ({ className }: P) => (
  <Icon className={className}>
    <path d="M3 4.5l3.5 3.5L3 11.5M8 12h5" />
  </Icon>
);
