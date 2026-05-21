"use client";

import React from "react";

export interface AppCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AppCard({ children, className = "" }: AppCardProps) {
  return (
    <div
      className={`bg-white rounded-card p-10 shadow-card transition-shadow duration-300 ${className}`}
    >
      {children}
    </div>
  );
}
