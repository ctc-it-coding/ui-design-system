import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { PlayCircle, Zap } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import type { BadgeType } from '../../components/badges/Badge';
import { Container, ImagePlaceholder, MarketingSection, type MarketingTheme } from '../_shared';
import { AreaHeading, areaTone, type AreaTone } from './tone';
import { FeatureCheckItem, FeatureTab, FeatureText, type FeatureTextType } from './FeatureText';
import { IntegrationLogo, type IntegrationLogoName } from './IntegrationLogo';
import {
  defaultAlternatingFeatures,
  defaultAlternatingFeatures02,
  defaultCardFeatures,
  defaultFeatures,
  defaultFeaturesAlt,
  defaultIntegrationFeatures,
  defaultIntegrationLogos01,
  defaultIntegrationLogos02,
  defaultTabs,
  featuresCopy as C,
  type FeatureItem,
} from './defaults';
import {
  BleedScreen, Blob, CardsFan, CardsPair, CardsStack, ChartCardVisual, CroppedPhone, ImageVisual, MacbookVisual,
  NotificationsPhone, Phone, Scene, Screen, VideoVisual,
} from './visuals';
import { LinePattern } from '../../components/backgrounds/LinePattern';


export type FeaturesSectionType =
  | 'alternating-layout-01' | 'alternating-layout-02' | 'alternating-layout-03' | 'alternating-layout-04'
  | 'simple-icons-01' | 'simple-icons-02' | 'simple-icons-03' | 'simple-icons-04'
  | 'icon-cards-01' | 'icon-cards-02'
  | 'integrations-icons-01' | 'integrations-icons-02' | 'integrations-icons-03' | 'integrations-icons-04'
  | 'icons-and-image-01' | 'icons-and-image-02' | 'icons-and-image-03' | 'icons-and-image-04'
  | 'icons-and-mockup-01' | 'icons-and-mockup-02' | 'icons-and-mockup-03' | 'icons-and-mockup-04'
  | 'icons-and-mockup-05' | 'icons-and-mockup-06' | 'icons-and-mockup-07' | 'icons-and-mockup-08'
  | 'center-mockup-01' | 'center-mockup-02'
  | 'tabs-mockup-01' | 'tabs-mockup-02' | 'tabs-mockup-03' | 'tabs-mockup-04' | 'tabs-mockup-05' | 'tabs-mockup-06'
  | 'tabs-mockup-07' | 'tabs-mockup-08' | 'tabs-mockup-09' | 'tabs-mockup-10' | 'tabs-mockup-11' | 'tabs-mockup-12'
  | 'large-screen-mockup-01' | 'large-screen-mockup-02';

export const featuresSectionTypes: FeaturesSectionType[] = [
  'alternating-layout-01', 'alternating-layout-02', 'alternating-layout-03', 'alternating-layout-04',
  'simple-icons-01', 'simple-icons-02', 'simple-icons-03', 'simple-icons-04', 'icon-cards-01', 'icon-cards-02',
  'integrations-icons-01', 'integrations-icons-02', 'integrations-icons-03', 'integrations-icons-04',
  'icons-and-image-01', 'icons-and-image-02', 'icons-and-image-03', 'icons-and-image-04',
  'icons-and-mockup-01', 'icons-and-mockup-02', 'icons-and-mockup-03', 'icons-and-mockup-04',
  'icons-and-mockup-05', 'icons-and-mockup-06', 'icons-and-mockup-07', 'icons-and-mockup-08',
  'center-mockup-01', 'center-mockup-02',
  'tabs-mockup-01', 'tabs-mockup-02', 'tabs-mockup-03', 'tabs-mockup-04', 'tabs-mockup-05', 'tabs-mockup-06',
  'tabs-mockup-07', 'tabs-mockup-08', 'tabs-mockup-09', 'tabs-mockup-10', 'tabs-mockup-11', 'tabs-mockup-12',
  'large-screen-mockup-01', 'large-screen-mockup-02',
];

/** Figma Theme (only Simple icons 01–04 have Gray dark / Brand; Large screen mockup 01–02 have Brand). */
export type FeaturesSectionTheme = Extract<MarketingTheme, 'default' | 'gray-dark' | 'brand'>;

