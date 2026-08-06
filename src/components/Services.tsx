import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { getIcon } from '@/content/icons';
import { useContent, useSettings } from '@/lib/live';

interface Service {
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

const FALLBACK_SERVICES: (Service & { id: string })[] = [
  { id: '1', icon: 'Megaphone', title: 'Google Ads', description: 'High-intent paid search campaigns engineered for measurable ROAS and scalable customer acquisition.' },
  { id: '2', icon: 'Search', title: 'Search Engine Optimization', description: 'Technical, on-page, and content-led SEO that compounds organic traffic and authority over time.' },
  { id: '3', icon: 'Mail', title: 'Email Marketing', description: 'Lifecycle automation and segmented campaigns that nurture leads and drive repeat revenue.' },
  { id: '4', icon: 'Palette', title: 'Website Design', description: 'Conversion-focused, brand-led interfaces designed to impress and perform across every device.' },
  { id: '5', icon: 'Code2', title: 'Website Development', description: 'Fast, accessible, and SEO-ready websites built on modern stacks with pixel-perfect fidelity.' },
  { id: '6', icon: 'Zap', title: 'Web Applications', description: 'Scalable SaaS and internal tools with robust architecture, realtime data, and polished UX.' },
  { id: '7', icon: 'Smartphone', title: 'Flutter App Development', description: 'Cross-platform mobile apps with native feel — one codebase, iOS and Android, shipped fast.' },
  { id: '8', icon: 'Sparkles', title: 'UI/UX Design', description: 'Research-driven product design systems that turn complex flows into effortless experiences.' },
  { id: '9', icon: 'Palette', title: 'Brand Identity', description: 'Distinct visual identities — logo, type, color, and voice — crafted for long-term recognition.' },
  { id: '10', icon: 'Workflow', title: 'Marketing Automation', description: 'Connected funnels, CRM workflows, and attribution that turn scattered effort into a growth engine.' },
];

const FALLBACK_HEADING: HeadingSettings = {
  eyebrow: 'What we do',
  titlePrefix: 'Full-stack growth,',
  titleHighlight: 'under one roof',
  titleSuffix: '',
  description: 'Ten tightly-integrated disciplines — from paid acquisition to product engineering — orchestrated to move your numbers.',
};

export function Services() {
  const services = useContent<Service>('services', FALLBACK_SERVICES);
  const heading = useSettings('services_heading', FALLBACK_HEADING);

  return (
    <Section id="services" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={<>{heading.titlePrefix} <span className="gradient-text">{heading.titleHighlight}</span> {heading.titleSuffix}</>}
        description={heading.description}
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const Icon = getIcon(s.icon);
          return (
            <div
              key={s.id}
              className="reveal group relative overflow-hidden rounded-2xl border border-line bg-white p-6 shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:border-primary-200 hover:shadow-lift"
              data-delay={`${(i % 3) * 80}`}
            >
              {/* hover glow */}
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-200/0 blur-2xl transition-all duration-500 group-hover:bg-primary-200/50" />

              <div className="relative flex items-start justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors duration-500 group-hover:bg-primary-600 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted transition-all duration-500 group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>

              <h3 className="relative mt-5 text-lg font-bold text-ink">{s.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-muted">{s.description}</p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
