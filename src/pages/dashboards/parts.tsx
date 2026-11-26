/* Shared fragments of the Figma "❖ Dashboards 01 / 02" example pages: app shells, sections, tables, panels. */
import { createContext, useContext, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { IconSlot } from '../../utils/renderIcon';
import {
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  BarChartSquare02,
  Bell01,
  Calendar,
  CheckDone01,
  Coins01,
  CoinsStacked01,
  CurrencyDollar,
  DotsVertical,
  DownloadCloud02,
  Edit01,
  Edit04,
  FilterLines,
  HomeLine,
  HomeSmile,
  LayersThree01,
  LifeBuoy01,
  Monitor04,
  PieChart03,
  Plus,
  RefreshCcw02,
  SearchLg,
  Send01,
  Settings01,
  Settings03,
  ShoppingBag02,
  ShoppingCart01,
  Trash01,
  TrendDown01,
  TrendUp01,
  Umbrella03,
  UploadCloud02,
  UserPlus01,
  Users01,
  XClose,
  Zap,
} from '../../icons';
import { SidebarNavigation, HeaderNavigation, NavFeaturedCard, NavItemButton, type NavItemData, type NavTheme } from '../../components/navigation';
import { TinicornLogo, TinicornLogomark } from '../../components/logos';
import { Input } from '../../components/inputs';
import { Button } from '../../components/buttons';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups';
import { Avatar, AvatarGroup } from '../../components/avatars/Avatar';
import { AvatarProfilePhoto } from '../../components/avatars/AvatarProfilePhoto';
import { Badge, type BadgeColor, type BadgeType } from '../../components/badges/Badge';
import { PageHeader, SectionHeader, SectionFooter, CardHeader } from '../../components/headers';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import { Tabs, VerticalTabs, type TabsType } from '../../components/tabs';
import { LineChart, BarChart, PieChart, ActivityGauge, RadarChart, Legend, type ChartSeries, type ChartLegendPosition } from '../../components/charts';
import { MetricItem, MetricChange, MiniChart } from '../../components/metrics';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableLead, TableBadges } from '../../components/table';
import { Checkbox } from '../../components/checkboxes/Checkbox';
import { ProgressBar } from '../../components/progress/ProgressBar';
import { ProgressCircle } from '../../components/progress/ProgressCircle';
import { Pagination, type PaginationType } from '../../components/pagination/Pagination';
import { PaginationDots } from '../../components/pagination/PaginationDots';
import { PaymentIcon } from '../../components/misc-icons/PaymentIcon';
import { FileTypeIcon } from '../../components/misc-icons/FileTypeIcon';
import { Flag } from '../../components/misc-icons/Flag';
import type { FlagCode } from '../../components/misc-icons/data/flags.data';
import type { PaymentMethod } from '../../components/misc-icons/data/payment.data';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Message } from '../../components/messaging';
import { ContentDivider } from '../../components/content-divider/ContentDivider';
import { FeedItem, ActivityFeed } from '../../components/activity-feed';
import { FileUploadDropzone } from '../../components/file-upload/FileUploadDropzone';
import { DateRangePicker } from '../../components/date-picker';
import { CreditCardMockup, type CreditCardTheme } from '../../components/media';
import { ContactVectorMap } from '../../marketing/contact/Maps';
import { BlogPostCard } from '../../marketing/blog/BlogPostCard';

/* ================================================================================================
 * Data helpers
 * ============================================================================================== */

export const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const JULY = ['3 Jul', '7 Jul', '11 Jul', '15 Jul', '19 Jul', '23 Jul', '27 Jul', '31 Jul'];
export const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Deterministic pseudo-random series so the charts look like the Figma shapes without changing on re-render. */
export function series(seed: number, n: number, base: number, amp: number, trend = 0): number[] {
  const out: number[] = [];
  let s = seed;
  for (let i = 0; i < n; i++) {
    s = (s * 9301 + 49297) % 233280;
    const r = s / 233280;
    out.push(Math.round(base + trend * i + amp * (Math.sin(i * 0.9 + seed) * 0.6 + (r - 0.5) * 0.8)));
  }
  return out;
}

const initials = (name: string) =>
  name
    .split(/\s+/)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

/* ================================================================================================
 * Navigation shells
 * ============================================================================================== */

const dashboardSub: NavItemData[] = [
  { label: 'Overview', href: '#', current: true },
  { label: 'Notifications', href: '#', badge: 10 },
  { label: 'Analytics', href: '#' },
  { label: 'Saved reports', href: '#' },
  { label: 'Scheduled reports', href: '#' },
  { label: 'User reports', href: '#' },
];

function navItems(withSub: boolean, simple = false): NavItemData[] {
  const sub = (items: NavItemData[]) => (withSub || simple ? items : undefined);
  return [
    { label: 'Home', icon: HomeLine, href: '#', items: simple ? [{ label: 'Overview', href: '#' }, { label: 'Updates', href: '#' }] : undefined },
    { label: 'Dashboard', icon: BarChartSquare02, href: '#', current: true, items: sub(simple ? dashboardSub.map((d) => ({ ...d, current: false })) : dashboardSub) },
    { label: 'Projects', icon: LayersThree01, href: '#', items: simple ? [{ label: 'View all', href: '#' }, { label: 'Archived', href: '#' }] : undefined },
    { label: 'Tasks', icon: CheckDone01, href: '#' },
    { label: 'Reporting', icon: PieChart03, href: '#' },
    { label: 'Users', icon: Users01, href: '#' },
  ];
}
const footerNav: NavItemData[] = [
  { label: 'Support', icon: LifeBuoy01, href: '#' },
  { label: 'Settings', icon: Settings01, href: '#' },
];
const account = { name: 'Olivia Rhye', email: 'olivia@untitledui.com', initials: 'OR', onLogout: () => {} };
const navSearch = <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;

export type FeaturedCardKind = 'progress-bar' | 'progress-circle' | 'image' | 'none';

function featuredCard(kind: FeaturedCardKind, theme: NavTheme): ReactNode {
  if (kind === 'none') return null;
  if (kind === 'progress-bar')
    return <NavFeaturedCard theme={theme} type="progress-bar" title="Monthly budget" supportingText="You’re at 80% of your budget." progress={80} onDismiss={() => {}} />;
  if (kind === 'progress-circle')
    return (
      <NavFeaturedCard theme={theme} type="progress-circle" title="Used space" supportingText="Your team has used 80% of your available space. Need more?" progress={80} onDismiss={() => {}} />
    );
  return (
    <NavFeaturedCard
      theme={theme}
      type="image"
      title="New features available!"
      supportingText="Check out the new dashboard view. Pages now load faster."
      image={<div className="size-full bg-linear-to-br from-brand-200 via-pink-100 to-orange-100" />}
      primaryAction={{ label: 'What’s new?' }}
      onDismiss={() => {}}
    />
  );
}

export interface SidebarShellProps {
  /** Figma Sidebar navigation Style */
  variant: 'simple' | 'slim' | 'dual-tier';
  /** Figma Sidebar navigation Theme */
  theme?: NavTheme;
  /** Figma Open=True (Slim / Dual-tier sub-navigation panel visible). */
  open?: boolean;
  featured?: FeaturedCardKind;
  /** Right-hand side panel (desktop ≥ xl: fixed 392/400px column, below that it stacks under the main content). */
  sidePanel?: ReactNode;
  sidePanelClassName?: string;
  /** Keep the side panel below the main content on small screens (Figma mobile frames drop most side panels). */
  sidePanelMobile?: boolean;
  /** Main area background (Figma Main fill) */
  mainClassName?: string;
  children: ReactNode;
}

/** App shell with the left sidebar navigation (Figma "Sidebar navigation" + Main [+ Side panel]). */
export function SidebarShell({ variant, theme = 'default', open = false, featured = 'progress-bar', sidePanel, sidePanelClassName, sidePanelMobile = false, mainClassName, children }: SidebarShellProps) {
  const brand = theme !== 'default';
  const logo = <TinicornLogo dark={brand} />;
  const nav = (
    <SidebarNavigation
      variant={variant}
      theme={theme}
      logo={logo}
      logomark={<TinicornLogomark />}
      search={variant === 'slim' ? undefined : navSearch}
      items={navItems(open, variant === 'simple')}
      footerItems={footerNav}
      featuredCard={variant === 'slim' || variant === 'simple' ? undefined : featuredCard(featured, theme)}
      account={account}
      className="lg:h-full"
    />
  );
  const body = (
    <div className={cx('flex min-w-0 flex-1 flex-col xl:flex-row', !brand && mainClassName)}>
      <main className={cx('flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-12', brand && 'lg:pt-8')}>{children}</main>
      {sidePanel && (
        <aside className={cx('w-full shrink-0 border-gray-200 max-xl:border-t xl:w-[392px] xl:border-l', !sidePanelMobile && 'max-xl:hidden', sidePanelClassName)}>{sidePanel}</aside>
      )}
    </div>
  );
  return (
    <div className={cx('flex min-h-screen flex-col lg:flex-row', brand ? 'bg-brand-700' : 'bg-white')}>
      <div className={cx('z-20 lg:shrink-0', !brand && 'lg:shadow-[inset_-1px_0_0_var(--color-gray-200)]')}>
        <div className="lg:sticky lg:top-0 lg:h-screen">{nav}</div>
      </div>
      {brand ? (
        <div className="flex min-w-0 flex-1 flex-col lg:py-3">
          <div className={cx('flex min-w-0 flex-1 bg-white lg:overflow-hidden lg:rounded-l-[40px]', mainClassName)}>{body}</div>
        </div>
      ) : (
        body
      )}
    </div>
  );
}

export interface HeaderShellProps {
  /** Figma Header navigation Style */
  variant: 'simple' | 'dual-tier';
  theme?: NavTheme;
  /** Figma Open=True — second row with the Dashboard sub-items + search. */
  open?: boolean;
  /** Label of the current sub-item (Dual-tier Open). */
  subCurrent?: string;
  /** Replaces "Saved reports" in the sub navigation (Figma page 05 shows "Your cards"). */
  subExtra?: string;
  /** Page background (Figma Desktop fill) */
  className?: string;
  children: ReactNode;
}

