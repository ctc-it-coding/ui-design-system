import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { BackgroundPattern } from '../../components/empty-state/BackgroundPattern';
import { Button } from '../../components/buttons/Button';
import { Avatar } from '../../components/avatars/Avatar';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import { ArrowLeft, ArrowRight, Mail01 } from '../../icons';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import type { IconSlot } from '../../utils/renderIcon';
import { ImagePlaceholder } from '../../marketing/_shared';

/* ------------------------------------------------------------------------------------------------
 * Brand
 * ---------------------------------------------------------------------------------------------- */

export interface AuthLogomarkProps {
  /** Pixel size utility classes (default `size-10 md:size-12`, Figma 40 mobile / 48 desktop). */
  className?: string;
}

/** AuthLogomark — Figma "Logomark": white rounded square with a brand gradient mark and soft shadow. */
export function AuthLogomark({ className }: AuthLogomarkProps) {
  return (
    <span
      aria-hidden
      className={cx(
        'relative inline-flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[22%] bg-white ring-1 ring-gray-900/10 ring-inset md:size-12',
        'shadow-[0_1.5px_3px_0_rgb(16_24_40/0.06),0_1.5px_4.5px_0_rgb(16_24_40/0.10)]',
        className,
      )}
    >
      <span className="absolute inset-[18%] rounded-full bg-gradient-to-br from-brand-400 via-brand-600 to-brand-800" />
      <span className="relative size-[24%] rounded-full bg-white/95" />
    </span>
  );
}

export interface AuthLogoProps {
  /** Figma: Dark mode */
  dark?: boolean;
  /** Wordmark text. */
  brandName?: ReactNode;
  className?: string;
}

