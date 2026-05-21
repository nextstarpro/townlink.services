"use client";

import React from "react";

export function MarketingFooter() {
  return (
    <footer className="bg-bg-light pt-16 pb-8 px-6 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <div className="font-bold text-2xl tracking-tight text-text-heavy mb-4">
            TownLink
          </div>
          <p className="text-text-muted text-sm leading-relaxed mb-6">
            Ghana's Trusted Service Directory. Connecting you with verified professionals across all 16 regions.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-text-heavy mb-4">Quick Links</h4>
          <ul className="space-y-3 text-text-muted text-sm">
            <li><a href="/" className="hover:text-brand-primary transition-colors">Home</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">Contact</a></li>
            <li><a href="#" className="hover:text-brand-primary transition-colors">FAQs</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-text-heavy mb-4">Legal</h4>
          <ul className="space-y-3 text-text-muted text-sm">
            <li><a href="/terms" className="hover:text-brand-primary transition-colors">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:text-brand-primary transition-colors">Privacy Policy</a></li>
            <li><a href="/provider-agreement" className="hover:text-brand-primary transition-colors">Provider Agreement</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-text-heavy mb-4">Contact</h4>
          <ul className="space-y-3 text-text-muted text-sm">
            <li>CC674 Cedar Rapids St.</li>
            <li>Tamso Estate, Tarkwa, Ghana</li>
            <li>GDPC Reg: WgYpvWdJa8</li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 border-t border-border-light text-center text-text-caption text-sm flex flex-col sm:flex-row justify-between items-center gap-4">
        <p>© {new Date().getFullYear()} TownLink Global Limited. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://www.facebook.com/profile.php?id=61575371263075" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Facebook</a>
          <a href="https://www.instagram.com/townlink.app" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">Instagram</a>
          <a href="#" className="hover:text-brand-primary transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
