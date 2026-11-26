import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Container, MarketingSection } from '../_shared';
import { PricingTierCard, type PricingBilling, type PricingTierCardType } from './PricingTierCard';
import { PricingFeatureText, PricingHeading } from './_parts';
import {
  billedAnnuallyTiers,
  callOutTiers,
  dualActionTiers,
  dualCheckTiers,
  iconOffsetTiers,
  pricingFeatures,
  type PricingFeature,
  type PricingTier,
} from './defaults';

/** Figma "Pricing section" → Type. */
export type PricingSectionType =
  | 'simple-cards-01'
  | 'simple-cards-02'
  | 'simple-cards-03'
  | 'simple-cards-04'
  | 'featured-cards-01'
  | 'featured-cards-02'
  | 'featured-cards-03'
  | 'featured-cards-04';

/** All `PricingSection` types (Figma order). */
export const pricingSectionTypes: PricingSectionType[] = [
  'simple-cards-01', 'simple-cards-02', 'simple-cards-03', 'simple-cards-04',
  'featured-cards-01', 'featured-cards-02', 'featured-cards-03', 'featured-cards-04',
];

export interface PricingSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: PricingSectionType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Plans shown as `_Pricing tier card`s. */
  tiers?: PricingTier[];
  /** Feature list next to the card (Featured cards 04). */
  features?: PricingFeature[];
  /** Which price to show on the cards. */
  billing?: PricingBilling;
}

const SIMPLE = 'Simple, transparent pricing';
const SCALE = 'Plans that fit your scale';
const BELIEVE = 'We believe Tinicorn should be accessible to all companies, no matter the size.';
const GROWS = 'Simple, transparent pricing that grows with you. Try any plan free for 30 days.';

const config: Record<PricingSectionType, { card: PricingTierCardType; tiers: PricingTier[]; sub: string; title: string; text: string }> = {
  'simple-cards-01': { card: 'icon', tiers: billedAnnuallyTiers, sub: 'Pricing', title: SIMPLE, text: BELIEVE },
  'simple-cards-02': { card: 'call-out', tiers: callOutTiers, sub: 'Pricing', title: SIMPLE, text: BELIEVE },
  'simple-cards-03': { card: 'dual-action', tiers: dualActionTiers, sub: 'Pricing', title: SCALE, text: GROWS },
  'simple-cards-04': { card: 'dual-check-items', tiers: dualCheckTiers, sub: 'Pricing', title: SCALE, text: GROWS },
  'featured-cards-01': { card: 'icon', tiers: billedAnnuallyTiers.slice(0, 2), sub: 'Upgrade', title: 'Pricing plans that scale', text: GROWS },
  'featured-cards-02': { card: 'call-out', tiers: callOutTiers.slice(0, 2), sub: 'Upgrade', title: 'Pricing plans that scale', text: GROWS },
  'featured-cards-03': {
    card: 'icon-offset',
    tiers: iconOffsetTiers.slice(0, 2).map((t) => ({ ...t, description: 'Billed annually.' })),
    sub: 'Upgrade',
    title: 'Pricing plans that scale',
    text: GROWS,
  },
  'featured-cards-04': { card: 'dual-check-items', tiers: [{ ...dualCheckTiers[0], badge: 'Popular' }], sub: 'Upgrade', title: 'Unlock more features', text: GROWS },
};

/**
 * PricingSection — Figma "Pricing section" (8 types). Simple cards = centered/left heading above a row of cards;
 * Featured cards = heading (or feature list) beside two cards.
 */
export const PricingSection = forwardRef<HTMLElement, PricingSectionProps>(function PricingSection(
  { type = 'simple-cards-01', subheading, title, supportingText, tiers, features = pricingFeatures, billing = 'monthly', className, ...props },
  ref,
) {
  const c = config[type];
  const list = tiers ?? c.tiers;
  const sub = subheading ?? c.sub;
  const ttl = title ?? c.title;
  const txt = supportingText ?? c.text;
  const cards = (gridCls: string) => (
    <div className={cx('grid gap-4 md:gap-8', c.card === 'icon-offset' && 'gap-12', gridCls)}>
      {list.map((t, i) => (
        <PricingTierCard key={i} type={c.card} billing={billing} {...t} badge={t.badge ?? ""} highlighted={!!t.highlighted} />
      ))}
    </div>
  );

  let body: ReactNode;
  if (type.startsWith('simple-cards')) {
    const center = type === 'simple-cards-03' || type === 'simple-cards-04';
    body = (
      <Container className="flex flex-col gap-12 md:gap-16">
        <PricingHeading subheading={sub} title={ttl} supportingText={txt} align={center ? 'center' : 'left'} />
        {cards(type === 'simple-cards-04' ? 'lg:grid-cols-2' : 'lg:grid-cols-3')}
      </Container>
    );
  } else if (type === 'featured-cards-04') {
    body = (
      <div className="flex flex-col gap-12 md:gap-16">
        <Container>
          <PricingHeading subheading={sub} title={ttl} supportingText={txt} />
        </Container>
        <Container className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-1 flex-col gap-10 md:gap-12">
            {features.map((f, i) => (
              <PricingFeatureText key={i} {...f} />
            ))}
          </div>
          <div className="w-full lg:w-[592px] lg:shrink-0">{cards('')}</div>
        </Container>
      </div>
    );
  } else {
    body = (
      <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <PricingHeading
          subheading={sub}
          title={ttl}
          supportingText={txt}
          size={type === 'featured-cards-01' ? 'lg' : 'sm'}
          className="lg:max-w-[440px] lg:flex-1"
        />
        <div className="w-full lg:w-[712px] lg:shrink-0">{cards('md:grid-cols-2')}</div>
      </Container>
    );
  }

  return (
    <MarketingSection ref={ref} data-type={type} className={cx(className)} {...props}>
      {body}
    </MarketingSection>
  );
});
