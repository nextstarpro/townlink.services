"use client";

import { useRouter } from "next/navigation";

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

const WA_NUMBER = "233274870179";

/* ─── WhatsApp SVG ─── */
function WaIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function MobileProviderCard({ provider }: { provider: ProviderData }) {
  const router = useRouter();
  const p = provider;
  const initials = (p.name || "P")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const waMsg = encodeURIComponent(
    `Hi Nana 👋 I'm interested in ${p.name}${
      p.business ? " (" + p.business + ")" : ""
    } from TownLink Services. Can you help me book them?`
  );

  const cardServices = (p.services || "")
    .split(/[,\n]/)
    .map((s) => s.trim())
    .filter((s) => s.length > 2 && s.length < 50)
    .slice(0, 3);

  const priceText = p.minPrice
    ? `GHS ${p.minPrice}${p.maxPrice ? "–" + p.maxPrice : "+"} ${p.priceUnit || ""}`
    : null;

  const availStyle =
    p.availability === "Available"
      ? "bg-[#eaf3de] text-[#3b6d11]"
      : p.availability === "Busy"
      ? "bg-[#faeeda] text-[#854f0b]"
      : "";

  return (
    <div className="bg-white rounded-xl border border-[#e2ddd5] overflow-hidden hover:shadow-lg hover:translate-y-[-2px] transition-all">
      {/* Card top — dark header with avatar + name */}
      <div className="bg-[#00404F] px-4 py-3.5 flex items-center gap-3 relative">
        <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/30 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-white leading-tight truncate">
            {p.name}
          </h3>
          {p.business && (
            <p className="text-[13px] text-white/70 truncate mt-0.5">
              {p.business}
            </p>
          )}
        </div>
        {p.verified && (
          <div className="w-5 h-5 bg-[#c9902a] rounded-full flex items-center justify-center flex-shrink-0">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1.5">
          {p.category && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#eef6ea] text-[#006d2f]">
              {p.category}
            </span>
          )}
          {(p.city || p.region) && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#faf8f4] text-[#6d7b6c] border border-[#e2ddd5] flex items-center gap-0.5">
              📍 {[p.city, p.region].filter(Boolean).join(", ")}
            </span>
          )}
          {p.availability && availStyle && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${availStyle}`}>
              {p.availability === "Available" ? "🟢" : "⏳"} {p.availability}
            </span>
          )}
          {p.diaspora && (
            <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-[#eeedfe] text-[#3c3489]">
              🌍 Diaspora
            </span>
          )}
        </div>

        {cardServices.length > 0 && (
          <p className="text-[13px] text-[#6d7b6c] leading-relaxed line-clamp-2">
            {cardServices.join(", ")}
          </p>
        )}

        {priceText && (
          <p className="text-[14px] font-medium text-[#161d16]">{priceText}</p>
        )}
      </div>

      {/* Card footer — View Profile + Book via WhatsApp */}
      <div className="flex gap-2 px-4 pb-4 pt-1 border-t border-[#e2ddd5]">
        <button
          onClick={() => router.push(`/provider?id=${p.id}`)}
          className="flex-1 py-2.5 bg-white border-[1.5px] border-[#006d2f] rounded-lg text-[#006d2f] text-[13px] font-semibold text-center hover:bg-[#eef6ea] transition-colors active:scale-[0.98]"
        >
          View profile
        </button>
        <a
          href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
          target="_blank"
          rel="noreferrer"
          className="flex-1 py-2.5 bg-[#25D366] rounded-lg text-white text-[13px] font-semibold text-center flex items-center justify-center gap-1.5 hover:bg-[#1fb855] transition-colors active:scale-[0.98]"
        >
          <WaIcon />
          Book via WhatsApp
        </a>
      </div>
    </div>
  );
}
