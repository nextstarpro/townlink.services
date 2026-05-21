"use client";

import React from "react";

export interface StatItem {
  value: string;
  label: string;
}

export interface StatsBarProps {
  items: StatItem[];
  className?: string;
}

export function StatsBar({ items, className = "" }: StatsBarProps) {
  return (
    <div
      className={`bg-brand-dark text-white rounded-card p-8 md:p-12 w-full max-w-6xl mx-auto shadow-card flex flex-wrap md:flex-nowrap items-center justify-between gap-8 md:gap-4 ${className}`}
    >
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <div className="flex flex-col items-center md:items-start text-center md:text-left flex-1 min-w-[120px]">
            <span className="text-4xl md:text-5xl font-bold text-brand-primary mb-2">
              {item.value}
            </span>
            <span className="text-sm md:text-base text-bg-light font-medium">
              {item.label}
            </span>
          </div>
          {index < items.length - 1 && (
            <div className="hidden md:block w-px h-16 bg-white/20 mx-4" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
