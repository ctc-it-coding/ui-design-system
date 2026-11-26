/* Figma "❖ Informational pages 02" — 15 example pages with header navigation. */
import { Copy01, DownloadCloud02, MessageChatCircle, Plus, SearchLg, UploadCloud02 } from '../../icons';
import { Button } from '../../components/buttons';
import { Input } from '../../components/inputs';
import { PageHeader, SectionHeader, SectionLabel } from '../../components/headers';
import { Tabs, VerticalTabs } from '../../components/tabs';
import { ContentDivider } from '../../components/content-divider';
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups';
import { SocialIcon } from '../../components/misc-icons';
import { HeaderShell, Wrap, tabItems, Crumbs, BackLink, type HeaderNavConfig } from './parts';
import {
  AboutMe,
  ChatColumn,
  ChatHeader,
  ContactPanel,
  ConversationList,
  CONVERSATIONS,
  ImageGrid,
  JobGrid,
  JOBS,
  ListingFilters,
  ListingMap,
  ListingResults,
  ListingSortBar,
  ProfileDetails,
  ProjectArticle,
  RecentActivity,
  InviteCollaboratorsCard,
  ShareProjectCard,
  SOCIALS,
  conversation,
} from './content';
import { CustomerFilters, CustomerMetrics, CustomersTable, InvoicesTable, OrderFilters, PagePagination, TableFrame, invoices } from './tables';
import { FilesHeader, FilesSection, MessagesEditActions, ProfileHeader, ProjectActions, SourcesHeader, SourcesSplit, TradeHeaderActions, TradeSideGroup, TradesBlock } from './blocks';

const designers: HeaderNavConfig = { current: 'Users', label: 'Designers' };
const divider = <div className="h-px bg-gray-200" />;

/* 01 — Designer profile (banner avatar) */
export function Informational02Page01() {
  return (
    <HeaderShell nav={designers} mainClassName="flex flex-col gap-8 pb-16 md:gap-12 md:pb-24">
      <ProfileHeader name="Riley O’Moore" supportingText="riley@tinicorn.com" />
      <Wrap className="flex flex-col gap-8">
        {divider}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          <SectionLabel size="md" title="About me" className="lg:w-70 lg:shrink-0" />
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <div className="flex flex-col gap-8 md:flex-row md:gap-16">
              <AboutMe title={null} className="max-w-160 flex-1" />
              <div className="flex h-fit items-center gap-4">
                {SOCIALS.map((p) => (
                  <a key={p} href="#" className="rounded-sm outline-none focus-visible:ring-4 focus-visible:ring-gray-400/14">
                    <SocialIcon platform={p} variant="gray" size={20} />
                  </a>
                ))}
              </div>
            </div>
            <ProfileDetails
              info={{ name: 'Riley O’Moore', website: 'rileyomoore.com', portfolio: '@riley', email: 'hello@rileyomoore.com' }}
              className="flex flex-col gap-6 rounded-xl border border-gray-200 bg-gray-50 px-6 py-5 md:flex-row md:flex-wrap md:items-center md:gap-14"
            />
          </div>
        </div>
        {divider}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          <SectionLabel size="md" title="Experience" className="lg:w-70 lg:shrink-0" />
          <JobGrid jobs={[{ ...JOBS[0]!, company: 'Polymath' }, ...JOBS.slice(1)]} className="flex-1 md:grid-cols-2" />
        </div>
        {divider}
        <div className="flex flex-col gap-5 lg:flex-row lg:gap-8">
          <SectionLabel size="md" title="Projects" className="lg:w-70 lg:shrink-0" />
          <ImageGrid count={4} className="flex-1 grid-cols-1 md:grid-cols-2" itemClassName="h-60 md:h-82" />
        </div>
      </Wrap>
    </HeaderShell>
  );
}

