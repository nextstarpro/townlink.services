"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AppButton } from "@townlink/ui";

export function MarketingHeader() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/providers?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 bg-white ${
        isScrolled ? "shadow-sm border-b border-border-light" : "border-b border-transparent"
      }`}
    >
      {/* Top Row: Search & Actions (Hidden when scrolled, and always hidden on mobile) */}
      <div 
        className={`w-full border-b border-border-light transition-all duration-300 overflow-hidden max-[810px]:hidden ${
          isScrolled ? "h-0 opacity-0 border-none" : "h-[88px] opacity-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <div className="flex items-center gap-3 shrink-0">
            {/* Logo */}
            <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border-light">
              <Image src="/icon.png" alt="TownLink" fill className="object-cover" sizes="40px" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-text-heavy">
              TownLink
            </span>
          </div>
          
          {/* Search Bar - Center */}
          <div className="hidden lg:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="w-full flex items-center bg-bg-light/50 px-4 py-3 rounded-input border border-border-input focus-within:ring-2 focus-within:ring-brand-tertiary transition-shadow">
              <button type="submit" className="focus:outline-none flex items-center justify-center group">
                <svg className="w-5 h-5 text-text-caption mr-3 shrink-0 group-hover:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <input 
                type="text" 
                placeholder="Search for providers, cities, services..." 
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-base w-full text-text-heavy placeholder:text-text-muted" 
              />
            </form>
          </div>

          {/* Actions - Right */}
          <div className="flex items-center gap-4 shrink-0">
             <a href="/providers">
               <AppButton variant="primary" className="bg-brand-primary text-white hover:bg-[#28A652]">Browse Providers</AppButton>
             </a>
             <a href="/register-provider">
               <AppButton variant="secondary" className="hidden sm:inline-flex">Provider Portal</AppButton>
             </a>
          </div>
        </div>
      </div>

      {/* Bottom Row: Navigation (Always visible, but layout shifts slightly) */}
      <div className={`w-full transition-all duration-300 bg-white ${isScrolled ? "py-4" : "py-3"}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* When scrolled, show logo here on desktop, and always show logo on mobile */}
          <div className={`items-center gap-3 shrink-0 min-[811px]:mr-8 ${!isScrolled ? "hidden max-[810px]:flex" : "flex"}`}>
             <div className="relative w-8 h-8 overflow-hidden rounded-full border border-border-light">
                <Image src="/icon.png" alt="TownLink" fill className="object-cover" sizes="32px" />
             </div>
             <span className="font-bold text-xl tracking-tight text-text-heavy">
               TownLink
             </span>
          </div>

          {/* Nav Links */}
          <nav className="hidden min-[811px]:flex items-center gap-8 font-semibold text-text-heavy">
            <a href="/" className="hover:text-brand-primary transition-colors">Home</a>
            <a href="/about" className="hover:text-brand-primary transition-colors">About</a>
            <a href="/#how-it-works" className="hover:text-brand-primary transition-colors">How it works</a>
            <a href="/blog" className="hover:text-brand-primary transition-colors">Blog</a>
            <a href="/#faq" className="hover:text-brand-primary transition-colors">FAQ</a>
          </nav>
          
          {/* Right Side: Social Icons or CTA */}
          <div className="hidden min-[811px]:flex items-center ml-auto">
            {!isScrolled ? (
              <div className="flex items-center gap-5 text-text-heavy transition-opacity duration-300">
                <a href="https://www.facebook.com/profile.php?id=61575371263075" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href="https://www.instagram.com/townlink.app" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
                <a href="https://www.linkedin.com/company/townlink-app/" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-right-4 duration-300">
                <a href="/providers">
                  <AppButton variant="primary" className="bg-brand-primary text-white hover:bg-[#28A652]">Browse Providers</AppButton>
                </a>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="min-[811px]:hidden p-2 text-text-heavy ml-auto focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`min-[811px]:hidden absolute top-full left-0 w-full bg-white border-b border-border-light shadow-lg transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0 border-none"
        }`}
      >
        <div className="px-6 py-4 flex flex-col gap-4">
          <nav className="flex flex-col gap-4 font-semibold text-text-heavy text-lg">
            <a href="/" className="hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Home</a>
            <a href="/about" className="hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="/#how-it-works" className="hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>How it works</a>
            <a href="/blog" className="hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>Blog</a>
            <a href="/#faq" className="hover:text-brand-primary transition-colors" onClick={() => setIsMobileMenuOpen(false)}>FAQ</a>
          </nav>
          <div className="h-px bg-border-light my-2"></div>
          <div className="flex flex-col gap-3 pb-2">
             <a href="/register-provider" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
               <AppButton variant="secondary" className="w-full">Provider Portal</AppButton>
             </a>
             <a href="/providers" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
               <AppButton variant="primary" className="w-full bg-brand-primary text-white hover:bg-[#28A652]">Browse Providers</AppButton>
             </a>
          </div>
        </div>
      </div>
    </header>
  );
}
