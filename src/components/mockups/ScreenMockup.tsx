import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { PlaceholderScreen } from './PlaceholderScreen';

export type ScreenMockupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ScreenMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Size — xs 342, sm 480, md 640, lg 768, xl 1024, 2xl 1216 px wide (3:2). Shrinks to its container. */
  size?: ScreenMockupSize;
  /** Figma: Dark mode — only affects the default placeholder screen. */
  dark?: boolean;
  /** Image URL for the screen (alternative to children). */
  src?: string;
  alt?: string;
}

const sizes: Record<ScreenMockupSize, string> = {
  xs: 'max-w-[342px] rounded-sm ring-4 shadow-2xl',
  sm: 'max-w-[480px] rounded-md ring-4 shadow-2xl',
  md: 'max-w-[640px] rounded-lg ring-4 shadow-2xl',
  lg: 'max-w-[768px] rounded-[10px] ring-4 shadow-3xl',
  xl: 'max-w-[1024px] rounded-xl ring-[6px] shadow-3xl',
  '2xl': 'max-w-[1216px] rounded-xl ring-8 shadow-3xl',
};

/**
 * ScreenMockup — Figma "3:2 screen mockup". A 3:2 screen with a gray-900 outside frame and drop shadow.
 * Put the screen content (image, app UI…) in children; it fills the screen and is clipped.
 */
export const ScreenMockup = forwardRef<HTMLDivElement, ScreenMockupProps>(function ScreenMockup(
  { size = 'lg', dark = false, src, alt = '', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('relative aspect-[3/2] w-full overflow-hidden bg-white ring-gray-900', dark && 'bg-gray-950', sizes[size], className)}
      {...props}
    >
      {children != null ? <div className="absolute inset-0 overflow-hidden">{children}</div> : (src ? <img src={src} alt={alt} className="absolute inset-0 size-full object-cover object-top" /> : <PlaceholderScreen dark={dark} />)}
    </div>
  );
});
