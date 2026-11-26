import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { TooltipBubble } from '../tooltips/Tooltip';

export type SliderValue = number | [number, number];
export type SliderLabel = 'bottom' | 'top-floating';

export interface SliderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled value — a number (single) or `[from, to]` (range, Figma Left/Right control). */
  value?: SliderValue;
  /** Uncontrolled initial value. */
  defaultValue?: SliderValue;
  onChange?: (value: SliderValue) => void;
  /** Called when the user finishes dragging. */
  onChangeEnd?: (value: SliderValue) => void;
  min?: number;
  max?: number;
  step?: number;
  /** Figma: Label (Bottom / Top floating). Omit for no label. */
  label?: SliderLabel;
  /** Formats the label; defaults to `${value}%`. */
  formatLabel?: (value: number) => ReactNode;
  disabled?: boolean;
  /** Accessible names of the thumbs (range: [from, to]). */
  thumbLabels?: string | [string, string];
}

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));

/** Slider — Figma "Sliders/Slider": single or range, with bottom or floating labels. Keyboard accessible. */
export const Slider = forwardRef<HTMLDivElement, SliderProps>(function Slider(
  {
    value: valueProp,
    defaultValue = 0,
    onChange,
    onChangeEnd,
    min = 0,
    max = 100,
    step = 1,
    label,
    formatLabel,
    disabled,
    thumbLabels,
    className,
    ...props
  },
  ref,
) {
  const [inner, setInner] = useState<SliderValue>(defaultValue);
  const value = valueProp ?? inner;
  const isRange = Array.isArray(value);
  const vals: number[] = isRange ? [value[0], value[1]] : [value as number];
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef<number | null>(null);
  const latest = useRef<SliderValue>(value);
  latest.current = value;
  const [active, setActive] = useState<number | null>(null);

  const pct = (v: number) => ((clamp(v, min, max) - min) / (max - min || 1)) * 100;
  const snap = (v: number) => {
    const s = Math.round((v - min) / step) * step + min;
    return clamp(Number(s.toFixed(10)), min, max);
  };
  const fmt = (v: number) => (formatLabel ? formatLabel(v) : `${Math.round(pct(v))}%`);

  const commit = useCallback(
    (idx: number, raw: number) => {
      const cur = latest.current;
      let next: SliderValue;
      if (Array.isArray(cur)) {
        const arr: [number, number] = [cur[0], cur[1]];
        arr[idx] = idx === 0 ? Math.min(raw, arr[1]) : Math.max(raw, arr[0]);
        if (arr[0] === cur[0] && arr[1] === cur[1]) return;
        next = arr;
      } else {
        if (raw === cur) return;
        next = raw;
      }
      latest.current = next;
      if (valueProp === undefined) setInner(next);
      onChange?.(next);
    },
    [onChange, valueProp],
  );

  const valueFromPointer = (clientX: number) => {
    const rect = trackRef.current!.getBoundingClientRect();
    const ratio = clamp((clientX - rect.left) / (rect.width || 1), 0, 1);
    return snap(min + ratio * (max - min));
  };

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled || e.button !== 0) return;
    const v = valueFromPointer(e.clientX);
    let idx = 0;
    if (isRange) {
      const d0 = Math.abs(v - vals[0]);
      const d1 = Math.abs(v - vals[1]);
      idx = d0 < d1 ? 0 : d0 > d1 ? 1 : v < vals[0] ? 0 : 1;
    }
    dragging.current = idx;
    setActive(idx);
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    commit(idx, v);
    const thumb = trackRef.current?.querySelectorAll<HTMLElement>('[role="slider"]')[idx];
    thumb?.focus({ preventScroll: true });
    e.preventDefault();
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (dragging.current == null) return;
    commit(dragging.current, valueFromPointer(e.clientX));
  };
  const onPointerUp = () => {
    if (dragging.current == null) return;
    dragging.current = null;
    setActive(null);
    onChangeEnd?.(latest.current);
  };

  const onKeyDown = (idx: number) => (e: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const big = Math.max(step, (max - min) / 10);
    const cur = vals[idx];
    let next: number | null = null;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        next = cur + step;
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        next = cur - step;
        break;
      case 'PageUp':
        next = cur + big;
        break;
      case 'PageDown':
        next = cur - big;
        break;
      case 'Home':
        next = min;
        break;
      case 'End':
        next = max;
        break;
    }
    if (next == null) return;
    e.preventDefault();
    commit(idx, snap(next));
    onChangeEnd?.(latest.current);
  };

  const lo = isRange ? pct(vals[0]) : 0;
  const hi = pct(isRange ? vals[1] : vals[0]);
  const names = Array.isArray(thumbLabels) ? thumbLabels : [thumbLabels ?? (isRange ? 'Minimum' : 'Value'), 'Maximum'];

  return (
    <div
      ref={ref}
      className={cx('relative w-full select-none', label === 'bottom' && 'pb-8', disabled && 'opacity-50', className)}
      aria-disabled={disabled || undefined}
      {...props}
    >
      <div
        ref={trackRef}
        className={cx('relative flex h-6 touch-none items-center', disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="h-2 w-full rounded-full bg-gray-200" />
        <div className="absolute h-2 rounded-full bg-brand-600" style={{ left: `${lo}%`, width: `${hi - lo}%` }} />
        {vals.map((v, i) => (
          <div
            key={i}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-label={names[i]}
            aria-valuemin={isRange && i === 1 ? vals[0] : min}
            aria-valuemax={isRange && i === 0 ? vals[1] : max}
            aria-valuenow={v}
            aria-valuetext={typeof fmt(v) === 'string' ? (fmt(v) as string) : String(v)}
            aria-orientation="horizontal"
            aria-disabled={disabled || undefined}
            onKeyDown={onKeyDown(i)}
            className={cx(
              'group/thumb absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-md ring-2 ring-brand-600 ring-inset outline-none',
              'transition-shadow duration-100 focus-visible:shadow-sm focus-visible:outline-4 focus-visible:outline-solid focus-visible:outline-brand-500/24',
              active === i ? 'z-20 cursor-grabbing' : 'z-10 cursor-grab',
            )}
            style={{ left: `${pct(v)}%` }}
          >
            {label === 'bottom' && (
              <span className="pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 whitespace-nowrap text-md font-medium text-gray-900">
                {fmt(v)}
              </span>
            )}
            {label === 'top-floating' && (
              <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2">
                <TooltipBubble theme="light" title={fmt(v)} className="whitespace-nowrap" />
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});
