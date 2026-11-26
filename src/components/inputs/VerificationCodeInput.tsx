import { Fragment, forwardRef, useId, useRef, type ClipboardEvent, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FieldHint } from './Field';
import { useControllableState } from './useControllableState';

export type VerificationCodeSize = 'sm' | 'md' | 'lg';

export interface VerificationCodeInputProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Figma: Size (sm 64px, md 80px, lg 96px cells). */
  size?: VerificationCodeSize;
  /** Figma: Digits */
  digits?: 4 | 6;
  /** Code value (controlled). */
  value?: string;
  defaultValue?: string;
  onChange?: (code: string) => void;
  /** Fired once every cell is filled. */
  onComplete?: (code: string) => void;
  /** Figma: Label ("Secure code"). */
  label?: ReactNode;
  /** Figma: Hint text */
  hint?: ReactNode;
  /** Error state; a string replaces the hint. */
  error?: string | boolean;
  disabled?: boolean;
  /** Placeholder digit shown in empty cells (Figma shows "0"). */
  placeholder?: string;
  /** Allowed characters (default digits only). */
  pattern?: string;
  /** Focus the first cell on mount. */
  autoFocus?: boolean;
  /** Form field name (a hidden input carries the joined code). */
  name?: string;
}

const cell: Record<VerificationCodeSize, string> = {
  sm: 'size-16 rounded-lg px-2 py-0.5 text-display-lg',
  md: 'size-20 rounded-[10px] p-2 text-display-lg',
  lg: 'size-24 rounded-xl px-2 py-3 text-display-xl',
};

/**
 * VerificationCodeInput — Figma "Verification code input field" built on "_Mega input field base".
 * Typing auto-advances, Backspace moves back, arrow keys navigate, and pasting fills all cells.
 */
export const VerificationCodeInput = forwardRef<HTMLDivElement, VerificationCodeInputProps>(function VerificationCodeInput(
  {
    size = 'md',
    digits = 4,
    value,
    defaultValue = '',
    onChange,
    onComplete,
    label,
    hint,
    error,
    disabled,
    placeholder = '0',
    pattern = '[0-9]',
    autoFocus,
    name,
    className,
    ...props
  },
  ref,
) {
  const [code, setCode] = useControllableState<string>(value, defaultValue, onChange);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const id = useId();
  const re = new RegExp(`^${pattern}$`);
  const chars = Array.from({ length: digits }, (_, i) => code[i] ?? '');
  const hintText = typeof error === 'string' && error ? error : hint;

  const update = (next: string[]) => {
    const joined = next.join('').slice(0, digits);
    setCode(joined);
    if (joined.length === digits && next.every(Boolean)) onComplete?.(joined);
  };
  const focus = (i: number) => {
    const el = refs.current[Math.max(0, Math.min(digits - 1, i))];
    el?.focus();
    el?.select();
  };
  const fill = (start: number, text: string) => {
    const valid = Array.from(text).filter((c) => re.test(c));
    if (!valid.length) return;
    const next = [...chars];
    let i = start;
    for (const c of valid) {
      if (i >= digits) break;
      next[i++] = c;
    }
    update(next);
    focus(i);
  };
  const onKey = (i: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const next = [...chars];
      if (next[i]) next[i] = '';
      else if (i > 0) {
        next[i - 1] = '';
        focus(i - 1);
      }
      update(next);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      focus(i - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      focus(i + 1);
    }
  };
  const onPaste = (i: number, e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    fill(i, e.clipboardData.getData('text'));
  };

  const half = digits === 6 ? 3 : -1;
  return (
    <div ref={ref} className={cx('flex flex-col gap-1.5', className)} {...props}>
      {label != null && (
        <label htmlFor={`${id}-0`} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <div role="group" aria-label={typeof label === 'string' ? label : 'Verification code'} className={cx('flex items-center', size === 'sm' ? 'gap-2' : 'gap-3')}>
        {chars.map((c, i) => (
          <Fragment key={i}>
            {i === half && (
              <span aria-hidden className="w-7 text-center text-display-xl font-medium text-gray-300">
                -
              </span>
            )}
            <input
              ref={(el) => {
                refs.current[i] = el;
              }}
              id={`${id}-${i}`}
              value={c}
              disabled={disabled}
              autoFocus={autoFocus && i === 0}
              inputMode={pattern === '[0-9]' ? 'numeric' : 'text'}
              autoComplete={i === 0 ? 'one-time-code' : 'off'}
              aria-label={`Digit ${i + 1}`}
              aria-invalid={!!error || undefined}
              placeholder={placeholder}
              onFocus={(e) => e.target.select()}
              onKeyDown={(e) => onKey(i, e)}
              onPaste={(e) => onPaste(i, e)}
              onChange={(e) => {
                const v = e.target.value;
                if (!v) return;
                fill(i, v.length > 1 && c ? v.replace(c, '') || v : v);
              }}
              className={cx(
                'shrink-0 border bg-white text-center font-medium shadow-xs outline-none transition-[box-shadow,border-color] duration-100',
                'placeholder:text-gray-300 focus:placeholder:text-transparent',
                cell[size],
                error
                  ? 'border-error-300 text-error-600 focus:ring-4 focus:ring-error-500/24'
                  : c
                    ? 'border-2 border-brand-600 text-brand-600 focus:ring-4 focus:ring-brand-500/24'
                    : 'border-gray-300 text-brand-600 focus:border-2 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/24',
                'disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-300',
              )}
            />
          </Fragment>
        ))}
      </div>
      {name && <input type="hidden" name={name} value={code} />}
      {hintText != null && <FieldHint error={!!error && typeof error === 'string'}>{hintText}</FieldHint>}
    </div>
  );
});
