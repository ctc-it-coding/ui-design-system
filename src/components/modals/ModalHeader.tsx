import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { CloseButton } from '../buttons/CloseButton';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { useDialogContext } from './overlay';

export type ModalHeaderType = 'horizontal-left-aligned' | 'center-aligned' | 'left-aligned';
export type ModalIconColor = 'brand' | 'gray' | 'error' | 'warning' | 'success';
export type ModalIconTheme = 'light' | 'light-outline' | 'modern' | 'dark-outline' | 'outline';

export interface ModalHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: ModalHeaderType;
  /** Featured icon (lg) shown before / above the title. */
  icon?: IconSlot;
  /** Featured icon colour. Default "brand". */
  iconColor?: ModalIconColor;
  /** Featured icon theme. Figma uses "Light outline". */
  iconTheme?: ModalIconTheme;
  /** Replaces the featured icon with custom media (avatar group, image …). */
  media?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Show the "Button close X" (lg). Default true. */
  closeButton?: boolean;
  /** Close handler; defaults to the parent Modal's close. */
  onClose?: () => void;
  /** Figma "Padding bottom + Divider": 20px gap and a gray-200 rule under the header. */
  divider?: boolean;
}

/** ModalHeader — Figma "_Modal header" (Horizontal left aligned / Center aligned / Left aligned). */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(function ModalHeader(
  {
    type = 'left-aligned',
    icon,
    iconColor = 'brand',
    iconTheme = 'light-outline',
    media,
    title,
    description,
    closeButton = true,
    onClose,
    divider = false,
    className,
    ...props
  },
  ref,
) {
  const ctx = useDialogContext();
  const close = onClose ?? ctx?.onClose;
  const horizontal = type === 'horizontal-left-aligned';
  const center = type === 'center-aligned';

  const visual = media ?? (icon ? <FeaturedIcon icon={icon} size="lg" color={iconColor} theme={iconTheme} /> : null);

  return (
    <div ref={ref} className={cx('relative flex w-full flex-col', className)} {...props}>
      <div
        className={cx(
          'flex gap-3 px-4 pt-5 sm:gap-4 sm:px-6 sm:pt-6',
          horizontal ? 'flex-col sm:flex-row' : 'flex-col',
          center && 'items-center text-center',
        )}
      >
        {visual && <div className={cx('flex shrink-0', center && 'justify-center')}>{visual}</div>}
        <div className={cx('flex min-w-0 flex-1 flex-col gap-1', center && 'items-center')}>
          <h2 id={ctx?.titleId} className={cx('text-lg font-semibold text-gray-900', !center && closeButton && 'pr-8')}>
            {title}
          </h2>
          {description != null && (
            <div id={ctx?.descriptionId} className="text-sm text-gray-600">
              {description}
            </div>
          )}
        </div>
      </div>
      {divider && (
        <>
          <div className="h-5" />
          <div className="h-px w-full bg-gray-200" />
        </>
      )}
      {closeButton && close && (
        <CloseButton
          size="lg"
          onClick={close}
          className={cx('absolute top-3 right-3', !horizontal && 'sm:top-4 sm:right-4')}
        />
      )}
    </div>
  );
});
