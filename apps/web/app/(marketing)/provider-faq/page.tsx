import type { Metadata } from "next";
import Link from "next/link";
import { AppButton } from "@townlink/ui";
import { ProviderFaqAccordion } from "./_components/ProviderFaqAccordion";

/* ── Gold accent tokens ── */
const gold = "#C9A84C";
const goldPale = "rgba(201,168,76,0.10)";
const goldBorder = "rgba(201,168,76,0.25)";

export const metadata: Metadata = {
  title: "Provider FAQ",
  description:
    "Everything you need to know about working with TownLink as a service provider in Ghana. Registration, fees, payments, job process, and profile management.",
};

export default function ProviderFaqPage() {
  return (
    <div className="flex flex-col">
      {/* ─── Hero ─── */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Subtle radial glow behind hero */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-3xl mx-auto px-6 py-24 md:py-36 text-center">
          {/* Badge */}
          <span
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[1.8px] px-5 py-2 rounded-full mb-6"
            style={{
              background: goldPale,
              border: `1px solid ${goldBorder}`,
              color: gold,
            }}
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Provider Help Centre
          </span>

          {/* Heading */}
          <h1 className="font-bold text-4xl md:text-[56px] leading-[1.1] tracking-tight text-white mb-6">
            Everything you need to
            <br />
            <span style={{ color: gold }}>work with TownLink</span>
          </h1>

          {/* Subtitle */}
          <p className="text-bg-light/80 text-base md:text-lg max-w-lg mx-auto leading-relaxed">
            Answers to the most common questions from service providers across
            Ghana.
          </p>
        </div>
      </section>

      {/* ─── FAQ Body ─── */}
      <section className="bg-[var(--color-bg-light)] py-16 md:py-24">
        <div className="max-w-[760px] mx-auto px-6 md:px-8">
          <ProviderFaqAccordion />

          {/* ─── Bottom CTA ─── */}
          <div className="mt-20 rounded-[var(--radius-card)] bg-white border border-border-light p-10 md:p-14 text-center shadow-[var(--shadow-card)]">
            <h3 className="font-bold text-2xl md:text-3xl text-text-heavy mb-4">
              Ready to join TownLink?
            </h3>
            <p className="text-text-muted text-base md:text-lg max-w-md mx-auto mb-8 leading-relaxed">
              Registration is free. Get matched to pre-qualified clients across
              Ghana — starting today.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/register-provider">
                <AppButton variant="primary" size="md">
                  Register as a Provider — Free
                </AppButton>
              </Link>
              <a
                href="https://wa.me/233205752893"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-status-success transition-colors font-medium sm:ml-2 mt-4 sm:mt-0"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
