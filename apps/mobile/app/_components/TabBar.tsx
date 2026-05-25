"use client";

import { usePathname } from "next/navigation";
import { Search, MessageCircle, User } from "lucide-react";
import Link from "next/link";

const tabs = [
  { label: "Browse", href: "/providers", icon: Search },
  { label: "Chat", href: "/chat", icon: MessageCircle },
  { label: "Profile", href: "/profile", icon: User },
];

export function TabBar() {
  const pathname = usePathname();

  // Hide tab bar on onboarding and splash screens
  if (pathname === "/onboarding" || pathname === "/") {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#bccbb9] flex justify-around items-center px-4 py-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: "calc(8px + env(safe-area-inset-bottom, 0px))" }}
    >
      {tabs.map((t) => {
        const isActive =
          pathname === t.href || pathname.startsWith(t.href + "/");
        const Icon = t.icon;
        return (
          <Link
            key={t.href}
            href={t.href}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all duration-200 w-20 ${
              isActive
                ? "text-[#006d2f] font-bold"
                : "text-[#3d4a3d] hover:bg-[#eef6ea]"
            }`}
          >
            <Icon
              size={24}
              className="mb-1"
              fill={isActive ? "currentColor" : "none"}
              strokeWidth={isActive ? 2.5 : 2}
            />
            <span className="text-[10px] font-semibold leading-none">
              {t.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
