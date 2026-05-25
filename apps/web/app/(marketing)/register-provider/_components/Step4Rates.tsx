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

        {/* Payment Details */}
        <div className="pt-2 border-t border-border-light mt-4">
          <label className="block text-sm font-medium text-text-heavy mb-1.5 mt-4">
            Preferred Payment Method
          </label>
          <select 
            value={data.preferredPayment}
            onChange={(e) => updateData({ preferredPayment: e.target.value })}
            className="w-full px-3.5 py-3 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
          >
            <option value="">Select method...</option>
            <option value="MTN MoMo">MTN MoMo</option>
            <option value="Vodafone Cash">Vodafone Cash</option>
            <option value="AirtelTigo Money">AirtelTigo Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="Cheque">Cheque</option>
          </select>
          {errors.preferredPayment && <p className="text-xs text-red-500 mt-1">{errors.preferredPayment}</p>}
        </div>

        {['MTN MoMo', 'Vodafone Cash', 'AirtelTigo Money'].includes(data.preferredPayment) && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-text-heavy mb-1.5">
                MoMo Number
              </label>
              <input 
                type="tel" 
                value={data.momoNumber}
                onChange={(e) => updateData({ momoNumber: e.target.value })}
                placeholder="e.g. 0244123456"
                className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-heavy mb-1.5">
                MoMo Registered Name <span className="font-normal text-text-muted text-xs">(optional)</span>
              </label>
              <input 
                type="text" 
                value={data.momoName}
                onChange={(e) => updateData({ momoName: e.target.value })}
                placeholder="Name on your MoMo account"
                className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
          </div>
        )}

        {data.preferredPayment === 'Bank Transfer' && (
          <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
            <div>
              <label className="block text-sm font-medium text-text-heavy mb-1.5">
                Bank Name
              </label>
              <input 
                type="text" 
                value={data.bankName}
                onChange={(e) => updateData({ bankName: e.target.value })}
                placeholder="e.g. Ecobank Ghana"
                className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-heavy mb-1.5">
                Account Number
              </label>
              <input 
                type="text" 
                value={data.accountNumber}
                onChange={(e) => updateData({ accountNumber: e.target.value })}
                placeholder="Your account number"
                className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
              />
            </div>
          </div>
        )}

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
