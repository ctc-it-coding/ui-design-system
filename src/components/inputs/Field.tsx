import { forwardRef, type ReactNode, type SelectHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { AlertCircle, ChevronDown } from '../../icons';
import { HelpIcon } from '../tooltips/HelpIcon';

/** Field label — Figma "Label" (Medium 14/20 gray-700). Shows a brand asterisk when `required`. */
export function FieldLabel({ htmlFor, id, required, children, className }: { htmlFor?: string; id?: string; required?: boolean; children: ReactNode; className?: string }) {
  return (
    <label htmlFor={htmlFor} id={id} className={cx('text-sm font-medium text-gray-700', className)}>
      {children}
      {required && <span className="ml-0.5 text-brand-600">*</span>}
    </label>
  );
}

/** Hint / error message below a field — Figma "Hint text" (gray-600) / error message (error-500). */
export function FieldHint({ id, error, children, className }: { id?: string; error?: boolean; children: ReactNode; className?: string }) {
  return (
    <p id={id} className={cx('text-sm', error ? 'text-error-500' : 'text-gray-600', className)}>
      {children}
    </p>
  );
}

/** Figma "Help icon" inside fields — the shared Tooltips/HelpIcon (dark tooltip on hover / focus). */
export function HelpTooltip({ content }: { content: ReactNode }) {
  return <HelpIcon title={content} className="shrink-0" />;
}

/** Error icon shown at the trailing end of a destructive field (alert-circle, error-500). */
export function ErrorIcon() {
  return <AlertCircle className="size-4 shrink-0 text-error-500" aria-hidden />;
}

export type InputSelectOption = string | { value: string; label: ReactNode };

export interface InputSelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  /** Options; strings are used as both value and label. */
  options: InputSelectOption[];
  /** Matches the parent Input size (paddings). */
  size?: 'sm' | 'md';
  /** Which side of the input the dropdown sits on (controls inner padding). */
  side?: 'leading' | 'trailing';
}

/**
 * Inline native dropdown used for Input Type=Leading dropdown ("US") / Trailing dropdown ("USD").
 * Pass it to `<Input leadingDropdown={…}>` or `<Input trailingDropdown={…}>`.
 */
export const InputSelect = forwardRef<HTMLSelectElement, InputSelectProps>(function InputSelect(
  { options, size = 'md', side = 'leading', className, ...props },
  ref,
) {
  return (
    <span className="relative flex h-full items-stretch">
      <select
        ref={ref}
        className={cx(
          'h-full cursor-pointer appearance-none bg-transparent text-md text-gray-700 outline-none disabled:cursor-not-allowed',
          side === 'trailing' ? (size === 'sm' ? 'pr-9 pl-3' : 'pr-[38px] pl-3.5') : size === 'sm' ? 'pr-7 pl-[11px]' : 'pr-7 pl-[13px]',
          className,
        )}
        {...props}
      >
        {options.map((o) => {
          const v = typeof o === 'string' ? o : o.value;
          return (
            <option key={v} value={v}>
              {typeof o === 'string' ? o : (o.label as string)}
            </option>
          );
        })}
      </select>
      <ChevronDown className={cx('pointer-events-none absolute top-1/2 size-5 -translate-y-1/2 text-gray-400', side === 'trailing' ? (size === 'sm' ? 'right-3' : 'right-3.5') : 'right-1.5')} aria-hidden />
    </span>
  );
});