export interface FeaturesSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: FeaturesSectionType;
  /** Figma: Theme */
  theme?: FeaturesSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Feature items (title, supportingText, icon, integration, bullets). Defaults to the Figma copy for the type. */
  features?: FeatureItem[];
  /** Logo cloud of Integrations icons 01/02. */
  integrations?: IntegrationLogoName[];
  /** Buttons (types with actions); defaults to the Figma "Demo" + primary button. */
  actions?: ReactNode;
  /** Screen content for device mockups (defaults to the mockups' placeholder UI). */
  screen?: ReactNode;
  /** Image URL for image / video types. */
  imageSrc?: string;
  /** Tabs mockup types: controlled / uncontrolled current tab. */
  tab?: number;
  defaultTab?: number;
  onTabChange?: (index: number) => void;
}

interface Ctx {
  type: FeaturesSectionType;
  tone: AreaTone;
  theme: FeaturesSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  features: FeatureItem[];
  integrations: IntegrationLogoName[];
  actions?: ReactNode;
  screen?: ReactNode;
  imageSrc?: string;
  tab: number;
  setTab: (i: number) => void;
}

/* ------------------------------------------------ helpers ------------------------------------------------ */

interface HeadSpec { sub?: ReactNode; badge?: BadgeType; title: ReactNode; text?: ReactNode; align?: 'left' | 'center' }

function headFor(type: FeaturesSectionType): HeadSpec | null {
  const T = type;
  if (T === 'simple-icons-01') return null;
  if (T.startsWith('alternating')) return { sub: C.subheading, title: C.analyticsTitle, text: C.supportingText, align: 'center' };
  if (T === 'simple-icons-02') return { sub: C.subheading, title: C.analyticsTitle, text: C.supportingText, align: 'center' };
  if (T === 'simple-icons-03' || T === 'icon-cards-01') return { sub: C.subheading, title: C.analyticsTitle, text: C.supportingText };
  if (T === 'simple-icons-04' || T === 'icon-cards-02') return { title: C.analyticsTitle, text: C.supportingTextShort };
  if (T === 'integrations-icons-01') return { sub: C.integrationsSubheading, badge: 'pill-color', title: C.integrationsTitle, text: C.integrationsText };
  if (T === 'integrations-icons-02') return { sub: C.integrationsSubheading, title: C.integrationsTitle, text: C.integrationsText200, align: 'center' };
  if (T === 'integrations-icons-03') return { sub: C.integrationsSubheading, badge: 'pill-color', title: C.integrationsTitle, text: C.integrationsText, align: 'center' };
  if (T === 'integrations-icons-04') return { sub: C.integrationsSubheading, title: C.integrationsTitle, text: C.integrationsText, align: 'center' };
  if (T === 'icons-and-image-03' || T === 'icons-and-image-04') return { sub: C.newFeatureSubheading, title: C.newFeatureTitle, text: C.supportingText };
  if (T === 'icons-and-mockup-04' || T === 'icons-and-mockup-05') return { sub: C.subheading, title: C.cuttingEdgeTitle, text: C.supportingText, align: 'center' };
  if (T === 'center-mockup-01') return { sub: C.subheading, badge: 'badge-modern', title: C.cuttingEdgeTitle, text: C.supportingText, align: 'center' };
  if (T === 'tabs-mockup-01') return { sub: C.subheading, badge: 'pill-outline', title: C.cuttingEdgeTitle, text: C.supportingText, align: 'center' };
  if (T === 'center-mockup-02' || T === 'tabs-mockup-02' || T === 'tabs-mockup-03' || T === 'tabs-mockup-04')
    return { sub: C.subheading, badge: 'pill-color', title: C.cuttingEdgeTitle, text: C.supportingText, align: 'center' };
  if (T.startsWith('large-screen')) return { sub: C.subheading, title: C.cuttingEdgeTitle, text: C.supportingText, align: 'center' };
  // icons-and-image 01/02, icons-and-mockup 01–03 / 06–08, tabs-mockup 05–12
  return { sub: C.subheading, title: C.usefulTitle, text: C.supportingText };
}

