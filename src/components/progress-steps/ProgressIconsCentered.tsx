import { forwardRef } from 'react';
import { cx } from '../../utils/cx';
import { Step } from './Step';
import { type StepSize } from './StepIcon';
import { ProgressIconsWithText } from './ProgressIconsWithText';
import { stepStatus, type ProgressBaseProps, type ProgressOrientation, type ProgressStepItem } from './types';

export interface ProgressIconsCenteredProps extends ProgressBaseProps {
  items: ProgressStepItem[];
  /** Figma: Type — step icon or featured icon. */
  type?: 'icon' | 'featured-icon';
  /** Horizontal = centered icons on top (desktop); vertical = icons left (mobile). */
  orientation?: ProgressOrientation;
}

/** Distance from the top of a step to the icon's vertical centre (line position). */
const centerTop: Record<'icon' | 'featured-icon', Record<StepSize, string>> = {
  icon: { sm: 'top-[11px]', md: 'top-[15px]', lg: 'top-[19px]' },
  'featured-icon': { sm: 'top-[19px]', md: 'top-[23px]', lg: 'top-[27px]' },
};

/** ProgressIconsCentered — Figma "Progress steps / Progress icons centered". */
export const ProgressIconsCentered = forwardRef<HTMLDivElement, ProgressIconsCenteredProps>(function ProgressIconsCentered(
  { items, current = 0, size = 'md', type = 'icon', orientation = 'horizontal', className, ...props },
  ref,
) {
  if (orientation === 'vertical') {
    return (
      <ProgressIconsWithText
        ref={ref}
        items={items}
        current={current}
        size={size}
        type={type}
        className={className}
        {...props}
      />
    );
  }
  const featured = type === 'featured-icon';
  return (
    <div ref={ref} role="list" aria-label="Progress" className={cx('flex flex-row gap-4', className)} {...props}>
      {items.map((it, i) => {
        const status = it.status ?? stepStatus(i, current);
        const done = status === 'complete';
        return (
          <div key={i} role="listitem" className="relative min-w-0 flex-1">
            {i < items.length - 1 && (
              <span
                aria-hidden
                className={cx(
                  'absolute left-1/2 h-0.5 w-[calc(100%+16px)]',
                  centerTop[type][size],
                  done ? (featured ? 'bg-gray-700' : 'bg-brand-600') : 'bg-gray-200',
                )}
              />
            )}
            <Step
              type={featured ? 'featured-icon-top' : 'icon-top'}
              size={size}
              status={status}
              title={it.title}
              description={it.description}
              icon={it.icon}
            />
          </div>
        );
      })}
    </div>
  );
});
