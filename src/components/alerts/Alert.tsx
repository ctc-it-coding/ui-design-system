import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle, InfoCircle } from '../../icons';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { Button } from '../buttons/Button';
import { CloseButton } from '../buttons/CloseButton';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';

export type AlertColor = 'default' | 'gray' | 'brand' | 'error' | 'warning' | 'success';
export type AlertSize = 'floating' | 'full-width';

export interface AlertAction {
  label: ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'color'> {
  /** Figma: Color */
  color?: AlertColor;
  /** Figma: Size (Floating / Full-width) */
  size?: AlertSize;
  title: ReactNode;
  description?: ReactNode;
  /** Override the icon (defaults per colour). `null` hides it. */
  icon?: IconSlot | null;
  /** Secondary action (link-gray, or secondary-gray button in full-width default/brand). */
  secondaryAction?: AlertAction;
  /** Primary action (link-color, or primary button in full-width default/brand). */
  primaryAction?: AlertAction;
  /** Custom actions; replaces secondaryAction / primaryAction. */
  actions?: ReactNode;
  /** Shows the close X and calls this on click. */
  onClose?: () => void;
  /** Action rendering style. Defaults: floating → "link"; full-width default/brand → "button", others "link". */
  actionStyle?: 'link' | 'button';
}

const defaultIcon: Record<AlertColor, IconSlot> = {
  default: InfoCircle,
  gray: InfoCircle,
  brand: InfoCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  success: CheckCircle,
};
const iconColor: Record<AlertColor, 'brand' | 'gray' | 'error' | 'warning' | 'success'> = {
  default: 'brand',
  gray: 'gray',
  brand: 'brand',
  error: 'error',
  warning: 'warning',
  success: 'success',
};

function renderActions(
  { actions, secondaryAction, primaryAction }: Pick<AlertProps, 'actions' | 'secondaryAction' | 'primaryAction'>,
  style: 'link' | 'button',
  stackOnMobile: boolean,
) {
  if (actions) return actions;
  if (!secondaryAction && !primaryAction) return null;
  const btn = (a: AlertAction, primary: boolean) => (
    <Button
      size={style === 'link' ? 'sm' : 'md'}
      hierarchy={style === 'link' ? (primary ? 'link-color' : 'link-gray') : primary ? 'primary' : 'secondary-gray'}
      onClick={a.onClick}
      href={a.href}
      as={a.href ? 'a' : 'button'}
      className={cx(stackOnMobile && 'w-full sm:w-auto')}
    >
      {a.label}
    </Button>
  );
  return (
    <div className={cx('flex gap-3', stackOnMobile ? 'flex-col-reverse sm:flex-row' : 'flex-row items-center')}>
      {secondaryAction && btn(secondaryAction, false)}
      {primaryAction && btn(primaryAction, true)}
    </div>
  );
}

/**
 * Alert — Figma "Alerts/Alert". Floating card or full-width banner; colour drives the icon.
 * Desktop row layout, stacked on mobile (<640px).
 */
export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    color = 'default',
    size = 'floating',
    title,
    description,
    icon,
    secondaryAction,
    primaryAction,
    actions,
    onClose,
    actionStyle,
    className,
    role,
    ...props
  },
  ref,
) {
  const ic = icon === null ? null : (icon ?? defaultIcon[color]);
  const featured =
    ic == null ? null : color === 'default' ? (
      <FeaturedIcon icon={ic} size="md" color="brand" theme="modern" />
    ) : (
      <FeaturedIcon icon={ic} size="md" color={iconColor[color]} theme="outline" />
    );
  const a11yRole = role ?? (color === 'error' || color === 'warning' ? 'alert' : 'status');

  if (size === 'full-width') {
    const style = actionStyle ?? (color === 'default' || color === 'brand' ? 'button' : 'link');
    const acts = renderActions({ actions, secondaryAction, primaryAction }, style, style === 'button');
    return (
      <div
        ref={ref}
        role={a11yRole}
        className={cx('w-full border-t border-b-0 bg-white sm:border-t-0 sm:border-b', color === 'brand' ? 'border-brand-300' : 'border-gray-300', className)}
        {...props}
      >
        <div className="relative mx-auto flex max-w-[1280px] flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-3 sm:px-8 sm:py-3">
          <div className="flex min-w-0 flex-1 items-center gap-4">
            {featured && <div className="hidden shrink-0 sm:flex">{featured}</div>}
            <div className="flex min-w-0 flex-1 flex-col gap-0.5 pr-8 text-sm sm:flex-row sm:flex-wrap sm:gap-x-1.5 sm:pr-0">
              <p className="font-semibold text-gray-700">{title}</p>
              {description != null && <p className="text-gray-600">{description}</p>}
            </div>
          </div>
          {(acts || onClose) && (
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {acts}
              {onClose && (
                <CloseButton size="sm" onClick={onClose} className="absolute top-2 right-2 sm:static" />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  const acts = renderActions({ actions, secondaryAction, primaryAction }, actionStyle ?? 'link', false);
  return (
    <div
      ref={ref}
      role={a11yRole}
      className={cx(
        'relative flex w-full flex-col gap-4 rounded-xl border border-gray-300 bg-white p-4 shadow-xs sm:flex-row',
        className,
      )}
      {...props}
    >
      {featured && <div className="flex shrink-0">{featured}</div>}
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1 text-sm">
          <p className={cx('font-semibold text-gray-700', onClose && 'pr-8')}>{title}</p>
          {description != null && <div className="text-gray-600">{description}</div>}
        </div>
        {acts}
      </div>
      {onClose && <CloseButton size="sm" onClick={onClose} className="absolute top-2 right-2" />}
    </div>
  );
});
