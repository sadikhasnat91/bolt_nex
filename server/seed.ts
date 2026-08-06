import { nanoid } from 'nanoid';
import bcrypt from 'bcryptjs';
import { db, isEmpty } from './db.ts';

interface CollectionSeed {
  collection: string;
  items: Record<string, unknown>[];
}

const COLLECTION_SEEDS: CollectionSeed[] = [
  {
    collection: 'services',
    items: [
      { icon: 'Megaphone', title: 'Google Ads', description: 'High-intent paid search campaigns engineered for measurable ROAS and scalable customer acquisition.' },
      { icon: 'Search', title: 'Search Engine Optimization', description: 'Technical, on-page, and content-led SEO that compounds organic traffic and authority over time.' },
      { icon: 'Mail', title: 'Email Marketing', description: 'Lifecycle automation and segmented campaigns that nurture leads and drive repeat revenue.' },
      { icon: 'Palette', title: 'Website Design', description: 'Conversion-focused, brand-led interfaces designed to impress and perform across every device.' },
      { icon: 'Code2', title: 'Website Development', description: 'Fast, accessible, and SEO-ready websites built on modern stacks with pixel-perfect fidelity.' },
      { icon: 'Zap', title: 'Web Applications', description: 'Scalable SaaS and internal tools with robust architecture, realtime data, and polished UX.' },
      { icon: 'Smartphone', title: 'Flutter App Development', description: 'Cross-platform mobile apps with native feel — one codebase, iOS and Android, shipped fast.' },
      { icon: 'Sparkles', title: 'UI/UX Design', description: 'Research-driven product design systems that turn complex flows into effortless experiences.' },
      { icon: 'Palette', title: 'Brand Identity', description: 'Distinct visual identities — logo, type, color, and voice — crafted for long-term recognition.' },
      { icon: 'Workflow', title: 'Marketing Automation', description: 'Connected funnels, CRM workflows, and attribution that turn scattered effort into a growth engine.' },
    ],
  },
  {
    collection: 'about_values',
    items: [
      { icon: 'Target', title: 'Mission', text: 'Empower brands to grow predictably through transparent, data-driven digital marketing and modern engineering.' },
      { icon: 'Eye', title: 'Vision', text: 'To be the most trusted growth partner for ambitious companies across every continent we operate in.' },
      { icon: 'Heart', title: 'Core Values', text: 'Integrity, craftsmanship, and relentless curiosity — in every campaign, every line of code, every pixel.' },
    ],
  },
  {
    collection: 'about_stats',
    items: [
      { value: '8+', label: 'Years in business' },
      { value: '500+', label: 'Projects delivered' },
      { value: '120+', label: 'Team members' },
      { value: '4', label: 'Global offices' },
    ],
  },
  {
    collection: 'hero_stats',
    items: [
      { value: '500+', label: 'Projects Delivered' },
      { value: '100+', label: 'Clients' },
      { value: '4', label: 'Countries' },
      { value: '98%', label: 'Satisfaction' },
    ],
  },
  {
    collection: 'why_choose_us_rows',
    items: [
      { feature: 'Dedicated senior strategist', us: true, them: false },
      { feature: 'In-house design + engineering', us: true, them: false },
      { feature: 'Transparent real-time reporting', us: true, them: true },
      { feature: 'Month-to-month, no lock-in', us: true, them: false },
      { feature: '4 global offices, same time-zone coverage', us: true, them: false },
      { feature: 'Performance guarantee on ad spend', us: true, them: false },
      { feature: 'Generic templated deliverables', us: false, them: true },
      { feature: 'Junior account managers', us: false, them: true },
    ],
  },
  {
    collection: 'portfolio',
    items: [
      { title: 'Lumen — DTC rebrand & Shopify rebuild', category: 'Branding · E-commerce', image: 'https://images.pexels.com/photos/7598022/pexels-photo-7598022.jpeg?auto=compress&cs=tinysrgb&w=1200', featured: true },
      { title: 'Northwind — SaaS growth dashboard', category: 'Web App · UI/UX', image: 'https://images.pexels.com/photos/577195/pexels-photo-577195.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
      { title: 'Quantix — Paid acquisition engine', category: 'Google Ads · SEO', image: 'https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
      { title: 'Vela — Flutter mobile banking app', category: 'Flutter · Product', image: 'https://images.pexels.com/photos/8546649/pexels-photo-8546649.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
      { title: 'Helios — Lifecycle email automation', category: 'Email · Marketing Automation', image: 'https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg?auto=compress&cs=tinysrgb&w=900', featured: false },
    ],
  },
  {
    collection: 'team',
    items: [
      { name: 'Arman Hossain', role: 'Founder & CEO', department: 'Leadership', image: 'https://images.pexels.com/photos/28442318/pexels-photo-28442318.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Sets the vision and champions a craft-first, outcome-obsessed culture across every office.' },
      { name: 'Sadia Rahman', role: 'Project Manager', department: 'Operations', image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Keeps complex multi-discipline engagements on time, on scope, and on budget.' },
      { name: 'Tanvir Ahmed', role: 'Google Ads Expert', department: 'Performance', image: 'https://images.pexels.com/photos/5308640/pexels-photo-5308640.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Architects paid search programs that scale profitably across competitive verticals.' },
      { name: 'Nusrat Jahan', role: 'SEO Specialist', department: 'Growth', image: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Turns technical audits and content strategy into compounding organic visibility.' },
      { name: 'Mehedi Hasan', role: 'Email Marketing Expert', department: 'Lifecycle', image: 'https://images.pexels.com/photos/7752812/pexels-photo-7752812.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Designs automated lifecycle journeys that nurture, convert, and retain.' },
      { name: 'Farzana Akter', role: 'UI Designer', department: 'Design', image: 'https://images.pexels.com/photos/38707525/pexels-photo-38707525.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Crafts interfaces that feel inevitable — clear, considered, and on-brand.' },
      { name: 'Rakib Islam', role: 'Frontend Developer', department: 'Engineering', image: 'https://images.pexels.com/photos/35052348/pexels-photo-35052348.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Builds fast, accessible interfaces with pixel-perfect fidelity to design.' },
      { name: 'Sabbir Khan', role: 'Backend Developer', department: 'Engineering', image: 'https://images.pexels.com/photos/38740728/pexels-photo-38740728.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Designs robust APIs and data architecture that scale with the business.' },
      { name: 'Imtiaz Mahmud', role: 'Flutter Developer', department: 'Mobile', image: 'https://images.pexels.com/photos/14950779/pexels-photo-14950779.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Ships cross-platform mobile apps with native feel from a single codebase.' },
      { name: 'Tahmina Sultana', role: 'Graphic Designer', department: 'Design', image: 'https://images.pexels.com/photos/33369429/pexels-photo-33369429.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Translates brand strategy into distinctive visual systems and assets.' },
      { name: 'Joy Chakma', role: 'QA Engineer', department: 'Engineering', image: 'https://images.pexels.com/photos/36434829/pexels-photo-36434829.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Guards quality with rigorous, automated test coverage across every release.' },
      { name: 'Naimur Rahman', role: 'Sales Manager', department: 'Commercial', image: 'https://images.pexels.com/photos/31422830/pexels-photo-31422830.png?auto=compress&cs=tinysrgb&w=600', bio: 'Helps prospective clients find the right engagement for their goals.' },
      { name: 'Lamia Chowdhury', role: 'HR Lead', department: 'People', image: 'https://images.pexels.com/photos/38652616/pexels-photo-38652616.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Builds the people practices that keep a global team connected and growing.' },
      { name: 'Hasib Karim', role: 'Customer Success', department: 'Client', image: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&w=600', bio: 'Ensures every client relationship delivers value long after launch.' },
    ],
  },
  {
    collection: 'offices',
    items: [
      { country: 'Bangladesh', city: 'Dhaka', tag: 'Head Office', address: 'Level 12, Gulshan Avenue, Gulshan 1, Dhaka 1212', hours: 'Sun–Thu · 9:00 AM – 6:00 PM (GMT+6)', image: 'https://images.pexels.com/photos/13219418/pexels-photo-13219418.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { country: 'United States', city: 'New York', tag: 'Americas', address: '350 Fifth Avenue, Suite 4200, New York, NY 10118', hours: 'Mon–Fri · 9:00 AM – 6:00 PM (EST)', image: 'https://images.pexels.com/photos/19238254/pexels-photo-19238254.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { country: 'United Kingdom', city: 'London', tag: 'Europe', address: '1 Finsbury Avenue, Floor 8, London EC2M 2PF', hours: 'Mon–Fri · 9:00 AM – 6:00 PM (GMT)', image: 'https://images.pexels.com/photos/36631701/pexels-photo-36631701.jpeg?auto=compress&cs=tinysrgb&w=900' },
      { country: 'Canada', city: 'Toronto', tag: 'North America', address: '100 King Street West, Suite 5700, Toronto, ON M5X 1C7', hours: 'Mon–Fri · 9:00 AM – 6:00 PM (EST)', image: 'https://images.pexels.com/photos/32205998/pexels-photo-32205998.jpeg?auto=compress&cs=tinysrgb&w=900' },
    ],
  },
  {
    collection: 'process',
    items: [
      { icon: 'Compass', title: 'Discovery', description: 'We immerse in your business, goals, and market to define what success looks like.' },
      { icon: 'Search', title: 'Research', description: 'Audience, competitor, and keyword research that grounds every decision in evidence.' },
      { icon: 'LineChart', title: 'Planning', description: 'A prioritized roadmap with clear KPIs, milestones, and ownership across disciplines.' },
      { icon: 'PenTool', title: 'Design', description: 'Brand-led, conversion-focused design systems crafted for every touchpoint.' },
      { icon: 'FlaskConical', title: 'Development', description: 'Fast, accessible, scalable builds — websites, apps, and automations shipped clean.' },
      { icon: 'TestTube2', title: 'Testing', description: 'Rigorous QA and experimentation to de-risk launches and find upside early.' },
      { icon: 'Rocket', title: 'Launch', description: 'Coordinated go-live with monitoring, analytics, and rollback in place.' },
      { icon: 'ShieldCheck', title: 'Growth', description: 'Continuous optimization and reporting that compounds results over time.' },
    ],
  },
  {
    collection: 'testimonials',
    items: [
      { name: 'Daniel Mercer', company: 'Lumen DTC', rating: 5, quote: 'Nexora rebuilt our brand and store and rebuilt our pipeline with it. We hit a 4x in qualified leads inside two quarters — and the work still looks beautiful.', image: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Priya Nair', company: 'Quantix SaaS', rating: 5, quote: 'The most senior team we have worked with. Strategy, design, and engineering under one roof meant no finger-pointing — just results, month after month.', image: 'https://images.pexels.com/photos/33680700/pexels-photo-33680700.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'James Whitfield', company: 'Northwind Group', rating: 5, quote: 'Their reporting is the first we have actually trusted. Transparent, real-time, and tied to revenue — not vanity metrics. A genuine growth partner.', image: 'https://images.pexels.com/photos/35490806/pexels-photo-35490806.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Sofia Almeida', company: 'Vela Finance', rating: 5, quote: 'They shipped our Flutter app in 10 weeks — native feel, zero compromises. Our store rating went from 3.4 to 4.8 within a month of launch.', image: 'https://images.pexels.com/photos/8312669/pexels-photo-8312669.jpeg?auto=compress&cs=tinysrgb&w=400' },
      { name: 'Marcus Bennett', company: 'Helios Energy', rating: 5, quote: 'The lifecycle email program alone paid for the entire engagement in under 90 days. Genuinely the best agency investment we have made.', image: 'https://images.pexels.com/photos/7752813/pexels-photo-7752813.jpeg?auto=compress&cs=tinysrgb&w=400' },
    ],
  },
  {
    collection: 'pricing',
    items: [
      { name: 'Starter', price: '$1,900', cadence: '/ month', blurb: 'For early-stage brands that need a focused growth engine.', features: ['1 marketing channel', 'Monthly strategy session', 'Bi-weekly reporting', 'Email support', '1 dedicated specialist'], cta: 'Start with Starter', popular: false },
      { name: 'Growth', price: '$4,900', cadence: '/ month', blurb: 'For scaling companies ready to compound across channels.', features: ['Up to 3 channels', 'Weekly strategy + standups', 'Real-time dashboard', 'Priority support', 'Senior strategist + 2 specialists', 'Quarterly roadmap review'], cta: 'Choose Growth', popular: true },
      { name: 'Enterprise', price: 'Custom', cadence: '', blurb: 'For established teams that need a full-stack growth partner.', features: ['Unlimited channels', 'Dedicated cross-functional pod', 'Custom reporting & attribution', '24/7 priority support', 'SLA & performance guarantee', 'Quarterly business review'], cta: 'Talk to sales', popular: false },
    ],
  },
  {
    collection: 'faq',
    items: [
      { q: 'Do you require long-term contracts?', a: 'No. Every engagement is month-to-month. We earn your renewal with results, not a lock-in. Enterprise pods can be structured around quarterly business reviews if you prefer.' },
      { q: 'How quickly can we get started?', a: 'Most clients kick off within 5 business days of signing. Discovery and onboarding happen in week one, and the first working deliverables typically land by week two.' },
      { q: 'Which channels do you cover?', a: 'Google Ads, SEO, email marketing, paid and organic social, marketing automation, plus full design and engineering — websites, web apps, and Flutter mobile apps. You can engage one channel or the full stack.' },
      { q: 'Do you guarantee results?', a: 'Enterprise engagements include a performance guarantee on ad spend. For all plans, we tie our reporting to revenue and pipeline — not vanity metrics — so you can judge ROI transparently.' },
      { q: 'Will I get senior people or juniors?', a: 'Senior, always. The strategists, designers, and engineers you meet during sales are the ones who do the work. No bait-and-switch, no junior account managers learning on your budget.' },
      { q: 'Can you work with our existing team or agency?', a: 'Absolutely. We frequently embed alongside in-house teams or specialist partners — filling capability gaps and sharing reporting so everyone is aligned on the same outcomes.' },
    ],
  },
  {
    collection: 'trusted_by',
    items: [
      { name: 'Lumen' }, { name: 'Northwind' }, { name: 'Quantix' }, { name: 'Vela' }, { name: 'Helios' },
      { name: 'Monarch' }, { name: 'Cobalt' }, { name: 'Aurora' }, { name: 'Vertex' }, { name: 'Sable' },
    ],
  },
  {
    collection: 'footer_columns',
    items: [
      { title: 'Services', links: ['Google Ads', 'SEO', 'Email Marketing', 'Web Development', 'Flutter Apps', 'UI/UX Design'] },
      { title: 'Company', links: ['About', 'Team', 'Careers', 'Offices', 'Case Studies', 'Contact'] },
      { title: 'Resources', links: ['Blog', 'Guides', 'Webinars', 'Free Audit', 'Glossary', 'Help Center'] },
      { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security', 'SLA'] },
    ],
  },
];

const SETTINGS_SEEDS: Record<string, Record<string, unknown>> = {
  site: { brandName: 'Nexora Digital' },
  hero: {
    badge: 'Awwwards-worthy digital experiences',
    headingPrefix: 'Powering Business Growth Through',
    headingHighlight: 'Digital Marketing',
    headingSuffix: '& Modern Technology',
    description: 'We blend performance marketing, design, and engineering to build brands that scale. From Google Ads to Flutter apps — Nexora Digital is your full-stack growth partner.',
    ctaPrimaryLabel: 'Book Free Consultation',
    ctaSecondaryLabel: 'View Our Work',
  },
  about: {
    badge: 'About Nexora',
    headingPrefix: 'A global team obsessed with',
    headingHighlight: 'measurable growth',
    description: 'Nexora Digital is a full-service digital marketing and technology agency with offices in Bangladesh, the USA, the UK, and Canada. We unite strategists, designers, engineers, and marketers under one roof to build brands that scale — and campaigns that pay for themselves.',
    image: 'https://images.pexels.com/photos/7495291/pexels-photo-7495291.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  why_panels: {
    usBadge: 'Nexora Digital',
    usHeading: 'A partner invested in your outcomes',
    usText: 'Senior talent, custom craft, and reporting you can actually trust — built to compound, not to churn.',
    themBadge: 'Typical agency',
    themHeading: 'A vendor that invoices monthly',
    themText: 'Templated work, junior hands, and long contracts that lock you in regardless of results.',
  },
  faq_intro: {
    eyebrow: 'FAQ',
    titlePrefix: 'Answers, before',
    titleHighlight: 'you ask',
    description: 'Still have questions? Book a free consultation and we will answer them in 30 minutes — no pitch, no pressure.',
  },
  contact: {
    badge: "Let's talk",
    headingPrefix: 'Book your free',
    headingHighlight: '30-min consultation',
    description: 'Tell us where you want to grow. We will bring the plan, the team, and the numbers — and you decide if we are a fit.',
    email: 'hello@nexoradigital.com',
    phone: '+1 (212) 555-0188',
    address: 'Gulshan 1, Dhaka 1212, Bangladesh',
    hours: 'Sun–Thu · 9AM – 6PM (GMT+6)',
  },
  footer: {
    tagline: 'Powering business growth through digital marketing and modern technology — across four continents.',
    newsletterHeading: 'Subscribe to our newsletter',
    newsletterSubtext: 'Monthly insights on growth, design, and engineering. No spam.',
  },
  services_heading: { eyebrow: 'What we do', titlePrefix: 'Full-stack growth,', titleHighlight: 'under one roof', titleSuffix: '', description: 'Ten tightly-integrated disciplines — from paid acquisition to product engineering — orchestrated to move your numbers.' },
  why_heading: { eyebrow: 'Why Nexora', titlePrefix: 'The difference is in the', titleHighlight: 'details', titleSuffix: '', description: 'A side-by-side look at what working with a premium partner actually feels like.' },
  portfolio_heading: { eyebrow: 'Selected work', titlePrefix: 'Work that', titleHighlight: 'moved the numbers', titleSuffix: '', description: 'A glimpse of recent engagements across branding, performance marketing, product, and engineering.' },
  team_heading: { eyebrow: 'The people', titlePrefix: 'Senior talent,', titleHighlight: 'no hand-offs', titleSuffix: '', description: 'The strategists, designers, and engineers you meet are the ones who do the work.' },
  offices_heading: { eyebrow: 'Global presence', titlePrefix: 'Four offices,', titleHighlight: 'one standard', titleSuffix: '', description: 'Follow-the-sun coverage across Asia, the Americas, and Europe — with local teams who understand local markets.' },
  process_heading: { eyebrow: 'How we work', titlePrefix: 'A process built to', titleHighlight: 'compound', titleSuffix: '', description: 'Eight disciplined stages — from first conversation to long-term growth — that turn ambition into outcomes.' },
  testimonials_heading: { eyebrow: 'Client voices', titlePrefix: 'Trusted by operators who', titleHighlight: 'measure everything', titleSuffix: '', description: 'Real outcomes from real partners — across e-commerce, SaaS, finance, and energy.' },
  pricing_heading: { eyebrow: 'Pricing', titlePrefix: 'Simple plans,', titleHighlight: 'serious outcomes', titleSuffix: '', description: 'Transparent monthly engagements. No long lock-ins, no hidden line items — cancel anytime.' },
};

export function seed() {
  if (!isEmpty()) return;

  const now = new Date().toISOString();

  const insertItem = db.prepare(
    'INSERT INTO collection_items (id, collection, position, data, updated_at) VALUES (?, ?, ?, ?, ?)'
  );
  for (const { collection, items } of COLLECTION_SEEDS) {
    items.forEach((item, i) => {
      insertItem.run(nanoid(), collection, i, JSON.stringify(item), now);
    });
  }

  const insertSetting = db.prepare(
    'INSERT INTO settings (key, value, updated_at) VALUES (?, ?, ?)'
  );
  for (const [key, value] of Object.entries(SETTINGS_SEEDS)) {
    insertSetting.run(key, JSON.stringify(value), now);
  }

  const adminUsername = process.env.ADMIN_USERNAME ?? 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'admin123';
  const passwordHash = bcrypt.hashSync(adminPassword, 10);
  db.prepare('INSERT OR IGNORE INTO admins (username, password_hash) VALUES (?, ?)').run(adminUsername, passwordHash);
}
