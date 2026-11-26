import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { CTALayout, ctaDefaultTheme, type CTAHeadingSize } from '../cta/CTALayout';
import { ctaThemeTokens, type CTATheme } from '../cta/_parts';
import type { CTANotification } from '../cta/defaults';
import { NewsletterEmailForm, type NewsletterEmailFormProps } from './NewsletterEmailForm';
import { newsletterCopy, type NewsletterCTASectionType } from './defaults';

export interface NewsletterCTASectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onSubmit'> {
  /** Figma: Type */
  type?: NewsletterCTASectionType;
  /** Figma: Theme. Simple types color the section; card types color the card (default gray-light). */
  theme?: CTATheme;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Check list (Screen mockup 01). */
  checkItems?: string[];
  /** Called with the email when the form is submitted with a valid address. */
  onSubmit?: (email: string) => void | Promise<void>;
  /** Extra props for the email form (placeholder, buttonLabel, hint, privacyHref…). */
  formProps?: Omit<NewsletterEmailFormProps, 'onSubmit'>;
  notifications?: CTANotification[];
  screen?: ReactNode;
  phoneScreen?: ReactNode;
}

const headingSize: Partial<Record<NewsletterCTASectionType, CTAHeadingSize>> = {
  'iphone-mockup-04': 'md',
  'screen-mockup-04': 'md',
};

/**
 * NewsletterCTASection — Figma "Newsletter CTA section" (13 types × Default / Brand / Gray dark / Gray light).
 * Same layouts as `CTASection`, with a working email capture form instead of buttons.
 */
export const NewsletterCTASection = forwardRef<HTMLElement, NewsletterCTASectionProps>(function NewsletterCTASection(
  { type = 'simple-centered', theme, title, supportingText, checkItems, onSubmit, formProps, ...props },
  ref,
) {
  const th = theme ?? ctaDefaultTheme(type);
  const d = newsletterCopy[type];
  const copy = {
    title: (title ?? d.title) as string,
    supportingText: (supportingText ?? d.supportingText) as string | undefined,
    checkItems: checkItems ?? d.checkItems,
  };
  return (
    <CTALayout
      ref={ref}
      type={type}
      theme={th}
      copy={copy}
      headingSize={headingSize[type]}
      checkType="default"
      wideActions
      actions={<NewsletterEmailForm onSubmit={onSubmit} hintClassName={ctaThemeTokens[th].hint} {...formProps} />}
      {...props}
    />
  );
});