function featuresFor(type: FeaturesSectionType): FeatureItem[] {
  if (type === 'alternating-layout-02') return defaultAlternatingFeatures02;
  if (type.startsWith('alternating')) return defaultAlternatingFeatures;
  if (type === 'simple-icons-04') return defaultFeaturesAlt;
  if (type === 'icon-cards-02') return defaultCardFeatures;
  if (type === 'integrations-icons-03' || type === 'integrations-icons-04') return defaultIntegrationFeatures;
  if (type.startsWith('tabs-mockup')) return defaultTabs;
  return defaultFeatures;
}

/** Heading block from the (possibly overridden) ctx copy. */
function Head({ c, className, align, widthClass }: { c: Ctx; className?: string; align?: 'left' | 'center'; widthClass?: string }) {
  const spec = headFor(c.type);
  if (!spec) return null;
  return (
    <AreaHeading
      tone={c.tone}
      subheading={c.subheading}
      badge={spec.badge}
      title={c.title}
      supportingText={c.supportingText}
      align={align ?? spec.align}
      widthClass={widthClass}
      className={className}
    />
  );
}

const Items = ({ items, type, action = false, className, itemClassName }: {
  items: FeatureItem[]; type: FeatureTextType; action?: boolean; className?: string; itemClassName?: string;
}) => (
  <div className={className}>
    {items.map((f, i) => (
      <FeatureText
        key={i}
        type={type}
        title={f.title}
        supportingText={f.supportingText}
        icon={f.icon}
        integration={f.integration}
        actionHref={f.href}
        action={action ? undefined : false}
        className={itemClassName}
      />
    ))}
  </div>
);

const DefaultActions = ({ primary = 'Learn more', tone, stacked }: { primary?: ReactNode; tone: AreaTone; stacked?: boolean }) => (
  <div className={cx('flex gap-3', stacked && 'flex-col-reverse sm:flex-row')}>
    <Button size="xl" hierarchy="secondary-gray" iconLeading={PlayCircle} className={cx(stacked && 'w-full sm:w-auto', tone.dark && 'border-white/20')}>Demo</Button>
    <Button size="xl" hierarchy="primary" className={cx(stacked && 'w-full sm:w-auto')}>{primary}</Button>
  </div>
);

/** Section vertical gap between heading and content: 48 mobile / 64 desktop. */
const GAP = 'mt-12 md:mt-16';

/* ------------------------------------------------ grid types ------------------------------------------------ */

function SimpleIcons(c: Ctx) {
  const t = c.type;
  if (t === 'simple-icons-04' || t === 'icon-cards-02') {
    const cards = t === 'icon-cards-02';
    return (
      <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-col lg:w-[360px] lg:shrink-0">
          <FeaturedIcon icon={Zap} size="xl" color={c.tone.featuredColor} theme={c.tone.featuredTheme} className="mb-6 hidden md:inline-flex" />
          <FeaturedIcon icon={Zap} size="lg" color={c.tone.featuredColor} theme={c.tone.featuredTheme} className="mb-6 md:hidden" />
          <AreaHeading tone={c.tone} title={c.title} supportingText={c.supportingText} />
        </div>
        {cards ? (
          <Items items={c.features} type="featured-icon-card" action className="grid flex-1 gap-6 md:grid-cols-2 md:gap-8" />
        ) : (
          <>
            <Items items={c.features} type="text-centered" className="flex flex-col gap-10 md:hidden" />
            <Items items={c.features} type="text-left" className="hidden flex-1 gap-x-16 gap-y-8 md:grid md:grid-cols-2" />
          </>
        )}
      </Container>
    );
  }
  const map: Partial<Record<FeaturesSectionType, [FeatureTextType, boolean, number]>> = {
    'simple-icons-01': ['featured-icon-top-centered', false, 3],
    'simple-icons-02': ['featured-icon-top-centered', false, 6],
    'simple-icons-03': ['featured-icon-top-left', true, 6],
    'icon-cards-01': ['featured-icon-card', true, 4],
    'integrations-icons-03': ['integration-icon-top-centered', true, 6],
    'integrations-icons-04': ['integration-icon-box', false, 6],
  };
  const [itemType, action, n] = map[t] ?? ['featured-icon-top-centered', false, 6];
  const cards = t === 'icon-cards-01';
  const boxes = t === 'integrations-icons-04';
  return (
    <>
      {headFor(t) && <Container><Head c={c} /></Container>}
      <Container className={headFor(t) ? GAP : undefined}>
        <Items
          items={c.features.slice(0, n)}
          type={itemType}
          action={action}
          className={cx(
            'grid',
            cards ? 'gap-6 md:grid-cols-2 lg:grid-cols-4'
              : boxes ? 'gap-x-8 gap-y-6 md:grid-cols-2 md:gap-y-10 lg:grid-cols-3'
                : 'gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-16 lg:grid-cols-3',
          )}
        />
      </Container>
    </>
  );
}

