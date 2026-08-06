import { Section, SectionHeading } from '@/components/Section';
import { getIcon } from '@/content/icons';
import { useContent, useSettings } from '@/lib/live';

interface Step {
  icon: string;
  title: string;
  description: string;
}

interface HeadingSettings {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

const FALLBACK_STEPS: (Step & { id: string })[] = [
  { id: '1', icon: 'Compass', title: 'Discovery', description: 'We immerse in your business, goals, and market to define what success looks like.' },
  { id: '2', icon: 'Search', title: 'Research', description: 'Audience, competitor, and keyword research that grounds every decision in evidence.' },
  { id: '3', icon: 'LineChart', title: 'Planning', description: 'A prioritized roadmap with clear KPIs, milestones, and ownership across disciplines.' },
  { id: '4', icon: 'PenTool', title: 'Design', description: 'Brand-led, conversion-focused design systems crafted for every touchpoint.' },
  { id: '5', icon: 'FlaskConical', title: 'Development', description: 'Fast, accessible, scalable builds — websites, apps, and automations shipped clean.' },
  { id: '6', icon: 'TestTube2', title: 'Testing', description: 'Rigorous QA and experimentation to de-risk launches and find upside early.' },
  { id: '7', icon: 'Rocket', title: 'Launch', description: 'Coordinated go-live with monitoring, analytics, and rollback in place.' },
  { id: '8', icon: 'ShieldCheck', title: 'Growth', description: 'Continuous optimization and reporting that compounds results over time.' },
];

const FALLBACK_HEADING: HeadingSettings = {
  eyebrow: 'How we work',
  titlePrefix: 'A process built to',
  titleHighlight: 'compound',
  titleSuffix: '',
  description: 'Eight disciplined stages — from first conversation to long-term growth — that turn ambition into outcomes.',
};

export function Process() {
  const steps = useContent<Step>('process', FALLBACK_STEPS);
  const heading = useSettings('process_heading', FALLBACK_HEADING);

  return (
    <Section id="process" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={<>{heading.titlePrefix} <span className="gradient-text">{heading.titleHighlight}</span> {heading.titleSuffix}</>}
        description={heading.description}
      />

      {/* Horizontal scroll on small screens, grid on large */}
      <div className="mt-14 -mx-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:thin]">
        <div className="flex min-w-max gap-5 lg:grid lg:grid-cols-4 lg:min-w-0">
          {steps.map((s, i) => {
            const Icon = getIcon(s.icon);
            return (
              <div
                key={s.id}
                className="reveal group relative w-64 shrink-0 overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-lift lg:w-auto"
                data-delay={`${(i % 4) * 70}`}
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-500 group-hover:bg-primary-600 group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-3xl font-extrabold text-slate-100 transition-colors duration-500 group-hover:text-primary-100">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-base font-bold text-ink">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.description}</p>

                {/* connector */}
                {i < steps.length - 1 && (
                  <span className="absolute -right-3 top-1/2 hidden h-px w-6 bg-gradient-to-r from-primary-300 to-transparent lg:block" />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
