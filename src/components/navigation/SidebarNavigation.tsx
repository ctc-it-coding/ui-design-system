import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { LogOut01 } from '../../icons';
import { Avatar } from '../avatars/Avatar';
import { NavItem, NavItemDropdown } from './NavItem';
import { NavItemButton, NavMenuButton } from './NavItemButton';
import { NavThemeContext, navItemId, navSurface, type NavItemData, type NavTheme } from './navTheme';

export type SidebarNavigationStyle = 'simple' | 'slim' | 'dual-tier';

export interface NavAccount {
  name: ReactNode;
  email?: ReactNode;
  avatarSrc?: string;
  initials?: string;
  /** Shows the log-out icon button. */
  onLogout?: () => void;
  /** Replaces the log-out button with custom content (e.g. a dropdown menu trigger). */
  action?: ReactNode;
}

export interface SidebarNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  /** Figma: Style */
  variant?: SidebarNavigationStyle;
  /** Figma: Theme */
  theme?: NavTheme;
  /** Logo area (full logo). */
  logo?: ReactNode;
  /** Small logomark for the Slim rail (falls back to `logo`). */
  logomark?: ReactNode;
  /** Search slot (e.g. `<Input iconLeading={SearchLg} placeholder="Search" />`). Not shown in the Slim rail. */
  search?: ReactNode;
  /** Main navigation items. Items with `items` become dropdowns (Simple) or open the sub-nav panel (Slim / Dual-tier). */
  items: NavItemData[];
  /** Footer items (e.g. Support, Settings). */
  footerItems?: NavItemData[];
  /** Featured card slot (e.g. `<NavFeaturedCard />`). Desktop only, not in Slim. */
  featuredCard?: ReactNode;
  /** Footer user account. */
  account?: NavAccount;
  /** Item whose children fill the sub-nav panel (Slim / Dual-tier, controlled). */
  activeItemId?: string;
  /** Initial active item (uncontrolled; defaults to the current item). */
  defaultActiveItemId?: string;
  onActiveItemChange?: (id: string) => void;
  /** Figma: Open (Breakpoint=Mobile) — mobile drawer open (controlled). */
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** `responsive` (default): sidebar from `lg`, mobile top bar + drawer below. `desktop` / `mobile` force one layout. */
  layout?: 'responsive' | 'desktop' | 'mobile';
  /** Positioning of the mobile drawer overlay; `absolute` keeps it inside a relative container (useful in previews). */
  drawerPosition?: 'fixed' | 'absolute';
}

const logoutStyles: Record<NavTheme, string> = {
  default: 'text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus-visible:ring-gray-400/14',
  brand: 'text-brand-200 hover:bg-brand-600 hover:text-white focus-visible:ring-brand-500/24',
  dark: 'text-gray-400 hover:bg-gray-800 hover:text-white focus-visible:ring-gray-400/14',
};

function AccountAction({ account, theme, className }: { account: NavAccount; theme: NavTheme; className?: string }) {
  if (account.action) return <div className={className}>{account.action}</div>;
  if (!account.onLogout) return null;
  return (
    <button
      type="button"
      aria-label="Log out"
      onClick={account.onLogout}
      className={cx(
        'inline-flex size-9 cursor-pointer items-center justify-center rounded-lg p-2 outline-none transition-colors duration-100 focus-visible:ring-4',
        logoutStyles[theme],
        className,
      )}
    >
      <LogOut01 className="size-5" />
    </button>
  );
}

/** Footer account block: avatar + name/email + log-out (Figma "Account"). */
function AccountBlock({ account, theme, withAvatar = true, className }: { account: NavAccount; theme: NavTheme; withAvatar?: boolean; className?: string }) {
  const s = navSurface[theme];
  return (
    <div className={className}>
      <div className="relative flex items-center gap-3 pr-10">
        {withAvatar && <Avatar size="md" src={account.avatarSrc} initials={account.initials} alt="" />}
        <div className="flex min-w-0 flex-col">
          <span className={cx('truncate text-sm font-semibold', s.name)}>{account.name}</span>
          {account.email != null && <span className={cx('truncate text-sm', s.email)}>{account.email}</span>}
        </div>
        <AccountAction account={account} theme={theme} className="absolute top-1/2 right-0 -translate-y-1/2" />
      </div>
    </div>
  );
}

