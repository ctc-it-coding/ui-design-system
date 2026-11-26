/* Shared shell + layout fragments for the Settings example pages (Figma "❖ Settings pages 01 / 02"). */
import { Children, Fragment, createContext, isValidElement, useContext, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import {
  ArrowLeft,
  BarChartSquare02,
  Bell01,
  CheckDone01,
  CreditCard01,
  Flag05,
  HomeLine,
  LayersThree01,
  LifeBuoy01,
  LogOut01,
  NotificationBox,
  Passcode,
  PieChart03,
  SearchLg,
  Settings01,
  Toggle01Right,
  User01,
  UserSquare,
  Users01,
  Zap,
} from '../../icons';
import { SidebarNavigation } from '../../components/navigation/SidebarNavigation';
import { HeaderNavigation } from '../../components/navigation/HeaderNavigation';
import { NavItem } from '../../components/navigation/NavItem';
import { NavItemButton } from '../../components/navigation/NavItemButton';
import { NavFeaturedCard } from '../../components/navigation/NavFeaturedCard';
import { navSurface, type NavItemData, type NavTheme } from '../../components/navigation/navTheme';
import { TinicornLogo, TinicornLogomark } from '../../components/logos/TinicornLogo';
import { Avatar } from '../../components/avatars/Avatar';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { PageHeader } from '../../components/headers/PageHeader';
import { SectionLabel } from '../../components/headers/SectionLabel';
import { Tabs, type TabItem, type TabsType } from '../../components/tabs/Tabs';
import { VerticalTabs, type VerticalTabsType } from '../../components/tabs/VerticalTabs';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups/ButtonGroup';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';

/* ------------------------------------------------------------------ */
/* Navigation config                                                   */
/* ------------------------------------------------------------------ */

export type SettingsNavFeatured = 'progress-circle' | 'progress-bar' | 'image';

/** Figma "Sidebar navigation {Open, Style, Theme}" */
export interface SettingsSidebarNav {
  kind: 'sidebar';
  variant: 'simple' | 'slim' | 'dual-tier';
  theme: NavTheme;
  /** Figma Open=True — the settings sub-navigation panel is shown (Slim / Dual-tier). */
  open?: boolean;
  /** Featured card in the sidebar (Simple / Dual-tier). */
  featured?: SettingsNavFeatured;
}

/** Figma "Header navigation {Open, Style, Theme}" */
export interface SettingsHeaderNav {
  kind: 'header';
  variant: 'simple' | 'dual-tier';
  theme: NavTheme;
  /** Figma Open=True — second row with the settings sub-navigation + search (Dual-tier). */
  open?: boolean;
}

export type SettingsNav = SettingsSidebarNav | SettingsHeaderNav;

const mainItems: NavItemData[] = [
  { label: 'Home', icon: HomeLine, href: '#' },
  {
    label: 'Dashboard',
    icon: BarChartSquare02,
    items: [
      { label: 'Overview', href: '#' },
      { label: 'Notifications', href: '#' },
      { label: 'Analytics', href: '#' },
      { label: 'Saved reports', href: '#' },
    ],
  },
  { label: 'Projects', icon: LayersThree01, items: [{ label: 'View all', href: '#' }, { label: 'Archived', href: '#' }] },
  { label: 'Tasks', icon: CheckDone01, href: '#' },
  { label: 'Reporting', icon: PieChart03, href: '#' },
  { label: 'Users', icon: Users01, href: '#' },
];

const account = { name: 'Olivia Rhye', email: 'olivia@untitledui.com', initials: 'OR', onLogout: () => {} };

/** Settings sub-navigation shown in the Slim (Open) panel. */
const slimSubItems: NavItemData[] = [
  { label: 'My details', icon: Flag05, href: '#' },
  { label: 'Profile', icon: User01, href: '#', badge: 10 },
  { label: 'Password', icon: Passcode, href: '#' },
  { label: 'Team', icon: Users01, href: '#' },
  { label: 'Billing', icon: CreditCard01, href: '#' },
  { label: 'Notifications', icon: NotificationBox, href: '#' },
  { label: 'Integrations', icon: Toggle01Right, href: '#' },
];
/** Settings sub-navigation shown in the Dual-tier (Open) panel. */
const dualSubItems: NavItemData[] = [
  { label: 'My details', icon: Flag05, href: '#' },
  { label: 'Notifications', icon: NotificationBox, href: '#', badge: 10 },
  { label: 'Password', icon: Passcode, href: '#' },
  { label: 'Team', icon: Users01, href: '#' },
  { label: 'Billing', icon: CreditCard01, href: '#' },
  { label: 'User settings', icon: UserSquare, href: '#' },
  { label: 'Integrations', icon: Toggle01Right, href: '#' },
];
/** Second row of the Dual-tier header navigation (Open). */
const headerSubItems: NavItemData[] = ['My details', 'Profile', 'Password', 'Team', 'Billing', 'Notifications'].map((label) => ({ label, href: '#' }));

const withCurrent = (items: NavItemData[], current?: string) => items.map((it) => ({ ...it, current: it.label === current }));

const searchInput = <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;

function featuredCard(type: SettingsNavFeatured | undefined, theme: NavTheme) {
  if (!type) return undefined;
  if (type === 'image')
    return (
      <NavFeaturedCard
        theme={theme}
        type="image"
        title="New features available!"
        supportingText="Check out the new dashboard view. Pages now load faster."
        image={<div className="size-full bg-linear-to-br from-brand-200 via-pink-100 to-orange-100" />}
        onDismiss={() => {}}
        secondaryAction={{ label: 'Dismiss' }}
        primaryAction={{ label: 'What’s new?' }}
      />
    );
  return (
    <NavFeaturedCard
      theme={theme}
      type={type}
      title="Used space"
      supportingText="Your team has used 80% of your available space. Need more?"
      progress={80}
      onDismiss={() => {}}
      secondaryAction={{ label: 'Dismiss' }}
      primaryAction={{ label: 'Upgrade plan' }}
    />
  );
}

/** Sub-navigation panel beside the Slim / Dual-tier sidebar (Figma Open=True). Desktop only. */
function SidebarSubPanel({ variant, theme, current }: { variant: 'slim' | 'dual-tier'; theme: NavTheme; current?: string }) {
  const s = navSurface[theme];
  const items = withCurrent(variant === 'slim' ? slimSubItems : dualSubItems, current);
  const list = (
    <ul className="flex flex-col gap-1">
      {items.map((it) => (
        <li key={String(it.label)}>
          <NavItem theme={theme} icon={it.icon} badge={it.badge} current={it.current} href={it.href}>
            {it.label}
          </NavItem>
        </li>
      ))}
    </ul>
  );
  if (variant === 'dual-tier')
    return <div className={cx('flex h-full w-[248px] shrink-0 flex-col overflow-y-auto px-4 pt-8 pb-4 max-lg:hidden', s.subBg, theme === 'default' && 'border-r border-gray-200')}>{list}</div>;
  return (
    <div className={cx('flex h-full w-[282px] shrink-0 flex-col justify-between overflow-y-auto max-lg:hidden', s.subBg, theme === 'default' && 'border-r border-gray-200')}>
      <div className="flex flex-col gap-4 px-4 py-9">
        <p className={cx('text-md font-medium', s.title)}>Settings</p>
        {list}
      </div>
      <div className="flex items-start gap-4 pr-4 pb-6 pl-5">
        <div className="flex min-w-0 flex-1 flex-col text-sm">
          <span className={cx('font-semibold', s.name)}>{account.name}</span>
          <span className={cx('truncate', s.email)}>{account.email}</span>
        </div>
        <Button size="sm" hierarchy="tertiary-gray" iconLeading={LogOut01} aria-label="Log out" className={theme !== 'default' ? 'text-white/70 hover:bg-white/10' : undefined} />
      </div>
    </div>
  );
}

/** Second row of the Dual-tier header navigation (Figma Open=True): settings items + search. Desktop only. */
function HeaderSubRow({ theme, current }: { theme: NavTheme; current?: string }) {
  const bar = theme === 'default' ? 'bg-white border-gray-200' : theme === 'brand' ? 'bg-brand-700 border-brand-600' : 'bg-gray-950 border-gray-600';
  return (
    <div className={cx('border-b max-lg:hidden', bar)}>
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center gap-8 px-8">
        <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {withCurrent(headerSubItems, current).map((it) => (
            <li key={String(it.label)}>
              <NavItem compact theme={theme} current={it.current} href={it.href}>
                {it.label}
              </NavItem>
            </li>
          ))}
        </ul>
        <div className="w-80 shrink-0">{searchInput}</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* App shell                                                            */
/* ------------------------------------------------------------------ */

const railBg: Record<NavTheme, string> = {
  default: 'lg:bg-white lg:shadow-[inset_-1px_0_0_0_var(--color-gray-200)]',
  brand: 'lg:bg-brand-700',
  dark: 'lg:bg-gray-950',
};

const ShellContext = createContext<'sidebar' | 'header'>('sidebar');

export interface SettingsShellProps {
  nav: SettingsNav;
  /** Current item of the settings sub-navigation (sidebar panel / header second row). */
  current?: string;
  /** Background of the main area (Figma Main fill), e.g. `bg-gray-50`. */
  bg?: string;
  /** Extra classes for `<main>` (e.g. `gap-12`, `pt-0`). */
  mainClassName?: string;
  children?: ReactNode;
}

/** Full application screen: navigation (exactly the Figma variant) + main area. */
export function SettingsShell({ nav, current, bg = 'bg-white', mainClassName, children }: SettingsShellProps) {
  const logoFor = (t: NavTheme) => <TinicornLogo dark={t !== 'default'} />;
  if (nav.kind === 'sidebar') {
    const subOpen = nav.open && nav.variant !== 'simple';
    return (
      <ShellContext.Provider value="sidebar">
        <div className={cx('flex min-h-screen w-full flex-col lg:flex-row', bg)}>
          <div className={cx('z-10 lg:shrink-0', railBg[nav.theme])}>
            <div className="lg:sticky lg:top-0 lg:flex lg:h-screen">
            <SidebarNavigation
              variant={nav.variant}
              theme={nav.theme}
              logo={logoFor(nav.theme)}
              logomark={<TinicornLogomark />}
              search={searchInput}
              items={mainItems}
              footerItems={[
                { label: 'Support', icon: LifeBuoy01, href: '#' },
                { label: 'Settings', icon: Settings01, href: '#', current: true },
              ]}
              featuredCard={featuredCard(nav.featured, nav.theme)}
              account={account}
              defaultActiveItemId="none"
              className="lg:h-full"
            />
            {subOpen && <SidebarSubPanel variant={nav.variant as 'slim' | 'dual-tier'} theme={nav.theme} current={current} />}
            </div>
          </div>
          <main className={cx('flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-12', mainClassName)}>{children}</main>
        </div>
      </ShellContext.Provider>
    );
  }
  const t = nav.theme;
  const dual = nav.variant === 'dual-tier';
  return (
    <ShellContext.Provider value="header">
      <div className={cx('flex min-h-screen w-full flex-col', bg)}>
        <HeaderNavigation
          variant="simple"
          theme={t}
          logo={logoFor(t)}
          items={mainItems.map(({ icon, items, ...rest }) => rest)}
          cta={
            dual ? (
              <Button hierarchy="secondary-gray" iconLeading={Zap}>
                Upgrade now
              </Button>
            ) : undefined
          }
          actions={
            <>
              {!dual && <NavItemButton icon={SearchLg} label="Search" />}
              <NavItemButton icon={Settings01} label="Settings" current={!dual} />
              <NavItemButton icon={Bell01} label="Notifications" />
            </>
          }
          avatar={<Avatar size="md" initials="OR" alt="Olivia Rhye" />}
          search={searchInput}
          mobileFooterItems={[
            { label: 'Support', icon: LifeBuoy01, href: '#' },
            { label: 'Settings', icon: Settings01, href: '#', current: true },
          ]}
          mobileAccount={account}
        />
        {dual && nav.open && <HeaderSubRow theme={t} current={current} />}
        <main className={cx('flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-16 lg:pt-12 lg:pb-24', mainClassName)}>{children}</main>
      </div>
    </ShellContext.Provider>
  );
}

/** One horizontal band of the main area (Figma "Header section" / "Section" + "Container"). */
export function PageSection({ children, className, wide, narrow }: { children?: ReactNode; className?: string; wide?: boolean; narrow?: boolean }) {
  const kind = useContext(ShellContext);
  return (
    <section
      className={cx(
        'flex w-full flex-col gap-6 px-4 md:px-8',
        kind === 'header' && !wide && 'mx-auto max-w-[1280px]',
        className,
      )}
    >
      {narrow ? <div className="mx-auto flex w-full max-w-[640px] flex-col gap-6">{children}</div> : children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Headers + tabs                                                       */
/* ------------------------------------------------------------------ */

export interface SettingsPageHeaderProps {
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Search input on the right. */
  search?: boolean;
  /** "Back to …" link above the header (Figma Link color button). */
  back?: string;
  /** Breadcrumb trail after the home icon, e.g. ['Settings', 'Team']. */
  breadcrumbs?: string[];
  actions?: ReactNode;
  /** Bottom divider (Figma Divider in the page header). */
  divider?: boolean;
}

/** Figma "Page header {Style=Simple}" as used by the settings pages. */
export function SettingsPageHeader({ title = 'Settings', supportingText, search, back, breadcrumbs, actions, divider = false }: SettingsPageHeaderProps) {
  return (
    <>
      {back && (
        <div>
          <Button hierarchy="link-color" iconLeading={ArrowLeft} href="#" as="a">
            {back}
          </Button>
        </div>
      )}
      <PageHeader
        title={title}
        supportingText={supportingText}
        divider={divider}
        search={search ? searchInput : undefined}
        actions={actions}
        breadcrumbs={
          breadcrumbs ? (
            <Breadcrumbs type="button-gray" divider="chevron" home items={breadcrumbs.map((label, i) => ({ label, href: i < breadcrumbs.length - 1 ? '#' : undefined }))} />
          ) : undefined
        }
      />
    </>
  );
}

export const SETTINGS_TABS = ['My details', 'Profile', 'Password', 'Team', 'Plan', 'Billing', 'Email', 'Notifications', 'Integrations', 'API'];

const tabId = (label: string) => label.toLowerCase().replace(/[^a-z0-9]+/g, '-');
export const settingsTabItems = (badges: Record<string, ReactNode> = {}, labels: string[] = SETTINGS_TABS): TabItem[] =>
  labels.map((label) => ({ id: tabId(label), label, badge: badges[label] }));

export interface SettingsTabsProps {
  /** Figma "Horizontal tabs" Type. */
  type?: TabsType;
  current?: string;
  badges?: Record<string, ReactNode>;
  labels?: string[];
  className?: string;
}

/** Figma "Horizontal tabs" — settings page tabs (native select on mobile). */
export function SettingsTabs({ type = 'underline', current, badges = { Notifications: 2 }, labels, className }: SettingsTabsProps) {
  const [value, setValue] = useState(current ? tabId(current) : undefined);
  return (
    <Tabs
      type={type}
      size="sm"
      items={settingsTabItems(badges, labels)}
      value={value}
      onChange={setValue}
      mobileSelect
      aria-label="Settings sections"
      className={className}
      listClassName="overflow-x-auto"
    />
  );
}

/** Figma "Vertical tabs" — settings sub-navigation on the left (native select on mobile). */
export function SettingsVerticalTabs({
  type = 'line',
  current,
  badges = { Notifications: 2 },
  labels,
  className,
}: {
  type?: VerticalTabsType;
  current?: string;
  badges?: Record<string, ReactNode>;
  labels?: string[];
  className?: string;
}) {
  const [value, setValue] = useState(current ? tabId(current) : undefined);
  return (
    <VerticalTabs
      type={type}
      size="sm"
      items={settingsTabItems(badges, labels)}
      value={value}
      onChange={setValue}
      mobileSelect
      aria-label="Settings sections"
      className={cx('w-full lg:w-auto lg:shrink-0', className)}
    />
  );
}

/** Figma "Button group" used as page tabs (9 items, no "Email"). Scrolls horizontally on small screens. */
export function SettingsButtonGroupTabs({ current }: { current?: string }) {
  const labels = SETTINGS_TABS.filter((l) => l !== 'Email');
  const [value, setValue] = useState<string | null>(current ?? null);
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
      <ButtonGroup value={value} onChange={setValue} aria-label="Settings sections" className="w-max">
        {labels.map((l) => (
          <ButtonGroupItem key={l} value={l}>
            {l}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    </div>
  );
}

/** Settings layout with vertical tabs on the left and content on the right (Settings pages 02). */
export function VerticalTabsLayout({ tabs, children, gap = 'lg:gap-16', className }: { tabs: ReactNode; children?: ReactNode; gap?: string; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-6 lg:flex-row', gap, className)}>
      {tabs}
      <div className="flex min-w-0 flex-1 flex-col gap-6">{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Form rows                                                            */
/* ------------------------------------------------------------------ */

export interface FormRowProps {
  label?: ReactNode;
  supportingText?: ReactNode;
  /** Tooltip text for the help icon next to the label. */
  help?: ReactNode;
  /** Link actions under the label (Figma Section label Actions=True). */
  labelActions?: ReactNode;
  /** `row` = label column left of the content (Figma desktop); `stack` = label above content. */
  layout?: 'row' | 'stack';
  /** Max width class of the content column (default 512px). */
  contentWidth?: string;
  /** Gap between label and content columns on desktop (default 32px). */
  gap?: string;
  children?: ReactNode;
  className?: string;
}

/** A settings form row — Figma "Section label" + content column. Stacks below `lg`. */
export function FormRow({ label, supportingText, help, labelActions, layout = 'row', contentWidth = 'lg:max-w-[512px]', gap = 'lg:gap-8', children, className }: FormRowProps) {
  const row = layout === 'row';
  return (
    <div className={cx('flex flex-col gap-4', row && cx('lg:flex-row', gap), !row && 'gap-5', className)}>
      {label != null && (
        <SectionLabel
          size="sm"
          title={label}
          supportingText={supportingText}
          help={help}
          actions={labelActions}
          className={cx(row && 'lg:w-[280px] lg:shrink-0', !row && 'max-w-[280px]')}
        />
      )}
      <div className={cx('flex w-full min-w-0 flex-1 flex-col gap-4', row && contentWidth)}>{children}</div>
    </div>
  );
}

/** Stack of form rows separated by 1px gray-200 dividers (Figma Content gap20 + Divider). */
export function FormRows({ children, className, gap = 'gap-5', dividers = true }: { children?: ReactNode; className?: string; gap?: string; dividers?: boolean }) {
  const items = Children.toArray(children).filter(isValidElement);
  return (
    <div className={cx('flex flex-col', gap, className)}>
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && dividers && <hr className="border-0 border-t border-gray-200" />}
          {c}
        </Fragment>
      ))}
    </div>
  );
}

/** White card wrapper used for card-style form sections (Figma Form r12 + shadow-xs). */
export function FormCard({ children, footer, className }: { children?: ReactNode; footer?: ReactNode; className?: string }) {
  return (
    <div className={cx('flex w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs', className)}>
      <div className="flex flex-col gap-6 px-4 py-5 md:p-6">{children}</div>
      {footer != null && <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-4 py-4 md:px-6">{footer}</div>}
    </div>
  );
}

/** Right-aligned Cancel / Save footer (Figma "Section footer {Type=Section}"). */
export function SaveFooter({ save = 'Save', cancel = 'Cancel', divider = true }: { save?: ReactNode; cancel?: ReactNode; divider?: boolean }) {
  return (
    <div className={cx('flex items-center justify-end gap-3', divider && 'border-t border-gray-200 pt-4 md:pt-5')}>
      <Button hierarchy="secondary-gray">{cancel}</Button>
      <Button hierarchy="primary">{save}</Button>
    </div>
  );
}
