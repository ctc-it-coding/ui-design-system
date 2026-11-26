import { forwardRef, useId, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../inputs/useControllableState';
import { CheckboxBase, type CheckboxSize } from './CheckboxBase';
import { ControlText } from './Checkbox';
import { useRadioGroup } from './groupContext';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'checked' | 'defaultChecked' | 'value'> {
  /** Figma: Size */
  size?: CheckboxSize;
  /** Figma: Checked (controlled). Inside a RadioGroup this is derived from the group value. */
  checked?: boolean;
  defaultChecked?: boolean;
  /** Called with `true` when this radio becomes selected. */
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** Figma: "Text" */
  label?: ReactNode;
  /** Figma: "Supporting text" */
  hint?: ReactNode;
  /** Form name (taken from RadioGroup when inside one). */
  name?: string;
  /** Value submitted / matched against RadioGroup value. */
  value?: string;
  className?: string;
}

/** Radio — Figma "Checkbox" (Type=Radio) built on "_Checkbox base". */
export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  { size, checked, defaultChecked = false, onChange, label, hint, name, value, disabled, className, id, ...props },
  ref,
) {
  const group = useRadioGroup();
  const sz: CheckboxSize = size ?? group?.size ?? 'sm';
  const groupChecked = group ? group.value === value : undefined;
  const [isChecked, setChecked] = useControllableState<boolean>(checked ?? groupChecked, defaultChecked);
  const autoId = useId();
  const hintId = hint != null ? `${id ?? autoId}-hint` : undefined;
  const isDisabled = disabled || group?.disabled;
  return (
    <label
      className={cx(
        'group/radio inline-flex items-start',
        sz === 'sm' ? 'gap-2' : 'gap-3',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span className={cx('relative flex shrink-0 items-center justify-center', label != null || hint != null ? 'py-0.5' : '')}>
        <input
          ref={ref}
          id={id}
          type="radio"
          name={name ?? group?.name}
          value={value}
          className="peer absolute inset-0 m-0 size-full cursor-[inherit] appearance-none opacity-0"
          checked={isChecked}
          disabled={isDisabled}
          aria-describedby={hintId}
          onChange={(e) => {
            setChecked(e.target.checked);
            if (group && value != null && e.target.checked) group.onChange(value);
            onChange?.(e.target.checked, e);
          }}
          {...props}
        />
        <CheckboxBase type="radio" size={sz} checked={isChecked} disabled={isDisabled} peerFocus />
      </span>
      <ControlText size={sz} label={label} hint={hint} id={hintId} />
    </label>
  );
});
