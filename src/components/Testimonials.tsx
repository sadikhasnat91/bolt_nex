import { Quote, Star } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

interface Testimonial {
  name: string;
  company: string;
  rating: number;
  quote: string;
  image: string;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Daniel Mercer',
    company: 'Lumen DTC',
    rating: 5,
    quote: 'Nexora rebuilt our brand and store and rebuilt our pipeline with it. We hit a 4x in qualified leads inside two quarters — and the work still looks beautiful.',
    image: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Priya Nair',
    company: 'Quantix SaaS',
    rating: 5,
    quote: 'The most senior team we have worked with. Strategy, design, and engineering under one roof meant no finger-pointing — just results, month after month.',
    image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'James Whitfield',
    company: 'Northwind Group',
    rating: 5,
    quote: 'Their reporting is the first we have actually trusted. Transparent, real-time, and tied to revenue — not vanity metrics. A genuine growth partner.',
    image: 'https://images.pexels.com/photos/35490806/pexels-photo-35490806.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Sofia Almeida',
    company: 'Vela Finance',
    rating: 5,
    quote: 'They shipped our Flutter app in 10 weeks — native feel, zero compromises. Our store rating went from 3.4 to 4.8 within a month of launch.',
    image: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    name: 'Marcus Bennett',
    company: 'Helios Energy',
    rating: 5,
    quote: 'The lifecycle email program alone paid for the entire engagement in under 90 days. Genuinely the best agency investment we have made.',
    image: 'https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < n ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'}`} />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow="Client voices"
        title={<>Trusted by operators who <span className="gradient-text">measure everything</span></>}
        description="Real outcomes from real partners — across e-commerce, SaaS, finance, and energy."
      />

      {/* Slider layout: a marquee of premium cards */}
      <div className="mask-fade-r mt-14 overflow-hidden">
        <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, i) => (
            <article
              key={`${t.name}-${i}`}
              className="relative w-[20rem] shrink-0 overflow-hidden rounded-3xl border border-line bg-white p-6 shadow-card transition-all duration-500 hover:shadow-lift sm:w-[24rem]"
            >
              <Quote className="absolute right-5 top-5 h-10 w-10 text-primary-100" />
              <Stars n={t.rating} />
              <p className="mt-4 text-sm leading-relaxed text-ink-soft text-pretty">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                <img src={t.image} alt={t.name} loading="lazy" className="h-11 w-11 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-bold text-ink">{t.name}</p>
                  <p className="text-xs text-muted">{t.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
