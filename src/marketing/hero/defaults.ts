/** Default (Figma placeholder) copy for every Hero header section type. */

export const heroHeaderTypes = [
  'screen-mockup-01', 'screen-mockup-02', 'screen-mockup-03', 'screen-mockup-04',
  'screen-mockup-05', 'screen-mockup-06', 'screen-mockup-07', 'screen-mockup-08',
  'iphone-mockup-01', 'iphone-mockup-02', 'iphone-mockup-03', 'iphone-mockup-04',
  'color-card-01', 'color-card-02', 'color-card-03', 'color-card-04',
  'card-mockup-01', 'card-mockup-02', 'card-mockup-03', 'card-mockup-04', 'card-mockup-05', 'card-mockup-06',
  'card-mockup-07', 'card-mockup-08', 'card-mockup-09', 'card-mockup-10', 'card-mockup-11', 'card-mockup-12',
  'split-image-01', 'split-image-02', 'split-image-03', 'split-image-04', 'split-image-05', 'split-image-06',
  'geometric-shapes-01', 'geometric-shapes-02', 'geometric-shapes-03', 'geometric-shapes-04',
  'split-form-01', 'split-form-02',
  'simple-text',
  'abstract-angles-01', 'abstract-angles-02', 'abstract-angles-03', 'abstract-angles-04',
] as const;

/** Figma "Hero header section" → Type */
export type HeroHeaderType = (typeof heroHeaderTypes)[number];

export interface HeroBadgeContent {
  /** Text of the inner badge (e.g. "New feature"). */
  badge: string;
  /** Message next to the badge. */
  text: string;
}

export interface HeroCopy {
  subheading?: string;
  title: string;
  supportingText: string;
  badge?: HeroBadgeContent;
  /** Primary button / email-capture submit label. */
  primaryLabel: string;
  /** Secondary button label. */
  secondaryLabel?: string;
  checkItems?: string[];
}

const analytics = 'Beautiful analytics to grow smarter';
const analyticsLong = 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.';
const analyticsShort = 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.';
const banking = 'Beautiful banking to grow smarter';
const bankingText = 'Powerful, self-serve product and growth analytics to help you budget, forecast, and save.';
const growth = 'People who care about your growth';
const users = 'Grow your users. Smarter.';
const fintech = 'Tinicorn is a next-gen financial technology company in the process of reinventing banking.';
const moMoney = 'Mo money, no problems. Tinicorn is a next-generation financial technology company in the process of reinventing banking. 30-day free trial.';
const spaces = 'Creating stylish, functional and memorable spaces';
const spacesText = '— We’re a full-service interior design studio who specialise in simple and timeless spaces.';
const remote = 'High-performing remote teams. The future of work.';
const remoteText = 'Powerful, self-serve team engagement tools and analytics. Supercharge your managers & keep employees engaged from anywhere.';
const service = 'Customer service software for customer-first teams';
const serviceText = 'The best customer service software for customer-first teams. Industry-leading email and live chat support.';
const simplified = 'Super simplified customer service';
const creators = 'Designed by creators, for creators. Tinicorn gives you the guidance, data and innovation you need to sell more and growth your digital business.';

const btn = { primaryLabel: 'Sign up', secondaryLabel: 'Demo' };
const email = { primaryLabel: 'Get started' };
const geo = { primaryLabel: 'Chat to us', secondaryLabel: 'Showreel' };
const dashboard: HeroBadgeContent = { badge: 'New feature', text: 'Check out the team dashboard' };
const hiring: HeroBadgeContent = { badge: 'We’re hiring!', text: 'Join our remote team' };
const hiringDesign: HeroBadgeContent = { badge: 'We’re hiring!', text: 'Join our design team' };
const whatsNew: HeroBadgeContent = { badge: 'What’s new?', text: 'Instantly issue virtual cards' };

