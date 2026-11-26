import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { HeaderMenuButton } from './CardHeader';

export interface SectionHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  supportingText?: ReactNode;
  /** Figma Type=Buttons / Button group — buttons or a button group on the right. */
  actions?: ReactNode;
  /** Figma Type=Search — search input slot (320px on desktop). */
  search?: ReactNode;
  /** Figma Tabs=True — tabs slot under the heading. */
  tabs?: ReactNode;
  /** Custom menu trigger; overrides the default dots button. */
  menu?: ReactNode;
  /** Shows the default dots-vertical menu button. */
  onMenuClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Bottom divider (default true). */
  divider?: boolean;
  /** Heading level element (default h2). */
  headingAs?: 'h2' | 'h3' | 'h4';
}

/** SectionHeader — Figma "Section header" (buttons / button group / search, optional tabs). */
export const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(function SectionHeader(
  { title, supportingText, actions, search, tabs, menu, onMenuClick, divider = true, headingAs: H = 'h2', className, ...props },
  ref,
) {
  const menuEl = menu ?? (onMenuClick ? <HeaderMenuButton onClick={onMenuClick} /> : null);
  return (
    <div ref={ref} className={cx('flex flex-col gap-5', className)} {...props}>
      <div className="relative flex flex-col gap-4 md:flex-row md:items-start">
        <div className={cx('flex min-w-0 flex-1 flex-col gap-1 self-stretch md:self-center', menuEl && 'max-md:pr-8')}>
          <H className="text-lg font-medium text-gray-900">{title}</H>
          {supportingText != null && <p className="text-sm text-gray-600">{supportingText}</p>}
        </div>
        {actions != null && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        {search != null && <div className="w-full md:w-80 md:shrink-0">{search}</div>}
        {menuEl && <div className="max-md:absolute max-md:top-0 max-md:right-0">{menuEl}</div>}
      </div>
      {tabs}
      {divider && <div className="h-px w-full bg-gray-200" />}
    </div>
  );
});
