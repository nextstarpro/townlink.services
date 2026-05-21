"use client";

import React from "react";

interface AppInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function AppInput({
  label,
  error,
  hint,
  className = "",
  id,
  ...props
}: AppInputProps) {
  const inputId = id ?? label?.toLowerCase().replace(/\s/g, "-");
  
  const baseInputClasses =
    "w-full px-4 py-3 bg-white border rounded-input text-text-primary transition-colors focus:outline-none focus:ring-2";
  const borderClass = error
    ? "border-status-error focus:ring-status-error"
    : "border-border-input focus:ring-brand-tertiary";

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-text-heavy">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${baseInputClasses} ${borderClass}`}
        {...props}
      />
      {hint && !error && <p className="text-sm text-text-caption">{hint}</p>}
      {error && <p className="text-sm font-medium text-status-error">{error}</p>}
    </div>
  );
}