/** AuthLogo — Figma "Logo" (logomark + wordmark, 32px tall). */
export function AuthLogo({ dark = false, brandName = 'Tinicorn', className }: AuthLogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <AuthLogomark className="size-8 md:size-8" />
      <span className={cx('text-xl font-semibold tracking-tight', dark ? 'text-white' : 'text-gray-900')}>{brandName}</span>
    </span>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Layout primitives
 * ---------------------------------------------------------------------------------------------- */

export type AuthPattern = 'grid' | 'circles' | 'squares' | 'none';

/** Decorative "Background pattern decorative" centred at the top (480px mobile / 768px desktop). */
export function AuthBackground({ pattern, className }: { pattern: AuthPattern; className?: string }) {
  if (pattern === 'none') return null;
  const type = pattern === 'circles' ? 'circles' : 'grid';
  return (
    <div aria-hidden className={cx('pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 text-gray-200', className)}>
      <BackgroundPattern type={type} size="md" className="relative -top-[172px] md:hidden" />
      <BackgroundPattern type={type} size="lg" className="relative -top-[264px] hidden md:block" />
    </div>
  );
}

export interface AuthHeaderProps {
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'center' | 'left';
  /** Element above the title (logomark, logo, featured icon, illustration). */
  mark?: ReactNode;
  /** Show the mark below `lg` only (split layouts show the logo elsewhere on desktop). */
  markMobileOnly?: boolean;
  /** sm = 24px title (cards), md = 24/30px, lg = 24/36px. */
  size?: 'sm' | 'md' | 'lg';
  /** Gap between mark and text (Figma 24, 32 for illustrations, 64 for the minimal logo). */
  markGap?: string;
  className?: string;
}

const titleCls = {
  sm: 'text-display-xs',
  md: 'text-display-xs md:text-display-sm',
  lg: 'text-display-xs md:text-display-md',
};

/** Header block of every auth screen: optional mark + title + supporting text. */
export function AuthHeader({ title, supportingText, align = 'center', mark, markMobileOnly, size = 'md', markGap = 'gap-6', className }: AuthHeaderProps) {
  return (
    <div className={cx('flex w-full flex-col', markGap, align === 'center' ? 'items-center text-center' : 'items-start text-left', className)}>
      {mark != null && <div className={cx('flex', markMobileOnly && 'lg:hidden')}>{mark}</div>}
      {(title != null || supportingText != null) && (
        <div className={cx('flex w-full flex-col', size === 'sm' ? 'gap-2' : 'gap-2 md:gap-3')}>
          {title != null && <h1 className={cx('font-semibold text-gray-900', titleCls[size])}>{title}</h1>}
          {supportingText != null && <p className="text-md text-gray-600">{supportingText}</p>}
        </div>
      )}
    </div>
  );
}

/** "Don’t have an account? Sign up" row. */
export function AuthSwitchRow({ text, action, onAction, href, size = 'md', className }: { text: ReactNode; action: ReactNode; onAction?: () => void; href?: string; size?: 'md' | 'lg'; className?: string }) {
  return (
    <div className={cx('flex items-baseline justify-center gap-1 text-gray-600', size === 'lg' ? 'text-md' : 'text-sm', className)}>
      <span>{text}</span>
      <Button hierarchy="link-color" size={size} onClick={onAction} as={href ? 'a' : 'button'} href={href}>
        {action}
      </Button>
    </div>
  );
}

/** Root of a full-page auth screen. */
export const AuthPage = forwardRef<HTMLDivElement, { bg?: string } & HTMLAttributes<HTMLDivElement>>(function AuthPage({ className, children, bg = 'bg-white', ...props }, ref) {
  return (
    <div ref={ref} className={cx('relative isolate flex min-h-screen w-full overflow-hidden', bg, className)} {...props}>
      {children}
    </div>
  );
});

/** Centred single-column screen (Figma "Simple", "Card …", Forgot password, Email verification). */
export function CenteredLayout({ pattern = 'none', width = 'max-w-[360px]', className, contentClassName, children, after }: { pattern?: AuthPattern; width?: string; className?: string; contentClassName?: string; children: ReactNode; after?: ReactNode }) {
  return (
    <div className={cx('relative flex w-full flex-col items-center px-4 pt-12 pb-12 md:px-8 md:pt-24', className)}>
      <AuthBackground pattern={pattern} />
      <div className={cx('relative flex w-full flex-col items-center gap-8', width, contentClassName)}>{children}</div>
      {after}
    </div>
  );
}

export interface SplitFormColumnProps {
  /** Logo pinned top-left on desktop. */
  logo?: ReactNode;
  /** Copyright pinned bottom-left on desktop. */
  copyright?: ReactNode;
  /** Support email pinned bottom-right on desktop. */
  email?: ReactNode;
  /** Decorative pattern behind the form column. */
  pattern?: AuthPattern;
  /** Column background. */
  className?: string;
  /** Desktop flex weight relative to the visual column (e.g. 'lg:flex-[640]'). */
  children: ReactNode;
}

/** The form half of a split screen. Below `lg` it becomes the whole page (Figma mobile). */
export function SplitFormColumn({ logo, copyright, email, pattern = 'none', className, children }: SplitFormColumnProps) {
  return (
    <div className={cx('relative flex min-w-0 flex-1 flex-col', className)}>
      {pattern !== 'none' && (
        <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 hidden -translate-x-1/2 text-gray-200 lg:block">
          <BackgroundPattern type={pattern === 'circles' ? 'circles' : 'grid'} size="lg" className="relative -top-[208px]" />
        </div>
      )}
      {pattern !== 'none' && <AuthBackground pattern={pattern} className="lg:hidden" />}
      {logo != null && <div className="absolute top-8 left-8 z-10 hidden lg:block">{logo}</div>}
      <div className="relative flex flex-1 flex-col items-center px-4 pt-12 pb-12 md:px-8 lg:justify-center lg:py-24">
        <div className="flex w-full max-w-[360px] flex-col gap-8">{children}</div>
      </div>
      {(copyright != null || email != null) && (
        <div className="absolute right-8 bottom-8 left-8 hidden items-center justify-between gap-4 text-sm text-gray-600 lg:flex">
          <span>{copyright}</span>
          {email != null && (
            <a href={`mailto:${typeof email === 'string' ? email : ''}`} className="flex items-center gap-2 hover:text-gray-700">
              <Mail01 className="size-4 text-gray-500" />
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  );
}

/** The visual half of a split screen (hidden below `lg`). */
export function SplitVisual({ className, children }: { className?: string; children?: ReactNode }) {
  return (
    <div className={cx('relative hidden min-w-0 flex-1 overflow-hidden lg:block', className)}>
      <div className="absolute inset-0 flex">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Testimonials
 * ---------------------------------------------------------------------------------------------- */

export interface AuthTestimonial {
  quote: ReactNode;
  name: ReactNode;
  /** Role line, e.g. "Lead Designer, Layers". */
  title?: ReactNode;
  /** Company / supporting line, e.g. "Web Development Agency". */
  company?: ReactNode;
  avatarSrc?: string;
  /** Initials shown when no avatar image. */
  initials?: string;
  /** Star rating (default 5). */
  rating?: number;
  /** Background photo for image panels. */
  imageSrc?: string;
}

/** Cycles through a list (used by every carousel on the auth screens). */
export function useCycle(length: number, initial = 0) {
  const [index, setIndex] = useState(initial);
  const n = Math.max(1, length);
  return {
    index: index % n,
    setIndex,
    prev: () => setIndex((i) => (i - 1 + n) % n),
    next: () => setIndex((i) => (i + 1) % n),
  };
}

/** Figma "_Testiomonial carousel arrow" (Size=lg, Type=Button arrow): 56px white-outlined circle. */
export function TestimonialArrow({ direction, onClick }: { direction: 'left' | 'right'; onClick?: () => void }) {
  const Icon = direction === 'left' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      aria-label={direction === 'left' ? 'Previous testimonial' : 'Next testimonial'}
      onClick={onClick}
      className="inline-flex size-14 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/50 text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-4 focus-visible:ring-white/30"
    >
      <Icon className="size-6" />
    </button>
  );
}

/**
 * Figma "_Quote image bottom panel" — photo with a dark gradient and a frosted glass testimonial card.
 * `floating` = card inset 32px from the edges; `full-width` = card centred in a taller panel.
 */
export function AuthQuoteImagePanel({ testimonials, variant, className, rounded }: { testimonials: AuthTestimonial[]; variant: 'floating' | 'full-width'; className?: string; rounded?: string }) {
  const { index, prev, next } = useCycle(testimonials.length);
  const t = testimonials[index];
  return (
    <ImagePlaceholder src={t?.imageSrc} tone="warm" className={cx('flex size-full flex-col justify-end', rounded, className)}>
      <div className={cx('relative bg-gradient-to-b from-transparent to-black/40', variant === 'floating' ? 'px-8 pt-24 pb-8' : 'px-[60px] py-24')}>
        <figure className={cx('flex flex-col gap-8 border border-white/30 bg-white/30 text-white backdrop-blur-xl', variant === 'floating' ? 'px-5 py-6' : 'p-8', 'rounded-none')}>
          <blockquote className="text-display-sm font-semibold">{t?.quote}</blockquote>
          <figcaption className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <span className="flex-1 text-display-md font-semibold">{t?.name}</span>
              <RatingStars value={t?.rating ?? 5} color="yellow" />
            </div>
            <div className="flex items-center gap-3">
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-lg font-semibold">{t?.title}</span>
                <span className="text-md">{t?.company}</span>
              </div>
              {testimonials.length > 1 && (
                <div className="flex gap-8">
                  <TestimonialArrow direction="left" onClick={prev} />
                  <TestimonialArrow direction="right" onClick={next} />
                </div>
              )}
            </div>
          </figcaption>
        </figure>
      </div>
    </ImagePlaceholder>
  );
}

/** Large centred testimonial on gray-50 (Figma Log in "Split quote" / Sign up "Split quote carousel"). */
export function CenteredQuote({ testimonial, starsFirst, children }: { testimonial: AuthTestimonial; starsFirst?: boolean; children?: ReactNode }) {
  const stars = <RatingStars value={testimonial.rating ?? 5} color="yellow" className="gap-1" />;
  return (
    <figure className="flex w-full max-w-[560px] flex-col items-center gap-8 text-center">
      {starsFirst && stars}
      <blockquote className="text-display-sm font-medium text-gray-900">{testimonial.quote}</blockquote>
      <figcaption className="flex flex-col items-center gap-4">
        <Avatar size="2xl" src={testimonial.avatarSrc} initials={testimonial.initials} alt="" />
        <div className="flex flex-col gap-1">
          <span className="text-md font-semibold text-gray-900">{testimonial.name}</span>
          <span className="text-sm font-medium text-gray-600">{testimonial.title}</span>
        </div>
      </figcaption>
      {!starsFirst && stars}
      {children}
    </figure>
  );
}

/** Decorative thin line pattern (Figma "Line pattern") used behind mockups. */
export function LinePattern({ className, light }: { className?: string; light?: boolean }) {
  return (
    <svg aria-hidden viewBox="0 0 298 408" fill="none" className={cx('pointer-events-none absolute w-[298px]', light ? 'text-white/20' : 'text-gray-200', className)}>
      {Array.from({ length: 12 }, (_, i) => (
        <path key={i} d={`M${-40 + i * 28} 408 C ${40 + i * 24} 280, ${120 + i * 14} 140, ${300} ${20 + i * 30}`} stroke="currentColor" strokeWidth="1" />
      ))}
    </svg>
  );
}

/** Stars cluster from Figma "Stars" (80px white star + two small yellow sparkles). */
export function StarsArt({ className }: { className?: string }) {
  const star = 'M50 0c2 26 24 48 50 50-26 2-48 24-50 50-2-26-24-48-50-50C26 48 48 26 50 0Z';
  return (
    <svg aria-hidden viewBox="0 0 80 80" className={cx('size-20', className)}>
      <path d={star} transform="translate(4 12) scale(0.64)" fill="#ffffff" />
      <path d={star} transform="translate(52 4) scale(0.24)" className="fill-warning-300" />
      <path d={star} transform="translate(60 52) scale(0.16)" className="fill-warning-300" />
    </svg>
  );
}

/** Avatar group + "5.0 from 200+ reviews". */
export function ReviewsRow({ rating = 5, label = 'from 200+ reviews', initials = ['AL', 'OR', 'PW', 'LB', 'CK'], accent = 'text-brand-200' }: { rating?: number; label?: ReactNode; initials?: string[]; accent?: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex -space-x-3">
        {initials.map((i) => (
          <Avatar key={i} size="md" initials={i} className="ring-[1.5px] ring-white" />
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <RatingStars value={rating} color="yellow" className="gap-1" />
          <span className="text-md font-semibold text-white">{rating.toFixed(1)}</span>
        </div>
        <span className={cx('text-md font-medium', accent)}>{label}</span>
      </div>
    </div>
  );
}

/** Shared shell: grid pattern, featured icon, heading, body, "Back to log in". */
export function StepShell({ icon, title, supportingText, children, onBack, backLabel = 'Back to log in' }: { icon: IconSlot; title: ReactNode; supportingText: ReactNode; children: ReactNode; onBack?: () => void; backLabel?: ReactNode }) {
  return (
    <CenteredLayout pattern="grid">
      <AuthHeader mark={<FeaturedIcon icon={icon} size="xl" color="brand" theme="modern" />} title={title} supportingText={supportingText} />
      {children}
      <Button hierarchy="link-gray" iconLeading={ArrowLeft} onClick={onBack} className="self-center">
        {backLabel}
      </Button>
    </CenteredLayout>
  );
}

