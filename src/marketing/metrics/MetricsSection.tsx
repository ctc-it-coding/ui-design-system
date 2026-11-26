import { forwardRef, Fragment, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { PlayCircle, Zap } from '../../icons';
import type { IconSlot } from '../../utils/renderIcon';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Container, ImagePlaceholder, MarketingSection, MarketingThemeProvider, type MarketingTheme } from '../_shared';
import { AreaHeading, areaTone, type AreaTone } from '../features/tone';
import { MarketingMetricItem, type MarketingMetricItemType } from './MarketingMetricItem';
import { defaultMetrics, metricsCopy as C, type MetricData } from './defaults';

export type MetricsSectionType =
  | 'simple-accent-line'
  | 'simple-centered-text'
  | 'minimal-centered-text'
  | 'split-image-01'
  | 'split-image-02'
  | 'card-gray-dark'
  | 'card-brand-dark'
  | 'card-brand-light'
  | 'card-gray-light'
  | 'image-with-cards-01'
  | 'image-with-cards-02'
  | 'simple-with-actions-01'
  | 'simple-with-actions-02';

export const metricsSectionTypes: MetricsSectionType[] = [
  'simple-accent-line', 'simple-centered-text', 'minimal-centered-text', 'split-image-01', 'split-image-02',
  'card-gray-light', 'card-brand-light', 'card-gray-dark', 'card-brand-dark',
  'image-with-cards-01', 'image-with-cards-02', 'simple-with-actions-01', 'simple-with-actions-02',
];

/**
 * Figma Theme: Default / Gray dark / Brand dark (simple-accent-line, simple/minimal-centered-text, split-image-01/02);
 * card types carry their own theme (Gray light, Brand light, Gray dark, Brand dark). `brand-dark` is an alias of `brand`.
 */
export type MetricsSectionTheme = 'default' | 'gray-dark' | 'brand' | 'brand-dark' | 'gray-light' | 'brand-light';

export interface MetricsSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: MetricsSectionType;
  /** Figma: Theme */
  theme?: MetricsSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Metrics (number, label, supportingText, icon, actionLabel). */
  metrics?: MetricData[];
  /** Header icon (simple-accent-line / simple-centered-text). */
  icon?: IconSlot;
  /** Action buttons (simple-with-actions, image-with-cards-02). */
  actions?: ReactNode;
  /** Image URL (split-image, image-with-cards). */
  imageSrc?: string;
}

const norm = (t: MetricsSectionTheme | undefined): MarketingTheme => (t === 'brand-dark' ? 'brand' : t ?? 'default');

interface Ctx {
  type: MetricsSectionType;
  tone: AreaTone;
  theme: MarketingTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  metrics: MetricData[];
  icon: IconSlot;
  actions?: ReactNode;
  imageSrc?: string;
}

const items = (c: Ctx, type: MarketingMetricItemType, n: number, extra?: { className?: string; cardClassName?: string; withAction?: boolean }) =>
  c.metrics.slice(0, n).map((m, i) => (
    <MarketingMetricItem
      key={i}
      type={type}
      number={m.number}
      label={m.label}
      supportingText={m.supportingText}
      icon={m.icon}
      actionLabel={extra?.withAction ? m.actionLabel ?? 'Learn more' : false}
      actionHref={m.href}
      className={extra?.className}
      cardClassName={extra?.cardClassName}
    />
  ));

const Actions = ({ c }: { c: Ctx }) =>
  c.actions ?? (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      <Button size="xl" hierarchy="secondary-gray" iconLeading={PlayCircle} className="w-full sm:w-auto">Demo</Button>
      <Button size="xl" hierarchy="primary" className="w-full sm:w-auto">Get started</Button>
    </div>
  );

const GAP = 'mt-12 md:mt-16';

function IconHeading({ c }: { c: Ctx }) {
  const modern = c.type === 'simple-accent-line';
  const theme = c.tone.dark ? 'dark-outline' : modern ? 'modern' : 'light';
  return (
    <Container>
      <AreaHeading tone={c.tone} title={c.title} supportingText={c.supportingText} align="center">
        <div className="order-first mb-4 md:mb-6">
          <FeaturedIcon icon={c.icon} size="xl" color={c.tone.featuredColor} theme={theme} />
        </div>
      </AreaHeading>
    </Container>
  );
}

function SimpleAccent(c: Ctx) {
  return (
    <>
      <IconHeading c={c} />
      <Container className={cx(GAP, 'grid gap-10 md:grid-cols-2 md:gap-8 lg:grid-cols-4')}>
        {items(c, 'small-accent-line', 4, { withAction: true })}
      </Container>
    </>
  );
}

