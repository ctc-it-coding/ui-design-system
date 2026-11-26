import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { socialIconData, type SocialPlatform } from './data/social.data';

export type { SocialPlatform };
export type SocialIconVariant = 'brand' | 'white' | 'gray';

export interface SocialIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Figma: Platform */
  platform: SocialPlatform;
  /** Figma: Style (Brand / White / Gray). Gray darkens on hover. */
  variant?: SocialIconVariant;
  /** px, default 24. */
  size?: number;
  /** Accessible name; defaults to the platform name. Pass `title=""` for decorative use. */
  title?: string;
}

export const socialPlatforms = Object.keys(socialIconData) as SocialPlatform[];

/** SocialIcon — Figma "Misc icons/Social icon". */
export const SocialIcon = forwardRef<SVGSVGElement, SocialIconProps>(function SocialIcon(
  { platform, variant = 'brand', size = 24, title, className, ...props },
  ref,
) {
  const d = socialIconData[platform];
  const name = title ?? platform;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={name ? 'img' : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={cx(
        'shrink-0 transition-colors duration-100',
        variant === 'gray' && 'text-gray-400 hover:text-gray-500',
        variant === 'white' && 'text-white hover:text-white/80',
        className,
      )}
      dangerouslySetInnerHTML={{ __html: (name ? `<title>${name}</title>` : '') + (variant === 'brand' ? d.brand : d.mono) }}
      {...props}
    />
  );
});
