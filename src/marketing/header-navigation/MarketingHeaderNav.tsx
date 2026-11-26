import {
  forwardRef, isValidElement, useCallback, useEffect, useId, useRef, useState,
  type ButtonHTMLAttributes, type HTMLAttributes, type MutableRefObject, type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { ChevronDown, Menu01, XClose } from '../../icons';
import { NavMenuItem, NavMenuItemDropdown } from './NavMenuItem';
import { NavigationActions } from './NavigationActions';
import { DesktopMenu, MobileSubMenu, isFullWidthType } from './menus';
import { defaultNavItems, navMobileFooterLinks } from './defaults';
import type { MarketingHeaderNavType, MarketingHeaderNavVariant, MarketingNavItem, NavLink, NavMenuContent } from './types';

/* ------------------------------------------------------------------ helpers */

function useControllable<T>(value: T | undefined, defaultValue: T, onChange?: (v: T) => void): [T, (v: T) => void] {
  const [inner, setInner] = useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const set = useCallback(
    (v: T) => {
      if (!isControlled) setInner(v);
      onChange?.(v);
    },
    [isControlled, onChange],
  );
  return [isControlled ? (value as T) : inner, set];
}

const isMenuContent = (m: unknown): m is NavMenuContent =>
  m != null && typeof m === 'object' && !isValidElement(m) && !Array.isArray(m);

/** Default logo: gradient logomark + wordmark (pass `logo` to replace). */
export function MarketingNavLogo({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cx('flex h-8 items-center gap-2', className)}>
      <span className="relative flex size-8 items-center justify-center overflow-hidden rounded-lg bg-linear-to-br from-brand-400 to-brand-700 shadow-sm">
        <span className="size-3 rounded-full bg-white/90" />
      </span>
      <span className={cx('text-xl font-semibold tracking-tight', dark ? 'text-white' : 'text-gray-900')}>Tinicorn</span>
    </span>
  );
}

export interface MarketingNavMenuButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Opened */
  opened?: boolean;
}

/** MarketingNavMenuButton — Figma "_Nav menu button" (mobile hamburger / close toggle). */
export const MarketingNavMenuButton = forwardRef<HTMLButtonElement, MarketingNavMenuButtonProps>(function MarketingNavMenuButton({ opened, className, ...props }, ref) {
  const Icon = opened ? XClose : Menu01;
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={opened}
      aria-label={opened ? 'Close menu' : 'Open menu'}
      className={cx(
        'flex size-10 cursor-pointer items-center justify-center rounded-lg p-2 text-gray-700 outline-none transition-colors hover:bg-gray-50',
        'focus-visible:ring-4 focus-visible:ring-gray-400/14',
        className,
      )}
      {...props}
    >
      <Icon className="size-6" aria-hidden />
    </button>
  );
});

/* ------------------------------------------------------------------ props */

export interface MarketingHeaderNavProps extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  /** Figma component: "Dropdown header navigation" or "Full-width header navigation". */
  variant?: MarketingHeaderNavVariant;
  /** Figma: Type (decides the menu layout). Default: `simple` (dropdown) / `2-col-with-sidebar` (full-width). */
  type?: MarketingHeaderNavType;
  /** Logo node (default: Tinicorn logo). */
  logo?: ReactNode;
  logoHref?: string;
  /** Top-level items; items with `menu` open a dropdown / mega menu. Default: Home, Products, Resources, Pricing. */
  items?: MarketingNavItem[];
  /** Right-hand desktop actions (default `<NavigationActions />`). */
  actions?: ReactNode;
  /** Actions at the bottom of the mobile panel (default `<NavigationActions breakpoint="mobile" />`). */
  mobileActions?: ReactNode;
  /** Shortcut for the default actions: Figma "_Navigation actions" Logged in. */
  loggedIn?: boolean;
  /** Link columns at the bottom of the mobile panel. */
  mobileFooterLinks?: NavLink[][];
  /** Figma: Open — label of the item whose menu is open (controlled; `null` = closed). */
  openItem?: string | null;
  defaultOpenItem?: string | null;
  onOpenItemChange?: (label: string | null) => void;
  /** Open menus on hover (desktop). Default true; click always toggles. */
  openOnHover?: boolean;
  /** Mobile panel open (Figma Breakpoint=Mobile, Open). */
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** Figma: Mobile subnav open — label of the expanded item in the mobile panel. */
  mobileSubnav?: string | null;
  defaultMobileSubnav?: string | null;
  onMobileSubnavChange?: (label: string | null) => void;
  /** `responsive` (default): desktop bar from `lg`, mobile bar below. Force one with `desktop` / `mobile`. */
  layout?: 'responsive' | 'desktop' | 'mobile';
  /** Full-width menus & the mobile panel: `absolute` (overlay, default) or `static` (pushes content — used for inline demos). */
  menuPosition?: 'absolute' | 'static';
}

