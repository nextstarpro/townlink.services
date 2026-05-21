"use client";

import React from "react";

export interface AppButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "inverted" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export function AppButton({
  variant = "primary",
  size = "md",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: AppButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-semibold rounded-btn transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-tertiary disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-brand-primary text-white hover:bg-[#28A652]",
    secondary: "bg-transparent text-brand-dark border border-brand-dark hover:bg-bg-light",
    inverted: "bg-white text-brand-dark hover:bg-bg-light",
    ghost: "bg-transparent text-brand-primary hover:bg-brand-primary/10",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-7 py-4 text-base",
    lg: "px-8 py-5 text-lg",
  };

  const classes = [baseClasses, variants[variant], sizes[size], className]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : null}
      {children}
    </button>
  );
}
