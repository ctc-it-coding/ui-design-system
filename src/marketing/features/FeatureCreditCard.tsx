import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { PaymentIcon } from '../../components/misc-icons/PaymentIcon';

export type FeatureCreditCardTheme = 'brand-dark' | 'brand-light-gradient' | 'brand-light' | 'gray-light' | 'transparent' | 'transparent-gradient';

export interface FeatureCreditCardProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Theme */
  theme?: FeatureCreditCardTheme;
  /** Brand name printed top-left (Figma "Tinicorn."). */
  company?: ReactNode;
  cardholder?: ReactNode;
  number?: ReactNode;
  expiry?: ReactNode;
}

const themes: Record<FeatureCreditCardTheme, { box: string; text: string }> = {
  'brand-dark': { box: 'bg-gradient-to-tr from-brand-950 via-brand-800 to-brand-700', text: 'text-white' },
  'brand-light-gradient': { box: 'bg-gradient-to-tr from-brand-800 to-brand-500', text: 'text-white' },
  'brand-light': { box: 'bg-brand-100/80', text: 'text-gray-900' },
  'gray-light': { box: 'bg-gray-100/80', text: 'text-gray-900' },
  transparent: { box: 'bg-gradient-to-br from-gray-500/40 to-gray-400/20 backdrop-blur-md [text-shadow:0_1px_2px_rgb(0_0_0/0.2)]', text: 'text-white' },
  'transparent-gradient': {
    box: 'bg-gradient-to-br from-brand-300/50 via-brand-400/30 to-brand-500/20 backdrop-blur-md [text-shadow:0_1px_2px_rgb(0_0_0/0.15)]',
    text: 'text-white',
  },
};

/**
 * FeatureCreditCard — Figma "Credit card mockup" (316×190, 20px radius, scales with its width via container queries).
 * Pass `className="w-[375px]"` etc. to size it.
 */
export const FeatureCreditCard = forwardRef<HTMLDivElement, FeatureCreditCardProps>(function FeatureCreditCard(
  {
    theme = 'brand-dark',
    company = 'Tinicorn.',
    cardholder = 'OLIVIA RHYE',
    number = '1234 1234 1234 1234',
    expiry = '06/28',
    className,
    ...props
  },
  ref,
) {
  const t = themes[theme];
  return (
    <div
      ref={ref}
      className={cx(
        'relative aspect-[316/190] w-[316px] overflow-hidden rounded-[6.3%/10.5%] shadow-[0_10px_16px_0_rgb(0_0_0/0.05)] ring-1 ring-inset ring-white/30 @container',
        t.box,
        t.text,
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 flex flex-col justify-between p-[6.3cqw]">
        <div className="flex items-start justify-between">
          <span className="text-[5.1cqw] font-semibold leading-none">{company}</span>
          {/* PayPass */}
          <svg viewBox="0 0 20 24" className="w-[6.3cqw]" fill="none" aria-hidden>
            <path d="M2 4.5C4.5 9 4.5 15 2 19.5M7 2.5C10.5 8.5 10.5 15.5 7 21.5M12 1C16.5 8 16.5 16 12 23" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex items-end justify-between gap-[3cqw]">
          <div className="flex min-w-0 flex-col gap-[2.5cqw]">
            <span className="truncate text-[3.8cqw] font-semibold uppercase leading-none tracking-wider">{cardholder}</span>
            <div className="flex items-end gap-[3cqw]">
              <span className="whitespace-nowrap text-[5.1cqw] font-semibold leading-none tracking-wider">{number}</span>
              <span className="text-[3.8cqw] font-semibold leading-none">{expiry}</span>
            </div>
          </div>
          <PaymentIcon method="mastercard" size="md" title="" className="h-auto w-[14.3cqw] shrink-0 rounded-[4px]" />
        </div>
      </div>
    </div>
  );
});
