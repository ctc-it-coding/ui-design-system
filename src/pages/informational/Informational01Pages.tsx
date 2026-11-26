/* Figma "❖ Informational pages 01" — 15 example pages with sidebar navigation. */
import { DownloadCloud02, Edit01, MessageChatCircle, Plus, SearchLg, UploadCloud02 } from '../../icons';
import { Input } from '../../components/inputs';
import { Button } from '../../components/buttons';
import { Badge } from '../../components/badges';
import { PageHeader, SectionHeader, SectionLabel, CardHeader } from '../../components/headers';
import { Tabs } from '../../components/tabs';
import { ContentDivider } from '../../components/content-divider';
import { SidebarShell, Pad, tabItems, Crumbs, BackLink, type SideNavConfig } from './parts';
import {
  AboutMe,
  ChatColumn,
  ChatHeader,
  ChatMessages,
  ContactPanel,
  ConversationList,
  ImageGrid,
  JobGrid,
  JOBS,
  ListingFilters,
  ListingMap,
  ListingResults,
  ListingSortBar,
  MessageInputInline,
  ProfileDetails,
  ProjectArticle,
  RecentActivity,
  conversation,
  type ChatEntry,
} from './content';
import { CustomerFilters, CustomerMetrics, CustomersTable, InvoicesTable, OrderFilters, PagePagination, TableFrame, TablePagination, invoices } from './tables';
import { FilesHeader, FilesSection, MessagesEditActions, ProfileHeader, ProjectActions, SourcesHeader, SourcesSplit, TradeHeaderActions, TradeSideGroup, TradesBlock } from './blocks';

const designers = { current: 'Users', label: 'Designers', sub: ['All designers', 'Popular', 'Recently added', 'Recommended'] };

/* 01 — Designer profile (Slim brand, open) */
export function Informational01Page01() {
  const nav: SideNavConfig = { variant: 'slim', theme: 'brand', ...designers, subCurrent: 1 };
  return (
    <SidebarShell nav={nav}>
      <div className="flex flex-col gap-8 pb-12 md:gap-12">
        <ProfileHeader name="Jaya Willis" supportingText="I'm a Product Designer based in Melbourne." />
        <Pad className="flex flex-col gap-5">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            <ProfileDetails info={{ name: 'Jaya Willis', website: 'jayawillis.com', portfolio: '@jayawillis', email: 'hi@jayawillis.com' }} className="flex flex-col gap-6 lg:w-70 lg:shrink-0" />
            <div className="h-px bg-gray-200 lg:hidden" />
            <div className="flex min-w-0 flex-1 flex-col gap-8">
              <AboutMe titleClassName="text-md lg:text-lg" className="max-w-160" />
              <div className="h-px bg-gray-200 lg:hidden" />
              <JobGrid jobs={[{ ...JOBS[0]!, company: 'Polymath' }, ...JOBS.slice(1)]} className="md:grid-cols-2" />
            </div>
          </div>
          <div className="h-px bg-gray-200 max-lg:hidden" />
          <div className="flex flex-col gap-6 pt-6 lg:flex-row lg:gap-8 lg:pt-0">
            <SectionLabel size="md" title="Projects" supportingText="Some of my recent work." className="lg:w-70 lg:shrink-0" />
            <ImageGrid count={4} className="flex-1 grid-cols-1 md:grid-cols-2" itemClassName="h-60 md:h-64" />
          </div>
        </Pad>
      </div>
    </SidebarShell>
  );
}

/* 02 — Designer profile (Simple, default) */
export function Informational01Page02() {
  return (
    <SidebarShell nav={{ variant: 'simple', ...designers }}>
      <div className="flex flex-col gap-12 pb-12">
        <ProfileHeader name="Amélie Laurent" supportingText="I'm a Product Designer based in Melbourne." />
        <Pad className="flex flex-col gap-6">
          <SectionHeader title="Experience" supportingText="I specialise in UX/UI design, brand strategy, and Webflow development." />
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
            <AboutMe className="min-w-0 flex-1" />
            <ProfileDetails
              info={{ name: 'Amélie Laurent', location: 'Melbourne, AU', website: 'amelielaurent.com', portfolio: '@amelielaurent', email: 'hello@amelie.com' }}
              className="grid h-fit grid-cols-1 gap-6 sm:grid-cols-2 lg:w-100 lg:shrink-0"
              labelClassName="text-md"
            />
          </div>
          <JobGrid
            jobs={[JOBS[0]!, { title: 'Product Designer', company: 'Sisyphus', dates: 'Jan 2018 – May 2020' }, { title: 'UX Designer', company: 'Catalog', dates: 'Mar 2017 – Jan 2018' }]}
            className="md:grid-cols-3"
          />
        </Pad>
        <Pad className="flex flex-col gap-6">
          <SectionHeader
            title="Projects"
            divider={false}
            tabs={<Tabs type="underline" size="sm" items={tabItems(['View all', 'Product design', 'App design', 'Web design', 'UX research'])} aria-label="Project categories" />}
          />
          <ImageGrid count={4} className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" itemClassName="h-46" />
        </Pad>
      </div>
    </SidebarShell>
  );
}

