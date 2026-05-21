"use client";

import React from "react";

export function LegalHeader() {
  return (
    <header className="bg-brand-dark px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 text-white no-underline font-serif text-xl font-bold">
          {/* SVG logo icon matching the one in the HTML */}
          <div className="w-7 h-7 bg-white rounded-md flex items-center justify-center shrink-0">
             <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-brand-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
             </svg>
          </div>
          <span>TownLink <span className="text-[#c9902a]">Services</span></span>
        </a>
        
        <a href="/" className="text-white/80 hover:text-white text-sm font-medium transition-colors flex items-center gap-2">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </a>
      </div>
    </header>
  );
}
