/* Content blocks of the Settings example pages (forms, tables, cards). Default content = Figma copy. */
import { useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import {
  ArrowUpRight,
  Check,
  Clock,
  DownloadCloud02,
  Edit01,
  LayersThree01,
  LayersTwo01,
  Mail01,
  Monitor04,
  Phone01,
  Plus,
  SearchLg,
  Trash01,
  Zap,
} from '../../icons';
import { Button } from '../../components/buttons/Button';
import { Badge, type BadgeColor, type BadgeType } from '../../components/badges/Badge';
import { Avatar, AvatarGroup } from '../../components/avatars/Avatar';
import { Checkbox } from '../../components/checkboxes/Checkbox';
import { Radio } from '../../components/checkboxes/Radio';
import { RadioGroup } from '../../components/checkboxes/CheckboxGroup';
import { ChoiceCard } from '../../components/checkboxes/ChoiceCard';
import { Toggle } from '../../components/toggles/Toggle';
import { Input } from '../../components/inputs/Input';
import { Textarea } from '../../components/inputs/Textarea';
import { Select } from '../../components/dropdowns/Select';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups/ButtonGroup';
import { SectionHeader } from '../../components/headers/SectionHeader';
import { HeaderMenuButton } from '../../components/headers/CardHeader';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/table/Table';
import { TableActions, TableBadges, TableLead } from '../../components/table/TableCells';
import { TableCard } from '../../components/table/TableCard';
import { Pagination } from '../../components/pagination/Pagination';
import { PaymentIcon, type PaymentMethod } from '../../components/misc-icons/PaymentIcon';
import { FileTypeIcon, type FileType } from '../../components/misc-icons/FileTypeIcon';
import { Flag } from '../../components/misc-icons/Flag';
import { ProgressBar } from '../../components/progress/ProgressBar';
import { FileUpload } from '../../components/file-upload/FileUpload';
import type { FileUploadItemState } from '../../components/file-upload/FileUploadItem';
import { InlineCTA } from '../../components/inline-cta/InlineCTA';
import { EmailCTA, PaymentMethodCTA } from '../../components/inline-cta/InlineCTAVariants';
import { WysiwygToolbar } from '../../components/wysiwyg/WysiwygToolbar';
import { CompanyLogo, type CompanyLogoName } from '../../components/logos/CompanyLogo';
import { TinicornLogomark } from '../../components/logos/TinicornLogo';
import { settingsAppLogoData, type SettingsAppLogoName } from './appLogos.data';
import { FormRow, FormRows, type FormRowProps } from './parts';

type RowLayout = Pick<FormRowProps, 'layout' | 'contentWidth' | 'gap'>;

/* ------------------------------------------------------------------ */
/* Integrations                                                         */
/* ------------------------------------------------------------------ */

/** Integration app logo (Figma `linear`, `github`, `slack` …) — 48px by default. */
export function AppLogo({ name, size = 48, className }: { name: SettingsAppLogoName; size?: number; className?: string }) {
  const d = settingsAppLogoData[name];
  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${d.w} ${d.h}`}
      fill="none"
      aria-hidden
      className={cx('shrink-0', className)}
      dangerouslySetInnerHTML={{ __html: d.body }}
    />
  );
}

export interface IntegrationData {
  logo: SettingsAppLogoName;
  name: string;
  description: string;
  enabled: boolean;
}

export const integrationCards: IntegrationData[] = [
  { logo: 'linear', name: 'Linear', description: 'Streamline software projects, sprints, and bug tracking.', enabled: true },
  { logo: 'github', name: 'GitHub', description: 'Link pull requests and automate workflows.', enabled: true },
  { logo: 'figma', name: 'Figma', description: 'Embed file previews in projects.', enabled: true },
  { logo: 'zapier', name: 'Zapier', description: 'Build custom automations and integrations with apps.', enabled: false },
  { logo: 'notion', name: 'Notion', description: 'Embed notion pages and notes in projects.', enabled: true },
  { logo: 'slack', name: 'Slack', description: 'Send notifications to channels and create projects.', enabled: true },
  { logo: 'zendesk', name: 'Zendesk', description: 'Link and automate Zendesk tickets.', enabled: true },
  { logo: 'jira', name: 'Atlassian JIRA', description: 'Plan, track, and release great software.', enabled: false },
  { logo: 'dropbox', name: 'Dropbox', description: 'Everything you need for work, all in one place.', enabled: true },
  { logo: 'chrome', name: 'Google Chrome', description: 'Link your Google account to share bookmarks across your entire team.', enabled: true },
  { logo: 'discord', name: 'Discord', description: 'Keep in touch with your customers without leaving the app.', enabled: true },
  { logo: 'google-drive', name: 'Google Drive', description: 'Link your Google account to share files across your entire team.', enabled: false },
];

export const integrationRows: IntegrationData[] = [
  { logo: 'linear', name: 'Linear', description: 'Streamline software projects, sprints, tasks, and bug tracking.', enabled: true },
  { logo: 'github', name: 'GitHub', description: 'Link pull requests and automate workflows.', enabled: true },
  { logo: 'figma', name: 'Figma', description: 'Embed file previews in projects.', enabled: true },
  { logo: 'zapier', name: 'Zapier', description: 'Build custom automations and integrations with other apps.', enabled: true },
  { logo: 'notion', name: 'Notion', description: 'Embed notion pages and notes in projects.', enabled: true },
  { logo: 'slack', name: 'Slack', description: 'Send notifications to channels and create projects from messages.', enabled: true },
];

/** Figma "_Integration card desktop / mobile". */
export function IntegrationCard({ item }: { item: IntegrationData }) {
  const [on, setOn] = useState(item.enabled);
  return (
    <div className="flex flex-col rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="flex flex-1 flex-col gap-6 px-4 py-5 md:p-6">
        <div className="flex items-start gap-2">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <AppLogo name={item.logo} />
            <h3 className="text-md font-medium text-gray-900">{item.name}</h3>
          </div>
          <Toggle size="sm" checked={on} onChange={setOn} aria-label={`Enable ${item.name}`} />
        </div>
        <p className="text-sm text-gray-600">{item.description}</p>
      </div>
      <div className="flex justify-end border-t border-gray-200 px-4 py-4 md:px-6">
        <Button hierarchy="link-color" href="#" as="a">
          View integration
        </Button>
      </div>
    </div>
  );
}

/** Grid of integration cards (3 columns on desktop). */
export function IntegrationCardsGrid({ items = integrationCards.slice(0, 9), className }: { items?: IntegrationData[]; className?: string }) {
  return (
    <div className={cx('grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3', className)}>
      {items.map((it) => (
        <IntegrationCard key={it.name} item={it} />
      ))}
    </div>
  );
}

/** Figma "_Integration row desktop". */
export function IntegrationRow({ item }: { item: IntegrationData }) {
  const [on, setOn] = useState(item.enabled);
  return (
    <div className="flex flex-col gap-4 border-b border-gray-200 py-4 sm:flex-row sm:items-center">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <AppLogo name={item.logo} />
        <div className="flex min-w-0 flex-col gap-0.5 text-sm">
          <span className="font-medium text-gray-700">{item.name}</span>
          <span className="text-gray-600">{item.description}</span>
        </div>
      </div>
      <div className="flex items-center gap-4 max-sm:justify-between max-sm:pl-16">
        <Button hierarchy="link-gray" href="#" as="a">
          Learn more
        </Button>
        <Toggle size="md" checked={on} onChange={setOn} aria-label={`Enable ${item.name}`} />
      </div>
    </div>
  );
}

export function IntegrationList({ items = integrationRows }: { items?: IntegrationData[] }) {
  return (
    <div className="flex flex-col">
      {items.map((it) => (
        <IntegrationRow key={it.name} item={it} />
      ))}
    </div>
  );
}

/** "Connected apps" section header with search (Figma Section header Type=Search). */
export function ConnectedAppsHeader() {
  return (
    <SectionHeader
      title="Connected apps"
      supportingText="Supercharge your workflow and connect the tool you use every day."
      search={<Input iconLeading={SearchLg} placeholder="Search" aria-label="Search apps" />}
      divider={false}
    />
  );
}

/** "We’ve just released a new update!" inline CTA with image (Figma Inline CTA Type=Image). */
export function UpdateImageCTA() {
  const [shown, setShown] = useState(true);
  if (!shown) return null;
  return (
    <InlineCTA
      title="We’ve just released a new update!"
      description="Check out the all new dashboard view. Pages and now load faster."
      media={<div className="size-full bg-linear-to-br from-brand-300 via-brand-100 to-pink-100" />}
      playButton
      secondaryAction={{ label: 'Dismiss', onClick: () => setShown(false) }}
      primaryAction={{ label: 'Changelog' }}
    />
  );
}

/** Figma Inline CTA Type=Email field. */
export function UpdateEmailCTA() {
  return (
    <EmailCTA
      title="We’ve just released a new update!"
      description="Check out the all new dashboard view. Pages and now load faster."
      submitLabel="Subscribe"
      placeholder="you@untitledui.com"
    />
  );
}

/* ------------------------------------------------------------------ */
/* Notifications                                                        */
/* ------------------------------------------------------------------ */

const radioGroups: { label: string; supportingText: string; options: { value: string; label: string; hint?: string }[]; value: string }[] = [
  {
    label: 'Comments',
    supportingText: 'These are notifications for comments on your posts and replies to your comments.',
    options: [
      { value: 'none', label: 'Do not notifiy me' },
      { value: 'mentions', label: 'Mentions only', hint: 'Only notify me if I’m mentioned in a comment.' },
      { value: 'all', label: 'All comments', hint: 'Notify me for all comments on my posts.' },
    ],
    value: 'all',
  },
  {
    label: 'Reminders',
    supportingText: 'These are notifications to remind you of updates you might have missed.',
    options: [
      { value: 'none', label: 'Do not notifiy me' },
      { value: 'important', label: 'Important reminders only', hint: 'Only notify me if the reminder is tagged as important.' },
      { value: 'all', label: 'All reminders', hint: 'Notify me for all reminders.' },
    ],
    value: 'all',
  },
  {
    label: 'More activity about you',
    supportingText: 'These are notifications for posts on your profile, likes and other reactions to your posts, and more.',
    options: [
      { value: 'none', label: 'Do not notifiy me' },
      { value: 'all', label: 'All reminders', hint: 'Notify me for all other activity.' },
    ],
    value: 'none',
  },
];

/** Email notification preferences: checkbox group + radio groups (Settings 01 page 03). */
export function EmailNotificationsForm(layout: RowLayout) {
  const [news, setNews] = useState({ news: true, tips: true, research: false });
  return (
    <FormRows>
      <FormRow {...layout} label="Notifications from us" supportingText="Receive the latest news, updates and industry tutorials from us.">
        <Checkbox size="sm" label="News and updates" hint="News about product and feature updates." checked={news.news} onChange={(v) => setNews({ ...news, news: v })} />
        <Checkbox size="sm" label="Tips and tutorials" hint="Tips on getting more out of Tinicorn." checked={news.tips} onChange={(v) => setNews({ ...news, tips: v })} />
        <Checkbox
          size="sm"
          label="User research"
          hint="Get involved in our beta testing program or participate in paid product user research."
          checked={news.research}
          onChange={(v) => setNews({ ...news, research: v })}
        />
      </FormRow>
      {radioGroups.map((g) => (
        <FormRow key={g.label} {...layout} label={g.label} supportingText={g.supportingText}>
          <RadioGroup size="sm" defaultValue={g.value} name={g.label} aria-label={g.label} className="*:gap-4">
            {g.options.map((o) => (
              <Radio key={o.value} size="sm" value={o.value} label={o.label} hint={o.hint} />
            ))}
          </RadioGroup>
        </FormRow>
      ))}
    </FormRows>
  );
}

const toggleGroups: { label: string; supportingText: string; on: [boolean, boolean, boolean] }[] = [
  { label: 'Comments', supportingText: 'These are notifications for comments on your posts and replies to your comments.', on: [true, true, false] },
  { label: 'Tags', supportingText: 'These are notifications for when someone tags you in a comment, post or story.', on: [true, false, false] },
  { label: 'Reminders', supportingText: 'These are notifications to remind you of updates you might have missed.', on: [false, false, false] },
  { label: 'More activity about you', supportingText: 'These are notifications for posts on your profile, likes and other reactions to your posts, and more.', on: [false, false, false] },
];

function ToggleTriple({ initial, group }: { initial: [boolean, boolean, boolean]; group: string }) {
  const [v, setV] = useState(initial);
  return (
    <div className="flex flex-col gap-4">
      {(['Push', 'Email', 'SMS'] as const).map((l, i) => (
        <Toggle
          key={l}
          size="sm"
          label={l}
          checked={v[i]}
          onChange={(c) => setV((p) => p.map((x, j) => (j === i ? c : x)) as [boolean, boolean, boolean])}
          aria-label={`${group} ${l}`}
        />
      ))}
    </div>
  );
}

/** Push / Email / SMS toggles per notification type (Settings 01 page 04). */
export function NotificationTogglesForm(layout: RowLayout) {
  return (
    <FormRows>
      {toggleGroups.map((g) => (
        <FormRow key={g.label} {...layout} label={g.label} supportingText={g.supportingText}>
          <ToggleTriple initial={g.on} group={g.label} />
        </FormRow>
      ))}
    </FormRows>
  );
}

const channelGroups: { label: string; supportingText: string; rows: [string, string][] }[] = [
  {
    label: 'General notifications',
    supportingText: 'Select when you’ll be notified when the following changes occur.',
    rows: [
      ['I’m mentioned in a message', 'In-app'],
      ['Someone replies to any message', 'In-app'],
      ['I’m assigned a task', 'In-app'],
      ['A task is overdue', 'In-app'],
      ['A task status is updated', 'Email'],
    ],
  },
  {
    label: 'Summary notifications',
    supportingText: 'Select when you’ll be notified when the following summaries or report are ready.',
    rows: [
      ['Daily summary', 'Email'],
      ['Weekly summary', 'Email'],
      ['Monthly summary', 'Email'],
      ['Quarterly summary', 'Email'],
    ],
  },
];

function ChannelRow({ label, initial }: { label: string; initial: string }) {
  const [v, setV] = useState<string | null>(initial);
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <span className="flex-1 text-sm font-medium text-gray-700">{label}</span>
      <ButtonGroup value={v} onChange={setV} aria-label={label} className="self-start sm:self-auto">
        {['None', 'In-app', 'Email'].map((o) => (
          <ButtonGroupItem key={o} value={o}>
            {o}
          </ButtonGroupItem>
        ))}
      </ButtonGroup>
    </div>
  );
}

/** Notification channel button groups (None / In-app / Email) per event (Settings 01 page 05). */
export function NotificationChannelsForm({ contentWidth = 'lg:max-w-[536px]', ...layout }: RowLayout) {
  return (
    <FormRows gap="gap-6">
      {channelGroups.map((g) => (
        <FormRow key={g.label} {...layout} contentWidth={contentWidth} label={g.label} supportingText={g.supportingText}>
          <FormRows gap="gap-4" className="pb-4">
            {g.rows.map(([l, v]) => (
              <ChannelRow key={l} label={l} initial={v} />
            ))}
          </FormRows>
        </FormRow>
      ))}
    </FormRows>
  );
}

/* ------------------------------------------------------------------ */
/* Billing                                                              */
/* ------------------------------------------------------------------ */

const paymentMethods: { id: string; method: PaymentMethod; label: string }[] = [
  { id: 'visa-1', method: 'visa', label: 'Visa ending in 1234' },
  { id: 'mc-1', method: 'mastercard', label: 'Mastercard ending in 1234' },
  { id: 'visa-2', method: 'visa', label: 'Visa ending in 1234' },
];

/** Payment method choice cards + "Add new payment method" (Figma Checkbox group Type=Payment icon). */
export function PaymentMethodsField({ count = 3 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup size="sm" defaultValue="visa-1" name="payment-method" aria-label="Payment method">
        {paymentMethods.slice(0, count).map((p) => (
          <ChoiceCard
            key={p.id}
            type="payment-icon"
            value={p.id}
            title={p.label}
            description="Expiry 06/2024"
            paymentIcon={<PaymentIcon method={p.method} size="md" />}
            actions={
              <>
                <Button size="sm" hierarchy="link-gray">
                  Set as default
                </Button>
                <Button size="sm" hierarchy="link-color">
                  Edit
                </Button>
              </>
            }
          />
        ))}
      </RadioGroup>
      <div>
        <Button hierarchy="link-gray" iconLeading={Plus}>
          Add new payment method
        </Button>
      </div>
    </div>
  );
}

/** "Contact email" radio choice with alternative email input. */
export function ContactEmailField() {
  const [v, setV] = useState('alt');
  return (
    <RadioGroup size="sm" value={v} onChange={setV} name="contact-email" aria-label="Contact email" className="*:gap-4">
      <Radio size="sm" value="account" label="Send to my account email" hint="olivia@untitledui.com" />
      <div className="flex flex-col gap-3">
        <Radio size="sm" value="alt" label="Send to an alternative email" />
        <div className="pl-6">
          <Input iconLeading={Mail01} defaultValue="billing@untitledui.com" aria-label="Alternative email" disabled={v !== 'alt'} />
        </div>
      </div>
    </RadioGroup>
  );
}

export type BillingTableVariant = 'admin' | 'plan' | 'plan-users' | 'files' | 'month';

const months = ['Dec', 'Nov', 'Oct', 'Sep', 'Aug', 'Jul', 'Jun'];
const avatarSets = [
  ['O', 'P', 'L', 'D', 'C'],
  ['N', 'D', 'O', 'A', 'K'],
];

function PaidBadge({ type }: { type: BadgeType }) {
  return (
    <Badge size="sm" type={type} color="success" iconLeading={type === 'badge-modern' ? undefined : Check} dot={type === 'badge-modern'}>
      Paid
    </Badge>
  );
}

function UsersOnPlan({ i }: { i: number }) {
  return (
    <AvatarGroup size="xs" max={5}>
      {[...avatarSets[i % 2], 'A', 'B', 'C', 'D', 'E'].map((x, j) => (
        <Avatar key={j} initials={x} />
      ))}
    </AvatarGroup>
  );
}

/**
 * Billing history table. Variants follow the Figma pages:
 * `admin` (invoice no. + account admin + users), `plan` / `plan-users` ("Basic Plan – Dec 2022"),
 * `files` (PDF invoices + download link), `month` ("Dec 2022" + download link).
 */
export function BillingTable({ variant = 'plan', badge = 'pill-color', headerWhite }: { variant?: BillingTableVariant; badge?: BadgeType; headerWhite?: boolean }) {
  const [sel, setSel] = useState<Record<number, boolean>>({});
  const all = months.every((_, i) => sel[i]);
  const some = months.some((_, i) => sel[i]);
  const toggleAll = (v: boolean) => setSel(Object.fromEntries(months.map((_, i) => [i, v])));
  const title = (i: number) => {
    const m = months[i];
    if (variant === 'admin') return `INV-0011${String(12 - i).padStart(2, '0')}2022`;
    if (variant === 'files') return `Invoice #00${7 - i} – ${m} 2022`;
    if (variant === 'month') return `${m} 2022`;
    return `Basic Plan – ${m} 2022`;
  };
  const date = (i: number) => `${months[i]} 1, 2022`;
  const downloadLink = variant === 'files' || variant === 'month';
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className={headerWhite ? 'bg-white' : undefined}>
            <TableRow>
              <TableHead
                checkbox={<Checkbox size="sm" checked={all} indeterminate={some && !all} onChange={toggleAll} aria-label="Select all" />}
                sortDirection={variant === 'files' ? false : 'desc'}
              >
                Invoice
              </TableHead>
              {variant === 'admin' && <TableHead>Account admin</TableHead>}
              {variant === 'admin' && <TableHead>Users on plan</TableHead>}
              {variant === 'files' && <TableHead>Billing date</TableHead>}
              {(variant === 'files' || variant === 'month') && <TableHead>Status</TableHead>}
              <TableHead>Amount</TableHead>
              {(variant === 'admin' || variant === 'plan' || variant === 'plan-users') && <TableHead>Date</TableHead>}
              {(variant === 'admin' || variant === 'plan' || variant === 'plan-users') && <TableHead>Status</TableHead>}
              {variant === 'plan-users' && <TableHead>Users on plan</TableHead>}
              {downloadLink && <TableHead>Plan</TableHead>}
              <TableHead aria-label="Actions" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {months.map((_, i) => (
              <TableRow key={i} selected={!!sel[i]}>
                <TableCell className="font-medium text-gray-900">
                  <TableLead
                    title={title(i)}
                    control={<Checkbox size="sm" checked={!!sel[i]} onChange={(v) => setSel({ ...sel, [i]: v })} aria-label={`Select ${title(i)}`} />}
                    leading={variant === 'files' ? <FileTypeIcon type="pdf" /> : undefined}
                  />
                </TableCell>
                {variant === 'admin' && (
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar size="sm" initials="OR" />
                      <div className="flex flex-col text-sm">
                        <span className="font-medium text-gray-900">Olivia Rhye</span>
                        <span className="text-gray-600">olivia@untitledui.com</span>
                      </div>
                    </div>
                  </TableCell>
                )}
                {variant === 'admin' && (
                  <TableCell>
                    <UsersOnPlan i={i} />
                  </TableCell>
                )}
                {variant === 'files' && <TableCell>{date(i)}</TableCell>}
                {(variant === 'files' || variant === 'month') && (
                  <TableCell>
                    <PaidBadge type={badge} />
                  </TableCell>
                )}
                <TableCell>USD $10.00</TableCell>
                {(variant === 'admin' || variant === 'plan' || variant === 'plan-users') && <TableCell>{date(i)}</TableCell>}
                {(variant === 'admin' || variant === 'plan' || variant === 'plan-users') && (
                  <TableCell>
                    <PaidBadge type={badge} />
                  </TableCell>
                )}
                {variant === 'plan-users' && (
                  <TableCell>
                    <UsersOnPlan i={i} />
                  </TableCell>
                )}
                {downloadLink && <TableCell>Basic plan</TableCell>}
                {downloadLink ? (
                  <TableCell>
                    <Button hierarchy="link-color">Download</Button>
                  </TableCell>
                ) : (
                  <TableCell padding="compact">
                    <TableActions actions={[{ icon: DownloadCloud02, label: 'Download' }]} />
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/** "Billing history" section header with "Download all". */
export function BillingHistoryHeader({ title = 'Billing history', supportingText, menu }: { title?: string; supportingText?: string; menu?: boolean }) {
  return (
    <SectionHeader
      title={title}
      supportingText={supportingText}
      divider={false}
      actions={
        <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
          Download all
        </Button>
      }
      menu={menu ? <HeaderMenuButton /> : undefined}
    />
  );
}

/** Card details / address form (Settings 01 page 08). */
export function CardDetailsForm(layout: RowLayout) {
  const [emails, setEmails] = useState(['billing@untitledui.com']);
  return (
    <FormRows>
      <FormRow {...layout} label="Card details">
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input label="Name on card" defaultValue="Olivia Rhye" className="sm:flex-[2]" />
          <Input label="Expiry" defaultValue="06 / 2024" className="sm:flex-1" />
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Input label="Card number" defaultValue="1234 1234 1234 1234" paymentIcon={<PaymentIcon method="mastercard" size="sm" />} className="sm:flex-[2]" />
          <Input label="CVV" defaultValue="•••" type="password" className="sm:flex-1" />
        </div>
      </FormRow>
      <FormRow {...layout} label="Email address" supportingText="Invoices will be sent to this email address.">
        {emails.map((e, i) => (
          <Input key={i} iconLeading={Mail01} defaultValue={e} aria-label="Email address" />
        ))}
        <div>
          <Button hierarchy="link-gray" iconLeading={Plus} onClick={() => setEmails([...emails, ''])}>
            Add another
          </Button>
        </div>
      </FormRow>
      <FormRow {...layout} label="Street address">
        <Input defaultValue="100 Smith Street" aria-label="Street address" />
      </FormRow>
      <FormRow {...layout} label="City">
        <Input defaultValue="Collingwood" aria-label="City" />
      </FormRow>
      <FormRow {...layout} label="State / Province">
        <div className="flex gap-4">
          <Input defaultValue="VIC" aria-label="State" />
          <Input defaultValue="3066" aria-label="Postcode" />
        </div>
      </FormRow>
      <FormRow {...layout} label="Country">
        <CountrySelect />
      </FormRow>
    </FormRows>
  );
}

const countries = [
  { value: 'AU', label: 'Australia', icon: <Flag code="AU" title="" /> },
  { value: 'US', label: 'United States', icon: <Flag code="US" title="" /> },
  { value: 'GB', label: 'United Kingdom', icon: <Flag code="GB" title="" /> },
  { value: 'TH', label: 'Thailand', icon: <Flag code="TH" title="" /> },
];
export function CountrySelect({ label }: { label?: string }) {
  const [v, setV] = useState('AU');
  return <Select items={countries} value={v} onChange={setV} label={label} />;
}
const timezones = [
  { value: 'pst', label: 'Pacific Standard Time (PST)', supportingText: 'UTC−08:00' },
  { value: 'est', label: 'Eastern Standard Time (EST)', supportingText: 'UTC−05:00' },
  { value: 'aest', label: 'Australian Eastern Time (AEST)', supportingText: 'UTC+10:00' },
];
export function TimezoneSelect({ label, short }: { label?: string; short?: boolean }) {
  const [v, setV] = useState('pst');
  const items = short ? timezones.map((t) => ({ ...t, label: t.label.replace(/.*\((\w+)\)/, '$1') })) : timezones;
  return <Select items={items} value={v} onChange={setV} iconLeading={Clock} label={label} />;
}

/** Current plan card + payment method card (Settings 01 page 09). */
export function CurrentPlanCards() {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <div className="flex flex-1 flex-col rounded-xl border border-gray-200 bg-white shadow-xs">
        <div className="flex flex-col gap-6 px-4 py-5 md:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
            <div className="flex flex-1 flex-col gap-1 py-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-gray-900">Basic plan</h3>
                <Badge type="badge-modern" size="md" color="gray">
                  Monthly
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Our most popular plan for small teams.</p>
            </div>
            <div className="flex items-end gap-0.5 text-gray-900">
              <span className="pb-2.5 text-display-md font-semibold">$</span>
              <span className="text-display-lg font-semibold">10</span>
              <span className="pb-[7px] text-md font-medium text-gray-600">per month</span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="text-sm font-medium text-gray-900">14 of 20 users</span>
            <ProgressBar value={70} />
          </div>
        </div>
        <div className="flex justify-end border-t border-gray-200 px-4 py-4 md:px-6">
          <Button hierarchy="link-color" iconTrailing={ArrowUpRight}>
            Upgrade plan
          </Button>
        </div>
      </div>
      <PaymentMethodCTA
        className="flex-1"
        title="Payment method"
        description="Change how you pay for your plan."
        methodIcon={<PaymentIcon method="visa" size="lg" />}
        cardLabel="Visa ending in 1234"
        expiry="Expiry 06/2024"
        email="billing@untitledui.com"
      />
    </div>
  );
}

const plans = [
  { value: 'basic', icon: LayersTwo01, title: 'Basic plan', price: '$10', desc: 'Includes up to 10 users, 20GB individual data and access to all features.' },
  { value: 'business', icon: LayersThree01, title: 'Business plan', price: '$20', desc: 'Includes up to 20 users, 40GB individual data and access to all features.' },
  { value: 'enterprise', icon: Zap, title: 'Enterprise plan', price: '$40', desc: 'Unlimited users, unlimited individual data and access to all features.' },
];

/** Plan radio cards (Figma Checkbox group Type=Icon simple). */
export function PlanChoiceList() {
  return (
    <RadioGroup size="sm" defaultValue="basic" name="plan" aria-label="Current plan">
      {plans.map((p) => (
        <ChoiceCard key={p.value} type="icon-simple" value={p.value} icon={p.icon} title={p.title} subtext={`${p.price}/month`} description={p.desc} />
      ))}
    </RadioGroup>
  );
}

/** Plan cards in 3 columns (Figma Checkbox group Type=Icon card). */
export function PlanChoiceCards() {
  return (
    <RadioGroup size="sm" defaultValue="basic" name="plan-cards" aria-label="Plan" orientation="horizontal" className="*:grid *:gap-4 md:*:grid-cols-3 md:*:gap-6">
      {plans.map((p, i) => (
        <ChoiceCard
          key={p.value}
          type="icon-card"
          value={p.value}
          icon={p.icon}
          title={p.title}
          price={p.price}
          period="per month"
          description={p.desc}
          badge={
            i === 0 ? (
              <Badge size="sm" type="pill-color" color="brand">
                Limited time only
              </Badge>
            ) : undefined
          }
        />
      ))}
    </RadioGroup>
  );
}

/* ------------------------------------------------------------------ */
/* Team                                                                 */
/* ------------------------------------------------------------------ */

export interface Person {
  name: string;
  handle: string;
  email: string;
  initials: string;
}
const names = ['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Demi Wilkinson', 'Candice Wu', 'Natali Craig', 'Drew Cano', 'Orlando Diggs', 'Andi Lane', 'Kate Morrison'];
export const people: Person[] = names.map((n) => {
  const first = n.split(' ')[0].toLowerCase();
  return { name: n, handle: `@${first}`, email: `${first}@untitledui.com`, initials: n.split(' ').map((p) => p[0]).join('') };
});

const teamsByRow: { label: string; color: BadgeColor }[][] = [
  [{ label: 'Design', color: 'brand' }, { label: 'Product', color: 'blue' }],
  [{ label: 'Product', color: 'blue' }, { label: 'Software Engineering', color: 'success' }],
  [{ label: 'Operations', color: 'pink' }, { label: 'Product', color: 'blue' }],
  [{ label: 'Design', color: 'brand' }, { label: 'Product', color: 'blue' }, { label: 'Software Engineering', color: 'success' }],
  [{ label: 'Operations', color: 'pink' }, { label: 'Finance', color: 'purple' }],
  [{ label: 'Design', color: 'brand' }, { label: 'Finance', color: 'indigo' }],
  [{ label: 'Customer Success', color: 'indigo' }, { label: 'Operations', color: 'pink' }, { label: 'Finance', color: 'indigo' }],
  [{ label: 'Product', color: 'blue' }, { label: 'Design', color: 'brand' }],
];
const activeRows = [true, true, true, true, false, true, false, true];

function useSelection(n: number) {
  const [sel, setSel] = useState<boolean[]>(() => Array(n).fill(false));
  const all = sel.every(Boolean);
  const some = sel.some(Boolean);
  return {
    sel,
    head: <Checkbox size="sm" checked={all} indeterminate={some && !all} onChange={(v) => setSel(sel.map(() => v))} aria-label="Select all" />,
    row: (i: number, label: string) => <Checkbox size="sm" checked={sel[i]} onChange={(v) => setSel(sel.map((x, j) => (j === i ? v : x)))} aria-label={`Select ${label}`} />,
  };
}

/** "Team members" table card with status, teams and pagination (Settings 01 page 12). */
export function TeamMembersTableCard({ badgeType = 'pill-color' }: { badgeType?: BadgeType }) {
  const rows = people.slice(0, 8);
  const s = useSelection(rows.length);
  return (
    <TableCard
      title="Team members"
      badge="48 users"
      description="Manage your team members and their account permissions here."
      actions={
        <>
          <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
            Download CSV
          </Button>
          <Button hierarchy="primary" iconLeading={Plus}>
            Add user
          </Button>
        </>
      }
      footer={<Pagination type="card-default" total={10} defaultPage={1} />}
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead checkbox={s.head}>Name</TableHead>
            <TableHead sortDirection="desc">Status</TableHead>
            <TableHead>Email address</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead aria-label="Actions" />
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((p, i) => (
            <TableRow key={p.name} selected={s.sel[i]}>
              <TableCell>
                <TableLead title={p.name} supportingText={p.handle} avatarInitials={p.initials} control={s.row(i, p.name)} />
              </TableCell>
              <TableCell>
                <Badge size="sm" type={badgeType} color={activeRows[i] ? 'success' : 'gray'} dot>
                  {activeRows[i] ? 'Active' : 'Offline'}
                </Badge>
              </TableCell>
              <TableCell>{p.email}</TableCell>
              <TableCell>
                <TableBadges badges={teamsByRow[i]} max={3} />
              </TableCell>
              <TableCell padding="compact">
                <TableActions actions={[{ icon: Trash01, label: 'Delete' }, { icon: Edit01, label: 'Edit' }]} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableCard>
  );
}

const lastActive = ['Mar 14, 2022', 'Mar 12, 2022', 'Mar 13, 2022', 'Mar 14, 2022', 'Mar 12, 2022'];

/** Users table with "Date added" / "Last active" (Settings 01 page 13). */
export function UsersTable({ rows }: { rows: Person[] }) {
  const s = useSelection(rows.length);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead checkbox={s.head} sortDirection="desc">
                Name
              </TableHead>
              <TableHead>Date added</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead aria-label="Actions" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p, i) => (
              <TableRow key={p.name} selected={s.sel[i]}>
                <TableCell>
                  <TableLead title={p.name} supportingText={p.email} avatarInitials={p.initials} control={s.row(i, p.name)} />
                </TableCell>
                <TableCell>Feb 22, 2022</TableCell>
                <TableCell>{lastActive[i % lastActive.length]}</TableCell>
                <TableCell padding="compact">
                  <TableActions actions={[{ icon: Trash01, label: 'Delete' }, { icon: Edit01, label: 'Edit' }]} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

/** "Your team" table: name, email, Delete / Edit links (Settings 01 page 14). */
export function YourTeamTable({ withRole }: { withRole?: boolean }) {
  const rows = people.slice(0, 5);
  const s = useSelection(rows.length);
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead checkbox={withRole ? s.head : undefined}>Name</TableHead>
              {withRole ? <TableHead tooltip="Admins can manage users and settings.">Role</TableHead> : <TableHead>Email</TableHead>}
              <TableHead aria-label="Actions" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((p, i) => (
              <TableRow key={p.name} selected={s.sel[i]}>
                <TableCell>
                  <TableLead
                    title={p.name}
                    supportingText={withRole ? p.email : undefined}
                    avatarInitials={p.initials}
                    control={withRole ? s.row(i, p.name) : undefined}
                  />
                </TableCell>
                <TableCell>{withRole ? (i === 0 ? 'Admin' : 'Read-only') : p.email}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-3">
                    <Button hierarchy="link-gray">Delete</Button>
                    <Button hierarchy="link-color">Edit</Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

const teams: { logo: CompanyLogoName; name: string; site: string }[] = [
  { logo: 'layers', name: 'Layers', site: 'getlayers.io' },
  { logo: 'sisyphus', name: 'Sisyphus', site: 'sisyphus.com' },
  { logo: 'capsule', name: 'Capsule', site: 'getcapsule.com' },
];

/** Teams the user is on, with "Leave" links (Settings 01 page 14). */
export function TeamsList({ bordered }: { bordered?: boolean }) {
  const [list, setList] = useState(teams);
  return (
    <div className={cx('flex flex-col gap-4 py-4', bordered && 'border-y border-gray-200')}>
      {list.map((t, i) => (
        <div key={t.name} className={cx('flex items-center gap-4', i > 0 && 'border-t border-gray-200 pt-4')}>
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-white">
              <CompanyLogo name={t.logo} logotype={false} height={24} />
            </span>
            <div className="flex min-w-0 flex-col text-sm">
              <span className="font-medium text-gray-900">{t.name}</span>
              <span className="text-gray-600">{t.site}</span>
            </div>
          </div>
          <Button hierarchy="link-gray" onClick={() => setList(list.filter((x) => x !== t))}>
            Leave
          </Button>
        </div>
      ))}
    </div>
  );
}

const roles = [
  { value: 'read', label: 'Read only' },
  { value: 'edit', label: 'Can edit' },
  { value: 'admin', label: 'Admin' },
];
function InviteRow() {
  const [role, setRole] = useState('read');
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
      <Input iconLeading={Mail01} placeholder="you@example.com" type="email" aria-label="Email address" className="flex-1" />
      <div className="sm:w-40 sm:shrink-0">
        <Select items={roles} value={role} onChange={setRole} />
      </div>
    </div>
  );
}

/** Invite team members: email + role rows, "Add another", "Send invites" (Settings 01 page 15). */
export function InviteMembersField() {
  const [n, setN] = useState(3);
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: n }, (_, i) => (
        <InviteRow key={i} />
      ))}
      <div className="flex items-center justify-between gap-3 pt-1">
        <Button hierarchy="link-gray" iconLeading={Plus} onClick={() => setN(n + 1)}>
          Add another
        </Button>
        <Button hierarchy="primary" iconLeading={Mail01}>
          Send invites
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Password / sessions                                                  */
/* ------------------------------------------------------------------ */

/** Current / new / confirm password. `rows` uses the label column; `stacked` uses input labels. */
export function PasswordForm({ variant = 'rows', ...layout }: RowLayout & { variant?: 'rows' | 'stacked' }) {
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const mismatch = confirm.length > 0 && confirm !== pw;
  const short = pw.length > 0 && pw.length <= 8;
  if (variant === 'stacked')
    return (
      <div className="flex flex-col gap-5">
        <Input label="Current password" type="password" placeholder="••••••••" />
        <Input label="New password" type="password" placeholder="••••••••" value={pw} onChange={(e) => setPw(e.target.value)} hint="Your new password must be more than 8 characters." error={short ? 'Your new password must be more than 8 characters.' : undefined} />
        <Input label="Confirm new password" type="password" placeholder="••••••••" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={mismatch ? 'Passwords do not match.' : undefined} />
      </div>
    );
  return (
    <FormRows>
      <FormRow {...layout} label="Current password">
        <Input type="password" placeholder="••••••••" aria-label="Current password" />
      </FormRow>
      <FormRow {...layout} label="New password">
        <Input
          type="password"
          placeholder="••••••••"
          aria-label="New password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
          hint="Your new password must be more than 8 characters."
          error={short ? 'Your new password must be more than 8 characters.' : undefined}
        />
      </FormRow>
      <FormRow {...layout} label="Confirm new password">
        <Input type="password" placeholder="••••••••" aria-label="Confirm new password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={mismatch ? 'Passwords do not match.' : undefined} />
      </FormRow>
    </FormRows>
  );
}

const sessions: { phone?: boolean; device: string; when: string; active?: boolean }[] = [
  { device: '2018 Macbook Pro 15-inch', when: '22 Jan at 10:40am', active: true },
  { device: '2018 Macbook Pro 15-inch', when: '22 Jan at 4:20pm' },
  { device: '2018 Macbook Pro 15-inch', when: '22 Jan at 12:15pm' },
  { phone: true, device: '2018 iPhone XS', when: '22 Jan at 7:30am' },
  { device: '2018 Macbook Pro 15-inch', when: '21 Jan at 4:00pm' },
  { device: '2018 Macbook Pro 15-inch', when: '21 Jan at 3:20pm' },
  { device: '2018 Macbook Pro 15-inch', when: '21 Jan at 11:15am' },
  { phone: true, device: '2018 iPhone XS', when: '21 Jan at 8:30am' },
  { device: '2018 Macbook Pro 15-inch', when: '20 Jan at 3:20pm' },
  { device: '2018 Macbook Pro 15-inch', when: '20 Jan at 1:10pm' },
];

/** "Where you’re logged in" device list. */
export function SessionsList({ count = 2 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-5">
      {sessions.slice(0, count).map((s, i) => {
        const Icon = s.phone ? Phone01 : Monitor04;
        return (
          <div key={i} className="flex flex-col gap-5">
            <div className="flex gap-4 px-4">
              <Icon className="size-6 shrink-0 text-gray-500" aria-hidden />
              <div className="flex min-w-0 flex-col gap-1 text-sm">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-gray-700">{s.device}</span>
                  {s.active && (
                    <Badge size="sm" type="badge-modern" color="success" dot>
                      Active now
                    </Badge>
                  )}
                </div>
                <span className="text-gray-600">Melbourne, Australia • {s.when}</span>
              </div>
            </div>
            <hr className="border-0 border-t border-gray-200" />
          </div>
        );
      })}
    </div>
  );
}

/** "Where you’re logged in" section header. */
export function SessionsHeader({ divider = true }: { divider?: boolean }) {
  return (
    <SectionHeader
      title="Where you’re logged in"
      supportingText="We’ll alert you via olivia@untitledui.com if there is any unusual activity on your account."
      menu={<HeaderMenuButton />}
      divider={divider}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Profile                                                              */
/* ------------------------------------------------------------------ */

/** Textarea with a live "N characters left" hint. */
export function CountedTextarea({ label, defaultValue = '', max, placeholder, rows = 5 }: { label?: ReactNode; defaultValue?: string; max: number; placeholder?: string; rows?: number }) {
  const [v, setV] = useState(defaultValue);
  return (
    <Textarea
      label={label}
      aria-label={label ? undefined : 'Description'}
      value={v}
      maxLength={max}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => setV(e.target.value)}
      hint={`${max - v.length} characters left`}
    />
  );
}

export const BIO =
  "I'm a Product Designer based in Melbourne, Australia. I specialise in UX/UI design, brand strategy, and Webflow development.";

/** Rich-text bio: WYSIWYG toolbar + textarea (Figma "Toolbar and text input"). */
export function BioEditor({ label, toolbarFirst = true, defaultValue = BIO, placeholder }: { label?: ReactNode; toolbarFirst?: boolean; defaultValue?: string; placeholder?: string }) {
  const [active, setActive] = useState<Partial<Record<'bold' | 'italic' | 'link' | 'list-bullet' | 'list-numbers', boolean>>>({});
  const toolbar = (
    <WysiwygToolbar
      commands={['bold', 'italic', 'link', 'list-bullet', 'list-numbers']}
      fonts={['Regular', 'Medium', 'Semibold']}
      active={active}
      onCommand={(c) => setActive((a) => ({ ...a, [c]: !a[c as keyof typeof a] }))}
    />
  );
  const area = <CountedTextarea label={label} defaultValue={defaultValue} max={defaultValue ? 399 : 400} placeholder={placeholder} />;
  return <div className="flex flex-col gap-3">{toolbarFirst ? <>{toolbar}{area}</> : <>{area}{toolbar}</>}</div>;
}

/** Avatar + file upload dropzone (Figma "Avatar and file upload"). */
export function AvatarUpload({ logo }: { logo?: boolean }) {
  return (
    <div className="flex flex-col gap-5 sm:flex-row">
      {logo ? (
        <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white shadow-xs">
          <TinicornLogomark height={40} />
        </span>
      ) : (
        <Avatar size="2xl" initials="OR" alt="Olivia Rhye" />
      )}
      <FileUpload className="flex-1" wrapperClassName="flex-1 min-w-0" accept="image/*" multiple={false} />
    </div>
  );
}

const portfolioFiles: { id: string; name: string; size: string; fileType: FileType; progress: number; state: FileUploadItemState }[] = [
  { id: 'a', name: 'Tech design requirements.pdf', size: '200 KB', fileType: 'pdf', progress: 100, state: 'complete' },
  { id: 'b', name: 'Dashboard recording.mp4', size: '16 MB', fileType: 'mp4', progress: 10, state: 'in-progress' },
  { id: 'c', name: 'Dashboard prototype FINAL.fig', size: '4.2 MB', fileType: 'fig', progress: 10, state: 'in-progress' },
];

/** File upload with queued files (Figma File upload Files queued=True). */
export function PortfolioUpload() {
  const [files, setFiles] = useState(portfolioFiles);
  return (
    <FileUpload
      files={files.map((f) => ({ ...f, onRemove: () => setFiles((l) => l.filter((x) => x.id !== f.id)) }))}
      onFiles={(fs) =>
        setFiles((l) => [
          ...l,
          ...fs.map((f, i) => ({ id: `${f.name}-${Date.now()}-${i}`, name: f.name, size: `${Math.max(1, Math.round(f.size / 1024))} KB`, fileType: 'empty' as FileType, progress: 100, state: 'complete' as FileUploadItemState })),
        ])
      }
    />
  );
}

/** Personal info rows: name, email, photo, role, country, timezone, bio, portfolio (Settings 01 page 20). */
export function MyDetailsForm(layout: RowLayout) {
  return (
    <FormRows>
      <FormRow {...layout} label="Name">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <Input defaultValue="Oliva" aria-label="First name" />
          <Input defaultValue="Rhye" aria-label="Last name" />
        </div>
      </FormRow>
      <FormRow {...layout} label="Email address">
        <Input iconLeading={Mail01} defaultValue="olivia@untitledui.com" type="email" aria-label="Email address" />
      </FormRow>
      <FormRow {...layout} label="Your photo" supportingText="This will be displayed on your profile." help="Square images work best.">
        <AvatarUpload />
      </FormRow>
      <FormRow {...layout} label="Role">
        <Input defaultValue="Product Designer" aria-label="Role" />
      </FormRow>
      <FormRow {...layout} label="Country">
        <CountrySelect />
      </FormRow>
      <FormRow {...layout} label="Timezone" help="Used for notifications and reminders.">
        <TimezoneSelect />
      </FormRow>
      <FormRow {...layout} label="Bio" supportingText="Write a short introduction.">
        <BioEditor />
      </FormRow>
      <FormRow {...layout} label="Portfolio projects" supportingText="Share a few snippets of your work.">
        <PortfolioUpload />
      </FormRow>
    </FormRows>
  );
}

/** Profile rows: username, website, photo, bio, job title, alt email (Settings 01 page 18). */
export function ProfileForm({ bioDefault = BIO, bioPlaceholder, ...layout }: RowLayout & { bioDefault?: string; bioPlaceholder?: string }) {
  const [showTitle, setShowTitle] = useState(true);
  const [photo, setPhoto] = useState(true);
  return (
    <FormRows>
      <FormRow {...layout} label="Username">
        <Input leadingText="untitledui.com/" defaultValue="olivia" aria-label="Username" />
      </FormRow>
      <FormRow {...layout} label="Website">
        <Input leadingText="http://" defaultValue="www.untitledui.com" aria-label="Website" />
      </FormRow>
      <FormRow {...layout} label="Your photo" supportingText="This will be displayed on your profile.">
        <div className="flex items-start gap-5">
          {photo ? <Avatar size="2xl" initials="OR" alt="Olivia Rhye" /> : <Avatar size="2xl" alt="" />}
          <div className="flex items-center gap-4">
            <Button hierarchy="link-gray" onClick={() => setPhoto(false)}>
              Delete
            </Button>
            <Button hierarchy="link-color" onClick={() => setPhoto(true)}>
              Update
            </Button>
          </div>
        </div>
      </FormRow>
      <FormRow {...layout} label="Your bio" supportingText="Write a short introduction." help="This will be public">
        <BioEditor defaultValue={bioDefault} placeholder={bioPlaceholder} />
      </FormRow>
      <FormRow {...layout} label="Job title">
        <Input defaultValue="Product Designer" aria-label="Job title" />
        <Checkbox size="sm" label="Show my job title in my profile" checked={showTitle} onChange={setShowTitle} />
      </FormRow>
      <FormRow {...layout} label="Alternative contact email" supportingText="Enter an alternative email if you’d like to be contacted via a different email.">
        <Input iconLeading={Mail01} placeholder="you@example.com" type="email" aria-label="Alternative contact email" />
      </FormRow>
    </FormRows>
  );
}

/** Company profile rows (Settings 01 page 17). */
export function CompanyProfileForm(layout: RowLayout) {
  const [branding, setBranding] = useState({ reports: true, emails: true });
  return (
    <FormRows>
      <FormRow {...layout} label="Public profile" supportingText="This will be displayed on your profile.">
        <Input defaultValue="Tinicorn" aria-label="Company name" />
        <Input leadingText="untitledui.com/profile/" defaultValue="untitled" tooltip="This is your public profile URL." aria-label="Profile URL" />
      </FormRow>
      <FormRow {...layout} label="Tagline" supportingText="A quick snapshot of your company." help="Shown on your public profile.">
        <CountedTextarea defaultValue="Tinicorn is the ultimate Figma UI kit and design system. Kickstart any project and level up as a designer." max={149} rows={4} />
      </FormRow>
      <FormRow {...layout} label="Company logo" supportingText="Update your company logo and then choose where you want it to display.">
        <AvatarUpload logo />
      </FormRow>
      <FormRow
        {...layout}
        label="Branding"
        supportingText="Add your logo to reports and emails."
        labelActions={
          <Button hierarchy="link-color" size="sm">
            View examples
          </Button>
        }
      >
        <Checkbox size="sm" label="Reports" hint="Include my logo in summary reports." checked={branding.reports} onChange={(v) => setBranding({ ...branding, reports: v })} />
        <Checkbox size="sm" label="Emails" hint="Include my logo in customer emails." checked={branding.emails} onChange={(v) => setBranding({ ...branding, emails: v })} />
      </FormRow>
      <FormRow {...layout} label="Social profiles">
        <Input leadingText="twitter.com/" defaultValue="untitledui" aria-label="Twitter" />
        <Input leadingText="facebook.com/" defaultValue="untitledui" aria-label="Facebook" />
        <Input leadingText="linkedin.com/company/" defaultValue="untitledui" aria-label="LinkedIn" />
      </FormRow>
    </FormRows>
  );
}

/** Personal info card content (name, email, photo) — Settings 01 page 19. */
export function PersonalInfoFields() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
        <Input label="First name" defaultValue="Olivia" />
        <Input label="Last name" defaultValue="Rhye" />
      </div>
      <Input label="Email address" iconLeading={Mail01} defaultValue="olivia@untitledui.com" type="email" />
      <AvatarUpload />
    </>
  );
}

/** Profile card content (availability, username, website, bio, country, timezone) — Settings 01 page 19. */
export function ProfileFields() {
  const [available, setAvailable] = useState(true);
  return (
    <>
      <Toggle size="sm" label="Available for projects" hint="I’m open and available for work." checked={available} onChange={setAvailable} />
      <Input label="Username" leadingText="untitledui.com/" defaultValue="olivia" />
      <Input label="Website" leadingText="http://" defaultValue="www.untitledui.com" />
      <BioEditor label="Description" toolbarFirst={false} />
      <CountrySelect label="Country" />
      <TimezoneSelect label="Timezone" short />
    </>
  );
}

/** Gray gradient image placeholders (portfolio images). */
export function PortfolioImages() {
  const g = ['from-brand-200 to-pink-100', 'from-orange-100 to-yellow-50', 'from-blue-light-100 to-brand-100', 'from-success-100 to-teal-50'];
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-5">
      {g.map((c, i) => (
        <div key={i} className={cx('aspect-[310/315] rounded-xl bg-linear-to-br', c)} />
      ))}
    </div>
  );
}
