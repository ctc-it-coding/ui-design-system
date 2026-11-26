/* Figma "❖ Settings pages 02" — 20 desktop frames (header navigation app screens). */
import { Button } from '../../components/buttons/Button';
import { SectionHeader } from '../../components/headers/SectionHeader';
import { HeaderMenuButton } from '../../components/headers/CardHeader';
import { Tabs } from '../../components/tabs/Tabs';
import { Pagination } from '../../components/pagination/Pagination';
import { Input } from '../../components/inputs/Input';
import { FileUpload } from '../../components/file-upload/FileUpload';
import { Mail01, Plus } from '../../icons';
import {
  FormCard,
  FormRow,
  FormRows,
  PageSection,
  SaveFooter,
  SettingsButtonGroupTabs,
  SettingsPageHeader,
  SettingsShell,
  SettingsTabs,
  SettingsVerticalTabs,
  VerticalTabsLayout,
  type SettingsHeaderNav,
} from './parts';
import {
  AvatarUpload,
  BioEditor,
  BillingHistoryHeader,
  BillingTable,
  CardDetailsForm,
  CompanyProfileForm,
  ConnectedAppsHeader,
  ContactEmailField,
  CountrySelect,
  CurrentPlanCards,
  EmailNotificationsForm,
  IntegrationCardsGrid,
  IntegrationList,
  NotificationChannelsForm,
  NotificationTogglesForm,
  PasswordForm,
  PaymentMethodsField,
  PersonalInfoFields,
  PlanChoiceCards,
  PlanChoiceList,
  PortfolioImages,
  ProfileFields,
  ProfileForm,
  SessionsHeader,
  SessionsList,
  TeamMembersTableCard,
  TeamsList,
  TimezoneSelect,
  UpdateEmailCTA,
  UpdateImageCTA,
  YourTeamTable,
  integrationCards,
} from './blocks';
import { CancelSave, DownloadAll, InviteRows, ProfileBannerHeader, TeamUsersRows } from './Settings01Pages';

const nav = (variant: SettingsHeaderNav['variant'], theme: SettingsHeaderNav['theme'], open = false): SettingsHeaderNav => ({ kind: 'header', variant, theme, open });
const menu = <HeaderMenuButton />;
const manage = 'Manage your team and preferences here.';
const integrationCategories = ['View all', 'Developer tools', 'Communication', 'Productivity', 'Browser tools', 'Marketplace'];

