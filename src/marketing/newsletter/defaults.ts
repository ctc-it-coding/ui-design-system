import type { CTACopy } from '../cta/defaults';

/** Figma "Newsletter CTA section" → Type. */
export type NewsletterCTASectionType =
  | 'simple-centered'
  | 'simple-left'
  | 'card-horizontal-split'
  | 'card-horizontal'
  | 'card-vertical'
  | 'iphone-mockup-01'
  | 'iphone-mockup-02'
  | 'iphone-mockup-03'
  | 'iphone-mockup-04'
  | 'screen-mockup-01'
  | 'screen-mockup-02'
  | 'screen-mockup-03'
  | 'screen-mockup-04';

export const newsletterCTASectionTypes: NewsletterCTASectionType[] = [
  'simple-centered', 'simple-left', 'card-horizontal-split', 'card-horizontal', 'card-vertical',
  'iphone-mockup-01', 'iphone-mockup-02', 'iphone-mockup-03', 'iphone-mockup-04',
  'screen-mockup-01', 'screen-mockup-02', 'screen-mockup-03', 'screen-mockup-04',
];

const LAUNCH = 'Be the first to know when we launch';
const BUILDING = 'We’re still building. Subscribe for updates and 20% off when we launch. No spam, we promise!';
const LETTER = 'We’ll send you a nice letter once per week';
const NO_SPAM = 'No spam. Just the latest releases and tips, interesting articles, and exclusive interviews with great people.';

/** Figma placeholder copy per Newsletter CTA type. */
export const newsletterCopy: Record<NewsletterCTASectionType, CTACopy> = {
  'simple-centered': { title: 'Sign up for our newsletter', supportingText: 'Be the first to know about releases and industry news and insights.' },
  'simple-left': { title: 'Sign up for our newsletter', supportingText: 'Be the first to know about releases and industry news and insights.' },
  'card-horizontal-split': { title: 'Join our newsletter', supportingText: 'Sign up for the very best tutorials and the latest news.' },
  'card-horizontal': { title: 'Join 2,000+ subscribers', supportingText: 'Stay in the loop with everything you need to know.' },
  'card-vertical': { title: 'Still thinking about it?', supportingText: 'Sign up for our newsletter and get 10% off your next purchase.' },
  'iphone-mockup-01': { title: LAUNCH, supportingText: BUILDING },
  'iphone-mockup-02': { title: LAUNCH, supportingText: BUILDING },
  'iphone-mockup-03': { title: LAUNCH, supportingText: BUILDING },
  'iphone-mockup-04': { title: LAUNCH, supportingText: BUILDING },
  'screen-mockup-01': { title: LETTER, checkItems: ['Latest releases and tips', 'Our favourite articles each week', 'Exclusive interviews with great people'] },
  'screen-mockup-02': { title: LETTER, supportingText: NO_SPAM },
  'screen-mockup-03': { title: LETTER, supportingText: NO_SPAM },
  'screen-mockup-04': { title: LETTER, supportingText: 'No spam. Just the latest releases and tips, interesting articles, and exclusive interviews.' },
};
