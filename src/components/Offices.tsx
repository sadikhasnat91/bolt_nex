import { Clock, MapPin } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';

interface Office {
  country: string;
  city: string;
  tag: string;
  address: string;
  hours: string;
  image: string;
}

const OFFICES: Office[] = [
  {
    country: 'Bangladesh',
    city: 'Dhaka',
    tag: 'Head Office',
    address: 'Level 12, Gulshan Avenue, Gulshan 1, Dhaka 1212',
    hours: 'Sun–Thu · 9:00 AM – 6:00 PM (GMT+6)',
    image: 'https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    country: 'United States',
    city: 'New York',
    tag: 'Americas',
    address: '350 Fifth Avenue, Suite 4200, New York, NY 10118',
    hours: 'Mon–Fri · 9:00 AM – 6:00 PM (EST)',
    image: 'https://images.pexels.com/photos/19238254/pexels-photo-19238254.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    country: 'United Kingdom',
    city: 'London',
    tag: 'Europe',
    address: '1 Finsbury Avenue, Floor 8, London EC2M 2PF',
    hours: 'Mon–Fri · 9:00 AM – 6:00 PM (GMT)',
    image: 'https://images.pexels.com/photos/36631701/pexels-photo-36631701.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    country: 'Canada',
    city: 'Toronto',
    tag: 'North America',
    address: '100 King Street West, Suite 5700, Toronto, ON M5X 1C7',
    hours: 'Mon–Fri · 9:00 AM – 6:00 PM (EST)',
    image: 'https://images.pexels.com/photos/32205998/pexels-photo-32205998.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
];

export function Offices() {
  return (
    <Section id="offices" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow="Global presence"
        title={<>Four offices, <span className="gradient-text">one standard</span></>}
        description="Follow-the-sun coverage across Asia, the Americas, and Europe — with local teams who understand local markets."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {OFFICES.map((o, i) => (
          <article
            key={o.country}
            className="reveal group overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            data-delay={`${(i % 4) * 70}`}
          >
            <div className="relative h-40 overflow-hidden">
              <img
                src={o.image}
                alt={`${o.city} office`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                {o.tag}
              </span>
              <div className="absolute bottom-3 left-3 text-white">
                <p className="text-lg font-bold leading-tight">{o.city}</p>
                <p className="text-xs font-medium text-slate-200">{o.country}</p>
              </div>
            </div>

            <div className="space-y-3 p-4">
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <p className="text-xs leading-relaxed text-muted">{o.address}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <p className="text-xs leading-relaxed text-muted">{o.hours}</p>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="relative mx-4 mb-4 h-24 overflow-hidden rounded-xl border border-line bg-surface">
              <div className="absolute inset-0 bg-grid opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-primary-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-primary-600 ring-4 ring-primary-100" />
                </span>
              </div>
              <span className="absolute bottom-2 right-2 rounded-md bg-white/80 px-2 py-0.5 text-[10px] font-medium text-muted backdrop-blur">
                Map
              </span>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
