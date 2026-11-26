import { Download01, FolderCheck, Star01, TrendUp01 } from '../../icons';
import type { IconSlot } from '../../utils/renderIcon';

export interface MetricData {
  number: string;
  label: string;
  supportingText?: string;
  icon?: IconSlot;
  /** link label shown by the accent-line type */
  actionLabel?: string;
  href?: string;
}

/** Figma placeholder metrics (Metrics section). */
export const defaultMetrics: MetricData[] = [
  { number: '400+', label: 'Projects completed', supportingText: 'We’ve helped build over 400 amazing projects.', icon: FolderCheck, actionLabel: 'View projects' },
  { number: '600%', label: 'Return on investment', supportingText: 'Our customers have reported an average of ~600% ROI.', icon: TrendUp01, actionLabel: 'Learn more' },
  { number: '10k', label: 'Global downloads', supportingText: 'Our free UI kit has been downloaded over 10k times.', icon: Download01, actionLabel: 'Download now' },
  { number: '200+', label: '5-star reviews', supportingText: 'We’re proud of our 5-star rating with over 200 reviews.', icon: Star01, actionLabel: 'View reviews' },
];

export const metricsCopy = {
  title: 'Build something great',
  text: 'Everything you need to build modern UI and great products.',
  subheading: 'Launch faster',
  splitText: 'Everything you need to build modern UI and great products. We’ve done all the heavy lifting so you don’t have to — the perfect starting point for any project.',
  split02Subheading: 'Build better, launch faster',
  split02Title: 'Build great products, faster than ever',
  cardTitle: 'Great products, faster than ever',
};
