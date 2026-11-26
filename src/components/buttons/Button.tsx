import { forwardRef, type ButtonHTMLAttributes, type ElementType, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';

export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ButtonHierarchy =
  | 'primary'
  | 'secondary-gray'
  | 'secondary-color'
  | 'tertiary-gray'
  | 'tertiary-color'
  | 'link-gray'
  | 'link-color';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Size */
  size?: ButtonSize;
  /** Figma: Hierarchy */
  hierarchy?: ButtonHierarchy;
  /** Uses the "Button destructive" (error) palette. */
  destructive?: boolean;
  /** Icon shown before the label (icon component or element). */
  iconLeading?: IconSlot;
  /** Icon shown after the label. */
  iconTrailing?: IconSlot;
  /** Figma Icon=Dot leading – shows a small status dot before the label. */
  dot?: boolean;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  /** Render as another element/component, e.g. `as="a"` or a router Link. */
  as?: ElementType;
  href?: string;
  children?: ReactNode;
}

const base =
  'group/button relative inline-flex shrink-0 items-center justify-center whitespace-nowrap font-medium transition-colors duration-100 ' +
  'outline-none disabled:cursor-not-allowed aria-disabled:cursor-not-allowed';

const sizeBox: Record<ButtonSize, string> = {
  sm: 'gap-1 rounded-lg px-3 py-2 text-sm',
  md: 'gap-1 rounded-lg px-3.5 py-2.5 text-sm',
  lg: 'gap-1.5 rounded-lg px-4 py-2.5 text-md',
  xl: 'gap-1.5 rounded-lg px-[18px] py-3 text-md',
  '2xl': 'gap-2.5 rounded-lg px-[22px] py-4 text-lg',
};
const sizeIconOnly: Record<ButtonSize, string> = {
  sm: 'rounded-lg p-2',
  md: 'rounded-lg p-2.5',
  lg: 'rounded-lg p-3',
  xl: 'rounded-lg p-3.5',
  '2xl': 'rounded-lg p-4',
};
const sizeLink: Record<ButtonSize, string> = {
  sm: 'gap-1.5 text-sm',
  md: 'gap-1.5 text-sm',
  lg: 'gap-2 text-md',
  xl: 'gap-2 text-md',
  '2xl': 'gap-3 text-lg',
};
const iconSize: Record<ButtonSize, string> = {
  sm: 'size-5',
  md: 'size-5',
  lg: 'size-5',
  xl: 'size-5',
  '2xl': 'size-6',
};

const FOCUS_BRAND = 'focus-visible:ring-4 focus-visible:ring-brand-500/24';
const FOCUS_GRAY = 'focus-visible:ring-4 focus-visible:ring-gray-400/14';
const FOCUS_ERROR = 'focus-visible:ring-4 focus-visible:ring-error-500/24';
const DISABLED_SOLID = 'disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400 aria-disabled:border-gray-200 aria-disabled:bg-gray-100 aria-disabled:text-gray-400';
const DISABLED_OUTLINE = 'disabled:border-gray-200 disabled:bg-white disabled:text-gray-400 aria-disabled:border-gray-200 aria-disabled:bg-white aria-disabled:text-gray-400';
const DISABLED_TEXT = 'disabled:bg-transparent disabled:font-medium disabled:text-gray-400 aria-disabled:bg-transparent aria-disabled:text-gray-400';

