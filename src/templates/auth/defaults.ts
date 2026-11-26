import type { AuthTestimonial } from './_shared';

/** Figma placeholder copy for the auth screens. */
export const authCopy = {
  copyright: '© Tinicorn 2077',
  email: 'help@untitledui.com',
  loginSupporting: 'Welcome back! Please enter your details.',
  signupSupporting: 'Start your 30-day free trial.',
};

export const amelie: AuthTestimonial = {
  quote: '“We’ve been using Tinicorn to kick start every new project and can’t imagine working without it.”',
  name: 'Amélie Laurent',
  title: 'Lead Designer, Layers',
  company: 'Web Development Agency',
  initials: 'AL',
};

export const pippa: AuthTestimonial = {
  quote: 'We’ve been using Tinicorn to kick start every new project and can’t imagine working without it.',
  name: 'Pippa Wilkinson',
  title: 'Head of Design, Layers',
  initials: 'PW',
};

export const aliah: AuthTestimonial = {
  quote: 'Few things make me feel more powerful than setting up automations in Tinicorn to make my life easier and more efficient.',
  name: '— Aliah Lane',
  title: 'Founder, Layers.io',
  initials: 'AL',
};

export const lori: AuthTestimonial = {
  quote: 'Tinicorn has saved us thousands of hours of work. We’re able to spin up projects and features much faster.',
  name: 'Lori Bryson',
  title: 'Product Designer, Sisyphus',
  initials: 'LB',
};

const q1 = '“We’ve been using Tinicorn to kick start every new project and can’t imagine working without it. It’s incredible.”';
const q2 = '“Tinicorn has saved us thousands of hours of work. We’re able to spin up projects faster and take on more clients.”';

export const fleur: AuthTestimonial = { quote: q1, name: 'Fleur Cook', title: 'Founder, Catalog', company: 'Web Design Agency' };
export const lula: AuthTestimonial = { quote: q2, name: 'Lula Meyers', title: 'Product Manager, Hourglass', company: 'Web Design Agency' };
export const caitlyn: AuthTestimonial = { quote: q1, name: 'Caitlyn King', title: 'Lead Designer, Layers', company: 'Web Development Agency' };
export const henley: AuthTestimonial = { quote: q2, name: 'Henley Shepherd', title: 'Product Manager, Hourglass', company: 'Web Design Agency' };

/** Extra slides so carousels have something to cycle through. */
export const moreTestimonials: AuthTestimonial[] = [
  { quote: '“Tinicorn has completely changed how our team ships. We move faster and stay consistent.”', name: 'Olivia Rhye', title: 'Designer, Layers', company: 'Web Design Agency', initials: 'OR' },
  { quote: '“The best design system investment we’ve made. Our developers love it as much as our designers.”', name: 'Phoenix Baker', title: 'Engineering Lead, Sisyphus', company: 'Product Studio', initials: 'PB' },
];

export interface AuthSlide {
  title: string;
  supportingText: string;
}

export const loginSlides: AuthSlide[] = [
  { title: 'Welcome to your new dashboard', supportingText: 'Sign in to explore changes we’ve made.' },
  { title: 'Insights at a glance', supportingText: 'Track your most important metrics in one place.' },
  { title: 'Collaborate with your team', supportingText: 'Share dashboards and reports in a single click.' },
  { title: 'Built for speed', supportingText: 'Everything loads instantly, wherever you are.' },
];

export const signupSlides: AuthSlide[] = [
  { title: 'Introducing AutoReports 2.0®', supportingText: 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.' },
  { title: 'Real-time revenue tracking', supportingText: 'See every sale the moment it happens and spot trends early.' },
  { title: 'Reports on autopilot', supportingText: 'Schedule beautiful reports and send them to your whole team.' },
  { title: 'Integrations that just work', supportingText: 'Connect your favourite tools in minutes, not weeks.' },
];

export const heroCopy = {
  title: 'Start turning your ideas into reality.',
  supportingText: 'Create a free account and get full access to all features for 30-days. No credit card needed. Trusted by over 4,000 professionals.',
  supportingTextArrow: 'Create a free account and get full access to all features for 30-days. No credit card needed. Get started in 2 minutes.',
};
