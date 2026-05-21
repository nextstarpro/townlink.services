"use client";

import React from "react";
import { SectionHeading } from "@townlink/ui";

export function MidVideoCTA() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 w-full">
          <div className="aspect-[4/3] bg-[var(--color-brand-dark)] rounded-[40px] relative overflow-hidden shadow-[var(--shadow-card)] flex items-center justify-center group cursor-pointer">
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
            {/* Play Button */}
            <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-[var(--color-brand-primary)]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 text-white text-sm font-medium z-10">
              See how TownLink helps a diaspora client build their home
            </div>
          </div>
        </div>
        <div className="flex-1">
          <SectionHeading
            title="Quality work, verified people."
            subtitle="Every provider on TownLink is vetted through Ghana Card verification. We take the stress out of finding reliable help, so you can focus on what matters most."
          />
          <div className="mt-8 space-y-6">
            {[
              { title: "Identity Verified", desc: "We check every provider's Ghana Card before they join." },
              { title: "Transparent Pricing", desc: "Know the rates upfront. No hidden surprises." },
              { title: "Client Reviews", desc: "Read real feedback from previous clients." }
            ].map((feature, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-[var(--color-text-heavy)] text-lg">{feature.title}</h4>
                  <p className="text-[var(--color-text-muted)]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
