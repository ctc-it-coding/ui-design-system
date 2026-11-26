import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { Badge } from '../badges/Badge';
import { ChevronDown } from '../../icons';

/* ------------------------------------------------------------------ */
/* Shared types + state                                                 */
/* ------------------------------------------------------------------ */

export interface TabItem {
  /** Unique id/value of the tab. */
  id: string;
  /** Tab label. */
  label: ReactNode;
  /** Figma: Badge=True — count/label shown in a pill badge after the text. */
  badge?: ReactNode;
  /** Optional icon before the label. */
  icon?: IconSlot;
  disabled?: boolean;
}

interface TabsContextValue {
  baseId: string;
  selected: string | undefined;
}
const TabsContext = createContext<TabsContextValue | null>(null);

export const tabId = (baseId: string, id: string) => `${baseId}-tab-${id}`;
export const panelId = (baseId: string, id: string) => `${baseId}-panel-${id}`;

/** Internal: controlled/uncontrolled selected tab + roving-focus keyboard handling. */
export function useTabsState(
  items: TabItem[],
  value: string | undefined,
  defaultValue: string | undefined,
  onChange: ((id: string) => void) | undefined,
  orientation: 'horizontal' | 'vertical',
) {
  const [inner, setInner] = useState<string | undefined>(defaultValue ?? items.find((i) => !i.disabled)?.id);
  const selected = value !== undefined ? value : inner;
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const select = useCallback(
    (id: string) => {
      if (value === undefined) setInner(id);
      onChange?.(id);
    },
    [value, onChange],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    const enabled = items.filter((i) => !i.disabled);
    if (!enabled.length) return;
    const idx = enabled.findIndex((i) => i.id === selected);
    const prevKey = orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
    let next: TabItem | undefined;
    if (e.key === nextKey) next = enabled[(idx + 1) % enabled.length];
    else if (e.key === prevKey) next = enabled[(idx - 1 + enabled.length) % enabled.length];
    else if (e.key === 'Home') next = enabled[0];
    else if (e.key === 'End') next = enabled[enabled.length - 1];
    if (!next) return;
    e.preventDefault();
    select(next.id);
    refs.current[next.id]?.focus();
  };

  return { selected, select, refs, onKeyDown };
}

/** Provides selected-tab context to `<TabPanel>` children. */
export function TabsProvider({ baseId, selected, children }: TabsContextValue & { children?: ReactNode }) {
  return <TabsContext.Provider value={{ baseId, selected }}>{children}</TabsContext.Provider>;
}

/* ------------------------------------------------------------------ */
/* Tab button base (Figma "_Tab button base")                           */
/* ------------------------------------------------------------------ */

export type TabButtonType =
  | 'button-primary'
  | 'button-gray'
  | 'button-white'
  | 'underline'
  | 'underline-filled'
  | 'line';
export type TabsSize = 'sm' | 'md';

const tabBase =
  'group/tab relative inline-flex shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap font-medium outline-none transition-colors duration-100 ' +
  'disabled:cursor-not-allowed disabled:opacity-50';

const tabSize: Record<TabButtonType, Record<TabsSize, string>> = {
  'button-primary': { sm: 'h-9 rounded-md px-3 py-2 text-sm', md: 'h-11 rounded-md px-3 py-2 text-sm' },
  'button-gray': { sm: 'h-9 rounded-md px-3 py-2 text-sm', md: 'h-11 rounded-md px-3 py-2 text-sm' },
  'button-white': { sm: 'h-9 rounded-md px-3 py-2 text-sm', md: 'h-11 rounded-md px-3 py-2 text-md' },
  underline: { sm: 'h-8 px-1 pb-3 text-sm', md: 'h-9 px-1 pb-3 text-md' },
  'underline-filled': { sm: 'h-11 p-3 text-sm', md: 'h-12 p-3 text-md' },
  line: { sm: 'h-9 px-3 py-2 text-sm font-semibold', md: 'h-11 px-3.5 py-2 text-md font-semibold' },
};

