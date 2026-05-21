import React from 'react';

export type ProviderData = {
  id: string;
  name: string;
  business?: string;
  verified: boolean;
  availability: string;
  diaspora: boolean;
  category: string;
  region: string;
  city: string;
  services: string;
  minPrice?: string;
  maxPrice?: string;
  priceUnit?: string;
};

export function ProviderCard({ provider }: { provider: ProviderData }) {
  const p = provider;
  const initials = (p.name || 'P').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const isAvailable = p.availability === 'Available';
  const isBusy = p.availability === 'Busy';
  const priceText = p.minPrice ? `GHS ${p.minPrice}${p.maxPrice ? '–' + p.maxPrice : '+'} ${p.priceUnit || ''}` : '';
  const servicesList = (p.services || '').split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 50).slice(0, 3).join(', ');
  const waMsg = encodeURIComponent(`Hi Nana 👋 I'm interested in ${p.name}${p.business ? ' (' + p.business + ')' : ''} from TownLink Services. Can you help me book them?`);
  
  return (
    <div className="bg-white border border-border-light rounded-3xl overflow-hidden shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">
      
      {/* Top Banner (Soft Abstract Gradient) */}
      <div className="h-24 w-full bg-gradient-to-tr from-brand-primary/10 via-brand-secondary/20 to-brand-primary/20 relative">
        {p.verified && (
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur shadow-sm rounded-full px-3 py-1.5 text-[10px] font-extrabold text-brand-dark flex items-center gap-1.5">
            <span className="w-3.5 h-3.5 rounded-full bg-[#1EA84B] flex items-center justify-center text-[8px] text-white">✓</span>
            VERIFIED
          </div>
        )}
      </div>

      <div className="p-6 pt-0 flex-1 flex flex-col relative">
        {/* Floating Avatar */}
        <div className="w-16 h-16 rounded-[20px] bg-brand-dark text-white border-4 border-white shadow-md flex items-center justify-center font-serif font-bold text-xl -mt-8 mb-5 relative z-10 transition-transform duration-300 group-hover:scale-110">
          {initials}
        </div>

        <div className="mb-4">
          <h3 className="font-bold text-brand-dark text-lg leading-tight mb-1">{p.name}</h3>
          {p.business && <div className="text-xs font-medium text-text-muted">{p.business}</div>}
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mb-5">
          {p.category && <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-bg-light border border-border-light text-text-heavy">{p.category}</span>}
          {(p.city || p.region) && <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-bg-light border border-border-light text-text-muted">📍 {[p.city, p.region].filter(Boolean).join(', ')}</span>}
          {p.availability && (isAvailable || isBusy) && (
            <span className={`text-[10px] font-bold px-3 py-1 rounded-lg ${isAvailable ? 'bg-[#eaf3de] text-[#3b6d11]' : 'bg-[#faeeda] text-[#854f0b]'}`}>
              {p.availability}
            </span>
          )}
          {p.diaspora && <span className="text-[10px] font-bold px-3 py-1 rounded-lg bg-[#eeedfe] text-[#3c3489]">🌍 Diaspora</span>}
        </div>
        
        {servicesList && <div className="text-sm text-text-muted leading-relaxed line-clamp-2">{servicesList}</div>}
        
        {priceText && <div className="text-sm font-extrabold text-brand-dark mt-auto pt-6">{priceText}</div>}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-bg-light bg-bg-white/50 flex gap-3">
        <a href={`/provider/${p.id}`} className="flex-1 py-3 text-center text-sm font-bold text-brand-dark bg-white border border-border-light rounded-xl hover:border-brand-dark hover:bg-bg-light transition-colors shadow-sm">
          View Profile
        </a>
        <a href={`https://wa.me/233274870179?text=${waMsg}`} target="_blank" rel="noreferrer" className="w-14 py-3 bg-[#25d366] rounded-xl hover:bg-[#1fb855] transition-colors flex items-center justify-center shadow-sm">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        </a>
      </div>
    </div>
  );
}
