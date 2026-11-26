import { forwardRef, type ReactElement } from 'react';
import { CartesianFrame, type CartesianChartProps } from './_cartesian';
import { BAR_COLORS, colorProps } from './utils';

export interface BarChartProps extends CartesianChartProps {
  /** Stack the series in one bar per category (Figma default) or draw them side by side. */
  layout?: 'stacked' | 'grouped';
  /** Max bar width in px (Figma 32 desktop / 16 mobile). */
  barWidth?: number;
  /** Top corner radius of each bar (Figma 4). */
  radius?: number;
}

/** Path for a rect with rounded top corners. */
function topRounded(x: number, y: number, w: number, h: number, r: number) {
  const rr = Math.max(0, Math.min(r, w / 2, h));
  return `M${x},${y + h}V${y + rr}Q${x},${y} ${x + rr},${y}H${x + w - rr}Q${x + w},${y} ${x + w},${y + rr}V${y + h}Z`;
}

/**
 * BarChart — Figma "Charts/Line and bar chart" (Chart style=Bar).
 * Stacked bars (series 1 at the bottom), gridlines, optional legend / axis labels, hover tooltip.
 */
export const BarChart = forwardRef<HTMLDivElement, BarChartProps>(function BarChart(
  { series, layout = 'stacked', barWidth, radius = 4, ...props },
  ref,
) {
  const n = Math.max(0, ...series.map((s) => s.data.length));
  const sums = Array.from({ length: n }, (_, j) => series.reduce((a, s) => a + Math.max(0, s.data[j] ?? 0), 0));
  const dataMax = layout === 'stacked' ? Math.max(0, ...sums) : Math.max(0, ...series.flatMap((s) => s.data));
  return (
    <CartesianFrame
      {...props}
      rootRef={ref}
      series={series}
      dataMax={dataMax}
      defaultColors={BAR_COLORS}
      guide="band"
      renderPlot={(g, colors) => {
        const maxW = barWidth ?? (g.width < 640 ? 16 : 32);
        const bars: ReactElement[] = [];
        for (let j = 0; j < n; j++) {
          const cx = g.x(j);
          if (layout === 'stacked') {
            const w = Math.min(maxW, g.slot * 0.7);
            let acc = 0;
            const lastIdx = series.reduce((li, s, i) => ((s.data[j] ?? 0) > 0 ? i : li), -1);
            series.forEach((s, i) => {
              const v = Math.max(0, s.data[j] ?? 0);
              if (!v) return;
              const y0 = g.y(acc);
              const y1 = g.y(acc + v);
              acc += v;
              const c = colorProps(colors[i]);
              bars.push(
                <path
                  key={`${j}-${i}`}
                  d={topRounded(cx - w / 2, y1, w, y0 - y1, i === lastIdx ? radius : 0)}
                  fill="currentColor"
                  className={c.className}
                  style={c.style}
                />,
              );
            });
          } else {
            const k = series.length;
            const w = Math.min(maxW, (g.slot * 0.8) / k);
            series.forEach((s, i) => {
              const v = Math.max(0, s.data[j] ?? 0);
              const y1 = g.y(v);
              const c = colorProps(colors[i]);
              bars.push(
                <path
                  key={`${j}-${i}`}
                  d={topRounded(cx - (k * w) / 2 + i * w, y1, w - 2, g.bottom - y1, radius)}
                  fill="currentColor"
                  className={c.className}
                  style={c.style}
                />,
              );
            });
          }
        }
        return <g>{bars}</g>;
      }}
    />
  );
});
