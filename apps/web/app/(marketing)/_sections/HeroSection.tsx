"use client";

import React from "react";
import { AppButton, Badge } from "@townlink/ui";

export function HeroSection() {
  return (
    <section className="pt-12 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
      <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-8 shadow-sm">
          <span className="mr-2">✦</span> Ghana's Trusted Service Directory
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-heavy tracking-tight leading-[1.1] mb-6">
          Find Trusted Service Providers Across Ghana
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10">
          Ghana's Local Service Network connecting clients with verified
          professionals — at home and in the diaspora.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <AppButton variant="primary" size="lg" className="w-full sm:w-auto">
            Find a Provider
          </AppButton>
          <a href="/register-provider" className="w-full sm:w-auto">
            <AppButton variant="secondary" size="lg" className="w-full">
              Become a Provider
            </AppButton>
          </a>
        </div>
        <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-10">
          {["✓ Free to list", "✓ Diaspora clients", "✓ All 16 regions", "✓ Ghana Card verified"].map((badge) => (
            <span
              key={badge}
              className="bg-brand-secondary/20 text-brand-dark border border-brand-secondary/30 text-sm font-bold px-4 py-1.5 rounded-full shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="flex-1 w-full max-w-lg lg:max-w-none relative z-10">
        <div className="absolute inset-0 bg-brand-secondary rounded-[40px] transform rotate-3 opacity-20"></div>
        <div className="bg-bg-light rounded-[40px] aspect-square relative overflow-hidden shadow-2xl border-4 border-white group">
          {/* Unsplash image of a professional at work */}
          <img 
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80" 
            alt="TownLink Professional" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Ghana Flag Gradient Wave overlay */}
          <div className="absolute top-[50%] left-0 right-0 w-full h-16 pointer-events-none">
             <svg viewBox="0 0 1000 100" className="w-full h-full opacity-85" preserveAspectRatio="none">
               <defs>
                 <linearGradient id="ghana-wave" x1="0%" y1="0%" x2="100%" y2="0%">
                   <stop offset="0%" stopColor="#CE1126" />   {/* Ghana Red */}
                   <stop offset="50%" stopColor="#FCD116" />  {/* Ghana Gold */}
                   <stop offset="100%" stopColor="#006B3F" /> {/* Ghana Green */}
                 </linearGradient>
               </defs>
               <path d="M0,50 C300,120 700,-20 1000,50 L1000,100 C700,30 300,170 0,100 Z" fill="url(#ghana-wave)" />
             </svg>
          </div>
        </div>

        {/* Compact Floating Verified Badge - Breaks out of the frame */}
        <div className="absolute -bottom-6 -left-4 sm:-left-10 bg-white/95 backdrop-blur-md py-4 px-6 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] flex items-center gap-4 border border-border-light transition-transform duration-500 hover:-translate-y-2 z-20">
           <div className="w-12 h-12 bg-brand-primary rounded-full flex items-center justify-center shrink-0 shadow-inner">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                 <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
           </div>
           <div>
             <h4 className="font-extrabold text-lg text-brand-dark leading-tight mb-0.5">TownLink Services</h4>
             <p className="text-xs font-bold text-brand-primary tracking-wider uppercase">100% Verified Pros</p>
           </div>
        </div>
      </div>
    </section>
  );
}
