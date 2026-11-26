import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MarketingSection, ImagePlaceholder, type MarketingTheme } from '../_shared';
import { ScreenMockup, IPhoneMockup, MacbookMockup } from '../../components/mockups';
import {
  heroTone,
  HeroBadge,
  HeroButtons,
  EmailCapture,
  CountryDropdown,
  UserReviews,
  TrustedLogos,
  HeroCheckItems,
  AppStoreBadges,
  HeroPattern,
  type HeroTone,
  type HeroBadgeTheme,
  type HeroPatternType,
} from './_parts';
import {
  Stage,
  Place,
  CardSet,
  LightAccent,
  LinePattern,
  HeroPlayButton,
  HeroVideoPlayer,
  HandDrawnArrow,
  HandDrawnSquiggle,
  NotificationQueue,
  FileQueue,
  SignupForm,
  ChartsMockup,
  GeometricGrid01,
  GeometricGrid02,
  BauhausGrid,
  AbstractAngles,
  HeroCreditCard,
} from './_media';
import { heroDefaults, heroLogos, heroReviewAvatars, type HeroBadgeContent, type HeroHeaderType } from './defaults';

/** Figma "Hero header section" → Theme (only Type=Simple text has themes; "Primary dark" = `brand`). */
export type HeroHeaderTheme = 'default' | 'gray-light' | 'gray-dark' | 'brand';

export interface HeroHeaderSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: HeroHeaderType;
  /** Figma: Theme — only used by `simple-text` (Default / Gray light / Gray dark / Primary dark → `brand`). */
  theme?: HeroHeaderTheme;
  /** Header navigation rendered at the top of the hero (Figma includes "Dropdown header navigation"). Nothing by default. */
  nav?: ReactNode;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Badge group above the heading; `null` hides it. */
  badge?: HeroBadgeContent | null;
  /** Primary button / email submit label. */
  primaryLabel?: ReactNode;
  /** Secondary button label. */
  secondaryLabel?: ReactNode;
  /** Replaces the whole default actions block (buttons / email capture / store badges). */
  actions?: ReactNode;
  /** Email capture placeholder. */
  emailPlaceholder?: string;
  /** Email capture hint (default: privacy-policy note). */
  emailHint?: ReactNode;
  onEmailSubmit?: (email: string) => void;
  /** Check list (Card mockup 09, Split form 02). */
  checkItems?: ReactNode[];
  /** Company names for the "Trusted by" logo row (Screen mockup 02/04). */
  logos?: string[];
  logosLabel?: ReactNode;
  /** Word of the title to underline (Simple text). */
  highlight?: string;
  /** Photo URL for image types (Split image, Simple text, Geometric 02 …). */
  imageSrc?: string;
  /** Content rendered inside device mockups (screen / phone). Defaults to the placeholder app screen. */
  screen?: ReactNode;
  /** Content of the phone in iPhone types (defaults to `screen`). */
  phoneScreen?: ReactNode;
  /** Replaces the default visual entirely. */
  media?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Per-type configuration                                              */
/* ------------------------------------------------------------------ */

type Layout = 'centered' | 'split' | 'half' | 'card-split' | 'card-centered' | 'abstract' | 'wide';
type Action = 'buttons' | 'email' | 'store' | 'phone' | 'none';

interface Cfg {
  layout: Layout;
  bg: string;
  tone?: HeroTone;
  pattern?: [HeroPatternType, 'sm' | 'md', boolean?];
  /** desktop top padding of the section (px): 96 | 64 | 32 */
  pt?: 96 | 64 | 32;
  badge?: ['brand' | 'success', HeroBadgeTheme];
  action: Action;
  extra?: 'logos' | 'reviews' | 'checks';
  medium?: boolean;
  /** extra title classes (size / width overrides) */
  titleCls?: string;
  /** split layout: media column classes (desktop width/height) and gap */
  gap?: 32 | 64;
  /** max-width of supporting text */
  textMax?: string;
  media?: (p: MediaProps) => ReactNode;
}

interface MediaProps {
  screen?: ReactNode;
  phone?: ReactNode;
  imageSrc?: string;
}

/* Device helpers -------------------------------------------------- */
const noMax = '!max-w-none';
const Screen = ({ p, size, className }: { p: MediaProps; size: 'lg' | 'xl' | '2xl'; className?: string }) => (
  <ScreenMockup size={size} className={cx(noMax, className)}>
    {p.screen}
  </ScreenMockup>
);
const Phone = ({ p, className }: { p: MediaProps; className?: string }) => <IPhoneMockup className={cx(noMax, className)}>{p.phone ?? p.screen}</IPhoneMockup>;
const Mac = ({ p, className }: { p: MediaProps; className?: string }) => <MacbookMockup className={cx(noMax, className)}>{p.screen}</MacbookMockup>;

/* Media column wrapper for split layouts: full width on mobile, fixed width on desktop. */
const Col = ({ w, className, children }: { w: number; className?: string; children: ReactNode }) => (
  <div className={cx('relative w-full shrink-0 lg:w-auto', className)} style={{ ['--w' as string]: `${w}px` }}>
    <div className="lg:w-(--w)">{children}</div>
  </div>
);

