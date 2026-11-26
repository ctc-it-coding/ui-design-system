import { useState, type Key } from 'react';
import {
  DataTable,
  Table,
  TableActions,
  TableAvatarGroup,
  TableBadges,
  TableBody,
  TableCard,
  TableCell,
  TableHead,
  TableHeader,
  TableLead,
  TableProgress,
  TableRating,
  TableRow,
  TableTrend,
  type DataTableColumn,
  type TableDividers,
} from '../../src/components/table';
import { Badge } from '../../src/components/badges/Badge';
import { Button } from '../../src/components/buttons/Button';
import { Checkbox } from '../../src/components/checkboxes/Checkbox';
import { Pagination } from '../../src/components/pagination/Pagination';
import { PaymentIcon } from '../../src/components/misc-icons/PaymentIcon';
import { CheckCircle, DotsVertical, Download01, Edit01, Plus, Trash01, UploadCloud02 } from '../../src/icons';
import { Row, Section } from '../ui';

interface Member {
  id: number;
  name: string;
  email: string;
  initials: string;
  active: boolean;
  role: string;
  teams: { label: string; color: 'brand' | 'blue' | 'indigo' | 'pink' | 'orange' | 'gray' }[];
}

const teamsA: Member['teams'] = [
  { label: 'Design', color: 'brand' },
  { label: 'Product', color: 'blue' },
  { label: 'Marketing', color: 'indigo' },
  { label: 'Finance', color: 'pink' },
  { label: 'Sales', color: 'orange' },
];
const people: [string, string, string][] = [
  ['Olivia Rhye', 'olivia@untitledui.com', 'Product Designer'],
  ['Phoenix Baker', 'phoenix@untitledui.com', 'Product Manager'],
  ['Lana Steiner', 'lana@untitledui.com', 'Frontend Developer'],
  ['Demi Wilkinson', 'demi@untitledui.com', 'Backend Developer'],
  ['Candice Wu', 'candice@untitledui.com', 'Fullstack Developer'],
  ['Natali Craig', 'natali@untitledui.com', 'UX Designer'],
  ['Drew Cano', 'drew@untitledui.com', 'UX Copywriter'],
  ['Orlando Diggs', 'orlando@untitledui.com', 'UI Designer'],
  ['Andi Lane', 'andi@untitledui.com', 'Product Manager'],
  ['Kate Morrison', 'kate@untitledui.com', 'QA Engineer'],
];
const members: Member[] = people.map(([name, email, role], i) => ({
  id: i + 1,
  name,
  email,
  role,
  initials: name
    .split(' ')
    .map((p) => p[0])
    .join(''),
  active: i % 4 !== 2,
  teams: teamsA.slice(i % 3, (i % 3) + 3 + (i % 2) * 2),
}));

const columns: DataTableColumn<Member>[] = [
  {
    key: 'name',
    header: 'Name',
    sortable: true,
    cell: (m) => <TableLead title={m.name} supportingText={`@${m.email.split('@')[0]}`} avatarInitials={m.initials} />,
  },
  {
    key: 'status',
    header: 'Status',
    sortValue: (m) => (m.active ? 0 : 1),
    sortable: true,
    cell: (m) =>
      m.active ? (
        <Badge size="sm" type="pill-color" color="success" dot>
          Active
        </Badge>
      ) : (
        <Badge size="sm" type="pill-color" color="gray" dot>
          Offline
        </Badge>
      ),
  },
  { key: 'role', header: 'Role', tooltip: 'The member’s job title', sortable: true },
  { key: 'email', header: 'Email address' },
  { key: 'teams', header: 'Teams', cell: (m) => <TableBadges badges={m.teams} max={3} /> },
  {
    key: 'actions',
    padding: 'compact',
    cell: (m) => (
      <TableActions
        actions={[
          { icon: Trash01, label: `Delete ${m.name}` },
          { icon: Edit01, label: `Edit ${m.name}` },
        ]}
      />
    ),
  },
];

function TeamMembers({ dividers }: { dividers: TableDividers }) {
  const [selected, setSelected] = useState<Key[]>([2, 3]);
  const [page, setPage] = useState(1);
  return (
    <TableCard
      title="Team members"
      badge="100 users"
      description="Manage your team members and their account permissions here."
      actions={
        <>
          <Button hierarchy="tertiary-gray">Tertiary</Button>
          <Button hierarchy="secondary-color" iconLeading={UploadCloud02}>Import</Button>
          <Button hierarchy="secondary-gray" iconLeading={Download01}>Export</Button>
          <Button iconLeading={Plus}>Add user</Button>
          <Button size="sm" hierarchy="tertiary-gray" iconLeading={DotsVertical} aria-label="More" />
        </>
      }
      footer={<Pagination type="card-default" page={page} onPageChange={setPage} total={10} />}
    >
      <DataTable
        columns={columns}
        data={members}
        rowKey={(m) => m.id}
        selectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
        defaultSort={{ key: 'name', direction: 'desc' }}
        dividers={dividers}
      />
    </TableCard>
  );
}

export default function TablesDemo() {
  return (
    <Section id="tables" title="Tables" figma="Table header · Table header cell · Table cell · Table">
      <Row label="Table — Team members, Dividers=Divider line" className="block">
        <TeamMembers dividers="line" />
      </Row>
      <Row label="Table — Team members, Dividers=Alternating fills" className="block">
        <TeamMembers dividers="alternating" />
      </Row>
      <Row label="Table cell styles (primitives)" className="block">
        <TableCard>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead checkbox={<Checkbox size="md" aria-label="Select all" />} sortDirection="asc" onSort={() => undefined}>
                  Lead checkbox
                </TableHead>
                <TableHead tooltip="Help icon tooltip">Avatar group</TableHead>
                <TableHead sortDirection="desc">Progress</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Payment method</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[0, 1, 2].map((i) => (
                <TableRow key={i}>
                  <TableCell>
                    <TableLead control={<Checkbox size="md" aria-label="Select" defaultChecked={i === 1} />} title="Olivia Rhye" supportingText="olivia@untitledui.com" />
                  </TableCell>
                  <TableCell>
                    <TableAvatarGroup supportingText="10 users" avatars={['OR', 'PB', 'LS', 'DW', 'CW', 'NC', 'DC'].map((x) => ({ initials: x }))} />
                  </TableCell>
                  <TableCell>
                    <TableProgress value={[60, 30, 90][i]} />
                  </TableCell>
                  <TableCell>
                    <TableTrend value={[10, -4, 8][i]} supportingText="$1,800" />
                  </TableCell>
                  <TableCell>
                    <TableLead
                      leading={<PaymentIcon method="visa" size="md" />}
                      title="Visa ending in 1234"
                      supportingText="Expiry 06/2024"
                    />
                  </TableCell>
                  <TableCell padding="compact">
                    <TableRating value={4} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableCard>
      </Row>
      <Row label="Header cell — white / gray, text+checkbox, action buttons cell">
        <Table className="w-auto">
          <TableHeader>
            <TableRow>
              <TableHead checkbox={<Checkbox size="md" aria-label="Select all" />}>Company</TableHead>
              <TableHead tooltip="Help text" onSort={() => undefined}>
                Company
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Badge size="sm" type="pill-color" color="success" iconLeading={CheckCircle}>
                  Paid
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-3">
                  <Button hierarchy="link-gray">Delete</Button>
                  <Button hierarchy="link-color">Edit</Button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Row>
    </Section>
  );
}
