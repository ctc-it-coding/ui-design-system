import { forwardRef, type CSSProperties, type SVGProps } from 'react';

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'ref'> {
  /** Width & height in px (default 24). */
  size?: number | string;
  /** Overrides the 2px stroke of the line icons. */
  strokeWidth?: number | string;
  /** Accessible label. When omitted the icon is aria-hidden. */
  title?: string;
}

export type IconComponent = ReturnType<typeof createIcon>;

/** Builds a React icon component from the SVG inner markup extracted from Figma. */
export function createIcon(displayName: string, body: string) {
  const html = { __html: body };
  const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
    { size = 24, strokeWidth, title, style, className, ...props },
    ref,
  ) {
    const s = strokeWidth != null ? ({ ...style, ['--tc-icon-stroke' as string]: strokeWidth } as CSSProperties) : style;
    return (
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        focusable="false"
        data-icon={displayName}
        className={strokeWidth != null ? `[&_path[stroke]]:[stroke-width:var(--tc-icon-stroke)] ${className ?? ''}` : className}
        style={s}
        {...props}
        dangerouslySetInnerHTML={html}
      />
    );
  });
  Icon.displayName = displayName;
  return Icon;
}
