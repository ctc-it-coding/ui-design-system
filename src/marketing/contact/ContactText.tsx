import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { FeaturedIcon, type FeaturedIconTheme } from '../../components/featured-icons/FeaturedIcon';
import { MessageChatCircle } from '../../icons';
import { useKit } from './_kit';

export type ContactTextType =
  | 'featured-icon-box'
  | 'featured-icon-top-left'
  | 'icon-top-left'
  | 'featured-icon-top-centered'
  | 'icon-top-centered'
  | 'text-only-center-aligned'
  | 'featured-icon-left'
  | 'icon-left'
  | 'text-only-left-aligned'
  | 'featured-icon-card'
  | 'icon-card';

export interface ContactTextProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: ContactTextType;
  /** Icon (component or element), e.g. `Mail01`. */
  icon?: IconSlot;
  /** Figma "Text" */
  title?: ReactNode;
  /** Figma "Supporting text" (pass `null` to hide). */
  supportingText?: ReactNode;
  /** Link button label (e.g. the e-mail address). */
  link?: ReactNode;
  /** Link target (defaults to `#`). */
  href?: string;
  /** Override the featured icon theme (Figma swaps e.g. to "Mid square"). */
  featuredIconTheme?: FeaturedIconTheme;
}

/** ContactText — Figma "_Contact text": icon + title + supporting text + link (e-mail, phone, address). */
export const ContactText = forwardRef<HTMLDivElement, ContactTextProps>(function ContactText(
  {
    type = 'featured-icon-top-left',
    icon = MessageChatCircle,
    title = 'Chat to us',
    supportingText = 'Our friendly team is here to help.',
    link = 'hi@untitledui.com',
    href = '#',
    featuredIconTheme,
    className,
    ...props
  },
  ref,
) {
  const { k, theme } = useKit();
  const centered = type === 'featured-icon-top-centered' || type === 'icon-top-centered' || type === 'text-only-center-aligned' || type === 'featured-icon-box';
  const isCard = type === 'featured-icon-card' || type === 'icon-card';
  const isBox = type === 'featured-icon-box';
  const featured = type.startsWith('featured-icon');
  const plainIcon = type === 'icon-top-left' || type === 'icon-top-centered' || type === 'icon-left' || type === 'icon-card';
  const row = type === 'featured-icon-left' || type === 'icon-left';

  const fiTheme: FeaturedIconTheme = featuredIconTheme ?? (type === 'featured-icon-card' ? 'mid-square' : k.dark ? 'dark-outline' : 'light-outline');
  const fiColor = theme === 'gray-dark' && fiTheme === 'dark-outline' ? 'gray' : 'brand';

  const featuredIcon = () => <FeaturedIcon icon={icon} size="lg" theme={fiTheme} color={fiColor} />;

  const text = (
    <div className={cx('flex flex-col gap-1 md:gap-2', centered && 'items-center text-center', type === 'featured-icon-left' && 'py-1.5 md:py-2.5')}>
      {title != null && <h3 className={cx('text-lg font-medium md:text-xl', k.heading)}>{title}</h3>}
      {supportingText != null && <p className={cx('text-md', k.text)}>{supportingText}</p>}
    </div>
  );

  const linkEl =
    link != null ? (
      <a
        href={href}
        className={cx(
          'inline-flex max-w-full rounded-sm text-md font-semibold outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24',
          isCard ? 'text-brand-700 hover:text-brand-800' : k.link,
          centered && 'self-center text-center',
        )}
      >
        {link}
      </a>
    ) : null;

  if (isBox) {
    return (
      <div ref={ref} className={cx('relative flex flex-col items-center pt-6', className)} {...props}>
        <div className={cx('flex w-full flex-col items-center gap-4 rounded-2xl px-6 pt-11 pb-8 md:gap-5', k.card)}>
          {text}
          {linkEl}
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2">{featuredIcon()}</div>
      </div>
    );
  }

  if (row) {
    return (
      <div ref={ref} className={cx('flex flex-row gap-4', className)} {...props}>
        {featured ? featuredIcon() : <span className="py-0.5">{renderIcon(icon, cx('size-6 shrink-0', k.icon))}</span>}
        <div className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5">
          {text}
          {linkEl}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cx(
        'flex flex-col',
        centered && 'items-center',
        isCard
          ? cx('bg-gray-50 p-6', type === 'icon-card' ? 'gap-8 md:gap-12' : 'gap-12 md:gap-16')
          : plainIcon
            ? 'gap-3 md:gap-4'
            : type.startsWith('text-only')
              ? 'gap-4 md:gap-5'
              : 'gap-4 md:gap-5',
        className,
      )}
      {...props}
    >
      {featured ? featuredIcon() : plainIcon ? renderIcon(icon, cx('size-6 shrink-0', isCard ? 'text-brand-600' : k.icon)) : null}
      <div className={cx('flex flex-col', isCard ? 'gap-4 md:gap-5' : 'contents', centered && 'items-center')}>
        {text}
        {isCard ? linkEl : null}
      </div>
      {!isCard && linkEl}
    </div>
  );
});
