import { forwardRef, type Ref, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import {
  accentData,
  arrowData,
  lineData,
  scribbleData,
  underlineData,
  type Art,
  type HandDrawnAccentVariant,
  type HandDrawnArrowVariant,
  type HandDrawnLineVariant,
  type HandDrawnUnderlineVariant,
  type PenScribbleVariant,
} from './data/handDrawn.data';

export type { HandDrawnAccentVariant, HandDrawnArrowVariant, HandDrawnLineVariant, HandDrawnUnderlineVariant, PenScribbleVariant };

interface BaseProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'width' | 'height'> {
  /** Width in px (height follows the aspect ratio). Defaults to the Figma size. */
  width?: number | string;
  /** Height in px; used when width is not given. */
  height?: number | string;
  /** Mirror horizontally. */
  flip?: boolean;
}

function makeArt(art: Art, { width, height, flip, className, style, ...props }: BaseProps, ref: Ref<SVGSVGElement>) {
  const w = width ?? (height == null ? art.w : undefined);
  const h = height ?? (width == null ? art.h : undefined);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${art.w} ${art.h}`}
      width={w}
      height={h}
      fill="none"
      aria-hidden
      className={cx('shrink-0 text-gray-900', className)}
      style={{ ...(flip ? { transform: 'scaleX(-1)' } : null), ...style }}
      dangerouslySetInnerHTML={{ __html: art.body }}
      {...props}
    />
  );
}

/** HandDrawnArrow — Figma "Hand-drawn arrow" (Arrow=01…42). Single color: uses currentColor (default text-gray-900). */
export const HandDrawnArrow = forwardRef<SVGSVGElement, BaseProps & { /** Figma: Arrow ("01"…"42") */ variant?: HandDrawnArrowVariant }>(
  function HandDrawnArrow({ variant = '01', ...props }, ref) {
    return makeArt(arrowData[variant], props, ref);
  },
);
/** HandDrawnUnderline — Figma "Hand-drawn underlines" (Underline=01…10). currentColor. */
export const HandDrawnUnderline = forwardRef<SVGSVGElement, BaseProps & { /** Figma: Underline */ variant?: HandDrawnUnderlineVariant }>(
  function HandDrawnUnderline({ variant = '01', ...props }, ref) {
    return makeArt(underlineData[variant], props, ref);
  },
);
/** HandDrawnAccent — Figma "Hand-drawn accents" (Accent=01…19). currentColor. */
export const HandDrawnAccent = forwardRef<SVGSVGElement, BaseProps & { /** Figma: Accent */ variant?: HandDrawnAccentVariant }>(
  function HandDrawnAccent({ variant = '01', ...props }, ref) {
    return makeArt(accentData[variant], props, ref);
  },
);
/** PenScribble — Figma "Hand-drawn pen scribble" (underline-01…09, circle-01…07). currentColor. */
export const PenScribble = forwardRef<SVGSVGElement, BaseProps & { /** Figma: Pen scribble */ variant?: PenScribbleVariant }>(
  function PenScribble({ variant = 'underline-01', ...props }, ref) {
    return makeArt(scribbleData[variant], props, ref);
  },
);
/** HandDrawnLine — Figma "Hand-drawn line" (Line=Circle / Squiggle). currentColor. */
export const HandDrawnLine = forwardRef<SVGSVGElement, BaseProps & { /** Figma: Line */ variant?: HandDrawnLineVariant }>(
  function HandDrawnLine({ variant = 'circle', ...props }, ref) {
    return makeArt(lineData[variant], props, ref);
  },
);

export const handDrawnArrowVariants = (Object.keys(arrowData) as HandDrawnArrowVariant[]).sort();
export const handDrawnUnderlineVariants = (Object.keys(underlineData) as HandDrawnUnderlineVariant[]).sort();
export const handDrawnAccentVariants = (Object.keys(accentData) as HandDrawnAccentVariant[]).sort();
export const penScribbleVariants = (Object.keys(scribbleData) as PenScribbleVariant[]).sort();
export const handDrawnLineVariants = (Object.keys(lineData) as HandDrawnLineVariant[]).sort();
