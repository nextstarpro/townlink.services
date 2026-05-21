"use client";

import React from "react";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function ServiceCard({
  title,
  description,
  icon,
  onClick,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-card p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300 cursor-pointer group flex flex-col h-full ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        {icon && (
          <div className="w-12 h-12 rounded-full bg-bg-light text-brand-dark flex items-center justify-center shrink-0">
            {icon}
          </div>
        )}
        <div className="w-12 h-12 rounded-full border border-border-light flex items-center justify-center shrink-0 text-brand-dark group-hover:border-brand-tertiary group-hover:text-brand-tertiary transition-colors ml-auto">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
      </div>
      <h3 className="text-2xl font-bold text-text-heavy mb-3">
        {title}
      </h3>
      <p className="text-text-muted text-base leading-relaxed flex-grow">
        {description}
      </p>
    </div>
  );
}
