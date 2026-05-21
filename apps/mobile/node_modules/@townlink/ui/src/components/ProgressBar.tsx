"use client";

import React from "react";
import { motion } from "framer-motion";

export interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  label?: string;
  className?: string;
}

export function ProgressBar({ currentStep, totalSteps, label, className = "" }: ProgressBarProps) {
  const percentage = Math.min(100, Math.max(0, (currentStep / totalSteps) * 100));

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center mb-2 text-sm font-medium text-text-muted">
          <span>{label}</span>
          <span>Step {currentStep} of {totalSteps}</span>
        </div>
      )}
      <div className="w-full h-2 bg-bg-light rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}
