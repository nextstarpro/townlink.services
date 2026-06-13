import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { AppButton, Badge } from "@townlink/ui";

export const metadata: Metadata = {
  title: "About",
  description:
    "TownLink Services is Ghana's trusted service directory — connecting clients with verified professionals across all 16 regions. Learn about our mission, how we work, and why thousands trust us.",
};

/* ── Stats Data ── */
const STATS = [
  { value: "72+", label: "Service Types" },
  { value: "16", label: "Regions Covered" },
  { value: "15", label: "Categories" },
  { value: "24hr", label: "Verification" },
];

/* ── Pillar Cards ── */
const PILLARS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Verified Providers",
    description:
      "Every provider is manually verified through Ghana Card identification. Only approved professionals receive the trusted badge on their profile.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: "Secure Escrow Payments",
    description:
      "Clients pay upfront into escrow. Funds are only released to providers once the job is confirmed complete — protecting both sides.",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Nationwide Coverage",
    description:
      "From Greater Accra to Upper West — TownLink covers all 16 regions of Ghana, connecting clients with local professionals wherever they are.",
  },
];

/* ── How It Works Steps ── */
const STEPS = [
  {
    step: "01",
    title: "WhatsApp us",
    description: "Tell us what service you need and where in Ghana. Our team responds within minutes.",
  },
  {
    step: "02",
    title: "We find you a match",
    description: "We connect you with the right verified local provider based on your needs, location, and budget.",
  },
  {
    step: "03",
    title: "Get it done",
    description: "Communicate directly with your provider, confirm the job, and pay securely through escrow.",
  },
];

