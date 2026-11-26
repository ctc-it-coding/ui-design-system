import { Fragment, forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { StepIcon, type StepSize } from './StepIcon';
import { stepStatus, type ProgressBaseProps, type ProgressOrientation } from './types';

export interface ProgressMinimalIconsProps extends ProgressBaseProps {
  /** Number of steps. */
  steps: number;
  /** Figma "Progress minimal icons connected" — join icons with a line. */
  connected?: boolean;
  /** Figma: Text — show "Step X of N" (true) or a custom label. */
  text?: boolean | ReactNode;
  /** Layout direction. */
  orientation?: ProgressOrientation;
}

const minimalGap: Record<StepSize, string> = { sm: 'gap-3', md: 'gap-4', lg: 'gap-5' };

/**
 * ProgressMinimalIcons — Figma "Progress steps / Progress minimal icons" and "… minimal icons connected".
 */
export const ProgressMinimalIcons = forwardRef<HTMLDivElement, ProgressMinimalIconsProps>(function ProgressMinimalIcons(
  { steps, current = 0, size = 'md', connected = false, text = false, orientation = 'horizontal', className, ...props },
  ref,
) {
  const vertical = orientation === 'vertical';
  const label = text === true ? `Step ${Math.min(current + 1, steps)} of ${steps}` : text || null;
  return (
    <div
      ref={ref}
      className={cx('flex items-center', vertical ? 'flex-col' : 'flex-row', minimalGap[size], className)}
      {...props}
    >
      {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
      <ol
        aria-label="Progress"
        className={cx('flex items-center', vertical ? 'flex-col' : 'flex-row', !connected && minimalGap[size])}
      >
        {Array.from({ length: steps }, (_, i) => {
          const status = stepStatus(i, current);
          return (
            <Fragment key={i}>
              {connected && i > 0 && (
                <li
                  aria-hidden
                  className={cx(
                    vertical ? 'h-12 w-0.5' : 'h-0.5 w-12 sm:w-20',
                    stepStatus(i - 1, current) === 'complete' ? 'bg-brand-600' : 'bg-gray-200',
                  )}
                />
              )}
              <li className="group/step flex" aria-current={status === 'current' ? 'step' : undefined}>
                <StepIcon status={status} size={size} aria-label={`Step ${i + 1}${status === 'complete' ? ', complete' : ''}`} />
              </li>
            </Fragment>
          );
        })}
      </ol>
    </div>
  );
});
