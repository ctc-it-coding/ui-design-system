import { DropdownMenu, DropdownAvatarHeader, DropdownIconTrigger, DropdownAvatarTrigger, MultiSelect, Select, type DropdownMenuItem, type SelectItem } from '../../src/components/dropdowns';
import { Button } from '../../src/components/buttons';
import { BarChart01, ChevronDown, Container, HelpCircle, LayersTwo01, LogOut01, Settings01, User01, UserPlus01, Users01, Zap } from '../../src/icons';
import { Section, Row } from '../ui';

const people: SelectItem[] = [
  { value: 'phoenix', label: 'Phoenix Baker', supportingText: '@phoenix', avatarInitials: 'PB' },
  { value: 'olivia', label: 'Olivia Rhye', supportingText: '@olivia', avatarInitials: 'OR' },
  { value: 'lana', label: 'Lana Steiner', supportingText: '@lana', avatarInitials: 'LS' },
  { value: 'demi', label: 'Demi Wilkinson', supportingText: '@demi', avatarInitials: 'DW' },
  { value: 'candice', label: 'Candice Wu', supportingText: '@candice', avatarInitials: 'CW', disabled: true },
  { value: 'natali', label: 'Natali Craig', supportingText: '@natali', avatarInitials: 'NC' },
  { value: 'drew', label: 'Drew Cano', supportingText: '@drew', avatarInitials: 'DC' },
];
const plain = people.map(({ avatarInitials: _a, ...p }) => p);
const dots = people.map(({ avatarInitials: _a, ...p }, i) => ({ ...p, dot: i % 3 === 2 ? 'bg-gray-300' : true }));

const menu: DropdownMenuItem[] = [
  { label: 'View profile', icon: User01, shortcut: '⌘K->P' },
  { label: 'Settings', icon: Settings01, shortcut: '⌘S' },
  { label: 'Keyboard shortcuts', icon: Zap, shortcut: '?' },
  { divider: true },
  { label: 'Company profile', icon: Container, shortcut: '⌘K->C' },
  { label: 'Team', icon: Users01, shortcut: '⌘K->T' },
  { label: 'Invite colleagues', icon: UserPlus01, shortcut: '⌘I' },
  { divider: true },
  { label: 'Changelog', icon: LayersTwo01, shortcut: '⌘K->C' },
  { label: 'Support', icon: HelpCircle, disabled: true },
  { label: 'API', icon: BarChart01 },
  { divider: true },
  { label: 'Log out', icon: LogOut01, shortcut: '⌥⇧Q' },
];
const header = <DropdownAvatarHeader name="Olivia Rhye" email="olivia@untitledui.com" initials="OR" />;

export default function DropdownsDemo() {
  return (
    <Section id="dropdowns" title="Dropdowns" figma="Dropdowns/Input dropdown · Dropdown · _Dropdown list item">
      <Row label="input dropdown · placeholder / default / icon / avatar / dot" className="grid grid-cols-3 gap-8">
        <Select label="Team member" placeholder="Select team member" items={plain} hint="This is a hint text to help user." tooltip="Help" />
        <Select label="Team member" items={plain} defaultValue="olivia" hint="This is a hint text to help user." />
        <Select label="Team member" placeholder="Select team member" iconLeading={User01} items={plain} defaultValue="olivia" />
        <Select label="Team member" placeholder="Select team member" iconLeading={User01} items={people} defaultValue="olivia" />
        <Select label="Team member" placeholder="Select team member" items={dots} defaultValue="olivia" size="sm" />
        <Select label="Team member" placeholder="Select team member" items={plain} disabled defaultValue="olivia" error="This is an error message." />
      </Row>
      <Row label="open · default / search / tags" className="grid h-[440px] grid-cols-3 items-start gap-8">
        <Select label="Team member" items={people} defaultValue="olivia" defaultOpen />
        <Select label="Search" placeholder="Search" searchable items={plain} defaultValue="olivia" defaultOpen />
        <MultiSelect label="Search" items={people} defaultValue={['olivia', 'phoenix']} defaultOpen />
      </Row>
      <Row label="dropdown menu · button / icon / avatar (open)" className="grid h-[620px] grid-cols-3 items-start gap-8">
        <div className="flex justify-end pr-24">
          <DropdownMenu defaultOpen header={header} items={menu} trigger={<Button hierarchy="secondary-gray" iconTrailing={ChevronDown}>Account</Button>} />
        </div>
        <div className="flex justify-end pr-24">
          <DropdownMenu defaultOpen header="Account menu" items={[{ label: 'Checkbox item', checkbox: true, checked: true, shortcut: '⌘C' }, { label: 'Another', checkbox: true }, { divider: true }, ...menu.slice(0, 3)]} trigger={<DropdownIconTrigger />} />
        </div>
        <div className="flex justify-end pr-24">
          <DropdownMenu defaultOpen header={header} items={menu.slice(0, 7)} trigger={<DropdownAvatarTrigger initials="OR" />} />
        </div>
      </Row>
    </Section>
  );
}
