import { forwardRef, useId, useRef, useState, type InputHTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ErrorIcon, FieldHint, FieldLabel, HelpTooltip } from './Field';
import { fieldBoxClass, inputPad, type InputSize } from './Input';
import { InputTag, mergeRefs } from './_internal';
import { useControllableState } from './useControllableState';

export interface TagInputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'value' | 'defaultValue' | 'onChange'> {
  /** Figma: Size (single-line variant only). */
  size?: InputSize;
  /** Tags (controlled). */
  value?: string[];
  defaultValue?: string[];
  onChange?: (tags: string[]) => void;
  /** Figma: Label */
  label?: ReactNode;
  /** Figma: Hint text */
  hint?: ReactNode;
  /** Figma: Destructive=True */
  error?: string | boolean;
  /** Leading icon (single-line variant). */
  iconLeading?: IconSlot;
  /** Help icon tooltip content. */
  tooltip?: ReactNode;
  /** Figma "Textarea input field" Type=Tags — a 128px tall box where tags wrap. */
  multiline?: boolean;
  /** Keys that commit the typed text as a tag. Default Enter and comma. */
  separators?: string[];
  /** Disallow duplicate tags (default true). */
  unique?: boolean;
  className?: string;
}

/**
 * TagInput — Figma "Input field" Type=Tags and "Textarea input field" Type=Tags.
 * Enter / comma adds the typed text as a tag, Backspace on an empty field removes the last tag.
 */
export const TagInput = forwardRef<HTMLInputElement, TagInputProps>(function TagInput(
  {
    size = 'md',
    value,
    defaultValue = [],
    onChange,
    label,
    hint,
    error,
    iconLeading,
    tooltip,
    multiline = false,
    separators = ['Enter', ','],
    unique = true,
    className,
    disabled,
    required,
    id,
    placeholder,
    onKeyDown,
    ...props
  },
  ref,
) {
  const [tags, setTags] = useControllableState<string[]>(value, defaultValue, onChange);
  const [text, setText] = useState('');
  const inner = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const iid = id ?? autoId;
  const hintText = typeof error === 'string' && error ? error : hint;
  const hintId = hintText != null ? `${iid}-hint` : undefined;

  const commit = () => {
    const t = text.trim();
    if (!t) return;
    if (!unique || !tags.includes(t)) setTags([...tags, t]);
    setText('');
  };
  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(e);
    if (e.defaultPrevented) return;
    if (separators.includes(e.key)) {
      if (text.trim()) {
        e.preventDefault();
        commit();
      } else if (e.key === ',') e.preventDefault();
    } else if (e.key === 'Backspace' && !text && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const input = (
    <input
      ref={mergeRefs(ref, inner)}
      id={iid}
      value={text}
      disabled={disabled}
      required={required && tags.length === 0}
      aria-invalid={!!error || undefined}
      aria-describedby={hintId}
      placeholder={tags.length ? undefined : placeholder}
      onChange={(e) => setText(e.target.value)}
      onKeyDown={handleKey}
      onBlur={commit}
      className="w-0 min-w-20 flex-1 bg-transparent text-md text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
      {...props}
    />
  );
  const chips = tags.map((t, i) => (
    <InputTag key={`${t}-${i}`} disabled={disabled} onRemove={disabled ? undefined : () => setTags(tags.filter((_, j) => j !== i))}>
      {t}
    </InputTag>
  ));

  return (
    <div className={cx('flex w-full flex-col gap-1.5', className)}>
      {label != null && (
        <FieldLabel htmlFor={iid} required={required}>
          {label}
        </FieldLabel>
      )}
      <div
        className={cx(fieldBoxClass(!!error, disabled), 'cursor-text', multiline ? 'min-h-32 items-start p-[11px]' : cx('items-center gap-2', inputPad[size]))}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();
            inner.current?.focus();
          }
        }}
      >
        {!multiline && renderIcon(iconLeading, 'size-5 shrink-0 text-gray-500')}
        <div className={cx('flex min-w-0 flex-1 flex-wrap items-center', multiline ? 'gap-x-1.5 gap-y-2' : 'gap-1.5')}>
          {chips}
          {input}
        </div>
        {!multiline && (error ? <ErrorIcon /> : tooltip != null ? <HelpTooltip content={tooltip} /> : null)}
      </div>
      {hintText != null && (
        <FieldHint id={hintId} error={!!error && typeof error === 'string'}>
          {hintText}
        </FieldHint>
      )}
    </div>
  );
});
