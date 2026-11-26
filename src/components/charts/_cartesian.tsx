import { useState, type HTMLAttributes, type PointerEvent, type ReactNode, type Ref } from 'react';
import { cx } from '../../utils/cx';
import { Legend } from './Legend';
import { colorProps, defaultNumberFormat, niceMax, useElementSize, type ChartColor } from './utils';

export interface ChartSeries {
  /** Series name (legend + tooltip). */
  name: string;
  /** One value per x label. */
  data: number[];
  /** Tailwind `text-*` class or CSS colour. Defaults to the Figma series palette. */
  color?: ChartColor;
}

export type ChartLegendPosition = 'none' | 'right' | 'top';

export interface CartesianChartProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /** X-axis category labels (e.g. months). */
  labels: string[];
  series: ChartSeries[];
  /** Figma: Legend (False / Right / Top) */
  legend?: ChartLegendPosition;
  /** Figma: Axis labels — shows y-axis numbers and the axis titles. */
  axisLabels?: boolean;
  /** Title under the x-axis (shown when `axisLabels`). */
  xAxisLabel?: ReactNode;
  /** Rotated title left of the y-axis (shown when `axisLabels`). */
  yAxisLabel?: ReactNode;
  /** Number of horizontal gridlines (Figma shows 6). */
  gridLines?: number;
  /** Fixed y-axis maximum; otherwise a "nice" value above the data maximum. */
  yMax?: number;
  /** Formats y-axis + tooltip numbers. */
  formatValue?: (value: number) => string;
  /** Total chart height in px (Figma 240). */
  height?: number;
  /** Shows a hover tooltip with the values at the pointer. */
  tooltip?: boolean;
  /** Accessible chart description (role="img"). */
  'aria-label'?: string;
}

export interface PlotGeometry {
  width: number;
  height: number;
  /** x centre of category i */
  x: (i: number) => number;
  /** slot width per category */
  slot: number;
  y: (v: number) => number;
  top: number;
  bottom: number;
  left: number;
  right: number;
  hover: number | null;
}

interface FrameProps extends CartesianChartProps {
  defaultColors: ChartColor[];
  /** max data value used for the scale (line: max of values, bar: max of stacked sums) */
  dataMax: number;
  renderPlot: (g: PlotGeometry, colors: ChartColor[]) => ReactNode;
  /** draw hover guide for line charts */
  guide?: 'line' | 'band';
  rootRef?: Ref<HTMLDivElement>;
}

const Y_LABEL_W = 40;

