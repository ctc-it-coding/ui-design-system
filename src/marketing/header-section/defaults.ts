/** Figma "Header section" placeholder copy per Actions value (and alignment where Figma differs). */
export type HeaderSectionActions = 'buttons' | 'false' | 'tabs' | 'email-capture' | 'search-bar';

export interface HeaderSectionCopy {
  subheading: string;
  title: string;
  supportingText: string;
}

const pricing = 'Simple, transparent pricing that grows with you. Try any plan free for 30 days.';

export const headerSectionDefaults: Record<HeaderSectionActions, HeaderSectionCopy> = {
  buttons: { subheading: 'Pricing', title: 'Plans that fit your scale', supportingText: pricing },
  false: { subheading: 'About us', title: 'About the company', supportingText: 'Learn more about the company and the world-class team behind Tinicorn.' },
  tabs: { subheading: 'Pricing', title: 'Simple, transparent pricing', supportingText: pricing },
  'email-capture': { subheading: 'Resources', title: 'Tinicorn blog', supportingText: 'The latest industry news, technologies and resources from the Tinicorn team.' },
  'search-bar': { subheading: 'Resources', title: 'Support centre', supportingText: 'Get help and support or learn how to use the newest features in Tinicorn.' },
};

export const headerSectionTabs = [
  { id: 'monthly', label: 'Monthly billing' },
  { id: 'annual', label: 'Annual billing' },
];
