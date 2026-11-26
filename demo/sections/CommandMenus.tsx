import { useState } from 'react';
import { Avatar } from '../../src/components/avatars';
import { Button } from '../../src/components/buttons';
import { CommandMenu, CommandMenuPanel, type CommandSection } from '../../src/components/command-menu';
import { BarChart03, Copy06, File04, Home02, LogOut01, Settings01, User01, UsersPlus } from '../../src/icons';
import { Section, Row } from '../ui';

const people = [
  ['OR', 'Olivia Rhye', '@olivia'],
  ['PB', 'Phoenix Baker', '@phoenix'],
  ['LS', 'Lana Steiner', '@lana'],
  ['DW', 'Demi Wilkinson', '@demi'],
  ['CW', 'Candice Wu', '@candice'],
  ['NB', 'Natali Craig', '@natali'],
];

const userSections: CommandSection[] = [
  {
    id: 'recent',
    label: 'Recent',
    items: people.slice(0, 2).map(([i, n, h]) => ({ id: `r-${h}`, label: n, supportingText: h, avatarInitials: i })),
  },
  {
    id: 'users',
    label: 'Users',
    items: people.map(([i, n, h], k) => ({ id: `u-${h}`, label: n, supportingText: h, avatarInitials: i, dot: k % 3 === 2 ? 'bg-gray-300' : undefined })),
  },
];

const actionSections: CommandSection[] = [
  {
    id: 'nav',
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Home', icon: Home02, shortcut: ['G', 'H'] },
      { id: 'reports', label: 'Reports', icon: BarChart03, shortcut: ['G', 'R'] },
      { id: 'docs', label: 'Documents', icon: File04, shortcut: ['G', 'D'] },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    items: [
      { id: 'profile', label: 'View profile', icon: User01, shortcut: '⌘P' },
      { id: 'invite', label: 'Invite team members', icon: UsersPlus, shortcut: '⌘I' },
      { id: 'copy', label: 'Copy link', icon: Copy06, shortcut: '⌘C' },
      { id: 'settings', label: 'Settings', icon: Settings01, shortcut: '⌘,' },
      { id: 'logout', label: 'Log out', icon: LogOut01, shortcut: '⌥⇧Q', keywords: ['sign out'] },
    ],
  },
];

const stackedSections: CommandSection[] = [
  {
    id: 'team',
    label: 'Team',
    items: people.slice(0, 4).map(([i, n, h]) => ({ id: `s-${h}`, label: n, supportingText: `${h} · Product Designer`, avatarInitials: i, shortcut: '⌘O' })),
  },
];

function UserPreview({ name, initials }: { name: string; initials: string }) {
  return (
    <div className="flex flex-1 flex-col items-center gap-6 pb-6">
      <div className="h-[88px] w-full bg-gradient-to-r from-brand-200 to-brand-100" />
      <div className="-mt-14 flex flex-col items-center gap-4 px-4 text-center">
        <Avatar size="2xl" initials={initials} className="ring-4 ring-white" />
        <div>
          <div className="text-md font-medium text-gray-900">{name}</div>
          <div className="text-sm text-gray-600">Product Designer based in Melbourne, Australia.</div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button hierarchy="secondary-gray">View profile</Button>
        <Button>Message</Button>
      </div>
    </div>
  );
}

export default function CommandMenusDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string>('—');
  return (
    <Section id="command-menus" title="Command menus" figma="Command bar · _Command dropdown menu item · _Command bar footer">
      <Row label="Users (sm, default text) / Actions with shortcuts" className="flex items-start gap-8 rounded-xl bg-gray-900/70 p-8">
        <CommandMenuPanel autoFocus={false} sections={userSections} placeholder="Search users" listMaxHeight={380} />
        <CommandMenuPanel autoFocus={false} sections={actionSections} footer={false} />
      </Row>
      <Row label="Stacked text (md) / Empty state / Command only" className="flex items-start gap-8 rounded-xl bg-gray-900/70 p-8">
        <CommandMenuPanel autoFocus={false} size="md" text="stacked" sections={stackedSections} />
        <div className="flex w-full max-w-[640px] flex-col gap-8">
          <CommandMenuPanel autoFocus={false} sections={userSections} defaultQuery="Landing page design" />
          <CommandMenuPanel autoFocus={false} sections={[]} />
        </div>
      </Row>
      <Row label="Users menu (preview pane)" className="rounded-xl bg-gray-900/70 p-8">
        <CommandMenuPanel
          autoFocus={false}
          sections={[userSections[1]]}
          footer={false}
          listMaxHeight={340}
          preview={(item) => (item ? <UserPreview name={String(item.label)} initials={item.avatarInitials ?? ''} /> : null)}
        />
      </Row>
      <Row label="Live (⌘K / Ctrl+K, ↑ ↓ Enter, Esc)">
        <Button onClick={() => setOpen(true)}>Open command menu</Button>
        <span className="text-sm text-gray-600">Last selected: {last}</span>
        <CommandMenu open={open} onOpenChange={setOpen} hotkey sections={actionSections} onSelect={(i) => setLast(String(i.label))} />
      </Row>
    </Section>
  );
}
