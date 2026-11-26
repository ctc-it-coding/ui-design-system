import {
  forwardRef,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
} from 'react';
import { ArrowDown, ArrowRight, ArrowUp, CornerDownLeft, HelpCircle, SearchLg } from '../../icons';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { Avatar } from '../avatars/Avatar';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { EmptyState } from '../empty-state/EmptyState';
import { Overlay, useControllableState } from '../modals/overlay';

export type CommandMenuSize = 'sm' | 'md';
export type CommandMenuText = 'default' | 'stacked';

export interface CommandItem {
  id: string;
  /** Main text (used for filtering when it is a string). */
  label: ReactNode;
  /** Secondary text: inline (Text=Default) or below (Text=Stacked). */
  supportingText?: ReactNode;
  /** Extra search terms. */
  keywords?: string[];
  /** Figma Type=Icon leading (featured icon when stacked). */
  icon?: IconSlot;
  /** Figma Type=Avatar leading. */
  avatarSrc?: string;
  avatarInitials?: string;
  /** Figma Type=Dot leading. `true` = success-500; or pass a Tailwind bg class, e.g. "bg-gray-300". */
  dot?: boolean | string;
  /** Figma "_Command shortcut": one key ("⌘C") or two keys for the dual "⌘K then C" form. */
  shortcut?: string | [string, string];
  disabled?: boolean;
  onSelect?: () => void;
}

export interface CommandSection {
  id: string;
  /** Figma "_Command menu header" text, e.g. "Recent". */
  label?: ReactNode;
  items: CommandItem[];
}

export interface CommandMenuPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  sections: CommandSection[];
  /** Figma: Size */
  size?: CommandMenuSize;
  /** Figma: Text (Default / Stacked) */
  text?: CommandMenuText;
  placeholder?: string;
  /** Controlled query. */
  query?: string;
  defaultQuery?: string;
  onQueryChange?: (q: string) => void;
  /** Custom filter; default matches label / supportingText / keywords (case-insensitive). */
  filter?: (item: CommandItem, query: string) => boolean;
  /** Called with the chosen item (after `item.onSelect`). */
  onSelect?: (item: CommandItem) => void;
  /** Shortcut hint on the right of the input. Default "⌘K"; `null` hides it. */
  inputShortcut?: string | null;
  /** Shows the help-circle icon in the input. Default true. */
  helpIcon?: boolean;
  /** Content for an empty result list (defaults to a small Empty state). */
  emptyState?: ReactNode;
  /** Show the "_Command bar footer" navigation hints. Default true. */
  footer?: boolean;
  /** Trailing node in the footer (e.g. a tertiary icon button). */
  footerAction?: ReactNode;
  /** Right-hand preview pane (Figma "Users menu" / "Integrations menu"); receives the active item. */
  preview?: (item: CommandItem | null) => ReactNode;
  /** Max height of the results list. Default 400px. */
  listMaxHeight?: number;
  /** Auto-focus the input on mount. Default true. */
  autoFocus?: boolean;
}

function itemText(n: ReactNode): string {
  return typeof n === 'string' || typeof n === 'number' ? String(n) : '';
}
const defaultFilter = (item: CommandItem, q: string) => {
  const hay = [itemText(item.label), itemText(item.supportingText), ...(item.keywords ?? [])].join(' ').toLowerCase();
  return q
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((w) => hay.includes(w));
};

/* ---------------------------- small parts ---------------------------- */

function Key({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-6 min-w-6 items-center justify-center rounded-sm border border-gray-200 bg-gray-50 px-1 font-sans text-sm text-gray-600">
      {children}
    </kbd>
  );
}

/** CommandShortcut — Figma "_Command shortcut" (Dual=False / True). */
export function CommandShortcut({ keys, className }: { keys: string | [string, string]; className?: string }) {
  if (typeof keys === 'string')
    return (
      <span className={cx('flex shrink-0 items-center', className)}>
        <Key>{keys}</Key>
      </span>
    );
  return (
    <span className={cx('flex shrink-0 items-center gap-1 text-sm text-gray-500', className)}>
      <Key>{keys[0]}</Key>
      <span>then</span>
      <ArrowRight className="size-4 text-gray-400" />
      <Key>{keys[1]}</Key>
    </span>
  );
}

function NavKey({ children, text }: { children: ReactNode; text?: boolean }) {
  return (
    <span
      className={cx(
        'flex h-7 items-center justify-center rounded-lg border border-gray-200 bg-white text-sm font-semibold text-gray-500',
        text ? 'px-1.5' : 'w-7',
      )}
    >
      {children}
    </span>
  );
}

