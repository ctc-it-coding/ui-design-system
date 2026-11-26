import { forwardRef, type SVGAttributes } from 'react';
import { useUid } from '../charts/utils';
import { fileTypeData, type FileType } from './data/filetype.data';

export type { FileType };
export type FileTypeIconVariant = 'default' | 'gray' | 'solid';

export interface FileTypeIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children' | 'type'> {
  /** Figma: File type — e.g. `"pdf"`, `"jpg"`, `"docx"`, `"zip"`, or a pictogram type (`"icon-image"`, `"folder"`, `"empty"` …). */
  type: FileType;
  /** Figma: Type (Default / Gray / Solid) */
  variant?: FileTypeIconVariant;
  /** px, default 40. */
  size?: number;
  /** Accessible name; defaults to the label/type. Pass `title=""` for decorative use. */
  title?: string;
}

export const fileTypes = Object.keys(fileTypeData) as FileType[];

// Figma geometry (40×40). Default: white page at x=7 with gray-300 border + earmark; Gray/Solid: page at x=4.
const DEFAULT_PAGE = 'M7.75 4C7.75 2.205 9.205.75 11 .75H27c.12 0 .235.047.32.132L38.118 11.68c.085.085.132.2.132.32V36c0 1.795-1.455 3.25-3.25 3.25H11c-1.795 0-3.25-1.455-3.25-3.25V4Z';
const DEFAULT_EARMARK = 'M27 .75V8c0 2.21 1.79 4 4 4h7.25';
const FLAT_PAGE = 'M4 4C4 1.791 5.791 0 8 0H24L36 12V36C36 38.209 34.209 40 32 40H8C5.791 40 4 38.209 4 36V4Z';
const FLAT_EARMARK = 'M24 0L36 12H28C25.791 12 24 10.209 24 8V0Z';

/** FileTypeIcon — Figma "Misc icons/File type icon". Labels ("PDF", "JPG" …) are drawn as SVG text. */
export const FileTypeIcon = forwardRef<SVGSVGElement, FileTypeIconProps>(function FileTypeIcon(
  { type, variant = 'default', size = 40, title, className, ...props },
  ref,
) {
  const e = fileTypeData[type];
  const gid = useUid('tc-file');
  const name = title ?? (e.label ? `${e.label} file` : type.replace(/^icon-/, '') + ' file');
  const a11y = name ? { role: 'img', 'aria-label': name } : { 'aria-hidden': true as const };
  const font = { fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif', fontWeight: 700 };
  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
      {...a11y}
      {...props}
    >
      {name && <title>{name}</title>}
      {variant === 'default' ? (
        <>
          <path d={DEFAULT_PAGE} fill="#ffffff" stroke="#d0d5dd" strokeWidth={1.5} />
          <path d={DEFAULT_EARMARK} stroke="#d0d5dd" strokeWidth={1.5} />
          {e.label ? (
            <>
              <rect x={1} y={18} width={e.badgeW ?? 26} height={16} rx={2} fill={e.color} />
              <text x={1 + (e.badgeW ?? 26) / 2} y={26} dy="0.36em" textAnchor="middle" fontSize={10} fill="#ffffff" style={font}>
                {e.label}
              </text>
            </>
          ) : (
            e.icon && <g dangerouslySetInnerHTML={{ __html: e.icon }} />
          )}
        </>
      ) : variant === 'gray' ? (
        <>
          <defs>
            <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f9fafb" />
              <stop offset="1" stopColor="#eceff2" />
            </linearGradient>
          </defs>
          <path d={FLAT_PAGE} fill={`url(#${gid})`} />
          <path d={FLAT_EARMARK} fill="#eaecf0" />
          {e.label ? (
            <text x={20} y={28.5} dy="0.36em" textAnchor="middle" fontSize={9} fill="#344054" style={font}>
              {e.label}
            </text>
          ) : (
            e.iconGray && <g dangerouslySetInnerHTML={{ __html: e.iconGray }} />
          )}
        </>
      ) : (
        <>
          <path d={FLAT_PAGE} fill={e.solid ?? e.color} />
          <path d={FLAT_EARMARK} fill="#ffffff" opacity={0.3} />
          {e.label ? (
            <text x={20} y={28.5} dy="0.36em" textAnchor="middle" fontSize={9} fill="#ffffff" style={font}>
              {e.label}
            </text>
          ) : (
            e.iconSolid && <g dangerouslySetInnerHTML={{ __html: e.iconSolid }} />
          )}
        </>
      )}
    </svg>
  );
});
