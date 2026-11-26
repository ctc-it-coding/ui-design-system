import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/badges/Badge';
import { BadgeGroup } from '../../components/badges/BadgeGroup';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { HandDrawnArrow } from '../../components/decorations/HandDrawn';
import { PricingCheckList } from './PricingCheckItem';
import { basicDualFeatures, basicTier, type PricingTier } from './defaults';

/** Figma `_Pricing tier card` → Type. */
export type PricingTierCardType =
  | 'dual-action'
  | 'dual-check-items'
  | 'icon'
  | 'primary-card-icon'
  | 'badge-group'
  | 'badge'
  | 'banner'
  | 'call-out'
  | 'primary-card-simple'
  | 'icon-offset';

export type PricingBilling = 'monthly' | 'annual';

export interface PricingTierCardProps extends Partial<PricingTier>, Omit<HTMLAttributes<HTMLDivElement>, keyof PricingTier | 'children'> {
  /** Figma: Type */
  type?: PricingTierCardType;
  /** Which price to show (`price` or `priceAnnual`). */
  billing?: PricingBilling;
  /** Strip the card's own border/shadow/radius (used inside the joined "Simple accent line" panel). */
  bare?: boolean;
}

/** Figma placeholder copy for a standalone card of each type. */
const cardDefaults: Record<PricingTierCardType, Partial<PricingTier>> = {
  'dual-action': { badge: 'Popular', description: 'Basic features for up to 10 users.', featuresDescription: 'Everything in Starter plus....', features: basicTier.features!.map((f, i) => (i === 0 ? 'Access to basic features' : f)), secondaryLabel: 'Chat to sales' },
  'dual-check-items': { badge: 'Popular', description: 'Our most popular plan for small teams.', featuresDescription: 'Everything in our free plan plus....', features: basicDualFeatures },
  icon: {},
  'primary-card-icon': {},
  'badge-group': { badge: 'Most popular' },
  badge: { secondaryLabel: 'Chat to sales' },
  banner: { description: 'Ideal for small teams and startups.', highlighted: true },
  'call-out': { description: 'Ideal for small teams and startups.', highlighted: true },
  'primary-card-simple': { description: 'Ideal for small teams and startups.' },
  'icon-offset': {},
};

/**
 * PricingTierCard — Figma `_Pricing tier card` (all 10 types). Every text is a prop; omitted props fall back to the
 * Figma "Basic plan" copy. Desktop / mobile spacing is responsive.
 */
