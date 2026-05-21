// Auth layout: centered card, minimal chrome

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--color-bg-light)] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-[var(--radius-card)] shadow-[var(--shadow-card)] max-w-md w-full p-8 md:p-12">
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="w-12 h-12 bg-[var(--color-brand-primary)] rounded-full flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="font-bold text-[var(--color-text-heavy)] text-2xl tracking-tight">
            TownLink <span className="text-[var(--color-brand-primary)]">Services</span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
