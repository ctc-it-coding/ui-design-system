import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, InfoCircle, Play } from '../../icons';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { Avatar } from '../avatars/Avatar';
import { Button } from '../buttons/Button';
import { CloseButton } from '../buttons/CloseButton';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { ProgressBar } from '../progress/ProgressBar';
import { type AlertAction } from './Alert';

export type NotificationType =
  | 'primary-icon'
  | 'gray-icon'
  | 'success-icon'
  | 'warning-icon'
  | 'error-icon'
  | 'no-icon'
  | 'avatar'
  | 'image'
  | 'progress-indicator';

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: NotificationType;
  title: ReactNode;
  description?: ReactNode;
  /** Override the featured icon. */
  icon?: IconSlot;
  /** type="avatar": avatar image / initials and online indicator. */
  avatarSrc?: string;
  avatarInitials?: string;
  avatarStatus?: 'online' | 'offline';
  /** type="avatar": small text after the name, e.g. "2 mins ago". */
  timestamp?: ReactNode;
  /** type="image": image URL (or pass `media` for custom content). */
  imageSrc?: string;
  imageAlt?: string;
  /** type="image": custom media node instead of `imageSrc`. */
  media?: ReactNode;
  /** type="image": shows the glass play button over the image. */
  playButton?: boolean;
  /** type="progress-indicator": progress value 0–100. */
  progress?: number;
  secondaryAction?: AlertAction;
  primaryAction?: AlertAction;
  /** Custom actions; replaces secondaryAction / primaryAction. */
  actions?: ReactNode;
  /** Shows the close X. */
  onClose?: () => void;
}

const iconFor: Partial<Record<NotificationType, { icon: IconSlot; color: 'brand' | 'gray' | 'success' | 'warning' | 'error'; theme: 'outline' | 'modern' }>> = {
  'primary-icon': { icon: InfoCircle, color: 'brand', theme: 'outline' },
  'gray-icon': { icon: InfoCircle, color: 'gray', theme: 'modern' },
  'success-icon': { icon: CheckCircle, color: 'success', theme: 'outline' },
  'warning-icon': { icon: AlertTriangle, color: 'warning', theme: 'outline' },
  'error-icon': { icon: AlertCircle, color: 'error', theme: 'outline' },
  'progress-indicator': { icon: InfoCircle, color: 'brand', theme: 'modern' },
};

function PlayButton() {
  return (
    <span className="flex size-12 items-center justify-center rounded-full bg-white/30 text-white ring-1 ring-white/40 backdrop-blur-md">
      <Play className="size-5 translate-x-px fill-current" />
    </span>
  );
}

/**
 * Notification — Figma "Alerts/Notification" (toast card). 400px wide on desktop
 * (440 for the image type), full width on mobile with the leading visual stacked on top.
 */
export const Notification = forwardRef<HTMLDivElement, NotificationProps>(function Notification(
  {
    type = 'primary-icon',
    title,
    description,
    icon,
    avatarSrc,
    avatarInitials,
    avatarStatus = 'online',
    timestamp,
    imageSrc,
    imageAlt = '',
    media,
    playButton = false,
    progress,
    secondaryAction,
    primaryAction,
    actions,
    onClose,
    className,
    ...props
  },
  ref,
) {
  const spec = iconFor[type];
  let leading: ReactNode = null;
  if (type === 'avatar') leading = <Avatar size="md" src={avatarSrc} initials={avatarInitials} status={avatarStatus} alt="" />;
  else if (spec) leading = <FeaturedIcon icon={icon ?? spec.icon} size="md" color={spec.color} theme={spec.theme} />;
  const smallIcon = spec?.theme === 'outline';

  const acts =
    actions ??
    (secondaryAction || primaryAction ? (
      <div className="flex items-center gap-3">
        {secondaryAction && (
          <Button size="sm" hierarchy="link-gray" onClick={secondaryAction.onClick} href={secondaryAction.href} as={secondaryAction.href ? 'a' : 'button'}>
            {secondaryAction.label}
          </Button>
        )}
        {primaryAction && (
          <Button size="sm" hierarchy="link-color" onClick={primaryAction.onClick} href={primaryAction.href} as={primaryAction.href ? 'a' : 'button'}>
            {primaryAction.label}
          </Button>
        )}
      </div>
    ) : null);

  const text = (
    <div className="flex flex-col gap-1 text-sm">
      {type === 'avatar' ? (
        <div className="flex items-center gap-2 pr-8">
          <p className="font-medium text-gray-900">{title}</p>
          {timestamp && <span className="text-gray-600">{timestamp}</span>}
        </div>
      ) : (
        <p className="pr-8 font-medium text-gray-900">{title}</p>
      )}
      {description != null && <div className="text-gray-600">{description}</div>}
    </div>
  );

  const close = onClose && <CloseButton size="sm" onClick={onClose} className="absolute top-2 right-2 z-10" />;
  const base = 'relative w-full overflow-hidden rounded-xl border border-gray-300 bg-white shadow-lg';

  if (type === 'image') {
    const img =
      media ??
      (imageSrc ? <img src={imageSrc} alt={imageAlt} className="size-full object-cover" /> : <div className="size-full bg-gradient-to-br from-brand-100 to-brand-300" />);
    return (
      <div ref={ref} role="status" className={cx(base, 'flex flex-col gap-4 p-4 sm:max-w-[440px] sm:flex-row sm:gap-0 sm:p-0', className)} {...props}>
        {close}
        <div className="relative order-2 h-[122px] overflow-hidden rounded-md sm:order-first sm:h-auto sm:w-20 sm:shrink-0 sm:rounded-none">
          {img}
          {playButton && (
            <div className="absolute inset-0 flex items-center justify-center sm:hidden">
              <PlayButton />
            </div>
          )}
        </div>
        <div className="contents sm:flex sm:min-w-0 sm:flex-1 sm:flex-col sm:gap-3 sm:py-4 sm:pr-4 sm:pl-5">
          <div className="order-1">{text}</div>
          {acts && <div className="order-3">{acts}</div>}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} role="status" className={cx(base, 'flex flex-col gap-4 p-4 sm:max-w-[400px] sm:flex-row', className)} {...props}>
      {close}
      {leading && <div className="flex shrink-0">{leading}</div>}
      <div className={cx('flex min-w-0 flex-1 flex-col', type === 'progress-indicator' ? 'gap-4' : 'gap-3', smallIcon && 'sm:py-0.5')}>
        {text}
        {type === 'progress-indicator' && <ProgressBar value={progress ?? 0} label="bottom" />}
        {acts}
      </div>
    </div>
  );
});
