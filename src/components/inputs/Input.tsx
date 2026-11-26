import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ErrorIcon, FieldHint, FieldLabel, HelpTooltip } from './Field';

export type InputSize = 'sm' | 'md';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
  /** Figma: Size (sm = 40px, md = 44px). */
  size?: InputSize;
  /** Figma: Label */
  label?: ReactNode;
  /** Figma: Hint text */
  hint?: ReactNode;
  /** Figma: Destructive=True. A string replaces the hint with the error message. */
  error?: string | boolean;
  /** Figma: Type=Icon leading (e.g. `Mail01`). */
  iconLeading?: IconSlot;
  /** Figma: Type=Payment input — 34×24 payment method icon slot (e.g. `<PaymentIcon method="mastercard" />`). */
  paymentIcon?: ReactNode;
  /** Figma: "Help icon" — content of the tooltip shown on hover / focus of the help-circle. */
  tooltip?: ReactNode;
  /** Figma: Type=Leading text — attached add-on such as "http://". */
  leadingText?: ReactNode;
  /** Inline text before the value inside the field (e.g. "$" in Type=Trailing dropdown). */
  prefixText?: ReactNode;
  /** Figma: Type=Leading dropdown — usually an `<InputSelect>` ("US"). */
  leadingDropdown?: ReactNode;
  /** Figma: Type=Trailing dropdown — usually an `<InputSelect side="trailing">` ("USD"). */
  trailingDropdown?: ReactNode;
  /** Inline trailing content inside the field (icons, shortcut keys, text). */
  trailing?: ReactNode;
  /** Figma: Type=Trailing button — an attached button (e.g. `<Button hierarchy="secondary-gray" iconLeading={Copy01}>Copy</Button>`). */
  trailingButton?: ReactNode;
  /** Class for the outer wrapper (width etc.). */
  className?: string;
  /** Class for the `<input>` element. */
  inputClassName?: string;
}

/** Shared box styles for Input / Textarea / TagInput / Select triggers. */
export function fieldBoxClass(error: boolean | undefined, disabled: boolean | undefined) {
  return cx(
    'relative flex w-full rounded-lg border bg-white shadow-xs transition-[box-shadow,border-color] duration-100',
    error
      ? 'border-error-300 focus-within:ring-4 focus-within:ring-error-500/24'
      : 'border-gray-300 focus-within:border-brand-300 focus-within:ring-4 focus-within:ring-brand-500/24',
    disabled && 'cursor-not-allowed bg-gray-50',
  );
}

// Figma strokes are inside the frame: subtract the 1px CSS border so md = 44px, sm = 40px.
export const inputPad: Record<InputSize, string> = { sm: 'px-[11px] py-[7px]', md: 'px-[13px] py-[9px]' };

/**
 * Input — Figma "Input field".
 * Types map to props: Default, Icon leading (`iconLeading`), Leading dropdown (`leadingDropdown`), Trailing dropdown
 * (`trailingDropdown` + `prefixText`), Leading text (`leadingText`), Payment input (`paymentIcon`),
 * Trailing button (`trailingButton`). Tags → `TagInput`.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    label,
    hint,
    error,
    iconLeading,
    paymentIcon,
    tooltip,
    leadingText,
    prefixText,
    leadingDropdown,
    trailingDropdown,
    trailing,
    trailingButton,
    className,
    inputClassName,
    disabled,
    required,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const hintText = typeof error === 'string' && error ? error : hint;
  const hintId = hintText != null ? `${inputId}-hint` : undefined;
  const isError = !!error;
  const sm = size === 'sm';

  return (
    <div className={cx('flex w-full flex-col gap-1.5', className)}>
      {label != null && (
        <FieldLabel htmlFor={inputId} required={required}>
          {label}
        </FieldLabel>
      )}
      <div className={fieldBoxClass(isError, disabled)}>
        {leadingText != null && (
          <span className={cx('flex shrink-0 items-center border-r border-gray-300 text-md text-gray-600', sm ? 'pr-3 pl-[11px]' : 'pr-3 pl-[13px]')}>
            {leadingText}
          </span>
        )}
        {leadingDropdown != null && <span className="flex shrink-0 items-stretch">{leadingDropdown}</span>}
        <div
          className={cx(
            'flex min-w-0 flex-1 items-center gap-2',
            inputPad[size],
            leadingDropdown != null && (sm ? 'pl-2.5' : 'pl-3'),
            paymentIcon != null && 'pl-[9px]',
          )}
        >
          {paymentIcon != null && <span className="flex h-6 w-[34px] shrink-0 items-center justify-center">{paymentIcon}</span>}
          {renderIcon(iconLeading, 'size-5 shrink-0 text-gray-500')}
          {prefixText != null && <span className="shrink-0 text-md text-gray-600">{prefixText}</span>}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={isError || undefined}
            aria-describedby={hintId}
            className={cx(
              'w-full min-w-0 flex-1 bg-transparent text-md text-gray-900 outline-none placeholder:text-gray-500',
              'disabled:cursor-not-allowed disabled:text-gray-500',
              inputClassName,
            )}
            {...props}
          />
          {trailing}
          {isError ? <ErrorIcon /> : tooltip != null ? <HelpTooltip content={tooltip} /> : null}
        </div>
        {trailingDropdown != null && <span className="flex shrink-0 items-stretch">{trailingDropdown}</span>}
        {trailingButton != null && (
          <span
            className={cx(
              'flex shrink-0 items-stretch border-l border-gray-300',
              '*:h-auto *:rounded-l-none *:rounded-r-[7px] *:border-0 *:shadow-none *:focus-visible:ring-0',
            )}
          >
            {trailingButton}
          </span>
        )}
      </div>
      {hintText != null && (
        <FieldHint id={hintId} error={isError && typeof error === 'string'}>
          {hintText}
        </FieldHint>
      )}
    </div>
  );
});
