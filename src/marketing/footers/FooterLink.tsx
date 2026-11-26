import { forwardRef, type AnchorHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge } from '../../components/badges/Badge';
import { useMarketingTheme } from '../_shared';
import type { FooterLinkData } from './defaults';

/** Figma "Color" of _Footer link / _Footer links column: gray links or brand links. */
export type FooterLinkColor = 'default' | 'brand';

type Tone = 'light' | 'gray-dark' | 'brand';
function useTone(): Tone {
  const { theme } = useMarketingTheme();
  return theme === 'gray-dark' || theme === 'brand' ? theme : 'light';
}

const linkCls: Record<Tone, Record<FooterLinkColor, string>> = {
  light: { default: 'text-gray-600 hover:text-gray-700', brand: 'text-brand-700 hover:text-brand-800' },
  'gray-dark': { default: 'text-gray-200 hover:text-white', brand: 'text-gray-200 hover:text-white' },
  brand: { default: 'text-brand-200 hover:text-white', brand: 'text-brand-200 hover:text-white' },
};
const headingCls: Record<Tone, Record<FooterLinkColor, string>> = {
  light: { default: 'text-gray-500', brand: 'text-gray-900' },
  'gray-dark': { default: 'text-gray-300', brand: 'text-gray-300' },
  brand: { default: 'text-brand-300', brand: 'text-brand-300' },
};

export interface FooterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma: Color */
  color?: FooterLinkColor;
  /** Figma: Badge=True — label of the small badge after the link. */
  badge?: ReactNode;
  /** Smaller (14px) / regular-weight variant used in bottom bars. */
  size?: 'sm' | 'md';
}

/** FooterLink — Figma "_Footer link": footer text link with optional "New" badge; colors follow the footer theme. */
export const FooterLink = forwardRef<HTMLAnchorElement, FooterLinkProps>(function FooterLink(
  { color = 'default', badge, size = 'md', href = '#', className, children, ...props },
  ref,
) {
  const tone = useTone();
  return (
    <span className="inline-flex items-center gap-2">
      <a
        ref={ref}
        href={href}
        className={cx(
          'rounded-sm font-semibold transition-colors outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24',
          size === 'sm' ? 'text-sm' : 'text-md',
          linkCls[tone][color],
          className,
        )}
        {...props}
      >
        {children}
      </a>
      {badge != null &&
        (tone === 'light' ? (
          <Badge size="sm" type={color === 'brand' ? 'pill-outline' : 'pill-color'} color={color === 'brand' ? 'brand' : 'success'}>
            {badge}
          </Badge>
        ) : (
          <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-2 py-0.5 text-xs font-medium text-white">{badge}</span>
        ))}
    </span>
  );
});

export interface FooterLinksColumnProps extends HTMLAttributes<HTMLDivElement> {
  heading?: ReactNode;
  links?: FooterLinkData[];
  /** Figma: Color */
  color?: FooterLinkColor;
}

/** FooterLinksColumn — Figma "_Footer links column": heading + vertical list of FooterLinks. */
export const FooterLinksColumn = forwardRef<HTMLDivElement, FooterLinksColumnProps>(function FooterLinksColumn(
  { heading = 'Product', links = [], color = 'default', className, ...props },
  ref,
) {
  const tone = useTone();
  return (
    <div ref={ref} className={cx('flex min-w-0 flex-col gap-4', className)} {...props}>
      <h4 className={cx('text-sm font-semibold', headingCls[tone][color])}>{heading}</h4>
      <ul className="flex flex-col gap-3">
        {links.map((lnk, i) => (
          <li key={i}>
            <FooterLink href={lnk.href} badge={lnk.badge} color={color}>
              {lnk.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </div>
  );
});
