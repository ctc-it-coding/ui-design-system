import { Avatar, AvatarGroup, AvatarLabelGroup, AvatarProfilePhoto, AvatarAddButton, type AvatarSize } from '../../src/components/avatars';
import { Section, Row } from '../ui';

const grad = (a: string, b: string) =>
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="#fff" opacity=".55"/><ellipse cx="32" cy="60" rx="22" ry="16" fill="#fff" opacity=".55"/></svg>`,
  );
const imgs = [grad('#fda29b', '#7f56d9'), grad('#7cd4fd', '#2e90fa'), grad('#a6f4c5', '#12b76a'), grad('#fec84b', '#f79009'), grad('#fbcfe8', '#ee46bc'), grad('#c7d7fe', '#444ce7')];
const company = grad('#101828', '#475467');
const sizes: AvatarSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export default function AvatarsDemo() {
  return (
    <Section id="avatars" title="Avatars" figma="Avatars/Avatar · Avatar group · Avatar label group · Avatar profile photo">
      <Row label="image">{sizes.map((s, i) => <Avatar key={s} size={s} src={imgs[i]} alt="Olivia Rhye" />)}</Row>
      <Row label="initials">{sizes.map((s) => <Avatar key={s} size={s} initials="OR" />)}</Row>
      <Row label="placeholder">{sizes.map((s) => <Avatar key={s} size={s} />)}</Row>
      <Row label="online / offline">
        {sizes.map((s, i) => <Avatar key={s} size={s} src={imgs[i]} status={i % 2 ? 'offline' : 'online'} />)}
      </Row>
      <Row label="verified">{sizes.map((s, i) => <Avatar key={s} size={s} src={imgs[i]} verified />)}</Row>
      <Row label="company">{sizes.map((s, i) => <Avatar key={s} size={s} initials="OR" companySrc={company} />)}</Row>
      <Row label="focusable">
        <Avatar size="md" src={imgs[0]} tabIndex={0} />
        <AvatarAddButton size="xs" />
        <AvatarAddButton size="sm" />
        <AvatarAddButton size="md" />
        <AvatarAddButton size="md" disabled />
      </Row>
      <Row label="group" className="flex flex-col items-start gap-4">
        {(['xs', 'sm', 'md'] as const).map((s) => (
          <AvatarGroup key={s} size={s} max={5} onAdd={() => {}}>
            {[...imgs, ...imgs].map((src, i) => <Avatar key={i} src={src} />)}
          </AvatarGroup>
        ))}
      </Row>
      <Row label="label group" className="flex flex-wrap items-center gap-10">
        {(['sm', 'md', 'lg', 'xl'] as const).map((s, i) => (
          <AvatarLabelGroup key={s} size={s} src={imgs[i]} status="online" title="Olivia Rhye" subtitle="olivia@untitledui.com" />
        ))}
      </Row>
      <Row label="profile photo" className="flex flex-wrap items-end gap-10">
        <AvatarProfilePhoto size="sm" src={imgs[1]} verified />
        <AvatarProfilePhoto size="md" src={imgs[2]} verified />
        <AvatarProfilePhoto size="lg" src={imgs[0]} verified />
        <AvatarProfilePhoto size="md" initials="OR" />
        <AvatarProfilePhoto size="md" />
      </Row>
    </Section>
  );
}
