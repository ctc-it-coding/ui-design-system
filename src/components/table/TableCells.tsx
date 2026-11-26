import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { ArrowDown, ArrowUp, Star01 } from '../../icons';
import { Avatar, AvatarGroup } from '../avatars/Avatar';
import { Badge, type BadgeColor } from '../badges/Badge';
import { Button } from '../buttons/Button';
import { ProgressBar } from '../progress/ProgressBar';

/* Helpers that render the *contents* of a Figma "Table cell" Style. Put them inside <TableCell>. */

export interface TableLeadProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Primary text (Medium, gray-900). */
  title: ReactNode;
  /** Figma: Supporting text */
  supportingText?: ReactNode;
  /** Leading selection control — Figma Lead checkbox / radio button / toggle (`<Checkbox size="md" />` …). */
  control?: ReactNode;
  /** Figma Lead avatar — avatar image. */
  avatarSrc?: string;
  /** Initials when there is no avatar image. Setting either avatar prop shows a 40px avatar. */
  avatarInitials?: string;
  /** Custom leading visual — Figma Lead icon / Lead payment method (e.g. `<PaymentIcon method="visa" />`). */
  leading?: ReactNode;
}

/**
 * TableLead — Figma Table cell Styles "Lead text", "Lead checkbox", "Lead avatar", "Lead avatar checkbox",
 * "Lead icon", "Lead payment method" (+ radio / toggle variants), and "Payment method".
 */
export const TableLead = forwardRef<HTMLDivElement, TableLeadProps>(function TableLead(
  { title, supportingText, control, avatarSrc, avatarInitials, leading, className, ...props },
  ref,
) {
  const hasAvatar = avatarSrc != null || avatarInitials != null;
  return (
    <div ref={ref} className={cx('flex items-center gap-3', className)} {...props}>
      {control}
      {hasAvatar && <Avatar size="md" src={avatarSrc} initials={avatarInitials} alt={typeof title === 'string' ? title : undefined} />}
      {leading}
      <div className="flex min-w-0 flex-col text-sm">
        <span className="truncate font-medium text-gray-900">{title}</span>
        {supportingText != null && <span className="truncate text-gray-600">{supportingText}</span>}
      </div>
    </div>
  );
});

export interface TableBadgeItem {
  label: ReactNode;
  color?: BadgeColor;
}

export interface TableBadgesProps extends HTMLAttributes<HTMLDivElement> {
  badges: TableBadgeItem[];
  /** Show at most `max` badges followed by a gray "+N" badge (Figma "Badges multiple"). */
  max?: number;
}

/** TableBadges — Figma Table cell Style "Badge" / "Badges multiple". */
export const TableBadges = forwardRef<HTMLDivElement, TableBadgesProps>(function TableBadges(
  { badges, max = 3, className, ...props },
  ref,
) {
  const shown = badges.slice(0, max);
  const rest = badges.length - shown.length;
  return (
    <div ref={ref} className={cx('flex items-center gap-1', className)} {...props}>
      {shown.map((b, i) => (
        <Badge key={i} size="sm" type="pill-color" color={b.color ?? 'gray'}>
          {b.label}
        </Badge>
      ))}
      {rest > 0 && (
        <Badge size="sm" type="pill-color" color="gray">
          +{rest}
        </Badge>
      )}
    </div>
  );
});

export interface TableAvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  avatars: { src?: string; initials?: string; alt?: string }[];
  /** Max avatars before "+N". */
  max?: number;
  /** Figma: Supporting text — e.g. "10 users" before the group. */
  supportingText?: ReactNode;
}

/** TableAvatarGroup — Figma Table cell Style "Avatar group" (xs group). */
export const TableAvatarGroup = forwardRef<HTMLDivElement, TableAvatarGroupProps>(function TableAvatarGroup(
  { avatars, max = 5, supportingText, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('flex items-center gap-3', className)} {...props}>
      {supportingText != null && <span className="text-sm text-gray-600">{supportingText}</span>}
      <AvatarGroup size="xs" max={max}>
        {avatars.map((a, i) => (
          <Avatar key={i} src={a.src} initials={a.initials} alt={a.alt} />
        ))}
      </AvatarGroup>
    </div>
  );
});

export interface TableProgressProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100 */
  value: number;
}

/** TableProgress — Figma Table cell Style "Progress bar" (bar with % label on the right). */
export const TableProgress = forwardRef<HTMLDivElement, TableProgressProps>(function TableProgress(
  { value, className, ...props },
  ref,
) {
  return <ProgressBar ref={ref} value={value} label="right" className={cx('min-w-40', className)} {...props} />;
});

export interface TableTrendProps extends HTMLAttributes<HTMLDivElement> {
  /** Change in percent; positive → success badge with arrow up, negative → error badge with arrow down. */
  value: number;
  /** Figma: Supporting text — value shown before the badge (e.g. "$1,800"). */
  supportingText?: ReactNode;
}

/** TableTrend — Figma Table cell Styles "Trend positive" / "Trend negative". */
export const TableTrend = forwardRef<HTMLDivElement, TableTrendProps>(function TableTrend(
  { value, supportingText, className, ...props },
  ref,
) {
  const up = value >= 0;
  return (
    <div ref={ref} className={cx('flex items-center gap-3', className)} {...props}>
      {supportingText != null && <span className="text-sm text-gray-600">{supportingText}</span>}
      <Badge size="sm" type="pill-color" color={up ? 'success' : 'error'} iconLeading={up ? ArrowUp : ArrowDown}>
        {Math.abs(value)}%
      </Badge>
    </div>
  );
});

export interface TableActionItem {
  icon: IconSlot;
  label: string;
  onClick?: () => void;
}

export interface TableActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma Style "Action icons" — tertiary gray icon-only buttons. */
  actions: TableActionItem[];
}

/** TableActions — Figma Table cell Style "Action icons". Use inside `<TableCell padding="compact">`. */
export const TableActions = forwardRef<HTMLDivElement, TableActionsProps>(function TableActions(
  { actions, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('flex items-center gap-1', className)} {...props}>
      {actions.map((a) => (
        <Button key={a.label} size="md" hierarchy="tertiary-gray" iconLeading={a.icon} aria-label={a.label} title={a.label} onClick={a.onClick} />
      ))}
    </div>
  );
});

export interface TableRatingProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–5, fractional values are rounded to the nearest whole star. */
  value: number;
  max?: number;
}

/** TableRating — Figma Table cell Style "Star ratings" (yellow stars). */
export const TableRating = forwardRef<HTMLDivElement, TableRatingProps>(function TableRating(
  { value, max = 5, className, ...props },
  ref,
) {
  const n = Math.round(value);
  return (
    <div ref={ref} role="img" aria-label={`${value} out of ${max} stars`} className={cx('flex items-center gap-1', className)} {...props}>
      {Array.from({ length: max }, (_, i) => (
        <Star01 key={i} className={cx('size-5', i < n ? 'fill-warning-400 text-warning-400' : 'fill-gray-100 text-gray-100')} />
      ))}
    </div>
  );
});
