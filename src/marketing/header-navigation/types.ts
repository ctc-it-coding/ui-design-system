import type { ReactNode } from 'react';
import type { IconSlot } from '../../utils/renderIcon';

/** Figma "Dropdown header navigation" Type. */
export type DropdownHeaderNavType =
  | 'simple'
  | 'simple-with-footer'
  | 'simple-2-col'
  | 'simple-2-col-with-footer'
  | 'featured-card'
  | '2-col-with-links-and-footer'
  | 'featured-posts';

/** Figma "Full-width header navigation" Type. */
export type FullWidthHeaderNavType =
  | '2-col-with-sidebar'
  | '3-col-with-sidebar'
  | '4-col-with-footer'
  | '2-col-with-links'
  | '4-col-slim-with-footer'
  | 'blog-posts-with-footer'
  | 'blog-posts-with-sidebar';

export type MarketingHeaderNavType = DropdownHeaderNavType | FullWidthHeaderNavType;
export type MarketingHeaderNavVariant = 'dropdown' | 'full-width';

/** A plain link (label + href). */
export interface NavLink {
  label: ReactNode;
  href?: string;
  icon?: IconSlot;
  onClick?: () => void;
}

/** One "_Nav menu item" row. */
export interface NavMenuLinkData {
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  /** Leading icon (24px "Small" icon, or 48px featured icon when the menu uses `iconStyle="featured"`). */
  icon?: IconSlot;
  /** Badge next to the title (e.g. `<Badge color="success">New</Badge>`). */
  badge?: ReactNode;
  /** Optional "Learn more"-style link-color action under the text. */
  action?: NavLink;
}

/** Figma "_Nav menu item card" Type. */
export type NavMenuCardType = 'video' | 'feature' | 'image';

export interface NavMenuCardData {
  type?: NavMenuCardType;
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  imageSrc?: string;
  /** Link buttons under the text (first = link-gray when there are two, last = link-color). */
  actions?: NavLink[];
}

export interface NavMenuSection {
  /** Brand-colored section heading ("Resources", "Company"…). */
  title?: ReactNode;
  items: NavMenuLinkData[];
}

/** Structured content of one dropdown / mega menu. The header `type` decides how it is laid out. */
export interface NavMenuContent {
  /** Menu heading + supporting text (Type "2-col with links and footer"). */
  heading?: ReactNode;
  supportingText?: ReactNode;
  /** Item columns. Simple types flatten all sections into one list. */
  sections?: NavMenuSection[];
  /** Plain link list column ("Get started" links). */
  links?: { title?: ReactNode; items: NavLink[] };
  /** Cards (featured card, video cards, blog posts). */
  cards?: NavMenuCardData[];
  /** Heading above the cards ("Latest blog posts"). */
  cardsTitle?: ReactNode;
  /** Link-color action under the cards ("View all posts"). */
  cardsAction?: NavLink;
  /** Footer strip. */
  footer?: {
    /** Leading gray text ("Ready to get started?"). */
    text?: ReactNode;
    /** Left-hand actions (after `text`). */
    primary?: NavLink[];
    /** Right-hand actions. */
    secondary?: NavLink[];
    /** Footer as columns of actions (Type "2-col with links and footer"). */
    columns?: NavLink[][];
  };
}

/** One top-level header navigation entry. */
export interface MarketingNavItem {
  label: string;
  href?: string;
  /** Dropdown / mega menu: structured content, or any custom node. */
  menu?: NavMenuContent | ReactNode;
}
