import { Message, MessageReaction } from '../../src/components/messaging';
import { Row, Section } from '../ui';

const reactions = [{ emoji: '❤️' }, { emoji: '❤️', count: 2 }];
const pb = { name: 'Phoenix Baker', time: 'Friday 2:20pm', avatarInitials: 'PB' };
const me = { type: 'sent' as const, name: 'You', time: 'Friday 2:20pm' };

export default function MessagingDemo() {
  return (
    <Section id="messaging" title="Messaging" figma="Message · _Message reaction">
      <Row label="Received · Sent (text, reactions, attachment, writing)" className="flex flex-wrap items-start gap-10">
        <div className="flex w-[360px] flex-col gap-6">
          <Message {...pb}>Hey Olivia, can you please review the latest design when you can?</Message>
          <Message {...pb} reactions={reactions}>Hey Olivia, can you please review the latest design when you can?</Message>
          <Message {...pb} attachment={{ name: 'Latest design screenshot.jpg', size: '1.2 MB' }} />
          <Message {...pb} attachment={{ name: 'Latest design screenshot.jpg', size: '1.2 MB' }} reactions={reactions} />
          <Message name="Phoenix Baker" avatarInitials="PB" writing />
        </div>
        <div className="flex w-[360px] flex-col gap-6">
          <Message {...me}>Sure thing, I’ll have a look today.</Message>
          <Message {...me} reactions={reactions}>Sure thing, I’ll have a look today.</Message>
          <Message {...me} attachment={{ name: 'Tech design requirements.pdf', size: '200 KB' }} />
          <Message {...me} attachment={{ name: 'Tech design requirements.pdf', size: '200 KB' }} reactions={reactions} />
        </div>
      </Row>
      <Row label="_Message reaction">
        <MessageReaction emoji="❤️" />
        <MessageReaction emoji="❤️" count={2} />
        <MessageReaction emoji="👍" count={4} selected />
      </Row>
    </Section>
  );
}
