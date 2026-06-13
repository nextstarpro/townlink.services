"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer className="bg-brand-dark pt-20 pb-10 px-6 mt-20 relative overflow-hidden">
      {/* Decorative background element */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-10"
        style={{
          background: "radial-gradient(circle, rgba(48,203,184,0.4) 0%, transparent 70%)"
        }}
      />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 lg:gap-16 mb-16 relative z-10">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 font-bold text-3xl tracking-tight text-white mb-6">
            <div className="relative w-10 h-10 overflow-hidden rounded-full bg-white flex items-center justify-center">
              <Image src="/icon.png" alt="TownLink" fill className="object-cover rounded-full" sizes="40px" />
            </div>
            TownLink
          </div>
          <p className="text-bg-light/70 text-base leading-relaxed mb-8 max-w-sm">
            Ghana's Trusted Service Directory. Connecting you with verified professionals across all 16 regions.
          </p>
          
          {/* App Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Play Store */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.townLink.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-xl transition-all duration-300 hover:border-brand-primary/50 group"
            >
              <svg className="w-7 h-7 text-white group-hover:text-brand-primary transition-colors" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.76 22L3.6 2.44A1.26 1.26 0 015.42 1.4l14.88 9.5a1.26 1.26 0 01-.06 2.18l-15 9.5a1.26 1.26 0 01-1.48-.58z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-white/60 uppercase font-medium leading-none mb-1">Get it on</div>
                <div className="text-sm text-white font-bold leading-none tracking-wide">Google Play</div>
              </div>
            </a>
            
            {/* App Store */}
            <a 
              href="https://townlinkmobile.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 border border-white/10 px-5 py-3 rounded-xl transition-all duration-300 hover:border-white/30 group"
            >
              <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.09 2.31-.86 3.46-.8 2.14.03 3.68 1.12 4.64 2.65-3.85 2.15-3.13 7.31.54 8.68-1.02 2.64-2.82 5.09-3.72 6.64zm-3.41-15.01c.71-1.07 1.11-2.43.91-3.75-1.12.11-2.58.83-3.41 1.83-.69.83-1.18 2.18-.94 3.46 1.25.13 2.67-.53 3.44-1.54z"/>
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-white/60 uppercase font-medium leading-none mb-1">Download For</div>
                <div className="text-sm text-white font-bold leading-none tracking-wide">IOS Device</div>
              </div>
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Platform</h4>
          <ul className="space-y-4 text-bg-light/70 text-[15px]">
            <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/providers" className="hover:text-white transition-colors">Find a Provider</Link></li>
            <li><Link href="/register-provider" className="hover:text-white transition-colors">Become a Provider</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Support</h4>
          <ul className="space-y-4 text-bg-light/70 text-[15px]">
            <li><Link href="/#faq" className="hover:text-white transition-colors">Client FAQs</Link></li>
            <li><Link href="/provider-faq" className="hover:text-white transition-colors">Provider FAQs</Link></li>
            <li><a href="tel:+233274870179" className="hover:text-white transition-colors">+233 27 487 0179</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-6 text-lg">Legal</h4>
          <ul className="space-y-4 text-bg-light/70 text-[15px]">
            <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/provider-agreement" className="hover:text-white transition-colors">Provider Agreement</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
        <p className="text-white/50 text-sm">
          © {new Date().getFullYear()} TownLink Global Limited. All rights reserved. GDPC Reg: WgYpvWdJa8
        </p>
        <div className="flex gap-3">
          <a href="https://www.facebook.com/profile.php?id=61575371263075" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-brand-primary hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
          </a>
          <a href="https://www.instagram.com/townlink.app" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-brand-primary hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
          </a>
          <a href="https://www.linkedin.com/company/townlink-app/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/80 hover:bg-brand-primary hover:text-white transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