function IntegrationsCloud(c: Ctx) {
  if (c.type === 'integrations-icons-01') {
    return (
      <Container className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-24">
        <div className="flex flex-1 flex-col gap-8">
          <Head c={c} />
          {c.actions ?? <DefaultActions primary="All integrations" tone={c.tone} stacked />}
        </div>
        <div className="flex flex-1 flex-wrap content-center justify-center gap-4 md:gap-8 lg:p-8">
          {c.integrations.map((n) => (
            <span key={n}>
              <IntegrationLogo name={n} size={64} className="md:hidden" />
              <IntegrationLogo name={n} size={96} className="hidden md:block" />
            </span>
          ))}
        </div>
      </Container>
    );
  }
  return (
    <>
      <Container><Head c={c} /></Container>
      <Container className={cx(GAP, 'flex flex-col items-center gap-12 md:gap-16')}>
        <div className="flex max-w-[1024px] flex-wrap justify-center gap-4 md:gap-8">
          {c.integrations.map((n, i) => (
            <span key={n} className={cx(i >= 16 && 'hidden md:block')}>
              <IntegrationLogo name={n} size={64} className="md:hidden" />
              <IntegrationLogo name={n} size={80} className="hidden md:block" />
            </span>
          ))}
        </div>
        {c.actions ?? <Button size="xl" hierarchy="primary">All integrations</Button>}
      </Container>
    </>
  );
}

/* ------------------------------------------------ two-column (icons + visual) ------------------------------------------------ */

function visualFor(c: Ctx): ReactNode {
  const s = c.screen;
  switch (c.type) {
    case 'icons-and-image-01': return <MacbookVisual panel screen={s} />;
    case 'icons-and-image-02': return <ImageVisual src={c.imageSrc} />;
    case 'icons-and-mockup-01':
    case 'tabs-mockup-06':
      return <CroppedPhone screen={s} desktopH={512} desktop={[
        { d: { x: 64, y: 0, w: 1024 }, node: <Screen size="xl" screen={s} /> },
        { d: { x: 0, y: 64, w: 314 }, node: <Phone screen={s} /> },
      ]} />;
    case 'icons-and-mockup-02':
      return <CroppedPhone mobileH={416} desktopH={640} screen={s} desktop={[
        { d: { x: -10, y: 80, w: 532 }, node: <Blob /> },
        { d: { x: 99, y: 0, w: 314 }, node: <Phone screen={s} /> },
      ]} />;
    case 'icons-and-mockup-03':
    case 'tabs-mockup-09':
      return (
        <div className="lg:h-[560px] lg:overflow-hidden">
          <CroppedPhone mobileH={c.type === 'tabs-mockup-09' ? 416 : 360} desktopH={560} blob={c.type === 'icons-and-mockup-03'} screen={s} desktop={[
            { d: { x: 0, y: 64, w: 314 }, node: <Phone screen={s} /> },
            { d: { x: 262, y: 0, w: 314 }, node: <Phone screen={s} /> },
          ]} />
        </div>
      );
    case 'icons-and-mockup-06':
    case 'tabs-mockup-10':
      return <CardsPair />;
    case 'icons-and-mockup-07':
    case 'tabs-mockup-11':
      return <CardsStack />;
    case 'icons-and-mockup-08':
    case 'tabs-mockup-12':
      return <CardsFan />;
    case 'tabs-mockup-05':
      return (
        <>
          <div className="-mx-4 bg-gray-100 px-4 py-6 md:-mx-8 md:px-8 lg:hidden"><Screen size="xs" screen={s} className="mx-auto" /></div>
          <div className="relative hidden h-[528px] bg-gray-100 lg:block">
            <div className="absolute left-12 top-[51px] w-[640px]"><Screen size="md" screen={s} /></div>
          </div>
        </>
      );
    case 'tabs-mockup-07': return <MacbookVisual screen={s} />;
    case 'tabs-mockup-08': return <BleedScreen size="xl" desktopH={512} screen={s} />;
    default: return null;
  }
}

