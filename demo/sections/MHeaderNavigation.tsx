import type { ReactNode } from 'react';
import { Section, Row } from '../ui';
import {
  MarketingHeaderNav, NavMenuItem, NavMenuItemCard, NavigationActions,
  type DropdownHeaderNavType, type FullWidthHeaderNavType,
} from '../../src/marketing/header-navigation';
import { Badge } from '../../src/components/badges/Badge';
import { Cube01 } from '../../src/icons';

const dropdownTypes: { type: DropdownHeaderNavType; h: number }[] = [
  { type: 'simple', h: 560 },
  { type: 'simple-with-footer', h: 640 },
  { type: 'simple-2-col', h: 560 },
  { type: 'simple-2-col-with-footer', h: 540 },
  { type: 'featured-card', h: 400 },
  { type: '2-col-with-links-and-footer', h: 640 },
  { type: 'featured-posts', h: 520 },
];
const fullTypes: FullWidthHeaderNavType[] = [
  '2-col-with-sidebar', '3-col-with-sidebar', '4-col-with-footer', '2-col-with-links', '4-col-slim-with-footer', 'blog-posts-with-footer', 'blog-posts-with-sidebar',
];

function Frame({ children, minH }: { children: ReactNode; minH?: number }) {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-gray-200 bg-gray-25" style={{ minHeight: minH }}>
      {children}
    </div>
  );
}

export default function MHeaderNavigation() {
  return (
    <>
      <Section id="m-header-dropdown" title="Dropdown header navigation" figma="Dropdown header navigation">
        {dropdownTypes.map(({ type, h }) => (
          <Row key={type} label={`type="${type}" (Resources open)`} className="block">
            <Frame minH={80 + h}>
              <MarketingHeaderNav variant="dropdown" type={type} layout="desktop" defaultOpenItem="Resources" openOnHover={false} className="bg-white" />
            </Frame>
          </Row>
        ))}
      </Section>

      <Section id="m-header-full" title="Full-width header navigation" figma="Full-width header navigation">
        {fullTypes.map((type) => (
          <Row key={type} label={`type="${type}" (Resources open)`} className="block">
            <Frame>
              <MarketingHeaderNav variant="full-width" type={type} layout="desktop" defaultOpenItem="Resources" openOnHover={false} menuPosition="static" />
              <div className="h-10" />
            </Frame>
          </Row>
        ))}
        <Row label="Closed + logged in" className="block">
          <Frame><MarketingHeaderNav variant="full-width" type="4-col-with-footer" layout="desktop" loggedIn /></Frame>
        </Row>
      </Section>

      <Section id="m-header-mobile" title="Mobile" figma="Breakpoint=Mobile (Open / Mobile subnav open)">
        <Row className="flex flex-wrap items-start gap-6">
          <div className="w-[375px]"><Frame><MarketingHeaderNav variant="dropdown" type="featured-card" layout="mobile" /></Frame></div>
          <div className="w-[375px]"><Frame><MarketingHeaderNav variant="dropdown" type="simple" layout="mobile" defaultMobileOpen menuPosition="static" /></Frame></div>
          <div className="w-[375px]"><Frame><MarketingHeaderNav variant="dropdown" type="featured-card" layout="mobile" defaultMobileOpen defaultMobileSubnav="Resources" menuPosition="static" /></Frame></div>
          <div className="w-[375px]"><Frame><MarketingHeaderNav variant="full-width" type="2-col-with-sidebar" layout="mobile" defaultMobileOpen defaultMobileSubnav="Resources" menuPosition="static" loggedIn /></Frame></div>
        </Row>
      </Section>

      <Section id="m-header-parts" title="Sub-parts" figma="_Nav menu item, _Nav menu item card, _Navigation actions">
        <Row label="NavMenuItem (Icon=Featured / Small / False)" className="flex flex-wrap items-start gap-4">
          <div className="w-80"><NavMenuItem iconStyle="featured" icon={Cube01} title="Products" badge={<Badge size="md" color="success">New</Badge>} description="Find the best solution for you." action={{ label: 'Learn more' }} /></div>
          <div className="w-80"><NavMenuItem iconStyle="small" icon={Cube01} title="Products" badge={<Badge size="md" color="success">New</Badge>} description="Find the best solution for you." action={{ label: 'Learn more' }} /></div>
          <div className="w-80"><NavMenuItem title="Products" badge={<Badge size="md" color="success">New</Badge>} description="Find the best solution for you." action={{ label: 'Learn more' }} /></div>
        </Row>
        <Row label="NavMenuItemCard (horizontal)" className="flex flex-wrap items-start gap-4">
          <div className="w-[560px]"><NavMenuItemCard type="video" title="How to get started" description="Jump right in — get an overview of the basics and get started on building." actions={[{ label: 'Watch video' }]} /></div>
          <div className="w-[560px]"><NavMenuItemCard type="feature" title="We’ve just released an update!" description="Check out the all new dashboard view. Pages and exports now load faster." actions={[{ label: 'Dismiss' }, { label: 'Changelog' }]} /></div>
          <div className="w-[560px]"><NavMenuItemCard type="image" title="Auto Layout explained" description="Auto Layout is a constraint-based layout system to create an adaptive UI." actions={[{ label: 'Read post' }]} /></div>
        </Row>
        <Row label="NavMenuItemCard (vertical)" className="flex flex-wrap items-start gap-4">
          {(['video', 'feature', 'image'] as const).map((t) => (
            <div key={t} className="w-80"><NavMenuItemCard type={t} stacked="vertical" title="Auto Layout explained" description="Auto Layout is a constraint-based layout system to create an adaptive UI." actions={[{ label: 'Read post' }]} /></div>
          ))}
        </Row>
        <Row label="NavigationActions">
          <NavigationActions />
          <NavigationActions loggedIn />
          <div className="w-[343px]"><NavigationActions breakpoint="mobile" /></div>
          <div className="w-[343px]"><NavigationActions breakpoint="mobile" loggedIn /></div>
        </Row>
      </Section>
    </>
  );
}
