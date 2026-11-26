import { BarChart12, LayersThree01, LayersTwo01, MessageChatCircle, Zap } from '../../icons';
import type { IconSlot } from '../../utils/renderIcon';

/** One pricing plan, as used by `PricingTierCard`, `PricingSection`, `PricingPageHeader` and `PricingTable`. */
export interface PricingTier {
  /** Plan name, e.g. "Basic plan". */
  name: string;
  /** Monthly price amount without currency, e.g. "10". */
  price: string;
  /** Price amount shown when billing = annual (falls back to `price`). */
  priceAnnual?: string;
  /** Currency symbol. Default "$". */
  currency?: string;
  /** Long period label next to big prices ("per month"). */
  period?: string;
  /** Short suffix used by compact prices ("/mth" → "$10/mth"). */
  periodShort?: string;
  /** Supporting text under the price, e.g. "Billed annually." */
  description?: string;
  /** Pill badge ("Popular") — Dual action / Dual check items / Badge group message. */
  badge?: string;
  /** "FEATURES" eyebrow (Dual action / Dual check items). */
  featuresTitle?: string;
  /** "Everything in Starter plus...." */
  featuresDescription?: string;
  /** Check-list items. */
  features?: string[];
  /** Featured icon (Icon / Primary card icon / Icon offset types). */
  icon?: IconSlot;
  /** Primary CTA label. Default "Get started". */
  ctaLabel?: string;
  ctaHref?: string;
  onCtaClick?: () => void;
  /** Secondary CTA label (Dual action / Badge / Banner). Default "Chat to sales". */
  secondaryLabel?: string;
  secondaryHref?: string;
  onSecondaryClick?: () => void;
  /** Highlighted plan: shows the banner (Banner type) or the "Most popular!" call-out (Call out type). */
  highlighted?: boolean;
  /** Banner / call-out text. Default "Most popular plan" / "Most popular!". */
  highlightLabel?: string;
}

export const basicFeatures = [
  'Access to all basic features',
  'Basic reporting and analytics',
  'Up to 10 individual users',
  '20GB individual data each user',
  'Basic chat and email support',
];
export const businessFeatures = [
  '200+ integrations',
  'Advanced reporting and analytics',
  'Up to 20 individual users',
  '40GB individual data each user',
  'Priority chat and email support',
];
export const enterpriseFeatures = [
  'Advanced custom fields',
  'Audit log and data history',
  'Unlimited individual users',
  'Unlimited individual data',
  'Personalized + priority service',
];
export const basicDualFeatures = [
  'Access to basic features',
  'Attend events',
  'Basic reporting + analytics',
  'Automatic updates',
  'Up to 10 individual users',
  'Backup your account',
  '20GB individual data',
  'Audit log and notes',
  'Basic chat support',
  'Feature requests',
];
export const businessDualFeatures = [
  '200+ integrations',
  'Advanced reporting',
  'Up to 20 individual users',
  '40GB individual data',
  'Priority chat support',
  'Advanced custom fields',
  'Audit log and data history',
  'Personalized service',
  'Feature requests',
  '+ many more...',
];

export const basicTier: PricingTier = {
  name: 'Basic plan',
  price: '10',
  priceAnnual: '8',
  description: 'Our most popular plan.',
  features: basicFeatures,
  icon: Zap,
};
export const businessTier: PricingTier = {
  name: 'Business plan',
  price: '20',
  priceAnnual: '16',
  description: 'Billed annually.',
  features: businessFeatures,
  icon: LayersTwo01,
};
export const enterpriseTier: PricingTier = {
  name: 'Enterprise plan',
  price: '40',
  priceAnnual: '32',
  description: 'Billed annually.',
  features: enterpriseFeatures,
  icon: LayersThree01,
};

const billed = (t: PricingTier): PricingTier => ({ ...t, description: 'Billed annually.' });

/** Three plans with "Billed annually." (Icon, Call out, Primary card types). */
export const billedAnnuallyTiers: PricingTier[] = [billed(basicTier), billed(businessTier), billed(enterpriseTier)];

/** Icon offset / Simple icon offset copy. */
export const iconOffsetTiers: PricingTier[] = [
  { ...basicTier, features: basicFeatures.map((f, i) => (i === 0 ? 'Access to basic features' : f)) },
  { ...businessTier, description: 'Advanced features and reporting.' },
  { ...enterpriseTier, description: 'Unlimited features.' },
];

/** Badge / Badge group copy. */
export const badgeTiers: PricingTier[] = [
  { ...basicTier },
  { ...businessTier, description: 'Growing teams up to 20 users.' },
  { ...enterpriseTier, description: 'Advanced features + unlimited users.' },
];

/** Banner copy (middle plan highlighted). */
export const bannerTiers: PricingTier[] = [
  { ...basicTier, description: 'Ideal for small teams and startups.' },
  { ...businessTier, description: 'Growing teams up to 20 users.', highlighted: true },
  { ...enterpriseTier, description: 'Large teams with unlimited users.' },
];

/** Call out copy (first plan carries the "Most popular!" call-out). */
export const callOutTiers: PricingTier[] = billedAnnuallyTiers.map((t, i) => ({ ...t, highlighted: i === 0 }));