function IconsAndVisual(c: Ctx) {
  const t = c.type;
  const grid = t === 'icons-and-image-01' || t === 'icons-and-mockup-01';
  const tabs = t.startsWith('tabs-mockup');
  const left = tabs ? (
    <TabList c={c} orientation="horizontal" />
  ) : grid ? (
    <Items items={c.features.slice(0, 4)} type="featured-icon-top-left" className="grid gap-x-8 gap-y-10 md:grid-cols-2 md:gap-y-12" />
  ) : (
    <Items items={c.features.slice(0, 3)} type="featured-icon-left" action className="flex flex-col gap-10 md:gap-12" />
  );
  const visual = visualFor(c);
  return (
    <>
      <Container><Head c={c} /></Container>
      <Container className={cx(GAP, 'grid gap-12 md:gap-16 lg:grid-cols-2 lg:items-center')}>
        <div className="min-w-0">{left}</div>
        <div className="min-w-0">{visual}</div>
      </Container>
    </>
  );
}

/** Icons and mockup 04 / 05: features | visual | features. */
function IconsAroundVisual(c: Ctx) {
  const chart = c.type === 'icons-and-mockup-05';
  const [a, b] = [c.features.slice(0, 2), c.features.slice(2, 4)];
  const col = 'flex flex-col gap-10 md:gap-12 lg:flex-1';
  const visual = chart ? (
    <ChartCardVisual />
  ) : (
    <CroppedPhone blob desktopH={640} screen={c.screen} desktop={[
      { d: { x: -26, y: 80, w: 532 }, node: <Blob /> },
      { d: { x: 83, y: 0, w: 314 }, node: <Phone screen={c.screen} /> },
    ]} />
  );
  return (
    <>
      <Container><Head c={c} /></Container>
      <Container className={cx(GAP, 'flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-center', chart ? 'lg:gap-16' : 'lg:gap-24')}>
        <Items items={a} type="featured-icon-top-left" className={col} />
        <Items items={b} type="featured-icon-top-left" className={cx(col, 'lg:hidden')} />
        <div className={cx('min-w-0 lg:shrink-0', chart ? 'lg:w-[480px]' : 'lg:w-[480px]')}>{visual}</div>
        <Items items={b} type="featured-icon-top-left" className={cx(col, 'hidden lg:flex')} />
      </Container>
    </>
  );
}

/** Icons and image 03 / 04: gray band with heading + features, image / video overlapping below. */
function SplitBand(c: Ctx) {
  const video = c.type === 'icons-and-image-03';
  return (
    <>
      <div className="bg-gray-50 pb-28 pt-16 md:pb-40 md:pt-24">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          <Head c={c} />
          <div className="flex flex-col gap-10 md:gap-12">
            {c.features.slice(0, 2).map((f, i) => (
              <FeatureText key={i} type="featured-icon-left" title={f.title} supportingText={f.supportingText} icon={f.icon} featuredIconTheme="modern" featuredIconColor="gray" action={false} />
            ))}
          </div>
        </Container>
      </div>
      <Container className="-mt-16 md:-mt-24">
        {video ? <VideoVisual src={c.imageSrc} /> : <ImageVisual src={c.imageSrc} mobileH={240} desktopH={516} />}
      </Container>
    </>
  );
}

