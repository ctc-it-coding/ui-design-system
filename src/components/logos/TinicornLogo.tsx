import { forwardRef, type HTMLAttributes, type ReactNode, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { tinicornLogoData } from './data/tinicornLogo.data';
import { SvgArt } from './svgArt';

export interface TinicornLogoProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  /** Figma: Dark mode — white wordmark for dark backgrounds. */
  dark?: boolean;
  /** Figma "Logomark" only, without the wordmark. */
  markOnly?: boolean;
  /** Rendered height in px (Figma 32). Everything scales with it. */
  height?: number;
  /** Wordmark text (Figma TEXT node, Bold 15/28). */
  wordmark?: ReactNode;
}

/** TinicornLogo — Figma "Logo" (Logomark + wordmark). The product's own brand logo. */
export const TinicornLogo = forwardRef<HTMLSpanElement, TinicornLogoProps>(function TinicornLogo(
  { dark = false, markOnly = false, height = 32, wordmark = 'TINICORN', className, style, ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      className={cx('inline-flex shrink-0 items-center font-bold whitespace-nowrap', dark ? 'text-white' : 'text-black', className)}
      style={{ height, fontSize: (height * 15) / 32, gap: (height * 3) / 32, ...style }}
      {...props}
    >
      <TinicornLogomark height={height} />
      {!markOnly && <span className="leading-none">{wordmark}</span>}
    </span>
  );
});

export interface TinicornLogomarkProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'height'> {
  /** px, Figma 32 */
  height?: number | string;
  title?: string;
}

/** TinicornLogomark — Figma "Logomark" (32×32 rounded square mark with shadow-xs-like drop shadow). */
export const TinicornLogomark = forwardRef<SVGSVGElement, TinicornLogomarkProps>(function TinicornLogomark(
  { height = 32, title = '', className, ...props },
  ref,
) {
  return (
    <SvgArt
      ref={ref}
      art={tinicornLogoData.mark}
      height={height}
      title={title}
      className={cx('rounded-[25%] shadow-[0_1px_2px_rgb(16_24_40/0.06),0_1px_3px_rgb(16_24_40/0.1)]', className)}
      {...props}
    />
  );
});
