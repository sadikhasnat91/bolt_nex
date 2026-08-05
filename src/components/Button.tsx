import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { ArrowRight } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'dark';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  iconRight?: boolean;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary:
    'bg-primary-600 text-white shadow-[0_8px_24px_-8px_rgba(16,185,129,0.6)] hover:bg-primary-700 hover:shadow-[0_12px_32px_-8px_rgba(16,185,129,0.7)]',
  secondary:
    'border border-line bg-white text-ink hover:border-primary-300 hover:bg-primary-50/60',
  ghost: 'text-ink hover:bg-slate-100',
  dark: 'bg-ink text-white hover:bg-slate-800',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-13 px-7 text-base',
};

export function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight = true,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/50 focus-visible:ring-offset-2 ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon && !iconRight && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconRight && (
        <span className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">
          {icon ?? <ArrowRight className="h-4 w-4" />}
        </span>
      )}
    </button>
  );
}

export function MagneticButton({
  variant = 'primary',
  size = 'lg',
  icon,
  children,
  className = '',
}: {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className="relative inline-block"
      style={{ perspective: '600px' }}
      data-magnetic
    >
      <Button variant={variant} size={size} icon={icon} className={className}>
        {children}
      </Button>
    </span>
  );
}
