import { useState, type CSSProperties, type FormEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { BadgeGroup } from '../../components/badges/BadgeGroup';
import { Avatar, AvatarGroup } from '../../components/avatars/Avatar';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import { CheckIcon } from '../../components/misc-icons/CheckIcon';
import { PlayCircle } from '../../icons';
import type { HeroBadgeContent } from './defaults';

/* ------------------------------------------------------------------ */
/* Tones (text colours per hero background)                            */
/* ------------------------------------------------------------------ */

/** Text colour set of a hero, derived from its background. */
export type HeroTone = 'light' | 'gray-dark' | 'brand-dark' | 'brand-light';

export const heroTone: Record<HeroTone, { heading: string; text: string; sub: string; muted: string; strong: string; dark: boolean }> = {
  light: { heading: 'text-gray-900', text: 'text-gray-600', sub: 'text-brand-700', muted: 'text-gray-600', strong: 'text-gray-700', dark: false },
  'gray-dark': { heading: 'text-white', text: 'text-gray-200', sub: 'text-gray-200', muted: 'text-gray-300', strong: 'text-white', dark: true },
  'brand-dark': { heading: 'text-white', text: 'text-brand-200', sub: 'text-brand-200', muted: 'text-brand-200', strong: 'text-white', dark: true },
  'brand-light': { heading: 'text-brand-900', text: 'text-brand-700', sub: 'text-brand-700', muted: 'text-brand-700', strong: 'text-brand-900', dark: false },
};

/* ------------------------------------------------------------------ */
/* Badge group (Figma "Badge group" Light / Modern / Outline / Dark)   */
/* ------------------------------------------------------------------ */

export type HeroBadgeTheme = 'light' | 'modern' | 'outline' | 'dark';

/** Announcement pill above the hero heading. Figma "Badge group" size lg (md on mobile). */
export function HeroBadge({ content, color = 'brand', theme = 'light' }: { content: HeroBadgeContent; color?: 'brand' | 'success' | 'gray'; theme?: HeroBadgeTheme }) {
  const base = theme === 'modern' ? 'modern' : 'light';
  return (
    <>
      {(['md', 'lg'] as const).map((size) => (
        <BadgeGroup
          key={size}
          size={size}
          color={color}
          theme={base}
          badge={content.badge}
          href="#"
          className={cx(
            size === 'md' ? 'md:hidden' : 'max-md:hidden',
            theme === 'outline' && 'bg-white ring-[1.5px] ring-brand-600 hover:bg-brand-50',
            theme === 'dark' && 'bg-brand-50 ring-brand-200',
          )}
        >
          {content.text}
        </BadgeGroup>
      ))}
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

/** Button size classes: xl on mobile, 2xl from md. */
const btn2xl = 'md:gap-2.5 md:px-[22px] md:py-4 md:text-lg';

/** Secondary + primary buttons (Figma 2xl, stacked full-width xl on mobile with primary first). */
export function HeroButtons({
  primaryLabel,
  secondaryLabel,
  secondaryIcon = true,
  secondaryHierarchy = 'secondary-gray',
  size = '2xl',
  className,
}: {
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  secondaryIcon?: boolean;
  secondaryHierarchy?: 'secondary-gray' | 'secondary-color';
  size?: 'xl' | '2xl';
  className?: string;
}) {
  const sz = size === '2xl' ? btn2xl : '';
  return (
    <div className={cx('flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row', className)}>
      {secondaryLabel != null && secondaryLabel !== '' && (
        <Button size="xl" hierarchy={secondaryHierarchy} iconLeading={secondaryIcon ? PlayCircle : undefined} className={cx('w-full sm:w-auto', sz)}>
          {secondaryLabel}
        </Button>
      )}
      {primaryLabel != null && primaryLabel !== '' && (
        <Button size="xl" className={cx('w-full sm:w-auto', sz)}>
          {primaryLabel}
        </Button>
      )}
    </div>
  );
}

export interface EmailCaptureProps {
  placeholder?: string;
  hint?: ReactNode;
  buttonLabel?: ReactNode;
  /** Text colour tone for the hint below the input. */
  tone?: HeroTone;
  onSubmit?: (email: string) => void;
  /** Leading content inside the input (e.g. a country dropdown for phone numbers). */
  leadingDropdown?: ReactNode;
  type?: 'email' | 'tel';
  className?: string;
}

/** Default "We care about your data in our privacy policy." hint. */
export function PrivacyHint({ tone = 'light' }: { tone?: HeroTone }) {
  const t = heroTone[tone];
  return (
    <span className={t.dark ? t.text : 'text-gray-600'}>
      We care about your data in our{' '}
      <a href="#" className="underline underline-offset-[3px]">
        privacy policy
      </a>
      .
    </span>
  );
}

/** Figma "Email capture": md input with hint + xl primary button (stacked on mobile). */
export function EmailCapture({ placeholder = 'Enter your email', hint, buttonLabel = 'Get started', tone = 'light', onSubmit, leadingDropdown, type = 'email', className }: EmailCaptureProps) {
  const [value, setValue] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };
  return (
    <form onSubmit={submit} className={cx('flex w-full max-w-[480px] flex-col gap-4 text-left md:flex-row md:items-start', className)}>
      <Input
        type={type}
        aria-label={type === 'email' ? 'Email address' : 'Phone number'}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        hint={hint === undefined ? <PrivacyHint tone={tone} /> : hint}
        leadingDropdown={leadingDropdown}
        className="md:flex-1"
      />
      <Button type="submit" size="xl" className="w-full md:w-auto">
        {buttonLabel}
      </Button>
    </form>
  );
}

/** "+1" country selector shown inside the phone input (Figma Input field Type=Leading dropdown). */
export function CountryDropdown() {
  return (
    <select aria-label="Country" className="appearance-none bg-transparent py-2 pr-1 pl-3.5 text-md text-gray-900 outline-none">
      <option>US</option>
      <option>CA</option>
      <option>AU</option>
    </select>
  );
}

/* ------------------------------------------------------------------ */
/* Social proof bits                                                   */
/* ------------------------------------------------------------------ */

/** Avatar group + 5 stars + "from 200+ reviews" (Figma "User reviews"). */
export function UserReviews({ avatars, rating = 5, label = 'from 200+ reviews', tone = 'light' }: { avatars: string[]; rating?: number; label?: ReactNode; tone?: HeroTone }) {
  const t = heroTone[tone];
  return (
    <div className="flex items-center gap-4">
      <AvatarGroup size="md">
        {avatars.map((a) => (
          <Avatar key={a} initials={a} />
        ))}
      </AvatarGroup>
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <RatingStars value={rating} size={20} />
          <span className={cx('text-md font-semibold', t.strong)}>{rating.toFixed(1)}</span>
        </div>
        <span className={cx('text-md font-medium', t.muted)}>{label}</span>
      </div>
    </div>
  );
}

/** Simple fictional company logo: logomark + wordmark. */
export function FictionalLogo({ name, white, className }: { name: string; white?: boolean; className?: string }) {
  const h = [...name].reduce((a, c) => a + c.charCodeAt(0), 0);
  const shape = h % 3;
  return (
    <span className={cx('inline-flex h-10 items-center gap-2 px-1', white ? 'text-white' : 'text-gray-900', className)}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        {shape === 0 && <path d="M16 2 30 16 16 30 2 16Z" fill="currentColor" opacity=".9" />}
        {shape === 1 && (
          <>
            <circle cx="11" cy="16" r="9" fill="currentColor" opacity=".9" />
            <circle cx="21" cy="16" r="9" fill="currentColor" opacity=".5" />
          </>
        )}
        {shape === 2 && <rect x="3" y="3" width="26" height="26" rx="8" fill="currentColor" opacity=".9" />}
      </svg>
      <span className="text-xl font-semibold tracking-tight">{name}</span>
    </span>
  );
}

/** "Trusted by 4,000+ companies" + logo grid (Figma Screen mockup 02/04). */
export function TrustedLogos({ label, logos, tone = 'light' }: { label: ReactNode; logos: string[]; tone?: HeroTone }) {
  const t = heroTone[tone];
  return (
    <div className="flex flex-col gap-6">
      <p className={cx('text-md font-medium', t.muted)}>{label}</p>
      <div className="flex max-w-[540px] flex-wrap gap-x-4 gap-y-4">
        {logos.map((l) => (
          <FictionalLogo key={l} name={l} white={t.dark} />
        ))}
      </div>
    </div>
  );
}

/** Figma "Check item text" list (success check + text). */
export function HeroCheckItems({ items, size = 'md', tone = 'light', className }: { items: ReactNode[]; size?: 'md' | 'lg'; tone?: HeroTone; className?: string }) {
  const t = heroTone[tone];
  return (
    <ul className={cx('flex flex-col', size === 'lg' ? 'gap-5' : 'gap-4', className)}>
      {items.map((it, i) => (
        <li key={i} className="flex items-start gap-3">
          <CheckIcon size={size === 'lg' ? 'lg' : 'md'} color="success" type="default" className="shrink-0" />
          <span className={cx(size === 'lg' ? 'text-lg md:text-xl' : 'text-md md:text-lg', t.text)}>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Mobile app store badges                                             */
/* ------------------------------------------------------------------ */

const appleLogo = 'M16.5 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.9ZM14.1 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z';

/** Figma "Mobile app store badge" (Style=Brand, Size=lg): black App Store / Google Play badges. */
export function AppStoreBadges({ className }: { className?: string }) {
  return (
    <div className={cx('flex gap-3', className)}>
      <a href="#" aria-label="Download on the App Store" className="inline-flex h-11 w-[132px] items-center gap-1.5 rounded-[7px] border border-[#a6a6a6] bg-black px-2.5 text-white">
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden>
          <path d={appleLogo} />
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="text-[9px]">Download on the</span>
          <span className="text-[19px] font-medium tracking-tight">App Store</span>
        </span>
      </a>
      <a href="#" aria-label="Get it on Google Play" className="inline-flex h-11 w-[148.5px] items-center gap-2 rounded-[5px] border border-[#a6a6a6] bg-black px-2.5 text-white">
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
          <path d="M3.6 2.3 13.3 12l-9.7 9.7c-.3-.2-.5-.6-.5-1V3.3c0-.4.2-.8.5-1Z" fill="#2196f3" />
          <path d="m16.6 8.7-3.3 3.3-9.7-9.7.2-.1c.4-.2.9-.2 1.3 0l11.5 6.5Z" fill="#4caf50" />
          <path d="M16.6 15.3 5.1 21.8c-.4.2-.9.2-1.3 0l-.2-.1 9.7-9.7 3.3 3.3Z" fill="#f44336" />
          <path d="m20.7 12-4.1 3.3-3.3-3.3 3.3-3.3 4.1 2.3c.3.2.3.8 0 1Z" fill="#ffc107" />
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="text-[9px] uppercase">Get it on</span>
          <span className="text-[17px] font-medium tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Background pattern (Figma "Background pattern" 1920×1440, masked)   */
/* ------------------------------------------------------------------ */

export type HeroPatternType = 'grid' | 'grid-dot' | 'grid-check';

/** Large grid / dot / check pattern behind the hero, faded with a radial mask from the top. */
export function HeroPattern({ type, size = 'md', faint, className }: { type: HeroPatternType; size?: 'sm' | 'md'; faint?: boolean; className?: string }) {
  const cell = type === 'grid' ? (size === 'md' ? 96 : 80) : type === 'grid-check' ? (size === 'md' ? 96 : 64) : size === 'md' ? 24 : 20;
  const line = 'var(--color-gray-300)';
  let bg: CSSProperties;
  if (type === 'grid-dot') {
    bg = { backgroundImage: `radial-gradient(circle, var(--color-gray-400) 1.5px, transparent 1.6px)`, backgroundSize: `${cell}px ${cell}px` };
  } else {
    const lines = `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`;
    bg =
      type === 'grid'
        ? { backgroundImage: lines, backgroundSize: `${cell}px ${cell}px`, backgroundPosition: 'center top' }
        : {
            backgroundImage: `${lines}, conic-gradient(var(--color-gray-100) 25%, transparent 0 50%, var(--color-gray-100) 0 75%, transparent 0)`,
            backgroundSize: `${cell}px ${cell}px, ${cell}px ${cell}px, ${cell * 2}px ${cell * 2}px`,
            backgroundPosition: 'center top',
          };
  }
  const mask = 'radial-gradient(ellipse 50% 50% at 50% 0%, #000 0%, transparent 100%)';
  return (
    <div
      aria-hidden
      className={cx('pointer-events-none absolute top-0 left-1/2 h-[960px] w-[960px] -translate-x-1/2 md:h-[1440px] md:w-[1920px]', faint && 'opacity-20', className)}
      style={{ ...bg, maskImage: mask, WebkitMaskImage: mask }}
    />
  );
}

/** Tiny brand logomark used on sign-up cards. */
export function HeroLogomark() {
  return (
    <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-brand-500 to-brand-800 shadow-xs ring-1 ring-black/10 ring-inset" aria-hidden>
      <span className="size-3.5 rounded-full bg-white/90" />
    </span>
  );
}
