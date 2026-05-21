"use client";

import React, { useState } from "react";
import { RegistrationFormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";

type Props = {
  data: RegistrationFormData;
  updateData: (d: Partial<RegistrationFormData>) => void;
  onNext: () => void;
};

const regions = [
  "Greater Accra", "Ashanti", "Western", "Central", "Eastern", "Volta", "Northern", 
  "Upper East", "Upper West", "Bono", "Bono East", "Ahafo", "Savannah", "North East", 
  "Oti", "Western North"
];

export function Step2Details({ data, updateData, onNext }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.providerName.trim()) newErrors.providerName = "Provider Name is required.";
    if (!data.region) newErrors.region = "Region is required.";
    if (!data.city.trim()) newErrors.city = "City/Town is required.";
    
    if (data.ghanaCard && !data.ghanaCardExpiry) {
      newErrors.ghanaCardExpiry = "Expiry date required if card number is provided.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Your Details</h2>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        Tell us a bit about you and where you're based.
      </p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Provider / Contact Name
          </label>
          <input 
            type="text" 
            value={data.providerName}
            onChange={(e) => {
              updateData({ providerName: e.target.value });
              if (errors.providerName) setErrors({ ...errors, providerName: "" });
            }}
            placeholder="John Doe"
            className={`w-full px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${errors.providerName ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
          />
          {errors.providerName && <p className="text-xs text-red-500 mt-1">{errors.providerName}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Business Name <span className="font-normal text-text-muted text-xs">(optional)</span>
          </label>
          <input 
            type="text" 
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            placeholder="JD Plumbing"
            className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Email Address <span className="font-normal text-text-muted text-xs">(optional)</span>
          </label>
          <input 
            type="email" 
            value={data.email}
            onChange={(e) => updateData({ email: e.target.value })}
            placeholder="you@example.com"
            className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-heavy mb-1.5">
              Region
            </label>
            <select 
              value={data.region}
              onChange={(e) => {
                updateData({ region: e.target.value });
                if (errors.region) setErrors({ ...errors, region: "" });
              }}
              className={`w-full px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${errors.region ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
            >
              <option value="">Select Region...</option>
              {regions.map(r => <option key={r} value={r}>{r} Region</option>)}
            </select>
            {errors.region && <p className="text-xs text-red-500 mt-1">{errors.region}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-text-heavy mb-1.5">
              City / Town
            </label>
            <input 
              type="text" 
              value={data.city}
              onChange={(e) => {
                updateData({ city: e.target.value });
                if (errors.city) setErrors({ ...errors, city: "" });
              }}
              placeholder="e.g. Tarkwa"
              className={`w-full px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${errors.city ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
            />
            {errors.city && <p className="text-xs text-red-500 mt-1">{errors.city}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-text-heavy mb-1.5">
              Ghana Card Number <span className="font-normal text-text-muted text-xs">(optional)</span>
            </label>
            <input 
              type="text" 
              value={data.ghanaCard}
              onChange={(e) => updateData({ ghanaCard: e.target.value.toUpperCase() })}
              placeholder="GHA-XXXXXXXXX-X"
              className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy uppercase"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-heavy mb-1.5">
              Card Expiry <span className={`font-normal text-xs ${data.ghanaCard ? 'text-red-500 font-medium' : 'text-text-muted'}`}>{data.ghanaCard ? '(required)' : '(optional)'}</span>
            </label>
            <input 
              type="date" 
              value={data.ghanaCardExpiry}
              onChange={(e) => {
                updateData({ ghanaCardExpiry: e.target.value });
                if (errors.ghanaCardExpiry) setErrors({ ...errors, ghanaCardExpiry: "" });
              }}
              className={`w-full px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${errors.ghanaCardExpiry ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
            />
            {errors.ghanaCardExpiry && <p className="text-xs text-red-500 mt-1">{errors.ghanaCardExpiry}</p>}
          </div>
        </div>
      </div>

      <div className="mt-8">
        <AppButton onClick={validateAndNext} className="w-full">
          Continue
        </AppButton>
      </div>
    </div>
  );
}
