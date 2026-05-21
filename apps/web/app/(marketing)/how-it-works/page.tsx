import React from 'react';
import { HowItWorksHero } from './_components/HowItWorksHero';
import { StepsBreakdown } from './_components/StepsBreakdown';
import { AudienceTargeting } from './_components/AudienceTargeting';
import { FinalCTASection } from '../_sections/FinalCTASection';

export const metadata = {
  title: "How It Works | TownLink Services",
  description: "Learn how TownLink connects local clients and the diaspora with verified professionals across Ghana in 4 simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col">
      <HowItWorksHero />
      <StepsBreakdown />
      <AudienceTargeting />
      <FinalCTASection />
    </div>
  );
}
