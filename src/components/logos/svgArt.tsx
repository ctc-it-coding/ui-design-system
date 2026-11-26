import { useScopedSvg } from '../../utils/scopeSvgIds';
import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface SvgArtProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  art: { w: number; h: number; body: string; op?: number };
  /** Accessible name; empty string = decorative. */
  title?: string;
  /** Rendered height in px (width follows the aspect ratio). Defaults to the Figma height. */
  height?: number | string;
}

/** Internal: renders exported Figma vector art at its native aspect ratio. */
export const SvgArt = forwardRef<SVGSVGElement, SvgArtProps>(function SvgArt({ art, title, height, className, style, ...props }, ref) {
  const body = useScopedSvg(art.body);
  const h = height ?? art.h;
  const w = typeof h === 'number' ? (h * art.w) / art.h : undefined;
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${art.w} ${art.h}`}
      width={w}
      height={h}
      fill="none"
      role={title ? 'img' : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : true}
      className={cx('shrink-0', className)}
      style={{ ...(art.op && art.op < 1 ? { opacity: art.op } : null), ...style }}
      dangerouslySetInnerHTML={{ __html: (title ? `<title>${title}</title>` : '') + body }}
      {...props}
    />
  );
});
