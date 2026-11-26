import { forwardRef, type HTMLAttributes, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { useUid } from '../charts/utils';

export type StarColor = 'yellow' | 'gray';

const STAR =
  'M9.54 1.61C9.71 1.2 10.29 1.2 10.46 1.61L12.53 6.58C12.6 6.75 12.76 6.87 12.95 6.88L18.31 7.31C18.76 7.35 18.94 7.9 18.6 8.19L14.51 11.69C14.37 11.81 14.31 12.01 14.35 12.19L15.6 17.42C15.7 17.85 15.23 18.2 14.85 17.96L10.26 15.16C10.1 15.06 9.9 15.06 9.74 15.16L5.15 17.96C4.77 18.2 4.3 17.85 4.4 17.42L5.65 12.19C5.69 12.01 5.63 11.81 5.49 11.69L1.4 8.19C1.06 7.9 1.24 7.35 1.69 7.31L7.05 6.88C7.24 6.87 7.4 6.75 7.47 6.58L9.54 1.61Z';

const fillCls: Record<StarColor, string> = { yellow: 'fill-warning-400', gray: 'fill-gray-900' };

export interface StarIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'fill'> {
  /** Figma: Fill — 0 to 100 (%), partial fills are clipped left-to-right. */
  fill?: number;
  /** Figma: Color */
  color?: StarColor;
  /** px, default 20. */
  size?: number;
}

/** StarIcon — Figma "Misc icons/Star icon": gray-100 star with a partial coloured fill. Decorative by default. */
export const StarIcon = forwardRef<SVGSVGElement, StarIconProps>(function StarIcon(
  { fill = 100, color = 'yellow', size = 20, className, ...props },
  ref,
) {
  const id = useUid('tc-star');
  const pct = Math.max(0, Math.min(100, fill));
  return (
    <svg ref={ref} width={size} height={size} viewBox="0 0 20 20" aria-hidden className={cx('shrink-0', className)} {...props}>
      <defs>
        <clipPath id={id}>
          <rect width={(20 * pct) / 100} height={20} />
        </clipPath>
      </defs>
      <path d={STAR} className="fill-gray-100" />
      {pct > 0 && <path d={STAR} className={fillCls[color]} clipPath={`url(#${id})`} />}
    </svg>
  );
});

export interface RatingStarsProps extends HTMLAttributes<HTMLDivElement> {
  /** Rating, e.g. 3.5 (fractions are drawn as partial stars). */
  value: number;
  /** Number of stars, default 5. */
  max?: number;
  color?: StarColor;
  /** Star size in px, default 20. */
  size?: number;
}

/** RatingStars — a row of StarIcons with partial fill; exposes the value as an accessible label. */
export const RatingStars = forwardRef<HTMLDivElement, RatingStarsProps>(function RatingStars(
  { value, max = 5, color = 'yellow', size = 20, className, ...props },
  ref,
) {
  return (
    <div ref={ref} role="img" aria-label={`Rated ${value} out of ${max}`} className={cx('inline-flex items-center gap-1', className)} {...props}>
      {Array.from({ length: max }, (_, i) => (
        <StarIcon key={i} size={size} color={color} fill={Math.max(0, Math.min(1, value - i)) * 100} />
      ))}
    </div>
  );
});
