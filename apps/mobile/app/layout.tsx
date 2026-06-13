import type { Metadata, Viewport } from "next";
import { CapgoInit } from "./CapgoInit";
import { TabBar } from "./_components/TabBar";
import { PlatformGate } from "./_components/PlatformGate";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "TownLink",
  description: "Ghana's Trusted Service Directory",
};

export const viewport: Viewport = {
  themeColor: "#1e40af",
};

export default function MobileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className="bg-[#EEF6F9] antialiased"
        style={{ fontFamily: '"Hanken Grotesk Variable", "Hanken Grotesk", system-ui, sans-serif' }}
      >
        <PlatformGate>
          <CapgoInit />
          <main className="min-h-screen pb-20">{children}</main>
          <TabBar />
        </PlatformGate>
      </body>
    </html>
  );
}