const tabStyle: Record<TabButtonType, string> = {
  'button-primary':
    'text-gray-500 hover:bg-brand-50 hover:text-brand-700 aria-selected:bg-brand-50 aria-selected:text-brand-700 ' +
    'focus-visible:ring-4 focus-visible:ring-brand-500/24',
  'button-gray':
    'text-gray-500 hover:bg-gray-50 hover:text-gray-700 aria-selected:bg-gray-50 aria-selected:text-gray-700 ' +
    'focus-visible:ring-4 focus-visible:ring-gray-400/14',
  'button-white':
    'text-gray-500 hover:bg-white hover:text-gray-700 hover:shadow-sm aria-selected:bg-white aria-selected:text-gray-700 aria-selected:shadow-sm ' +
    'focus-visible:ring-4 focus-visible:ring-gray-400/14',
  underline:
    'border-b-2 border-transparent text-gray-500 hover:border-brand-600 hover:text-brand-700 ' +
    'aria-selected:border-brand-600 aria-selected:text-brand-700 focus-visible:rounded-t-sm focus-visible:ring-4 focus-visible:ring-brand-500/24',
  'underline-filled':
    'border-b-2 border-transparent text-gray-500 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-700 ' +
    'aria-selected:border-brand-600 aria-selected:bg-brand-50 aria-selected:text-brand-700 focus-visible:ring-4 focus-visible:ring-brand-500/24',
  line:
    'border-l-2 border-transparent text-gray-500 hover:border-brand-600 hover:text-brand-700 ' +
    'aria-selected:border-brand-600 aria-selected:text-brand-700 focus-visible:ring-4 focus-visible:ring-brand-500/24',
};

const brandBadgeWhenCurrent: Record<TabButtonType, boolean> = {
  'button-primary': true,
  'button-gray': false,
  'button-white': false,
  underline: true,
  'underline-filled': true,
  line: true,
};

export interface TabButtonProps {
  item: TabItem;
  type: TabButtonType;
  size: TabsSize;
  current: boolean;
  baseId: string;
  stretch?: boolean;
  justify?: 'center' | 'start';
  onSelect: (id: string) => void;
  buttonRef: (el: HTMLButtonElement | null) => void;
}

