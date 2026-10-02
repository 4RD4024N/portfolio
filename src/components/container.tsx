// Tüm sayfaların ortak genişliği: okunabilir bir satır uzunluğu, büyük ekranlarda biraz genişliyor
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[42rem] px-5 sm:px-8 xl:max-w-[46rem] ${className}`}>{children}</div>;
}
