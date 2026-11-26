import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowRight } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Tabs } from '../../components/tabs/Tabs';
import type { PricingFeature } from './defaults';
import type { PricingBilling } from './PricingTierCard';

/** Controlled / uncontrolled billing period state. */
export function useBilling(value: PricingBilling | undefined, defaultValue: PricingBilling | undefined, onChange?: (b: PricingBilling) => void) {
  const [inner, setInner] = useState<PricingBilling>(defaultValue ?? 'monthly');
  const billing = value ?? inner;
  const set = (b: PricingBilling) => {
    if (value === undefined) setInner(b);
    onChange?.(b);
  };
  return [billing, set] as const;
}

export interface PricingBillingTabsProps {
  value: PricingBilling;
  onChange: (b: PricingBilling) => void;
  monthlyLabel?: ReactNode;
  annualLabel?: ReactNode;
  /** Badge after the annual label, e.g. "Save 20%". */
  annualBadge?: ReactNode;
  className?: string;
}

/** Monthly / annual switch — Figma "Horizontal tabs" (Button white border, md) inside the pricing Header section. */
export function PricingBillingTabs({ value, onChange, monthlyLabel = 'Monthly billing', annualLabel = 'Annual billing', annualBadge, className }: PricingBillingTabsProps) {
  return (
    <Tabs
      type="button-white-border"
      size="md"
      aria-label="Billing period"
      className={className}
      value={value}
      onChange={(id) => onChange(id as PricingBilling)}
      items={[
        { id: 'monthly', label: monthlyLabel },
        { id: 'annual', label: annualLabel, badge: annualBadge },
      ]}
    />
  );
}

export type PricingHeadingColor = 'default' | 'gray' | 'brand';

/** Heading block used at the top of pricing sections / page headers. */
export function PricingHeading({
  subheading,
  title,
  supportingText,
  align = 'left',
  size = 'md',
  color = 'default',
  className,
  children,
}: {
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'left' | 'center';
  /** sm = 36/44 + 18/28 · md = 36/44 + 20/30 · lg = 48/60 · xl = 60/72 (page headers) */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: PricingHeadingColor;
  className?: string;
  children?: ReactNode;
}) {
  const dark = color === 'brand';
  const titleCls = {
    sm: 'text-display-sm md:text-display-md',
    md: 'text-display-sm md:text-display-md',
    lg: 'text-display-sm md:text-display-lg',
    xl: 'text-display-md md:text-display-xl',
  }[size];
  const textCls = size === 'sm' ? 'text-lg' : 'text-lg md:text-xl';
  return (
    <div className={cx('flex w-full max-w-3xl flex-col', align === 'center' && 'mx-auto items-center text-center', className)}>
      {subheading != null &&
        (typeof subheading === 'string' ? (
          <p className={cx('mb-3 text-sm font-semibold md:text-md', dark ? 'text-brand-200' : 'text-brand-700')}>{subheading}</p>
        ) : (
          <div className="mb-4">{subheading}</div>
        ))}
      {title != null && <h2 className={cx('font-semibold', titleCls, dark ? 'text-white' : 'text-gray-900')}>{title}</h2>}
      {supportingText != null && (
        <div className={cx(size === 'xl' ? 'mt-4 md:mt-6' : 'mt-4 md:mt-5', textCls, dark ? 'text-brand-200' : 'text-gray-600')}>{supportingText}</div>
      )}
      {children}
    </div>
  );
}

/** Figma `_Feature text` (Featured icon left) used in Pricing section "Featured cards 04". */
export function PricingFeatureText({ icon, title, description, linkLabel, href }: PricingFeature) {
  return (
    <div className="flex gap-4">
      <FeaturedIcon icon={icon} size="lg" color="brand" theme="light-outline" className="shrink-0" />
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2 pt-2.5">
          <h3 className="text-lg font-medium text-gray-900 md:text-xl">{title}</h3>
          <p className="text-md text-gray-600">{description}</p>
        </div>
        {linkLabel && (
          <Button hierarchy="link-color" size="lg" iconTrailing={ArrowRight} as={href ? 'a' : 'button'} href={href} className="self-start">
            {linkLabel}
          </Button>
        )}
      </div>
    </div>
  );
}
