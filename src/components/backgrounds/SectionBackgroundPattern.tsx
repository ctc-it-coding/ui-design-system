import { forwardRef, useId, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type SectionBackgroundPatternType = 'grid-check' | 'grid-dot' | 'grid' | 'empty';

export interface SectionBackgroundPatternProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type */
  type?: SectionBackgroundPatternType;
  /** Figma: Size — sm = 64px cells, md = 96px cells */
  size?: 'sm' | 'md';
}

/** Filled (gray-100) cells of Figma "Grid check" (column, row) — Desktop 1920×1440 frame. */
const checks = { md: [[5,1],[14,1],[7,2],[11,2],[2,3],[14,3],[8,4],[18,4],[5,5],[11,5],[3,6],[16,6],[8,7],[14,7],[5,8],[11,8],[1,9],[17,9],[6,10],[10,10],[2,11],[14,11],[8,12],[18,12],[5,13],[11,13],[3,14],[16,14]], sm: [[5,1],[9,1],[20,1],[11,2],[16,2],[26,2],[3,3],[6,3],[20,3],[8,4],[13,4],[24,4],[11,5],[17,5],[20,5],[7,6],[14,6],[23,6],[12,7],[18,7],[26,7],[5,8],[10,8],[21,8],[7,9],[14,9],[25,9],[3,10],[12,10],[19,10],[6,11],[16,11],[21,11],[4,12],[12,12],[24,12],[9,13],[18,13],[26,13],[6,14],[15,14],[22,14],[4,15],[11,15],[19,15],[7,16],[22,16],[12,17],[16,17],[26,17],[3,18],[6,18],[20,18],[8,19],[13,19],[24,19],[11,20],[17,20],[20,20],[7,21],[14,21],[23,21]] } as const;

/**
 * SectionBackgroundPattern — Figma "Background pattern" (section/hero backdrop).
 * Absolutely positioned (put it first inside a `relative overflow-hidden` section): a 1920×1440 gray-300 grid / dots /
 * checkerboard, centred at the top and faded with a radial-down mask (1440px wide on desktop, 960px on mobile).
 */
export const SectionBackgroundPattern = forwardRef<HTMLDivElement, SectionBackgroundPatternProps>(function SectionBackgroundPattern(
  { type = 'grid-check', size = 'md', className, ...props },
  ref,
) {
  const id = useId().replace(/:/g, '');
  if (type === 'empty') return <div ref={ref} aria-hidden className={cx('pointer-events-none absolute inset-0', className)} {...props} />;
  const g = size === 'md' ? 96 : 64;
  const mask = 'radial-gradient(52.2% 100% at 50% 0%, #000 0%, transparent 95.3%)';
  return (
    <div ref={ref} aria-hidden className={cx('pointer-events-none absolute inset-x-0 top-0 flex h-[960px] justify-center overflow-hidden md:h-[1440px]', className)} {...props}>
      <div className="relative h-[960px] w-[960px] shrink-0 md:h-[1440px] md:w-[1440px]" style={{ maskImage: mask, WebkitMaskImage: mask }}>
        <svg width="1920" height="1440" viewBox="0 0 1920 1440" fill="none" className="absolute left-1/2 top-0 -translate-x-1/2 text-gray-300">
          <defs>
            {type === 'grid-dot' ? (
              <pattern id={`sbp${id}`} width={size === 'md' ? 24 : 16} height={size === 'md' ? 24 : 16} patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r={size === 'md' ? 2 : 1.5} className="fill-gray-400" />
              </pattern>
            ) : (
              <pattern id={`sbp${id}`} width={g} height={g} patternUnits="userSpaceOnUse">
                <path d={`M${g - 0.5} 0V${g - 0.5}H0`} stroke="currentColor" />
              </pattern>
            )}
          </defs>
          {type === 'grid-check' && checks[size].map(([c, r]) => <rect key={`${c}-${r}`} x={c * g} y={r * g} width={g} height={g} className="fill-gray-100" />)}
          <rect width="1920" height="1440" fill={`url(#sbp${id})`} />
        </svg>
      </div>
    </div>
  );
});
