const LOGOS = [
  'Lumen', 'Northwind', 'Quantix', 'Vela', 'Helios', 'Monarch', 'Cobalt', 'Aurora', 'Vertex', 'Sable',
];

function LogoMark({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2.5 px-8">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-white text-primary-600">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-400 transition-colors duration-300 hover:text-ink">
        {name}
      </span>
    </div>
  );
}

export function TrustedBy() {
  return (
    <section className="border-y border-line bg-surface py-10">
      <p className="mb-7 text-center text-xs font-semibold uppercase tracking-[0.22em] text-muted">
        Trusted by 100+ forward-thinking brands worldwide
      </p>
      <div className="mask-fade-r overflow-hidden">
        <div className="flex w-max animate-marquee items-center">
          {[...LOGOS, ...LOGOS].map((name, i) => (
            <LogoMark key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </section>
  );
}
