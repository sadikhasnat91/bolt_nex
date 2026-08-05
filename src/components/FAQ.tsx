import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

const FAQS = [
  { q: 'Do you require long-term contracts?', a: 'No. Every engagement is month-to-month. We earn your renewal with results, not a lock-in. Enterprise pods can be structured around quarterly business reviews if you prefer.' },
  { q: 'How quickly can we get started?', a: 'Most clients kick off within 5 business days of signing. Discovery and onboarding happen in week one, and the first working deliverables typically land by week two.' },
  { q: 'Which channels do you cover?', a: 'Google Ads, SEO, email marketing, paid and organic social, marketing automation, plus full design and engineering — websites, web apps, and Flutter mobile apps. You can engage one channel or the full stack.' },
  { q: 'Do you guarantee results?', a: 'Enterprise engagements include a performance guarantee on ad spend. For all plans, we tie our reporting to revenue and pipeline — not vanity metrics — so you can judge ROI transparently.' },
  { q: 'Will I get senior people or juniors?', a: 'Senior, always. The strategists, designers, and engineers you meet during sales are the ones who do the work. No bait-and-switch, no junior account managers learning on your budget.' },
  { q: 'Can you work with our existing team or agency?', a: 'Absolutely. We frequently embed alongside in-house teams or specialist partners — filling capability gaps and sharing reporting so everyone is aligned on the same outcomes.' },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section id="faq" className="py-24 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="reveal">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" /> FAQ
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] text-ink sm:text-4xl text-balance">
            Answers, before <span className="gradient-text">you ask</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted text-pretty">
            Still have questions? Book a free consultation and we will answer them in 30 minutes — no pitch, no pressure.
          </p>
        </div>

        <div className="reveal space-y-3" data-delay="100">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={`overflow-hidden rounded-2xl border transition-colors duration-300 ${isOpen ? 'border-primary-200 bg-primary-50/40' : 'border-line bg-white'}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-base font-semibold text-ink">{f.q}</span>
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${isOpen ? 'rotate-45 border-primary-500 bg-primary-500 text-white' : 'border-line text-primary-600'}`}>
                    <Plus className="h-4 w-4" />
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted text-pretty">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
