import { ArrowRight, BarChart3, Mail, Megaphone, MousePointerClick, Search, Smartphone } from 'lucide-react';
import { Button } from '@/components/Button';

const STATS = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '100+', label: 'Clients' },
  { value: '4', label: 'Countries' },
  { value: '98%', label: 'Satisfaction' },
];

const FLOATING_CARDS = [
  { icon: Megaphone, label: 'Google Ads', tone: 'from-rose-500/15 to-rose-500/5', dot: 'bg-rose-500', style: 'left-[-2.5rem] top-6' },
  { icon: Search, label: 'SEO', tone: 'from-primary-500/15 to-primary-500/5', dot: 'bg-primary-500', style: 'right-[-2rem] top-16' },
  { icon: Mail, label: 'Email Marketing', tone: 'from-amber-500/15 to-amber-500/5', dot: 'bg-amber-500', style: 'left-[-3rem] bottom-16' },
  { icon: MousePointerClick, label: 'Website', tone: 'from-sky-500/15 to-sky-500/5', dot: 'bg-sky-500', style: 'right-[-1.5rem] bottom-10' },
  { icon: Smartphone, label: 'App Development', tone: 'from-violet-500/15 to-violet-500/5', dot: 'bg-violet-500', style: 'right-[-2.5rem] bottom-[-0.75rem]' },
];

function MiniBar({ h, delay }: { h: number; delay: number }) {
  return (
    <div
      className="w-full origin-bottom rounded-t-md gradient-primary"
      style={{ height: `${h}%`, animation: `bar-rise 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s both` }}
    />
  );
}

function DashboardMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[26rem]">
      {/* Glow */}
      <div className="absolute -inset-8 -z-10">
        <div className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-400/30 blur-3xl animate-pulse-glow" />
        <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-emerald-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-36 w-36 rounded-full bg-teal-300/20 blur-3xl" />
      </div>

      {/* Dashboard card */}
      <div className="relative rounded-[1.5rem] border border-white/60 bg-white/80 p-2.5 shadow-lift backdrop-blur-xl">
        <div className="rounded-[1.1rem] border border-line bg-white/90 overflow-hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between border-b border-line bg-surface px-3.5 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              <span className="h-2 w-2 rounded-full bg-primary-400" />
            </div>
            <div className="flex items-center gap-2 rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-medium text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
              nexora.com/dashboard
            </div>
            <BarChart3 className="h-3.5 w-3.5 text-muted" />
          </div>

          {/* Body */}
          <div className="grid grid-cols-3 gap-2.5 p-3">
            {/* KPI tiles */}
            <div className="col-span-3 grid grid-cols-3 gap-2.5">
              {[
                { k: 'Revenue', v: '$248K', d: '+18.2%' },
                { k: 'Leads', v: '1,924', d: '+12.4%' },
                { k: 'ROAS', v: '5.8x', d: '+0.6x' },
              ].map((t) => (
                <div key={t.k} className="rounded-lg border border-line bg-white p-2.5">
                  <p className="text-[9px] font-semibold uppercase tracking-wider text-muted">{t.k}</p>
                  <p className="mt-0.5 text-base font-bold text-ink">{t.v}</p>
                  <p className="text-[10px] font-semibold text-primary-600">{t.d}</p>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="col-span-2 rounded-lg border border-line bg-white p-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-semibold text-ink">Performance</p>
                <p className="text-[10px] font-medium text-muted">Last 30 days</p>
              </div>
              <div className="mt-3 flex h-16 items-end gap-1.5">
                <MiniBar h={42} delay={0.05} />
                <MiniBar h={58} delay={0.12} />
                <MiniBar h={36} delay={0.19} />
                <MiniBar h={72} delay={0.26} />
                <MiniBar h={50} delay={0.33} />
                <MiniBar h={84} delay={0.4} />
                <MiniBar h={64} delay={0.47} />
                <MiniBar h={96} delay={0.54} />
                <MiniBar h={78} delay={0.61} />
                <MiniBar h={88} delay={0.68} />
              </div>
            </div>

            {/* Donut */}
            <div className="rounded-lg border border-line bg-white p-3">
              <p className="text-[11px] font-semibold text-ink">Channels</p>
              <div className="mt-2 flex items-center justify-center">
                <div className="relative h-14 w-14">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'conic-gradient(#10b981 0 55%, #34d399 55% 78%, #a7f3d0 78% 100%)' }}
                  />
                  <div className="absolute inset-[10px] rounded-full bg-white" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-ink">55%</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 space-y-1">
                {[
                  { l: 'Paid', c: 'bg-primary-500' },
                  { l: 'Organic', c: 'bg-primary-400' },
                  { l: 'Social', c: 'bg-primary-300' },
                ].map((r) => (
                  <div key={r.l} className="flex items-center gap-2 text-[10px] text-muted">
                    <span className={`h-1.5 w-1.5 rounded-full ${r.c}`} />
                    {r.l}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating service cards */}
      {FLOATING_CARDS.map((c, i) => {
        const Icon = c.icon;
        return (
          <div
            key={c.label}
            className={`absolute hidden lg:block ${c.style}`}
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            <div
              className={`flex items-center gap-2 rounded-xl border border-white/70 bg-gradient-to-br ${c.tone} px-2.5 py-2 shadow-lift backdrop-blur-xl ${i % 2 === 0 ? 'animate-float-y' : 'animate-float-y-sm'}`}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-white/80 shadow-sm">
                <Icon className="h-3.5 w-3.5 text-ink" />
              </span>
              <div className="pr-1">
                <p className="text-[10px] font-semibold text-ink">{c.label}</p>
                <div className="mt-0.5 flex items-center gap-1">
                  <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
                  <span className="text-[9px] text-muted">Active</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-16 pb-8 sm:pb-10"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid bg-grid-fade opacity-60" />
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary-200/40 blur-3xl" />
        <div className="absolute right-[-10%] top-20 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="absolute left-[-8%] bottom-0 h-64 w-64 rounded-full bg-teal-100/60 blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-6 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left */}
        <div className="flex flex-col items-start">
          <div className="reveal inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/70 px-3 py-1 text-xs font-semibold text-primary-700 shadow-sm backdrop-blur">
            <span className="flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
            </span>
            Awwwards-worthy digital experiences
          </div>

          <h1 className="reveal mt-4 text-3xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-4xl md:text-5xl lg:text-[3.4rem] text-balance" data-delay="80">
            Powering Business Growth Through{' '}
            <span className="gradient-text">Digital Marketing</span> & Modern Technology
          </h1>

          <p className="reveal mt-3 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg" data-delay="160">
            We blend performance marketing, design, and engineering to build brands that
            scale. From Google Ads to Flutter apps — Nexora Digital is your full-stack growth partner.
          </p>

          <div className="reveal mt-5 flex flex-wrap items-center gap-3" data-delay="240">
            <Button size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              Book Free Consultation
            </Button>
            <Button variant="secondary" size="lg" icon={<ArrowRight className="h-4 w-4" />}>
              View Our Work
            </Button>
          </div>

          {/* Stats */}
          <div className="reveal mt-6 grid w-full max-w-xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-4" data-delay="320">
            {STATS.map((s) => (
              <div key={s.label} className="bg-white px-4 py-3 text-center sm:py-3.5">
                <p className="text-xl font-extrabold text-ink sm:text-2xl">{s.value}</p>
                <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="reveal relative" data-delay="200">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}
