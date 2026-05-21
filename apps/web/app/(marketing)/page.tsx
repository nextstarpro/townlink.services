import { HeroSection } from "./_sections/HeroSection";
import { StatsSection } from "./_sections/StatsSection";
import { HowItWorksSection } from "./_sections/HowItWorksSection";
import { PopularServicesSection } from "./_sections/PopularServicesSection";
import { MidVideoCTA } from "./_sections/MidVideoCTA";
import { MidPhoneCTA } from "./_sections/MidPhoneCTA";
import { DiasporaSection } from "./_sections/DiasporaSection";
import { FaqSection } from "./_sections/FaqSection";
import { FinalCTASection } from "./_sections/FinalCTASection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <StatsSection />
      <HowItWorksSection />
      <PopularServicesSection />
      <MidVideoCTA />
      <MidPhoneCTA />
      <DiasporaSection />
      <FaqSection />
      <FinalCTASection />
    </div>
  );
}
