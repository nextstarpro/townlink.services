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
  return (
    <div className={`app-field ${error ? "app-field--error" : ""} ${className}`}>
      {label && (
        <label htmlFor={inputId} className="app-field__label">
          {label}
        </label>
      )}
      <input id={inputId} className="app-field__input" {...props} />
      {hint && !error && <p className="app-field__hint">{hint}</p>}
      {error && <p className="app-field__error">{error}</p>}
    </div>
  );
}
