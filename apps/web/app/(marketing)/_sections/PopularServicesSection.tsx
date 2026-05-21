"use client";

import React from "react";
import { SectionHeading, ServiceCard, AppButton } from "@townlink/ui";

export function PopularServicesSection() {
  const services = [
    {
      title: "Home Services",
      desc: "Plumbers, electricians, carpenters, cleaners, and landscapers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      title: "Construction & Engineering",
      desc: "Builders, architects, surveyors, and structural engineers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
        </svg>
      )
    },
    {
      title: "Beauty & Personal Care",
      desc: "Hair stylists, makeup artists, massage therapists, and nail technicians.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="6.5"/>
        </svg>
      )
    },
    {
      title: "Tech & Digital",
      desc: "Web developers, phone repairs, and CCTV installers.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      )
    },
    {
      title: "Transport & Logistics",
      desc: "Drivers, delivery couriers, moving services, and towing.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      )
    },
    {
      title: "Events & Catering",
      desc: "Caterers, event planners, DJs, photographers, and rentals.",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
  ];

  return (
    <section className="px-6 py-24 bg-brand-dark relative">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16">
          <SectionHeading
            title="Popular Services"
            subtitle="Find the right professional for any job, from home repairs to event planning."
            dark
          />
          <a href="/providers" className="shrink-0">
            <AppButton variant="inverted" className="w-full">
              View All Categories
            </AppButton>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <a key={idx} href={`/providers?category=${encodeURIComponent(service.title)}`} className="block group">
              <ServiceCard
                title={service.title}
                description={service.desc}
                icon={service.icon}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
