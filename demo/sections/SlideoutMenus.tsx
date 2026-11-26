import { useState } from 'react';
import { Avatar } from '../../src/components/avatars';
import { Badge } from '../../src/components/badges';
import { Button } from '../../src/components/buttons';
import { Checkbox } from '../../src/components/checkboxes';
import { Input } from '../../src/components/inputs';
import {
  SlideoutBody,
  SlideoutFooter,
  SlideoutHeader,
  SlideoutMenu,
  SlideoutPanel,
  SlideoutSection,
} from '../../src/components/slideout';
import { Tabs } from '../../src/components/tabs';
import { ArrowRight, Bell01, FilterLines, Link01, SearchLg, Settings01 } from '../../src/icons';
import { Section, Row } from '../ui';

const teams = [
  { label: 'Design', color: 'brand' },
  { label: 'Product', color: 'blue' },
  { label: 'Marketing', color: 'indigo' },
  { label: 'Engineering', color: 'pink' },
  { label: 'Sales', color: 'success' },
] as const;

function Divider() {
  return <hr className="border-gray-200" />;
}

function FiltersContent() {
  return (
    <>
      <SlideoutHeader icon={FilterLines} title="Filters" description="Apply filters to table data." onClose={() => {}} />
      <SlideoutBody>
        <Input size="md" iconLeading={SearchLg} placeholder="Search" aria-label="Search" />
        <SlideoutSection label="Teams">
          <div className="flex flex-col gap-3 px-2">
            {teams.map((t) => (
              <label key={t.label} className="flex items-center gap-2">
                <Checkbox size="sm" aria-label={t.label} />
                <Badge size="md" type="pill-color" color={t.color}>
                  {t.label}
                </Badge>
              </label>
            ))}
          </div>
        </SlideoutSection>
        <SlideoutSection label="Role">
          <div className="flex flex-col gap-3 px-2">
            {['Admin', 'Editor', 'Viewer', 'Billing'].map((r) => (
              <Checkbox key={r} size="sm" label={r} defaultChecked={r === 'Admin'} />
            ))}
          </div>
        </SlideoutSection>
      </SlideoutBody>
      <SlideoutFooter leading={<Button hierarchy="link-color">Reset</Button>}>
        <Button hierarchy="secondary-gray">Cancel</Button>
        <Button>Apply</Button>
      </SlideoutFooter>
    </>
  );
}

function ProjectContent() {
  return (
    <>
      <SlideoutHeader
        icon={Settings01}
        title="Project details"
        description="Manage your project settings."
        onClose={() => {}}
        tabs={
          <Tabs
            type="button-white-border"
            size="sm"
            fullWidth
            defaultValue="details"
            aria-label="Project"
            items={[
              { id: 'details', label: 'Details' },
              { id: 'members', label: 'Members' },
              { id: 'activity', label: 'Activity' },
            ]}
          />
        }
      />
      <SlideoutBody>
        <SlideoutSection label="Share project">
          <div className="-mt-3 flex items-center gap-1.5 text-sm text-gray-600">
            <Link01 className="size-4 text-gray-400" />
            tinicorn.com/project/marketing-site
          </div>
          <div>
            <Button hierarchy="secondary-gray">Copy link</Button>
          </div>
        </SlideoutSection>
        <Input size="md" label="Project name" defaultValue="Marketing site redesign" />
        <SlideoutSection label="Team members" description="The following are working on this project.">
          <div className="flex flex-col">
            {[
              ['OR', 'Olivia Rhye', 'olivia@tinicorn.com'],
              ['PB', 'Phoenix Baker', 'phoenix@tinicorn.com'],
              ['LS', 'Lana Steiner', 'lana@tinicorn.com'],
            ].map(([i, n, e]) => (
              <div key={n} className="flex items-center justify-between border-t border-gray-200 py-3 last:border-b">
                <div className="flex items-center gap-3">
                  <Avatar size="md" initials={i} />
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">{n}</div>
                    <div className="text-gray-600">{e}</div>
                  </div>
                </div>
                <Button size="sm" hierarchy="link-gray" destructive>
                  Remove
                </Button>
              </div>
            ))}
          </div>
          <div>
            <Button hierarchy="link-color" iconTrailing={ArrowRight}>
              Add team member
            </Button>
          </div>
        </SlideoutSection>
      </SlideoutBody>
      <SlideoutFooter leading={<Button hierarchy="link-color">Settings</Button>}>
        <Button hierarchy="secondary-gray">Cancel</Button>
        <Button>Save</Button>
      </SlideoutFooter>
    </>
  );
}

function NotificationsContent() {
  return (
    <>
      <SlideoutHeader icon={Bell01} title="Notification settings" description="Manage your notifications." onClose={() => {}} />
      <SlideoutBody>
        <SlideoutSection label="In-app notifications" description="Select when you’ll be notified in-app.">
          <div className="flex flex-col gap-3 px-2">
            <Checkbox size="sm" defaultChecked label="New comments" hint="Someone comments on your project." />
            <Checkbox size="sm" defaultChecked label="Mentions" hint="Someone mentions you in a comment." />
            <Checkbox size="sm" label="Status changes" hint="A project you follow changes status." />
          </div>
        </SlideoutSection>
        <Divider />
        <SlideoutSection label="Email notifications" description="Select when you’ll be notified by email.">
          <div className="flex flex-col gap-3 px-2">
            <Checkbox size="sm" defaultChecked label="Weekly digest" hint="A summary of activity every Monday." />
            <Checkbox size="sm" label="Product updates" hint="News about features and releases." />
          </div>
        </SlideoutSection>
      </SlideoutBody>
      <SlideoutFooter>
        <Button hierarchy="secondary-gray">Cancel</Button>
        <Button>Save</Button>
      </SlideoutFooter>
    </>
  );
}

export default function SlideoutMenusDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Section id="slideout-menus" title="Slideout menus" figma="Slide out menu · _Slide out menu header">
      <Row label="Inline panels — Filters / Project details (tabs) / Notification settings" className="flex items-start gap-6 overflow-x-auto rounded-xl bg-gray-100 p-6">
        <SlideoutPanel className="h-[860px] shrink-0">
          <FiltersContent />
        </SlideoutPanel>
        <SlideoutPanel className="h-[860px] shrink-0">
          <ProjectContent />
        </SlideoutPanel>
        <SlideoutPanel className="h-[860px] shrink-0">
          <NotificationsContent />
        </SlideoutPanel>
      </Row>
      <Row label="Live drawer">
        <Button onClick={() => setOpen(true)}>Open slideout</Button>
        <SlideoutMenu open={open} onOpenChange={setOpen}>
          <FiltersContent />
        </SlideoutMenu>
      </Row>
    </Section>
  );
}