/* 02 — Designer profile (banner avatar centered, details sidebar) */
export function Informational02Page02() {
  return (
    <HeaderShell nav={designers} mainClassName="flex flex-col gap-8 pb-16 md:gap-12 md:pb-24">
      <ProfileHeader name="Caitlyn King" supportingText="@caitlyn" centered />
      <Wrap className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <div className="flex flex-col gap-6">
            <SectionHeader title="Experience" supportingText="I specialise in UX/UI design, brand strategy, and Webflow development." />
            <AboutMe className="max-w-160" />
            <JobGrid
              jobs={[JOBS[0]!, { title: 'Product Designer', company: 'Sisyphus', dates: 'Jan 2018 – May 2020' }, { title: 'UX Designer', company: 'Catalog', dates: 'Mar 2017 – Jan 2018' }, { title: 'Visual Designer', company: 'Quotient', dates: 'Apr 2015 – Mar 2017' }]}
              className="md:grid-cols-2"
            />
          </div>
          <div className="flex flex-col gap-8">
            <SectionHeader title="Projects" divider={false} tabs={<Tabs type="underline" size="sm" items={tabItems(['View all', 'Web design', 'Product design', 'Branding'])} aria-label="Project categories" />} />
            <ImageGrid count={4} className="grid-cols-1 md:grid-cols-2" itemClassName="h-60 md:h-74" />
          </div>
        </div>
        <aside className="flex h-fit flex-col gap-6 rounded-xl border border-gray-200 bg-white p-6 lg:w-90 lg:shrink-0">
          <ProfileDetails info={{ name: 'Caitlyn King', website: 'caitlynking.com', portfolio: '@caitlyn', email: 'hi@caitlynking.com' }} className="flex flex-col gap-6" />
          <Input
            defaultValue="tinicorn.com/@caitlyn"
            aria-label="Profile link"
            readOnly
            trailingButton={
              <Button hierarchy="secondary-gray" iconLeading={Copy01}>
                Copy
              </Button>
            }
          />
        </aside>
      </Wrap>
    </HeaderShell>
  );
}

