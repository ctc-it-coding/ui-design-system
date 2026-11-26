import { forwardRef, useId, type ReactNode, type TextareaHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { FieldHint, FieldLabel } from './Field';
import { fieldBoxClass } from './Input';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Figma: Label */
  label?: ReactNode;
  /** Figma: Hint text */
  hint?: ReactNode;
  /** Figma: Destructive=True. A string replaces the hint with the error message. */
  error?: string | boolean;
  /** Class for the outer wrapper. */
  className?: string;
  /** Class for the `<textarea>` element. */
  textareaClassName?: string;
}

/** Textarea — Figma "Textarea input field" (Type=Default). For Type=Tags use `<TagInput multiline>`. */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { label, hint, error, className, textareaClassName, disabled, required, id, rows = 4, ...props },
  ref,
) {
  const autoId = useId();
  const tid = id ?? autoId;
  const hintText = typeof error === 'string' && error ? error : hint;
  const hintId = hintText != null ? `${tid}-hint` : undefined;
  return (
    <div className={cx('flex w-full flex-col gap-1.5', className)}>
      {label != null && (
        <FieldLabel htmlFor={tid} required={required}>
          {label}
        </FieldLabel>
      )}
      <div className={fieldBoxClass(!!error, disabled)}>
        <textarea
          ref={ref}
          id={tid}
          rows={rows}
          disabled={disabled}
          required={required}
          aria-invalid={!!error || undefined}
          aria-describedby={hintId}
          className={cx(
            'block min-h-[126px] w-full resize-y rounded-lg bg-transparent px-[13px] py-[11px] text-md text-gray-900 outline-none placeholder:text-gray-500',
            'disabled:cursor-not-allowed disabled:resize-none disabled:text-gray-500',
            textareaClassName,
          )}
          {...props}
        />
      </div>
      {hintText != null && (
        <FieldHint id={hintId} error={!!error && typeof error === 'string'}>
          {hintText}
        </FieldHint>
      )}
    </div>
  );
});