/** CommandBarFooter — Figma "_Command bar footer" with navigation hints. */
export function CommandBarFooter({ action, className }: { action?: ReactNode; className?: string }) {
  return (
    <div className={cx('flex items-center gap-3 border-t border-gray-200 bg-white/80 py-2 pr-2 pl-[18px] backdrop-blur-sm', className)}>
      <div className="flex min-h-9 flex-1 flex-wrap items-center gap-x-4 gap-y-2 text-sm font-semibold text-gray-500">
        <span className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <NavKey>
              <ArrowUp className="size-4 text-gray-400" />
            </NavKey>
            <NavKey>
              <ArrowDown className="size-4 text-gray-400" />
            </NavKey>
          </span>
          to navigate
        </span>
        <span className="flex items-center gap-2">
          <NavKey>
            <CornerDownLeft className="size-4 text-gray-400" />
          </NavKey>
          to select
        </span>
        <span className="flex items-center gap-2">
          <NavKey text>esc</NavKey>
          to close
        </span>
      </div>
      {action}
    </div>
  );
}

interface ItemRowProps {
  item: CommandItem;
  size: CommandMenuSize;
  text: CommandMenuText;
  active: boolean;
  id: string;
  onHover: () => void;
  onChoose: () => void;
}

/** CommandMenuItem — Figma "_Command dropdown menu item". */
function CommandMenuItem({ item, size, text, active, id, onHover, onChoose }: ItemRowProps) {
  const stacked = text === 'stacked';
  const md = size === 'md';
  let leading: ReactNode = null;
  if (item.avatarSrc || item.avatarInitials)
    leading = <Avatar size={stacked ? (md ? 'lg' : 'md') : 'xs'} src={item.avatarSrc} initials={item.avatarInitials} alt="" />;
  else if (item.icon)
    leading = stacked ? (
      <FeaturedIcon icon={item.icon} size="md" color="gray" theme="modern" />
    ) : (
      renderIcon(item.icon, 'size-5 shrink-0 text-gray-500')
    );
  const dot = item.dot ? (
    <span className={cx('size-2.5 shrink-0 rounded-full', typeof item.dot === 'string' ? item.dot : 'bg-success-500', stacked && 'absolute top-[17px] left-3.5')} />
  ) : null;

  return (
    <div className="px-2 py-0.5" role="presentation">
      <div
        id={id}
        role="option"
        aria-selected={active}
        aria-disabled={item.disabled || undefined}
        onMouseMove={item.disabled ? undefined : onHover}
        onMouseDown={(e) => e.preventDefault()}
        onClick={item.disabled ? undefined : onChoose}
        className={cx(
          'relative flex cursor-pointer items-center rounded-lg transition-colors duration-75 select-none',
          md && stacked ? 'gap-3' : 'gap-2',
          !md && !stacked ? 'py-2 pr-2 pl-2.5' : 'py-2.5 pr-2.5 pl-3.5',
          stacked && item.dot && 'pl-8',
          stacked && 'items-start',
          active && 'bg-gray-50',
          item.disabled && 'cursor-not-allowed opacity-50',
        )}
      >
        {!stacked && dot}
        {stacked && dot}
        {leading}
        {stacked ? (
          <div className={cx('flex min-w-0 flex-1 flex-col self-center', md ? 'text-md' : 'text-sm')}>
            <span className="truncate font-medium text-gray-900">{item.label}</span>
            {item.supportingText != null && <span className="truncate text-gray-600">{item.supportingText}</span>}
          </div>
        ) : (
          <div className={cx('flex min-w-0 flex-1 items-baseline gap-2', md ? 'text-md' : 'text-sm')}>
            <span className="truncate text-gray-900">{item.label}</span>
            {item.supportingText != null && <span className="truncate text-gray-600">{item.supportingText}</span>}
          </div>
        )}
        {item.shortcut && <CommandShortcut keys={item.shortcut} className={cx(stacked && 'self-center')} />}
      </div>
    </div>
  );
}

/* ---------------------------- panel ---------------------------- */

/**
 * CommandMenuPanel — Figma "Command bar" box without the overlay: search input, filtered sections,
 * keyboard navigation (↑ ↓ Home End Enter), empty state and footer hints.
 */
