import { ActivityFeed, FeedItem, type FeedItemProps } from '../../src/components/activity-feed';
import { Row, Section } from '../ui';

const base = { name: 'Olivia Rhye', time: '2 mins ago', avatarInitials: 'OR' };
const msg = '“Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt nunc ipsum tempor purus vitae id. Morbi in vestibulum nec varius.”';

const feed: FeedItemProps[] = [
  { ...base, unread: true, action: 'Added a file to Marketing site redesign', file: { name: 'Tech requirements.pdf', size: '720 KB' } },
  { name: 'Phoenix Baker', avatarInitials: 'PB', time: '5 mins ago', unread: true, action: 'Invited Lana Steiner to the team' },
  { name: 'Lana Steiner', avatarInitials: 'LS', time: '1 hour ago', online: false, action: 'Added 3 labels to the project Marketing site redesign', labels: [{ label: 'Design', color: 'brand' }, { label: 'Product', color: 'blue' }, { label: 'Marketing', color: 'indigo' }] },
  { name: 'Demi Wilkinson', avatarInitials: 'DW', time: '3 hours ago', action: 'Commented in Marketing site redesign', message: msg },
  { name: 'Candice Wu', avatarInitials: 'CW', time: '6 hours ago', online: false, action: 'Invited Natali Craig to the team' },
];

export default function ActivityFeedsDemo() {
  return (
    <Section id="activity-feeds" title="Activity feeds" figma="_Feed item base · Activity feed">
      <Row label="_Feed item base — md / sm, connector off / on" className="flex flex-wrap items-start gap-10">
        {(['md', 'sm'] as const).map((s) => (
          <div key={s} className="flex w-[360px] flex-col gap-6">
            <FeedItem size={s} {...base} unread action="Invited Lana Steiner to the team" />
            <FeedItem size={s} {...base} unread connector action="Invited Lana Steiner to the team" />
            <FeedItem size={s} {...base} unread action="Added a file to Marketing site redesign" file={{ name: 'Tech requirements.pdf', size: '720 KB' }} />
            <FeedItem size={s} {...base} unread action="Commented in Marketing site redesign" message={msg} />
          </div>
        ))}
      </Row>
      <Row label="Activity feed — Divider: line / connector / none" className="flex flex-wrap items-start gap-10">
        <ActivityFeed divider="line" items={feed} className="w-[360px]" />
        <ActivityFeed divider="connector" items={feed} className="w-[360px]" />
        <ActivityFeed divider="none" items={feed} className="w-[360px]" />
      </Row>
    </Section>
  );
}
