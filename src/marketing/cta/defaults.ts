import type { CompanyLogoName } from '../../components/logos/CompanyLogo';

/** Figma "CTA section" → Type (also used by "Newsletter CTA section"). */
export type CTASectionType =
  | 'simple-centered'
  | 'simple-left'
  | 'card-horizontal-split'
  | 'card-horizontal'
  | 'card-vertical'
  | 'simple-logos-01'
  | 'simple-logos-02'
  | 'iphone-mockup-01'
  | 'iphone-mockup-02'
  | 'iphone-mockup-03'
  | 'iphone-mockup-04'
  | 'screen-mockup-01'
  | 'screen-mockup-02'
  | 'screen-mockup-03'
  | 'screen-mockup-04'
  | 'split-image-01'
  | 'split-image-02'
  | 'split-image-03'
  | 'split-image-04'
  | 'abstract-images'
  | 'split-image-quote-01'
  | 'split-image-quote-02'
  | 'split-image-quote-03'
  | 'split-image-quote-04';

export const ctaSectionTypes: CTASectionType[] = [
  'simple-centered', 'simple-left', 'card-horizontal-split', 'card-horizontal', 'card-vertical', 'simple-logos-01', 'simple-logos-02',
  'iphone-mockup-01', 'iphone-mockup-02', 'iphone-mockup-03', 'iphone-mockup-04',
  'screen-mockup-01', 'screen-mockup-02', 'screen-mockup-03', 'screen-mockup-04',
  'split-image-01', 'split-image-02', 'split-image-03', 'split-image-04', 'abstract-images',
  'split-image-quote-01', 'split-image-quote-02', 'split-image-quote-03', 'split-image-quote-04',
];

export interface CTANotification {
  name: string;
  text: string;
  supportingText?: string;
  initials?: string;
  avatarSrc?: string;
}
export interface CTAQuote {
  quote: string;
  name: string;
  role: string;
  company?: string;
  rating?: number;
}
export interface CTACopy {
  subheading?: string;
  title: string;
  supportingText?: string;
  checkItems?: string[];
}

export const ctaNotifications: CTANotification[] = [
  { name: 'Olivia Rhye', text: 'followed you!', supportingText: '@oliviarhye', initials: 'OR' },
  { name: 'Candice Wu', text: 'and 2 other gave you kudos on Clubhouse 101 post', initials: 'CW' },
  { name: 'Phoenix Baker', text: 'joined your team Melbourne Startups Growth', initials: 'PB' },
  { name: 'Lana Steiner', text: 'just launched The 10k users challenge workbook', initials: 'LS' },
];

export const ctaLogos01: CompanyLogoName[] = ['epicurious', 'cloudwatch', 'acme-corp', 'polymath', 'alt-shift', 'luminous', 'focalpoint', 'galileo'];
export const ctaLogos02: CompanyLogoName[] = [...ctaLogos01, 'nietzsche'];

export const ctaCheckItems = ['30-day free trial', 'Personalized onboarding', 'Access to all features'];

const JOIN_OVER = 'Join over 4,000+ startups already growing with Tinicorn.';
const TRIAL_TODAY = 'Start your 30-day free trial today.';
const JOIN_4000 = 'Join 4,000+ startups growing with Tinicorn';
const GROWTH = 'Growth performance tracking made easy';

/** Figma placeholder copy per CTA type. */
export const ctaCopy: Record<CTASectionType, CTACopy> = {
  'simple-centered': { title: 'Start your free trial', supportingText: JOIN_OVER },
  'simple-left': { title: 'Start your free trial', supportingText: JOIN_OVER },
  'card-horizontal-split': { title: 'Start your 30-day free trial', supportingText: JOIN_OVER },
  'card-horizontal': { title: 'Start your 30-day free trial', supportingText: JOIN_OVER },
  'card-vertical': { title: 'Start your 30-day free trial', supportingText: JOIN_OVER },
  'simple-logos-01': { title: 'Start your free trial', supportingText: JOIN_OVER },
  'simple-logos-02': { title: 'Join over 4,000+ startups growing with Tinicorn', supportingText: TRIAL_TODAY },
  'iphone-mockup-01': { title: GROWTH, supportingText: TRIAL_TODAY },
  'iphone-mockup-02': { title: GROWTH, supportingText: TRIAL_TODAY },
  'iphone-mockup-03': { title: GROWTH, supportingText: TRIAL_TODAY },
  'iphone-mockup-04': { title: 'Start your free trial', supportingText: 'Personal performance tracking made easy.' },
  'screen-mockup-01': { title: JOIN_4000, checkItems: ctaCheckItems },
  'screen-mockup-02': { title: JOIN_4000, supportingText: TRIAL_TODAY },
  'screen-mockup-03': { title: 'Start your 30-day free trial', supportingText: JOIN_OVER },
  'screen-mockup-04': { title: JOIN_4000, supportingText: TRIAL_TODAY },
  'split-image-01': { title: JOIN_4000, checkItems: ctaCheckItems },
  'split-image-02': { title: JOIN_4000, supportingText: TRIAL_TODAY },
  'split-image-03': { subheading: 'Get started', title: 'Start your 30-day free trial', supportingText: JOIN_OVER },
  'split-image-04': { title: 'Give us a shot', supportingText: JOIN_OVER },
  'abstract-images': { title: 'No long-term contracts. No catches.', supportingText: TRIAL_TODAY },
  'split-image-quote-01': { title: JOIN_4000, checkItems: ctaCheckItems },
  'split-image-quote-02': { title: JOIN_4000, supportingText: TRIAL_TODAY },
  'split-image-quote-03': { title: JOIN_4000, checkItems: ctaCheckItems },
  'split-image-quote-04': { title: JOIN_4000, supportingText: TRIAL_TODAY },
};

export const ctaQuotes: Partial<Record<CTASectionType, CTAQuote>> = {
  'split-image-quote-01': {
    quote: '“We’ve been using Tinicorn to kick start every new project and can’t imagine working without it.”',
    name: 'Lori Bryson',
    role: 'COO, Command+R',
    company: 'Web Development Agency',
  },
  'split-image-quote-02': {
    quote: '“Tinicorn has saved us thousands of hours of work. We’re able to spin up projects and features faster.”',
    name: 'Alisa Hester',
    role: 'PM, Hourglass',
    company: 'Web Design Agency',
  },
  'split-image-quote-03': {
    quote: '“Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.”',
    name: 'Felicity Pierre',
    role: 'Head of Design, Layers',
    company: 'UX Agency',
  },
  'split-image-quote-04': {
    quote: '“We’ve really sped up our workflow using Tinicorn.”',
    name: 'Fleur Cook',
    role: 'PM, Hourglass',
    company: 'Web Design Agency',
  },
};
