import { forwardRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CarouselArrow, PaginationDots } from './PaginationDots';

export interface CarouselSlide {
  /** Image source. */
  src?: string;
  alt?: string;
  /** Custom slide content instead of an image. */
  content?: ReactNode;
}

export interface CarouselImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  slides: CarouselSlide[];
  /** Figma: Size — md uses 36px arrows / small framed dots, lg uses 44px arrows / large dots. */
  size?: 'md' | 'lg';
  /** Current slide (controlled). */
  index?: number;
  /** Initial slide (uncontrolled). */
  defaultIndex?: number;
  onIndexChange?: (index: number) => void;
  /** Loop around at the ends. Default true. */
  loop?: boolean;
}

/** CarouselImage — Figma "Carousel image": image with arrows and framed pagination dots. */
export const CarouselImage = forwardRef<HTMLDivElement, CarouselImageProps>(function CarouselImage(
  { slides, size = 'md', index, defaultIndex = 0, onIndexChange, loop = true, className, ...props },
  ref,
) {
  const [inner, setInner] = useState(defaultIndex);
  const current = index ?? inner;
  const n = slides.length;
  const go = (i: number) => {
    const next = loop ? (i + n) % n : Math.min(Math.max(i, 0), n - 1);
    if (index === undefined) setInner(next);
    onIndexChange?.(next);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  };
  const slide = slides[current];
  const inset = size === 'md' ? 'left-4' : 'left-6';
  const insetR = size === 'md' ? 'right-4' : 'right-6';

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={cx('relative aspect-[8/5] w-full overflow-hidden rounded-lg bg-gray-100 outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24', className)}
      {...props}
    >
      <div aria-live="polite" className="absolute inset-0">
        {slide?.content ?? (slide?.src ? <img src={slide.src} alt={slide.alt ?? ''} className="size-full object-cover" /> : null)}
      </div>
      <CarouselArrow size={size} direction="left" className={cx('absolute top-1/2 -translate-y-1/2', inset)} disabled={!loop && current === 0} onClick={() => go(current - 1)} />
      <CarouselArrow size={size} direction="right" className={cx('absolute top-1/2 -translate-y-1/2', insetR)} disabled={!loop && current === n - 1} onClick={() => go(current + 1)} />
      <PaginationDots
        framed
        size={size}
        count={n}
        index={current}
        onIndexChange={go}
        className={cx('absolute left-1/2 -translate-x-1/2', size === 'md' ? 'bottom-4' : 'bottom-6')}
      />
    </div>
  );
});
