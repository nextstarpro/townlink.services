"use client";

import React, { useState } from "react";
import { Step1Phone } from "./Step1Phone";
import { Step1bOTP } from "./Step1bOTP";
import { Step2Details } from "./Step2Details";
import { Step3Services } from "./Step3Services";
import { Step4Rates } from "./Step4Rates";
import { Step5Review } from "./Step5Review";
import { SuccessState } from "./SuccessState";

export type FormData = {
  // Step 1
  countryCode: string;
  fullPhone: string;
  verifyToken: string;
  // Step 2
  providerName: string;
  businessName: string;
  email: string;
  ghanaCard: string;
  ghanaCardExpiry: string;
  region: string;
  city: string;
  // Step 3
  category: string;
  services: string[];
  description: string;
  experience: string;
  // Step 4
  availability: string;
  diaspora: boolean;
  minPrice: string;
  maxPrice: string;
  priceUnit: string;
  preferredPayment: string;
  momoNumber: string;
  momoName: string;
  advanceRequired: string;
  advancePercent: string;
};

const initialFormData: FormData = {
  countryCode: "+233", phone: "", fullPhone: "", verifyToken: "",
  providerName: "", businessName: "", email: "", ghanaCard: "", ghanaCardExpiry: "", region: "", city: "",
  category: "", services: [], description: "", experience: "",
  availability: "", diaspora: false, minPrice: "", maxPrice: "", priceUnit: "per job", preferredPayment: "", momoNumber: "", momoName: "", advanceRequired: "", advancePercent: "50"
};

const stepMeta = [
  { step: 1, label: "Verify your number", pct: 20 },
  { step: 1.5, label: "Verify your number", pct: 20 },
  { step: 2, label: "Your details", pct: 40 },
  { step: 3, label: "Your services", pct: 60 },
  { step: 4, label: "Rates & availability", pct: 80 },
  { step: 5, label: "Review & submit", pct: 100 },
];

export function RegistrationWizard() {
  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const currentMeta = stepMeta.find(m => m.step === step) || stepMeta[0];

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
        <SuccessState />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1.5 bg-border-light w-full">
        <div 
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary transition-all duration-500 ease-in-out"
          style={{ width: `${currentMeta.pct}%` }}
        />
      </div>

      {/* Step Indicator */}
      <div className="px-6 pt-5 pb-2 flex items-center justify-between">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          {currentMeta.label}
        </span>
        <span className="text-xs font-medium text-text-muted">
          Step {Math.min(step === 1.5 ? 2 : step, 5)} of 5
        </span>
      </div>

      {/* Step Content Area */}
      <div className="p-6 pt-2">
        {step === 1 && <Step1Phone data={formData} updateData={updateFormData} onNext={() => setStep(1.5)} />}
        {step === 1.5 && <Step1bOTP data={formData} onNext={() => setStep(2)} onResend={() => setStep(1)} />}
        {step === 2 && <Step2Details data={formData} updateData={updateFormData} onNext={() => setStep(3)} />}
        {step === 3 && <Step3Services data={formData} updateData={updateFormData} onNext={() => setStep(4)} onBack={() => setStep(2)} />}
        {step === 4 && <Step4Rates data={formData} updateData={updateFormData} onNext={() => setStep(5)} onBack={() => setStep(3)} />}
        {step === 5 && <Step5Review data={formData} onSubmit={() => setIsSubmitted(true)} onBack={() => setStep(4)} />}
      </div>
    </div>
  );
}
