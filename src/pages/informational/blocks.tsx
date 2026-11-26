/* Composite sections shared by Informational pages 01 and 02. */
import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Copy01, DownloadCloud02, Edit01, FilterLines, MessageChatCircle, Plus, Share07, UploadCloud02, UserPlus01 } from '../../icons';
import { Button } from '../../components/buttons';
import { Badge } from '../../components/badges';
import { PageHeader, SectionHeader, SectionFooter, CardHeader } from '../../components/headers';
import { Tabs } from '../../components/tabs';
import { CodeSnippet } from '../../components/code-snippet';
import { FileUpload } from '../../components/file-upload';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups';
import { Input } from '../../components/inputs';
import { SearchLg } from '../../icons';
import { SCHEMA_CODE, tabItems, Crumbs } from './parts';
import { SourcesTable, TableFrame, TablePagination, FilesTable, TradesTable, TradeFilters, type RowActions } from './tables';
import type { PaginationType } from '../../components/pagination';

/* ---------------- profile header ---------------- */

export function ProfileHeader({ name, supportingText, centered, className }: { name: string; supportingText: string; centered?: boolean; className?: string }) {
  return (
    <PageHeader
      variant={centered ? 'banner-avatar-centered' : 'banner-avatar'}
      title={name}
      supportingText={supportingText}
      avatarInitials={name
        .split(' ')
        .map((w) => w[0])
        .join('')
        .slice(0, 2)}
      banner={<div className="size-full bg-linear-to-br from-brand-200 via-pink-100 to-orange-100" />}
      actions={
        <>
          <Button hierarchy="secondary-gray">View portfolio</Button>
          <Button iconLeading={Plus}>Follow</Button>
        </>
      }
      divider={false}
      className={className}
    />
  );
}

/* ---------------- sources / debugger split ---------------- */

export function SourcesHeader() {
  return (
    <PageHeader
      breadcrumbs={<Crumbs items={['Dashboard', 'Sources']} />}
      title="Sources"
      actions={
        <>
          <Button hierarchy="secondary-gray" iconLeading={UploadCloud02}>
            Import
          </Button>
          <Button iconLeading={Share07}>Share</Button>
        </>
      }
      tabs={<Tabs type="underline" size="sm" items={tabItems(['Overview', 'Visual tagger', 'Debugger', 'Settings'])} defaultValue="debugger" aria-label="Sources sections" />}
    />
  );
}

export function SourcesSplit({ codeColor = 'primary', codeTheme = 'dark', className }: { codeColor?: 'primary' | 'gray'; codeTheme?: 'dark' | 'light'; className?: string }) {
  return (
    <div className={cx('grid grid-cols-1 lg:grid-cols-2', className)}>
      <section className="flex min-w-0 flex-col gap-6 py-8 lg:border-r lg:border-gray-200">
        <div className="flex flex-col gap-6 px-4 md:px-8">
          <SectionHeader title="Sources" search={<Input iconLeading={SearchLg} placeholder="Search" aria-label="Search sources" />} divider={false} />
          <Tabs type="underline" size="sm" items={tabItems(['Live', 'Pause', 'Violations', 'About the client', 'Notes'])} aria-label="Source filters" />
        </div>
        <div className="md:px-8">
          <TableFrame className="max-md:rounded-none max-md:border-x-0" footer={<TablePagination type="card-minimal-right" />}>
            <SourcesTable />
          </TableFrame>
        </div>
      </section>
      <section className="flex min-w-0 flex-col gap-6 px-4 py-8 md:px-8">
        <SectionHeader
          title="Source deleted"
          actions={
            <Button hierarchy="secondary-gray" size="md">
              View in Schema
            </Button>
          }
          divider={false}
        />
        <Tabs type="underline" size="sm" items={tabItems(['Pretty', 'Raw', 'Violations', 'About the client', 'Notes'])} aria-label="Payload view" />
        <CodeSnippet code={SCHEMA_CODE} color={codeColor} theme={codeTheme} lineNumbers copyable={false} />
        <SectionFooter
          actions={
            <Button hierarchy="secondary-gray" iconLeading={Copy01}>
              Copy
            </Button>
          }
        />
      </section>
    </div>
  );
}

/* ---------------- files and assets ---------------- */