export const PricingTierCard = forwardRef<HTMLDivElement, PricingTierCardProps>(function PricingTierCard(
  { type = 'icon', billing = 'monthly', bare = false, className, ...rest },
  ref,
) {
  const {
    name, price, priceAnnual, currency, period, periodShort, description, badge, featuresTitle, featuresDescription, features, icon,
    ctaLabel, ctaHref, onCtaClick, secondaryLabel, secondaryHref, onSecondaryClick, highlighted, highlightLabel, ...props
  } = rest;
  const d: PricingTier = { ...basicTier, ...cardDefaults[type] };
  const v = {
    name: name ?? d.name,
    amount: (billing === 'annual' ? priceAnnual ?? price : price) ?? (billing === 'annual' ? d.priceAnnual ?? d.price : d.price),
    currency: currency ?? '$',
    period: period ?? 'per month',
    periodShort: periodShort ?? '/mth',
    description: description ?? d.description,
    badge: badge ?? d.badge,
    featuresTitle: featuresTitle ?? 'FEATURES',
    featuresDescription: featuresDescription ?? d.featuresDescription,
    features: features ?? d.features ?? [],
    icon: icon ?? d.icon,
    highlighted: highlighted ?? d.highlighted,
    secondaryLabel: secondaryLabel ?? d.secondaryLabel,
  };
  const compactPrice = `${v.currency}${v.amount}${v.periodShort}`;

  const actions = (withSecondary = !!v.secondaryLabel) => (
    <div className="flex flex-col gap-3">
      <Button size="xl" className="w-full" as={ctaHref ? 'a' : 'button'} href={ctaHref} onClick={onCtaClick}>
        {ctaLabel ?? 'Get started'}
      </Button>
      {withSecondary && (
        <Button size="xl" hierarchy="secondary-gray" className="w-full" as={secondaryHref ? 'a' : 'button'} href={secondaryHref} onClick={onSecondaryClick}>
          {v.secondaryLabel}
        </Button>
      )}
    </div>
  );
  const footer = (cls?: string) => <div className={cx('mt-auto px-6 pb-8 md:px-8', cls)}>{actions()}</div>;
  const bigPrice = (
    <div className="flex items-end gap-1">
      <span className="text-display-lg font-semibold text-gray-900 md:text-display-xl">
        {v.currency}
        {v.amount}
      </span>
      <span className="pb-[7px] text-md font-medium text-gray-600 md:pb-2">{v.period}</span>
    </div>
  );
  const featureIntro = (
    <div className="flex flex-col gap-1">
      <p className="text-md font-semibold text-gray-900">{v.featuresTitle}</p>
      {v.featuresDescription && <p className="text-md text-gray-600">{v.featuresDescription}</p>}
    </div>
  );
  const centeredHead = (headingCls: string, priceCls: string, textCls: string, top?: ReactNode) => (
    <div className="flex flex-col items-center gap-2 text-center">
      {top}
      <h3 className={cx('text-xl font-semibold', headingCls)}>{v.name}</h3>
      <p className={cx('text-display-md font-semibold md:text-display-lg', priceCls)}>{compactPrice}</p>
      {v.description && <p className={cx('text-md', textCls)}>{v.description}</p>}
    </div>
  );
  const priceFirstHead = (priceCls: string, headingCls: string, textCls: string) => (
    <div className="flex flex-col items-center gap-4 text-center">
      <p className={cx('text-display-md font-semibold md:text-display-lg', priceCls)}>{compactPrice}</p>
      <div className="flex flex-col gap-1">
        <h3 className={cx('text-xl font-semibold', headingCls)}>{v.name}</h3>
        {v.description && <p className={cx('text-md', textCls)}>{v.description}</p>}
      </div>
    </div>
  );

  const card = 'rounded-2xl border border-gray-200 bg-white shadow-lg';
  const root = (cls: string, children: ReactNode) => (
    <div ref={ref} data-type={type} className={cx('relative flex h-full flex-col', cls, className)} {...props}>
      {children}
    </div>
  );

  switch (type) {
    case 'dual-action':
      return root(card, <>
        <div className="flex flex-col gap-8 border-b border-gray-200 px-6 pb-8 pt-6 md:p-8">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <h3 className="text-lg font-medium text-gray-600">{v.name}</h3>
              {v.badge && <Badge size="lg" color="brand">{v.badge}</Badge>}
            </div>
            {bigPrice}
            {v.description && <p className="text-md text-gray-600">{v.description}</p>}
          </div>
          {actions()}
        </div>
        <div className="flex flex-col gap-6 px-6 pb-10 pt-8 md:px-8">
          {featureIntro}
          <PricingCheckList items={v.features} type="line" />
        </div>
      </>);

    case 'dual-check-items':
      return root(card, <>
        <div className="flex flex-col-reverse gap-4 border-b border-gray-200 px-6 pb-8 pt-6 md:flex-row md:items-start md:justify-between md:gap-8 md:px-8 md:pb-6 md:pt-8">
          <div className="flex min-w-0 flex-col gap-1">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold text-gray-900">{v.name}</h3>
              {v.badge && <Badge size="md" color="brand">{v.badge}</Badge>}
            </div>
            {v.description && <p className="text-md text-gray-600">{v.description}</p>}
          </div>
          <div className="flex shrink-0 items-end gap-0.5">
            <span className="pb-2.5 text-display-md font-bold text-gray-900 md:pb-5">{v.currency}</span>
            <span className="text-display-lg font-semibold text-gray-900 md:text-display-xl">{v.amount}</span>
            <span className="pb-[7px] pl-0.5 text-md font-medium text-gray-600 md:pb-2">{v.period}</span>
          </div>
        </div>
        <div className="flex flex-col gap-6 border-b border-gray-200 px-6 py-8 md:px-8 md:pb-10">
          {featureIntro}
          <PricingCheckList items={v.features} type="default" color="success" columns={2} />
        </div>
        <div className="mt-auto p-6 md:p-8">{actions()}</div>
      </>);

    case 'icon':
      return root(card, <>
        <div className="p-6 pt-8 md:p-8">
          {centeredHead('text-brand-700', 'text-gray-900', 'text-gray-600', <FeaturedIcon icon={v.icon} size="lg" color="brand" theme="light" className="mb-2" />)}
        </div>
        <div className="px-6 pb-10 pt-8 md:px-8">
          <PricingCheckList items={v.features} type="default" />
        </div>
        <div className="mt-auto border-t border-gray-200 bg-gray-50 p-6 md:p-8 rounded-b-2xl">{actions()}</div>
      </>);

    case 'primary-card-icon':
      return root(cx('bg-brand-50', !bare && 'rounded-2xl'), <>
        <div className="p-6 pt-8 md:p-8">
          {centeredHead('text-brand-700', 'text-brand-900', 'text-brand-700', <FeaturedIcon icon={v.icon} size="lg" color="brand" theme="light" className="mb-2" />)}
        </div>
        <div className="px-6 pb-10 pt-8 md:px-8">
          <PricingCheckList items={v.features} type="line" textClassName="text-brand-700" />
        </div>
        {footer()}
      </>);

    case 'badge-group':
      return root(card, <>
        <div className="flex flex-col items-center gap-6 p-6 pt-8 text-center md:p-8">
          <BadgeGroup static size="lg" color="brand" theme="modern" badge={v.name} icon={null}>
            {v.badge}
          </BadgeGroup>
          <div className="flex flex-col gap-2">
            <p className="text-display-md font-semibold text-gray-900 md:text-display-lg">{compactPrice}</p>
            {v.description && <p className="text-md text-gray-600">{v.description}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-8 px-6 md:px-8">
          <hr className="border-gray-200" />
          <PricingCheckList items={v.features} type="line" />
          <hr className="border-gray-200" />
        </div>
        <div className="mt-auto p-6 md:p-8">{actions()}</div>
      </>);

    case 'badge':
      return root(bare ? 'bg-white' : card, <>
        <div className="flex flex-col gap-8 px-6 pb-8 pt-10 md:px-8">
          <div className="flex flex-col items-center gap-4 text-center">
            <Badge size="lg" color="brand">{v.name}</Badge>
            <div className="flex flex-col gap-2">
              <p className="text-display-md font-semibold text-gray-900 md:text-display-lg">{compactPrice}</p>
              {v.description && <p className="text-md text-gray-600">{v.description}</p>}
            </div>
          </div>
          {actions()}
        </div>
        <div className="flex flex-col gap-8 px-6 pb-10 md:px-8">
          <hr className="border-gray-200" />
          <PricingCheckList items={v.features} type="line" color="success" />
        </div>
      </>);

    case 'banner':
      return root(cx('rounded-2xl bg-white shadow-lg', !v.highlighted && 'border border-gray-200'), <>
        {v.highlighted && (
          <div className="rounded-t-2xl bg-brand-600 px-2 py-3 text-center text-sm font-medium text-white">{highlightLabel ?? 'Most popular plan'}</div>
        )}
        <div className={cx('flex flex-1 flex-col', v.highlighted && 'rounded-b-2xl border-x border-b border-gray-200')}>
          <div className="p-6 pt-8 md:p-8">{priceFirstHead('text-gray-900', 'text-gray-900', 'text-gray-600')}</div>
          <div className="px-6 pb-10 pt-2 md:px-8 md:pt-8">
            <PricingCheckList items={v.features} type="line" color="success" />
          </div>
          {footer()}
        </div>
      </>);

    case 'call-out':
      return root(card, <>
        <div className="relative px-6 pb-4 pt-10 md:px-8 md:pb-10">
          {priceFirstHead('text-gray-900', 'text-gray-900', 'text-gray-600')}
          {v.highlighted && (
            <div className="pointer-events-none absolute -top-8 right-2 flex items-start gap-1 md:-right-16" aria-hidden={false}>
              <HandDrawnArrow variant="36" width={56} className="mt-5 text-gray-400" />
              <span className="whitespace-nowrap text-sm font-medium text-brand-700">{highlightLabel ?? 'Most popular!'}</span>
            </div>
          )}
        </div>
        <div className="px-6 pb-10 pt-8 md:px-8">
          <PricingCheckList items={v.features} type="default" color="success" />
        </div>
        {footer()}
      </>);

    case 'primary-card-simple':
      return root(cx('bg-brand-50', !bare && 'rounded-2xl'), <>
        <div className="px-6 pb-4 pt-10 md:px-8 md:pb-10">{priceFirstHead('text-brand-900', 'text-brand-900', 'text-brand-700')}</div>
        <div className="px-6 pb-10 pt-8 md:px-8">
          <PricingCheckList items={v.features} type="filled" textClassName="text-brand-700" />
        </div>
        {footer()}
      </>);

    case 'icon-offset':
      return root('rounded-lg bg-gray-50', <>
        <FeaturedIcon icon={v.icon} size="lg" color="brand" theme="modern" className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2" />
        <div className="px-6 pb-4 pt-12 md:px-8 md:pb-12">{centeredHead('text-gray-900', 'text-gray-900', 'text-gray-600')}</div>
        <div className="px-6 pb-10 pt-8 md:px-8">
          <PricingCheckList items={v.features} type="line" />
        </div>
        {footer()}
      </>);
  }
});
