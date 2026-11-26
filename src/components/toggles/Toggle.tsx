import { forwardRef, useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../inputs/useControllableState';
import { ControlText } from '../checkboxes/Checkbox';

export type ToggleSize = 'sm' | 'md';

export interface ToggleProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'checked' | 'defaultChecked'> {
  /** Figma: Size */
  size?: ToggleSize;
  /** Figma: Pressed (controlled) */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Called with the new pressed state. */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** Figma: Text=True → "Text" */
  label?: ReactNode;
  /** Figma: "Supporting text" */
  hint?: ReactNode;
  className?: string;
}

/**
 * Toggle (switch) — Figma "Toggle" built on "_Toggle base".
 * Uses a visually hidden `<input type="checkbox" role="switch">`; hover / focus / disabled are CSS.
 */
export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { size = 'sm', checked, defaultChecked = false, onChange, label, hint, disabled, className, id, ...props },
  ref,
) {
  const [on, setOn] = useControllableState<boolean>(checked, defaultChecked);
  const autoId = useId();
  const hintId = hint != null ? `${id ?? autoId}-hint` : undefined;
  const sm = size === 'sm';
  return (
    <label
      className={cx(
        'group/toggle inline-flex items-start',
        sm ? 'gap-2' : 'gap-3',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span className="relative flex shrink-0">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          role="switch"
          className="peer absolute inset-0 m-0 size-full cursor-[inherit] appearance-none opacity-0"
          checked={on}
          disabled={disabled}
          aria-describedby={hintId}
          onChange={(e) => {
            setOn(e.target.checked);
            onChange?.(e.target.checked, e);
          }}
          {...props}
        />
        <span
          aria-hidden
          className={cx(
            'flex shrink-0 items-center rounded-full p-0.5 transition-colors duration-150',
            sm ? 'h-5 w-9' : 'h-6 w-11',
            disabled
              ? 'bg-gray-100'
              : on
                ? 'bg-brand-600 group-hover/toggle:bg-brand-700 peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/24'
                : 'bg-gray-100 peer-focus-visible:ring-4 peer-focus-visible:ring-gray-400/20',
          )}
        >
          <span
            className={cx(
              'rounded-full shadow-sm transition-transform duration-150 ease-out',
              sm ? 'size-4' : 'size-5',
              disabled ? 'bg-gray-50' : 'bg-white',
              on && (sm ? 'translate-x-4' : 'translate-x-5'),
            )}
          />
        </span>
      </span>
      <ControlText size={size} label={label} hint={hint} id={hintId} />
    </label>
  );
});
