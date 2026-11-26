/* Figma "❖ Dashboards 02" — 15 desktop frames (header navigation app screens, 1280px container), in Figma order. */
import { Plus, UserPlus01, Users01, Monitor04 } from '../../icons';
import { VerticalTabs } from '../../components/tabs';
import { MetricItem } from '../../components/metrics';
import {
  AcquireUsersCard,
  ActiveUsersCard,
  BalanceHeader,
  Btn,
  ChartMetric,
  Container,
  ContentSection,
  Flush,
  CustomerFilters,
  CustomersOverview,
  CustomerTable,
  FansSection,
  HeaderSection,
  HeaderShell,
  MetricRow,
  MrrSection,
  PageHeader,
  ProfilePanel,
  ProfileViewsChart,
  RecentActivity,
  RecentTransactionsCard,
  SalesChart,
  SalesMain,
  SavingsCards,
  SearchInput,
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
import { BankingBody, CardsReceiptsBody, SalesFilters, SpendingBody, VendorActions } from './Dashboard01Pages';

const { DownloadCloud02, UploadCloud02, RefreshCcw02, CurrencyDollar, Send01 } = icons;

/** 01 — Stats for Olivia Rhye: profile views + fans tables (Header Simple / Default). */
export function Dashboard02Page01() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
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
      <ProfileViewsChart wide />
      <FansSection wide />
    </HeaderShell>
  );
}

/** 02 — Analytics with vertical tabs: metrics, active users map, acquisition (Header Simple / Default). */
export function Dashboard02Page02() {
  return (
    <HeaderShell variant="simple">
      <Container wide>
        <div className="flex gap-8">
          <VerticalTabs
            type="button-gray"
            size="sm"
            className="w-36 shrink-0 max-lg:hidden"
            items={[
              { id: 'overview', label: 'Overview' },
              { id: 'reports', label: 'Reports' },
              { id: 'saved', label: 'Saved reports' },
              { id: 'settings', label: 'Settings' },
            ]}
          />
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <Flush>
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
              <ChartMetric title="Users" value="20.8k" change="12%" text="vs last mth" />
              <ChartMetric title="Sessions" value="26.4k" change="2%" negative text="vs last mth" />
              <ChartMetric title="Session duration" value="3m 52s" change="2%" text="vs last mth" />
            </MetricRow>
            <ActiveUsersCard />
            <AcquireUsersCard />
            </Flush>
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}

/** 03 — Website analytics (Header Simple / Default). */
export function Dashboard02Page03() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
        <PageHeader title="Website analytics" divider={false} search={<SearchInput />} />
      </HeaderSection>
      <WebsiteOverview wide tabsType="underline" />
    </HeaderShell>
  );
}

/** 04 — Your cards column + total balance, savings, recent transactions (Header Simple / Default). */
export function Dashboard02Page04() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
        <PageHeader
          title="Welcome back, Olivia"
          actions={
            <>
              <Btn dot>Messages</Btn>
              <Btn primary icon={RefreshCcw02}>Sync</Btn>
            </>
          }
        />
      </HeaderSection>
      <Container wide>
        <div className="flex flex-col gap-8 lg:flex-row-reverse">
          <div className="flex min-w-0 flex-1 flex-col gap-8">
            <Flush>
            <TotalBalanceCard />
            <SavingsCards />
            <RecentTransactionsCard />
            </Flush>
          </div>
          <YourCardsPanel flush balanceTitle="Balances over time" className="w-full shrink-0 bg-transparent py-0 lg:w-98" />
        </div>
      </Container>
    </HeaderShell>
  );
}

/** 05 — Your cards + receipts (Header Dual-tier open / Brand). */
export function Dashboard02Page05() {
  return (
    <HeaderShell variant="dual-tier" theme="brand" open subExtra="Your cards" subCurrent="Your cards">
      <HeaderSection wide>
        <PageHeader title="Your cards" supportingText="Welcome back, Olivia!" />
      </HeaderSection>
      <CardsReceiptsBody wide middle="salmon-strip-vertical" />
    </HeaderShell>
  );
}

/** 06 — Your cards: transactions, monthly spending, balance + spending charts (Header Simple / Default). */
export function Dashboard02Page06() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
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
      <SpendingBody wide />
    </HeaderShell>
  );
}

/** 07 — Banking dashboard (Header Simple / Default, gray-25 page). */
export function Dashboard02Page07() {
  return (
    <HeaderShell variant="simple" className="bg-gray-25">
      <HeaderSection wide>
        <PageHeader
          title="Banking Dashboard"
          supportingText="Here’s your account details and deposits."
          divider={false}
          actions={
            <>
              <Btn icon={CurrencyDollar}>Deposit</Btn>
              <Btn primary icon={Send01}>Send funds</Btn>
            </>
          }
        />
        <TabsAndFilters periods={['12 months', '30 days', '7 days']} />
      </HeaderSection>
      <BankingBody wide hole={50} />
    </HeaderShell>
  );
}

