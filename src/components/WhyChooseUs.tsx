import { Check, X } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { useContent, useSettings } from '@/lib/live';

interface Row {
  feature: string;
  us: boolean;
  them: boolean;
}

interface Panels {
  usBadge: string;
  usHeading: string;
  usText: string;
  themBadge: string;
  themHeading: string;
  themText: string;
}

interface HeadingSettings {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

const FALLBACK_ROWS: (Row & { id: string })[] = [
  { id: '1', feature: 'Dedicated senior strategist', us: true, them: false },
  { id: '2', feature: 'In-house design + engineering', us: true, them: false },
  { id: '3', feature: 'Transparent real-time reporting', us: true, them: true },
  { id: '4', feature: 'Month-to-month, no lock-in', us: true, them: false },
  { id: '5', feature: '4 global offices, same time-zone coverage', us: true, them: false },
  { id: '6', feature: 'Performance guarantee on ad spend', us: true, them: false },
  { id: '7', feature: 'Generic templated deliverables', us: false, them: true },
  { id: '8', feature: 'Junior account managers', us: false, them: true },
];

const FALLBACK_PANELS: Panels = {
  usBadge: 'Nexora Digital',
  usHeading: 'A partner invested in your outcomes',
  usText: 'Senior talent, custom craft, and reporting you can actually trust — built to compound, not to churn.',
  themBadge: 'Typical agency',
  themHeading: 'A vendor that invoices monthly',
  themText: 'Templated work, junior hands, and long contracts that lock you in regardless of results.',
};

const FALLBACK_HEADING: HeadingSettings = {
  eyebrow: 'Why Nexora',
  titlePrefix: 'The difference is in the',
  titleHighlight: 'details',
  titleSuffix: '',
  description: 'A side-by-side look at what working with a premium partner actually feels like.',
};

export function WhyChooseUs() {
  const rows = useContent<Row>('why_choose_us_rows', FALLBACK_ROWS);
  const panels = useSettings('why_panels', FALLBACK_PANELS);
  const heading = useSettings('why_heading', FALLBACK_HEADING);

  return (
    <Section id="why" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={<>{heading.titlePrefix} <span className="gradient-text">{heading.titleHighlight}</span> {heading.titleSuffix}</>}
        description={heading.description}
      />

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Us */}
        <div className="reveal relative overflow-hidden rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50/80 via-white to-white p-7 shadow-lift sm:p-9">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary-200/40 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white">
              {panels.usBadge}
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ink">{panels.usHeading}</h3>
            <p className="mt-2 max-w-md text-sm text-muted">{panels.usText}</p>

            <ul className="mt-7 space-y-3">
              {rows.filter((r) => r.us).map((r) => (
                <li key={r.id} className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-600 text-white">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-ink">{r.feature}</span>
                </li>
              ))}
              {rows.filter((r) => !r.us).map((r) => (
                <li key={r.id} className="flex items-center gap-3 opacity-60">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 text-slate-500">
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-medium text-muted line-through">{r.feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Them */}
        <div className="reveal relative overflow-hidden rounded-3xl border border-line bg-surface p-7 sm:p-9" data-delay="120">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-3 py-1 text-xs font-semibold text-muted">
            {panels.themBadge}
          </span>
          <h3 className="mt-4 text-2xl font-bold text-ink-soft">{panels.themHeading}</h3>
          <p className="mt-2 max-w-md text-sm text-muted">{panels.themText}</p>

          <ul className="mt-7 space-y-3">
            {rows.map((r) => (
              <li key={r.id} className={`flex items-center gap-3 ${r.them ? '' : 'opacity-60'}`}>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${r.them ? 'bg-slate-300 text-slate-700' : 'bg-slate-200 text-slate-400'}`}>
                  {r.them ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
                <span className={`text-sm ${r.them ? 'font-medium text-ink-soft' : 'font-medium text-muted line-through'}`}>{r.feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
