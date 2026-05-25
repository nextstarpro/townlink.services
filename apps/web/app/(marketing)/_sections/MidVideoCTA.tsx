"use client";

import React from "react";
import { SectionHeading } from "@townlink/ui";

export function MidVideoCTA() {
  return (
    <section className="px-6 py-24 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 w-full">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 md:gap-4 h-[400px] lg:h-[480px] w-full">
            {/* Large Left Image */}
            <div className="col-span-1 row-span-2 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80" 
                alt="Electrician" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Floating Verified Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-lg flex items-center gap-3 transform transition-transform group-hover:-translate-y-1">
                <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-900 leading-none mb-1">Secure Payment</div>
                  <div className="text-[10px] text-gray-500 leading-none">Escrow Protected</div>
                </div>
              </div>
            </div>

            {/* Top Right Image */}
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80" 
                alt="Cleaning Service" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>

            {/* Bottom Right Image */}
            <div className="col-span-1 row-span-1 rounded-3xl overflow-hidden relative group">
              <img 
                src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80" 
                alt="Handyman" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Star Rating Overlay */}
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
                <span className="text-[10px] font-bold text-gray-900">5.0</span>
              </div>
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
