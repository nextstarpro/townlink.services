"use client";

import React from "react";
import { SectionHeading, AppButton } from "@townlink/ui";

export function HowItWorksSection() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp us",
      desc: "Message our team on WhatsApp with details of the service you need.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
      )
    },
    {
      num: 2,
      title: "We find a match",
      desc: "We connect you with a verified, local provider who fits your needs.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
        </svg>
      )
    },
    {
      num: 3,
      title: "Get it done",
      desc: "The provider completes the job. You pay them directly.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      )
    },
  ];

  return (
    <section id="how-it-works" className="px-6 py-24 bg-[var(--color-bg-white)]">
      <div className="max-w-7xl mx-auto bg-[var(--color-brand-dark)] rounded-[40px] p-10 md:p-16 lg:p-24 shadow-2xl relative overflow-hidden">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[var(--color-brand-secondary)] rounded-full blur-[100px] opacity-20"></div>

        <SectionHeading
          title="How TownLink Services Works"
          subtitle="A simple, secure way to find the help you need in Ghana."
          dark
          align="center"
          className="mb-20 relative z-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 relative z-10 gap-y-12 md:gap-y-0 md:divide-x divide-white/10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-4 md:px-8 lg:px-12">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mb-6 relative">
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-[var(--color-brand-primary)] text-white font-bold rounded-full flex items-center justify-center text-sm">
                  {step.num}
                </div>
                <div className="text-[var(--color-brand-primary)]">
                  {step.icon}
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-[var(--color-bg-light)] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-20 relative z-10">
          <a href="/providers">
            <AppButton variant="primary" size="lg" className="w-full sm:w-auto">Find a Provider Now</AppButton>
          </a>
          <a href="/how-it-works">
            <AppButton variant="secondary" size="lg" className="w-full sm:w-auto border-white/20 text-white hover:bg-white/10 hover:border-white">
              Learn More
            </AppButton>
          </a>
        </div>
      </div>
    </section>
  );
}
