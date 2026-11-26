import { forwardRef } from 'react';
import { CartesianFrame, type CartesianChartProps } from './_cartesian';
import { LINE_COLORS, colorProps, linearPath, smoothPath, useUid } from './utils';

export interface LineChartProps extends CartesianChartProps {
  /** Curve style: smooth (Figma "Line gradual/wavy") or straight segments ("Line volatile"). */
  curve?: 'smooth' | 'linear';
  /** Gradient area under the first series (Figma Series 1 background, 10 % fading). */
  area?: boolean;
}

/**
 * LineChart — Figma "Charts/Line and bar chart" (Chart style=Line).
 * Responsive SVG (re-renders at the container width), gridlines, optional legend / axis labels, hover tooltip.
 */
export const LineChart = forwardRef<HTMLDivElement, LineChartProps>(function LineChart(
  { series, curve = 'smooth', area = true, ...props },
  ref,
) {
  const id = useUid('tc-line');
  const dataMax = Math.max(0, ...series.flatMap((s) => s.data));
  return (
    <CartesianFrame
      {...props}
      rootRef={ref}
      series={series}
      dataMax={dataMax}
      defaultColors={LINE_COLORS}
      guide="line"
      renderPlot={(g, colors) => {
        const make = curve === 'smooth' ? smoothPath : linearPath;
        return (
          <g>
            {[...series].reverse().map((s, ri) => {
              const i = series.length - 1 - ri;
              const pts = s.data.map((v, j) => [g.x(j), g.y(v)] as [number, number]);
              const d = make(pts);
              const c = colorProps(colors[i]);
              const showArea = area && i === 0 && pts.length > 1;
              return (
                <g key={i} className={c.className} style={c.style}>
                  {showArea && (
                    <>
                      <defs>
                        <linearGradient id={`${id}-a`} x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0" stopColor="currentColor" stopOpacity={0.1} />
                          <stop offset="1" stopColor="currentColor" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <path
                        d={`${d}L${pts[pts.length - 1][0]},${g.bottom}L${pts[0][0]},${g.bottom}Z`}
                        fill={`url(#${id}-a)`}
                      />
                    </>
                  )}
                  <path d={d} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  {g.hover != null && s.data[g.hover] != null && (
                    <circle cx={g.x(g.hover)} cy={g.y(s.data[g.hover])} r={4} className="fill-white" stroke="currentColor" strokeWidth={2} />
                  )}
                </g>
              );
            })}
          </g>
        );
      }}
    />
  );
});
