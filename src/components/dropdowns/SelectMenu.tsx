import { useEffect, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { Check } from '../../icons';
import { Avatar } from '../avatars/Avatar';
import { StatusDot } from '../inputs/_internal';

/** One option of Select / MultiSelect — Figma "_Input dropdown menu item". */
export interface SelectItem {
  value: string;
  /** "Text" (e.g. "Olivia Rhye"). */
  label: string;
  /** "Supporting text" shown after the label (e.g. "@olivia"). */
  supportingText?: ReactNode;
  /** Type=Icon leading */
  icon?: IconSlot;
  /** Type=Avatar leading */
  avatarSrc?: string;
  /** Initials fallback for the avatar. */
  avatarInitials?: string;
  /** Type=Dot leading. `true` = success dot; a string is used as a Tailwind bg class (e.g. "bg-gray-300"). */
  dot?: boolean | string;
  disabled?: boolean;
}

/** Leading visual (icon / avatar / dot) of an item, shared by the menu and the trigger. */
export function ItemLeading({ item }: { item: SelectItem }) {
  if (item.avatarSrc != null || item.avatarInitials != null)
    return <Avatar size="xs" src={item.avatarSrc} initials={item.avatarInitials} className="shrink-0" />;
  if (item.dot) return <StatusDot className={typeof item.dot === 'string' ? item.dot : undefined} />;
  if (item.icon != null) return <>{renderIcon(item.icon, 'size-5 shrink-0 text-gray-500')}</>;
  return null;
}

export interface SelectMenuProps {
  id: string;
  items: SelectItem[];
  isSelected: (item: SelectItem) => boolean;
  activeIndex: number;
  onActiveChange: (i: number) => void;
  onPick: (item: SelectItem) => void;
  multiple?: boolean;
  emptyText?: ReactNode;
  className?: string;
}

export const optionId = (menuId: string, i: number) => `${menuId}-opt-${i}`;

/** The floating list of a Select (Figma "Input dropdown" State=Open menu). */
export function SelectMenu({ id, items, isSelected, activeIndex, onActiveChange, onPick, multiple, emptyText = 'No results', className }: SelectMenuProps) {
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`#${CSS.escape(optionId(id, activeIndex))}`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [id, activeIndex]);
  return (
    <ul
      ref={listRef}
      id={id}
      role="listbox"
      aria-multiselectable={multiple || undefined}
      tabIndex={-1}
      className={cx(
        'absolute top-full left-0 z-50 mt-1 max-h-80 w-full overflow-y-auto rounded-lg border border-gray-200 bg-white py-1 shadow-lg outline-none',
        '[scrollbar-color:var(--color-gray-200)_transparent] [scrollbar-width:thin]',
        className,
      )}
      onMouseDown={(e) => e.preventDefault()}
    >
      {items.length === 0 && <li className="px-4 py-2.5 text-md text-gray-500">{emptyText}</li>}
      {items.map((item, i) => {
        const selected = isSelected(item);
        const active = i === activeIndex;
        return (
          <li
            key={item.value}
            id={optionId(id, i)}
            role="option"
            aria-selected={selected}
            aria-disabled={item.disabled || undefined}
            className={cx('px-1.5 py-px', item.disabled ? 'cursor-not-allowed' : 'cursor-pointer')}
            onMouseEnter={() => !item.disabled && onActiveChange(i)}
            onClick={() => !item.disabled && onPick(item)}
          >
            <div
              className={cx(
                'flex items-center gap-2 rounded-md py-2.5 pr-2.5 pl-2 transition-colors duration-75',
                item.disabled ? (selected ? 'bg-gray-25' : '') : selected || active ? 'bg-gray-50' : '',
              )}
            >
              <span className="flex min-w-0 flex-1 items-center gap-2">
                <ItemLeading item={item} />
                <span className={cx('truncate text-md font-medium', item.disabled ? 'text-gray-400' : 'text-gray-900')}>{item.label}</span>
                {item.supportingText != null && (
                  <span className={cx('truncate text-md', item.disabled ? 'text-gray-400' : 'text-gray-600')}>{item.supportingText}</span>
                )}
              </span>
              {selected && <Check className={cx('size-5 shrink-0', item.disabled ? 'text-gray-300' : 'text-brand-600')} aria-hidden />}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Next enabled index in `dir` direction (wraps). */
export function nextEnabled(items: SelectItem[], from: number, dir: 1 | -1): number {
  const n = items.length;
  if (!n) return -1;
  for (let k = 1; k <= n; k++) {
    const i = (((from + dir * k) % n) + n) % n;
    if (!items[i].disabled) return i;
  }
  return -1;
}
