/* Figma "❖ Dashboards 01" — 15 desktop frames (sidebar navigation app screens), in Figma order. */
import { ButtonGroup, ButtonGroupItem } from '../../components/button-groups';
import { DateRangePicker } from '../../components/date-picker';
import { Plus } from '../../icons';
import {
  AccountCards,
  AcquireUsersCard,
  ActiveUsersCard,
  BalanceHeader,
  BalanceOverTime,
  BankCardsCard,
  Btn,
  Card,
  CardsSidebar,
  ChartMetric,
  ChatPanel,
  Container,
  ContentSection,
  CustomerFilters,
  CustomersOverview,
  CustomerTable,
  DashBreadcrumbs,
  DepositsCard,
  FansSection,
  HeaderSection,
  MetricRow,
  MonthBars,
  MonthlySpending,
  MoreButton,
  MrrSection,
  PageHeader,
  ProfilePanel,
  ProfileViewsChart,
  ReceiptsSection,
  RecentActivity,
  RecentTransactionsCard,
  SalesChart,
  SalesMain,
  SavingsCards,
  SearchInput,
  SectionHeader,
  SidebarShell,
  SpendingSidebar,
  TabsAndFilters,
  TotalBalanceCard,
  TransactionHistory,
  VendorBreakdownCard,
  VendorMovementsCard,
  VendorPieCard,
  VendorRatingCard,
  VendorsMonitoredCard,
  VendorSearchTable,
  WebsiteOverview,
  YearLine,
  YourCardsPanel,
  icons,
} from './parts';

const { DownloadCloud02, UploadCloud02, RefreshCcw02, Settings03, CurrencyDollar, FilterLines, Send01 } = icons;

/** 01 — Stats for Olivia Rhye: profile views, fans tables, chat side panel (Slim / Default). */
export function Dashboard01Page01() {
  return (
    <SidebarShell variant="slim" sidePanel={<ChatPanel />} sidePanelClassName="bg-gray-50">
      <HeaderSection>
        <PageHeader
          title="Stats for Olivia Rhye"
          actions={
            <>
              <Btn dot>Messages</Btn>
              <Btn primary>Edit</Btn>
            </>
          }
        />
      </HeaderSection>
      <ProfileViewsChart />
      <FansSection />
    </SidebarShell>
  );
}

/** 02 — Welcome back: metrics, active users map, acquisition (Dual-tier / Default, gray-25 main). */
export function Dashboard01Page02() {
  return (
    <SidebarShell variant="dual-tier" featured="progress-bar" mainClassName="bg-gray-25">
      <HeaderSection>
        <PageHeader
          title="Welcome back, Olivia"
          supportingText="Measure your advertising ROI and track and report website traffic."
          divider={false}
          actions={
            <>
              <Btn icon={DownloadCloud02}>Export</Btn>
              <Btn primary>Insights</Btn>
            </>
          }
        />
        <TabsAndFilters current="30 days" />
      </HeaderSection>
      <MetricRow>
        <ChartMetric title="Users" value="20.8k" change="12%" />
        <ChartMetric title="Sessions" value="26.4k" change="2%" negative />
        <ChartMetric title="Session duration" value="3m 52s" change="2%" />
      </MetricRow>
      <ActiveUsersCard />
      <AcquireUsersCard />
    </SidebarShell>
  );
}

/** 03 — Website analytics: large metric tabs, radar, acquisition bars, sessions pie (Slim / Brand). */
export function Dashboard01Page03() {
  return (
    <SidebarShell variant="slim" theme="brand">
      <HeaderSection>
        <PageHeader title="Website analytics" divider={false} search={<SearchInput />} />
      </HeaderSection>
      <WebsiteOverview />
    </SidebarShell>
  );
}

/** 04 — Total balance, savings goals, recent transactions + "Your cards" side panel (Slim / Default). */
export function Dashboard01Page04() {
  return (
    <SidebarShell variant="slim" sidePanel={<YourCardsPanel />} sidePanelMobile>
      <HeaderSection>
        <PageHeader
          title="Welcome back, Olivia"
          divider={false}
          actions={
            <>
              <Btn dot>Messages</Btn>
              <Btn primary icon={RefreshCcw02}>Sync</Btn>
            </>
          }
        />
      </HeaderSection>
      <TotalBalanceCard />
      <SavingsCards />
      <RecentTransactionsCard />
    </SidebarShell>
  );
}

/** Shared body of pages 05 (cards overview + balance + receipts). */
export function CardsReceiptsBody({ wide, middle }: { wide?: boolean; middle?: 'brand-dark' | 'salmon-strip-vertical' }) {
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <CardsSidebar middle={middle} />
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <BalanceOverTime />
          <ReceiptsSection />
        </div>
      </div>
    </Container>
  );
}

