"use client";

import React, { useState } from "react";
import { RegistrationFormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";

type Props = {
  data: RegistrationFormData;
  updateData: (d: Partial<RegistrationFormData>) => void;
  onNext: () => void;
};

export function Step1Phone({ data, updateData, onNext }: Props) {
  const [error, setError] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    if (data.phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    setError("");
    const fullPhone = data.countryCode + data.phone;
    updateData({ fullPhone });
    setIsSending(true);
    
    try {
      const res = await fetch('/.netlify/functions/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone })
      });
      const result = await res.json().catch(() => ({}));
      setIsSending(false);
      if (result.success || res.ok) {
        if (result.token) updateData({ verifyToken: result.token });
        onNext();
      } else {
        setError(result.error || "Failed to send code.");
      }
    } catch (e) {
      setIsSending(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Verify Your WhatsApp</h2>
      <p className="text-sm text-text-muted mb-6 leading-relaxed">
        We'll send a code to verify your number. This will be your primary contact for clients.
      </p>

      <div className="mb-6">
        <label className="block text-sm font-medium text-text-heavy mb-1.5">WhatsApp Number</label>
        <div className="flex gap-2">
          <select 
            value={data.countryCode}
            onChange={(e) => updateData({ countryCode: e.target.value })}
            className="w-24 shrink-0 px-3.5 py-2.5 border border-border-light rounded-lg font-sans text-sm outline-none transition-colors focus:border-brand-primary bg-white text-text-heavy"
          >
            <option value="+233">+233</option>
            <option value="+234">+234</option>
            <option value="+44">+44</option>
            <option value="+1">+1</option>
          </select>
          <input 
            type="tel" 
            value={data.phone}
            onChange={(e) => {
              updateData({ phone: e.target.value.replace(/\D/g, '') });
              if (error) setError("");
            }}
            placeholder="24 123 4567"
            className={`flex-1 px-3.5 py-2.5 border rounded-lg font-sans text-sm outline-none transition-colors ${error ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
          />
        </div>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>

      <AppButton onClick={handleSend} className="w-full" disabled={isSending}>
        {isSending ? "Sending..." : "Send Verification Code"}
      </AppButton>
    </div>
  );
}
