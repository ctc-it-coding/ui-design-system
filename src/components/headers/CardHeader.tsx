import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { DotsVertical } from '../../icons';
import { Avatar } from '../avatars/Avatar';
import { Badge } from '../badges/Badge';

export interface CardHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  supportingText?: ReactNode;
  /** Badge next to the title — a string/number renders a brand pill badge, or pass a `<Badge>`. */
  badge?: ReactNode;
  /** Figma: Avatar=True — avatar image src. */
  avatarSrc?: string;
  /** Figma: Avatar=True — initials when there is no image. */
  avatarInitials?: string;
  /** Action buttons slot. */
  actions?: ReactNode;
  /** Custom menu trigger (e.g. a `<DropdownMenu>`). Overrides the default dots button. */
  menu?: ReactNode;
  /** Shows the default dots-vertical menu button. */
  onMenuClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Bottom divider (default true). */
  divider?: boolean;
}

/** Dots-vertical icon button used by card / section headers (Figma "Dropdown" Type=Icon). */
export function HeaderMenuButton({ onClick, label = 'More options', className }: { onClick?: (e: MouseEvent<HTMLButtonElement>) => void; label?: string; className?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="menu"
      onClick={onClick}
      className={cx(
        'flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-sm text-gray-400 outline-none transition-colors duration-100 hover:text-gray-500 focus-visible:ring-4 focus-visible:ring-gray-400/14',
        className,
      )}
    >
      <DotsVertical className="size-5" />
    </button>
  );
}

/** CardHeader — Figma "Card header" (with optional avatar, badge, actions and menu). */
export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(function CardHeader(
  { title, supportingText, badge, avatarSrc, avatarInitials, actions, menu, onMenuClick, divider = true, className, ...props },
  ref,
) {
  const hasAvatar = avatarSrc != null || avatarInitials != null;
  const menuEl = menu ?? (onMenuClick ? <HeaderMenuButton onClick={onMenuClick} /> : null);
  const badgeEl =
    badge == null || badge === false ? null : typeof badge === 'string' || typeof badge === 'number' ? (
      <Badge size="sm" type="pill-color" color="brand">
        {badge}
      </Badge>
    ) : (
      badge
    );
  return (
    <div ref={ref} className={cx('flex flex-col bg-white', className)} {...props}>
      <div className="relative flex flex-col gap-4 px-4 py-5 md:flex-row md:items-start md:px-6">
        <div className={cx('flex min-w-0 flex-1 gap-4', hasAvatar && 'items-center', menuEl && 'max-md:pr-8')}>
          {hasAvatar && <Avatar size="xl" src={avatarSrc} initials={avatarInitials} alt="" className="max-md:size-12" />}
          <div className={cx('flex min-w-0 flex-1 flex-col', !hasAvatar && 'gap-1')}>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              {badgeEl}
            </div>
            {supportingText != null && <p className="text-sm text-gray-600">{supportingText}</p>}
          </div>
        </div>
        {actions != null && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        {menuEl && <div className="max-md:absolute max-md:top-5 max-md:right-4">{menuEl}</div>}
      </div>
      {divider && <div className="h-px w-full bg-gray-200" />}
    </div>
  );
});
