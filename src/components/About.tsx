import { CheckCircle2, Eye, Flag, Heart, Target } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { Section } from '@/components/Section';

const VALUES: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Target, title: 'Mission', text: 'Empower brands to grow predictably through transparent, data-driven digital marketing and modern engineering.' },
  { icon: Eye, title: 'Vision', text: 'To be the most trusted growth partner for ambitious companies across every continent we operate in.' },
  { icon: Heart, title: 'Core Values', text: 'Integrity, craftsmanship, and relentless curiosity — in every campaign, every line of code, every pixel.' },
];

const STATS = [
  { value: '8+', label: 'Years in business' },
  { value: '500+', label: 'Projects delivered' },
  { value: '120+', label: 'Team members' },
  { value: '4', label: 'Global offices' },
];

export function About() {
  return (
    <Section id="about" className="py-24 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        {/* Image */}
        <div className="reveal relative">
          <div className="relative overflow-hidden rounded-3xl border border-line shadow-lift">
            <img
              src="https://images.pexels.com/photos/7495291/pexels-photo-7495291.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="Nexora Digital team collaborating in a modern office"
              className="h-[28rem] w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/30 via-transparent to-transparent" />
          </div>

          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 hidden rounded-2xl border border-line bg-white/90 p-5 shadow-lift backdrop-blur-xl sm:block">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-white">
                <CheckCircle2 className="h-6 w-6" />
              </span>
              <div>
                <p className="text-2xl font-extrabold text-ink">98%</p>
                <p className="text-xs font-medium text-muted">Client satisfaction</p>
              </div>
            </div>
          </div>

          {/* Decorative ring */}
          <div className="absolute -left-6 -top-6 -z-10 h-28 w-28 rounded-full border-2 border-primary-200/60 animate-spin-slow" />
        </div>

        {/* Text */}
        <div className="reveal" data-delay="120">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500" /> About Nexora
          </span>
          <h2 className="mt-5 text-3xl font-bold leading-[1.1] text-ink sm:text-4xl text-balance">
            A global team obsessed with <span className="gradient-text">measurable growth</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted text-pretty">
            Nexora Digital is a full-service digital marketing and technology agency with offices in
            Bangladesh, the USA, the UK, and Canada. We unite strategists, designers, engineers, and
            marketers under one roof to build brands that scale — and campaigns that pay for themselves.
          </p>

          <div className="mt-8 space-y-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="flex gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-ink">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stats */}
          <div className="mt-9 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="rounded-2xl border border-line bg-surface p-4 text-center transition-colors duration-300 hover:border-primary-200 hover:bg-primary-50/50">
                <p className="text-2xl font-extrabold text-ink sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
