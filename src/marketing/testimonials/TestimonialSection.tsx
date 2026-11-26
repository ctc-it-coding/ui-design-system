import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowRight } from '../../icons';
import { Avatar } from '../../components/avatars/Avatar';
import { Button } from '../../components/buttons/Button';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import { Container, ImagePlaceholder, MarketingSection, type ImagePlaceholderProps } from '../_shared';
import { caseStudyDefaults, testimonialDefaults, testimonialHeadingDefaults, testimonialLogoDefaults, type CaseStudy, type Testimonial } from './defaults';
import { QuoteImagePanel } from './QuoteImagePanel';
import { TestimonialArrows } from './TestimonialCarouselArrow';
import { GlassPlayButton, LogoFor, SlideDots, initialsOf, tone, type ToneName } from './_parts';
import { scrollerClass, useScrollCarousel, useSlideIndex } from './useCarousel';

export type TestimonialSectionType =
  | 'simple-centered-01'
  | 'simple-centered-02'
  | 'simple-centered-03'
  | 'simple-left-aligned'
  | 'card'
  | 'split-image-01'
  | 'split-image-02'
  | 'split-image-03'
  | 'abstract-image'
  | 'card-split-image'
  | 'glassmorphic-cards-01'
  | 'glassmorphic-cards-02'
  | 'glassmorphic-cards-03'
  | 'case-study-cards';

export type TestimonialSectionTheme = 'default' | 'gray-light' | 'gray-dark' | 'brand';

export interface TestimonialSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: TestimonialSectionType;
  /**
   * Figma: Theme. Card types (`card`, `card-split-image`) apply it to the card (Gray light / Brand / Gray dark) on a white section;
   * other types colour the whole section. Default: `default` (card types: `gray-light`).
   */
  theme?: TestimonialSectionTheme;
  /** Testimonials (quote, name, title…). Carousels page through them. Defaults to the Figma copy for the type. */
  testimonials?: Testimonial[];
  /** Section heading (glassmorphic / case study types). */
  title?: ReactNode;
  /** Supporting text under the heading. */
  supportingText?: ReactNode;
  /** Buttons next to the heading; defaults to "Our customers" + "Create account". */
  actions?: ReactNode;
  /** Company names for the logo row of `simple-centered-03`. */
  logos?: string[];
  /** Cards of `case-study-cards`. */
  caseStudies?: CaseStudy[];
  /** Image URL(s) for image based types (photo slots); gradient placeholders without. */
  imageSrc?: string;
}

/* ---------------------------------------------------------------- helpers */

const tones: ImagePlaceholderProps['tone'][] = ['warm', 'cool', 'gray', 'brand', 'dark', 'warm'];

function Photo({ src, i = 0, className, style, children }: { src?: string; i?: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <ImagePlaceholder src={src} tone={tones[i % tones.length]} className={className} style={style}>
      {children}
    </ImagePlaceholder>
  );
}

function Attribution({
  t,
  theme,
  avatar,
  align = 'left',
  nameCls = 'text-md font-medium',
  titleCls = 'text-sm font-medium',
  avatarSize = '2xl',
}: {
  t: Testimonial;
  theme: ToneName;
  avatar?: 'top' | 'left' | false;
  align?: 'left' | 'center';
  nameCls?: string;
  titleCls?: string;
  avatarSize?: 'xl' | '2xl';
}) {
  const c = tone[theme];
  const text = (
    <div className={cx('flex min-w-0 flex-col gap-1', align === 'center' && 'items-center text-center', avatar === 'left' && 'flex-1 gap-0.5')}>
      <p className={cx(nameCls, c.heading)}>{t.name}</p>
      {t.title && <p className={cx(titleCls, c.text)}>{t.title}</p>}
    </div>
  );
  if (!avatar) return text;
  return (
    <div className={cx('flex gap-4', avatar === 'top' ? 'flex-col items-center' : 'min-w-0 flex-1 items-center')}>
      <Avatar size={avatarSize} src={t.avatarSrc} initials={initialsOf(t.name)} alt={t.name} />
      {text}
    </div>
  );
}

