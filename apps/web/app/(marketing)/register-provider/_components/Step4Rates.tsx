"use client";

import React, { useState } from "react";
import { RegistrationFormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";

type Props = {
  data: RegistrationFormData;
  updateData: (d: Partial<RegistrationFormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function Step4Rates({ data, updateData, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.availability) newErrors.availability = "Select your current availability.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Rates & Availability</h2>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        Let clients know when you're free and how you charge.
      </p>

      <div className="space-y-5">
        
        {/* Availability Grid */}
        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Current Availability
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Available', 'Busy', 'Inactive'].map(status => (
              <div 
                key={status}
                onClick={() => {
                  updateData({ availability: status });
                  if (errors.availability) setErrors({ ...errors, availability: "" });
                }}
                className={`py-2.5 px-2 border text-center rounded-lg cursor-pointer transition-colors text-sm font-medium ${data.availability === status ? 'border-brand-primary bg-brand-secondary/10 text-brand-primary' : 'border-border-light text-text-muted hover:border-brand-secondary/50 hover:text-brand-primary'}`}
              >
                {status === 'Available' && <div className="text-lg mb-0.5">✅</div>}
                {status === 'Busy' && <div className="text-lg mb-0.5">⏳</div>}
                {status === 'Inactive' && <div className="text-lg mb-0.5">🛑</div>}
                {status}
              </div>
            ))}
          </div>
          {errors.availability && <p className="text-xs text-red-500 mt-1">{errors.availability}</p>}
        </div>

        {/* Diaspora Toggle */}
        <div 
          onClick={() => updateData({ diaspora: !data.diaspora })}
          className={`flex items-start gap-3 p-3.5 border rounded-xl cursor-pointer transition-colors ${data.diaspora ? 'border-yellow-500 bg-yellow-50/50' : 'border-border-light hover:border-brand-secondary/50'}`}
        >
          <div className={`relative w-10 h-5.5 shrink-0 rounded-full mt-0.5 transition-colors ${data.diaspora ? 'bg-yellow-500' : 'bg-border-light'}`}>
            <div className={`absolute top-0.5 left-0.5 w-4.5 h-4.5 bg-white rounded-full transition-transform ${data.diaspora ? 'translate-x-4.5' : ''}`} />
          </div>
          <div>
            <span className="block font-medium text-sm text-text-heavy mb-0.5">Serves Diaspora Clients</span>
            <span className="text-xs text-text-muted">I accept jobs arranged and paid for by Ghanaians living abroad for their family/projects back home.</span>
          </div>
        </div>

        {/* Price Row */}
        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Estimated Price Range <span className="font-normal text-text-muted text-xs">(optional)</span>
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-text-muted">GHS</span>
              <input 
                type="number" 
                value={data.minPrice}
                onChange={(e) => updateData({ minPrice: e.target.value })}
                placeholder="Min"
                className="w-full pl-11 pr-3 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-text-muted">GHS</span>
              <input 
                type="number" 
                value={data.maxPrice}
                onChange={(e) => updateData({ maxPrice: e.target.value })}
                placeholder="Max"
                className="w-full pl-11 pr-3 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex gap-3">
        <button 
          onClick={onBack}
          className="px-6 py-3 border border-border-light rounded-lg text-sm font-semibold text-text-muted hover:text-text-heavy transition-colors"
        >
          Back
        </button>
        <AppButton onClick={validateAndNext} className="flex-1">
          Continue
        </AppButton>
      </div>
    </div>
  );
}
