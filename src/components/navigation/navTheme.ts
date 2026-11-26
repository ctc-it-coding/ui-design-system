import { createContext, useContext, type MouseEvent, type ReactNode } from 'react';
import type { IconSlot } from '../../utils/renderIcon';

/** Figma: Theme (Default / Brand / Dark — "Gray dark" in the base components). */
export type NavTheme = 'default' | 'brand' | 'dark';

export const NavThemeContext = createContext<NavTheme>('default');
export const useNavTheme = (theme?: NavTheme) => {
  const ctx = useContext(NavThemeContext);
  return theme ?? ctx;
};

/** Data shape used by SidebarNavigation / HeaderNavigation to render nav items. */
export interface NavItemData {
  /** Stable id (defaults to the label when it is a string). */
  id?: string;
  label: ReactNode;
  icon?: IconSlot;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Figma: Badge — e.g. a count. */
  badge?: ReactNode;
  /** Figma: _Dot — small status dot before the label. */
  dot?: boolean;
  /** Figma: Current=True */
  current?: boolean;
  /** Nested items (dropdown in Simple sidebars, sub-nav panel in Slim / Dual-tier). */
  items?: NavItemData[];
}

export const navItemId = (item: NavItemData, i: number) => item.id ?? (typeof item.label === 'string' ? item.label : String(i));

/** Surfaces of the navigation containers per theme. */
export const navSurface: Record<NavTheme, { bg: string; border: string; divider: string; subBg: string; title: string; name: string; email: string; mobileBar: string }> = {
  default: {
    bg: 'bg-white',
    border: 'border-gray-200',
    divider: 'border-gray-200',
    subBg: 'bg-white',
    title: 'text-gray-900',
    name: 'text-gray-900',
    email: 'text-gray-600',
    mobileBar: 'bg-white border-b border-gray-200',
  },
  brand: {
    bg: 'bg-brand-700',
    border: 'border-brand-600',
    divider: 'border-brand-600',
    subBg: 'bg-brand-800',
    title: 'text-white',
    name: 'text-white',
    email: 'text-brand-200',
    mobileBar: 'bg-brand-700 border-b border-brand-600',
  },
  dark: {
    bg: 'bg-gray-950',
    border: 'border-gray-600',
    divider: 'border-gray-600',
    subBg: 'bg-gray-900',
    title: 'text-white',
    name: 'text-white',
    email: 'text-gray-300',
    mobileBar: 'bg-gray-950 border-b border-gray-600',
  },
};