export function FilesHeader({ crumbs, back }: { crumbs?: string[]; back?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      {back}
      <PageHeader
        breadcrumbs={crumbs ? <Crumbs items={crumbs} /> : undefined}
        title="Files and assets"
        supportingText="Documents and attachements that have been uploaded as part of this project."
        actions={
          <>
            <Button hierarchy="secondary-gray" iconLeading={Share07}>
              Share
            </Button>
            <Button iconLeading={UserPlus01}>Invite team</Button>
          </>
        }
        divider={false}
      />
    </div>
  );
}

const QUEUED = [
  { id: 1, name: 'Dashboard prototype.mp4', size: '16 MB', progress: 70, state: 'in-progress' as const },
  { id: 2, name: 'Dashboard prototype FINAL.fig', size: '4.2 MB', progress: 70, state: 'in-progress' as const },
  { id: 3, name: 'Tech design requirements.pdf', size: '200 KB', progress: 100, state: 'complete' as const },
];

export function FilesSection({ queued }: { queued?: boolean }) {
  return (
    <div className="flex flex-col gap-6">
      <FileUpload type={queued ? 'progress-fill' : 'progress-bar'} files={queued ? QUEUED : []} wrapperClassName={queued ? 'lg:max-w-none' : undefined} />
      <TableFrame
        header={<CardHeader title="Attached files" supportingText="Files and assets that have been attached to this project." onMenuClick={() => {}} divider={false} />}
        toolbar={
          <div className="flex flex-col gap-3 border-y border-gray-200 px-4 py-3 md:flex-row md:items-center md:justify-between">
            <ButtonGroup defaultValue="all" className="max-md:hidden">
              <ButtonGroupItem value="shared">Shared files</ButtonGroupItem>
              <ButtonGroupItem value="yours">Your files</ButtonGroupItem>
              <ButtonGroupItem value="all">View all</ButtonGroupItem>
            </ButtonGroup>
            <div className="flex items-center gap-3">
              <Input className="flex-1 md:w-80 md:flex-none" iconLeading={SearchLg} placeholder="Search for trades" aria-label="Search files" />
              <Button hierarchy="secondary-gray" iconLeading={FilterLines}>
                Filters
              </Button>
            </div>
          </div>
        }
      >
        <FilesTable />
      </TableFrame>
    </div>
  );
}

/* ---------------- trade history ---------------- */

export function TradeHeaderActions({ labels = ['Download CSV', 'Add'] }: { labels?: [string, string] | string[] }) {
  return (
    <>
      <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
        {labels[0]}
      </Button>
      <Button iconLeading={Plus}>{labels[1]}</Button>
    </>
  );
}

export function TradeSideGroup() {
  return (
    <ButtonGroup defaultValue="all">
      <ButtonGroupItem value="sell">Sell side</ButtonGroupItem>
      <ButtonGroupItem value="buy">Buy side</ButtonGroupItem>
      <ButtonGroupItem value="all">All trades</ButtonGroupItem>
    </ButtonGroup>
  );
}

export function TradesBlock({ boxed, bordered, cardHeader, rows, actions, pagination }: { boxed?: boolean; bordered?: boolean; cardHeader?: boolean; rows: number; actions: RowActions; pagination: PaginationType }) {
  return (
    <div className="flex flex-col gap-6">
      <TradeFilters boxed={boxed} className={bordered ? 'border border-gray-200' : undefined} />
      <TableFrame
        header={
          cardHeader ? (
            <CardHeader
              title="All trades"
              badge={
                <Badge size="sm" type="pill-color" color="brand">
                  58 trades
                </Badge>
              }
              onMenuClick={() => {}}
            />
          ) : undefined
        }
        footer={<TablePagination type={pagination} />}
      >
        <TradesTable rows={rows} actions={actions} />
      </TableFrame>
    </div>
  );
}

/* ---------------- project page header ---------------- */

export function ProjectActions({ team = true }: { team?: boolean }) {
  return (
    <>
      {team && (
        <Button hierarchy="tertiary-gray" iconLeading={UserPlus01} className="max-md:hidden">
          Add team
        </Button>
      )}
      <Button hierarchy="secondary-gray" iconLeading={Share07}>
        Share
      </Button>
      <Button iconLeading={Edit01}>Edit</Button>
    </>
  );
}

export function MessagesEditActions() {
  return (
    <>
      <Button hierarchy="secondary-gray" iconLeading={MessageChatCircle}>
        Messages
      </Button>
      <Button iconLeading={Edit01}>Edit</Button>
    </>
  );
}
