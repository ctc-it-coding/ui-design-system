import { forwardRef, type SVGAttributes } from 'react';
import { cx } from '../../utils/cx';
import { integrationLogoData, type IntegrationLogoName } from './integrationLogos.data';

export type { IntegrationLogoName };
export const integrationLogoNames = Object.keys(integrationLogoData) as IntegrationLogoName[];

const titles: Partial<Record<IntegrationLogoName, string>> = {
  'google-drive': 'Google Drive', 'g-calendar': 'Google Calendar', whatsapp: 'WhatsApp', invision: 'InVision',
};
const labelOf = (n: IntegrationLogoName) => titles[n] ?? n.charAt(0).toUpperCase() + n.slice(1);
/** logos drawn on a white tile get the Figma shadow-xs */
const shadowed = new Set<IntegrationLogoName>(['google-drive', 'g-calendar']);

export interface IntegrationLogoProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Figma integration app logo component (notion, slack, google_drive, …) */
  name: IntegrationLogoName;
  /** px (Figma uses 48 / 64 / 80 / 96). Default 64. */
  size?: number;
  /** Accessible name; defaults to the app name. Pass "" for decorative. */
  title?: string;
}

/** IntegrationLogo — app logos used by the Features "Integration" items (Figma `notion`, `slack`, …). */
export const IntegrationLogo = forwardRef<SVGSVGElement, IntegrationLogoProps>(function IntegrationLogo(
  { name, size = 64, title, className, ...props },
  ref,
) {
  const d = integrationLogoData[name];
  const label = title ?? labelOf(name);
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox={`0 0 ${d.w} ${d.h}`}
      fill="none"
      role={label ? 'img' : undefined}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      className={cx('shrink-0', shadowed.has(name) && 'drop-shadow-[0_1px_1px_rgb(16_24_40/0.06)]', className)}
      dangerouslySetInnerHTML={{ __html: d.body }}
      {...props}
    />
  );
});

/** Human readable name of an integration logo ("google-drive" → "Google Drive"). */
export const integrationLabel = labelOf;
