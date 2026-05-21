"use client";

import React from "react";

export interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  dark?: boolean;
  badge?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  dark = false,
  badge,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "text-center items-center" : "text-left items-start";
  const titleColor = dark ? "text-white" : "text-text-heavy";
  const subtitleColor = dark ? "text-bg-light" : "text-text-muted";

  return (
    <div className={`flex flex-col gap-4 ${alignClass} ${className}`}>
      {badge && <div className="mb-2">{badge}</div>}
      <h2 className={`font-bold text-3xl md:text-5xl tracking-tight leading-tight ${titleColor}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-base md:text-lg max-w-2xl leading-relaxed ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