/* 03 — Stays search with map */
export function Informational02Page03() {
  return (
    <HeaderShell nav={{ current: 'Projects' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <PageHeader
          title="232 stays in Melbourne"
          supportingText="Book your next stay at one of our properties."
          actions={
            <>
              <Button hierarchy="secondary-gray">Share</Button>
              <Button>Save search</Button>
            </>
          }
          divider={false}
        />
      </Wrap>
      <Wrap className="flex flex-col gap-6">
        <div className="max-md:order-2">
          <ListingFilters />
        </div>
        <ListingMap className="h-90 rounded-xl border border-gray-200 max-md:order-1" markers={12} />
      </Wrap>
      <Wrap className="flex flex-col gap-6">
        <ListingSortBar />
        <ListingResults />
        <PagePagination />
      </Wrap>
    </HeaderShell>
  );
}

/* 04 — Sources debugger */
export function Informational02Page04() {
  return (
    <HeaderShell nav={{ current: 'Dashboard' }} mainClassName="pb-16 md:pb-24">
      <div className="bg-gray-50 py-8 md:py-12">
        <Wrap>
          <SourcesHeader />
        </Wrap>
      </div>
      <div className="mx-auto w-full max-w-[1280px]">
        <SourcesSplit codeColor="gray" codeTheme="light" />
      </div>
    </HeaderShell>
  );
}

/* 05 — Project overview with share / invite sidebar (Dual-tier, open) */
export function Informational02Page05() {
  return (
    <HeaderShell
      nav={{ variant: 'dual-tier', current: 'Projects', sub: ['Overview', 'Project', 'Research', 'Team', 'Messages', 'Activity'] }}
      mainClassName="flex flex-col gap-8 pb-16 md:pb-24"
    >
      <PageHeader variant="banner-simple" title="Marketing site redesign" actions={<MessagesEditActions />} banner={<div className="size-full bg-linear-to-br from-brand-200 via-pink-100 to-orange-100" />} divider={false} />
      <Wrap className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <VerticalTabs type="button-gray" size="sm" items={tabItems(['Project brief', 'Goals', 'Timeline', 'About the client', 'Notes'])} mobileSelect aria-label="Sections" className="lg:w-34 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <SectionHeader title="Project overview" supportingText="A overview of the project, goals and outcomes." />
          <ProjectArticle blocks={['callout', 'about', 'images-upload', 'audience', 'success']} />
          <ContentDivider type="button" icon={Plus}>
            Add section
          </ContentDivider>
        </div>
        <aside className="flex flex-col gap-5 lg:w-90 lg:shrink-0">
          <ShareProjectCard />
          <InviteCollaboratorsCard />
        </aside>
      </Wrap>
    </HeaderShell>
  );
}

/* 06 — Project overview with activity sidebar */
export function Informational02Page06() {
  return (
    <HeaderShell nav={{ current: 'Projects' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <BackLink>Back to all projects</BackLink>
          <Input
            className="md:w-100"
            defaultValue="app.tinicorn.com/marketing-site"
            aria-label="Project link"
            readOnly
            trailingButton={
              <Button hierarchy="secondary-gray" iconLeading={Copy01}>
                Copy
              </Button>
            }
          />
        </div>
        <PageHeader breadcrumbs={<Crumbs items={['Projects', 'Current', 'Marketing site redesign']} />} title="Marketing site redesign" actions={<ProjectActions />} divider={false} />
      </Wrap>
      <Wrap className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <VerticalTabs type="button-gray" size="sm" items={tabItems(['Overview', 'Project', 'Research', 'Messages', 'Activity'])} mobileSelect aria-label="Project sections" className="lg:w-32 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <SectionHeader
            title="Project overview"
            supportingText="A overview of the project, goals and outcomes."
            tabs={<Tabs type="underline" size="sm" items={tabItems(['Project brief', 'Goals', 'Timeline', 'About the client', 'Notes'])} aria-label="Overview sections" />}
            divider={false}
          />
          <ProjectArticle blocks={['callout-bordered', 'about', 'images-upload', 'audience', 'success']} />
          <ContentDivider type="button" icon={Plus}>
            Add section
          </ContentDivider>
        </div>
        <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6 lg:w-90 lg:shrink-0">
          <RecentActivity />
        </aside>
      </Wrap>
    </HeaderShell>
  );
}

const messagesNav: HeaderNavConfig = { current: 'Home', label: 'Messages', icon: MessageChatCircle };

/* 07 — Conversation card + contact card */
export function Informational02Page07() {
  return (
    <HeaderShell nav={messagesNav} mainClassName="bg-gray-50 py-8 md:pt-12 md:pb-24">
      <Wrap className="flex flex-col gap-8 lg:flex-row">
        <ChatColumn
          scroll={false}
          className="flex-1 overflow-hidden rounded-xl border border-gray-200 shadow-sm"
          header={
            <div className="flex flex-col gap-3 border-b border-gray-200 px-4 pt-6 pb-5 md:px-6">
              <BackLink>All messages</BackLink>
              <SectionHeader title="Conversation with Mollie" divider={false} onMenuClick={() => {}} />
            </div>
          }
          entries={conversation('Joshua Wilson')}
        />
        <ContactPanel name="Joshua Wilson" email="josh@tinicorn.com" nameWeight="font-semibold" badges={false} iconActions={2} className="h-fit overflow-hidden rounded-xl border border-gray-200 shadow-sm lg:w-90 lg:shrink-0" />
      </Wrap>
    </HeaderShell>
  );
}

/* 08 — Inbox card */
export function Informational02Page08() {
  const convs = CONVERSATIONS.map((c, i) => (i === 1 ? { ...c, name: 'Andi Lane', handle: '@andi' } : c));
  return (
    <HeaderShell nav={messagesNav} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <PageHeader title="All messages" divider={false} />
      </Wrap>
      <Wrap>
        <div className="flex overflow-hidden rounded-xl border border-gray-200 shadow-sm">
          <ConversationList conversations={convs} className="w-90 shrink-0 border-r border-gray-200 max-lg:hidden" />
          <ChatColumn scroll={false} className="flex-1" header={<ChatHeader name="Andi Lane" handle="@andi" />} entries={conversation('Andi Lane', 'sent-reactions')} />
        </div>
      </Wrap>
    </HeaderShell>
  );
}

const customersHeader = (actions = true) => (
  <PageHeader
    title="Customers"
    actions={
      actions ? (
        <>
          <Button hierarchy="secondary-gray" iconLeading={UploadCloud02}>
            Import
          </Button>
          <Button iconLeading={Plus}>Add customer</Button>
        </>
      ) : undefined
    }
    tabs={<Tabs type="underline" size="sm" items={tabItems(['Overview', 'Table', 'List view', 'Segment', 'Custom'])} aria-label="Customer views" />}
  />
);

/* 09 — Customers (Dual-tier brand, open) with vertical tabs */
export function Informational02Page09() {
  return (
    <HeaderShell
      nav={{ variant: 'dual-tier', theme: 'brand', current: 'Users', label: 'Customers', sub: ['Overview', 'Customers', 'Segments', 'Reports'], subCurrent: 1 }}
      mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24"
    >
      <Wrap>{customersHeader()}</Wrap>
      <Wrap className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <VerticalTabs type="line" size="sm" items={tabItems(['All customers', 'Current', 'Churned', 'Reports'])} mobileSelect aria-label="Customer segments" className="lg:w-30 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <CustomerMetrics />
          <CustomerFilters color="color" />
          <TableFrame>
            <CustomersTable about={false} actions="icons" />
          </TableFrame>
          <PagePagination type="page-minimal-center" shape="square" />
        </div>
      </Wrap>
    </HeaderShell>
  );
}

/* 10 — Customers with icon metrics */
export function Informational02Page10() {
  return (
    <HeaderShell nav={{ current: 'Users' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>{customersHeader(false)}</Wrap>
      <Wrap>
        <CustomerMetrics type="icon-01" />
      </Wrap>
      <Wrap className="flex flex-col gap-6">
        <SectionHeader
          title="Customers"
          supportingText="Companies that have purchased a subscription."
          actions={
            <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
              Download all
            </Button>
          }
          divider={false}
        />
        <TableFrame toolbar={<OrderFilters customer={false} clear className="p-4 md:p-5" />}>
          <CustomersTable actions="dropdown" striped />
        </TableFrame>
      </Wrap>
    </HeaderShell>
  );
}

const ordersSub: HeaderNavConfig = { variant: 'dual-tier', current: 'Dashboard', sub: ['Overview', 'Orders', 'Notifications', 'Analytics', 'Saved reports'], subCurrent: 1 };

/* 11 — Orders (Dual-tier dark, open) */
export function Informational02Page11() {
  return (
    <HeaderShell nav={{ ...ordersSub, theme: 'dark' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <PageHeader
          title="Orders"
          supportingText="Manage your recent orders and invoices."
          actions={
            <>
              <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
                Download all
              </Button>
              <Button iconLeading={Plus}>New order</Button>
            </>
          }
          divider={false}
        />
      </Wrap>
      <Wrap className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        <SectionLabel title="Order details" supportingText="Review and manage recent orders." className="lg:w-70 lg:shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ButtonGroup defaultValue="all">
              <ButtonGroupItem value="archive">Archive</ButtonGroupItem>
              <ButtonGroupItem value="paid">Paid</ButtonGroupItem>
              <ButtonGroupItem value="all">View all</ButtonGroupItem>
            </ButtonGroup>
            <Input className="md:max-w-100 md:flex-1" iconLeading={SearchLg} placeholder="Search" aria-label="Search orders" />
          </div>
          <TableFrame>
            <InvoicesTable rows={invoices(8)} columns={['status', 'customer', 'progress']} actions="dropdown" />
          </TableFrame>
        </div>
      </Wrap>
    </HeaderShell>
  );
}

/* 12 — Orders with vertical tabs and filters (Dual-tier, closed) */
export function Informational02Page12() {
  return (
    <HeaderShell nav={{ variant: 'dual-tier', current: 'Dashboard' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <PageHeader
          breadcrumbs={<Crumbs items={['Dashboard', 'Tinicorn', 'Orders']} />}
          title="Orders"
          actions={
            <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
              Download all
            </Button>
          }
          divider={false}
        />
      </Wrap>
      <Wrap className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <VerticalTabs
          type="line"
          size="sm"
          items={tabItems(['Overview', 'Notifications', 'Analytics', 'Saved reports', 'Orders', 'User reports', 'Manage notifications'])}
          defaultValue="orders"
          mobileSelect
          aria-label="Dashboard sections"
          className="lg:w-42 lg:shrink-0"
        />
        <div className="flex min-w-0 flex-1 flex-col gap-6">
          <OrderFilters boxed />
          <TableFrame>
            <InvoicesTable columns={['date', 'status', 'customer', 'purchase']} actions="archive-download" />
          </TableFrame>
          <PagePagination shape="square" />
        </div>
      </Wrap>
    </HeaderShell>
  );
}

/* 13 — Files and assets with upload queue */
export function Informational02Page13() {
  return (
    <HeaderShell nav={{ current: 'Projects' }} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <FilesHeader crumbs={['Projects', 'Dashboard UI', 'Files and assets']} />
      </Wrap>
      <Wrap>
        <FilesSection queued />
      </Wrap>
    </HeaderShell>
  );
}

const tradeNav: HeaderNavConfig = { variant: 'dual-tier', current: 'Dashboard', sub: ['Overview', 'Trade history', 'Deposits', 'Withdrawals', 'Saved reports'], subCurrent: 1 };

/* 14 — Trade history (Dual-tier, open) */
export function Informational02Page14() {
  return (
    <HeaderShell nav={tradeNav} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap className="flex flex-col gap-6">
        <PageHeader title="Trade history" supportingText="View your team’s trades and transactions." actions={<TradeHeaderActions />} divider={false} />
        <TradeSideGroup />
      </Wrap>
      <Wrap>
        <TradesBlock boxed bordered rows={6} actions="view" pagination="card-default" />
      </Wrap>
    </HeaderShell>
  );
}

/* 15 — Trade history with card header (Dual-tier, open) */
export function Informational02Page15() {
  return (
    <HeaderShell nav={tradeNav} mainClassName="flex flex-col gap-8 pt-8 pb-16 md:pt-12 md:pb-24">
      <Wrap>
        <PageHeader
          breadcrumbs={<Crumbs items={['Dashboard', 'Trade history']} />}
          title="Trade history"
          supportingText="View your team’s trades and transactions."
          actions={<TradeHeaderActions labels={['Export', 'Add trade']} />}
          tabs={<Tabs type="underline" size="sm" items={tabItems(['All trades', 'Buy', 'Sell'])} aria-label="Trade filters" />}
        />
      </Wrap>
      <Wrap>
        <TradesBlock cardHeader rows={6} actions="icons" pagination="card-minimal-right" />
      </Wrap>
    </HeaderShell>
  );
}
