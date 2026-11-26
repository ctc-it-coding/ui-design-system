import { Alert, Notification, Toaster, toast, type AlertColor, type NotificationType } from '../../src/components/alerts';
import { Button } from '../../src/components/buttons';
import { Section, Row } from '../ui';

const colors: AlertColor[] = ['default', 'gray', 'brand', 'error', 'warning', 'success'];
const titles: Record<AlertColor, string> = {
  default: 'We’ve just released a new feature',
  gray: 'We’ve just released a new feature',
  brand: 'We’ve just released a new feature',
  error: 'There was a problem with that action',
  warning: 'Just to let you know this might be a problem',
  success: 'Your changes have been saved',
};
const desc = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid pariatur, ipsum similique veniam.';
const noop = () => {};

const notifications: { type: NotificationType; title: string; description: string; secondary?: string; primary: string }[] = [
  { type: 'primary-icon', title: 'We’ve just released a new update!', description: 'Check out the all new dashboard view. Pages and exports now load faster.', secondary: 'Dismiss', primary: 'Changelog' },
  { type: 'gray-icon', title: 'Version 1.4.1 is now available', description: 'Includes the all new dashboard view. Pages and exports will now load faster.', secondary: 'Skip', primary: 'Update now' },
  { type: 'success-icon', title: 'Successfully updated profile', description: 'Your changes have been saved and your profile is live. Your team can make edits.', secondary: 'Dismiss', primary: 'View changes' },
  { type: 'warning-icon', title: 'This project has been unpublished', description: 'Removing all users has unpublished this project. Add users to republish.', primary: 'Add users' },
  { type: 'error-icon', title: 'This project has been unpublished', description: 'Removing all users has unpublished this project. Add users to republish.', primary: 'Add users' },
  { type: 'no-icon', title: 'Updates have been made to your profile', description: 'Your team has made changes to your company profile since you last logged in.', secondary: 'Dismiss', primary: 'View changes' },
];

export default function AlertsDemo() {
  return (
    <Section id="alerts" title="Alerts & notifications" figma="Alerts/Alert · Alerts/Notification">
      <Row label="Floating" className="flex flex-col gap-4">
        {colors.map((c) => (
          <Alert
            key={c}
            color={c}
            title={titles[c]}
            description={desc}
            secondaryAction={{ label: 'Dismiss' }}
            primaryAction={{ label: 'View changes' }}
            onClose={noop}
          />
        ))}
      </Row>
      <Row label="Full-width" className="-mx-6 lg:-mx-10 flex flex-col gap-4 bg-gray-50 py-4">
        {colors.map((c) => (
          <Alert
            key={c}
            size="full-width"
            color={c}
            title={titles[c]}
            description="Lorem ipsum dolor sit amet consectetur."
            secondaryAction={{ label: c === 'default' || c === 'brand' ? 'Dismiss' : 'Dismiss' }}
            primaryAction={{ label: c === 'default' || c === 'brand' ? 'View changes' : 'Details' }}
            onClose={noop}
          />
        ))}
      </Row>
      <Row label="Notifications" className="grid grid-cols-2 items-start gap-6 rounded-xl bg-gray-50 p-6">
        {notifications.map((n) => (
          <Notification
            key={n.type}
            type={n.type}
            title={n.title}
            description={n.description}
            secondaryAction={n.secondary ? { label: n.secondary } : undefined}
            primaryAction={{ label: n.primary }}
            onClose={noop}
          />
        ))}
        <Notification
          type="avatar"
          avatarInitials="KM"
          title="Katherine Moss"
          timestamp="2 mins ago"
          description="I’ve finished adding my notes. Happy for us to review whenever you’re ready!"
          secondaryAction={{ label: 'Dismiss' }}
          primaryAction={{ label: 'Reply' }}
          onClose={noop}
        />
        <Notification
          type="progress-indicator"
          title="Uploading ‘website-FINAL06.fig’"
          description="Please wait while we upload your file."
          progress={60}
          secondaryAction={{ label: 'Cancel' }}
          primaryAction={{ label: 'Upload another' }}
          onClose={noop}
        />
        <Notification
          type="image"
          title="We’ve just released a new update!"
          description="Check out the all new dashboard view. Pages and exports now load faster."
          secondaryAction={{ label: 'Dismiss' }}
          primaryAction={{ label: 'Changelog' }}
          onClose={noop}
        />
      </Row>
      <Row label="Toast helper">
        <Button
          hierarchy="secondary-gray"
          onClick={() =>
            toast({
              type: 'success-icon',
              title: 'Successfully updated profile',
              description: 'Your changes have been saved and your profile is live.',
              primaryAction: { label: 'View changes' },
            })
          }
        >
          Show toast
        </Button>
        <Button hierarchy="tertiary-gray" onClick={() => toast.dismiss()}>
          Dismiss all
        </Button>
        <Toaster position="top-right" />
      </Row>
    </Section>
  );
}