/** Dual action copy. */
export const dualActionTiers: PricingTier[] = [
  { ...basicTier, badge: 'Popular', description: 'Basic features for up to 10 users.', featuresDescription: 'Everything in Starter plus....' },
  { ...businessTier, description: 'Advanced features and reporting.', featuresDescription: 'Everything in Basic plus....' },
  { ...enterpriseTier, description: 'Unlimited features.', featuresDescription: 'Everything in Business plus....' },
];

/** Dual check items copy (2 plans). */
export const dualCheckTiers: PricingTier[] = [
  { ...basicTier, description: 'Our most popular plan for small teams.', featuresDescription: 'Everything in our free plan plus....', features: basicDualFeatures },
  {
    ...businessTier,
    badge: 'Popular',
    description: 'Advanced features and reporting.',
    featuresDescription: 'Everything in our basic plan plus....',
    features: businessDualFeatures,
  },
];

/** `_Feature text` items of Pricing section "Featured cards 04". */
export interface PricingFeature {
  icon: IconSlot;
  title: string;
  description: string;
  linkLabel?: string;
  href?: string;
}
export const pricingFeatures: PricingFeature[] = [
  {
    icon: MessageChatCircle,
    title: 'Share team inboxes',
    description: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
    linkLabel: 'Learn more',
  },
  {
    icon: Zap,
    title: 'Deliver instant answers',
    description: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
    linkLabel: 'Learn more',
  },
  {
    icon: BarChart12,
    title: 'Manage your team with reports',
    description: 'Measure what matters with Tinicorn’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.',
    linkLabel: 'Learn more',
  },
];

/* ------------------------------------------------------------------ */
/* Comparison table (Large table 01 / 02)                               */
/* ------------------------------------------------------------------ */

/** A cell value: `true` = check, `false` = minus (not included), string = text. */
export type PricingTableValue = boolean | string;
export interface PricingTableRow {
  label: string;
  /** Help-icon tooltip text. */
  tooltip?: string;
  /** One value per plan. */
  values: PricingTableValue[];
}
export interface PricingTableSectionData {
  /** Column header ("Overview"); omit for none. */
  title?: string;
  rows: PricingTableRow[];
}

export const pricingTablePlans: PricingTier[] = [
  { ...basicTier, name: 'Basic', badge: 'Popular', description: 'Basic features for up to 10 employees with everything you need.' },
  { ...businessTier, name: 'Business', description: 'Advanced features and reporting, better workflows and automation.' },
  { ...enterpriseTier, name: 'Enterprise', description: 'Personalized service and enterprise security for large teams.' },
];

export const pricingTablePlans02: PricingTier[] = [
  { ...basicTier, description: 'Our most popular plan.' },
  { ...businessTier, description: 'Best for growing teams.' },
  { ...enterpriseTier, description: 'Best for large teams.' },
];

export const pricingTableSections: PricingTableSectionData[] = [
  {
    title: 'Overview',
    rows: [
      { label: 'Basic features', tooltip: 'Core features included in every plan.', values: [true, true, true] },
      { label: 'Users', tooltip: 'Number of team members who can use the product.', values: ['10', '20', 'Unlimited'] },
      { label: 'Individual data', tooltip: 'Storage included for each user.', values: ['20GB', '40GB', 'Unlimited'] },
      { label: 'Support', tooltip: 'Chat and email support.', values: [true, true, true] },
      { label: 'Automated workflows', tooltip: 'Automate repetitive tasks.', values: [false, true, true] },
      { label: '200+ integrations', tooltip: 'Connect the tools you already use.', values: [false, true, true] },
    ],
  },
  {
    title: 'Reporting and analytics',
    rows: [
      { label: 'Analytics', tooltip: 'Dashboards and insights.', values: ['Basic', 'Advanced', 'Advanced'] },
      { label: 'Export reports', tooltip: 'Download reports as CSV or PDF.', values: [true, true, true] },
      { label: 'Scheduled reports', tooltip: 'Send reports automatically.', values: [true, true, true] },
      { label: 'API access', tooltip: 'Programmatic access to your data.', values: [false, true, true] },
      { label: 'Advanced reports', tooltip: 'Custom metrics and breakdowns.', values: [false, true, true] },
      { label: 'Saved reports', tooltip: 'Save and share report views.', values: [false, true, true] },
      { label: 'Customer properties', tooltip: 'Track custom customer attributes.', values: [false, false, true] },
      { label: 'Custom fields', tooltip: 'Add your own fields to records.', values: [false, false, true] },
    ],
  },
  {
    title: 'User access',
    rows: [
      { label: 'SSO/SAML authentication', tooltip: 'Single sign-on with your identity provider.', values: [true, true, true] },
      { label: 'Advanced permissions', tooltip: 'Fine-grained roles and permissions.', values: [false, true, true] },
      { label: 'Audit log', tooltip: 'History of all account activity.', values: [false, false, true] },
      { label: 'Data history', tooltip: 'Restore previous versions of your data.', values: [false, false, true] },
    ],
  },
];

/** Large table 02 has no "Overview" column header. */
export const pricingTableSections02: PricingTableSectionData[] = pricingTableSections.map((s, i) => (i === 0 ? { rows: s.rows } : s));
