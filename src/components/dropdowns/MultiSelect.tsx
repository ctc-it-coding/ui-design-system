import { forwardRef, useId, useMemo, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { SearchLg } from '../../icons';
import { ErrorIcon, FieldHint, FieldLabel } from '../inputs/Field';
import { fieldBoxClass, inputPad } from '../inputs/Input';
import { InputTag } from '../inputs/_internal';
import { useControllableState } from '../inputs/useControllableState';
import { defaultFilter } from './Select';
import { SelectMenu, nextEnabled, optionId, type SelectItem } from './SelectMenu';
import { useDismiss } from './useDismiss';

export interface MultiSelectProps {
  /** Trigger size (sm = 40px, md = 44px). */
  size?: 'sm' | 'md';
  items: SelectItem[];
  /** Selected values (controlled). */
  value?: string[];
  defaultValue?: string[];
  onChange?: (values: string[]) => void;
  /** Search placeholder (Figma "Search"). */
  placeholder?: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: string | boolean;
  disabled?: boolean;
  required?: boolean;
  filter?: (item: SelectItem, query: string) => boolean;
  /** Name for hidden inputs (one per selected value). */
  name?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  emptyText?: ReactNode;
  id?: string;
  className?: string;
  menuClassName?: string;
}

/**
 * MultiSelect — Figma "Input dropdown" Type=Tags: a searchable combobox whose selections render as tags.
 * Picking an item toggles it and keeps the menu open; Backspace in the empty search removes the last tag.
 */
export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(function MultiSelect(
  {
    size = 'md',
    items,
    value,
    defaultValue = [],
    onChange,
    placeholder = 'Search',
    label,
    hint,
    error,
    disabled,
    required,
    filter = defaultFilter,
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
  const [values, setValues] = useControllableState<string[]>(value, defaultValue, onChange);
  const [open, setOpenState] = useControllableState<boolean>(openProp, defaultOpen, onOpenChange);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visible = useMemo(() => items.filter((i) => filter(i, query)), [items, filter, query]);
  const setOpen = (o: boolean) => {
    if (o === open) return;
    setOpenState(o);
    if (o) setActive(nextEnabled(visible, -1, 1));
    else setQuery('');
  };
  useDismiss(rootRef, open, () => setOpen(false));

  const toggle = (item: SelectItem) => {
    setValues(values.includes(item.value) ? values.filter((v) => v !== item.value) : [...values, item.value]);
    setQuery('');
    inputRef.current?.focus();
  };
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    const k = e.key;
    if (k === 'ArrowDown' || k === 'ArrowUp') {
      e.preventDefault();
      if (!open) return setOpen(true);
      setActive((a) => nextEnabled(visible, a, k === 'ArrowDown' ? 1 : -1));
    } else if (k === 'Enter') {
      e.preventDefault();
      if (!open) return setOpen(true);
      const item = visible[active];
      if (item && !item.disabled) toggle(item);
    } else if (k === 'Backspace' && !query && values.length) {
      setValues(values.slice(0, -1));
    } else if (k === 'Tab' && open) setOpen(false);
  };

  const hintText = typeof error === 'string' && error ? error : hint;
  const hintId = hintText != null ? `${baseId}-hint` : undefined;
  const selectedItems = values.map((v) => items.find((i) => i.value === v) ?? { value: v, label: v });

  return (
    <div ref={ref} className={cx('flex w-full flex-col gap-1.5', className)}>
      {label != null && (
        <FieldLabel id={`${baseId}-label`} htmlFor={`${baseId}-input`} required={required}>
          {label}
        </FieldLabel>
      )}
      <div ref={rootRef} className="relative">
        <div
          className={cx(fieldBoxClass(!!error, disabled), 'cursor-text items-center gap-2', inputPad[size], open && !error && 'border-brand-300 ring-4 ring-brand-500/24')}
          onMouseDown={(e) => {
            if (disabled) return;
            if (e.target !== inputRef.current) e.preventDefault();
            inputRef.current?.focus();
            if (!open) setOpen(true);
          }}
        >
          <SearchLg className="size-5 shrink-0 text-gray-500" aria-hidden />
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
            {selectedItems.map((it) => (
              <InputTag
                key={it.value}
                avatarSrc={'avatarSrc' in it ? it.avatarSrc : undefined}
                avatarInitials={'avatarInitials' in it ? it.avatarInitials : undefined}
                disabled={disabled}
                onRemove={disabled ? undefined : () => setValues(values.filter((v) => v !== it.value))}
              >
                {it.label}
              </InputTag>
            ))}
            <input
              ref={inputRef}
              id={`${baseId}-input`}
              role="combobox"
              aria-expanded={open}
              aria-controls={menuId}
              aria-autocomplete="list"
              aria-labelledby={label != null ? `${baseId}-label` : undefined}
              aria-describedby={hintId}
              aria-invalid={!!error || undefined}
              aria-activedescendant={open && active >= 0 ? optionId(menuId, active) : undefined}
              disabled={disabled}
              value={query}
              placeholder={values.length ? undefined : placeholder}
              onChange={(e) => {
                setQuery(e.target.value);
                if (!open) setOpen(true);
                setActive(0);
              }}
              onKeyDown={onKeyDown}
              className="w-0 min-w-12 flex-1 bg-transparent text-md text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
            />
          </div>
          {error && <ErrorIcon />}
        </div>
        {open && (
          <SelectMenu
            id={menuId}
            items={visible}
            multiple
            isSelected={(i) => values.includes(i.value)}
            activeIndex={active}
            onActiveChange={setActive}
            onPick={toggle}
            emptyText={emptyText}
            className={menuClassName}
          />
        )}
      </div>
      {name && values.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
      {hintText != null && (
        <FieldHint id={hintId} error={!!error && typeof error === 'string'}>
          {hintText}
        </FieldHint>
      )}
    </div>
  );
});
