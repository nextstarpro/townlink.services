"use client";

import React from "react";
import { SectionHeading, AppButton } from "@townlink/ui";

export function MidPhoneCTA() {
  return (
    <section className="px-6 py-24 bg-[var(--color-bg-light)]">
      <div className="max-w-7xl mx-auto bg-[var(--color-brand-dark)] rounded-[40px] overflow-hidden flex flex-col lg:flex-row items-center">
        <div className="flex-1 p-12 lg:p-20 text-center lg:text-left">
          <SectionHeading
            title="Manage services from your pocket"
            subtitle="Download the TownLink app to message providers, track progress, and manage your bookings from anywhere in the world."
            dark
            className="mb-10"
          />
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <AppButton variant="primary" size="lg">
              Download for iOS
            </AppButton>
            <AppButton variant="inverted" size="lg">
              Download for Android
            </AppButton>
          </div>
        </div>
        <div className="flex-1 relative w-full h-[400px] lg:h-[600px] bg-gradient-to-br from-[var(--color-brand-primary)] to-[var(--color-brand-secondary)]/50 hidden md:block">
          {/* Mockup visualization */}
          <div className="absolute -bottom-20 right-10 lg:right-20 w-[280px] h-[580px] bg-white rounded-[40px] border-[8px] border-[var(--color-text-heavy)] shadow-2xl overflow-hidden flex flex-col">
            <div className="h-20 bg-[var(--color-brand-dark)] flex items-end px-6 pb-4">
              <div className="text-white font-bold text-lg">TownLink</div>
            </div>
            <div className="p-4 flex-1 bg-[var(--color-bg-light)]">
              <div className="bg-white p-4 rounded-2xl shadow-sm mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div>
                    <div className="h-4 w-24 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 w-16 bg-gray-100 rounded"></div>
                  </div>
                </div>
                <div className="h-3 w-full bg-gray-100 rounded mb-2"></div>
                <div className="h-3 w-4/5 bg-gray-100 rounded"></div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm">
                <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>
                <div className="h-10 w-full bg-[var(--color-brand-primary)] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
