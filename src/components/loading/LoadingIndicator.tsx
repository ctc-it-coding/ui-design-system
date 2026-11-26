import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export type LoadingIndicatorStyle = 'line-simple' | 'line-spinner' | 'dot-circle';
export type LoadingIndicatorSize = 'sm' | 'md' | 'lg' | 'xl';

export interface LoadingIndicatorProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Style (Line simple / Line spinner / Dot circle) */
  variant?: LoadingIndicatorStyle;
  /** Figma: Size (sm 32 · md 48 · lg 56 · xl 64 px) */
  size?: LoadingIndicatorSize;
  /** Supporting text under the spinner, e.g. "Loading...". Also used as the accessible label. */
  label?: ReactNode;
}

// box, ring diameter (stroke centre), stroke
const geo: Record<LoadingIndicatorSize, { box: number; d: number; stroke: number; dotStroke: number }> = {
  sm: { box: 32, d: 28, stroke: 4, dotStroke: 4 },
  md: { box: 48, d: 42, stroke: 6, dotStroke: 6 },
  lg: { box: 56, d: 50, stroke: 6, dotStroke: 8 },
  xl: { box: 64, d: 58, stroke: 8, dotStroke: 8 },
};
const textCls: Record<LoadingIndicatorSize, string> = { sm: 'text-sm', md: 'text-sm', lg: 'text-lg', xl: 'text-lg' };

/**
 * LoadingIndicator — Figma "Loading indicators/Loading indicator".
 * Spins with Tailwind `animate-spin` (slowed down for prefers-reduced-motion). Has role="status".
 */
export const LoadingIndicator = forwardRef<HTMLDivElement, LoadingIndicatorProps>(function LoadingIndicator(
  { variant = 'line-simple', size = 'md', label, className, ...props },
  ref,
) {
  const { box, d, stroke, dotStroke } = geo[size];
  const c = box / 2;
  const r = d / 2;
  const len = 2 * Math.PI * r;
  let marks: ReactNode;
  if (variant === 'dot-circle') {
    const count = Math.max(8, Math.round(len / (dotStroke + 2)));
    marks = Array.from({ length: count }, (_, i) => {
      const a = -(i / count) * Math.PI * 2; // tail trails behind the clockwise head
      return (
        <circle
          key={i}
          cx={c + r * Math.sin(a)}
          cy={c - r * Math.cos(a)}
          r={dotStroke / 2}
          fill="currentColor"
          opacity={Math.max(0, 1 - i / (count * 0.92))}
        />
      );
    }).reverse();
  } else {
    const arc = variant === 'line-simple' ? 0.25 : 0.6;
    marks = (
      <>
        {variant === 'line-simple' && <circle cx={c} cy={c} r={r} fill="none" strokeWidth={stroke} className="stroke-gray-100" />}
        <circle
          cx={c}
          cy={c}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${len * arc} ${len}`}
          transform={`rotate(-90 ${c} ${c})`}
        />
      </>
    );
  }
  return (
    <div
      ref={ref}
      role="status"
      aria-live="polite"
      aria-label={typeof label === 'string' ? label : 'Loading'}
      className={cx('inline-flex flex-col items-center', size === 'xl' ? 'gap-5' : 'gap-4', className)}
      {...props}
    >
      <svg
        width={box}
        height={box}
        viewBox={`0 0 ${box} ${box}`}
        className={cx('shrink-0 animate-spin text-brand-600 motion-reduce:[animation-duration:3s]')}
        aria-hidden
      >
        {marks}
      </svg>
      {label != null && <span className={cx('text-center font-medium text-gray-700', textCls[size])}>{label}</span>}
    </div>
  );
});