export const heroDefaults: Record<HeroHeaderType, HeroCopy> = {
  'screen-mockup-01': { title: analytics, supportingText: analyticsLong, ...btn },
  'screen-mockup-02': { title: analytics, supportingText: analyticsShort, ...btn },
  'screen-mockup-03': { title: banking, supportingText: 'Powerful, self-serve product and growth analytics to help you budget, forecast, and be smarter with your money. Trusted by over 4,000 startups.', ...btn },
  'screen-mockup-04': { title: analytics, supportingText: analyticsShort, ...btn },
  'screen-mockup-05': { title: analytics, supportingText: analyticsLong, badge: dashboard, ...btn },
  'screen-mockup-06': { title: banking, supportingText: bankingText, badge: hiring, ...btn },
  'screen-mockup-07': { title: analytics, supportingText: analyticsLong, badge: dashboard, ...btn },
  'screen-mockup-08': { title: banking, supportingText: bankingText, badge: hiring, ...btn },
  'iphone-mockup-01': { title: 'Portfolio performance tracking made easy', supportingText: 'Designed by marketers. Tinicorn gives you the guidance, data and innovation you need to become a better marketer.', badge: { badge: 'New!', text: 'Personalized coaching in-app' }, primaryLabel: '' },
  'iphone-mockup-02': { title: '#1 paid ads tracking app for marketers', supportingText: 'Designed by marketers, for marketers. Tinicorn gives you the guidance, data and innovation you need to become a better marketer.', primaryLabel: '' },
  'iphone-mockup-03': { title: 'Banking, but for digital creators', supportingText: creators, primaryLabel: 'Text me a link' },
  'iphone-mockup-04': { title: 'Growth performance tracking made easy', supportingText: creators, ...btn },
  'color-card-01': { title: users, supportingText: analyticsLong, ...email },
  'color-card-02': { title: users, supportingText: analyticsShort, ...email },
  'color-card-03': { title: users, supportingText: analyticsLong, ...email },
  'color-card-04': { title: users, supportingText: analyticsShort, ...email },
  'card-mockup-01': { title: 'No more banking headaches', supportingText: moMoney, badge: whatsNew, ...btn },
  'card-mockup-02': { title: 'No more business banking headaches', supportingText: fintech, badge: whatsNew, ...btn },
  'card-mockup-03': { title: 'No more banking headaches', supportingText: moMoney, badge: whatsNew, ...btn },
  'card-mockup-04': { title: 'No more business banking headaches', supportingText: fintech, badge: whatsNew, ...btn },
  'card-mockup-05': { subheading: 'Super. Simple. Banking.', title: 'Simple banking that works like magic.', supportingText: 'Simple, transparent banking. No hidden fees and free overdrafts.', ...btn },
  'card-mockup-06': { subheading: 'Super. Simple. Banking.', title: 'Simple banking that works like magic.', supportingText: 'Simple, transparent banking. No hidden fees.', ...btn },
  'card-mockup-07': { subheading: 'Super. Simple. Banking.', title: 'Banking technology that has your back.', supportingText: 'Simple, transparent banking. No hidden fees and free overdrafts.', ...btn },
  'card-mockup-08': { subheading: 'Super. Simple. Banking.', title: 'Banking technology that has your back.', supportingText: 'Simple, transparent banking. No hidden fees.', ...btn },
  'card-mockup-09': { title: 'Simple, transparent business credit cards', supportingText: moMoney, ...email, checkItems: ['Instantly issue virtual corporate cards', 'Control spending before it happens', 'Automate your expense management'] },
  'card-mockup-10': { title: 'Smart business credit cards', supportingText: fintech, badge: { badge: 'New!', text: 'Download the new iOS app' }, ...btn },
  'card-mockup-11': { title: 'Simple, transparent business credit cards', supportingText: moMoney, ...btn },
  'card-mockup-12': { title: 'Smart business credit cards', supportingText: analyticsShort, badge: hiring, ...email },
  'split-image-01': { title: growth, supportingText: analyticsShort, badge: hiring, ...email },
  'split-image-02': { title: growth, supportingText: analyticsShort, badge: hiring, ...btn },
  'split-image-03': { title: growth, supportingText: analyticsShort, ...btn },
  'split-image-04': { title: growth, supportingText: analyticsShort, ...email },
  'split-image-05': { title: service, supportingText: serviceText, ...btn },
  'split-image-06': { title: service, supportingText: serviceText, ...email },
  'geometric-shapes-01': { title: spaces, supportingText: spacesText, ...geo },
  'geometric-shapes-02': { title: spaces, supportingText: spacesText, ...geo },
  'geometric-shapes-03': { title: spaces, supportingText: spacesText, badge: hiringDesign, ...geo },
  'geometric-shapes-04': { title: spaces, supportingText: spacesText, badge: hiringDesign, ...geo },
  'split-form-01': { title: simplified, supportingText: analyticsShort, primaryLabel: 'Get started' },
  'split-form-02': { title: simplified, supportingText: analyticsShort, primaryLabel: 'Get started', checkItems: ['Share inboxes with your team', 'Deliver instant answers and embed answers', 'Solve a problem or close a sale in real-time with chat'] },
  'simple-text': { title: 'We design digital experiences that create more happy in the world', supportingText: '— We’re a full-service design and development agency who specialise in simple, useful and beautiful solutions.', primaryLabel: 'Get in touch', secondaryLabel: 'Showreel' },
  'abstract-angles-01': { title: remote, supportingText: remoteText, badge: dashboard, ...btn },
  'abstract-angles-02': { title: remote, supportingText: remoteText, badge: dashboard, ...btn },
  'abstract-angles-03': { title: remote, supportingText: remoteText, badge: dashboard, ...btn },
  'abstract-angles-04': { title: remote, supportingText: remoteText, badge: dashboard, ...btn },
};

export const heroLogos = ['Boltshift', 'Lightbox', 'FeatherDev', 'Spherule', 'GlobalBank', 'Nietzsche'];

export const heroNotifications = [
  { name: 'Olivia Rhye', initials: 'OR', text: 'Olivia Rhye followed you!', sub: '@oliviarhye' },
  { name: 'Candice Wu', initials: 'CW', text: 'Candice Wu and 2 other gave you kudos on Clubhouse 101 post' },
  { name: 'Phoenix Baker', initials: 'PB', text: 'Phoenix Baker joined your team Melbourne Startups Growth' },
  { name: 'Lana Steiner', initials: 'LS', text: 'Lana Steiner just launched The 10k users challenge workbook' },
];

export const heroReviewAvatars = ['OR', 'PB', 'LS', 'DW', 'CW'];
