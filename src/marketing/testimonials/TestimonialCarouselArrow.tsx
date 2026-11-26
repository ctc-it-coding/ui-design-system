import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from '../../icons';

export type TestimonialCarouselArrowType = 'button-chevron' | 'button-arrow' | 'arrow';

export interface TestimonialCarouselArrowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma: Arrow */
  direction?: 'left' | 'right';
  /** Figma: Size (md = 48px button / 40×20 arrow, lg = 56px button / 48×24 arrow) */
  size?: 'md' | 'lg';
  /** Figma: Type */
  type?: TestimonialCarouselArrowType;
  /** Light variant for use on top of photos / dark backgrounds (white icon, white/50 border). */
  onDark?: boolean;
}

function LongArrow({ direction, size }: { direction: 'left' | 'right'; size: 'md' | 'lg' }) {
  const w = size === 'lg' ? 48 : 40;
  const h = size === 'lg' ? 24 : 20;
  const m = h / 2;
  const head = size === 'lg' ? 8 : 6.8;
  const d = direction === 'right' ? `M4 ${m}H${w - 4}M${w - 4 - head} ${m - head}L${w - 4} ${m}L${w - 4 - head} ${m + head}` : `M${w - 4} ${m}H4M${4 + head} ${m - head}L4 ${m}L${4 + head} ${m + head}`;
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none" aria-hidden>
      <path d={d} stroke="currentColor" strokeWidth={size === 'lg' ? 2 : 1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * TestimonialCarouselArrow — Figma "_Testiomonial carousel arrow".
 * Round outlined prev/next button (chevron or arrow icon) or a bare long arrow (Type=Arrow).
 */
export const TestimonialCarouselArrow = forwardRef<HTMLButtonElement, TestimonialCarouselArrowProps>(function TestimonialCarouselArrow(
  { direction = 'left', size = 'lg', type = 'button-arrow', onDark = false, className, ...props },
  ref,
) {
  const label = direction === 'left' ? 'Previous' : 'Next';
  if (type === 'arrow') {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        className={cx(
          'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-sm outline-none transition-colors duration-100',
          'focus-visible:ring-4 focus-visible:ring-brand-500/24 disabled:cursor-not-allowed',
          onDark ? 'text-white/80 hover:text-white disabled:text-white/40' : 'text-gray-500 hover:text-gray-600 disabled:text-gray-300',
          className,
        )}
        {...props}
      >
        <LongArrow direction={direction} size={size} />
      </button>
    );
  }
  const Icon = type === 'button-chevron' ? (direction === 'left' ? ChevronLeft : ChevronRight) : direction === 'left' ? ArrowLeft : ArrowRight;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cx(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full border outline-none transition-colors duration-100',
        'focus-visible:ring-4 disabled:cursor-not-allowed',
        size === 'lg' ? 'size-12 md:size-14' : 'size-12',
        onDark
          ? 'border-white/50 text-white hover:bg-white/10 focus-visible:ring-white/24 disabled:border-white/20 disabled:text-white/40 disabled:hover:bg-transparent'
          : 'border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-600 focus-visible:ring-gray-400/14 disabled:border-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent',
        className,
      )}
      {...props}
    >
      <Icon className={size === 'lg' ? 'size-5 md:size-6' : 'size-5'} />
    </button>
  );
});

/** Prev/next pair (Figma "Arrows" frame: gap 32 desktop / 16 mobile). */
export function TestimonialArrows({
  onPrev,
  onNext,
  canPrev = true,
  canNext = true,
  onDark,
  size = 'lg',
  type = 'button-arrow',
  className,
}: {
  onPrev?: () => void;
  onNext?: () => void;
  canPrev?: boolean;
  canNext?: boolean;
  onDark?: boolean;
  size?: 'md' | 'lg';
  type?: TestimonialCarouselArrowType;
  className?: string;
}) {
  return (
    <div className={cx('flex shrink-0 gap-4 md:gap-8', className)}>
      <TestimonialCarouselArrow direction="left" size={size} type={type} onDark={onDark} onClick={onPrev} disabled={!canPrev} />
      <TestimonialCarouselArrow direction="right" size={size} type={type} onDark={onDark} onClick={onNext} disabled={!canNext} />
    </div>
  );
}
