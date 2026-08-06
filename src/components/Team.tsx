import { Link, Mail } from 'lucide-react';
import { Section, SectionHeading } from '@/components/Section';
import { useContent, useSettings } from '@/lib/live';

interface Member {
  name: string;
  role: string;
  department: string;
  image: string;
  bio: string;
}

interface HeadingSettings {
  eyebrow: string;
  titlePrefix: string;
  titleHighlight: string;
  titleSuffix: string;
  description: string;
}

const FALLBACK_TEAM: (Member & { id: string })[] = [
  { id: '1', name: 'Arman Hossain', role: 'Founder & CEO', department: 'Leadership', image: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Sets the vision and champions a craft-first, outcome-obsessed culture across every office.' },
  { id: '2', name: 'Sadia Rahman', role: 'Project Manager', department: 'Operations', image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Keeps complex multi-discipline engagements on time, on scope, and on budget.' },
  { id: '3', name: 'Tanvir Ahmed', role: 'Google Ads Expert', department: 'Performance', image: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Architects paid search programs that scale profitably across competitive verticals.' },
  { id: '4', name: 'Nusrat Jahan', role: 'SEO Specialist', department: 'Growth', image: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Turns technical audits and content strategy into compounding organic visibility.' },
  { id: '5', name: 'Mehedi Hasan', role: 'Email Marketing Expert', department: 'Lifecycle', image: 'https://images.pexels.com/photos/7752812/pexels-photo-7752812.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Designs automated lifecycle journeys that nurture, convert, and retain.' },
  { id: '6', name: 'Farzana Akter', role: 'UI Designer', department: 'Design', image: 'https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Crafts interfaces that feel inevitable — clear, considered, and on-brand.' },
  { id: '7', name: 'Rakib Islam', role: 'Frontend Developer', department: 'Engineering', image: 'https://images.pexels.com/photos/35052348/pexels-photo-35052348.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Builds fast, accessible interfaces with pixel-perfect fidelity to design.' },
  { id: '8', name: 'Sabbir Khan', role: 'Backend Developer', department: 'Engineering', image: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Designs robust APIs and data architecture that scale with the business.' },
  { id: '9', name: 'Imtiaz Mahmud', role: 'Flutter Developer', department: 'Mobile', image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Ships cross-platform mobile apps with native feel from a single codebase.' },
  { id: '10', name: 'Tahmina Sultana', role: 'Graphic Designer', department: 'Design', image: 'https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Translates brand strategy into distinctive visual systems and assets.' },
  { id: '11', name: 'Joy Chakma', role: 'QA Engineer', department: 'Engineering', image: 'https://images.pexels.com/photos/36434829/pexels-photo-36434829.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Guards quality with rigorous, automated test coverage across every release.' },
  { id: '12', name: 'Naimur Rahman', role: 'Sales Manager', department: 'Commercial', image: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&w=600', bio: 'Helps prospective clients find the right engagement for their goals.' },
  { id: '13', name: 'Lamia Chowdhury', role: 'HR Lead', department: 'People', image: 'https://images.pexels.com/photos/38652616/pexels-photo-38652616.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Builds the people practices that keep a global team connected and growing.' },
  { id: '14', name: 'Hasib Karim', role: 'Customer Success', department: 'Client', image: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Ensures every client relationship delivers value long after launch.' },
];

const FALLBACK_HEADING: HeadingSettings = {
  eyebrow: 'The people',
  titlePrefix: 'Senior talent,',
  titleHighlight: 'no hand-offs',
  titleSuffix: '',
  description: 'The strategists, designers, and engineers you meet are the ones who do the work.',
};

function MemberCard({ m, delay }: { m: Member; delay: number }) {
  return (
    <article
      className="reveal group relative overflow-hidden rounded-3xl border border-line bg-white shadow-card transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
      data-delay={`${delay}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={m.image}
          alt={m.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />

        {/* Department tag */}
        <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
          {m.department}
        </span>

        {/* Social icons */}
        <div className="absolute right-3 top-3 flex gap-1.5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary-500 hover:border-primary-500" aria-label={`${m.name} professional profile`}>
            <Link className="h-4 w-4" />
          </a>
          <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-primary-500 hover:border-primary-500" aria-label={`Email ${m.name}`}>
            <Mail className="h-4 w-4" />
          </a>
        </div>

        {/* Name block */}
        <div className="absolute inset-x-0 bottom-0 p-4">
          <h3 className="text-base font-bold text-white">{m.name}</h3>
          <p className="text-xs font-medium text-primary-300">{m.role}</p>
          <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-slate-200 opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
            {m.bio}
          </p>
        </div>
      </div>
    </article>
  );
}

export function Team() {
  const team = useContent<Member>('team', FALLBACK_TEAM);
  const heading = useSettings('team_heading', FALLBACK_HEADING);

  return (
    <Section id="team" className="py-24 sm:py-28">
      <SectionHeading
        eyebrow={heading.eyebrow}
        title={<>{heading.titlePrefix} <span className="gradient-text">{heading.titleHighlight}</span> {heading.titleSuffix}</>}
        description={heading.description}
      />

      <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {team.map((m, i) => (
          <MemberCard key={m.id} m={m} delay={(i % 4) * 70} />
        ))}
      </div>
    </Section>
  );
}
