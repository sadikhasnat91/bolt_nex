import { Compass, FlaskConical, LineChart, PenTool, Rocket, Search, ShieldCheck, TestTube2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  { icon: Compass, title: 'Discovery', description: 'We immerse in your business, goals, and market to define what success looks like.' },
  { icon: Search, title: 'Research', description: 'Audience, competitor, and keyword research that grounds every decision in evidence.' },
  { icon: LineChart, title: 'Planning', description: 'A prioritized roadmap with clear KPIs, milestones, and ownership across disciplines.' },
  { icon: PenTool, title: 'Design', description: 'Brand-led, conversion-focused design systems crafted for every touchpoint.' },
  { icon: FlaskConical, title: 'Development', description: 'Fast, accessible, scalable builds — websites, apps, and automations shipped clean.' },
  { icon: TestTube2, title: 'Testing', description: 'Rigorous QA and experimentation to de-risk launches and find upside early.' },
  { icon: Rocket, title: 'Launch', description: 'Coordinated go-live with monitoring, analytics, and rollback in place.' },
  { icon: ShieldCheck, title: 'Growth', description: 'Continuous optimization and reporting that compounds results over time.' },
];

export function Process() {
  return (
    <Section id="process" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow="How we work"
        title={<>A process built to <span className="gradient-text">compound</span></>}
        description="Eight disciplined stages — from first conversation to long-term growth — that turn ambition into outcomes."
      />

      {/* Horizontal scroll on small screens, grid on large */}
      <div className="mt-14 -mx-5 overflow-x-auto px-5 pb-4 sm:mx-0 sm:overflow-visible sm:px-0 [scrollbar-width:thin]">
        <div className="flex min-w-max gap-5 lg:grid lg:grid-cols-4 lg:min-w-0">
          {STEPS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
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
                {i < STEPS.length - 1 && (
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
