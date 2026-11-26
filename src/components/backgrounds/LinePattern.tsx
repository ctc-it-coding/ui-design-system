import { forwardRef, type CSSProperties, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { linePatternData, type LinePatternStyle } from './data/linePatterns.data';

export type { LinePatternStyle };

export interface LinePatternProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'style' | 'width' | 'height'> {
  /** Figma: Style — line-pattern 298×408, dot-cube 80×80, wavy-lines 360×360, topographic 800×800 */
  variant?: LinePatternStyle;
  /** Width in px (height follows). Defaults to the Figma size. */
  width?: number | string;
  height?: number | string;
  style?: CSSProperties;
}

export const linePatternStyles = Object.keys(linePatternData) as LinePatternStyle[];

/** LinePattern — Figma "Line pattern" decorative art (currentColor, default text-gray-200). */
export const LinePattern = forwardRef<SVGSVGElement, LinePatternProps>(function LinePattern(
  { variant = 'line-pattern', width, height, className, ...props },
  ref,
) {
  const a = linePatternData[variant];
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${a.w} ${a.h}`}
      width={width ?? (height == null ? a.w : undefined)}
      height={height ?? (width == null ? a.h : undefined)}
      fill="none"
      aria-hidden
      className={cx('pointer-events-none shrink-0 text-gray-200', className)}
      dangerouslySetInnerHTML={{ __html: a.body }}
      {...props}
    />
  );
});
