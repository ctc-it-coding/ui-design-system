import { forwardRef, useCallback, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ChevronDown, SearchLg } from '../../icons';
import { ErrorIcon, FieldHint, FieldLabel, HelpTooltip } from '../inputs/Field';
import { fieldBoxClass, inputPad } from '../inputs/Input';
import { useControllableState } from '../inputs/useControllableState';
import { ItemLeading, SelectMenu, nextEnabled, optionId, type SelectItem } from './SelectMenu';
import { useDismiss } from './useDismiss';

export type { SelectItem } from './SelectMenu';

export interface SelectProps {
  /** Trigger size (sm = 40px, md = 44px; Figma shows md). */
  size?: 'sm' | 'md';
  /** Options — Figma "_Input dropdown menu item". */
  items: SelectItem[];
  /** Selected value (controlled). `null` = nothing selected. */
  value?: string | null;
  defaultValue?: string | null;
  onChange?: (value: string, item: SelectItem) => void;
  /** Figma State=Placeholder text, e.g. "Select team member". */
  placeholder?: string;
  /** Figma: Label */
  label?: ReactNode;
  /** Figma: Hint text */
  hint?: ReactNode;
  /** Error state; a string replaces the hint. */
  error?: string | boolean;
  /** Help icon tooltip next to the chevron. */
  tooltip?: ReactNode;
  /** Figma: Type=Icon leading — icon always shown in the trigger (unless the selected item brings its own avatar / dot / icon). */
  iconLeading?: IconSlot;
  /** Figma: Type=Search — the trigger becomes a combobox input that filters the items. */
  searchable?: boolean;
  /** Custom filter for `searchable` (default: case-insensitive match on label + supporting text). */
  filter?: (item: SelectItem, query: string) => boolean;
  disabled?: boolean;
  required?: boolean;
  /** Name for a hidden input carrying the value in forms. */
  name?: string;
  /** Menu open state (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Text shown when the search finds nothing. */
  emptyText?: ReactNode;
  id?: string;
  className?: string;
  menuClassName?: string;
}

export const defaultFilter = (item: SelectItem, q: string) => {
  const s = q.trim().toLowerCase();
  if (!s) return true;
  return item.label.toLowerCase().includes(s) || (typeof item.supportingText === 'string' && item.supportingText.toLowerCase().includes(s));
};

/**
 * Select — Figma "Input dropdown" (Types: Default, Icon leading, Avatar leading, Dot leading, Search).
 * Keyboard: ↑/↓ move, Enter/Space select, Home/End, Esc closes; type-ahead in non-search mode.
 * For Type=Tags (multi-select) use `MultiSelect`.
 */
