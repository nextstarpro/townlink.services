"use client";

import { useState, useEffect } from "react";
import {
  User, Edit, LogOut, Phone, Loader2, ChevronDown,
  ArrowLeft, Check, ChevronRight, MapPin, Briefcase, Clock
} from "lucide-react";
import { GHANA_REGIONS } from "@townlink/core";

/* ─── Service Map (matching web exactly) ─── */
const serviceMap: Record<string, string[]> = {
  'Home Services': ['Home Services','Plumbing Services','Electrical Services','AC & Refrigeration','Carpentry & Woodwork','Painting & Decoration','Tiling & Flooring','Roofing & Waterproofing','Cleaning Services','Fumigation & Pest Control','Gardening & Landscaping'],
  'Beauty & Personal Care': ['Beauty & Wellness','Hair Styling & Barbering','Makeup & Beauty','Massage & Spa','Nail Services'],
  'Professional Services': ['Professional Services','Legal Services','Accounting & Tax','Consulting','Real Estate & Property','Insurance Services'],
  'Events & Catering': ['Events & Entertainment','Catering Services','Event Planning & Decoration','MC & DJ Services','Photography & Videography','Sound & Lighting','Tent & Chair Rentals'],
  'Transport & Logistics': ['Transportation','Delivery & Courier','Moving & Relocation','Towing Services','Driver Services'],
  'Education & Training': ['Education & Tutoring','Music & Dance Lessons','Driving School','Computer Training','Language Classes'],
  'Health & Medical': ['Health & Medical','Home Nursing','Physiotherapy','Lab Services','Ambulance Services'],
  'Tech & Digital': ['IT & Networking','Phone & Computer Repairs','Web & App Development','Graphic Design','Social Media Management','CCTV & Security Systems'],
  'Automotive': ['Auto Mechanic','Car Wash & Detailing','Auto Electrician','Panel Beating & Spraying','Vulcanizer Services'],
  'Construction & Engineering': ['Building & Construction','Architecture & Design','Surveying Services','Structural Engineering'],
  'Tailoring & Fashion': ['Fashion & Tailoring','Kente Weaving','Embroidery Services','Alterations & Repairs'],
  'Financial Services': ['Financial Services','Mobile Money Services','Microfinance'],
  'Jobs & Recruitment': ['Jobs & Recruitment','Job Seekers','Employers & Recruiters','Freelance & Gig Work'],
  'Security Services': ['Security Services','Mining Security','Corporate Security','Event Security','Residential Security','Security Consulting'],
  'Other': ['Other']
};

/* ─── Types ─── */
type RegistrationFormData = {
  countryCode: string;
  phone: string;
  fullPhone: string;
  verifyToken: string;
  isReturning?: boolean;
  existingRecordId?: string;
  providerName: string;
  businessName: string;
  email: string;
  ghanaCard: string;
  ghanaCardExpiry: string;
  region: string;
  city: string;
  category: string;
  services: string[];
  description: string;
  experience: string;
  availability: string;
  diaspora: boolean;
  minPrice: string;
  maxPrice: string;
  priceUnit: string;
  preferredPayment: string;
  momoNumber: string;
  momoName: string;
  bankName: string;
  accountNumber: string;
  advanceRequired: string;
  advancePercent: string;
};

