import { Suspense } from "react";
import ProviderDetailClient from "./_client";

export default function ProviderDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EEF6F9] flex flex-col items-center justify-center gap-4">
          <div className="w-10 h-10 border-3 border-[#dce5d9] border-t-[#006d2f] rounded-full animate-spin" />
          <p className="text-sm text-[#6d7b6c]">Loading profile...</p>
        </div>
      }
    >
      <ProviderDetailClient />
    </Suspense>
  );
}