/** 05 — Your cards: card stack, card stats, balance chart, receipts upload + table (Dual-tier / Default). */
export function Dashboard01Page05() {
  return (
    <SidebarShell variant="dual-tier" featured="progress-circle">
      <HeaderSection>
        <PageHeader title="Your cards" search={<SearchInput />} />
      </HeaderSection>
      <CardsReceiptsBody />
    </SidebarShell>
  );
}

/** Shared body of pages 06 (spending sidebar + monthly spending / balance / spending charts). */
export function SpendingBody({ wide }: { wide?: boolean }) {
  return (
    <Container wide={wide}>
      <div className="flex flex-col gap-12 lg:flex-row lg:gap-8">
        <SpendingSidebar wideCards={wide} />
        <div className="flex min-w-0 flex-1 flex-col gap-12">
          <MonthlySpending />
          <BalanceOverTime supportingText="" />
          <BalanceOverTime title="Spending over time" supportingText="" bars />
        </div>
      </div>
    </Container>
  );
}

/** 06 — Your cards: recent transactions list, monthly spending gauge, balance + spending charts (Slim / Brand). */
export function Dashboard01Page06() {
  return (
    <SidebarShell variant="slim" theme="brand">
      <HeaderSection>
        <PageHeader
          title="Your cards"
          supportingText="Welcome back, Olivia!"
          actions={
            <>
              <Btn icon={RefreshCcw02}>Sync accounts</Btn>
              <Btn primary icon={Plus}>Add card</Btn>
            </>
          }
        />
      </HeaderSection>
      <SpendingBody />
    </SidebarShell>
  );
}

/** Shared body of pages 07 (account cards, balance bars, your cards, deposits). */
export function BankingBody({ wide, hole }: { wide?: boolean; hole?: 0 | 25 | 50 | 75 }) {
  return (
    <>
      <AccountCards wide={wide} hole={hole} />
      <Container wide={wide}>
        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-6">
            <Card>
              <SectionHeader title="Balance over time" divider={false} onMenuClick={() => {}} />
              <MonthBars height={200} seed={31} />
            </Card>
            <BankCardsCard />
          </div>
          <DepositsCard />
        </div>
      </Container>
    </>
  );
}

/** 07 — Banking dashboard: account balances, balance bars, cards, recent deposits (Dual-tier / Default, gray-25). */
export function Dashboard01Page07() {
  return (
    <SidebarShell variant="dual-tier" featured="progress-bar" mainClassName="bg-gray-25">
      <HeaderSection>
        <PageHeader
          title="Banking Dashboard"
          supportingText="Welcome back, Olivia!"
          divider={false}
          actions={
            <>
              <Btn icon={CurrencyDollar}>Deposit</Btn>
              <Btn primary icon={Send01}>Send funds</Btn>
            </>
          }
        />
        <TabsAndFilters />
      </HeaderSection>
      <BankingBody />
    </SidebarShell>
  );
}

/** 08 — Your balance, balance chart, transaction history + profile/cards/budgets side panel (Slim / Default). */
export function Dashboard01Page08() {
  return (
    <SidebarShell variant="slim" sidePanel={<ProfilePanel />}>
      <BalanceHeader />
      <Container>
        <YearLine height={216} names={['Balance']} />
      </Container>
      <TransactionHistory />
    </SidebarShell>
  );
}

/** 09 — Sales summary: year comparison chart, revenue metrics, two recent-activity feeds (Slim open / Default). */
export function Dashboard01Page09() {
  return (
    <SidebarShell variant="slim" open>
      <HeaderSection>
        <PageHeader
          breadcrumbs={<DashBreadcrumbs items={['Dashboard', 'Overview']} />}
          title="Welcome back, Olivia"
          supportingText="Your current sales summary and activity."
          divider={false}
          search={<SearchInput />}
        />
        <TabsAndFilters />
      </HeaderSection>
      <SalesChart />
      <MetricRow>
        <ChartMetric title="Today’s revenue" value="$1,280" change="15%" text="last mth" />
        <ChartMetric title="Today’s orders" value="14" change="10%" negative text="last mth" />
        <ChartMetric title="Avg. order value" value="$91.42" change="20%" text="last mth" />
      </MetricRow>
      <RecentActivity />
    </SidebarShell>
  );
}

