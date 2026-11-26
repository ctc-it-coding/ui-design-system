import { forwardRef, type ChangeEvent, type InputHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { IconSlot } from '../../utils/renderIcon';
import { useControllableState } from '../inputs/useControllableState';
import { Avatar } from '../avatars/Avatar';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { CheckboxBase, type CheckboxSize } from './CheckboxBase';
import { useCheckboxGroup, useRadioGroup } from './groupContext';

export type ChoiceCardType = 'radio-button' | 'checkbox' | 'icon-simple' | 'avatar' | 'payment-icon' | 'icon-card';

export interface ChoiceCardProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'onChange' | 'checked' | 'defaultChecked' | 'value' | 'title'> {
  /** Figma: Type */
  type?: ChoiceCardType;
  /** Figma: Size */
  size?: CheckboxSize;
  /** Figma: Selected (controlled). Derived from the surrounding CheckboxGroup / RadioGroup when inside one. */
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean, event: ChangeEvent<HTMLInputElement>) => void;
  /** Value matched against the group value. */
  value?: string;
  /** "Text" — main title (e.g. "Basic plan", "Olivia Rhye", "Visa ending in 1234"). */
  title: ReactNode;
  /** "Subtext" shown next to the title (e.g. "$10/month", "@olivia"). */
  subtext?: ReactNode;
  /** "Supporting text" below the title. */
  description?: ReactNode;
  /** Featured icon for `icon-simple` / `icon-card` (rendered as a brand light-outline featured icon). */
  icon?: IconSlot;
  /** Avatar image for `avatar`. */
  avatarSrc?: string;
  /** Avatar initials fallback for `avatar`. */
  avatarInitials?: string;
  /** Payment method icon slot for `payment-icon` (e.g. `<PaymentIcon method="visa" />`). */
  paymentIcon?: ReactNode;
  /** Actions row for `payment-icon` (e.g. link buttons "Set as default" / "Edit"). */
  actions?: ReactNode;
  /** `icon-card`: price ("$10"). */
  price?: ReactNode;
  /** `icon-card`: period next to price ("per month"). */
  period?: ReactNode;
  /** `icon-card`: badge shown at the right of the body (e.g. `<Badge>`). */
  badge?: ReactNode;
  className?: string;
}

/**
 * ChoiceCard — Figma "Checkbox group item": a selectable card used inside CheckboxGroup / RadioGroup.
 * The whole card is a `<label>` wrapping a visually hidden checkbox / radio input.
 */
