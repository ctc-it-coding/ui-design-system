import type { SocialPlatform } from '../../components/misc-icons/SocialIcon';

export interface FooterLinkData {
  label: string;
  href?: string;
  /** Small badge after the label (Figma Badge=True, e.g. "New"). */
  badge?: string;
}

export interface FooterColumnData {
  heading: string;
  links: FooterLinkData[];
}

export interface FooterSocialLink {
  platform: SocialPlatform;
  href?: string;
}

const l = (...labels: string[]): FooterLinkData[] => labels.map((label) => ({ label, href: '#' }));

export const footerColumns: Record<'product' | 'company' | 'resources' | 'useCases' | 'social' | 'legal', FooterColumnData> = {
  product: { heading: 'Product', links: [{ label: 'Overview', href: '#' }, { label: 'Features', href: '#' }, { label: 'Solutions', href: '#', badge: 'New' }, ...l('Tutorials', 'Pricing', 'Releases')] },
  company: { heading: 'Company', links: l('About us', 'Careers', 'Press', 'News', 'Media kit', 'Contact') },
  resources: { heading: 'Resources', links: l('Blog', 'Newsletter', 'Events', 'Help centre', 'Tutorials', 'Support') },
  useCases: { heading: 'Use cases', links: l('Startups', 'Enterprise', 'Government', 'SaaS centre', 'Marketplaces', 'Ecommerce') },
  social: { heading: 'Social', links: l('Twitter', 'LinkedIn', 'Facebook', 'GitHub', 'AngelList', 'Dribbble') },
  legal: { heading: 'Legal', links: l('Terms', 'Privacy', 'Cookies', 'Licenses', 'Settings', 'Contact') },
};

const c = footerColumns;
/** 6 columns (Large 01 / 05 / 09). */
export const footerColumns6: FooterColumnData[] = [c.product, c.company, c.resources, c.useCases, c.social, c.legal];
/** 5 columns (Large 02 / 03 / 06 / 10 / 12). */
export const footerColumns5: FooterColumnData[] = [c.product, c.company, c.resources, c.social, c.legal];
/** 3 columns (Large 14). */
export const footerColumns3: FooterColumnData[] = [c.product, c.company, c.resources];
/** 2 columns (Large 04). */
export const footerColumns2: FooterColumnData[] = [c.product, c.resources];

/** Inline links (Small 01, Large 07 / 08 / 11 / 15 / 16). */
export const footerInlineLinks: FooterLinkData[] = l('Overview', 'Features', 'Pricing', 'Careers', 'Help', 'Privacy');
/** Legal links in the bottom bar. */
export const footerLegalLinks: FooterLinkData[] = l('Terms', 'Privacy', 'Cookies');

export const footerSocials: FooterSocialLink[] = (['x', 'linkedin', 'facebook', 'github', 'angellist', 'dribbble'] as SocialPlatform[]).map((platform) => ({ platform, href: '#' }));

export const footerCopy = {
  supportingText: 'Design amazing digital experiences that create more happy in the world.',
  copyright: '© 2077 Tinicorn. All rights reserved.',
  copyrightShort: '© 2077 Tinicorn',
  newsletterHeading: 'Stay up to date',
  emailPlaceholder: 'Enter your email',
  subscribe: 'Subscribe',
  getTheApp: 'Get the app',
};

export interface FooterCta {
  title?: string;
  supportingText?: string;
  secondaryAction?: string;
  primaryAction?: string;
}

/** Per-type CTA / newsletter copy. */
export const footerCtaCopy: Record<string, FooterCta> = {
  'large-05': { title: 'Join our newsletter', supportingText: 'We’ll send you a nice letter once per week. No spam.' },
  'large-06': { title: 'Join our newsletter', supportingText: 'We’ll send you a nice letter once per week. No spam.' },
  'large-09': { title: 'Let’s get started on something great', supportingText: 'Join over 4,000+ startups already growing with Tinicorn.', secondaryAction: 'Chat to us', primaryAction: 'Get started' },
  'large-10': { title: 'Start your 30-day free trial', supportingText: 'Join over 4,000+ startups already growing with Tinicorn.', secondaryAction: 'Learn more', primaryAction: 'Get started' },
  'large-11': { title: 'No long-term contracts. No catches. Simple.', supportingText: 'Start your 30-day free trial. Cancel anytime.', secondaryAction: 'View demo', primaryAction: 'Get started' },
  'large-12': { title: 'Get notified when we launch', supportingText: 'Stay up to date with the latest news, announcements, and articles.' },
  'large-13': { title: 'Let’s get started on something great', supportingText: 'Join over 4,000+ startups already growing with Tinicorn.', secondaryAction: 'View demo', primaryAction: 'Get started' },
  'large-14': { title: 'Move faster with Tinicorn', supportingText: 'Save countless hours of design and ship great looking designs faster.' },
};
