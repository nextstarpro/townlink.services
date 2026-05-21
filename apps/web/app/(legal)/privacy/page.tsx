import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | TownLink Services",
  description: "Privacy policy and data handling practices for TownLink Services.",
};

export default function PrivacyPage() {
  return (
    <>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-2">Privacy Policy</h1>
      <div className="text-sm text-text-muted mb-10 pb-6 border-b border-border-light">TownLink Global Limited · services.townlinkglobal.com · Version 4.0 — Effective: May 20, 2026</div>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">1. Introduction</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink Global Limited is committed to protecting the privacy of all users of TownLink Services. This Privacy Policy explains what personal data we collect, how we use it, and your rights in relation to it. TownLink operates in accordance with Ghana's Data Protection Act, 2012 (Act 843).
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">2. Data We Collect</h2>
      <h3 className="text-lg font-semibold text-brand-dark mt-6 mb-2">From Service Providers</h3>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>Full name and business name</li>
        <li>WhatsApp number and email address</li>
        <li>Ghana region and city or town</li>
        <li>Ghana Card number and photograph, or equivalent government-issued ID for non-Ghanaians</li>
        <li>Service category, services offered and years of experience</li>
        <li>Pricing information and payment preferences</li>
        <li>Mobile Money number and registered account name</li>
      </ul>
      <h3 className="text-lg font-semibold text-brand-dark mt-6 mb-2">From Clients</h3>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>Name and WhatsApp number</li>
        <li>Service requirements and location in Ghana</li>
        <li>Payment records associated with transactions</li>
        <li>Mobile Money confirmation screenshots submitted via WhatsApp as proof of payment for deposits and site assessment fees</li>
      </ul>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">3. How We Use Your Data</h2>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>To verify provider identity and issue verified status</li>
        <li>To match clients with appropriate service providers</li>
        <li>To process and track payments between clients and providers</li>
        <li>To share limited contact details between matched parties after job confirmation and payment</li>
        <li>To communicate job notifications and updates via WhatsApp</li>
        <li>To resolve disputes</li>
        <li>To comply with Ghanaian law</li>
      </ul>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">4. Identification Document Data</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Ghana Card numbers, photographs and equivalent identification documents are collected solely for verification. This data is stored securely, accessible only to authorised TownLink staff, never shared with third parties, and deleted within 30 days of a provider's deactivation or removal, unless required for an active dispute or by law.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">5. Data Sharing</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink does not sell personal data. We share data only with matched clients and providers (first name and WhatsApp only, after job confirmation), with platform service providers (Airtable, Netlify, mNotify), and where required by Ghanaian law.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">6. Data Security</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        We use access-controlled databases, HTTPS encryption, signed token OTP verification, and restricted staff access to protect your data. No system is completely secure and we cannot guarantee absolute security.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">7. Data Retention</h2>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>Active provider listings: retained while listing is active</li>
        <li>Identification documents: deleted within 30 days of deactivation</li>
        <li>Inactive providers (non-ID data): retained 12 months then deleted</li>
        <li>Transaction records: retained 5 years</li>
        <li>Client contact data: retained 12 months after last interaction</li>
      </ul>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">8. Your Rights</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Under Ghana's Data Protection Act 843, you have the right to access, correct, delete and receive a copy of your personal data, and to object to its processing. Contact us via WhatsApp at +233 27 487 0179 or info@townlinkglobal.com. We respond within 10 business days.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">9. International Users</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink applies Ghanaian data protection standards under Act 843. If you are in the EU or UK, Ghana's data protection framework governs the processing of your data.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">10. Cookies</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        We use minimal functional cookies only. No advertising cookies. No data sold to advertisers.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">11. WhatsApp Communication</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Messages sent via WhatsApp are subject to WhatsApp's own privacy policy in addition to this policy. Backup contact: info@townlinkglobal.com.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">12. Changes to This Policy</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Changes will be communicated via WhatsApp with at least 14 days notice. Continued use constitutes acceptance.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">13. Contact</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink Global Limited · WhatsApp: +233 27 487 0179 · Email: info@townlinkglobal.com
      </p>
    </>
  );
}
