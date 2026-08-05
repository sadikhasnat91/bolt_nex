import { useState } from 'react';
import { ArrowRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Section } from '@/components/Section';

const INFO = [
  { icon: Mail, label: 'Email', value: 'hello@nexoradigital.com' },
  { icon: Phone, label: 'Phone', value: '+1 (212) 555-0188' },
  { icon: MapPin, label: 'HQ', value: 'Gulshan 1, Dhaka 1212, Bangladesh' },
  { icon: Clock, label: 'Hours', value: 'Sun–Thu · 9AM – 6PM (GMT+6)' },
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <Section id="contact" className="py-24 sm:py-28">
      <div className="overflow-hidden rounded-[2rem] border border-line bg-surface shadow-card">
        <div className="grid lg:grid-cols-[1fr_1.1fr]">
          {/* Left: info */}
          <div className="relative overflow-hidden bg-gradient-to-br from-primary-800 via-primary-700 to-primary-900 p-8 text-white sm:p-10">
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary-400/30 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-emerald-300/20 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary-300" /> Let's talk
              </span>
              <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl text-balance">
                Book your free <span className="text-primary-200">30-min consultation</span>
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-primary-100 text-pretty">
                Tell us where you want to grow. We will bring the plan, the team, and the numbers — and you decide if we are a fit.
              </p>

              <div className="mt-9 space-y-4">
                {INFO.map((i) => {
                  const Icon = i.icon;
                  return (
                    <div key={i.label} className="flex items-center gap-3.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur">
                        <Icon className="h-5 w-5 text-primary-200" />
                      </span>
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-primary-200">{i.label}</p>
                        <p className="text-sm font-medium text-white">{i.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="p-8 sm:p-10">
            {submitted ? (
              <div className="flex h-full min-h-[20rem] flex-col items-center justify-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-primary-50 text-primary-600">
                  <svg viewBox="0 0 24 24" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </span>
                <h3 className="mt-5 text-xl font-bold text-ink">Thank you — message received</h3>
                <p className="mt-2 max-w-sm text-sm text-muted">
                  A senior strategist will reach out within one business day to schedule your free consultation.
                </p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-sm font-semibold text-primary-600 hover:text-primary-700">
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Full name" name="name" placeholder="Jane Doe" />
                  <Field label="Work email" name="email" type="email" placeholder="jane@company.com" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Company" name="company" placeholder="Acme Inc." />
                  <Field label="Budget" name="budget" placeholder="$5K – $10K / mo" />
                </div>

                <label className="grid gap-1.5">
                  <span className="text-xs font-semibold text-ink-soft">How can we help?</span>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your goals and current setup…"
                    className="w-full resize-none rounded-xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
                  />
                </label>

                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] transition-all duration-300 hover:bg-primary-700 active:scale-[0.98]"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
                <p className="text-center text-[11px] text-muted">
                  By submitting you agree to our privacy policy. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>

        {/* Map placeholder */}
        <div className="relative h-48 border-t border-line bg-surface">
          <div className="absolute inset-0 bg-grid opacity-70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center gap-2 rounded-full border border-line bg-white/90 px-4 py-2 text-xs font-medium text-muted shadow-sm backdrop-blur">
              <MapPin className="h-4 w-4 text-primary-600" />
              4 offices worldwide · Dhaka · New York · London · Toronto
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Field({
  label,
  name,
  type = 'text',
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="grid gap-1.5">
      <span className="text-xs font-semibold text-ink-soft">{label}</span>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-line bg-white px-4 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-primary-400 focus:outline-none focus:ring-4 focus:ring-primary-100"
      />
    </label>
  );
}