function SimpleCentered(c: Ctx) {
  const list = items(c, 'centered-text', 3, { className: 'flex-1' });
  return (
    <>
      <IconHeading c={c} />
      <Container className={GAP}>
        <div className="mx-auto flex max-w-3xl flex-col gap-8 md:flex-row md:gap-4">
          {list.map((el, i) => (
            <Fragment key={i}>
              {i > 0 && <div className={cx('hidden w-px self-stretch md:block', c.tone.dark ? (c.theme === 'brand' ? 'bg-brand-600' : 'bg-gray-700') : 'bg-gray-200')} />}
              {el}
            </Fragment>
          ))}
        </div>
      </Container>
    </>
  );
}

function Minimal(c: Ctx) {
  return (
    <Container>
      <div className={cx('grid gap-8 md:grid-cols-2 md:gap-4 md:border-y md:py-16 lg:grid-cols-4', c.tone.border)}>
        {items(c, 'centered-text', 4)}
      </div>
    </Container>
  );
}

function SplitImage(c: Ctx) {
  const two = c.type === 'split-image-02';
  const img = <ImagePlaceholder src={c.imageSrc} className="h-[280px] w-full md:h-[560px] lg:flex-1" />;
  if (two) {
    return (
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        <div className="order-last lg:order-first lg:flex-1">{img}</div>
        <div className="flex flex-col gap-12 md:gap-16 lg:flex-1">
          <AreaHeading tone={c.tone} subheading={c.subheading} title={c.title} supportingText={c.supportingText} />
          <div className="grid gap-8 md:grid-cols-2 md:gap-y-12">{items(c, 'left-aligned-text', 4)}</div>
        </div>
      </Container>
    );
  }
  return (
    <>
      <Container><AreaHeading tone={c.tone} subheading={c.subheading} title={c.title} supportingText={c.supportingText} /></Container>
      <Container className={cx(GAP, 'flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16')}>
        <div className="grid gap-8 md:grid-cols-2 md:gap-y-16 lg:flex-1">{items(c, 'centered-with-supporting-text', 4)}</div>
        {img}
      </Container>
    </>
  );
}

const cardStyles: Record<string, { bg: string; theme: MarketingTheme; mHeading: string; mText: string }> = {
  'card-gray-light': { bg: 'bg-gray-50', theme: 'default', mHeading: 'text-gray-900', mText: 'text-gray-600' },
  'card-brand-light': { bg: 'bg-brand-50', theme: 'default', mHeading: 'text-brand-900', mText: 'text-brand-700' },
  'card-gray-dark': { bg: 'bg-gray-950', theme: 'gray-dark', mHeading: 'text-white', mText: 'text-gray-200' },
  'card-brand-dark': { bg: 'bg-brand-800', theme: 'brand', mHeading: 'text-white', mText: 'text-brand-200' },
};

function Card(c: Ctx) {
  const s = cardStyles[c.type];
  const outside = areaTone('default');
  return (
    <>
      <Container className="hidden md:block">
        <AreaHeading tone={outside} title={c.title} supportingText={c.supportingText} align="center" />
      </Container>
      <Container className="md:mt-16">
        <MarketingThemeProvider value={s.theme}>
          <div className={cx('flex flex-col gap-8 rounded-2xl px-6 py-10 md:p-16', s.bg)}>
            <div className="flex flex-col items-center gap-4 text-center md:hidden">
              <h2 className={cx('text-display-sm font-semibold', s.mHeading)}>{c.title}</h2>
              <p className={cx('text-lg', s.mText)}>{c.supportingText}</p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">{items(c, 'centered-text', 3, { className: 'flex-1' })}</div>
          </div>
        </MarketingThemeProvider>
      </Container>
    </>
  );
}

