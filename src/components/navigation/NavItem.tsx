import { forwardRef, useId, useState, type ComponentType, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ChevronDown } from '../../icons';
import { Badge } from '../badges/Badge';
import { useNavTheme, type NavItemData, type NavTheme, navItemId } from './navTheme';

const itemBase =
  'group/nav relative flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-left text-md font-medium outline-none transition-colors duration-100 ' +
  'focus-visible:ring-4';

/** Figma "_Nav item base" — per-theme colours (Default / Brand / Gray dark). */
export const navItemStyles: Record<NavTheme, { idle: string; current: string; icon: string; iconCurrent: string; ring: string }> = {
  default: {
    idle: 'text-gray-700 hover:bg-gray-50 hover:text-gray-800',
    current: 'bg-gray-50 text-gray-800 hover:bg-gray-100',
    icon: 'text-gray-500',
    iconCurrent: 'text-gray-500',
    ring: 'focus-visible:ring-gray-400/14',
  },
  brand: {
    idle: 'text-brand-100 hover:bg-brand-600 hover:text-white',
    current: 'bg-brand-600 text-white',
    icon: 'text-brand-300 group-hover/nav:text-brand-100',
    iconCurrent: 'text-brand-100',
    ring: 'focus-visible:ring-brand-500/24',
  },
  dark: {
    idle: 'text-gray-100 hover:bg-gray-800 hover:text-white',
    current: 'bg-gray-800 text-white',
    icon: 'text-gray-400 group-hover/nav:text-gray-300',
    iconCurrent: 'text-gray-300',
    ring: 'focus-visible:ring-gray-400/14',
  },
};

export interface NavItemProps extends Omit<HTMLAttributes<HTMLElement>, 'onClick'> {
  /** Figma: Theme — defaults to the surrounding navigation's theme. */
  theme?: NavTheme;
  /** Figma: Current=True */
  current?: boolean;
  /** Leading icon (Figma bar-chart-01 slot). */
  icon?: IconSlot;
  /** Figma: _Dot — small green status dot before the label. */
  dot?: boolean;
  /** Figma: Badge — trailing pill badge (e.g. a count). */
  badge?: ReactNode;
  /** Figma: chevron-down — trailing chevron (used by dropdown items). */
  chevron?: boolean;
  /** Rotates the chevron (dropdown open). */
  open?: boolean;
  /** Indents the label for nested items (Figma dropdown menu items, 48px left padding). */
  nested?: boolean;
  /** Renders an `<a>`. */
  href?: string;
  /** Render as another element/component, e.g. a router Link. */
  as?: 'a' | 'button' | ComponentType<any>;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Extra trailing content. */
  trailing?: ReactNode;
  /** Hide icon/badge/chevron and fit the label (header navigation items). */
  compact?: boolean;
  children?: ReactNode;
}

/** NavItem — Figma "_Nav item base". */
export const NavItem = forwardRef<HTMLElement, NavItemProps>(function NavItem(
  { theme, current = false, icon, dot, badge, chevron, open, nested, href, as, onClick, trailing, compact, className, children, ...props },
  ref,
) {
  const t = useNavTheme(theme);
  const st = navItemStyles[t];
  const Comp: any = as ?? (href ? 'a' : 'button');
  return (
    <Comp
      ref={ref}
      href={href}
      type={Comp === 'button' ? 'button' : undefined}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
      className={cx(itemBase, st.ring, current ? st.current : st.idle, nested && 'pl-12', compact && 'w-auto shrink-0', className)}
      {...props}
    >
      <span className="flex min-w-0 flex-1 items-center gap-3">
        {dot && (
          <span className="flex size-2.5 shrink-0 items-center justify-center" aria-hidden>
            <span className="size-2 rounded-full bg-success-500" />
          </span>
        )}
        {renderIcon(icon, cx('size-6 shrink-0', current ? st.iconCurrent : st.icon))}
        <span className="truncate">{children}</span>
      </span>
      {badge != null && badge !== false && (
        <Badge size="sm" type="pill-color" color={t === 'brand' ? 'brand' : 'gray'}>
          {badge}
        </Badge>
      )}
      {trailing}
      {chevron && (
        <ChevronDown
          aria-hidden
          className={cx('size-5 shrink-0 transition-transform duration-150', current ? st.iconCurrent : st.icon, open && 'rotate-180')}
        />
      )}
    </Comp>
  );
});

export interface NavItemDropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Figma: Theme */
  theme?: NavTheme;
  label: ReactNode;
  icon?: IconSlot;
  badge?: ReactNode;
  dot?: boolean;
  /** Figma: Current=True */
  current?: boolean;
  /** Nested items shown when open. */
  items: NavItemData[];
  /** Figma: Open (controlled). */
  open?: boolean;
  /** Initial open state (uncontrolled). Defaults to true when a nested item is current. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/** NavItemDropdown — Figma "_Nav item dropdown base": a nav item that expands a nested list. */
export const NavItemDropdown = forwardRef<HTMLDivElement, NavItemDropdownProps>(function NavItemDropdown(
  { theme, label, icon, badge, dot, current, items, open: openProp, defaultOpen, onOpenChange, className, ...props },
  ref,
) {
  const childCurrent = items.some((i) => i.current);
  const [inner, setInner] = useState(defaultOpen ?? childCurrent);
  const open = openProp ?? inner;
  const menuId = useId();
  const toggle = () => {
    if (openProp === undefined) setInner(!open);
    onOpenChange?.(!open);
  };
  return (
    <div ref={ref} className={cx('flex flex-col gap-2', className)} {...props}>
      <NavItem
        theme={theme}
        icon={icon}
        badge={badge}
        dot={dot}
        current={current ?? (childCurrent && !open)}
        chevron
        open={open}
        aria-expanded={open}
        aria-controls={menuId}
        onClick={toggle}
      >
        {label}
      </NavItem>
      {open && (
        <ul id={menuId} className="flex flex-col gap-1 pb-2">
          {items.map((it, i) => (
            <li key={navItemId(it, i)}>
              <NavItem theme={theme} nested current={it.current} href={it.href} onClick={it.onClick} badge={it.badge} dot={it.dot}>
                {it.label}
              </NavItem>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