function ItemList({ items, theme, dropdowns, onActivate, activeId, className }: {
  items: NavItemData[];
  theme: NavTheme;
  dropdowns: boolean;
  onActivate?: (id: string) => void;
  activeId?: string;
  className?: string;
}) {
  return (
    <ul className={cx('flex flex-col gap-1', className)}>
      {items.map((it, i) => {
        const id = navItemId(it, i);
        if (dropdowns && it.items?.length) {
          return (
            <li key={id}>
              <NavItemDropdown theme={theme} label={it.label} icon={it.icon} badge={it.badge} dot={it.dot} current={it.current} items={it.items} />
            </li>
          );
        }
        const current = onActivate && it.items?.length ? activeId === id || !!it.current : !!it.current;
        return (
          <li key={id}>
            <NavItem
              theme={theme}
              icon={it.icon}
              badge={it.badge}
              dot={it.dot}
              current={current}
              href={it.href}
              onClick={(e) => {
                if (onActivate && it.items?.length) onActivate(id);
                it.onClick?.(e);
              }}
            >
              {it.label}
            </NavItem>
          </li>
        );
      })}
    </ul>
  );
}

/**
 * SidebarNavigation — Figma "Application navigation/Sidebar navigation".
 * Styles Simple / Slim / Dual-tier, themes Default / Brand / Dark, with a mobile top bar + drawer.
 */
