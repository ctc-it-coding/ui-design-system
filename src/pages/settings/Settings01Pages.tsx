/* Figma "❖ Settings pages 01" — 20 desktop frames (sidebar navigation app screens). */
import { Button } from '../../components/buttons/Button';
import { SectionHeader } from '../../components/headers/SectionHeader';
import { HeaderMenuButton } from '../../components/headers/CardHeader';
import { PageHeader } from '../../components/headers/PageHeader';
import { Tabs } from '../../components/tabs/Tabs';
import { Breadcrumbs } from '../../components/breadcrumbs/Breadcrumbs';
import type { ReactNode } from 'react';
import { DownloadCloud02, Plus, UserPlus01 } from '../../icons';
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
  type SettingsSidebarNav,
} from './parts';
import {
  BillingHistoryHeader,
  BillingTable,
  CardDetailsForm,
  CompanyProfileForm,
  ConnectedAppsHeader,
  ContactEmailField,
  CurrentPlanCards,
  EmailNotificationsForm,
  IntegrationCardsGrid,
  IntegrationList,
  InviteMembersField,
  MyDetailsForm,
  NotificationChannelsForm,
  NotificationTogglesForm,
  PasswordForm,
  PaymentMethodsField,
  PersonalInfoFields,
  PlanChoiceCards,
  PlanChoiceList,
  ProfileFields,
  ProfileForm,
  SessionsHeader,
  SessionsList,
  TeamMembersTableCard,
  TeamsList,
  UpdateImageCTA,
  UsersTable,
  YourTeamTable,
  people,
} from './blocks';

const nav = (variant: SettingsSidebarNav['variant'], theme: SettingsSidebarNav['theme'], open = false, featured?: SettingsSidebarNav['featured']): SettingsSidebarNav => ({
  kind: 'sidebar',
  variant,
  theme,
  open,
  featured,
});

const menu = <HeaderMenuButton />;
const integrationTabs = ['View all', 'Developer tools', 'Communication', 'Productivity', 'Browser tools', 'Marketplace'].map((l) => ({ id: l, label: l }));

/** Banner + avatar page header (Figma "Page header {Style=Banner avatar}"). */
export function ProfileBannerHeader({ title = 'Olivia Rhye', supportingText = 'olivia@untitledui.com', actions, breadcrumbs }: { title?: string; supportingText?: string; actions?: ReactNode; breadcrumbs?: string[] }) {
  return (
    <PageHeader
      variant="banner-avatar"
      title={title}
      supportingText={supportingText}
      avatarInitials="OR"
      banner={<div className="size-full bg-linear-to-br from-brand-200 via-pink-100 to-orange-100" />}
      divider={false}
      breadcrumbs={
        breadcrumbs ? <Breadcrumbs type="button-gray" divider="chevron" home items={breadcrumbs.map((label, i) => ({ label, href: i < breadcrumbs.length - 1 ? '#' : undefined }))} /> : undefined
      }
      actions={
        actions ?? (
          <>
            <Button hierarchy="secondary-gray" iconLeading={UserPlus01}>
              Share
            </Button>
            <Button hierarchy="primary">View profile</Button>
          </>
        )
      }
    />
  );
}

