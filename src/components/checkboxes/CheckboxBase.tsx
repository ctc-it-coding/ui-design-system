import type { HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { Check, Minus } from '../../icons';

export type CheckboxSize = 'sm' | 'md';

export interface CheckboxBaseProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Size */
  size?: CheckboxSize;
  /** Figma: Type */
  type?: 'checkbox' | 'radio';
  /** Figma: Checked */
  checked?: boolean;
  /** Figma: Indeterminate (checkbox only) */
  indeterminate?: boolean;
  /** Renders the disabled look. */
  disabled?: boolean;
  /**
   * When true the box shows the focus ring while the preceding `peer` input is focus-visible.
   * Used by Checkbox / Radio; leave false for purely decorative use (menus, cards).
   */
  peerFocus?: boolean;
}

/**
 * Visual-only checkbox / radio box — Figma "_Checkbox base".
 * Used inside Checkbox, Radio, ChoiceCard, dropdown menus and multi-selects.
 */
export function CheckboxBase({
  size = 'sm',
  type = 'checkbox',
  checked = false,
  indeterminate = false,
  disabled = false,
  peerFocus = false,
  className,
  ...props
}: CheckboxBaseProps) {
  const on = checked || indeterminate;
  const isRadio = type === 'radio';
  return (
    <span
      aria-hidden
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center border transition-colors duration-100',
        size === 'sm' ? 'size-4' : 'size-5',
        isRadio ? 'rounded-full' : size === 'sm' ? 'rounded-sm' : 'rounded-md',
        disabled
          ? 'border-gray-300 bg-gray-50'
          : on
            ? 'border-brand-600 bg-brand-600'
            : 'border-gray-300 bg-white',
        peerFocus &&
          (on && !disabled
            ? 'peer-focus-visible:ring-4 peer-focus-visible:ring-brand-500/24'
            : 'peer-focus-visible:ring-4 peer-focus-visible:ring-gray-400/14'),
        className,
      )}
      {...props}
    >
      {on && isRadio && (
        <span className={cx('rounded-full', size === 'sm' ? 'size-1.5' : 'size-2', disabled ? 'bg-gray-300' : 'bg-white')} />
      )}
      {on && !isRadio && (indeterminate ? (
        <Minus className={cx(size === 'sm' ? 'size-3' : 'size-3.5', disabled ? 'text-gray-300' : 'text-white')} strokeWidth={size === 'sm' ? 3.3 : 3.4} />
      ) : (
        <Check className={cx(size === 'sm' ? 'size-3' : 'size-3.5', disabled ? 'text-gray-300' : 'text-white')} strokeWidth={size === 'sm' ? 3.3 : 3.4} />
      ))}
    </span>
  );
}
