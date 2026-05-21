"use client";

import React, { useState } from "react";
import { RegistrationFormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";

type Props = {
  data: RegistrationFormData;
  onSubmit: () => void;
  onBack: () => void;
};

export function Step5Review({ data, onSubmit, onBack }: Props) {
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
      'Advance Payment Required': data.advanceRequired === 'Yes',
      'Advance Percentage': data.advanceRequired === 'Yes' ? Number(data.advancePercent) : null,
      'Availability': data.availability,
      'Serves Diaspora Clients': data.diaspora,
      'Date Registered': new Date().toISOString().split('T')[0],
      'Status': 'Pending'
    };

    try {
      const res = await fetch('/.netlify/functions/submit-provider', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      setIsSubmitting(false);
      // Proceed to success screen regardless of local endpoint status
      onSubmit(); 
    } catch (e) {
      setIsSubmitting(false);
      onSubmit();
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Review Your Listing</h2>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        Check your details before submitting your profile for verification.
      </p>

      <div className="space-y-4">
        
        {/* Contact Block */}
        <div className="p-4 bg-bg-light rounded-lg border border-border-light">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Contact & Identity</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Name:</span>
              <span className="font-medium text-text-heavy">{data.providerName}</span>
            </div>
            {data.businessName && (
              <div className="flex justify-between">
                <span className="text-text-muted">Business:</span>
                <span className="font-medium text-text-heavy">{data.businessName}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-text-muted">WhatsApp:</span>
              <span className="font-medium text-text-heavy">{data.fullPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Location:</span>
              <span className="font-medium text-text-heavy">{data.city}, {data.region}</span>
            </div>
          </div>
        </div>

        {/* Services Block */}
        <div className="p-4 bg-bg-light rounded-lg border border-border-light">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Services</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Category:</span>
              <span className="font-medium text-text-heavy">{data.category}</span>
            </div>
            <div>
              <span className="text-text-muted block mb-1">Offerings:</span>
              <div className="flex flex-wrap gap-1.5">
                {data.services.map(s => (
                  <span key={s} className="bg-white border border-border-light px-2 py-0.5 rounded text-xs text-text-heavy">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Rates Block */}
        <div className="p-4 bg-bg-light rounded-lg border border-border-light">
          <h4 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3">Rates & Settings</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Availability:</span>
              <span className="font-medium text-text-heavy">{data.availability}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Diaspora Friendly:</span>
              <span className="font-medium text-text-heavy">{data.diaspora ? "Yes ✅" : "No"}</span>
            </div>
            {(data.minPrice || data.maxPrice) && (
              <div className="flex justify-between">
                <span className="text-text-muted">Price Range:</span>
                <span className="font-medium text-text-heavy">GHS {data.minPrice || 0} - {data.maxPrice || '...' }</span>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="mt-8 flex gap-3">
        <button 
          onClick={onBack}
          disabled={isSubmitting}
          className="px-6 py-3 border border-border-light rounded-lg text-sm font-semibold text-text-muted hover:text-text-heavy transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <AppButton onClick={handleSubmit} className="flex-1" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit My Listing"}
        </AppButton>
      </div>
    </div>
  );
}