/** Settings 01 · 01 — Integrations cards (Slim · Brand). */
export function Settings01Page01() {
  return (
    <SettingsShell nav={nav('slim', 'brand')} bg="bg-gray-50">
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
          menu={menu}
          divider={false}
        />
        <Tabs type="underline" size="sm" items={integrationTabs} defaultValue="View all" mobileSelect aria-label="Integration categories" listClassName="overflow-x-auto" />
        <IntegrationCardsGrid />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 02 — Connected apps list + update CTA (Simple · Default). */
export function Settings01Page02() {
  return (
    <SettingsShell nav={nav('simple', 'default', false, 'progress-circle')} bg="bg-gray-25">
      <PageSection>
        <SettingsPageHeader />
        <SettingsTabs current="Integrations" />
      </PageSection>
      <PageSection>
        <UpdateImageCTA />
      </PageSection>
      <PageSection>
        <ConnectedAppsHeader />
        <IntegrationList />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 03 — Email notifications (Slim · Default · open). */
export function Settings01Page03() {
  return (
    <SettingsShell nav={nav('slim', 'default', true)} current="Notifications" bg="bg-gray-50">
      <PageSection>
        <SettingsPageHeader />
      </PageSection>
      <PageSection>
        <SectionHeader
          title="Email notifications"
          supportingText="Get emails to find out what’s going on when you’re not online. You can turn them off anytime."
          menu={menu}
        />
        <EmailNotificationsForm gap="lg:gap-16" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 04 — Notification toggles (Simple · Default). */
export function Settings01Page04() {
  return (
    <SettingsShell nav={nav('simple', 'default', false, 'progress-circle')}>
      <PageSection>
        <SettingsPageHeader back="Back to dashboard" />
        <SettingsTabs type="button-gray" current="Notifications" badges={{ Team: 4 }} />
      </PageSection>
      <PageSection>
        <SectionHeader title="Notification settings" supportingText="We may still send you important notifications about your account outside of your notification settings." />
        <NotificationTogglesForm gap="lg:gap-16" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 05 — Notification channels (Dual-tier · Brand · open). */
export function Settings01Page05() {
  return (
    <SettingsShell nav={nav('dual-tier', 'brand', true)} current="Notifications">
      <PageSection>
        <SettingsPageHeader title="Notifications" supportingText="Select when and how you’ll be notified." divider />
      </PageSection>
      <PageSection>
        <NotificationChannelsForm />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 06 — Payment method + billing history (Slim · Default). */
export function Settings01Page06() {
  return (
    <SettingsShell nav={nav('slim', 'default')} bg="bg-gray-25">
      <PageSection>
        <SettingsPageHeader supportingText="Manage your team and preferences here." />
        <SettingsTabs current="Billing" />
      </PageSection>
      <PageSection>
        <SectionHeader title="Payment method" supportingText="Update your billing details and address." />
        <FormRow label="Card details" supportingText="Select default payment method." contentWidth="lg:max-w-[640px]">
          <PaymentMethodsField />
        </FormRow>
      </PageSection>
      <PageSection>
        <BillingHistoryHeader supportingText="Access all your previous invoices." menu />
        <BillingTable variant="admin" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 07 — Contact email, cards, billing history (Dual-tier · Default). */
export function Settings01Page07() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', false, 'image')}>
      <PageSection>
        <SettingsPageHeader supportingText="Manage your team and preferences here." />
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

/** Settings 01 · 08 — Card details form (Dual-tier · Dark). */
export function Settings01Page08() {
  return (
    <SettingsShell nav={nav('dual-tier', 'dark', false, 'progress-circle')}>
      <PageSection>
        <SettingsPageHeader supportingText="Manage your team and preferences here." />
        <SettingsButtonGroupTabs current="Billing" />
      </PageSection>
      <PageSection>
        <SectionHeader title="Payment method" supportingText="Update your billing details and address." />
        <CardDetailsForm />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 09 — Current plan, payment method, invoices (Simple · Default). */
export function Settings01Page09() {
  return (
    <SettingsShell nav={nav('simple', 'default', false, 'image')} bg="bg-gray-50">
      <PageSection>
        <SettingsPageHeader back="Back to settings" title="Billing" supportingText="Manage your billing and payment details." divider />
      </PageSection>
      <PageSection>
        <CurrentPlanCards />
      </PageSection>
      <PageSection>
        <SectionHeader
          title="Billing and invoicing"
          supportingText="Pick an account plan that fits your workflow."
          actions={<DownloadAll />}
          menu={menu}
          divider={false}
        />
        <BillingTable variant="files" headerWhite />
      </PageSection>
    </SettingsShell>
  );
}

export function DownloadAll() {
  return (
    <Button hierarchy="secondary-gray" iconLeading={DownloadCloud02}>
      Download all
    </Button>
  );
}

/** Settings 01 · 10 — Account plans + billing history (Slim · Brand · open). */
export function Settings01Page10() {
  return (
    <SettingsShell nav={nav('slim', 'brand', true)} current="Billing" bg="bg-gray-50">
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
        <SectionHeader title="Billing and invoicing" supportingText="Pick an account plan that fits your workflow." actions={<DownloadAll />} />
        <FormRow label="Billing history" supportingText="Please reach out to our friendly team via billing@untitled.com with questions." contentWidth="lg:max-w-none">
          <BillingTable variant="month" badge="pill-outline" headerWhite />
        </FormRow>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 11 — Plan cards + billing history (Dual-tier · Default · open). */
export function Settings01Page11() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', true, 'progress-circle')} current="Billing">
      <PageSection>
        <SettingsPageHeader title="Billing" supportingText="Manage your billing and payment details." />
      </PageSection>
      <PageSection>
        <PlanChoiceCards />
      </PageSection>
      <PageSection>
        <BillingHistoryHeader />
        <BillingTable variant="plan" />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 12 — Team members table (Simple · Default). */
export function Settings01Page12() {
  return (
    <SettingsShell nav={nav('simple', 'default', false, 'image')} bg="bg-gray-25">
      <PageSection>
        <SettingsPageHeader />
        <SettingsTabs type="button-gray" current="Team" badges={{ Team: 48, Notifications: 2 }} />
      </PageSection>
      <PageSection>
        <TeamMembersTableCard />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 13 — Admin / account users (Slim · Default · open). */
export function Settings01Page13() {
  return (
    <SettingsShell nav={nav('slim', 'default', true)} current="Team">
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
          divider
        />
      </PageSection>
      <PageSection>
        <TeamUsersRows />
      </PageSection>
    </SettingsShell>
  );
}

export function TeamUsersRows({ contentWidth = 'lg:max-w-none' }: { contentWidth?: string }) {
  return (
    <FormRows>
      <FormRow label="Admin users" supportingText="Admins can add and remove users and manage organization-level settings." contentWidth={contentWidth}>
        <UsersTable rows={people.slice(0, 5)} />
      </FormRow>
      <FormRow label="Account users" supportingText="Account users can assess and review risks, questionnaires, data leaks and identify breaches." contentWidth={contentWidth}>
        <UsersTable rows={people.slice(5, 10)} />
      </FormRow>
    </FormRows>
  );
}

/** Settings 01 · 14 — Teams + your team (Slim · Brand · open). */
export function Settings01Page14() {
  return (
    <SettingsShell nav={nav('slim', 'brand', true)} current="Team">
      <PageSection>
        <SettingsPageHeader title="Team management" supportingText="Manage your teams and user permissions." divider />
      </PageSection>
      <PageSection>
        <SectionHeader
          title="Teams"
          supportingText="You’re on the following teams. You can create a new team here."
          actions={
            <>
              <Button hierarchy="secondary-gray">Create new team</Button>
              <Button hierarchy="primary">Add team member</Button>
            </>
          }
          menu={menu}
        />
        <FormRows>
          <FormRow label="On teams" supportingText="You’re currently on these teams." contentWidth="lg:max-w-none">
            <TeamsList />
          </FormRow>
          <FormRow label="Your team" supportingText="Manage your existing team and change roles/permissions." contentWidth="lg:max-w-none">
            <YourTeamTable />
          </FormRow>
        </FormRows>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 15 — Invite team members (Slim · Default · open). */
export function Settings01Page15() {
  return (
    <SettingsShell nav={nav('slim', 'default', true)} current="Team">
      <PageSection>
        <SettingsPageHeader
          breadcrumbs={['Settings', 'Team']}
          title="Team management"
          supportingText="Manage your team members and their account permissions here."
          divider
        />
      </PageSection>
      <PageSection>
        <InviteRows />
      </PageSection>
    </SettingsShell>
  );
}

export function InviteRows({ gap, contentWidth = 'lg:max-w-none' }: { gap?: string; contentWidth?: string }) {
  return (
    <FormRows gap="gap-6">
      <FormRow
        label="Invite team members"
        supportingText="Get your projects up and running faster by inviting your team to collaborate."
        help="Invited members get an email with a link to join."
        gap={gap}
        contentWidth={contentWidth}
      >
        <InviteMembersField />
      </FormRow>
      <FormRow label="Team members" supportingText="Manage your existing team and change roles/permissions." gap={gap} contentWidth="lg:max-w-none">
        <YourTeamTable withRole />
      </FormRow>
    </FormRows>
  );
}

/** Settings 01 · 16 — Password + sessions with profile banner (Simple · Default). */
export function Settings01Page16() {
  return (
    <SettingsShell nav={nav('simple', 'default')} mainClassName="gap-12 pt-0 lg:pt-0">
      <ProfileBannerHeader />
      <PageSection>
        <SettingsTabs current="Profile" badges={{ Team: 4, Notifications: 2 }} />
        <SectionHeader title="Password" supportingText="Please enter your current password to change your password." />
        <PasswordForm />
        <SaveFooter save="Update password" />
      </PageSection>
      <PageSection>
        <SessionsHeader />
        <SessionsList count={2} />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 17 — Company profile (Dual-tier · Default). */
export function Settings01Page17() {
  return (
    <SettingsShell nav={nav('dual-tier', 'default', false, 'image')}>
      <PageSection>
        <SettingsPageHeader />
        <SettingsButtonGroupTabs current="Profile" />
      </PageSection>
      <PageSection>
        <SectionHeader title="Company profile" supportingText="Update your company photo and details here." actions={<CancelSave />} />
        <CompanyProfileForm />
        <SaveFooter />
      </PageSection>
    </SettingsShell>
  );
}

export function CancelSave({ save = 'Save' }: { save?: string }) {
  return (
    <>
      <Button hierarchy="secondary-gray">Cancel</Button>
      <Button hierarchy="primary">{save}</Button>
    </>
  );
}

/** Settings 01 · 18 — Profile form (Simple · Brand). */
export function Settings01Page18() {
  return (
    <SettingsShell nav={nav('simple', 'brand', false, 'progress-circle')}>
      <PageSection>
        <SettingsPageHeader search />
        <SettingsTabs type="button-white-border" current="Profile" />
      </PageSection>
      <PageSection>
        <SectionHeader title="Profile" supportingText="Update your photo and personal details here." menu={menu} />
        <ProfileForm />
        <SaveFooter />
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 19 — Personal info + profile cards with banner (Slim · Default · open). */
export function Settings01Page19() {
  return (
    <SettingsShell nav={nav('slim', 'default', true)} current="Profile" bg="bg-gray-25" mainClassName="gap-12 pt-0 lg:pt-0">
      <ProfileBannerHeader />
      <PageSection>
        <FormRows>
          <FormRow label="Personal info" supportingText="Update your photo and personal details." contentWidth="lg:max-w-none">
            <FormCard footer={<CancelSave save="Save changes" />}>
              <PersonalInfoFields />
            </FormCard>
          </FormRow>
          <FormRow label="Profile" supportingText="Update your portfolio and bio." contentWidth="lg:max-w-none">
            <FormCard footer={<CancelSave save="Save changes" />}>
              <ProfileFields />
            </FormCard>
          </FormRow>
        </FormRows>
      </PageSection>
    </SettingsShell>
  );
}

/** Settings 01 · 20 — My details (Simple · Default). */
export function Settings01Page20() {
  return (
    <SettingsShell nav={nav('simple', 'default', false, 'progress-bar')}>
      <PageSection>
        <SettingsPageHeader search />
        <SettingsTabs current="My details" badges={{ Team: 4, Billing: 2, Notifications: 2 }} />
      </PageSection>
      <PageSection>
        <SectionHeader title="Personal info" supportingText="Update your photo and personal details here." actions={<CancelSave />} />
        <MyDetailsForm />
        <SaveFooter />
      </PageSection>
    </SettingsShell>
  );
}
