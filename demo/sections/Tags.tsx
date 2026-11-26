import { Tag, type TagSize } from '../../src/components/tags';
import { Flag } from '../../src/components/misc-icons';
import { Section, Row } from '../ui';

const sizes: TagSize[] = ['sm', 'md', 'lg'];
const avatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fec84b"/><stop offset="1" stop-color="#f04438"/></linearGradient></defs><rect width="16" height="16" fill="url(#g)"/></svg>');
const flag = <Flag code="AU" size={16} />;

export default function TagsDemo() {
  return (
    <Section id="tags" title="Tags" figma="Tags/Tag">
      {sizes.map((s) => (
        <div key={s} className="flex flex-col gap-3">
          <Row label={`size ${s} · text / x close / count`}>
            <Tag size={s}>Label</Tag>
            <Tag size={s} onRemove={() => {}}>Label</Tag>
            <Tag size={s} count={5}>Label</Tag>
            <Tag size={s} dot>Label</Tag>
            <Tag size={s} dot onRemove={() => {}}>Label</Tag>
            <Tag size={s} dot count={5}>Label</Tag>
            <Tag size={s} avatarSrc={avatar}>Label</Tag>
            <Tag size={s} avatarSrc={avatar} onRemove={() => {}}>Label</Tag>
            <Tag size={s} flag={flag} count={5}>Label</Tag>
          </Row>
          <Row label={`size ${s} · checkbox`}>
            <Tag size={s} checkbox>Label</Tag>
            <Tag size={s} checkbox defaultChecked>Label</Tag>
            <Tag size={s} checkbox defaultChecked onRemove={() => {}}>Label</Tag>
            <Tag size={s} checkbox count={5}>Label</Tag>
            <Tag size={s} checkbox dot defaultChecked count={5}>Label</Tag>
            <Tag size={s} checkbox avatarSrc={avatar} onRemove={() => {}}>Label</Tag>
            <Tag size={s} checkbox disabled>Disabled</Tag>
          </Row>
        </div>
      ))}
    </Section>
  );
}
