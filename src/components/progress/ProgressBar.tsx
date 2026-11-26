import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TooltipBubble } from '../tooltips/Tooltip';

export type ProgressBarLabel = 'right' | 'bottom' | 'top-floating' | 'bottom-floating';

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Progress — 0…100 (or 0…max). */
  value: number;
  /** Maximum value (default 100). */
  max?: number;
  /** Figma: Label (omit for Label=False). */
  label?: ProgressBarLabel;
  /** Custom label formatter; defaults to a rounded percentage. */
  formatLabel?: (percent: number) => ReactNode;
}

/** ProgressBar — Figma "Progress indicators/Progress bar": 8px track with brand fill and optional percentage. */
export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar(
  { value, max = 100, label, formatLabel, className, ...props },
  ref,
) {
  const pct = Math.min(100, Math.max(0, max > 0 ? (value / max) * 100 : 0));
  const text = formatLabel ? formatLabel(pct) : `${Math.round(pct)}%`;
  const floating = label === 'top-floating' || label === 'bottom-floating';

  const bar = (
    <div
      role="progressbar"
      aria-valuenow={Math.round(value)}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cx('relative h-2 w-full min-w-0 rounded-lg bg-gray-200', label === 'right' && 'flex-1')}
    >
      <div className="h-full rounded-lg bg-brand-600 transition-[width] duration-300" style={{ width: `${pct}%` }} />
      {floating && (
        <div
          className={cx('absolute -translate-x-1/2', label === 'top-floating' ? 'bottom-full mb-2' : 'top-full mt-2')}
          style={{ left: `${pct}%` }}
        >
          <TooltipBubble theme="light" title={text} className="whitespace-nowrap" />
        </div>
      )}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cx(
        'flex w-full',
        label === 'right' && 'items-center gap-3',
        label === 'bottom' && 'flex-col items-end gap-2',
        className,
      )}
      {...props}
    >
      {bar}
      {(label === 'right' || label === 'bottom') && <span className="shrink-0 text-sm font-medium text-gray-700 tabular-nums">{text}</span>}
    </div>
  );
});
