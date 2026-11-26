import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { IconSlot } from '../../utils/renderIcon';
import { ArrowRight, FolderCheck } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { useMarketingTheme } from '../_shared';
import { areaTone } from '../features/tone';

export type MarketingMetricItemType =
  | 'card-text-and-supporting-text'
  | 'card-text'
  | 'centered-with-supporting-text'
  | 'centered-text'
  | 'left-aligned-with-supporting-text'
  | 'left-aligned-text'
  | 'small-featured-icon'
  | 'small-accent-line';

export interface MarketingMetricItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: MarketingMetricItemType;
  /** Big number (Figma "Number"). */
  number?: ReactNode;
  /** Label (Figma "Text"). */
  label?: ReactNode;
  /** Description (types "… with supporting text" / card text and supporting text). */
  supportingText?: ReactNode;
  /** Icon for `small-featured-icon`. */
  icon?: IconSlot;
  /** Link label (Figma "Learn more" button); `false` hides it. Most Figma sections hide it. */
  actionLabel?: ReactNode | false;
  actionHref?: string;
  /** Card surface override for card types (e.g. glass cards on an image). */
  cardClassName?: string;
}

/** Marketing metric — Figma "_Metric item" (used by MetricsSection). Colors follow the surrounding MarketingSection theme. */
export const MarketingMetricItem = forwardRef<HTMLDivElement, MarketingMetricItemProps>(function MarketingMetricItem(
  {
    type = 'centered-text',
    number = '400+',
    label = 'Projects completed',
    supportingText = 'We’ve helped build over 400 projects with great companies.',
    icon = FolderCheck,
    actionLabel = false,
    actionHref,
    cardClassName,
    className,
    ...props
  },
  ref,
) {
  const { theme } = useMarketingTheme();
  const tone = areaTone(theme);
  const card = type.startsWith('card');
  const centered = card || type.startsWith('centered') || type === 'small-featured-icon';
  const withText = type.endsWith('supporting-text');
  const dark = tone.dark && !card;
  const numberCls = dark ? 'text-white' : 'text-brand-600';
  const labelCls = dark ? (theme === 'brand' ? 'text-brand-200' : 'text-gray-200') : 'text-gray-900';
  const textCls = dark ? (theme === 'brand' ? 'text-brand-200' : 'text-gray-200') : 'text-gray-600';

  const link = actionLabel === false ? null : (
    <Button
      as={actionHref ? 'a' : 'button'}
      href={actionHref}
      size="lg"
      hierarchy="link-color"
      iconTrailing={ArrowRight}
      className={cx(dark && tone.link, 'self-start', centered && 'self-center md:self-center', type === 'small-featured-icon' && 'md:self-start')}
    >
      {actionLabel}
    </Button>
  );

  if (type === 'small-accent-line') {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col gap-5 border-t-2 py-4 md:border-l-2 md:border-t-0 md:px-6 md:py-0', dark ? tone.border : 'border-brand-600', className)}
        {...props}
      >
        <div className="flex flex-col gap-1">
          <p className={cx('text-display-lg font-semibold', numberCls)}>{number}</p>
          <p className={cx('text-lg font-semibold', labelCls)}>{label}</p>
        </div>
        {link}
      </div>
    );
  }

  if (type === 'small-featured-icon') {
    return (
      <div ref={ref} className={cx('flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:gap-5 md:text-left', className)} {...props}>
        <FeaturedIcon icon={icon} size="md" color={tone.featuredColor} theme={tone.featuredTheme} className="md:hidden" />
        <div className="hidden py-1 md:block"><FeaturedIcon icon={icon} size="lg" color={tone.featuredColor} theme={tone.featuredTheme} /></div>
        <div className="flex min-w-0 flex-1 flex-col gap-5">
          <div className="flex flex-col gap-1">
            <p className={cx('text-display-lg font-semibold md:text-display-xl md:leading-[60px]', numberCls)}>{number}</p>
            <p className={cx('text-lg font-medium', labelCls)}>{label}</p>
          </div>
          {link}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        'flex flex-col gap-5',
        centered && 'items-center text-center',
        card && cx('rounded-2xl px-6 py-8', cardClassName ?? 'bg-gray-50'),
        className,
      )}
      {...props}
    >
      <div className={cx('flex w-full flex-col gap-3', centered && 'items-center')}>
        <p className={cx('text-display-lg font-semibold md:text-display-xl', numberCls)}>{number}</p>
        <div className={cx('flex flex-col gap-2', centered && 'items-center')}>
          <p className={cx('text-lg font-medium', labelCls)}>{label}</p>
          {withText && supportingText != null && <p className={cx('text-md', textCls)}>{supportingText}</p>}
        </div>
      </div>
      {link}
    </div>
  );
});
