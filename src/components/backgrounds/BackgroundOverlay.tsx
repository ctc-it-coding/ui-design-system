import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface BackgroundOverlayProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type — default = gray-950 @ 70 %, gradient = same but fading from 50 % at the top, transparent = no tint */
  type?: 'default' | 'transparent' | 'gradient';
  /** Figma: Background blur (backdrop blur 8px) */
  blur?: boolean;
}

/** BackgroundOverlay — Figma "Background overlay" (modal / slideout scrim). Covers its positioned parent (absolute inset-0); pass `className="fixed"` for a page scrim. */
export const BackgroundOverlay = forwardRef<HTMLDivElement, BackgroundOverlayProps>(function BackgroundOverlay(
  { type = 'default', blur = true, className, style, children, ...props },
  ref,
) {
  const mask = 'linear-gradient(to bottom, rgb(0 0 0 / 0.5), #000)';
  return (
    <div ref={ref} className={cx('absolute inset-0', blur && 'backdrop-blur-sm', className)} {...props} style={style}>
      {type !== 'transparent' && (
        <div aria-hidden className="absolute inset-0 bg-gray-950/70" style={type === 'gradient' ? { maskImage: mask, WebkitMaskImage: mask } : undefined} />
      )}
      {children}
    </div>
  );
});
