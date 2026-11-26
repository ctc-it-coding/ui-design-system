import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { XClose } from '../../icons';

export type CloseButtonSize = 'sm' | 'md' | 'lg';

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Size (sm 36px, md 40px, lg 44px) */
  size?: CloseButtonSize;
  /** Figma: Dark background=True */
  dark?: boolean;
  /** Accessible label (default "Close"). */
  label?: string;
}

const sizes: Record<CloseButtonSize, { box: string; icon: string }> = {
  sm: { box: 'size-9', icon: 'size-5' },
  md: { box: 'size-10', icon: 'size-5' },
  lg: { box: 'size-11', icon: 'size-6' },
};

/** CloseButton — Figma "Buttons/Button close X". */
export const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>(function CloseButton(
  { size = 'sm', dark = false, label = 'Close', className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-label={label}
      className={cx(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-lg outline-none transition-colors duration-100',
        'focus-visible:ring-4 focus-visible:ring-gray-400/14 disabled:cursor-not-allowed disabled:opacity-50',
        dark
          ? 'text-white/70 hover:bg-white/20 hover:text-white focus-visible:bg-white/20'
          : 'text-gray-400 hover:bg-gray-50 hover:text-gray-500 focus-visible:bg-gray-50',
        sizes[size].box,
        className,
      )}
      {...props}
    >
      <XClose className={sizes[size].icon} />
    </button>
  );
});
