"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MobileHome() {
  const router = useRouter();

  useEffect(() => {
    const onboarded = localStorage.getItem("tl_onboarded");
    if (!onboarded) {
      router.replace("/onboarding");
    } else {
      router.replace("/providers");
    }
  }, [router]);

  // Splash-like loading state while determining route
  return (
    <div className="fixed inset-0 bg-[#00404F] flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center animate-[fadeIn_0.5s_ease-out]">
        <div className="w-24 h-24 mb-6 rounded-3xl bg-[#30CB65] flex items-center justify-center shadow-lg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 11v-6a5 5 0 0 1 10 0v6" />
            <path d="M18 11h-12a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        </div>
        <h1 className="text-[40px] font-extrabold text-white tracking-tight leading-tight">
          TownLink
        </h1>
        <p className="text-white/80 text-[20px] font-semibold mt-2">
          Ghana&apos;s Trusted Service Directory
        </p>
      </div>
      {/* Loading dots */}
      <div className="absolute bottom-16 flex justify-center w-full opacity-50">
        <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping mx-1" />
        <div
          className="w-1.5 h-1.5 bg-white rounded-full animate-ping mx-1"
          style={{ animationDelay: "0.2s" }}
        />
        <div
          className="w-1.5 h-1.5 bg-white rounded-full animate-ping mx-1"
          style={{ animationDelay: "0.4s" }}
        />
      </div>
    </div>
  );
}
