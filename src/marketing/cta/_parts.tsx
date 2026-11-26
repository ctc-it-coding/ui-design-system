import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowLeft, ArrowRight } from '../../icons';
import { Avatar } from '../../components/avatars/Avatar';
import { Button } from '../../components/buttons/Button';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import type { CTANotification, CTAQuote } from './defaults';

/** Section / card themes used by CTA and Newsletter CTA sections (Figma Theme). */
export type CTATheme = 'default' | 'gray-light' | 'gray-dark' | 'brand';

export interface CTAThemeTokens {
  bg: string;
  heading: string;
  text: string;
  subheading: string;
  /** hint text under the newsletter input */
  hint: string;
  dark: boolean;
}

/** Colors from the Figma CTA / Newsletter specs (supporting text on dark = gray-200 / brand-200). */
export const ctaThemeTokens: Record<CTATheme, CTAThemeTokens> = {
  default: { bg: 'bg-white', heading: 'text-gray-900', text: 'text-gray-600', subheading: 'text-brand-700', hint: 'text-gray-600', dark: false },
  'gray-light': { bg: 'bg-gray-50', heading: 'text-gray-900', text: 'text-gray-600', subheading: 'text-brand-700', hint: 'text-gray-600', dark: false },
  'gray-dark': { bg: 'bg-gray-950', heading: 'text-white', text: 'text-gray-200', subheading: 'text-gray-300', hint: 'text-gray-200', dark: true },
  brand: { bg: 'bg-brand-800', heading: 'text-white', text: 'text-brand-200', subheading: 'text-brand-200', hint: 'text-brand-200', dark: true },
};

