import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Legend } from './Legend';
import { GAUGE_COLORS, colorProps, type ChartColor } from './utils';

export type ActivityGaugeSize = 'xs' | 'sm' | 'md' | 'lg';

export interface GaugeRing {
  label: string;
  /** 0 – max (default max 100). */
  value: number;
  max?: number;
  color?: ChartColor;
}

export interface ActivityGaugeProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Rings from outer to inner (Figma shows 3). */
  data: GaugeRing[];
  /** Figma: Size (xs 160 · sm 200 · md 240 · lg 280 px) */
  size?: ActivityGaugeSize;
  /** Figma: Legend (False / Bottom / Right) */
  legend?: 'none' | 'bottom' | 'right';
  /** Figma: Label — small caption above the value, e.g. "Active users". */
  label?: ReactNode;
  /** Big centre value, e.g. "1,000". */
  value?: ReactNode;
  'aria-label'?: string;
}

// box, stroke width, distance between ring centre-lines (from the Figma ring diameters)
const geo: Record<ActivityGaugeSize, { box: number; stroke: number; step: number }> = {
  xs: { box: 160, stroke: 8, step: 12 },
  sm: { box: 200, stroke: 12, step: 16.5 },
  md: { box: 240, stroke: 16, step: 20 },
  lg: { box: 280, stroke: 18, step: 24 },
};
const labelText: Record<ActivityGaugeSize, string> = { xs: 'text-xs', sm: 'text-xs', md: 'text-sm', lg: 'text-sm' };
const valueText: Record<ActivityGaugeSize, [string, string]> = {
  // [with label, without label]
  xs: ['text-xl', 'text-lg'],
  sm: ['text-display-xs', 'text-xl'],
  md: ['text-display-sm', 'text-display-sm'],
  lg: ['text-display-sm', 'text-display-sm'],
};

/** ActivityGauge — Figma "Charts/Activity gauge": concentric progress rings on gray-100 tracks. */
export const ActivityGauge = forwardRef<HTMLDivElement, ActivityGaugeProps>(function ActivityGauge(
  { data, size = 'md', legend = 'none', label, value, className, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const { box, stroke, step } = geo[size];
  const c = box / 2;
  const colors = data.map((d, i) => d.color ?? GAUGE_COLORS[i % GAUGE_COLORS.length]);
  const description =
    ariaLabel ?? `Activity gauge: ${data.map((d) => `${d.label} ${Math.round((d.value / (d.max ?? 100)) * 100)}%`).join(', ')}`;
  return (
    <div
      ref={ref}
      className={cx('inline-flex gap-4', legend === 'bottom' ? 'flex-col items-center' : 'items-start', className)}
      {...props}
    >
      <div className="relative shrink-0" style={{ width: box, height: box }}>
        <svg role="img" aria-label={description} width={box} height={box} viewBox={`0 0 ${box} ${box}`} className="block -rotate-90">
          <title>{description}</title>
          {data.map((d, i) => {
            const r = (box - stroke) / 2 - i * step;
            if (r <= stroke / 2) return null;
            const len = 2 * Math.PI * r;
            const pct = Math.max(0, Math.min(1, d.value / (d.max ?? 100)));
            const cp = colorProps(colors[i]);
            return (
              <g key={i}>
                <circle cx={c} cy={c} r={r} fill="none" strokeWidth={stroke} className="stroke-gray-100" />
                <circle
                  cx={c}
                  cy={c}
                  r={r}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={stroke}
                  strokeLinecap="round"
                  strokeDasharray={`${len * pct} ${len}`}
                  className={cp.className}
                  style={cp.style}
                />
              </g>
            );
          })}
        </svg>
        {(label != null || value != null) && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-center">
            {label != null && <span className={cx('font-medium text-gray-600', labelText[size])}>{label}</span>}
            {value != null && (
              <span className={cx('font-medium text-gray-900', valueText[size][label != null ? 0 : 1])}>{value}</span>
            )}
          </div>
        )}
      </div>
      {legend !== 'none' && (
        <Legend
          orientation={legend === 'bottom' ? 'horizontal' : 'vertical'}
          items={data.map((d, i) => ({ label: d.label, color: colors[i] }))}
          className={legend === 'bottom' ? 'justify-center' : undefined}
        />
      )}
    </div>
  );
});