/** Shared frame of the Figma "Line and bar chart": legend, gridlines (_Y-axis), x-axis labels and axis titles. */
export function CartesianFrame({
  labels,
  series,
  legend = 'none',
  axisLabels = false,
  xAxisLabel,
  yAxisLabel,
  gridLines = 6,
  yMax,
  formatValue = defaultNumberFormat,
  height = 240,
  tooltip = true,
  defaultColors,
  dataMax,
  renderPlot,
  guide = 'line',
  rootRef,
  className,
  'aria-label': ariaLabel,
  ...props
}: FrameProps) {
  const [ref, size] = useElementSize<HTMLDivElement>(600, 180);
  const [hover, setHover] = useState<number | null>(null);
  const colors = series.map((s, i) => s.color ?? defaultColors[i % defaultColors.length]);
  const max = yMax ?? niceMax(dataMax, gridLines - 1);
  const n = Math.max(labels.length, 1);
  const width = size.width;
  const plotH = Math.max(40, size.height);
  const mobile = width < 640;
  const left = axisLabels ? Y_LABEL_W + 8 : 0;
  const padX = mobile ? 8 : 24;
  const innerL = left + padX;
  const innerR = width - padX;
  const slot = (innerR - innerL) / n;
  const top = 11;
  const xRow = 18;
  const bottom = plotH - xRow - 11;
  const g: PlotGeometry = {
    width,
    height: plotH,
    x: (i) => innerL + slot * (i + 0.5),
    slot,
    y: (v) => bottom - (Math.max(0, Math.min(v, max)) / max) * (bottom - top),
    top,
    bottom,
    left,
    right: width,
    hover,
  };
  const ticks = Array.from({ length: gridLines }, (_, i) => (max * (gridLines - 1 - i)) / (gridLines - 1));
  // mobile shows every other label (Figma Breakpoint=Mobile)
  const showLabel = (i: number) => !mobile || n <= 7 || i % 2 === 0;

  const legendItems = series.map((s, i) => ({ label: s.name, color: colors[i] }));
  const description =
    ariaLabel ?? `Chart of ${series.map((s) => s.name).join(', ')} across ${labels.length} categories`;

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    if (!tooltip) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const i = Math.floor((px - innerL) / slot);
    setHover(i >= 0 && i < n ? i : null);
  };

  const tipLeft = hover != null ? g.x(hover) : 0;
  const tipRight = hover != null && tipLeft > width - 180;

  return (
    <div
      ref={rootRef}
      className={cx('flex w-full', legend === 'right' ? 'gap-4' : 'gap-1', className)}
      style={{ height }}
      {...props}
    >
      {axisLabels && yAxisLabel != null && (
        <div className="flex w-[18px] shrink-0 items-center justify-center pb-6">
          <span className="-rotate-90 whitespace-nowrap text-xs font-medium text-gray-600">{yAxisLabel}</span>
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col">
        {legend === 'top' && <Legend orientation="horizontal" items={legendItems} className="self-end" />}
        <div ref={ref} className="relative min-h-0 flex-1">
          <svg
            role="img"
            aria-label={description}
            width={width}
            height={plotH}
            viewBox={`0 0 ${width} ${plotH}`}
            className="absolute inset-0 block overflow-visible"
            onPointerMove={onMove}
            onPointerLeave={() => setHover(null)}
          >
            <title>{description}</title>
            {/* gridlines + y labels */}
            {ticks.map((t, i) => {
              const y = top + ((bottom - top) * i) / (gridLines - 1);
              return (
                <g key={i}>
                  {axisLabels && (
                    <text x={Y_LABEL_W} y={y} dy="0.32em" textAnchor="end" className="fill-gray-600 text-xs">
                      {formatValue(t)}
                    </text>
                  )}
                  <line x1={left} x2={width} y1={y} y2={y} className="stroke-gray-100" strokeWidth={1} />
                </g>
              );
            })}
            {hover != null && guide === 'band' && (
              <rect x={g.x(hover) - slot / 2} y={top} width={slot} height={bottom - top} className="fill-gray-50" />
            )}
            {renderPlot(g, colors)}
            {hover != null && guide === 'line' && (
              <line x1={g.x(hover)} x2={g.x(hover)} y1={top} y2={bottom} className="stroke-gray-200" strokeWidth={1} strokeDasharray="4 4" />
            )}
            {/* x labels */}
            {labels.map((l, i) =>
              showLabel(i) ? (
                <text key={i} x={g.x(i)} y={plotH - xRow / 2} dy="0.32em" textAnchor="middle" className="fill-gray-600 text-xs">
                  {l}
                </text>
              ) : null,
            )}
          </svg>
          {tooltip && hover != null && (
            <div
              role="presentation"
              className="pointer-events-none absolute z-10 min-w-32 rounded-lg bg-white px-3 py-2 shadow-lg ring-1 ring-gray-200"
              style={{ left: tipLeft, top: top, transform: tipRight ? 'translateX(calc(-100% - 12px))' : 'translateX(12px)' }}
            >
              <div className="mb-1 text-xs font-semibold text-gray-900">{labels[hover]}</div>
              {series.map((s, i) => {
                const c = colorProps(colors[i]);
                return (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-600">
                    <span className={cx('size-2 shrink-0 rounded-full bg-current', c.className)} style={c.style} />
                    <span className="flex-1 whitespace-nowrap">{s.name}</span>
                    <span className="font-medium text-gray-900">{formatValue(s.data[hover] ?? 0)}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {axisLabels && xAxisLabel != null && (
          <div className="flex justify-center py-2 text-xs font-medium text-gray-600" style={{ paddingLeft: left }}>
            {xAxisLabel}
          </div>
        )}
      </div>
      {legend === 'right' && <Legend orientation="vertical" items={legendItems} className="shrink-0" />}
    </div>
  );
}