/** Views button group + active date range + filters (pages 10). */
export function SalesFilters() {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <ButtonGroup defaultValue="Saved view" className="max-md:hidden">
        <ButtonGroupItem value="Default">Default</ButtonGroupItem>
        <ButtonGroupItem value="Saved view" dot>
          Saved view
        </ButtonGroupItem>
        <ButtonGroupItem value="SDR view">SDR view</ButtonGroupItem>
        <ButtonGroupItem value="add" iconLeading={Plus} aria-label="Add view" />
      </ButtonGroup>
      <div className="flex items-center gap-3">
        <DateRangePicker align="left" defaultValue={{ start: new Date(2024, 0, 6), end: new Date(2024, 0, 13) }} className="max-md:flex-1" />
        <Btn icon={FilterLines}>Filters</Btn>
      </div>
    </div>
  );
}

/** 10 — Sales overview: simple metrics, sales report + store traffic cards, activity column (Simple / Brand). */
export function Dashboard01Page10() {
  return (
    <SidebarShell variant="simple" theme="brand">
      <HeaderSection>
        <PageHeader
          title="Sales overview"
          supportingText="Your current sales summary and activity."
          divider={false}
          actions={
            <>
              <Btn icon={DownloadCloud02}>Export report</Btn>
              <Btn primary icon={Plus}>Invite</Btn>
            </>
          }
        />
        <SalesFilters />
      </HeaderSection>
      <SalesMain />
    </SidebarShell>
  );
}

/** Header actions used by the vendor pages. */
export function VendorActions({ filters }: { filters?: boolean }) {
  return (
    <>
      <MoreButton />
      {filters && <Btn color icon={FilterLines}>Filters</Btn>}
      <Btn icon={Settings03}>Customize</Btn>
      <Btn icon={DownloadCloud02}>Export</Btn>
    </>
  );
}

/** 11 — Vendor breakdown bars, vendors monitored gauge, vendor movements table (Slim / Default). */
export function Dashboard01Page11() {
  return (
    <SidebarShell variant="slim">
      <HeaderSection>
        <PageHeader title="Welcome back, Olivia" divider={false} actions={<VendorActions />} />
      </HeaderSection>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row">
          <VendorBreakdownCard />
          <VendorsMonitoredCard />
        </div>
      </Container>
      <Container>
        <VendorMovementsCard />
      </Container>
    </SidebarShell>
  );
}

/** 12 — Organization overview: vendor pie, average rating chart, searchable vendor table (Dual-tier / Default). */
export function Dashboard01Page12() {
  return (
    <SidebarShell variant="dual-tier" featured="image">
      <HeaderSection>
        <PageHeader title="Organization overview" divider={false} actions={<VendorActions filters />} />
      </HeaderSection>
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row">
          <VendorPieCard />
          <VendorRatingCard />
        </div>
      </Container>
      <Container>
        <VendorSearchTable />
      </Container>
    </SidebarShell>
  );
}

/** 13 — Customers: metric cards with sparklines, filters, companies table (Dual-tier / Brand). */
export function Dashboard01Page13() {
  return (
    <SidebarShell variant="dual-tier" theme="brand" featured="progress-circle">
      <HeaderSection>
        <PageHeader
          title="Welcome back, Olivia"
          supportingText="Track, manage and forecast your customers and orders."
          divider={false}
          actions={
            <>
              <Btn icon={UploadCloud02}>Import</Btn>
              <Btn primary icon={Plus}>Add</Btn>
            </>
          }
        />
      </HeaderSection>
      <MetricRow>
        <ChartMetric title="Total customers" value="2,420" change="40%" />
        <ChartMetric title="Members" value="1,210" change="10%" negative />
        <ChartMetric title="Active now" value="316" change="20%" />
      </MetricRow>
      <Container className="flex flex-col gap-6">
        <CustomerFilters />
        <CustomerTable />
      </Container>
    </SidebarShell>
  );
}

/** 14 — Customers: active-now gauge, total customers chart, companies table (Slim / Brand). */
export function Dashboard01Page14() {
  return (
    <SidebarShell variant="slim" theme="brand">
      <HeaderSection>
        <PageHeader
          title="Customers"
          divider={false}
          actions={
            <>
              <Btn icon={UploadCloud02}>Import</Btn>
              <Btn primary icon={Plus}>Add customer</Btn>
            </>
          }
        />
      </HeaderSection>
      <CustomersOverview />
      <Container className="flex flex-col gap-6">
        <CustomerFilters />
        <CustomerTable order="about-first" grayHeader pagination="card-minimal-center" />
      </Container>
    </SidebarShell>
  );
}

/** 15 — Dashboard: MRR chart + member stats, content CTAs, recent posts, top members (Dual-tier / Default). */
export function Dashboard01Page15() {
  return (
    <SidebarShell variant="dual-tier" featured="progress-circle">
      <HeaderSection>
        <PageHeader title="Dashboard" divider={false} />
        <TabsAndFilters />
      </HeaderSection>
      <MrrSection />
      <ContentSection />
    </SidebarShell>
  );
}

