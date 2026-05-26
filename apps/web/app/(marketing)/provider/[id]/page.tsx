"use client";

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AppButton } from "@townlink/ui";

type ProviderProfileData = {
  'Provider Name'?: string;
  'Business Name'?: string;
  'Service Category'?: string;
  'Region'?: string;
  'City / Town'?: string;
  'Years of Experience'?: string;
  'Min Price (GHS)'?: number;
  'Max Price (GHS)'?: number;
  'Price Unit'?: string;
  'Availability'?: string;
  'Verified'?: boolean;
  'Serves Diaspora Clients'?: boolean;
  'Specific Services'?: string;
  'Date Registered'?: string;
  'Status'?: string;
};

export default function ProviderProfilePage() {
  const params = useParams();
  const recordId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [profile, setProfile] = useState<ProviderProfileData | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!recordId) {
      setError(true);
      setIsLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/.netlify/functions/get-provider?id=${recordId}`);
        const data = await res.json();
        
        if (!data.success || !data.provider) {
          setError(true);
          setIsLoading(false);
          return;
        }

        const status = data.provider.Status || 'Active';
        if (status === 'Pending') {
          setIsPending(true);
        } else {
          setProfile(data.provider);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [recordId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="w-12 h-12 border-4 border-border-light border-t-brand-primary rounded-full animate-spin mb-4"></div>
        <p className="text-text-muted font-medium">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="font-serif text-3xl text-brand-dark mb-2">Profile not found</h2>
        <p className="text-text-muted mb-6 text-center">This provider profile doesn't exist or may have been removed.</p>
        <a href="/providers" className="text-brand-primary font-bold hover:underline">← Back to TownLink Services</a>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="min-h-screen bg-bg-white flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-white border-2 border-border-light rounded-[24px] p-8 max-w-md w-full text-center shadow-lg">
          <div className="text-5xl mb-4">⏳</div>
          <h2 className="font-serif text-2xl text-brand-dark mb-3">Provider being verified</h2>
          <p className="text-text-muted mb-6 leading-relaxed">
            We're reviewing this provider's details to ensure quality. You can still request them through our WhatsApp — just chat with us and we'll help coordinate.
          </p>
          <a 
            href="https://wa.me/233274870179?text=Hi%20👋%20I'm%20interested%20in%20booking%20this%20service%20provider.%20Can%20you%20help%20me%20connect%20with%20them?"
            target="_blank" rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-white px-6 py-4 rounded-xl font-bold hover:bg-[#1fb855] transition-colors mb-4 shadow-md"
          >
            💬 Request via WhatsApp
          </a>
          <p className="text-xs text-text-muted mb-6">Chat with us and we'll get you connected.</p>
          <a href="/providers" className="text-brand-primary font-bold hover:underline text-sm">← Back to TownLink Services</a>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const providerName = profile['Provider Name'] || 'Provider';
  const businessName = profile['Business Name'] || '';
  const initials = providerName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const isVerified = profile['Verified'];
  const category = profile['Service Category'] || '';
  const region = profile['Region'] || '';
  const city = profile['City / Town'] || '';
  const experience = profile['Years of Experience'];
  const minPrice = profile['Min Price (GHS)'];
  const maxPrice = profile['Max Price (GHS)'];
  const priceUnit = profile['Price Unit'] || '';
  const availability = profile['Availability'] || '';
  const diaspora = profile['Serves Diaspora Clients'];
  const specificServices = profile['Specific Services'] || '';
  const dateJoined = profile['Date Registered'];

  const servicesLines = specificServices.split('\n\n');
  const serviceNames = servicesLines[0] ? servicesLines[0].split(/[,\n]/).map(s => s.trim()).filter(s => s.length > 2 && s.length < 60) : [];
  const description = servicesLines.length > 1 ? servicesLines.slice(1).join('\n\n') : (serviceNames.length === 0 ? specificServices : '');

  const waMsg = encodeURIComponent(`Hi Nana 👋 I'm interested in ${providerName}${businessName ? ' (' + businessName + ')' : ''} from TownLink Services. Can you help me book them?`);
  
  // Use the canonical production URL for sharing, preventing localhost or staging URLs from being shared
  const currentUrl = `https://townlink.app/provider/${recordId}`;

  const shareWa = () => {
    const msg = encodeURIComponent(`Check out ${providerName} on TownLink Services 🇬🇭\n\n${currentUrl}`);
    window.open(`https://wa.me/?text=${msg}`, '_blank');
  };

  const copyProfile = () => {
    navigator.clipboard.writeText(currentUrl).then(() => {
      setToastMessage('✅ Link copied!');
      setTimeout(() => setToastMessage(""), 2500);
    });
  };

  return (
    <div className="bg-bg-white min-h-screen pb-20 pt-8 px-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Back Link */}
        <div className="mb-6">
          <a href="/providers" className="text-brand-primary font-bold hover:underline inline-flex items-center gap-1">
            <span>←</span> Back to Directory
          </a>
        </div>

        {/* Hero Card */}
        <div className="bg-brand-dark rounded-t-[24px] rounded-b-[24px] p-8 mb-4 relative overflow-hidden shadow-lg">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-primary/20 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-white/5 blur-xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
            <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-white/30 flex items-center justify-center font-serif text-3xl font-bold text-white shrink-0 shadow-inner">
              {initials}
            </div>
            <div>
              <h1 className="font-serif text-3xl md:text-4xl text-white mb-1 drop-shadow-sm">{providerName}</h1>
              {businessName && <p className="text-white/80 font-medium mb-3">{businessName}</p>}
              
              <div className="flex flex-wrap gap-2 mt-3">
                {isVerified && <span className="bg-brand-primary text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm"><span className="w-3 h-3 bg-white text-brand-primary rounded-full flex items-center justify-center text-[8px]">✓</span> Verified</span>}
                {category && <span className="bg-white/15 border border-white/20 text-white/90 text-xs font-bold px-3 py-1.5 rounded-full">{category}</span>}
                {region && <span className="bg-white/10 border border-white/15 text-white/80 text-xs font-bold px-3 py-1.5 rounded-full">📍 {[city, region].filter(Boolean).join(', ')}</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {experience && (
            <div className="bg-white border border-border-light rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Experience</span>
              <span className="font-medium text-brand-dark">{experience} years</span>
            </div>
          )}
          {availability && (
            <div className="bg-white border border-border-light rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Availability</span>
              <span className="font-medium text-brand-dark flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${availability === 'Available' ? 'bg-[#30CB65]' : availability === 'Busy' ? 'bg-yellow-500' : 'bg-gray-400'}`}></span>
                {availability}
              </span>
            </div>
          )}
          {(minPrice || maxPrice) && (
            <div className="bg-white border border-border-light rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Price Range</span>
              <span className="font-medium text-brand-dark">GHS {minPrice || '—'} – {maxPrice || '—'}{priceUnit ? ` ${priceUnit}` : ''}</span>
            </div>
          )}
          {dateJoined && (
            <div className="bg-white border border-border-light rounded-2xl p-4 shadow-sm flex flex-col justify-center">
              <span className="text-[10px] uppercase tracking-wider text-text-muted font-bold mb-1">Member Since</span>
              <span className="font-medium text-brand-dark">{new Date(dateJoined).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}</span>
            </div>
          )}
        </div>

        {/* Services */}
        {serviceNames.length > 0 && (
          <div className="bg-white border border-border-light rounded-[24px] p-6 mb-4 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-bold mb-4">Services Offered</h3>
            <div className="flex flex-wrap gap-2">
              {serviceNames.map((s, i) => (
                <span key={i} className="bg-brand-light text-brand-dark border border-brand-primary/20 px-3 py-1.5 rounded-full text-sm font-medium">{s}</span>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        {description.trim() && (
          <div className="bg-white border border-border-light rounded-[24px] p-6 mb-4 shadow-sm">
            <h3 className="text-xs uppercase tracking-wider text-text-muted font-bold mb-4">About Provider</h3>
            <div className="text-brand-dark/80 text-sm md:text-base leading-relaxed whitespace-pre-line">
              {description.trim()}
            </div>
          </div>
        )}

        {/* Diaspora Banner */}
        {diaspora && (
          <div className="bg-[#fdf6e8] border border-[#e8c87a] rounded-[24px] p-5 mb-4 flex items-start gap-4 shadow-sm">
            <div className="text-2xl mt-0.5">🌍</div>
            <div>
              <strong className="block text-[#7a5c10] mb-1 font-bold">Diaspora Ready</strong>
              <p className="text-[#7a5c10]/80 text-sm leading-relaxed">This provider serves diaspora clients and can coordinate projects remotely.</p>
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-brand-dark to-[#2a7a50] rounded-[24px] p-8 mb-4 text-center shadow-md text-white">
          <h3 className="font-serif text-2xl mb-2 drop-shadow-sm">Need this service?</h3>
          <p className="text-white/80 text-sm md:text-base mb-6 max-w-md mx-auto">Chat with our assistant Nana and get connected with this provider.</p>
          <a 
            href={`https://wa.me/233274870179?text=${waMsg}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-[#1fb855] transition-colors shadow-lg hover:-translate-y-0.5 transform duration-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Request via WhatsApp
          </a>
        </div>

        {/* Share Card */}
        <div className="bg-white border border-border-light rounded-[24px] p-6 shadow-sm">
          <h3 className="text-xs uppercase tracking-wider text-text-muted font-bold mb-4">Share this profile</h3>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <button onClick={shareWa} className="flex-1 bg-[#25d366] hover:bg-[#1fb855] text-white py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share on WhatsApp
            </button>
            <button onClick={copyProfile} className="flex-1 bg-brand-dark hover:bg-[#2a7a50] text-white py-3 px-4 rounded-xl font-bold transition-colors flex items-center justify-center gap-2">
              📋 Copy Link
            </button>
          </div>
          <div className="flex items-center gap-3 bg-bg-light border border-border-light rounded-xl p-3">
            <span className="flex-1 text-sm text-text-muted truncate overflow-hidden">{currentUrl}</span>
            <button onClick={copyProfile} className="bg-white border border-border-light text-brand-dark px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-bg-white transition-colors">
              Copy
            </button>
          </div>
        </div>

      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-6 py-3 rounded-xl font-medium shadow-xl transition-all duration-300 z-50 flex items-center gap-2 ${toastMessage ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}`}>
        {toastMessage}
      </div>
    </div>
  );
}
