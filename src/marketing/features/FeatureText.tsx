import { forwardRef, isValidElement, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { ArrowRight, Mail01 } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon, type FeaturedIconColor, type FeaturedIconTheme } from '../../components/featured-icons/FeaturedIcon';
import { CheckIcon } from '../../components/misc-icons/CheckIcon';
import { useMarketingTheme } from '../_shared';
import { areaTone } from './tone';
import { IntegrationLogo, type IntegrationLogoName } from './IntegrationLogo';

export type FeatureTextType =
  | 'featured-icon-box'
  | 'integration-icon-box'
  | 'featured-icon-top-left'
  | 'icon-top-left'
  | 'integration-icon-top-left'
  | 'featured-icon-top-centered'
  | 'icon-top-centered'
  | 'integration-icon-top-centered'
  | 'text-centered'
  | 'featured-icon-left'
  | 'icon-left'
  | 'text-left'
  | 'integration-icon-left'
  | 'featured-icon-card'
  | 'icon-card';

export interface FeatureTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: FeatureTextType;
  /** Feature title (Figma "Text"). */
  title?: ReactNode;
  /** Feature description (Figma "Supporting text"). */
  supportingText?: ReactNode;
  /** Icon for featured-icon / icon types (default mail-01). */
  icon?: IconSlot;
  /** Integration logo name (or any node) for integration types (default notion). */
  integration?: IntegrationLogoName | ReactNode;
  /** Link label; set `action={false}` to hide the link. */
  actionLabel?: ReactNode;
  actionHref?: string;
  /** Custom action node, or `false` to hide it (Figma hides it in most sections). */
  action?: ReactNode | false;
  /** Override featured icon color / theme (defaults follow the section theme). */
  featuredIconColor?: FeaturedIconColor;
  featuredIconTheme?: FeaturedIconTheme;
}

type Layout = 'box' | 'top' | 'left' | 'card';
const layoutOf = (t: FeatureTextType): Layout =>
  t.endsWith('-box') ? 'box' : t.endsWith('-card') ? 'card' : t.endsWith('-left') && !t.endsWith('top-left') ? 'left' : 'top';

