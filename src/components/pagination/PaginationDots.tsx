import { forwardRef, useState, type ButtonHTMLAttributes, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { ChevronLeft, ChevronRight } from '../../icons';

export type PaginationDotsStyle = 'dot' | 'line';
export type PaginationDotsSize = 'md' | 'lg';

export interface PaginationDotsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Number of pages/slides. */
  count: number;
  /** Current index, 0-based (controlled). */
  index?: number;
  /** Initial index (uncontrolled). */
  defaultIndex?: number;
  /** Called when a dot is clicked. */
  onIndexChange?: (index: number) => void;
  /** Figma: Style */
  dotStyle?: PaginationDotsStyle;
  /** Figma: Size */
  size?: PaginationDotsSize;
  /** Figma: Framed — translucent white pill behind the dots (for use over images). */
  framed?: boolean;
}

const indicator: Record<PaginationDotsStyle, Record<PaginationDotsSize, string>> = {
  dot: { md: 'size-2 rounded-full', lg: 'size-2.5 rounded-full' },
  line: { md: 'h-1.5 w-10 rounded-full', lg: 'h-2 w-10 rounded-full' },
};
const gaps: Record<PaginationDotsStyle, Record<PaginationDotsSize, string>> = {
  dot: { md: 'gap-3', lg: 'gap-4' },
  line: { md: 'gap-2', lg: 'gap-3' },
};
const frame: Record<PaginationDotsSize, string> = {
  md: 'rounded-full bg-white/90 p-2 backdrop-blur',
  lg: 'rounded-full bg-white/90 p-3 backdrop-blur',
};

/** PaginationDots — Figma "Pagination dot group" (+ "_Pagination dot indicator"). */
export const PaginationDots = forwardRef<HTMLDivElement, PaginationDotsProps>(function PaginationDots(
  { count, index, defaultIndex = 0, onIndexChange, dotStyle = 'dot', size = 'md', framed = false, className, ...props },
  ref,
) {
  const [inner, setInner] = useState(defaultIndex);
  const current = index ?? inner;
  return (
    <div
      ref={ref}
      role="group"
      aria-label="Slides"
      className={cx('inline-flex items-center', gaps[dotStyle][size], framed && frame[size], className)}
      {...props}
    >
      {Array.from({ length: count }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === current ? 'true' : undefined}
          onClick={() => {
            if (index === undefined) setInner(i);
            onIndexChange?.(i);
          }}
          className={cx(
            'shrink-0 cursor-pointer bg-gray-200 outline-none transition-colors duration-100 hover:bg-gray-300 focus-visible:ring-4 focus-visible:ring-brand-500/24',
            'aria-[current=true]:bg-brand-700',
            indicator[dotStyle][size],
          )}
        />
      ))}
    </div>
  );
});

export interface CarouselArrowProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Chevron */
  direction?: 'left' | 'right';
  /** Figma: Size */
  size?: 'md' | 'lg';
}

/** CarouselArrow — Figma "_Carousel arrow": translucent round chevron button. */
export const CarouselArrow = forwardRef<HTMLButtonElement, CarouselArrowProps>(function CarouselArrow(
  { direction = 'left', size = 'md', className, ...props },
  ref,
) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;
  return (
    <button
      ref={ref}
      type="button"
      aria-label={direction === 'left' ? 'Previous slide' : 'Next slide'}
      className={cx(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/90 p-2 text-gray-700 backdrop-blur outline-none transition-colors duration-100',
        'hover:bg-white focus-visible:ring-4 focus-visible:ring-brand-500/24 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'md' ? 'size-9' : 'size-11',
        className,
      )}
      {...props}
    >
      <Icon className={size === 'md' ? 'size-5' : 'size-6'} />
    </button>
  );
});
