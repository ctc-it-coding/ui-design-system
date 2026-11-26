import { forwardRef, useId, type HTMLAttributes } from 'react';
import { Box, CreditCard02, File04, UploadCloud02 } from '../../icons';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';

export type IllustrationStyle = 'cloud' | 'credit-card' | 'documents' | 'box';
export type IllustrationColor = 'primary' | 'gray';
export type IllustrationSize = 'sm' | 'md' | 'lg';

export interface EmptyStateIllustrationProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Style */
  type?: IllustrationStyle;
  /** Figma: Color */
  color?: IllustrationColor;
  /** Figma: Size — sm 152×118, md 172×128, lg 220×160 */
  size?: IllustrationSize;
  /** Icon inside the glass featured icon (defaults per style). `null` hides it. */
  icon?: IconSlot | null;
}

const dims: Record<IllustrationSize, { w: number; h: number; icon: number }> = {
  sm: { w: 152, h: 118, icon: 48 },
  md: { w: 172, h: 128, icon: 56 },
  lg: { w: 220, h: 160, icon: 56 },
};
const defaultIcon: Record<IllustrationStyle, IconSlot> = {
  cloud: UploadCloud02,
  'credit-card': CreditCard02,
  documents: File04,
  box: Box,
};

/**
 * EmptyStateIllustration — Figma "Empty states/Illustration" (Cloud / Credit card / Documents / Box).
 * Simplified inline-SVG rebuild: tinted background circle, floating dots, a white object with drop shadow
 * and a glassmorphism featured icon on top.
 */
export const EmptyStateIllustration = forwardRef<HTMLDivElement, EmptyStateIllustrationProps>(function EmptyStateIllustration(
  { type = 'cloud', color = 'primary', size = 'lg', icon, className, style, ...props },
  ref,
) {
  const uid = useId().replace(/:/g, '');
  const d = dims[size];
  const p = color === 'primary';
  const bg = p ? 'fill-brand-200' : 'fill-gray-200';
  const dot = p ? 'fill-brand-100' : 'fill-gray-100';
  const accent = p ? 'fill-brand-300' : 'fill-gray-300';
  const accent2 = p ? 'fill-brand-400' : 'fill-gray-400';
  const grad = `url(#ig${uid})`;
  const shadow = `url(#is${uid})`;
  const ic = icon === null ? null : (icon ?? defaultIcon[type]);

  let object;
  switch (type) {
    case 'cloud':
      object = (
        <g filter={shadow}>
          <path
            d="M63 137a36 36 0 0 1-4.6-71.7A50 50 0 0 1 152 62.6 37.5 37.5 0 1 1 158 137Z"
            fill={grad}
          />
        </g>
      );
      break;
    case 'credit-card':
      object = (
        <g filter={shadow}>
          <rect x="27" y="34" width="166" height="104" rx="7" fill={grad} />
          <rect x="40" y="48" width="29" height="22" rx="2.5" className={accent} />
          <circle cx="158" cy="59" r="12" className={accent2} />
          <circle cx="172" cy="59" r="12" className={accent} fillOpacity="0.9" />
          <rect x="41" y="118" width="138" height="5" rx="2.5" className={accent} />
        </g>
      );
      break;
    case 'documents': {
      const paper = (tr: string) => (
        <g transform={tr} filter={shadow}>
          <path d="M5 0h47.5L68 15.5V89a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5Z" fill={grad} />
          <path d="M52.5 0 68 15.5H57.5a5 5 0 0 1-5-5Z" className={accent} />
        </g>
      );
      object = (
        <>
          {paper('translate(28 42) rotate(-15)')}
          {paper('translate(132 24) rotate(15)')}
          {paper('translate(76 24)')}
        </>
      );
      break;
    }
    case 'box':
      object = (
        <g filter={shadow}>
          <path d="M46 52 110 30l64 22v70l-64 24-64-24Z" className="fill-gray-50" />
          <path d="M46 52 110 74v72l-64-24Z" fill={grad} />
          <path d="M174 52 110 74v72l64-24Z" fill={grad} opacity="0.85" />
          <path d="M46 52 110 74 86 98 22 76Z" className={dot} />
          <path d="M174 52 110 74l24 24 64-22Z" className={p ? 'fill-brand-200' : 'fill-gray-200'} />
        </g>
      );
      break;
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className={cx('relative shrink-0', className)}
      style={{ width: d.w, height: d.h, ...style }}
      {...props}
    >
      <svg width={d.w} height={d.h} viewBox={type === 'box' ? '0 0 220 168' : '0 0 220 160'} fill="none" className="absolute inset-0 overflow-visible">
        <defs>
          <linearGradient id={`ig${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" />
            <stop offset="1" stopColor="var(--color-gray-50)" />
          </linearGradient>
          <filter id={`is${uid}`} x="-30%" y="-30%" width="160%" height="180%">
            <feDropShadow dx="0" dy="8" stdDeviation="4" floodColor="#101828" floodOpacity="0.03" />
            <feDropShadow dx="0" dy="20" stdDeviation="12" floodColor="#101828" floodOpacity="0.08" />
          </filter>
        </defs>
        <circle cx="110" cy="80" r="80" className={bg} />
        <circle cx="26" cy="20" r="8" className={dot} />
        <circle cx="16" cy="132" r="10" className={dot} />
        <circle cx="206" cy="128" r="7" className={dot} />
        <circle cx="194" cy="14" r="10" className={dot} />
        <circle cx="210" cy="40" r="6" className={dot} />
        {object}
      </svg>
      {ic != null && (
        <span
          className={cx(
            'absolute left-1/2 flex -translate-x-1/2 items-center justify-center rounded-full text-white backdrop-blur-[4px]',
            p ? 'bg-brand-700/40' : 'bg-gray-700/40',
          )}
          style={{ width: d.icon, height: d.icon, top: `${type === 'documents' ? 52 : 50}%` }}
        >
          {renderIcon(ic, size === 'sm' ? 'size-6' : 'size-7')}
        </span>
      )}
    </div>
  );
});