export const Select = forwardRef<HTMLDivElement, SelectProps>(function Select(
  {
    size = 'md',
    items,
    value,
    defaultValue = null,
    onChange,
    placeholder = 'Select',
    label,
    hint,
    error,
    tooltip,
    iconLeading,
    searchable = false,
    filter = defaultFilter,
    disabled,
    required,
    name,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    emptyText,
    id,
    className,
    menuClassName,
  },
  ref,
) {
  const autoId = useId();
  const baseId = id ?? autoId;
  const menuId = `${baseId}-menu`;
  const [selected, setSelected] = useControllableState<string | null>(value, defaultValue);
  const [open, setOpenState] = useControllableState<boolean>(openProp, defaultOpen, onOpenChange);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typeahead = useRef({ text: '', t: 0 });

  const current = items.find((i) => i.value === selected) ?? null;
  const visible = useMemo(() => (searchable ? items.filter((i) => filter(i, query)) : items), [items, searchable, filter, query]);

  const setOpen = useCallback(
    (o: boolean) => {
      if (o === open) return;
      setOpenState(o);
      if (o) {
        const idx = visible.findIndex((i) => i.value === selected);
        setActive(idx >= 0 ? idx : nextEnabled(visible, -1, 1));
      } else setQuery('');
    },
    [open, setOpenState, visible, selected],
  );
  useDismiss(rootRef, open, (reason) => {
    setOpen(false);
    if (reason === 'escape') (searchable ? inputRef.current : triggerRef.current)?.focus();
  });

  const pick = (item: SelectItem) => {
    setSelected(item.value);
    onChange?.(item.value, item);
    setOpen(false);
    (searchable ? inputRef.current : triggerRef.current)?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (disabled) return;
    const k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((a) => nextEnabled(visible, a, k === 'ArrowDown' ? 1 : -1));
    } else if (k === 'Home' && open) {
      e.preventDefault();
      setActive(nextEnabled(visible, -1, 1));
    } else if (k === 'End' && open) {
      e.preventDefault();
      setActive(nextEnabled(visible, visible.length, -1));
    } else if (k === 'Enter' || (k === ' ' && !searchable)) {
      e.preventDefault();
      if (!open) return setOpen(true);
      const item = visible[active];
      if (item && !item.disabled) pick(item);
    } else if (k === 'Tab') {
      if (open) setOpen(false);
    } else if (!searchable && k.length === 1 && !e.metaKey && !e.ctrlKey) {
      const now = Date.now();
      const ta = typeahead.current;
      ta.text = now - ta.t > 600 ? k.toLowerCase() : ta.text + k.toLowerCase();
      ta.t = now;
      const idx = visible.findIndex((i) => !i.disabled && i.label.toLowerCase().startsWith(ta.text));
      if (idx >= 0) {
        if (!open) setOpen(true);
        setActive(idx);
      }
    }
  };

  const hintText = typeof error === 'string' && error ? error : hint;
  const hintId = hintText != null ? `${baseId}-hint` : undefined;
  const labelId = `${baseId}-label`;
  const showCurrent = current != null && !(searchable && open);
  const leading = showCurrent && current && (current.avatarSrc != null || current.avatarInitials != null || current.dot || current.icon != null) ? (
    <ItemLeading item={current} />
  ) : (
    renderIcon(searchable ? SearchLg : iconLeading, 'size-5 shrink-0 text-gray-500')
  );
  const a11y = {
    role: 'combobox' as const,
    'aria-expanded': open,
    'aria-controls': menuId,
    'aria-haspopup': 'listbox' as const,
    'aria-labelledby': label != null ? labelId : undefined,
    'aria-describedby': hintId,
    'aria-invalid': !!error || undefined,
    'aria-activedescendant': open && active >= 0 ? optionId(menuId, active) : undefined,
  };

  return (
    <div ref={ref} className={cx('flex w-full flex-col gap-1.5', className)}>
      {label != null && (
        <FieldLabel id={labelId} htmlFor={`${baseId}-trigger`} required={required}>
          {label}
        </FieldLabel>
      )}
      <div ref={rootRef} className="relative">
        <div
          className={cx(
            fieldBoxClass(!!error, disabled),
            'items-center gap-2',
            inputPad[size],
            open && !error && 'border-brand-300 ring-4 ring-brand-500/24',
            !disabled && 'cursor-pointer',
          )}
          onMouseDown={(e) => {
            if (disabled || !searchable) return;
            if (e.target !== inputRef.current) e.preventDefault();
            inputRef.current?.focus();
            if (!open) setOpen(true);
            else if (e.target !== inputRef.current) setOpen(false);
          }}
        >
          {searchable ? (
            <>
              {leading}
              {showCurrent && !query && current && (
                <span className="pointer-events-none flex min-w-0 shrink items-center gap-2">
                  <span className="truncate text-md text-gray-900">{current.label}</span>
                  {current.supportingText != null && <span className="truncate text-md text-gray-600">{current.supportingText}</span>}
                </span>
              )}
              <input
                ref={inputRef}
                id={`${baseId}-trigger`}
                {...a11y}
                aria-autocomplete="list"
                disabled={disabled}
                value={query}
                placeholder={showCurrent ? undefined : current?.label ?? placeholder}
                onChange={(e) => {
                  setQuery(e.target.value);
                  if (!open) setOpen(true);
                  setActive(0);
                }}
                onKeyDown={onKeyDown}
                className={cx(
                  'min-w-0 bg-transparent text-md text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed',
                  showCurrent && !query ? 'w-0 flex-1 caret-transparent' : 'w-full flex-1',
                )}
              />
            </>
          ) : (
            <button
              ref={triggerRef}
              id={`${baseId}-trigger`}
              type="button"
              {...a11y}
              disabled={disabled}
              onClick={() => setOpen(!open)}
              onKeyDown={onKeyDown}
              className="flex min-w-0 flex-1 items-center gap-2 text-left outline-none before:absolute before:inset-0 disabled:cursor-not-allowed"
            >
              {leading}
              {current ? (
                <span className="flex min-w-0 items-center gap-2">
                  <span className={cx('truncate text-md', disabled ? 'text-gray-500' : 'text-gray-900')}>{current.label}</span>
                  {current.supportingText != null && <span className="truncate text-md text-gray-600">{current.supportingText}</span>}
                </span>
              ) : (
                <span className="truncate text-md text-gray-500">{placeholder}</span>
              )}
            </button>
          )}
          {(error || tooltip != null) && (
            <span className="relative z-[1] flex shrink-0">{error ? <ErrorIcon /> : <HelpTooltip content={tooltip} />}</span>
          )}
          {!searchable && (
            <ChevronDown className={cx('pointer-events-none size-5 shrink-0 text-gray-400 transition-transform duration-150', open && 'rotate-180')} aria-hidden />
          )}
        </div>
        {open && (
          <SelectMenu
            id={menuId}
            items={visible}
            isSelected={(i) => i.value === selected}
            activeIndex={active}
            onActiveChange={setActive}
            onPick={pick}
            emptyText={emptyText}
            className={menuClassName}
          />
        )}
      </div>
      {name && <input type="hidden" name={name} value={selected ?? ''} />}
      {hintText != null && (
        <FieldHint id={hintId} error={!!error && typeof error === 'string'}>
          {hintText}
        </FieldHint>
      )}
    </div>
  );
});
