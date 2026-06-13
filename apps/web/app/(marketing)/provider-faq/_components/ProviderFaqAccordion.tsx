"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Gold accent tokens (provider-facing identity) ── */
const gold = "#C9A84C";
const goldLight = "#E8C96A";
const goldPale = "rgba(201,168,76,0.10)";
const goldBorder = "rgba(201,168,76,0.25)";

/* ── Types ── */
interface ProviderFaqItem {
  question: string;
  answer: React.ReactNode;
}

interface ProviderFaqSection {
  label: string;
  items: ProviderFaqItem[];
}

/* ─────────────────────────────────────────────────────
   FAQ DATA — migrated from provider-details.html
   ───────────────────────────────────────────────────── */
const PROVIDER_FAQ_SECTIONS: ProviderFaqSection[] = [
  {
    label: "Getting Started",
    items: [
      {
        question: "What is TownLink Services and how does it work?",
        answer: (
          <>
            <p>
              TownLink is a service marketplace that connects verified Ghanaian
              service providers with clients — both local and diaspora. We handle
              the client acquisition, escrow payments, and job coordination. You
              focus on delivering the work.
            </p>
            <p className="mt-4">
              When a client books through TownLink, we collect payment upfront
              and hold it securely until you complete the job. Once the client
              confirms completion, we release your payment. Simple and protected
              for everyone.
            </p>
          </>
        ),
      },
      {
        question: "How do I register as a provider?",
        answer: (
          <p>
            Registration is <strong>completely free</strong>. Fill out our online
            registration form at <strong>townlink.app</strong>, then send photos
            of your Ghana Card (front and back) via WhatsApp to{" "}
            <strong>+233 20 575 2893</strong>. Our team verifies your identity
            and activates your profile — usually within 24 hours.
          </p>
        ),
      },
      {
        question: "What documents do I need to register?",
        answer: (
          <>
            <p>
              You need a valid <strong>Ghana Card (National ID)</strong> — front
              and back photos sent via WhatsApp. We use your card as the ground
              truth for your name and identity on the platform. Make sure the
              photos are clear and legible.
            </p>
            <p className="mt-4">
              If your Ghana Card is expired, you won't be able to complete
              verification until it's renewed.
            </p>
          </>
        ),
      },
    ],
  },
  {
    label: "Fees & Payments",
    items: [
      {
        question: "How much does TownLink charge?",
        answer: (
          <>
            <p>
              TownLink is <strong>free for clients.</strong> As a service
              provider, a coordination fee is deducted from each completed job:
            </p>
            {/* Fee Table */}
            <div className="mt-4 overflow-hidden rounded-xl border border-[var(--color-border-light)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--color-bg-light)]">
                    <th className="text-left px-5 py-3 font-semibold text-text-caption text-xs uppercase tracking-wider">
                      Service Category
                    </th>
                    <th className="text-left px-5 py-3 font-semibold text-text-caption text-xs uppercase tracking-wider">
                      Coordination Fee
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-[var(--color-border-light)]">
                    <td className="px-5 py-3.5 text-text-primary font-medium">
                      All service categories
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: goldPale,
                          color: gold,
                        }}
                      >
                        15%
                      </span>
                    </td>
                  </tr>
                  <tr className="border-t border-[var(--color-border-light)]">
                    <td className="px-5 py-3.5 text-text-primary font-medium">
                      Jobs & Recruitment
                    </td>
                    <td className="px-5 py-3.5">
                      <span
                        className="inline-block text-xs font-bold px-3 py-1 rounded-full"
                        style={{
                          background: goldPale,
                          color: gold,
                        }}
                      >
                        25%
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4">
              This fee is deducted from the agreed job amount before your payout.
              There are no upfront charges, no monthly subscription, and no
              hidden costs.
            </p>
          </>
        ),
      },
      {
        question: "Why is the fee 15%? That seems high.",
        answer: (
          <>
            <p>
              We understand 15% may seem higher than a basic referral fee. But
              TownLink is not just passing you a contact — here's what the fee
              actually covers:
            </p>
            {/* Checklist */}
            <ul className="mt-4 space-y-2.5">
              {[
                "Client acquisition and marketing — we bring the clients to you",
                "Pre-qualified bookings — clients come ready to pay, not just browsing",
                "Secure escrow payment processing — no chasing clients for money",
                "Dispute resolution — we handle complaints so you don't have to",
                "Platform support — scheduling, communication, and admin tools",
                "Reputation management — ratings, reviews, and brand credibility",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-status-success/15 flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-status-success"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </span>
                  <span className="text-text-muted">{item}</span>
                </li>
              ))}
            </ul>
            {/* Highlight Box */}
            <div
              className="mt-5 rounded-xl px-5 py-4 text-sm leading-relaxed"
              style={{
                background: goldPale,
                borderLeft: `3px solid ${gold}`,
                color: "var(--color-text-primary)",
              }}
            >
              Think about what you'd spend finding clients on your own — ads,
              referrals, chasing payments, handling difficult disputes. TownLink
              absorbs all of that. Most of our providers say the consistent,
              pre-qualified volume more than covers the fee difference.
            </div>
          </>
        ),
      },
      {
        question: "When and how do I get paid?",
        answer: (
          <>
            <p>
              Payment is released to your{" "}
              <strong>MoMo (Mobile Money) number</strong> once the client
              confirms the job is complete. For phased jobs, payment is released
              per phase as each one is confirmed.
            </p>
            <p className="mt-4">
              We hold the client's payment in escrow for the duration of the job
              only — it's not held indefinitely. The process is designed to
              protect both you and the client.
            </p>
          </>
        ),
      },
      {
        question: "Is there a deposit requirement for jobs?",
        answer: (
          <p>
            Yes. For jobs that require it, TownLink collects a deposit of{" "}
            <strong>GHS 500 or 30% of the job value</strong> (whichever is
            applicable) from the client upfront. This secures the booking and
            protects your time.
          </p>
        ),
      },
    ],
  },
  {
    label: "How Jobs Work",
    items: [
      {
        question: "How do clients find me?",
        answer: (
          <>
            <p>
              Clients contact TownLink via WhatsApp, the website, or our
              Facebook and Instagram channels. Our coordinator (Nana) matches
              them to verified providers based on service type, location, and
              availability. Your verified profile is visible on the platform and
              in search results.
            </p>
            <p className="mt-4">
              The more complete and active your profile, the better your chances
              of being matched to jobs.
            </p>
          </>
        ),
      },
      {
        question: "Can clients request multiple quotes or compare providers?",
        answer: (
          <p>
            Yes. Clients can request as many quotes or bids as they need for a
            particular job. TownLink facilitates competitive bidding at no cost
            to the client. This means the best providers — in price, quality,
            and responsiveness — tend to win more jobs.
          </p>
        ),
      },
      {
        question: "What happens if there's a dispute with a client?",
        answer: (
          <>
            <p>
              TownLink handles all disputes. If a client raises a concern about
              a job, we investigate and mediate. Payment is not released to
              either side until the dispute is resolved. Our goal is always a
              fair outcome based on the evidence.
            </p>
            <p className="mt-4">
              To protect yourself, always get job requirements confirmed in
              writing before starting work, and document your work with photos
              where possible.
            </p>
          </>
        ),
      },
      {
        question: "What is a site visit and does it cost anything?",
        answer: (
          <p>
            Some jobs — particularly renovation, construction, or complex
            installations — require a site visit before a final quote can be
            given. Site visit fees are{" "}
            <strong>not automatically free</strong>. Confirm your site visit
            charges directly with TownLink before the client is told anything.
            We will include the agreed site visit fee in the job structure.
          </p>
        ),
      },
    ],
  },
  {
    label: "Your Provider Profile",
    items: [
      {
        question: "How do I update my profile information?",
        answer: (
          <>
            <p>
              You can update your operational details — service categories,
              regions served, MoMo number, and availability — directly through
              the Provider Portal on the TownLink website. Your identity fields
              (name, Ghana Card number) are read-only and can only be changed by
              TownLink after re-verification.
            </p>
            <p className="mt-4">
              If your MoMo number changes, you'll receive a security alert —
              this is a fraud protection feature.
            </p>
          </>
        ),
      },
      {
        question: "How are provider ratings calculated?",
        answer: (
          <>
            <p>
              After every completed job, the client is asked to rate the
              experience from 1 to 5 stars and leave a brief comment. Your
              rating is a rolling average across all your completed jobs on the
              platform. Ratings are visible on your public profile.
            </p>
            <p className="mt-4">
              High ratings mean more job matches. Consistent quality is the
              fastest way to grow on TownLink.
            </p>
          </>
        ),
      },
      {
        question:
          'What does "Pending", "Active", and "Suspended" mean for my account?',
        answer: (
          <div className="space-y-3">
            <p>
              <strong>Pending</strong> — You've registered but haven't completed
              Ghana Card verification yet. You won't be matched to jobs until
              you're verified.
            </p>
            <p>
              <strong>Active</strong> — Verified and eligible for job matching.
              Your profile is live.
            </p>
            <p>
              <strong>Suspended</strong> — Your account has been suspended,
              usually due to unresolved verification issues or a conduct
              concern. Contact TownLink directly via WhatsApp to resolve.
            </p>
          </div>
        ),
      },
    ],
  },
];

