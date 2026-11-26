/* Tables, filter bars and metric rows used by the Informational pages. */
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowLeft, Check, DotsVertical, Edit01, FilterLines, SearchLg, Trash01, UploadCloud02, Users01, UserCheck01, UserPlus01, XClose } from '../../icons';
import { Button } from '../../components/buttons';
import { Badge, type BadgeColor } from '../../components/badges';
import { Checkbox } from '../../components/checkboxes';
import { Input } from '../../components/inputs';
import { Select } from '../../components/dropdowns';
import { DateRangePicker } from '../../components/date-picker';
import { Pagination, type PaginationType, type PaginationShape } from '../../components/pagination';
import { MetricItem, type MetricItemType } from '../../components/metrics';
import { FileTypeIcon, type FileType } from '../../components/misc-icons';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableLead, TableAvatarGroup, TableProgress, TableActions } from '../../components/table';
import { initialsOf } from './parts';

/* ------------------------------------------------------------------------------------------------
 * Generic column table
 * ---------------------------------------------------------------------------------------------- */

export interface Col<R> {
  header?: ReactNode;
  /** Header select-all checkbox (Figma Table header cell Checkbox=True). */
  checkbox?: boolean;
  cell: (row: R, i: number) => ReactNode;
  /** Figma Action icons cells use 16px padding. */
  compact?: boolean;
  className?: string;
  /** Hide this column below `md`. */
  hideMobile?: boolean;
}

