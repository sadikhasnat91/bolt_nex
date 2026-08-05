import { ArrowRight, AtSign, Globe, Hash, Heart, Link, MessageCircle, Send, Share2, Sparkles } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const COLUMNS: { title: string; links: string[] }[] = [
  { title: 'Services', links: ['Google Ads', 'SEO', 'Email Marketing', 'Web Development', 'Flutter Apps', 'UI/UX Design'] },
  { title: 'Company', links: ['About', 'Team', 'Careers', 'Offices', 'Case Studies', 'Contact'] },
  { title: 'Resources', links: ['Blog', 'Guides', 'Webinars', 'Free Audit', 'Glossary', 'Help Center'] },
  { title: 'Legal', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'GDPR', 'Security', 'SLA'] },
];

const SOCIALS: LucideIcon[] = [Share2, MessageCircle, AtSign, Hash, Send, Globe, Link];

export function Footer() {
  return (
    <footer id="blog" className="relative overflow-hidden border-t border-line bg-ink text-slate-300">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          {/* Brand + newsletter */}
          <div>
            <a href="#home" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
                <Sparkles className="h-5 w-5 text-white" />
              </span>
              <span className="text-lg font-bold text-white">Nexora<span className="text-primary-400"> Digital</span></span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Powering business growth through digital marketing and modern technology — across four continents.
            </p>

            {/* Newsletter */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-7 max-w-sm"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">Subscribe to our newsletter</p>
              <div className="mt-3 flex items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-4 backdrop-blur transition-colors focus-within:border-primary-400/60">
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className="w-full bg-transparent text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="group flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-primary-500 px-4 text-xs font-semibold text-white transition-colors hover:bg-primary-400"
                >
                  Subscribe
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </div>
              <p className="mt-2 text-[11px] text-slate-500">Monthly insights on growth, design, and engineering. No spam.</p>
            </form>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {COLUMNS.map((c) => (
              <div key={c.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-white">{c.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="group inline-flex items-center text-sm text-slate-400 transition-colors hover:text-white">
                        <span className="relative">
                          {l}
                          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-primary-400 transition-all duration-300 group-hover:w-full" />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-7 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Nexora Digital. All rights reserved. Crafted with care.
          </p>
          <div className="flex items-center gap-2">
            {SOCIALS.map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all duration-300 hover:border-primary-400/60 hover:bg-primary-500 hover:text-white"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
