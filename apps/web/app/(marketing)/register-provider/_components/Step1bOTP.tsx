"use client";

import React, { useState, useEffect } from "react";
import { FormData } from "./RegistrationWizard";
import { AppButton } from "@townlink/ui";

type Props = {
  data: FormData;
  onNext: () => void;
  onResend: () => void;
};

export function Step1bOTP({ data, onNext, onResend }: Props) {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [countdown]);

  const handleVerify = async () => {
    if (otp.length < 4) {
      setError("Please enter a valid 4-digit code.");
      return;
    }
    setError("");
    setIsVerifying(true);
    
    try {
      const res = await fetch('/.netlify/functions/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: data.verifyToken, otp })
      });
      const result = await res.json().catch(() => ({}));
      setIsVerifying(false);
      if (result.success || res.ok) {
        onNext();
      } else {
        setError(result.error || "Invalid code. Please try again.");
      }
    } catch (e) {
      setIsVerifying(false);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300">
      <h2 className="font-serif text-2xl text-brand-primary mb-1">Enter the Code</h2>
      <p className="text-sm text-text-muted mb-4 leading-relaxed">
        We sent a 4-digit code to <strong>{data.fullPhone}</strong>.
      </p>

      <div className="bg-[#f5e6c8]/40 p-3 rounded-lg text-sm text-text-heavy mb-6 border border-[#c9902a]/30">
        Sent to <strong className="text-brand-primary">{data.fullPhone}</strong>
      </div>

      <div className="mb-4">
        <input 
          type="text" 
          maxLength={4}
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, ''));
            if (error) setError("");
          }}
          placeholder="----"
          className={`w-full text-center tracking-[0.5em] text-2xl px-3.5 py-4 border rounded-lg font-sans outline-none transition-colors ${error ? "border-red-500 focus:border-red-500" : "border-border-light focus:border-brand-primary bg-white text-text-heavy"}`}
        />
        {error && <p className="text-xs text-red-500 mt-1 text-center">{error}</p>}
      </div>

      <div className="text-center text-sm mb-8">
        {countdown > 0 ? (
          <span className="text-text-muted">Resend code in {countdown}s</span>
        ) : (
          <button onClick={onResend} className="text-brand-primary underline hover:text-brand-secondary transition-colors">
            Resend Code
          </button>
        )}
      </div>

      <AppButton onClick={handleVerify} className="w-full" disabled={isVerifying}>
        {isVerifying ? "Verifying..." : "Confirm & Continue"}
      </AppButton>
    </div>
  );
}
