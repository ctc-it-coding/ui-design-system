import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CompanyLogo, type CompanyLogoName } from '../../components/logos/CompanyLogo';
import { IPhoneMockup } from '../../components/mockups/IPhoneMockup';
import { ScreenMockup } from '../../components/mockups/ScreenMockup';
import { Container, ImagePlaceholder, MarketingSection } from '../_shared';
import { PricingCheckList } from '../pricing/PricingCheckItem';
import { CTANotificationQueue, CTAQuotePanel, ctaThemeTokens, type CTATheme, type CTAThemeTokens } from './_parts';
import { ctaLogos01, ctaLogos02, ctaNotifications, type CTACopy, type CTANotification, type CTAQuote, type CTASectionType } from './defaults';

export type CTAHeadingSize = 'sm' | 'md' | 'lg';

/** Card-style types: the theme colors the card, the section stays white. */
export const ctaCardTypes: CTASectionType[] = ['card-horizontal-split', 'card-horizontal', 'card-vertical', 'split-image-04', 'iphone-mockup-04', 'screen-mockup-04'];

/** Default theme per type (Figma: card types only exist as Gray light / Gray dark / Brand). */
export function ctaDefaultTheme(type: CTASectionType): CTATheme {
  if (type === 'split-image-04' || type === 'iphone-mockup-04') return 'brand';
  if (ctaCardTypes.includes(type)) return 'gray-light';
  return 'default';
}

const headingSizeFor = (type: CTASectionType): CTAHeadingSize =>
  type === 'card-horizontal' || type === 'card-horizontal-split'
    ? 'sm'
    : /^(simple|card-vertical|screen-mockup-0[34])/.test(type)
      ? 'md'
      : 'lg';

export interface CTALayoutProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  type: CTASectionType;
  theme: CTATheme;
  copy: CTACopy;
  /** Buttons / store badges / email form. */
  actions: ReactNode;
  headingSize?: CTAHeadingSize;
  logos?: CompanyLogoName[];
  quote?: CTAQuote;
  imageSrc?: string;
  /** Abstract images: up to 5 image URLs. */
  images?: string[];
  notifications?: CTANotification[];
  /** Content inside the screen / phone mockups (defaults to a placeholder app UI). */
  screen?: ReactNode;
  phoneScreen?: ReactNode;
  /** Check item style (Figma Check item text Type). */
  checkType?: 'default' | 'line';
  /** Wider action area (newsletter form) for side-by-side layouts. */
  wideActions?: boolean;
}

function Copy({
  t,
  copy,
  size,
  align = 'left',
  actions,
  className,
  maxW,
  checkType = 'line',
}: {
  checkType?: 'default' | 'line';
  t: CTAThemeTokens;
  copy: CTACopy;
  size: CTAHeadingSize;
  align?: 'left' | 'center';
  actions?: ReactNode;
  className?: string;
  maxW?: string;
}) {
  const titleCls = { sm: 'text-display-sm', md: 'text-display-sm md:text-display-md', lg: 'text-display-sm md:text-display-lg' }[size];
  return (
    <div className={cx('flex flex-col gap-8', size === 'lg' && 'md:gap-12', align === 'center' && 'items-center text-center', className)}>
      <div className={cx('flex w-full flex-col', size === 'sm' ? 'gap-4' : size === 'lg' ? 'gap-4 md:gap-6' : 'gap-4 md:gap-5', maxW)}>
        <div className="flex flex-col gap-3">
          {copy.subheading && <p className={cx('text-sm font-semibold md:text-md', t.subheading)}>{copy.subheading}</p>}
          <h2 className={cx('font-semibold', titleCls, t.heading)}>{copy.title}</h2>
        </div>
        {copy.supportingText && <p className={cx('text-lg md:text-xl', t.text)}>{copy.supportingText}</p>}
        {copy.checkItems && copy.checkItems.length > 0 && (
          <PricingCheckList
            className="mt-4 md:mt-2 md:px-4"
            items={copy.checkItems}
            size="md"
            type={checkType}
            textClassName={t.text}
          />
        )}
      </div>
      {actions}
    </div>
  );
}

