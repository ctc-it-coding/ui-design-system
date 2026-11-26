import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type ProgressCircleSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type ProgressCircleShape = 'circle' | 'half';

export interface ProgressCircleProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Progress — 0…100 (or 0…max). */
  value: number;
  max?: number;
  /** Figma: Size */
  size?: ProgressCircleSize;
  /** Figma: Shape (Circle / Half circle) */
  shape?: ProgressCircleShape;
  /** Figma: Label=True — small caption above the number, e.g. "Active users". */
  label?: ReactNode;
  /** Custom number formatter; defaults to a rounded percentage. */
  formatValue?: (percent: number) => ReactNode;
}

const dims: Record<ProgressCircleSize, { box: number; stroke: number; number: string; label: string }> = {
  xxs: { box: 64, stroke: 6, number: 'text-sm', label: 'text-[10px] leading-[14px]' },
  xs: { box: 160, stroke: 16, number: 'text-display-xs', label: 'text-xs' },
  sm: { box: 200, stroke: 20, number: 'text-display-sm', label: 'text-xs' },
  md: { box: 240, stroke: 24, number: 'text-display-md', label: 'text-sm' },
  lg: { box: 280, stroke: 28, number: 'text-display-lg', label: 'text-sm' },
};

/** ProgressCircle — Figma "Progress indicators/Progress circle" (full ring or half gauge). */
export const ProgressCircle = forwardRef<HTMLDivElement, ProgressCircleProps>(function ProgressCircle(
  { value, max = 100, size = 'md', shape = 'circle', label, formatValue, className, style, ...props },
  ref,
) {
  const pct = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));
  const d = dims[size];
  const ringD = d.box * 0.9; // ring centre-line diameter (Figma "Ring" frame)
  const r = ringD / 2;
  const c = d.box / 2;
  const half = shape === 'half';
  const height = half ? Math.round(d.box * 0.55) : d.box;
  const full = 2 * Math.PI * r;
  const len = half ? full / 2 : full;
  const dash = (pct / 100) * len;

  const halfPath = `M ${c - r} ${c} A ${r} ${r} 0 0 1 ${c + r} ${c}`;

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cx('relative inline-flex shrink-0 justify-center', half ? 'items-end' : 'items-center', className)}
      style={{ width: d.box, height, ...style }}
      {...props}
    >
      <svg className="absolute top-0 left-0" width={d.box} height={height} viewBox={`0 0 ${d.box} ${height}`} fill="none" aria-hidden>
        {half ? (
          <>
            <path d={halfPath} className="stroke-gray-200" strokeWidth={d.stroke} strokeLinecap="round" />
            {pct > 0 && (
              <path d={halfPath} className="stroke-brand-600" strokeWidth={d.stroke} strokeLinecap="round" strokeDasharray={`${dash} ${len}`} />
            )}
          </>
        ) : (
          <>
            <circle cx={c} cy={c} r={r} className="stroke-gray-200" strokeWidth={d.stroke} />
            {pct > 0 && (
              <circle
                cx={c}
                cy={c}
                r={r}
                className="stroke-brand-600"
                strokeWidth={d.stroke}
                strokeLinecap="round"
                strokeDasharray={`${dash} ${full}`}
                transform={`rotate(-90 ${c} ${c})`}
              />
            )}
          </>
        )}
      </svg>
      <div className={cx('relative flex flex-col items-center text-center', half && 'pb-0')}>
        {label != null && size !== 'xxs' && <span className={cx('font-medium text-gray-600', d.label)}>{label}</span>}
        <span className={cx('font-medium text-gray-900 tabular-nums', d.number)}>{formatValue ? formatValue(pct) : `${Math.round(pct)}%`}</span>
      </div>
    </div>
  );
});
