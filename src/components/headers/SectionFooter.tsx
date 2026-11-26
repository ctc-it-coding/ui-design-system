import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface SectionFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type — `card` adds horizontal padding (inside a card), `section` is flush. */
  type?: 'card' | 'section';
  /** Figma: Button group=True — leading slot on the left (e.g. a button group). */
  buttonGroup?: ReactNode;
  /** Link-style button left of the actions (e.g. `<Button hierarchy="link-gray">Learn more</Button>`). */
  link?: ReactNode;
  /** Action buttons on the right. */
  actions?: ReactNode;
  /** Top divider (default true). */
  divider?: boolean;
}

/** SectionFooter — Figma "Section footer" (Card / Section, optional button group). */
export const SectionFooter = forwardRef<HTMLDivElement, SectionFooterProps>(function SectionFooter(
  { type = 'section', buttonGroup, link, actions, divider = true, className, children, ...props },
  ref,
) {
  const card = type === 'card';
  return (
    <div ref={ref} className={cx('flex flex-col', card ? 'gap-3 pb-3 md:gap-4 md:pb-4' : 'gap-4 md:gap-5', className)} {...props}>
      {divider && <div className="h-px w-full bg-gray-200" />}
      <div className={cx('flex flex-wrap items-center justify-end', card ? 'gap-4 px-4 md:px-6' : 'gap-4 md:gap-5')}>
        {buttonGroup}
        {link}
        {children}
        {actions != null && <div className="flex flex-1 flex-wrap items-center justify-end gap-3">{actions}</div>}
      </div>
    </div>
  );
});
