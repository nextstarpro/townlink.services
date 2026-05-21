import React from 'react';

export function StepsBreakdown() {
  const steps = [
    {
      num: 1,
      title: "WhatsApp us",
      desc: "Tell us what service you need and where in Ghana.",
      icon: "💬"
    },
    {
      num: 2,
      title: "We find you a match",
      desc: "We connect you with the right verified local provider.",
      icon: "🔍"
    },
    {
      num: 3,
      title: "Get it done",
      desc: "Communicate directly with your provider and confirm the job.",
      icon: "🛠️"
    },
    {
      num: 4,
      title: "Leave a review",
      desc: "Help build trust in the community by rating your experience.",
      icon: "⭐"
    }
  ];

  return (
    <section className="py-24 px-6 bg-bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-4">How It Works in 4 Steps</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">The fastest way to get connected with a trusted professional.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.num} className="bg-white p-8 rounded-3xl shadow-sm border border-border-light relative group hover:-translate-y-1 hover:shadow-md transition-all">
              <div className="w-16 h-16 bg-bg-light rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-brand-primary/10 transition-colors">
                {step.icon}
              </div>
              <div className="absolute top-8 right-8 text-6xl font-serif font-black text-border-light/40 pointer-events-none transition-all group-hover:text-brand-primary/20">
                {step.num}
              </div>
              <h3 className="font-bold text-xl text-brand-dark mb-3">{step.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
