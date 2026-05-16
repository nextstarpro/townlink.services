"use client";

import React from "react";

interface AppCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AppCard({ children, className = "" }: AppCardProps) {
  return <div className={`app-card ${className}`}>{children}</div>;
}
