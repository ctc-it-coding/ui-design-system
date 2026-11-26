import { forwardRef, type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Button } from '../../components/buttons/Button';
import { ChevronDown } from '../../icons';
import type { NavLink } from './types';

const FOCUS = 'outline-none focus-visible:ring-4 focus-visible:ring-gray-400/14';

export type NavMenuItemIcon = 'featured' | 'small' | 'false';

export interface NavMenuItemProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'title'> {
  /** Figma: Icon (Featured = 48px featured icon, Small = 24px icon, False = no icon). Defaults to `small` when an icon is given. */
  iconStyle?: NavMenuItemIcon;
  icon?: IconSlot;
  title: ReactNode;
  /** "Supporting text" */
  description?: ReactNode;
  /** Badge next to the title. */
  badge?: ReactNode;
  /** Link-color action under the text (Figma "Actions"). */
  action?: NavLink;
  /** Figma: Breakpoint=Mobile — full-bleed row with 16px side padding and no radius. */
  mobile?: boolean;
}

/** NavMenuItem — Figma "_Nav menu item" (one link row inside a dropdown / mega menu). */
export const NavMenuItem = forwardRef<HTMLAnchorElement, NavMenuItemProps>(function NavMenuItem(
  { iconStyle, icon, title, description, badge, action, mobile, href = '#', className, ...props },
  ref,
) {
  const style: NavMenuItemIcon = iconStyle ?? (icon ? 'small' : 'false');
  return (
    <a
      ref={ref}
      href={href}
      className={cx(
        'group/navitem flex gap-4 transition-colors duration-100 hover:bg-gray-50',
        FOCUS,
        mobile ? 'px-4 py-3 focus-visible:ring-inset' : 'rounded-lg p-3',
        className,
      )}
      {...props}
    >
      {style === 'featured' && icon != null && <FeaturedIcon icon={icon} size="lg" color="brand" theme="light" className="shrink-0" />}
      {style === 'small' && icon != null && renderIcon(icon, 'size-6 shrink-0 text-brand-600')}
      <span className="flex min-w-0 flex-1 flex-col gap-3">
        <span className="flex flex-col gap-1">
          <span className="flex items-center gap-2">
            <span className="text-md font-medium text-gray-900">{title}</span>
            {badge}
          </span>
          {description != null && <span className="text-sm text-gray-600">{description}</span>}
        </span>
        {action && (
          <span>
            <Button as="span" size="sm" hierarchy="link-color" className="pointer-events-none">
              {action.label}
            </Button>
          </span>
        )}
      </span>
    </a>
  );
});

export interface NavMenuItemDropdownProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Open */
  open?: boolean;
  /** Figma: Icon */
  iconStyle?: NavMenuItemIcon;
  icon?: IconSlot;
  children: ReactNode;
  /** Figma: Breakpoint=Mobile */
  mobile?: boolean;
}

/** NavMenuItemDropdown — Figma "_Nav menu item dropdown" (collapsible row of the mobile menu). */
export const NavMenuItemDropdown = forwardRef<HTMLButtonElement, NavMenuItemDropdownProps>(function NavMenuItemDropdown(
  { open, iconStyle, icon, mobile = true, children, className, ...props },
  ref,
) {
  const style: NavMenuItemIcon = iconStyle ?? (icon ? 'small' : 'false');
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={open}
      className={cx(
        'flex w-full cursor-pointer items-center gap-4 text-left transition-colors duration-100 hover:bg-gray-50',
        FOCUS,
        mobile ? 'py-3 pr-4 pl-4 focus-visible:ring-inset' : 'rounded-lg py-3 pr-4 pl-3',
        className,
      )}
      {...props}
    >
      {style === 'featured' && icon != null && <FeaturedIcon icon={icon} size="lg" color="brand" theme="light" className="shrink-0" />}
      {style === 'small' && icon != null && renderIcon(icon, 'size-6 shrink-0 text-brand-600')}
      <span className="flex-1 text-md font-medium text-gray-900">{children}</span>
      <ChevronDown className={cx('size-5 shrink-0 text-gray-400 transition-transform duration-150', open && 'rotate-180')} aria-hidden />
    </button>
  );
});
