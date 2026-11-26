import { forwardRef, useId, type FormEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { AppStoreBadge } from '../../components/buttons/AppStoreBadge';
import { Input } from '../../components/inputs/Input';
import { SocialIcon } from '../../components/misc-icons/SocialIcon';
import { TinicornLogo, TinicornLogomark } from '../../components/logos/TinicornLogo';
import { PlayCircle } from '../../icons';
import { MarketingSection, Container } from '../_shared';
import { FooterLink, FooterLinksColumn, type FooterLinkColor } from './FooterLink';
import {
  footerColumns2,
  footerColumns3,
  footerColumns5,
  footerColumns6,
  footerCopy,
  footerCtaCopy,
  footerInlineLinks,
  footerLegalLinks,
  footerSocials,
  type FooterColumnData,
  type FooterLinkData,
  type FooterSocialLink,
} from './defaults';

export type MarketingFooterType =
  | 'large-01' | 'large-02' | 'large-03' | 'large-04' | 'large-05' | 'large-06' | 'large-07' | 'large-08'
  | 'large-09' | 'large-10' | 'large-11' | 'large-12' | 'large-13' | 'large-14' | 'large-15' | 'large-16'
  | 'small-01' | 'small-02' | 'small-03' | 'small-04';

/** Figma "Theme" of Footer: Default / Gray dark / Brand. */
export type MarketingFooterTheme = 'default' | 'gray-dark' | 'brand';

export interface MarketingFooterProps {
  /** Figma: Type */
  type?: MarketingFooterType;
  /** Figma: Theme */
  theme?: MarketingFooterTheme;
  /** Logo slot (defaults to the Tinicorn logo, white on dark themes). */
  logo?: ReactNode;
  /** Text under the logo. */
  supportingText?: ReactNode;
  /** Link columns (Large types). */
  columns?: FooterColumnData[];
  /** Inline links row (Small 01, Large 07 / 08 / 11 / 15 / 16). */
  links?: FooterLinkData[];
  /** Bottom-bar legal links. */
  legalLinks?: FooterLinkData[];
  /** Social links; `[]` hides them. */
  socials?: FooterSocialLink[];
  /** Copyright text. */
  copyright?: ReactNode;
  /** CTA / newsletter heading + supporting text (types with a CTA or newsletter block). */
  ctaTitle?: ReactNode;
  ctaText?: ReactNode;
  /** Custom CTA buttons (Large 09 / 10 / 11 / 13). */
  actions?: ReactNode;
  /** App-store badges slot (Large 03 / 07 / 11). Defaults to App Store + Google Play badges. */
  appBadges?: ReactNode;
  /** Newsletter submit handler (receives the e-mail). */
  onSubscribe?: (email: string) => void;
  id?: string;
  className?: string;
}

interface Tok {
  text: string;
  muted: string;
  heading: string;
  border: string;
  band: string;
  social: string;
  appHeading: string;
  dark: boolean;
}
const TOK: Record<MarketingFooterTheme, Tok> = {
  default: { text: 'text-gray-600', muted: 'text-gray-500', heading: 'text-gray-900', border: 'border-gray-200', band: 'bg-gray-50', social: 'text-gray-400 hover:text-gray-500', appHeading: 'text-gray-900', dark: false },
  'gray-dark': { text: 'text-gray-200', muted: 'text-gray-300', heading: 'text-white', border: 'border-gray-800', band: '', social: 'text-gray-400 hover:text-gray-300', appHeading: 'text-white', dark: true },
  brand: { text: 'text-brand-200', muted: 'text-brand-300', heading: 'text-white', border: 'border-brand-600', band: 'border-brand-600', social: 'text-brand-300 hover:text-brand-200', appHeading: 'text-white', dark: true },
};

/** MarketingFooter — Figma "Footer" (Large 01–16, Small 01–04 × Default / Gray dark / Brand). */
export const MarketingFooter = forwardRef<HTMLElement, MarketingFooterProps>(function MarketingFooter(props, ref) {
  const { type = 'large-01', theme = 'default', id, className } = props;
  const t = TOK[theme];
  const emailId = useId();
  const cta = footerCtaCopy[type] ?? {};
  const ctaTitle = props.ctaTitle !== undefined ? props.ctaTitle : cta.title;
  const ctaText = props.ctaText !== undefined ? props.ctaText : cta.supportingText;
  const socials = props.socials ?? footerSocials;
  const copyright = props.copyright ?? (type === 'small-01' ? footerCopy.copyrightShort : footerCopy.copyright);
  const supportingText = props.supportingText !== undefined ? props.supportingText : footerCopy.supportingText;
  const inlineLinks = props.links ?? footerInlineLinks;
  const legal = props.legalLinks ?? footerLegalLinks;

  /* ---------------- parts ---------------- */
  const logo = props.logo ?? <TinicornLogo dark={t.dark} />;
  const logoBlock = (cls?: string, small?: boolean) => (
    <div className={cx('flex flex-col gap-6 md:gap-8', cls)}>
      {logo}
      {supportingText != null && <p className={cx(small ? 'text-sm' : 'text-md', 'max-w-[320px]', t.text)}>{supportingText}</p>}
    </div>
  );
  const copyrightEl = (cls?: string) => <p className={cx('text-md', t.muted, cls)}>{copyright}</p>;
  const socialsEl = (cls?: string) =>
    socials.length ? (
      <div className={cx('flex items-center gap-6', cls)}>
        {socials.map((s) => (
          <a key={s.platform} href={s.href ?? '#'} className={cx('rounded-sm transition-colors outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24', t.social)}>
            <SocialIcon platform={s.platform} variant="gray" className="text-current hover:text-current" />
          </a>
        ))}
      </div>
    ) : null;
  const legalEl = (
    <ul className="flex gap-4">
      {legal.map((lnk, i) => (
        <li key={i}>
          <a href={lnk.href ?? '#'} className={cx('rounded-sm text-md outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-500/24', t.muted, t.dark ? 'hover:text-white' : 'hover:text-gray-600')}>
            {lnk.label}
          </a>
        </li>
      ))}
    </ul>
  );
  const columnsEl = (cols: FooterColumnData[], color: FooterLinkColor = 'default', cls?: string) => (
    <nav aria-label="Footer" className={cx('grid grid-cols-2 gap-8 [&>*:last-child:nth-child(odd)]:col-span-2 md:[&>*:last-child:nth-child(odd)]:col-span-1', cls)}>
      {cols.map((col, i) => (
        <FooterLinksColumn key={i} heading={col.heading} links={col.links} color={color} />
      ))}
    </nav>
  );
  const inlineLinksEl = (cls?: string) => (
    <nav aria-label="Footer">
      <ul className={cx('grid grid-cols-2 gap-x-8 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-8', cls)}>
        {inlineLinks.map((lnk, i) => (
          <li key={i}>
            <FooterLink href={lnk.href} badge={lnk.badge}>
              {lnk.label}
            </FooterLink>
          </li>
        ))}
      </ul>
    </nav>
  );
  const subscribe = (e: FormEvent<HTMLFormElement>) => {
    if (!props.onSubscribe) return;
    e.preventDefault();
    props.onSubscribe(String(new FormData(e.currentTarget).get('email') ?? ''));
  };
  const emailForm = (cls?: string) => (
    <form onSubmit={subscribe} className={cx('flex w-full flex-col gap-4 sm:flex-row md:w-[400px]', cls)}>
      <label htmlFor={emailId} className="sr-only">
        Email
      </label>
      <Input id={emailId} name="email" type="email" required placeholder={footerCopy.emailPlaceholder} className="flex-1" />
      <Button type="submit" size="lg" className="w-full sm:w-auto">
        {footerCopy.subscribe}
      </Button>
    </form>
  );
  const newsletterSmall = (
    <div className="flex w-full flex-col gap-4 md:w-[360px]">
      <p className={cx('text-sm font-medium', t.heading)}>{footerCopy.newsletterHeading}</p>
      {emailForm('md:w-full')}
    </div>
  );
  const appBadges = (
    <div className="flex flex-col gap-4 md:w-[135px]">
      <p className={cx(type === 'large-03' ? 'text-sm font-semibold' : 'text-md font-medium', type === 'large-03' || t.dark ? t.appHeading : 'text-brand-700')}>{footerCopy.getTheApp}</p>
      {props.appBadges ?? (
        <div className="flex flex-row gap-3 md:flex-col md:gap-4">
          <AppStoreBadge store="app-store" href="#" variant={t.dark ? 'white-outline' : 'brand'} />
          <AppStoreBadge store="google-play" href="#" variant={t.dark ? 'white-outline' : 'brand'} />
        </div>
      )}
    </div>
  );
  const ctaButtons = (playIcon?: boolean) =>
    props.actions !== undefined ? (
      props.actions
    ) : (
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button size="xl" hierarchy="secondary-gray" iconLeading={playIcon ? PlayCircle : undefined}>
          {cta.secondaryAction}
        </Button>
        <Button size="xl">{cta.primaryAction}</Button>
      </div>
    );
  const ctaText2 = (size: 'sm' | 'md' | 'lg', center?: boolean) => (
    <div className={cx('flex flex-col', size === 'sm' ? 'gap-2' : 'gap-2 md:gap-4', center && 'items-center text-center')}>
      <h2
        className={cx(
          size === 'sm' ? 'text-lg font-medium md:text-xl' : size === 'lg' ? 'text-display-xs font-semibold md:text-display-md' : 'text-display-xs font-semibold md:text-display-sm',
          t.heading,
        )}
      >
        {ctaTitle}
      </h2>
      {ctaText != null && <p className={cx(size === 'sm' ? 'text-md' : 'text-lg md:text-xl', t.text)}>{ctaText}</p>}
    </div>
  );
  /** Bottom bar: border-top, 32px top padding; children left / right (stacked reversed on mobile). */
  const bottom = (left: ReactNode, right: ReactNode, opts: { reverse?: boolean } = {}) => (
    <Container className="mt-12 md:mt-16">
      <div className={cx('flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between', opts.reverse !== false && 'flex-col-reverse', t.border)}>
        {left}
        {right}
      </div>
    </Container>
  );
  const pad = 'pt-12 pb-12 md:pt-16';

  /* ---------------- layouts ---------------- */
  let body: ReactNode;
  switch (type) {
    case 'large-01':
    case 'large-05':
    case 'large-09':
      body = (
        <div className={pad}>
          {type === 'large-05' && (
            <Container className="mb-12 md:mb-16">
              <div className={cx('flex flex-col gap-6 border-b pb-12 md:flex-row md:items-start md:justify-between md:gap-8 md:pb-16', t.border)}>
                {ctaText2('sm')}
                {emailForm()}
              </div>
            </Container>
          )}
          {type === 'large-09' && (
            <Container className="mb-12 flex flex-col items-center gap-8 md:mb-16 md:gap-12">
              {ctaText2('lg', true)}
              {ctaButtons()}
            </Container>
          )}
          <Container>{columnsEl(props.columns ?? footerColumns6, 'default', 'md:grid-cols-3 lg:grid-cols-6')}</Container>
          {bottom(logo, copyrightEl(), { reverse: false })}
        </div>
      );
      break;
    case 'large-02':
    case 'large-06':
    case 'large-12': {
      const band = type === 'large-02' ? null : (
        <div className={cx('py-10 md:py-12', theme === 'brand' ? 'border-b border-brand-600' : t.band)}>
          <Container className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-8">
            {ctaText2(type === 'large-12' ? 'md' : 'sm')}
            {emailForm()}
          </Container>
        </div>
      );
      const main = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          {logoBlock('lg:flex-1')}
          {columnsEl(props.columns ?? footerColumns5, 'default', 'md:grid-cols-5 lg:w-[832px] lg:shrink-0')}
        </Container>
      );
      body =
        type === 'large-02' ? (
          <>
            <div className="pt-12 pb-12 md:pt-16">{main}</div>
            <div className={cx('py-10 md:py-12', theme === 'brand' ? 'border-t border-brand-600' : t.band)}>
              <Container className="flex flex-col-reverse gap-6 md:flex-row md:items-center md:justify-between">
                {copyrightEl()}
                {socialsEl()}
              </Container>
            </div>
          </>
        ) : (
          <>
            {band}
            <div className={pad}>
              {main}
              {bottom(copyrightEl(), socialsEl())}
            </div>
          </>
        );
      break;
    }
    case 'large-03':
      body = (
        <div className={pad}>
          <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {columnsEl(props.columns ?? footerColumns5, t.dark ? 'default' : 'brand', 'md:grid-cols-5 lg:flex-1')}
            {appBadges}
          </Container>
          {bottom(logo, copyrightEl(), { reverse: false })}
        </div>
      );
      break;
    case 'large-04':
      body = (
        <div className={pad}>
          <Container className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8">
            {logoBlock('lg:flex-1', true)}
            <div className="flex flex-col gap-12 md:flex-row md:gap-8">
              {columnsEl(props.columns ?? footerColumns2, t.dark ? 'default' : 'brand', 'md:w-80 md:shrink-0')}
              {newsletterSmall}
            </div>
          </Container>
          {bottom(copyrightEl(), legalEl)}
        </div>
      );
      break;
    case 'large-07':
    case 'large-11':
      body = (
        <div className={pad}>
          {type === 'large-11' && (
            <Container className="mb-12 md:mb-16">
              <div className={cx('flex flex-col items-center gap-8 border-b pb-12 md:gap-12 md:pb-16', t.border)}>
                {ctaText2('md', true)}
                {ctaButtons(true)}
              </div>
            </Container>
          )}
          <Container className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-8">
            <div className="flex flex-col gap-8 md:flex-1">
              {logoBlock()}
              {inlineLinksEl()}
            </div>
            {appBadges}
          </Container>
          {bottom(copyrightEl(), socialsEl())}
        </div>
      );
      break;
    case 'large-08':
      body = (
        <div className={pad}>
          <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex flex-col gap-8">
              {logo}
              {inlineLinksEl()}
            </div>
            {newsletterSmall}
          </Container>
          {bottom(copyrightEl(), legalEl)}
        </div>
      );
      break;
    case 'large-10':
      body = (
        <div className={pad}>
          <Container className="mb-12 md:mb-16">
            <div className={cx('flex flex-col gap-8 border-b pb-12 lg:flex-row lg:items-start lg:justify-between md:pb-16', t.border)}>
              {ctaText2('md')}
              {ctaButtons()}
            </div>
          </Container>
          <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            {logoBlock('lg:flex-1')}
            {columnsEl(props.columns ?? footerColumns5, 'default', 'md:grid-cols-5 lg:w-[832px] lg:shrink-0')}
          </Container>
          {bottom(copyrightEl(), socialsEl())}
        </div>
      );
      break;
    case 'large-13':
      body = (
        <div className={pad}>
          <Container className="flex flex-col items-center gap-8 md:gap-12">
            {props.logo ?? <TinicornLogomark />}
            {ctaText2('md', true)}
            {ctaButtons(true)}
          </Container>
          {bottom(copyrightEl(), legalEl)}
        </div>
      );
      break;
    case 'large-14':
      body = (
        <div className={pad}>
          <Container className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-8">
            {logo}
            {columnsEl(props.columns ?? footerColumns3, 'default', 'md:grid-cols-3 lg:w-[640px]')}
          </Container>
          {bottom(<div className="md:max-w-3xl">{ctaText2('sm')}</div>, copyrightEl(), { reverse: false })}
        </div>
      );
      break;
    case 'large-15':
    case 'large-16':
      body = (
        <div className={pad}>
          <Container className="flex flex-col gap-8 md:items-center">
            {logo}
            {inlineLinksEl('md:justify-center')}
          </Container>
          {type === 'large-15' ? bottom(copyrightEl(), legalEl) : bottom(emailForm(), copyrightEl())}
        </div>
      );
      break;
    case 'small-01':
      body = (
        <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
          <div className="md:w-40">{logo}</div>
          {inlineLinksEl('md:justify-center')}
          {copyrightEl('md:w-40 md:text-right')}
        </Container>
      );
      break;
    case 'small-02':
      body = (
        <Container className="flex flex-col gap-6 py-12 md:flex-row md:items-center md:justify-between md:gap-8">
          {logo}
          {copyrightEl()}
        </Container>
      );
      break;
    case 'small-03':
      body = (
        <Container className="flex flex-col items-start gap-6 py-12 md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-8">
          <div className="order-1 md:order-none">{logo}</div>
          {socialsEl('order-2 md:order-first md:w-80')}
          {copyrightEl('order-3 md:text-right')}
        </Container>
      );
      break;
    case 'small-04':
      body = (
        <Container className="flex flex-col gap-8 py-12 md:gap-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {logo}
            {emailForm()}
          </div>
          {copyrightEl('md:text-right')}
        </Container>
      );
      break;
  }

  return (
    <MarketingSection ref={ref} as="footer" id={id} theme={theme} spacing="none" className={className}>
      {body}
    </MarketingSection>
  );
});
