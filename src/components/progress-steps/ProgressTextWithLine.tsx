import { forwardRef } from 'react';
import { cx } from '../../utils/cx';
import { Step } from './Step';
import { type StepSize } from './StepIcon';
import { stepStatus, type ProgressBaseProps, type ProgressOrientation, type ProgressStepItem } from './types';

export interface ProgressTextWithLineProps extends ProgressBaseProps {
  items: ProgressStepItem[];
  orientation?: ProgressOrientation;
}

const lineVGap: Record<StepSize, string> = { sm: 'gap-5', md: 'gap-5', lg: 'gap-6' };

/** ProgressTextWithLine — Figma "Progress steps / Progress text with line". */
export const ProgressTextWithLine = forwardRef<HTMLDivElement, ProgressTextWithLineProps>(function ProgressTextWithLine(
  { items, current = 0, size = 'md', orientation = 'horizontal', className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="list"
      aria-label="Progress"
      className={cx('flex', orientation === 'horizontal' ? 'flex-row gap-4' : cx('flex-col', lineVGap[size]), className)}
      {...props}
    >
      {items.map((it, i) => (
        <Step
          key={i}
          role="listitem"
          type="text-line"
          size={size}
          status={it.status ?? stepStatus(i, current)}
          title={it.title}
          description={it.description}
          className={orientation === 'horizontal' ? 'min-w-0 flex-1' : undefined}
        />
      ))}
    </div>
  );
});
