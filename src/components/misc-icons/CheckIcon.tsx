import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { CheckCircle } from '../../icons';

export type CheckIconType = 'default' | 'filled' | 'line';
export type CheckIconSize = 'xs' | 'sm' | 'md' | 'lg';
export type CheckIconColor = 'primary' | 'gray' | 'success';

export interface CheckIconProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Type (Default = tinted circle with solid tick · Filled = solid circle with white tick · Line = check-circle) */
  type?: CheckIconType;
  /** Figma: Size (xs 20 · sm 24 · md 28 · lg 32 px) */
  size?: CheckIconSize;
  /** Figma: Color */
  color?: CheckIconColor;
}

const sizeCls: Record<CheckIconSize, string> = { xs: 'size-5', sm: 'size-6', md: 'size-7', lg: 'size-8' };
const colors: Record<CheckIconColor, { tint: string; mark: string; solid: string }> = {
  primary: { tint: 'bg-brand-100', mark: 'text-brand-600', solid: 'bg-brand-600' },
  gray: { tint: 'bg-gray-100', mark: 'text-gray-500', solid: 'bg-gray-600' },
  success: { tint: 'bg-success-100', mark: 'text-success-500', solid: 'bg-success-600' },
};

// Figma tick (Type=Default), 28×28 artboard.
const TICK =
  'M19.946 8.622L11.593 16.683L9.376 14.315C8.968 13.93 8.326 13.907 7.859 14.233C7.404 14.572 7.276 15.167 7.556 15.645L10.181 19.915C10.438 20.312 10.881 20.557 11.383 20.557C11.861 20.557 12.316 20.312 12.573 19.915C12.993 19.367 21.008 9.812 21.008 9.812C22.057 8.738 20.786 7.793 19.946 8.61Z';

/** CheckIcon — Figma "Misc icons/Check icon" (feature-list ticks). Decorative (aria-hidden). */
export const CheckIcon = forwardRef<HTMLSpanElement, CheckIconProps>(function CheckIcon(
  { type = 'default', size = 'sm', color = 'primary', className, ...props },
  ref,
) {
  const c = colors[color];
  return (
    <span
      ref={ref}
      aria-hidden
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-full',
        sizeCls[size],
        type === 'default' && cx(c.tint, c.mark),
        type === 'filled' && cx(c.solid, 'text-white'),
        type === 'line' && c.mark,
        className,
      )}
      {...props}
    >
      {type === 'line' ? (
        <CheckCircle className="size-full" />
      ) : (
        <svg viewBox="0 0 28 28" className="size-full" fill="none">
          {type === 'default' ? (
            <path d={TICK} fill="currentColor" fillRule="evenodd" />
          ) : (
            <path d="M8.75 14L12.25 17.5L19.25 10.5" stroke="currentColor" strokeWidth={2.33} strokeLinecap="round" strokeLinejoin="round" />
          )}
        </svg>
      )}
    </span>
  );
});