function ImageCards(c: Ctx) {
  const two = c.type === 'image-with-cards-02';
  const box = (
    <ImagePlaceholder src={c.imageSrc} tone="brand" className="flex flex-col gap-8 px-6 py-8 md:flex-row md:p-16">
      <MarketingThemeProvider value="default">
        {items(c, 'card-text-and-supporting-text', 3, {
          className: 'relative flex-1',
          cardClassName: two
            ? 'bg-white/80 ring-1 ring-inset ring-white/60 backdrop-blur-lg'
            : 'bg-white/30 ring-1 ring-inset ring-white/30 backdrop-blur-xl',
        })}
      </MarketingThemeProvider>
    </ImagePlaceholder>
  );
  if (two) {
    const brandTone = areaTone('brand');
    return (
      <>
        <div className="bg-brand-800 pb-28 pt-16 md:pb-40 md:pt-24">
          <Container className="flex flex-col items-center gap-8">
            <AreaHeading tone={brandTone} subheading={c.subheading} title={c.title} supportingText={c.supportingText} align="center" />
            <Actions c={c} />
          </Container>
        </div>
        <Container className="-mt-16 md:-mt-24">{box}</Container>
      </>
    );
  }
  return (
    <>
      <Container><AreaHeading tone={c.tone} subheading={c.subheading} badge="pill-outline" title={c.title} supportingText={c.supportingText} align="center" /></Container>
      <Container className={GAP}>{box}</Container>
    </>
  );
}

function WithActions(c: Ctx) {
  if (c.type === 'simple-with-actions-01') {
    return (
      <Container className="flex flex-col gap-12 md:gap-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <AreaHeading tone={c.tone} title={c.title} supportingText={c.supportingText} />
          <div className="hidden md:block"><Actions c={c} /></div>
        </div>
        <div className="flex flex-col gap-8 md:hidden">{items(c, 'centered-text', 4)}</div>
        <div className="hidden gap-8 md:grid md:grid-cols-2 lg:grid-cols-4">{items(c, 'left-aligned-with-supporting-text', 4)}</div>
        <div className="md:hidden"><Actions c={c} /></div>
      </Container>
    );
  }
  return (
    <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
      <div className="flex flex-col gap-8 lg:flex-1">
        <AreaHeading tone={c.tone} title={c.title} supportingText={c.supportingText} />
        <div className="hidden lg:block"><Actions c={c} /></div>
      </div>
      <div className="grid gap-10 md:grid-cols-2 md:gap-8 lg:flex-1">{items(c, 'small-featured-icon', 4)}</div>
      <div className="lg:hidden"><Actions c={c} /></div>
    </Container>
  );
}

function headDefaults(type: MetricsSectionType) {
  if (type.startsWith('card')) return { title: C.cardTitle, text: C.text };
  if (type === 'split-image-01') return { sub: C.subheading, title: C.title, text: C.splitText };
  if (type === 'split-image-02') return { sub: C.split02Subheading, title: C.split02Title };
  if (type.startsWith('image-with-cards')) return { sub: C.subheading, title: C.title, text: C.text };
  return { title: C.title, text: C.text };
}

/**
 * MetricsSection — Figma "Metrics section" (13 Types × Theme, Desktop + Mobile).
 * `<MetricsSection type="card-gray-light" />` renders the Figma placeholder content.
 */
export const MetricsSection = forwardRef<HTMLElement, MetricsSectionProps>(function MetricsSection(
  { type = 'simple-accent-line', theme, subheading, title, supportingText, metrics, icon = Zap, actions, imageSrc, className, ...props },
  ref,
) {
  const card = type.startsWith('card') || type.startsWith('image-with-cards') || type.startsWith('simple-with-actions');
  // card / image / actions types always sit on a white section (their theme lives in the card)
  const sectionTheme: MarketingTheme = card ? 'default' : norm(theme) === 'gray-light' || norm(theme) === 'brand-light' ? 'default' : norm(theme);
  const d = headDefaults(type);
  const c: Ctx = {
    type,
    theme: sectionTheme,
    tone: areaTone(sectionTheme),
    subheading: subheading ?? d.sub,
    title: title ?? d.title,
    supportingText: supportingText === undefined ? d.text : supportingText,
    metrics: metrics ?? defaultMetrics,
    icon,
    actions,
    imageSrc,
  };
  let body: ReactNode;
  if (type === 'simple-accent-line') body = SimpleAccent(c);
  else if (type === 'simple-centered-text') body = SimpleCentered(c);
  else if (type === 'minimal-centered-text') body = Minimal(c);
  else if (type.startsWith('split-image')) body = SplitImage(c);
  else if (type.startsWith('card')) body = Card(c);
  else if (type.startsWith('image-with-cards')) body = ImageCards(c);
  else body = WithActions(c);
  const flush = type === 'image-with-cards-02';
  return (
    <MarketingSection ref={ref} theme={sectionTheme} spacing={flush ? 'none' : 'md'} data-type={type} className={cx(flush && 'pb-16 md:pb-24', className)} {...props}>
      {body}
    </MarketingSection>
  );
});