const initialFormData: RegistrationFormData = {
  countryCode: "+233", phone: "", fullPhone: "", verifyToken: "",
  providerName: "", businessName: "", email: "", ghanaCard: "", ghanaCardExpiry: "", region: "", city: "",
  category: "", services: [], description: "", experience: "",
  availability: "", diaspora: false, minPrice: "", maxPrice: "", priceUnit: "per job",
  preferredPayment: "", momoNumber: "", momoName: "", bankName: "", accountNumber: "", advanceRequired: "", advancePercent: "50"
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/.netlify/functions/";

function parseServicesAndDescription(rawText: string | undefined | null) {
  if (!rawText) return { services: [], description: "" };
  const parts = rawText.split('\n\n');
  const servicesStr = parts[0] || "";
  const description = parts.slice(1).join('\n\n') || "";
  const services = servicesStr.split(', ').map(s => s.trim()).filter(Boolean);
  return { services, description };
}

/* ─── Shared UI helpers ─── */
const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-[10px] text-[16px] text-[#161d16] transition-all focus:outline-none ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-[#bccbb9] focus:border-[#006d2f] focus:ring-2 focus:ring-[#006d2f]/20"
  }`;

const selectClass = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-[10px] text-[16px] text-[#161d16] appearance-none transition-all focus:outline-none ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-[#bccbb9] focus:border-[#006d2f] focus:ring-2 focus:ring-[#006d2f]/20"
  }`;

/* ────────────────────────────── MAIN COMPONENT ────────────────────────────── */
export default function MobileProfile() {
  const [token, setToken] = useState<string | null>(null);
  const [profile, setProfile] = useState<Record<string, string | boolean | null> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Registration wizard
  const [showRegister, setShowRegister] = useState(false);
  const [regStep, setRegStep] = useState(1); // 1=phone, 1.5=otp, 2=details, 3=services, 4=rates, 5=review
  const [regData, setRegData] = useState<RegistrationFormData>(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Profile edit (logged-in)
  const [activeEditView, setActiveEditView] = useState<'personal' | 'professional' | 'rates' | 'payments' | null>(null);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);

  // Login (returning user)
  const [showLogin, setShowLogin] = useState(false);
  const [loginPhone, setLoginPhone] = useState("");
  const [loginCountryCode, setLoginCountryCode] = useState("+233");
  const [loginToken, setLoginToken] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginCountdown, setLoginCountdown] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("tl_auth_token");
    setToken(stored);
    if (stored) loadProfile(stored);
    else setIsLoading(false);
  }, []);

  // Login countdown timer
  useEffect(() => {
    if (loginCountdown > 0) {
      const t = setTimeout(() => setLoginCountdown(loginCountdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [loginCountdown]);

  const updateReg = (data: Partial<RegistrationFormData>) =>
    setRegData((prev) => ({ ...prev, ...data }));

  /* ─── API calls ─── */
  async function loadProfile(authToken: string, initialRecord?: any) {
    try {
      let record = initialRecord;
      if (!record) {
        const stored = localStorage.getItem("tl_auth_record");
        if (stored) {
          try { record = JSON.parse(stored); } catch {}
        }
      }
      
      // Render from cache immediately for snappy UI
      if (record && Object.keys(record).length > 0) {
        setProfile({
          id: record.id || authToken,
          fullName: record['Provider Name'] || "",
          businessName: record['Business Name'] || "",
          email: record['Email'] || "",
          phone: record['Phone / WhatsApp'] || "",
          ghanaCard: record['Ghana Card Number'] || "",
          ghanaCardExpiry: record['Ghana Card Expiry Date'] || "",
          region: record['Region'] || record['Regions Served']?.[0] || "",
          city: record['City / Town'] || "",
          category: record['Service Category'] || record['Service Categories']?.[0] || "",
          services: parseServicesAndDescription(record['Specific Services']).services,
          experience: record['Years of Experience'] || "",
          minPrice: record['Min Price (GHS)'] || "",
          maxPrice: record['Max Price (GHS)'] || "",
          priceUnit: record['Price Unit'] || "",
          availability: record['Availability'] || "",
          diaspora: record['Serves Diaspora Clients'] || false,
          verified: record['Status'] === 'Verified' || record['Status'] === 'Active',
          description: parseServicesAndDescription(record['Specific Services']).description,
          avatarUrl: record.avatarUrl || "",
          preferredPayment: record['Preferred Payment Method'] || "",
          momoNumber: record['MoMo Number'] || "",
          momoName: record['MoMo Name'] || "",
          bankName: record['Bank Name'] || "",
          accountNumber: record['Account Number'] || "",
          advanceRequired: record['Advance Payment Required'] ? "Yes" : "No",
          advancePercent: record['Advance Percentage'] ? String(record['Advance Percentage']) : "50"
        });
        setIsLoading(false);
      }
      
      // Fetch fresh data in the background to ensure it is always synced
      const res = await fetch(`${API_BASE}get-provider?id=${authToken}`);
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.provider) {
        const p = data.provider;
        
        // Merge fresh public data with cached private data
        const mergedRecord = {
          ...record,
          'Provider Name': p['Provider Name'] || record?.['Provider Name'] || "",
          'Business Name': p['Business Name'] || record?.['Business Name'] || "",
          'Region': p['Region'] || record?.['Region'] || "",
          'City / Town': p['City / Town'] || record?.['City / Town'] || "",
          'Service Category': p['Service Category'] || record?.['Service Category'] || "",
          'Specific Services': p['Specific Services'] || record?.['Specific Services'] || "",
          'Years of Experience': p['Years of Experience'] || record?.['Years of Experience'] || "",
          'Min Price (GHS)': p['Min Price (GHS)'] || record?.['Min Price (GHS)'] || "",
          'Max Price (GHS)': p['Max Price (GHS)'] || record?.['Max Price (GHS)'] || "",
          'Price Unit': p['Price Unit'] || record?.['Price Unit'] || "",
          'Availability': p['Availability'] || record?.['Availability'] || "",
          'Serves Diaspora Clients': p['Serves Diaspora Clients'] || false,
          'Status': p['Status'] || record?.['Status'] || 'Pending',
          'Preferred Payment Method': p['Preferred Payment Method'] || record?.['Preferred Payment Method'] || "",
          'MoMo Number': p['MoMo Number'] || record?.['MoMo Number'] || "",
          'MoMo Name': p['MoMo Name'] || record?.['MoMo Name'] || "",
          'Bank Name': p['Bank Name'] || record?.['Bank Name'] || "",
          'Account Number': p['Account Number'] || record?.['Account Number'] || "",
          'Advance Payment Required': p['Advance Payment Required'] ?? record?.['Advance Payment Required'] ?? false,
          'Advance Percentage': p['Advance Percentage'] || record?.['Advance Percentage'] || 50,
        };

        setProfile({
          id: authToken,
          fullName: mergedRecord['Provider Name'],
          businessName: mergedRecord['Business Name'],
          email: mergedRecord['Email'] || "",
          phone: mergedRecord['Phone / WhatsApp'] || "",
          ghanaCard: mergedRecord['Ghana Card Number'] || "",
          ghanaCardExpiry: mergedRecord['Ghana Card Expiry Date'] || "",
          region: mergedRecord['Region'],
          city: mergedRecord['City / Town'],
          category: mergedRecord['Service Category'],
          services: parseServicesAndDescription(mergedRecord['Specific Services']).services,
          experience: mergedRecord['Years of Experience'],
          minPrice: mergedRecord['Min Price (GHS)'],
          maxPrice: mergedRecord['Max Price (GHS)'],
          priceUnit: mergedRecord['Price Unit'],
          availability: mergedRecord['Availability'],
          diaspora: mergedRecord['Serves Diaspora Clients'],
          verified: mergedRecord['Status'] === 'Verified' || mergedRecord['Status'] === 'Active',
          description: parseServicesAndDescription(mergedRecord['Specific Services']).description,
          avatarUrl: mergedRecord.avatarUrl || "",
          preferredPayment: mergedRecord['Preferred Payment Method'] || "",
          momoNumber: mergedRecord['MoMo Number'] || "",
          momoName: mergedRecord['MoMo Name'] || "",
          bankName: mergedRecord['Bank Name'] || "",
          accountNumber: mergedRecord['Account Number'] || "",
          advanceRequired: mergedRecord['Advance Payment Required'] ? "Yes" : "No",
          advancePercent: mergedRecord['Advance Percentage'] ? String(mergedRecord['Advance Percentage']) : "50"
        });
        
        localStorage.setItem("tl_auth_record", JSON.stringify(mergedRecord));
      }
    } catch { /* silent */ }
    finally { setIsLoading(false); }
  }

  async function handleLoginSendOtp() {
    if (loginPhone.length < 7) { setLoginError("Enter a valid phone number."); return; }
    setLoginLoading(true); setLoginError("");
    const fullPhone = loginCountryCode + loginPhone;
    try {
      const res = await fetch(`${API_BASE}send-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const result = await res.json().catch(() => ({}));
      if (result.success || res.ok) {
        if (result.token) setLoginToken(result.token);
        setOtpSent(true);
        setLoginCountdown(60);
      } else {
        setLoginError(result.error || "Failed to send code.");
      }
    } catch { setLoginError("Network error. Please try again."); }
    finally { setLoginLoading(false); }
  }

  async function handleLoginVerifyOtp() {
    if (otpCode.length < 4) { setLoginError("Enter a valid code."); return; }
    setLoginLoading(true); setLoginError("");
    try {
      const res = await fetch(`${API_BASE}verify-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: loginToken, otp: otpCode }),
      });
      const result = await res.json().catch(() => ({}));
      if (result.success || res.ok) {
        const recordId = result.record?.id || result.record;
        const newToken = result.token || result.data?.token || (typeof recordId === 'string' ? recordId : null);
        if (newToken) {
          localStorage.setItem("tl_auth_token", newToken);
          if (result.record && typeof result.record === 'object') {
            localStorage.setItem("tl_auth_record", JSON.stringify(result.record));
          }
          setToken(newToken);
          setShowLogin(false);
          setIsLoading(true);
          loadProfile(newToken, typeof result.record === 'object' ? result.record : undefined);
        } else {
          // If the backend doesn't return a token, the user likely doesn't exist yet
          setLoginError("Account not found. Please register first.");
        }
      } else {
        setLoginError(result.error || "Invalid code. Try again.");
      }
    } catch { setLoginError("Network error."); }
    finally { setLoginLoading(false); }
  }

  // handleSave is now managed by sub-components

  function handleLogout() {
    localStorage.removeItem("tl_auth_token");
    localStorage.removeItem("tl_auth_record");
    setToken(null); setProfile(null);
    window.dispatchEvent(new Event("tl_profile_updated"));
  }

  /* ─── Loading ─── */
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#EEF6F9] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#dce5d9] border-t-[#30CB65] rounded-full animate-spin" />
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     REGISTRATION WIZARD (full multi-step, matching web /register-provider)
     ═══════════════════════════════════════════════════════════════════════════ */
  if (showRegister) {
    return <RegistrationWizardScreen
      step={regStep} setStep={setRegStep}
      data={regData} updateData={updateReg}
      isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted}
      onClose={() => { setShowRegister(false); setRegStep(1); setRegData(initialFormData); setIsSubmitted(false); }}
      onLogin={(newToken, record) => {
        localStorage.setItem("tl_auth_token", newToken);
        if (record) {
          localStorage.setItem("tl_auth_record", JSON.stringify(record));
        }
        setToken(newToken);
        setShowRegister(false);
        setIsLoading(true);
        loadProfile(newToken, record);
        window.dispatchEvent(new Event("tl_profile_updated"));
      }}
    />;
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOGGED OUT STATE
     ═══════════════════════════════════════════════════════════════════════════ */
  if (!token) {
    return (
      <div className="min-h-screen bg-[#EEF6F9]">
        <header className="bg-[#f3fcef] flex justify-between items-center w-full px-6 py-2">
          <h1 className="text-[24px] font-extrabold text-[#006d2f]">TownLink</h1>
          <User size={24} className="text-[#006d2f]" />
        </header>

        <main className="px-6 pt-10">
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,64,79,0.06)] flex flex-col items-center text-center mt-8">
            <div className="w-24 h-24 bg-[#eef6ea] rounded-full flex items-center justify-center mb-6">
              <User size={48} className="text-[#6d7b6c]" />
            </div>
            <h2 className="text-[24px] font-bold text-[#161d16] mb-2">Join TownLink</h2>
            <p className="text-[16px] text-[#3d4a3d] mb-8">
              Register as a service provider and get found by clients across Ghana and the diaspora.
            </p>

            {/* Register CTA */}
            <button
              onClick={() => { setShowRegister(true); setRegStep(1); }}
              className="w-full h-12 rounded-xl bg-[#30CB65] text-white font-semibold text-sm flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              <ChevronRight size={18} />
              Continue with WhatsApp
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* ═══════════════════════════════════════════════════════════════════════════
     LOGGED IN STATE (profile edit)
     ═══════════════════════════════════════════════════════════════════════════ */
  const initials = ((profile?.fullName as string) || "TL").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
  const avatarUrl = profile?.avatarUrl as string | undefined;

  if (activeEditView === 'personal') {
    return <EditPersonalDetails profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }
  if (activeEditView === 'professional') {
    return <EditProfessionalInfo profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }
  if (activeEditView === 'rates') {
    return <EditRates profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }
  if (activeEditView === 'payments') {
    return <EditPaymentDetails profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(token as string); }} />;
  }

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <header className="bg-[#f3fcef] flex justify-between items-center w-full px-6 py-2">
        <h1 className="text-[24px] font-extrabold text-[#006d2f]">TownLink</h1>
        <div className="w-8 h-8 rounded-full overflow-hidden bg-[#00404F] text-white flex items-center justify-center text-xs font-bold shadow-sm">
          {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
        </div>
      </header>

      <main className="px-6 pt-8 pb-24">
        {/* Profile header */}
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,64,79,0.1)] relative bg-[#00404F] text-white flex items-center justify-center text-3xl font-bold">
            {avatarUrl ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
            <button onClick={() => setAvatarModalOpen(true)} className="absolute bottom-0 right-1 bg-[#30CB65] text-white p-1.5 rounded-full border-2 border-white hover:bg-[#006d2f] transition-colors">
              <Edit size={14} />
            </button>
          </div>
          <div className="text-center">
            <h2 className="text-[24px] font-bold text-[#161d16] flex items-center justify-center gap-2">
              {(profile?.fullName as string) || "User"}
              {profile?.verified && (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#006d2f"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
              )}
            </h2>
            <p className="text-[16px] text-[#3d4a3d] font-medium mb-3">{(profile?.phone as string) || ""}</p>
            {token && token.startsWith("rec") && (
              <a 
                href={`https://townlink.app/provider/${token}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-block px-4 py-2 bg-[#eaf4ee] text-[#006d2f] rounded-full text-sm font-semibold hover:bg-[#d5ebd1] transition-colors"
              >
                View Public Profile
              </a>
            )}
          </div>
        </div>

        {/* Edit Menu Cards */}
        <div className="space-y-4 mb-10">
          <button onClick={() => setActiveEditView('personal')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Personal Details</h3>
                <p className="text-[14px] text-[#6d7b6c]">Name, Business, Email, Location</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>

          <button onClick={() => setActiveEditView('professional')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <Briefcase size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Professional Info</h3>
                <p className="text-[14px] text-[#6d7b6c]">Services, Experience, Description</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>

          <button onClick={() => setActiveEditView('rates')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Rates & Availability</h3>
                <p className="text-[14px] text-[#6d7b6c]">Status, Pricing, Diaspora</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>

          <button onClick={() => setActiveEditView('payments')} className="w-full bg-white rounded-[24px] p-5 shadow-[0_4px_24px_rgba(0,64,79,0.04)] flex items-center justify-between text-left transition-transform active:scale-[0.98]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#eef6ea] text-[#006d2f] flex items-center justify-center">
                <div className="text-[20px]">💳</div>
              </div>
              <div>
                <h3 className="text-[18px] font-semibold text-[#161d16]">Payment Details</h3>
                <p className="text-[14px] text-[#6d7b6c]">MoMo, Bank Account, Terms</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-[#bccbb9]" />
          </button>
        </div>

        <div className="flex justify-center mb-8">
          <button onClick={handleLogout} className="text-sm font-semibold text-[#ba1a1a] flex items-center gap-2 hover:opacity-80 transition-opacity">
            <LogOut size={18} /> Log Out
          </button>
        </div>
      </main>

      {avatarModalOpen && (
        <AvatarSelectionModal 
          token={token as string} 
          currentAvatar={avatarUrl} 
          onClose={() => setAvatarModalOpen(false)} 
          onSuccess={() => { setAvatarModalOpen(false); loadProfile(token as string); }} 
        />
      )}
    </div>
  );
}


/* ══════════════════════════════════════════════════════════════════════════════
   REGISTRATION WIZARD (5-step, matches web /register-provider exactly)
   ══════════════════════════════════════════════════════════════════════════════ */

function RegistrationWizardScreen({
  step, setStep, data, updateData, isSubmitted, setIsSubmitted, onClose, onLogin
}: {
  step: number;
  setStep: (s: number) => void;
  data: RegistrationFormData;
  updateData: (d: Partial<RegistrationFormData>) => void;
  isSubmitted: boolean;
  setIsSubmitted: (v: boolean) => void;
  onClose: () => void;
  onLogin: (token: string, record?: any) => void;
}) {
  const stepMeta = [
    { step: 1, label: "Verify your number", pct: 20 },
    { step: 1.5, label: "Verify your number", pct: 20 },
    { step: 2, label: "Your details", pct: 40 },
    { step: 3, label: "Your services", pct: 60 },
    { step: 4, label: "Rates & availability", pct: 80 },
    { step: 5, label: "Review & submit", pct: 100 },
  ];
  const current = stepMeta.find((m) => m.step === step) || stepMeta[0];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#EEF6F9]">
        <MobileRegHeader onBack={onClose} />
        <div className="px-6 pt-6">
          <div className="bg-white rounded-[32px] p-8 shadow-[0_4px_24px_rgba(0,64,79,0.06)] text-center">
            <div className="w-16 h-16 bg-[#eef6ea] rounded-full flex items-center justify-center mx-auto mb-5 text-2xl border border-[#bccbb9]">🎉</div>
            <h2 className="text-[24px] font-bold text-[#006d2f] mb-3">You&apos;re All Set!</h2>
            <p className="text-[16px] text-[#3d4a3d] leading-relaxed mb-8 max-w-sm mx-auto">
              Your registration has been submitted and is pending verification. Our team will review your details and you&apos;ll receive a WhatsApp message once your profile is live.
            </p>
            <button
              onClick={() => {
                const msg = encodeURIComponent("Are you a service provider in Ghana? 🇬🇭\n\nList your business for FREE on TownLink Services and get found by clients at home and in the diaspora.\n\nRegister here 👉 https://services.townlinkglobal.com");
                window.open(`https://wa.me/?text=${msg}`, '_blank');
              }}
              className="w-full h-12 bg-[#25D366] text-white font-semibold text-sm rounded-[12px] flex items-center justify-center gap-2 mb-4 hover:opacity-90 transition-opacity"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Share on WhatsApp
            </button>
            <button onClick={onClose} className="text-sm font-medium text-[#6d7b6c] hover:text-[#006d2f] transition-colors">
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={() => { if (step === 1) onClose(); else if (step === 1.5) setStep(1); else setStep(Math.floor(step) - 1); }} />

      {/* Progress bar */}
      <div className="h-1.5 bg-[#dce5d9] w-full">
        <div className="h-full bg-gradient-to-r from-[#30CB65] to-[#30CBB8] transition-all duration-500 ease-in-out" style={{ width: `${current.pct}%` }} />
      </div>

      {/* Step indicator */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-[#6d7b6c] uppercase tracking-wider">{current.label}</span>
        <span className="text-xs font-medium text-[#6d7b6c]">Step {Math.min(step === 1.5 ? 2 : Math.ceil(step), 5)} of 5</span>
      </div>

      {/* Step content */}
      <div className="px-6 pt-2 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          {step === 1 && <RegStep1Phone data={data} updateData={updateData} onNext={() => setStep(1.5)} />}
          {step === 1.5 && <RegStep1bOTP data={data} onNext={() => setStep(2)} onResend={() => setStep(1)} onLogin={onLogin} />}
          {step === 2 && <RegStep2Details data={data} updateData={updateData} onNext={() => setStep(3)} />}
          {step === 3 && <RegStep3Services data={data} updateData={updateData} onNext={() => setStep(4)} />}
          {step === 4 && <RegStep4Rates data={data} updateData={updateData} onNext={() => setStep(5)} />}
          {step === 5 && <RegStep5Review data={data} onSubmit={() => setIsSubmitted(true)} />}
        </div>
      </div>
    </div>
  );
}

function MobileRegHeader({ onBack }: { onBack: () => void }) {
  return (
    <header className="bg-[#f3fcef] flex items-center gap-3 w-full px-6 py-3">
      <button onClick={onBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#eef6ea] transition-colors text-[#006d2f]">
        <ArrowLeft size={20} />
      </button>
      <h1 className="text-[20px] font-bold text-[#006d2f]">Register</h1>
    </header>
  );
}

/* ─── Step 1: Phone ─── */
function RegStep1Phone({ data, updateData, onNext }: { data: RegistrationFormData; updateData: (d: Partial<RegistrationFormData>) => void; onNext: () => void }) {
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (data.phone.length < 7) { setError("Please enter a valid phone number."); return; }
    setError(""); setIsSending(true);
    const fullPhone = data.countryCode + data.phone;
    updateData({ fullPhone });
    try {
      const res = await fetch(`${API_BASE}send-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: fullPhone }),
      });
      const result = await res.json().catch(() => ({}));
      if (result.success || res.ok) {
        if (result.token) updateData({ verifyToken: result.token });
        updateData({ isReturning: result.isReturning, existingRecordId: result.recordId });
        onNext();
      } else { setError(result.error || "Failed to send code."); }
    } catch { setError("Network error. Please try again."); }
    finally { setIsSending(false); }
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Verify Your WhatsApp</h2>
      <p className="text-sm text-[#3d4a3d] mb-6 leading-relaxed">
        We'll send a code to verify your number. This will be your primary contact for clients.
      </p>
      <label className="block text-sm font-semibold text-[#161d16] mb-1.5">WhatsApp Number</label>
      <div className="flex gap-2 mb-1">
        <select
          value={data.countryCode}
          onChange={(e) => updateData({ countryCode: e.target.value })}
          className="w-24 shrink-0 px-3 py-3 border border-[#bccbb9] rounded-[10px] text-sm focus:outline-none focus:border-[#006d2f] bg-white text-[#161d16]"
        >
          <option value="+233">+233</option>
          <option value="+234">+234</option>
          <option value="+44">+44</option>
          <option value="+1">+1</option>
        </select>
        <input
          type="tel" value={data.phone}
          onChange={(e) => { updateData({ phone: e.target.value.replace(/\D/g, '') }); if (error) setError(""); }}
          placeholder="24 123 4567"
          className={`flex-1 ${inputClass(!!error)}`}
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      <button onClick={handleSend} disabled={isSending} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-6 disabled:opacity-50 hover:opacity-90 transition-opacity active:scale-[0.98]">
        {isSending ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
        {isSending ? "Sending..." : "Send Verification Code"}
      </button>
    </div>
  );
}

/* ─── Step 1b: OTP ─── */
function RegStep1bOTP({ data, onNext, onResend, onLogin }: { data: RegistrationFormData; onNext: () => void; onResend: () => void; onLogin: (token: string, record?: any) => void; }) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => { if (countdown > 0) { const t = setTimeout(() => setCountdown(countdown - 1), 1000); return () => clearTimeout(t); } }, [countdown]);

  const handleVerify = async () => {
    if (otp.length < 4) { setError("Please enter a valid 4-digit code."); return; }
    setError(""); setIsVerifying(true);
    try {
      const res = await fetch(`${API_BASE}verify-otp`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: data.verifyToken, otp }),
      });
      const result = await res.json().catch(() => ({}));
      if (result.success || res.ok) {
        if (data.isReturning && data.existingRecordId) {
          onLogin(data.existingRecordId, result.record);
        } else {
          onNext();
        }
      }
      else { setError(result.error || "Invalid code. Please try again."); }
    } catch { setError("Network error. Please try again."); }
    finally { setIsVerifying(false); }
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Enter the Code</h2>
      <p className="text-sm text-[#3d4a3d] mb-4 leading-relaxed">
        We sent a 4-digit code to <strong>{data.fullPhone}</strong>.
      </p>
      <div className="bg-[#eef6ea] p-3 rounded-lg text-sm text-[#161d16] mb-6 border border-[#bccbb9]">
        Sent to <strong className="text-[#006d2f]">{data.fullPhone}</strong>
      </div>
      <input
        type="text" maxLength={4} value={otp}
        onChange={(e) => { setOtp(e.target.value.replace(/\D/g, '')); if (error) setError(""); }}
        placeholder="----"
        className={`w-full text-center tracking-[0.5em] text-2xl py-4 ${inputClass(!!error)}`}
      />
      {error && <p className="text-xs text-red-500 mt-1 text-center">{error}</p>}
      <div className="text-center text-sm my-6">
        {countdown > 0 ? (
          <span className="text-[#6d7b6c]">Resend code in {countdown}s</span>
        ) : (
          <button onClick={onResend} className="text-[#006d2f] underline hover:text-[#30CB65] transition-colors">Resend Code</button>
        )}
      </div>
      <button onClick={handleVerify} disabled={isVerifying} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center disabled:opacity-50 hover:opacity-90 transition-opacity active:scale-[0.98]">
        {isVerifying ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
        {isVerifying ? "Verifying..." : "Confirm & Continue"}
      </button>
    </div>
  );
}

/* ─── Step 2: Details ─── */
function RegStep2Details({ data, updateData, onNext }: { data: RegistrationFormData; updateData: (d: Partial<RegistrationFormData>) => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const regions = GHANA_REGIONS;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.providerName.trim()) e.providerName = "Provider Name is required.";
    if (!data.region) e.region = "Region is required.";
    if (!data.city.trim()) e.city = "City/Town is required.";
    if (data.ghanaCard && !data.ghanaCardExpiry) e.ghanaCardExpiry = "Expiry date required if card number is provided.";
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext();
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Your Details</h2>
      <p className="text-sm text-[#3d4a3d] mb-6">Tell us a bit about you and where you're based.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Provider / Contact Name</label>
          <input type="text" value={data.providerName} onChange={(e) => { updateData({ providerName: e.target.value }); if (errors.providerName) setErrors({ ...errors, providerName: "" }); }} placeholder="John Doe" className={inputClass(!!errors.providerName)} />
          {errors.providerName && <p className="text-xs text-red-500 mt-1">{errors.providerName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Business Name <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <input type="text" value={data.businessName} onChange={(e) => updateData({ businessName: e.target.value })} placeholder="JD Plumbing" className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Email Address <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <input type="email" value={data.email} onChange={(e) => updateData({ email: e.target.value })} placeholder="you@example.com" className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Region</label>
          <div className="relative">
            <select value={data.region} onChange={(e) => { updateData({ region: e.target.value }); if (errors.region) setErrors({ ...errors, region: "" }); }} className={selectClass(!!errors.region)}>
              <option value="">Select Region...</option>
              {regions.map((r) => <option key={r} value={r}>{r} Region</option>)}
            </select>
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
          </div>
          {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">City / Town</label>
          <input type="text" value={data.city} onChange={(e) => { updateData({ city: e.target.value }); if (errors.city) setErrors({ ...errors, city: "" }); }} placeholder="e.g. Tarkwa" className={inputClass(!!errors.city)} />
          {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Ghana Card Number <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <input type="text" value={data.ghanaCard} onChange={(e) => updateData({ ghanaCard: e.target.value.toUpperCase() })} placeholder="GHA-XXXXXXXXX-X" className={`${inputClass(false)} uppercase`} />
        </div>
        {data.ghanaCard && (
          <div>
            <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Card Expiry <span className="font-normal text-red-500 text-xs">(required)</span></label>
            <input type="date" value={data.ghanaCardExpiry} onChange={(e) => { updateData({ ghanaCardExpiry: e.target.value }); if (errors.ghanaCardExpiry) setErrors({ ...errors, ghanaCardExpiry: "" }); }} className={inputClass(!!errors.ghanaCardExpiry)} />
            {errors.ghanaCardExpiry && <p className="text-xs text-red-500 mt-1">{errors.ghanaCardExpiry}</p>}
          </div>
        )}
      </div>
      <button onClick={validate} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">Continue</button>
    </div>
  );
}

/* ─── Step 3: Services ─── */
function RegStep3Services({ data, updateData, onNext }: { data: RegistrationFormData; updateData: (d: Partial<RegistrationFormData>) => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const availableServices = data.category ? serviceMap[data.category] || [] : [];

  const toggleService = (s: string) => {
    if (data.services.includes(s)) updateData({ services: data.services.filter((x) => x !== s) });
    else updateData({ services: [...data.services, s] });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!data.category) e.category = "Category is required.";
    else if (data.services.length === 0) e.services = "Select at least one service.";
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    onNext();
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Your Services</h2>
      <p className="text-sm text-[#3d4a3d] mb-6">Select your category and the specific services you offer.</p>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Service Category</label>
          <div className="relative">
            <select value={data.category} onChange={(e) => { updateData({ category: e.target.value, services: [] }); if (errors.category) setErrors({ ...errors, category: "" }); }} className={selectClass(!!errors.category)}>
              <option value="">Select a category...</option>
              {Object.keys(serviceMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
          </div>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        {data.category && (
          <div>
            <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Specific Services</label>
            <div className="grid grid-cols-1 gap-2">
              {availableServices.map((s) => {
                const sel = data.services.includes(s);
                return (
                  <div key={s} onClick={() => { toggleService(s); if (errors.services) setErrors({ ...errors, services: "" }); }}
                    className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors text-sm ${sel ? "border-[#006d2f] bg-[#006d2f]/10 text-[#006d2f] font-medium" : "border-[#bccbb9] text-[#161d16] hover:border-[#30CB65]/50"}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${sel ? "border-[#006d2f] bg-[#006d2f]" : "border-[#bccbb9]"}`}>
                      {sel && <Check size={12} className="text-white" />}
                    </div>
                    {s}
                  </div>
                );
              })}
            </div>
            {errors.services && <p className="text-xs text-red-500 mt-1">{errors.services}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Years of Experience <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <input type="number" value={data.experience} onChange={(e) => updateData({ experience: e.target.value })} placeholder="e.g. 5" className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Description <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <textarea value={data.description} onChange={(e) => updateData({ description: e.target.value })} placeholder="Tell clients more about your skills..." rows={3} className={`${inputClass(false)} resize-y`} />
        </div>
      </div>
      <button onClick={validate} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">Continue</button>
    </div>
  );
}

/* ─── Step 4: Rates ─── */
function RegStep4Rates({ data, updateData, onNext }: { data: RegistrationFormData; updateData: (d: Partial<RegistrationFormData>) => void; onNext: () => void }) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    if (!data.availability) { setErrors({ availability: "Select your availability." }); return; }
    onNext();
  };

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Rates & Availability</h2>
      <p className="text-sm text-[#3d4a3d] mb-6">Let clients know when you&apos;re free and how you charge.</p>
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-2">Current Availability</label>
          <div className="grid grid-cols-3 gap-2">
            {["Available", "Busy", "Inactive"].map((s) => (
              <button key={s} onClick={() => { updateData({ availability: s }); if (errors.availability) setErrors({}); }}
                className={`py-3 px-2 border text-center rounded-lg transition-colors text-sm font-medium ${data.availability === s ? "border-[#006d2f] bg-[#006d2f]/10 text-[#006d2f]" : "border-[#bccbb9] text-[#6d7b6c] hover:border-[#30CB65]/50"}`}>
                <div className="text-lg mb-0.5">{s === "Available" ? "✅" : s === "Busy" ? "⏳" : "🛑"}</div>
                {s}
              </button>
            ))}
          </div>
          {errors.availability && <p className="text-xs text-red-500 mt-1">{errors.availability}</p>}
        </div>

        <div
          onClick={() => updateData({ diaspora: !data.diaspora })}
          className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${data.diaspora ? "border-yellow-500 bg-yellow-50/50" : "border-[#bccbb9] hover:border-[#30CB65]/50"}`}>
          <div className={`relative w-10 h-6 shrink-0 rounded-full mt-0.5 transition-colors ${data.diaspora ? "bg-yellow-500" : "bg-[#bccbb9]"}`}>
            <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${data.diaspora ? "translate-x-4" : ""}`} />
          </div>
          <div>
            <span className="block font-semibold text-sm text-[#161d16] mb-0.5">Serves Diaspora Clients</span>
            <span className="text-xs text-[#3d4a3d]">I accept jobs arranged and paid for by Ghanaians living abroad.</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Estimated Price Range <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#6d7b6c]">GHS</span>
              <input type="number" value={data.minPrice} onChange={(e) => updateData({ minPrice: e.target.value })} placeholder="Min" className={`${inputClass(false)} pl-11`} />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#6d7b6c]">GHS</span>
              <input type="number" value={data.maxPrice} onChange={(e) => updateData({ maxPrice: e.target.value })} placeholder="Max" className={`${inputClass(false)} pl-11`} />
            </div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#dce5d9] mt-4">
          <label className="block text-sm font-semibold text-[#161d16] mb-1.5 mt-4">Preferred Payment Method</label>
          <div className="relative">
            <select 
              value={data.preferredPayment}
              onChange={(e) => updateData({ preferredPayment: e.target.value })}
              className={selectClass(false)}
            >
              <option value="">Select method...</option>
              <option value="MTN MoMo">MTN MoMo</option>
              <option value="Vodafone Cash">Vodafone Cash</option>
              <option value="AirtelTigo Money">AirtelTigo Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="Cheque">Cheque</option>
            </select>
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
          </div>
        </div>

        {['MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'].includes(data.preferredPayment) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">MoMo Number</label>
              <input type="tel" value={data.momoNumber} onChange={(e) => updateData({ momoNumber: e.target.value })} placeholder="e.g. 0244123456" className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">MoMo Registered Name <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
              <input type="text" value={data.momoName} onChange={(e) => updateData({ momoName: e.target.value })} placeholder="Name on your account" className={inputClass(false)} />
            </div>
          </div>
        )}

        {data.preferredPayment === 'Bank Transfer' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Bank Name</label>
              <input type="text" value={data.bankName} onChange={(e) => updateData({ bankName: e.target.value })} placeholder="e.g. Ecobank Ghana" className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Account Number</label>
              <input type="text" value={data.accountNumber} onChange={(e) => updateData({ accountNumber: e.target.value })} placeholder="Your account number" className={inputClass(false)} />
            </div>
          </div>
        )}

      </div>
      <button onClick={validate} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">Continue</button>
    </div>
  );
}

