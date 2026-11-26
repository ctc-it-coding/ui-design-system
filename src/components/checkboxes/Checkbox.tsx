import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  type ChangeEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../inputs/useControllableState';
import { mergeRefs } from '../inputs/_internal';
import { CheckboxBase, type CheckboxSize } from './CheckboxBase';
import { useCheckboxGroup } from './groupContext';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'checked' | 'defaultChecked'> {
  /** Figma: Size */
  size?: CheckboxSize;
  /** Figma: Checked (controlled) */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Figma: Indeterminate */
  indeterminate?: boolean;
  /** Called with the new checked state. */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** Figma: Text=True → "Text" line. */
  label?: ReactNode;
  /** Figma: "Supporting text" line. */
  hint?: ReactNode;
  /** Value used inside a CheckboxGroup. */
  value?: string;
  /** Class for the outer label element. */
  className?: string;
}

/** Shared text block for Checkbox, Radio and Toggle ("Text and supporting text"). */
export function ControlText({ size, label, hint, id }: { size: CheckboxSize; label?: ReactNode; hint?: ReactNode; id?: string }) {
  if (label == null && hint == null) return null;
  return (
    <span className={cx('flex min-w-0 flex-col', size === 'md' && 'gap-0.5')}>
      {label != null && <span className={cx('font-medium text-gray-700', size === 'sm' ? 'text-sm' : 'text-md')}>{label}</span>}
      {hint != null && (
        <span id={id} className={cx('text-gray-600', size === 'sm' ? 'text-sm' : 'text-md')}>
          {hint}
        </span>
      )}
    </span>
  );
}

/**
 * Checkbox — Figma "Checkbox" (Type=Checkbox) built on "_Checkbox base".
 * Hover / focus / disabled are CSS; the real `<input type="checkbox">` is visually hidden.
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size, checked, defaultChecked = false, indeterminate = false, onChange, label, hint, value, disabled, className, id, ...props },
  ref,
) {
  const group = useCheckboxGroup();
  const sz: CheckboxSize = size ?? group?.size ?? 'sm';
  const groupChecked = group && value != null ? group.value.includes(value) : undefined;
  const [isChecked, setChecked] = useControllableState<boolean>(checked ?? groupChecked, defaultChecked);
  const inner = useRef<HTMLInputElement>(null);
  const autoId = useId();
  const hintId = hint != null ? `${id ?? autoId}-hint` : undefined;
  const isDisabled = disabled || group?.disabled;

  useEffect(() => {
    if (inner.current) inner.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label
      className={cx(
        'group/checkbox inline-flex items-start',
        sz === 'sm' ? 'gap-2' : 'gap-3',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span className={cx('relative flex shrink-0 items-center justify-center', label != null || hint != null ? 'py-0.5' : '')}>
        <input
          ref={mergeRefs(ref, inner)}
          id={id}
          type="checkbox"
          className="peer absolute inset-0 m-0 size-full cursor-[inherit] appearance-none opacity-0"
          checked={isChecked}
          value={value}
          disabled={isDisabled}
          aria-describedby={hintId}
          aria-checked={indeterminate ? 'mixed' : undefined}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (group && value != null) group.onToggle(value, e.target.checked);
            onChange?.(e.target.checked, e);
          }}
          {...props}
        />
        <CheckboxBase size={sz} checked={isChecked} indeterminate={indeterminate} disabled={isDisabled} peerFocus />
      </span>
      <ControlText size={sz} label={label} hint={hint} id={hintId} />
    </label>
  );
});
