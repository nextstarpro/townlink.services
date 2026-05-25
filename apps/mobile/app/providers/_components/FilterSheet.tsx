"use client";

import { X, ChevronDown } from "lucide-react";
import { GHANA_REGIONS } from "@townlink/core";

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  region: string;
  setRegion: (v: string) => void;
  avail: boolean;
  setAvail: (v: boolean) => void;
  verified: boolean;
  setVerified: (v: boolean) => void;
  diaspora: boolean;
  setDiaspora: (v: boolean) => void;
  resultsCount: number;
  onClear: () => void;
}

export function FilterSheet({
  isOpen,
  onClose,
  region,
  setRegion,
  avail,
  setAvail,
  verified,
  setVerified,
  diaspora,
  setDiaspora,
  resultsCount,
  onClear,
}: FilterSheetProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-[#00404F]/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-4px_24px_rgba(0,64,79,0.1)] flex flex-col max-h-[85vh] animate-[slideUp_0.3s_ease-out]">
        {/* Drag handle */}
        <div className="w-full flex justify-center pt-4 pb-2">
          <div className="w-12 h-1.5 bg-[#bccbb9] rounded-full opacity-50" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-2 border-b border-[#dce5d9]">
          <h2 className="text-[24px] font-bold text-[#161d16]">Filters</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f3fcef] hover:bg-[#dce5d9] transition-colors text-[#3d4a3d]"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
          {/* Region dropdown */}
          <div className="space-y-2">
            <label className="text-[20px] font-semibold text-[#161d16] block">
              Region
            </label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full appearance-none bg-[#f3fcef] border border-[#bccbb9] rounded-[10px] px-4 py-3 text-[16px] text-[#161d16] focus:outline-none focus:border-[#30CB65] focus:ring-2 focus:ring-[#30CB65]/20 transition-all"
              >
                <option value="">All Regions in Ghana</option>
                {GHANA_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#3d4a3d]">
                <ChevronDown size={20} />
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-0 bg-[#f3fcef] p-4 rounded-[24px]">
            {/* Verified */}
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-[20px] font-semibold text-[#161d16] block">
                  Verified Providers
                </span>
                <span className="text-[16px] text-[#3d4a3d] block mt-1">
                  Show only identity-verified professionals
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={verified}
                  onChange={(e) => setVerified(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="h-px w-full bg-[#dce5d9]" />

            {/* Available */}
            <div className="flex items-center justify-between py-3">
              <div>
                <span className="text-[20px] font-semibold text-[#161d16] block">
                  Available Now
                </span>
                <span className="text-[16px] text-[#3d4a3d] block mt-1">
                  Providers accepting immediate bookings
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={avail}
                  onChange={(e) => setAvail(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>

            <div className="h-px w-full bg-[#dce5d9]" />

            {/* Diaspora */}
            <div className="flex items-center justify-between py-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[20px] font-semibold text-[#161d16] block">
                    Diaspora Friendly
                  </span>
                  <span className="bg-[#6cf9e4] text-[#007165] text-[12px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Beta
                  </span>
                </div>
                <span className="text-[16px] text-[#3d4a3d] block mt-1">
                  Experienced with international clients
                </span>
              </div>
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={diaspora}
                  onChange={(e) => setDiaspora(e.target.checked)}
                />
                <span className="toggle-slider" />
              </label>
            </div>
          </div>

          {/* Clear */}
          <button
            onClick={onClear}
            className="text-sm font-semibold text-[#006d2f] underline"
          >
            Clear all filters
          </button>
        </div>

        {/* Bottom action */}
        <div
          className="p-6 border-t border-[#dce5d9] bg-white"
          style={{
            paddingBottom: "calc(24px + env(safe-area-inset-bottom, 0px))",
          }}
        >
          <button
            onClick={onClose}
            className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-[20px] flex items-center justify-center hover:opacity-90 transition-opacity shadow-[0_4px_24px_rgba(0,64,79,0.12)] active:scale-[0.98]"
          >
            Show {resultsCount} Results
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
