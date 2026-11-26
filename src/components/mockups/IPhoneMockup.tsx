import { forwardRef, type HTMLAttributes, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { PlaceholderScreen } from './PlaceholderScreen';
import { iphoneFrameSvg } from './data/iphoneFrame.data';

export interface IPhoneMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Dark mode — status bar / home indicator turn white, screen bg gray-950. */
  dark?: boolean;
  /** Image URL for the screen (alternative to children). */
  src?: string;
  alt?: string;
  /** Show the status bar overlay (Figma "_iPhone mockup status bar"). Default true. */
  statusBar?: boolean;
  /** Show the home indicator overlay (Figma "_iPhone mockup home"). Default true. */
  homeIndicator?: boolean;
}

/** Figma "_iPhone mockup status bar" (375×38), scales with its width. */
export function IPhoneStatusBar({ dark = false, className, ...props }: { dark?: boolean } & Omit<SVGAttributes<SVGSVGElement>, 'children'>) {
  const f = dark ? '#ffffff' : '#000000';
  return (
    <svg viewBox="0 0 375 38" aria-hidden className={cx('block w-full', className)} {...props}>
      <text x="54.5" y="25" textAnchor="middle" fill={f} fontFamily="-apple-system, 'SF Pro Text', Inter, sans-serif" fontWeight="600" fontSize="15" letterSpacing="-0.3">9:41</text>
      {/* signal */}
      <g fill={f}>
        <rect x="293.7" y="21.3" width="3" height="4" rx="1" />
        <rect x="298.4" y="19.3" width="3" height="6" rx="1" />
        <rect x="303.1" y="17" width="3" height="8.3" rx="1" />
        <rect x="307.8" y="14.6" width="3" height="10.7" rx="1" />
      </g>
      {/* wifi */}
      <g fill={f} transform="translate(316 14.4)">
        <path d="M7.67 2.3c2.2 0 4.33.85 5.93 2.37.12.12.32.11.44-.01l1.15-1.17a.32.32 0 0 0 0-.45 10.6 10.6 0 0 0-15.04 0 .32.32 0 0 0 0 .45l1.16 1.17c.12.12.31.13.43.01A8.6 8.6 0 0 1 7.67 2.3Z" />
        <path d="M7.67 6.07c1.2 0 2.37.45 3.26 1.26.12.11.31.11.43-.01l1.15-1.17a.32.32 0 0 0 0-.46 6.82 6.82 0 0 0-9.68 0 .32.32 0 0 0 0 .46l1.15 1.17c.12.12.31.12.43.01a4.83 4.83 0 0 1 3.26-1.26Z" />
        <path d="M9.97 8.63a.31.31 0 0 0 0-.46 3.31 3.31 0 0 0-4.6 0 .31.31 0 0 0 0 .46l2 2.02c.12.12.32.12.44 0l2.16-2.02Z" />
      </g>
      {/* battery */}
      <rect x="336.8" y="14.2" width="21" height="10.3" rx="2.2" fill="none" stroke={f} strokeOpacity="0.35" />
      <rect x="338.8" y="16.2" width="17" height="6.3" rx="1.3" fill={f} />
      <path d="M359.3 17.7v3.3a1.8 1.8 0 0 0 0-3.3Z" fill={f} fillOpacity="0.4" />
    </svg>
  );
}

/** Figma "_iPhone mockup home" (375×34). */
export function IPhoneHomeIndicator({ dark = false, className, ...props }: { dark?: boolean } & Omit<SVGAttributes<SVGSVGElement>, 'children'>) {
  return (
    <svg viewBox="0 0 375 34" aria-hidden className={cx('block w-full', className)} {...props}>
      <rect x="120.5" y="21" width="134" height="5" rx="2.5" fill={dark ? '#ffffff' : '#000000'} />
    </svg>
  );
}

/**
 * IPhoneMockup — Figma "iPhone mockup" (418×852, screen 375×812). Fluid: shrinks to its container width
 * (max 418px) keeping proportions. Children fill the screen below the status bar and above the home indicator.
 */
export const IPhoneMockup = forwardRef<HTMLDivElement, IPhoneMockupProps>(function IPhoneMockup(
  { dark = false, src, alt = '', statusBar = true, homeIndicator = true, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('relative aspect-[418/852] w-full max-w-[418px] shrink-0', className)} {...props}>
      {/* Mockup shadow (410×848 r68 @4,1) */}
      <div className="absolute left-[0.96%] top-[0.12%] h-[99.53%] w-[98.09%] rounded-[16.6%/8%] shadow-[16px_16px_32px_-2px_rgb(16_24_40/0.08),32px_32px_64px_-4px_rgb(16_24_40/0.2)]" />
      {/* Mockup wrap: screen 375×812 @21,19 */}
      <div className={cx('absolute left-[5.02%] top-[2.23%] h-[95.3%] w-[89.71%] overflow-hidden rounded-[14%/6.5%]', dark ? 'bg-gray-950' : 'bg-white')}>
        {children != null ? (
          <div className="absolute inset-0 overflow-hidden pb-[9.07%] pt-[10.13%]">
            <div className="relative size-full overflow-hidden">{children}</div>
          </div>
        ) : src ? (
          <img src={src} alt={alt} className="absolute inset-0 size-full object-cover object-top" />
        ) : (
          <PlaceholderScreen layout="mobile" dark={dark} className="absolute inset-0" />
        )}
        {statusBar && <IPhoneStatusBar dark={dark} className="absolute inset-x-0 top-0" />}
        {homeIndicator && <IPhoneHomeIndicator dark={dark} className="absolute inset-x-0 bottom-0" />}
      </div>
      {/* device frame (exported from Figma) */}
      <svg
        viewBox="0 0 418 850"
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 h-[99.77%] w-full"
        dangerouslySetInnerHTML={{ __html: iphoneFrameSvg }}
      />
    </div>
  );
});
