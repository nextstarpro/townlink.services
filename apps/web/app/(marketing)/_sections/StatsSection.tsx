"use client";

import React from "react";
import { AppButton } from "@townlink/ui";

export function StatsSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-4 -mt-12 md:-mt-16 relative z-20">
      <div className="flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-border-light/50 bg-white">
        
        {/* Left Side - Customers */}
        <div className="flex-1 bg-white/90 backdrop-blur-md p-8 md:p-12 flex flex-col justify-center md:border-r border-border-light">
          <h3 className="font-serif text-2xl md:text-3xl text-brand-dark mb-3">Looking for a professional?</h3>
          <p className="text-text-muted text-sm md:text-base mb-8 max-w-md leading-relaxed">
            Browse hundreds of verified experts across Ghana. From plumbers to tech experts, find the right person for the job instantly.
          </p>
          <div>
            <a href="/providers">
              <AppButton variant="primary" className="shadow-lg shadow-brand-primary/20 hover:-translate-y-1 transition-transform">
                Browse Directory →
              </AppButton>
            </a>
          </div>
        </div>

        {/* Right Side - Providers */}
        <div className="flex-1 bg-brand-dark p-8 md:p-12 flex flex-col justify-center relative overflow-hidden">
          {/* Abstract dark shapes for texture */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          
          <h3 className="font-serif text-2xl md:text-3xl text-white mb-3 relative z-10">Are you a skilled expert?</h3>
          <p className="text-white/70 text-sm md:text-base mb-8 max-w-md leading-relaxed relative z-10">
            Join TownLink for free. Get discovered by local and diaspora clients, build your reputation, and grow your business.
          </p>
          <div className="relative z-10">
            <a href="/register-provider">
              <AppButton variant="inverted" className="text-brand-dark hover:-translate-y-1 transition-transform">
                Register as Provider
              </AppButton>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
