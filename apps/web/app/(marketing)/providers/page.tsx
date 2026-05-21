import React, { Suspense } from 'react';
import { ProvidersDirectory } from './_components/ProvidersDirectory';

export const metadata = {
  title: "Find Verified Service Providers in Ghana | TownLink Services",
  description: "Browse and filter verified local service providers across all 16 regions of Ghana. Find plumbers, electricians, caterers, nurses, tech experts and more. Book via WhatsApp instantly.",
};

export default function ProvidersPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-bg-white flex items-center justify-center font-bold text-brand-dark">Loading directory...</div>}>
      <ProvidersDirectory />
    </Suspense>
  );
}
