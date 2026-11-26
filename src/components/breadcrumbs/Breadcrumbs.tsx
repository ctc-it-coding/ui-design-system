import { forwardRef, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ChevronRight, HomeLine, SlashDivider } from '../../icons';

export type BreadcrumbsDivider = 'slash' | 'chevron';
export type BreadcrumbsType = 'text' | 'text-with-line' | 'button-brand' | 'button-gray';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Icon-only crumb (Figma Icon=True); `label` becomes the accessible name. */
  icon?: IconSlot;
}

export interface BreadcrumbsProps extends HTMLAttributes<HTMLElement> {
  /** Crumbs from root to current page. The last one is the current page. */
  items: BreadcrumbItem[];
  /** Figma: Divider */
  divider?: BreadcrumbsDivider;
  /** Figma: Type */
  type?: BreadcrumbsType;
  /** Prepends a home-icon crumb. Pass an href string or `true` (renders a button). */
  home?: boolean | string;
  /** Called when the home crumb is clicked. */
  onHomeClick?: (e: MouseEvent<HTMLElement>) => void;
  /** Max crumbs (excluding home) shown on desktop before middle ones collapse into "…". Default: no limit. */
  maxItems?: number;
  /** Figma: Breakpoint=Mobile — below `md` only the first & last crumbs stay visible, the rest collapse to "…". Default true. */
  collapseOnMobile?: boolean;
}

const crumbBase =
  'inline-flex shrink-0 items-center justify-center whitespace-nowrap text-sm font-medium outline-none transition-colors duration-100 ' +
  'focus-visible:ring-4';

const crumbStyle: Record<BreadcrumbsType, { idle: string; current: string; box: string; iconBox: string; ring: string }> = {
  text: {
    idle: 'text-gray-600 hover:text-gray-800',
    current: 'text-brand-700',
    box: 'rounded-sm',
    iconBox: 'rounded-sm',
    ring: 'focus-visible:ring-gray-400/14',
  },
  'text-with-line': {
    idle: 'text-gray-600 hover:text-gray-800',
    current: 'text-brand-700',
    box: 'rounded-sm',
    iconBox: 'rounded-sm',
    ring: 'focus-visible:ring-gray-400/14',
  },
  'button-brand': {
    idle: 'text-gray-600 hover:bg-brand-50 hover:text-brand-700',
    current: 'bg-brand-50 text-brand-700',
    box: 'h-7 rounded-md px-2 py-1',
    iconBox: 'size-7 rounded-md p-1',
    ring: 'focus-visible:ring-brand-500/24',
  },
  'button-gray': {
    idle: 'text-gray-600 hover:bg-gray-50 hover:text-gray-700',
    current: 'bg-gray-50 text-gray-700',
    box: 'h-7 rounded-md px-2 py-1',
    iconBox: 'size-7 rounded-md p-1',
    ring: 'focus-visible:ring-gray-400/14',
  },
};

type Entry =
  | { kind: 'item'; item: BreadcrumbItem; current: boolean; mobileHidden: boolean; desktopHidden: boolean }
  | { kind: 'ellipsis'; mobileOnly: boolean };

/**
 * Breadcrumbs — Figma "Breadcrumbs" (+ "_Breadcrumb button base").
 * Middle crumbs collapse into a "…" button (click to expand).
 */
export const Breadcrumbs = forwardRef<HTMLElement, BreadcrumbsProps>(function Breadcrumbs(
  {
    items,
    divider = 'chevron',
    type = 'text',
    home = false,
    onHomeClick,
    maxItems,
    collapseOnMobile = true,
    className,
    'aria-label': ariaLabel = 'Breadcrumb',
    ...props
  },
  ref,
) {
  const [expanded, setExpanded] = useState(false);
  const st = crumbStyle[type];
  const isButton = type === 'button-brand' || type === 'button-gray';
  const n = items.length;

  // Desktop collapse: keep first + last (maxItems - 1).
  const desktopCollapse = !expanded && maxItems !== undefined && n > maxItems && maxItems >= 2;
  const keepTail = desktopCollapse ? maxItems! - 1 : n;
  const mobileCollapse = !expanded && collapseOnMobile && n > 2;

  const entries: Entry[] = [];
  items.forEach((item, i) => {
    const middle = i > 0 && i < n - 1;
    const desktopHidden = desktopCollapse && i > 0 && i < n - keepTail;
    const mobileHidden = mobileCollapse && middle;
    if (i === 1) {
      if (desktopCollapse) entries.push({ kind: 'ellipsis', mobileOnly: false });
      else if (mobileCollapse) entries.push({ kind: 'ellipsis', mobileOnly: true });
    }
    entries.push({ kind: 'item', item, current: i === n - 1, mobileHidden, desktopHidden });
  });

  const homeItem: BreadcrumbItem | null = home
    ? { label: 'Home', icon: HomeLine, href: typeof home === 'string' ? home : undefined, onClick: onHomeClick }
    : null;

  const sep = () => (
    <span aria-hidden className="flex shrink-0 items-center text-gray-300">
      {divider === 'slash' ? <SlashDivider className="size-5" /> : <ChevronRight className="size-4" />}
    </span>
  );

  const renderCrumb = (item: BreadcrumbItem, current: boolean) => {
    const iconOnly = !!item.icon;
    const cls = cx(
      crumbBase,
      st.ring,
      iconOnly ? st.iconBox : st.box,
      current ? st.current : st.idle,
      iconOnly && !isButton && (current ? 'text-brand-700' : 'text-gray-500 hover:text-gray-600'),
      (item.href || item.onClick) && 'cursor-pointer',
    );
    const content = iconOnly ? renderIcon(item.icon, 'size-5') : item.label;
    const a11y = { 'aria-current': current ? ('page' as const) : undefined, 'aria-label': iconOnly && typeof item.label === 'string' ? item.label : undefined };
    if (item.href) return <a href={item.href} onClick={item.onClick} className={cls} {...a11y}>{content}</a>;
    if (item.onClick) return <button type="button" onClick={item.onClick} className={cls} {...a11y}>{content}</button>;
    return <span className={cls} {...a11y}>{content}</span>;
  };

  const gap = isButton ? 'gap-1.5 md:gap-2' : 'gap-2 md:gap-3';

  const list = (
    <ol className={cx('flex min-w-0 flex-wrap items-center', gap, type === 'text-with-line' && 'md:px-2')}>
      {homeItem && (
        <li className={cx('flex items-center', gap)}>
          {renderCrumb(homeItem, n === 0)}
          {n > 0 && sep()}
        </li>
      )}
      {entries.map((e, idx) => {
        if (e.kind === 'ellipsis') {
          return (
            <li key={`e${idx}`} className={cx('flex items-center', gap, e.mobileOnly && 'md:hidden')}>
              <button
                type="button"
                aria-label="Show all breadcrumbs"
                onClick={() => setExpanded(true)}
                className={cx(crumbBase, st.ring, st.box, st.idle, 'cursor-pointer', !isButton && 'px-0')}
              >
                …
              </button>
              {sep()}
            </li>
          );
        }
        const hidden = cx(e.mobileHidden && 'max-md:hidden', e.desktopHidden && 'md:hidden', e.desktopHidden && mobileCollapse && 'hidden');
        return (
          <li key={idx} className={cx('flex items-center', gap, hidden)}>
            {renderCrumb(e.item, e.current)}
            {!e.current && sep()}
          </li>
        );
      })}
    </ol>
  );

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cx(type === 'text-with-line' && 'border-y border-gray-200 py-2', className)}
      {...props}
    >
      {list}
    </nav>
  );
});
