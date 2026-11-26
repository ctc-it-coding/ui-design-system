/** Default (Figma placeholder) content for the Testimonial sections. */

export interface Testimonial {
  /** The quote. */
  quote: string;
  /** Person's name, e.g. "Caitlyn King". */
  name: string;
  /** Role line, e.g. "Head of Design, Layers". */
  title?: string;
  /** Role line used inside image panels when it differs from `title` (e.g. "Designer, Layers"). */
  role?: string;
  /** Extra line shown in image panels, e.g. "Web Design Agency". */
  supportingText?: string;
  /** Company name — used for logos / case study cards. */
  company?: string;
  /** Star rating (0–5). Default 5. */
  rating?: number;
  /** Avatar image URL (initials are shown without it). */
  avatarSrc?: string;
  /** Photo URL for image based layouts. */
  imageSrc?: string;
  /** Eyebrow above the quote (Type=Card), e.g. "Financial Services". */
  subheading?: string;
}

export interface CaseStudy {
  company: string;
  quote: string;
  /** Card background class, e.g. "bg-brand-600". */
  colorClass?: string;
  href?: string;
  /** Link label, default "Read case study". */
  linkLabel?: string;
  imageSrc?: string;
}

const LOVE = 'Love the simplicity of the service and the prompt customer support. We can’t imagine working without it.';
const KICKSTART = 'We’ve been using Tinicorn to kick start every new project and can’t imagine working without it.';
const SAVED = 'Tinicorn has saved us thousands of hours of work. We’re able to spin up projects and features faster.';
const SPED = 'We’ve really sped up our workflow using Tinicorn and haven’t looked back.';

/** A few extra quotes so carousels have something to move to. */
const extra: Testimonial[] = [
  { quote: SAVED, name: 'Ammar Foley', title: 'UX Designer, GlobalBank', company: 'GlobalBank' },
  { quote: KICKSTART, name: 'Amélie Laurent', title: 'Product Manager, Sisyphus', company: 'Sisyphus' },
];

