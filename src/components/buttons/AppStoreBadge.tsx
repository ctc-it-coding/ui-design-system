import { useScopedSvg } from '../../utils/scopeSvgIds';
import { forwardRef, type AnchorHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { appStoreBadgeData } from './appStoreBadges.data';

export type AppStoreBadgeStore = 'google-play' | 'app-store' | 'galaxy-store' | 'appgallery' | 'f-droid';
export type AppStoreBadgeVariant = 'black-outline' | 'white-outline' | 'brand';

export interface AppStoreBadgeProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Figma: Store */
  store: AppStoreBadgeStore;
  /** Figma: Style — black-outline (white badge, black border), white-outline (transparent, white art; for dark bgs), brand (black badge, colored icon) */
  variant?: AppStoreBadgeVariant;
  /** Figma: Size — md 40px / lg 44px tall */
  size?: 'md' | 'lg';
}

const names: Record<AppStoreBadgeStore, string> = {
  'google-play': 'Get it on Google Play',
  'app-store': 'Download on the App Store',
  'galaxy-store': 'Available on Galaxy Store',
  appgallery: 'Explore it on AppGallery',
  'f-droid': 'Get it on F-Droid',
};

export const appStoreBadgeStores = Object.keys(names) as AppStoreBadgeStore[];

/** AppStoreBadge — Figma "Mobile app store badge". Renders a link (pass `href`) containing the official badge art. */
export const AppStoreBadge = forwardRef<HTMLAnchorElement, AppStoreBadgeProps>(function AppStoreBadge(
  { store, variant = 'brand', size = 'md', className, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const art = appStoreBadgeData[`${store}/${variant}/${size}`] ?? appStoreBadgeData[`${store}/${variant}/md`];
  const scopedBody = useScopedSvg(art.body);
  const h = size === 'lg' ? 44 : 40;
  return (
    <a
      ref={ref}
      aria-label={ariaLabel ?? names[store]}
      className={cx(
        'inline-flex shrink-0 rounded-[7px] outline-none transition duration-100 hover:opacity-90 focus-visible:ring-4 focus-visible:ring-brand-500/24',
        className,
      )}
      {...props}
    >
      <svg viewBox={`0 0 ${art.w} ${art.h}`} height={h} width={(h * art.w) / art.h} aria-hidden fill="none" dangerouslySetInnerHTML={{ __html: scopedBody }} />
    </a>
  );
});
