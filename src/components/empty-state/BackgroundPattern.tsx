import { forwardRef, useId, type SVGProps } from 'react';
import { cx } from '../../utils/cx';

export type BackgroundPatternType = 'circles' | 'grid' | 'grid-dot';
export type BackgroundPatternSize = 'sm' | 'md' | 'lg';

export interface BackgroundPatternProps extends Omit<SVGProps<SVGSVGElement>, 'ref' | 'type'> {
  /** Figma: Type (Circles / Grid / Grid dot) */
  type?: BackgroundPatternType;
  /** Figma: Size — sm 336px, md 480px, lg 768px */
  size?: BackgroundPatternSize;
}

const px: Record<BackgroundPatternSize, number> = { sm: 336, md: 480, lg: 768 };
const radialMask = 'radial-gradient(closest-side, #000 0%, transparent 100%)';

/**
 * BackgroundPattern — Figma "Background pattern decorative".
 * Thin gray-200 lines faded out with a radial mask. Purely decorative (aria-hidden).
 */
export const BackgroundPattern = forwardRef<SVGSVGElement, BackgroundPatternProps>(function BackgroundPattern(
  { type = 'circles', size = 'md', className, style, ...props },
  ref,
) {
  const s = px[size];
  const id = useId().replace(/:/g, '');
  const gap = size === 'sm' ? 24 : 32;
  let body;
  if (type === 'circles') {
    const step = size === 'sm' ? 24 : 32;
    const rings: number[] = [];
    for (let r = s / 2; r >= 48; r -= step) rings.push(r);
    body = rings.map((r) => <circle key={r} cx={s / 2} cy={s / 2} r={r - 0.5} fill="none" stroke="currentColor" />);
  } else if (type === 'grid') {
    body = (
      <>
        <defs>
          <pattern id={`g${id}`} width={gap} height={gap} patternUnits="userSpaceOnUse">
            <path d={`M ${gap} 0 L 0 0 0 ${gap}`} fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width={s} height={s} fill={`url(#g${id})`} />
      </>
    );
  } else {
    body = (
      <>
        <defs>
          <pattern id={`d${id}`} width={gap / 2} height={gap / 2} patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
          </pattern>
        </defs>
        <rect width={s} height={s} fill={`url(#d${id})`} />
      </>
    );
  }
  return (
    <svg
      ref={ref}
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      aria-hidden
      className={cx('pointer-events-none shrink-0', type === 'grid-dot' ? 'text-gray-300' : 'text-gray-200', className)}
      style={{ maskImage: radialMask, WebkitMaskImage: radialMask, ...style }}
      {...props}
    >
      {body}
    </svg>
  );
});
