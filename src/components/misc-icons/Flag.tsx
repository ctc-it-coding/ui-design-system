import { forwardRef, type SVGAttributes } from 'react';
import { flagData, type FlagCode } from './data/flags.data';

export type { FlagCode };

export interface FlagProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** ISO 3166-1 alpha-2 country code (upper case), or `"earth"`. */
  code: FlagCode;
  /** px, default 24. */
  size?: number;
  /** Accessible name; defaults to the code. Pass `title=""` for decorative use. */
  title?: string;
}

export const flagCodes = Object.keys(flagData) as FlagCode[];

/** Flag — circular country flag from the Figma "Misc icons" page. */
export const Flag = forwardRef<SVGSVGElement, FlagProps>(function Flag({ code, size = 24, title, className, ...props }, ref) {
  const name = title ?? code;
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      role={name ? 'img' : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
      dangerouslySetInnerHTML={{ __html: (name ? `<title>${name}</title>` : '') + (flagData[code] ?? flagData.earth) }}
      {...props}
    />
  );
});
