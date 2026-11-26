import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { HelpCircle } from '../../icons';
import { Tooltip, type TooltipAlign, type TooltipPlacement, type TooltipTheme } from './Tooltip';

export interface HelpIconProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'title'> {
  /** Tooltip title. */
  title: ReactNode;
  /** Figma: Supporting text=True */
  supportingText?: ReactNode;
  /** Tooltip theme (Figma tooltips here are dark). */
  theme?: TooltipTheme;
  /** Figma: Tooltip=Top arrow / Top no arrow / Top right / Top left … */
  placement?: TooltipPlacement;
  align?: TooltipAlign;
  arrow?: boolean;
  /** Icon size in px class (default 16px). */
  iconClassName?: string;
}

/** HelpIcon — Figma "Tooltips/Help icon": a 16px help-circle that reveals a tooltip on hover/focus. */
export const HelpIcon = forwardRef<HTMLButtonElement, HelpIconProps>(function HelpIcon(
  { title, supportingText, theme = 'dark', placement = 'top', align = 'center', arrow = true, iconClassName, className, ...props },
  ref,
) {
  return (
    <Tooltip title={title} supportingText={supportingText} theme={theme} placement={placement} align={align} arrow={arrow}>
      <button
        ref={ref}
        type="button"
        aria-label={typeof title === 'string' ? title : 'Help'}
        className={cx(
          'flex cursor-pointer items-center justify-center rounded-full text-gray-400 outline-none transition-colors duration-100',
          'hover:text-gray-500 focus-visible:text-gray-500 focus-visible:ring-4 focus-visible:ring-gray-400/14',
          className,
        )}
        {...props}
      >
        <HelpCircle className={cx('size-4', iconClassName)} />
      </button>
    </Tooltip>
  );
});
