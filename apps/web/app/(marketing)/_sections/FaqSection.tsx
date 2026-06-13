"use client";

import React from "react";
import Link from "next/link";
import { SectionHeading, FaqAccordion, AppButton } from "@townlink/ui";
import { FAQ_DATA } from "@townlink/core";

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-24 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about TownLink Services."
          align="center"
          className="mb-16"
        />
        
        <FaqAccordion items={FAQ_DATA} />

        {/* Provider FAQ CTA */}
        <div className="mt-14 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 bg-white rounded-2xl border border-[var(--color-border-light)] px-7 py-7 sm:px-9 sm:py-8 shadow-[0_2px_16px_rgba(0,64,79,0.04)]">
            {/* Icon */}
            <div className="shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: "rgba(201,168,76,0.10)" }}>
              <svg className="w-6 h-6" style={{ color: "#C9A84C" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>

            {/* Text */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-bold text-lg text-text-heavy mb-1">
                Are you a service provider?
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Learn about fees, how jobs work, payouts, and everything you need to get started on TownLink.
              </p>
            </div>

            {/* Button */}
            <Link href="/provider-faq" className="shrink-0">
              <AppButton variant="secondary" size="sm">
                Provider FAQ →
              </AppButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
