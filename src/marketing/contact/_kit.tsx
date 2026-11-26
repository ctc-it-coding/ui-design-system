import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge, type BadgeColor, type BadgeType } from '../../components/badges/Badge';
import { useMarketingTheme, type MarketingTheme } from '../_shared';

/**
 * Small shared kit for the Contact / Team / Careers / FAQ / Footer areas.
 * Colors follow the Figma specs of these pages (dark themes use gray-200 / brand-200
 * supporting text, which differs from the generic `themeTokens`).
 */
export interface KitTokens {
  heading: string;
  subheading: string;
  text: string;
  muted: string;
  border: string;
  /** strong divider used by list items on dark backgrounds */
  divider: string;
  /** soft card surface */
  card: string;
  /** icon color for plain (non-featured) icons */
  icon: string;
  /** link color (Buttons/Button Link color) */
  link: string;
  dark: boolean;
}

const light: KitTokens = {
  heading: 'text-gray-900',
  subheading: 'text-brand-700',
  text: 'text-gray-600',
  muted: 'text-gray-500',
  border: 'border-gray-200',
  divider: 'border-gray-200',
  card: 'bg-gray-50',
  icon: 'text-brand-600',
  link: 'text-brand-700 hover:text-brand-800',
  dark: false,
};

export const kitTokens: Record<MarketingTheme, KitTokens> = {
  default: light,
  'gray-light': { ...light, card: 'bg-white' },
  'brand-light': { ...light, card: 'bg-white', border: 'border-brand-200' },
  'gray-dark': {
    heading: 'text-white',
    subheading: 'text-gray-200',
    text: 'text-gray-200',
    muted: 'text-gray-300',
    border: 'border-gray-800',
    divider: 'border-gray-600',
    card: 'bg-gray-800',
    icon: 'text-white',
    link: 'text-white hover:text-gray-200',
    dark: true,
  },
  brand: {
    heading: 'text-white',
    subheading: 'text-brand-200',
    text: 'text-brand-200',
    muted: 'text-brand-300',
    border: 'border-brand-600',
    divider: 'border-brand-600',
    card: 'bg-brand-700',
    icon: 'text-white',
    link: 'text-white hover:text-brand-100',
    dark: true,
  },
};

/** Tokens for the current marketing theme (nearest `<MarketingSection>`). */
export function useKit() {
  const { theme } = useMarketingTheme();
  return { theme, k: kitTokens[theme] };
}

export interface KitHeadingProps {
  subheading?: ReactNode;
  /** Renders the subheading as a Badge (Figma "Heading and badge"). */
  badge?: { type?: BadgeType; color?: BadgeColor };
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'left' | 'center';
  /** md = 30/36px section heading, lg = 36/48px page heading */
  size?: 'sm' | 'md' | 'lg';
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  children?: ReactNode;
}

const titleCls = { sm: 'text-display-xs md:text-display-sm', md: 'text-display-sm md:text-display-md', lg: 'text-display-md md:text-display-lg' };
const textCls = { sm: 'text-md md:text-lg', md: 'text-lg md:text-xl', lg: 'text-lg md:text-xl' };

/** Subheading (or badge) + heading + supporting text, colored for the current theme. */
export function KitHeading({ subheading, badge, title, supportingText, align = 'left', size = 'md', as: H = 'h2', className, children }: KitHeadingProps) {
  const { k } = useKit();
  return (
    <div className={cx('flex w-full max-w-3xl flex-col', align === 'center' && 'mx-auto items-center text-center', className)}>
      {subheading != null &&
        (badge ? (
          <Badge size="lg" type={badge.type ?? 'pill-color'} color={badge.color ?? 'brand'} className="mb-3 md:mb-4">
            {subheading}
          </Badge>
        ) : (
          <p className={cx('mb-3 text-sm font-semibold md:text-md', k.subheading)}>{subheading}</p>
        ))}
      {title != null && <H className={cx('font-semibold', titleCls[size], k.heading)}>{title}</H>}
      {supportingText != null && <div className={cx('mt-4 md:mt-5', size === 'lg' && 'md:mt-6', textCls[size], k.text)}>{supportingText}</div>}
      {children}
    </div>
  );
}

/** Vertical stack used between the heading block and the section content (48 mobile / 64 desktop). */
export const sectionStack = 'flex flex-col gap-12 md:gap-16';
