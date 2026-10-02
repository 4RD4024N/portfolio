// Her sayfa geçişinde yeniden oluşturulur; içerik yumuşakça belirir
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
