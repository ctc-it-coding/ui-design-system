import { forwardRef, useId, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { backgroundMaskStyle } from './BackgroundMask';

export type BackgroundPatternDecorativeType = 'circles' | 'squares' | 'grid' | 'grid-dot' | 'empty';
export type BackgroundPatternDecorativeSize = 'sm' | 'md' | 'lg';

export interface BackgroundPatternDecorativeProps extends Omit<SVGAttributes<SVGSVGElement>, 'type' | 'children'> {
  /** Figma: Type (Circles / Squares / Grid / Grid dot / Empty = Background False) */
  type?: BackgroundPatternDecorativeType;
  /** Figma: Size — sm 336, md 480, lg 768 px */
  size?: BackgroundPatternDecorativeSize;
}

const S = { sm: 336, md: 480, lg: 768 } as const;
const STEP = { sm: 48, md: 64, lg: 96 } as const; // ring / square increments (diameter)
const GRID = { sm: 24, md: 32, lg: 48 } as const;
const DOT = { sm: 18, md: 23, lg: 24 } as const;

/**
 * BackgroundPatternDecorative — Figma "Background pattern decorative": gray-200 (dots gray-300) line art
 * faded with a radial-center mask. Decorative; place it absolutely behind featured icons / empty states.
 */
export const BackgroundPatternDecorative = forwardRef<SVGSVGElement, BackgroundPatternDecorativeProps>(function BackgroundPatternDecorative(
  { type = 'circles', size = 'md', className, style, ...props },
  ref,
) {
  const s = S[size];
  const id = useId().replace(/:/g, '');
  const c = s / 2;
  let body = null;
  if (type === 'circles') {
    const ds: number[] = [];
    for (let d = s; d >= 96; d -= STEP[size]) ds.push(d);
    body = ds.map((d) => <circle key={d} cx={c} cy={c} r={d / 2 - 0.5} />);
  } else if (type === 'squares') {
    const ds: number[] = [];
    for (let d = s; d >= 96; d -= STEP[size]) ds.push(d);
    body = (
      <g transform={`rotate(-12.5 ${c} ${c})`}>
        {ds.map((d) => <rect key={d} x={c - d / 2 + 0.5} y={c - d / 2 + 0.5} width={d - 1} height={d - 1} rx={12} />)}
      </g>
    );
  } else if (type === 'grid') {
    const g = GRID[size];
    body = (
      <>
        <defs>
          <pattern id={`bpg${id}`} width={g} height={g} patternUnits="userSpaceOnUse">
            <path d={`M${g} 0.5H0.5V${g}`} />
          </pattern>
        </defs>
        <rect width={s} height={s} fill={`url(#bpg${id})`} stroke="none" />
        <rect x={0.5} y={0.5} width={s - 1} height={s - 1} />
      </>
    );
  } else if (type === 'grid-dot') {
    const g = DOT[size];
    const off = { sm: 6, md: 10, lg: 12 }[size];
    body = (
      <>
        <defs>
          <pattern id={`bpd${id}`} x={off} y={off} width={g} height={g} patternUnits="userSpaceOnUse">
            <circle cx={1.5} cy={1.5} r={1.5} className="fill-gray-300" stroke="none" />
          </pattern>
        </defs>
        <rect width={s} height={s} fill={`url(#bpd${id})`} stroke="none" />
      </>
    );
  }
  return (
    <svg
      ref={ref}
      width={s}
      height={s}
      viewBox={`0 0 ${s} ${s}`}
      fill="none"
      stroke="currentColor"
      aria-hidden
      className={cx('pointer-events-none shrink-0 text-gray-200', className)}
      style={{ ...backgroundMaskStyle('radial-center'), ...style }}
      {...props}
    >
      {body}
    </svg>
  );
});
