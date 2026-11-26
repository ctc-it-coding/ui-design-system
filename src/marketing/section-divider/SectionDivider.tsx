import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface SectionDividerProps extends HTMLAttributes<HTMLDivElement> {
  /** Line color class (default `bg-gray-200`; e.g. `bg-gray-800` on dark pages). */
  lineClassName?: string;
}

/** SectionDivider — Figma "–––– Section divider ––––": a 1px gray-200 rule inside the 1280px container (32px / 16px side padding). */
export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(function SectionDivider({ lineClassName, className, ...props }, ref) {
  return (
    <div ref={ref} role="separator" className={cx('mx-auto w-full max-w-[1280px] px-4 md:px-8', className)} {...props}>
      <div className={cx('h-px w-full', lineClassName ?? 'bg-gray-200')} />
    </div>
  );
});
