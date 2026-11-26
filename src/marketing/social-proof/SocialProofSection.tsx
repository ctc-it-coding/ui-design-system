import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CompanyLogo, type CompanyLogoName } from '../../components/logos/CompanyLogo';
import { PressLogo, type PressLogoName } from '../../components/logos/PressLogo';
import { Container, MarketingSection } from '../_shared';
import { areaTone } from '../features/tone';
import { defaultPressLogos, defaultSocialProofLogos, socialProofCopy as C } from './defaults';

export type SocialProofSectionType = 'full-width' | 'full-width-dual' | 'card';
export const socialProofSectionTypes: SocialProofSectionType[] = ['full-width', 'full-width-dual', 'card'];
/** Figma: Theme (Default / Brand / Gray dark). For `card` the theme colors the card; the section stays white. */
export type SocialProofTheme = 'default' | 'brand' | 'gray-dark';

export interface SocialProofSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: SocialProofSectionType;
  /** Figma: Theme */
  theme?: SocialProofTheme;
  /** Caption above the logos. */
  text?: ReactNode;
  /** Company logos (Figma "Fictional company logo"), or custom nodes. */
  logos?: (CompanyLogoName | ReactNode)[];
}

const isName = (l: CompanyLogoName | ReactNode): l is CompanyLogoName => typeof l === 'string';

/**
 * SocialProofSection — Figma "Social proof section" (Full width, Full width dual, Card × Default / Brand / Gray dark).
 * Logos are white (90 % opacity) on dark themes.
 */
export const SocialProofSection = forwardRef<HTMLElement, SocialProofSectionProps>(function SocialProofSection(
  { type = 'full-width', theme = 'default', text, logos, className, ...props },
  ref,
) {
  const tone = areaTone(theme);
  const card = type === 'card';
  const dual = type === 'full-width-dual';
  const all = logos ?? defaultSocialProofLogos;
  // Figma counts: full width 6, dual 10 (8 on mobile), card 5 (6 on mobile)
  const count = card ? 6 : dual ? 10 : 6;
  const list = all.slice(0, count).map((l, i) => {
    const hideMobile = dual && i >= 8;
    const hideDesktop = card && i >= 5;
    return (
      <li key={i} className={cx('flex', hideMobile && 'hidden md:flex', hideDesktop && 'md:hidden')}>
        {isName(l) ? <CompanyLogo name={l} white={tone.dark} className={cx('h-9 w-auto md:h-12', tone.dark && 'opacity-90')} /> : l}
      </li>
    );
  });
  const caption = text ?? (card ? C.card : C.fullWidth);
  const textCls = cx('text-center text-md font-medium', tone.text, card && 'md:text-xl md:font-normal');
  const logosEl = (
    <ul className={cx('flex flex-wrap items-center justify-center gap-x-8 gap-y-4', dual ? 'md:gap-8' : card ? 'md:gap-8' : 'md:gap-6')}>
      {list}
    </ul>
  );

  if (card) {
    const bg = theme === 'gray-dark' ? 'bg-gray-950' : theme === 'brand' ? 'bg-brand-800' : 'bg-gray-50';
    return (
      <MarketingSection ref={ref} theme="default" data-type={type} className={className} {...props}>
        <Container className="px-0 md:px-8">
          <div className={cx('flex flex-col gap-8 px-6 py-12 md:rounded-2xl md:px-8 md:py-16 lg:px-16', bg)}>
            <p className={textCls}>{caption}</p>
            {logosEl}
          </div>
        </Container>
      </MarketingSection>
    );
  }
  return (
    <MarketingSection ref={ref} theme={theme} data-type={type} className={className} {...props}>
      <Container className="flex flex-col gap-8">
        <p className={textCls}>{caption}</p>
        {logosEl}
      </Container>
    </MarketingSection>
  );
});

export interface PressMentionsSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Theme */
  theme?: SocialProofTheme;
  text?: ReactNode;
  /** Press logos (Figma "Press logo"), or custom nodes. */
  logos?: (PressLogoName | ReactNode)[];
}

/** PressMentionsSection — Figma "Press mentions section" (Default / Brand / Gray dark). Logos stack vertically on mobile. */
export const PressMentionsSection = forwardRef<HTMLElement, PressMentionsSectionProps>(function PressMentionsSection(
  { theme = 'default', text = C.press, logos = defaultPressLogos, className, ...props },
  ref,
) {
  const tone = areaTone(theme);
  return (
    <MarketingSection ref={ref} theme={theme} className={className} {...props}>
      <Container className="flex flex-col gap-8">
        <p className={cx('text-center text-md font-medium', tone.text)}>{text}</p>
        <ul className="flex flex-col items-center gap-4 md:flex-row md:flex-wrap md:justify-center md:gap-8">
          {logos.map((l, i) => (
            <li key={i} className="flex">
              {typeof l === 'string'
                ? <PressLogo name={l as PressLogoName} className={cx('h-8 w-auto md:h-10', tone.dark && 'text-white')} />
                : l}
            </li>
          ))}
        </ul>
      </Container>
    </MarketingSection>
  );
});