export const testimonialDefaults = {
  'simple-centered-01': [{ quote: LOVE, name: 'Caitlyn King', title: 'Head of Design, Layers', company: 'Layers' }, ...extra],
  'simple-centered-02': [{ quote: KICKSTART, name: 'Amélie Laurent', title: 'Product Manager, Sisyphus', company: 'Sisyphus' }],
  'simple-centered-03': [{ quote: SAVED, name: 'Ammar Foley', title: 'UX Designer, GlobalBank', company: 'GlobalBank' }],
  'simple-left-aligned': [{ quote: LOVE, name: 'Mathilde Lewis', title: 'Head of Design, Layers', company: 'Layers' }],
  card: [{ quote: SAVED, name: 'Fleur Cook', title: 'Web Developer, Sisyphus', company: 'Sisyphus', subheading: 'Financial Services' }],
  'split-image-01': [
    { quote: KICKSTART, name: 'Lana Steiner', title: 'Layers', role: 'Designer, Layers', company: 'Layers', supportingText: 'Web Design Agency' },
    { quote: SAVED, name: 'Lulu Meyers', title: 'Hourglass', role: 'PM, Hourglass', company: 'Hourglass', supportingText: 'Web Design Agency' },
    { quote: LOVE, name: 'Caitlyn King', title: 'Sisyphus', role: 'Data Engineer, Sisyphus', company: 'Sisyphus', supportingText: 'Data Engineering' },
  ],
  'split-image-02': [
    { quote: SAVED, name: 'Lulu Meyers', title: 'Hourglass', role: 'PM, Hourglass', company: 'Hourglass', supportingText: 'Web Design Agency' },
    { quote: KICKSTART, name: 'Lana Steiner', title: 'Layers', role: 'Designer, Layers', company: 'Layers', supportingText: 'Web Design Agency' },
    { quote: LOVE, name: 'Caitlyn King', title: 'Sisyphus', role: 'Data Engineer, Sisyphus', company: 'Sisyphus', supportingText: 'Data Engineering' },
  ],
  'split-image-03': [
    { quote: LOVE, name: 'Caitlyn King', title: 'Data Engineer, Sisyphus', company: 'Sisyphus' },
    { quote: SAVED, name: 'Lulu Meyers', title: 'PM, Hourglass', company: 'Hourglass' },
    { quote: KICKSTART, name: 'Lana Steiner', title: 'Designer, Layers', company: 'Layers' },
  ],
  'abstract-image': [
    { quote: SPED, name: 'Sienna Hewitt', title: 'Project Manager, Layers', company: 'Layers' },
    { quote: LOVE, name: 'Caitlyn King', title: 'Data Engineer, Sisyphus', company: 'Sisyphus' },
    { quote: SAVED, name: 'Lulu Meyers', title: 'PM, Hourglass', company: 'Hourglass' },
  ],
  'card-split-image': [
    { quote: LOVE, name: 'Renee Wells', title: 'Product Designer, Quotient', company: 'Quotient' },
    { quote: SAVED, name: 'Fleur Cook', title: 'Web Developer, Sisyphus', company: 'Sisyphus' },
    { quote: KICKSTART, name: 'Amélie Laurent', title: 'Product Manager, Sisyphus', company: 'Sisyphus' },
  ],
  glassmorphic: [
    { name: 'Alisa Hester', title: 'PM, Hourglass', supportingText: 'Web Design Agency', quote: '“We’ve really sped up our workflow using Tinicorn.”' },
    { name: 'Rich Wilson', title: 'COO, Command+R', supportingText: 'Web Development Agency', quote: '“We’ve really sped up our workflow using Tinicorn.”' },
    { name: 'Annie Stanley', title: 'Designer, Catalog', supportingText: 'UX Agency', quote: '“Tinicorn has saved us thousands of hours.”' },
    { name: 'Johnny Bell', title: 'PM, Sisyphus', supportingText: 'Machine Learning', quote: '“Love the simplicity of the service.”' },
    { name: 'Mia Ward', title: 'Fullstack Dev, Quotient', supportingText: 'Performance Marketing', quote: '“We can’t imagine working without it.”' },
    { name: 'Archie Young', title: 'Marketing, Layers', supportingText: 'Machine Learning', quote: '“Tinicorn has saved us thousands of hours.”' },
  ],
} satisfies Record<string, Testimonial[]>;

export const caseStudyDefaults: CaseStudy[] = [
  { company: 'Layers', colorClass: 'bg-brand-600', quote: '“Tinicorn has saved us thousands of hours of work. We’re able to spin up projects faster.”' },
  { company: 'Sisyphus', colorClass: 'bg-success-600', quote: '“We’ve been using Tinicorn to kick start every new project and can’t work without it.”' },
  { company: 'Capsule', colorClass: 'bg-blue-600', quote: '“Love the simplicity of the service and the prompt customer support.”' },
  { company: 'Catalog', colorClass: 'bg-indigo-600', quote: '“Tinicorn has saved us thousands of hours of work. We’re able to spin up projects faster.”' },
  { company: 'Quotient', colorClass: 'bg-pink-600', quote: '“We’ve been using Tinicorn to kick start every new project and can’t work without it.”' },
  { company: 'Hourglass', colorClass: 'bg-blue-light-600', quote: '“Love the simplicity of the service and the prompt customer support.”' },
  { company: 'Command+R', colorClass: 'bg-orange-600', quote: '“Tinicorn has saved us thousands of hours of work. We’re able to spin up projects faster.”' },
];

/** Logos row of Type=Simple centered 03. */
export const testimonialLogoDefaults = ['Boltshift', 'Lightbox', 'GlobalBank', 'Spherule', 'Nietzsche'];

export const testimonialHeadingDefaults = {
  glassmorphic: { title: 'Don’t just take our word for it', supportingText: 'Hear from some of our amazing customers who are building faster.' },
  'case-study-cards': { title: 'We’ve helped hundreds of global companies', supportingText: 'Case studies from some of our amazing customers who are building faster.' },
  actions: { secondary: 'Our customers', primary: 'Create account' },
};
