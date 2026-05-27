"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { RegistrationWizard } from "../../register-provider/_components/RegistrationWizard";
import { ProviderDashboard } from "./ProviderDashboard";

export function ProviderPortal() {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("tl_auth_token");
    setToken(storedToken);
    setIsLoading(false);
  }, []);

  const handleLogin = (newToken: string, record?: any) => {
    localStorage.setItem("tl_auth_token", newToken);
    if (record) {
      localStorage.setItem("tl_auth_record", JSON.stringify(record));
    }
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("tl_auth_token");
    localStorage.removeItem("tl_auth_record");
    setToken(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (token) {
    return <ProviderDashboard token={token} onLogout={handleLogout} />;
  }

  return <RegistrationWizard onLogin={handleLogin} />;
}
