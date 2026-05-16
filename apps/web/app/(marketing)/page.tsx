export default function HomePage() {
  return (
    <div>
      <section className="bg-[var(--tl-green)] px-6 py-16 text-center relative overflow-hidden">
        <h1 className="font-[family-name:var(--font-dm-serif)] text-white text-3xl md:text-4xl leading-tight mb-3">
          Verified Service Providers Across Ghana.
          <br />
          <em className="text-[var(--tl-gold)] not-italic">
            All 16 Regions. One Platform.
          </em>
        </h1>
        <p className="text-white/80 text-sm leading-relaxed max-w-lg mx-auto mb-5">
          Ghana&apos;s Local Service Network connecting clients with verified
          professionals — at home and in the diaspora.
        </p>
        <div className="flex justify-center gap-2.5 flex-wrap">
          {["✓ Free to list", "✓ Diaspora clients", "✓ All 16 regions", "✓ Ghana Card verified"].map((badge) => (
            <span
              key={badge}
              className="bg-white/12 border border-white/22 text-white/90 text-xs px-3 py-1 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>
      </section>

      <section className="flex items-center justify-center gap-0 bg-white border-b border-[var(--tl-border)] py-4 px-4 flex-wrap">
        {[
          { num: "71", label: "Service categories" },
          { num: "16", label: "Regions covered" },
          { num: "Free", label: "To register" },
          { num: "24h", label: "Review turnaround" },
        ].map((stat, i) => (
          <div key={stat.label} className="flex items-center">
            {i > 0 && <div className="w-px h-8 bg-[var(--tl-border)] mx-0" />}
            <div className="flex flex-col items-center px-5 text-center">
              <span className="font-[family-name:var(--font-dm-serif)] text-xl text-[var(--tl-green)] leading-none">
                {stat.num}
              </span>
              <span className="text-[0.72rem] text-[var(--tl-muted)] mt-0.5 uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="max-w-xl mx-auto px-4 py-10 text-center">
        <p className="text-[var(--tl-muted)] text-sm">
          Landing page content will be built here. Provider registration form,
          service categories, FAQ, and more.
        </p>
      </section>
    </div>
  );
}