export interface CTAAction {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

/** Secondary + primary xl buttons (Figma "Actions"). Stacked full-width (primary on top) below md. */
export function CTAButtons({ secondary, primary, className }: { secondary?: CTAAction | null; primary?: CTAAction | null; className?: string }) {
  return (
    <div className={cx('flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row', className)}>
      {secondary && (
        <Button size="xl" hierarchy="secondary-gray" as={secondary.href ? 'a' : 'button'} href={secondary.href} onClick={secondary.onClick}>
          {secondary.label}
        </Button>
      )}
      {primary && (
        <Button size="xl" as={primary.href ? 'a' : 'button'} href={primary.href} onClick={primary.onClick}>
          {primary.label}
        </Button>
      )}
    </div>
  );
}

const appleLogo =
  'M16.5 12.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9-.8 0-1.9-.9-3.2-.8-1.6 0-3.1 1-4 2.4-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8 1.5 0 1.9.8 3.2.8 1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-3.9ZM14.1 5.5c.7-.8 1.1-1.9 1-3-1 0-2.1.7-2.8 1.5-.6.7-1.2 1.8-1 2.9 1 .1 2.1-.6 2.8-1.4Z';

export interface MobileStoreBadgesProps {
  /** Figma Style: Brand (black) or White outline (for dark cards). */
  variant?: 'brand' | 'white-outline';
  appStoreHref?: string;
  googlePlayHref?: string;
  className?: string;
}

/** Figma "Mobile app store badge" (Size=lg): App Store + Google Play. */
export function MobileStoreBadges({ variant = 'brand', appStoreHref = '#', googlePlayHref = '#', className }: MobileStoreBadgesProps) {
  const box = variant === 'brand' ? 'border-[#a6a6a6] bg-black' : 'border-white bg-transparent';
  return (
    <div className={cx('flex flex-wrap gap-3', className)}>
      <a href={appStoreHref} aria-label="Download on the App Store" className={cx('inline-flex h-11 w-[132px] items-center gap-1.5 rounded-[7px] border px-2.5 text-white', box)}>
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" fill="currentColor" aria-hidden>
          <path d={appleLogo} />
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="text-[9px]">Download on the</span>
          <span className="text-[19px] font-medium tracking-tight">App Store</span>
        </span>
      </a>
      <a href={googlePlayHref} aria-label="Get it on Google Play" className={cx('inline-flex h-11 w-[148.5px] items-center gap-2 rounded-[5px] border px-2.5 text-white', box)}>
        <svg viewBox="0 0 24 24" className="size-6 shrink-0" aria-hidden>
          {variant === 'brand' ? (
            <>
              <path d="M3.6 2.3 13.3 12l-9.7 9.7c-.3-.2-.5-.6-.5-1V3.3c0-.4.2-.8.5-1Z" fill="#2196f3" />
              <path d="m16.6 8.7-3.3 3.3-9.7-9.7.2-.1c.4-.2.9-.2 1.3 0l11.5 6.5Z" fill="#4caf50" />
              <path d="M16.6 15.3 5.1 21.8c-.4.2-.9.2-1.3 0l-.2-.1 9.7-9.7 3.3 3.3Z" fill="#f44336" />
              <path d="m20.7 12-4.1 3.3-3.3-3.3 3.3-3.3 4.1 2.3c.3.2.3.8 0 1Z" fill="#ffc107" />
            </>
          ) : (
            <path d="M3.6 2.3 13.3 12l-9.7 9.7c-.3-.2-.5-.6-.5-1V3.3c0-.4.2-.8.5-1Zm13 6.4-3.3 3.3-9.7-9.7.2-.1c.4-.2.9-.2 1.3 0l11.5 6.5Zm0 6.6L5.1 21.8c-.4.2-.9.2-1.3 0l-.2-.1 9.7-9.7 3.3 3.3Zm4.1-3.3-4.1 3.3-3.3-3.3 3.3-3.3 4.1 2.3c.3.2.3.8 0 1Z" fill="currentColor" />
          )}
        </svg>
        <span className="flex flex-col whitespace-nowrap leading-none">
          <span className="text-[9px] uppercase">Get it on</span>
          <span className="text-[17px] font-medium tracking-tight">Google Play</span>
        </span>
      </a>
    </div>
  );
}

/** Stacked translucent notifications over the phone (iPhone mockup 02 / 04). */
export function CTANotificationQueue({ items, className }: { items: CTANotification[]; className?: string }) {
  const op = ['', '', 'opacity-80', 'opacity-50'];
  return (
    <div className={cx('flex w-[320px] max-w-full flex-col gap-3', className)}>
      {items.map((n, i) => (
        <div key={i} className={cx('flex items-center gap-3 rounded-lg border border-white bg-white/90 p-4 shadow-lg backdrop-blur-md', op[i] ?? 'opacity-50')}>
          <Avatar size="md" initials={n.initials} src={n.avatarSrc} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-gray-700">
              <span className="font-semibold text-gray-900">{n.name}</span> {n.text}
            </p>
            {n.supportingText && <p className="truncate text-sm text-gray-600">{n.supportingText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Figma `_Quote image bottom panel` (Full-width / Floating): gradient + glass attribution card over a photo. */
export function CTAQuotePanel({ quote, variant = 'full-width', className }: { quote: CTAQuote; variant?: 'full-width' | 'floating'; className?: string }) {
  return (
    <div
      className={cx(
        'absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/0 to-black/40',
        variant === 'full-width' ? 'pt-24' : 'px-4 pb-4 pt-24 md:px-8 md:pb-8',
        className,
      )}
    >
      <figure
        className={cx(
          'flex flex-col gap-6 bg-white/30 p-5 backdrop-blur-xl md:gap-8',
          variant === 'full-width' ? 'border-t border-white/30 md:p-8' : 'border border-white/30 md:px-5 md:py-6',
        )}
      >
        <blockquote className="text-xl font-semibold text-white md:text-display-sm">{quote.quote}</blockquote>
        <figcaption className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-4">
            <p className="text-display-xs font-semibold text-white md:text-display-md">{quote.name}</p>
            <RatingStars value={quote.rating ?? 5} className="shrink-0 pt-2" />
          </div>
          <div className="flex items-end justify-between gap-3">
            <div className="flex min-w-0 flex-col gap-1">
              <p className="text-md font-semibold text-white md:text-lg">{quote.role}</p>
              {quote.company && <p className="text-sm text-white md:text-md">{quote.company}</p>}
            </div>
            <div className="flex shrink-0 gap-4 md:gap-8">
              {[ArrowLeft, ArrowRight].map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={i === 0 ? 'Previous' : 'Next'}
                  className="flex size-12 items-center justify-center rounded-full border border-white/50 text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-white/30 md:size-14"
                >
                  <Icon className="size-5 md:size-6" />
                </button>
              ))}
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