/* ─── Step 5: Review & Submit ─── */
function RegStep5Review({ data, onSubmit }: { data: RegistrationFormData; onSubmit: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const payload = {
      'Provider Name': data.providerName,
      'Business Name': data.businessName,
      'Phone / WhatsApp': data.fullPhone,
      'Email': data.email,
      'Ghana Card Number': data.ghanaCard,
      'Ghana Card Expiry Date': data.ghanaCardExpiry || null,
      'Region': data.region,
      'City / Town': data.city,
      'Service Category': data.category,
      'Specific Services': data.services.join(', ') + (data.description ? '\n\n' + data.description : ''),
      'Years of Experience': data.experience ? Number(data.experience) : null,
      'Min Price (GHS)': data.minPrice ? Number(data.minPrice) : null,
      'Max Price (GHS)': data.maxPrice ? Number(data.maxPrice) : null,
      'Price Unit': data.priceUnit,
      'Preferred Payment Method': data.preferredPayment,
      'MoMo Number': data.momoNumber,
      'MoMo Name': data.momoName,
      'Bank Name': data.bankName,
      'Account Number': data.accountNumber,
      'Advance Payment Required': data.advanceRequired === 'Yes',
      'Advance Percentage': data.advanceRequired === 'Yes' ? Number(data.advancePercent) : null,
      'Availability': data.availability,
      'Serves Diaspora Clients': data.diaspora,
      'Date Registered': new Date().toISOString().split('T')[0],
      'Status': 'Pending',
    };
    try {
      await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch { /* proceed anyway */ }
    finally { setIsSubmitting(false); onSubmit(); }
  };

  const ReviewRow = ({ label, value }: { label: string; value: string | undefined | null }) => (
    value ? <div className="flex justify-between text-sm"><span className="text-[#6d7b6c]">{label}:</span><span className="font-medium text-[#161d16] text-right max-w-[60%]">{value}</span></div> : null
  );

  return (
    <div>
      <h2 className="text-[24px] font-bold text-[#006d2f] mb-1">Review Your Listing</h2>
      <p className="text-sm text-[#3d4a3d] mb-6">Check your details before submitting.</p>
      <div className="space-y-4">
        <div className="p-4 bg-[#eef6ea] rounded-lg border border-[#bccbb9]">
          <h4 className="text-xs font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">Contact & Identity</h4>
          <div className="space-y-2">
            <ReviewRow label="Name" value={data.providerName} />
            <ReviewRow label="Business" value={data.businessName} />
            <ReviewRow label="WhatsApp" value={data.fullPhone} />
            <ReviewRow label="Location" value={`${data.city}, ${data.region}`} />
          </div>
        </div>
        <div className="p-4 bg-[#eef6ea] rounded-lg border border-[#bccbb9]">
          <h4 className="text-xs font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">Services</h4>
          <div className="space-y-2">
            <ReviewRow label="Category" value={data.category} />
            <div>
              <span className="text-[#6d7b6c] block mb-1 text-sm">Offerings:</span>
              <div className="flex flex-wrap gap-1.5">
                {data.services.map((s) => (
                  <span key={s} className="bg-white border border-[#bccbb9] px-2 py-0.5 rounded text-xs text-[#161d16]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 bg-[#eef6ea] rounded-lg border border-[#bccbb9]">
          <h4 className="text-xs font-bold text-[#6d7b6c] uppercase tracking-wider mb-3">Rates & Settings</h4>
          <div className="space-y-2">
            <ReviewRow label="Availability" value={data.availability} />
            <ReviewRow label="Diaspora Friendly" value={data.diaspora ? "Yes ✅" : "No"} />
            {(data.minPrice || data.maxPrice) && <ReviewRow label="Price Range" value={`GHS ${data.minPrice || 0} - ${data.maxPrice || '...'}`} />}
          </div>
        </div>
      </div>
      <button onClick={handleSubmit} disabled={isSubmitting} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 disabled:opacity-50 hover:opacity-90 transition-opacity active:scale-[0.98]">
        {isSubmitting ? <Loader2 size={18} className="animate-spin mr-2" /> : null}
        {isSubmitting ? "Submitting..." : "Submit My Listing"}
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EDIT SUB-VIEWS
   ══════════════════════════════════════════════════════════════════════════════ */

function EditPersonalDetails({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    businessName: profile?.businessName || "",
    email: profile?.email || "",
    region: profile?.region || "",
    city: profile?.city || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const stored = JSON.parse(localStorage.getItem("tl_auth_record") || "{}");
      const merged = { ...stored,
         'Provider Name': formData.fullName,
         'Business Name': formData.businessName,
         'Email': formData.email,
         'Region': formData.region,
         'City / Town': formData.city,
         isReturning: true,
         existingRecordId: token
      };
      const updatePayload = { ...merged };
      delete updatePayload.avatarUrl;

      const res = await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Personal Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Full Name</label>
              <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Business Name</label>
              <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Region</label>
              <div className="relative">
                <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className={selectClass(false)}>
                  <option value="">Select region</option>
                  {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">City / Town</label>
              <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClass(false)} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditProfessionalInfo({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    category: profile?.category || "",
    services: Array.isArray(profile?.services) ? profile.services : (typeof profile?.services === 'string' ? profile.services.split(', ') : []),
    experience: profile?.experience || "",
    description: profile?.description || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const availableServices = formData.category ? serviceMap[formData.category] || [] : [];

  const toggleService = (s: string) => {
    if (formData.services.includes(s)) setFormData({ ...formData, services: formData.services.filter((x:string) => x !== s) });
    else setFormData({ ...formData, services: [...formData.services, s] });
  };

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const stored = JSON.parse(localStorage.getItem("tl_auth_record") || "{}");
      const merged = { ...stored,
         'Service Category': formData.category,
         'Specific Services': formData.services.join(', ') + (formData.description ? '\n\n' + formData.description : ''),
         'Years of Experience': formData.experience ? Number(formData.experience) : null,
         isReturning: true,
         existingRecordId: token
      };
      delete merged['Service Categories']; // Clean up the rogue array field if it exists in stored

      const updatePayload = { ...merged };
      delete updatePayload.avatarUrl;

      const res = await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Professional Info</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Service Category</label>
              <div className="relative">
                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, services: [] })} className={selectClass(false)}>
                  <option value="">Select a category...</option>
                  {Object.keys(serviceMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
              </div>
            </div>
            {formData.category && (
              <div>
                <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Specific Services</label>
                <div className="grid grid-cols-1 gap-2">
                  {availableServices.map((s) => {
                    const sel = formData.services.includes(s);
                    return (
                      <div key={s} onClick={() => toggleService(s)}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors text-sm ${sel ? "border-[#006d2f] bg-[#006d2f]/10 text-[#006d2f] font-medium" : "border-[#bccbb9] text-[#161d16]"}`}>
                        <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${sel ? "border-[#006d2f] bg-[#006d2f]" : "border-[#bccbb9]"}`}>
                          {sel && <Check size={12} className="text-white" />}
                        </div>
                        {s}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Years of Experience</label>
              <input type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#3d4a3d] mb-1">Description</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={`${inputClass(false)} resize-y`} />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditRates({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    availability: profile?.availability || "Available",
    diaspora: profile?.diaspora || false,
    minPrice: profile?.minPrice || "",
    maxPrice: profile?.maxPrice || ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const stored = JSON.parse(localStorage.getItem("tl_auth_record") || "{}");
      const merged = { ...stored,
         'Availability': formData.availability,
         'Serves Diaspora Clients': formData.diaspora,
         'Min Price (GHS)': formData.minPrice ? Number(formData.minPrice) : null,
         'Max Price (GHS)': formData.maxPrice ? Number(formData.maxPrice) : null,
         isReturning: true,
         existingRecordId: token
      };
      const updatePayload = { ...merged };
      delete updatePayload.avatarUrl;

      const res = await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Rates & Availability</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-2">Current Availability</label>
              <div className="grid grid-cols-3 gap-2">
                {["Available", "Busy", "Inactive"].map((s) => (
                  <button key={s} onClick={() => setFormData({ ...formData, availability: s })}
                    className={`py-3 px-2 border text-center rounded-lg transition-colors text-sm font-medium ${formData.availability === s ? "border-[#006d2f] bg-[#006d2f]/10 text-[#006d2f]" : "border-[#bccbb9] text-[#6d7b6c]"}`}>
                    <div className="text-lg mb-0.5">{s === "Available" ? "✅" : s === "Busy" ? "⏳" : "🛑"}</div>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div
              onClick={() => setFormData({ ...formData, diaspora: !formData.diaspora })}
              className={`flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-colors ${formData.diaspora ? "border-yellow-500 bg-yellow-50/50" : "border-[#bccbb9]"}`}>
              <div className={`relative w-10 h-6 shrink-0 rounded-full mt-0.5 transition-colors ${formData.diaspora ? "bg-yellow-500" : "bg-[#bccbb9]"}`}>
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform shadow ${formData.diaspora ? "translate-x-4" : ""}`} />
              </div>
              <div>
                <span className="block font-semibold text-sm text-[#161d16] mb-0.5">Serves Diaspora Clients</span>
                <span className="text-xs text-[#3d4a3d]">I accept jobs arranged and paid for by Ghanaians living abroad.</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Estimated Price Range (GHS)</label>
              <div className="flex gap-2">
                <input type="number" value={formData.minPrice} onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })} placeholder="Min" className={inputClass(false)} />
                <input type="number" value={formData.maxPrice} onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })} placeholder="Max" className={inputClass(false)} />
              </div>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

function EditPaymentDetails({ profile, token, onBack, onSuccess }: any) {
  const [formData, setFormData] = useState({
    preferredPayment: profile?.preferredPayment || "",
    momoNumber: profile?.momoNumber || "",
    momoName: profile?.momoName || "",
    bankName: profile?.bankName || "",
    accountNumber: profile?.accountNumber || "",
    advanceRequired: profile?.advanceRequired || "No",
    advancePercent: profile?.advancePercent || "50"
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setIsSaving(true); setError("");
    try {
      const stored = JSON.parse(localStorage.getItem("tl_auth_record") || "{}");
      const merged = { ...stored,
         'Preferred Payment Method': formData.preferredPayment,
         'MoMo Number': formData.momoNumber,
         'MoMo Name': formData.momoName,
         'Bank Name': formData.bankName,
         'Account Number': formData.accountNumber,
         'Advance Payment Required': formData.advanceRequired === 'Yes',
         'Advance Percentage': formData.advanceRequired === 'Yes' ? Number(formData.advancePercent) : null,
         isReturning: true,
         existingRecordId: token
      };
      const updatePayload = { ...merged };
      delete updatePayload.avatarUrl;

      const res = await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload)
      });
      if (res.ok) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError("Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="min-h-screen bg-[#EEF6F9]">
      <MobileRegHeader onBack={onBack} />
      <div className="px-6 pt-6 pb-24">
        <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_24px_rgba(0,64,79,0.06)]">
          <h2 className="text-[20px] font-bold text-[#006d2f] mb-6">Payment Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Preferred Payment Method</label>
              <div className="relative">
                <select value={formData.preferredPayment} onChange={(e) => setFormData({ ...formData, preferredPayment: e.target.value })} className={selectClass(false)}>
                  <option value="">Select method...</option>
                  <option value="MTN MoMo">MTN MoMo</option>
                  <option value="Vodafone Cash">Vodafone Cash</option>
                  <option value="AirtelTigo Money">AirtelTigo Money</option>
                  <option value="Bank Transfer">Bank Transfer</option>
                  <option value="Cash">Cash</option>
                  <option value="Cheque">Cheque</option>
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
              </div>
            </div>

            {['MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'].includes(formData.preferredPayment) && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-sm font-semibold text-[#161d16] mb-1.5">MoMo Number</label>
                  <input type="tel" value={formData.momoNumber} onChange={(e) => setFormData({ ...formData, momoNumber: e.target.value })} placeholder="e.g. 0244123456" className={inputClass(false)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#161d16] mb-1.5">MoMo Registered Name <span className="font-normal text-[#6d7b6c] text-xs">(optional)</span></label>
                  <input type="text" value={formData.momoName} onChange={(e) => setFormData({ ...formData, momoName: e.target.value })} placeholder="Name on your account" className={inputClass(false)} />
                </div>
              </div>
            )}

            {formData.preferredPayment === 'Bank Transfer' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div>
                  <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Bank Name</label>
                  <input type="text" value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} placeholder="e.g. Ecobank Ghana" className={inputClass(false)} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Account Number</label>
                  <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} placeholder="Your account number" className={inputClass(false)} />
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#dce5d9] mt-4">
              <label className="block text-sm font-semibold text-[#161d16] mb-2 mt-2">Advance Payment Required?</label>
              <div className="flex gap-3">
                {['Yes', 'No'].map(opt => (
                  <button key={opt} onClick={() => setFormData({ ...formData, advanceRequired: opt })}
                    className={`flex-1 py-3 border text-center rounded-lg transition-colors text-sm font-medium ${formData.advanceRequired === opt ? "border-[#006d2f] bg-[#006d2f]/10 text-[#006d2f]" : "border-[#bccbb9] text-[#6d7b6c]"}`}>
                    {opt}
                  </button>
                ))}
              </div>
              
              {formData.advanceRequired === 'Yes' && (
                <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                  <label className="block text-sm font-semibold text-[#161d16] mb-1.5">Required Percentage (%)</label>
                  <div className="relative">
                    <select value={formData.advancePercent} onChange={(e) => setFormData({ ...formData, advancePercent: e.target.value })} className={selectClass(false)}>
                      <option value="25">25%</option>
                      <option value="50">50%</option>
                      <option value="75">75%</option>
                      <option value="100">100%</option>
                    </select>
                    <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#3d4a3d] pointer-events-none" />
                  </div>
                </div>
              )}
            </div>

          </div>
          {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
          <button onClick={handleSave} disabled={isSaving} className="w-full h-12 bg-[#30CB65] text-white rounded-[12px] font-semibold text-sm flex items-center justify-center mt-8 hover:opacity-90 transition-opacity active:scale-[0.98]">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Payment Details"}
          </button>
        </div>
      </div>
    </div>
  );
}

function AvatarSelectionModal({ token, currentAvatar, onClose, onSuccess }: any) {
  const [selected, setSelected] = useState(currentAvatar || "");
  const [isSaving, setIsSaving] = useState(false);

  const avatars = [
    "/avatars/avatar-1.png",
    "/avatars/avatar-2.png",
    "/avatars/avatar-3.png"
  ];

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const stored = JSON.parse(localStorage.getItem("tl_auth_record") || "{}");
      const merged = { ...stored, avatarUrl: selected };
      localStorage.setItem("tl_auth_record", JSON.stringify(merged));
      window.dispatchEvent(new Event("tl_profile_updated"));
      onSuccess();
    } catch { }
    finally { setIsSaving(false); }
  };

  return (
    <div className="fixed inset-0 bg-[#00404F]/50 backdrop-blur-sm z-50 flex flex-col justify-end">
      <div className="bg-white rounded-t-[32px] w-full p-6 pb-20 animate-in slide-in-from-bottom duration-300">
        <div className="w-12 h-1.5 bg-[#dce5d9] rounded-full mx-auto mb-6" />
        <h2 className="text-[20px] font-bold text-[#006d2f] mb-6 text-center">Choose an Avatar</h2>
        
        <div className="flex justify-center gap-4 mb-8">
          {avatars.map((url, idx) => (
            <button key={idx} onClick={() => setSelected(url)}
              className={`w-24 h-24 rounded-full overflow-hidden border-4 transition-all ${selected === url ? "border-[#30CB65] shadow-lg scale-110" : "border-transparent opacity-70 hover:opacity-100"}`}>
              <img src={url} alt={`Avatar ${idx+1}`} className="w-full h-full object-cover bg-[#f3fcef]" />
            </button>
          ))}
        </div>

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 h-12 rounded-[12px] bg-[#eef6ea] text-[#006d2f] font-semibold text-sm">Cancel</button>
          <button onClick={handleSave} disabled={isSaving} className="flex-1 h-12 rounded-[12px] bg-[#30CB65] text-white font-semibold text-sm flex items-center justify-center">
            {isSaving ? <Loader2 size={18} className="animate-spin mr-2" /> : "Save Avatar"}
          </button>
        </div>
      </div>
    </div>
  );
}
