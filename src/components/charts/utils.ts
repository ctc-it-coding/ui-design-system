import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react';

/**
 * A chart colour: either a Tailwind text-colour class written literally (e.g. `"text-brand-600"`, so Tailwind
 * can see it) or any CSS colour (`"#7f56d9"`, `"var(--color-brand-600)"`). Marks are drawn with `currentColor`.
 */
export type ChartColor = string;

export function colorProps(color: ChartColor | undefined): { className?: string; style?: CSSProperties } {
  if (!color) return {};
  if (/^text-/.test(color)) return { className: color };
  return { style: { color } };
}

/** Figma "Line and bar chart" line series colours (Series 1–3), then extra legend colours. */
export const LINE_COLORS: ChartColor[] = [
  'text-brand-600',
  'text-brand-400',
  'text-brand-700',
  'text-success-500',
  'text-indigo-500',
  'text-pink-500',
  'text-blue-500',
];
/** Figma bar chart stack colours, bottom → top. */
export const BAR_COLORS: ChartColor[] = ['text-brand-700', 'text-brand-500', 'text-gray-200', 'text-success-500', 'text-indigo-500', 'text-pink-500'];
/** Figma "Pie chart" series colours. */
export const PIE_COLORS: ChartColor[] = ['text-brand-600', 'text-brand-500', 'text-brand-400', 'text-brand-300', 'text-brand-200', 'text-gray-200'];
/** Figma "Activity gauge" ring colours, outer → inner. */
export const GAUGE_COLORS: ChartColor[] = ['text-brand-700', 'text-brand-600', 'text-brand-400', 'text-brand-300', 'text-brand-200'];
/** Figma "Radar chart" series colours. */
export const RADAR_COLORS: ChartColor[] = ['text-brand-600', 'text-pink-500', 'text-blue-light-500', 'text-success-500', 'text-indigo-500'];

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Tracks an element's content box size (ResizeObserver). */
export function useElementSize<T extends HTMLElement>(fallbackW = 600, fallbackH = 200): [RefObject<T | null>, { width: number; height: number }] {
  const ref = useRef<T | null>(null);
  const [size, setSize] = useState({ width: fallbackW, height: fallbackH });
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () =>
      setSize((s) => (s.width === el.clientWidth && s.height === el.clientHeight ? s : { width: el.clientWidth, height: el.clientHeight }));
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
}

/** Tracks an element's content width (ResizeObserver). */
export function useElementWidth<T extends HTMLElement>(fallback = 600): [RefObject<T | null>, number] {
  const ref = useRef<T | null>(null);
  const [w, setW] = useState(fallback);
  useIsoLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setW(Math.max(0, el.clientWidth));
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

/** Rounds a max value up to a "nice" axis maximum. */
export function niceMax(max: number, ticks: number): number {
  if (max <= 0) return ticks;
  const raw = max / ticks;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const steps = [1, 2, 2.5, 5, 10];
  const step = (steps.find((s) => s * mag >= raw) ?? 10) * mag;
  return step * ticks;
}

export const defaultNumberFormat = (n: number) => n.toLocaleString('en-US', { maximumFractionDigits: 1 });

type Pt = [number, number];

/** Monotone-X cubic path through points (Fritsch–Carlson), like d3.curveMonotoneX. */
export function smoothPath(pts: Pt[]): string {
  const n = pts.length;
  if (n === 0) return '';
  if (n === 1) return `M${pts[0][0]},${pts[0][1]}`;
  if (n === 2) return `M${pts[0][0]},${pts[0][1]}L${pts[1][0]},${pts[1][1]}`;
  const dx: number[] = [];
  const m: number[] = [];
  for (let i = 0; i < n - 1; i++) {
    dx.push(pts[i + 1][0] - pts[i][0]);
    m.push((pts[i + 1][1] - pts[i][1]) / (dx[i] || 1));
  }
  const t: number[] = [m[0]];
  for (let i = 1; i < n - 1; i++) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  t.push(m[n - 2]);
  for (let i = 0; i < n - 1; i++) {
    if (m[i] === 0) {
      t[i] = 0;
      t[i + 1] = 0;
      continue;
    }
    const a = t[i] / m[i];
    const b = t[i + 1] / m[i];
    const s = a * a + b * b;
    if (s > 9) {
      const k = 3 / Math.sqrt(s);
      t[i] = k * a * m[i];
      t[i + 1] = k * b * m[i];
    }
  }
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 0; i < n - 1; i++) {
    const h = dx[i] / 3;
    d += `C${pts[i][0] + h},${pts[i][1] + t[i] * h} ${pts[i + 1][0] - h},${pts[i + 1][1] - t[i + 1] * h} ${pts[i + 1][0]},${pts[i + 1][1]}`;
  }
  return d;
}

export function linearPath(pts: Pt[]): string {
  return pts.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join('');
}

let uid = 0;
/** Stable unique id for SVG defs (works without React 18 useId in older consumers). */
export function useUid(prefix: string): string {
  const [id] = useState(() => `${prefix}-${++uid}`);
  return id;
}

/** Polar → cartesian, angle 0 = 12 o'clock, clockwise. */
export function polar(cx: number, cy: number, r: number, angle: number): Pt {
  return [cx + r * Math.sin(angle), cy - r * Math.cos(angle)];
}
