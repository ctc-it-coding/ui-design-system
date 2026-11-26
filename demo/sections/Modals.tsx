import { useState } from 'react';
import { Avatar } from '../../src/components/avatars';
import { Button } from '../../src/components/buttons';
import { Checkbox } from '../../src/components/checkboxes';
import { Input } from '../../src/components/inputs';
import {
  ConfirmModal,
  ConfirmModalPanel,
  Modal,
  ModalActions,
  ModalBody,
  ModalHeader,
  ModalPanel,
} from '../../src/components/modals';
import { Copy01, Flag05, UsersPlus } from '../../src/icons';
import { Section, Row } from '../ui';

const desc = 'This blog post has been published. Team members will be able to edit this post and republish changes.';

function AvatarStack() {
  return (
    <div className="flex items-end justify-center -space-x-3">
      <Avatar size="lg" initials="OR" className="ring-2 ring-white" />
      <Avatar size="xl" initials="PB" className="z-10 ring-2 ring-white" />
      <Avatar size="lg" initials="LS" className="ring-2 ring-white" />
    </div>
  );
}

function Stage({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap items-start gap-8 rounded-xl bg-gray-900/70 p-8">{children}</div>;
}

export default function ModalsDemo() {
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <Section id="modals" title="Modals" figma="Modals/Modal · _Modal header · _Modal actions">
      <Row label="Horizontal (544) — default / warning / destructive">
        <Stage>
          <ConfirmModalPanel layout="horizontal" title="Blog post published" description={desc} checkbox={<Checkbox size="sm" label="Don't show again" />} onClose={() => {}} confirmLabel="Confirm" />
          <ConfirmModalPanel layout="horizontal" intent="warning" title="Unsaved changes" description="Do you want to save or discard changes?" checkbox={<Checkbox size="sm" label="Don't show again" />} onClose={() => {}} confirmLabel="Save changes" cancelLabel="Discard" />
          <ConfirmModalPanel layout="horizontal" intent="destructive" title="Delete blog post" description="Are you sure you want to delete this post? This action cannot be undone." checkbox={<Checkbox size="sm" label="Don't show again" />} onClose={() => {}} confirmLabel="Delete" />
        </Stage>
      </Row>
      <Row label="Stacked left aligned (400) — default / warning / destructive">
        <Stage>
          <ConfirmModalPanel title="Blog post published" description={desc} onClose={() => {}} />
          <ConfirmModalPanel intent="warning" title="Unsaved changes" description="Do you want to save or discard changes?" onClose={() => {}} confirmLabel="Save changes" cancelLabel="Discard" />
          <ConfirmModalPanel intent="destructive" title="Delete blog post" description="Are you sure you want to delete this post? This action cannot be undone." onClose={() => {}} confirmLabel="Delete" />
        </Stage>
      </Row>
      <Row label="Composed — team (center aligned), invite link, checkboxes, form">
        <Stage>
          <ModalPanel width="sm" pattern="circles" patternPosition="center">
            <ModalHeader type="center-aligned" media={<AvatarStack />} title="Invite collaborators" description="Your new project has been created. Invite colleagues to collaborate on this project." onClose={() => {}} />
            <ModalActions type="horizontal-fill" confirmLabel="Confirm" onCancel={() => {}} divider />
          </ModalPanel>
          <ModalPanel width="sm" pattern="grid" patternPosition="center">
            <ModalHeader type="center-aligned" icon={UsersPlus} iconColor="brand" title="Share this project" description="Invite colleagues to collaborate on this project." onClose={() => {}} />
            <ModalBody>
              <div className="flex items-end gap-1">
                <div className="flex-1">
                  <Input size="md" label="Share link" readOnly defaultValue="tinicorn.com/project/new" />
                </div>
                <Button hierarchy="tertiary-gray" iconLeading={Copy01} aria-label="Copy link" />
              </div>
            </ModalBody>
            <ModalActions type="horizontal-fill" confirmLabel="Done" onCancel={() => {}} />
          </ModalPanel>
          <ModalPanel width="sm" pattern="circles">
            <ModalHeader icon={Flag05} title="Report project" description="Select the reason for reporting this project." onClose={() => {}} />
            <ModalBody>
              <div className="flex flex-col gap-3">
                <Checkbox size="sm" label="Spam or misleading" />
                <Checkbox size="sm" label="Inappropriate content" defaultChecked />
                <Checkbox size="sm" label="Copyright violation" />
              </div>
            </ModalBody>
            <ModalActions type="horizontal-fill" confirmLabel="Report" onCancel={() => {}} />
          </ModalPanel>
          <ModalPanel width="md">
            <ModalHeader title="Update payment details" description="Update your card details." onClose={() => {}} divider />
            <ModalBody>
              <div className="flex gap-4">
                <div className="flex-1"><Input size="md" label="Name on card" defaultValue="Olivia Rhye" /></div>
                <div className="w-28"><Input size="md" label="Expiry" defaultValue="06 / 2026" /></div>
              </div>
              <div className="flex gap-4">
                <div className="flex-1"><Input size="md" label="Card number" defaultValue="1234 1234 1234 1234" /></div>
                <div className="w-28"><Input size="md" label="CVV" defaultValue="•••" /></div>
              </div>
            </ModalBody>
            <ModalActions type="vertical-fill" confirmLabel="Update" divider onCancel={() => {}} />
          </ModalPanel>
        </Stage>
      </Row>
      <Row label="Live (portal, focus trap, Esc / overlay close)">
        <Button onClick={() => setOpen(true)}>Open modal</Button>
        <Button hierarchy="secondary-gray" destructive onClick={() => setConfirmOpen(true)}>
          Open destructive confirm
        </Button>
        <Modal open={open} onOpenChange={setOpen} width="md" pattern="circles">
          <ModalHeader icon={Flag05} title="Create project" description="Please enter a name for this project." />
          <ModalBody>
            <Input size="md" label="Project name" placeholder="e.g. Website design" data-autofocus />
          </ModalBody>
          <ModalActions confirmLabel="Create project" onConfirm={() => setOpen(false)} />
        </Modal>
        <ConfirmModal
          open={confirmOpen}
          onOpenChange={setConfirmOpen}
          layout="horizontal"
          intent="destructive"
          title="Delete blog post"
          description="Are you sure you want to delete this post? This action cannot be undone."
          confirmLabel="Delete"
          onConfirm={() => setConfirmOpen(false)}
          checkbox={<Checkbox size="sm" label="Don't show again" />}
        />
      </Row>
    </Section>
  );
}
