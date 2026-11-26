import type { SVGAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface PlaceholderScreenProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Dark UI colors */
  dark?: boolean;
  /** 'desktop' = 3:2 dashboard (sidebar, header, metrics, chart, table); 'mobile' = 375×812 phone app */
  layout?: 'desktop' | 'mobile';
}

/**
 * Neutral placeholder app screen used inside the device mockups when no screen content is given.
 * Pure SVG so it scales to any mockup size.
 */
export function PlaceholderScreen({ dark = false, layout = 'desktop', className, ...props }: PlaceholderScreenProps) {
  const c = dark
    ? { bg: 'fill-gray-950', panel: 'fill-gray-900', line: 'fill-gray-800', soft: 'fill-gray-700', strong: 'fill-gray-500', brand: 'fill-brand-500', brandSoft: 'fill-brand-500/20', stroke: 'stroke-gray-800' }
    : { bg: 'fill-white', panel: 'fill-gray-50', line: 'fill-gray-200', soft: 'fill-gray-200', strong: 'fill-gray-400', brand: 'fill-brand-600', brandSoft: 'fill-brand-600/12', stroke: 'stroke-gray-200' };
  if (layout === 'mobile') {
    return (
      <svg viewBox="0 0 375 812" preserveAspectRatio="xMidYMin slice" aria-hidden className={cx('block size-full', className)} {...props}>
        <rect width="375" height="812" className={c.bg} />
        <rect x="16" y="64" width="32" height="32" rx="8" className={c.brand} />
        <rect x="319" y="64" width="40" height="40" rx="20" className={c.soft} />
        <rect x="16" y="128" width="180" height="20" rx="6" className={c.strong} />
        <rect x="16" y="158" width="260" height="12" rx="6" className={c.soft} />
        <rect x="16" y="196" width="343" height="44" rx="8" fill="none" strokeWidth="1" className={c.stroke} />
        <rect x="32" y="214" width="120" height="8" rx="4" className={c.soft} />
        {[0, 1].map((i) => (
          <g key={i} transform={`translate(${16 + i * 179} 264)`}>
            <rect width="164" height="116" rx="12" className={c.panel} />
            <rect x="16" y="16" width="80" height="10" rx="5" className={c.soft} />
            <rect x="16" y="40" width="96" height="24" rx="6" className={c.strong} />
            <rect x="16" y="84" width="56" height="12" rx="6" className={c.brandSoft} />
          </g>
        ))}
        <rect x="16" y="404" width="343" height="200" rx="12" className={c.panel} />
        <path d="M32 560 C 80 520, 110 540, 150 500 S 230 470, 270 480 S 330 440, 343 430 L343 588 L32 588Z" className={c.brandSoft} />
        <path d="M32 560 C 80 520, 110 540, 150 500 S 230 470, 270 480 S 330 440, 343 430" fill="none" strokeWidth="2.5" className={dark ? 'stroke-brand-500' : 'stroke-brand-600'} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(16 ${628 + i * 60})`}>
            <rect width="40" height="40" rx="20" className={c.soft} />
            <rect x="52" y="6" width="150" height="10" rx="5" className={c.strong} />
            <rect x="52" y="24" width="100" height="8" rx="4" className={c.soft} />
            <rect x="291" y="12" width="52" height="16" rx="8" className={c.brandSoft} />
          </g>
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMin slice" aria-hidden className={cx('block size-full', className)} {...props}>
      <rect width="1200" height="800" className={c.bg} />
      {/* sidebar */}
      <rect width="240" height="800" className={c.panel} />
      <rect x="239" width="1" height="800" className={c.line} />
      <rect x="24" y="28" width="28" height="28" rx="8" className={c.brand} />
      <rect x="62" y="36" width="96" height="12" rx="6" className={c.strong} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <g key={i} transform={`translate(16 ${92 + i * 44})`}>
          {i === 0 && <rect width="208" height="36" rx="6" className={c.line} />}
          <rect x="12" y="10" width="16" height="16" rx="4" className={c.soft} />
          <rect x="40" y="13" width={110 - (i % 3) * 18} height="10" rx="5" className={i === 0 ? c.strong : c.soft} />
        </g>
      ))}
      <rect x="16" y="696" width="208" height="80" rx="8" className={c.line} />
      {/* header */}
      <rect x="280" y="40" width="260" height="22" rx="6" className={c.strong} />
      <rect x="280" y="74" width="380" height="12" rx="6" className={c.soft} />
      <rect x="1024" y="44" width="136" height="40" rx="8" className={c.brand} />
      <rect x="896" y="44" width="116" height="40" rx="8" fill="none" strokeWidth="1" className={c.stroke} />
      {/* metrics */}
      {[0, 1, 2].map((i) => (
        <g key={i} transform={`translate(${280 + i * 300} 120)`}>
          <rect width="280" height="132" rx="12" fill="none" strokeWidth="1" className={c.stroke} />
          <rect x="24" y="24" width="110" height="12" rx="6" className={c.soft} />
          <rect x="24" y="56" width="120" height="30" rx="6" className={c.strong} />
          <rect x="24" y="100" width="64" height="14" rx="7" className={c.brandSoft} />
          <path d={`M164 104 L184 ${90 - i * 6} L204 96 L224 ${78 + i * 4} L256 ${66 - i * 4}`} fill="none" strokeWidth="2.5" strokeLinecap="round" className={dark ? 'stroke-brand-500' : 'stroke-brand-600'} />
        </g>
      ))}
      {/* chart */}
      <rect x="280" y="276" width="880" height="248" rx="12" fill="none" strokeWidth="1" className={c.stroke} />
      <rect x="304" y="300" width="150" height="14" rx="7" className={c.strong} />
      {[0, 1, 2, 3].map((i) => <rect key={i} x="304" y={348 + i * 40} width="832" height="1" className={c.line} />)}
      <path d="M304 480 C 380 440, 420 470, 500 430 S 640 380, 720 400 S 860 350, 940 360 S 1080 320, 1136 330 L1136 500 L304 500Z" className={c.brandSoft} />
      <path d="M304 480 C 380 440, 420 470, 500 430 S 640 380, 720 400 S 860 350, 940 360 S 1080 320, 1136 330" fill="none" strokeWidth="3" className={dark ? 'stroke-brand-500' : 'stroke-brand-600'} />
      {/* table */}
      <rect x="280" y="548" width="880" height="252" rx="12" fill="none" strokeWidth="1" className={c.stroke} />
      <rect x="281" y="549" width="878" height="44" rx="11" className={c.panel} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(304 ${608 + i * 52})`}>
          <rect width="32" height="32" rx="16" className={c.soft} />
          <rect x="44" y="6" width="140" height="10" rx="5" className={c.strong} />
          <rect x="44" y="22" width="96" height="8" rx="4" className={c.soft} />
          <rect x="320" y="10" width="120" height="10" rx="5" className={c.soft} />
          <rect x="560" y="8" width="64" height="16" rx="8" className={c.brandSoft} />
          <rect x="720" y="10" width="100" height="10" rx="5" className={c.soft} />
        </g>
      ))}
    </svg>
  );
}
