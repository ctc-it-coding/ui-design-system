import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

/** Figma "_Background mask" Direction. */
export type BackgroundMaskDirection = 'radial-center' | 'radial-down' | 'radial-up' | 'linear-down' | 'linear-up';

const images: Record<BackgroundMaskDirection, string> = {
  'radial-center': 'radial-gradient(50% 50% at 50% 50%, #000 0%, transparent 100%)',
  'radial-down': 'radial-gradient(52.2% 100% at 50% 0%, #000 0%, transparent 95.3%)',
  'radial-up': 'radial-gradient(52.2% 100% at 50% 100%, #000 0%, transparent 95.8%)',
  'linear-down': 'linear-gradient(to bottom, #000 0%, transparent 99.1%)',
  'linear-up': 'linear-gradient(to bottom, transparent 0%, #000 99.1%)',
};

/** CSS `mask-image` style for a Figma "_Background mask" direction (spread it into `style`). */
export function backgroundMaskStyle(direction: BackgroundMaskDirection): CSSProperties {
  return { maskImage: images[direction], WebkitMaskImage: images[direction] };
}

export interface BackgroundMaskProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Direction */
  direction?: BackgroundMaskDirection;
}

/** BackgroundMask — Figma "_Background mask". Fades its children out with a radial/linear alpha mask. */
export const BackgroundMask = forwardRef<HTMLDivElement, BackgroundMaskProps>(function BackgroundMask(
  { direction = 'radial-center', className, style, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('relative', className)} style={{ ...backgroundMaskStyle(direction), ...style }} {...props}>
      {children}
    </div>
  );
});
