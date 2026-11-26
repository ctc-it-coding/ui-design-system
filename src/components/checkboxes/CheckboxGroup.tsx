import { forwardRef, useId, type HTMLAttributes, type ReactNode, type Ref } from 'react';
import { cx } from '../../utils/cx';
import { useControllableState } from '../inputs/useControllableState';
import { CheckboxGroupContext, RadioGroupContext } from './groupContext';

interface GroupBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Size passed down to Checkbox / Radio / ChoiceCard children that don't set their own. */
  size?: 'sm' | 'md';
  /** Optional group label (rendered as the accessible name). */
  label?: ReactNode;
  /** Optional hint below the group. */
  hint?: ReactNode;
  /** Disables every item. */
  disabled?: boolean;
  /** Stack direction. Figma groups are vertical with a 12px gap. */
  orientation?: 'vertical' | 'horizontal';
  children?: ReactNode;
}

function GroupFrame({
  role,
  label,
  hint,
  orientation = 'vertical',
  className,
  children,
  frameRef,
  ...rest
}: GroupBaseProps & { role: string; frameRef?: Ref<HTMLDivElement> }) {
  const id = useId();
  return (
    <div ref={frameRef} role={role} aria-labelledby={label != null ? `${id}-label` : undefined} className={cx('flex flex-col gap-1.5', className)} {...rest}>
      {label != null && (
        <div id={`${id}-label`} className="text-sm font-medium text-gray-700">
          {label}
        </div>
      )}
      <div className={cx('flex gap-3', orientation === 'vertical' ? 'flex-col' : 'flex-row flex-wrap')}>{children}</div>
      {hint != null && <div className="text-sm text-gray-600">{hint}</div>}
    </div>
  );
}

export interface CheckboxGroupProps extends GroupBaseProps {
  /** Selected values (controlled). */
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
}

/** CheckboxGroup — Figma "Checkbox group". Children: `<Checkbox value>` or `<ChoiceCard value>`. */
export const CheckboxGroup = forwardRef<HTMLDivElement, CheckboxGroupProps>(function CheckboxGroup(
  { value, defaultValue = [], onChange, size, disabled, ...rest },
  ref,
) {
  const [val, setVal] = useControllableState<string[]>(value, defaultValue, onChange);
  return (
    <CheckboxGroupContext.Provider
      value={{
        value: val,
        size,
        disabled,
        onToggle: (v, on) => setVal(on ? (val.includes(v) ? val : [...val, v]) : val.filter((x) => x !== v)),
      }}
    >
      <GroupFrame role="group" frameRef={ref} {...rest} />
    </CheckboxGroupContext.Provider>
  );
});

export interface RadioGroupProps extends GroupBaseProps {
  /** Selected value (controlled). */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Form name shared by the radios (auto-generated when omitted). */
  name?: string;
}

/** RadioGroup — single-select variant of "Checkbox group". Children: `<Radio value>` or `<ChoiceCard value>`. */
export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(function RadioGroup(
  { value, defaultValue, onChange, name, size, disabled, ...rest },
  ref,
) {
  const autoName = useId();
  const [val, setVal] = useControllableState<string | undefined>(value, defaultValue, (v) => v != null && onChange?.(v));
  return (
    <RadioGroupContext.Provider value={{ name: name ?? autoName, value: val, onChange: setVal, size, disabled }}>
      <GroupFrame role="radiogroup" frameRef={ref} {...rest} />
    </RadioGroupContext.Provider>
  );
});
