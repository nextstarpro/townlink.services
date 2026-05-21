"use client";

import React, { useState } from "react";
import { FormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";
import { serviceMap, ServiceCategory } from "../_data/serviceMap";

type Props = {
  data: FormData;
  updateData: (d: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
};

export function Step3Services({ data, updateData, onNext, onBack }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const availableServices = data.category ? serviceMap[data.category as ServiceCategory] || [] : [];

  const toggleService = (service: string) => {
    if (data.services.includes(service)) {
      updateData({ services: data.services.filter(s => s !== service) });
    } else {
      updateData({ services: [...data.services, service] });
    }
  };

  const validateAndNext = () => {
    const newErrors: Record<string, string> = {};
    if (!data.category) newErrors.category = "Category is required.";
    else if (data.services.length === 0) newErrors.services = "Select at least one service.";
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onNext();
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Your Services</h2>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        Select your category and the specific services you offer.
      </p>

      <div className="space-y-4">
        {/* Category & Services */}
        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Service Category
          </label>
          <select 
            value={data.category}
            onChange={(e) => {
              updateData({ category: e.target.value, services: [] });
              if (errors.category) setErrors({ ...errors, category: "" });
            }}
            className={`w-full px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${errors.category ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
          >
            <option value="">Select a category...</option>
            {Object.keys(serviceMap).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
        </div>

        {data.category && (
          <div className="animate-in fade-in duration-200">
            <label className="block text-sm font-medium text-text-heavy mb-1.5">
              Specific Services
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {availableServices.map(service => {
                const isSelected = data.services.includes(service);
                return (
                  <div 
                    key={service}
                    onClick={() => {
                      toggleService(service);
                      if (errors.services) setErrors({ ...errors, services: "" });
                    }}
                    className={`flex items-center gap-2 p-2.5 border rounded-lg cursor-pointer transition-colors text-sm ${isSelected ? 'border-brand-primary bg-brand-secondary/10 text-brand-primary font-medium' : 'border-border-light hover:border-brand-secondary/50 text-text-primary'}`}
                  >
                    <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'border-brand-primary bg-brand-primary' : 'border-border-light'}`}>
                      {isSelected && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    {service}
                  </div>
                );
              })}
            </div>
            {errors.services && <p className="text-xs text-red-500 mt-1">{errors.services}</p>}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Years of Experience <span className="font-normal text-text-muted text-xs">(optional)</span>
          </label>
          <input 
            type="number" 
            value={data.experience}
            onChange={(e) => updateData({ experience: e.target.value })}
            placeholder="e.g. 5"
            className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-heavy mb-1.5">
            Description <span className="font-normal text-text-muted text-xs">(optional)</span>
          </label>
          <textarea 
            value={data.description}
            onChange={(e) => updateData({ description: e.target.value })}
            placeholder="Tell clients more about your skills and what you specialize in..."
            rows={3}
            className="w-full px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy resize-y"
          />
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
