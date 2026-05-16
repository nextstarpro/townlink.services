// Auth layout: centered card, minimal chrome

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[var(--tl-cream)] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <span className="font-[family-name:var(--font-dm-serif)] text-[var(--tl-green)] text-xl">
            TownLink <span className="text-[var(--tl-gold)]">Services</span>
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
