import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ScreenMockup, type ScreenMockupSize } from '../../components/mockups/ScreenMockup';
import { IPhoneMockup } from '../../components/mockups/IPhoneMockup';
import { MacbookMockup } from '../../components/mockups/MacbookMockup';
import { Avatar } from '../../components/avatars/Avatar';
import { LineChart } from '../../components/charts/LineChart';
import { ActivityGauge } from '../../components/charts/ActivityGauge';
import { ImagePlaceholder } from '../_shared';
import { HandDrawnArrow } from '../../components/decorations';
import { FeatureCreditCard, type FeatureCreditCardTheme } from './FeatureCreditCard';
import { defaultNotifications } from './defaults';

/* Internal visual building blocks for FeaturesSection (device mockups, card stacks, images). */

export interface Box { x: number; y: number; w: number; h?: number }
export interface SceneItem {
  /** position inside the mobile frame (omit = hidden on mobile) */
  m?: Box;
  /** position inside the desktop frame (omit = hidden on desktop) */
  d?: Box;
  node: ReactNode;
  className?: string;
}

/**
 * Absolute-positioned composition with separate mobile (< lg) and desktop (lg+) coordinates, in Figma px.
 * The mobile frame is 375px wide and centered; the desktop frame is anchored to the column's left edge.
 */
export function Scene({ items, mobileH, desktopH, className, bandClassName }: {
  items: SceneItem[]; mobileH: number; desktopH: number; className?: string; bandClassName?: string;
}) {
  return (
    <div className={cx('relative w-full', bandClassName)}>
      <div
        className={cx('relative mx-auto h-[var(--mh)] w-[375px] max-w-none lg:mx-0 lg:h-[var(--dh)] lg:w-full', className)}
        style={{ '--mh': `${mobileH}px`, '--dh': `${desktopH}px` } as CSSProperties}
      >
        {items.map((it, i) => (
          <div
            key={i}
            className={cx(
              'absolute',
              it.m ? 'left-[var(--mx)] top-[var(--my)] w-[var(--mw)]' : 'hidden',
              it.d ? 'lg:block lg:left-[var(--dx)] lg:top-[var(--dy)] lg:w-[var(--dw)]' : 'lg:hidden',
              it.m?.h != null && 'h-[var(--mhh)]',
              it.d?.h != null && 'lg:h-[var(--dhh)]',
              it.className,
            )}
            style={{
              ...(it.m ? { '--mx': `${it.m.x}px`, '--my': `${it.m.y}px`, '--mw': `${it.m.w}px`, ...(it.m.h != null ? { '--mhh': `${it.m.h}px` } : null) } : null),
              ...(it.d ? { '--dx': `${it.d.x}px`, '--dy': `${it.d.y}px`, '--dw': `${it.d.w}px`, ...(it.d.h != null ? { '--dhh': `${it.d.h}px` } : null) } : null),
            } as CSSProperties}
          >
            {it.node}
          </div>
        ))}
      </div>
    </div>
  );
}

export const Phone = ({ screen }: { screen?: ReactNode }) => <IPhoneMockup className="w-full max-w-none">{screen}</IPhoneMockup>;
export const Screen = ({ size, screen, className }: { size: ScreenMockupSize; screen?: ReactNode; className?: string }) => (
  <ScreenMockup size={size} className={className}>{screen}</ScreenMockup>
);

/** Soft gray blob behind phones (Figma "Blob"). */
export const Blob = () => (
  <svg viewBox="0 0 532 480" className="block h-auto w-full text-gray-50" fill="currentColor" aria-hidden>
    <path d="M78 74C140 10 262-12 372 24c106 34 170 126 156 232-14 108-104 196-226 216C176 492 58 446 18 352-22 258 16 138 78 74Z" />
  </svg>
);

/* --------------------------------------------- single-device visuals --------------------------------------------- */

/** Mobile: xs screen; desktop: screen of `size` bleeding out of the column (`align` = side it is anchored to). */
export function BleedScreen({ size, desktopH, align = 'left', screen, band }: {
  size: ScreenMockupSize; desktopH: number; align?: 'left' | 'right'; screen?: ReactNode; band?: boolean;
}) {
  const w = { xs: 342, sm: 480, md: 640, lg: 768, xl: 1024, '2xl': 1216 }[size];
  return (
    <>
      <div className={cx('lg:hidden', band && '-mx-4 bg-gray-100 px-4 py-6 md:-mx-8 md:px-8')}>
        <Screen size="xs" screen={screen} className="mx-auto" />
      </div>
      <div className="relative hidden lg:block" style={{ height: desktopH }}>
        <div className={cx('absolute top-0', align === 'left' ? 'left-0' : 'right-0')} style={{ width: w }}>
          <Screen size={size} screen={screen} />
        </div>
      </div>
    </>
  );
}

