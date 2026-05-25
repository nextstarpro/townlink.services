"use client";

import { useState, useEffect, useMemo } from "react";
import { SERVICE_CATEGORIES } from "@townlink/core";
import { MobileProviderCard, type ProviderData } from "./_components/MobileProviderCard";
import { CategoryPills } from "./_components/CategoryPills";
import { FilterSheet } from "./_components/FilterSheet";
import { Search, SlidersHorizontal, MessageCircle } from "lucide-react";

const WA_NUMBER = "233274870179";
const WA_MSG = encodeURIComponent(
  "Hi TownLink! 👋 I need help finding a service provider."
);

export default function BrowseProviders() {
  const [providers, setProviders] = useState<ProviderData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [region, setRegion] = useState("");
  const [avail, setAvail] = useState(false);
  const [verified, setVerified] = useState(false);
  const [diaspora, setDiaspora] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [displayedCount, setDisplayedCount] = useState(10);
  const [userProfile, setUserProfile] = useState<any>(null);

  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("tl_auth_token");
      if (token) {
        try {
          const stored = localStorage.getItem("tl_auth_record");
          if (stored) setUserProfile(JSON.parse(stored));
          else setUserProfile(null);
        } catch { setUserProfile(null); }
      } else {
        setUserProfile(null);
      }
    };
    loadUser();
    window.addEventListener("tl_profile_updated", loadUser);
    return () => window.removeEventListener("tl_profile_updated", loadUser);
  }, []);

  useEffect(() => {
    async function load() {
      try {
        const apiBase =
          process.env.NEXT_PUBLIC_API_BASE ?? "/.netlify/functions/";
        const res = await fetch(`${apiBase}get-providers`);
        const data = await res.json();
        if (data.success && data.providers) {
          setProviders(data.providers);
        } else {
          setError(true);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const filteredProviders = useMemo(() => {
    const s = search.toLowerCase().trim();
    const result = providers.filter((p) => {
      if (verified && !p.verified) return false;
      if (avail && p.availability !== "Available") return false;
      if (diaspora && !p.diaspora) return false;
      if (category && p.category !== category) return false;
      if (region && p.region !== region) return false;
      if (s) {
        const hay =
          `${p.name} ${p.business} ${p.category} ${p.region} ${p.city} ${p.services}`.toLowerCase();
        if (!hay.includes(s)) return false;
      }
      return true;
    });

    result.sort((a, b) => {
      const sa = (a.verified ? 2 : 0) + (a.availability === "Available" ? 1 : 0);
      const sb = (b.verified ? 2 : 0) + (b.availability === "Available" ? 1 : 0);
      return sb - sa;
    });

    return result;
  }, [providers, search, category, region, avail, verified, diaspora]);

  useEffect(() => {
    setDisplayedCount(10);
  }, [search, category, region, avail, verified, diaspora]);

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setRegion("");
    setAvail(false);
    setVerified(false);
    setDiaspora(false);
  };

  const activeFilterCount = [region, avail, verified, diaspora].filter(Boolean).length;

  return (
    <div className="bg-[#EEF6F9] min-h-screen">
      {/* Header */}
      <header className="bg-[#f3fcef] flex justify-between items-center w-full px-6 py-2 sticky top-0 z-30">
        <h1 className="text-[24px] font-extrabold text-[#006d2f] leading-tight">
          TownLink
        </h1>
        {userProfile ? (
          userProfile.avatarUrl ? (
            <img src={userProfile.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full object-cover border-2 border-[#dce5d9]" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#00404F] border-2 border-[#dce5d9] flex items-center justify-center text-white font-bold text-sm">
              {(userProfile['Provider Name'] || "U").substring(0, 2).toUpperCase()}
            </div>
          )
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#e2ebde] border-2 border-[#dce5d9] flex items-center justify-center text-[#3d4a3d] font-bold text-sm">
            TL
          </div>
        )}
      </header>

      {/* Search Bar */}
      <div className="px-6 mb-4">
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6d7b6c]"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-12 pl-12 pr-14 bg-white border border-[#BCC4C6] rounded-[10px] focus:outline-none focus:border-[#30CB65] focus:ring-2 focus:ring-[#30CB65]/20 text-[16px] text-[#161d16] placeholder:text-[#6d7b6c] transition-all"
            placeholder="Search providers..."
          />
          <button
            onClick={() => setShowFilters(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center text-[#3d4a3d] hover:bg-[#EEF6F9] hover:text-[#006d2f] transition-colors"
          >
            <SlidersHorizontal size={18} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#30CB65] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <CategoryPills
        categories={["All", ...SERVICE_CATEGORIES]}
        active={category || "All"}
        onSelect={(cat) => setCategory(cat === "All" ? "" : cat)}
      />

      {/* Provider List */}
      <div className="px-6 pb-[100px] pt-2">
        {isLoading ? (
          <div className="text-center py-32">
            <div className="w-12 h-12 border-4 border-[#dce5d9] border-t-[#30CB65] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#6d7b6c] text-sm font-medium">
              Discovering providers...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 bg-white border border-red-200 rounded-[32px] shadow-sm">
            <p className="text-red-500 text-sm font-medium">
              Could not load providers. Please refresh.
            </p>
          </div>
        ) : filteredProviders.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#dce5d9] rounded-[32px] shadow-sm px-6">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-[24px] font-bold text-[#161d16] mb-3">
              No match found
            </h3>
            <p className="text-[16px] text-[#3d4a3d] mb-6">
              Try adjusting your search or WhatsApp us directly.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#1fb855] transition-colors"
            >
              WhatsApp Us
            </a>
          </div>
        ) : (
          <>
            <p className="text-sm font-semibold text-[#3d4a3d] mb-4">
              {filteredProviders.length} provider
              {filteredProviders.length !== 1 ? "s" : ""} found
            </p>
            <div className="flex flex-col gap-4">
              {filteredProviders.slice(0, displayedCount).map((p) => (
                <MobileProviderCard key={p.id} provider={p} />
              ))}
            </div>
            {displayedCount < filteredProviders.length && (
              <div className="text-center mt-6">
                <button
                  onClick={() => setDisplayedCount((prev) => prev + 10)}
                  className="px-8 py-3 bg-white border border-[#006d2f] text-[#006d2f] font-semibold rounded-full hover:bg-[#006d2f] hover:text-white transition-all text-sm"
                >
                  Load more
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Floating WhatsApp FAB */}
      <a
        href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-[90px] right-6 w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform z-40"
      >
        <MessageCircle size={24} fill="currentColor" />
      </a>

      {/* Filter Sheet */}
      <FilterSheet
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        region={region}
        setRegion={setRegion}
        avail={avail}
        setAvail={setAvail}
        verified={verified}
        setVerified={setVerified}
        diaspora={diaspora}
        setDiaspora={setDiaspora}
        resultsCount={filteredProviders.length}
        onClear={clearFilters}
      />
    </div>
  );
}
