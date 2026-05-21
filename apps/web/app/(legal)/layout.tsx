import { LegalHeader } from "../_components/LegalHeader";
import { MarketingFooter } from "../_components/MarketingFooter";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-white">
      <LegalHeader />
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 md:py-20">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
