import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowDown, ArrowUp, TrendDown01, TrendUp01 } from '../../icons';

export type MetricTrend = 'positive' | 'negative';

export interface MetricChangeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma _Change: Type — "01" arrow-up/down, "02" trend-up/down icon. */
  type?: '01' | '02';
  /** Figma _Change: Trend */
  trend?: MetricTrend;
  /** The change value, e.g. "12%". */
  children?: ReactNode;
}

/** MetricChange — Figma "Metrics/_Change": coloured trend icon + percentage. */
export const MetricChange = forwardRef<HTMLSpanElement, MetricChangeProps>(function MetricChange(
  { type = '01', trend = 'positive', className, children, ...props },
  ref,
) {
  const up = trend === 'positive';
  const Icon = type === '01' ? (up ? ArrowUp : ArrowDown) : up ? TrendUp01 : TrendDown01;
  return (
    <span
      ref={ref}
      className={cx(
        'inline-flex shrink-0 items-center text-sm font-medium',
        type === '01' ? 'gap-0.5' : 'gap-1',
        up ? 'text-success-700' : 'text-error-700',
        className,
      )}
      {...props}
    >
      <Icon className={cx('size-5 shrink-0', up ? 'text-success-500' : 'text-error-500')} aria-hidden />
      <span className="sr-only">{up ? 'Increased by' : 'Decreased by'} </span>
      {children}
    </span>
  );
});
