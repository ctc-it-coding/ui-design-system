import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ArrowRight } from '../../icons';
import { Badge } from './Badge';

export type BadgeGroupSize = 'md' | 'lg';
export type BadgeGroupColor = 'brand' | 'gray' | 'error' | 'warning' | 'success';
export type BadgeGroupTheme = 'light' | 'modern';
export type BadgeGroupPosition = 'leading' | 'trailing';

export interface BadgeGroupProps extends Omit<AnchorHTMLAttributes<HTMLElement>, 'color'> {
  /** Figma: Size */
  size?: BadgeGroupSize;
  /** Figma: Color */
  color?: BadgeGroupColor;
  /** Figma: Theme */
  theme?: BadgeGroupTheme;
  /** Figma: Badge (Leading / Trailing) — where the inner badge sits. */
  badgePosition?: BadgeGroupPosition;
  /** Text of the inner badge, e.g. "New feature". */
  badge: ReactNode;
  /** Icon after the message (leading) or inside the badge (trailing). Defaults to arrow-right. */
  icon?: IconSlot;
  /** Renders an `<a>` when given, otherwise a `<button>` (or a `<div>` with `static`). */
  href?: string;
  /** Render as a non-interactive `<div>`. */
  static?: boolean;
  /** The message. */
  children?: ReactNode;
}

const light: Record<BadgeGroupColor, { root: string; text: string; icon: string }> = {
  brand: { root: 'bg-brand-50 ring-brand-200 hover:bg-brand-100', text: 'text-brand-700', icon: 'text-brand-500' },
  gray: { root: 'bg-gray-50 ring-gray-200 hover:bg-gray-100', text: 'text-gray-700', icon: 'text-gray-500' },
  error: { root: 'bg-error-50 ring-error-200 hover:bg-error-100', text: 'text-error-700', icon: 'text-error-500' },
  warning: { root: 'bg-warning-50 ring-warning-200 hover:bg-warning-100', text: 'text-warning-700', icon: 'text-warning-500' },
  success: { root: 'bg-success-50 ring-success-200 hover:bg-success-100', text: 'text-success-700', icon: 'text-success-500' },
};
const outlineDot: Record<BadgeGroupColor, string> = {
  brand: 'bg-brand-500 ring-brand-100',
  gray: 'bg-gray-500 ring-gray-100',
  error: 'bg-error-500 ring-error-100',
  warning: 'bg-warning-500 ring-warning-100',
  success: 'bg-success-500 ring-success-100',
};
const focusRing: Record<BadgeGroupColor, string> = {
  brand: 'focus-visible:outline-brand-500/24',
  gray: 'focus-visible:outline-gray-400/14',
  error: 'focus-visible:outline-error-500/24',
  warning: 'focus-visible:outline-warning-500/24',
  success: 'focus-visible:outline-success-500/24',
};

/**
 * BadgeGroup — Figma "Badges/Badge group": a clickable announcement pill with an inner badge.
 */
export const BadgeGroup = forwardRef<HTMLElement, BadgeGroupProps>(function BadgeGroup(
  { size = 'md', color = 'brand', theme = 'light', badgePosition = 'leading', badge, icon = ArrowRight, href, static: isStatic, className, children, ...props },
  ref,
) {
  const isModern = theme === 'modern';
  const leading = badgePosition === 'leading';
  const badgeSize = size === 'md' ? 'sm' : 'md';
  const textCls = cx('font-medium', size === 'md' ? 'text-xs' : 'text-sm', isModern ? 'text-gray-700' : light[color].text);
  const iconCls = cx('size-4 shrink-0', isModern ? 'text-gray-500' : light[color].icon);
  const Comp: any = isStatic ? 'div' : href ? 'a' : 'button';

  const innerBadge = leading ? (
    isModern ? (
      <Badge size={badgeSize} type="badge-modern" color={color} dot>{badge}</Badge>
    ) : (
      <Badge size={badgeSize} type="pill-color" color={color} className="bg-white">{badge}</Badge>
    )
  ) : isModern ? (
    <Badge size={badgeSize} type="badge-modern" color="gray" iconTrailing={icon}>{badge}</Badge>
  ) : (
    <Badge size={badgeSize} type="pill-color" color={color} iconTrailing={icon} className="bg-white">{badge}</Badge>
  );

  return (
    <Comp
      ref={ref}
      href={href}
      type={Comp === 'button' ? 'button' : undefined}
      className={cx(
        'inline-flex w-max items-center ring-1 ring-inset outline-0 transition-colors duration-100',
        size === 'md' ? 'gap-2' : 'gap-3',
        leading ? 'py-1 pr-2.5 pl-1' : cx('py-1 pr-1', isModern ? (size === 'md' ? 'pl-2.5' : 'pl-3') : size === 'md' ? 'pl-3' : 'pl-3.5'),
        isModern ? 'rounded-[10px] bg-white shadow-xs ring-gray-300 hover:bg-gray-50' : cx('rounded-full', light[color].root),
        !isStatic && cx('cursor-pointer focus-visible:outline-4 focus-visible:outline-solid', focusRing[color]),
        className,
      )}
      {...props}
    >
      {leading ? (
        <>
          {innerBadge}
          <span className="flex items-center gap-1">
            <span className={textCls}>{children}</span>
            {renderIcon(icon, iconCls)}
          </span>
        </>
      ) : (
        <>
          <span className={cx('flex items-center', size === 'md' ? 'gap-1.5' : 'gap-2')}>
            {isModern && (
              <span className={cx('flex shrink-0 items-center justify-center', size === 'md' ? 'size-2' : 'size-2.5')} aria-hidden>
                <span className={cx('rounded-full', size === 'md' ? 'size-1.5 ring-[3px]' : 'size-2 ring-4', outlineDot[color])} />
              </span>
            )}
            <span className={textCls}>{children}</span>
          </span>
          {innerBadge}
        </>
      )}
    </Comp>
  );
});