/* ------------------------------------------------ centered mockups / tabs ------------------------------------------------ */

function TabList({ c, orientation }: { c: Ctx; orientation: 'vertical' | 'horizontal' }) {
  const vertical = orientation === 'vertical';
  return (
    <div role="tablist" aria-orientation={vertical ? 'horizontal' : 'vertical'} className={cx('flex flex-col', vertical && 'gap-10 lg:flex-row lg:gap-0')}>
      {c.features.slice(0, 3).map((f, i) => (
        <FeatureTab
          key={i}
          orientation={orientation}
          current={c.tab === i}
          title={f.title}
          supportingText={f.supportingText}
          actionLabel={vertical ? false : 'Learn more'}
          actionHref={f.href}
          className={vertical ? 'flex-1' : undefined}
          onClick={() => c.setTab(i)}
        />
      ))}
    </div>
  );
}

function CenterMockup(c: Ctx) {
  const t = c.type;
  const s = c.screen;
  let visual: ReactNode;
  if (t === 'center-mockup-01' || t === 'tabs-mockup-01') {
    visual = (
      <>
        <Screen size="xs" screen={s} className="mx-auto lg:hidden" />
        <Screen size="lg" screen={s} className="mx-auto hidden lg:block" />
      </>
    );
  } else if (t === 'center-mockup-02') {
    visual = (
      <>
        <div className="lg:hidden"><CroppedPhone blob screen={s} desktop={[]} /></div>
        <div className="relative mx-auto hidden h-[558px] w-[1216px] max-w-full lg:block">
          <div className="absolute left-[272px] top-0 w-[768px]"><Screen size="lg" screen={s} /></div>
          <div className="absolute left-[152px] top-16 w-[244px]"><Phone screen={s} /></div>
        </div>
      </>
    );
  } else if (t === 'tabs-mockup-02' || t === 'tabs-mockup-03') {
    const two = t === 'tabs-mockup-02';
    visual = (
      <>
        <div className="lg:hidden"><CroppedPhone mobileH={two ? 416 : 360} screen={s} desktop={[]} /></div>
        <div className="relative mx-auto hidden h-[512px] w-[1216px] max-w-full overflow-hidden lg:block">
          {two ? (
            <>
              <div className="absolute left-[320px] top-16 w-[314px]"><Phone screen={s} /></div>
              <div className="absolute left-[582px] top-0 w-[314px]"><Phone screen={s} /></div>
            </>
          ) : (
            <div className="absolute left-[451px] top-0 w-[314px]"><Phone screen={s} /></div>
          )}
        </div>
      </>
    );
  } else {
    visual = <NotificationsPhone screen={s} />;
  }
  const tabs = t.startsWith('tabs');
  return (
    <>
      <Container><Head c={c} /></Container>
      <Container className={cx(GAP, 'flex flex-col', tabs ? 'gap-12 lg:gap-20' : 'gap-12 md:gap-24')}>
        <div className="min-w-0">{visual}</div>
        {tabs ? (
          <TabList c={c} orientation="vertical" />
        ) : (
          <Items items={c.features.slice(0, 3)} type="featured-icon-top-centered" action className="grid gap-10 md:grid-cols-3 md:gap-8" />
        )}
      </Container>
    </>
  );
}

function LargeScreen(c: Ctx) {
  const brand = c.theme === 'brand';
  const ring = brand ? 'ring-0' : undefined;
  const screen = (
    <>
      <Screen size="xs" screen={c.screen} className={cx('mx-auto lg:hidden', ring)} />
      <div className="-mx-2 -mt-2 hidden h-[568px] overflow-hidden px-2 pt-2 lg:block">
        <Screen size="2xl" screen={c.screen} className={ring} />
      </div>
    </>
  );
  if (c.type === 'large-screen-mockup-02') {
    return (
      <>
        <div className={cx('pb-28 pt-16 md:pb-40 md:pt-24', brand ? 'bg-brand-800' : 'bg-gray-50')}>
          <Container><Head c={c} /></Container>
        </div>
        <Container className="-mt-16 md:-mt-24">{screen}</Container>
      </>
    );
  }
  return (
    <>
      <Container><Head c={c} /></Container>
      <Container className={GAP}>{screen}</Container>
    </>
  );
}

