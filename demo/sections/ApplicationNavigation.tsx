import {
  SidebarNavigation,
  HeaderNavigation,
  NavFeaturedCard,
  NavItem,
  NavItemButton,
  NavItemDropdown,
  NavMenuButton,
  type NavItemData,
  type NavTheme,
} from '../../src/components/navigation';
import { Input } from '../../src/components/inputs';
import { Button } from '../../src/components/buttons';
import { Avatar } from '../../src/components/avatars/Avatar';
import {
  BarChartSquare02,
  Bell01,
  CheckDone01,
  Home01,
  LayersThree01,
  LifeBuoy01,
  PieChart03,
  Rows01,
  SearchLg,
  Settings01,
  Users01,
} from '../../src/icons';
import { Section, Row } from '../ui';

const themes: NavTheme[] = ['default', 'brand', 'dark'];

function Logomark() {
  return (
    <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-brand-400 to-brand-700 shadow-sm">
      <span className="size-3 rounded-full bg-white/90" />
    </span>
  );
}
function Logo({ theme }: { theme: NavTheme }) {
  return (
    <span className="flex items-center gap-2">
      <Logomark />
      <span className={`text-lg font-semibold ${theme === 'default' ? 'text-gray-900' : 'text-white'}`}>Tinicorn</span>
    </span>
  );
}

const items: NavItemData[] = [
  { label: 'Home', icon: Home01, href: '#' },
  {
    label: 'Dashboard',
    icon: BarChartSquare02,
    current: true,
    badge: 10,
    items: [
      { label: 'Overview', href: '#', current: true },
      { label: 'Notifications', href: '#', badge: 10 },
      { label: 'Analytics', href: '#' },
      { label: 'Saved reports', href: '#' },
      { label: 'Scheduled reports', href: '#' },
      { label: 'User reports', href: '#' },
    ],
  },
  { label: 'Projects', icon: LayersThree01, items: [{ label: 'View all', href: '#' }, { label: 'Archived', href: '#' }] },
  { label: 'Tasks', icon: CheckDone01, href: '#', badge: 8 },
  { label: 'Reporting', icon: PieChart03, href: '#' },
  { label: 'Users', icon: Users01, href: '#' },
];
const footerItems: NavItemData[] = [
  { label: 'Support', icon: LifeBuoy01, href: '#', dot: true },
  { label: 'Settings', icon: Settings01, href: '#' },
];
const account = { name: 'Olivia Rhye', email: 'olivia@untitledui.com', initials: 'OR', onLogout: () => {} };
const search = <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;

const card = (theme: NavTheme, type: 'progress-bar' | 'progress-circle' | 'image') => (
  <NavFeaturedCard
    theme={theme}
    type={type}
    title={type === 'image' ? 'New features available!' : 'Used space'}
    supportingText={type === 'image' ? 'Check out the new dashboard view. Pages now load faster.' : 'Your team has used 80% of your available space. Need more?'}
    progress={80}
    image={type === 'image' ? <div className="size-full bg-linear-to-br from-brand-200 via-pink-200 to-orange-200" /> : undefined}
    onDismiss={() => {}}
  />
);

