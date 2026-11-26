import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/badges/Badge';
import { Slider, type SliderValue } from '../../components/sliders/Slider';
import { Toggle } from '../../components/toggles/Toggle';
import { Container, MarketingSection } from '../_shared';
import { PricingTierCard, type PricingBilling, type PricingTierCardType } from './PricingTierCard';
import { PricingTable } from './PricingTable';
import { PricingBillingTabs, PricingHeading, useBilling, type PricingHeadingColor } from './_parts';
import {
  badgeTiers,
  bannerTiers,
  billedAnnuallyTiers,
  callOutTiers,
  dualActionTiers,
  dualCheckTiers,
  iconOffsetTiers,
  type PricingTableSectionData,
  type PricingTier,
} from './defaults';

/** Figma "Pricing page header" → Type. (`primary-dark-badge-group` is the Mobile name of `brand-badge-group`.) */
export type PricingPageHeaderType =
  | 'simple-icon'
  | 'simple-call-out'
  | 'simple-icon-offset'
  | 'gray-badge'
  | 'simple-dual-check-items'
  | 'large-table-01'
  | 'simple-banner'
  | 'primary-card-icon'
  | 'simple-accent-line'
  | 'primary-card-simple'
  | 'large-table-02'
  | 'simple-dual-action'
  | 'brand-badge-group'
  | 'primary-dark-badge-group'
  | 'abstract-angles';

/** All `PricingPageHeader` types (Figma order, without the mobile-only alias). */
export const pricingPageHeaderTypes: PricingPageHeaderType[] = [
  'simple-icon', 'simple-call-out', 'simple-icon-offset', 'gray-badge', 'simple-dual-check-items', 'large-table-01', 'simple-banner',
  'primary-card-icon', 'simple-accent-line', 'primary-card-simple', 'large-table-02', 'simple-dual-action', 'brand-badge-group', 'abstract-angles',
];

export interface PricingPageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: PricingPageHeaderType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Plans (cards or table columns). */
  tiers?: PricingTier[];
  /** Comparison rows (Large table types). */
  tableSections?: PricingTableSectionData[];
  /** Billing period (controlled). Switched by the header tabs / toggle. */
  billing?: PricingBilling;
  defaultBilling?: PricingBilling;
  onBillingChange?: (billing: PricingBilling) => void;
  /** Header actions (Actions=Buttons types). Defaults to "Chat to sales" + "Get started". */
  actions?: ReactNode;
  /** Badge after "Annual billing" in the tabs. */
  annualBadge?: ReactNode;
  /** Large table 02 — users slider value. */
  sliderValue?: SliderValue;
  onSliderChange?: (v: SliderValue) => void;
}

type HeaderActions = 'none' | 'buttons' | 'tabs' | 'toggle';
interface Cfg {
  card?: PricingTierCardType;
  tiers?: PricingTier[];
  align: 'left' | 'center';
  actions: HeaderActions;
  color?: PricingHeadingColor;
  sub?: string | null;
  title: string;
  text: string;
  badge?: string;
}
const SIMPLE = 'Simple, transparent pricing';
const SCALE = 'Plans that fit your scale';
const PLANS = 'Pricing plans';
const BELIEVE = 'We believe Tinicorn should be accessible to all companies, no matter the size.';
const GROWS = 'Simple, transparent pricing that grows with you. Try any plan free for 30 days.';

