import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { AvatarLabelGroup } from '../../components/avatars/Avatar';
import { DropdownMenu, DropdownAvatarTrigger, DropdownAvatarHeader, type DropdownMenuItem } from '../../components/dropdowns/DropdownMenu';
import { LogOut01, Settings01, User01 } from '../../icons';
import type { NavLink } from './types';

export interface NavigationUser {
  name: ReactNode;
  email?: ReactNode;
  src?: string;
  initials?: string;
  /** Account dropdown items (desktop). */
  menuItems?: DropdownMenuItem[];
}

export interface NavigationActionsProps {
  /** Figma: Logged in */
  loggedIn?: boolean;
  /** Figma: Breakpoint (mobile = full-width stacked buttons / avatar label group). */
  breakpoint?: 'desktop' | 'mobile';
  /** Logged out: secondary action (default "Log in"). */
  login?: NavLink;
  /** Logged out: primary action (default "Sign up"). */
  signup?: NavLink;
  /** Logged in: the user shown in the avatar dropdown. */
  user?: NavigationUser;
  className?: string;
}

const defaultUser: NavigationUser = { name: 'Olivia Rhye', email: 'olivia@untitledui.com', initials: 'OR' };
const defaultMenu: DropdownMenuItem[] = [
  { label: 'View profile', icon: User01 },
  { label: 'Settings', icon: Settings01 },
  { divider: true },
  { label: 'Log out', icon: LogOut01 },
];

/** NavigationActions — Figma "_Navigation actions" (Log in / Sign up, or the signed-in avatar). */
export function NavigationActions({
  loggedIn = false,
  breakpoint = 'desktop',
  login = { label: 'Log in', href: '#' },
  signup = { label: 'Sign up', href: '#' },
  user = defaultUser,
  className,
}: NavigationActionsProps) {
  const mobile = breakpoint === 'mobile';
  if (loggedIn) {
    if (mobile)
      return (
        <div className={cx('flex items-center pr-6', className)}>
          <AvatarLabelGroup size="lg" title={user.name} subtitle={user.email} src={user.src} initials={user.initials} className="flex-1" />
        </div>
      );
    return (
      <div className={cx('flex items-center', className)}>
        <DropdownMenu
          align="end"
          trigger={<DropdownAvatarTrigger src={user.src} initials={user.initials} />}
          header={<DropdownAvatarHeader name={user.name} email={user.email} src={user.src} initials={user.initials} />}
          items={user.menuItems ?? defaultMenu}
          aria-label="Account"
        />
      </div>
    );
  }
  const link = (l: NavLink) => ({ as: l.href ? ('a' as const) : ('button' as const), href: l.href, onClick: l.onClick, iconLeading: l.icon });
  if (mobile)
    return (
      <div className={cx('flex flex-col gap-3', className)}>
        <Button size="lg" hierarchy="primary" className="w-full" {...link(signup)}>{signup.label}</Button>
        <Button size="lg" hierarchy="secondary-gray" className="w-full" {...link(login)}>{login.label}</Button>
      </div>
    );
  return (
    <div className={cx('flex items-center gap-3', className)}>
      <Button size="lg" hierarchy="tertiary-gray" {...link(login)}>{login.label}</Button>
      <Button size="lg" hierarchy="primary" {...link(signup)}>{signup.label}</Button>
    </div>
  );
}
