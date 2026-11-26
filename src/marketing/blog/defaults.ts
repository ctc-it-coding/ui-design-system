import type { BadgeColor } from '../../components/badges/Badge';

/** Default (Figma placeholder) content for the Blog sections. */

export interface BlogPostTag {
  label: string;
  color?: BadgeColor;
}

export interface BlogPost {
  title: string;
  excerpt?: string;
  /** Category, e.g. "Design" (subheading / badge). */
  category?: string;
  /** e.g. "8 min read" */
  readTime?: string;
  author?: { name: string; avatarSrc?: string };
  /** Display date, e.g. "20 Jan 2024". */
  date?: string;
  tags?: BlogPostTag[];
  imageSrc?: string;
  href?: string;
}

export const blogPostDefaults: BlogPost[] = ([
  {
    title: 'UX review presentations',
    excerpt: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
    category: 'Design',
    author: { name: 'Olivia Rhye' },
    date: '20 Jan 2024',
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }, { label: 'Presentation', color: 'pink' }],
  },
  {
    title: 'Migrating to Linear 101',
    excerpt: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    category: 'Product',
    author: { name: 'Phoenix Baker' },
    date: '19 Jan 2024',
    tags: [{ label: 'Product', color: 'blue-light' }, { label: 'Tools', color: 'pink' }, { label: 'SaaS', color: 'pink' }],
  },
  {
    title: 'Building your API stack',
    excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    category: 'Software Engineering',
    author: { name: 'Lana Steiner' },
    date: '18 Jan 2024',
    tags: [{ label: 'Software Development', color: 'success' }, { label: 'Tools', color: 'pink' }],
  },
  {
    title: 'Bill Walsh leadership lessons',
    excerpt: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?',
    category: 'Leadership',
    author: { name: 'Alec Whitten' },
    date: '17 Jan 2024',
    tags: [{ label: 'Leadership', color: 'brand' }, { label: 'Management', color: 'gray-blue' }],
  },
  {
    title: 'PM mental models',
    excerpt: 'Mental models are simple expressions of complex processes or relationships.',
    category: 'Product',
    author: { name: 'Demi Wilkinson' },
    date: '16 Jan 2024',
    tags: [{ label: 'Product', color: 'blue-light' }, { label: 'Research', color: 'indigo' }, { label: 'Frameworks', color: 'orange' }],
  },
  {
    title: 'What is wireframing?',
    excerpt: 'Introduction to Wireframing and its Principles. Learn from the best in the industry.',
    category: 'Design',
    author: { name: 'Candice Wu' },
    date: '15 Jan 2024',
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }],
  },
  {
    title: 'How collaboration makes us better designers',
    excerpt: 'Collaboration can make our teams stronger, and our individual designs better.',
    category: 'Design',
    author: { name: 'Natali Craig' },
    date: '14 Jan 2024',
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }],
  },
  {
    title: 'Our top 10 Javascript frameworks to use',
    excerpt: 'JavaScript frameworks make development easy with extensive features and functionalities.',
    category: 'Product',
    author: { name: 'Drew Cano' },
    date: '13 Jan 2024',
    tags: [{ label: 'Software Development', color: 'success' }, { label: 'Tools', color: 'pink' }, { label: 'SaaS', color: 'pink' }],
  },
  {
    title: 'Podcast: Creating a better CX Community',
    excerpt: 'Starting a community doesn’t need to be complicated, but how do you get started?',
    category: 'Customer Success',
    author: { name: 'Orlando Diggs' },
    date: '12 Jan 2024',
    tags: [{ label: 'Podcasts', color: 'brand' }, { label: 'Customer Success', color: 'gray-blue' }],
  },
] satisfies BlogPost[]).map((p): BlogPost => ({ readTime: '8 min read', ...p }));

/** Featured article of Blog page header Type=Featured post 01/02. */
export const featuredPostDefault: BlogPost = {
  title: 'Improve your design skills: Develop an "eye" for design',
  excerpt: 'Tools and trends change, but good design is timeless. Learn how to quickly develop an "eye" for design.',
  category: 'Design',
  readTime: '8 min read',
  author: { name: 'Amélie Laurent' },
  date: '10 April 2024',
  tags: [{ label: 'Design', color: 'gray' }, { label: 'Research', color: 'gray' }, { label: 'Presentation', color: 'gray' }],
};

export const blogCategoryDefaults = ['View all', 'Design', 'Product', 'Software Engineering', 'Customer Success'];
export const blogSidebarCategoryDefaults = ['View all', 'Design', 'Product', 'Software Engineering', 'Customer Success', 'Leadership', 'Management'];

export const blogSubscribeDefaults = {
  title: 'Weekly newsletter',
  supportingText: 'No spam. Just the latest releases and tips, interesting articles, and exclusive interviews in your inbox every week.',
  placeholder: 'Enter your email',
  hint: 'Read about our privacy policy.',
  button: 'Subscribe',
};
