import { createContext, forwardRef, useContext, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../utils/cx';

/**
 * Shared building blocks for all marketing website sections (Figma "MARKETING WEBSITE COMPONENTS").
 * Desktop: section padding 96px top/bottom, container 1280px with 32px side padding.
 * Mobile:  section padding 64px, container padding 16px.
 */

/** Figma "Theme" / "Color" property used by most marketing sections. */
export type MarketingTheme = 'default' | 'gray-light' | 'gray-dark' | 'brand' | 'brand-light';

export interface ThemeTokens {
  /** section background */ bg: string;
  /** heading text */ heading: string;
  /** subheading / eyebrow text */ subheading: string;
  /** body / supporting text */ text: string;
  /** secondary text (captions, meta) */ muted: string;
  /** borders and dividers */ border: string;
  /** card surface placed on this theme */ card: string;
  /** featured-icon color to use on this theme */ iconColor: 'brand' | 'gray';
  /** true for dark backgrounds */ dark: boolean;
}

export const themeTokens: Record<MarketingTheme, ThemeTokens> = {
  default: { bg: 'bg-white', heading: 'text-gray-900', subheading: 'text-brand-700', text: 'text-gray-600', muted: 'text-gray-500', border: 'border-gray-200', card: 'bg-gray-50', iconColor: 'brand', dark: false },
  'gray-light': { bg: 'bg-gray-50', heading: 'text-gray-900', subheading: 'text-brand-700', text: 'text-gray-600', muted: 'text-gray-500', border: 'border-gray-200', card: 'bg-white', iconColor: 'brand', dark: false },
  'brand-light': { bg: 'bg-brand-50', heading: 'text-gray-900', subheading: 'text-brand-700', text: 'text-gray-600', muted: 'text-gray-500', border: 'border-brand-200', card: 'bg-white', iconColor: 'brand', dark: false },
  'gray-dark': { bg: 'bg-gray-950', heading: 'text-white', subheading: 'text-gray-300', text: 'text-gray-300', muted: 'text-gray-400', border: 'border-gray-800', card: 'bg-gray-900', iconColor: 'gray', dark: true },
  brand: { bg: 'bg-brand-800', heading: 'text-white', subheading: 'text-brand-200', text: 'text-brand-200', muted: 'text-brand-300', border: 'border-brand-700', card: 'bg-brand-700', iconColor: 'brand', dark: true },
};

const ThemeContext = createContext<MarketingTheme>('default');
/** Current marketing theme (set by the nearest <MarketingSection>). */
export const useMarketingTheme = () => {
  const theme = useContext(ThemeContext);
  return { theme, t: themeTokens[theme] };
};
export const MarketingThemeProvider = ThemeContext.Provider;

export interface MarketingSectionProps extends HTMLAttributes<HTMLElement> {
  theme?: MarketingTheme;
  /** Vertical padding: 'md' = 64/96px (default), 'sm' = 48/64px, 'none'. */
  spacing?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'section' | 'header' | 'footer' | 'div';
}

/** Full-width section wrapper with theme background + vertical rhythm. */
export const MarketingSection = forwardRef<HTMLElement, MarketingSectionProps>(function MarketingSection(
  { theme = 'default', spacing = 'md', as: Comp = 'section', className, children, ...props },
  ref,
) {
  const pad = { none: '', sm: 'py-12 md:py-16', md: 'py-16 md:py-24', lg: 'py-16 md:py-24 lg:pb-32' }[spacing];
  return (
    <ThemeContext.Provider value={theme}>
      <Comp ref={ref as never} data-theme={theme} className={cx('relative w-full overflow-hidden', themeTokens[theme].bg, pad, className)} {...props}>
        {children}
      </Comp>
    </ThemeContext.Provider>
  );
});

/** 1280px max-width container with 16px (mobile) / 32px (desktop) side padding. */
export function Container({ className, children, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cx('relative mx-auto w-full max-w-[1280px] px-4 md:px-8', className)} {...props}>
      {children}
    </div>
  );
}

export interface SectionHeadingProps {
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'left' | 'center';
  /** 'md' = display-sm/md heading (sections), 'lg' = display-md/lg (page headers), 'xl' = display-md/xl (hero) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Renders the subheading as a badge-like pill instead of plain text. */
  subheadingAs?: 'text' | 'node';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  children?: ReactNode;
}

const titleSize = {
  sm: 'text-display-xs md:text-display-sm',
  md: 'text-display-sm md:text-display-md',
  lg: 'text-display-md md:text-display-lg',
  xl: 'text-display-md md:text-display-xl',
};
const textSize = { sm: 'text-md md:text-lg', md: 'text-lg md:text-xl', lg: 'text-lg md:text-xl', xl: 'text-lg md:text-xl' };

/** Subheading + heading + supporting text block, theme-aware. */
export function SectionHeading({ subheading, title, supportingText, align = 'left', size = 'md', as: H = 'h2', className, children }: SectionHeadingProps) {
  const { t } = useMarketingTheme();
  return (
    <div className={cx('flex max-w-3xl flex-col', align === 'center' && 'mx-auto items-center text-center', className)}>
      {subheading != null && (typeof subheading === 'string'
        ? <p className={cx('mb-3 text-sm font-semibold md:text-md', t.subheading)}>{subheading}</p>
        : <div className="mb-3 md:mb-4">{subheading}</div>)}
      {title != null && <H className={cx('font-semibold', titleSize[size], t.heading)}>{title}</H>}
      {supportingText != null && <div className={cx('mt-4 md:mt-5', textSize[size], t.text)}>{supportingText}</div>}
      {children}
    </div>
  );
}

export interface ImagePlaceholderProps extends HTMLAttributes<HTMLDivElement> {
  /** Image URL. When omitted a soft gradient placeholder is shown. */
  src?: string;
  alt?: string;
  /** CSS aspect-ratio, e.g. "16/9", "1/1", "4/3" */
  ratio?: string;
  /** Placeholder tint */
  tone?: 'gray' | 'brand' | 'warm' | 'cool' | 'dark';
}

const tones = {
  gray: 'from-gray-100 via-gray-200 to-gray-300',
  brand: 'from-brand-100 via-brand-200 to-brand-400',
  warm: 'from-orange-100 via-rose-200 to-brand-300',
  cool: 'from-blue-light-100 via-indigo-200 to-brand-300',
  dark: 'from-gray-700 via-gray-800 to-gray-950',
};

/** Photo slot used across marketing sections. Pass `src` for a real image. */
export function ImagePlaceholder({ src, alt = '', ratio, tone = 'gray', className, style, children, ...props }: ImagePlaceholderProps) {
  const s: CSSProperties = { ...(ratio ? { aspectRatio: ratio } : null), ...style };
  return (
    <div className={cx('relative overflow-hidden', !src && 'bg-gradient-to-br', !src && tones[tone], className)} style={s} {...props}>
      {src && <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />}
      {children}
    </div>
  );
}
