import { ArrowUpRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { useContent, useSettings } from '@/lib/live';

interface Project {
  title: string;
  category: string;
  image: string;
  featured: boolean;
}

interface HeadingSettings {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

const FALLBACK_PROJECTS: (Project & { id: string })[] = [
  { id: '1', title: 'Lumen — DTC rebrand & Shopify rebuild', category: 'Branding · E-commerce', image: 'https://images.pexels.com/photos/7598022/pexels-photo-7598022.jpeg?auto=compress&cs=tinysrgb&w=1200', featured: true },
  { id: '2', title: 'Northwind — SaaS growth dashboard', category: 'Web App · UI/UX', image: 'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
  { id: '3', title: 'Quantix — Paid acquisition engine', category: 'Google Ads · SEO', image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
  { id: '4', title: 'Vela — Flutter mobile banking app', category: 'Flutter · Product', image: 'https://images.pexels.com/photos/8546649/pexels-photo-8546649.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
  { id: '5', title: 'Helios — Lifecycle email automation', category: 'Email · Marketing Automation', image: 'https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
];

const FALLBACK_HEADING: HeadingSettings = {
  eyebrow: 'Selected work',
  titlePrefix: 'Work that',
  titleHighlight: 'moved the numbers',
  titleSuffix: '',
  description: 'A glimpse of recent engagements across branding, performance marketing, product, and engineering.',
};

function Card({ project, delay }: { project: Project; delay: number }) {
  const span = project.featured ? 'lg:col-span-2 lg:row-span-2' : '';
  return (
    <article
      className={`reveal group relative overflow-hidden rounded-3xl border border-line bg-ink shadow-card transition-all duration-500 hover:shadow-lift ${span}`}
      data-delay={`${delay}`}
    >
      <div className="relative h-full min-h-[14rem] w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />

        {/* Category badge */}
        <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
          {project.category}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-5">
          <div className="w-full translate-y-2 transition-transform duration-500 group-hover:translate-y-0">
            <div className="flex items-end justify-between gap-3">
              <h3 className={`font-bold text-white ${project.featured ? 'text-xl sm:text-2xl' : 'text-base'}`}>
                {project.title}
              </h3>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:rotate-0 -rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="text-xs font-semibold text-primary-300">View Project</span>
              <span className="h-px flex-1 bg-white/20" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const projects = useContent<Project>('portfolio', FALLBACK_PROJECTS);
  const heading = useSettings('portfolio_heading', FALLBACK_HEADING);

  return (
    <Section id="portfolio" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={<>{heading.titlePrefix} <span className="gradient-text">{heading.titleHighlight}</span> {heading.titleSuffix}</>}
        description={heading.description}
      />

      <div className="mt-14 grid auto-rows-[14rem] gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p, i) => (
          <Card key={p.id} project={p} delay={(i % 3) * 80} />
        ))}
      </div>

      {/* Case studies strip */}
      <div id="case-studies" className="reveal mt-16 overflow-hidden rounded-3xl border border-line bg-surface p-8 sm:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white px-3 py-1 text-xs font-semibold text-primary-700">
              Featured case study
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ink sm:text-3xl text-balance">
              How we 4.2x'd qualified pipeline for a B2B SaaS in 6 months
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted text-pretty">
              A full-funnel rebuild — paid search, content SEO, lifecycle email, and a new marketing site —
              that turned a flat pipeline into a predictable growth engine.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { v: '4.2x', l: 'Qualified pipeline' },
              { v: '-38%', l: 'Cost per lead' },
              { v: '5.8x', l: 'Return on ad spend' },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-line bg-white p-4 text-center">
                <p className="text-2xl font-extrabold gradient-text">{s.v}</p>
                <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-muted">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
