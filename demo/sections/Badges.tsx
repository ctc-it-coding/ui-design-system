import { Badge, BadgeGroup, type BadgeColor, type BadgeSize, type BadgeType } from '../../src/components/badges';
import { ArrowRight, ArrowUp, Plus } from '../../src/icons';
import { Flag } from '../../src/components/misc-icons';
import { Section, Row } from '../ui';

const colors: BadgeColor[] = ['gray', 'brand', 'error', 'warning', 'success', 'gray-blue', 'blue-light', 'blue', 'indigo', 'purple', 'pink', 'orange'];
const types: BadgeType[] = ['pill-color', 'pill-outline', 'badge-color', 'badge-modern'];
const sizes: BadgeSize[] = ['sm', 'md', 'lg'];
const avatar =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fda29b"/><stop offset="1" stop-color="#7f56d9"/></linearGradient></defs><rect width="16" height="16" fill="url(#g)"/></svg>');
const flag = <Flag code="AU" size={16} />;

export default function BadgesDemo() {
  return (
    <Section id="badges" title="Badges" figma="Badges/Badge · Badges/Badge group">
      {types.map((t) => (
        <Row key={t} label={`${t} · colours (md)`}>
          {colors.map((c) => (
            <Badge key={c} type={t} color={c}>
              Label
            </Badge>
          ))}
        </Row>
      ))}
      {types.map((t) => (
        <Row key={t} label={`${t} · dot`}>
          {colors.map((c) => (
            <Badge key={c} type={t} color={c} dot>
              Label
            </Badge>
          ))}
        </Row>
      ))}
      {sizes.map((s) => (
        <Row key={s} label={`size ${s} · icon variants (pill-color / badge-color / badge-modern)`}>
          {(['pill-color', 'badge-color', 'badge-modern'] as BadgeType[]).map((t) => (
            <div key={t} className="flex items-center gap-2">
              <Badge size={s} type={t} color="brand">Label</Badge>
              <Badge size={s} type={t} color="brand" dot>Label</Badge>
              <Badge size={s} type={t} color="brand" iconLeading={ArrowUp}>Label</Badge>
              <Badge size={s} type={t} color="brand" iconTrailing={ArrowRight}>Label</Badge>
              <Badge size={s} type={t} color="brand" flag={flag}>Label</Badge>
              <Badge size={s} type={t} color="brand" avatarSrc={avatar}>Label</Badge>
              <Badge size={s} type={t} color="brand" onRemove={() => {}}>Label</Badge>
              <Badge size={s} type={t} color="brand" iconLeading={Plus} aria-label="Add" />
            </div>
          ))}
        </Row>
      ))}
      <Row label="pill-outline · icons">
        {colors.slice(0, 6).map((c) => (
          <Badge key={c} type="pill-outline" color={c} onRemove={() => {}}>
            Label
          </Badge>
        ))}
        {colors.slice(6).map((c) => (
          <Badge key={c} type="pill-outline" color={c} iconLeading={ArrowUp}>
            Label
          </Badge>
        ))}
      </Row>
      <Row label="Badge group · light" className="flex flex-col items-start gap-3">
        {(['brand', 'gray', 'error', 'warning', 'success'] as const).map((c) => (
          <div key={c} className="flex flex-wrap items-center gap-4">
            <BadgeGroup color={c} badge="New feature">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup color={c} size="lg" badge="New feature">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup color={c} badgePosition="trailing" badge="New feature">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup color={c} size="lg" badgePosition="trailing" badge="New feature">We’ve just released a new feature</BadgeGroup>
          </div>
        ))}
      </Row>
      <Row label="Badge group · modern" className="flex flex-col items-start gap-3">
        {(['brand', 'error'] as const).map((c) => (
          <div key={c} className="flex flex-wrap items-center gap-4">
            <BadgeGroup theme="modern" color={c} badge="New feature">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup theme="modern" color={c} size="lg" badge="New feature">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup theme="modern" color={c} badgePosition="trailing" badge="Learn more">We’ve just released a new feature</BadgeGroup>
            <BadgeGroup theme="modern" color={c} size="lg" badgePosition="trailing" badge="Learn more">We’ve just released a new feature</BadgeGroup>
          </div>
        ))}
      </Row>
    </Section>
  );
}
