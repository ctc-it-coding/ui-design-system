import type { BadgeColor } from '../../components/badges/Badge';
import type { FlagCode } from '../../components/misc-icons/Flag';

/** One open position (Figma "_Job post" instance). */
export interface JobPostData {
  title: string;
  /** Badge label (e.g. "Design"). */
  badge?: string;
  badgeColor?: BadgeColor;
  /** Department shown above the title on Card 01 (e.g. "Design"). */
  department?: string;
  description?: string;
  location?: string;
  /** Country badge (Card 02), e.g. "Melbourne, Australia". */
  country?: string;
  flag?: FlagCode;
  /** Type of work, e.g. "Full-time". */
  workType?: string;
  salary?: string;
  href?: string;
  /** Filter key used by the category tabs (Card 01). */
  category?: string;
}

export interface JobCategory {
  id: string;
  label: string;
  description?: string;
}

export const jobPosts: JobPostData[] = [
  { title: 'Product Designer', badge: 'Design', badgeColor: 'blue', department: 'Design', category: 'design', description: 'We’re looking for a mid-level product designer to join our team.', location: 'Remote', workType: 'Full-time' },
  { title: 'Engineering Manager', badge: 'Software', badgeColor: 'pink', department: 'Software Development', category: 'software', description: 'We’re looking for an experienced engineering manager to join our team.', location: 'Remote', workType: 'Full-time' },
  { title: 'Customer Success Manager', badge: 'CX', badgeColor: 'success', department: 'Customer Success', category: 'cx', description: 'We’re looking for a customer success manager to join our team.', location: 'Remote', workType: 'Full-time' },
  { title: 'Account Executive', badge: 'Sales', badgeColor: 'indigo', department: 'Sales', category: 'sales', description: 'We’re looking for an account executive to join our team.', location: 'Remote', workType: 'Full-time' },
  { title: 'SEO Marketing Manager', badge: 'Marketing', badgeColor: 'orange', department: 'Marketing', category: 'marketing', description: 'We’re looking for an experienced SEO marketing manager to join our team.', location: 'Remote', workType: 'Full-time' },
  { title: 'UX Researcher', badge: 'Design', badgeColor: 'blue', department: 'Design', category: 'design', description: 'We’re looking for a senior user researcher to join our team.', location: 'Remote', workType: 'Full-time' },
];

/** Simple-type badges use the full department name. */
export const simpleJobPosts: JobPostData[] = jobPosts.map((j) => ({ ...j, badge: j.category === 'software' ? 'Software Development' : j.category === 'cx' ? 'Customer Success' : j.badge }));

export const jobCategories: JobCategory[] = [
  { id: 'all', label: 'View all' },
  { id: 'design', label: 'Design' },
  { id: 'software', label: 'Software Engineering' },
  { id: 'cx', label: 'Customer Success' },
  { id: 'sales', label: 'Sales' },
  { id: 'marketing', label: 'Marketing' },
];

const card2 = (title: string, description: string, badge: string, badgeColor: BadgeColor, salary: string): JobPostData => ({
  title,
  description,
  badge,
  badgeColor,
  salary,
  workType: 'Full-time',
  country: 'Melbourne, AU',
  flag: 'AU',
});

/** Grouped jobs of Card 03 / Card 04. */
export const jobGroups: (JobCategory & { jobs: JobPostData[] })[] = [
  {
    id: 'design',
    label: 'Design',
    description: 'Open positions in our design team.',
    jobs: [
      card2('Product Designer', 'We’re looking for a mid-level product designer to join our team.', 'Design', 'blue', '80k - 100k'),
      card2('UX Designer', 'We’re looking for a mid-level UX designer to join our team.', 'Design', 'blue', '80k - 100k'),
    ],
  },
  {
    id: 'software',
    label: 'Software Development',
    description: 'Open positions in our software team.',
    jobs: [
      card2('Engineering Manager', 'We’re looking for an experienced engineering manager to join our team.', 'Software', 'pink', '$80k - $100k'),
      card2('Frontend Developer', 'We’re looking for an experienced frontend developer to join our team.', 'Software', 'pink', '$80k - $100k'),
      card2('Backend Developer', 'We’re looking for an experienced backend developer to join our team.', 'Software', 'pink', '$80k - $100k'),
    ],
  },
  {
    id: 'cx',
    label: 'Customer Success',
    description: 'Open positions in our CX team.',
    jobs: [card2('Customer Success Manager', 'We’re looking for a customer success manager to join our team.', 'Customer Success', 'success', '$80k - $100k')],
  },
];

export const jobLocations = ['Worldwide', 'Remote', 'Melbourne, AU', 'Sydney, AU', 'London, UK', 'San Francisco, US'];

export interface CareersCopy {
  subheading?: string;
  title?: string;
  supportingText?: string;
}

const philosophy = 'Our philosophy is simple — hire a team of diverse, passionate people and foster a culture that empowers you to do your best work.';
const remote = 'We’re a 100% remote team spread all across the world. Join us!';

export const careersSectionCopy: Record<string, CareersCopy> = {
  'simple-01': { title: 'Open positions', supportingText: remote },
  'simple-02': { subheading: 'We’re hiring!', title: 'Join our team', supportingText: philosophy },
  'simple-03': { subheading: 'Open positions', title: 'We’re looking for talented people', supportingText: remote },
  'simple-04': { subheading: 'We’re hiring!', title: 'Start doing work that matters', supportingText: philosophy },
  'card-01': { title: 'Open positions', supportingText: remote },
  'card-02': { subheading: 'We’re hiring!', title: 'Join our team', supportingText: philosophy },
  'card-03': { subheading: 'Careers', title: 'We’re looking for talented people', supportingText: remote },
  'card-04': { title: 'Start doing work that matters', supportingText: philosophy },
};
