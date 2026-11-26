import type { IconSlot } from '../../utils/renderIcon';
import { Mail01, MarkerPin02, MessageChatCircle, MessageSmileCircle, Phone } from '../../icons';

/** One contact method / location (Figma "_Contact text" instance). */
export interface ContactItem {
  icon?: IconSlot;
  title: string;
  supportingText?: string;
  /** Link label (e-mail, phone number, address…). */
  link?: string;
  href?: string;
}

/** Feature-tab style location (Tabs map sections). */
export interface ContactLocation {
  title: string;
  address: string;
  /** Optional link label (Figma "View store"). */
  link?: string;
  href?: string;
}

export const contactMethods: ContactItem[] = [
  { icon: Mail01, title: 'Email', supportingText: 'Our friendly team is here to help.', link: 'hi@untitledui.com', href: 'mailto:hi@untitledui.com' },
  { icon: MarkerPin02, title: 'Office', supportingText: 'Come say hello at our office HQ.', link: '100 Smith Street Collingwood VIC 3066 AU' },
  { icon: Phone, title: 'Phone', supportingText: 'Mon-Fri from 8am to 5pm.', link: '+1 (555) 000-0000', href: 'tel:+15550000000' },
];

export const contactMethodsWithChat: ContactItem[] = [
  contactMethods[0],
  { icon: MessageChatCircle, title: 'Live chat', supportingText: 'Our friendly team is here to help.', link: 'Start new chat' },
  contactMethods[1],
  contactMethods[2],
];

export const contactCards: ContactItem[] = [
  { icon: MessageSmileCircle, title: 'Chat to sales', supportingText: 'Speak to our friendly team.', link: 'sales@untitledui.com', href: 'mailto:sales@untitledui.com' },
  { icon: MessageChatCircle, title: 'Chat to support', supportingText: 'We’re here to help.', link: 'support@untitledui.com', href: 'mailto:support@untitledui.com' },
  { icon: MarkerPin02, title: 'Visit us', supportingText: 'Visit our office HQ.', link: '100 Smith Street Collingwood VIC 3066 AU' },
  { icon: Phone, title: 'Call us', supportingText: 'Mon-Fri from 8am to 5pm.', link: '+1 (555) 000-0000', href: 'tel:+15550000000' },
];

export const contactCards3: ContactItem[] = [contactCards[0], contactCards[2], contactCards[3]];

export const storeLocations: ContactItem[] = [
  { title: 'Melbourne', supportingText: '100 Flinders Street Melbourne VIC 3000 AU' },
  { title: 'Sydney', supportingText: '100 George Street Sydney NSW 2000 AU' },
  { title: 'Byron Bay', supportingText: '100 Jonson Street Byron Bay NSW 2481 AU' },
  { title: 'London', supportingText: '100 Oxford Street London W1D 1LL UK' },
  { title: 'San Francisco', supportingText: '100 Market Street San Francisco, CA 94105 USA' },
  { title: 'Sweden', supportingText: 'Drottninggatan 100 111 60 Stockholm SE' },
];

export const officeLocations: ContactItem[] = [
  { icon: MarkerPin02, title: 'Melbourne', supportingText: '100 Flinders Street, Melbourne VIC 3000 AU' },
  { icon: MarkerPin02, title: 'Sydney', supportingText: '100 George Street, Sydney NSW 2000 AU' },
];

export const tabLocations: ContactLocation[] = [
  { title: 'Melbourne', address: '100 Flinders Street Melbourne VIC 3000 AU', link: 'View store' },
  { title: 'Sydney', address: '100 George Street Sydney NSW 2000 AU', link: 'View store' },
  { title: 'Byron Bay', address: '100 Jonson Street Byron Bay NSW 2481 AU', link: 'View store' },
];

export const supportContacts: ContactItem[] = [
  { title: 'Support', supportingText: 'Our friendly team is here to help.', link: 'support@untitledui.com', href: 'mailto:support@untitledui.com' },
  { title: 'Sales', supportingText: 'Questions or queries? Get in touch!', link: 'sales@untitledui.com', href: 'mailto:sales@untitledui.com' },
  { title: 'Phone', supportingText: 'Mon-Fri from 8am to 5pm.', link: '+1 (555) 000-0000', href: 'tel:+15550000000' },
];

export const retailLocations: ContactItem[] = [
  { icon: MarkerPin02, title: 'Retail store', supportingText: 'Mon-Sat 9am to 5pm.', link: '150 Brunswick Street Fitzroy VIC 3065 AU' },
  { icon: MarkerPin02, title: 'Showroom', supportingText: 'Mon-Fri 9am to 5pm.', link: '50 Flinders Street Melbourne VIC 3000 AU' },
  { icon: MarkerPin02, title: 'Head office', supportingText: 'Mon-Fri 9am to 5pm.', link: '100 Smith Street Collingwood VIC 3066 AU' },
];