export default function ApplicationNavigationDemo() {
  return (
    <Section id="application-navigation" title="Application navigation" figma="Sidebar navigation · Header navigation · _Nav item base · _Nav item button · _Nav featured card">
      <Row label="sidebar · simple (default / brand / dark)" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className="h-[960px] overflow-hidden rounded-xl border border-gray-200">
            <SidebarNavigation
              layout="desktop"
              variant="simple"
              theme={t}
              logo={<Logo theme={t} />}
              search={search}
              items={items}
              footerItems={footerItems}
              featuredCard={card(t, 'progress-bar')}
              account={account}
            />
          </div>
        ))}
      </Row>
      <Row label="sidebar · slim with sub-nav panel" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className="h-[720px] overflow-hidden rounded-xl border border-gray-200">
            <SidebarNavigation layout="desktop" variant="slim" theme={t} logomark={<Logomark />} items={items} footerItems={footerItems} account={account} />
          </div>
        ))}
      </Row>
      <Row label="sidebar · dual-tier" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className="h-[960px] overflow-hidden rounded-xl border border-gray-200">
            <SidebarNavigation
              layout="desktop"
              variant="dual-tier"
              theme={t}
              logo={<Logo theme={t} />}
              search={search}
              items={items}
              footerItems={footerItems}
              featuredCard={card(t, 'progress-circle')}
              account={account}
            />
          </div>
        ))}
      </Row>
      <Row label="sidebar · mobile (closed / open drawer)" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className="relative h-[720px] w-[375px] overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
            <SidebarNavigation
              layout="mobile"
              drawerPosition="absolute"
              defaultMobileOpen={t !== 'default'}
              theme={t}
              logo={<Logo theme={t} />}
              search={search}
              items={items}
              footerItems={footerItems}
              account={account}
            />
          </div>
        ))}
      </Row>
      <Row label="header navigation · simple / dual-tier" className="flex flex-col gap-6">
        {themes.map((t) => (
          <div key={t} className="flex flex-col gap-4 overflow-hidden rounded-xl border border-gray-200">
            <HeaderNavigation
              layout="desktop"
              theme={t}
              logo={<Logo theme={t} />}
              items={items.map(({ icon, badge, ...rest }) => rest)}
              actions={
                <>
                  <NavItemButton icon={Settings01} label="Settings" />
                  <NavItemButton icon={Bell01} label="Notifications" />
                </>
              }
              avatar={<Avatar size="md" initials="OR" status="online" />}
            />
            <HeaderNavigation
              layout="desktop"
              variant="dual-tier"
              theme={t}
              logo={<Logo theme={t} />}
              items={items.map(({ icon, badge, ...rest }) => rest)}
              cta={<Button hierarchy={t === 'brand' ? 'primary' : 'secondary-gray'} iconLeading={Rows01}>Upgrade now</Button>}
              actions={<NavItemButton icon={Bell01} label="Notifications" />}
              avatar={<Avatar size="md" initials="OR" />}
              search={search}
            />
          </div>
        ))}
      </Row>
      <Row label="header navigation · mobile (open)" className="flex flex-wrap items-start gap-6">
        <div className="relative h-[640px] w-[375px] overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
          <HeaderNavigation layout="mobile" drawerPosition="absolute" defaultMobileOpen logo={<Logo theme="default" />} items={items} search={search} mobileFooterItems={footerItems} mobileAccount={account} />
        </div>
      </Row>
      <Row label="nav item base / dropdown / button / menu button" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className={`flex w-[288px] flex-col gap-2 rounded-xl p-2 ${t === 'default' ? 'border border-gray-200 bg-white' : t === 'brand' ? 'bg-brand-700' : 'bg-gray-950'}`}>
            <NavItem theme={t} icon={BarChartSquare02} badge={10} chevron>Dashboard</NavItem>
            <NavItem theme={t} icon={BarChartSquare02} current dot>Current</NavItem>
            <NavItemDropdown theme={t} label="Projects" icon={LayersThree01} items={[{ label: 'View all' }, { label: 'Archived', current: true }]} />
            <div className="flex gap-2">
              <NavItemButton theme={t} icon={Bell01} label="Bell" size="md" />
              <NavItemButton theme={t} icon={Bell01} label="Bell" size="md" current />
              <NavItemButton theme={t} icon={Bell01} label="Bell" size="lg" />
              <NavItemButton theme={t} icon={Bell01} label="Bell" size="lg" current />
              <NavMenuButton theme={t} />
            </div>
          </div>
        ))}
      </Row>
      <Row label="nav featured cards" className="flex flex-wrap items-start gap-6">
        {themes.map((t) => (
          <div key={t} className={`flex w-[312px] flex-col gap-4 rounded-xl p-4 ${t === 'default' ? 'border border-gray-200 bg-white' : t === 'brand' ? 'bg-brand-700' : 'bg-gray-950'}`}>
            {card(t, 'progress-bar')}
            {card(t, 'image')}
            {card(t, 'progress-circle')}
          </div>
        ))}
      </Row>
    </Section>
  );
}