const cfg: Record<PricingPageHeaderType, Cfg> = {
  'simple-icon': { card: 'icon', tiers: billedAnnuallyTiers, align: 'left', actions: 'none', title: SIMPLE, text: BELIEVE },
  'simple-call-out': { card: 'call-out', tiers: callOutTiers, align: 'left', actions: 'none', title: SIMPLE, text: BELIEVE },
  'simple-icon-offset': { card: 'icon-offset', tiers: iconOffsetTiers, align: 'center', actions: 'buttons', title: SCALE, text: GROWS },
  'gray-badge': { card: 'badge', tiers: badgeTiers, align: 'center', actions: 'buttons', color: 'gray', title: SIMPLE, text: BELIEVE },
  'simple-dual-check-items': { card: 'dual-check-items', tiers: dualCheckTiers, align: 'center', actions: 'tabs', title: SCALE, text: GROWS, badge: 'Save 20%' },
  'large-table-01': { align: 'center', actions: 'tabs', title: 'Compare our plans and find yours', text: GROWS },
  'simple-banner': {
    card: 'banner',
    tiers: bannerTiers.map((t) => ({ ...t, secondaryLabel: 'Chat to sales' })),
    align: 'center',
    actions: 'tabs',
    sub: null,
    title: PLANS,
    text: GROWS,
  },
  'primary-card-icon': { card: 'primary-card-icon', tiers: billedAnnuallyTiers, align: 'center', actions: 'tabs', sub: null, title: PLANS, text: GROWS },
  'simple-accent-line': { card: 'badge', tiers: badgeTiers, align: 'center', actions: 'tabs', sub: null, title: PLANS, text: GROWS, badge: 'Save 20%' },
  'primary-card-simple': { card: 'primary-card-simple', tiers: billedAnnuallyTiers, align: 'left', actions: 'none', title: SIMPLE, text: BELIEVE },
  'large-table-02': { align: 'left', actions: 'tabs', title: SIMPLE, text: BELIEVE },
  'simple-dual-action': {
    card: 'dual-action',
    tiers: [
      { ...dualActionTiers[0], featuresDescription: 'Everything in our free plan plus....' },
      { ...dualActionTiers[1], description: 'Growing teams up to 20 users.' },
      { ...dualActionTiers[2], description: 'Advanced features + unlimited users.' },
    ],
    align: 'center',
    actions: 'tabs',
    title: SIMPLE,
    text: BELIEVE,
  },
  'brand-badge-group': {
    card: 'badge-group',
    tiers: badgeTiers.map((t) => ({ ...t, badge: 'Most popular' })),
    align: 'center',
    actions: 'tabs',
    color: 'brand',
    sub: null,
    title: PLANS,
    text: GROWS,
  },
  'primary-dark-badge-group': {
    card: 'badge-group',
    tiers: badgeTiers.map((t) => ({ ...t, badge: 'Most popular' })),
    align: 'center',
    actions: 'tabs',
    color: 'brand',
    sub: null,
    title: PLANS,
    text: GROWS,
  },
  'abstract-angles': { card: 'icon', tiers: billedAnnuallyTiers, align: 'center', actions: 'toggle', sub: 'Pricing plans', title: 'Plans for all sizes', text: GROWS },
};

/** Decorative angled bands at the bottom of the "Abstract angles" header (brand-100…300). */
function AbstractAngles() {
  return (
    <svg aria-hidden viewBox="0 0 1440 96" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full md:h-24">
      <polygon points="0,52 300,22 560,96 0,96" className="fill-brand-100" />
      <polygon points="0,78 220,50 430,96 0,96" className="fill-brand-300" />
      <polygon points="900,96 1180,30 1440,58 1440,96" className="fill-brand-100" />
      <polygon points="1010,96 1260,14 1440,40 1440,96" className="fill-brand-200" />
      <polygon points="1140,96 1330,46 1440,70 1440,96" className="fill-brand-300" />
    </svg>
  );
}

/**
 * PricingPageHeader — Figma "Pricing page header": a pricing "Header section" (with monthly/annual tabs, buttons or a
 * toggle) followed by tier cards or a comparison table. The billing switch updates the card prices.
 */
