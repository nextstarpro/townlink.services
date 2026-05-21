import React from 'react';

export function HowItWorksHero() {
  return (
    <section className="relative pt-24 pb-20 px-6 overflow-hidden bg-brand-dark text-white border-b border-border-light">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-primary/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-brand-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <span className="mr-2">✦</span> The TownLink Process
        </div>
        <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tight leading-tight">
          Simple. Secure. <br className="hidden md:block"/> Built for <span className="text-brand-primary">Ghana</span>.
        </h1>
        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
          Whether you are a local resident, living abroad, or a professional looking to grow your business, TownLink connects you seamlessly.
        </p>
      </div>
    </section>
  );
}
