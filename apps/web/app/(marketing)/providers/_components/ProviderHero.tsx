import React from 'react';

type Props = {
  total: number | string;
  verified: number | string;
  regions: number | string;
  diaspora: number | string;
};

export function ProviderHero({ total, verified, regions, diaspora }: Props) {
  return (
    <div className="relative pt-16 pb-16 px-6 overflow-hidden bg-gradient-to-b from-[#fdf6e8]/60 to-bg-white border-b border-border-light">
      {/* Abstract Background Shapes for airy vibe */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-brand-secondary/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest mb-6 shadow-sm">
          <span className="mr-2">✦</span> Ghana's Trusted Service Directory
        </div>
        <h1 className="font-serif text-4xl md:text-6xl text-brand-dark mb-6 tracking-tight leading-tight">
          Find Trusted <span className="text-brand-primary">Professionals</span><br className="hidden md:block"/> Across Ghana.
        </h1>
        <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-12">
          Browse, filter, and connect directly with verified service providers across all 16 regions.
        </p>

        {/* Floating Stats Bar */}
        <div className="inline-flex flex-wrap justify-center gap-6 md:gap-12 bg-white/70 backdrop-blur-md border border-white rounded-3xl px-10 py-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="text-center">
            <div className="font-serif text-3xl text-brand-dark leading-none mb-1">{total}</div>
            <div className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Providers</div>
          </div>
          <div className="w-px bg-border-light hidden md:block"></div>
          <div className="text-center">
            <div className="font-serif text-3xl text-brand-dark leading-none mb-1">{verified}</div>
            <div className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Verified</div>
          </div>
          <div className="w-px bg-border-light hidden md:block"></div>
          <div className="text-center">
            <div className="font-serif text-3xl text-brand-dark leading-none mb-1">{regions}</div>
            <div className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Regions</div>
          </div>
          <div className="w-px bg-border-light hidden md:block"></div>
          <div className="text-center">
            <div className="font-serif text-3xl text-brand-dark leading-none mb-1">{diaspora}</div>
            <div className="text-[10px] md:text-xs font-bold text-text-muted uppercase tracking-widest">Diaspora Ready</div>
          </div>
        </div>
      </div>
    </div>
  );
}
