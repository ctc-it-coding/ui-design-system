/* Shared shells, navigation presets and small building blocks for the Informational example pages. */
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { IconSlot } from '../../utils/renderIcon';
import {
  BarChartSquare02,
  Bell01,
  CheckDone01,
  Home01,
  LayersThree01,
  LifeBuoy01,
  PieChart03,
  SearchLg,
  Settings01,
  Users01,
} from '../../icons';
import { SidebarNavigation, HeaderNavigation, NavFeaturedCard, NavItemButton, type NavItemData, type NavTheme } from '../../components/navigation';
import { TinicornLogo } from '../../components/logos';
import { Input } from '../../components/inputs';
import { Avatar } from '../../components/avatars';
import type { TabItem } from '../../components/tabs';
import { Breadcrumbs } from '../../components/breadcrumbs';
import { Button } from '../../components/buttons';
import { ArrowLeft } from '../../icons';

/* ------------------------------------------------------------------------------------------------
 * Navigation presets
 * ---------------------------------------------------------------------------------------------- */

const TOP: { label: string; icon: IconSlot }[] = [
  { label: 'Home', icon: Home01 },
  { label: 'Dashboard', icon: BarChartSquare02 },
  { label: 'Projects', icon: LayersThree01 },
  { label: 'Tasks', icon: CheckDone01 },
  { label: 'Reporting', icon: PieChart03 },
  { label: 'Users', icon: Users01 },
];

export interface NavPreset {
  /** Top-level item that is current (one of Home, Dashboard, Projects, Tasks, Reporting, Users). */
  current: string;
  /** Rename the current top-level item (e.g. "Designers"). */
  label?: string;
  /** Replace the current top-level item's icon. */
  icon?: IconSlot;
  /** Sub items of the current item (sub-nav panel / dropdown / second header row). */
  sub?: string[];
  /** Index of the current sub item (default 0). */
  subCurrent?: number;
}

export function buildNavItems({ current, label, icon, sub, subCurrent = 0 }: NavPreset, icons = true): NavItemData[] {
  return TOP.map((t) => {
    const isCurrent = t.label === current;
    return {
      id: t.label,
      label: isCurrent && label ? label : t.label,
      icon: icons ? (isCurrent && icon ? icon : t.icon) : undefined,
      href: '#',
      current: isCurrent,
      items: isCurrent && sub?.length ? sub.map((s, i) => ({ id: `${s}-${i}`, label: s, href: '#', current: i === subCurrent })) : undefined,
    };
  });
}

const footerItems: NavItemData[] = [
  { label: 'Support', icon: LifeBuoy01, href: '#' },
  { label: 'Settings', icon: Settings01, href: '#' },
];
const account = { name: 'Olivia Rhye', email: 'olivia@tinicorn.com', initials: 'OR', onLogout: () => {} };

export function NavLogo({ theme = 'default', markOnly }: { theme?: NavTheme; markOnly?: boolean }) {
  return <TinicornLogo wordmark="Tinicorn" dark={theme !== 'default'} markOnly={markOnly} />;
}

const navSearch = <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;

export interface SideNavConfig extends NavPreset {
  /** Figma: Style */
  variant: 'simple' | 'slim' | 'dual-tier';
  /** Figma: Theme */
  theme?: NavTheme;
}

/** Figma "Sidebar navigation" instance used by the example pages. Open=True ⇔ `sub` given (Slim / Dual-tier). */
export function AppSidebar({ variant, theme = 'default', ...preset }: SideNavConfig) {
  return (
    <SidebarNavigation
      variant={variant}
      theme={theme}
      logo={<NavLogo theme={theme} />}
      logomark={<NavLogo theme={theme} markOnly />}
      search={navSearch}
      items={buildNavItems(preset)}
      footerItems={footerItems}
      featuredCard={
        variant === 'slim' ? undefined : (
          <NavFeaturedCard
            theme={theme}
            type={variant === 'dual-tier' ? 'progress-circle' : 'progress-bar'}
            title="Used space"
            supportingText="Your team has used 80% of your available space. Need more?"
            progress={80}
            onDismiss={() => {}}
            secondaryAction={{ label: 'Dismiss' }}
            primaryAction={{ label: 'Upgrade plan' }}
          />
        )
      }
      account={account}
    />
  );
}

