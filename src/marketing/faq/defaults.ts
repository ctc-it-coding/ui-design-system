import type { IconSlot } from '../../utils/renderIcon';
import { CreditCardRefresh, File05, Heart, Mail01, SlashCircle01, SwitchHorizontal01 } from '../../icons';

/** One question (Figma "_FAQ item" / FAQ "_Feature text"). */
export interface FaqData {
  question: string;
  answer: string;
  /** Icon for the "Simple" (feature text) layouts. */
  icon?: IconSlot;
}

export const faqs: FaqData[] = [
  {
    icon: Heart,
    question: 'Is there a free trial available?',
    answer: 'Yes, you can try us for free for 30 days. Our friendly team will work with you to get you up and running as soon as possible.',
  },
  {
    icon: SwitchHorizontal01,
    question: 'Can I change my plan later?',
    answer: 'Of course. Our pricing scales with your company. Chat to our friendly team to find a solution that works for you.',
  },
  {
    icon: SlashCircle01,
    question: 'What is your cancellation policy?',
    answer: 'We understand that things change. You can cancel your plan at any time and we’ll refund you the difference already paid.',
  },
  {
    icon: File05,
    question: 'Can other info be added to an invoice?',
    answer: 'At the moment, the only way to add additional information to invoices is to add the information to the workspace’s name.',
  },
  {
    icon: CreditCardRefresh,
    question: 'How does billing work?',
    answer: 'Plans are per workspace, not per account. You can upgrade one workspace, and still have any number of free workspaces.',
  },
  {
    icon: Mail01,
    question: 'How do I change my account email?',
    answer: 'You can change the email address associated with your account by going to untitled.com/account from a laptop or desktop.',
  },
];

/** Accordion answer of the first item (Figma "_FAQ item" default copy). */
export const faqAccordion: FaqData[] = faqs.map((f, i) =>
  i === 0
    ? { ...f, answer: 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.' }
    : f,
);

export interface FaqCopy {
  subheading?: string;
  title?: string;
  supportingText?: string;
}

const long = 'Everything you need to know about the product and billing. Can’t find the answer you’re looking for? Please chat to our friendly team.';

export const faqSectionCopy: Record<string, FaqCopy> = {
  'simple-01': { title: 'Frequently asked questions', supportingText: 'Everything you need to know about the product and billing.' },
  'simple-02': { title: 'FAQs', supportingText: long },
  'simple-03': { subheading: 'Support', title: 'Frequently asked questions', supportingText: long },
  'simple-04': { title: 'FAQs', supportingText: long },
  'accordion-01': { title: 'Frequently asked questions', supportingText: 'Everything you need to know about the product and billing.' },
  'accordion-02': { title: 'Frequently asked questions', supportingText: 'Everything you need to know about the product and billing.' },
  'accordion-03': { subheading: 'Support', title: 'FAQs', supportingText: long },
  'accordion-04': { subheading: 'Support', title: 'FAQs', supportingText: long },
};

/** "Still have questions?" call-to-action box. */
export const faqCta = {
  title: 'Still have questions?',
  supportingText: 'Can’t find the answer you’re looking for? Please chat to our friendly team.',
  action: 'Get in touch',
};
