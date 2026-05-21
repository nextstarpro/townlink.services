import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Provider Agreement | TownLink Services",
  description: "Provider agreement and terms for service providers on TownLink Services.",
};

export default function ProviderAgreementPage() {
  return (
    <>
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark mb-2">Provider Agreement</h1>
      <div className="text-sm text-text-muted mb-10 pb-6 border-b border-border-light">TownLink Global Limited · services.townlinkglobal.com · Version 5.0 — Effective: May 20, 2026</div>

      <p className="text-text-muted leading-relaxed mb-6">
        This Provider Agreement is entered into between TownLink Global Limited ("TownLink") and the individual or business ("Provider") registering on TownLink Services. By completing the registration process, the Provider agrees to be bound by these terms.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">1. Definitions</h2>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-6">
        <li>"Agreed Job Value" means the total amount the client agrees to pay for the service, excluding reimbursable expenses unless explicitly included.</li>
        <li>"Connected" means the first direct communication between a client and a Provider facilitated by TownLink, typically via WhatsApp introduction.</li>
      </ul>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">2. Platform Access</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Listing on TownLink Services is currently free. TownLink will provide at least 30 days notice before introducing any subscription fee.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">3. Provider Verification</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        The Provider agrees to submit Ghana Card number during registration and a clear Ghana Card photograph via WhatsApp. Non-Ghanaian residents may submit equivalent government-issued identification, subject to TownLink's discretion.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">4. Coordination Fee</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        TownLink deducts a coordination fee from all client payments before remitting to the Provider:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-text-muted mb-4">
        <li>All service categories: 15% of the Agreed Job Value</li>
        <li>Jobs & Recruitment category: 25% of the Agreed Job Value</li>
      </ul>
      <p className="text-text-muted leading-relaxed mb-4">
        Payment is remitted within 48 hours of client confirmation of job completion, provided no dispute has been raised. Providers must not negotiate direct payments with clients to bypass this fee.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        <strong>Site Assessment Fees.</strong> Where a job requires an on-site assessment, TownLink collects a Site Assessment Fee from the client before the Provider visits. This fee is paid entirely to the Provider — TownLink does not deduct a coordination fee from Site Assessment Fees. If the client proceeds with the job, the assessment fee is deducted from their final bill. If the client does not proceed, the Provider keeps the full assessment fee as compensation for their time and transport. TownLink will remit the assessment fee to the Provider's MoMo within 48 hours of a confirmed non-proceeding decision by the client.
      </p>
      <p className="text-text-muted leading-relaxed mb-4">
        <strong>Full Escrow Model.</strong> TownLink operates a full escrow payment system. The client pays 100% of the Agreed Job Value to TownLink before work begins. TownLink holds the full payment in escrow and releases the Provider's share — after deducting the applicable coordination fee — within 48 hours of the client confirming satisfactory completion of the job. Providers must not begin work until TownLink confirms that full payment has been received from the client.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        <strong>Phased Jobs.</strong> For larger jobs broken into stages, Providers may propose a phased payment structure to the client following the site assessment. Where phased payments are agreed and communicated through TownLink, TownLink will collect each phase payment from the client before that phase begins and release it to the Provider within 48 hours of the client confirming satisfactory completion of that phase.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">5. Job Acceptance and Performance</h2>
      <p className="text-text-muted leading-relaxed mb-4">
        On receiving a job notification, the Provider must respond ideally within 2 hours, confirm acceptance or decline via WhatsApp, perform the service professionally, and notify TownLink immediately if unable to complete a confirmed job.
      </p>
      <p className="text-text-muted leading-relaxed mb-6">
        <strong>Site Assessments.</strong> Providers must not visit a client's premises for a site assessment until TownLink confirms that the applicable Site Assessment Fee has been received from the client. Visiting a site before fee confirmation is at the Provider's own risk and TownLink will not be liable for any uncompensated time or transport in such circumstances. Providers must not request or collect any assessment or survey fee directly from a client — all such fees are collected and disbursed exclusively by TownLink.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">6. Provider Conduct</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Providers agree to treat clients professionally, provide accurate descriptions of services and qualifications, maintain client confidentiality, and not engage in fraudulent or unlawful conduct.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">7. Listing Maintenance</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Providers must respond to TownLink's 4-weekly availability checks within 7 days. Listings unresponsive for 30+ days may be removed.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">8. Dispute Resolution</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink's determination regarding platform funds is binding on the parties, without prejudice to independent legal recourse through the courts of Ghana.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">9. Termination</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        Either party may terminate at any time. Providers may appeal a suspension via WhatsApp within 14 days. If a job is handed over due to Provider termination, payment will be prorated based on work completed at TownLink's reasonable determination.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">10. Amendments</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        TownLink will provide 14 days notice of amendments. Providers who do not accept an amendment may terminate within 14 days without penalty.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">11. Governing Law</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        This Agreement is governed by the laws of the Republic of Ghana.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">12. Entire Agreement</h2>
      <p className="text-text-muted leading-relaxed mb-6">
        This Provider Agreement, together with the Terms of Service and Privacy Policy, constitutes the entire understanding between TownLink and the Provider and supersedes all prior agreements, whether written or oral.
      </p>

      <h2 className="text-2xl font-bold text-brand-dark mt-10 mb-4">13. Acceptance</h2>
      <div className="bg-brand-light/30 border border-brand-primary/20 rounded-xl p-6 mt-8">
        <p className="text-brand-dark font-medium m-0">
          By completing registration at services.townlinkglobal.com, the Provider confirms they have read, understood and agree to be bound by this Provider Agreement, the Terms of Service and the Privacy Policy.
        </p>
      </div>
    </>
  );
}