/** Feature item — Figma "_Feature text" (title, supporting text, optional icon / integration logo and link). */
export const FeatureText = forwardRef<HTMLDivElement, FeatureTextProps>(function FeatureText(
  {
    type = 'featured-icon-top-left',
    title: titleProp,
    supportingText: supportingTextProp,
    icon = Mail01,
    integration = 'notion',
    actionLabel,
    actionHref,
    action,
    featuredIconColor,
    featuredIconTheme,
    className,
    ...props
  },
  ref,
) {
  const { theme } = useMarketingTheme();
  const tone = areaTone(theme);
  const layout = layoutOf(type);
  const dflt = type.startsWith('integration')
    ? ['Notion integration', 'Work faster and smarter by integrating directly with Notion, right in the app.']
    : layout === 'card'
      ? ['Share team inboxes', 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.']
      : ['Deliver instant answers', 'An all-in-one customer service platform that helps you balance everything your customers need to be happy.'];
  const title = titleProp === undefined ? dflt[0] : titleProp;
  const supportingText = supportingTextProp === undefined ? dflt[1] : supportingTextProp;
  const centered = type.endsWith('centered') || type.endsWith('-box');
  const isIntegration = type.startsWith('integration');
  const isFeatured = type.startsWith('featured');
  const isIcon = type.startsWith('icon');
  const onCard = layout === 'box' || layout === 'card';
  const headingCls = onCard ? 'text-gray-900' : tone.heading;
  const textCls = onCard ? 'text-gray-600' : tone.text;
  const linkCls = onCard ? undefined : tone.link;

  const fColor = featuredIconColor ?? (layout === 'card' ? 'brand' : tone.featuredColor);
  const fTheme = featuredIconTheme ?? (layout === 'card' ? 'mid-square' : tone.featuredTheme);

  const featured = layout === 'card' ? (
    <FeaturedIcon icon={icon} size="lg" color={fColor} theme={fTheme} />
  ) : (
    <>
      <FeaturedIcon icon={icon} size="md" color={fColor} theme={fTheme} className="md:hidden" />
      <FeaturedIcon icon={icon} size="lg" color={fColor} theme={fTheme} className="hidden md:inline-flex" />
    </>
  );
  const smallIcon = renderIcon(icon, cx('size-6 shrink-0', onCard ? 'text-brand-600' : tone.icon));
  const logo = typeof integration === 'string' && !isValidElement(integration) ? (
    <>
      <IntegrationLogo name={integration as IntegrationLogoName} size={48} className="md:hidden" />
      <IntegrationLogo name={integration as IntegrationLogoName} size={64} className="hidden md:block" />
    </>
  ) : (integration as ReactNode);

  const link = action === false ? null : action ?? (
    <Button
      as={actionHref ? 'a' : 'button'}
      href={actionHref}
      size="lg"
      hierarchy="link-color"
      iconTrailing={ArrowRight}
      className={cx('self-start', centered && 'self-center', linkCls)}
    >
      {actionLabel ?? (isIntegration ? 'View integration' : 'Learn more')}
    </Button>
  );

  const textPad =
    layout === 'left' && isFeatured ? 'py-1.5 md:py-2.5' : layout === 'left' && isIntegration ? 'py-2.5 md:py-4' : '';
  const text = (
    <div className={cx('flex flex-col gap-1 md:gap-2', centered && 'items-center text-center', textPad)}>
      <h3 className={cx('text-lg font-medium md:text-xl', headingCls)}>{title}</h3>
      {supportingText != null && <p className={cx('text-md', textCls)}>{supportingText}</p>}
    </div>
  );
  const body = (
    <div className={cx('flex min-w-0 flex-1 flex-col gap-4 md:gap-5', centered && 'items-center')}>
      {text}
      {link}
    </div>
  );

  if (layout === 'box') {
    return (
      <div ref={ref} className={cx('flex flex-col items-center py-6', className)} {...props}>
        <div
          className={cx(
            'relative flex w-full flex-col items-center gap-4 rounded-2xl bg-gray-50 px-6 pb-8 md:gap-5',
            isIntegration ? 'pt-10 md:pt-[52px]' : 'pt-0',
          )}
        >
          {isIntegration ? (
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">{logo}</div>
          ) : (
            <div className="flex h-6 w-full justify-center">
              <div className="-translate-y-1/2">
                <FeaturedIcon icon={icon} size="lg" color={fColor} theme={fTheme} />
              </div>
            </div>
          )}
          {text}
          {link}
        </div>
      </div>
    );
  }

  if (layout === 'card') {
    return (
      <div
        ref={ref}
        className={cx('flex flex-col bg-gray-50 p-5 md:p-6', isFeatured ? 'gap-12 md:gap-16' : 'gap-8 md:gap-12', className)}
        {...props}
      >
        {isFeatured ? featured : smallIcon}
        {body}
      </div>
    );
  }

  const media = isFeatured ? featured : isIntegration ? logo : isIcon ? smallIcon : null;

  if (layout === 'left') {
    return (
      <div ref={ref} className={cx('flex gap-4', className)} {...props}>
        {media != null && (isIcon ? <div className="py-0.5">{media}</div> : <div className="shrink-0">{media}</div>)}
        {body}
      </div>
    );
  }

  // top (left / centered)
  const gap = isFeatured ? 'gap-4 md:gap-5' : isIcon && centered ? 'gap-3 md:gap-4' : isIcon ? 'gap-4 md:gap-5' : 'gap-4';
  return (
    <div ref={ref} className={cx('flex flex-col', gap, centered && 'items-center', className)} {...props}>
      {media}
      {body}
    </div>
  );
});

/* ------------------------------------------------------------------------------------------------ */

export interface FeatureCheckItemProps extends HTMLAttributes<HTMLLIElement> {
  /** Figma "Check item text" Type (check icon style). */
  checkType?: 'default' | 'line' | 'filled';
}

/** Check-list row used inside feature blocks (Figma "Check item text", Size=md). */
export function FeatureCheckItem({ checkType = 'line', className, children, ...props }: FeatureCheckItemProps) {
  const { theme } = useMarketingTheme();
  const tone = areaTone(theme);
  return (
    <li className={cx('flex gap-3', className)} {...props}>
      <CheckIcon type={checkType} size="md" color="primary" className="hidden md:inline-flex" />
      <CheckIcon type={checkType} size="sm" color="primary" className="mt-px md:hidden" />
      <span className={cx('pt-0.5 text-md md:pt-0 md:text-lg', tone.text)}>{children}</span>
    </li>
  );
}

/* ------------------------------------------------------------------------------------------------ */

export interface FeatureTabProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Current */
  current?: boolean;
  /** Figma: Orientation — vertical = top accent bar + centered text, horizontal = left accent bar. */
  orientation?: 'vertical' | 'horizontal';
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Link label; `false` hides the link (vertical tabs in Figma sections hide it). */
  actionLabel?: ReactNode | false;
  actionHref?: string;
}

/** Selectable feature tab — Figma "_Feature tab". Acts as a `role="tab"`; select with click / Enter / Space. */
export const FeatureTab = forwardRef<HTMLDivElement, FeatureTabProps>(function FeatureTab(
  {
    current = false,
    orientation = 'horizontal',
    title = 'Share team inboxes',
    supportingText = 'Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.',
    actionLabel = 'Learn more',
    actionHref,
    className,
    onClick,
    onKeyDown,
    ...props
  },
  ref,
) {
  const vertical = orientation === 'vertical';
  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e);
    if (!e.defaultPrevented && (e.key === 'Enter' || e.key === ' ') && e.target === e.currentTarget) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };
  return (
    <div
      ref={ref}
      role="tab"
      aria-selected={current}
      tabIndex={current ? 0 : -1}
      data-current={current || undefined}
      onClick={onClick}
      onKeyDown={handleKey}
      className={cx(
        'flex cursor-pointer flex-col gap-4 outline-none transition-colors duration-150 focus-visible:ring-4 focus-visible:ring-brand-500/24 md:gap-5',
        vertical ? 'items-center border-t-4 py-6 text-center md:px-4' : 'border-l-4 px-6 py-4',
        current ? 'border-brand-600' : 'border-gray-100 hover:border-gray-200',
        className,
      )}
      {...props}
    >
      <div className={cx('flex flex-col gap-1 md:gap-2', vertical && 'items-center')}>
        <h3 className="text-lg font-medium text-gray-900 md:text-xl">{title}</h3>
        {supportingText != null && <p className="text-md text-gray-600">{supportingText}</p>}
      </div>
      {actionLabel !== false && (
        <Button
          as={actionHref ? 'a' : 'button'}
          href={actionHref}
          size="lg"
          hierarchy="link-color"
          iconTrailing={ArrowRight}
          tabIndex={current ? 0 : -1}
          className={vertical ? 'self-center' : 'self-start'}
          onClick={(e: { stopPropagation: () => void }) => e.stopPropagation()}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
});
