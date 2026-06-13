"use client";

import React from "react";

import Image from "next/image";

export function LegalHeader() {
  return (
    <header className="bg-brand-dark px-6 py-4 flex items-center justify-between shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 text-white no-underline text-2xl font-bold tracking-tight">
          <div className="relative w-8 h-8 overflow-hidden rounded-full bg-white flex items-center justify-center p-0.5">
            <Image src="/icon.png" alt="TownLink" fill className="object-cover rounded-full" sizes="32px" />
          </div>
          <span>TownLink</span>
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
