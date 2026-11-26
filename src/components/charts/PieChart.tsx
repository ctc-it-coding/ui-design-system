import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Legend } from './Legend';
import { PIE_COLORS, colorProps, defaultNumberFormat, polar, type ChartColor } from './utils';

export type PieChartSize = 'xxs' | 'xs' | 'sm' | 'md' | 'lg';
export type PieChartHole = 0 | 25 | 50 | 75;

export interface PieDatum {
  label: string;
  value: number;
  /** Tailwind `text-*` class or CSS colour; defaults to the Figma brand ramp. */
  color?: ChartColor;
}

export interface PieChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  data: PieDatum[];
  /** Figma: Size (xxs 120 · xs 160 · sm 200 · md 240 · lg 280 px) */
  size?: PieChartSize;
  /** Figma _Pie chart: Hole (False / 25% / 50% / 75%) — inner radius as % of the radius. */
  hole?: PieChartHole;
  /** Figma: Legend — vertical legend on the right. */
  legend?: boolean;
  /** Formats values in the slice tooltips. */
  formatValue?: (value: number) => string;
  'aria-label'?: string;
}

export const pieSizes: Record<PieChartSize, number> = { xxs: 120, xs: 160, sm: 200, md: 240, lg: 280 };

function slicePath(c: number, r: number, ri: number, a0: number, a1: number) {
  const full = a1 - a0 >= Math.PI * 2 - 1e-6;
  if (full) {
    // two half arcs so a single 100 % slice renders
    const o = `M${c},${c - r}A${r},${r} 0 1 1 ${c},${c + r}A${r},${r} 0 1 1 ${c},${c - r}Z`;
    return ri > 0 ? `${o}M${c},${c - ri}A${ri},${ri} 0 1 0 ${c},${c + ri}A${ri},${ri} 0 1 0 ${c},${c - ri}Z` : o;
  }
  const large = a1 - a0 > Math.PI ? 1 : 0;
  const [x0, y0] = polar(c, c, r, a0);
  const [x1, y1] = polar(c, c, r, a1);
  if (ri <= 0) return `M${c},${c}L${x0},${y0}A${r},${r} 0 ${large} 1 ${x1},${y1}Z`;
  const [x2, y2] = polar(c, c, ri, a1);
  const [x3, y3] = polar(c, c, ri, a0);
  return `M${x0},${y0}A${r},${r} 0 ${large} 1 ${x1},${y1}L${x2},${y2}A${ri},${ri} 0 ${large} 0 ${x3},${y3}Z`;
}

/** PieChart — Figma "Charts/Pie chart". Set `hole` for a donut. Slices start at 12 o'clock, clockwise. */
export const PieChart = forwardRef<HTMLDivElement, PieChartProps>(function PieChart(
  { data, size = 'md', hole = 0, legend = false, formatValue = defaultNumberFormat, className, 'aria-label': ariaLabel, ...props },
  ref,
) {
  const px = pieSizes[size];
  const c = px / 2;
  const total = data.reduce((a, d) => a + Math.max(0, d.value), 0) || 1;
  const colors = data.map((d, i) => d.color ?? PIE_COLORS[i % PIE_COLORS.length]);
  const ri = (c * hole) / 100;
  const description =
    ariaLabel ?? `Pie chart: ${data.map((d) => `${d.label} ${Math.round((d.value / total) * 100)}%`).join(', ')}`;
  let acc = 0;
  return (
    <div ref={ref} className={cx('inline-flex items-start gap-4', className)} {...props}>
      <svg role="img" aria-label={description} width={px} height={px} viewBox={`0 0 ${px} ${px}`} className="block shrink-0">
        <title>{description}</title>
        <circle cx={c} cy={c} r={(c + ri) / 2} fill="none" strokeWidth={c - ri} className="stroke-gray-200" />
        {data.map((d, i) => {
          const v = Math.max(0, d.value);
          const a0 = (acc / total) * Math.PI * 2;
          acc += v;
          const a1 = (acc / total) * Math.PI * 2;
          if (!v) return null;
          const cp = colorProps(colors[i]);
          return (
            <path
              key={i}
              d={slicePath(c, c, ri, a0, a1)}
              fill="currentColor"
              fillRule="evenodd"
              className={cx('transition-opacity hover:opacity-80', cp.className)}
              style={cp.style}
            >
              <title>{`${d.label}: ${formatValue(d.value)} (${Math.round((v / total) * 100)}%)`}</title>
            </path>
          );
        })}
      </svg>
      {legend && <Legend items={data.map((d, i) => ({ label: d.label, color: colors[i] }))} />}
    </div>
  );
});

/** DonutChart — PieChart with a 50 % hole by default (Figma Pie chart default instance). */
export const DonutChart = forwardRef<HTMLDivElement, PieChartProps>(function DonutChart({ hole = 50, ...props }, ref) {
  return <PieChart ref={ref} hole={hole} {...props} />;
});
