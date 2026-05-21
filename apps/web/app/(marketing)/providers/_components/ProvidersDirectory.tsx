"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { ProviderHero } from './ProviderHero';
import { ProviderFilters } from './ProviderFilters';
import { ProviderCard, ProviderData } from './ProviderCard';
import { AppButton } from "@townlink/ui";

export function ProvidersDirectory() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';

  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [region, setRegion] = useState('');
  const [avail, setAvail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [diaspora, setDiaspora] = useState(false);
  
  const [displayedCount, setDisplayedCount] = useState(9); // Default to 9 for 3x3 grid
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);

  // Sync with URL search params when they change (e.g., searching from top nav while already on this page)
  useEffect(() => {
    const q = searchParams.get('q');
    const c = searchParams.get('category');
    if (q !== null && q !== search) {
      setSearch(q);
    }
    if (c !== null && c !== category) {
      setCategory(c);
    }
  }, [searchParams]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/.netlify/functions/get-providers');
        const data = await res.json();
        if (data.success && data.providers) {
          setProviders(data.providers);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const clearFilters = () => {
    setSearch(''); setCategory(''); setRegion('');
    setAvail(false); setVerified(false); setDiaspora(false);
    setDisplayedCount(9);
  };

  const filteredProviders = useMemo(() => {
    const s = search.toLowerCase().trim();
    const result = providers.filter(p => {
      if (verified && !p.verified) return false;
      if (avail && p.availability !== 'Available') return false;
      if (diaspora && !p.diaspora) return false;
      if (category && p.category !== category) return false;
      if (region && p.region !== region) return false;
      if (s) {
        const hay = `${p.name} ${p.business} ${p.category} ${p.region} ${p.city} ${p.services}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      const sa = (a.verified ? 2 : 0) + (a.availability === 'Available' ? 1 : 0);
      const sb = (b.verified ? 2 : 0) + (b.availability === 'Available' ? 1 : 0);
      return sb - sa;
    });
    
    return result;
  }, [providers, search, category, region, avail, verified, diaspora]);

  useEffect(() => {
    setDisplayedCount(9);
  }, [search, category, region, avail, verified, diaspora]);

  const stats = useMemo(() => ({
    total: providers.length || '—',
    verified: providers.filter(p => p.verified).length || '—',
    regions: 16,
    diaspora: providers.filter(p => p.diaspora).length || '—'
  }), [providers]);

  return (
    <div className="bg-bg-white min-h-screen pb-32">
      <ProviderHero 
        total={stats.total} 
        verified={stats.verified} 
        regions={stats.regions} 
        diaspora={stats.diaspora} 
      />

      <div className="max-w-7xl mx-auto px-6 mt-12 flex flex-col lg:flex-row gap-10 relative">
        
        {/* Desktop Sidebar (Sticky) */}
        <aside className="hidden lg:block w-[320px] shrink-0 relative">
          <div className="sticky top-28 bg-white p-6 rounded-3xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-border-light">
            <ProviderFilters 
              search={search} setSearch={setSearch}
              category={category} setCategory={setCategory}
              region={region} setRegion={setRegion}
              avail={avail} setAvail={setAvail}
              verified={verified} setVerified={setVerified}
              diaspora={diaspora} setDiaspora={setDiaspora}
              resultsCount={filteredProviders.length}
              onClear={clearFilters}
            />
          </div>
        </aside>

        {/* Main Content (Grid) */}
        <div className="flex-1 min-w-0">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-brand-dark">
              {filteredProviders.length} Result{filteredProviders.length !== 1 ? 's' : ''}
            </h2>
          </div>

          {isLoading ? (
            <div className="text-center py-32 bg-white/50 rounded-3xl border border-white">
              <div className="w-12 h-12 border-4 border-border-light border-t-brand-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-text-muted text-sm font-medium">Discovering providers...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 bg-white border border-red-200 rounded-3xl shadow-sm">
              <p className="text-red-500 text-sm font-medium">Could not load providers. Please refresh.</p>
            </div>
          ) : filteredProviders.length === 0 ? (
            <div className="text-center py-24 bg-white border border-border-light rounded-3xl shadow-sm">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="font-serif text-2xl text-brand-dark mb-3">No match found</h3>
              <p className="text-base text-text-muted max-w-md mx-auto mb-8">We couldn't find anyone matching those exact filters. Try adjusting your search or WhatsApp us directly.</p>
              <a href="https://wa.me/233274870179" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25d366] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1fb855] transition-colors shadow-lg hover:shadow-xl">
                 WhatsApp Us
              </a>
            </div>
          ) : (
            <>
              {/* 3x3 Grid Layout on Desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProviders.slice(0, displayedCount).map(p => (
                  <ProviderCard key={p.id} provider={p} />
                ))}
              </div>
              {displayedCount < filteredProviders.length && (
                <div className="text-center mt-12">
                  <button 
                    onClick={() => setDisplayedCount(prev => prev + 9)}
                    className="px-10 py-4 bg-white border-[1.5px] border-brand-dark text-brand-dark font-bold rounded-full hover:bg-brand-dark hover:text-white transition-all text-sm shadow-sm"
                  >
                    Load more providers
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Floating Filters Button */}
      <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 z-40">
        <button 
          onClick={() => setIsMobileModalOpen(true)}
          className="bg-brand-dark text-white px-8 py-3.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.2)] font-bold flex items-center gap-3 hover:-translate-y-1 transition-transform border border-brand-dark/20"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
          Filters & Search
          {filteredProviders.length > 0 && <span className="bg-brand-primary text-white text-[10px] px-2 py-0.5 rounded-full ml-1">{filteredProviders.length}</span>}
        </button>
      </div>

      {/* Mobile Bottom Sheet Modal */}
      <div className={`lg:hidden fixed inset-0 z-50 transition-all duration-300 ${isMobileModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-brand-dark/50 backdrop-blur-sm" onClick={() => setIsMobileModalOpen(false)}></div>
        <div className={`absolute bottom-0 left-0 w-full bg-bg-white rounded-t-[32px] shadow-2xl transition-transform duration-300 transform ${isMobileModalOpen ? 'translate-y-0' : 'translate-y-full'}`} style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}>
          
          <div className="p-6 border-b border-border-light flex items-center justify-between shrink-0 bg-white rounded-t-[32px]">
            <h3 className="font-serif text-2xl text-brand-dark">Filters</h3>
            <button onClick={() => setIsMobileModalOpen(false)} className="w-10 h-10 bg-bg-light rounded-full flex items-center justify-center text-text-heavy hover:bg-border-light transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto flex-1">
            <ProviderFilters 
              search={search} setSearch={setSearch}
              category={category} setCategory={setCategory}
              region={region} setRegion={setRegion}
              avail={avail} setAvail={setAvail}
              verified={verified} setVerified={setVerified}
              diaspora={diaspora} setDiaspora={setDiaspora}
              resultsCount={filteredProviders.length}
              onClear={clearFilters}
            />
          </div>
          
          <div className="p-6 border-t border-border-light bg-white shrink-0">
            <AppButton variant="primary" className="w-full shadow-lg py-4 text-lg" onClick={() => setIsMobileModalOpen(false)}>
              Show {filteredProviders.length} Results
            </AppButton>
          </div>
        </div>
      </div>
    </div>
  );
}
