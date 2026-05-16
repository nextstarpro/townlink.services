// Marketing layout: top nav + footer for public/SEO pages

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[var(--tl-green)] px-6 py-4 flex items-center justify-between">
        <div className="font-[family-name:var(--font-dm-serif)] text-white text-xl tracking-tight">
          TownLink <span className="text-[var(--tl-gold)]">Services</span>
        </div>
        <span className="text-xs text-white/65 uppercase tracking-wider">
          Ghana&apos;s Trusted Service Directory
        </span>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-center py-5 px-4 text-xs text-[var(--tl-muted)]">
        © {new Date().getFullYear()} TownLink Services. All rights reserved.
      </footer>
    </div>
  );
}
