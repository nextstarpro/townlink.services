import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { CapgoInit } from "./CapgoInit";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "TownLink",
  description: "Ghana's Trusted Service Directory",
};

const tabs = [
  { label: "Home", href: "/dashboard", icon: "🏠" },
  { label: "Feed", href: "/feed", icon: "📋" },
  { label: "Chat", href: "/chat", icon: "💬" },
  { label: "Profile", href: "/profile", icon: "👤" },
];

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-[var(--tl-cream)] pb-16">
        <CapgoInit />
        <main className="min-h-screen">{children}</main>
        {/* Bottom Tab Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--tl-border)] flex items-center justify-around py-2 z-50"
          style={{ paddingBottom: "env(safe-area-inset-bottom, 8px)" }}>
          {tabs.map((t) => (
            <a key={t.href} href={t.href} className="flex flex-col items-center gap-0.5 text-[var(--tl-muted)] text-[0.65rem]">
              <span className="text-lg">{t.icon}</span>
              {t.label}
            </a>
          ))}
        </nav>
      </body>
    </html>
  );
}
