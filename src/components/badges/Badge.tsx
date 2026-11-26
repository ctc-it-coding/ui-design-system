import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { XClose } from '../../icons';

export type BadgeSize = 'sm' | 'md' | 'lg';
export type BadgeType = 'pill-color' | 'pill-outline' | 'badge-color' | 'badge-modern';
export type BadgeColor =
  | 'gray'
  | 'brand'
  | 'error'
  | 'warning'
  | 'success'
  | 'gray-blue'
  | 'blue-light'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
  | 'orange';

export interface BadgeProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** Figma: Size */
  size?: BadgeSize;
  /** Figma: Type (Pill color / Pill outline / Badge color / Badge modern) */
  type?: BadgeType;
  /** Figma: Color */
  color?: BadgeColor;
  /** Figma: Icon=Dot — leading status dot in the badge colour. */
  dot?: boolean;
  /** Figma: Icon=Icon leading (or Icon=Only when there is no label). */
  iconLeading?: IconSlot;
  /** Figma: Icon=Icon trailing */
  iconTrailing?: IconSlot;
  /** Figma: Icon=Avatar — 16px avatar image source. */
  avatarSrc?: string;
  /** Figma: Icon=Country — a 16px flag element (e.g. `<Flag code="AU" />`). */
  flag?: ReactNode;
  /** Figma: Icon=X close — shows the close X; called when it is clicked. */
  onRemove?: (event: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label of the close X. */
  removeLabel?: string;
  children?: ReactNode;
}

interface ColorClasses {
  /** Pill color + Badge color surface */
  filled: string;
  /** Pill outline surface */
  outline: string;
  dot: string;
  icon: string;
  close: string;
}

/* Literal class strings per colour so Tailwind can see them. */
export const badgeColors: Record<BadgeColor, ColorClasses> = {
  gray: {
    filled: 'bg-gray-50 ring-gray-200 text-gray-700',
    outline: 'ring-gray-600 text-gray-700',
    dot: 'bg-gray-500',
    icon: 'text-gray-500',
    close: 'text-gray-400 hover:bg-gray-100 hover:text-gray-500',
  },
  brand: {
    filled: 'bg-brand-50 ring-brand-200 text-brand-700',
    outline: 'ring-brand-600 text-brand-700',
    dot: 'bg-brand-500',
    icon: 'text-brand-500',
    close: 'text-brand-400 hover:bg-brand-100 hover:text-brand-500',
  },
  error: {
    filled: 'bg-error-50 ring-error-200 text-error-700',
    outline: 'ring-error-600 text-error-700',
    dot: 'bg-error-500',
    icon: 'text-error-500',
    close: 'text-error-400 hover:bg-error-100 hover:text-error-500',
  },
  warning: {
    filled: 'bg-warning-50 ring-warning-200 text-warning-700',
    outline: 'ring-warning-600 text-warning-700',
    dot: 'bg-warning-500',
    icon: 'text-warning-500',
    close: 'text-warning-400 hover:bg-warning-100 hover:text-warning-500',
  },
  success: {
    filled: 'bg-success-50 ring-success-200 text-success-700',
    outline: 'ring-success-600 text-success-700',
    dot: 'bg-success-500',
    icon: 'text-success-500',
    close: 'text-success-400 hover:bg-success-100 hover:text-success-500',
  },
  'gray-blue': {
    filled: 'bg-gray-blue-50 ring-gray-blue-200 text-gray-blue-700',
    outline: 'ring-gray-blue-600 text-gray-blue-700',
    dot: 'bg-gray-blue-500',
    icon: 'text-gray-blue-500',
    close: 'text-gray-blue-400 hover:bg-gray-blue-100 hover:text-gray-blue-500',
  },
  'blue-light': {
    filled: 'bg-blue-light-50 ring-blue-light-200 text-blue-light-700',
    outline: 'ring-blue-light-600 text-blue-light-700',
    dot: 'bg-blue-light-500',
    icon: 'text-blue-light-500',
    close: 'text-blue-light-400 hover:bg-blue-light-100 hover:text-blue-light-500',
  },
  blue: {
    filled: 'bg-blue-50 ring-blue-200 text-blue-700',
    outline: 'ring-blue-600 text-blue-700',
    dot: 'bg-blue-500',
    icon: 'text-blue-500',
    close: 'text-blue-400 hover:bg-blue-100 hover:text-blue-500',
  },
  indigo: {
    filled: 'bg-indigo-50 ring-indigo-200 text-indigo-700',
    outline: 'ring-indigo-600 text-indigo-700',
    dot: 'bg-indigo-500',
    icon: 'text-indigo-500',
    close: 'text-indigo-400 hover:bg-indigo-100 hover:text-indigo-500',
  },
  purple: {
    filled: 'bg-purple-50 ring-purple-200 text-purple-700',
    outline: 'ring-purple-600 text-purple-700',
    dot: 'bg-purple-500',
    icon: 'text-purple-500',
    close: 'text-purple-400 hover:bg-purple-100 hover:text-purple-500',
  },
  pink: {
    filled: 'bg-pink-50 ring-pink-200 text-pink-700',
    outline: 'ring-pink-600 text-pink-700',
    dot: 'bg-pink-500',
    icon: 'text-pink-500',
    close: 'text-pink-400 hover:bg-pink-100 hover:text-pink-500',
  },
  orange: {
    filled: 'bg-orange-50 ring-orange-200 text-orange-700',
    outline: 'ring-orange-600 text-orange-700',
    dot: 'bg-orange-500',
    icon: 'text-orange-500',
    close: 'text-orange-400 hover:bg-orange-100 hover:text-orange-500',
  },
};

