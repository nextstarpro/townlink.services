import type { Metadata } from "next";
import { CapgoInit } from "./CapgoInit";
import { TabBar } from "./_components/TabBar";
import "@fontsource-variable/hanken-grotesk";
import "./globals.css";

export const metadata: Metadata = {
  title: "TownLink",
  description: "Ghana's Trusted Service Directory",
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
        <CapgoInit />
        <main className="min-h-screen pb-20">{children}</main>
        <TabBar />
      </body>
    </html>
  );
}
