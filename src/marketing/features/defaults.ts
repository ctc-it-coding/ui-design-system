import { BarChart02, Command, FaceSmile, Mail01, MessageCircle01, Zap } from '../../icons';
import type { IconSlot } from '../../utils/renderIcon';
import type { IntegrationLogoName } from './IntegrationLogo';

export interface FeatureItem {
  title: string;
  supportingText: string;
  icon?: IconSlot;
  /** integration logo (integration types) */
  integration?: IntegrationLogoName;
  href?: string;
  /** check-list bullets (alternating layouts) */
  bullets?: string[];
}

/** Figma placeholder copy for the 6-item feature grids. */
export const defaultFeatures: FeatureItem[] = [
  { icon: Mail01, title: 'Share team inboxes', supportingText: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.' },
  { icon: Zap, title: 'Deliver instant answers', supportingText: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.' },
  { icon: BarChart02, title: 'Manage your team with reports', supportingText: 'Measure what matters with Tinicorn’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.' },
  { icon: FaceSmile, title: 'Connect with customers', supportingText: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email without confusion.' },
  { icon: Command, title: 'Connect the tools you already use', supportingText: 'Explore 100+ integrations that make your day-to-day workflow more efficient and familiar. Plus, our extensive developer tools.' },
  { icon: MessageCircle01, title: 'Our people make the difference', supportingText: 'We’re an extension of your customer service team, and all of our resources are free. Chat to our friendly team 24/7 when you need help.' },
];

/** "Simple icons 04" order (Text left grid). */
export const defaultFeaturesAlt: FeatureItem[] = [defaultFeatures[0], defaultFeatures[1], defaultFeatures[2], defaultFeatures[5], defaultFeatures[4], defaultFeatures[3]];

/** "Icon cards 02" copy (shorter texts). */
export const defaultCardFeatures: FeatureItem[] = [
  defaultFeatures[0],
  defaultFeatures[1],
  { icon: BarChart02, title: 'Manage your team', supportingText: 'Measure what matters with Tinicorn’s easy-to-use reports. You can filter, export, and drilldown on the data.' },
  { icon: FaceSmile, title: 'Connect with customers', supportingText: 'Solve a problem or close a sale in real-time with chat. If no one is available, customers are seamlessly routed to email.' },
];

/** Alternating layouts: icon, heading, text, bullets. */
export const defaultAlternatingFeatures: FeatureItem[] = [
  {
    icon: Mail01,
    title: 'Share team inboxes',
    supportingText: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
    bullets: ['Leverage automation to move fast', 'Always give customers a human to chat to', 'Automate customer support and close leads faster'],
  },
  {
    icon: Zap,
    title: 'Deliver instant answers',
    supportingText: 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.',
    bullets: ['Keep your customers in the loop with live chat', 'Embed help articles right on your website', 'Customers never have to leave the page to find an answer'],
  },
  {
    icon: BarChart02,
    title: 'Manage your team with reports',
    supportingText: 'Measure what matters with Tinicorn’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.',
    bullets: ['Filter, export, and drilldown on the data quickly', 'Save, schedule, and automate reports to your inbox', 'Connect the tools you already use with 100+ integrations'],
  },
];

/** Alternating layout 02 copy (longer texts, no bullets). */
export const defaultAlternatingFeatures02: FeatureItem[] = [
  { icon: Mail01, title: 'Share team inboxes', supportingText: 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop. Leverage automation to move fast, while always giving customers a human, helpful experience.' },
  { icon: Zap, title: 'Deliver instant answers', supportingText: 'Keep your customers in the flow by embedding help articles right on your website. With Beacon, they never have to leave the page to find an answer.' },
  { icon: BarChart02, title: 'Manage your team with reports', supportingText: 'Measure what matters with Tinicorn’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.' },
];

const integ = (integration: IntegrationLogoName, name: string): FeatureItem => ({
  integration,
  title: `${name} integration`,
  supportingText: `Work faster and smarter by integrating directly with ${name}, right in the app.`,
});
export const defaultIntegrationFeatures: FeatureItem[] = [
  integ('notion', 'Notion'), integ('slack', 'Slack'), integ('google-drive', 'Google Drive'),
  integ('intercom', 'Intercom'), integ('jira', 'Jira'), integ('dropbox', 'Dropbox'),
];

/** Logo clouds of "Integrations icons 01/02". */
export const defaultIntegrationLogos01: IntegrationLogoName[] = ['notion', 'slack', 'google-drive', 'intercom', 'jira', 'dropbox', 'stripe', 'zapier'];
export const defaultIntegrationLogos02: IntegrationLogoName[] = [
  'notion', 'slack', 'google-drive', 'intercom', 'jira', 'dropbox', 'stripe', 'zapier', 'figma',
  'confluence', 'mailchimp', 'zendesk', 'g-calendar', 'whatsapp', 'discord', 'bitbucket', 'invision', 'evernote',
];

/** Tabs copy (_Feature tab). */
export const defaultTabs: FeatureItem[] = [defaultFeatures[0], defaultFeatures[1], defaultFeatures[2]];

export const featuresCopy = {
  subheading: 'Features',
  analyticsTitle: 'Beautiful analytics to grow smarter',
  usefulTitle: 'Overflowing with useful features',
  cuttingEdgeTitle: 'Cutting-edge features for advanced analytics',
  supportingText: 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.',
  supportingTextShort: 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.',
  integrationsSubheading: 'Integrations',
  integrationsTitle: 'Get more value from your tools',
  integrationsText: 'Connect your tools, connect your teams. With over 100 apps already available in our directory, your team’s favourite tools are just a click away.',
  integrationsText200: 'Connect your tools, connect your teams. With over 200 apps already available in our directory, your team’s favourite tools are just a click away.',
  newFeatureSubheading: 'New feature',
  newFeatureTitle: 'Introducing team inboxes',
};

/** Notification rows over the phone in "Tabs mockup 04". */
export const defaultNotifications = [
  { name: 'Olivia Rhye', initials: 'OR', text: 'Olivia Rhye followed you!', supportingText: '@oliviarhye' },
  { name: 'Candice Wu', initials: 'CW', text: 'Candice Wu and 2 other gave you kudos on Clubhouse 101 post' },
  { name: 'Phoenix Baker', initials: 'PB', text: 'Phoenix Baker joined your team Melbourne Startups Growth' },
  { name: 'Lana Steiner', initials: 'LS', text: 'Lana Steiner just launched The 10k users challenge workbook' },
];
