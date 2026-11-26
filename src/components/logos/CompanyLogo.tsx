import { forwardRef, type SVGAttributes } from 'react';
import { companyLogoData, type CompanyLogoName } from './data/companyLogos.data';
import { SvgArt } from './svgArt';

export type { CompanyLogoName };

export interface CompanyLogoProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'height'> {
  /** Figma: Company (kebab-case: "command-r", "acme-corp", "alt-shift", …) */
  name: CompanyLogoName;
  /** Figma: Logotype — show the wordmark next to the logomark. Default true. */
  logotype?: boolean;
  /** Figma: White — all-white version for dark backgrounds. */
  white?: boolean;
  /** Rendered height in px (Figma 48). Width follows the aspect ratio. */
  height?: number | string;
  /** Accessible name; defaults to the company name. Pass "" for decorative. */
  title?: string;
}

/** All fictional company names (Figma "Fictional company logo" Company values). */
export const companyLogoNames = Object.keys(companyLogoData) as CompanyLogoName[];

/** CompanyLogo — Figma "Fictional company logo" (logomark ± logotype, colored or white). */
export const CompanyLogo = forwardRef<SVGSVGElement, CompanyLogoProps>(function CompanyLogo(
  { name, logotype = true, white = false, height = 48, title, ...props },
  ref,
) {
  const d = companyLogoData[name];
  const art = logotype ? (white ? d.logotypeWhite : d.logotype) : white ? d.markWhite : d.mark;
  return <SvgArt ref={ref} art={art} height={height} title={title ?? d.label} {...props} />;
});