export function GridTable<R>({ cols, rows, dividers = 'line', striped, className }: { cols: Col<R>[]; rows: R[]; dividers?: 'line' | 'alternating'; striped?: boolean; className?: string }) {
  return (
    <Table dividers={striped ? 'alternating' : 'line'} className={className}>
      <TableHeader className={dividers === 'alternating' || striped ? 'bg-white' : undefined}>
        <TableRow>
          {cols.map((c, i) => (
            <TableHead key={i} checkbox={c.checkbox ? <Checkbox size="sm" aria-label="Select all" /> : undefined} className={cx(c.compact && 'px-4', c.hideMobile && 'max-md:hidden', c.className)}>
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((r, ri) => (
          <TableRow key={ri}>
            {cols.map((c, ci) => (
              <TableCell key={ci} padding={c.compact ? 'compact' : 'default'} className={cx(c.hideMobile && 'max-md:hidden', c.className)}>
                {c.cell(r, ri)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/** Figma "Table" frame: white r12 card with optional header / toolbar / pagination footer. */
export function TableFrame({ header, toolbar, footer, children, className }: { header?: ReactNode; toolbar?: ReactNode; footer?: ReactNode; children?: ReactNode; className?: string }) {
  return (
    <div className={cx('overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs', className)}>
      {header}
      {toolbar}
      <div className="overflow-x-auto">{children}</div>
      {footer != null && <div className="border-t border-gray-200">{footer}</div>}
    </div>
  );
}

export function TablePagination({ type = 'card-minimal-right', shape = 'square', className }: { type?: PaginationType; shape?: PaginationShape; className?: string }) {
  const card = type.startsWith('card');
  return <Pagination total={10} type={type} shape={shape} className={cx(card ? 'px-4 pt-3 pb-4 md:px-6' : 'pt-5', className)} />;
}

/** Page-level pagination with a top divider (Figma Pagination Type=Page …). */
export function PagePagination({ type = 'page-default', shape = 'circle', className }: { type?: PaginationType; shape?: PaginationShape; className?: string }) {
  return (
    <Pagination total={10} type={type} shape={shape} className={className} />
  );
}

/* ------------------------------------------------------------------------------------------------
 * Cell helpers
 * ---------------------------------------------------------------------------------------------- */

const STATUS: Record<string, { color: BadgeColor; icon?: typeof Check; dot?: boolean }> = {
  Paid: { color: 'success', icon: Check },
  Refunded: { color: 'gray', icon: ArrowLeft },
  Cancelled: { color: 'error', icon: XClose },
  Success: { color: 'success', dot: true },
  Processing: { color: 'gray', dot: true },
  Declined: { color: 'error', dot: true },
  Customer: { color: 'success', dot: true },
  Churned: { color: 'gray', dot: true },
  Track: { color: 'brand' },
};

export function StatusBadge({ status }: { status: string }) {
  const s = STATUS[status] ?? { color: 'gray' as BadgeColor };
  return (
    <Badge size="sm" type="pill-color" color={s.color} iconLeading={s.icon} dot={s.dot}>
      {status}
    </Badge>
  );
}

const rowCheck = (label: string) => <Checkbox size="sm" aria-label={`Select ${label}`} />;

export interface Person {
  name: string;
  email: string;
}

export const PEOPLE: Person[] = [
  { name: 'Olivia Rhye', email: 'olivia@tinicorn.com' },
  { name: 'Phoenix Baker', email: 'phoenix@tinicorn.com' },
  { name: 'Lana Steiner', email: 'lana@tinicorn.com' },
  { name: 'Demi Wilkinson', email: 'demi@tinicorn.com' },
  { name: 'Candice Wu', email: 'candice@tinicorn.com' },
  { name: 'Natali Craig', email: 'natali@tinicorn.com' },
  { name: 'Drew Cano', email: 'drew@tinicorn.com' },
  { name: 'Orlando Diggs', email: 'orlando@tinicorn.com' },
  { name: 'Andi Lane', email: 'andi@tinicorn.com' },
  { name: 'Kate Morrison', email: 'kate@tinicorn.com' },
];

const personCell = (p: Person, withEmail = true) => <TableLead title={p.name} supportingText={withEmail ? p.email : undefined} avatarInitials={initialsOf(p.name)} />;

const linkActions = (a: string, b?: string) => (
  <div className="flex items-center justify-end gap-3">
    <Button size="sm" hierarchy="link-gray">
      {a}
    </Button>
    {b && (
      <Button size="sm" hierarchy="link-color">
        {b}
      </Button>
    )}
  </div>
);

const iconActions = <TableActions actions={[{ icon: Trash01, label: 'Delete' }, { icon: Edit01, label: 'Edit' }]} />;
const dropdownAction = <Button size="sm" hierarchy="tertiary-gray" iconLeading={DotsVertical} aria-label="More actions" />;

export type RowActions = 'icons' | 'dropdown' | 'view' | 'archive-download' | 'delete-edit';
function actionsCol<R>(kind: RowActions): Col<R> {
  return {
    compact: kind === 'icons',
    className: kind === 'dropdown' ? 'w-17' : undefined,
    cell: () =>
      kind === 'icons' ? iconActions : kind === 'dropdown' ? dropdownAction : kind === 'view' ? linkActions('View') : kind === 'archive-download' ? linkActions('Archive', 'Download') : linkActions('Delete', 'Edit'),
  };
}

/* ------------------------------------------------------------------------------------------------
 * Customers
 * ---------------------------------------------------------------------------------------------- */

interface Customer {
  company: string;
  domain: string;
  status: string;
  about: string;
  aboutSub: string;
  license: number;
}

const CUSTOMERS: Customer[] = [
  { company: 'Catalog', domain: 'catalogapp.io', status: 'Customer', about: 'Content curating app', aboutSub: 'Brings all your news into one place', license: 60 },
  { company: 'Capsule', domain: 'getcapsule.com', status: 'Churned', about: 'Design software', aboutSub: 'Super lightweight design app', license: 30 },
  { company: 'Command+R', domain: 'cmdr.ai', status: 'Customer', about: 'Data prediction', aboutSub: 'AI and machine learning data', license: 80 },
  { company: 'Hourglass', domain: 'hourglass.app', status: 'Customer', about: 'Productivity app', aboutSub: 'Time management and productivity', license: 20 },
  { company: 'Layers', domain: 'getlayers.io', status: 'Churned', about: 'Web app integrations', aboutSub: 'Connect web apps seamlessly', license: 100 },
  { company: 'Quotient', domain: 'quotient.co', status: 'Customer', about: 'Sales CRM', aboutSub: 'Web-based sales doc management', license: 40 },
  { company: 'Sisyphus', domain: 'sisyphus.com', status: 'Customer', about: 'Automation and workflow', aboutSub: 'Time tracking, invoicing and expenses', license: 50 },
];

const groupAvatars = PEOPLE.slice(0, 9).map((p) => ({ initials: p.name[0], alt: p.name }));

export function CustomersTable({ status = true, about = true, actions = 'icons', striped }: { status?: boolean; about?: boolean; actions?: RowActions; striped?: boolean }) {
  const cols: Col<Customer>[] = [
    { header: 'Company', checkbox: true, className: 'w-full', cell: (c) => <TableLead control={rowCheck(c.company)} title={c.company} supportingText={c.domain} avatarInitials={c.company.slice(0, 2).toUpperCase()} /> },
  ];
  if (status) cols.push({ header: 'Status', cell: (c) => <StatusBadge status={c.status} /> });
  if (about)
    cols.push({
      header: 'About',
      hideMobile: true,
      cell: (c) => (
        <div className="flex flex-col">
          <span className="text-gray-900">{c.about}</span>
          <span>{c.aboutSub}</span>
        </div>
      ),
    });
  cols.push({ header: 'Users', hideMobile: true, cell: () => <TableAvatarGroup avatars={groupAvatars} max={5} /> });
  cols.push({ header: 'License use', hideMobile: true, cell: (c) => <TableProgress value={c.license} /> });
  cols.push(actionsCol<Customer>(actions));
  return <GridTable cols={cols} rows={CUSTOMERS} striped={striped} />;
}

/* ------------------------------------------------------------------------------------------------
 * Orders / invoices
 * ---------------------------------------------------------------------------------------------- */

interface Invoice {
  id: string;
  date: string;
  status: string;
  person: Person;
  progress: number;
}

const DATES = ['Jan 6, 2022', 'Jan 6, 2022', 'Jan 6, 2022', 'Jan 5, 2022', 'Jan 5, 2022', 'Jan 5, 2022', 'Jan 4, 2022', 'Jan 3, 2022', 'Jan 3, 2022', 'Jan 3, 2022'];
const STATUSES = ['Paid', 'Paid', 'Paid', 'Paid', 'Refunded', 'Paid', 'Cancelled', 'Cancelled'];
const PROGRESS = [60, 30, 80, 40, 90, 50, 70, 20];

export const invoices = (n = 7, prefix = 'INV-'): Invoice[] =>
  Array.from({ length: n }, (_, i) => ({
    id: `${prefix}${3066 - i}`,
    date: DATES[i % DATES.length]!,
    status: STATUSES[i % STATUSES.length]!,
    person: PEOPLE[i % PEOPLE.length]!,
    progress: PROGRESS[i % PROGRESS.length]!,
  }));

export type InvoiceCol = 'date' | 'status' | 'customer' | 'customer-name' | 'purchase' | 'progress';

export function InvoicesTable({ rows = invoices(), columns, actions, idHeader = 'Invoice', striped }: { rows?: Invoice[]; columns: InvoiceCol[]; actions?: RowActions; idHeader?: string; striped?: boolean }) {
  const cols: Col<Invoice>[] = [
    { header: idHeader, checkbox: true, className: 'w-full', cell: (r) => <TableLead control={rowCheck(r.id)} title={r.id} /> },
  ];
  for (const c of columns) {
    if (c === 'date') cols.push({ header: 'Date', hideMobile: true, cell: (r) => r.date });
    if (c === 'status') cols.push({ header: 'Status', cell: (r) => <StatusBadge status={r.status} /> });
    if (c === 'customer' || c === 'customer-name') cols.push({ header: 'Customer', hideMobile: true, cell: (r) => personCell(r.person, c === 'customer') });
    if (c === 'purchase') cols.push({ header: 'Purchase', hideMobile: true, cell: () => 'Monthly' });
    if (c === 'progress') cols.push({ header: 'Progress', hideMobile: true, cell: (r) => <TableProgress value={r.progress} /> });
  }
  if (actions) cols.push(actionsCol<Invoice>(actions));
  return <GridTable cols={cols} rows={rows} striped={striped} />;
}

/* ------------------------------------------------------------------------------------------------
 * Trades
 * ---------------------------------------------------------------------------------------------- */

interface Trade {
  ticker: string;
  side: 'BUY' | 'SELL';
  name: string;
  amount: string;
  date: string;
  status: string;
  person: Person;
}

const TRADES: Trade[] = [
  { ticker: 'TSLA', side: 'BUY', name: 'Tesla, Inc.', amount: '$30,021.23', date: 'Jan 13, 2022', status: 'Processing', person: PEOPLE[0]! },
  { ticker: 'MTCH', side: 'SELL', name: 'Match Group, Inc,', amount: '$10,045.00', date: 'Jan 13, 2022', status: 'Success', person: PEOPLE[1]! },
  { ticker: 'DDOG', side: 'BUY', name: 'Datadog Inc', amount: '$40,132.16', date: 'Jan 13, 2022', status: 'Success', person: PEOPLE[2]! },
  { ticker: 'ARKG', side: 'BUY', name: 'ARK Genomic Revolution ETF', amount: '$22,665.12', date: 'Jan 13, 2022', status: 'Declined', person: PEOPLE[3]! },
  { ticker: 'SQ', side: 'BUY', name: 'Square, Inc.', amount: '$18,221.30', date: 'Jan 12, 2022', status: 'Success', person: PEOPLE[4]! },
  { ticker: 'MSTR', side: 'SELL', name: 'MicroStrategy Inc.', amount: '$24,118.18', date: 'Jan 12, 2022', status: 'Success', person: PEOPLE[5]! },
  { ticker: 'TSLA', side: 'BUY', name: 'Tesla, Inc.', amount: '$22,468.20', date: 'Jan 12, 2022', status: 'Success', person: PEOPLE[4]! },
];

export function TradesTable({ rows = 7, actions = 'view' }: { rows?: number; actions?: RowActions }) {
  const cols: Col<Trade>[] = [
    {
      header: 'Trade',
      checkbox: true,
      className: 'w-full',
      cell: (t) => (
        <TableLead
          control={rowCheck(t.ticker)}
          title={
            <span className="flex items-center gap-1.5">
              {t.ticker}
              <span className={cx('text-xs font-medium', t.side === 'BUY' ? 'text-success-700' : 'text-error-700')}>{t.side}</span>
            </span>
          }
          supportingText={t.name}
        />
      ),
    },
    { header: 'Order amount', cell: (t) => t.amount },
    { header: 'Delivery date', hideMobile: true, cell: (t) => t.date },
    { header: 'Status', hideMobile: true, cell: (t) => <StatusBadge status={t.status} /> },
    { header: 'Executed by', hideMobile: true, cell: (t) => personCell(t.person) },
    actionsCol<Trade>(actions),
  ];
  return <GridTable cols={cols} rows={TRADES.slice(0, rows)} />;
}

/* ------------------------------------------------------------------------------------------------
 * Files
 * ---------------------------------------------------------------------------------------------- */

interface FileRow {
  name: string;
  size: string;
  type: FileType;
  uploaded: string;
  person: Person;
}

const FILES: FileRow[] = [
  { name: 'Tech requirements.pdf', size: '200 KB', type: 'pdf', uploaded: 'Jan 4, 2022', person: PEOPLE[0]! },
  { name: 'Dashboard screenshot.jpg', size: '720 KB', type: 'jpg', uploaded: 'Jan 4, 2022', person: PEOPLE[1]! },
  { name: 'Dashboard prototype recording.mp4', size: '16 MB', type: 'mp4', uploaded: 'Jan 2, 2022', person: PEOPLE[2]! },
  { name: 'Dashboard prototype FINAL.fig', size: '4.2 MB', type: 'fig', uploaded: 'Jan 6, 2022', person: PEOPLE[3]! },
  { name: 'UX Design Guidelines.docx', size: '400 KB', type: 'docx', uploaded: 'Jan 8, 2022', person: PEOPLE[4]! },
  { name: 'Dashboard interaction.aep', size: '12 MB', type: 'aep', uploaded: 'Jan 6, 2022', person: PEOPLE[5]! },
  { name: 'Briefing call recording.mp3', size: '800 KB', type: 'mp3', uploaded: 'Jan 4, 2022', person: PEOPLE[6]! },
];

export function FilesTable() {
  const cols: Col<FileRow>[] = [
    {
      header: 'File name',
      checkbox: true,
      className: 'w-full',
      cell: (f) => <TableLead control={rowCheck(f.name)} leading={<FileTypeIcon type={f.type} className="size-10 shrink-0" />} title={f.name} supportingText={f.size} />,
    },
    { header: 'File size', hideMobile: true, className: 'max-xl:hidden', cell: (f) => f.size },
    { header: 'Date uploaded', hideMobile: true, cell: (f) => f.uploaded },
    { header: 'Last updated', hideMobile: true, cell: (f) => f.uploaded },
    { header: 'Uploaded by', hideMobile: true, cell: (f) => personCell(f.person) },
    actionsCol<FileRow>('delete-edit'),
  ];
  return <GridTable cols={cols} rows={FILES} />;
}

/* ------------------------------------------------------------------------------------------------
 * Sources (debugger)
 * ---------------------------------------------------------------------------------------------- */

const SOURCES = ['Signup complete', 'Signup complete', 'Source deleted', 'Signup complete', 'Signup complete', 'Source deleted', 'Source deleted'];

export function SourcesTable() {
  const cols: Col<string>[] = [
    { header: 'Action', className: 'w-full', cell: (s) => <TableLead title={s} /> },
    { header: 'Status', cell: () => <StatusBadge status="Track" /> },
    { header: 'Date', cell: (_s, i) => DATES[i]! },
  ];
  return <GridTable cols={cols} rows={SOURCES} striped />;
}

/* ------------------------------------------------------------------------------------------------
 * Filter bars
 * ---------------------------------------------------------------------------------------------- */

const searchInput = (placeholder = 'Search', className?: string, label?: string) => (
  <Input className={className} iconLeading={SearchLg} placeholder={placeholder} label={label} aria-label={label ? undefined : placeholder} />
);

/** "All time / US, AU, +4 / More filters" buttons + search (customers pages). */
export function CustomerFilters({ color = 'gray' }: { color?: 'gray' | 'color' }) {
  const h = color === 'color' ? 'secondary-color' : 'secondary-gray';
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
      <div className="flex flex-1 flex-wrap gap-3">
        <Button hierarchy={h} iconTrailing={XClose}>
          All time
        </Button>
        <Button hierarchy={h} iconTrailing={XClose} className="max-md:hidden">
          US, AU, +4
        </Button>
        <Button hierarchy="secondary-gray" iconLeading={FilterLines}>
          More filters
        </Button>
      </div>
      {searchInput('Search', 'md:w-80')}
    </div>
  );
}

/** Labelled "Search for order / Status / Category / Customer" filters. */
export function OrderFilters({ customer = true, clear, boxed, className }: { customer?: boolean; clear?: boolean; boxed?: boolean; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-3 md:flex-row md:items-end', boxed && 'rounded-xl bg-gray-50 p-4 md:p-5', className)}>
      <div className="grid flex-1 grid-cols-2 gap-3 md:flex md:flex-1">
        <div className={cx('col-span-2 md:shrink-0', clear ? 'md:w-80' : 'md:w-90')}>{searchInput('Search', 'w-full', 'Search for order')}</div>
        <Select
          className={cx('min-w-0', clear ? 'md:w-48' : 'md:flex-1')}
          label="Status"
          defaultValue="paid"
          items={[
            { value: 'paid', label: 'Paid', dot: true },
            { value: 'refunded', label: 'Refunded', dot: 'bg-gray-400' },
            { value: 'cancelled', label: 'Cancelled', dot: 'bg-error-500' },
          ]}
        />
        <Select className={cx('min-w-0', clear ? 'md:w-48' : 'md:flex-1')} label="Category" defaultValue="all" items={[{ value: 'all', label: 'All' }, { value: 'subscription', label: 'Subscription' }]} />
        {customer && (
          <Select className="min-w-0 max-md:hidden md:flex-1" label="Customer" defaultValue="all" items={[{ value: 'all', label: 'All' }, ...PEOPLE.slice(0, 4).map((p) => ({ value: p.email, label: p.name }))]} />
        )}
      </div>
      {clear && (
        <Button size="lg" hierarchy="secondary-gray" className="max-md:hidden">
          Clear all
        </Button>
      )}
    </div>
  );
}

/** Search + date range + Filters (trade history). */
export function TradeFilters({ boxed, className }: { boxed?: boolean; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-4', boxed && 'rounded-xl bg-gray-50 px-4 py-3', className)}>
      {searchInput('Search for trades', 'md:max-w-100 md:flex-1')}
      <div className="flex items-center gap-3">
        <DateRangePicker defaultValue={{ start: new Date(2022, 0, 10), end: new Date(2022, 0, 16) }} today={new Date(2022, 0, 16)} align="right" />
        <Button hierarchy="secondary-gray" iconLeading={FilterLines}>
          Filters
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------------------------------------
 * Metrics
 * ---------------------------------------------------------------------------------------------- */

const METRICS = [
  { title: 'Total customers', value: '2,420', change: '20%', trend: 'positive' as const, icon: Users01 },
  { title: 'Members', value: '1,210', change: '15%', trend: 'positive' as const, icon: UserCheck01 },
  { title: 'Active now', value: '316', icon: UserPlus01 },
];

export function CustomerMetrics({ type = 'simple' }: { type?: MetricItemType }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
      {METRICS.map((m) => (
        <MetricItem
          key={m.title}
          type={type}
          title={m.title}
          value={m.value}
          change={m.change}
          trend={m.trend}
          changeText={type === 'simple' || !m.change ? undefined : 'vs last month'}
          icon={m.icon}
          onMenuClick={() => {}}
        />
      ))}
    </div>
  );
}

export const uploadIcon = UploadCloud02;