function HeaderRow({ title, supportingText, actions, theme }: { title?: ReactNode; supportingText?: ReactNode; actions?: ReactNode; theme: ToneName }) {
  const c = tone[theme];
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
      <div className="flex max-w-3xl flex-col gap-4 md:gap-5">
        {title != null && <h2 className={cx('text-display-sm font-semibold md:text-display-md', c.heading)}>{title}</h2>}
        {supportingText != null && <p className={cx('text-lg md:text-xl', c.text)}>{supportingText}</p>}
      </div>
      {actions !== null && (
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          {actions ?? (
            <>
              <Button size="xl" hierarchy="secondary-gray">{testimonialHeadingDefaults.actions.secondary}</Button>
              <Button size="xl">{testimonialHeadingDefaults.actions.primary}</Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- layouts */

interface LayoutProps {
  items: Testimonial[];
  theme: ToneName;
  p: TestimonialSectionProps;
}

function SimpleCentered01({ items, theme }: LayoutProps) {
  const s = useSlideIndex(items.length);
  const t = items[s.index]!;
  const c = tone[theme];
  return (
    <Container>
      <div className="flex flex-col items-center gap-10" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <figure className="flex w-full max-w-5xl flex-col items-center gap-8" aria-live="polite">
          <blockquote className={cx('text-center text-display-sm font-medium md:text-display-md', c.heading)}>{t.quote}</blockquote>
          <figcaption className="flex flex-col items-center gap-4">
            <Attribution t={t} theme={theme} avatar="top" align="center" />
            <RatingStars value={t.rating ?? 5} />
          </figcaption>
        </figure>
        <SlideDots count={items.length} index={s.index} onSelect={s.go} dark={c.dark} />
      </div>
    </Container>
  );
}

function SimpleCentered02({ items, theme }: LayoutProps) {
  const t = items[0]!;
  const c = tone[theme];
  return (
    <Container>
      <figure className="flex flex-col items-center gap-8">
        {t.company && <LogoFor company={t.company} white={c.dark} height={40} />}
        <blockquote className={cx('max-w-[1216px] text-center text-display-sm font-medium md:text-display-lg', c.heading)}>{t.quote}</blockquote>
        <figcaption>
          <Attribution t={t} theme={theme} avatar="top" align="center" />
        </figcaption>
      </figure>
    </Container>
  );
}

function SimpleCentered03({ items, theme, p }: LayoutProps) {
  const t = items[0]!;
  const c = tone[theme];
  const logos = p.logos ?? testimonialLogoDefaults;
  return (
    <Container>
      <div className="flex flex-col items-center gap-10 md:gap-12">
        <figure className="flex flex-col items-center gap-8">
          <blockquote className={cx('text-center text-display-sm font-medium md:text-display-lg', c.heading)}>{t.quote}</blockquote>
          <figcaption>
            <Attribution t={t} theme={theme} avatar="top" align="center" />
          </figcaption>
        </figure>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4">
          {logos.map((l) => (
            <li key={l} className="flex h-10 items-center justify-center md:h-12 md:w-[200px]">
              <LogoFor company={l} white={c.dark} height={40} className="md:h-12" />
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}

function SimpleLeftAligned({ items, theme, p }: LayoutProps) {
  const t = items[0]!;
  const c = tone[theme];
  return (
    <Container>
      <div className="flex flex-col gap-10 md:flex-row md:items-center md:gap-16 lg:gap-0">
        <Photo src={t.imageSrc ?? p.imageSrc} className="size-[200px] shrink-0 rounded-2xl md:size-[328px]" />
        <figure className="flex flex-1 flex-col gap-8 lg:px-16">
          <div className="flex flex-col gap-6">
            <RatingStars value={t.rating ?? 5} />
            <blockquote className={cx('text-display-xs font-medium md:text-display-md', c.heading)}>{t.quote}</blockquote>
          </div>
          <figcaption className="flex flex-col gap-1">
            <p className={cx('text-md font-medium', c.heading)}>— {t.name}</p>
            {t.title && <p className={cx('text-sm font-medium', c.text)}>{t.title}</p>}
          </figcaption>
        </figure>
      </div>
    </Container>
  );
}

function CardType({ items, theme }: LayoutProps) {
  const t = items[0]!;
  const cardTheme: ToneName = theme === 'default' ? 'gray-light' : theme;
  const c = tone[cardTheme];
  return (
    <Container>
      <figure className={cx('flex flex-col items-center gap-8 rounded-2xl px-6 py-10 md:p-16', c.bg)}>
        <div className="flex flex-col gap-3 text-center">
          {t.subheading && <p className={cx('text-sm font-semibold', c.sub)}>{t.subheading}</p>}
          <blockquote className={cx('text-display-xs font-medium md:text-display-md', c.heading)}>{t.quote}</blockquote>
        </div>
        <figcaption>
          <Attribution t={t} theme={cardTheme} avatar="top" align="center" avatarSize="xl" titleCls="text-sm" />
        </figcaption>
      </figure>
    </Container>
  );
}

function SplitImage01({ items, p }: LayoutProps) {
  const s = useSlideIndex(items.length);
  const t = items[s.index]!;
  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-0" role="region" aria-roledescription="carousel" aria-label="Testimonials">
      <div className="flex md:w-1/2 md:justify-end md:py-24">
        <div className="flex w-full max-w-[640px] items-center px-4 md:px-8">
          <figure className="flex w-full flex-col gap-8 md:gap-10 md:pr-8" aria-live="polite">
            <blockquote className="text-display-sm font-medium text-gray-900 md:text-display-lg md:font-semibold">{t.quote}</blockquote>
            <figcaption className="flex items-end gap-3">
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-lg font-semibold text-gray-900">{t.name}</p>
                {t.title && <p className="text-md text-gray-600">{t.title}</p>}
              </div>
              <TestimonialArrows onPrev={s.prev} onNext={s.next} canPrev={s.canPrev} canNext={s.canNext} />
            </figcaption>
          </figure>
        </div>
      </div>
      <div className="px-4 md:w-1/2 md:px-0">
        <Photo src={t.imageSrc ?? p.imageSrc} i={s.index} className="h-[560px] md:h-auto md:min-h-[720px]">
          <QuoteImagePanel type="floating" size="md" name={t.name} title={t.role ?? t.title} supportingText={t.supportingText} rating={t.rating ?? 5} />
        </Photo>
      </div>
    </div>
  );
}

function SplitQuote({ items, p, variant }: LayoutProps & { variant: '02' | '03' | 'abstract' }) {
  const s = useSlideIndex(items.length);
  const t = items[s.index]!;
  const withAvatar = variant !== '02';
  const media =
    variant === 'abstract' ? (
      <div className="relative mx-auto aspect-[576/496] w-full max-w-[576px]">
        {[
          [296, 0, 160, 240],
          [384, 256, 192, 128],
          [0, 256, 192, 128],
          [208, 256, 160, 240],
          [120, 80, 160, 160],
        ].map(([x, y, w, h], i) => (
          <Photo
            key={i}
            i={i + s.index}
            className="absolute"
            // positions are percentages of the 576×496 Figma frame
            style={{ left: `${(x! / 576) * 100}%`, top: `${(y! / 496) * 100}%`, width: `${(w! / 576) * 100}%`, height: `${(h! / 496) * 100}%` }}
          />
        ))}
      </div>
    ) : (
      <Photo src={t.imageSrc ?? p.imageSrc} i={s.index} className={cx('w-full', variant === '02' ? 'h-[560px] md:h-[720px]' : 'h-[400px] md:h-[720px]')}>
        {variant === '02' && <QuoteImagePanel type="full-width" size="md" name={t.name} title={t.role ?? t.title} supportingText={t.supportingText} rating={t.rating ?? 5} />}
      </Photo>
    );
  return (
    <Container>
      <div className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16" role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <figure className="flex flex-1 flex-col gap-8 md:gap-12" aria-live="polite">
          <div className="flex flex-col gap-6 md:gap-8">
            <RatingStars value={t.rating ?? 5} />
            <blockquote className="text-display-sm font-medium text-gray-900 md:text-display-lg">{t.quote}</blockquote>
          </div>
          <figcaption className="flex items-center gap-3">
            {withAvatar ? (
              <Attribution t={t} theme="default" avatar="left" avatarSize="xl" nameCls={cx('text-lg', variant === '03' ? 'font-semibold' : 'font-medium')} titleCls="text-md" />
            ) : (
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-lg font-medium text-gray-900">{t.name}</p>
                {t.title && <p className="text-md text-gray-600">{t.title}</p>}
              </div>
            )}
            <TestimonialArrows onPrev={s.prev} onNext={s.next} canPrev={s.canPrev} canNext={s.canNext} />
          </figcaption>
        </figure>
        <div className="flex-1">{media}</div>
      </div>
    </Container>
  );
}

function CardSplitImage({ items, theme, p }: LayoutProps) {
  const s = useSlideIndex(items.length);
  const t = items[s.index]!;
  const cardTheme: ToneName = theme === 'default' ? 'gray-light' : theme;
  const c = tone[cardTheme];
  return (
    <Container>
      <div className={cx('flex flex-col overflow-hidden rounded-3xl md:flex-row', c.bg)} role="region" aria-roledescription="carousel" aria-label="Testimonials">
        <figure className="flex flex-1 flex-col justify-center gap-8 px-6 py-10 md:gap-10 md:p-16" aria-live="polite">
          <div className="flex flex-col gap-6">
            <RatingStars value={t.rating ?? 5} />
            <blockquote className={cx('text-display-xs font-medium md:text-display-md', c.heading)}>{t.quote}</blockquote>
          </div>
          <figcaption className="flex flex-col gap-1">
            <p className={cx('text-lg font-medium', c.heading)}>— {t.name}</p>
            {t.title && <p className={cx('text-md', c.text)}>{t.title}</p>}
          </figcaption>
          <SlideDots count={items.length} index={s.index} onSelect={s.go} dark={c.dark} className="self-start" />
        </figure>
        <Photo src={t.imageSrc ?? p.imageSrc} i={s.index + 1} className="flex h-[280px] items-center justify-center md:h-auto md:min-h-[448px] md:w-[480px] md:shrink-0">
          <GlassPlayButton size={96} className="relative max-md:size-16!" />
        </Photo>
      </div>
    </Container>
  );
}

function GlassCard({ t, i, size, type, highlight }: { t: Testimonial; i: number; size: 'sm'; type: 'floating' | 'full-width'; highlight: boolean }) {
  return (
    <Photo src={t.imageSrc} i={i} className="group/card h-full w-full">
      <QuoteImagePanel
        size={size}
        type={type}
        name={t.name}
        title={t.title}
        supportingText={t.supportingText}
        rating={t.rating ?? 5}
        quote={
          <span
            className={cx(
              'grid transition-[grid-template-rows,opacity] duration-300',
              highlight ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0 group-hover/card:grid-rows-[1fr] group-hover/card:opacity-100 group-focus-within/card:grid-rows-[1fr] group-focus-within/card:opacity-100',
            )}
          >
            <span className="overflow-hidden">{t.quote}</span>
          </span>
        }
        className={cx(!highlight && '[&>div]:gap-0 group-hover/card:[&>div]:gap-6')}
      />
    </Photo>
  );
}

function Glassmorphic({ items, theme, p, variant }: LayoutProps & { variant: '01' | '02' | '03' }) {
  const sc = useScrollCarousel<HTMLUListElement>();
  const h = testimonialHeadingDefaults.glassmorphic;
  const panelType = variant === '02' ? 'full-width' : 'floating';
  const highlight = variant === '03' ? 2 : 1;
  return (
    <Container className="flex flex-col gap-12 md:gap-16">
      <HeaderRow title={p.title ?? h.title} supportingText={p.supportingText ?? h.supportingText} actions={p.actions} theme={theme} />
      {variant === '03' ? (
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t, i) => (
            <li key={i} className="h-[384px] md:h-[480px]" tabIndex={0}>
              <GlassCard t={t} i={i} size="sm" type={panelType} highlight={i === highlight} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col gap-8" role="region" aria-roledescription="carousel" aria-label="Testimonials">
          <ul ref={sc.ref} className={cx(scrollerClass, 'gap-6 md:gap-8')}>
            {items.map((t, i) => (
              <li key={i} className="h-[384px] w-[288px] shrink-0 snap-start md:h-[480px] md:w-[360px]" tabIndex={0}>
                <GlassCard t={t} i={i} size="sm" type={panelType} highlight={i === highlight} />
              </li>
            ))}
          </ul>
          <TestimonialArrows onPrev={sc.prev} onNext={sc.next} canPrev={sc.canPrev} canNext={sc.canNext} />
        </div>
      )}
    </Container>
  );
}

function CaseStudies({ theme, p }: LayoutProps) {
  const sc = useScrollCarousel<HTMLUListElement>();
  const h = testimonialHeadingDefaults['case-study-cards'];
  const cards = p.caseStudies ?? caseStudyDefaults;
  return (
    <Container className="flex flex-col gap-12 md:gap-16">
      <HeaderRow title={p.title ?? h.title} supportingText={p.supportingText ?? h.supportingText} actions={p.actions} theme={theme} />
      <div className="flex flex-col gap-8" role="region" aria-roledescription="carousel" aria-label="Case studies">
        <ul ref={sc.ref} className={cx(scrollerClass, 'gap-6 md:gap-8')}>
          {cards.map((cs, i) => (
            <li
              key={i}
              className={cx('relative flex h-[440px] w-[288px] shrink-0 snap-start flex-col justify-end overflow-hidden p-4 md:h-[504px] md:w-[384px] md:p-6', cs.colorClass ?? 'bg-brand-600')}
            >
              {cs.imageSrc && <img src={cs.imageSrc} alt="" className="absolute inset-0 size-full object-cover" />}
              <div className="absolute top-6 left-6 md:top-8 md:left-8">
                <LogoFor company={cs.company} white height={40} className="md:h-12" />
              </div>
              <div className="relative flex flex-col gap-8 border border-white/50 bg-white/30 px-5 py-6 backdrop-blur-lg md:px-6 md:py-8">
                <div className="flex flex-col gap-4">
                  <p className="text-display-xs font-semibold text-white md:text-display-sm">{cs.company}</p>
                  <p className="text-md font-semibold text-white md:text-lg">{cs.quote}</p>
                </div>
                <a
                  href={cs.href ?? '#'}
                  className="inline-flex items-center gap-2 self-start rounded-sm text-md font-semibold text-white outline-none hover:underline focus-visible:ring-4 focus-visible:ring-white/40"
                >
                  {cs.linkLabel ?? 'Read case study'}
                  <ArrowRight className="size-5" />
                </a>
              </div>
            </li>
          ))}
        </ul>
        <TestimonialArrows onPrev={sc.prev} onNext={sc.next} canPrev={sc.canPrev} canNext={sc.canNext} />
      </div>
    </Container>
  );
}

/* ---------------------------------------------------------------- section */

const defaultKey = (type: TestimonialSectionType): keyof typeof testimonialDefaults =>
  type.startsWith('glassmorphic') || type === 'case-study-cards' ? 'glassmorphic' : (type as Exclude<TestimonialSectionType, `glassmorphic-${string}` | 'case-study-cards'>);

/**
 * TestimonialSection — Figma "Testimonial section" (every Type × Theme, Desktop + Mobile).
 * Carousels (dots / arrows) page through `testimonials`; scrolling card rows scroll by one card.
 */
export const TestimonialSection = forwardRef<HTMLElement, TestimonialSectionProps>(function TestimonialSection(props, ref) {
  const { type = 'simple-centered-01', theme = 'default', testimonials, title, supportingText, actions, logos, caseStudies, imageSrc, className, ...rest } = props;
  const items = testimonials && testimonials.length ? testimonials : testimonialDefaults[defaultKey(type)];
  const cardType = type === 'card' || type === 'card-split-image';
  const sectionTheme = cardType ? 'default' : theme === 'gray-light' ? 'gray-light' : theme;
  const lp: LayoutProps = { items, theme: theme as ToneName, p: props };
  const body = (() => {
    switch (type) {
      case 'simple-centered-01': return <SimpleCentered01 {...lp} />;
      case 'simple-centered-02': return <SimpleCentered02 {...lp} />;
      case 'simple-centered-03': return <SimpleCentered03 {...lp} />;
      case 'simple-left-aligned': return <SimpleLeftAligned {...lp} />;
      case 'card': return <CardType {...lp} />;
      case 'split-image-01': return <SplitImage01 {...lp} />;
      case 'split-image-02': return <SplitQuote {...lp} variant="02" />;
      case 'split-image-03': return <SplitQuote {...lp} variant="03" />;
      case 'abstract-image': return <SplitQuote {...lp} variant="abstract" />;
      case 'card-split-image': return <CardSplitImage {...lp} />;
      case 'glassmorphic-cards-01': return <Glassmorphic {...lp} variant="01" />;
      case 'glassmorphic-cards-02': return <Glassmorphic {...lp} variant="02" />;
      case 'glassmorphic-cards-03': return <Glassmorphic {...lp} variant="03" />;
      case 'case-study-cards': return <CaseStudies {...lp} />;
    }
  })();
  return (
    <MarketingSection
      ref={ref}
      theme={sectionTheme}
      spacing={type === 'split-image-01' ? 'none' : 'md'}
      className={cx(sectionTheme === 'gray-dark' && 'bg-gray-950', type === 'split-image-01' && 'max-md:py-16', className)}
      data-type={type}
      {...rest}
    >
      {body}
    </MarketingSection>
  );
});
