"use client";

import React from "react";

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "light" | "dark" | "gradient";
  className?: string;
}

export function Badge({ children, variant = "light", className = "" }: BadgeProps) {
  const variants = {
    light: "bg-white/10 border border-white/20 text-white backdrop-blur-md",
    dark: "bg-brand-primary/10 text-brand-primary font-medium",
    gradient: "bg-gradient-to-br from-brand-secondary to-brand-tertiary text-white shadow-md",
  };

  return (
    <span
      className={`inline-flex items-center justify-center px-4 py-1.5 rounded-full text-sm ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