const hierarchyStyles: Record<ButtonHierarchy, string> = {
  primary: cx('border border-brand-600 bg-brand-600 text-white shadow-xs hover:border-brand-700 hover:bg-brand-700', FOCUS_BRAND, DISABLED_SOLID),
  'secondary-gray': cx('border border-gray-300 bg-white text-gray-700 shadow-xs hover:bg-gray-50 hover:text-gray-800', FOCUS_GRAY, DISABLED_OUTLINE),
  'secondary-color': cx('border border-brand-300 bg-white text-brand-700 shadow-xs hover:bg-brand-50 hover:text-brand-800', FOCUS_BRAND, DISABLED_OUTLINE),
  'tertiary-gray': cx('text-gray-600 hover:bg-gray-50 hover:text-gray-700', FOCUS_GRAY, DISABLED_TEXT),
  'tertiary-color': cx('text-brand-700 hover:bg-brand-50 hover:text-brand-800', FOCUS_BRAND, DISABLED_TEXT),
  'link-gray': cx('rounded-sm text-gray-600 hover:font-semibold hover:text-gray-700', FOCUS_GRAY, DISABLED_TEXT),
  'link-color': cx('rounded-sm text-brand-700 hover:font-semibold hover:text-brand-800', FOCUS_BRAND, DISABLED_TEXT),
};

const destructiveStyles: Partial<Record<ButtonHierarchy, string>> = {
  primary: cx('border border-error-600 bg-error-600 text-white shadow-xs hover:border-error-700 hover:bg-error-700', FOCUS_ERROR, DISABLED_SOLID),
  'secondary-gray': cx('border border-error-300 bg-white text-error-700 shadow-xs hover:bg-error-50 hover:text-error-800', FOCUS_ERROR, DISABLED_OUTLINE),
  'tertiary-gray': cx('text-error-700 hover:bg-error-50 hover:text-error-800', FOCUS_ERROR, DISABLED_TEXT),
  'link-gray': cx('rounded-sm text-error-700 hover:font-semibold hover:text-error-800', FOCUS_ERROR, DISABLED_TEXT),
};
destructiveStyles['secondary-color'] = destructiveStyles['secondary-gray'];
destructiveStyles['tertiary-color'] = destructiveStyles['tertiary-gray'];
destructiveStyles['link-color'] = destructiveStyles['link-gray'];

function Spinner({ className }: { className?: string }) {
  return (
    <svg className={cx('animate-spin', className)} viewBox="0 0 20 20" fill="none" aria-hidden>
      <circle cx="10" cy="10" r="8" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2.5" />
      <path d="M18 10a8 8 0 0 0-8-8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Button — Figma "Buttons/Button" + "Buttons/Button destructive".
 * Hover / focus / disabled states are handled with CSS pseudo-classes.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    size = 'md',
    hierarchy = 'primary',
    destructive = false,
    iconLeading,
    iconTrailing,
    dot,
    loading,
    as = 'button',
    className,
    children,
    disabled,
    type,
    ...props
  },
  ref,
) {
  const isLink = hierarchy.startsWith('link');
  const iconOnly = !children && !!(iconLeading || iconTrailing) && !dot;
  const Comp: any = as;
  const isDisabled = disabled || loading;
  const textPad = !isLink && !iconOnly ? 'px-0.5' : '';
  const iconCls = cx(iconSize[size], 'shrink-0');

  return (
    <Comp
      ref={ref}
      type={Comp === 'button' ? (type ?? 'button') : undefined}
      disabled={Comp === 'button' ? isDisabled : undefined}
      aria-disabled={Comp !== 'button' && isDisabled ? true : undefined}
      aria-busy={loading || undefined}
      data-hierarchy={hierarchy}
      className={cx(
        base,
        isLink ? sizeLink[size] : iconOnly ? sizeIconOnly[size] : sizeBox[size],
        destructive ? destructiveStyles[hierarchy] : hierarchyStyles[hierarchy],
        className,
      )}
      {...props}
    >
      {loading ? <Spinner className={iconCls} /> : renderIcon(iconLeading, iconCls)}
      {dot && !loading && (
        <span className="flex size-2.5 items-center justify-center" aria-hidden>
          <span className="size-2 rounded-full bg-success-500" />
        </span>
      )}
      {children != null && <span className={textPad}>{children}</span>}
      {renderIcon(iconTrailing, iconCls)}
    </Comp>
  );
});

