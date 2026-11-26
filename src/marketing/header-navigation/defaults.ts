import {
  BarChart10, BookClosed, Briefcase01, Building07, CodeBrowser, Coins03, Dataflow03, FileCode01, Flag05,
  HeartHand, LifeBuoy01, Mail01, MessageChatSquare, PieChart03, PlayCircle, Rocket02, Scales01, Stars02, Target04,
  Users01, Zap, PhoneCall01,
} from '../../icons';
import type {
  MarketingHeaderNavType, MarketingHeaderNavVariant, MarketingNavItem, NavLink, NavMenuCardData, NavMenuContent, NavMenuLinkData,
} from './types';

/* ------------------------------------------------------------------ items (Figma placeholder copy) */

export const navResources: NavMenuLinkData[] = [
  { title: 'Blog', description: 'The latest industry news, updates and info.', icon: BookClosed, href: '#' },
  { title: 'Customer stories', description: 'Learn how our customers are making big changes.', icon: Stars02, href: '#' },
  { title: 'Video tutorials', description: 'Get up and running on new features and techniques.', icon: PlayCircle, href: '#' },
  { title: 'Documentation', description: 'All the boring stuff that you (hopefully won’t) need.', icon: FileCode01, href: '#' },
  { title: 'Help and support', description: 'Need help with something? Our expert team is here 24/7.', icon: LifeBuoy01, href: '#' },
];

export const navCompany: NavMenuLinkData[] = [
  { title: 'About us', description: 'Learn about our story and our mission statement.', icon: Flag05, href: '#' },
  { title: 'Press', description: 'News and writings, press releases, and press resources.', icon: Mail01, href: '#' },
  { title: 'Careers', description: 'We’re always looking for talented people. Join our team!', icon: Briefcase01, href: '#' },
  { title: 'Legal', description: 'All the boring stuff that our lawyers helped us with.', icon: Scales01, href: '#' },
];

export const navProducts: NavMenuLinkData[] = [
  { title: 'Analytics', description: 'Get a better understanding of your traffic.', icon: BarChart10, href: '#' },
  { title: 'Engagement', description: 'Speak directly to your customers.', icon: MessageChatSquare, href: '#' },
  { title: 'Automations', description: 'Build strategic funnels that convert.', icon: Zap, href: '#' },
  { title: 'Integrations', description: 'Connect with third-party tools.', icon: Dataflow03, href: '#' },
];

export const navUseCases: NavMenuLinkData[] = [
  { title: 'Startups', description: 'Launch and grow with the tools you need.', icon: Rocket02, href: '#' },
  { title: 'Enterprise', description: 'Scale securely across your whole company.', icon: Building07, href: '#' },
  { title: 'Marketing', description: 'Reach the right people at the right time.', icon: Target04, href: '#' },
  { title: 'Sales', description: 'Close more deals with better insights.', icon: Coins03, href: '#' },
];

export const navSupport: NavMenuLinkData[] = [
  { title: 'Help center', description: 'Answers to the questions we hear most.', icon: LifeBuoy01, href: '#' },
  { title: 'Community', description: 'Join our community of makers and builders.', icon: Users01, href: '#' },
  { title: 'Contact sales', description: 'Talk to our team about your needs.', icon: PhoneCall01, href: '#' },
];

export const navBlogCategories: NavMenuLinkData[] = ['Company', 'Product', 'Design', 'Engineering', 'Customer stories', 'News'].map((title) => ({ title, href: '#' }));

export const navGetStartedLinks: NavLink[] = ['Overview', 'Integrations', 'Documentation', 'Getting started guide', 'Release notes', 'Developer resources'].map(
  (label) => ({ label, href: '#' }),
);

export const navVideoCard = (): NavMenuCardData => ({
  type: 'video',
  title: 'How to get started',
  description: 'Jump right in — get an overview of the basics and get started on building.',
  actions: [{ label: 'Watch video', href: '#' }],
  href: '#',
});

export const navFeatureCard = (): NavMenuCardData => ({
  type: 'feature',
  title: 'We’ve just released an update!',
  description: 'Check out the all new dashboard view. Pages and exports now load faster.',
  actions: [{ label: 'Dismiss' }, { label: 'Changelog', href: '#' }],
  href: '#',
});

const postTitles = [
  ['Auto Layout explained', 'Auto Layout is a constraint-based layout system to create an adaptive UI.'],
  ['Design tokens 101', 'How we use design tokens to keep our product consistent.'],
  ['Our 2025 product roadmap', 'A sneak peek at everything we’re shipping this year.'],
  ['Building a design system', 'Lessons learned from scaling a component library.'],
  ['Typography on the web', 'Choosing and pairing fonts for modern interfaces.'],
  ['Accessible color palettes', 'Picking colors that work for everyone.'],
  ['Remote team rituals', 'How we stay connected across six time zones.'],
  ['From idea to launch', 'The process behind our latest product release.'],
  ['Customer story: Layers', 'How Layers grew revenue by 3x in twelve months.'],
];
export const navPosts = (n: number): NavMenuCardData[] =>
  postTitles.slice(0, n).map(([title, description]) => ({ type: 'image', title, description, actions: [{ label: 'Read post', href: '#' }], href: '#' }));