/** Internal tab button rendering (Figma "_Tab button base"). */
export function TabButton({ item, type, size, current, baseId, stretch, justify = 'center', onSelect, buttonRef }: TabButtonProps) {
  return (
    <button
      ref={buttonRef}
      type="button"
      role="tab"
      id={tabId(baseId, item.id)}
      aria-selected={current}
      aria-controls={panelId(baseId, item.id)}
      tabIndex={current ? 0 : -1}
      disabled={item.disabled}
      onClick={() => onSelect(item.id)}
      className={cx(
        tabBase,
        tabSize[type][size],
        tabStyle[type],
        justify === 'center' ? 'justify-center' : 'justify-start',
        stretch && 'flex-1',
      )}
    >
      {renderIcon(item.icon, 'size-5 shrink-0')}
      <span>{item.label}</span>
      {item.badge != null && item.badge !== false && (
        <Badge size={size === 'sm' ? 'sm' : 'md'} type="pill-color" color={current && brandBadgeWhenCurrent[type] ? 'brand' : 'gray'}>
          {item.badge}
        </Badge>
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Horizontal tabs                                                      */
/* ------------------------------------------------------------------ */

export type TabsType = 'button-primary' | 'button-gray' | 'button-white-border' | 'underline' | 'underline-filled';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Tabs to render. */
  items: TabItem[];
  /** Figma: Type */
  type?: TabsType;
  /** Figma: Size */
  size?: TabsSize;
  /** Figma: Full width — tabs stretch to fill the row. */
  fullWidth?: boolean;
  /** Selected tab id (controlled). */
  value?: string;
  /** Initially selected tab id (uncontrolled). */
  defaultValue?: string;
  /** Called with the newly selected tab id. */
  onChange?: (id: string) => void;
  /** Figma: Breakpoint=Mobile — below `md` render a native select instead of the tab row. */
  mobileSelect?: boolean;
  /** Accessible name of the tab list. */
  'aria-label'?: string;
  /** `<TabPanel>` elements; only the selected one is shown. */
  children?: ReactNode;
  /** Class name applied to the tab list element. */
  listClassName?: string;
}

const listStyle: Record<TabsType, Record<TabsSize, string>> = {
  'button-primary': { sm: 'gap-1', md: 'gap-1' },
  'button-gray': { sm: 'gap-1', md: 'gap-1' },
  'button-white-border': {
    sm: 'gap-1 rounded-[10px] border border-gray-200 bg-gray-50 p-1',
    md: 'gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1.5',
  },
  underline: { sm: 'gap-3 shadow-[inset_0_-1px_0_0_var(--color-gray-200)]', md: 'gap-3 shadow-[inset_0_-1px_0_0_var(--color-gray-200)]' },
  'underline-filled': {
    sm: 'gap-3 shadow-[inset_0_-1px_0_0_var(--color-gray-200)]',
    md: 'gap-3 shadow-[inset_0_-1px_0_0_var(--color-gray-200)]',
  },
};

const buttonTypeFor: Record<TabsType, TabButtonType> = {
  'button-primary': 'button-primary',
  'button-gray': 'button-gray',
  'button-white-border': 'button-white',
  underline: 'underline',
  'underline-filled': 'underline-filled',
};

/** Native select used for the Figma "Breakpoint=Mobile" tab variant. */
export function TabsMobileSelect({
  items,
  selected,
  onSelect,
  label,
  className,
}: {
  items: TabItem[];
  selected: string | undefined;
  onSelect: (id: string) => void;
  label?: string;
  className?: string;
}) {
  return (
    <div className={cx('relative w-full', className)}>
      <select
        aria-label={label ?? 'Select a tab'}
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="h-11 w-full cursor-pointer appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pr-10 pl-3.5 text-md font-medium text-gray-900 shadow-xs outline-none focus-visible:border-brand-300 focus-visible:ring-4 focus-visible:ring-brand-500/24"
      >
        {items.map((i) => (
          <option key={i.id} value={i.id} disabled={i.disabled}>
            {typeof i.label === 'string' ? i.label : i.id}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-5 -translate-y-1/2 text-gray-500" aria-hidden />
    </div>
  );
}

/**
 * Tabs — Figma "Horizontal tabs" (+ "_Tab button base").
 * Accessible tablist with arrow-key / Home / End navigation. Put `<TabPanel id>` elements in `children`.
 */
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  {
    items,
    type = 'button-primary',
    size = 'sm',
    fullWidth = false,
    value,
    defaultValue,
    onChange,
    mobileSelect = false,
    children,
    className,
    listClassName,
    'aria-label': ariaLabel,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const baseId = id ?? autoId.replace(/:/g, '');
  const { selected, select, refs, onKeyDown } = useTabsState(items, value, defaultValue, onChange, 'horizontal');
  const btnType = buttonTypeFor[type];

  return (
    <TabsProvider baseId={baseId} selected={selected}>
      <div ref={ref} className={cx('flex flex-col gap-6', className)} {...props}>
        {mobileSelect && <TabsMobileSelect className="md:hidden" items={items} selected={selected} onSelect={select} label={ariaLabel} />}
        <div
          role="tablist"
          aria-orientation="horizontal"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          className={cx(
            'flex items-center',
            (type === 'underline' || type === 'underline-filled') && 'items-stretch',
            listStyle[type][size],
            fullWidth ? 'w-full' : type === 'button-white-border' ? 'w-fit max-w-full overflow-x-auto' : 'max-w-full overflow-x-auto',
            mobileSelect && 'max-md:hidden',
            listClassName,
          )}
        >
          {items.map((item) => (
            <TabButton
              key={item.id}
              item={item}
              type={btnType}
              size={size}
              current={item.id === selected}
              baseId={baseId}
              stretch={fullWidth}
              onSelect={select}
              buttonRef={(el) => {
                refs.current[item.id] = el;
              }}
            />
          ))}
        </div>
        {children}
      </div>
    </TabsProvider>
  );
});

/* ------------------------------------------------------------------ */
/* Tab panel                                                            */
/* ------------------------------------------------------------------ */

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Id of the tab this panel belongs to (matches `TabItem.id`). */
  id: string;
  /** Keep the panel mounted (hidden) when not selected. */
  keepMounted?: boolean;
}

/** TabPanel — content area for one tab; must be rendered inside `<Tabs>` or `<VerticalTabs>`. */
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(function TabPanel(
  { id, keepMounted = false, className, children, ...props },
  ref,
) {
  const ctx = useContext(TabsContext);
  if (!ctx) return null;
  const active = ctx.selected === id;
  if (!active && !keepMounted) return null;
  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId(ctx.baseId, id)}
      aria-labelledby={tabId(ctx.baseId, id)}
      hidden={!active}
      tabIndex={0}
      className={cx('outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24', className)}
      {...props}
    >
      {children}
    </div>
  );
});