const names = ['Olivia Rhye', 'Phoenix Baker', 'Lana Steiner', 'Demi Wilkinson', 'Candice Wu', 'Natali Craig', 'Drew Cano', 'Orlando Diggs', 'Andi Lane'];

const cardsTwo = (s: [number, number], a: Parameters<typeof CardSet>[0]['cards']) => <CardSet s={s} w={496} cards={a} names={names} />;

const cfg: Record<HeroHeaderType, Cfg> = {
  /* ------------------------------ Screen mockups ------------------------------ */
  'screen-mockup-01': {
    layout: 'centered', bg: 'bg-gray-50', pattern: ['grid', 'md'], action: 'buttons',
    media: (p) => (
      <div className="mx-auto w-full max-w-[768px]">
        <Mac p={p} />
      </div>
    ),
  },
  'screen-mockup-02': {
    layout: 'split', bg: 'bg-gray-50', pattern: ['grid-dot', 'sm'], action: 'buttons', extra: 'logos', pt: 96,
    media: (p) => (
      <Col w={576}>
        <div className="lg:h-[598px]">
          <Mac p={p} className="lg:w-[1024px]" />
        </div>
      </Col>
    ),
  },
  'screen-mockup-03': {
    layout: 'centered', bg: 'bg-gray-50', pattern: ['grid', 'sm'], action: 'buttons',
    media: (p) => (
      <div className="mx-auto w-full max-w-[768px]">
        <Screen p={p} size="lg" />
      </div>
    ),
  },
  'screen-mockup-04': {
    layout: 'split', bg: 'bg-gray-50', pattern: ['grid-dot', 'sm'], action: 'buttons', extra: 'logos', pt: 96,
    media: (p) => (
      <Col w={576}>
        <div className="pt-1 lg:h-[512px] lg:pt-0">
          <Screen p={p} size="lg" className="lg:w-[768px]" />
        </div>
      </Col>
    ),
  },
  'screen-mockup-05': {
    layout: 'centered', bg: 'bg-white', pattern: ['grid-check', 'md'], badge: ['brand', 'modern'], action: 'buttons',
    media: (p) => (
      <div className="w-full overflow-hidden lg:h-[480px]">
        <Mac p={p} className="mx-auto max-w-[1216px]" />
      </div>
    ),
  },
  'screen-mockup-06': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['brand', 'light'], action: 'buttons', pt: 64,
    media: (p) => (
      <Col w={576}>
        <div className="lg:h-[708px]">
          <Mac p={p} className="lg:w-[1216px]" />
        </div>
      </Col>
    ),
  },
  'screen-mockup-07': {
    layout: 'centered', bg: 'bg-white', pattern: ['grid', 'sm'], badge: ['success', 'modern'], action: 'buttons',
    media: (p) => (
      <div className="w-full overflow-hidden px-2 pt-2 lg:h-[568px]">
        <Screen p={p} size="2xl" />
      </div>
    ),
  },
  'screen-mockup-08': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['brand', 'outline'], action: 'buttons', pt: 64, gap: 32,
    media: (p) => (
      <Col w={592}>
        <div className="p-1.5 lg:h-[512px] lg:p-0">
          <Screen p={p} size="xl" className="lg:w-[1024px]" />
        </div>
      </Col>
    ),
  },
  /* ------------------------------ iPhone mockups ------------------------------ */
  'iphone-mockup-01': {
    layout: 'split', bg: 'bg-white', pattern: ['grid', 'md'], badge: ['brand', 'outline'], action: 'store', pt: 96,
    media: (p) => {
      const s: [number, number] = [512, 640];
      return (
        <Col w={512} className="mx-auto max-w-[400px] lg:max-w-none">
          <Stage w={s[0]} h={s[1]}>
            <Place s={s} x={-10} y={80} w={532} h={480}>
              <svg viewBox="0 0 532 480" className="size-full text-gray-50" fill="currentColor" aria-hidden>
                <path d="M266 0c118 0 236 52 260 168 24 120-60 250-170 296S120 480 56 400-30 220 40 120C90 46 170 0 266 0Z" />
              </svg>
            </Place>
            <Place s={s} x={99} y={0} w={314}>
              <Phone p={p} />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  'iphone-mockup-02': {
    layout: 'split', bg: 'bg-gray-50', pattern: ['grid-dot', 'sm'], action: 'store', pt: 96,
    media: (p) => {
      const s: [number, number] = [576, 568];
      return (
        <Col w={576}>
          <Stage w={s[0]} h={s[1]}>
            <Place s={s} x={96} y={0} w={768}>
              <Screen p={p} size="lg" />
            </Place>
            <Place s={s} x={0} y={72} w={244}>
              <Phone p={p} />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  'iphone-mockup-03': {
    layout: 'split', bg: 'bg-white', pattern: ['grid', 'sm'], action: 'phone', pt: 64, gap: 32,
    media: (p) => {
      const s: [number, number] = [592, 512];
      return (
        <Col w={592}>
          <Stage w={s[0]} h={s[1]}>
            <Place s={s} x={64} y={0} w={1024}>
              <Screen p={p} size="xl" />
            </Place>
            <Place s={s} x={0} y={64} w={314}>
              <Phone p={p} />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  'iphone-mockup-04': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], action: 'buttons', extra: 'reviews', pt: 64, gap: 32, textMax: 'max-w-[480px]',
    media: (p) => {
      const s: [number, number] = [560, 640];
      return (
        <Col w={560}>
          <Stage w={s[0]} h={s[1]} className="rounded-t-[50%] rounded-b-2xl bg-gray-100 lg:rounded-t-[320px] lg:rounded-b-3xl">
            <Place s={s} x={122} y={80} w={316} h={560} className="overflow-hidden">
              <Phone p={p} className="ml-[0.3%] w-[99.4%]" />
            </Place>
            <Place s={s} x={-96} y={328} w={320} className="max-lg:hidden">
              <NotificationQueue />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  /* ------------------------------ Color cards ------------------------------ */
  'color-card-01': {
    layout: 'card-centered', bg: 'bg-white', tone: 'brand-dark', action: 'email', pt: 32,
    media: () => {
      const s: [number, number] = [1216, 396];
      return (
        <Stage w={s[0]} h={s[1]} className="relative z-10">
          <ChartsMockup s={s} chart={[208, -96]} gauge={[832, 124]} />
        </Stage>
      );
    },
  },
  'color-card-02': {
    layout: 'card-split', bg: 'bg-gray-25', tone: 'brand-dark', action: 'email', pt: 32,
    media: () => {
      const s: [number, number] = [560, 640];
      return (
        <Stage w={s[0]} h={s[1]} className="max-lg:hidden lg:w-[560px]">
          <ChartsMockup s={s} chart={[64, 66]} gauge={[8, 294]} />
        </Stage>
      );
    },
  },
  'color-card-03': {
    layout: 'card-centered', bg: 'bg-gray-50', tone: 'brand-dark', action: 'email', pt: 32,
    media: (p) => (
      <div className="relative z-10 mx-auto -mt-16 w-full max-w-[768px] px-2 md:-mt-24">
        <Screen p={p} size="lg" className="ring-8 ring-white/50" />
      </div>
    ),
  },
  'color-card-04': {
    layout: 'card-split', bg: 'bg-gray-25', tone: 'brand-dark', action: 'email', pt: 32,
    media: (p) => (
      <div className="relative w-full lg:h-[640px] lg:w-[592px] lg:shrink-0">
        <div className="lg:absolute lg:top-16 lg:left-0 lg:w-[768px]">
          <Screen p={p} size="lg" className="ring-8 ring-white/50" />
        </div>
      </div>
    ),
  },
  /* ------------------------------ Card mockups ------------------------------ */
  'card-mockup-01': {
    layout: 'centered', bg: 'bg-white', pattern: ['grid', 'md'], badge: ['brand', 'modern'], action: 'buttons',
    media: () => {
      const s: [number, number] = [1216, 480];
      return (
        <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gray-200 max-md:aspect-[4/3]!">
          <CardSet s={s} w={560} cards={[[232, 220, 0, 'brand-dark'], [657, 80, 30, 'transparent']]} names={names} />
        </Stage>
      );
    },
  },
  'card-mockup-02': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['brand', 'dark'], action: 'buttons', pt: 64,
    media: () => {
      const s: [number, number] = [576, 640];
      return (
        <Col w={576}>
          <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gray-200">
            {cardsTwo(s, [[106, 159, 30, 'brand-dark'], [403, -39, 60, 'transparent']])}
          </Stage>
        </Col>
      );
    },
  },
  'card-mockup-03': {
    layout: 'centered', bg: 'bg-gray-50', pattern: ['grid', 'sm'], badge: ['brand', 'outline'], action: 'buttons',
    media: () => {
      const s: [number, number] = [1216, 516];
      return (
        <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gradient-to-tr from-brand-900 to-brand-800">
          <CardSet s={s} w={560} cards={[[103, 267, 30, 'transparent-gradient'], [408, 72, 60, 'transparent-gradient'], [776, 64, 90, 'transparent-gradient'], [1099, 240, 120, 'transparent-gradient'], [1281, 558, 150, 'transparent-gradient']]} names={names} />
        </Stage>
      );
    },
  },
  'card-mockup-04': {
    layout: 'split', bg: 'bg-gray-50', pattern: ['grid-dot', 'sm'], badge: ['brand', 'modern'], action: 'buttons', pt: 64,
    media: () => {
      const s: [number, number] = [576, 560];
      return (
        <Col w={576}>
          <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gradient-to-tr from-brand-800 to-brand-700">
            <CardSet s={s} w={479} cards={[[258, 232, 30, 'transparent-gradient'], [310, 121, 45, 'transparent-gradient'], [365, 24, 60, 'transparent-gradient']]} names={names} />
          </Stage>
        </Col>
      );
    },
  },
  'card-mockup-05': {
    layout: 'centered', bg: 'bg-gray-950', tone: 'gray-dark', titleCls: 'md:text-display-2xl max-w-[768px]', pattern: ['grid', 'md', true], action: 'buttons',
    media: () => {
      const s: [number, number] = [1216, 400];
      return (
        <Stage w={s[0]} h={s[1]}>
          <LightAccent className="top-[-80%] left-[35%] h-[180%] w-[105%] opacity-40" />
          <CardSet s={s} w={560} cards={[[314, 23, 30, 'transparent-gradient'], [617, 0, 30, 'transparent-gradient']]} names={names} />
        </Stage>
      );
    },
  },
  'card-mockup-06': {
    layout: 'split', bg: 'bg-gray-950', tone: 'gray-dark', pattern: ['grid-dot', 'sm', true], action: 'buttons', pt: 64,
    media: () => {
      const s: [number, number] = [576, 640];
      return (
        <Col w={576}>
          <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gradient-to-tr from-gray-900 to-gray-700">
            <LightAccent className="top-[22%] left-[-94%] h-[112%] w-[222%]" />
            {cardsTwo(s, [[106, 159, 30, 'transparent-gradient'], [403, -39, 60, 'transparent']])}
          </Stage>
        </Col>
      );
    },
  },
  'card-mockup-07': {
    layout: 'centered', bg: 'bg-brand-800', tone: 'brand-dark', titleCls: 'md:text-display-2xl max-w-[768px]', pattern: ['grid', 'sm', true], action: 'buttons', medium: false,
    media: () => {
      const s: [number, number] = [1216, 456];
      return (
        <Stage w={s[0]} h={s[1]} className="overflow-hidden">
          <LightAccent className="top-[-47%] left-[38%] h-[158%] w-[105%] opacity-25" />
          <CardSet s={s} w={560} cards={[[103, 203, 30, 'transparent-gradient'], [408, 8, 60, 'transparent-gradient'], [776, 0, 90, 'transparent-gradient'], [1099, 176, 120, 'transparent-gradient'], [1281, 494, 150, 'transparent-gradient']]} names={names} />
        </Stage>
      );
    },
  },
  'card-mockup-08': {
    layout: 'split', bg: 'bg-brand-800', tone: 'brand-dark', pattern: ['grid-dot', 'sm', true], action: 'buttons', pt: 64,
    media: () => {
      const s: [number, number] = [576, 560];
      return (
        <Col w={576}>
          <Stage w={s[0]} h={s[1]} className="overflow-hidden bg-gradient-to-tr from-brand-800 to-brand-700">
            <LightAccent className="top-[34%] left-[-105%] h-[128%] w-[222%] opacity-50" />
            <CardSet s={s} w={479} cards={[[258, 232, 30, 'transparent-gradient'], [310, 121, 45, 'transparent-gradient'], [365, 24, 60, 'transparent-gradient']]} names={names} />
          </Stage>
        </Col>
      );
    },
  },
  'card-mockup-09': {
    layout: 'wide', bg: 'bg-white', pattern: ['grid', 'md'], action: 'email', extra: 'checks',
    media: () => {
      const s: [number, number] = [1216, 480];
      const cards: [number, number, number, 'transparent'][] = [];
      // 5 diagonal rows of tilted glass cards
      [[0, 515], [320, 411], [639, 308], [959, 204], [1278, 100]].forEach(([x0, y0], r) => {
        for (let i = 0; i < 5; i++) cards.push([x0 + i * 151 - 550, y0 + i * 151 - 379, -18, 'transparent']);
        void r;
      });
      return (
        <Stage w={s[0]} h={s[1]} className="overflow-hidden rounded-2xl bg-gray-500 max-md:aspect-[4/3]!">
          <CardSet s={s} w={316} cards={cards} names={names} />
          <Place s={s} x={941 - 550} y={546 - 379} w={316} rot={-18}>
            <HeroCreditCard_BrandDark />
          </Place>
        </Stage>
      );
    },
  },
  'card-mockup-10': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['success', 'modern'], action: 'buttons', pt: 64, gap: 32,
    media: () => {
      const s: [number, number] = [592, 560];
      return (
        <Col w={592}>
          <Stage w={s[0]} h={s[1]} className="overflow-hidden rounded-2xl bg-gray-100">
            <Place s={s} x={231} y={272} w={375} rot={30} className="aspect-[316/190] rounded-[20px] bg-gray-900 opacity-15 blur-md" />
            <CardSet s={s} w={375} cards={[[231, 208, 30, 'brand-light-gradient'], [231, 144, 30, 'transparent'], [231, 80, 30, 'brand-dark'], [231, 16, 30, 'transparent-gradient']]} names={names} />
          </Stage>
        </Col>
      );
    },
  },
  'card-mockup-11': {
    layout: 'wide', bg: 'bg-white', pattern: ['grid', 'sm'], action: 'buttons',
    media: () => {
      const s: [number, number] = [1216, 480];
      return (
        <Stage w={s[0]} h={s[1]} className="overflow-hidden rounded-2xl bg-gray-100 max-md:aspect-[4/3]!">
          <CardSet
            s={s}
            w={316}
            cards={[[689, -118, 30, 'brand-dark'], [447, -20, 30, 'gray-strip'], [483, 239, 30, 'gray-strip-vertical'], [241, 337, 30, 'brand-dark'], [977, 48, 30, 'brand-light-gradient'], [735, 146, 30, 'gradient-strip'], [771, 405, 30, 'brand-dark'], [1264, 214, 30, 'brand-dark'], [1022, 312, 30, 'salmon-strip']]}
            names={names}
          />
        </Stage>
      );
    },
  },
  'card-mockup-12': {
    layout: 'half', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['brand', 'modern'], action: 'email', pt: 96,
    media: () => {
      const s: [number, number] = [720, 720];
      return (
        <Stage w={s[0]} h={s[1]} className="h-full overflow-hidden bg-gray-100">
          <CardSet
            s={s}
            w={316}
            cards={[[433, 106, 30, 'brand-dark'], [191, 204, 30, 'gradient-strip-vertical'], [227, 463, 30, 'brand-light-gradient'], [-15, 561, 30, 'salmon-strip'], [721, 272, 30, 'brand-light-gradient'], [479, 370, 30, 'gradient-strip'], [515, 629, 30, 'brand-dark'], [1008, 438, 30, 'brand-dark'], [766, 536, 30, 'salmon-strip']]}
            names={names}
          />
        </Stage>
      );
    },
  },
  /* ------------------------------ Split images ------------------------------ */
  'split-image-01': {
    layout: 'half', bg: 'bg-white', badge: ['brand', 'modern'], action: 'email',
    media: (p) => <ImagePlaceholder src={p.imageSrc} tone="warm" className="h-[280px] w-full lg:h-full" />,
  },
  'split-image-02': {
    layout: 'half', bg: 'bg-white', badge: ['brand', 'light'], action: 'buttons',
    media: (p) => <ImagePlaceholder src={p.imageSrc} tone="cool" className="h-[280px] w-full lg:h-full lg:[clip-path:polygon(5.5%_0,100%_0,100%_100%,0_100%)]" />,
  },
  'split-image-03': {
    layout: 'split', bg: 'bg-white', action: 'buttons', pt: 64, gap: 32,
    media: (p) => {
      const s: [number, number] = [592, 640];
      return (
        <Col w={592}>
          <Stage w={s[0]} h={s[1]}>
            <ImagePlaceholder src={p.imageSrc} tone="brand" className="absolute inset-0 rounded-tl-[80px] lg:rounded-tl-[160px]">
              <Place s={s} x={422} y={-40} w={298} h={408} className="text-white opacity-30">
                <LinePattern className="size-full" />
              </Place>
            </ImagePlaceholder>
            <Place s={s} x={-72} y={396} w={368} className="max-lg:hidden">
              <FileQueue />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  'split-image-04': {
    layout: 'split', bg: 'bg-white', action: 'email', extra: 'reviews', pt: 64, gap: 32,
    media: (p) => {
      const s: [number, number] = [592, 640];
      return (
        <Col w={592}>
          <Stage w={s[0]} h={s[1]}>
            <ImagePlaceholder src={p.imageSrc} tone="warm" className="absolute inset-0" />
            <Place s={s} x={-120} y={381} w={852} h={299} className="text-brand-600 max-lg:hidden">
              <HandDrawnSquiggle className="size-full" />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  'split-image-05': {
    layout: 'split', bg: 'bg-white', pattern: ['grid', 'md'], action: 'buttons', pt: 64, textMax: 'max-w-[560px]',
    media: (p) => (
      <Col w={560}>
        <ImagePlaceholder src={p.imageSrc} tone="cool" ratio="560/640" className="w-full rounded-tr-[40px] rounded-bl-[40px] lg:rounded-tr-[64px] lg:rounded-bl-[64px]" />
      </Col>
    ),
  },
  'split-image-06': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], action: 'email', pt: 64, textMax: 'max-w-[560px]',
    media: (p) => {
      const s: [number, number] = [560, 640];
      return (
        <Col w={560}>
          <Stage w={s[0]} h={s[1]}>
            <ImagePlaceholder src={p.imageSrc} tone="gray" className="absolute inset-0 flex items-center justify-center">
              <HeroPlayButton />
            </ImagePlaceholder>
            <Place s={s} x={-131} y={505} w={230} h={195} rot={39} className="text-gray-400 max-lg:hidden">
              <HandDrawnArrow className="size-full" />
            </Place>
          </Stage>
        </Col>
      );
    },
  },
  /* ------------------------------ Geometric shapes ------------------------------ */
  'geometric-shapes-01': {
    layout: 'split', bg: 'bg-white', pattern: ['grid', 'md'], action: 'buttons', pt: 64, gap: 32,
    media: () => (
      <Col w={592}>
        <GeometricGrid01 />
      </Col>
    ),
  },
  'geometric-shapes-02': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], action: 'buttons', medium: true, pt: 64, gap: 32,
    media: (p) => (
      <Col w={592}>
        <GeometricGrid02 images={p.imageSrc ? [p.imageSrc] : undefined} />
      </Col>
    ),
  },
  'geometric-shapes-03': {
    layout: 'half', bg: 'bg-white', pattern: ['grid', 'sm'], badge: ['brand', 'outline'], action: 'buttons', medium: true,
    media: () => <BauhausGrid cols={4} rows={4} className="lg:h-full" />,
  },
  'geometric-shapes-04': {
    layout: 'centered', bg: 'bg-white', pattern: ['grid-dot', 'sm'], badge: ['brand', 'light'], action: 'buttons', medium: true,
    media: () => <BauhausGrid cols={8} rows={2} />,
  },
  /* ------------------------------ Split forms ------------------------------ */
  'split-form-01': {
    layout: 'split', bg: 'bg-white', action: 'none', extra: 'reviews', pt: 64, gap: 32,
    media: () => (
      <Col w={440}>
        <div className="relative rounded-2xl bg-gray-50 px-4 py-8 md:px-10">
          <SignupForm />
          <HandDrawnArrow className="absolute top-[78%] left-[-60%] h-[198px] w-[300px] -scale-x-100 rotate-[200deg] text-gray-400 max-lg:hidden" />
        </div>
      </Col>
    ),
  },
  'split-form-02': {
    layout: 'split', bg: 'bg-white', pattern: ['grid-dot', 'sm'], action: 'buttons', extra: 'checks', pt: 64, gap: 32,
    media: () => (
      <Col w={512}>
        <div className="rounded-3xl bg-gray-100 p-4 md:p-10">
          <div className="rounded-2xl bg-white px-4 py-8 md:p-8">
            <SignupForm />
          </div>
        </div>
      </Col>
    ),
  },
  /* ------------------------------ Simple text ------------------------------ */
  'simple-text': {
    layout: 'wide', bg: 'bg-white', pattern: ['grid', 'md'], action: 'buttons', medium: true,
    media: (p) => <ImagePlaceholder src={p.imageSrc} tone="cool" className="h-60 w-full md:h-[516px]" />,
  },
  /* ------------------------------ Abstract angles ------------------------------ */
  'abstract-angles-01': {
    layout: 'abstract', bg: 'bg-white', tone: 'brand-light', badge: ['brand', 'outline'], action: 'buttons',
    media: (p) => <HeroVideoPlayer src={p.imageSrc} className="mx-auto w-full max-w-[916px]" />,
  },
  'abstract-angles-02': {
    layout: 'abstract', bg: 'bg-white', tone: 'brand-light', badge: ['brand', 'outline'], action: 'buttons',
    media: (p) => (
      <ImagePlaceholder src={p.imageSrc} tone="warm" ratio="916/516" className="mx-auto flex w-full max-w-[916px] items-center justify-center shadow-3xl">
        <HeroPlayButton />
      </ImagePlaceholder>
    ),
  },
  'abstract-angles-03': {
    layout: 'abstract', bg: 'bg-white', tone: 'brand-light', badge: ['brand', 'outline'], action: 'buttons',
    media: (p) => (
      <div className="mx-auto w-full max-w-[1024px] p-1.5">
        <Screen p={p} size="xl" />
      </div>
    ),
  },
  'abstract-angles-04': {
    layout: 'abstract', bg: 'bg-white', tone: 'brand-light', badge: ['brand', 'outline'], action: 'buttons',
    media: (p) => (
      <div className="w-full overflow-hidden md:h-[416px]">
        <Mac p={p} className="mx-auto max-w-[1024px]" />
      </div>
    ),
  },
};

function HeroCreditCard_BrandDark() {
  return <HeroCreditCard theme="brand-dark" name="Phoenix Baker" className="shadow-xl" />;
}

/* ------------------------------------------------------------------ */
/* Simple-text themes                                                  */
/* ------------------------------------------------------------------ */

const simpleThemes: Record<HeroHeaderTheme, { bg: string; tone: HeroTone; pattern: [HeroPatternType, 'sm' | 'md', boolean?]; underline: string; medium: boolean; mtheme: MarketingTheme }> = {
  default: { bg: 'bg-white', tone: 'light', pattern: ['grid', 'md'], underline: 'text-brand-100', medium: true, mtheme: 'default' },
  'gray-light': { bg: 'bg-gray-50', tone: 'light', pattern: ['grid-dot', 'sm'], underline: '', medium: false, mtheme: 'gray-light' },
  'gray-dark': { bg: 'bg-gray-950', tone: 'gray-dark', pattern: ['grid', 'sm', true], underline: '', medium: true, mtheme: 'gray-dark' },
  brand: { bg: 'bg-brand-800', tone: 'brand-dark', pattern: ['grid-dot', 'sm', true], underline: 'text-brand-500', medium: true, mtheme: 'brand' },
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

/**
 * HeroHeaderSection — Figma "Hero header section". Every Figma Type is a `type` value; `theme` applies to `simple-text`.
 * The Figma frame contains a "Dropdown header navigation" — pass it via `nav` (nothing is rendered by default).
 */
export const HeroHeaderSection = forwardRef<HTMLElement, HeroHeaderSectionProps>(function HeroHeaderSection(
  {
    type = 'screen-mockup-01',
    theme = 'default',
    nav,
    subheading,
    title,
    supportingText,
    badge,
    primaryLabel,
    secondaryLabel,
    actions,
    emailPlaceholder,
    emailHint,
    onEmailSubmit,
    checkItems,
    logos = heroLogos,
    logosLabel = 'Trusted by 4,000+ companies',
    highlight,
    imageSrc,
    screen,
    phoneScreen,
    media,
    className,
    ...props
  },
  ref,
) {
  const d = heroDefaults[type];
  let c = cfg[type];
  let mtheme: MarketingTheme = 'default';
  let underline = '';
  if (type === 'simple-text') {
    const st = simpleThemes[theme];
    c = { ...c, bg: st.bg, tone: st.tone, pattern: st.pattern, medium: st.medium };
    underline = st.underline;
    mtheme = st.mtheme;
  } else if (c.tone === 'gray-dark') mtheme = 'gray-dark';
  else if (c.tone === 'brand-dark' && c.layout !== 'card-split' && c.layout !== 'card-centered') mtheme = 'brand';

  const tone = c.tone ?? 'light';
  const t = heroTone[tone];
  const centered = c.layout === 'centered' || c.layout === 'card-centered' || c.layout === 'abstract';
  const big = c.layout === 'card-split' || c.layout === 'card-centered';

  const bdg = badge === null ? null : badge ?? d.badge;
  const sub = subheading ?? d.subheading;
  const titleText = title ?? d.title;
  const hl = highlight ?? (type === 'simple-text' && underline ? 'experiences' : undefined);
  const checks = checkItems ?? d.checkItems;
  const pLabel = primaryLabel ?? d.primaryLabel;
  const sLabel = secondaryLabel ?? d.secondaryLabel;

  /* ---------- heading block ---------- */
  const renderTitle = () => {
    if (hl && typeof titleText === 'string' && titleText.includes(hl)) {
      const [a, b] = titleText.split(hl);
      return (
        <>
          {a}
          <span className="relative inline-block whitespace-nowrap">
            <svg viewBox="0 0 334 8" preserveAspectRatio="none" className={cx('absolute -bottom-0.5 left-0 -z-10 h-2 w-full md:-bottom-1 md:h-4', underline)} aria-hidden>
              <path d="M2 6C80 1 250 1 332 5" stroke="currentColor" strokeWidth="16" strokeLinecap="round" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
            <span className="relative">{hl}</span>
          </span>
          {b}
        </>
      );
    }
    return titleText;
  };

  const titleEl = (
    <h1
      className={cx(
        'relative isolate text-display-md md:text-display-xl',
        big && 'md:text-display-2xl',
        c.medium ? 'font-medium' : 'font-semibold',
        t.heading,
        centered ? 'max-w-[1024px]' : c.layout === 'wide' && type !== 'simple-text' ? 'max-w-[768px]' : 'max-w-[1024px]',
        big && 'tracking-tight',
        c.titleCls,
      )}
    >
      {renderTitle()}
    </h1>
  );

  const heading = (
    <div className={cx('flex flex-col gap-4 md:gap-6', centered && 'items-center text-center')}>
      {(bdg || sub) && (
        <div className={cx('flex flex-col gap-4', centered && 'items-center')}>
          {bdg && c.badge && <HeroBadge content={bdg} color={c.badge[0]} theme={c.badge[1]} />}
          <div className={cx('flex flex-col gap-3', centered && 'items-center')}>
            {sub && <p className={cx('text-sm font-semibold md:text-md', t.sub)}>{sub}</p>}
            {titleEl}
          </div>
        </div>
      )}
      {!(bdg || sub) && titleEl}
      {(supportingText ?? d.supportingText) && (
        <p className={cx('text-lg md:text-xl', t.text, centered ? 'max-w-[768px]' : c.textMax ?? (c.layout === 'wide' ? (type === 'simple-text' ? 'max-w-[640px]' : 'max-w-[768px]') : 'max-w-[480px]'))}>
          {supportingText ?? d.supportingText}
        </p>
      )}
    </div>
  );
  /* ---------- actions ---------- */
  const actionBlock =
    actions ??
    (c.action === 'buttons' ? (
      <HeroButtons
        primaryLabel={pLabel}
        secondaryLabel={sLabel}
        secondaryHierarchy={type === 'simple-text' && theme === 'brand' ? 'secondary-color' : 'secondary-gray'}
      />
    ) : c.action === 'email' ? (
      <EmailCapture placeholder={emailPlaceholder} hint={emailHint} buttonLabel={pLabel} tone={tone} onSubmit={onEmailSubmit} />
    ) : c.action === 'phone' ? (
      <EmailCapture type="tel" placeholder={emailPlaceholder ?? '+1 (555) 000-0000'} hint={emailHint} buttonLabel={pLabel} tone={tone} onSubmit={onEmailSubmit} leadingDropdown={<CountryDropdown />} />
    ) : c.action === 'store' ? (
      <AppStoreBadges />
    ) : null);

  const extraBlock =
    c.extra === 'reviews' ? (
      <UserReviews avatars={heroReviewAvatars} tone={tone} />
    ) : c.extra === 'checks' && checks && type === 'split-form-02' ? (
      <HeroCheckItems items={checks} size="md" tone={tone} className="md:px-2" />
    ) : null;

  const textBlock = (
    <div className={cx('flex flex-col gap-8 md:gap-12', centered && 'items-center')}>
      {heading}
      {type === 'split-form-02' ? extraBlock : actionBlock}
      {type !== 'split-form-02' && extraBlock}
    </div>
  );

  const mediaNode = media ?? c.media?.({ screen, phone: phoneScreen, imageSrc });
  const ptCls = { 96: 'pt-16 md:pt-24', 64: 'pt-16', 32: 'pt-4 md:pt-8' }[c.pt ?? 96];
  const pattern = c.pattern && <HeroPattern type={c.pattern[0]} size={c.pattern[1]} faint={c.pattern[2]} />;

  /* ---------- layouts ---------- */
  let body: ReactNode;
  switch (c.layout) {
    case 'centered':
      body = (
        <div className={cx('relative flex flex-col gap-16 pb-16 md:pb-24', ptCls)}>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">{textBlock}</div>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">{mediaNode}</div>
        </div>
      );
      break;
    case 'split':
      body = (
        <div className={cx('relative pb-16 md:pb-24', ptCls)}>
          <div className={cx('mx-auto flex w-full max-w-[1280px] flex-col items-center gap-16 px-4 md:px-8 lg:flex-row', c.gap === 32 ? 'lg:gap-8' : 'lg:gap-16')}>
            <div className={cx('flex w-full min-w-0 flex-1 flex-col gap-12 md:gap-16', c.gap === 32 && 'lg:pr-8')}>
              {textBlock}
              {c.extra === 'logos' && <TrustedLogos label={logosLabel} logos={logos} tone={tone} />}
            </div>
            {mediaNode}
          </div>
        </div>
      );
      break;
    case 'half':
      body = (
        <div className="relative flex flex-col gap-16 pt-16 lg:flex-row lg:gap-0 lg:pt-0">
          <div className={cx('flex flex-1 items-center lg:justify-end', c.pt === 96 ? 'lg:pt-32 lg:pb-24 lg:items-start' : 'lg:py-24')}>
            <div className="w-full px-4 md:px-8 lg:max-w-[640px] lg:pr-16">{textBlock}</div>
          </div>
          <div className="relative min-h-[280px] px-4 md:px-8 lg:min-h-[720px] lg:flex-1 lg:px-0">
            <div className="h-full lg:absolute lg:inset-0">{mediaNode}</div>
          </div>
        </div>
      );
      break;
    case 'card-split':
      body = (
        <div className={cx('relative pb-16 md:pb-24', ptCls)}>
          <div className="mx-auto w-full max-w-[1280px] md:px-8">
            <div className="flex flex-col gap-16 overflow-hidden bg-gradient-to-tr from-brand-800 to-brand-700 px-4 py-16 md:rounded-3xl md:px-16 lg:h-[640px] lg:flex-row lg:items-center lg:gap-8 lg:py-0 lg:pr-0">
              <div className="flex-1 lg:max-w-[560px]">{textBlock}</div>
              {mediaNode}
            </div>
          </div>
        </div>
      );
      break;
    case 'card-centered':
      body = (
        <div className={cx('relative pb-16 md:pb-24', ptCls)}>
          <div className="mx-auto w-full max-w-[1280px] md:px-8">
            <div className="bg-gradient-to-tr from-brand-800 to-brand-700 px-4 pt-16 pb-28 md:rounded-3xl md:px-8 md:pt-24 md:pb-48">
              {textBlock}
            </div>
            <div className="relative px-4 md:px-0">
              <LinePattern className="absolute -top-[280px] -left-[210px] h-[408px] w-[298px] text-white opacity-30 max-md:hidden" />
              <LinePattern className="absolute top-12 right-[-66px] h-[408px] w-[298px] text-brand-300 opacity-30 max-md:hidden" />
              {mediaNode}
            </div>
          </div>
        </div>
      );
      break;
    case 'abstract':
      body = (
        <div className="relative pb-16 md:pb-24">
          <div className="relative bg-brand-50 pt-16 pb-16 md:pt-24 md:pb-24">
            <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 md:px-8">{textBlock}</div>
            <AbstractAngles className="top-[calc(100%-64px)]" />
          </div>
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-4 md:px-8">{mediaNode}</div>
        </div>
      );
      break;
    case 'wide':
    default:
      body = (
        <div className={cx('relative flex flex-col gap-16 pb-16 md:pb-24', type === 'card-mockup-11' && 'md:gap-24', ptCls)}>
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-4 md:px-8 lg:flex-row lg:items-end lg:justify-between lg:gap-8">
            <div className="max-w-[1024px] flex-1">{textBlock}</div>
            {c.extra === 'checks' && checks && type !== 'split-form-02' && <HeroCheckItems items={checks} size="lg" tone={tone} className="lg:w-[416px] lg:px-4 lg:pb-6" />}
          </div>
          <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">{mediaNode}</div>
        </div>
      );
  }

  return (
    <MarketingSection ref={ref} as="header" theme={mtheme} spacing="none" className={cx(c.bg, 'isolate', className)} data-hero-type={type} {...props}>
      {pattern}
      {nav != null && <div className={cx('relative z-20', c.layout === 'abstract' && 'bg-brand-50')}>{nav}</div>}
      {body}
    </MarketingSection>
  );
});
