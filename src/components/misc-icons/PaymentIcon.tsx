import { forwardRef, type SVGAttributes } from 'react';
import { PAYMENT_ICON_VIEWBOX, paymentIconData, type PaymentMethod } from './data/payment.data';

export type { PaymentMethod };
export type PaymentIconSize = 'sm' | 'md' | 'lg';

export interface PaymentIconProps extends Omit<SVGAttributes<SVGSVGElement>, 'children'> {
  /** Figma: Payment method */
  method: PaymentMethod;
  /** Figma: Size (sm 34×24 · md 46×32 · lg 58×40) */
  size?: PaymentIconSize;
  /** Accessible name; defaults to the method name. Pass `title=""` for decorative use. */
  title?: string;
}

const dims: Record<PaymentIconSize, [number, number]> = { sm: [34, 24], md: [46, 32], lg: [58, 40] };
// Figma: 1px inside border gray-100 on the r6 card
const BORDER = '<rect x="0.5" y="0.5" width="57" height="39" rx="5.5" stroke="#f2f4f7" fill="none"/>';
export const paymentMethods = Object.keys(paymentIconData) as PaymentMethod[];

/** PaymentIcon — Figma "Misc icons/Payment method icon" (card-shaped logo with border). */
export const PaymentIcon = forwardRef<SVGSVGElement, PaymentIconProps>(function PaymentIcon(
  { method, size = 'md', title, className, ...props },
  ref,
) {
  const [w, h] = dims[size];
  const name = title ?? method;
  return (
    <svg
      ref={ref}
      width={w}
      height={h}
      viewBox={PAYMENT_ICON_VIEWBOX}
      preserveAspectRatio="none"
      fill="none"
      role={name ? 'img' : undefined}
      aria-label={name || undefined}
      aria-hidden={name ? undefined : true}
      className={className ? `shrink-0 ${className}` : 'shrink-0'}
      dangerouslySetInnerHTML={{ __html: (name ? `<title>${name}</title>` : '') + paymentIconData[method] + BORDER }}
      {...props}
    />
  );
});
