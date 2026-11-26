import {
  Children,
  forwardRef,
  isValidElement,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { Plus, User01 } from '../../icons';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/* ------------------------------------------------------------------ */
/* Verified tick                                                       */
/* ------------------------------------------------------------------ */

const verifiedPath = (() => {
  const pts: string[] = [];
  const n = 16;
  for (let i = 0; i < n; i++) {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    const r = i % 2 === 0 ? 10.4 : 8.7;
    pts.push(`${(12 + r * Math.cos(a)).toFixed(2)} ${(12 + r * Math.sin(a)).toFixed(2)}`);
  }
  return `M${pts.join('L')}Z`;
})();

/** Figma "Verified tick" — blue scalloped badge with a white check. */
export function VerifiedTick({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cx('size-3.5', className)} aria-label="Verified" role="img">
      <path d={verifiedPath} fill="#0788f5" stroke="#0788f5" strokeWidth="2.4" strokeLinejoin="round" />
      <path d="M8.2 12.3l2.5 2.5 5.1-5.3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Size */
  size?: AvatarSize;
  /** Image source. When missing (or it fails to load) the initials / placeholder icon are shown. */
  src?: string;
  alt?: string;
  /** Figma: Text=True — initials shown when there is no image. */
  initials?: string;
  /** Figma: Status icon=Online indicator — `online` (green) or `offline` (gray). */
  status?: 'online' | 'offline';
  /** Figma: Status icon=Verified */
  verified?: boolean;
  /** Figma: Status icon=Company — small company logo at the bottom right. */
  companySrc?: string;
  /** Custom placeholder icon (Figma: Placeholder=True uses user-01). */
  placeholderIcon?: ReactNode;
}

const avatarSize: Record<AvatarSize, string> = {
  xs: 'size-6',
  sm: 'size-8',
  md: 'size-10',
  lg: 'size-12',
  xl: 'size-14',
  '2xl': 'size-16',
};
const initialsText: Record<AvatarSize, string> = {
  xs: 'text-xs font-medium',
  sm: 'text-sm font-medium',
  md: 'text-md font-medium',
  lg: 'text-lg font-medium',
  xl: 'text-xl font-medium',
  '2xl': 'text-display-xs font-semibold',
};
const placeholderSize: Record<AvatarSize, string> = {
  xs: 'size-4',
  sm: 'size-5',
  md: 'size-6',
  lg: 'size-7',
  xl: 'size-8',
  '2xl': 'size-8',
};
const indicatorSize: Record<AvatarSize, string> = {
  xs: 'size-1.5',
  sm: 'size-2',
  md: 'size-2.5',
  lg: 'size-3',
  xl: 'size-3.5',
  '2xl': 'size-4',
};
const badgeSize: Record<AvatarSize, string> = {
  xs: 'size-2.5',
  sm: 'size-3',
  md: 'size-3.5',
  lg: 'size-4',
  xl: 'size-[18px]',
  '2xl': 'size-5',
};

/**
 * Avatar — Figma "Avatars/Avatar". Image, initials or placeholder icon with optional
 * online indicator, verified tick or company icon. Focus ring applies when it is focusable.
 */
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 'md', src, alt, initials, status, verified, companySrc, placeholderIcon, className, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const showImg = !!src && !failed;
  const thin = size === 'xs' || size === 'sm';

  return (
    <span
      ref={ref}
      data-avatar=""
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center rounded-full bg-gray-100 outline-none',
        'focus-visible:ring-4 focus-visible:ring-gray-400/14',
        avatarSize[size],
        className,
      )}
      {...props}
    >
      {showImg ? (
        <img src={src} alt={alt ?? ''} onError={() => setFailed(true)} className="size-full rounded-full object-cover" />
      ) : initials ? (
        <span className={cx('select-none text-gray-600', initialsText[size])} aria-label={alt}>
          {initials}
        </span>
      ) : (
        placeholderIcon ?? <User01 className={cx('text-gray-500', placeholderSize[size])} aria-label={alt} />
      )}
      {/* Contrast border */}
      <span
        className={cx('pointer-events-none absolute inset-0 rounded-full ring-inset ring-black/10', thin ? 'ring-[0.5px]' : 'ring-[0.8px]')}
        aria-hidden
      />
      {status && (
        <span
          className={cx(
            'absolute right-0 bottom-0 rounded-full ring-[1.5px] ring-white',
            status === 'online' ? 'bg-success-500' : 'bg-gray-300',
            indicatorSize[size],
          )}
          aria-label={status}
          role="img"
        />
      )}
      {verified && !status && <VerifiedTick className={cx('absolute -right-0.5 -bottom-0.5', badgeSize[size])} />}
      {companySrc && !status && !verified && (
        <img
          src={companySrc}
          alt=""
          className={cx('absolute -right-0.5 -bottom-0.5 rounded-full object-cover ring-[1.5px] ring-white', badgeSize[size])}
        />
      )}
    </span>
  );
});

