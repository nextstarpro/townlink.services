import React from 'react';

const CATEGORIES = [
  { name: 'Home Services', icon: '🏠' },
  { name: 'Health & Medical', icon: '🏥' },
  { name: 'Events & Catering', icon: '🍽️' },
  { name: 'Tech & Digital', icon: '💻' },
  { name: 'Construction & Engineering', icon: '🔧' },
  { name: 'Beauty & Personal Care', icon: '💅' },
  { name: 'Education & Training', icon: '📚' },
  { name: 'Transport & Logistics', icon: '🚗' },
  { name: 'Tailoring & Fashion', icon: '🪡' },
  { name: 'Security Services', icon: '🔒' },
];

const REGIONS = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern', 'Volta', 'Oti',
  'Bono', 'Bono East', 'Ahafo', 'Northern', 'Savannah', 'North East',
  'Upper East', 'Upper West', 'Western North'
];

type FiltersProps = {
  search: string;
  setSearch: (val: string) => void;
  category: string;
  setCategory: (val: string) => void;
  region: string;
  setRegion: (val: string) => void;
  avail: boolean;
  setAvail: (val: boolean) => void;
  verified: boolean;
  setVerified: (val: boolean) => void;
  diaspora: boolean;
  setDiaspora: (val: boolean) => void;
  resultsCount: number;
  onClear: () => void;
  className?: string;
};

export function ProviderFilters({
  search, setSearch, category, setCategory, region, setRegion,
  avail, setAvail, verified, setVerified, diaspora, setDiaspora,
  resultsCount, onClear, className = ""
}: FiltersProps) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Search</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </span>
          <input 
            type="text" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Name, service, city..."
            className="w-full pl-10 pr-4 py-3 bg-white text-brand-dark placeholder:text-text-muted border-[1.5px] border-border-light rounded-xl text-sm focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Category List */}
      <div>
        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Categories</label>
        <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-border-light">
          <button 
            onClick={() => setCategory("")}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left ${
              category === "" ? 'bg-brand-primary/10 text-brand-dark font-bold' : 'hover:bg-bg-light text-text-heavy'
            }`}
          >
            <span className="text-xl">✨</span> All Services
          </button>
          {CATEGORIES.map(c => (
            <button 
              key={c.name}
              onClick={() => setCategory(c.name)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all text-left ${
                category === c.name ? 'bg-brand-primary/10 text-brand-dark font-bold' : 'hover:bg-bg-light text-text-heavy'
              }`}
            >
              <span className="text-xl">{c.icon}</span> {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Region Dropdown */}
      <div>
        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-2">Region</label>
        <div className="relative">
          <select 
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="w-full pl-4 pr-10 py-3 bg-white text-brand-dark border-[1.5px] border-border-light rounded-xl text-sm focus:outline-none focus:border-brand-primary shadow-sm appearance-none cursor-pointer"
          >
            <option value="">All Regions</option>
            {REGIONS.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </div>
        </div>
      </div>

      {/* Quick Toggles */}
      <div>
        <label className="block text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Requirements</label>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-10 h-6 rounded-full transition-colors relative ${verified ? 'bg-brand-primary' : 'bg-border-light'}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${verified ? 'left-5' : 'left-1 shadow-sm'}`} />
            </div>
            <span className="text-sm font-medium text-text-heavy group-hover:text-brand-primary transition-colors">✅ Verified only</span>
            <input type="checkbox" checked={verified} onChange={e => setVerified(e.target.checked)} className="hidden" />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-10 h-6 rounded-full transition-colors relative ${avail ? 'bg-brand-primary' : 'bg-border-light'}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${avail ? 'left-5' : 'left-1 shadow-sm'}`} />
            </div>
            <span className="text-sm font-medium text-text-heavy group-hover:text-brand-primary transition-colors">🟢 Available now</span>
            <input type="checkbox" checked={avail} onChange={e => setAvail(e.target.checked)} className="hidden" />
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <div className={`w-10 h-6 rounded-full transition-colors relative ${diaspora ? 'bg-brand-secondary' : 'bg-border-light'}`}>
              <div className={`w-4 h-4 rounded-full bg-white absolute top-1 transition-all ${diaspora ? 'left-5' : 'left-1 shadow-sm'}`} />
            </div>
            <span className="text-sm font-medium text-text-heavy group-hover:text-[#7a5c10] transition-colors">🌍 Diaspora friendly</span>
            <input type="checkbox" checked={diaspora} onChange={e => setDiaspora(e.target.checked)} className="hidden" />
          </label>
        </div>
      </div>

      <div className="pt-6 border-t border-border-light">
        <button 
          onClick={onClear} 
          className="w-full py-3 bg-bg-light hover:bg-border-light text-text-heavy font-bold rounded-xl transition-colors text-sm"
        >
          Clear all filters
        </button>
      </div>
    </div>
  );
}
