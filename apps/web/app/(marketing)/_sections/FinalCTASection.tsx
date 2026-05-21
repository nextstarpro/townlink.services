"use client";

import React from "react";
import { AppButton } from "@townlink/ui";

export function FinalCTASection() {
  return (
    <section className="px-6 py-24 bg-bg-white">
      <div className="max-w-7xl mx-auto bg-[#0A363B] rounded-[32px] p-12 lg:py-24 overflow-hidden relative shadow-xl text-center flex flex-col items-center justify-center min-h-[350px]">
        
        {/* SVG Gradient Definitions */}
        <svg className="absolute w-0 h-0">
          <defs>
            <linearGradient id="cta-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />     {/* Turquoise / Blue */}
              <stop offset="50%" stopColor="#10b981" />    {/* Emerald Green */}
              <stop offset="100%" stopColor="#22c55e" />   {/* Light Green */}
            </linearGradient>
            <linearGradient id="cta-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />     {/* Light Green */}
              <stop offset="100%" stopColor="#0ea5e9" />   {/* Turquoise / Blue */}
            </linearGradient>
          </defs>
        </svg>

        {/* Left Curve (Elegant Swoop) */}
        <svg className="absolute -top-10 -left-10 w-64 md:w-96 h-[120%] pointer-events-none opacity-90" viewBox="0 0 400 600" preserveAspectRatio="xMinYMin meet">
          <path d="M-50,0 Q300,300 -50,600" fill="none" stroke="url(#cta-grad)" strokeWidth="14" strokeLinecap="round" />
        </svg>

        {/* Right Curves (Intersecting Swoops) */}
        <svg className="absolute -top-20 -right-20 w-80 md:w-[500px] h-[120%] pointer-events-none opacity-90" viewBox="0 0 500 600" preserveAspectRatio="xMaxYMin meet">
          <path d="M100,-50 C300,100 400,300 200,650" fill="none" stroke="url(#cta-grad-2)" strokeWidth="14" strokeLinecap="round" />
          <path d="M550,200 C400,300 250,500 500,700" fill="none" stroke="url(#cta-grad)" strokeWidth="14" strokeLinecap="round" />
        </svg>

        <div className="relative z-10 flex flex-col items-center w-full max-w-4xl mx-auto">
          {/* Search icon pill */}
          <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-white mb-10 tracking-tight leading-tight">
            Find top rated certified<br className="hidden md:block" /> experts in your area
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/providers">
              <AppButton variant="primary" size="lg" className="px-8 bg-[#10b981] hover:bg-[#059669] border-none text-white font-semibold">
                Find experts &rarr;
              </AppButton>
            </a>
            <a href="/register-provider">
              <AppButton variant="secondary" size="lg" className="px-8 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all bg-transparent font-semibold">
                Become a Provider
              </AppButton>
            </a>
          </div>
        </div>
        
      </div>
    </section>
  );
}