const Logos = ({ names, white, className }: { names: CompanyLogoName[]; white: boolean; className?: string }) => (
  <div className={cx('flex flex-wrap items-center gap-x-8 gap-y-4', className)}>
    {names.map((n) => (
      <CompanyLogo key={n} name={n} white={white} height={40} className={cx('h-8 w-auto md:h-10', white && 'opacity-90')} />
    ))}
  </div>
);

/**
 * Shared layout engine for `CTASection` and `NewsletterCTASection` — one internal layout per Figma Type.
 */
export const CTALayout = forwardRef<HTMLElement, CTALayoutProps>(function CTALayout(
  { type, theme, copy, actions, headingSize, logos, quote, imageSrc, images, notifications = ctaNotifications, screen, phoneScreen, wideActions, checkType: checkTypeProp, className, ...props },
  ref,
) {
  const t = ctaThemeTokens[theme];
  const isCard = ctaCardTypes.includes(type);
  const size = headingSize ?? headingSizeFor(type);
  const checkType = checkTypeProp ?? (type === 'split-image-01' || type === 'split-image-quote-03' ? 'default' : 'line');
  const copyEl = (align: 'left' | 'center' = 'left', maxW?: string, cls?: string) => (
    <Copy t={t} copy={copy} size={size} align={align} actions={actions} maxW={maxW} className={cls} checkType={checkType} />
  );

  const section = (children: ReactNode, opts: { bg?: string; spacing?: 'md' | 'none'; extra?: string } = {}) => (
    <MarketingSection
      ref={ref}
      data-type={type}
      data-cta-theme={theme}
      spacing={opts.spacing ?? 'md'}
      className={cx(opts.bg ?? (isCard ? 'bg-white' : t.bg), opts.extra, className)}
      {...props}
    >
      {children}
    </MarketingSection>
  );
  const twoCol = 'grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16';
  const phone = (cls?: string) => (
    <IPhoneMockup className={cx('w-[268px] lg:w-[314px]', cls)}>{phoneScreen}</IPhoneMockup>
  );

  switch (type) {
    case 'simple-centered':
      return section(<Container>{copyEl('center', 'max-w-3xl')}</Container>);

    case 'simple-left':
      return section(
        <Container className={cx('flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between', wideActions && 'lg:gap-16')}>
          <Copy t={t} copy={copy} size={size} className="max-w-3xl flex-1" />
          <div className={cx('shrink-0', wideActions && 'w-full lg:w-[480px]')}>{actions}</div>
        </Container>,
      );

    case 'card-horizontal':
    case 'card-horizontal-split':
    case 'card-vertical': {
      const vertical = type === 'card-vertical';
      return section(
        <>
          {type === 'card-horizontal-split' && <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-950" />}
          <Container>
            <div
              className={cx(
                'flex flex-col gap-8 rounded-2xl px-6 py-10 md:p-16',
                t.bg,
                type === 'card-horizontal-split' && 'shadow-xl',
                vertical ? 'items-center text-center' : 'lg:flex-row lg:items-start lg:justify-between',
              )}
            >
              {vertical ? (
                copyEl('center', 'max-w-3xl')
              ) : (
                <>
                  <Copy t={t} copy={copy} size={size} className="max-w-3xl flex-1" />
                  <div className={cx('shrink-0', wideActions && 'w-full lg:w-[480px]')}>{actions}</div>
                </>
              )}
            </div>
          </Container>
        </>,
      );
    }

    case 'simple-logos-01':
      return section(
        <Container className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
          <div className="flex max-w-3xl flex-1 flex-col gap-10">
            <Copy t={t} copy={copy} size={size} actions={<div className="lg:hidden">{actions}</div>} />
            <Logos names={logos ?? ctaLogos01} white={t.dark} className="max-w-[768px]" />
          </div>
          <div className="hidden shrink-0 lg:block">{actions}</div>
        </Container>,
      );

    case 'simple-logos-02':
      return section(
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          <Copy t={t} copy={copy} size={size} actions={actions} className="max-w-xl" />
          <Logos names={logos ?? ctaLogos02} white={t.dark} className="justify-center lg:gap-y-8" />
        </Container>,
      );

    case 'iphone-mockup-01':
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-[480px]')}
          <div className="relative -mb-16 flex h-[360px] justify-center overflow-hidden md:-mb-24 lg:h-[400px] lg:overflow-visible">
            <div aria-hidden className="absolute left-1/2 top-0 h-[360px] w-[400px] -translate-x-1/2 rounded-[46%_54%_42%_58%/52%_44%_56%_48%] bg-gray-50 lg:h-[480px] lg:w-[532px]" />
            {phone('relative mt-8')}
          </div>
        </Container>,
      );

    case 'iphone-mockup-02':
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-[480px]')}
          <div className="relative flex h-[360px] justify-center overflow-hidden bg-gray-100 lg:h-[560px]">
            {phone('absolute top-10 lg:top-16')}
            <CTANotificationQueue items={notifications} className="absolute left-1/2 top-24 -translate-x-1/2 lg:top-36" />
          </div>
        </Container>,
      );

    case 'iphone-mockup-03':
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-[480px]')}
          <div className="relative h-[360px] overflow-hidden bg-gray-100 lg:h-[512px]">
            <IPhoneMockup className="absolute left-[8%] top-10 w-[200px] md:w-[268px] lg:top-16 lg:w-[314px]">{phoneScreen}</IPhoneMockup>
            <IPhoneMockup dark className="absolute right-[8%] top-24 w-[200px] md:w-[268px] lg:top-32 lg:w-[314px]">{phoneScreen}</IPhoneMockup>
          </div>
        </Container>,
      );

    case 'iphone-mockup-04':
      return section(
        <Container>
          <div className={cx('grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2 lg:rounded-3xl', t.bg, t.dark && 'shadow-xl')}>
            <div className="flex flex-col justify-center px-6 pb-12 pt-10 md:p-16">{copyEl('left', 'max-w-[480px]')}</div>
            <div className="relative flex h-[280px] justify-center lg:h-[480px]">
              {phone('absolute top-8 lg:top-16')}
              <CTANotificationQueue items={notifications} className="absolute left-1/2 top-16 hidden -translate-x-1/2 md:flex lg:top-28" />
            </div>
          </div>
        </Container>,
      );

    case 'screen-mockup-01':
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-xl')}
          <div className="relative h-[280px] md:h-[440px] lg:h-[512px]">
            <ScreenMockup size="xl" className="absolute left-0 top-0 w-[560px] md:w-[860px] lg:w-[1024px]">{screen}</ScreenMockup>
          </div>
        </Container>,
      );

    case 'screen-mockup-02':
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-xl')}
          <div className="relative h-[320px] md:h-[480px] lg:h-[568px]">
            <ScreenMockup size="lg" className="absolute left-10 top-0 w-[480px] md:w-[640px] lg:left-16 lg:w-[768px]">{screen}</ScreenMockup>
            <IPhoneMockup className="absolute bottom-0 left-0 w-[150px] md:w-[200px] lg:w-[244px]">{phoneScreen}</IPhoneMockup>
          </div>
        </Container>,
      );

    case 'screen-mockup-03':
      return section(
        <div className="flex flex-col gap-12 md:gap-16">
          <Container>{copyEl('center', 'max-w-3xl')}</Container>
          <Container>
            <div className="-mb-16 h-[200px] overflow-hidden px-1 pt-2 md:-mb-24 md:h-[400px]">
              <ScreenMockup size="2xl" className="mx-auto">{screen}</ScreenMockup>
            </div>
          </Container>
        </div>,
      );

    case 'screen-mockup-04':
      return section(
        <Container>
          <div className={cx('grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-2 lg:rounded-3xl', t.bg)}>
            <div className="flex flex-col justify-center px-6 pb-12 pt-10 md:p-16">{copyEl('left', 'max-w-[480px]')}</div>
            <div className="relative h-[208px] md:h-[400px] lg:h-[480px]">
              <ScreenMockup size="lg" className="absolute left-6 top-0 w-[342px] md:left-16 md:w-[640px] lg:top-16 lg:w-[768px]">{screen}</ScreenMockup>
            </div>
          </div>
        </Container>,
      );

    case 'split-image-01':
    case 'split-image-quote-01':
    case 'split-image-quote-03': {
      const imageLeft = type === 'split-image-quote-03';
      const img = (
        <ImagePlaceholder src={imageSrc} tone={imageLeft ? 'cool' : 'warm'} className={cx('mx-4 md:mx-8 lg:mx-0 lg:h-auto lg:min-h-[720px]', quote ? 'h-[440px] md:h-[560px]' : 'h-[280px] md:h-[480px]')}>
          {quote && <CTAQuotePanel quote={quote} variant="floating" />}
        </ImagePlaceholder>
      );
      return section(
        <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2 lg:gap-0">
          {imageLeft && <div className="order-2 lg:order-1">{img}</div>}
          <div
            className={cx(
              'flex px-4 md:px-8 lg:items-center lg:py-24',
              imageLeft ? 'order-1 lg:order-2 lg:pl-16 lg:pr-[max(2rem,calc((100vw-1280px)/2+2rem))]' : 'lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))] lg:pr-16',
            )}
          >
            <div className="w-full max-w-[576px]">
              <Copy t={t} copy={copy} size={size} actions={actions} checkType={checkType} />
            </div>
          </div>
          {!imageLeft && img}
        </div>,
        { spacing: 'none', extra: 'py-16 lg:py-0' },
      );
    }

    case 'split-image-02':
    case 'split-image-quote-02':
    case 'split-image-quote-04': {
      const imageLeft = type === 'split-image-quote-04';
      const img = (
        <ImagePlaceholder src={imageSrc} tone="warm" className={cx('w-full', quote ? 'h-[440px] md:h-[560px]' : 'h-[280px] md:h-[480px]', type === 'split-image-02' ? 'lg:h-[592px]' : 'lg:h-[720px]', imageLeft && 'lg:order-1')}>
          {quote && <CTAQuotePanel quote={quote} variant="full-width" />}
        </ImagePlaceholder>
      );
      return section(
        <Container className={twoCol}>
          <div className={cx(imageLeft && 'lg:order-2')}>{copyEl('left', 'max-w-xl')}</div>
          {img}
        </Container>,
      );
    }

    case 'split-image-03':
      return section(
        <>
          <div className={cx('pb-24 pt-16 md:pb-40 md:pt-24', theme === 'default' ? 'bg-gray-50' : t.bg)}>
            <Container>{copyEl('center', 'max-w-3xl')}</Container>
          </div>
          <Container className="-mt-16 pb-16 md:-mt-24 md:pb-24">
            <ImagePlaceholder src={imageSrc} tone="cool" className="h-[240px] w-full md:h-[516px]" />
          </Container>
        </>,
        { spacing: 'none', bg: 'bg-white' },
      );

    case 'split-image-04':
      return section(
        <Container>
          <div className={cx('flex flex-col overflow-hidden rounded-2xl lg:flex-row lg:items-stretch lg:rounded-3xl', t.bg, t.dark && 'shadow-xl')}>
            <div className="flex flex-1 flex-col justify-center px-6 pb-12 pt-10 md:p-16">{copyEl('left', 'max-w-[608px]')}</div>
            <ImagePlaceholder src={imageSrc} tone="warm" className="h-[280px] w-full lg:h-auto lg:min-h-[400px] lg:w-[480px] lg:shrink-0" />
          </div>
        </Container>,
      );

    case 'abstract-images': {
      const boxes = [
        'left-0 top-[25.8%] w-[27.8%] h-[48.4%]',
        'left-[33.3%] top-[6.5%] w-[33.3%] h-[25.8%]',
        'left-[33.3%] top-[37.1%] w-[33.3%] h-[25.8%]',
        'left-[72.2%] top-[12.9%] w-[27.8%] h-[48.4%]',
        'left-[36.1%] top-[67.7%] w-[27.8%] h-[32.3%]',
      ];
      const tones = ['warm', 'cool', 'brand', 'gray', 'warm'] as const;
      return section(
        <Container className={twoCol}>
          {copyEl('left', 'max-w-xl')}
          <div className="relative mx-auto aspect-[576/496] w-full max-w-[576px]">
            {boxes.map((b, i) => (
              <ImagePlaceholder key={i} src={images?.[i]} tone={tones[i]} className={cx('absolute rounded-2xl', b)} />
            ))}
          </div>
        </Container>,
      );
    }
  }
});
