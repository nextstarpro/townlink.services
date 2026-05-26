import type { Metadata } from "next";
import "@fontsource/mona-sans/400.css";
import "@fontsource/mona-sans/500.css";
import "@fontsource/mona-sans/600.css";
import "@fontsource/mona-sans/700.css";
import "@fontsource/mona-sans/800.css";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TownLink Services | Ghana's Trusted Service Directory",
    template: "%s | TownLink Services",
  },
  description:
    "Find trusted service providers across Ghana. Connect with verified professionals for home services, construction, transport, beauty, repairs, events and more.",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="font-sans antialiased text-text-primary">
      <body>
        {children}
        <script id="chatway" async src="https://cdn.chatway.app/widget.js?id=Og41Z96qnep0"></script>
      </body>
    </html>
  );
}
