"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Copy, Check } from "lucide-react";

const WA_NUMBER = "233274870179";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/.netlify/functions/";

function WaIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export default function ProviderDetailClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const recordId = searchParams.get("id") || "";

  const [provider, setProvider] = useState<Record<string, unknown> | null>(null);
  const [status, setStatus] = useState<"loading" | "active" | "pending" | "error">("loading");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!recordId) { setStatus("error"); return; }

    async function load() {
      try {
        const res = await fetch(`${API_BASE}get-provider?id=${recordId}`);
        const data = await res.json();
        if (!data.success || !data.provider) { setStatus("error"); return; }

        const provStatus = (data.provider.Status as string) || "Active";
        if (provStatus === "Pending") {
          setProvider(data.provider);
          setStatus("pending");
        } else {
          setProvider(data.provider);
          setStatus("active");
        }
      } catch {
        setStatus("error");
      }
    }
    load();
  }, [recordId]);

  const goBack = () => router.back();

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#EEF6F9] flex flex-col items-center justify-center gap-4">
        <div className="w-10 h-10 border-3 border-[#dce5d9] border-t-[#006d2f] rounded-full animate-spin" />
        <p className="text-sm text-[#6d7b6c]">Loading profile...</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-[#EEF6F9]">
        <DetailHeader onBack={goBack} />
        <div className="px-6 pt-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-[22px] font-bold text-[#161d16] mb-2">Profile not found</h2>
          <p className="text-sm text-[#6d7b6c] mb-6">This provider profile doesn&apos;t exist or may have been removed.</p>
          <button onClick={goBack} className="text-sm font-semibold text-[#006d2f] hover:underline">
            ← Back to providers
          </button>
        </div>
      </div>
    );
  }

  if (status === "pending") {
    return (
      <div className="min-h-screen bg-[#EEF6F9]">
        <DetailHeader onBack={goBack} />
        <div className="px-6 pt-10">
          <div className="bg-white rounded-xl border border-[#e2ddd5] p-8 text-center">
            <div className="text-5xl mb-4">⏳</div>
            <h2 className="text-[22px] font-bold text-[#161d16] mb-3">Provider being verified</h2>
            <p className="text-sm text-[#6d7b6c] leading-relaxed mb-6">
              We&apos;re reviewing this provider&apos;s details to ensure quality. You can still request them through WhatsApp — just chat with us and we&apos;ll help coordinate.
            </p>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi 👋 I'm interested in booking this service provider. Can you help me connect with them?")}`}
              target="_blank" rel="noreferrer"
              className="w-full h-12 bg-[#25D366] text-white rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#1fb855] transition-colors mb-4"
            >
              💬 Request via WhatsApp
            </a>
            <button onClick={goBack} className="text-sm font-semibold text-[#006d2f] hover:underline">
              ← Back to providers
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── ACTIVE PROFILE ─── */
  const p = provider!;
  const name = (p["Provider Name"] as string) || (p.name as string) || "Provider";
  const business = (p["Business Name"] as string) || (p.business as string) || "";
  const category = (p["Service Category"] as string) || (p.category as string) || "";
  const region = (p["Region"] as string) || (p.region as string) || "";
  const city = (p["City / Town"] as string) || (p.city as string) || "";
  const experience = p["Years of Experience"] as number | undefined;
  const minPrice = p["Min Price (GHS)"] as number | string | undefined;
  const maxPrice = p["Max Price (GHS)"] as number | string | undefined;
  const priceUnit = (p["Price Unit"] as string) || (p.priceUnit as string) || "";
  const availability = (p["Availability"] as string) || (p.availability as string) || "";
  const isVerified = Boolean(p["Verified"] || p.verified);
  const isDiaspora = Boolean(p["Serves Diaspora Clients"] || p.diaspora);
  const rawServices = (p["Specific Services"] as string) || (p.services as string) || "";
  const dateRegistered = p["Date Registered"] as string | undefined;

  const initials = name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const services = rawServices.split(/[,\n]/).map((s) => s.trim()).filter((s) => s.length > 2 && s.length < 60);

  // Description logic — matches provider-details.html exactly:
  // 1. If text after \n\n exists → show that as description
  // 2. If no \n\n but rawServices > 100 chars → show the whole text as description
  const descParts = rawServices.split("\n\n");
  let description = "";
  if (descParts.length > 1) {
    description = descParts.slice(1).join("\n\n").trim();
  } else if (rawServices.length > 100) {
    description = rawServices.trim();
  }

  const waMsg = encodeURIComponent(
    `Hi Nana 👋 I'm interested in ${name}${business ? " (" + business + ")" : ""} from TownLink Services. Can you help me book them?`
  );

  const profileUrl = `https://townlink.app/provider/${recordId}`;

  const shareWa = () => {
    const msg = encodeURIComponent(`Check out ${name} on TownLink Services 🇬🇭\n\n${profileUrl}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch { /* silently */ }
  };

  const infoItems: { label: string; value: string }[] = [];
  if (experience) infoItems.push({ label: "Experience", value: `${experience} years` });
  if (availability) {
    const icon = availability === "Available" ? "🟢" : availability === "Busy" ? "🟡" : "⚪";
    infoItems.push({ label: "Availability", value: `${icon} ${availability}` });
  }
  if (minPrice || maxPrice) {
    infoItems.push({ label: "Price Range", value: `GHS ${minPrice || "—"} – ${maxPrice || "—"} ${priceUnit}` });
  }
  if (dateRegistered) {
    const joined = new Date(dateRegistered).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
    infoItems.push({ label: "Member Since", value: joined });
  }

  return (
    <div className="min-h-screen bg-[#EEF6F9] pb-8">
      <DetailHeader onBack={goBack} />

      {/* Hero Card */}
      <div className="bg-[#00404F] rounded-b-[20px] px-6 pt-7 pb-6 relative overflow-hidden mb-4">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-[#c9902a]/12 pointer-events-none" />
        <div className="absolute -bottom-12 -left-5 w-32 h-32 rounded-full bg-white/4 pointer-events-none" />

        <div className="relative z-10">
          <div className="w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 flex items-center justify-center text-white font-bold text-2xl mb-4">
            {initials}
          </div>

          <h1 className="text-[24px] font-bold text-white leading-tight mb-1">{name}</h1>
          {business && <p className="text-[14px] text-white/70 mb-3">{business}</p>}

          <div className="flex flex-wrap gap-2">
            {isVerified && (
              <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-[#c9902a] text-white flex items-center gap-1">
                ✅ Verified
              </span>
            )}
            {category && (
              <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-white/15 text-white/90 border border-white/20">
                {category}
              </span>
            )}
            {(city || region) && (
              <span className="text-[12px] font-semibold px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/15">
                📍 {[city, region].filter(Boolean).join(", ")}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 space-y-3">
        {infoItems.length > 0 && (
          <div className="grid grid-cols-2 gap-2.5">
            {infoItems.map((item) => (
              <div key={item.label} className="bg-white border border-[#e2ddd5] rounded-xl p-4">
                <div className="text-[10px] font-bold text-[#6d7b6c] uppercase tracking-wider mb-1">{item.label}</div>
                <div className="text-[15px] font-medium text-[#161d16]">{item.value}</div>
              </div>
            ))}
          </div>
        )}

        {services.length > 0 && (
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-5">
            <div className="text-[10px] font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">Services</div>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <span key={s} className="text-[13px] font-medium px-3 py-1.5 rounded-full bg-[#eef6ea] text-[#006d2f] border border-[#b8dfc6]">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {description && (
          <div className="bg-white border border-[#e2ddd5] rounded-xl p-5">
            <div className="text-[10px] font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">About</div>
            <p className="text-[14px] text-[#444] leading-relaxed">{description}</p>
          </div>
        )}

        {isDiaspora && (
          <div className="bg-[#fdf6e8] border border-[#e8c87a] rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl flex-shrink-0">🌍</span>
            <div>
              <strong className="text-[14px] text-[#7a5c10] block">Diaspora Ready</strong>
              <span className="text-[13px] text-[#7a5c10] leading-relaxed">This provider serves diaspora clients and can coordinate projects remotely.</span>
            </div>
          </div>
        )}

        {/* CTA Card */}
        <div className="bg-gradient-to-br from-[#00404F] to-[#006d2f] rounded-xl p-5 text-center">
          <h3 className="text-[18px] font-bold text-white mb-1">Need this service?</h3>
          <p className="text-[13px] text-white/75 mb-4 leading-relaxed">
            Chat with our assistant Nana and get connected with this provider.
          </p>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${waMsg}`}
            target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#1fb855] transition-colors"
          >
            <WaIcon size={16} />
            Request via WhatsApp
          </a>
        </div>

        {/* Share Card */}
        <div className="bg-white border border-[#e2ddd5] rounded-xl p-5">
          <div className="text-[10px] font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">Share this profile</div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={shareWa}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#25D366] text-white rounded-lg text-[13px] font-semibold hover:bg-[#1fb855] transition-colors"
            >
              <WaIcon size={14} />
              WhatsApp
            </button>
            <button
              onClick={copyLink}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#006d2f] text-white rounded-lg text-[13px] font-semibold hover:opacity-90 transition-opacity"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
          <div className="flex items-center gap-2 bg-[#faf8f4] border border-[#e2ddd5] rounded-lg px-3 py-2">
            <span className="flex-1 text-[12px] text-[#6d7b6c] truncate">{profileUrl}</span>
            <button onClick={copyLink} className="text-[11px] font-semibold bg-[#006d2f] text-white px-3 py-1 rounded hover:opacity-90 transition-opacity flex-shrink-0">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="bg-[#00404F] flex items-center justify-between px-5 py-4">
      <button onClick={onBack} className="text-white flex items-center gap-2 hover:opacity-80 transition-opacity">
        <ArrowLeft size={20} />
      </button>
      <span className="text-[11px] text-white/60 uppercase tracking-wider font-semibold">Provider Profile</span>
    </header>
  );
}
