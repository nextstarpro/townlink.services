import React from "react";
import { ProviderPortal } from "./_components/ProviderPortal";

export const metadata = {
  title: "Provider Portal | TownLink Services",
  description: "Join Ghana's fastest-growing service network. Get verified and connect with clients across all 16 regions.",
};

export default function ProviderPortalPage() {
  return (
    <div className="bg-bg-white min-h-screen">
      {/* Hero Header */}
      <div className="bg-brand-dark pt-12 pb-24 px-6 text-center relative overflow-hidden">
        {/* Subtle curved bottom edge */}
        <div className="absolute -bottom-1 left-0 right-0 h-12 bg-bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}></div>
        
        <h1 className="font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
          <em className="text-brand-secondary not-italic">Provider</em> Portal
        </h1>
        <p className="text-white/85 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Manage your TownLink profile, reach clients across all 16 regions, and grow your business.
        </p>
      </div>

      {/* Portal Container */}
      <div className="max-w-4xl mx-auto -mt-16 px-4 relative z-10 pb-20">
        <ProviderPortal />
      </div>
    </div>
  );
}