/* ------------------------------------------------ alternating layouts ------------------------------------------------ */

function AltText({ f, c, check = 'line', actions }: { f: FeatureItem; c: Ctx; check?: 'line' | 'default'; actions?: boolean }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        <FeaturedIcon icon={f.icon ?? Zap} size="lg" color={c.tone.featuredColor} theme={c.tone.featuredTheme} />
        <div className="flex flex-col gap-2 md:gap-4">
          <h3 className={cx('text-display-xs font-semibold md:text-display-sm', c.tone.heading)}>{f.title}</h3>
          <p className={cx('text-md md:text-lg', c.tone.text)}>{f.supportingText}</p>
        </div>
      </div>
      {f.bullets && f.bullets.length > 0 && (
        <ul className="flex flex-col gap-4 pl-2 md:gap-5 md:pl-4">
          {f.bullets.map((b) => <FeatureCheckItem key={b} checkType={check}>{b}</FeatureCheckItem>)}
        </ul>
      )}
      {actions && (c.actions ?? <DefaultActions tone={c.tone} stacked />)}
    </div>
  );
}

function Alternating(c: Ctx) {
  const t = c.type;
  const s = c.screen;
  if (t === 'alternating-layout-04') {
    return (
      <>
        <Container><Head c={c} /></Container>
        <div className={cx(GAP, 'flex flex-col gap-16 md:gap-24 lg:gap-0')}>
          {c.features.map((f, i) => {
            const imgLeft = i % 2 === 1;
            return (
              <div key={i} className="flex flex-col gap-10 lg:flex-row lg:gap-0">
                <div className={cx('flex flex-1 items-center px-4 md:px-8 lg:px-16 lg:py-24', imgLeft ? 'lg:order-2' : 'lg:justify-end')}>
                  <div className="w-full lg:max-w-[496px]"><AltText f={f} c={c} check="default" /></div>
                </div>
                <div className="flex-1 px-4 md:px-8 lg:px-0">
                  <ImagePlaceholder src={c.imageSrc} className="h-60 w-full lg:h-full lg:min-h-[560px]" />
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }
  return (
    <>
      <Container><Head c={c} /></Container>
      <div className={cx(GAP, 'flex flex-col gap-16 md:gap-24')}>
        {c.features.map((f, i) => {
          const visualLeft = i % 2 === 1;
          let visual: ReactNode;
          if (t === 'alternating-layout-01') {
            visual = <BleedScreen size="lg" desktopH={512} align={visualLeft ? 'right' : 'left'} screen={s} />;
          } else if (t === 'alternating-layout-02') {
            visual = (
              <>
                <div className="-mx-4 bg-gray-100 px-4 py-6 md:-mx-8 md:px-8 lg:hidden"><Screen size="xs" screen={s} className="mx-auto" /></div>
                <div className="relative hidden h-[400px] overflow-hidden bg-gray-100 lg:block">
                  <div className="absolute w-[298px] opacity-20" style={{ left: visualLeft ? -96 : 358, top: i === 2 ? -96 : 88 }}><LinePattern width={298} className="text-gray-900" /></div>
                  <div className="absolute left-10 top-10 w-[480px]"><Screen size="sm" screen={s} /></div>
                </div>
              </>
            );
          } else {
            // alternating-layout-03: gray panels with screen / phones
            const panels = [
              [{ x: 48, y: 48, w: 768, kind: 'screen' as const }],
              [{ x: 208, y: 112, w: 314, kind: 'phone' as const }, { x: 406, y: 48, w: 314, kind: 'phone' as const }],
              [{ x: 200, y: 48, w: 768, kind: 'screen' as const }, { x: 48, y: 112, w: 314, kind: 'phone' as const }],
            ][i % 3];
            visual = (
              <>
                <div className="lg:hidden">
                  {i % 3 === 0 ? (
                    <div className="-mx-4 bg-gray-100 px-4 py-6 md:-mx-8 md:px-8"><Screen size="xs" screen={s} className="mx-auto" /></div>
                  ) : (
                    <Scene mobileH={360} desktopH={0} bandClassName="-mx-4 bg-gray-100 md:-mx-8" className="overflow-hidden" items={[{ m: { x: 46, y: 24, w: 284 }, node: <Phone screen={s} /> }]} />
                  )}
                </div>
                <div className="relative hidden h-[512px] lg:block">
                  <div className={cx('absolute top-0 h-[512px] w-[768px] overflow-hidden bg-gray-100', visualLeft ? 'right-0' : 'left-0')}>
                    {panels.map((p, k) => (
                      <div key={k} className="absolute" style={{ left: p.x, top: p.y, width: p.w }}>
                        {p.kind === 'screen' ? <Screen size="lg" screen={s} /> : <Phone screen={s} />}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            );
          }
          return (
            <Container key={i} className="grid gap-10 md:gap-12 lg:grid-cols-2 lg:items-center lg:gap-24">
              <div className={cx('min-w-0', visualLeft && 'lg:order-2')}>
                <AltText f={f} c={c} actions={t === 'alternating-layout-02'} />
              </div>
              <div className="min-w-0">{visual}</div>
            </Container>
          );
        })}
      </div>
    </>
  );
}

/* ------------------------------------------------ component ------------------------------------------------ */

/**
 * FeaturesSection — Figma "Features section" (all 42 Types × Theme, Desktop + Mobile).
 * Every text is a prop defaulting to the Figma placeholder copy, so `<FeaturesSection type="tabs-mockup-06" />` renders like Figma.
 */
export const FeaturesSection = forwardRef<HTMLElement, FeaturesSectionProps>(function FeaturesSection(
  {
    type = 'simple-icons-01',
    theme = 'default',
    subheading,
    title,
    supportingText,
    features,
    integrations,
    actions,
    screen,
    imageSrc,
    tab,
    defaultTab = 0,
    onTabChange,
    className,
    ...props
  },
  ref,
) {
  const [innerTab, setInnerTab] = useState(defaultTab);
  const spec = headFor(type);
  const tone = areaTone(theme);
  const c: Ctx = {
    type,
    theme,
    tone,
    subheading: subheading ?? spec?.sub,
    title: title ?? spec?.title,
    supportingText: supportingText ?? spec?.text,
    features: features ?? featuresFor(type),
    integrations: integrations ?? (type === 'integrations-icons-02' ? defaultIntegrationLogos02 : defaultIntegrationLogos01),
    actions,
    screen,
    imageSrc,
    tab: tab ?? innerTab,
    setTab: (i) => {
      if (tab === undefined) setInnerTab(i);
      onTabChange?.(i);
    },
  };

  let body: ReactNode;
  let spacing: 'md' | 'none' = 'md';
  let sectionTheme: MarketingTheme = theme;
  if (type.startsWith('alternating')) body = Alternating(c);
  else if (type === 'integrations-icons-01' || type === 'integrations-icons-02') body = IntegrationsCloud(c);
  else if (type.startsWith('simple-icons') || type.startsWith('icon-cards') || type.startsWith('integrations')) body = SimpleIcons(c);
  else if (type === 'icons-and-image-03' || type === 'icons-and-image-04') {
    body = SplitBand(c);
    spacing = 'none';
  } else if (type === 'icons-and-mockup-04' || type === 'icons-and-mockup-05') body = IconsAroundVisual(c);
  else if (type.startsWith('center-mockup') || ['tabs-mockup-01', 'tabs-mockup-02', 'tabs-mockup-03', 'tabs-mockup-04'].includes(type)) body = CenterMockup(c);
  else if (type.startsWith('large-screen')) {
    body = LargeScreen(c);
    if (type === 'large-screen-mockup-02') {
      spacing = 'none';
      sectionTheme = 'default';
    }
  } else body = IconsAndVisual(c);

  return (
    <MarketingSection
      ref={ref}
      theme={sectionTheme}
      spacing={spacing}
      data-type={type}
      className={cx(spacing === 'none' && 'pb-16 md:pb-24', className)}
      {...props}
    >
      {body}
    </MarketingSection>
  );
});