/** Phone cropped at the bottom (mobile 375×`mobileH` frame; phone 284 wide). */
export function CroppedPhone({ mobileH = 360, desktopH = 0, desktop, blob, screen }: {
  mobileH?: number; desktopH?: number; desktop: SceneItem[]; blob?: boolean; screen?: ReactNode;
}) {
  const m: SceneItem[] = [
    ...(blob ? [{ m: { x: -23, y: 94, w: 420 }, node: <Blob /> }] : []),
    { m: { x: 45, y: 1, w: 284 }, node: <Phone screen={screen} /> },
  ];
  return <Scene mobileH={mobileH} desktopH={desktopH} items={[...m, ...desktop]} className="overflow-hidden lg:overflow-visible" />;
}

/* --------------------------------------------- credit card scenes --------------------------------------------- */

const card = (theme: FeatureCreditCardTheme, cardholder: string) => <FeatureCreditCard theme={theme} cardholder={cardholder} className="w-full" />;

/** Two overlapping cards on gray (Icons and mockup 06, Tabs mockup 10). */
export const CardsPair = ({ desktopH = 640 }: { desktopH?: number }) => (
  <Scene
    bandClassName="-mx-4 bg-gray-100 md:-mx-8 lg:mx-0"
    mobileH={320}
    desktopH={desktopH}
    items={[
      { m: { x: 83.5, y: 74, w: 265 }, d: { x: 106, y: 159, w: 496 }, node: card('brand-dark', 'Phoenix Baker') },
      { m: { x: 242, y: -31.5, w: 265 }, d: { x: 403, y: -39, w: 496 }, node: card('transparent', 'Olivia Rhye') },
    ]}
  />
);

/** Stack of 4 cards (Icons and mockup 07, Tabs mockup 11). */
export const CardsStack = () => {
  const themes: [FeatureCreditCardTheme, string][] = [
    ['brand-light-gradient', 'Phoenix Baker'], ['transparent', 'Olivia Rhye'], ['brand-dark', 'Lana Steiner'], ['transparent-gradient', 'Demi Wilkinson'],
  ];
  return (
    <Scene
      bandClassName="-mx-4 bg-gray-100 md:-mx-8 lg:mx-0 lg:rounded-2xl"
      mobileH={320}
      desktopH={560}
      items={[
        {
          m: { x: 142.7, y: 144.5, w: 258.7, h: 155.6 }, d: { x: 223, y: 272, w: 375, h: 226 },
          node: <div className="size-full rounded-[20px] bg-gray-900 opacity-20 blur-[16px]" />,
        },
        ...themes.map(([th, n], i) => ({
          m: { x: 142.7, y: 100.4 - i * 44.15, w: 258.7 }, d: { x: 223, y: 208 - i * 64, w: 375 },
          node: card(th, n),
        })),
      ]}
    />
  );
};

/** Three fanned glass cards on a brand gradient (Icons and mockup 08, Tabs mockup 12). */
export const CardsFan = () => (
  <Scene
    bandClassName="-mx-4 bg-gradient-to-br from-brand-800 to-brand-700 md:-mx-8 lg:mx-0"
    className="overflow-hidden"
    mobileH={320}
    desktopH={560}
    items={[
      { m: { x: 168, y: 112, w: 312 }, d: { x: 258, y: 232, w: 479 }, node: card('transparent-gradient', 'Phoenix Baker') },
      { m: { x: 202, y: 40, w: 312 }, d: { x: 310, y: 121, w: 479 }, node: card('transparent-gradient', 'Olivia Rhye') },
      { m: { x: 238, y: -23, w: 312 }, d: { x: 365, y: 24, w: 479 }, node: card('transparent-gradient', 'Lana Steiner') },
    ]}
  />
);

/* --------------------------------------------- other visuals --------------------------------------------- */

/** Macbook on a rounded gray panel (Icons and image 01) or bleeding right (Tabs mockup 07). */
export function MacbookVisual({ panel, screen }: { panel?: boolean; screen?: ReactNode }) {
  return (
    <>
      <div className="-mx-4 overflow-hidden bg-gray-100 px-4 py-6 md:-mx-8 md:px-8 lg:hidden">
        <div className="mx-auto w-[343px]"><div className="-ml-8 w-[407px]"><MacbookMockup>{screen}</MacbookMockup></div></div>
      </div>
      <div className="relative hidden h-[560px] lg:block">
        {panel ? (
          <div className="absolute left-0 top-0 h-[560px] w-[768px] overflow-hidden rounded-3xl bg-gray-100">
            <div className="absolute left-10 top-14 w-[768px]"><MacbookMockup>{screen}</MacbookMockup></div>
          </div>
        ) : null}
        {panel ? (
          <HandDrawnArrow variant="33" width={238} className="absolute left-[328px] top-[103px] text-gray-600" />
        ) : (
          <div className="absolute left-0 top-0 w-[959px]"><MacbookMockup>{screen}</MacbookMockup></div>
        )}
      </div>
    </>
  );
}