/** 08 — Balance + transaction history card and profile card side by side (Header Simple / Default, gray-50 page). */
export function Dashboard02Page08() {
  return (
    <HeaderShell variant="simple" className="bg-gray-50">
      <Container wide>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col gap-8 rounded-xl bg-white py-8 shadow-sm">
            <BalanceHeader />
            <Container>
              <YearLine height={216} names={['Balance']} />
            </Container>
            <TransactionHistory withDate={false} />
          </div>
          <div className="w-full shrink-0 overflow-hidden rounded-xl bg-white shadow-sm lg:w-98">
            <ProfilePanel />
          </div>
        </div>
      </Container>
    </HeaderShell>
  );
}

/** 09 — Sales summary with bar chart (Header Dual-tier / Default). */
export function Dashboard02Page09() {
  return (
    <HeaderShell variant="dual-tier">
      <HeaderSection wide>
        <PageHeader title="Welcome back, Olivia" supportingText="Your current sales summary and activity." divider={false} search={<SearchInput />} />
        <TabsAndFilters />
      </HeaderSection>
      <SalesChart wide bars />
      <MetricRow wide>
        <ChartMetric title="Today’s revenue" value="$1,280" change="15%" text="last mth" />
        <ChartMetric title="Today’s orders" value="14" change="10%" negative text="last mth" />
        <ChartMetric title="Avg. order value" value="$91.42" change="20%" text="last mth" />
      </MetricRow>
      <RecentActivity wide />
    </HeaderShell>
  );
}

/** 10 — Sales overview (Header Dual-tier open / Default). */
export function Dashboard02Page10() {
  return (
    <HeaderShell variant="dual-tier" open>
      <HeaderSection wide>
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
      <SalesMain wide />
    </HeaderShell>
  );
}

/** 11 — Vendors: rating line chart, monitored gauge, vendor movements (Header Simple / Default). */
export function Dashboard02Page11() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
        <PageHeader title="Welcome back, Olivia" divider={false} actions={<VendorActions />} />
      </HeaderSection>
      <Container wide>
        <div className="flex flex-col gap-6 lg:flex-row">
          <VendorBreakdownCard line />
          <VendorsMonitoredCard tall />
        </div>
      </Container>
      <Container wide>
        <VendorMovementsCard />
      </Container>
    </HeaderShell>
  );
}

/** 12 — Organization overview with tier radar (Header Simple / Default). */
export function Dashboard02Page12() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
        <PageHeader title="Welcome back, Olivia" divider={false} actions={<VendorActions filters />} />
      </HeaderSection>
      <Container wide>
        <div className="flex flex-col gap-6 lg:flex-row">
          <VendorPieCard radar />
          <VendorRatingCard wide />
        </div>
      </Container>
      <Container wide>
        <VendorSearchTable />
      </Container>
    </HeaderShell>
  );
}

/** 13 — Customers with icon metric cards (Header Dual-tier open / Default). */
export function Dashboard02Page13() {
  return (
    <HeaderShell variant="dual-tier" open>
      <HeaderSection wide>
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
      <MetricRow wide>
        <MetricItem type="chart-02" icon={UserPlus01} title="Total customers" value="2,420" change="40%" onMenuClick={() => {}} className="min-w-0 flex-1" />
        <MetricItem type="chart-02" icon={Users01} title="Members" value="1,210" change="10%" trend="negative" onMenuClick={() => {}} className="min-w-0 flex-1" />
        <MetricItem type="chart-02" icon={Monitor04} title="Active now" value="316" change="20%" onMenuClick={() => {}} className="min-w-0 flex-1" />
      </MetricRow>
      <Container wide className="flex flex-col gap-6">
        <CustomerFilters />
        <CustomerTable />
      </Container>
    </HeaderShell>
  );
}

/** 14 — Customers overview (Header Simple / Default). */
export function Dashboard02Page14() {
  return (
    <HeaderShell variant="simple">
      <HeaderSection wide>
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
      <CustomersOverview wide />
      <Container wide className="flex flex-col gap-6">
        <CustomerFilters />
        <CustomerTable order="about-first" grayHeader pagination="card-minimal-center" />
      </Container>
    </HeaderShell>
  );
}

/** 15 — Members & content dashboard (Header Dual-tier open / Default). */
export function Dashboard02Page15() {
  return (
    <HeaderShell variant="dual-tier" open>
      <HeaderSection wide>
        <PageHeader title="Welcome back, Olivia" divider={false} />
        <TabsAndFilters />
      </HeaderSection>
      <MrrSection wide />
      <ContentSection wide alt />
    </HeaderShell>
  );
}
