import { ArrowRight, Check, Sparkles } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

interface Plan {
  name: string;
  price: string;
  cadence: string;
  blurb: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: '$1,900',
    cadence: '/ month',
    blurb: 'For early-stage brands that need a focused growth engine.',
    features: ['1 marketing channel', 'Monthly strategy session', 'Bi-weekly reporting', 'Email support', '1 dedicated specialist'],
    cta: 'Start with Starter',
  },
  {
    name: 'Growth',
    price: '$4,900',
    cadence: '/ month',
    blurb: 'For scaling companies ready to compound across channels.',
    features: ['Up to 3 channels', 'Weekly strategy + standups', 'Real-time dashboard', 'Priority support', 'Senior strategist + 2 specialists', 'Quarterly roadmap review'],
    cta: 'Choose Growth',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    cadence: '',
    blurb: 'For established teams that need a full-stack growth partner.',
    features: ['Unlimited channels', 'Dedicated cross-functional pod', 'Custom reporting & attribution', '24/7 priority support', 'SLA & performance guarantee', 'Quarterly business review'],
    cta: 'Talk to sales',
  },
];

export function Pricing() {
  return (
    <Section id="pricing" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow="Pricing"
        title={<>Simple plans, <span className="gradient-text">serious outcomes</span></>}
        description="Transparent monthly engagements. No long lock-ins, no hidden line items — cancel anytime."
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {PLANS.map((p, i) => (
          <div
            key={p.name}
            className={`reveal relative flex flex-col overflow-hidden rounded-3xl border p-7 transition-all duration-500 sm:p-8 ${
              p.popular
                ? 'border-primary-300 bg-gradient-to-br from-primary-50/80 via-white to-white shadow-lift lg:-translate-y-3'
                : 'border-line bg-white shadow-card hover:-translate-y-1.5 hover:shadow-lift'
            }`}
            data-delay={`${i * 90}`}
          >
            {p.popular && (
              <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-primary-600 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(16,185,129,0.7)]">
                <Sparkles className="h-3 w-3" /> Most Popular
              </span>
            )}

            <h3 className="text-lg font-bold text-ink">{p.name}</h3>
            <p className="mt-2 text-sm text-muted">{p.blurb}</p>

            <div className="mt-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-ink">{p.price}</span>
              {p.cadence && <span className="pb-1 text-sm font-medium text-muted">{p.cadence}</span>}
            </div>

            <ul className="mt-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${p.popular ? 'bg-primary-600 text-white' : 'bg-primary-50 text-primary-600'}`}>
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-ink-soft">{f}</span>
                </li>
              ))}
            </ul>

            <button
              className={`group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all duration-300 active:scale-[0.98] ${
                p.popular
                  ? 'bg-primary-600 text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:bg-primary-700'
                  : 'border border-line bg-white text-ink hover:border-primary-300 hover:bg-primary-50/60'
              }`}
            >
              {p.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        ))}
      </div>

      <p className="reveal mt-8 text-center text-xs text-muted">
        All plans include onboarding, strategy, and a dedicated point of contact. Prices in USD.
      </p>
    </Section>
  );
}