export const ImageVisual = ({ src, mobileH = 240, desktopH = 560, className }: { src?: string; mobileH?: number; desktopH?: number; className?: string }) => (
  <ImagePlaceholder
    src={src}
    tone="gray"
    className={cx('h-[var(--mh)] w-full lg:h-[var(--dh)]', className)}
    style={{ '--mh': `${mobileH}px`, '--dh': `${desktopH}px` } as CSSProperties}
  />
);

/** Line chart card + activity gauge bubble (Icons and mockup 05). */
export function ChartCardVisual() {
  const chart = (h: number) => (
    <LineChart
      labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
      series={[
        { name: 'This year', data: [8, 12, 11, 16, 15, 20, 19, 24, 23, 27, 26, 31] },
        { name: 'Last year', data: [5, 8, 7, 10, 9, 12, 11, 14, 13, 16, 15, 18] },
        { name: 'Two years ago', data: [3, 4, 4, 6, 5, 7, 7, 8, 8, 10, 9, 11] },
      ]}
      axisLabels={false}
      legend="none"
      height={h}
      tooltip={false}
    />
  );
  const gauge = (size: 'xs' | 'sm') => (
    <ActivityGauge
      size={size}
      legend="none"
      label="Active users"
      value="1,000"
      data={[{ label: 'Mobile', value: 80 }, { label: 'Desktop', value: 65 }, { label: 'Tablet', value: 50 }]}
    />
  );
  return (
    <>
      <div className="relative mx-auto h-[272px] w-[343px] lg:hidden">
        <div className="absolute inset-0 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-5 shadow-[0_24px_48px_-12px_rgb(16_24_40/0.18)]">
          <p className="text-md font-semibold text-gray-900">Users over time</p>
          {chart(180)}
        </div>
        <div className="absolute left-[215px] top-[120px] flex size-48 items-center justify-center rounded-full bg-white/70 p-4 backdrop-blur-sm">{gauge('xs')}</div>
      </div>
      <div className="relative hidden h-[384px] w-[480px] shrink-0 lg:block">
        <div className="absolute inset-0 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-[0_24px_48px_-12px_rgb(16_24_40/0.18)]">
          <p className="text-lg font-semibold text-gray-900">Users over time</p>
          {chart(276)}
        </div>
        <div className="absolute left-[272px] top-[272px] flex size-[232px] items-center justify-center rounded-full bg-white/70 p-4 backdrop-blur-sm">{gauge('sm')}</div>
      </div>
    </>
  );
}

/** Rounded-top panel with a masked phone and floating notification cards (Tabs mockup 04). */
export function NotificationsPhone({ screen }: { screen?: ReactNode }) {
  const queue = (
    <div className="flex flex-col gap-3">
      {defaultNotifications.map((n, i) => (
        <div
          key={n.name}
          className={cx('flex items-center gap-3 rounded-lg border border-white bg-white/90 p-4 shadow-lg backdrop-blur-md', i === 2 && 'opacity-80', i === 3 && 'opacity-50')}
        >
          <Avatar size="md" initials={n.initials} alt={n.name} />
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-gray-700">{n.text}</p>
            {n.supportingText && <p className="text-gray-600">{n.supportingText}</p>}
          </div>
        </div>
      ))}
    </div>
  );
  return (
    <>
      <div className="relative mx-auto h-[416px] w-[375px] overflow-hidden lg:hidden">
        <div className="absolute left-[45px] top-0 w-[284px]"><Phone screen={screen} /></div>
      </div>
      <div className="relative mx-auto hidden h-[640px] w-[560px] rounded-b-3xl rounded-t-[320px] bg-gray-100 lg:block">
        <div className="absolute left-[122px] top-20 h-[560px] w-[316px] overflow-hidden">
          <div className="absolute left-px top-0 w-[314px]"><Phone screen={screen} /></div>
        </div>
        <div className="absolute -left-24 top-[328px] w-80">{queue}</div>
      </div>
    </>
  );
}

/** Video player placeholder (Figma "Video player", Playing=False). */
export function VideoVisual({ src }: { src?: string }) {
  return (
    <ImagePlaceholder
      src={src}
      tone="dark"
      className="mx-auto aspect-video w-full max-w-[800px] rounded-md shadow-[0_32px_64px_-12px_rgb(16_24_40/0.14)] md:rounded-lg"
    >
      <button
        type="button"
        aria-label="Play video"
        className="absolute left-1/2 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur-md outline-none transition hover:bg-white/40 focus-visible:ring-4 focus-visible:ring-white/40 md:size-20"
      >
        <svg viewBox="0 0 24 24" className="ml-0.5 size-5 md:ml-1 md:size-8" fill="currentColor" aria-hidden>
          <path d="M7 4.9v14.2c0 .8.9 1.3 1.6.9l11.2-7.1c.6-.4.6-1.3 0-1.7L8.6 4c-.7-.4-1.6.1-1.6.9Z" />
        </svg>
      </button>
    </ImagePlaceholder>
  );
}