/* 03 — Stays search with map (Slim default) */
export function Informational01Page03() {
  return (
    <SidebarShell nav={{ variant: 'slim', current: 'Home' }} mainClassName="flex">
      <div className="flex min-w-0 flex-1 flex-col gap-6 pt-8 pb-12 md:gap-8 lg:border-r lg:border-gray-200">
        <Pad>
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
        </Pad>
        <Pad className="lg:hidden">
          <ListingMap className="h-90 rounded-lg border border-gray-200" markers={9} />
        </Pad>
        <Pad>
          <ListingFilters />
        </Pad>
        <Pad className="flex flex-col gap-6">
          <ListingSortBar />
          <ListingResults />
          <PagePagination />
        </Pad>
      </div>
      <aside className="sticky top-0 h-screen w-[512px] shrink-0 p-3 max-lg:hidden">
        <ListingMap className="size-full border border-gray-200" />
      </aside>
    </SidebarShell>
  );
}

/* 04 — Sources debugger (Simple default) */
export function Informational01Page04() {
  return (
    <SidebarShell nav={{ variant: 'simple', current: 'Dashboard' }} mainClassName="pt-8 pb-12">
      <Pad>
        <SourcesHeader />
      </Pad>
      <SourcesSplit />
    </SidebarShell>
  );
}

const teamMessages: ChatEntry[] = [
  { name: 'Andi Lane', time: 'Thursday 10:16am', text: 'Just submitted the update to their team. Should be good.' },
  { name: 'Orlando Diggs', time: 'Thursday 10:16am', text: 'Thanks everyone! Almost there.' },
  { name: 'Lana Steiner', time: 'Thursday 11:40am', text: 'Hey team, I’ve finished with the requirements doc!' },
  { name: 'Lana Steiner', time: 'Thursday 11:40am', attachment: { name: 'Tech requirements.pdf', size: '1.2 MB' } },
  { sent: true, name: 'You', time: 'Thursday 11:41am', text: 'Awesome! Thanks.' },
  { name: 'Demi Wilkinson', time: 'Thursday 11:44am', text: 'Good timing — was just looking at this.' },
  { divider: 'Today' },
  { name: 'Phoenix Baker', time: 'Friday 2:20pm', text: 'Hey Olivia, can you please review the latest design when you can?' },
  { sent: true, name: 'You', time: 'Friday 2:20pm', text: 'Sure thing, I’ll have a look today.', reactions: [{ emoji: '❤️' }, { emoji: '👌', count: 1 }] },
  { name: 'Phoenix Baker', writing: true },
];

/* 05 — Project overview + team messages panel (Slim brand) */
export function Informational01Page05() {
  return (
    <SidebarShell nav={{ variant: 'slim', theme: 'brand', current: 'Projects' }} mainClassName="flex max-lg:flex-col">
      <div className="flex min-w-0 flex-1 flex-col gap-8 pt-8 pb-12 lg:border-r lg:border-gray-200">
        <Pad>
          <PageHeader
            title="Marketing site redesign"
            actions={<MessagesEditActions />}
            tabs={<Tabs type="underline" size="sm" items={tabItems(['Overview', 'Project', 'Research', 'Team', 'Messages', 'Activity'])} aria-label="Project sections" />}
          />
        </Pad>
        <Pad className="flex flex-col gap-6">
          <SectionHeader title="Project overview" supportingText="A overview of the project, goals and outcomes." />
          <ProjectArticle blocks={['about', 'images-add', 'callout', 'audience', 'success']} />
          <ContentDivider type="button" icon={Edit01}>
            Edit
          </ContentDivider>
        </Pad>
      </div>
      <aside className="flex flex-col bg-white lg:sticky lg:top-0 lg:h-screen lg:w-108 lg:shrink-0">
        <CardHeader
          title="Messages"
          badge={
            <Badge size="sm" type="pill-outline" color="gray">
              4
            </Badge>
          }
          onMenuClick={() => {}}
        />
        <div className="flex flex-1 flex-col px-4 pt-6 pb-8 md:px-6 lg:min-h-0 lg:overflow-y-auto">
          <ChatMessages entries={teamMessages} narrow className="mt-auto" />
        </div>
        <div className="border-t border-gray-200 px-4 pt-5 pb-6 md:px-6">
          <MessageInputInline />
        </div>
      </aside>
    </SidebarShell>
  );
}

