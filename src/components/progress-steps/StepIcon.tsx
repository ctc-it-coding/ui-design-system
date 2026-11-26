import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export type StepStatus = 'incomplete' | 'current' | 'complete';
export type StepSize = 'sm' | 'md' | 'lg';

export interface StepIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Status */
  status?: StepStatus;
  /** Figma: Size — sm 24px, md 32px, lg 40px */
  size?: StepSize;
}

const box: Record<StepSize, string> = {
  sm: 'size-6 border-[1.5px]',
  md: 'size-8 border-2',
  lg: 'size-10 border-2',
};
const dot: Record<StepSize, string> = { sm: 'size-2', md: 'size-2.5', lg: 'size-3' };
const tick: Record<StepSize, string> = { sm: 'w-3', md: 'w-4', lg: 'w-5' };

const statusCls: Record<StepStatus, string> = {
  incomplete: 'border-gray-200 bg-white group-hover/step:bg-gray-50',
  complete: 'border-brand-600 bg-brand-600 text-white',
  current: 'border-brand-600 bg-brand-600 text-white ring-4 ring-brand-500/24',
};

/** Tick drawn at the Figma proportions (12×10.5 at sm). */
function Tick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 10.5" fill="none" aria-hidden className={className}>
      <path d="M1.25 5.5 4.5 8.75l6.25-7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * StepIcon — Figma "_Step icon base". Incomplete (gray ring + dot), current (brand fill + white dot + focus-style
 * halo) and complete (brand fill + tick).
 */
export const StepIcon = forwardRef<HTMLSpanElement, StepIconProps>(function StepIcon(
  { status = 'incomplete', size = 'md', className, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-status={status}
      className={cx(
        'relative z-10 inline-flex shrink-0 items-center justify-center rounded-full transition-colors',
        box[size],
        statusCls[status],
        className,
      )}
      {...props}
    >
      {status === 'complete' ? (
        <Tick className={cx(tick[size], 'h-auto')} />
      ) : (
        <span className={cx('rounded-full', dot[size], status === 'current' ? 'bg-white' : 'bg-gray-300')} />
      )}
    </span>
  );
});
