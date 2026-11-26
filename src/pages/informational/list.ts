import type { ComponentType } from 'react';
import * as P1 from './Informational01Pages';
import * as P2 from './Informational02Pages';

const titles1 = [
  'Designer profile', 'Designer profile with tabs', 'Stays search with map', 'Sources debugger', 'Project overview and messages',
  'Project overview and activity', 'Conversation and contact', 'Inbox', 'Customers', 'Customers with metrics',
  'Orders and billing', 'Orders', 'Files and assets', 'Trade history', 'Trade history card',
];
const titles2 = [
  'Designer profile', 'Designer profile centered', 'Stays search', 'Sources debugger', 'Project overview and share',
  'Project overview and activity', 'Conversation and contact', 'Inbox', 'Customers', 'Customers with metrics',
  'Orders', 'Orders with filters', 'Files and assets', 'Trade history', 'Trade history card',
];

const pad = (n: number) => String(n).padStart(2, '0');

/** Every Informational page with its component, in Figma frame order. */
export const informationalPages: { name: string; category: string; title: string; component: ComponentType }[] = [
  ...titles1.map((title, i) => ({
    name: `Informational01Page${pad(i + 1)}`,
    category: 'Informational pages 01',
    title,
    component: (P1 as Record<string, ComponentType>)[`Informational01Page${pad(i + 1)}`]!,
  })),
  ...titles2.map((title, i) => ({
    name: `Informational02Page${pad(i + 1)}`,
    category: 'Informational pages 02',
    title,
    component: (P2 as Record<string, ComponentType>)[`Informational02Page${pad(i + 1)}`]!,
  })),
];

/** `[{ name, category }]` of all Informational pages. */
export const informationalPageList: { name: string; category: string }[] = informationalPages.map(({ name, category }) => ({ name, category }));
