import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CompanyLogo, companyLogoNames, type CompanyLogoName } from '../../components/logos/CompanyLogo';

/** Text colours per theme as used by the Testimonial / Blog / Content Figma sets (they differ slightly from `themeTokens`). */
export const tone = {
  default: { bg: 'bg-white', heading: 'text-gray-900', text: 'text-gray-600', sub: 'text-brand-700', dark: false },
  'gray-light': { bg: 'bg-gray-50', heading: 'text-gray-900', text: 'text-gray-600', sub: 'text-brand-700', dark: false },
  'brand-light': { bg: 'bg-brand-50', heading: 'text-gray-900', text: 'text-gray-600', sub: 'text-brand-700', dark: false },
  'gray-dark': { bg: 'bg-gray-950', heading: 'text-white', text: 'text-gray-200', sub: 'text-gray-200', dark: true },
  brand: { bg: 'bg-brand-800', heading: 'text-white', text: 'text-brand-200', sub: 'text-brand-200', dark: true },
} as const;
export type ToneName = keyof typeof tone;

/** Maps a display name ("Command+R", "GlobalBank") to a CompanyLogo name when one exists. */
export function logoNameFor(company: string): CompanyLogoName | null {
  const k = company.toLowerCase().replace(/\+/g, '-').replace(/[^a-z0-9-]/g, '');
  return (companyLogoNames as string[]).includes(k) ? (k as CompanyLogoName) : null;
}

/** Fictional company logo by display name, falling back to a plain wordmark. */
export function LogoFor({ company, white, height = 48, className }: { company: string; white?: boolean; height?: number; className?: string }) {
  const n = logoNameFor(company);
  if (n) return <CompanyLogo name={n} white={white} height={height} className={cx('shrink-0', white && 'opacity-90', className)} />;
  return (
    <span className={cx('inline-flex items-center gap-2 text-xl font-semibold', white ? 'text-white' : 'text-gray-900', className)} style={{ height }}>
      <span className={cx('size-7 rounded-lg', white ? 'bg-white/80' : 'bg-gray-900')} aria-hidden />
      {company}
    </span>
  );
}

/** Figma "_Play button" Style=Glassmorphism: frosted circle with a play-shaped cut-out. */
export function GlassPlayButton({ size = 96, className, label = 'Play video', ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { size?: number; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        'group/play inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full outline-none backdrop-blur-md',
        'focus-visible:ring-4 focus-visible:ring-white/40',
        className,
      )}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg viewBox="0 0 80 80" className="size-full" aria-hidden>
        <path
          fillRule="evenodd"
          className="fill-white/30 transition-colors group-hover/play:fill-white/50"
          d="M40 80C62.09 80 80 62.09 80 40S62.09 0 40 0 0 17.91 0 40s17.91 40 40 40ZM32 28.9c0-1.6 1.77-2.55 3.1-1.67l16.7 11.1c1.2.79 1.2 2.55 0 3.34l-16.7 11.1C33.77 53.65 32 52.7 32 51.1V28.9Z"
        />
      </svg>
    </button>
  );
}

/** Theme-aware pagination dots (Figma "Pagination dot group", Size=lg). */
export function SlideDots({ count, index, onSelect, dark, className }: { count: number; index: number; onSelect: (i: number) => void; dark?: boolean; className?: string }) {
  if (count < 2) return null;
  return (
    <div role="group" aria-label="Slides" className={cx('inline-flex items-center gap-4', className)}>
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === index ? 'true' : undefined}
          onClick={() => onSelect(i)}
          className={cx(
            'size-2.5 shrink-0 cursor-pointer rounded-full outline-none transition-colors duration-100 focus-visible:ring-4',
            dark
              ? 'bg-white/30 hover:bg-white/50 focus-visible:ring-white/30 aria-[current=true]:bg-white'
              : 'bg-gray-200 hover:bg-gray-300 focus-visible:ring-brand-500/24 aria-[current=true]:bg-brand-700',
          )}
        />
      ))}
    </div>
  );
}

/** Initials from a name ("Caitlyn King" → "CK"). */
export const initialsOf = (name: string) =>
  name
    .replace(/^[—–-]\s*/, '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');

/** Keeps a slide region accessible: announces the visible slide politely. */
export function SlideRegion({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className={className}>
      <div aria-live="polite">{children}</div>
    </div>
  );
}
