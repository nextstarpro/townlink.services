"use client";

const categoryIcons: Record<string, string> = {
  "All": "✨",
  "Home Services": "🏠",
  "Beauty & Personal Care": "💅",
  "Professional Services": "💼",
  "Events & Catering": "🍽️",
  "Transport & Logistics": "🚗",
  "Education & Training": "📚",
  "Health & Medical": "🏥",
  "Tech & Digital": "💻",
  "Automotive": "🔧",
  "Construction & Engineering": "🏗️",
  "Tailoring & Fashion": "🪡",
  "Financial Services": "💳",
  "Jobs & Recruitment": "👔",
  "Security Services": "🔒",
  "Other": "📦",
};

/* Short display names for narrow mobile cards */
const shortNames: Record<string, string> = {
  "Beauty & Personal Care": "Beauty",
  "Professional Services": "Professional",
  "Events & Catering": "Events",
  "Transport & Logistics": "Transport",
  "Education & Training": "Education",
  "Health & Medical": "Health",
  "Tech & Digital": "Tech",
  "Construction & Engineering": "Construction",
  "Tailoring & Fashion": "Tailoring",
  "Financial Services": "Finance",
  "Jobs & Recruitment": "Jobs",
  "Security Services": "Security",
};

interface CategoryPillsProps {
  categories: string[];
  active: string;
  onSelect: (category: string) => void;
}

export function CategoryPills({ categories, active, onSelect }: CategoryPillsProps) {
  return (
    <div className="mb-4">
      <p className="text-[11px] font-bold text-[#6d7b6c] uppercase tracking-wider px-6 mb-2">
        Browse by category
      </p>
      <div className="px-6 overflow-x-auto hide-scrollbar flex gap-2.5 pb-1">
        {categories.map((cat) => {
          const isActive = cat === active;
          const icon = categoryIcons[cat] || "📋";
          const label = shortNames[cat] || cat;
          return (
            <button
              key={cat}
              onClick={() => onSelect(cat)}
              className={`flex-shrink-0 w-[80px] flex flex-col items-center gap-1 py-3 px-2 rounded-xl border-[1.5px] text-center transition-all active:scale-95 ${
                isActive
                  ? "border-[#006d2f] bg-[#eef6ea]"
                  : "border-[#dce5d9] bg-white hover:border-[#006d2f] hover:translate-y-[-2px]"
              }`}
            >
              <span className="text-[24px] leading-none">{icon}</span>
              <span
                className={`text-[11px] font-semibold leading-tight ${
                  isActive ? "text-[#006d2f]" : "text-[#161d16]"
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
