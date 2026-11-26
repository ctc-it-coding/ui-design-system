import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import type { CompanyLogoName } from '../../components/logos/CompanyLogo';
import { CTAButtons, MobileStoreBadges, ctaThemeTokens, type CTAAction, type CTATheme } from './_parts';
import { CTALayout, ctaDefaultTheme } from './CTALayout';
import { ctaCopy, ctaQuotes, type CTANotification, type CTAQuote, type CTASectionType } from './defaults';

export interface CTASectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: CTASectionType;
  /** Figma: Theme. Simple types color the section; card types color the card. Default per type (cards: gray-light). */
  theme?: CTATheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Check list (Screen mockup 01, Split image 01, quote 01/03). */
  checkItems?: string[];
  /** Primary button. Default "Get started". `null` hides it. */
  primaryAction?: CTAAction | null;
  /** Secondary button. Default "Learn more". `null` hides it. */
  secondaryAction?: CTAAction | null;
  /** Replaces the whole action area (buttons / store badges). */
  actions?: ReactNode;
  /** Company logos (Simple logos types). */
  logos?: CompanyLogoName[];
  /** Testimonial over the image (Split image quote types). */
  quote?: CTAQuote;
  /** Photo URL for image types (gradient placeholder when omitted). */
  imageSrc?: string;
  /** Abstract images: up to 5 URLs. */
  images?: string[];
  /** Notification cards over the phone (iPhone mockup 02 / 04). */
  notifications?: CTANotification[];
  /** Screen content for the 3:2 screen mockups. */
  screen?: ReactNode;
  /** Screen content for the iPhone mockups. */
  phoneScreen?: ReactNode;
  /** App store links (iPhone mockup types). */
  appStoreHref?: string;
  googlePlayHref?: string;
}

/**
 * CTASection — Figma "CTA section" (24 types × Default / Brand / Gray dark / Gray light themes).
 * iPhone mockup types show app store badges instead of buttons.
 */
export const CTASection = forwardRef<HTMLElement, CTASectionProps>(function CTASection(
  {
    type = 'simple-centered',
    theme,
    subheading,
    title,
    supportingText,
    checkItems,
    primaryAction,
    secondaryAction,
    actions,
    quote,
    appStoreHref,
    googlePlayHref,
    ...props
  },
  ref,
) {
  const th = theme ?? ctaDefaultTheme(type);
  const d = ctaCopy[type];
  const copy = {
    subheading: (subheading ?? d.subheading) as string | undefined,
    title: (title ?? d.title) as string,
    supportingText: (supportingText ?? d.supportingText) as string | undefined,
    checkItems: checkItems ?? d.checkItems,
  };
  const action =
    actions ??
    (type.startsWith('iphone-mockup') ? (
      <MobileStoreBadges variant={ctaThemeTokens[th].dark ? 'white-outline' : 'brand'} appStoreHref={appStoreHref} googlePlayHref={googlePlayHref} />
    ) : (
      <CTAButtons
        secondary={secondaryAction === undefined ? { label: 'Learn more' } : secondaryAction}
        primary={primaryAction === undefined ? { label: 'Get started' } : primaryAction}
      />
    ));
  return <CTALayout ref={ref} type={type} theme={th} copy={copy} actions={action} quote={quote ?? ctaQuotes[type]} {...props} />;
});
