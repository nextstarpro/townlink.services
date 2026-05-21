// Marketing layout: top nav + footer for public/SEO pages

import { AppButton } from "@townlink/ui";

import { MarketingHeader } from "./_components/MarketingHeader";
import { MarketingFooter } from "../_components/MarketingFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-white">
      <MarketingHeader />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <MarketingFooter />
    </div>
  );
}