/* ------------------------------------------------------------------ component */

/**
 * MarketingHeaderNav — Figma "Dropdown header navigation" + "Full-width header navigation".
 * Desktop: logo, nav links (hover / click opens the menu), actions. Mobile: logo + menu button → panel with collapsible sub-navs.
 */
export const MarketingHeaderNav = forwardRef<HTMLElement, MarketingHeaderNavProps>(function MarketingHeaderNav(
  {
    variant = 'dropdown',
    type,
    logo,
    logoHref = '#',
    items,
    actions,
    mobileActions,
    loggedIn = false,
    mobileFooterLinks = navMobileFooterLinks,
    openItem,
    defaultOpenItem = null,
    onOpenItemChange,
    openOnHover = true,
    mobileOpen,
    defaultMobileOpen = false,
    onMobileOpenChange,
    mobileSubnav,
    defaultMobileSubnav = null,
    onMobileSubnavChange,
    layout = 'responsive',
    menuPosition = 'absolute',
    className,
    ...props
  },
  ref,
) {
  const navType: MarketingHeaderNavType = type ?? (variant === 'full-width' ? '2-col-with-sidebar' : 'simple');
  const full = isFullWidthType(navType);
  const navItems = items ?? defaultNavItems(variant, navType);
  const [open, setOpen] = useControllable<string | null>(openItem, defaultOpenItem, onOpenItemChange);
  const [mOpen, setMOpen] = useControllable<boolean>(mobileOpen, defaultMobileOpen, onMobileOpenChange);
  const [sub, setSub] = useControllable<string | null>(mobileSubnav, defaultMobileSubnav, onMobileSubnavChange);
  const rootRef = useRef<HTMLElement | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  /** Time a menu was last opened by hover — a click right after it keeps the menu open instead of toggling it shut. */
  const hoverTs = useRef(0);
  const id = useId();

  const setRefs = (el: HTMLElement | null) => {
    rootRef.current = el;
    if (typeof ref === 'function') ref(el);
    else if (ref) (ref as MutableRefObject<HTMLElement | null>).current = el;
  };

  // Outside click + Escape close the open menu / mobile panel.
  useEffect(() => {
    if (open == null && !mOpen) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        if (open != null) setOpen(null);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (open != null) {
        const t = triggerRefs.current[open];
        setOpen(null);
        t?.focus();
      } else if (mOpen) setMOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, mOpen, setOpen, setMOpen]);

  const openEntry = navItems.find((it) => it.label === open && it.menu != null);
  const renderMenu = (it: MarketingNavItem) => (isMenuContent(it.menu) ? <DesktopMenu type={navType} content={it.menu} /> : (it.menu as ReactNode));

  const show = { desktop: layout === 'responsive' ? 'hidden lg:block' : layout === 'desktop' ? 'block' : 'hidden', mobile: layout === 'responsive' ? 'lg:hidden' : layout === 'mobile' ? 'block' : 'hidden' };
  const anyOpen = openEntry != null || mOpen;
  const abs = menuPosition === 'absolute';

  const logoNode = (
    <a href={logoHref} className="flex shrink-0 rounded-sm outline-none focus-visible:ring-4 focus-visible:ring-gray-400/14" aria-label="Home">
      {logo ?? <MarketingNavLogo />}
    </a>
  );

  return (
    <header
      ref={setRefs}
      data-variant={variant}
      data-type={navType}
      className={cx('relative z-40 w-full', anyOpen && 'bg-white', className)}
      onMouseLeave={openOnHover && open != null ? () => setOpen(null) : undefined}
      {...props}
    >
      {/* ---------------- desktop ---------------- */}
      <div className={show.desktop}>
        <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between gap-8 px-8">
          <div className="flex items-center gap-10">
            {logoNode}
            <nav aria-label="Main">
              <ul className="flex items-center gap-8">
                {navItems.map((it) => {
                  const hasMenu = it.menu != null;
                  const isOpen = hasMenu && open === it.label;
                  const menuId = `${id}-menu-${it.label}`;
                  return (
                    <li
                      key={it.label}
                      className="relative"
                      onMouseEnter={openOnHover ? () => { if (hasMenu && open !== it.label) hoverTs.current = Date.now(); setOpen(hasMenu ? it.label : null); } : undefined}
                    >
                      {hasMenu ? (
                        <button
                          ref={(el) => { triggerRefs.current[it.label] = el; }}
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={isOpen ? menuId : undefined}
                          onClick={() => setOpen(isOpen && Date.now() - hoverTs.current > 500 ? null : it.label)}
                          className="flex cursor-pointer items-center gap-2 rounded-sm text-md font-medium text-gray-600 outline-none transition-colors hover:text-gray-700 focus-visible:ring-4 focus-visible:ring-gray-400/14 aria-expanded:text-gray-700"
                        >
                          {it.label}
                          <ChevronDown className={cx('size-5 text-gray-400 transition-transform duration-150', isOpen && 'rotate-180')} aria-hidden />
                        </button>
                      ) : (
                        <a
                          href={it.href ?? '#'}
                          className="flex rounded-sm text-md font-medium text-gray-600 outline-none transition-colors hover:text-gray-700 focus-visible:ring-4 focus-visible:ring-gray-400/14"
                        >
                          {it.label}
                        </a>
                      )}
                      {isOpen && !full && (
                        <div id={menuId} className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-4">
                          {renderMenu(it)}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          {actions ?? <NavigationActions loggedIn={loggedIn} />}
        </div>
        {full && openEntry && (
          <div id={`${id}-menu-${openEntry.label}`} className={cx(abs && 'absolute inset-x-0 top-full z-50')}>
            {renderMenu(openEntry)}
          </div>
        )}
      </div>

      {/* ---------------- mobile ---------------- */}
      <div className={show.mobile}>
        <div className="flex h-[72px] items-center justify-between pr-3 pl-4">
          {logoNode}
          <MarketingNavMenuButton opened={mOpen} aria-controls={`${id}-mobile`} onClick={() => setMOpen(!mOpen)} />
        </div>
        {mOpen && (
          <div
            id={`${id}-mobile`}
            className={cx('w-full bg-white shadow-lg', abs && 'absolute inset-x-0 top-full z-50 max-h-[calc(100dvh-72px)] overflow-y-auto')}
          >
            <ul className="flex flex-col gap-2 border-b border-gray-200 py-6">
              {navItems.map((it) => {
                const hasMenu = it.menu != null;
                const expanded = hasMenu && sub === it.label;
                return (
                  <li key={it.label} className="flex flex-col gap-2">
                    {hasMenu ? (
                      <NavMenuItemDropdown open={expanded} onClick={() => setSub(expanded ? null : it.label)}>
                        {it.label}
                      </NavMenuItemDropdown>
                    ) : (
                      <NavMenuItem mobile title={it.label} href={it.href} />
                    )}
                    {expanded && (isMenuContent(it.menu)
                      ? <MobileSubMenu content={it.menu} framed={!full} compact={full} />
                      : (it.menu as ReactNode))}
                  </li>
                );
              })}
            </ul>
            <div className="flex flex-col gap-8 px-4 py-6">
              {mobileFooterLinks.length > 0 && (
                <div className="grid grid-cols-2 gap-6">
                  {mobileFooterLinks.map((col, i) => (
                    <ul key={i} className="flex flex-col items-start gap-3">
                      {col.map((l, j) => (
                        <li key={j}>
                          <Button size="lg" hierarchy="link-gray" as={l.href ? 'a' : 'button'} href={l.href} onClick={l.onClick}>{l.label}</Button>
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              )}
              {mobileActions ?? <NavigationActions loggedIn={loggedIn} breakpoint="mobile" />}
            </div>
          </div>
        )}
      </div>
    </header>
  );
});
