import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CheckIcon, type CheckIconColor, type CheckIconType } from '../../components/misc-icons/CheckIcon';

export type PricingCheckItemSize = 'sm' | 'md';

export interface PricingCheckItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Figma: Type (Default = tinted circle · Filled = solid circle · Line = check-circle outline) */
  type?: CheckIconType;
  /** Figma: Size (sm = 24px icon + 16/24 text · md = 28px icon + 18/28 text) */
  size?: PricingCheckItemSize;
  /** Figma: Color */
  color?: CheckIconColor;
  /** Text color class (defaults to gray-600). */
  textClassName?: string;
  children?: ReactNode;
}

/**
 * PricingCheckItem — Figma "Check item text": check icon + one line of text.
 * Renders an `<li>`; wrap several in a `<ul>` (see `PricingCheckList`).
 */
export const PricingCheckItem = forwardRef<HTMLLIElement, PricingCheckItemProps>(function PricingCheckItem(
  { type = 'default', size = 'sm', color = 'primary', textClassName, className, children, ...props },
  ref,
) {
  return (
    <li ref={ref} className={cx('flex items-start gap-3', className)} {...props}>
      <CheckIcon type={type} size={size === 'md' ? 'md' : 'sm'} color={color} />
      <span className={cx(size === 'md' ? 'text-md md:text-lg' : 'text-md', 'min-w-0 pt-px', textClassName ?? 'text-gray-600')}>{children}</span>
    </li>
  );
});

export interface PricingCheckListProps extends Omit<HTMLAttributes<HTMLUListElement>, 'color'> {
  items: ReactNode[];
  type?: CheckIconType;
  size?: PricingCheckItemSize;
  color?: CheckIconColor;
  textClassName?: string;
  /** Two columns from `md` up (Figma "Dual check items"). */
  columns?: 1 | 2;
}

/** A vertical list of `PricingCheckItem`s (gap 16px sm / 20px md). */
export function PricingCheckList({ items, type, size = 'sm', color, textClassName, columns = 1, className, ...props }: PricingCheckListProps) {
  return (
    <ul
      className={cx(
        columns === 2 ? 'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-x-8' : cx('flex flex-col', size === 'md' ? 'gap-4 md:gap-5' : 'gap-4'),
        className,
      )}
      {...props}
    >
      {items.map((item, i) => (
        <PricingCheckItem key={i} type={type} size={size} color={color} textClassName={textClassName}>
          {item}
        </PricingCheckItem>
      ))}
    </ul>
  );
}
