import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TrustedBy } from '@/components/TrustedBy';
import { Services } from '@/components/Services';
import { About } from '@/components/About';
import { WhyChooseUs } from '@/components/WhyChooseUs';
import { Portfolio } from '@/components/Portfolio';
import { Team } from '@/components/Team';
import { Offices } from '@/components/Offices';
import { Process } from '@/components/Process';
import { Testimonials } from '@/components/Testimonials';
import { Pricing } from '@/components/Pricing';
import { FAQ } from '@/components/FAQ';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useReveal } from '@/lib/hooks';

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress');
    if (!bar) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const scrolled = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
        bar.style.transform = `scaleX(${Math.min(scrolled, 1)})`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-primary-500" id="scroll-progress" style={{ transform: 'scaleX(0)' }} />
  );
}

/** Magnetic button micro-interaction for any element marked [data-magnetic]. */
function useMagnetic() {
  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

    const handlers: { el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }[] = [];

    targets.forEach((el) => {
      const move = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - (rect.left + rect.width / 2);
        const y = e.clientY - (rect.top + rect.height / 2);
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`;
        el.style.transition = 'transform 0.18s ease-out';
      };
      const leave = () => {
        el.style.transform = 'translate(0,0)';
        el.style.transition = 'transform 0.4s cubic-bezier(0.16,1,0.3,1)';
      };
      el.addEventListener('mousemove', move);
      el.addEventListener('mouseleave', leave);
      handlers.push({ el, move, leave });
    });

    return () => {
      handlers.forEach(({ el, move, leave }) => {
        el.removeEventListener('mousemove', move);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);
}

function App() {
  useReveal();
  useMagnetic();

  return (
    <div className="relative min-h-screen bg-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <Services />
        <About />
        <WhyChooseUs />
        <Portfolio />
        <Team />
        <Offices />
        <Process />
        <Testimonials />
        <Pricing />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
