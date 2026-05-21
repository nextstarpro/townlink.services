"use client";

import React from "react";
import { SectionHeading, FaqAccordion } from "@townlink/ui";
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
      </div>
    </section>
  );
}