export const PricingPageHeader = forwardRef<HTMLElement, PricingPageHeaderProps>(function PricingPageHeader(
  {
    type = 'simple-icon',
    subheading,
    title,
    supportingText,
    tiers,
    tableSections,
    billing: billingProp,
    defaultBilling,
    onBillingChange,
    actions,
    annualBadge,
    sliderValue,
    onSliderChange,
    className,
    ...props
  },
  ref,
) {
  const c = cfg[type];
  const [billing, setBilling] = useBilling(billingProp, defaultBilling, onBillingChange);
  const list = tiers ?? c.tiers ?? [];
  const sub = subheading !== undefined ? subheading : c.sub === null ? undefined : c.sub ?? 'Pricing';
  const overlap = type === 'gray-badge' || type === 'brand-badge-group' || type === 'primary-dark-badge-group';
  const headerBg = c.color === 'gray' ? 'bg-gray-50' : c.color === 'brand' ? 'bg-brand-800' : type === 'abstract-angles' ? 'bg-brand-50' : 'bg-white';

  /* ---------------- header ---------------- */
  let headerActions: ReactNode = null;
  if (c.actions === 'buttons') {
    headerActions = actions ?? (
      <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
        <Button size="xl" hierarchy="secondary-gray">Chat to sales</Button>
        <Button size="xl">Get started</Button>
      </div>
    );
  } else if (c.actions === 'tabs') {
    headerActions = <PricingBillingTabs value={billing} onChange={setBilling} annualBadge={annualBadge ?? c.badge} />;
  } else if (c.actions === 'toggle') {
    headerActions = (
      <Toggle size="md" label="Annual pricing (save 20%)" checked={billing === 'annual'} onChange={(on) => setBilling(on ? 'annual' : 'monthly')} />
    );
  }

  const heading =
    type === 'abstract-angles' ? (
      <div className="flex flex-col items-center text-center">
        <Badge size="lg" color="brand" className="mb-4">{typeof sub === 'string' ? sub : 'Pricing plans'}</Badge>
        <h1 className="text-display-md font-semibold text-brand-900 md:text-display-xl">{title ?? c.title}</h1>
        <p className="mt-4 text-lg text-brand-700 md:mt-6 md:text-xl">{supportingText ?? c.text}</p>
      </div>
    ) : (
      <PricingHeading subheading={sub} title={title ?? c.title} supportingText={supportingText ?? c.text} align={c.align} size="xl" color={c.color} />
    );

  const header = (
    <div
      className={cx(
        'relative w-full',
        headerBg,
        type === 'abstract-angles' ? 'pb-16 pt-16 md:pb-24 md:pt-24' : overlap ? 'pb-32 pt-16 md:pb-40 md:pt-24' : type === 'large-table-02' ? 'pb-8 pt-16 md:pt-24' : 'py-16 md:py-24',
        type === 'gray-badge' && 'md:pb-48',
      )}
    >
      <Container className={cx('flex flex-col gap-8 md:gap-12', c.align === 'center' && 'items-center')}>
        {heading}
        {headerActions}
      </Container>
      {type === 'abstract-angles' && <AbstractAngles />}
    </div>
  );

  /* ---------------- body ---------------- */
  let body: ReactNode;
  if (type === 'large-table-01' || type === 'large-table-02') {
    const v = type === 'large-table-01' ? '01' : '02';
    body = (
      <>
        {v === '02' && (
          <Container className="pb-4">
            <Slider
              label="bottom"
              min={1}
              max={23}
              defaultValue={sliderValue === undefined ? [1, 12] : undefined}
              value={sliderValue}
              onChange={onSliderChange}
              formatLabel={(n) => `${n} ${n === 1 ? 'user' : 'users'}`}
              thumbLabels={['Minimum users', 'Maximum users']}
            />
          </Container>
        )}
        <div className={cx('w-full pb-16 md:pb-24', v === '02' && 'pt-16 md:pt-24')}>
          <PricingTable variant={v} plans={tiers} sections={tableSections} billing={billing} />
        </div>
      </>
    );
  } else if (type === 'simple-accent-line') {
    body = (
      <Container className="pb-16 md:pb-24">
        <div className="overflow-hidden bg-white shadow-lg">
          <div className="h-2 bg-brand-600" />
          <div className="flex flex-col border-x border-b border-gray-200 lg:flex-row">
            {list.map((t, i) => (
              <div key={i} className={cx('flex flex-1', i > 0 && 'border-t border-gray-200 lg:border-t-0')}>
                {i > 0 && <div className="hidden py-10 lg:block"><div className="h-full w-px bg-gray-200" /></div>}
                <PricingTierCard type="badge" bare billing={billing} className="flex-1" {...t} badge={t.badge ?? ""} highlighted={!!t.highlighted} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    );
  } else {
    const twoCol = c.card === 'dual-check-items';
    body = (
      <Container className={cx('relative pb-16 md:pb-24', overlap && '-mt-16 md:-mt-24')}>
        <div
          className={cx(
            'grid gap-4 md:gap-8',
            c.card === 'icon-offset' && 'gap-12',
            twoCol ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
            c.card === 'banner' && 'lg:items-end',
          )}
        >
          {list.map((t, i) => (
            <PricingTierCard key={i} type={c.card} billing={billing} {...t} badge={t.badge ?? ""} highlighted={!!t.highlighted} />
          ))}
        </div>
      </Container>
    );
  }

  return (
    <MarketingSection ref={ref} as="header" spacing="none" data-type={type} className={cx('bg-white', className)} {...props}>
      {header}
      {body}
    </MarketingSection>
  );
});
