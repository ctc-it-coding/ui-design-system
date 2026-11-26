import { PageHeader, CardHeader, SectionHeader, SectionLabel, SectionFooter, type PageHeaderStyle } from '../../src/components/headers';
import { Breadcrumbs } from '../../src/components/breadcrumbs';
import { Button } from '../../src/components/buttons';
import { Input } from '../../src/components/inputs';
import { Tabs } from '../../src/components/tabs';
import { ButtonGroup, ButtonGroupItem } from '../../src/components/button-groups/ButtonGroup';
import { Plus, SearchLg, UploadCloud02 } from '../../src/icons';
import { Section, Row } from '../ui';

const crumbs = <Breadcrumbs type="button-gray" divider="chevron" home="#" items={[{ label: 'Settings', href: '#' }, { label: 'Team', href: '#' }]} />;
const actions = (
  <>
    <Button hierarchy="tertiary-gray">Tertiary</Button>
    <Button hierarchy="secondary-color">Secondary</Button>
    <Button hierarchy="secondary-gray">Secondary</Button>
    <Button>Primary</Button>
  </>
);
const search = <Input iconLeading={SearchLg} placeholder="Search" aria-label="Search" />;
const tabsItems = [
  { id: 'all', label: 'View all' },
  { id: 'mon', label: 'Monitored' },
  { id: 'text', label: 'Text' },
  { id: 'sec', label: 'Security', badge: 2 },
];

const styles: PageHeaderStyle[] = ['simple', 'avatar', 'banner-simple', 'banner-simple-centered', 'banner-avatar', 'banner-avatar-centered'];

export default function PageHeadersDemo() {
  return (
    <>
      <Section id="page-headers" title="Page headers" figma="Page header">
        {styles.map((s) => {
          const person = s.includes('avatar');
          return (
            <Row key={s} label={s} className="flex flex-col">
              <PageHeader
                variant={s}
                title={person ? 'Olivia Rhye' : 'Team members'}
                supportingText={person ? 'olivia@untitledui.com' : 'Manage your team members and their account permissions here.'}
                breadcrumbs={crumbs}
                back={{ href: '#' }}
                avatarInitials={person ? 'OR' : undefined}
                actions={actions}
                search={search}
              />
            </Row>
          );
        })}
        <Row label="simple with tabs slot" className="flex flex-col">
          <PageHeader
            title="Settings"
            supportingText="Manage your team and preferences here."
            back={{ href: '#' }}
            actions={<Button iconLeading={Plus}>Add member</Button>}
            tabs={<Tabs type="underline" items={tabsItems} aria-label="Settings" />}
          />
        </Row>
      </Section>

      <Section id="card-headers" title="Card headers" figma="Card header">
        <Row className="flex flex-col gap-6">
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <CardHeader title="Team members" badge="100 users" supportingText="Manage your team members and their account permissions here." actions={actions} onMenuClick={() => {}} />
          </div>
          <div className="overflow-hidden rounded-xl border border-gray-200">
            <CardHeader title="Olivia Rhye" badge="Admin" avatarInitials="OR" supportingText="olivia@untitledui.com" actions={actions} onMenuClick={() => {}} />
          </div>
        </Row>
      </Section>

      <Section id="section-headers" title="Section headers" figma="Section header · Section label · Section footer">
        <Row label="buttons" className="flex flex-col">
          <SectionHeader title="Team members" supportingText="Manage your team members and their account permissions here." actions={actions} onMenuClick={() => {}} />
        </Row>
        <Row label="button group" className="flex flex-col">
          <SectionHeader
            title="Team members"
            supportingText="Manage your team members and their account permissions here."
            actions={
              <ButtonGroup defaultValue="archive">
                <ButtonGroupItem value="archive">Archive</ButtonGroupItem>
                <ButtonGroupItem value="edit">Edit</ButtonGroupItem>
                <ButtonGroupItem value="upload" iconLeading={UploadCloud02}>Upload</ButtonGroupItem>
              </ButtonGroup>
            }
          />
        </Row>
        <Row label="search + tabs" className="flex flex-col">
          <SectionHeader
            title="Team members"
            supportingText="Manage your team members and their account permissions here."
            search={search}
            tabs={<Tabs type="button-white-border" items={tabsItems} aria-label="Filter" />}
          />
        </Row>
        <Row label="section labels (sm / md, help, actions)" className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <SectionLabel title="Team members" supportingText="Manage your team members here." help="Visible to admins" />
          <SectionLabel size="md" title="Team members" supportingText="Manage your team members here." help="Visible to admins" />
          <SectionLabel
            title="Team members"
            supportingText="Manage your team members here."
            actions={
              <>
                <Button hierarchy="link-gray">Tutorial</Button>
                <Button hierarchy="link-color">Docs</Button>
              </>
            }
          />
          <SectionLabel size="md" title="Team members" />
        </Row>
        <Row label="section footer · section (with / without button group)" className="flex flex-col gap-6">
          <SectionFooter
            buttonGroup={
              <ButtonGroup>
                <ButtonGroupItem>Archive</ButtonGroupItem>
                <ButtonGroupItem>Edit</ButtonGroupItem>
                <ButtonGroupItem>Upload</ButtonGroupItem>
              </ButtonGroup>
            }
            link={<Button hierarchy="link-gray">Learn more</Button>}
            actions={
              <>
                <Button hierarchy="tertiary-gray">Tertiary</Button>
                <Button hierarchy="secondary-gray">Secondary</Button>
                <Button>Primary</Button>
              </>
            }
          />
          <SectionFooter link={<Button hierarchy="link-gray">Learn more</Button>} actions={<><Button hierarchy="secondary-gray">Cancel</Button><Button>Save</Button></>} />
        </Row>
        <Row label="section footer · card" className="flex flex-col">
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="h-24" />
            <SectionFooter type="card" link={<Button hierarchy="link-gray">Learn more</Button>} actions={<><Button hierarchy="secondary-gray">Cancel</Button><Button>Save</Button></>} />
          </div>
        </Row>
      </Section>
    </>
  );
}
