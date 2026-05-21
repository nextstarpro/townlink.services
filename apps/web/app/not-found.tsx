import React from "react";
import { AppButton } from "@townlink/ui";

export const metadata = {
  title: "Page Not Found | TownLink Services",
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 relative overflow-hidden font-sans bg-bg-white">
      
      {/* Massive 404 Watermark Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 mt-10">
        <span className="text-[35vw] md:text-[28rem] font-black text-gray-100/80 leading-none tracking-tighter">
          404
        </span>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto w-full mt-10">
        
        {/* Custom Icon: Dark Circle with Green X Box */}
        <div className="w-20 h-20 bg-[#0F2A21] rounded-full flex items-center justify-center mb-6 shadow-xl">
          <div className="w-8 h-8 bg-[#1EA84B] rounded-md shadow-sm flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="font-bold text-4xl md:text-[42px] text-[#0F2A21] mb-5 tracking-tight">
          Oops! Page not found
        </h1>
        <p className="text-[15px] text-[#6B7280] mb-10 leading-relaxed px-4 max-w-sm">
          We can't seem to find the page you're looking for. It might have been removed or doesn't exist.
        </p>
        
        {/* Action Button */}
        <a href="/">
          <AppButton variant="primary" className="bg-[#1EA84B] text-white hover:bg-[#158d3c] px-8 py-3.5 rounded-lg font-bold flex items-center gap-2 transition-colors">
            Go back home
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </AppButton>
        </a>
      </div>
      
    </div>
  );
}
