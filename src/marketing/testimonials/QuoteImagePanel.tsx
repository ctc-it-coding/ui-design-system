import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import { TestimonialArrows } from './TestimonialCarouselArrow';

export interface QuoteImagePanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Size — md (name 36/44, stars beside the name) or sm (name 30/38, stars above). */
  size?: 'md' | 'sm';
  /** Figma: Type — full-width glass strip, or a floating glass card inset from the image edges. */
  type?: 'full-width' | 'floating';
  /** Figma: Quote=True — the quote shown above the name. */
  quote?: ReactNode;
  /** Person's name ("Olivia Rhye"). */
  name: ReactNode;
  /** Role line ("Designer, Layers"). */
  title?: ReactNode;
  /** Second line ("Web Design Agency"). */
  supportingText?: ReactNode;
  /** Star rating; `null` hides the stars. */
  rating?: number | null;
  /** Shows prev/next arrows next to the attribution (Figma: Size=md + Quote=True). */
  onPrev?: () => void;
  onNext?: () => void;
  /** Absolutely positions the panel at the bottom of the (relative) image container. Default true. */
  overlay?: boolean;
}

/**
 * QuoteImagePanel — Figma "_Quote image bottom panel".
 * A bottom gradient with a frosted-glass attribution card, placed over a photo.
 */
export const QuoteImagePanel = forwardRef<HTMLDivElement, QuoteImagePanelProps>(function QuoteImagePanel(
  { size = 'md', type = 'full-width', quote, name, title, supportingText, rating = 5, onPrev, onNext, overlay = true, className, ...props },
  ref,
) {
  const floating = type === 'floating';
  const md = size === 'md';
  const stars = rating != null && <RatingStars value={rating} className="shrink-0" />;
  const nameCls = cx('font-semibold text-white', md ? 'text-display-sm md:text-display-md' : 'text-display-xs md:text-display-sm');
  const showArrows = md && quote != null && (onPrev || onNext);
  return (
    <div
      ref={ref}
      className={cx(
        'flex flex-col justify-end bg-gradient-to-b from-black/0 to-black/40 pt-16 md:pt-24',
        overlay && 'absolute inset-x-0 bottom-0',
        floating ? (md ? 'px-4 pb-4 md:px-8 md:pb-8' : 'px-4 pb-4 md:px-6 md:pb-6') : '',
        className,
      )}
      {...props}
    >
      <div
        className={cx(
          'flex flex-col bg-white/30 backdrop-blur-lg',
          floating ? 'border border-white/30 px-5 py-6' : 'border-t border-white/30 p-5 md:p-8',
          quote != null ? (md ? 'gap-6 md:gap-8' : 'gap-6') : 'gap-3',
        )}
      >
        {quote != null && <blockquote className={cx('font-semibold text-white', md ? 'text-xl md:text-display-sm' : 'text-lg md:text-xl')}>{quote}</blockquote>}
        <div className="flex flex-col gap-3">
          {md ? (
            <div className="flex items-start justify-between gap-4">
              <p className={nameCls}>{name}</p>
              {stars && <div className="pt-2 md:pt-3">{stars}</div>}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {stars}
              <p className={nameCls}>{name}</p>
            </div>
          )}
          <div className="flex items-end gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-0.5">
              {title != null && <p className="text-md font-semibold text-white md:text-lg">{title}</p>}
              {supportingText != null && <p className="text-sm text-white md:text-md">{supportingText}</p>}
            </div>
            {showArrows && <TestimonialArrows onDark onPrev={onPrev} onNext={onNext} />}
          </div>
        </div>
      </div>
    </div>
  );
});
