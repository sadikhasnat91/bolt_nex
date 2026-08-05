import type { ReactNode } from 'react';

export function Section({
  id,
  className = '',
  children,
}: {
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={`relative px-5 sm:px-8 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary-700">
      <span className="h-1.5 w-1.5 rounded-full bg-primary-500" />
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'center' | 'left';
  className?: string;
}) {
  const isCenter = align === 'center';
  return (
    <div
      className={`reveal flex flex-col gap-4 ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}
    >
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="max-w-3xl text-3xl font-bold leading-[1.1] text-ink sm:text-4xl md:text-[2.85rem] text-balance">
        {title}
      </h2>
      {description && (
        <p className={`max-w-2xl text-base leading-relaxed text-muted sm:text-lg text-pretty ${isCenter ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
