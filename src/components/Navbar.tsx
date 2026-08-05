import { useEffect, useState } from 'react';
import { ArrowRight, Menu, Sparkles, X } from 'lucide-react';
import { useScrolledPast } from '@/lib/hooks';

const NAV = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Case Studies', href: '#case-studies' },
  { label: 'Team', href: '#team' },
  { label: 'About', href: '#about' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const scrolled = useScrolledPast(24);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex h-16 items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
          scrolled
            ? 'mt-0 h-16 border-b border-line/80 bg-white/85 backdrop-blur-xl'
            : 'mt-2 h-16 border-b border-transparent bg-transparent'
        }`}
        style={{ maxWidth: '100%' }}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <a href="#home" className="group flex items-center gap-2.5">
              <span className="relative flex h-9 w-9 items-center justify-center rounded-xl gradient-primary shadow-[0_6px_18px_-6px_rgba(16,185,129,0.7)]">
                <Sparkles className="h-5 w-5 text-white" />
                <span className="absolute inset-0 rounded-xl bg-primary-400/40 blur-md transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
              </span>
              <span className="text-[1.05rem] font-bold tracking-tight text-ink">
                Nexora<span className="text-primary-600"> Digital</span>
              </span>
            </a>

            {/* Desktop nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group relative rounded-full px-3.5 py-2 text-sm font-medium text-ink-soft transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                  <span className="pointer-events-none absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-primary-500 transition-transform duration-300 group-hover:scale-x-100" />
                </a>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden items-center gap-3 lg:flex">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(15,23,42,0.5)] transition-all duration-300 hover:bg-slate-800 hover:shadow-[0_12px_28px_-8px_rgba(15,23,42,0.6)]"
              >
                Book Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white/80 text-ink lg:hidden"
              aria-label="Toggle menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <div className="mx-3 mt-2 rounded-3xl border border-line bg-white/95 p-4 shadow-lift backdrop-blur-xl">
            <div className="grid grid-cols-2 gap-1">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-soft transition-colors hover:bg-primary-50 hover:text-primary-700"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-center gap-2 rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white"
            >
              Book Free Consultation
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