export interface HeaderNavConfig extends NavPreset {
  variant?: 'simple' | 'dual-tier';
  theme?: NavTheme;
}

/** Figma "Header navigation" instance used by the example pages. Dual-tier Open=True ⇔ `sub` given. */
export function AppHeader({ variant = 'simple', theme = 'default', ...preset }: HeaderNavConfig) {
  const open = variant === 'dual-tier' && !!preset.sub?.length;
  return (
    <HeaderNavigation
      variant={variant}
      theme={theme}
      logo={<NavLogo theme={theme} />}
      items={buildNavItems(open ? preset : { ...preset, sub: undefined }, false)}
      search={open ? navSearch : undefined}
      actions={
        <>
          <NavItemButton theme={theme} icon={Settings01} label="Settings" />
          <NavItemButton theme={theme} icon={Bell01} label="Notifications" />
        </>
      }
      avatar={<Avatar size="md" initials="OR" status="online" alt="Olivia Rhye" />}
      mobileFooterItems={footerItems}
      mobileAccount={account}
    />
  );
}

/* ------------------------------------------------------------------------------------------------
 * Page shells
 * ---------------------------------------------------------------------------------------------- */

export function SidebarShell({ nav, children, className, mainClassName }: { nav: SideNavConfig; children?: ReactNode; className?: string; mainClassName?: string }) {
  return (
    <div className={cx('flex min-h-screen w-full flex-col bg-white lg:flex-row', className)}>
      <div className="z-30 lg:sticky lg:top-0 lg:h-screen lg:shrink-0">
        <AppSidebar {...nav} />
      </div>
      <main className={cx('min-w-0 flex-1', mainClassName)}>{children}</main>
    </div>
  );
}

export function HeaderShell({ nav, children, className, mainClassName }: { nav: HeaderNavConfig; children?: ReactNode; className?: string; mainClassName?: string }) {
  return (
    <div className={cx('flex min-h-screen w-full flex-col bg-white', className)}>
      <AppHeader {...nav} />
      <main className={cx('flex-1', mainClassName)}>{children}</main>
    </div>
  );
}

/** Horizontal padding of sidebar pages (Figma Container p[0,32] desktop / p[0,16] mobile). */
export function Pad({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cx('px-4 md:px-8', className)}>{children}</div>;
}

/** 1280px container of header-navigation pages. */
export function Wrap({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cx('mx-auto w-full max-w-[1280px] px-4 md:px-8', className)}>{children}</div>;
}

export const tabItems = (labels: string[]): TabItem[] => labels.map((l) => ({ id: l.toLowerCase().replace(/\W+/g, '-'), label: l }));

export const initialsOf = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');

/** Figma Page header breadcrumbs (button-gray, chevron, home icon). */
export function Crumbs({ items }: { items: string[] }) {
  return <Breadcrumbs type="button-gray" divider="chevron" home="#" items={items.map((label) => ({ label, href: '#' }))} />;
}

/** "← Back to …" link button. */
export function BackLink({ children }: { children: ReactNode }) {
  return (
    <Button as="a" href="#" size="md" hierarchy="link-color" iconLeading={ArrowLeft} className="w-fit">
      {children}
    </Button>
  );
}

export const SCHEMA_CODE = `// Imports
import mongoose, { Schema } from 'tinicorn'

// Collection name
export const collection = 'Design'

// Schema
const schema = new Schema({
  name: {
    type: String,
    required: true
  },

  description: {
    type: String
  }
}, {timestamps: true})

// Model
export default tinicorn.model(collection, schema, collection)`;
