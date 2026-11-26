import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { StepIcon, type StepSize, type StepStatus } from './StepIcon';

export type StepType = 'icon-left' | 'featured-icon-left' | 'icon-top' | 'featured-icon-top' | 'text-line' | 'icon-only';

export interface StepProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Status */
  status?: StepStatus;
  /** Figma: Size */
  size?: StepSize;
  /** Figma: Type */
  type?: StepType;
  /** Step title ("Your details"). */
  title?: ReactNode;
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Icon for the featured-icon types. */
  icon?: IconSlot;
  /** Show the vertical connector under the icon (left types). Hide it on the last step. */
  connector?: boolean;
}

const leftGap: Record<StepSize, string> = { sm: 'gap-3', md: 'gap-4', lg: 'gap-4' };
const topGap: Record<StepSize, string> = { sm: 'gap-3', md: 'gap-4', lg: 'gap-4' };
const textSize: Record<StepSize, string> = { sm: 'text-sm', md: 'text-md', lg: 'text-md' };
const textGap: Record<StepSize, string> = { sm: 'gap-0', md: 'gap-0.5', lg: 'gap-0.5' };
const iconLeftPad: Record<StepSize, string> = { sm: 'pt-0.5 pb-6', md: 'pt-1 pb-8', lg: 'pt-1.5 pb-8' };
const featuredLeftPad: Record<StepSize, string> = { sm: 'pt-1 pb-6', md: 'pb-8', lg: 'pb-8' };
const lineTopPad: Record<StepSize, string> = { sm: 'pt-2 pb-3', md: 'pt-3 pb-4', lg: 'pt-4 pb-5' };
const featuredTopSize: Record<StepSize, 'md' | 'lg' | 'xl'> = { sm: 'md', md: 'lg', lg: 'xl' };

/** Title + supporting text block shared by every step type. */
function StepText({
  status,
  size,
  featured,
  center,
  title,
  description,
  className,
}: {
  status: StepStatus;
  size: StepSize;
  featured?: boolean;
  center?: boolean;
  title?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  const current = status === 'current' && !featured;
  return (
    <div className={cx('flex min-w-0 flex-col', textGap[size], textSize[size], center && 'items-center text-center', className)}>
      {title != null && (
        <div className={cx(featured ? 'font-semibold' : 'font-medium', current ? 'text-brand-700' : 'text-gray-700')}>{title}</div>
      )}
      {description != null && <div className={cx('font-normal', current ? 'text-brand-600' : 'text-gray-600')}>{description}</div>}
    </div>
  );
}

/**
 * Step — Figma "_Step base". One step of a progress stepper in any of its layouts
 * (icon left / featured icon left / icon top / featured icon top / text with top line / icon only).
 */
export const Step = forwardRef<HTMLDivElement, StepProps>(function Step(
  { status = 'incomplete', size = 'md', type = 'icon-left', title, description, icon, connector = true, className, ...props },
  ref,
) {
  const aria = status === 'current' ? ({ 'aria-current': 'step' } as const) : {};
  const featured = type === 'featured-icon-left' || type === 'featured-icon-top';
  const dim = featured && status !== 'current' ? 'opacity-60' : '';

  if (type === 'icon-only') {
    return (
      <div ref={ref} className={cx('group/step inline-flex', className)} {...aria} {...props}>
        <StepIcon status={status} size={size} />
      </div>
    );
  }

  if (type === 'text-line') {
    return (
      <div
        ref={ref}
        className={cx(
          'flex flex-col border-t-4',
          lineTopPad[size],
          status === 'incomplete' ? 'border-gray-200' : 'border-brand-600',
          className,
        )}
        {...aria}
        {...props}
      >
        <StepText status={status} size={size} title={title} description={description} />
      </div>
    );
  }

  if (type === 'icon-top' || type === 'featured-icon-top') {
    return (
      <div ref={ref} className={cx('group/step flex flex-col items-center', topGap[size], className)} {...aria} {...props}>
        {type === 'icon-top' ? (
          <StepIcon status={status} size={size} />
        ) : (
          <FeaturedIcon icon={icon} size={featuredTopSize[size]} color="brand" theme="modern" className={cx('relative z-10 bg-white', dim)} />
        )}
        <StepText status={status} size={size} featured={featured} center title={title} description={description} className={dim} />
      </div>
    );
  }

  // icon-left / featured-icon-left
  const lineColor =
    status === 'complete' && type === 'icon-left' ? 'bg-brand-600' : 'bg-gray-200';
  return (
    <div ref={ref} className={cx('group/step flex', leftGap[size], dim, className)} {...aria} {...props}>
      <div className="flex shrink-0 flex-col items-center gap-1 pb-1">
        {type === 'icon-left' ? (
          <StepIcon status={status} size={size} />
        ) : (
          <FeaturedIcon icon={icon} size="lg" color="brand" theme="modern" />
        )}
        <span className={cx('w-0.5 grow rounded-full', connector ? lineColor : 'bg-transparent')} aria-hidden />
      </div>
      <StepText
        status={status}
        size={size}
        featured={featured}
        title={title}
        description={description}
        className={type === 'icon-left' ? iconLeftPad[size] : featuredLeftPad[size]}
      />
    </div>
  );
});