export const contactServices = ['Website design', 'UX design', 'User research', 'Content creation', 'Strategy & consulting', 'Other'];

export interface HeadingCopy {
  subheading?: string;
  title?: string;
  supportingText?: string;
}

/** Figma copy per ContactSection type. */
export const contactSectionCopy: Record<string, HeadingCopy> = {
  'simple-icons-01': {},
  'simple-icons-02': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'Our friendly team is always here to chat.' },
  'simple-icons-03': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'Our friendly team is always here to chat.' },
  'simple-icons-04': { subheading: 'Our locations', title: 'Visit our stores', supportingText: 'Find us at these locations.' },
  'simple-form-01': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'We’d love to hear from you. Please fill out this form.' },
  'simple-form-02': { title: 'Contact us', supportingText: 'Our friendly team would love to hear from you.' },
  'simple-form-03': { title: 'Let’s level up your brand, together', supportingText: 'You can reach us anytime via hi@untitledui.com' },
  'simple-form-04': { title: 'Get in touch', supportingText: 'We’d love to hear from you. Our friendly team is always here to chat.' },
  'simple-form-05': { title: 'Level up your brand', supportingText: 'You can reach us anytime via hi@untitledui.com' },
  'icon-cards-01': { subheading: 'Contact us', title: 'We’d love to hear from you', supportingText: 'Our friendly team is always here to chat.' },
  'icon-cards-02': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'Chat to our friendly team.' },
  'icon-cards-03': { subheading: 'Contact us', title: 'We’d love to hear from you', supportingText: 'Chat to our friendly team.' },
  'icons-and-form': { subheading: 'Contact us', title: 'Chat to our friendly team', supportingText: 'We’d love to hear from you. Please fill out this form or shoot us an email.' },
  'icons-and-map-01': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'Our friendly team would love to hear from you.' },
  'icons-and-map-02': { subheading: 'Contact us', title: 'Our locations', supportingText: 'Come visit our friendly team at one of our offices.' },
  'icons-and-image': { subheading: 'Contact us', title: 'Chat to our friendly team', supportingText: 'We’d love to hear from you! Please get in touch.' },
  'tabs-map-01': { subheading: 'Stores', title: 'Our locations', supportingText: 'Say hello to our friendly team at one of these locations.' },
  'tabs-map-02': { subheading: 'Our locations', title: 'Visit our stores', supportingText: 'Say hello to our friendly team at one of these locations.' },
  'center-map': { subheading: 'Our locations', title: 'Visit our stores', supportingText: 'Say hello to our friendly team at one of these locations.' },
  'vector-map-03': { subheading: 'Stores', title: 'Our locations', supportingText: 'Say hello to our friendly team at one of these locations.' },
};

/** Second heading of Simple form 05 (in the brand side panel). */
export const simpleForm05Panel: HeadingCopy = { title: 'Get in touch', supportingText: 'We’d love to hear from you. Our friendly team is always here to chat.' };

/** Figma copy per ContactPageHeader type. */
export const contactPageHeaderCopy: Record<string, HeadingCopy> = {
  'form-and-image-01': { title: 'Contact us', supportingText: 'Our friendly team would love to hear from you.' },
  'form-and-image-02': { title: 'Let’s level up your brand, together', supportingText: 'You can reach us anytime via hi@untitledui.com' },
  'form-and-map': { title: 'Contact us', supportingText: 'Our friendly team would love to hear from you.' },
  'simple-form': { subheading: 'Contact us', title: 'Get in touch', supportingText: 'We’d love to hear from you. Please fill out this form.' },
  'simple-links-01': { subheading: 'Contact us', title: 'We’d love to hear from you', supportingText: 'Our friendly team is always here to chat.' },
  'simple-links-02': { subheading: 'Contact us', title: 'We’d love to hear from you', supportingText: 'Our friendly team is always here to chat.' },
  'map-01': { subheading: 'Contact us', title: 'Our locations', supportingText: 'Come visit our friendly team at one of our offices.' },
  'map-02': { subheading: 'Contact us', title: 'We’d love to hear from you', supportingText: 'We have offices and teams all around the world.' },
};

/** Side-panel contacts of Simple form 04 / 05. */
export const sidePanelContacts: ContactItem[] = [
  { icon: MessageChatCircle, title: 'Chat to us', supportingText: 'Our friendly team is here to help.', link: 'hi@untitledui.com', href: 'mailto:hi@untitledui.com' },
  contactMethods[1],
  contactMethods[2],
];
