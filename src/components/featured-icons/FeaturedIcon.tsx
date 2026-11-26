import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';

export type FeaturedIconSize = 'sm' | 'md' | 'lg' | 'xl';
export type FeaturedIconColor = 'brand' | 'gray' | 'error' | 'warning' | 'success';
export type FeaturedIconTheme =
  | 'light'
  | 'light-square'
  | 'modern'
  | 'mid-square'
  | 'dark-square'
  | 'dark-outline'
  | 'light-outline'
  | 'glass'
  | 'outline';

export interface FeaturedIconProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** The icon (component or element). */
  icon: IconSlot;
  /** Figma: Size (sm 32, md 40, lg 48, xl 56) */
  size?: FeaturedIconSize;
  /** Figma: Color */
  color?: FeaturedIconColor;
  /** Figma: Theme (`outline` = the separate "Featured icon outline" set, whose rings overflow the icon box). */
  theme?: FeaturedIconTheme;
}

const box: Record<FeaturedIconSize, string> = { sm: 'size-8', md: 'size-10', lg: 'size-12', xl: 'size-14' };
const px: Record<FeaturedIconSize, number> = { sm: 32, md: 40, lg: 48, xl: 56 };
const iconSize: Record<FeaturedIconSize, string> = { sm: 'size-4', md: 'size-5', lg: 'size-6', xl: 'size-7' };
const squareRadius: Record<FeaturedIconSize, string> = { sm: 'rounded-md', md: 'rounded-lg', lg: 'rounded-[10px]', xl: 'rounded-xl' };
/* Centre-aligned Figma stroke = half inside (border) + half outside (ring). */
const outlineWidth: Record<FeaturedIconSize, string> = {
  sm: 'border-2 ring-2',
  md: 'border-[3px] ring-[3px]',
  lg: 'border-4 ring-4',
  xl: 'border-[5px] ring-[5px]',
};
const ringsInner: Record<FeaturedIconSize, string> = { sm: 'size-6', md: 'size-7', lg: 'size-8', xl: 'size-9' };
const ringsOuter: Record<FeaturedIconSize, string> = { sm: 'size-[34px]', md: 'size-[38px]', lg: 'size-[42px]', xl: 'size-[46px]' };

interface ColorSet {
  light: string;
  mid: string;
  dark: string;
  darkOutline: string;
  lightOutline: string;
  glassBack: string;
  ring: string;
  text: string;
}

const colors: Record<FeaturedIconColor, ColorSet> = {
  brand: {
    light: 'bg-brand-100 text-brand-600',
    mid: 'bg-brand-600 text-white',
    dark: 'bg-brand-800 text-white',
    darkOutline: 'bg-brand-600 border-brand-700 ring-brand-700 text-white',
    lightOutline: 'bg-brand-100 border-brand-50 ring-brand-50 text-brand-600',
    glassBack: 'bg-brand-700',
    ring: 'border-brand-600',
    text: 'text-brand-600',
  },
  gray: {
    light: 'bg-gray-100 text-gray-600',
    mid: 'bg-gray-600 text-white',
    dark: 'bg-gray-800 text-white',
    darkOutline: 'bg-gray-600 border-gray-800 ring-gray-800 text-white',
    lightOutline: 'bg-gray-100 border-gray-50 ring-gray-50 text-gray-600',
    glassBack: 'bg-gray-700',
    ring: 'border-gray-600',
    text: 'text-gray-600',
  },
  error: {
    light: 'bg-error-100 text-error-600',
    mid: 'bg-error-600 text-white',
    dark: 'bg-error-800 text-white',
    darkOutline: 'bg-error-500 border-error-600 ring-error-600 text-white',
    lightOutline: 'bg-error-100 border-error-50 ring-error-50 text-error-600',
    glassBack: 'bg-error-700',
    ring: 'border-error-600',
    text: 'text-error-600',
  },
  warning: {
    light: 'bg-warning-100 text-warning-600',
    mid: 'bg-warning-600 text-white',
    dark: 'bg-warning-800 text-white',
    darkOutline: 'bg-warning-500 border-warning-600 ring-warning-600 text-white',
    lightOutline: 'bg-warning-100 border-warning-50 ring-warning-50 text-warning-600',
    glassBack: 'bg-warning-700',
    ring: 'border-warning-600',
    text: 'text-warning-600',
  },
  success: {
    light: 'bg-success-100 text-success-600',
    mid: 'bg-success-600 text-white',
    dark: 'bg-success-800 text-white',
    darkOutline: 'bg-success-500 border-success-600 ring-success-600 text-white',
    lightOutline: 'bg-success-100 border-success-50 ring-success-50 text-success-600',
    glassBack: 'bg-success-700',
    ring: 'border-success-600',
    text: 'text-success-600',
  },
};

/** FeaturedIcon — Figma "Featured icon" (8 themes) + "Featured icon outline". */
export const FeaturedIcon = forwardRef<HTMLSpanElement, FeaturedIconProps>(function FeaturedIcon(
  { icon, size = 'lg', color = 'brand', theme = 'light', className, ...props },
  ref,
) {
  const c = colors[color];
  const ic = cx(iconSize[size], 'shrink-0');
  const base = 'relative inline-flex shrink-0 items-center justify-center';

  if (theme === 'outline') {
    return (
      <span ref={ref} className={cx(base, iconSize[size], c.text, className)} {...props}>
        <span className={cx('absolute rounded-full border-2 opacity-30', ringsInner[size], c.ring)} aria-hidden />
        <span className={cx('absolute rounded-full border-2 opacity-10', ringsOuter[size], c.ring)} aria-hidden />
        {renderIcon(icon, ic)}
      </span>
    );
  }

  if (theme === 'glass') {
    return (
      <span ref={ref} className={cx(base, box[size], className)} {...props}>
        <span
          className={cx('absolute inset-0 origin-top-left', squareRadius[size], c.glassBack)}
          style={{ transform: `translate(${(px[size] * 0.313).toFixed(1)}px, ${(px[size] * -0.279).toFixed(1)}px) rotate(15deg)` }}
          aria-hidden
        />
        <span
          className={cx(
            'relative flex size-full items-center justify-center bg-white/60 text-white ring-1 ring-inset ring-white/60 backdrop-blur-sm',
            squareRadius[size],
          )}
        >
          {renderIcon(icon, ic)}
        </span>
      </span>
    );
  }

  const themeCls: Record<Exclude<FeaturedIconTheme, 'outline' | 'glass'>, string> = {
    light: cx('rounded-full', c.light),
    'light-square': cx(squareRadius[size], c.light),
    modern: cx(squareRadius[size], 'bg-white text-gray-700 shadow-xs ring-1 ring-inset ring-gray-200'),
    'mid-square': cx(squareRadius[size], c.mid),
    'dark-square': cx(squareRadius[size], c.dark),
    'dark-outline': cx('rounded-full', outlineWidth[size], c.darkOutline),
    'light-outline': cx('rounded-full', outlineWidth[size], c.lightOutline),
  };

  return (
    <span ref={ref} className={cx(base, box[size], themeCls[theme], className)} {...props}>
      {renderIcon(icon, ic)}
    </span>
  );
});
