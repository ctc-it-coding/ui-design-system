import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { PlaceholderScreen } from './PlaceholderScreen';

export interface MacbookMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Dark mode — only affects the default placeholder screen. */
  dark?: boolean;
  /** Image URL for the screen (alternative to children). */
  src?: string;
  alt?: string;
}

/**
 * MacbookMockup — Figma "Macbook Pro mockup" (1024×598, screen 828.6×517.1 ≈ 16:10).
 * Fluid: shrinks to its container width (max 1024px). Children fill the screen.
 */
export const MacbookMockup = forwardRef<HTMLDivElement, MacbookMockupProps>(function MacbookMockup(
  { dark = false, src, alt = '', className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('relative aspect-[1024/598] w-full max-w-[1024px]', className)} {...props}>
      {/* lid */}
      <div className="absolute left-[8.6%] top-0 h-[94.6%] w-[82.8%] rounded-[2.4%/4%] bg-gradient-to-b from-[#2a2a2c] to-[#1a1a1c] p-[0.18%] shadow-[inset_0_0_0_1px_#4a4a4d]">
        <div className="relative size-full rounded-[2.2%/3.6%] bg-[#0b0b0c]">
          {/* camera */}
          <div className="absolute left-1/2 top-[0.9%] aspect-square w-[0.57%] -translate-x-1/2 rounded-full bg-[#1e2a33] ring-1 ring-[#2c2c2e]" />
          {/* screen */}
          <div
            className={cx(
              'absolute left-[2.15%] top-[3.2%] h-[92.9%] w-[97.7%] overflow-hidden rounded-[0.6%/1%]',
              dark ? 'bg-gray-950' : 'bg-white',
            )}
          >
            {children != null ? (
              <div className="absolute inset-0 overflow-hidden">{children}</div>
            ) : src ? (
              <img src={src} alt={alt} className="absolute inset-0 size-full object-cover object-top" />
            ) : (
              <PlaceholderScreen dark={dark} className="absolute inset-0" preserveAspectRatio="xMidYMin slice" />
            )}
          </div>
        </div>
      </div>
      {/* base */}
      <div className="absolute bottom-[1.1%] left-0 h-[4.6%] w-full rounded-b-[45%_100%] rounded-t-[0.4%] bg-gradient-to-b from-[#d6d7da] via-[#b9bbbf] to-[#8a8c90] dark:from-[#d6d7da]">
        <div className="absolute left-1/2 top-0 h-[38%] w-[15.3%] -translate-x-1/2 rounded-b-[30%_100%] bg-gradient-to-b from-[#9fa1a5] to-[#c7c8cb]" />
      </div>
      {/* shadow */}
      <div className="absolute -inset-x-[0.8%] bottom-0 h-[1.1%] rounded-[50%] bg-black/25 blur-[2px]" />
    </div>
  );
});
