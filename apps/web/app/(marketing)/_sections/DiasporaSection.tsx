"use client";

import React from "react";
import { SectionHeading } from "@townlink/ui";

export function DiasporaSection() {
  return (
    <section className="px-6 py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        {/* Abstract map/world pattern placeholder */}
        <div className="w-full h-full" style={{ backgroundImage: "radial-gradient(var(--color-brand-primary) 1px, transparent 1px)", backgroundSize: "30px 30px" }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center justify-center p-3 bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] rounded-full mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
          </svg>
        </div>
        
        <SectionHeading
          title="Services for Diaspora Clients"
          align="center"
          className="mb-8"
        />
        
        <p className="text-xl md:text-2xl text-[var(--color-text-muted)] leading-relaxed font-medium">
          Living abroad? Whether you're in the UK, USA, Canada, or Europe, 
          TownLink Services makes it easy to hire trusted professionals to manage 
          your projects, properties, and family needs back home in Ghana.
        </p>
      </div>
    </section>
  );
}