const modern = {
  surface: 'bg-white ring-gray-300 text-gray-700 shadow-xs',
  icon: 'text-gray-500',
  close: 'text-gray-400 hover:bg-gray-100 hover:text-gray-500',
};

type Lead = 'none' | 'dot' | 'icon' | 'media';
type Trail = 'none' | 'icon' | 'close';

const textSize: Record<BadgeSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-sm' };
const py: Record<BadgeSize, string> = { sm: 'py-0.5', md: 'py-0.5', lg: 'py-1' };

const pillPl: Record<Lead, Record<BadgeSize, string>> = {
  none: { sm: 'pl-2', md: 'pl-2.5', lg: 'pl-3' },
  dot: { sm: 'pl-1.5', md: 'pl-2', lg: 'pl-2.5' },
  icon: { sm: 'pl-1.5', md: 'pl-2', lg: 'pl-2.5' },
  media: { sm: 'pl-[3px]', md: 'pl-1', lg: 'pl-1.5' },
};
const badgePl: Record<Lead, Record<BadgeSize, string>> = {
  none: { sm: 'pl-1.5', md: 'pl-2', lg: 'pl-2.5' },
  dot: { sm: 'pl-1.5', md: 'pl-2', lg: 'pl-2.5' },
  icon: { sm: 'pl-1', md: 'pl-1.5', lg: 'pl-2' },
  media: { sm: 'pl-1', md: 'pl-1.5', lg: 'pl-2' },
};
const pillPr: Record<Trail, Record<BadgeSize, string>> = {
  none: { sm: 'pr-2', md: 'pr-2.5', lg: 'pr-3' },
  icon: { sm: 'pr-1.5', md: 'pr-2', lg: 'pr-2.5' },
  close: { sm: 'pr-[3px]', md: 'pr-1', lg: 'pr-1.5' },
};
const badgePr: Record<Trail, Record<BadgeSize, string>> = {
  none: { sm: 'pr-1.5', md: 'pr-2', lg: 'pr-2.5' },
  icon: { sm: 'pr-1', md: 'pr-1.5', lg: 'pr-2' },
  close: { sm: 'pr-[3px]', md: 'pr-1', lg: 'pr-1.5' },
};
/** Space between leading part and label (Figma gap). */
const leadGap: Record<Exclude<Lead, 'none'>, Record<BadgeSize, string>> = {
  dot: { sm: 'mr-1', md: 'mr-1.5', lg: 'mr-1.5' },
  icon: { sm: 'mr-1', md: 'mr-1', lg: 'mr-1' },
  media: { sm: 'mr-1', md: 'mr-1.5', lg: 'mr-1.5' },
};
const iconOnlyPad: Record<BadgeSize, string> = { sm: 'p-[5px]', md: 'p-1.5', lg: 'p-2' };

