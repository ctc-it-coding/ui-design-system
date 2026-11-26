import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { linearPath, smoothPath, useUid } from '../charts/utils';

export type MiniChartType = 'wavy' | 'realistic' | 'straight' | 'layers';
export type MiniChartTrend = 'positive' | 'negative';

export interface MiniChartProps extends Omit<SVGAttributes<SVGSVGElement>, 'type'> {
  /** Figma _Chart mini: Type */
  type?: MiniChartType;
  /** Figma _Chart mini: Trend — positive = success, negative = error colours. */
  trend?: MiniChartTrend;
  /** Values to plot; defaults to a preset shape for the type/trend. For `layers` it is the upper layer. */
  data?: number[];
  /** Lower layer values for `type="layers"`. */
  data2?: number[];
  /** px (Figma 128 × 64; 96 × 48 on mobile). */
  width?: number;
  height?: number;
  /** Accessible label; without it the chart is decorative (aria-hidden). */
  label?: string;
}

const presets: Record<MiniChartType, number[]> = {
  wavy: [0.15, 0.35, 0.25, 0.5, 0.4, 0.62, 0.55, 0.85],
  realistic: [0.2, 0.32, 0.18, 0.4, 0.3, 0.52, 0.38, 0.58, 0.5, 0.72, 0.6, 0.85],
  straight: [0.15, 0.45, 0.3, 0.6, 0.5, 0.85],
  layers: [0.35, 0.55, 0.45, 0.7, 0.6, 0.9],
};
const layer2 = [0.15, 0.3, 0.22, 0.42, 0.35, 0.55];

const tone: Record<MiniChartTrend, { line: string; layer: string }> = {
  positive: { line: 'text-success-500', layer: 'text-success-600' },
  negative: { line: 'text-error-500', layer: 'text-error-600' },
};

/** MiniChart — Figma "Metrics/_Chart mini": sparkline with fading area and end marker. */
export const MiniChart = forwardRef<SVGSVGElement, MiniChartProps>(function MiniChart(
  { type = 'wavy', trend = 'positive', data, data2, width = 128, height = 64, label, className, ...props },
  ref,
) {
  const id = useUid('tc-mini');
  const flip = (arr: number[]) => (trend === 'negative' && !data ? arr.map((v, i) => arr[arr.length - 1 - i]) : arr);
  const values = flip(data ?? presets[type]);
  const pad = type === 'layers' ? 0 : 11;
  const all = type === 'layers' ? [...values, ...(data2 ?? layer2)] : values;
  const min = data ? Math.min(...all) : 0;
  const max = data ? Math.max(...all) : 1;
  const span = max - min || 1;
  const toPts = (vals: number[]) =>
    vals.map((v, i) => [
      type === 'layers' ? (i / (vals.length - 1)) * width : pad + (i / (vals.length - 1)) * (width - pad * 2),
      pad + (1 - (v - min) / span) * (height - pad * 2),
    ] as [number, number]);
  const pts = toPts(values);
  const t = tone[trend];
  const area = (d: string, p: [number, number][]) => `${d}L${p[p.length - 1][0]},${height}L${p[0][0]},${height}Z`;
  const a11y = label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true };

  if (type === 'layers') {
    const p2 = toPts(flip(data2 ?? layer2));
    return (
      <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={cx('block shrink-0', t.layer, className)} {...a11y} {...props}>
        {label && <title>{label}</title>}
        <defs>
          <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="currentColor" stopOpacity={0.2} />
            <stop offset="1" stopColor="currentColor" stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={area(smoothPath(pts), pts)} fill={`url(#${id})`} />
        <path d={area(smoothPath(p2), p2)} fill="currentColor" fillOpacity={0.2} />
      </svg>
    );
  }

  const d = type === 'wavy' ? smoothPath(pts) : linearPath(pts);
  const markers = type === 'straight' ? [pts[Math.floor(pts.length / 2)], pts[pts.length - 1]] : [pts[pts.length - 1]];
  return (
    <svg ref={ref} width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={cx('block shrink-0 overflow-visible', t.line, className)} {...a11y} {...props}>
      {label && <title>{label}</title>}
      <defs>
        <linearGradient id={id} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity={0.2} />
          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={area(d, pts)} fill={`url(#${id})`} />
      <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {markers.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={10} fill="none" stroke="currentColor" strokeOpacity={0.2} strokeWidth={2} />
          <circle cx={x} cy={y} r={5} className="fill-white" stroke="currentColor" strokeWidth={2} />
        </g>
      ))}
    </svg>
  );
});
