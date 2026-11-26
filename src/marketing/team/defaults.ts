import type { SocialPlatform } from '../../components/misc-icons/SocialIcon';

export interface TeamSocialLink {
  platform: SocialPlatform;
  href?: string;
}

/** One person (Figma "_Team member" instance). */
export interface TeamMemberData {
  name: string;
  role?: string;
  /** Short bio (Figma "Supporting text"). */
  bio?: string;
  /** Photo / avatar URL. */
  imageSrc?: string;
  /** Profile link (arrow icon on the glass cards). */
  href?: string;
  socials?: TeamSocialLink[];
}

export const defaultTeamSocials: TeamSocialLink[] = [
  { platform: 'x', href: '#' },
  { platform: 'linkedin', href: '#' },
  { platform: 'dribbble', href: '#' },
];

export const teamMembers: TeamMemberData[] = [
  { name: 'Amélie Laurent', role: 'Founder & CEO', bio: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.' },
  { name: 'Nikolas Gibbons', role: 'Engineering Manager', bio: 'Lead engineering teams at Figma, Pitch, and Protocol Labs.' },
  { name: 'Sienna Hewitt', role: 'Product Manager', bio: 'Former PM for Linear, Lambda School, and On Deck.' },
  { name: 'Lily-Rose Chedjou', role: 'Frontend Developer', bio: 'Former frontend dev for Linear, Coinbase, and Postscript.' },
  { name: 'Zahra Christensen', role: 'Backend Developer', bio: 'Lead backend dev at Clearbit. Former Clearbit and Loom.' },
  { name: 'Caitlyn King', role: 'Product Designer', bio: 'Founding design team at Figma. Former Pleo, Stripe, and Tile.' },
  { name: 'Zaid Schwartz', role: 'UX Researcher', bio: 'Lead user research for Slack. Contractor for Netflix and Udacity.' },
  { name: 'Marco Kelly', role: 'Customer Success', bio: 'Lead CX at Wealthsimple. Former PagerDuty and Sqreen.' },
];

export const teamGlassMembers: TeamMemberData[] = [
  { name: 'Alisa Hester', role: 'Founder & CEO', bio: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.' },
  { name: 'Rich Wilson', role: 'Engineering Manager', bio: 'Lead engineering teams at Figma, Pitch, and Protocol Labs.' },
  { name: 'Annie Stanley', role: 'Product Manager', bio: 'Former PM for Airtable, Medium, Ghost, and Lumi.' },
  { name: 'Johnny Bell', role: 'Frontend Developer', bio: 'Former frontend dev for Linear, Coinbase, and Postscript.' },
  { name: 'Mia Ward', role: 'Backend Developer', bio: 'Lead backend dev at Clearbit. Former Clearbit and Loom.' },
  { name: 'Archie Young', role: 'Product Designer', bio: 'Founding design team at Figma. Former Pleo, Stripe, and Tile.' },
];

/** Image collage 01 in Figma layer order: [big, big, small, small, tall, small, small, small] (bios only on the large tiles). */
export const teamCollageMembers: TeamMemberData[] = [
  { name: 'Alisa Hester', role: 'Founder & CEO', bio: 'Former co-founder of Opendoor. Early staff at Spotify and Clearbit.' },
  { name: 'Amanda Carr', role: 'UI Designer', bio: 'Founding design team at Figma. Former Pleo, Stripe, and Tile.' },
  { name: 'Rich Wilson', role: 'Engineering Manager' },
  { name: 'Annie Stanley', role: 'Product Manager' },
  { name: 'Johnny Bell', role: 'Frontend Developer', bio: 'Former frontend dev for Linear, Coinbase, and Postscript.' },
  { name: 'Mia Ward', role: 'Backend Developer' },
  { name: 'Mason Phillips', role: 'UI Designer' },
  { name: 'Archie Young', role: 'Product Designer' },
];

export interface TeamCopy {
  subheading?: string;
  title?: string;
  supportingText?: string;
  secondaryAction?: string;
  primaryAction?: string;
}

const philosophy = 'Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.';
const remote = 'We’re a 100% remote team spread all across the world. Join us!';

/** Figma copy per TeamSection type. */
export const teamSectionCopy: Record<string, TeamCopy> = {
  'simple-01': { subheading: 'We’re hiring!', title: 'Meet our team', supportingText: philosophy },
  'simple-02': { subheading: 'Our team', title: 'Some of the people you’ll be working with', supportingText: remote },
  'simple-03': { subheading: 'Our team', title: 'Leadership team', supportingText: 'We’re a cross-disciplinary team that loves to create great experiences for our customers.', secondaryAction: 'About us', primaryAction: 'Open positions' },
  'simple-04': { subheading: 'We’re hiring!', title: 'Meet our team', supportingText: philosophy, secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-card-01': { subheading: 'We’re hiring!', title: 'Meet our team', supportingText: philosophy, secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-card-02': { subheading: 'Our team', title: 'Some of the people you’ll be working with', supportingText: remote, secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-card-03': { subheading: 'Our team', title: 'Leadership team', supportingText: 'We’re a cross-disciplinary team with a wealth of experience that loves to create great experiences for our customers.' },
  'image-card-04': { title: 'We’re a fast-growing team', supportingText: 'We’re always on the lookout for passionate, dynamic, and talented individuals.', secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-glass-01': { subheading: 'We’re hiring!', title: 'Meet our team', supportingText: philosophy, secondaryAction: 'Read our principles', primaryAction: 'We’re hiring!' },
  'image-glass-02': { subheading: 'Our team', title: 'Some of the people you’ll be working with', supportingText: remote, secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-glass-03': { subheading: 'Our team', title: 'Leadership team', supportingText: 'We’re a cross-disciplinary team that loves to create great experiences for our customers.', secondaryAction: 'About us', primaryAction: 'Open positions' },
  'image-glass-04': { title: 'We’re a fast-growing team', supportingText: 'We’re always on the lookout for passionate, dynamic, and talented individuals.', secondaryAction: 'Read our principles', primaryAction: 'We’re hiring!' },
  'image-collage-01': { subheading: 'Join our team', title: 'We’re just getting started', supportingText: philosophy, secondaryAction: 'Read our principles', primaryAction: 'We’re hiring!' },
  'image-collage-02': { subheading: 'Join our team', title: 'We’re just getting started', supportingText: philosophy, secondaryAction: 'Read our principles', primaryAction: 'We’re hiring!' },
};