/** Internal: the "_Badge close X" button (Type=Rounded for pills, Square for badges). */
function BadgeCloseX({
  rounded,
  className,
  label = 'Remove',
  onClick,
}: {
  rounded?: boolean;
  className?: string;
  label?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={cx(
        'flex size-4 shrink-0 cursor-pointer items-center justify-center p-0.5 outline-none transition-colors duration-100',
        'focus-visible:ring-2 focus-visible:ring-current',
        rounded ? 'rounded-full' : 'rounded-[3px]',
        className,
      )}
    >
      <XClose className="size-3" />
    </button>
  );
}

/**
 * Badge — Figma "Badges/Badge" (Size × Type × Icon × Color).
 * Icon=Only is rendered when `iconLeading` is given without a label.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    size = 'md',
    type = 'pill-color',
    color = 'gray',
    dot,
    iconLeading,
    iconTrailing,
    avatarSrc,
    flag,
    onRemove,
    removeLabel,
    className,
    children,
    ...props
  },
  ref,
) {
  const pill = type === 'pill-color' || type === 'pill-outline';
  const c = badgeColors[color];
  const isModern = type === 'badge-modern';
  const surface =
    type === 'pill-outline' ? cx('ring-[1.5px] ring-inset', c.outline) : isModern ? cx('ring-1 ring-inset', modern.surface) : cx('ring-1 ring-inset', c.filled);
  const iconColor = isModern ? modern.icon : c.icon;
  const hasLabel = children != null && children !== false && children !== '';

  const lead: Lead = avatarSrc || flag ? 'media' : dot ? 'dot' : iconLeading ? 'icon' : 'none';
  const trail: Trail = onRemove ? 'close' : iconTrailing ? 'icon' : 'none';
  const iconOnly = !hasLabel && (lead === 'icon' || (lead === 'none' && trail === 'icon'));

  const radius = pill ? 'rounded-full' : size === 'lg' ? 'rounded-lg' : 'rounded-md';
  const padding = iconOnly
    ? iconOnlyPad[size]
    : cx(py[size], (pill ? pillPl : badgePl)[lead][size], (pill ? pillPr : badgePr)[trail][size]);
  const mr = lead !== 'none' && (hasLabel || trail !== 'none') ? leadGap[lead][size] : '';

  return (
    <span
      ref={ref}
      className={cx(
        'inline-flex w-max shrink-0 items-center whitespace-nowrap font-medium',
        textSize[size],
        radius,
        surface,
        padding,
        className,
      )}
      {...props}
    >
      {lead === 'media' &&
        (avatarSrc ? (
          <img src={avatarSrc} alt="" className={cx('size-4 shrink-0 rounded-full object-cover', mr)} />
        ) : (
          <span className={cx('flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-full [&>*]:size-4', mr)}>{flag}</span>
        ))}
      {lead === 'dot' && (
        <span className={cx('flex size-2 shrink-0 items-center justify-center', mr)} aria-hidden>
          <span className={cx('size-1.5 rounded-full', c.dot)} />
        </span>
      )}
      {lead === 'icon' && renderIcon(iconLeading, cx('size-3 shrink-0', iconColor, !iconOnly && mr))}
      {hasLabel && <span>{children}</span>}
      {trail === 'icon' && renderIcon(iconTrailing, cx('size-3 shrink-0', iconColor, !iconOnly && 'ml-1'))}
      {trail === 'close' && (
        <BadgeCloseX
          rounded={pill}
          label={removeLabel}
          onClick={onRemove}
          className={cx(hasLabel && 'ml-0.5', isModern ? modern.close : c.close)}
        />
      )}
    </span>
  );
});