export const CommandMenuPanel = forwardRef<HTMLDivElement, CommandMenuPanelProps>(function CommandMenuPanel(
  {
    sections,
    size = 'sm',
    text = 'default',
    placeholder = 'Search',
    query: queryProp,
    defaultQuery = '',
    onQueryChange,
    filter = defaultFilter,
    onSelect,
    inputShortcut = '⌘K',
    helpIcon = true,
    emptyState,
    footer = true,
    footerAction,
    preview,
    listMaxHeight = 400,
    autoFocus = true,
    className,
    ...props
  },
  ref,
) {
  const [query, setQuery] = useControllableState(queryProp, defaultQuery, onQueryChange);
  const uid = useId();
  const listId = `${uid}-list`;
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim();
    return sections
      .map((s) => ({ ...s, items: q ? s.items.filter((i) => filter(i, q)) : s.items }))
      .filter((s) => s.items.length > 0);
  }, [sections, query, filter]);
  const flat = useMemo(() => filtered.flatMap((s) => s.items.filter((i) => !i.disabled)), [filtered]);

  const [activeId, setActiveId] = useState<string | null>(null);
  useEffect(() => {
    if (!flat.some((i) => i.id === activeId)) setActiveId(flat[0]?.id ?? null);
  }, [flat, activeId]);
  const activeItem = flat.find((i) => i.id === activeId) ?? null;
  const domId = (id: string) => `${uid}-opt-${id}`;

  useEffect(() => {
    if (!activeId) return;
    const el = document.getElementById(domId(activeId));
    el?.scrollIntoView({ block: 'nearest' });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId]);

  const choose = (item: CommandItem) => {
    item.onSelect?.();
    onSelect?.(item);
  };
  const move = (delta: number) => {
    if (flat.length === 0) return;
    const idx = flat.findIndex((i) => i.id === activeId);
    const next = (idx + delta + flat.length) % flat.length;
    setActiveId(flat[next].id);
  };
  const onKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      move(1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      move(-1);
    } else if (e.key === 'Home' && flat.length) {
      e.preventDefault();
      setActiveId(flat[0].id);
    } else if (e.key === 'End' && flat.length) {
      e.preventDefault();
      setActiveId(flat[flat.length - 1].id);
    } else if (e.key === 'Enter' && activeItem) {
      e.preventDefault();
      choose(activeItem);
    }
  };

  const hasResults = filtered.length > 0;
  const showList = hasResults || query.trim().length > 0;
  const headerPad = size === 'md' ? 'px-[22px]' : 'px-[18px]';

  const list = (
    <div
      ref={listRef}
      id={listId}
      role="listbox"
      aria-label="Results"
      className="overflow-y-auto overscroll-contain"
      style={{ maxHeight: listMaxHeight }}
    >
      {filtered.map((s, si) => (
        <div
          key={s.id}
          role="group"
          aria-labelledby={s.label ? `${uid}-sec-${s.id}` : undefined}
          className={cx('flex flex-col gap-0.5 py-4', si < filtered.length - 1 && 'border-b border-gray-200')}
        >
          {s.label && (
            <div id={`${uid}-sec-${s.id}`} className={cx('text-sm font-medium text-gray-600', headerPad)}>
              {s.label}
            </div>
          )}
          <div className="flex flex-col">
            {s.items.map((item) => (
              <CommandMenuItem
                key={item.id}
                id={domId(item.id)}
                item={item}
                size={size}
                text={text}
                active={item.id === activeId}
                onHover={() => setActiveId(item.id)}
                onChoose={() => choose(item)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      ref={ref}
      className={cx('flex w-full max-w-[640px] flex-col overflow-hidden rounded-xl bg-white shadow-xl', className)}
      {...props}
    >
      <div className={cx('flex items-center gap-2 bg-white p-4', showList && 'border-b border-gray-200')}>
        <SearchLg className="size-5 shrink-0 text-gray-500" />
        <input
          role="combobox"
          aria-expanded={hasResults}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeId ? domId(activeId) : undefined}
          autoFocus={autoFocus}
          data-autofocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          className="min-w-0 flex-1 bg-transparent text-md text-gray-900 outline-none placeholder:text-gray-500"
        />
        {helpIcon && <HelpCircle className="size-4 shrink-0 text-gray-400" aria-hidden />}
        {inputShortcut && <CommandShortcut keys={inputShortcut} />}
      </div>
      {showList &&
        (hasResults ? (
          preview ? (
            <div className="flex min-h-0">
              <div className={cx('shrink-0 border-r border-gray-200', text === 'stacked' ? 'w-[320px]' : 'w-[280px]')}>{list}</div>
              <div className="flex min-w-0 flex-1 flex-col">{preview(activeItem)}</div>
            </div>
          ) : (
            list
          )
        ) : (
          <div className="px-6 pt-6 pb-10">
            {emptyState ?? (
              <EmptyState
                size="sm"
                iconType="featured-icon"
                icon={SearchLg}
                title="No results found"
                description={`Your search “${query}” did not match any results. Please try again.`}
              />
            )}
          </div>
        ))}
      {footer && hasResults && <CommandBarFooter action={footerAction} />}
    </div>
  );
});

/* ---------------------------- overlay ---------------------------- */

export interface CommandMenuProps extends CommandMenuPanelProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Toggle with ⌘K / Ctrl+K globally. Default false. */
  hotkey?: boolean;
  /** Close after an item is chosen. Default true. */
  closeOnSelect?: boolean;
}

/** CommandMenu — Figma "Command bar" in a modal overlay (positioned slightly above centre). */
export function CommandMenu({
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  hotkey = false,
  closeOnSelect = true,
  onSelect,
  className,
  ...panel
}: CommandMenuProps) {
  const [open, setOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  useEffect(() => {
    if (!hotkey) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [hotkey, open, setOpen]);

  return (
    <Overlay
      open={open}
      onClose={() => setOpen(false)}
      positionClassName="flex min-h-full items-start justify-center px-4 pt-4 pb-24 sm:items-center sm:px-8 sm:pt-8"
    >
      {({ visible }) => (
        <CommandMenuPanel
          role="dialog"
          aria-modal="true"
          aria-label="Command menu"
          className={cx('transition duration-200 ease-out', visible ? 'scale-100 opacity-100' : 'scale-95 opacity-0', className)}
          onSelect={(item) => {
            onSelect?.(item);
            if (closeOnSelect) setOpen(false);
          }}
          {...panel}
        />
      )}
    </Overlay>
  );
}