/* 06 — Project overview + recent activity (Slim default) */
export function Informational01Page06() {
  return (
    <SidebarShell nav={{ variant: 'slim', current: 'Projects' }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad>
        <PageHeader
          breadcrumbs={<Crumbs items={['Projects', 'Current', 'Marketing site redesign']} />}
          title="Marketing site redesign"
          actions={<ProjectActions />}
          tabs={<Tabs type="button-white-border" size="sm" items={tabItems(['Overview', 'Project', 'Research', 'Team', 'Messages', 'Activity'])} aria-label="Project sections" />}
        />
      </Pad>
      <Pad className="flex flex-col gap-12 xl:flex-row xl:gap-16">
        <div className="flex min-w-0 flex-1 flex-col gap-8">
          <SectionHeader
            title="Project overview"
            supportingText="A overview of the project, goals and outcomes."
            tabs={<Tabs type="underline" size="sm" items={tabItems(['Project brief', 'Goals', 'Timeline', 'About the client', 'Notes'])} aria-label="Overview sections" />}
            divider={false}
          />
          <ProjectArticle blocks={['callout', 'about-lg', 'images-3', 'audience', 'success']} />
          <ContentDivider type="button" icon={Edit01}>
            Edit
          </ContentDivider>
        </div>
        <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-xs xl:w-106 xl:shrink-0">
          <RecentActivity />
        </aside>
      </Pad>
    </SidebarShell>
  );
}

/* 07 — Conversation + contact panel (Simple brand) */
export function Informational01Page07() {
  return (
    <SidebarShell
      nav={{ variant: 'simple', theme: 'brand', current: 'Projects', sub: ['Current projects', 'Upcoming projects', 'Archive'] }}
      mainClassName="flex max-xl:flex-col lg:h-screen"
    >
      <ChatColumn
        className="flex-1 xl:border-r xl:border-gray-200 lg:min-h-0"
        header={
          <div className="border-b border-gray-200 px-4 pt-5 pb-6 md:px-6">
            <PageHeader
              breadcrumbs={<Crumbs items={['Projects', 'Marketing site', 'Messages']} />}
              back={{ label: 'Back', href: '#' }}
              title="Messages"
              actions={<Button hierarchy="secondary-gray">View project</Button>}
              divider={false}
            />
          </div>
        }
        entries={conversation('Mollie Hall')}
      />
      <ContactPanel name="Mollie Hall" email="mollie@tinicorn.com" className="xl:w-90 xl:shrink-0 xl:overflow-y-auto max-xl:border-t max-xl:border-gray-200" />
    </SidebarShell>
  );
}

/* 08 — Inbox (Simple default) */
export function Informational01Page08() {
  return (
    <SidebarShell
      nav={{ variant: 'simple', current: 'Home', label: 'Messages', icon: MessageChatCircle, sub: ['View all', 'Your team', 'Archived'] }}
      mainClassName="flex max-lg:flex-col lg:h-screen"
    >
      <ConversationList className="border-gray-200 lg:w-90 lg:shrink-0 lg:overflow-y-auto lg:border-r max-lg:hidden" />
      <ChatColumn className="flex-1 lg:min-h-0" header={<ChatHeader name="Katherine Moss" handle="@kathy" />} entries={conversation('Katherine Moss', 'sent-reactions')} />
    </SidebarShell>
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

/* 09 — Customers (Dual-tier brand) */
export function Informational01Page09() {
  return (
    <SidebarShell nav={{ variant: 'dual-tier', theme: 'brand', current: 'Users' }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad>{customersHeader()}</Pad>
      <Pad>
        <CustomerMetrics />
      </Pad>
      <Pad className="flex flex-col gap-6">
        <CustomerFilters />
        <TableFrame footer={<TablePagination type="card-minimal-center" />}>
          <CustomersTable status={false} actions="icons" />
        </TableFrame>
      </Pad>
    </SidebarShell>
  );
}

/* 10 — Customers with icon metrics (Slim default) */
export function Informational01Page10() {
  return (
    <SidebarShell nav={{ variant: 'slim', current: 'Users' }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad>{customersHeader(false)}</Pad>
      <Pad>
        <CustomerMetrics type="icon-03" />
      </Pad>
      <Pad className="flex flex-col gap-6">
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
      </Pad>
    </SidebarShell>
  );
}

/* 11 — Orders and billing (Dual-tier default, open) */
export function Informational01Page11() {
  const orders = invoices(10, '#');
  return (
    <SidebarShell
      nav={{ variant: 'dual-tier', current: 'Dashboard', sub: ['Overview', 'Notifications', 'Analytics', 'Saved reports', 'Orders', 'User reports', 'Manage notifications'], subCurrent: 4 }}
      mainClassName="flex flex-col gap-8 bg-gray-50 pt-8 pb-12"
    >
      <Pad>
        <PageHeader
          title="Orders"
          supportingText="Manage your recent orders and invoices."
          actions={
            <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
              Download all
            </Button>
          }
          divider={false}
        />
      </Pad>
      <Pad className="flex flex-col gap-6">
        <SectionHeader title="Subscription orders" supportingText="Below are your recent orders." search={<SearchBox />} />
        <div className="flex flex-col gap-5 xl:flex-row xl:gap-8">
          <SectionLabel title="Order details" supportingText="Review and manage recent orders." className="xl:w-70 xl:shrink-0" />
          <TableFrame className="min-w-0 flex-1" footer={<TablePagination type="card-minimal-right" />}>
            <InvoicesTable rows={orders} idHeader="Order" columns={['date', 'customer-name']} actions="view" />
          </TableFrame>
        </div>
        <ContentDivider type="button" icon={Plus}>
          Load more
        </ContentDivider>
      </Pad>
      <Pad className="flex flex-col gap-6">
        <SectionHeader title="Billing and invoicing" supportingText="Pick an account plan that fits your workflow." search={<SearchBox />} />
        <div className="flex flex-col gap-5 xl:flex-row xl:gap-8">
          <SectionLabel title="Billing history" supportingText="Please reach out to our friendly team via billing@tinicorn.com with questions." className="xl:w-70 xl:shrink-0" />
          <TableFrame className="min-w-0 flex-1">
            <InvoicesTable columns={['date', 'status']} actions="icons" />
          </TableFrame>
        </div>
      </Pad>
    </SidebarShell>
  );
}

function SearchBox() {
  return <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;
}

/* 12 — Orders (Simple dark) */
export function Informational01Page12() {
  return (
    <SidebarShell nav={{ variant: 'simple', theme: 'dark', current: 'Dashboard' }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad>
        <PageHeader
          breadcrumbs={<Crumbs items={['Dashboard', 'Orders']} />}
          title="Orders"
          actions={
            <>
              <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
                Download PDF
              </Button>
              <Button iconLeading={DownloadCloud02}>Download CSV</Button>
            </>
          }
        />
      </Pad>
      <Pad>
        <OrderFilters boxed />
      </Pad>
      <Pad className="flex flex-col gap-6">
        <TableFrame>
          <InvoicesTable columns={['date', 'status', 'customer', 'purchase']} actions="archive-download" />
        </TableFrame>
        <PagePagination />
      </Pad>
    </SidebarShell>
  );
}

/* 13 — Files and assets (Dual-tier default) */
export function Informational01Page13() {
  return (
    <SidebarShell nav={{ variant: 'dual-tier', current: 'Projects' }} mainClassName="flex flex-col gap-8 bg-gray-25 pt-8 pb-12">
      <Pad>
        <FilesHeader back={<BackLink>Back to all projects</BackLink>} />
      </Pad>
      <Pad>
        <FilesSection />
      </Pad>
    </SidebarShell>
  );
}

const tradeSub = { current: 'Dashboard', sub: ['Overview', 'Trade history', 'Deposits', 'Withdrawals', 'Saved reports'], subCurrent: 1 };

/* 14 — Trade history (Slim brand, open) */
export function Informational01Page14() {
  return (
    <SidebarShell nav={{ variant: 'slim', theme: 'brand', ...tradeSub }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad className="flex flex-col gap-6">
        <PageHeader title="Trade history" supportingText="View your team’s trades and transactions." actions={<TradeHeaderActions />} divider={false} />
        <TradeSideGroup />
      </Pad>
      <Pad>
        <TradesBlock boxed rows={7} actions="view" pagination="card-default" />
      </Pad>
    </SidebarShell>
  );
}

/* 15 — Trade history with card header (Simple default) */
export function Informational01Page15() {
  return (
    <SidebarShell nav={{ variant: 'simple', current: 'Dashboard' }} mainClassName="flex flex-col gap-8 pt-8 pb-12">
      <Pad>
        <PageHeader
          breadcrumbs={<Crumbs items={['Dashboard', 'Trade history']} />}
          title="Trade history"
          supportingText="View your team’s trades and transactions."
          actions={<TradeHeaderActions labels={['Export', 'Add trade']} />}
          tabs={<Tabs type="underline" size="sm" items={tabItems(['All trades', 'Buy', 'Sell'])} aria-label="Trade filters" />}
        />
      </Pad>
      <Pad>
        <TradesBlock cardHeader rows={6} actions="icons" pagination="card-minimal-right" />
      </Pad>
    </SidebarShell>
  );
}
