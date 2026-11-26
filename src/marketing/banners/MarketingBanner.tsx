import { forwardRef, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import type { IconSlot } from '../../utils/renderIcon';
import { Button } from '../../components/buttons/Button';
import { CloseButton } from '../../components/buttons/CloseButton';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Input } from '../../components/inputs/Input';
import { MessageSmileCircle } from '../../icons';

export type MarketingBannerType = 'text-field' | 'single-action' | 'dual-action' | 'slim';
export type MarketingBannerTheme = 'default' | 'brand';
export type MarketingBannerSize = 'floating' | 'full-width';

export interface BannerAction {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface MarketingBannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: MarketingBannerType;
  /** Figma: Theme */
  theme?: MarketingBannerTheme;
  /** Figma: Size (Floating = rounded card inside the page container, Full-width = edge-to-edge bar). */
  size?: MarketingBannerSize;
  /** "Text" */
  title?: ReactNode;
  /** "Supporting text" */
  supportingText?: ReactNode;
  /** Featured icon (not shown on Slim, and only on Single action at mobile). */
  icon?: IconSlot;
  /** Single action: the button. Dual action: the primary (right) button. */
  primaryAction?: BannerAction;
  /** Dual action: the secondary (left) button. */
  secondaryAction?: BannerAction;
  /** Text field: input placeholder and submit button label. */
  placeholder?: string;
  submitLabel?: ReactNode;
  /** Text field: called with the entered email on submit. */
  onSubscribe?: (email: string) => void;
  /** Show the close X (default true). Clicking it hides the banner and calls `onDismiss`. */
  dismissible?: boolean;
  onDismiss?: () => void;
}

const copy: Record<MarketingBannerType, { title: string; text: string; primary?: string; secondary?: string }> = {
  'text-field': { title: 'Stay up to date with the latest news and updates', text: 'Lorem ipsum dolor sit amet consectetur odio nunc adipiscing.', primary: 'Subscribe' },
  'single-action': { title: 'We’ve just announced our Series A!', text: 'Read about it from our CEO.', primary: 'Read update' },
  'dual-action': { title: 'We use third-party cookies in order to personalise your experience.', text: 'Read our Cookie Policy.', primary: 'Allow', secondary: 'Decline' },
  slim: { title: 'We’ve just launched a new feature!', text: 'Check out the new dashboard.' },
};

const btn = (a: BannerAction) => ({ as: a.href ? ('a' as const) : ('button' as const), href: a.href, onClick: a.onClick });