/** App shell with the top header navigation and a 1280px centered main column (Figma "Header navigation" + Main). */
export function HeaderShell({ variant, theme = 'default', open = false, subCurrent = 'Overview', subExtra, className, children }: HeaderShellProps) {
  const brand = theme !== 'default';
  const sub = dashboardSub.map((s) => ({
    ...s,
    label: subExtra && s.label === 'Saved reports' ? subExtra : s.label,
    current: (subExtra && s.label === 'Saved reports' ? subExtra : s.label) === subCurrent,
    badge: undefined,
  }));
  const items: NavItemData[] = navItems(false).map(({ icon, items, ...rest }) => ({ ...rest, items: rest.label === 'Dashboard' && open ? sub : undefined }));
  const actions =
    variant === 'simple' ? (
      <>
        <NavItemButton theme={theme} icon={SearchLg} label="Search" />
        <NavItemButton theme={theme} icon={Settings01} label="Settings" />
        <NavItemButton theme={theme} icon={Bell01} label="Notifications" />
      </>
    ) : (
      <>
        <NavItemButton theme={theme} icon={Settings01} label="Settings" />
        <NavItemButton theme={theme} icon={Bell01} label="Notifications" />
      </>
    );
  return (
    <div className={cx('min-h-screen', className ?? 'bg-white')}>
      <HeaderNavigation
        variant={variant}
        theme={theme}
        logo={<TinicornLogo dark={brand} />}
        items={items}
        cta={variant === 'dual-tier' && !brand ? <Button hierarchy="secondary-gray" iconLeading={Zap}>Upgrade now</Button> : undefined}
        actions={actions}
        avatar={<Avatar size="md" initials="OR" status="online" />}
        search={variant === 'dual-tier' && open ? navSearch : undefined}
        mobileFooterItems={footerNav}
        mobileAccount={account}
      />
      <main className="flex flex-col gap-8 pt-8 pb-12 md:pt-12 md:pb-24">{children}</main>
    </div>
  );
}

const FlushContext = createContext(false);

/** Removes the horizontal padding of nested `Container`s (used when sections sit inside an already padded column). */
export function Flush({ children }: { children: ReactNode }) {
  return <FlushContext.Provider value={true}>{children}</FlushContext.Provider>;
}

/** Horizontal page container: full width inside sidebar shells, 1280px centered in header shells. */
export function Container({ wide, className, children }: { wide?: boolean; className?: string; children: ReactNode }) {
  const flush = useContext(FlushContext);
  return <div className={cx('w-full', !flush && 'px-4 md:px-8', wide && !flush && 'mx-auto max-w-[1280px]', className)}>{children}</div>;
}

/** Figma Section header Breakpoint=Mobile used in narrow columns: title, then the actions below, then a divider. */
export function StackedSectionHeader({ title, actions }: { title: string; actions: ReactNode }) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        <div>{actions}</div>
      </div>
      <div className="h-px bg-gray-200" />
    </div>
  );
}

/** Figma "Card" frame: white, r12, gray-200 border, shadow-xs. */
export function Card({ className, padded = true, children }: { className?: string; padded?: boolean; children: ReactNode }) {
  return (
    <div className={cx('min-w-0 rounded-xl border border-gray-200 bg-white shadow-xs', padded && 'flex flex-col gap-5 p-4 md:p-6', className)}>{children}</div>
  );
}

/* ================================================================================================
 * Header pieces
 * ============================================================================================== */

export const icons = { DownloadCloud02, UploadCloud02, Plus, Settings03, RefreshCcw02, CurrencyDollar, FilterLines, Calendar, Edit01, Send01 };

export function Btn({ children, primary, color, icon, dot, size = 'md' }: { children?: ReactNode; primary?: boolean; color?: boolean; icon?: IconSlot; dot?: boolean; size?: 'sm' | 'md' }) {
  return (
    <Button size={size} hierarchy={primary ? 'primary' : color ? 'secondary-color' : 'secondary-gray'} iconLeading={icon} dot={dot}>
      {children}
    </Button>
  );
}

export function MoreButton() {
  return <Button size="md" hierarchy="tertiary-gray" iconLeading={DotsVertical} aria-label="More options" />;
}

export function SearchInput({ className }: { className?: string }) {
  return <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" className={className} />;
}

export function DashBreadcrumbs({ items }: { items: string[] }) {
  return <Breadcrumbs type="button-gray" divider="chevron" home items={items.map((label) => ({ label, href: '#' }))} />;
}

/** Figma "Button group" with string items; `current` is the initially selected label. */
export function Segmented({ items, current, dotCurrent, custom, className }: { items: string[]; current?: string; dotCurrent?: boolean; custom?: string; className?: string }) {
  return (
    <ButtonGroup defaultValue={current ?? items[0]} className={cx('max-w-full overflow-x-auto', className)}>
      {items.map((it) => (
        <ButtonGroupItem key={it} value={it} dot={dotCurrent && it === current}>
          {it}
        </ButtonGroupItem>
      ))}
      {custom && (
        <ButtonGroupItem value={custom} iconLeading={Plus}>
          {custom}
        </ButtonGroupItem>
      )}
    </ButtonGroup>
  );
}

/** Figma "Tabs and filters" row: period button group + date picker + filters button. */
export function TabsAndFilters({ periods = ['12 months', '30 days', '7 days', '24 hours'], current, dates }: { periods?: string[]; current?: string; dates?: boolean }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Segmented items={periods} current={current} className="max-md:hidden" />
      <div className="flex items-center gap-3">
        <DateRangePicker
          align="left"
          defaultValue={dates ? { start: new Date(2024, 0, 6), end: new Date(2024, 0, 13) } : undefined}
          className="max-md:flex-1"
        />
        <Btn icon={FilterLines}>Filters</Btn>
      </div>
    </div>
  );
}

export function HeaderSection({ wide, children, className }: { wide?: boolean; children: ReactNode; className?: string }) {
  return (
    <Container wide={wide} className={cx('flex flex-col gap-6', className)}>
      {children}
    </Container>
  );
}

/* ================================================================================================
 * Charts
 * ============================================================================================== */

export function ProfileViewsChart({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-6">
      <SectionHeader title="Profile views" onMenuClick={() => {}} actions={<Segmented items={['12 months', '30 days', '7 days']} current="30 days" />} />
      <LineChart
        labels={JULY}
        axisLabels
        yAxisLabel="Profile views"
        curve="linear"
        yMax={1000}
        height={240}
        series={[
          { name: 'This month', data: series(3, 8, 640, 260, 20) },
          { name: 'Last month', data: series(7, 8, 430, 180, 10) },
          { name: 'Average', data: series(11, 8, 260, 90, 5) },
        ]}
      />
    </Container>
  );
}

export function YearLine({ height = 240, legend = 'none', names = ['2024', '2023', '2022'], curve = 'smooth', seeds = [1, 2, 3], axisLabels, yAxisLabel, xAxisLabel }: {
  height?: number;
  legend?: ChartLegendPosition;
  names?: string[];
  curve?: 'smooth' | 'linear';
  seeds?: number[];
  axisLabels?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
}) {
  const s: ChartSeries[] = names.map((name, i) => ({ name, data: series(seeds[i] ?? i + 1, 12, 520 - i * 140, 160 - i * 30, 22 - i * 6), color: ['text-brand-600', 'text-brand-400', 'text-gray-200'][i] }));
  return <LineChart labels={MONTHS} series={s} legend={legend} curve={curve} height={height} axisLabels={axisLabels} yAxisLabel={yAxisLabel} xAxisLabel={xAxisLabel} />;
}

export function MonthBars({ height = 240, stacked, legend = 'none', names, axisLabels, yAxisLabel, xAxisLabel, seed = 5 }: {
  height?: number;
  stacked?: boolean;
  legend?: ChartLegendPosition;
  names?: string[];
  axisLabels?: boolean;
  yAxisLabel?: string;
  xAxisLabel?: string;
  seed?: number;
}) {
  const s: ChartSeries[] = stacked
    ? (names ?? ['Organic', 'Paid', 'Referral']).map((name, i) => ({ name, data: series(seed + i * 3, 12, 220 - i * 60, 70, 4) }))
    : [{ name: names?.[0] ?? 'Value', data: series(seed, 12, 600, 180, 6), color: 'text-brand-600' }];
  return <BarChart labels={MONTHS} series={s} layout="stacked" legend={legend} height={height} axisLabels={axisLabels} yAxisLabel={yAxisLabel} xAxisLabel={xAxisLabel} />;
}

/* ================================================================================================
 * Dashboard 01 — profile stats + chat (page 01)
 * ============================================================================================== */

const fans = [
  ['Phoenix Baker', '@phoenix.baker', '24 likes'],
  ['Lana Steiner', '@lanasteiner', '22 likes'],
  ['Demi Wilkinson', '@demi_wilkinson', '22 likes'],
  ['Candice Wu', '@candicewu', '20 likes'],
  ['Natali Craig', '@nat.craig', '18 likes'],
  ['Drew Cano', '@drewc', '16 likes'],
  ['Orlando Diggs', '@orlando_diggs', '12 likes'],
];
const designers = [
  ['Andi Lane', '@andilane', '46 likes'],
  ['Kate Morrison', '@kmorrison', '40 likes'],
  ['Koray Okumus', '@korayy', '36 likes'],
  ['Ava Wright', '@avawright', '34 likes'],
  ['Eve Leroy', '@eve.leroy', '30 likes'],
  ['Zahir Mays', '@zahir_mays', '28 likes'],
  ['Joshua Wilson', '@joshwilson', '28 likes'],
];

