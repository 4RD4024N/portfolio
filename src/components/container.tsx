// Sitenin ızgara kabı: kenar boşlukları ekranla büyür, çok geniş ekranda 90rem'de durur
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[90rem] px-5 sm:px-8 lg:px-12 ${className}`}>{children}</div>;
}

// 12 sütunlu ızgara (tablette 6, telefonda 4)
export const grid = "grid grid-cols-4 gap-x-4 md:grid-cols-6 md:gap-x-5 lg:grid-cols-12 lg:gap-x-6";
