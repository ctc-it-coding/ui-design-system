import { forwardRef } from 'react';
import { cx } from '../../utils/cx';
import { Step } from './Step';
import { stepStatus, type ProgressBaseProps, type ProgressStepItem } from './types';

export interface ProgressIconsWithTextProps extends ProgressBaseProps {
  items: ProgressStepItem[];
  /** Figma: Type — step icon or featured icon. */
  type?: 'icon' | 'featured-icon';
  /** Figma: Connector — vertical lines between steps. */
  connector?: boolean;
}

/** ProgressIconsWithText — Figma "Progress steps / Progress icons with text" (vertical stepper). */
export const ProgressIconsWithText = forwardRef<HTMLDivElement, ProgressIconsWithTextProps>(function ProgressIconsWithText(
  { items, current = 0, size = 'md', type = 'icon', connector = true, className, ...props },
  ref,
) {
  return (
    <div ref={ref} role="list" aria-label="Progress" className={cx('flex flex-col', className)} {...props}>
      {items.map((it, i) => (
        <Step
          key={i}
          role="listitem"
          type={type === 'featured-icon' ? 'featured-icon-left' : 'icon-left'}
          size={size}
          status={it.status ?? stepStatus(i, current)}
          title={it.title}
          description={it.description}
          icon={it.icon}
          connector={connector && i < items.length - 1}
        />
      ))}
    </div>
  );
});
