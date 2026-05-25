"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, MessageCircle, User } from "lucide-react";

const slides = [
  {
    icon: Search,
    title: "Find Trusted Pros",
    subtitle:
      "Browse verified service providers across all 16 regions of Ghana",
    gradient: "from-[#30CB65]/20 via-[#30CBB8]/30 to-[#3B82F6]/20",
    bgImage: "/images/onboarding/hire.svg",
  },
  {
    icon: MessageCircle,
    title: "Chat on WhatsApp",
    subtitle:
      "Connect directly with TownLink to find the perfect provider for your needs",
    gradient: "from-[#25D366]/20 via-[#30CBB8]/30 to-[#30CB65]/20",
    bgImage: "/images/onboarding/messages.svg",
  },
  {
    icon: User,
    title: "Your Profile, Your Way",
    subtitle:
      "Register and manage your profile to get matched with the best services",
    gradient: "from-[#3B82F6]/20 via-[#30CB65]/30 to-[#30CBB8]/20",
    bgImage: "/images/onboarding/resume.svg",
  },
];

export default function MobileOnboarding() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!carouselRef.current) return;
    const scrollPos = carouselRef.current.scrollLeft;
    const slideWidth = carouselRef.current.offsetWidth;
    const newSlide = Math.round(scrollPos / slideWidth);
    setCurrentSlide(newSlide);
  }, []);

  const goToSlide = (index: number) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollTo({
      left: index * carouselRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      goToSlide(currentSlide + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    localStorage.setItem("tl_onboarded", "true");
    router.replace("/providers");
  };

  return (
    <div
      className="fixed inset-0 flex flex-col z-50"
      style={{
        background: "linear-gradient(180deg, #00404F 0%, #002D33 100%)",
      }}
    >
      {/* Skip button */}
      <button
        onClick={handleComplete}
        className="absolute top-12 right-6 text-white/60 text-sm font-semibold z-20 hover:text-white/90 transition-opacity"
      >
        Skip
      </button>

      {/* Carousel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex-1 flex overflow-x-auto snap-x snap-mandatory hide-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {slides.map((slide, i) => {
          const Icon = slide.icon;
          return (
            <div
              key={i}
              className="min-w-full h-full snap-start flex flex-col items-center justify-center px-6 text-center"
            >
              {/* Illustration area */}
              <div
                className={`w-full h-64 rounded-[32px] overflow-hidden mb-10 relative flex justify-center items-center bg-gradient-to-br ${slide.gradient}`}
              >
                <img 
                  src={slide.bgImage} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-contain p-8 opacity-40 z-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002D33] to-transparent z-[5]" />
                <Icon
                  size={64}
                  className="text-white z-10 opacity-90 relative drop-shadow-md"
                  strokeWidth={1.5}
                />
              </div>

              <h2 className="text-[28px] font-bold text-white leading-tight mb-2">
                {slide.title}
              </h2>
              <p className="text-[18px] text-white/80 leading-relaxed max-w-[280px]">
                {slide.subtitle}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bottom area: indicators + button */}
      <div className="px-6 pb-10 pt-2 flex flex-col items-center bg-gradient-to-t from-[#002D33] to-transparent">
        {/* Dot indicators */}
        <div className="flex gap-2 mb-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goToSlide(i)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentSlide
                  ? "bg-[#30CB65] w-6"
                  : "bg-white/30"
              }`}
            />
          ))}
        </div>

        {/* Action button */}
        <button
          onClick={handleNext}
          className="w-full h-12 bg-[#30CB65] text-white font-semibold text-sm rounded-[12px] flex items-center justify-center hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(0,64,79,0.06)]"
        >
          {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        </button>
      </div>
    </div>
  );
}
