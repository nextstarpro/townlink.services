import React from "react";
import { RegistrationWizard } from "./_components/RegistrationWizard";

export const metadata = {
  title: "Register as a Provider | TownLink Services",
  description: "Join Ghana's fastest-growing service network. Get verified and connect with clients across all 16 regions.",
};

export default function RegisterPage() {
  return (
    <div className="bg-bg-white min-h-screen">
      {/* Hero Header matching template.html */}
      <div className="bg-brand-dark pt-12 pb-24 px-6 text-center relative overflow-hidden">
        {/* Subtle curved bottom edge like the template */}
        <div className="absolute -bottom-1 left-0 right-0 h-12 bg-bg-white" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }}></div>
        
        <h1 className="font-extrabold text-4xl md:text-5xl text-white mb-4 leading-tight tracking-tight">
          <em className="text-brand-secondary not-italic">Register</em> as a Provider
        </h1>
        <p className="text-white/85 text-base md:text-lg max-w-md mx-auto leading-relaxed">
          Join Ghana's fastest-growing service network. Get verified and connect with clients across all 16 regions.
        </p>
      </div>

      {/* Form Container overlapping the hero */}
      <div className="max-w-xl mx-auto -mt-16 px-4 relative z-10 pb-20">
        <RegistrationWizard />
      </div>
    </div>
  );
}
