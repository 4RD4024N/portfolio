// Tüm sayfaların ortak genişliği; büyük ekranlarda biraz genişliyor
export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[46rem] px-5 sm:px-8 xl:max-w-[50rem] ${className}`}>{children}</div>;
}
