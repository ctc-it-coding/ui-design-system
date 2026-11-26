import { useState } from 'react';
import { Tabs, TabPanel, VerticalTabs, type TabItem, type TabsType, type VerticalTabsType } from '../../src/components/tabs';
import { Section, Row } from '../ui';

const items: TabItem[] = [
  { id: 'details', label: 'My details' },
  { id: 'profile', label: 'Profile' },
  { id: 'password', label: 'Password' },
  { id: 'team', label: 'Team' },
  { id: 'plan', label: 'Plan' },
  { id: 'billing', label: 'Billing' },
  { id: 'email', label: 'Email' },
  { id: 'notifications', label: 'Notifications', badge: 2 },
  { id: 'integrations', label: 'Integrations' },
  { id: 'api', label: 'API' },
];
const short = items.slice(0, 5).map((i) => (i.id === 'team' ? { ...i, badge: 4 } : i));
const types: TabsType[] = ['button-primary', 'button-gray', 'button-white-border', 'underline', 'underline-filled'];
const vtypes: VerticalTabsType[] = ['button-primary', 'button-gray', 'button-gray-border', 'line'];

export default function TabsDemo() {
  const [value, setValue] = useState('details');
  return (
    <Section id="tabs" title="Tabs" figma="Tabs/Horizontal tabs · Vertical tabs · _Tab button base">
      {types.map((t) => (
        <Row key={t} label={`${t} · sm / md`} className="flex flex-col gap-4">
          <Tabs type={t} size="sm" items={items} aria-label="Settings" />
          <Tabs type={t} size="md" items={items} aria-label="Settings" />
        </Row>
      ))}
      <Row label="full width (button-primary, underline)" className="flex flex-col gap-4">
        <Tabs type="button-primary" fullWidth items={short} aria-label="Settings" />
        <Tabs type="underline" fullWidth items={short} aria-label="Settings" />
      </Row>
      <Row label="controlled with panels" className="flex flex-col gap-4">
        <Tabs type="underline" items={short} value={value} onChange={setValue} aria-label="Settings">
          {short.map((i) => (
            <TabPanel key={i.id} id={i.id} className="rounded-lg border border-dashed border-gray-300 p-4 text-sm text-gray-600">
              Panel for “{String(i.label)}” (selected: {value})
            </TabPanel>
          ))}
        </Tabs>
      </Row>
      <Row label="vertical tabs · sm" className="flex flex-wrap items-start gap-10">
        {vtypes.map((t) => (
          <VerticalTabs key={t} type={t} size="sm" items={items} aria-label={t} listClassName="w-40" />
        ))}
      </Row>
      <Row label="vertical tabs · md" className="flex flex-wrap items-start gap-10">
        {vtypes.map((t) => (
          <VerticalTabs key={t} type={t} size="md" items={items.slice(0, 8)} aria-label={t} listClassName="w-44" />
        ))}
      </Row>
    </Section>
  );
}