/* ── Values Grid ── */
const VALUES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Trust & Verification",
    description: "We check every provider's Ghana Card before they join. No shortcuts, no exceptions.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fair Pricing",
    description: "Free for clients. Transparent coordination fees for providers. No hidden costs, ever.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Nationwide Reach",
    description: "All 16 regions of Ghana. From Accra to Tamale, Kumasi to Takoradi — we've got you covered.",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    title: "Provider Empowerment",
    description: "We bring the clients to you. Free registration, pre-qualified leads, and tools to grow your business.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      {/* ═══════════════════════════════════════════════
          SECTION 1 — HERO
          ═══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-brand-dark">
        {/* Background texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(48,203,101,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(48,203,184,0.12) 0%, transparent 50%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36 text-center">
          <Badge variant="light" className="mb-6">
            About TownLink
          </Badge>

          <h1 className="font-bold text-4xl md:text-[56px] leading-[1.1] tracking-tight text-white max-w-4xl mx-auto mb-6">
            Connecting Ghana&apos;s Best Service Providers —{" "}
            <span className="text-brand-primary">With Those Who Need Them</span>
          </h1>

          <p className="text-bg-light/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            TownLink Services is Ghana&apos;s trusted service directory. We connect clients — both
            local and in the diaspora — with verified professionals across all 16 regions.
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2 — MISSION STATEMENT
          ═══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Left — bold statement + text */}
            <div>
              <span className="text-xs font-bold uppercase tracking-[2.5px] text-brand-primary mb-4 block">
                Our Mission
              </span>
              <h2 className="font-bold text-3xl md:text-[42px] leading-[1.15] tracking-tight text-text-heavy mb-6">
                Quality work,{" "}
                <span className="text-brand-primary">verified people.</span>
              </h2>

              <div className="flex flex-col gap-5">
                <p className="text-text-muted text-base md:text-lg leading-relaxed">
                  Every provider on TownLink is vetted through Ghana Card verification. We take the
                  stress out of finding reliable help — so you can focus on what matters most.
                </p>
                <p className="text-text-muted text-base md:text-lg leading-relaxed">
                  Whether you&apos;re a homeowner in Accra looking for a trusted electrician, or a
                  Ghanaian in the UK managing a construction project back home — TownLink bridges the
                  gap with transparency, security, and accountability.
                </p>
                <p className="text-text-muted text-base md:text-lg leading-relaxed">
                  We handle client acquisition, escrow payments, dispute resolution, and job
                  coordination. Providers focus on delivering great work. Clients get peace of mind.
                </p>
              </div>
            </div>

            {/* Right — image */}
            <div className="relative">
              <div className="relative rounded-[var(--radius-card)] overflow-hidden aspect-[4/3] shadow-[var(--shadow-card)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=600&q=80"
                  alt="Professional service provider at work in Ghana"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Decorative accent */}
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-2xl -z-10"
                style={{ background: "rgba(48, 203, 101, 0.12)" }}
              />
              <div
                className="absolute -top-4 -left-4 w-16 h-16 rounded-xl -z-10"
                style={{ background: "rgba(48, 203, 184, 0.10)" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3 — STATS BAR
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-light)] px-6 py-14">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-bold text-4xl md:text-5xl tracking-tight text-brand-primary mb-2">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 4 — WHAT WE DO (3 Pillars)
          ═══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-brand-primary mb-4 block">
              What We Do
            </span>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight text-text-heavy max-w-3xl mx-auto">
              Built on three pillars of trust
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="group relative bg-[var(--color-bg-light)] rounded-[var(--radius-card)] p-8 md:p-10 border border-transparent hover:border-brand-primary/20 transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center text-brand-primary mb-6 shadow-sm group-hover:shadow-md transition-shadow">
                  {pillar.icon}
                </div>

                <h3 className="font-bold text-xl text-text-heavy mb-3">
                  {pillar.title}
                </h3>
                <p className="text-text-muted text-[15px] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 5 — HOW IT WORKS (3 Steps)
          ═══════════════════════════════════════════════ */}
      <section className="bg-brand-dark px-6 py-20 md:py-28 relative overflow-hidden">
        {/* Subtle gradient orb */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(48,203,184,0.3) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-brand-secondary mb-4 block">
              How It Works
            </span>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight text-white max-w-3xl mx-auto">
              Simple. Secure. Built for Ghana.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {STEPS.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector line (desktop only) */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] right-[-calc(50%-40px)] h-px bg-gradient-to-r from-brand-primary/40 to-transparent" />
                )}

                <div className="text-center">
                  {/* Step number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-primary/10 text-brand-primary font-bold text-xl mb-6">
                    {step.step}
                  </div>

                  <h3 className="font-bold text-xl text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-bg-light/70 text-[15px] leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 6 — WHO WE SERVE
          ═══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-brand-primary mb-4 block">
              Who We Serve
            </span>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight text-text-heavy">
              Two sides, one platform
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Clients & Diaspora Card */}
            <div className="rounded-[var(--radius-card)] border border-border-light p-8 md:p-10 hover:shadow-[var(--shadow-card)] transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>

              <h3 className="font-bold text-2xl text-text-heavy mb-3">
                Clients & Diaspora
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed mb-6">
                Whether you&apos;re a local resident or living abroad in the UK, USA, Canada, or
                Europe — TownLink makes it easy to hire trusted professionals for your projects,
                properties, and family needs in Ghana. No more guessing. No more unreliable
                referrals.
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {["Ghana Card Verified", "Escrow Protected", "All 16 Regions"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-primary/8 text-brand-primary"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              <Link href="/providers">
                <AppButton variant="primary" size="sm">
                  Browse Providers
                </AppButton>
              </Link>
            </div>

            {/* Service Providers Card */}
            <div className="rounded-[var(--radius-card)] border border-border-light p-8 md:p-10 hover:shadow-[var(--shadow-card)] transition-shadow duration-300">
              <div className="w-12 h-12 rounded-xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary mb-6">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>

              <h3 className="font-bold text-2xl text-text-heavy mb-3">
                Service Providers
              </h3>
              <p className="text-text-muted text-[15px] leading-relaxed mb-6">
                Grow your business without paying lead fees. List for free, get matched with
                pre-qualified clients, and build a review profile that attracts high-paying jobs.
                We handle marketing, payments, and disputes — you focus on delivering great work.
              </p>

              <div className="flex flex-wrap gap-2 mb-7">
                {["Free to Register", "Pre-Qualified Leads", "Build Your Reputation"].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-brand-secondary/8 text-brand-secondary"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              <Link href="/register-provider">
                <AppButton variant="secondary" size="sm">
                  Become a Provider
                </AppButton>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 7 — OUR VALUES
          ═══════════════════════════════════════════════ */}
      <section className="bg-[var(--color-bg-light)] px-6 py-20 md:py-28">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[2.5px] text-brand-primary mb-4 block">
              Our Values
            </span>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight text-text-heavy">
              What drives everything we do
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {VALUES.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-7 border border-border-light hover:border-brand-primary/20 transition-all duration-300 hover:shadow-sm"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="font-bold text-lg text-text-heavy mb-2">{value.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 8 — FINAL CTA
          ═══════════════════════════════════════════════ */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-[var(--radius-cta)] bg-brand-dark px-8 py-16 md:px-16 md:py-20 text-center">
            {/* Gradient orbs */}
            <div
              className="absolute inset-0 pointer-events-none opacity-25"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 30% 70%, rgba(48,203,101,0.25) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(48,203,184,0.2) 0%, transparent 50%)",
              }}
            />

            <div className="relative">
              <h2 className="font-bold text-3xl md:text-4xl tracking-tight text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-bg-light/70 text-base md:text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                Whether you need a service or provide one — TownLink is the platform built for you.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/providers">
                  <AppButton variant="primary" size="md">
                    Browse Providers
                  </AppButton>
                </Link>
                <Link href="/register-provider">
                  <AppButton variant="inverted" size="md">
                    Become a Provider
                  </AppButton>
                </Link>
              </div>

              {/* WhatsApp line */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <a
                  href="https://wa.me/233274870179"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-bg-light/60 hover:text-status-success transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Or just WhatsApp us — +233 27 487 0179
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
