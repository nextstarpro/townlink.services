"use client";

import React, { useState } from 'react';
import { AppButton } from "@townlink/ui";

export function AudienceTargeting() {
  const [activeTab, setActiveTab] = useState<'local' | 'diaspora' | 'provider'>('local');

  return (
    <section className="py-24 px-6 bg-white border-t border-border-light">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">Tailored for You</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">Select your profile to see how TownLink is built to solve your specific challenges.</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row justify-center gap-3 mb-16">
          <button 
            onClick={() => setActiveTab('local')}
            className={`px-8 py-4 rounded-full font-bold transition-all text-sm ${activeTab === 'local' ? 'bg-brand-dark text-white shadow-lg' : 'bg-bg-light text-text-heavy hover:bg-border-light'}`}
          >
            I am a Local Client
          </button>
          <button 
            onClick={() => setActiveTab('diaspora')}
            className={`px-8 py-4 rounded-full font-bold transition-all text-sm ${activeTab === 'diaspora' ? 'bg-[#3c3489] text-white shadow-lg' : 'bg-bg-light text-text-heavy hover:bg-border-light'}`}
          >
            I am in the Diaspora
          </button>
          <button 
            onClick={() => setActiveTab('provider')}
            className={`px-8 py-4 rounded-full font-bold transition-all text-sm ${activeTab === 'provider' ? 'bg-brand-primary text-white shadow-lg' : 'bg-bg-light text-text-heavy hover:bg-border-light'}`}
          >
            I am a Service Provider
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-bg-white rounded-[40px] p-8 md:p-16 border border-border-light shadow-[0_8px_30px_rgb(0,0,0,0.04)] min-h-[400px] flex items-center">
          
          {activeTab === 'local' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1.5 bg-brand-dark/10 text-brand-dark rounded-lg text-xs font-bold uppercase tracking-wider mb-6">For Ghana Residents</div>
                  <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">Stop guessing. Start hiring safely.</h3>
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    No more asking neighbors for unreliable artisans. We verify ID cards and track performance so you can hire safely and get jobs done fast.
                  </p>
                  <ul className="space-y-4 mb-8 text-text-heavy font-medium">
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> 100% Verified Identity</li>
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> Direct WhatsApp Booking</li>
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> Zero Middleman Fees</li>
                  </ul>
                  <a href="/providers">
                    <AppButton variant="primary" className="shadow-md hover:-translate-y-1 transition-transform">Browse Providers →</AppButton>
                  </a>
                </div>
                <div className="flex-1 w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg border border-border-light relative">
                  <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Happy local client" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Peace of mind at home</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'diaspora' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1.5 bg-[#3c3489]/10 text-[#3c3489] rounded-lg text-xs font-bold uppercase tracking-wider mb-6">For Ghanaians Abroad</div>
                  <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">Manage projects from overseas with zero stress.</h3>
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    Stop sending money to relatives who don't finish the job. Hire professionals directly, get WhatsApp video updates, and stay in control.
                  </p>
                  <ul className="space-y-4 mb-8 text-text-heavy font-medium">
                    <li className="flex items-center gap-3"><span className="text-[#3c3489]">✓</span> Vetted Project Managers available</li>
                    <li className="flex items-center gap-3"><span className="text-[#3c3489]">✓</span> Direct transparent communication</li>
                    <li className="flex items-center gap-3"><span className="text-[#3c3489]">✓</span> Pay directly for milestones</li>
                  </ul>
                  <a href="/providers?category=Tech+%26+Digital">
                    <AppButton variant="primary" className="bg-[#3c3489] text-white hover:bg-[#2d2766] shadow-md hover:-translate-y-1 transition-transform">Find Diaspora Ready Pros →</AppButton>
                  </a>
                </div>
                <div className="flex-1 w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg border border-border-light relative">
                  <img src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=800&q=80" alt="Diaspora traveler" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3c3489]/80 to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Stay connected to home</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'provider' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-block px-3 py-1.5 bg-brand-primary/10 text-brand-primary rounded-lg text-xs font-bold uppercase tracking-wider mb-6">For Service Providers</div>
                  <h3 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6">Grow your business without paying lead fees.</h3>
                  <p className="text-text-muted text-lg mb-6 leading-relaxed">
                    List your business for free, bypass the middleman, get direct WhatsApp leads, and build a review profile that attracts high-paying clients.
                  </p>
                  <ul className="space-y-4 mb-8 text-text-heavy font-medium">
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> Free to Register</li>
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> Keep 100% of your earnings</li>
                    <li className="flex items-center gap-3"><span className="text-brand-primary">✓</span> Build reputation through reviews</li>
                  </ul>
                  <a href="/register-provider">
                    <AppButton variant="primary" className="shadow-md hover:-translate-y-1 transition-transform">Register for Free →</AppButton>
                  </a>
                </div>
                <div className="flex-1 w-full h-72 md:h-96 rounded-3xl overflow-hidden shadow-lg border border-border-light relative">
                  <img src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" alt="Service Provider" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/80 to-transparent flex items-end p-6">
                    <span className="text-white font-bold text-lg">Grow your business</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
