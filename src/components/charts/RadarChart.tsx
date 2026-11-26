import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Legend } from './Legend';
import { RADAR_COLORS, colorProps, defaultNumberFormat, niceMax, polar, type ChartColor } from './utils';

export interface RadarSeries {
  name: string;
  /** One value per axis. */
  data: number[];
  color?: ChartColor;
}

export interface RadarChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** Axis labels around the chart (Figma: Mon … Sun). */
  axes: string[];
  series: RadarSeries[];
  /** Figma: Legend (False / Right / Bottom) */
  legend?: 'none' | 'right' | 'bottom';
  /** Number of concentric rings (Figma 5). */
  rings?: number;
  /** Scale maximum; defaults to a nice value above the data. */
  max?: number;
  /** Shows the ring value badges along the top axis. */
  scaleLabels?: boolean;
  formatValue?: (v: number) => string;
  /** Rendered width in px (Figma 392 × 372); scales proportionally. */
  width?: number;
  'aria-label'?: string;
}

const W = 392;
const H = 372;
const R = 160;

/** RadarChart — Figma "Charts/Radar chart": circular grid, rays, filled series polygons (20 % fill, 2px stroke). */
export const RadarChart = forwardRef<HTMLDivElement, RadarChartProps>(function RadarChart(
  {
    axes,
    series,
    legend = 'none',
    rings = 5,
    max,
    scaleLabels = true,
    formatValue = defaultNumberFormat,
    width = W,
    className,
    'aria-label': ariaLabel,
    ...props
  },
  ref,
) {
  const n = Math.max(axes.length, 3);
  const top = max ?? niceMax(Math.max(0, ...series.flatMap((s) => s.data)), rings);
  const cx0 = W / 2;
  const cy0 = H / 2;
  const colors = series.map((s, i) => s.color ?? RADAR_COLORS[i % RADAR_COLORS.length]);
  const angle = (i: number) => (i / n) * Math.PI * 2;
  const description = ariaLabel ?? `Radar chart of ${series.map((s) => s.name).join(', ')} over ${axes.join(', ')}`;
  return (
    <div ref={ref} className={cx('inline-flex gap-4', legend === 'bottom' ? 'flex-col items-center' : 'items-start', className)} {...props}>
      <svg role="img" aria-label={description} width={width} height={(width * H) / W} viewBox={`0 0 ${W} ${H}`} className="block shrink-0">
        <title>{description}</title>
        {Array.from({ length: rings }, (_, i) => (
          <circle key={i} cx={cx0} cy={cy0} r={(R * (i + 1)) / rings} fill="none" className="stroke-gray-100" strokeWidth={1} />
        ))}
        {axes.map((_, i) => {
          const [x, y] = polar(cx0, cy0, R, angle(i));
          return <line key={i} x1={cx0} y1={cy0} x2={x} y2={y} className="stroke-gray-100" strokeWidth={1} />;
        })}
        {series.map((s, si) => {
          const pts = axes.map((_, i) => polar(cx0, cy0, (R * Math.max(0, Math.min(s.data[i] ?? 0, top))) / top, angle(i)));
          const cp = colorProps(colors[si]);
          return (
            <g key={si} className={cp.className} style={cp.style}>
              <polygon
                points={pts.map((p) => p.join(',')).join(' ')}
                fill="currentColor"
                fillOpacity={0.2}
                stroke="currentColor"
                strokeWidth={2}
                strokeLinejoin="round"
              >
                <title>{`${s.name}: ${s.data.map((v, i) => `${axes[i]} ${formatValue(v)}`).join(', ')}`}</title>
              </polygon>
            </g>
          );
        })}
        {axes.map((a, i) => {
          const [x, y] = polar(cx0, cy0, R + 20, angle(i));
          return (
            <text key={a + i} x={x} y={y} dy="0.32em" textAnchor="middle" className="fill-gray-600 text-sm font-medium">
              {a}
            </text>
          );
        })}
        {scaleLabels &&
          Array.from({ length: rings }, (_, i) => {
            const v = (top * (i + 1)) / rings;
            const label = formatValue(v);
            const w = 16 + label.length * 7;
            const y = cy0 - (R * (i + 1)) / rings;
            return (
              <g key={i}>
                <rect x={cx0 - w / 2} y={y - 11} width={w} height={22} rx={11} className="fill-gray-50 stroke-gray-200" strokeWidth={1} />
                <text x={cx0} y={y} dy="0.32em" textAnchor="middle" className="fill-gray-700 text-xs font-medium">
                  {label}
                </text>
              </g>
            );
          })}
      </svg>
      {legend !== 'none' && (
        <Legend
          orientation={legend === 'bottom' ? 'horizontal' : 'vertical'}
          items={series.map((s, i) => ({ label: s.name, color: colors[i] }))}
        />
      )}
    </div>
  );
});
