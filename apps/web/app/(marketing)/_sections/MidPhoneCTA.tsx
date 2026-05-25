"use client";

import React from "react";
import { SectionHeading, AppButton } from "@townlink/ui";

export function MidPhoneCTA() {
  return (
    <section className="px-6 py-16 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto bg-[#0A363B] rounded-[40px] relative overflow-hidden flex flex-col-reverse lg:flex-row items-center pt-16 lg:pt-0">
        
        {/* Background Swoops */}
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-80" preserveAspectRatio="none">
          <path d="M-100,300 C200,400 400,100 600,0" fill="none" stroke="#25D366" strokeWidth="8" strokeLinecap="round" />
          <path d="M400,600 C600,400 800,200 1200,300" fill="none" stroke="#25D366" strokeWidth="8" strokeLinecap="round" />
        </svg>

        {/* Left Side: Phone Mockup */}
        <div className="flex-1 w-full flex justify-center lg:justify-start lg:pl-20 mt-16 lg:mt-0 relative z-10">
          
          <div className="relative w-[300px] h-[550px] border-[14px] border-[#161616] rounded-[48px] bg-white shadow-2xl overflow-hidden translate-y-12">
            
            {/* Dynamic Island & Status Bar */}
            <div className="absolute top-0 w-full h-7 flex justify-between items-center px-5 pt-2 z-20">
              <span className="text-[10px] font-semibold text-black">9:41</span>
              <div className="w-[85px] h-5 bg-black rounded-full absolute left-1/2 -translate-x-1/2"></div>
              <div className="flex gap-1.5 items-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="black"><path d="M12 21L23.6 7.1C23.1 6.6 18.6 3 12 3C5.4 3 0.9 6.6 0.4 7.1L12 21Z"/></svg>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="black"><path d="M22 6H2V18H22V6ZM2 4C0.9 4 0 4.9 0 6V18C0 19.1 0.9 20 2 20H22C23.1 20 24 19.1 24 18V6C24 4.9 23.1 4 22 4H2Z"/></svg>
              </div>
            </div>

            {/* Phone Content */}
            <div className="pt-12 px-5 bg-white h-full flex flex-col relative z-0">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <div className="w-8 h-8 rounded-full bg-[#10b981] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M12 5v14M5 12h14"/></svg>
                </div>
                <div className="flex-1 mx-3">
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1.5 w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                    <input type="text" placeholder="Search for..." className="w-full bg-gray-50 rounded-full py-1.5 pl-8 pr-3 text-[10px] outline-none" />
                  </div>
                </div>
              </div>

              {/* Welcome */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight">Welcome</h3>
                  <p className="text-gray-500 text-xs">Andy Smith</p>
                </div>
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80" className="w-10 h-10 rounded-full bg-gray-200 object-cover" alt="User" />
              </div>

              {/* Top experts */}
              <h4 className="font-bold text-gray-900 text-sm mb-4">Top experts</h4>
              
              <div className="space-y-4">
                {/* Expert 1 */}
                <div className="flex gap-3 items-center pb-4 border-b border-gray-100">
                  <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&q=80" className="w-10 h-10 rounded-full bg-gray-200 object-cover shrink-0" alt="Pro" />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 text-xs">Graham Hills</h5>
                    <p className="text-gray-400 text-[9px] mb-1">Top-rated professional with 10+ years experience.</p>
                    <div className="flex gap-2">
                      <span className="text-[9px] text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded font-medium">✓ Landscaper</span>
                      <span className="text-[9px] text-gray-500">$140/h</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>

                {/* Expert 2 */}
                <div className="flex gap-3 items-center pb-4 border-b border-gray-100">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" className="w-10 h-10 rounded-full bg-gray-200 object-cover shrink-0" alt="Pro" />
                  <div className="flex-1">
                    <h5 className="font-bold text-gray-900 text-xs">Sandy Houston</h5>
                    <p className="text-gray-400 text-[9px] mb-1">Certified master electrician for all properties.</p>
                    <div className="flex gap-2">
                      <span className="text-[9px] text-[#10b981] bg-[#10b981]/10 px-1.5 py-0.5 rounded font-medium">✓ Electrician</span>
                      <span className="text-[9px] text-gray-500">$120/h</span>
                    </div>
                  </div>
                  <div className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center shrink-0">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </div>
                </div>
              </div>
            </div>
            
          </div>

          {/* Floating Card Overlay */}
          <div className="absolute top-48 -left-6 lg:-left-20 w-[260px] lg:w-[320px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.25)] p-3 flex gap-3 z-30 transform hover:scale-105 transition-transform duration-300">
            <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=200&q=80" className="w-20 lg:w-28 h-20 lg:h-24 rounded-xl object-cover shrink-0" alt="Electrical" />
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 rounded-md bg-[#10b981] flex items-center justify-center shrink-0">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
                </div>
                <h4 className="font-bold text-gray-900 text-xs lg:text-sm">Electrical service</h4>
              </div>
              <p className="text-gray-400 text-[9px] lg:text-[10px] leading-tight mb-2">Verified electrical contractors ready for booking.</p>
              <a href="/providers" className="text-[9px] lg:text-[10px] text-gray-900 font-bold hover:text-[#10b981] transition-colors flex items-center gap-1">
                Browse experts <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>

        </div>

        {/* Right Side: Text Content */}
        <div className="flex-1 p-8 lg:p-20 text-center lg:text-left relative z-10 flex flex-col items-center lg:items-start">
          <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight leading-tight max-w-lg">
            Manage services from your pocket
          </h2>
          
          <p className="text-[#9ca3af] text-sm md:text-base leading-relaxed mb-10 max-w-md">
            Download the TownLink app to message providers, track progress, and manage your bookings from anywhere in the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <a href="#" className="w-full sm:w-auto">
              <AppButton variant="primary" size="lg" className="w-full px-8 bg-[#10b981] hover:bg-[#059669] border-none text-white font-semibold">
                Download for iOS
              </AppButton>
            </a>
            <a href="#" className="w-full sm:w-auto">
              <AppButton variant="secondary" size="lg" className="w-full px-8 border-white/30 text-white hover:bg-white/10 hover:border-white transition-all bg-transparent font-semibold">
                Download for Android
              </AppButton>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
