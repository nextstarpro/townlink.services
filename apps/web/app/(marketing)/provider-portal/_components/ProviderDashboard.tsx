"use client";

import React, { useState, useEffect } from "react";
import { User, Briefcase, Clock, LogOut, ChevronRight, Check, ChevronDown, Loader2, ArrowLeft } from "lucide-react";
import { AppButton } from "@townlink/ui";

const API_BASE = "/.netlify/functions/";

const GHANA_REGIONS = [
  "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern",
  "Greater Accra", "North East", "Northern", "Oti", "Savannah",
  "Upper East", "Upper West", "Volta", "Western", "Western North"
];

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

function parseServicesAndDescription(rawText: string | undefined | null) {
  if (!rawText) return { services: [], description: "" };
  const parts = rawText.split('\n\n');
  const servicesStr = parts[0] || "";
  const description = parts.slice(1).join('\n\n') || "";
  const services = servicesStr.split(', ').map(s => s.trim()).filter(Boolean);
  return { services, description };
}

type Props = {
  token: string;
  onLogout: () => void;
};

export function ProviderDashboard({ token, onLogout }: Props) {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeEditView, setActiveEditView] = useState<'personal' | 'professional' | 'rates' | 'payments' | null>(null);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const stored = localStorage.getItem("tl_auth_record");
      let record = stored ? JSON.parse(stored) : null;
      
      if (record) {
        setProfileData(record);
        setIsLoading(false);
      }
      
      const res = await fetch(`${API_BASE}get-provider?id=${token}`);
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && data.provider) {
        const p = data.provider;
        const mergedRecord = {
          ...record,
          'Provider Name': p['Provider Name'] || record?.['Provider Name'] || "",
          'Business Name': p['Business Name'] || record?.['Business Name'] || "",
          'Phone / WhatsApp': p['Phone / WhatsApp'] || record?.['Phone / WhatsApp'] || "",
          'Email': p['Email'] || record?.['Email'] || "",
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
        setProfileData(mergedRecord);
        localStorage.setItem("tl_auth_record", JSON.stringify(mergedRecord));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const setProfileData = (record: any) => {
    setProfile({
      id: token,
      fullName: record['Provider Name'],
      businessName: record['Business Name'],
      email: record['Email'] || "",
      phone: record['Phone / WhatsApp'] || "",
      region: record['Region'],
      city: record['City / Town'],
      category: record['Service Category'],
      services: parseServicesAndDescription(record['Specific Services']).services,
      experience: record['Years of Experience'],
      minPrice: record['Min Price (GHS)'],
      maxPrice: record['Max Price (GHS)'],
      priceUnit: record['Price Unit'],
      availability: record['Availability'],
      diaspora: record['Serves Diaspora Clients'],
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
  };

  useEffect(() => {
    loadProfile();
  }, [token]);

  if (isLoading && !profile) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  const initials = ((profile?.fullName as string) || "TL").split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  if (activeEditView === 'personal') {
    return <EditPersonalDetails profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(); }} />;
  }
  if (activeEditView === 'professional') {
    return <EditProfessionalInfo profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(); }} />;
  }
  if (activeEditView === 'rates') {
    return <EditRates profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(); }} />;
  }
  if (activeEditView === 'payments') {
    return <EditPaymentDetails profile={profile} token={token} onBack={() => setActiveEditView(null)} onSuccess={() => { setActiveEditView(null); loadProfile(); }} />;
  }

  return (
    <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,64,79,0.06)] p-6 md:p-10 max-w-4xl mx-auto">
      {/* Profile header */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 pb-8 border-b border-border-light">
        <div className="w-24 h-24 rounded-full overflow-hidden shadow-sm bg-brand-dark text-white flex items-center justify-center text-3xl font-bold shrink-0">
          {profile?.avatarUrl ? <img src={profile.avatarUrl} alt="Avatar" className="w-full h-full object-cover" /> : initials}
        </div>
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-text-heavy flex items-center justify-center md:justify-start gap-2 mb-2">
            {profile?.fullName || "Provider"}
            {profile?.verified && (
              <Check className="w-6 h-6 text-brand-primary bg-[#eaf4ee] rounded-full p-1" />
            )}
          </h2>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-lg text-text-muted font-medium mb-3">
            <span>{profile?.businessName ? `${profile.businessName} • ` : ''}{profile?.phone}</span>
            {token && (
              <>
                <span className="hidden md:inline text-border-input">•</span>
                <a 
                  href={`/provider/${token}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-brand-primary hover:underline font-semibold text-base"
                >
                  View Public Profile
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Edit Menu Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <button onClick={() => setActiveEditView('personal')} className="group bg-bg-light rounded-[24px] p-6 flex items-center justify-between text-left transition-all hover:bg-[#e0eff4] active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-brand-primary shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <User size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-heavy mb-1">Personal Details</h3>
              <p className="text-sm text-text-muted">Name, Business, Email, Location</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-border-input" />
        </button>

        <button onClick={() => setActiveEditView('professional')} className="group bg-bg-light rounded-[24px] p-6 flex items-center justify-between text-left transition-all hover:bg-[#e0eff4] active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-brand-primary shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <Briefcase size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-heavy mb-1">Professional Info</h3>
              <p className="text-sm text-text-muted">Services, Experience, Description</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-border-input" />
        </button>

        <button onClick={() => setActiveEditView('rates')} className="group bg-bg-light rounded-[24px] p-6 flex items-center justify-between text-left transition-all hover:bg-[#e0eff4] active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-brand-primary shadow-sm flex items-center justify-center group-hover:scale-105 transition-transform">
              <Clock size={28} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-heavy mb-1">Rates & Availability</h3>
              <p className="text-sm text-text-muted">Status, Pricing, Diaspora</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-border-input" />
        </button>

        <button onClick={() => setActiveEditView('payments')} className="group bg-bg-light rounded-[24px] p-6 flex items-center justify-between text-left transition-all hover:bg-[#e0eff4] active:scale-[0.98]">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white text-brand-primary shadow-sm flex items-center justify-center text-2xl group-hover:scale-105 transition-transform">
              💳
            </div>
            <div>
              <h3 className="text-lg font-bold text-text-heavy mb-1">Payment Details</h3>
              <p className="text-sm text-text-muted">MoMo, Bank Account, Terms</p>
            </div>
          </div>
          <ChevronRight size={24} className="text-border-input" />
        </button>
      </div>

      <div className="flex justify-center border-t border-border-light pt-8">
        <button onClick={onLogout} className="text-sm font-semibold text-red-500 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <LogOut size={18} /> Log Out
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// EDIT VIEWS
// -----------------------------------------------------------------------------

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-[10px] text-[16px] text-[#161d16] transition-all focus:outline-none ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-border-input focus:border-brand-primary bg-white"
  }`;

const selectClass = (hasError: boolean) =>
  `w-full px-4 py-3 border rounded-[10px] text-[16px] text-[#161d16] appearance-none transition-all focus:outline-none ${
    hasError
      ? "border-red-500 focus:border-red-500"
      : "border-border-input focus:border-brand-primary bg-white"
  }`;

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
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError(data?.error || "Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,64,79,0.06)] p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b border-border-light pb-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-light transition-colors text-brand-primary">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-text-heavy">Personal Details</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Full Name</label>
          <input type="text" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Business Name</label>
          <input type="text" value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass(false)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Region</label>
            <div className="relative">
              <select value={formData.region} onChange={(e) => setFormData({ ...formData, region: e.target.value })} className={selectClass(false)}>
                <option value="">Select region</option>
                {GHANA_REGIONS.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">City / Town</label>
            <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={inputClass(false)} />
          </div>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      <div className="mt-8">
        <AppButton onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Changes"}
        </AppButton>
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
      delete merged['Service Categories'];

      const updatePayload = { ...merged };
      delete updatePayload.avatarUrl;

      const res = await fetch(`${API_BASE}submit-provider`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload)
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError(data?.error || "Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,64,79,0.06)] p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b border-border-light pb-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-light transition-colors text-brand-primary">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-text-heavy">Professional Info</h2>
      </div>
      
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Service Category</label>
          <div className="relative">
            <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value, services: [] })} className={selectClass(false)}>
              <option value="">Select a category...</option>
              {Object.keys(serviceMap).map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>
        {formData.category && (
          <div>
            <label className="block text-sm font-semibold text-text-primary mb-1.5">Specific Services</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {availableServices.map((s) => {
                const sel = formData.services.includes(s);
                return (
                  <div key={s} onClick={() => toggleService(s)}
                    className={`flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-colors text-sm ${sel ? "border-brand-primary bg-[#eaf4ee] text-brand-primary font-semibold" : "border-border-input text-text-primary hover:border-brand-primary/50"}`}>
                    <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${sel ? "border-brand-primary bg-brand-primary" : "border-border-input bg-white"}`}>
                      {sel && <Check size={14} className="text-white" />}
                    </div>
                    {s}
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Years of Experience</label>
          <input type="number" value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className={inputClass(false)} />
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Description</label>
          <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={4} className={`${inputClass(false)} resize-y`} />
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      <div className="mt-8">
        <AppButton onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Changes"}
        </AppButton>
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
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError(data?.error || "Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,64,79,0.06)] p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b border-border-light pb-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-light transition-colors text-brand-primary">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-text-heavy">Rates & Availability</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">Current Availability</label>
          <div className="grid grid-cols-3 gap-3">
            {["Available", "Busy", "Inactive"].map((s) => (
              <button key={s} onClick={() => setFormData({ ...formData, availability: s })}
                className={`py-4 px-2 border text-center rounded-xl transition-all text-sm font-semibold ${formData.availability === s ? "border-brand-primary bg-[#eaf4ee] text-brand-primary shadow-sm" : "border-border-input text-text-muted hover:border-brand-primary/50 hover:bg-bg-light"}`}>
                <div className="text-2xl mb-1">{s === "Available" ? "✅" : s === "Busy" ? "⏳" : "🛑"}</div>
                {s}
              </button>
            ))}
          </div>
        </div>
        <div
          onClick={() => setFormData({ ...formData, diaspora: !formData.diaspora })}
          className={`flex items-start gap-4 p-5 border rounded-2xl cursor-pointer transition-all ${formData.diaspora ? "border-brand-primary bg-[#eaf4ee] shadow-sm" : "border-border-input hover:border-brand-primary/50"}`}>
          <div className={`relative w-12 h-7 shrink-0 rounded-full mt-0.5 transition-colors ${formData.diaspora ? "bg-brand-primary" : "bg-border-input"}`}>
            <div className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${formData.diaspora ? "translate-x-5" : ""}`} />
          </div>
          <div>
            <span className="block font-bold text-base text-text-heavy mb-1">Serves Diaspora Clients</span>
            <span className="text-sm text-text-muted">I accept jobs arranged and paid for by Ghanaians living abroad.</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Estimated Price Range (GHS)</label>
          <div className="flex gap-4">
            <input type="number" value={formData.minPrice} onChange={(e) => setFormData({ ...formData, minPrice: e.target.value })} placeholder="Min" className={inputClass(false)} />
            <input type="number" value={formData.maxPrice} onChange={(e) => setFormData({ ...formData, maxPrice: e.target.value })} placeholder="Max" className={inputClass(false)} />
          </div>
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      <div className="mt-8">
        <AppButton onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Changes"}
        </AppButton>
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
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success) {
        localStorage.setItem("tl_auth_record", JSON.stringify(merged));
        onSuccess();
      } else setError(data?.error || "Failed to save changes.");
    } catch { setError("Network error."); }
    finally { setIsSaving(false); }
  };

  return (
    <div className="bg-white rounded-[32px] shadow-[0_4px_24px_rgba(0,64,79,0.06)] p-6 md:p-10 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8 border-b border-border-light pb-4">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-bg-light transition-colors text-brand-primary">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold text-text-heavy">Payment Details</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-1.5">Preferred Payment Method</label>
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
            <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
          </div>
        </div>

        {['MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'].includes(formData.preferredPayment) && (
          <div className="space-y-5 p-5 bg-bg-light rounded-2xl border border-border-light">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">MoMo Number</label>
              <input type="tel" value={formData.momoNumber} onChange={(e) => setFormData({ ...formData, momoNumber: e.target.value })} placeholder="e.g. 0244123456" className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">MoMo Registered Name</label>
              <input type="text" value={formData.momoName} onChange={(e) => setFormData({ ...formData, momoName: e.target.value })} placeholder="Name on your account" className={inputClass(false)} />
            </div>
          </div>
        )}

        {formData.preferredPayment === 'Bank Transfer' && (
          <div className="space-y-5 p-5 bg-bg-light rounded-2xl border border-border-light">
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Bank Name</label>
              <input type="text" value={formData.bankName} onChange={(e) => setFormData({ ...formData, bankName: e.target.value })} placeholder="e.g. Ecobank Ghana" className={inputClass(false)} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Account Number</label>
              <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} placeholder="Your account number" className={inputClass(false)} />
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-border-light mt-6">
          <label className="block text-sm font-semibold text-text-primary mb-3">Advance Payment Required?</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map(opt => (
              <button key={opt} onClick={() => setFormData({ ...formData, advanceRequired: opt })}
                className={`flex-1 py-3 border text-center rounded-xl transition-colors text-sm font-semibold ${formData.advanceRequired === opt ? "border-brand-primary bg-[#eaf4ee] text-brand-primary shadow-sm" : "border-border-input text-text-muted hover:border-brand-primary/50 hover:bg-bg-light"}`}>
                {opt}
              </button>
            ))}
          </div>
          
          {formData.advanceRequired === 'Yes' && (
            <div className="mt-5">
              <label className="block text-sm font-semibold text-text-primary mb-1.5">Required Percentage (%)</label>
              <div className="relative">
                <select value={formData.advancePercent} onChange={(e) => setFormData({ ...formData, advancePercent: e.target.value })} className={selectClass(false)}>
                  <option value="25">25%</option>
                  <option value="50">50%</option>
                  <option value="75">75%</option>
                  <option value="100">100%</option>
                </select>
                <ChevronDown size={20} className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {error && <p className="text-red-500 text-sm mt-4 text-center">{error}</p>}
      <div className="mt-8">
        <AppButton onClick={handleSave} disabled={isSaving} className="w-full">
          {isSaving ? "Saving..." : "Save Payment Details"}
        </AppButton>
      </div>
    </div>
  );
}
