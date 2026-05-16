// App layout: sidebar (desktop) / bottom nav (mobile web) for authenticated pages

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--tl-cream)]">
      <nav className="bg-white border-b border-[var(--tl-border)] px-6 py-3 flex items-center justify-between">
        <span className="font-[family-name:var(--font-dm-serif)] text-[var(--tl-green)] text-lg">
          TownLink
        </span>
        <span className="text-xs text-[var(--tl-muted)]">App Shell</span>
      </nav>
      <main className="max-w-4xl mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