/* ------------------------------------------------------------------ */
/* Add button                                                          */
/* ------------------------------------------------------------------ */

export type AvatarAddButtonSize = 'xs' | 'sm' | 'md';

export interface AvatarAddButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Size */
  size?: AvatarAddButtonSize;
}

/** Figma "_Avatar add button" — dashed-less round "+" button used at the end of an AvatarGroup. */
export const AvatarAddButton = forwardRef<HTMLButtonElement, AvatarAddButtonProps>(function AvatarAddButton(
  { size = 'sm', className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-label={props['aria-label'] ?? 'Add user'}
      className={cx(
        'flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-gray-300 bg-white text-gray-400 outline-none transition-colors duration-100',
        'hover:bg-gray-50 hover:text-gray-500 focus-visible:ring-4 focus-visible:ring-gray-400/14',
        'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-200',
        avatarSize[size],
        className,
      )}
      {...props}
    >
      <Plus className={size === 'md' ? 'size-5' : 'size-4'} />
    </button>
  );
});

/* ------------------------------------------------------------------ */
/* Avatar group                                                        */
/* ------------------------------------------------------------------ */

export type AvatarGroupSize = 'xs' | 'sm' | 'md';

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Size */
  size?: AvatarGroupSize;
  /** Max avatars shown; the rest are summarised in a "+N" avatar. */
  max?: number;
  /** Shows the add-user button and calls this on click. */
  onAdd?: () => void;
  /** Accessible label of the add button. */
  addLabel?: string;
  /** `<Avatar>` elements (their size is overridden by the group's size). */
  children?: ReactNode;
}

const overlap: Record<AvatarGroupSize, string> = { xs: '-space-x-1', sm: '-space-x-2', md: '-space-x-3' };

/** Figma "Avatars/Avatar group" — overlapping avatars with a white ring, optional +N and add button. */
export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(function AvatarGroup(
  { size = 'sm', max, onAdd, addLabel = 'Add user', className, children, ...props },
  ref,
) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<AvatarProps>[];
  const shown = max != null && items.length > max ? items.slice(0, max) : items;
  const rest = items.length - shown.length;

  return (
    <div ref={ref} className={cx('flex items-center gap-2', className)} {...props}>
      <div className={cx('flex items-center', overlap[size])}>
        {shown.map((el, i) => (
          <Avatar key={el.key ?? i} {...el.props} size={size} className={cx('ring-[1.5px] ring-white', el.props.className)} />
        ))}
        {rest > 0 && <Avatar size={size} initials={`+${rest}`} className="ring-2 ring-white" aria-label={`${rest} more`} />}
      </div>
      {onAdd && <AvatarAddButton size={size} onClick={onAdd} aria-label={addLabel} />}
    </div>
  );
});

/* ------------------------------------------------------------------ */
/* Avatar label group                                                  */
/* ------------------------------------------------------------------ */

export type AvatarLabelGroupSize = 'sm' | 'md' | 'lg' | 'xl';

export interface AvatarLabelGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Size */
  size?: AvatarLabelGroupSize;
  src?: string;
  alt?: string;
  initials?: string;
  /** Name, e.g. "Olivia Rhye". */
  title: ReactNode;
  /** Supporting text, e.g. an email address. */
  subtitle?: ReactNode;
  /** Figma: Status icon */
  status?: AvatarProps['status'];
  verified?: boolean;
  companySrc?: string;
}

const labelGroup: Record<AvatarLabelGroupSize, { avatar: AvatarSize; gap: string; title: string; sub: string }> = {
  sm: { avatar: 'sm', gap: 'gap-2.5', title: 'text-sm', sub: 'text-xs' },
  md: { avatar: 'md', gap: 'gap-3', title: 'text-sm', sub: 'text-sm' },
  lg: { avatar: 'lg', gap: 'gap-3', title: 'text-md', sub: 'text-md' },
  xl: { avatar: 'xl', gap: 'gap-4', title: 'text-lg', sub: 'text-md' },
};

/** Figma "Avatars/Avatar label group" — avatar + name + supporting text. */
export const AvatarLabelGroup = forwardRef<HTMLDivElement, AvatarLabelGroupProps>(function AvatarLabelGroup(
  { size = 'md', src, alt, initials, title, subtitle, status, verified, companySrc, className, ...props },
  ref,
) {
  const s = labelGroup[size];
  return (
    <div ref={ref} className={cx('flex min-w-0 items-center', s.gap, className)} {...props}>
      <Avatar size={s.avatar} src={src} alt={alt} initials={initials} status={status} verified={verified} companySrc={companySrc} />
      <div className="flex min-w-0 flex-col">
        <span className={cx('truncate font-semibold text-gray-700', s.title)}>{title}</span>
        {subtitle != null && <span className={cx('truncate text-gray-600', s.sub)}>{subtitle}</span>}
      </div>
    </div>
  );
});
