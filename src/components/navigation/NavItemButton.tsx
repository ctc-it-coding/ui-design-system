import { forwardRef, type ButtonHTMLAttributes, type ComponentType, type MouseEvent } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { Menu02, XClose } from '../../icons';
import { Tooltip } from '../tooltips/Tooltip';
import { useNavTheme, type NavTheme } from './navTheme';

const btnStyles: Record<NavTheme, { idle: string; current: string; ring: string }> = {
  default: {
    idle: 'text-gray-500 hover:bg-gray-50 hover:text-gray-600',
    current: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
    ring: 'focus-visible:ring-gray-400/14',
  },
  brand: {
    idle: 'text-brand-200 hover:bg-brand-600 hover:text-white',
    current: 'bg-brand-600 text-white',
    ring: 'focus-visible:ring-brand-500/24',
  },
  dark: {
    idle: 'text-gray-400 hover:bg-gray-800 hover:text-white',
    current: 'bg-gray-800 text-white',
    ring: 'focus-visible:ring-gray-400/14',
  },
};

export interface NavItemButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Icon shown in the button. */
  icon: IconSlot;
  /** Accessible label; also shown as a tooltip when `tooltip` is set. */
  label: string;
  /** Figma: Size (md 40px, lg 48px) */
  size?: 'md' | 'lg';
  /** Figma: Theme */
  theme?: NavTheme;
  /** Figma: Current=True */
  current?: boolean;
  /** Show `label` in a tooltip on hover (placement right, as used in the slim sidebar). */
  tooltip?: boolean | 'right' | 'bottom';
  /** Renders an `<a>`. */
  href?: string;
  as?: 'a' | 'button' | ComponentType<any>;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

/** NavItemButton — Figma "_Nav item button": icon-only nav item (slim sidebar, header actions). */
export const NavItemButton = forwardRef<HTMLElement, NavItemButtonProps>(function NavItemButton(
  { icon, label, size = 'md', theme, current = false, tooltip, href, as, className, ...props },
  ref,
) {
  const t = useNavTheme(theme);
  const st = btnStyles[t];
  const Comp: any = as ?? (href ? 'a' : 'button');
  const el = (
    <Comp
      ref={ref}
      href={href}
      type={Comp === 'button' ? 'button' : undefined}
      aria-label={label}
      aria-current={current ? 'page' : undefined}
      className={cx(
        'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md p-2 outline-none transition-colors duration-100 focus-visible:ring-4',
        size === 'md' ? 'size-10' : 'size-12',
        st.ring,
        current ? st.current : st.idle,
        className,
      )}
      {...props}
    >
      {renderIcon(icon, size === 'md' ? 'size-5' : 'size-6')}
    </Comp>
  );
  if (!tooltip) return el;
  return (
    <Tooltip title={label} placement={tooltip === 'bottom' ? 'bottom' : 'right'} theme="dark">
      {el}
    </Tooltip>
  );
});

const menuStyles: Record<NavTheme, { closed: string; ring: string }> = {
  default: { closed: 'text-gray-500 hover:bg-gray-50 hover:text-gray-600', ring: 'focus-visible:ring-gray-400/14' },
  brand: { closed: 'text-brand-100 hover:bg-brand-600 hover:text-white', ring: 'focus-visible:ring-brand-500/24' },
  dark: { closed: 'text-gray-400 hover:bg-gray-800 hover:text-white', ring: 'focus-visible:ring-gray-400/14' },
};

export interface NavMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Opened — shows the close X (drawn over the dark overlay). */
  open?: boolean;
  /** Figma: Theme */
  theme?: NavTheme;
}

/** NavMenuButton — Figma "_Application nav menu button": hamburger / close toggle for mobile navigation. */
export const NavMenuButton = forwardRef<HTMLButtonElement, NavMenuButtonProps>(function NavMenuButton(
  { open = false, theme, className, ...props },
  ref,
) {
  const t = useNavTheme(theme);
  return (
    <button
      ref={ref}
      type="button"
      aria-label={open ? 'Close menu' : 'Open menu'}
      aria-expanded={open}
      className={cx(
        'inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg p-2 outline-none transition-colors duration-100 focus-visible:ring-4',
        menuStyles[t].ring,
        open ? 'text-white/70 hover:bg-white/10 hover:text-white' : menuStyles[t].closed,
        className,
      )}
      {...props}
    >
      {open ? <XClose className="size-6" /> : <Menu02 className="size-6" />}
    </button>
  );
});
