import { useScopedSvg } from '../../utils/scopeSvgIds';
import { forwardRef, useId, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { creditCardData, creditCardLines, type CreditCardTheme } from './data/creditCard.data';

export type { CreditCardTheme };

export interface CreditCardMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Theme (17 themes; "*-vertical" themes have a vertical strip) */
  theme?: CreditCardTheme;
  /** Figma: Lines — decorative contour lines overlay */
  lines?: boolean;
  /** Company / bank name in the top-left corner (Figma "Tinicorn.") */
  company?: string;
  cardHolder?: string;
  cardNumber?: string;
  expiry?: string;
  /** Rendered width in px (Figma 316); height keeps the 316:190 ratio. Use className="w-full" for fluid. */
  width?: number;
}

export const creditCardThemes = Object.keys(creditCardData) as CreditCardTheme[];

/** CreditCardMockup — Figma "Credit card mockup" (316×190, r20, Mastercard + contactless icon). Scales as one SVG. */
export const CreditCardMockup = forwardRef<HTMLDivElement, CreditCardMockupProps>(function CreditCardMockup(
  { theme = 'brand-dark', lines = false, company = 'Tinicorn.', cardHolder = 'OLIVIA RHYE', cardNumber = '1234 1234 1234 1234', expiry = '06/24', width = 316, className, style, ...props },
  ref,
) {
  const d = creditCardData[theme];
  const id = useId().replace(/:/g, '');
  const body = useScopedSvg(d.body);
  const t = d.text;
  const mono = "Manrope, Inter, ui-sans-serif, system-ui, sans-serif";
  return (
    <div
      ref={ref}
      className={cx('relative aspect-[316/190] shrink-0 self-start overflow-hidden rounded-[6.33%/10.5%] shadow-[8px_10px_16px_rgb(0_0_0/0.05)]', d.blur && 'backdrop-blur-md', className)}
      style={{ width, ...style }}
      {...props}
    >
      <svg viewBox="0 0 316 190" className="absolute inset-0 size-full" role="img" aria-label={`${company} card ending ${cardNumber.slice(-4)}`}>
        <defs>
          <clipPath id={`cc${id}`}><rect width="316" height="190" rx="20" /></clipPath>
        </defs>
        <g clipPath={`url(#cc${id})`}>
          <g dangerouslySetInnerHTML={{ __html: body }} />
          {lines && (
            <g
              transform={`translate(${creditCardLines.x} ${creditCardLines.y})`}
              opacity={creditCardLines.op}
              color="#ffffff"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              dangerouslySetInnerHTML={{ __html: creditCardLines.body }}
            />
          )}
          <text x={t.brand.x} y={t.brand.y} fill={t.brand.fill} fontFamily="Inter, ui-sans-serif, system-ui, sans-serif" fontWeight={600} fontSize={16}>{company}</text>
          <text x={t.holder.x} y={t.holder.y} fill={t.holder.fill} fontFamily={mono} fontWeight={600} fontSize={12} letterSpacing={0.6}>{cardHolder}</text>
          <text x={t.expiry.x} y={t.expiry.y} fill={t.expiry.fill} fontFamily={mono} fontWeight={600} fontSize={12} letterSpacing={0.6} textAnchor="end">{expiry}</text>
          <text x={t.number.x} y={t.number.y} fill={t.number.fill} fontFamily={mono} fontWeight={600} fontSize={16} letterSpacing={2.4}>{cardNumber}</text>
        </g>
      </svg>
    </div>
  );
});
