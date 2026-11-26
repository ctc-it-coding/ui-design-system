import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { NavItem } from './NavItem';
import { SidebarNavigation, type NavAccount } from './SidebarNavigation';
import { NavThemeContext, navItemId, type NavItemData, type NavTheme } from './navTheme';

export type HeaderNavigationStyle = 'simple' | 'dual-tier';

export interface HeaderNavigationProps extends Omit<HTMLAttributes<HTMLElement>, 'style'> {
  /** Figma: Style */
  variant?: HeaderNavigationStyle;
  /** Figma: Theme */
  theme?: NavTheme;
  /** Logo area. */
  logo?: ReactNode;
  /** Top-level items. In Dual-tier, the active item's `items` fill the second row. */
  items: NavItemData[];
  /** Call-to-action slot left of the icon actions (e.g. an "Upgrade now" button). */
  cta?: ReactNode;
  /** Icon actions slot (e.g. `<NavItemButton icon={Bell01} label="Notifications" />`). */
  actions?: ReactNode;
  /** Avatar / account dropdown slot at the far right. */
  avatar?: ReactNode;
  /** Dual-tier: search slot on the right of the second row. Also shown in the mobile drawer. */
  search?: ReactNode;
  /** Active top-level item (Dual-tier, controlled). */
  activeItemId?: string;
  defaultActiveItemId?: string;
  onActiveItemChange?: (id: string) => void;
  /** Mobile drawer: footer items and account. */
  mobileFooterItems?: NavItemData[];
  mobileAccount?: NavAccount;
  /** Figma: Open (Breakpoint=Mobile) — mobile menu open (controlled). */
  mobileOpen?: boolean;
  defaultMobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  /** `responsive` (default): header from `lg`, mobile bar + drawer below. */
  layout?: 'responsive' | 'desktop' | 'mobile';
  drawerPosition?: 'fixed' | 'absolute';
  /** Max width of the inner container (default 1280px). */
  containerClassName?: string;
}

const bar: Record<NavTheme, { bg: string; border: string }> = {
  default: { bg: 'bg-white', border: 'border-gray-200' },
  brand: { bg: 'bg-brand-700', border: 'border-brand-600' },
  dark: { bg: 'bg-gray-950', border: 'border-gray-600' },
};

/** HeaderNavigation — Figma "Application navigation/Header navigation" (Simple / Dual-tier). */
export const HeaderNavigation = forwardRef<HTMLElement, HeaderNavigationProps>(function HeaderNavigation(
  {
    variant = 'simple',
    theme = 'default',
    logo,
    items,
    cta,
    actions,
    avatar,
    search,
    activeItemId,
    defaultActiveItemId,
    onActiveItemChange,
    mobileFooterItems,
    mobileAccount,
    mobileOpen,
    defaultMobileOpen,
    onMobileOpenChange,
    layout = 'responsive',
    drawerPosition = 'fixed',
    containerClassName,
    className,
    'aria-label': ariaLabel = 'Main',
    ...props
  },
  ref,
) {
  const b = bar[theme];
  const initial =
    defaultActiveItemId ?? (() => {
      const i = items.findIndex((it) => it.current || it.items?.some((c) => c.current));
      return i >= 0 ? navItemId(items[i], i) : undefined;
    })();
  const [inner, setInner] = useState(initial);
  const activeId = activeItemId ?? inner;
  const activate = (id: string) => {
    if (activeItemId === undefined) setInner(id);
    onActiveItemChange?.(id);
  };
  const activeIdx = items.findIndex((it, i) => navItemId(it, i) === activeId);
  const subItems = variant === 'dual-tier' && activeIdx >= 0 ? items[activeIdx].items : undefined;

  const showDesktop = layout === 'responsive' ? 'max-lg:hidden' : layout === 'mobile' ? 'hidden' : '';
  const container = cx('mx-auto flex w-full max-w-[1280px] items-center px-8', containerClassName);

  const desktop = (
    <div className={cx(b.bg, 'border-b', b.border, showDesktop)}>
      <div className={cx(variant === 'dual-tier' && cx('border-b', b.border))}>
        <div className={cx(container, 'h-[72px] justify-between gap-4')}>
          <div className="flex min-w-0 items-center gap-4">
            {logo != null && <div className="flex shrink-0 items-center">{logo}</div>}
            <ul className="flex min-w-0 items-center gap-1 overflow-x-auto">
              {items.map((it, i) => {
                const id = navItemId(it, i);
                const current = variant === 'dual-tier' && it.items?.length ? activeId === id : !!it.current;
                return (
                  <li key={id}>
                    <NavItem
                      compact
                      theme={theme}
                      current={current}
                      href={it.href}
                      badge={it.badge}
                      dot={it.dot}
                      onClick={(e) => {
                        if (it.items?.length) activate(id);
                        it.onClick?.(e);
                      }}
                    >
                      {it.label}
                    </NavItem>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            {cta}
            {actions != null && <div className="flex items-center gap-1">{actions}</div>}
            {avatar}
          </div>
        </div>
      </div>
      {variant === 'dual-tier' && (subItems?.length || search != null) && (
        <div className={cx(container, 'h-16 gap-8')}>
          <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
            {(subItems ?? []).map((it, i) => (
              <li key={navItemId(it, i)}>
                <NavItem compact theme={theme} current={it.current} href={it.href} onClick={it.onClick} badge={it.badge} dot={it.dot}>
                  {it.label}
                </NavItem>
              </li>
            ))}
          </ul>
          {search != null && <div className="w-80 shrink-0">{search}</div>}
        </div>
      )}
    </div>
  );

  return (
    <NavThemeContext.Provider value={theme}>
      <header ref={ref} className={className} {...props}>
        <nav aria-label={ariaLabel}>{desktop}</nav>
        {layout !== 'desktop' && (
          <SidebarNavigation
            layout="mobile"
            className={layout === 'responsive' ? 'lg:hidden' : undefined}
            theme={theme}
            logo={logo}
            search={search}
            items={items}
            footerItems={mobileFooterItems}
            account={mobileAccount}
            mobileOpen={mobileOpen}
            defaultMobileOpen={defaultMobileOpen}
            onMobileOpenChange={onMobileOpenChange}
            drawerPosition={drawerPosition}
            aria-label={ariaLabel}
          />
        )}
      </header>
    </NavThemeContext.Provider>
  );
});