/** MarketingBanner — Figma "Banner" (Text field / Single action / Dual action / Slim; Default / Brand; Floating / Full-width). */
export const MarketingBanner = forwardRef<HTMLDivElement, MarketingBannerProps>(function MarketingBanner(
  {
    type = 'single-action',
    theme = 'default',
    size = 'full-width',
    title,
    supportingText,
    icon = MessageSmileCircle,
    primaryAction,
    secondaryAction,
    placeholder = 'Enter your email',
    submitLabel,
    onSubscribe,
    dismissible = true,
    onDismiss,
    className,
    ...props
  },
  ref,
) {
  const [visible, setVisible] = useState(true);
  const [email, setEmail] = useState('');
  if (!visible) return null;

  const brand = theme === 'brand';
  const floating = size === 'floating';
  const slim = type === 'slim';
  const d = copy[type];
  const primary = primaryAction ?? { label: d.primary ?? '' };
  const secondary = secondaryAction ?? { label: d.secondary ?? '' };

  const dismiss = () => {
    setVisible(false);
    onDismiss?.();
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubscribe?.(email);
  };

  const supportingColor = brand
    ? type === 'dual-action' || slim ? 'text-brand-100' : 'text-brand-200'
    : type === 'dual-action' || slim ? 'text-gray-500' : 'text-gray-600';

  /* ---------- surfaces ---------- */
  const surface = brand
    ? 'bg-linear-to-r from-brand-700 to-brand-600'
    : cx('bg-gray-25', floating ? 'border border-gray-300' : 'border-b border-gray-300');
  const shadow = floating ? 'shadow-lg' : '';

  const close = dismissible ? (
    <CloseButton
      size="md"
      dark={brand}
      onClick={dismiss}
      label="Dismiss"
      className={cx(
        'shrink-0',
        slim
          ? floating ? 'absolute top-2 right-2 md:top-3 md:right-3' : 'absolute top-2 right-2 md:top-1.5 md:right-3'
          : 'absolute top-2 right-2 md:static',
      )}
    />
  ) : null;

  const text = (
    <div
      className={cx(
        'flex min-w-0 flex-1 flex-col gap-0.5',
        type !== 'text-field' && 'md:flex-row md:flex-wrap md:items-baseline md:gap-x-1.5 md:gap-y-0',
        slim && 'md:justify-center md:text-center',
      )}
    >
      <p className={cx('text-md font-medium', brand ? 'text-white' : 'text-gray-700', dismissible && type !== 'single-action' && 'pr-8 md:pr-0')}>{title ?? d.title}</p>
      <p className={cx('text-md', supportingColor)}>{supportingText ?? d.text}</p>
    </div>
  );

  let actions: ReactNode = null;
  if (type === 'single-action') {
    actions = (
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <Button size="lg" hierarchy={brand ? 'secondary-color' : 'secondary-gray'} className="w-full md:w-auto" {...btn(primary)}>{primary.label}</Button>
        {close}
      </div>
    );
  } else if (type === 'dual-action') {
    actions = (
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex flex-col-reverse gap-3 md:flex-row">
          <Button size="lg" hierarchy="secondary-gray" className="w-full md:w-auto" {...btn(secondary)}>{secondary.label}</Button>
          <Button size="lg" hierarchy="primary" className="w-full md:w-auto" {...btn(primary)}>{primary.label}</Button>
        </div>
        {close}
      </div>
    );
  } else if (type === 'text-field') {
    actions = (
      <div className="flex flex-col gap-2 md:w-[448px] md:shrink-0 md:flex-row md:items-center">
        <form onSubmit={submit} className="flex flex-1 flex-col gap-3 md:flex-row md:gap-4">
          <Input
            type="email"
            aria-label="Email"
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-1"
          />
          <Button type="submit" size="lg" hierarchy={brand ? 'secondary-color' : 'secondary-gray'} className="w-full md:w-auto">
            {submitLabel ?? primaryAction?.label ?? d.primary}
          </Button>
        </form>
        {close}
      </div>
    );
  }

  const featured = !slim && (
    <FeaturedIcon
      icon={icon}
      size="lg"
      color="brand"
      theme={brand ? 'mid-square' : 'modern'}
      className={cx('shrink-0', type !== 'single-action' && 'hidden md:flex')}
    />
  );

  const inner = slim ? (
    <div className={cx('relative', floating ? 'p-4 md:px-12 md:py-5' : 'p-4 md:px-8 md:py-1.5')}>
      {text}
      {floating && close}
    </div>
  ) : (
    <div className={cx('flex flex-col gap-4 p-4 md:flex-row md:items-center md:gap-3', floating ? 'md:p-3' : 'md:px-8 md:py-3')}>
      <div className="flex flex-col gap-4 md:flex-1 md:flex-row md:items-center">
        {featured}
        {text}
      </div>
      {actions}
    </div>
  );

  if (floating) {
    return (
      <div ref={ref} role="region" aria-label="Announcement" className={cx('mx-auto w-full max-w-[1280px] px-2 pb-4 md:px-8 md:pb-0', className)} {...props}>
        <div className={cx('relative rounded-xl', surface, shadow)}>{inner}</div>
      </div>
    );
  }
  return (
    <div ref={ref} role="region" aria-label="Announcement" className={cx('relative w-full', surface, slim && 'md:py-2', className)} {...props}>
      <div className={cx(!slim && 'relative', 'mx-auto max-w-[1280px]')}>{inner}</div>
      {slim && !floating && close}
    </div>
  );
});
