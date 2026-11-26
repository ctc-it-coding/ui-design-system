import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { HelpIcon } from '../tooltips/HelpIcon';

export interface SectionLabelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Size */
  size?: 'sm' | 'md';
  title: ReactNode;
  /** Figma: Supporting text=True */
  supportingText?: ReactNode;
  /** Figma: Help icon=True — tooltip text for the help icon next to the title. */
  help?: ReactNode;
  /** Figma: Actions=True — link buttons under the text (e.g. link-gray / link-color Buttons). */
  actions?: ReactNode;
  /** Associates the label with a control (renders a `<label>`). */
  htmlFor?: string;
}

/** SectionLabel — Figma "Section label": the left-hand label column of settings forms. */
export const SectionLabel = forwardRef<HTMLDivElement, SectionLabelProps>(function SectionLabel(
  { size = 'sm', title, supportingText, help, actions, htmlFor, className, ...props },
  ref,
) {
  const T: 'label' | 'p' = htmlFor ? 'label' : 'p';
  return (
    <div ref={ref} className={cx('flex flex-col gap-3', className)} {...props}>
      <div className="flex flex-col">
        <div className={cx('flex items-center', size === 'sm' ? 'gap-0.5' : 'gap-1')}>
          <T htmlFor={htmlFor} className={cx('font-semibold text-gray-700', size === 'sm' ? 'text-sm' : 'text-md')}>
            {title}
          </T>
          {help != null && <HelpIcon title={help} />}
        </div>
        {supportingText != null && <p className={cx('text-gray-600', size === 'sm' ? 'text-sm' : 'text-md')}>{supportingText}</p>}
      </div>
      {actions != null && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
});
