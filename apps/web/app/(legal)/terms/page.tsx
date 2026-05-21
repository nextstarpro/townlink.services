import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | TownLink Services",
  description: "Terms and conditions for using TownLink Services.",
};

export default function TermsPage() {
  return (
    <>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-2">Terms of Service</h1>
      <div className="text-sm text-text-muted mb-10 pb-6 border-b border-border-light">TownLink Global Limited · services.townlinkglobal.com · Version 5.0 — Effective: May 20, 2026</div>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">1. Introduction</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        These Terms of Service govern your use of TownLink Services, operated by TownLink Global Limited, a company registered in Ghana. By accessing or using the platform — whether as a service provider or as a client — you agree to be bound by these terms.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink Services operates as a coordination platform connecting clients with verified local service providers across all 16 regions of Ghana. TownLink Global Limited is an intermediary and is not a party to any service agreement between clients and providers.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">2. Definitions</h2>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>"Platform" means the TownLink Services website at services.townlinkglobal.com and any associated WhatsApp-based communication channels.</li>
        <li>"Provider" means any individual or business registered on the platform to offer services.</li>
        <li>"Client" means any individual or organisation using the platform to find or engage a service provider.</li>
        <li>"TownLink" means TownLink Global Limited and its authorised representatives.</li>
        <li>"Coordination Fee" means the fee charged by TownLink for facilitating a transaction between a client and a provider.</li>
        <li>"Agreed Job Value" means the total amount the client agrees to pay the Provider for the service, excluding reimbursable expenses unless explicitly agreed otherwise.</li>
        <li>"Connected" means the first direct communication between a client and a provider facilitated by TownLink, typically via WhatsApp introduction.</li>
      </ul>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">3. Platform Role and Limitation of Liability</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink Services acts solely as a coordination platform. We facilitate connections between clients and providers but we are not responsible for the quality, safety, legality or completion of any service performed by a provider.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink does not employ service providers. All providers are independent professionals. Any service agreement is between the client and the provider.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        To the extent permitted by Ghanaian law, TownLink's liability for direct damages shall not exceed the coordination fee paid for the specific transaction. Nothing excludes liability for fraud, death, or personal injury caused by TownLink's own negligence.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">4. Coordination Fees</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink charges a coordination fee on all transactions processed through the platform:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-4">
        <li>All service categories: 15% of the Agreed Job Value</li>
        <li>Jobs & Recruitment category: 25% of the Agreed Job Value</li>
      </ul>
      <p className="text-text-muted leading-relaxed mb-6">
        Fees are non-refundable once a job has been confirmed and the parties have been Connected, unless the provider cancels before any work has begun and TownLink determines a full or partial refund is fair to the client. TownLink may also grant a partial refund in exceptional circumstances at its sole discretion.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">5. Payment Terms</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        All payments must be made to TownLink Global's designated Mobile Money account before the parties are Connected. Upon confirmation of job completion, TownLink will remit the provider's share within 48 hours of client confirmation, provided no dispute has been raised.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink accepts payments via MTN MoMo, Vodafone Cash and AirtelTigo Money.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        <strong>Site Assessment Fees.</strong> For jobs requiring an on-site assessment before a final quote can be provided, TownLink will collect a fixed Site Assessment Fee from the client before dispatching a provider. The applicable fee is determined by job complexity:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-4">
        <li>GHS 80 — Basic assessment (minor fault diagnosis, small residential jobs)</li>
        <li>GHS 120 — Mid-level assessment (fitting, flooring, event scoping, network setup)</li>
        <li>GHS 200 — Complex assessment (full installations, structural or renovation quotes)</li>
        <li>GHS 250 — Commercial or structural assessment (commercial premises, industrial work, scaffolding, large-scale roofing)</li>
      </ul>
      <p className="text-text-muted leading-relaxed mb-4">
        The Site Assessment Fee is fully deductible from the client's final bill if the client proceeds with the job. If the client chooses not to proceed after the assessment, the fee is non-refundable and is paid to the provider as compensation for their time and transport. No provider will be dispatched for a site assessment until the applicable fee has been confirmed as received by TownLink.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        <strong>Full Escrow Payment.</strong> All jobs on TownLink Services operate on a full escrow model. The client pays 100% of the Agreed Job Value to TownLink Global's designated Mobile Money account before work begins and before the parties are Connected. TownLink holds the full payment in escrow and releases it to the provider within 48 hours of the client confirming satisfactory completion of the job. No payment is released to a provider without client confirmation.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        <strong>Phased Jobs.</strong> For larger jobs broken into stages — such as construction, major renovation, or large installations — the provider may propose a phased payment structure following the site assessment. Where phased payments are agreed, each phase must be paid in full by the client before that phase begins. TownLink holds each phase payment in escrow and releases it to the provider only after the client confirms satisfactory completion of that phase. The next phase does not begin until the previous phase is confirmed and the next phase payment is received.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">6. Provider Obligations</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        By registering as a provider, you agree to provide accurate information, submit valid identification, respond to job notifications promptly, perform services professionally, and not solicit clients outside the platform to avoid coordination fees.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        Providers have the right to appeal a suspension by contacting TownLink via WhatsApp within 14 days of notification.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">7. Client Obligations</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        By using TownLink Services as a client, you agree to provide accurate service requirements, make payment before being Connected, confirm job completion honestly, and not make direct payment arrangements with providers to bypass TownLink's coordination fee.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        Where a job requires a site assessment, clients agree to pay the applicable Site Assessment Fee before any provider visits their premises. For all jobs, clients agree to pay 100% of the Agreed Job Value into TownLink escrow before work begins. For phased jobs, clients agree to pay each phase in full before that phase commences. Failure to make these payments will result in the job not being confirmed and no provider being dispatched.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">8. Verification</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Verification does not constitute a guarantee of service quality or professional qualifications. Clients engage providers at their own discretion.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">9. Dispute Resolution</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink will act as a neutral mediator in disputes. Contact us via WhatsApp at +233 27 487 0179. TownLink will make a determination within 5 business days. If only part of a job is disputed, the undisputed portion may be released to the provider within 48 hours.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink's determination regarding platform funds is binding, without prejudice to any party's right to seek independent legal recourse.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">10. WhatsApp as Primary Communication Channel</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Primary contact: WhatsApp +233 27 487 0179. Backup: info@townlinkglobal.com or services.townlinkglobal.com.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">11. Suspension and Termination</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink reserves the right to suspend or terminate any listing or account for fraud, abuse, poor performance, or violation of these terms.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">12. Amendments</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Changes will be communicated via WhatsApp with at least 14 days notice. Continued use constitutes acceptance.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">13. Governing Law</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        These Terms are governed by the laws of the Republic of Ghana.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">14. Entire Agreement</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        These Terms of Service, together with the Privacy Policy and Provider Agreement, constitute the entire understanding between TownLink and the user and supersede all prior agreements, whether written or oral.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">15. Contact</h2>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>WhatsApp: +233 27 487 0179</li>
        <li>Email: info@townlinkglobal.com</li>
        <li>Website: services.townlinkglobal.com</li>
      </ul>
    </>
  );
}
