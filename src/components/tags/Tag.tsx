import { forwardRef, useId, useState, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Check, XClose } from '../../icons';

export type TagSize = 'sm' | 'md' | 'lg';

export interface TagProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'onChange'> {
  /** Figma: Size */
  size?: TagSize;
  /** Figma: Icon=Dot */
  dot?: boolean;
  /** Dot colour class (default `bg-success-500`). */
  dotClassName?: string;
  /** Figma: Icon=Avatar — 16px avatar image. */
  avatarSrc?: string;
  /** Figma: Icon=Country — a 16px flag element. */
  flag?: ReactNode;
  /** Figma: Action=Count — number shown after the label. */
  count?: ReactNode;
  /** Figma: Action=X close — shows the close X; called on click. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Figma: Checkbox=True — shows a leading checkbox. */
  checkbox?: boolean;
  /** Controlled checked state of the checkbox. */
  checked?: boolean;
  /** Uncontrolled initial checked state. */
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Disables the checkbox and close X. */
  disabled?: boolean;
  children?: ReactNode;
}

const sizeCls: Record<TagSize, string> = {
  sm: 'h-6 py-[3px] text-xs gap-[3px]',
  md: 'h-6 py-0.5 text-sm gap-[3px]',
  lg: 'h-7 py-1 text-sm gap-[3px]',
};
const contentGap: Record<TagSize, string> = { sm: 'gap-1', md: 'gap-[5px]', lg: 'gap-1.5' };
type Lead = 'none' | 'dot' | 'media' | 'checkbox';
const pl: Record<Lead, Record<TagSize, string>> = {
  none: { sm: 'pl-2', md: 'pl-[9px]', lg: 'pl-2.5' },
  dot: { sm: 'pl-1.5', md: 'pl-[7px]', lg: 'pl-[9px]' },
  media: { sm: 'pl-1', md: 'pl-[5px]', lg: 'pl-[7px]' },
  checkbox: { sm: 'pl-[5px]', md: 'pl-1', lg: 'pl-[5px]' },
};
type Trail = 'none' | 'close' | 'count';
const pr: Record<Trail, Record<TagSize, string>> = {
  none: { sm: 'pr-2', md: 'pr-[9px]', lg: 'pr-2.5' },
  close: { sm: 'pr-1', md: 'pr-1', lg: 'pr-1' },
  count: { sm: 'pr-1', md: 'pr-[3px]', lg: 'pr-1' },
};
const checkboxSize: Record<TagSize, { box: string; icon: string }> = {
  sm: { box: 'size-3.5', icon: 'size-2.5' },
  md: { box: 'size-4', icon: 'size-3' },
  lg: { box: 'size-[18px]', icon: 'size-3.5' },
};
const closeSize: Record<TagSize, { box: string; icon: string }> = {
  sm: { box: 'size-3.5 p-0.5', icon: 'size-2.5' },
  md: { box: 'size-4 p-0.5', icon: 'size-3' },
  lg: { box: 'size-5 p-[3px]', icon: 'size-3.5' },
};
const countCls: Record<TagSize, string> = {
  sm: 'h-4 px-1 text-xs',
  md: 'h-[18px] px-[5px] text-xs',
  lg: 'h-5 px-1.5 text-sm',
};

/** Tag — Figma "Tags/Tag": label chip with optional checkbox, dot/avatar/flag, count and close X. */
export const Tag = forwardRef<HTMLSpanElement, TagProps>(function Tag(
  {
    size = 'md',
    dot,
    dotClassName,
    avatarSrc,
    flag,
    count,
    onRemove,
    checkbox,
    checked: checkedProp,
    defaultChecked = false,
    onCheckedChange,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const labelId = useId();
  const [inner, setInner] = useState(defaultChecked);
  const checked = checkedProp ?? inner;
  const toggle = () => {
    if (disabled) return;
    if (checkedProp === undefined) setInner(!checked);
    onCheckedChange?.(!checked);
  };

  const lead: Lead = checkbox ? 'checkbox' : avatarSrc || flag ? 'media' : dot ? 'dot' : 'none';
  const trail: Trail = onRemove ? 'close' : count != null ? 'count' : 'none';

  return (
    <span
      ref={ref}
      className={cx(
        'inline-flex w-max shrink-0 items-center whitespace-nowrap rounded-md bg-white font-medium text-gray-700 ring-1 ring-gray-300 ring-inset',
        sizeCls[size],
        pl[lead][size],
        pr[trail][size],
        className,
      )}
      {...props}
    >
      <span className={cx('flex items-center', contentGap[size])}>
        {checkbox && (
          <button
            type="button"
            role="checkbox"
            aria-checked={checked}
            aria-labelledby={labelId}
            disabled={disabled}
            onClick={toggle}
            className={cx(
              'flex shrink-0 cursor-pointer items-center justify-center rounded-sm outline-0 transition-colors duration-100 focus-visible:outline-4 focus-visible:outline-solid',
              checkboxSize[size].box,
              checked
                ? 'bg-brand-600 text-white ring-1 ring-brand-600 ring-inset hover:bg-brand-700 hover:ring-brand-700 focus-visible:outline-brand-500/24'
                : 'bg-white ring-1 ring-gray-300 ring-inset focus-visible:outline-gray-400/14',
              'disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-300 disabled:ring-gray-300',
            )}
          >
            {checked && <Check className={checkboxSize[size].icon} strokeWidth={3} />}
          </button>
        )}
        {(avatarSrc || flag) &&
          (avatarSrc ? (
            <img src={avatarSrc} alt="" className="size-4 shrink-0 rounded-full object-cover" />
          ) : (
            <span className="flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full [&>*]:size-4">{flag}</span>
          ))}
        {dot && !avatarSrc && !flag && (
          <span className="flex size-2 shrink-0 items-center justify-center" aria-hidden>
            <span className={cx('size-1.5 rounded-full', dotClassName ?? 'bg-success-500')} />
          </span>
        )}
        <span id={labelId}>{children}</span>
        {count != null && !onRemove && (
          <span className={cx('flex items-center justify-center rounded-[3px] bg-gray-100 font-medium text-gray-700', countCls[size])}>{count}</span>
        )}
      </span>
      {onRemove && (
        <button
          type="button"
          aria-label="Remove"
          disabled={disabled}
          onClick={onRemove}
          className={cx(
            'flex shrink-0 cursor-pointer items-center justify-center rounded-[3px] text-gray-400 outline-none transition-colors duration-100',
            'hover:bg-gray-50 hover:text-gray-500 focus-visible:ring-2 focus-visible:ring-gray-400/40 disabled:cursor-not-allowed disabled:text-gray-300',
            closeSize[size].box,
          )}
        >
          <XClose className={closeSize[size].icon} />
        </button>
      )}
    </span>
  );
});