export const SidebarNavigation = forwardRef<HTMLElement, SidebarNavigationProps>(function SidebarNavigation(
  {
    variant = 'simple',
    theme = 'default',
    logo,
    logomark,
    search,
    items,
    footerItems = [],
    featuredCard,
    account,
    activeItemId,
    defaultActiveItemId,
    onActiveItemChange,
    mobileOpen: mobileOpenProp,
    defaultMobileOpen = false,
    onMobileOpenChange,
    layout = 'responsive',
    drawerPosition = 'fixed',
    className,
    'aria-label': ariaLabel = 'Main',
    ...props
  },
  ref,
) {
  const s = navSurface[theme];
  const initialActive =
    defaultActiveItemId ?? (() => {
      const idx = items.findIndex((it) => it.current || it.items?.some((c) => c.current));
      return idx >= 0 ? navItemId(items[idx], idx) : undefined;
    })();
  const [activeInner, setActiveInner] = useState<string | undefined>(initialActive);
  const activeId = activeItemId ?? activeInner;
  const activate = (id: string) => {
    if (activeItemId === undefined) setActiveInner(id);
    onActiveItemChange?.(id);
  };
  const activeIdx = items.findIndex((it, i) => navItemId(it, i) === activeId);
  const activeItem = activeIdx >= 0 ? items[activeIdx] : undefined;
  const subItems = activeItem?.items;

  const [mobileInner, setMobileInner] = useState(defaultMobileOpen);
  const mobileOpen = mobileOpenProp ?? mobileInner;
  const setMobileOpen = (v: boolean) => {
    if (mobileOpenProp === undefined) setMobileInner(v);
    onMobileOpenChange?.(v);
  };

  const panelRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    panelRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobileOpen]);

  const showDesktop = layout === 'responsive' ? 'max-lg:hidden' : layout === 'mobile' ? 'hidden' : '';
  const showMobile = layout === 'responsive' ? 'lg:hidden' : layout === 'desktop' ? 'hidden' : '';

  /* ---------------- desktop ---------------- */
  const header = (px: string) => logo != null && <div className={cx('flex items-center', px)}>{logo}</div>;

  const mainColumn = (width: string, dropdowns: boolean, withBorder: boolean) => (
    <div className={cx('flex h-full shrink-0 flex-col justify-between overflow-y-auto', width, withBorder && cx('border-r', s.border))}>
      <div className="flex flex-col gap-6 pt-8 pb-8">
        {header('pr-5 pl-6')}
        {search != null && <div className="px-6">{search}</div>}
        <ItemList
          className="px-4"
          items={items}
          theme={theme}
          dropdowns={dropdowns}
          onActivate={dropdowns ? undefined : activate}
          activeId={activeId}
        />
      </div>
      <div className="flex flex-col gap-6 px-4 pb-8">
        {footerItems.length > 0 && <ItemList items={footerItems} theme={theme} dropdowns={dropdowns} />}
        {featuredCard}
        {account && <AccountBlock account={account} theme={theme} className={cx('border-t pt-6 pl-2', s.divider)} />}
      </div>
    </div>
  );

  let desktop: ReactNode;
  if (variant === 'simple') {
    desktop = <div className={cx('flex h-full', s.bg, theme === 'default' && cx('border-r', s.border))}>{mainColumn('w-[312px]', true, false)}</div>;
  } else if (variant === 'dual-tier') {
    const open = !!subItems?.length;
    desktop = (
      <div className={cx('flex h-full', s.bg, theme === 'default' && cx('border-r', s.border))}>
        {mainColumn('w-[280px]', false, open && theme === 'default')}
        {open && (
          <div className={cx('flex h-full w-[248px] shrink-0 flex-col overflow-y-auto px-4 pt-8 pb-4', s.subBg)}>
            <ItemList items={subItems!} theme={theme} dropdowns={false} />
          </div>
        )}
      </div>
    );
  } else {
    const open = !!subItems?.length;
    desktop = (
      <div className={cx('flex h-full', s.bg, theme === 'default' && cx('border-r', s.border))}>
        <div className={cx('flex h-full w-20 shrink-0 flex-col justify-between', open && theme === 'default' && cx('border-r', s.border))}>
          <div className="flex flex-col items-center gap-6 pt-8">
            {(logomark ?? logo) != null && <div className="flex size-8 items-center justify-center">{logomark ?? logo}</div>}
            <ul className="flex flex-col gap-2 px-4">
              {items.map((it, i) => {
                const id = navItemId(it, i);
                return (
                  <li key={id}>
                    <NavItemButton
                      theme={theme}
                      size="lg"
                      icon={it.icon}
                      label={typeof it.label === 'string' ? it.label : id}
                      tooltip
                      current={it.items?.length ? activeId === id : !!it.current}
                      href={it.href}
                      onClick={(e) => {
                        if (it.items?.length) activate(id);
                        it.onClick?.(e);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex flex-col items-center gap-6 px-4 pb-6">
            {footerItems.length > 0 && (
              <ul className="flex flex-col gap-2">
                {footerItems.map((it, i) => (
                  <li key={navItemId(it, i)}>
                    <NavItemButton
                      theme={theme}
                      size="lg"
                      icon={it.icon}
                      label={typeof it.label === 'string' ? it.label : navItemId(it, i)}
                      tooltip
                      current={it.current}
                      href={it.href}
                      onClick={it.onClick}
                    />
                  </li>
                ))}
              </ul>
            )}
            {account && <Avatar size="lg" src={account.avatarSrc} initials={account.initials} alt={typeof account.name === 'string' ? account.name : ''} />}
          </div>
        </div>
        {open && (
          <div className={cx('flex h-full w-[282px] shrink-0 flex-col justify-between overflow-y-auto', s.subBg)}>
            <div className="flex flex-col gap-4 px-4 py-9">
              <p className={cx('px-0 text-md font-medium', s.title)}>{activeItem?.label}</p>
              <ItemList items={subItems!} theme={theme} dropdowns={false} />
            </div>
            {account && <AccountBlock account={account} theme={theme} withAvatar={false} className="pr-12 pb-6 pl-5" />}
          </div>
        )}
      </div>
    );
  }

  /* ---------------- mobile ---------------- */
  const Pos = drawerPosition === 'fixed' ? 'fixed' : 'absolute';
  const mobile = (
    <div className={showMobile}>
      <div className={cx('flex h-16 items-center justify-between py-3 pr-2 pl-4', s.mobileBar)}>
        <div className="flex items-center">{logo}</div>
        <NavMenuButton theme={theme} open={false} onClick={() => setMobileOpen(true)} aria-expanded={mobileOpen} />
      </div>
      {mobileOpen && (
        <div className={cx(Pos, 'inset-0 z-50 flex')} role="dialog" aria-modal="true" aria-label={ariaLabel}>
          <div className="absolute inset-0 bg-gray-950/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} aria-hidden />
          <div
            ref={panelRef}
            tabIndex={-1}
            className={cx('relative flex outline-none h-full w-[311px] max-w-[calc(100%-64px)] flex-col justify-between overflow-y-auto shadow-xl', s.bg)}
          >
            <div className="flex flex-col gap-5 py-4">
              {header('px-4')}
              {search != null && <div className="px-4">{search}</div>}
              <ItemList className="px-2" items={items} theme={theme} dropdowns />
            </div>
            <div className="flex flex-col gap-5 px-2 pb-6">
              {footerItems.length > 0 && <ItemList items={footerItems} theme={theme} dropdowns />}
              {account && <AccountBlock account={account} theme={theme} className={cx('border-t pt-6 pl-2', s.divider)} />}
            </div>
          </div>
          <NavMenuButton theme={theme} open onClick={() => setMobileOpen(false)} className="absolute top-3 right-2" />
        </div>
      )}
    </div>
  );

  return (
    <NavThemeContext.Provider value={theme}>
      <nav ref={ref} aria-label={ariaLabel} className={cx('lg:h-full', layout === 'desktop' && 'h-full', className)} {...props}>
        <div className={cx('h-full', showDesktop)}>{desktop}</div>
        {mobile}
      </nav>
    </NavThemeContext.Provider>
  );
});