export const ChoiceCard = forwardRef<HTMLInputElement, ChoiceCardProps>(function ChoiceCard(
  {
    type = 'checkbox',
    size,
    checked,
    defaultChecked = false,
    onChange,
    value,
    title,
    subtext,
    description,
    icon,
    avatarSrc,
    avatarInitials,
    paymentIcon,
    actions,
    price,
    period,
    badge,
    disabled,
    name,
    className,
    ...props
  },
  ref,
) {
  const radioGroup = useRadioGroup();
  const checkGroup = useCheckboxGroup();
  const sz: CheckboxSize = size ?? radioGroup?.size ?? checkGroup?.size ?? 'md';
  const asRadio = radioGroup != null || (type === 'radio-button' && checkGroup == null);
  const groupChecked = radioGroup
    ? radioGroup.value === value
    : checkGroup && value != null
      ? checkGroup.value.includes(value)
      : undefined;
  const [isChecked, setChecked] = useControllableState<boolean>(checked ?? groupChecked, defaultChecked);
  const isDisabled = disabled || radioGroup?.disabled || checkGroup?.disabled;
  const sm = sz === 'sm';

  const indicator = (
    <CheckboxBase type={type === 'radio-button' ? 'radio' : 'checkbox'} size={sz} checked={isChecked} disabled={isDisabled} />
  );
  const input = (
    <input
      ref={ref}
      type={asRadio ? 'radio' : 'checkbox'}
      name={name ?? radioGroup?.name}
      value={value}
      checked={isChecked}
      disabled={isDisabled}
      className="sr-only"
      onChange={(e) => {
        setChecked(e.target.checked);
        if (radioGroup && value != null && e.target.checked) radioGroup.onChange(value);
        if (checkGroup && value != null) checkGroup.onToggle(value, e.target.checked);
        onChange?.(e.target.checked, e);
      }}
      {...props}
    />
  );

  const textSize = sm ? 'text-sm' : 'text-md';
  const titleRow = (
    <span className={cx('flex flex-wrap items-baseline', sm ? 'gap-1' : 'gap-1.5')}>
      <span className={cx('font-medium text-gray-700', textSize)}>{title}</span>
      {subtext != null && <span className={cx('text-gray-600', textSize)}>{subtext}</span>}
    </span>
  );
  const textBlock = (
    <span className={cx('flex min-w-0 flex-1 flex-col', !sm && 'gap-0.5')}>
      {titleRow}
      {description != null && <span className={cx('text-gray-600', textSize)}>{description}</span>}
    </span>
  );

  const frame = cx(
    'relative flex w-full rounded-xl border bg-white text-left transition-colors duration-100',
    'has-focus-visible:ring-4 has-focus-visible:ring-brand-500/24',
    isDisabled
      ? 'cursor-not-allowed border-gray-200 bg-gray-50'
      : isChecked
        ? 'cursor-pointer border-brand-600 inset-ring-1 inset-ring-brand-600'
        : 'cursor-pointer border-gray-200 hover:border-gray-300',
    isDisabled && isChecked && 'inset-ring-1 inset-ring-gray-200',
    className,
  );

  if (type === 'icon-card') {
    const headerBorder = isDisabled ? 'border-gray-200' : isChecked ? 'border-brand-600 border-b-2' : 'border-gray-200';
    return (
      <label className={cx(frame, 'flex-col overflow-hidden')}>
        {input}
        <span className={cx('flex items-center gap-1 border-b py-4 pr-5 pl-4', headerBorder)}>
          <span className="flex min-w-0 flex-1 items-center gap-4">
            {icon != null && (
              <span className={cx('flex shrink-0 items-center justify-center', sm ? 'size-7' : 'size-8')}>
                <FeaturedIcon icon={icon} size={sm ? 'sm' : 'md'} color="brand" theme="light-outline" />
              </span>
            )}
            <span className={cx('flex-1 font-medium text-gray-700', textSize)}>{title}</span>
          </span>
          {indicator}
        </span>
        <span className="flex flex-col gap-4 p-4 sm:flex-row sm:items-start sm:gap-1">
          <span className={cx('flex min-w-0 flex-1 flex-col', sm ? 'gap-1' : 'gap-2')}>
            {(price != null || period != null) && (
              <span className="flex items-end gap-1">
                {price != null && <span className="text-display-sm font-medium text-gray-700">{price}</span>}
                {period != null && <span className="pb-[3px] text-sm text-gray-600">{period}</span>}
              </span>
            )}
            {description != null && <span className="text-sm text-gray-600">{description}</span>}
          </span>
          {badge != null && <span className="order-first shrink-0 sm:order-none">{badge}</span>}
        </span>
      </label>
    );
  }

  if (type === 'radio-button' || type === 'checkbox') {
    return (
      <label className={cx(frame, 'p-4')}>
        {input}
        <span className={cx('flex flex-1 items-start', sm ? 'gap-2' : 'gap-3')}>
          <span className="flex shrink-0 py-0.5">{indicator}</span>
          {textBlock}
        </span>
      </label>
    );
  }

  let media: ReactNode = null;
  if (type === 'icon-simple' && icon != null) media = <FeaturedIcon icon={icon} size={sz} color="brand" theme="light-outline" />;
  if (type === 'avatar') media = <Avatar size={sm ? 'sm' : 'md'} src={avatarSrc} initials={avatarInitials} />;
  if (type === 'payment-icon') media = <span className="flex h-8 w-[46px] shrink-0 items-center justify-center">{paymentIcon}</span>;

  const gap = type === 'icon-simple' || !sm ? 'gap-4' : 'gap-3';
  return (
    <label className={cx(frame, 'gap-1 p-4')}>
      {input}
      <span className={cx('flex min-w-0 flex-1 items-start', gap)}>
        {media}
        {type === 'payment-icon' ? (
          <span className={cx('flex min-w-0 flex-1 flex-col', sm ? 'gap-2' : 'gap-3')}>
            {textBlock}
            {actions != null && <span className="flex items-center gap-3">{actions}</span>}
          </span>
        ) : (
          textBlock
        )}
      </span>
      {indicator}
    </label>
  );
});
