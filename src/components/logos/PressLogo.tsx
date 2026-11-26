import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { pressLogoData, type PressLogoName } from './data/pressLogos.data';
import { SvgArt } from './svgArt';

export type { PressLogoName };

export interface PressLogoProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'height'> {
  /** Figma: Company ("forbes", "techcrunch", "new-york-times", …) */
  name: PressLogoName;
  /** Rendered height in px (defaults to the Figma artwork height). */
  height?: number | string;
  /** Accessible name; defaults to the publication name. */
  title?: string;
}

export const pressLogoNames = Object.keys(pressLogoData) as PressLogoName[];

/** PressLogo — Figma "Press logo". Single-color (gray-700 by default; uses currentColor → override with text-*). */
export const PressLogo = forwardRef<SVGSVGElement, PressLogoProps>(function PressLogo({ name, height, title, className, ...props }, ref) {
  const d = pressLogoData[name];
  return <SvgArt ref={ref} art={d} height={height} title={title ?? d.label} className={cx('text-gray-700', className)} {...props} />;
});