/* ------------------------------------------------------------------ default menu per type */

export function defaultNavMenu(type: MarketingHeaderNavType): NavMenuContent {
  switch (type) {
    case 'simple':
      return { sections: [{ items: navResources }] };
    case 'simple-with-footer':
      return { sections: [{ items: navResources }], footer: { primary: [{ label: 'View all resources', href: '#' }] } };
    case 'simple-2-col':
      return { sections: [{ items: [...navResources, ...navCompany, { title: 'Contact', description: 'Get in touch with our friendly team.', icon: Mail01, href: '#' }] }] };
    case 'simple-2-col-with-footer':
      return {
        sections: [{ title: 'Products', items: navProducts }, { title: 'Use cases', items: navUseCases }],
        footer: { primary: [{ label: 'Sign up for free', href: '#' }], secondary: [{ label: 'Watch demo', href: '#' }, { label: 'Contact sales', href: '#' }] },
      };
    case 'featured-card':
      return { sections: [{ items: navResources.slice(0, 3) }], cards: [navFeatureCard()] };
    case '2-col-with-links-and-footer':
      return {
        heading: 'Resources',
        supportingText: 'Get started and learn more about our products.',
        links: { title: 'Get started', items: navGetStartedLinks },
        sections: [{ title: 'Resources', items: navResources.slice(0, 3) }, { title: 'Support', items: navSupport }],
        footer: {
          columns: [
            [{ label: 'Book a demo', href: '#' }, { label: 'Talk to an expert', href: '#' }],
            [{ label: 'Visit the help center', href: '#' }, { label: 'Our changelog', href: '#' }],
            [{ label: 'Join the community', href: '#' }, { label: 'Follow us', href: '#' }],
          ],
        },
      };
    case 'featured-posts':
      return { sections: [{ title: 'Resources', items: navResources.slice(0, 4) }], cardsTitle: 'Latest blog posts', cards: navPosts(3), cardsAction: { label: 'View all posts', href: '#' } };
    case '2-col-with-sidebar':
      return {
        sections: [{ title: 'Resources', items: navResources.slice(0, 4) }, { title: 'Company', items: navCompany }],
        cardsTitle: 'Resources',
        cards: [navVideoCard(), { ...navVideoCard(), title: 'Advanced features', description: 'Take a deep dive into the most powerful features of our platform.' }],
        cardsAction: { label: 'View all resources', href: '#' },
      };
    case '3-col-with-sidebar':
      return {
        sections: [{ title: 'Use cases', items: navUseCases.slice(0, 3) }, { title: 'Resources', items: navResources.slice(0, 3) }, { title: 'Company', items: navCompany.slice(0, 3) }],
        cards: [navFeatureCard()],
      };
    case '4-col-with-footer':
      return {
        sections: [
          { title: 'Products', items: navProducts },
          { title: 'Use cases', items: navUseCases },
          { title: 'Resources', items: navResources.slice(0, 4) },
          { title: 'Company', items: navCompany },
        ],
        footer: {
          text: 'Ready to get started?',
          primary: [{ label: 'Sign up for free', href: '#' }],
          secondary: [{ label: 'Watch demo', href: '#' }, { label: 'Contact sales', href: '#' }, { label: 'View pricing', href: '#' }],
        },
      };
    case '2-col-with-links':
      return {
        sections: [{ title: 'Use cases', items: navUseCases.slice(0, 3) }, { title: 'Resources', items: navResources.slice(0, 3) }, { title: 'Company', items: navCompany.slice(0, 3) }],
        links: { title: 'Get started', items: navGetStartedLinks },
      };
    case '4-col-slim-with-footer':
      return {
        sections: [{ items: [
          { title: 'Analytics', description: 'Get a better understanding of where your traffic is coming from.', icon: PieChart03, href: '#' },
          { title: 'Engagement', description: 'Speak directly to your customers in a more meaningful way.', icon: MessageChatSquare, href: '#' },
          { title: 'Security', description: 'Your customers’ data will be safe and secure.', icon: HeartHand, href: '#' },
          { title: 'Integrations', description: 'Connect with third-party tools that you’re already using.', icon: CodeBrowser, href: '#' },
        ] }],
        footer: { primary: [{ label: 'Explore all products and features', href: '#' }] },
      };
    case 'blog-posts-with-footer':
      return { cards: navPosts(9), footer: { primary: [{ label: 'View all blog posts', href: '#' }] } };
    case 'blog-posts-with-sidebar':
      return { sections: [{ title: 'Blog categories', items: navBlogCategories }], cards: navPosts(6) };
  }
}

export function defaultNavItems(_variant: MarketingHeaderNavVariant, type: MarketingHeaderNavType): MarketingNavItem[] {
  return [
    { label: 'Home', href: '#' },
    { label: 'Products', menu: defaultNavMenu(type) },
    { label: 'Resources', menu: defaultNavMenu(type) },
    { label: 'Pricing', href: '#' },
  ];
}

/** Mobile panel footer link columns. */
export const navMobileFooterLinks: NavLink[][] = [
  ['About us', 'Press', 'Careers', 'Legal'].map((label) => ({ label, href: '#' })),
  ['Support', 'Contact', 'Sitemap', 'Cookie settings'].map((label) => ({ label, href: '#' })),
];

