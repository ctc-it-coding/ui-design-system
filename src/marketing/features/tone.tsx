import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge, type BadgeType } from '../../components/badges/Badge';
import type { FeaturedIconColor, FeaturedIconTheme } from '../../components/featured-icons/FeaturedIcon';
import type { MarketingTheme } from '../_shared';

/**
 * Text / accent colors used by the Features, Metrics and Social proof sections, per theme.
 * (Figma values for these sections — dark themes use gray-200 / brand-200 body text.)
 */
export interface AreaTone {
  dark: boolean;
  heading: string;
  subheading: string;
  text: string;
  /** small icon (no featured-icon wrapper) color */
  icon: string;
  /** link-button override on dark backgrounds */
  link?: string;
  /** borders / dividers */
  border: string;
  featuredColor: FeaturedIconColor;
  featuredTheme: FeaturedIconTheme;
}

export function areaTone(theme: MarketingTheme | undefined): AreaTone {
  switch (theme) {
    case 'gray-dark':
      return {
        dark: true, heading: 'text-white', subheading: 'text-gray-200', text: 'text-gray-200', icon: 'text-gray-300',
        link: 'text-white hover:text-gray-200', border: 'border-gray-600', featuredColor: 'gray', featuredTheme: 'dark-outline',
      };
    case 'brand':
      return {
        dark: true, heading: 'text-white', subheading: 'text-brand-200', text: 'text-brand-200', icon: 'text-brand-300',
        link: 'text-white hover:text-brand-100', border: 'border-brand-600', featuredColor: 'brand', featuredTheme: 'dark-outline',
      };
    default:
      return {
        dark: false, heading: 'text-gray-900', subheading: 'text-brand-700', text: 'text-gray-600', icon: 'text-brand-600',
        border: 'border-gray-200', featuredColor: 'brand', featuredTheme: 'light-outline',
      };
  }
}

/** Section heading badge (Figma "Heading and badge"): md on mobile, lg from md breakpoint. */
export function HeadingBadge({ type = 'pill-color', children }: { type?: BadgeType; children: ReactNode }) {
  const dot = type === 'badge-modern';
  return (
    <>
      <Badge size="md" type={type} color="brand" dot={dot} className="md:hidden">{children}</Badge>
      <Badge size="lg" type={type} color="brand" dot={dot} className="hidden md:inline-flex">{children}</Badge>
    </>
  );
}

export interface AreaHeadingProps {
  /** Eyebrow text above the heading. */
  subheading?: ReactNode;
  /** Renders the eyebrow as a Badge of this type instead of plain text. */
  badge?: BadgeType;
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'left' | 'center';
  tone: AreaTone;
  /** Heading max-width class (default max-w-3xl = 768px). */
  widthClass?: string;
  className?: string;
  children?: ReactNode;
}

/** Subheading/badge + heading + supporting text, sized like the Figma marketing sections (30/38 → 36/44). */
export function AreaHeading({ subheading, badge, title, supportingText, align = 'left', tone, widthClass = 'max-w-3xl', className, children }: AreaHeadingProps) {
  return (
    <div className={cx('flex flex-col', widthClass, align === 'center' && 'mx-auto items-center text-center', className)}>
      {subheading != null && (badge
        ? <div className="mb-4 flex">{<HeadingBadge type={badge}>{subheading}</HeadingBadge>}</div>
        : <p className={cx('mb-3 text-sm font-semibold md:text-md', tone.subheading)}>{subheading}</p>)}
      {title != null && <h2 className={cx('text-display-sm font-semibold md:text-display-md', tone.heading)}>{title}</h2>}
      {supportingText != null && <p className={cx('mt-4 text-lg md:mt-5 md:text-xl', tone.text)}>{supportingText}</p>}
      {children}
    </div>
  );
}