function PeopleTable({ title, rows }: { title: string; rows: string[][] }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <SectionHeader title={title} onMenuClick={() => {}} />
      <div className="flex flex-col gap-4">
        <div className="overflow-x-auto">
          <Table className="w-full">
            <TableBody>
              {rows.map(([n, h, l]) => (
                <TableRow key={n}>
                  <TableCell className="w-full pl-0">
                    <TableLead title={n} supportingText={h} avatarInitials={initials(n)} />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{l}</TableCell>
                  <TableCell padding="compact" className="pr-0">
                    <Button size="md" hierarchy="tertiary-gray" iconLeading={Edit01} aria-label={`Edit ${n}`} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex"><Button hierarchy="link-color">View all</Button></div>
      </div>
    </div>
  );
}

export function FansSection({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-8 lg:flex-row">
      <PeopleTable title="Biggest fans" rows={fans} />
      <PeopleTable title="Favorite designers" rows={designers} />
    </Container>
  );
}

export function ChatPanel() {
  const [text, setText] = useState('');
  return (
    <div className="flex h-full flex-col bg-gray-50 xl:sticky xl:top-0 xl:h-screen">
      <CardHeader
        className="bg-white/90 backdrop-blur"
        title="Anita Cruz"
        badge={
          <Badge size="sm" type="badge-modern" color="success" dot>
            Online
          </Badge>
        }
        supportingText="Auckland, New Zealand"
        actions={<Button size="md" hierarchy="tertiary-gray" iconLeading={Send01} aria-label="Call" />}
        onMenuClick={() => {}}
      />
      <div className="flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-4 py-6 md:px-6">
        <div className="flex flex-col gap-4">
          <Message name="Anita Cruz" time="Thursday 10:16am" avatarInitials="AC" className="pr-10">
            Hey Olivia. We’re working on a dashboard prototype and love your work. Are you open to new projects?
          </Message>
          <Message type="sent" name="You" time="Thursday 11:41am" className="pl-20">
            Hey Anita, I have some capacity in a few weeks. Can you tell me a little more about the project?
          </Message>
          <Message name="Anita Cruz" time="Thursday 12:14pm" avatarInitials="AC" className="pr-10">
            Great! We’ve drafted an outline here. Let me know if you have any questions!
          </Message>
          <Message name="Anita Cruz" time="Thursday 12:14pm" avatarInitials="AC" attachment={{ name: 'Dashboard Design Brief.pdf', size: '800 KB' }} />
          <Message type="sent" name="You" time="Thursday 12:29pm" className="pl-20" reactions={[{ emoji: '❤️' }, { emoji: '👌', count: 1 }]}>
            I’ll have a more thorough read and get back to you by tomorrow. Is that okay?
          </Message>
          <Message name="Anita Cruz" time="Thursday 12:30pm" avatarInitials="AC" className="pr-10">
            Sounds perfect, thanks!
          </Message>
        </div>
        <ContentDivider type="text">Today</ContentDivider>
        <div className="flex flex-col gap-4">
          <Message type="sent" name="You" time="10 mins ago" className="pl-20">
            Hey Anita, I’ve had a read through and made some notes: <span className="underline">https://docs.google.com/docu...</span>
          </Message>
          <Message name="Anita Cruz" time="Just now" avatarInitials="AC" className="pr-10">
            Thank you for the quick turnaround. Looking now.
          </Message>
          <Message name="Anita Cruz" avatarInitials="AC" writing />
        </div>
      </div>
      <form className="flex items-start gap-3 border-t border-gray-200 bg-white px-4 pt-5 pb-6 md:px-6" onSubmit={(e) => { e.preventDefault(); setText(''); }}>
        <Input placeholder="Message" aria-label="Message" value={text} onChange={(e) => setText(e.target.value)} className="flex-1" />
        <Button size="lg" hierarchy="primary" iconLeading={Send01} aria-label="Send" type="submit" />
      </form>
    </div>
  );
}

/* ================================================================================================
 * Analytics overview (page 02)
 * ============================================================================================== */

export function ChartMetric({ title, value, change, negative, text = 'vs last month', type = 'chart-01' }: { title: string; value: string; change: string; negative?: boolean; text?: string; type?: 'chart-01' | 'chart-02' }) {
  return <MetricItem type={type} title={title} value={value} change={change} trend={negative ? 'negative' : 'positive'} changeText={text} onMenuClick={() => {}} className="min-w-0 flex-1" />;
}

export function MetricRow({ children, wide }: { children: ReactNode; wide?: boolean }) {
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">{children}</div>
    </Container>
  );
}

const countries: [FlagCode, string, number][] = [
  ['US', 'United States', 50],
  ['IN', 'India', 30],
  ['GB', 'United Kingdom', 20],
  ['AU', 'Australia', 10],
  ['CA', 'Canada', 10],
];

export function ActiveUsersCard({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <Card>
        <SectionHeader title="Active users right now" actions={<Btn>Real-time report</Btn>} onMenuClick={() => {}} />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="min-w-0 flex-1">
            <ContactVectorMap
              className="max-w-none"
              locations={[
                { x: 88.4, y: 84, label: 'Melbourne, AUS', supportingText: 'untitledui.com/pricing', flag: 'AU', open: true },
                { x: 16, y: 37 }, { x: 24, y: 40 }, { x: 28, y: 30 }, { x: 50, y: 25 }, { x: 52.8, y: 28 },
                { x: 68, y: 48 }, { x: 80, y: 42 }, { x: 33, y: 70 }, { x: 95, y: 90 },
              ]}
            />
          </div>
          <div className="flex w-full flex-col gap-6 lg:w-66">
            <p className="text-display-sm font-semibold text-gray-900 md:text-display-md">10.8k</p>
            <ul className="flex flex-col gap-4">
              {countries.map(([code, name, v]) => (
                <li key={name} className="flex items-center gap-4">
                  <Flag code={code} size={24} title="" />
                  <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-medium text-gray-700">{name}</span>
                    <ProgressBar value={v} label="right" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </Container>
  );
}

const acquisition = [
  { label: 'Organic', value: 40, color: 'text-brand-700' },
  { label: 'Direct', value: 25, color: 'text-brand-400' },
  { label: 'Referral', value: 15, color: 'text-gray-200' },
  { label: 'Social', value: 12, color: 'text-success-500' },
  { label: 'Other', value: 8, color: 'text-indigo-500' },
];

export function AcquireUsersCard({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <Card>
        <SectionHeader title="How do you acquire users?" actions={<Btn>Location report</Btn>} onMenuClick={() => {}} />
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="min-w-0 flex-1">
            <MonthBars seed={4} />
          </div>
          <PieChart size="sm" hole={75} legend data={acquisition} className="shrink-0" />
        </div>
      </Card>
    </Container>
  );
}

/* ================================================================================================
 * Website analytics (page 03)
 * ============================================================================================== */

const largeTabs = [
  { id: 'users', title: 'Users', value: '8.8k', change: '7.4%' },
  { id: 'sessions', title: 'Sessions', value: '10.2k', change: '7.2%' },
  { id: 'bounce', title: 'Bounce rate', value: '46.2%', change: '0.2%', negative: true },
  { id: 'duration', title: 'Session duration', value: '4m 4s', change: '10.8%' },
];

/** Figma "_Large tab" row: metric tabs with a 4px brand underline on the selected one. */
export function LargeTabs() {
  const [sel, setSel] = useState('users');
  return (
    <div role="tablist" className="flex gap-4 overflow-x-auto">
      {largeTabs.map((t) => (
        <button
          key={t.id}
          role="tab"
          type="button"
          aria-selected={sel === t.id}
          onClick={() => setSel(t.id)}
          className={cx(
            'flex min-w-40 flex-1 cursor-pointer flex-col gap-2 border-b-4 pb-6 text-left outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24',
            sel === t.id ? 'border-brand-600' : 'border-transparent shadow-[inset_0_-1px_0_var(--color-gray-200)]',
          )}
        >
          <span className="text-sm font-medium text-gray-600">{t.title}</span>
          <span className="flex items-end gap-4">
            <span className="text-display-sm font-semibold text-gray-900">{t.value}</span>
            <span className="pb-2">
              <Badge size="md" color={t.negative ? 'error' : 'success'} iconLeading={t.negative ? TrendDown01 : TrendUp01}>
                {t.change}
              </Badge>
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}

function PeriodFooter({ action }: { action: string }) {
  return (
    <SectionFooter
      type="section"
      buttonGroup={<Segmented items={['12 months', '30 days', '7 days']} custom="Custom" />}
      actions={<Btn>{action}</Btn>}
    />
  );
}

export function WebsiteOverview({ wide, tabsType = 'button-white-border' }: { wide?: boolean; tabsType?: TabsType }) {
  return (
    <>
      <Container wide={wide} className="flex flex-col gap-12 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <SectionHeader title="Overview" onMenuClick={() => {}} />
          <LargeTabs />
          <YearLine height={228} />
          <PeriodFooter action="Audience overview" />
        </div>
        <div className="flex w-full flex-col gap-5 xl:w-98">
          <SectionHeader title="Traffic sources" onMenuClick={() => {}} />
          <RadarChart
            className="mx-auto"
            axes={WEEKDAYS}
            scaleLabels
            max={1000}
            series={[
              { name: 'Organic', data: [760, 620, 820, 540, 700, 480, 640] },
              { name: 'Paid', data: [420, 560, 380, 620, 300, 520, 440] },
              { name: 'Social', data: [260, 300, 220, 340, 380, 240, 200] },
            ]}
          />
        </div>
      </Container>
      <Container wide={wide}>
        <div className="h-px bg-gray-200" />
      </Container>
      <Container wide={wide} className="flex flex-col gap-12 xl:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <SectionHeader title="How do you acquire users?" onMenuClick={() => {}} />
          <Tabs
            type={tabsType}
            size="sm"
            items={[
              { id: 'channel', label: 'Traffic channel' },
              { id: 'source', label: 'Source' },
              { id: 'referrals', label: 'Referrals' },
            ]}
          />
          <MonthBars stacked legend="top" names={['Direct', 'Organic search', 'Referral']} />
          <PeriodFooter action="Audience overview" />
        </div>
        <div className="flex w-full flex-col gap-5 xl:w-98">
          <SectionHeader title="Sessions by country" onMenuClick={() => {}} />
          <PieChart
            size="lg"
            hole={wide ? 50 : 75}
            legend
            data={[
              { label: 'USA', value: 40 },
              { label: 'India', value: 22 },
              { label: 'UK', value: 16 },
              { label: 'Australia', value: 12 },
              { label: 'Canada', value: 10 },
            ]}
          />
        </div>
      </Container>
    </>
  );
}

/* ================================================================================================
 * Finance (pages 04–08)
 * ============================================================================================== */

type Tx = { name: string; logo: string; amount: string; date: string; cat: [string, BadgeColor]; card: PaymentMethod; account: string; sub: string };
const transactions: Tx[] = [
  { name: 'Spotify', logo: 'bg-success-500', amount: '- $18.99', date: 'Wed 1:00pm', cat: ['Subscriptions', 'blue'], card: 'visa', account: 'Visa 1234', sub: 'Expiry 06/2024' },
  { name: 'A Coffee', logo: 'bg-orange-100', amount: '- $4.50', date: 'Wed 7:20am', cat: ['Food and dining', 'pink'], card: 'visa', account: 'Visa 1234', sub: 'Expiry 06/2024' },
  { name: 'Stripe', logo: 'bg-indigo-500', amount: '+ $88.00', date: 'Wed 2:45am', cat: ['Income', 'success'], card: 'mastercard', account: 'Mastercard 1234', sub: 'Expiry 06/2024' },
  { name: 'Figma', logo: 'bg-gray-900', amount: '- $15.00', date: 'Tue 6:10pm', cat: ['Subscriptions', 'blue'], card: 'visa', account: 'Visa 1234', sub: 'Expiry 06/2024' },
  { name: 'TBF Bakery', logo: 'bg-warning-100', amount: '- $12.50', date: 'Tue 7:52am', cat: ['Food and dining', 'pink'], card: 'visa', account: 'Visa 1234', sub: 'Expiry 06/2024' },
  { name: 'Fresh F&V', logo: 'bg-success-100', amount: '- $40.20', date: 'Tue 12:15pm', cat: ['Groceries', 'indigo'], card: 'visa', account: 'Visa 1234', sub: 'Expiry 06/2024' },
  { name: 'Stripe', logo: 'bg-indigo-500', amount: '+ $88.00', date: 'Tue 5:40am', cat: ['Income', 'success'], card: 'mastercard', account: 'Mastercard 1234', sub: 'Expiry 06/2024' },
];

function Merchant({ name, logo }: { name: string; logo: string }) {
  const dark = /(500|900)$/.test(logo);
  return (
    <div className="flex items-center gap-3">
      <span className={cx('flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-900/8 text-md', logo, dark ? 'text-white' : 'text-gray-600')}>
        {initials(name)}
      </span>
      <span className="font-medium text-gray-900">{name}</span>
    </div>
  );
}

function CardAccount({ method, title, sub }: { method: PaymentMethod; title: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <PaymentIcon method={method} size="md" title="" />
      <div className="flex flex-col">
        <span className="text-gray-900">{title}</span>
        <span className="text-gray-600">{sub}</span>
      </div>
    </div>
  );
}

function RowActions() {
  return <Button size="md" hierarchy="tertiary-gray" iconLeading={DotsVertical} aria-label="More" />;
}

/** Transactions table body (Figma "Recent transactions" / "Transaction history"). */
export function TransactionsTable({ withDate = true, withCategory = true, modern }: { withDate?: boolean; withCategory?: boolean; modern?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full">
        <TableHeader className="bg-white">
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Amount</TableHead>
            {withDate && <TableHead>Date</TableHead>}
            {withCategory && <TableHead>Category</TableHead>}
            <TableHead>Account</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((t, i) => (
            <TableRow key={i}>
              <TableCell>
                <Merchant name={t.name} logo={t.logo} />
              </TableCell>
              <TableCell className="font-medium text-gray-900">{t.amount}</TableCell>
              {withDate && <TableCell>{t.date}</TableCell>}
              {withCategory && (
                <TableCell>
                  <Badge size="sm" type={modern && t.cat[0] !== 'Income' ? 'badge-modern' : 'pill-color'} color={modern && t.cat[0] === 'Income' ? 'success' : t.cat[1]} dot={!(modern && t.cat[0] === 'Income')}>
                    {modern && t.cat[0] === 'Income' ? 'Active' : t.cat[0]}
                  </Badge>
                </TableCell>
              )}
              <TableCell>
                <CardAccount method={t.card} title={t.account} sub={t.sub} />
              </TableCell>
              <TableCell padding="compact">
                <RowActions />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function TotalBalanceCard({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <Card>
        <div className="flex flex-col gap-2">
          <SectionHeader title="Total balance" divider={false} actions={<Btn>View report</Btn>} onMenuClick={() => {}} />
          <div className="flex items-end gap-4">
            <span className="text-display-sm font-semibold text-gray-900">$107,843.82</span>
            <span className="pb-1.5">
              <Badge size="md" color="success" iconLeading={ArrowUp}>
                7.2%
              </Badge>
            </span>
          </div>
        </div>
        <LineChart labels={MONTHS} series={[{ name: 'Balance', data: series(9, 12, 520, 150, 18) }]} height={240} />
      </Card>
    </Container>
  );
}

const savings: [string, string, number, IconSlot][] = [
  ['Home deposit', '$64,240.60', 50, HomeSmile],
  ['Holiday', '$2,220.42', 90, Umbrella03],
  ['Savings', '$41,382.80', 60, CoinsStacked01],
];

export function SavingsCards({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-4 md:flex-row md:gap-6">
        {savings.map(([t, v, p, icon]) => (
          <div key={t} className="flex min-w-0 flex-1 flex-col gap-6 rounded-xl bg-brand-600 p-4 shadow-xs max-md:flex-row max-md:items-center">
            <FeaturedIcon icon={icon} size="md" color="brand" theme="light-square" />
            <div className="flex flex-1 flex-col gap-4 rounded-lg border border-white/50 bg-white/30 p-4 shadow-[0_4px_24px_rgb(0_0_0/0.25)] backdrop-blur-md">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-white">{t}</span>
                <span className="text-display-xs font-semibold text-white">{v}</span>
              </div>
              <ProgressBar value={p} />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

/** Figma "Table" card with Card header, filters bar and table. */
export function TableCardFrame({ title, badge, supportingText, actions, filters, children, footer }: {
  title: string;
  badge?: string;
  supportingText?: string;
  actions?: ReactNode;
  filters?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <CardHeader
        title={title}
        badge={
          badge ? (
            <Badge size="sm" type="badge-modern" color="gray">
              {badge}
            </Badge>
          ) : undefined
        }
        supportingText={supportingText}
        actions={actions}
        onMenuClick={() => {}}
      />
      {filters && <div className="flex flex-col gap-3 border-b border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between md:px-6">{filters}</div>}
      {children}
      {footer}
    </div>
  );
}

export function RecentTransactionsCard({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <TableCardFrame
        title="Recent transactions"
        badge="7 transactions"
        actions={
          <>
            <Btn icon={DownloadCloud02}>Download</Btn>
            <Btn>View report</Btn>
          </>
        }
        filters={
          <>
            <Segmented items={['View all', 'Monitored', 'Unmonitored']} />
            <SearchInput className="md:w-80" />
          </>
        }
      >
        <TransactionsTable withDate={false} />
      </TableCardFrame>
    </Container>
  );
}

/** Side panel "Your cards" (page 04). */
export function YourCardsPanel({ className, flush, balanceTitle = 'Balance over time' }: { className?: string; flush?: boolean; balanceTitle?: string }) {
  const pad = flush ? '' : 'px-4 md:px-6';
  return (
    <div className={cx('flex flex-col gap-8 bg-gray-25 py-6 pb-12', className)}>
      <div className={pad}>
        <SectionHeader title="Your cards" divider={false} onMenuClick={() => {}} />
      </div>
      <div className={pad}>
        <div className="flex flex-col items-center gap-5 overflow-hidden rounded-2xl bg-brand-700 p-5">
          <div className="flex w-full gap-4 overflow-hidden">
            <CreditCardMockup theme="transparent" lines width={272} className="shrink-0" />
            <CreditCardMockup theme="transparent-gradient" width={272} className="shrink-0" />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-white">This month</span>
              <span className="text-brand-200">$1,240.40</span>
            </div>
            <ProgressBar value={50} />
          </div>
          <PaginationDots count={3} size="lg" className="[&_button]:bg-white/40 [&_button[aria-current=true]]:bg-white" />
        </div>
      </div>
      <div className={pad}>
        <CardStats />
      </div>
      <div className={cx('flex flex-col gap-6', pad)}>
        <StackedSectionHeader title={balanceTitle} actions={<Segmented items={['12 months', '30 days', '7 days']} />} />
        <MonthBars seed={12} />
        <SectionFooter type="section" actions={<Btn>View full report</Btn>} />
      </div>
    </div>
  );
}

/** Underline tabs + three label/number stats (Figma "Overview / Budget / Spending / Rewards"). */
export function CardStats({ balance = '$1,240.40' }: { balance?: string }) {
  return (
    <div className="flex flex-col gap-6">
      <Tabs
        type="underline"
        size="sm"
        items={[
          { id: 'overview', label: 'Overview' },
          { id: 'budget', label: 'Budget' },
          { id: 'spending', label: 'Spending' },
          { id: 'rewards', label: 'Rewards' },
        ]}
      />
      {[
        ['Current balance', balance],
        ['Current limit', '$15,000.00'],
        ['Budget this month', '$2,400.00'],
      ].map(([l, v]) => (
        <div key={l} className="flex items-center justify-between gap-4">
          <span className="text-sm font-medium text-gray-600">{l}</span>
          <span className="text-display-xs font-semibold text-gray-900">{v}</span>
        </div>
      ))}
    </div>
  );
}

/* --- page 05 --- */

const receipts: [string, 'pdf' | 'icon-image', string, string, [string, BadgeColor, boolean], PaymentMethod, string, string][] = [
  ['Spotify', 'pdf', '200 KB', '$18.99', ['Subscriptions', 'blue', true], 'visa', 'Debit card', 'Ends in 1234'],
  ['A Coffee', 'icon-image', '220 KB', '$4.50', ['Dining', 'pink', true], 'visa', 'Debit card', 'Ends in 1234'],
  ['Rosso Antico', 'icon-image', '192 KB', '$88.00', ['Uncategorized', 'gray', false], 'mastercard', 'Credit card', 'Ends in 5678'],
  ['Figma', 'pdf', '216 KB', '$15.00', ['Subscriptions', 'blue', true], 'visa', 'Debit card', 'Ends in 1234'],
  ['TBF Bakery', 'icon-image', '420 KB', '$12.50', ['Dining', 'pink', true], 'visa', 'Debit card', 'Ends in 1234'],
  ['Fresh F&V', 'icon-image', '512 KB', '$40.20', ['Groceries', 'indigo', true], 'visa', 'Debit card', 'Ends in 1234'],
  ['Webflow', 'pdf', '196 KB', '$192.00', ['Uncategorized', 'gray', false], 'mastercard', 'Credit card', 'Ends in 5678'],
];

export function CardsSidebar({ middle = 'brand-dark' }: { middle?: CreditCardTheme }) {
  return (
    <div className="flex w-full flex-col gap-8 lg:w-87 lg:shrink-0">
      <SectionHeader title="Overview" supportingText="Manage and track your card spending." divider={false} onMenuClick={() => {}} />
      <div className="relative mx-auto h-[262px] w-[277px]">
        <CreditCardMockup theme="transparent-gradient" width={277} cardHolder="Lana Steiner" className="absolute top-0 left-0" />
        <CreditCardMockup theme="brand-light-gradient" width={277} cardHolder="Phoenix Baker" className="absolute top-12 left-0 shadow-lg" />
        <CreditCardMockup theme={middle} width={277} className="absolute top-24 left-0 shadow-xl" />
      </div>
      <CardStats balance="$1,440.40" />
      <div className="flex flex-col gap-6">
        <StackedSectionHeader title="Balances over time" actions={<Segmented items={['12 months', '30 days', '7 days']} />} />
        <MonthBars seed={12} />
        <SectionFooter type="section" actions={<Btn>View full report</Btn>} />
      </div>
    </div>
  );
}

export function ReceiptsSection() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader
        title="Receipts"
        actions={
          <>
            <Btn icon={DownloadCloud02}>Export</Btn>
            <Btn primary icon={Plus}>Add</Btn>
          </>
        }
        onMenuClick={() => {}}
      />
      <FileUploadDropzone hint="SVG, PNG, JPG or GIF (max. 800x400px)" />
      <div className="flex flex-col gap-6">
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-xs">
          <Table className="w-full">
            <TableHeader className="bg-white">
              <TableRow>
                <TableHead>Merchant</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead tooltip="Spending category">Category</TableHead>
                <TableHead tooltip="Card used for the payment">Account</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {receipts.map(([n, ft, size, amt, [cat, col, dot], pm, acc, ends]) => (
                <TableRow key={n}>
                  <TableCell>
                    <TableLead title={n} supportingText={size} leading={<FileTypeIcon type={ft} size={40} title="" />} />
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">{amt}</TableCell>
                  <TableCell>
                    <Badge size="sm" color={col} dot={dot}>
                      {cat}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <CardAccount method={pm} title={acc} sub={ends} />
                  </TableCell>
                  <TableCell padding="compact">
                    <RowActions />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <SectionFooter type="section" divider={false} actions={<Btn>View full report</Btn>} />
      </div>
    </div>
  );
}

export function BalanceOverTime({ supportingText = 'Compare spending over time.', title = 'Balance over time', bars, curve = 'smooth' }: { supportingText?: string; title?: string; bars?: boolean; curve?: 'smooth' | 'linear' }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title={title} supportingText={supportingText || undefined} onMenuClick={() => {}} actions={<Segmented items={['12 months', '30 days', '7 days']} />} />
      {bars ? <MonthBars seed={21} /> : <LineChart labels={MONTHS} curve={curve} height={240} series={[{ name: 'Balance', data: series(17, 12, 500, 160, 14) }]} />}
    </div>
  );
}

/* --- page 06 --- */

const spendTx = [
  ['Spotify', '- $18.99', 'Wednesday 1:00pm'],
  ['A Coffee', '- $4.50', 'Wednesday 7:20am'],
  ['Stripe', '+ $88.00', 'Wednesday 2:45am'],
  ['Figma', '- $15.00', 'Tuesday 6:10pm'],
  ['TBF Bakery', '- $12.50', 'Tuesday 7:52am'],
  ['Fresh F&V', '- $40.20', 'Tuesday 12:15pm'],
  ['Stripe', '+ $88.00', 'Tuesday 5:40am'],
  ['Rosso Antico', '- $80.00', 'Sunday 8:10pm'],
  ['P&Vs Wine', '- $32.00', 'Sunday 7:05pm'],
  ['Cherry Moon', '- $16.50', 'Sunday 12:52pm'],
];
const logos = ['bg-success-500', 'bg-orange-100', 'bg-indigo-500', 'bg-gray-900', 'bg-warning-100', 'bg-success-100', 'bg-indigo-500', 'bg-error-100', 'bg-purple-100', 'bg-pink-100'];

export function SpendingSidebar({ wideCards }: { wideCards?: boolean }) {
  return (
    <div className={cx('flex w-full flex-col gap-8 lg:shrink-0', wideCards ? 'lg:w-100' : 'lg:w-87')}>
      <div className="relative h-58">
        <CreditCardMockup theme={wideCards ? 'gradient-strip' : 'brand-dark'} width={275} className="absolute top-0 left-0 z-10" />
        <CreditCardMockup theme="transparent-gradient" width={275} className="absolute top-16 right-0 z-20 shadow-lg" />
      </div>
      <div className="flex flex-col gap-2">
        <SectionHeader title="Recent transactions" divider={false} onMenuClick={() => {}} />
        <div className="overflow-x-auto">
        <Table className="w-full">
          <TableBody>
            {spendTx.map(([n, a, d], i) => (
              <TableRow key={i}>
                <TableCell className="pl-0">
                  <div className="flex items-center gap-3">
                    <span className={cx('flex size-10 shrink-0 items-center justify-center rounded-full text-md', logos[i], /(500|900)$/.test(logos[i]) ? 'text-white' : 'text-gray-600')}>{initials(n)}</span>
                    <div className="flex flex-col">
                      <span className="text-gray-900">{n}</span>
                      <span>{a}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-2 font-medium text-gray-900 max-sm:hidden">{d}</TableCell>
                <TableCell padding="compact" className="pr-0 text-right">
                  <RowActions />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
        <div className="flex"><Button hierarchy="link-color">View all transactions</Button></div>
      </div>
    </div>
  );
}

const budget = [
  ['Subscriptions', '$148.40', 'bg-blue-500'],
  ['Groceries', '$642.48', 'bg-brand-600'],
  ['Food and dining', '$614.16', 'bg-pink-500'],
  ['Investing', '$290.00', 'bg-success-500'],
  ['Mortgage', '$824.28', 'bg-orange-500'],
  ['Other', '$48.44', 'bg-gray-300'],
];

export function MonthlySpending() {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Monthly spending" onMenuClick={() => {}} actions={<Segmented items={['This month', 'Last month']} current="This month" dotCurrent custom="Custom" />} />
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
        <ActivityGauge
          size="md"
          label="Total"
          value="$2,280"
          data={[
            { label: 'Spent', value: 72, color: 'text-brand-700' },
            { label: 'Budget', value: 54, color: 'text-brand-600' },
          ]}
        />
        <ul className="grid flex-1 grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-3">
          {budget.map(([l, v, c]) => (
            <li key={l} className="flex gap-2">
              <span className={cx('mt-1 size-2.5 shrink-0 rounded-full', c)} />
              <div className="flex flex-col gap-1">
                <span className="text-sm font-medium text-gray-600">{l}</span>
                <span className="text-display-sm font-semibold text-gray-900">{v}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* --- page 07 --- */

export function AccountCards({ wide, hole = 75 }: { wide?: boolean; hole?: 0 | 25 | 50 | 75 }) {
  const acc: [string, string, string][] = [
    ['Primary account', '$40,206.20', '3.4%'],
    ['Secondary account', '$6,421.10', '2.0%'],
  ];
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-6 md:flex-row">
        {acc.map(([t, v, c]) => (
          <div key={t} className="relative flex min-w-0 flex-1 items-center gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-xs md:p-6">
            <PieChart size="xxs" hole={hole} data={[{ label: 'Spending', value: 40 }, { label: 'Bills', value: 25 }, { label: 'Savings', value: 15 }, { label: 'Other', value: 20 }]} className="max-sm:hidden" />
            <div className="flex min-w-0 flex-1 flex-col gap-6">
              <span className="pr-8 text-md font-medium text-gray-900">{t}</span>
              <div className="flex flex-col gap-2">
                <span className="text-sm font-medium text-gray-600">Current balance</span>
                <div className="flex flex-wrap items-end gap-4">
                  <span className="text-display-sm font-semibold text-gray-900">{v}</span>
                  <span className="pb-1">
                    <MetricChange type="02" trend="positive">
                      {c}
                    </MetricChange>
                  </span>
                </div>
              </div>
            </div>
            <span className="absolute top-5 right-5">
              <Button size="sm" hierarchy="tertiary-gray" iconLeading={DotsVertical} aria-label="More" />
            </span>
          </div>
        ))}
      </div>
    </Container>
  );
}

export function BankCardsCard() {
  return (
    <div className="min-w-0 rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="flex flex-col gap-5 p-4 md:p-6">
        <SectionHeader title="Your cards" divider={false} onMenuClick={() => {}} />
        <div className="flex flex-col gap-8 sm:flex-row">
          {[
            ['brand-dark', '$2,840.40', 50, true],
            ['brand-light-gradient', '$1,260.20', 20, false],
          ].map(([th, amt, p, lines]) => (
            <div key={String(th)} className="flex min-w-0 flex-1 flex-col gap-5">
              <CreditCardMockup theme={th as CreditCardTheme} lines={!!lines} width={272} />
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-gray-700">Spending this month</span>
                  <span className="text-gray-600">{amt}</span>
                </div>
                <ProgressBar value={p as number} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <SectionFooter type="card" actions={<Btn>Manage cards</Btn>} />
    </div>
  );
}

const deposits: [PaymentMethod, string, string, string][] = [
  ['visa', 'Visa ending in 1234', 'Expiry 06/2024', '+ $244.00'],
  ['mastercard', 'Mastercard ending in 5678', 'Expiry 06/2024', '+ $326.00'],
  ['stripe', 'Stripe deposit', 'billing@untitledui.com', '+ $408.00'],
  ['visa', 'Visa ending in 1234', 'Expiry 06/2024', '+ $628.00'],
  ['paypal', 'PayPal deposit', 'alina@untitledui.com', '+ $166.00'],
  ['apple-pay', 'Apple Pay', 'molly@untitledui.com', '+ $250.00'],
  ['visa', 'Visa ending in 1234', 'Expiry 06/2024', '+ $144.00'],
  ['stripe', 'Stripe deposit', 'billing@untitledui.com', '+ $408.00'],
];

export function DepositsCard({ className }: { className?: string }) {
  return (
    <Card className={cx('lg:w-100 lg:shrink-0', className)}>
      <SectionHeader title="Recent deposits" divider={false} onMenuClick={() => {}} />
      <div className="flex flex-col gap-4">
        <Table className="w-full">
          <TableBody>
            {deposits.map(([m, t, s, a], i) => (
              <TableRow key={i}>
                <TableCell className="pl-0">
                  <div className="flex items-center gap-3">
                    <PaymentIcon method={m} size="md" title="" />
                    <div className="flex min-w-0 flex-col">
                      <span className="truncate font-medium text-gray-900">{t}</span>
                      <span className="truncate">{s}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="pr-0 text-right font-medium text-success-700">{a}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex"><Button hierarchy="link-color">Show more</Button></div>
      </div>
    </Card>
  );
}

/* --- page 08 --- */

export function BalanceHeader({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="flex flex-col gap-1">
        <span className="text-md text-gray-600">Your balance</span>
        <div className="flex items-center gap-3">
          <Flag code="US" size={28} title="" />
          <span className="text-display-sm font-semibold text-gray-900 md:text-display-md">$40,206.20</span>
        </div>
      </div>
      <Segmented items={['Personal', 'Business', 'Credit']} />
    </Container>
  );
}

export function TransactionHistory({ wide, withDate = true }: { wide?: boolean; withDate?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        <h2 className="flex-1 text-lg font-medium text-gray-900">Transaction history</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker align="left" />
          <Btn icon={FilterLines}>Apply filter</Btn>
        </div>
      </div>
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
        <TransactionsTable modern withDate={withDate} />
        <Pagination type="page-default" total={10} className="border-t border-gray-200 px-4 pt-3 pb-4 md:px-6" />
      </div>
    </Container>
  );
}

const budgets: [string, string, number, IconSlot, string, string, string][] = [
  ['Subscriptions', '$25 left', 50, Monitor04, 'bg-blue-25', 'text-blue-900', 'text-blue-700'],
  ['Food and booze', '$120 left', 70, ShoppingBag02, 'bg-pink-25', 'text-pink-900', 'text-pink-700'],
  ['Groceries', '$200 left', 60, ShoppingCart01, 'bg-success-25', 'text-success-900', 'text-success-700'],
  ['Savings', '$50 left', 80, Coins01, 'bg-orange-25', 'text-orange-900', 'text-orange-700'],
];

export function ProfilePanel() {
  return (
    <div className="flex flex-col gap-8 pb-12">
      <div className="flex flex-col">
        <div className="h-30 bg-linear-to-r from-brand-200 via-pink-100 to-orange-100" />
        <div className="-mt-10 flex flex-col gap-4 px-4 md:px-6">
          <AvatarProfilePhoto size="md" initials="OR" verified alt="Olivia Rhye" />
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="text-display-xs font-medium text-gray-900">Olivia Rhye</span>
              <Badge size="md" type="badge-modern" color="brand" dot>
                Premium
              </Badge>
            </div>
            <span className="text-md text-gray-600">olivia@untitledui.com</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-6 px-4 md:px-6">
        <SectionHeader title="My cards" divider={false} actions={<Button hierarchy="link-gray" iconLeading={Plus}>Add card</Button>} />
        <div className="relative h-56">
          <CreditCardMockup theme="gradient-strip-vertical" lines width={316} className="absolute top-0 left-0" />
          <CreditCardMockup theme="transparent-gradient" lines width={316} className="absolute top-8 left-7 shadow-lg" />
        </div>
      </div>
      <div className="h-px bg-gray-200" />
      <div className="flex flex-col gap-6 px-4 md:px-6">
        <SectionHeader title="My budgets" divider={false} onMenuClick={() => {}} />
        <div className="flex flex-col gap-3">
          {budgets.map(([t, left, p, icon, bg, c1, c2]) => (
            <div key={t} className={cx('flex items-center gap-4 rounded-xl p-4', bg)}>
              <FeaturedIcon icon={icon} size="md" color="brand" theme="light" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex justify-between gap-4 text-sm">
                  <span className={cx('font-medium', c1)}>{t}</span>
                  <span className={c2}>{left}</span>
                </div>
                <ProgressBar value={p} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================================================
 * Sales (pages 09–10)
 * ============================================================================================== */

const activityA = [
  ['Demi Wikinson', 'Purchased Webflow 101', '2 mins ago'],
  ['Aliah Lane', 'Purchased SEO Masterclass', '2 mins ago'],
  ['Lana Steiner', 'Purchased Figma Mockups', '3 mins ago'],
  ['Candice Wu', 'Purchased Webflow 101', '1 hour ago'],
  ['Ava Wright', 'Purchased SEO Masterclass', '2 hours ago'],
  ['Koray Okumus', 'Purchased SEO Masterclass', '2 hours ago'],
  ['Andi Lane', 'Purchased The Guide to Backlinks', '3 hours ago'],
];
const activityB = [
  ['Drew Cano', 'Purchased The Figma Dashboard Bundle', '3 hours ago'],
  ['Zahir Mays', 'Purchased The Figma Dashboard Bundle', '4 hours ago'],
  ['Rene Wells', 'Purchased The Design Handbook', '4 hours ago'],
  ['Joshua Wilson', 'Purchased Phone 13 Mockups', '4 hours ago'],
  ['Lori Bryson', 'Purchased SEO Masterclass', '4 hours ago'],
  ['Loki Bright', 'Purchased Figma Mockups', '5 hours ago'],
  ['Anita Cruz', 'Purchased The Guide to Backlinks', '6 hours ago'],
];

export function SalesChart({ wide, bars }: { wide?: boolean; bars?: boolean }) {
  return (
    <Container wide={wide}>
      {bars ? <MonthBars stacked legend="right" names={['2024', '2023', '2022']} height={216} /> : <YearLine legend="top" height={216} names={['2022', '2021', '2020']} />}
    </Container>
  );
}

export function RecentActivity({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-6">
      <SectionHeader
        title="Recent activity"
        actions={
          <>
            <Btn icon={DownloadCloud02}>Download</Btn>
            <Btn primary>View all</Btn>
          </>
        }
        onMenuClick={() => {}}
      />
      <div className="flex flex-col gap-0 md:flex-row md:gap-16">
        {[activityA, activityB].map((list, k) => (
          <ActivityFeed key={k} divider="connector" className="flex-1">
            {list.map(([n, a, t]) => (
              <FeedItem key={n} name={n} action={a} time={t} avatarInitials={initials(n)} />
            ))}
          </ActivityFeed>
        ))}
      </div>
    </Container>
  );
}

export function SimpleMetric({ title, value, change, negative }: { title: string; value: string; change: string; negative?: boolean }) {
  return <MetricItem type="simple" title={title} value={value} change={change} trend={negative ? 'negative' : 'positive'} onMenuClick={() => {}} className="min-w-0 flex-1" />;
}

export function SalesReportCard({ title, bars }: { title: string; bars?: boolean }) {
  return (
    <Card>
      <SectionHeader
        title={title}
        actions={<Btn>View report</Btn>}
        onMenuClick={() => {}}
        divider={false}
        tabs={
          <Tabs
            type="button-gray"
            size="sm"
            items={['12 months', '3 months', '30 days', '7 days', '24 hours'].map((l) => ({ id: l, label: l }))}
          />
        }
      />
      {bars ? <MonthBars stacked legend="top" height={200} seed={8} /> : <LineChart labels={MONTHS} height={200} series={[{ name: 'Sales', data: series(13, 12, 480, 170, 20) }, { name: 'Last year', data: series(19, 12, 340, 120, 10) }]} />}
    </Card>
  );
}

const sideActivity = [
  ['Demi Wikinson', 'Purchased Webflow 101'],
  ['Aliah Lane', 'Purchased SEO Masterclass'],
  ['Lana Steiner', 'Purchased Figma Mockups'],
  ['Candice Wu', 'Purchased Webflow 101'],
  ['Ava Wright', 'Purchased SEO Masterclass'],
  ['Koray Okumus', 'Purchased SEO Masterclass'],
  ['Andi Lane', 'Purchased The Ultimate Guide to Backlinks'],
  ['Drew Cano', 'Purchased The Figma Dashboard Bundle'],
  ['Zahir Mays', 'Purchased The Figma Dashboard Bundle'],
  ['Rene Wells', 'Purchased The Design Handbook'],
  ['Joshua Wilson', 'Purchased Phone 13 Mockups'],
  ['Lori Bryson', 'Purchased SEO Masterclass'],
  ['Loki Bright', 'Purchased Figma Mockups'],
  ['Anita Cruz', 'Purchased The Ultimate Guide to Backlinks'],
];
const times = ['2 mins ago', '2 mins ago', '3 mins ago', '1 hour ago', '2 hours ago', '2 hours ago', '3 hours ago', '3 hours ago', '4 hours ago', '4 hours ago', '4 hours ago', '4 hours ago', '5 hours ago', '6 hours ago'];

export function SideActivity({ title = 'Activity', items = sideActivity, withTime = true }: { title?: string; items?: string[][]; withTime?: boolean }) {
  return (
    <div className="flex w-full flex-col gap-6 lg:w-60 lg:shrink-0">
      <SectionHeader title={title} divider={false} actions={<Button hierarchy="link-gray">View all</Button>} />
      <ActivityFeed divider="none" size="sm" className="gap-6">
        {items.map(([n, a], i) => (
          <FeedItem key={n + i} size="sm" name={n} action={a} time={withTime ? times[i] : undefined} avatarInitials={initials(n)} />
        ))}
      </ActivityFeed>
    </div>
  );
}

export function SalesMain({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <SimpleMetric title="Today’s revenue" value="$1,280" change="10%" />
            <SimpleMetric title="Today’s orders" value="14" change="12%" />
            <SimpleMetric title="Avg. order value" value="$91.42" change="2%" negative />
          </div>
          <SalesReportCard title="Sales report" />
          <SalesReportCard title="Store traffic" bars />
          <ContentDivider type="button" icon={Plus}>
            Add
          </ContentDivider>
        </div>
        <SideActivity />
      </div>
    </Container>
  );
}

/* ================================================================================================
 * Vendors (pages 11–12)
 * ============================================================================================== */

const vendors: [string, string, number, number, string, boolean, string][] = [
  ['Catalog', 'catalogapp.io', 60, 5, '22 Jan 2022', true, 'bg-brand-500'],
  ['Capsule', 'getcapsule.com', 72, -4, '20 Jan 2022', true, 'bg-gray-900'],
  ['Command+R', 'cmdr.ai', 78, 6, '24 Jan 2022', true, 'bg-blue-500'],
  ['Hourglass', 'hourglass.app', 38, 8, '26 Jan 2022', true, 'bg-indigo-500'],
  ['Layers', 'getlayers.io', 42, -1, '18 Jan 2022', true, 'bg-pink-500'],
  ['Quotient', 'quotient.co', 66, -6, '28 Jan 2022', true, 'bg-orange-500'],
  ['Sisyphus', 'sisyphus.com', 91, 2, '16 Jan 2022', false, 'bg-success-500'],
];
const vendorCats: { label: string; color: BadgeColor }[][] = [
  [{ label: 'Customer data', color: 'blue' }, { label: 'Admin', color: 'indigo' }, { label: '+4', color: 'gray' }],
  [{ label: 'Business data', color: 'brand' }, { label: 'Admin', color: 'indigo' }, { label: '+4', color: 'gray' }],
  [{ label: 'Customer data', color: 'blue' }, { label: 'Financials', color: 'pink' }],
  [{ label: 'Database access', color: 'gray-blue' }, { label: 'Admin', color: 'indigo' }],
  [{ label: 'Salesforce', color: 'orange' }, { label: 'Admin', color: 'indigo' }, { label: '+4', color: 'gray' }],
  [{ label: 'Business data', color: 'brand' }, { label: 'Admin', color: 'indigo' }, { label: '+4', color: 'gray' }],
  [{ label: 'Customer data', color: 'blue' }, { label: 'Financials', color: 'pink' }],
];

function CompanyMark({ cls, name }: { cls: string; name: string }) {
  return (
    <span className={cx('flex size-10 shrink-0 items-center justify-center rounded-full border border-gray-900/8', cls)}>
      <span className="text-sm font-semibold text-white">{name[0]}</span>
    </span>
  );
}

function SelectAll() {
  return <Checkbox size="md" aria-label="Select all" />;
}

export function VendorTable({ grayHeader }: { grayHeader?: boolean }) {
  return (
    <div className="overflow-x-auto">
      <Table className="w-full" dividers={grayHeader ? 'line' : 'line'}>
        <TableHeader className={grayHeader ? undefined : 'bg-white'}>
          <TableRow>
            <TableHead checkbox={<SelectAll />} sortDirection="desc" onSort={() => {}}>
              Vendor
            </TableHead>
            <TableHead>Rating</TableHead>
            <TableHead />
            <TableHead>Last assessed</TableHead>
            <TableHead>Categories</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map(([n, url, r, ch, d, active, cls], i) => (
            <TableRow key={n}>
              <TableCell>
                <TableLead control={<Checkbox size="md" aria-label={`Select ${n}`} />} leading={<CompanyMark cls={cls} name={n} />} title={n} supportingText={url} />
              </TableCell>
              <TableCell className="min-w-56">
                <ProgressBar value={r} label="right" formatLabel={() => String(r)} />
              </TableCell>
              <TableCell padding="compact">
                <Badge size="sm" color={ch > 0 ? 'success' : 'error'} iconLeading={ch > 0 ? ArrowUp : ArrowDown}>
                  {Math.abs(ch)}%
                </Badge>
              </TableCell>
              <TableCell>{d}</TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Badge size="sm" color={active ? 'success' : 'gray'} dot>
                    {active ? 'Active' : 'Inactive'}
                  </Badge>
                  {vendorCats[i].map((c, k) => (
                    <Badge key={k} size="sm" color={c.color}>
                      {c.label}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell padding="compact">
                <div className="flex gap-1">
                  <Button size="md" hierarchy="tertiary-gray" iconLeading={Trash01} aria-label="Delete" />
                  <Button size="md" hierarchy="tertiary-gray" iconLeading={Edit01} aria-label="Edit" />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function VendorBreakdownCard({ line }: { line?: boolean }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col rounded-xl border border-gray-200 bg-white shadow-xs">
      <CardHeader title="Vendor breakdown" supportingText="Keep track of vendors and their security ratings." avatarInitials="VB" onMenuClick={() => {}} />
      <div className="p-4 md:p-6">
        {line ? (
          <YearLine height={296} names={['Your rating', 'Industry average']} axisLabels yAxisLabel="Security rating" xAxisLabel="Month" />
        ) : (
          <MonthBars stacked height={262} axisLabels yAxisLabel="Security rating" xAxisLabel="Month" names={['Tier 1', 'Tier 2', 'Tier 3']} />
        )}
      </div>
      <SectionFooter type="card" actions={<Btn>View full report</Btn>} />
    </div>
  );
}

export function VendorsMonitoredCard({ tall }: { tall?: boolean }) {
  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-xs lg:w-90 lg:shrink-0">
      <CardHeader title="Vendors monitored" supportingText="You’re using 80% of available spots." onMenuClick={() => {}} />
      <div className={cx('flex flex-1 flex-col gap-5 p-4 md:p-6', tall && 'justify-center')}>
        <div className="flex items-end justify-center gap-4">
          <ProgressCircle value={80} size="sm" shape="half" formatValue={() => '240'} />
        </div>
        <div className="flex justify-center">
          <MetricChange type="02" trend="positive">
            10%
          </MetricChange>
        </div>
        <div className="flex flex-col gap-1 text-center">
          <span className="text-sm font-medium text-gray-900">You’ve almost reached your limit</span>
          <span className="text-sm text-gray-600">You have used 80% of your available spots. Upgrade plan to monitor more vendors.</span>
        </div>
      </div>
      <SectionFooter type="card" actions={<Btn icon={Zap}>Upgrade plan</Btn>} />
    </div>
  );
}

export function VendorMovementsCard({ grayHeader = true, pagination = 'card-minimal-right' }: { grayHeader?: boolean; pagination?: PaginationType }) {
  return (
    <TableCardFrame
      title="Vendor movements"
      badge="240 vendors"
      supportingText="Keep track of vendor and their security ratings."
      actions={
        <>
          <Btn icon={UploadCloud02}>Import</Btn>
          <Btn primary icon={Plus}>Add vendor</Btn>
        </>
      }
      filters={
        <>
          <Segmented items={['View all', 'Monitored', 'Unmonitored']} />
          <div className="flex gap-3">
            <SearchInput className="flex-1 md:w-100" />
            <Btn icon={FilterLines}>Filters</Btn>
          </div>
        </>
      }
      footer={<Pagination type={pagination} total={10} className="border-t border-gray-200" />}
    >
      <VendorTable grayHeader={grayHeader} />
    </TableCardFrame>
  );
}

export function VendorRatingCard({ wide }: { wide?: boolean }) {
  return (
    <Card className="flex-1">
      <SectionHeader title="Average vendor rating" supportingText="Track how your rating compares to your industry average." divider={false} onMenuClick={() => {}} />
      <YearLine height={wide ? 330 : 249} legend="top" names={['Your rating', 'Industry Average']} axisLabels yAxisLabel="Security rating" xAxisLabel="Month" />
    </Card>
  );
}

export function VendorPieCard({ radar }: { radar?: boolean }) {
  return (
    <div className={cx('flex w-full flex-col rounded-xl border border-gray-200 bg-white shadow-xs lg:shrink-0', radar ? 'lg:w-110' : 'lg:w-90')}>
      <div className="flex flex-1 flex-col gap-5 p-4 md:p-6">
        <SectionHeader title="Vendor breakdown" divider={false} onMenuClick={() => {}} />
        {radar ? (
          <RadarChart
            className="mx-auto"
            axes={['Tier 1', 'Tier 2', 'Tier 3', 'Tier 4', 'Tier 5', 'Tier 6', 'Tier 7']}
            scaleLabels
            max={1000}
            series={[
              { name: 'This year', data: [820, 640, 760, 520, 680, 560, 720] },
              { name: 'Last year', data: [520, 480, 420, 640, 380, 600, 460] },
            ]}
          />
        ) : (
          <PieChart
            size="sm"
            hole={50}
            legend
            className="mx-auto"
            data={[
              { label: '81–100', value: 32 },
              { label: '61–80', value: 26 },
              { label: '41–60', value: 18 },
              { label: '21–40', value: 14 },
              { label: '0–20', value: 10 },
            ]}
          />
        )}
      </div>
      <SectionFooter type="card" actions={<Btn>View full report</Btn>} />
    </div>
  );
}

export function VendorSearchTable({ grayHeader }: { grayHeader?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionHeader title="Vendor movements" supportingText="Keep track of vendors and their security ratings." search={<SearchInput />} divider={false} onMenuClick={() => {}} />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
        <VendorTable grayHeader={grayHeader} />
        <Pagination type="card-minimal-center" total={10} className="border-t border-gray-200" />
      </div>
    </div>
  );
}

/* ================================================================================================
 * Customers (pages 13–14)
 * ============================================================================================== */

const customers: [string, string, string, number, [string, BadgeColor, BadgeType], string, string][] = [
  ['Catalog', 'catalogapp.io', 'bg-brand-500', 70, ['Customer', 'success', 'badge-modern'], 'Content curating app', 'Brings all your news into one place'],
  ['Capsule', 'getcapsule.com', 'bg-gray-900', 60, ['Churned', 'gray', 'badge-modern'], 'Design software', 'Super lightweight design app'],
  ['Command+R', 'cmdr.ai', 'bg-blue-500', 30, ['Customer', 'success', 'badge-modern'], 'Data prediction', 'AI and machine learning data'],
  ['Hourglass', 'hourglass.app', 'bg-indigo-500', 80, ['Active', 'success', 'pill-color'], 'Productivity app', 'Time management and productivity'],
  ['Layers', 'getlayers.io', 'bg-pink-500', 20, ['Active', 'success', 'pill-color'], 'Web app integrations', 'Connect web apps seamlessly'],
  ['Quotient', 'quotient.co', 'bg-orange-500', 10, ['Customer', 'success', 'badge-modern'], 'Sales CRM', 'Web-based sales doc management'],
  ['Sisyphus', 'sisyphus.com', 'bg-success-500', 40, ['Customer', 'success', 'badge-modern'], 'Automation and workflow', 'Time tracking, invoicing and expenses'],
];
const groupInitials = ['OR', 'PB', 'LS', 'DW', 'CW', 'NC', 'DC', 'OD'];

export function CustomerTable({ order = 'license-first', grayHeader, pagination = 'card-minimal-left' }: { order?: 'license-first' | 'about-first'; grayHeader?: boolean; pagination?: PaginationType }) {
  const cols = order === 'license-first' ? ['license', 'status', 'users', 'about'] : ['status', 'about', 'users', 'license'];
  const head: Record<string, string> = { license: 'License use', status: 'Status', users: 'Users', about: 'About' };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table className="w-full">
          <TableHeader className={grayHeader ? undefined : 'bg-white'}>
            <TableRow>
              <TableHead checkbox={<SelectAll />} sortDirection="desc" onSort={() => {}}>
                Company
              </TableHead>
              {cols.map((c) => (
                <TableHead key={c}>{head[c]}</TableHead>
              ))}
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map(([n, url, cls, lic, [st, stc, stt], about, aboutSub], i) => (
              <TableRow key={n}>
                <TableCell>
                  <TableLead control={<Checkbox size="md" aria-label={`Select ${n}`} />} leading={<CompanyMark cls={cls} name={n} />} title={n} supportingText={url} />
                </TableCell>
                {cols.map((c) => (
                  <TableCell key={c} className={c === 'license' ? 'min-w-34' : undefined}>
                    {c === 'license' && <ProgressBar value={lic} />}
                    {c === 'status' && (
                      <Badge size="sm" type={stt} color={stc} dot={stt === 'badge-modern'}>
                        {st}
                      </Badge>
                    )}
                    {c === 'users' && (
                      <AvatarGroup size="xs" max={5}>
                        {groupInitials.slice(0, 5 + (i % 3)).map((x) => (
                          <Avatar key={x} initials={x} />
                        ))}
                      </AvatarGroup>
                    )}
                    {c === 'about' && (
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{about}</span>
                        <span>{aboutSub}</span>
                      </div>
                    )}
                  </TableCell>
                ))}
                <TableCell padding="compact">
                  <div className="flex gap-1">
                    <Button size="md" hierarchy="tertiary-gray" iconLeading={Trash01} aria-label="Delete" />
                    <Button size="md" hierarchy="tertiary-gray" iconLeading={Edit01} aria-label="Edit" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination type={pagination} total={10} className="border-t border-gray-200" />
    </div>
  );
}

export function CustomerFilters() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <Button hierarchy="secondary-gray" iconTrailing={XClose}>All time</Button>
        <Button hierarchy="secondary-gray" iconTrailing={XClose}>US, AU, +4</Button>
        <Btn icon={FilterLines}>More filters</Btn>
      </div>
      <SearchInput className="md:w-80" />
    </div>
  );
}

export function CustomersOverview({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide} className="flex flex-col gap-8 lg:flex-row">
      <div className="flex w-full flex-col gap-6 lg:w-60 lg:shrink-0">
        <SectionHeader title="Active now" onMenuClick={() => {}} />
        <ActivityGauge
          size="md"
          className="mx-auto"
          value="316"
          data={[
            { label: '2021', value: 78, color: 'text-brand-700' },
            { label: '2020', value: 62, color: 'text-brand-600' },
            { label: '2019', value: 45, color: 'text-brand-400' },
          ]}
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <SectionHeader title="Total customers" onMenuClick={() => {}} />
        <YearLine legend="top" height={240} names={['2021', '2020', '2019']} />
      </div>
    </Container>
  );
}

/* ================================================================================================
 * Content / members (page 15)
 * ============================================================================================== */

export function MrrSection({ wide }: { wide?: boolean }) {
  const stats: [string, string, string, boolean][] = [
    ['Total members', '4,862', '9.2%', true],
    ['Paid members', '2,671', '6.6%', false],
    ['Email open rate', '82%', '8.1%', false],
  ];
  return (
    <Container wide={wide} className="flex flex-col gap-8 lg:flex-row lg:gap-8">
      <div className="flex min-w-0 flex-1 flex-col gap-6 md:flex-row md:gap-8">
        <div className="flex shrink-0 flex-col gap-2 md:w-50">
          <span className="text-sm font-medium text-gray-600">MRR</span>
          <div className="flex items-center gap-4">
            <span className="flex items-start text-display-sm font-semibold text-gray-900">
              <span className="text-display-xs">$</span>18,880
            </span>
            <MetricChange type="02" trend="positive">
              7.4%
            </MetricChange>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <LineChart labels={MONTHS} height={240} series={[{ name: 'MRR', data: series(23, 12, 420, 140, 26) }, { name: 'Last year', data: series(29, 12, 300, 100, 10) }]} />
        </div>
      </div>
      <div className="flex w-full flex-col gap-6 lg:w-60 lg:shrink-0">
        {stats.map(([t, v, c, big]) => (
          <div key={t} className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-600">{t}</span>
            <div className="flex items-end gap-4">
              <span className={cx('font-semibold text-gray-900', big ? 'text-display-sm md:text-display-md' : 'text-display-sm')}>{v}</span>
              <span className="pb-1">
                <MetricChange type="02" trend="positive">
                  {c}
                </MetricChange>
              </span>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}

const topMembers = [
  ['Phoenix Baker', 'Member since Feb 2022'],
  ['Lana Steiner', 'Member since Jan 2022'],
  ['Demi Wikinson', 'Member since Mar 2022'],
  ['Candice Wu', 'Member since Feb 2022'],
  ['Natali Craig', 'Member since Mar 2022'],
  ['Orlando Diggs', 'Member since Apr 2022'],
  ['Drew Cano', 'Member since Apr 2022'],
  ['Kate Morrison', 'Member since Jan 2022'],
  ['Koray Okumus', 'Member since Feb 2022'],
  ['Ava Wright', 'Member since Mar 2022'],
];

function CtaTile({ icon, title, text, selected }: { icon: IconSlot; title: string; text: string; selected?: boolean }) {
  return (
    <button
      type="button"
      className={cx(
        'flex min-w-0 flex-1 cursor-pointer items-start gap-4 rounded-xl p-4 text-left outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-500/24 md:p-5',
        selected ? 'border-2 border-brand-600 bg-white' : 'border border-gray-200 bg-white hover:bg-gray-25',
      )}
    >
      <FeaturedIcon icon={icon} size="lg" color="brand" theme="modern" />
      <span className="flex flex-col gap-1">
        <span className="text-md font-medium text-gray-900">{title}</span>
        <span className="text-sm text-gray-600">{text}</span>
      </span>
    </button>
  );
}

export function ContentSection({ wide, alt }: { wide?: boolean; alt?: boolean }) {
  const posts = alt
    ? [
        { title: 'Collaboration = better designer', excerpt: 'Collaboration can make our teams stronger, and our individual designs better.', author: { name: 'Olivia Rhye' }, date: '18 Jan 2022', tags: [{ label: 'Design', color: 'brand' as BadgeColor }, { label: 'Research', color: 'indigo' as BadgeColor }] },
        { title: 'Building your API Stack', excerpt: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.', author: { name: 'Phoenix Baker' }, date: '14 Jan 2022', tags: [{ label: 'Design', color: 'brand' as BadgeColor }, { label: 'Research', color: 'indigo' as BadgeColor }] },
      ]
    : [
        {
          title: 'UX review presentations',
          excerpt: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
          author: { name: 'Olivia Rhye' },
          date: '20 Jan 2024',
          tags: [{ label: 'Design', color: 'brand' as BadgeColor }, { label: 'Research', color: 'indigo' as BadgeColor }, { label: 'Presentation', color: 'pink' as BadgeColor }],
        },
        {
          title: 'Migrating to Linear 101',
          excerpt: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get...',
          author: { name: 'Phoenix Baker' },
          date: '19 Jan 2022',
          tags: [{ label: 'Design', color: 'brand' as BadgeColor }, { label: 'Research', color: 'indigo' as BadgeColor }],
        },
      ];
  return (
    <Container wide={wide} className="flex flex-col gap-6">
      <SectionHeader title="Start creating content" onMenuClick={() => {}} />
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <div className="flex flex-col gap-4 md:flex-row md:gap-6">
            <CtaTile icon={UserPlus01} title="Create your first member" text="Add yourself or import from CSV" selected />
            <CtaTile icon={Edit04} title="Create a new post" text="Dive into the editor and start creating" />
          </div>
          <div className="flex flex-col gap-6">
            <SectionHeader title="Recent posts" onMenuClick={() => {}} />
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <BlogPostCard key={p.title} type="simple-03" {...p} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col gap-5 lg:w-60 lg:shrink-0">
          <span className="text-sm font-medium text-gray-900">Top members</span>
          <ActivityFeed divider="none" size="sm" className="gap-5">
            {topMembers.map(([n, a]) => (
              <FeedItem key={n} size="sm" name={n} action={a} avatarInitials={initials(n)} />
            ))}
          </ActivityFeed>
        </div>
      </div>
    </Container>
  );
}

/* re-exports used by page files */
export { PageHeader, SectionHeader, Legend, MiniChart, TableBadges, VerticalTabs, ArrowUpRight, Edit01, CurrencyDollar, Send01, RefreshCcw02, Settings03, DownloadCloud02, UploadCloud02, Plus, FilterLines };