/** Settings 02 · 01 — Integrations with vertical category tabs (Header · Simple). */
export function Settings02Page01() {
  return (
    <SettingsShell nav={nav('simple', 'default')}>
      <PageSection>
        <SettingsPageHeader search />
        <SettingsTabs current="Integrations" />
      </PageSection>
      <PageSection>
        <SectionHeader
          title="Integrations and connected apps"
          supportingText="Supercharge your workflow and connect the tool you use every day."
          actions={
            <Button hierarchy="secondary-gray" iconLeading={Plus}>
              Request integration
            </Button>
          }
          divider={false}
        />
        <VerticalTabsLayout tabs={<SettingsVerticalTabs type="line" labels={integrationCategories} current="View all" badges={{}} />}>
          <IntegrationCardsGrid items={integrationCards} />
          <Pagination type="page-default" total={10} defaultPage={1} />
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 02 — Connected apps (Header · Simple · Brand). */
export function Settings02Page02() {
  return (
    <SettingsShell nav={nav('simple', 'brand')}>
      <PageSection>
        <SettingsPageHeader supportingText="Manage your account settings and preferences here." divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout gap="lg:gap-24" tabs={<SettingsVerticalTabs type="button-gray" current="Integrations" badges={{ Team: 4, Notifications: 2 }} />}>
          <ConnectedAppsHeader />
          <IntegrationList />
          <UpdateImageCTA />
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 03 — Notifications, narrow single column (Header · Dual-tier · open). */
export function Settings02Page03() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', true)} current="Notifications">
      <PageSection narrow>
        <SectionHeader title="Notifications" supportingText="Choose when and how we contact you." menu={menu} divider={false} />
        <Tabs type="underline" size="sm" items={['Email', 'In-app', 'Push'].map((l) => ({ id: l, label: l }))} defaultValue="Email" aria-label="Channel" />
        <EmailNotificationsForm layout="stack" contentWidth="" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 04 — Notification toggles in a gray panel (Header · Dual-tier). */
export function Settings02Page04() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout tabs={<SettingsVerticalTabs type="line" current="Notifications" />}>
          <div className="flex flex-col gap-6 rounded-2xl bg-gray-50 p-4 md:p-8">
            <SectionHeader title="Notification settings" supportingText="We may still send you important notifications about your account outside of your notification settings." />
            <NotificationTogglesForm gap="lg:gap-16" />
            <UpdateEmailCTA />
          </div>
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 05 — Notification channels (Header · Dual-tier · Brand · open). */
export function Settings02Page05() {
  return (
    <SettingsShell nav={nav('dual-tier', 'brand', true)} current="Notifications">
      <PageSection>
        <SettingsPageHeader title="Notifications" supportingText="Select when and how you’ll be notified." divider />
      </PageSection>
      <PageSection>
        <NotificationChannelsForm contentWidth="lg:max-w-none" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 06 — Payment method + billing history with vertical tabs (Header · Dual-tier). */
export function Settings02Page06() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader supportingText={manage} divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout gap="lg:gap-24" tabs={<SettingsVerticalTabs type="button-gray" current="Billing" badges={{ Team: 2, Notifications: 2 }} />}>
          <SectionHeader title="Payment method" supportingText="Update your billing details and address." />
          <FormRow label="Card details" supportingText="Select default payment method." contentWidth="lg:max-w-none">
            <PaymentMethodsField />
          </FormRow>
          <BillingHistoryHeader supportingText="Access all your previous invoices." menu />
          <BillingTable variant="admin" />
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 07 — Contact email, cards, billing history (Header · Dual-tier). */
export function Settings02Page07() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader supportingText={manage} />
        <SettingsButtonGroupTabs current="Billing" />
      </PageSection>
      <PageSection>
        <SectionHeader title="Payment method" supportingText="Update your billing details and address." />
        <FormRows>
          <FormRow label="Contact email" supportingText="Where should invoices be sent?">
            <ContactEmailField />
          </FormRow>
          <FormRow label="Card details" supportingText="Select default payment method.">
            <PaymentMethodsField count={2} />
          </FormRow>
        </FormRows>
      </PageSection>
      <PageSection>
        <BillingHistoryHeader />
        <BillingTable variant="plan-users" badge="pill-outline" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 08 — Card details form with vertical tabs (Header · Dual-tier). */
export function Settings02Page08() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader supportingText={manage} divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout gap="lg:gap-24" tabs={<SettingsVerticalTabs type="button-primary" current="Billing" badges={{ Team: 4, Notifications: 2 }} />}>
          <SectionHeader title="Payment method" supportingText="Update your billing details and address." />
          <CardDetailsForm />
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 09 — Current plan + invoices (Header · Dual-tier). */
export function Settings02Page09() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')} bg="bg-gray-25">
      <PageSection>
        <SettingsPageHeader back="Back to settings" title="Billing" supportingText="Manage your billing and payment details." />
      </PageSection>
      <PageSection>
        <CurrentPlanCards />
      </PageSection>
      <PageSection>
        <SectionHeader title="Billing and invoicing" supportingText="Pick an account plan that fits your workflow." actions={<DownloadAll />} menu={menu} divider={false} />
        <BillingTable variant="files" headerWhite />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 10 — Account plans (Header · Dual-tier · Dark · open). */
export function Settings02Page10() {
  return (
    <SettingsShell nav={nav('dual-tier', 'dark', true)} current="Billing">
      <PageSection>
        <SettingsPageHeader title="Billing" search />
      </PageSection>
      <PageSection>
        <SectionHeader title="Account plans" supportingText="Pick an account plan that fits your workflow." menu={menu} />
        <FormRow label="Current plan" supportingText="We’ll credit your account if you need to downgrade during the billing cycle." contentWidth="lg:max-w-[640px]">
          <PlanChoiceList />
        </FormRow>
      </PageSection>
      <PageSection>
        <SectionHeader title="Billing and invoicing" supportingText="Pick an account plan that fits your workflow." actions={<DownloadAll />} menu={menu} />
        <FormRow label="Billing history" supportingText="Please reach out to our friendly team via billing@untitled.com with questions." contentWidth="lg:max-w-none">
          <BillingTable variant="month" badge="pill-outline" headerWhite />
        </FormRow>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 11 — Plan cards (Header · Dual-tier · Brand · open). */
export function Settings02Page11() {
  return (
    <SettingsShell nav={nav('dual-tier', 'brand', true)} current="Billing" bg="bg-gray-50">
      <PageSection>
        <SettingsPageHeader title="Billing" supportingText="Manage your billing and payment details." />
      </PageSection>
      <PageSection>
        <PlanChoiceCards />
      </PageSection>
      <PageSection>
        <BillingHistoryHeader />
        <BillingTable variant="plan" badge="badge-modern" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 12 — Team members table (Header · Dual-tier). */
export function Settings02Page12() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')} bg="bg-gray-25">
      <PageSection>
        <SettingsPageHeader />
        <SettingsTabs current="Team" badges={{ Team: 48, Notifications: 2 }} />
      </PageSection>
      <PageSection>
        <TeamMembersTableCard badgeType="pill-outline" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 13 — Admin / account users (Header · Simple). */
export function Settings02Page13() {
  return (
    <SettingsShell nav={nav('simple', 'default')}>
      <PageSection>
        <SettingsPageHeader
          breadcrumbs={['Settings', 'Team']}
          title="Team members"
          supportingText="Manage your team members and their account permissions here."
          actions={
            <Button hierarchy="secondary-gray" iconLeading={Plus}>
              Add team member
            </Button>
          }
        />
        <SettingsButtonGroupTabs current="Team" />
      </PageSection>
      <PageSection>
        <TeamUsersRows />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 14 — Teams, narrow column (Header · Dual-tier · Brand · open). */
export function Settings02Page14() {
  return (
    <SettingsShell nav={nav('dual-tier', 'brand', true)} current="Team">
      <PageSection narrow>
        <SectionHeader
          title="Teams"
          supportingText="You’re on the following teams. You can create a new team here."
          actions={<Button hierarchy="primary">Add team member</Button>}
        />
        <FormRows gap="gap-6" dividers={false}>
          <FormRow layout="stack" label="On teams" supportingText="You’re currently on these teams.">
            <TeamsList bordered />
          </FormRow>
          <FormRow layout="stack" label="Your team" supportingText="Manage your existing team and change roles/permissions.">
            <YourTeamTable />
          </FormRow>
        </FormRows>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 15 — Invite team members (Header · Dual-tier · open). */
export function Settings02Page15() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', true)} current="Team">
      <PageSection>
        <SettingsPageHeader title="Team management" supportingText="Manage your team members and their account permissions here." divider />
      </PageSection>
      <PageSection>
        <InviteRows gap="lg:gap-16" contentWidth="lg:max-w-[560px]" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 16 — Password + sessions side by side (Header · Dual-tier). */
export function Settings02Page16() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <VerticalTabsLayout tabs={<SettingsVerticalTabs type="button-gray" current="Password" />}>
          <div className="flex flex-col gap-12 xl:flex-row xl:gap-16">
            <div className="flex min-w-0 flex-col gap-6 xl:flex-[545]">
              <SectionHeader title="Password" supportingText="Please enter your current password to change your password." />
              <PasswordForm variant="stacked" />
              <SaveFooter save="Update password" />
            </div>
            <div className="flex min-w-0 flex-col gap-6 xl:flex-[400]">
              <SessionsHeader />
              <SessionsList count={10} />
            </div>
          </div>
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 17 — Company profile with vertical tabs (Header · Dual-tier). */
export function Settings02Page17() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout gap="lg:gap-24" tabs={<SettingsVerticalTabs type="line" current="Profile" />}>
          <SectionHeader title="Company profile" supportingText="Update your company photo and details here." actions={<CancelSave />} />
          <CompanyProfileForm />
          <SaveFooter />
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 18 — Profile with banner inside the content column (Header · Dual-tier). */
export function Settings02Page18() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default')}>
      <PageSection>
        <SettingsPageHeader search divider />
      </PageSection>
      <PageSection>
        <VerticalTabsLayout gap="lg:gap-24" tabs={<SettingsVerticalTabs type="button-gray" current="Profile" />}>
          <div className="flex flex-col gap-12">
            <div className="overflow-hidden rounded-xl">
              <ProfileBannerHeader title="Profile" supportingText="Update your photo and personal details." actions={<CancelSave />} />
            </div>
            <ProfileForm bioDefault="" bioPlaceholder="Add a short bio..." />
            <SaveFooter />
          </div>
        </VerticalTabsLayout>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 19 — Personal info cards, narrow column (Header · Dual-tier · Brand · open). */
export function Settings02Page19() {
  return (
    <SettingsShell nav={nav('dual-tier', 'brand', true)} current="Profile" bg="bg-gray-50">
      <PageSection narrow>
        <SectionHeader title="Personal info" supportingText="Update your photo and personal details here." menu={menu} divider={false} />
        <FormCard footer={<CancelSave save="Save changes" />}>
          <PersonalInfoFields />
        </FormCard>
      </PageSection>
      <PageSection narrow>
        <SectionHeader title="Personal info" supportingText="Update your photo and personal details here." menu={menu} divider={false} />
        <FormCard footer={<CancelSave save="Save changes" />}>
          <ProfileFields />
        </FormCard>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 02 · 20 — Profile with banner header and stacked form (Header · Dual-tier · open). */
export function Settings02Page20() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', true)} current="Profile" mainClassName="gap-12 pt-0 lg:pt-0">
      <ProfileBannerHeader title="Olivia Rhye" supportingText="@olivia" breadcrumbs={['Settings', 'Profile']} actions={<CancelSave />} />
      <PageSection narrow>
        <FormRows>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
            <Input label="First name" defaultValue="Olivia" />
            <Input label="Last name" defaultValue="Rhye" />
          </div>
          <Input label="Email address" iconLeading={Mail01} defaultValue="olivia@untitledui.com" type="email" className="sm:max-w-[512px]" />
          <AvatarUpload />
          <Input label="Role" defaultValue="Product Designer" className="sm:max-w-[512px]" />
          <div className="sm:max-w-[512px]">
            <CountrySelect label="Country" />
          </div>
          <div className="sm:max-w-[512px]">
            <TimezoneSelect label="Timezone" />
          </div>
          <BioEditor label="Description" toolbarFirst={false} />
          <FormRow layout="stack" label="Portfolio projects" supportingText="Share a few snippets of your work.">
            <PortfolioImages />
            <FileUpload />
          </FormRow>
        </FormRows>
        <SaveFooter />
      </PageSection>
    </SettingsShell>
  );
}
