// App layout: sidebar (desktop) / bottom nav (mobile web) for authenticated pages

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)]">
      <nav className="bg-white border-b border-[var(--color-border-light)] px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-bold text-[var(--color-text-heavy)] text-xl tracking-tight">
            TownLink
          </span>
        </div>
        <span className="text-xs font-medium text-[var(--color-text-muted)] uppercase tracking-wider">App Shell</span>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