/* ─────────────────────────────────────────────────────
   COMPONENT
   ───────────────────────────────────────────────────── */
export function ProviderFaqAccordion() {
  const [openKey, setOpenKey] = useState<string | null>(null);

  // Auto-open first question on mount
  useEffect(() => {
    setOpenKey("0-0");
  }, []);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  return (
    <div className="flex flex-col gap-8">
      {PROVIDER_FAQ_SECTIONS.map((section, sectionIdx) => (
        <div key={sectionIdx}>
          {/* Section Label — gold accent */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-8" style={{ background: goldBorder }} />
            <span
              className="text-xs font-bold uppercase tracking-[2.5px]"
              style={{ color: gold }}
            >
              {section.label}
            </span>
            <div className="h-px w-8" style={{ background: goldBorder }} />
          </div>

          {/* Items */}
          <div className="flex flex-col gap-4">
            {section.items.map((item, itemIdx) => {
              const key = `${sectionIdx}-${itemIdx}`;
              const isOpen = openKey === key;

              return (
                <div
                  key={key}
                  className={`border rounded-input bg-white transition-colors overflow-hidden ${
                    isOpen ? "border-[#C9A84C]" : "border-border-light hover:border-[#C9A84C]/50"
                  }`}
                >
                  <button
                    id={`provider-faq-q-${key}`}
                    onClick={() => toggle(key)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  >
                    <span
                      className={`font-semibold text-lg pr-4 transition-colors duration-200 ${
                        isOpen
                          ? "text-[#C9A84C]"
                          : "text-text-heavy"
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Toggle icon */}
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className={`shrink-0 ${isOpen ? "text-[#C9A84C]" : "text-text-caption"}`}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M6 9l6 6 6-6"/>
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                          open: { opacity: 1, height: "auto" },
                          collapsed: { opacity: 0, height: 0 },
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-text-muted text-base leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
