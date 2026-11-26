import type { CSSProperties, ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ImagePlaceholder } from '../_shared';
import { Avatar } from '../../components/avatars/Avatar';
import { FileUploadItem } from '../../components/file-upload/FileUploadItem';
import { LineChart } from '../../components/charts/LineChart';
import { ActivityGauge } from '../../components/charts/ActivityGauge';
import { Input } from '../../components/inputs/Input';
import { Button } from '../../components/buttons/Button';
import { SocialButton } from '../../components/buttons/SocialButton';
import { PaymentIcon } from '../../components/misc-icons/PaymentIcon';
import { Play } from '../../icons';
import { HeroLogomark } from './_parts';
import { heroNotifications } from './defaults';

/* ------------------------------------------------------------------ */
/* Stage: a fixed-ratio canvas whose children are placed in % of the   */
/* Figma frame, so compositions scale down on small screens.           */
/* ------------------------------------------------------------------ */

export function Stage({ w, h, className, style, children }: { w: number; h: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div className={cx('relative w-full shrink-0', className)} style={{ aspectRatio: `${w} / ${h}`, ...style }}>
      {children}
    </div>
  );
}

/** Absolutely placed child of a <Stage>: Figma x/y/w/h (+ rotation around the top-left corner). */
export function Place({ s, x, y, w, h, rot, className, style, children }: { s: [number, number]; x: number; y: number; w: number; h?: number; rot?: number; className?: string; style?: CSSProperties; children?: ReactNode }) {
  return (
    <div
      className={cx('absolute', className)}
      style={{
        left: `${(x / s[0]) * 100}%`,
        top: `${(y / s[1]) * 100}%`,
        width: `${(w / s[0]) * 100}%`,
        ...(h != null ? { height: `${(h / s[1]) * 100}%` } : null),
        ...(rot ? { transform: `rotate(${rot}deg)`, transformOrigin: '0 0' } : null),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Credit card mockup                                                  */
/* ------------------------------------------------------------------ */

export type HeroCardTheme =
  | 'transparent'
  | 'transparent-gradient'
  | 'brand-dark'
  | 'brand-light-gradient'
  | 'gray-strip'
  | 'gray-strip-vertical'
  | 'gradient-strip'
  | 'gradient-strip-vertical'
  | 'salmon-strip';

const cardBg: Record<HeroCardTheme, string> = {
  transparent: 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'transparent-gradient': 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'brand-dark': 'bg-gradient-to-tr from-brand-900 to-brand-600',
  'brand-light-gradient': 'bg-gradient-to-tr from-brand-800 to-brand-700',
  'gray-strip': 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'gray-strip-vertical': 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'gradient-strip': 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'gradient-strip-vertical': 'bg-gradient-to-br from-white/50 to-white/0 backdrop-blur-md',
  'salmon-strip': 'bg-[#f4d9d0]',
};

/** Simplified Figma "Credit card mockup" (316×190); fills its parent's width and scales its contents. */
export function HeroCreditCard({ theme = 'transparent', name = 'Olivia Rhye', className }: { theme?: HeroCardTheme; name?: string; className?: string }) {
  const strip = theme.includes('strip') ? (theme.endsWith('vertical') ? 'vertical' : 'horizontal') : null;
  const stripColor = theme.startsWith('gradient') ? 'bg-gradient-to-br from-brand-600 to-brand-900' : 'bg-gray-700';
  return (
    <div
      className={cx(
        '@container relative aspect-[316/190] w-full overflow-hidden rounded-[6.3cqw] text-white shadow-[0_10px_16px_rgb(0_0_0/0.05)] ring-1 ring-white/30 ring-inset',
        cardBg[theme],
        className,
      )}
    >
      {strip === 'horizontal' && <div className={cx('absolute inset-x-0 top-0 h-1/2', stripColor)} />}
      {strip === 'vertical' && <div className={cx('absolute inset-y-0 left-0 w-[72%]', stripColor)} />}
      <span className="absolute top-[6.3cqw] left-[6.3cqw] text-[5.1cqw] font-semibold leading-none">Tinicorn.</span>
      <svg viewBox="0 0 20 24" className="absolute top-[5.3cqw] right-[6.3cqw] w-[6.3cqw]" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden>
        <path d="M3 4c3 5 3 11 0 16M9 2c4 6 4 14 0 20M15 1c5 7 5 15 0 22" />
      </svg>
      <span className="absolute bottom-[14.5cqw] left-[6.3cqw] text-[5.1cqw] font-semibold leading-none tracking-[0.05em]">1234 1234 1234 1234</span>
      <span className="absolute bottom-[6.3cqw] left-[6.3cqw] text-[3.8cqw] font-semibold uppercase leading-none tracking-[0.05em]">{name}</span>
      <span className="absolute right-[26cqw] bottom-[6.3cqw] text-[3.8cqw] font-semibold leading-none">06/28</span>
      <span className="absolute right-[5cqw] bottom-[5cqw] flex w-[14.3cqw] items-center justify-center overflow-hidden rounded-[1.3cqw] bg-white/10">
        <PaymentIcon method="mastercard" className="h-auto w-full" />
      </span>
    </div>
  );
}

/** A set of credit cards placed on a stage (Figma coordinates of each card's top-left + rotation). */
export function CardSet({ s, w, cards, names }: { s: [number, number]; w: number; cards: [number, number, number, HeroCardTheme][]; names?: string[] }) {
  return (
    <>
      {cards.map(([x, y, rot, theme], i) => (
        <Place key={i} s={s} x={x} y={y} w={w} rot={rot}>
          <HeroCreditCard theme={theme} name={names?.[i % names.length] ?? 'Phoenix Baker'} />
        </Place>
      ))}
    </>
  );
}

/** Soft radial glow ("Light accent" image in Figma). */
export function LightAccent({ className }: { className?: string }) {
  return <div aria-hidden className={cx('pointer-events-none absolute rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.35),transparent)]', className)} />;
}

/* ------------------------------------------------------------------ */
/* Decorative assets                                                   */
/* ------------------------------------------------------------------ */

/** Figma "Line pattern": diagonal hairlines. */
export function LinePattern({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 298 408" className={cx('pointer-events-none', className)} fill="none" stroke="currentColor" aria-hidden>
      {Array.from({ length: 26 }, (_, i) => (
        <path key={i} d={`M${-120 + i * 18} 408 L${180 + i * 18} 0`} />
      ))}
    </svg>
  );
}

/** Figma "_Play button" (Glassmorphism). */
export function HeroPlayButton({ className, label = 'Play video' }: { className?: string; label?: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cx(
        'flex size-16 items-center justify-center rounded-full bg-white/30 text-white ring-1 ring-white/50 backdrop-blur-md transition-colors outline-none ring-inset hover:bg-white/40 focus-visible:ring-4 focus-visible:ring-white/40 md:size-32',
        className,
      )}
    >
      <Play className="size-6 fill-current md:size-12" />
    </button>
  );
}

/** Figma "Video player" (Playing=False, Size=lg): poster + play button + title + progress. */
export function HeroVideoPlayer({ title = 'The future of work', src, className }: { title?: ReactNode; src?: string; className?: string }) {
  return (
    <ImagePlaceholder src={src} tone="cool" ratio="916/516" className={cx('overflow-hidden rounded-lg shadow-3xl', className)}>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      <div className="absolute inset-0 flex items-center justify-center">
        <HeroPlayButton />
      </div>
      <div className="absolute inset-x-4 bottom-4 flex flex-col gap-3 md:inset-x-6 md:bottom-6">
        <span className="text-md font-semibold text-white md:text-lg">{title}</span>
        <span className="relative h-1.5 overflow-hidden rounded-full bg-white/30">
          <span className="absolute inset-y-0 left-0 w-1/4 rounded-full bg-white" />
        </span>
      </div>
    </ImagePlaceholder>
  );
}

/** Hand-drawn curved arrow (Figma "Hand-drawn arrow"). */
export function HandDrawnArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 230 195" className={cx('pointer-events-none', className)} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M6 186C30 120 80 70 150 52c22-6 44-5 66 1" />
      <path d="M188 30l30 23-34 16" />
    </svg>
  );
}

/** Hand-drawn squiggle (Figma "Hand-drawn line" Squiggle). */
export function HandDrawnSquiggle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 852 299" className={cx('pointer-events-none', className)} fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" aria-hidden>
      <path d="M8 250C120 120 190 40 250 90s-40 170 40 150 120-200 220-190 30 180 120 170S760 80 844 40" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* UI fragments                                                        */
/* ------------------------------------------------------------------ */

/** Stack of glassy notification items (iPhone mockup 04). */
export function NotificationQueue({ className }: { className?: string }) {
  return (
    <div className={cx('flex flex-col gap-3', className)}>
      {heroNotifications.map((n, i) => (
        <div
          key={n.name}
          className={cx('flex items-center gap-3 rounded-lg bg-white/90 p-4 shadow-lg ring-1 ring-white backdrop-blur-md', i === 2 && 'opacity-75', i === 3 && 'opacity-50')}
        >
          <Avatar size="md" initials={n.initials} />
          <div className="min-w-0 text-sm">
            <p className="font-semibold text-gray-700">{n.text}</p>
            {n.sub && <p className="text-gray-600">{n.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Two file-upload items (Split image 03). */
export function FileQueue({ className }: { className?: string }) {
  return (
    <div className={cx('flex flex-col gap-3', className)}>
      <FileUploadItem name="My Podcast – Episode 1.mp3" size="20 MB" state="complete" progress={100} className="bg-white/90 shadow-lg backdrop-blur-md" />
      <FileUploadItem name="My Podcast – Episode 2.mp3" size="20 MB" state="in-progress" progress={40} className="bg-white/90 shadow-lg backdrop-blur-md" />
    </div>
  );
}

/** "Create an account" sign-up card (Split form 01/02). */
export function SignupForm({ buttonLabel = 'Get started', className }: { buttonLabel?: ReactNode; className?: string }) {
  return (
    <form className={cx('flex w-full flex-col items-center gap-6 md:gap-8', className)} onSubmit={(e) => e.preventDefault()}>
      <div className="flex w-full flex-col items-center gap-6 text-center">
        <HeroLogomark />
        <div className="flex flex-col gap-2 md:gap-3">
          <h2 className="text-display-xs font-semibold text-gray-900 md:text-display-sm">Create an account</h2>
          <p className="text-md text-gray-600">Start your 30-day free trial.</p>
        </div>
      </div>
      <div className="flex w-full flex-col gap-5">
        <Input label="Name" required placeholder="Enter your name" />
        <Input label="Email" required type="email" placeholder="Enter your email" />
      </div>
      <div className="flex w-full flex-col gap-4">
        <Button type="submit" size="lg" className="w-full">
          {buttonLabel}
        </Button>
        <SocialButton platform="google" theme="color" className="w-full">
          Sign up with Google
        </SocialButton>
      </div>
      <p className="flex justify-center gap-1 text-sm text-gray-600">
        Already have an account?
        <Button as="a" href="#" hierarchy="link-color" size="md">
          Log in
        </Button>
      </p>
    </form>
  );
}

const usersData = [6, 9, 8, 13, 12, 15, 19, 17, 22, 25, 23, 29];

/** "Users over time" chart card + activity-gauge glass circle (Color card 01/02). */
export function ChartsMockup({ s, chart, gauge }: { s: [number, number]; chart: [number, number]; gauge: [number, number] }) {
  return (
    <>
      <Place s={s} x={chart[0]} y={chart[1]} w={800}>
        <div className="@container flex flex-col rounded-xl bg-white p-[4cqw] shadow-xl">
          <span className="text-[max(12px,2.2cqw)] font-medium text-gray-900">Users over time</span>
          <LineChart
            labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']}
            series={[
              { name: 'This year', data: usersData, color: 'text-brand-600' },
              { name: 'Last year', data: usersData.map((v) => v * 0.7), color: 'text-brand-400' },
              { name: 'Before', data: usersData.map((v) => v * 0.45), color: 'text-brand-300' },
            ]}
            area
            height={300}
            className="mt-2 w-full [&_svg]:h-auto"
          />
        </div>
      </Place>
      <Place s={s} x={gauge[0]} y={gauge[1]} w={272}>
        <div className="flex aspect-square items-center justify-center rounded-full bg-white/70 p-[6%] shadow-lg backdrop-blur-sm">
          <ActivityGauge
            size="md"
            label="Active users"
            value="1,000"
            data={[
              { label: 'Total', value: 80, color: 'text-brand-600' },
              { label: 'New', value: 60, color: 'text-brand-400' },
              { label: 'Returning', value: 40, color: 'text-brand-200' },
            ]}
            className="flex! w-full [&>div]:h-auto! [&>div]:w-full! [&>div]:aspect-square [&_svg]:size-full"
          />
        </div>
      </Place>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Geometric shapes                                                    */
/* ------------------------------------------------------------------ */

type Corner = 'tl' | 'tr' | 'br' | 'bl';
const quarter: Record<Corner, string> = { tl: 'rounded-br-full', tr: 'rounded-bl-full', br: 'rounded-tl-full', bl: 'rounded-tr-full' };

/** Geometric shapes 01: 4×5 grid of 148px brand tiles (quarter circles, leaves, pills). */
export function GeometricGrid01() {
  const s: [number, number] = [592, 740];
  const tiles: [number, number, number, string, string][] = [
    // x, y, h, color, shape classes
    [0, 0, 148, 'bg-brand-800', quarter.br],
    [148, 0, 148, 'bg-brand-700', 'rounded-tl-full rounded-br-full'],
    [296, 0, 148, 'bg-brand-300', 'rounded-full'],
    [444, 0, 148, 'bg-brand-400', quarter.bl],
    [0, 148, 148, 'bg-brand-800', 'rounded-tr-full rounded-bl-full'],
    [148, 148, 296, 'bg-brand-500', 'rounded-t-full'],
    [296, 148, 296, 'bg-brand-600', 'rounded-b-full'],
    [444, 148, 148, 'bg-brand-800', quarter.tl],
    [0, 296, 148, 'bg-brand-300', quarter.tr],
    [444, 296, 148, 'bg-brand-300', 'rounded-full'],
    [0, 444, 148, 'bg-brand-400', 'rounded-tl-full rounded-br-full'],
    [148, 444, 148, 'bg-brand-700', quarter.br],
    [296, 444, 148, 'bg-brand-300', quarter.bl],
    [444, 444, 296, 'bg-brand-500', 'rounded-l-full'],
    [0, 592, 148, 'bg-brand-800', quarter.tr],
    [148, 592, 148, 'bg-brand-600', 'rounded-full'],
    [296, 592, 148, 'bg-brand-500', 'rounded-tr-full rounded-bl-full'],
  ];
  return (
    <Stage w={s[0]} h={s[1]}>
      {tiles.map(([x, y, h, c, shape], i) => (
        <Place key={i} s={s} x={x} y={y} w={148} h={h} className={cx(c, shape)} />
      ))}
    </Stage>
  );
}

/** Geometric shapes 02: 3×4 grid mixing photos and brand shapes. */
export function GeometricGrid02({ images = [] }: { images?: string[] }) {
  const s: [number, number] = [592, 804];
  const W = 592 / 3;
  const H = 804 / 4;
  const cells: [number, number, number, string | null][] = [
    [0, 0, 1, null], [1, 0, 1, 'bg-brand-200 rounded-full'], [2, 0, 1, 'bg-brand-700 rounded-tl-full'],
    [0, 1, 1, null], [1, 1, 1, 'bg-brand-300 rounded-br-full'], [2, 1, 1, null],
    [0, 2, 1, 'bg-brand-200 rounded-full'], [1, 2, 2, null],
    [0, 3, 1, null], [1, 3, 1, 'bg-brand-200 rounded-t-full'], [2, 3, 1, null],
  ];
  let img = 0;
  return (
    <Stage w={s[0]} h={s[1]}>
      {cells.map(([cx_, cy, span, cls], i) => (
        <Place key={i} s={s} x={cx_ * W} y={cy * H} w={W * span} h={H}>
          {cls ? (
            <div className={cx('size-full', cls)} />
          ) : (
            <ImagePlaceholder src={images[img++]} tone={(['warm', 'gray', 'cool', 'brand'] as const)[i % 4]} className="size-full" />
          )}
        </Place>
      ))}
    </Stage>
  );
}

type Tile = { bg: string; parts: [string, string][] };
const bauhaus: Tile[] = [
  { bg: 'bg-brand-300', parts: [['bg-white', 'left-0 bottom-0 size-1/2 rounded-tr-full'], ['bg-brand-700', 'right-0 top-0 size-1/2 rounded-bl-full']] },
  { bg: 'bg-brand-200', parts: [['bg-brand-500', 'right-0 top-0 size-1/2 rounded-br-full'], ['bg-brand-700', 'right-0 bottom-0 size-1/2 rounded-tl-full']] },
  { bg: 'bg-white', parts: [['bg-brand-500', 'left-0 top-0 size-1/2 rounded-tr-full'], ['bg-brand-700', 'right-0 bottom-0 size-1/2 rounded-tl-full']] },
  { bg: 'bg-white', parts: [['bg-brand-500', 'right-0 top-0 size-1/2 rounded-bl-full'], ['bg-brand-500', 'left-0 bottom-0 size-1/2 rounded-tr-full']] },
  { bg: 'bg-brand-300', parts: [['bg-brand-700', 'left-0 top-0 h-full w-1/2 rounded-r-full'], ['bg-white', 'left-1/4 top-1/4 size-1/2 rounded-full']] },
  { bg: 'bg-white', parts: [['bg-brand-500', 'left-0 top-0 size-1/2'], ['bg-brand-200', 'right-0 bottom-0 size-1/2']] },
  { bg: 'bg-brand-200', parts: [['bg-brand-700', 'left-0 bottom-0 h-1/2 w-full rounded-t-full'], ['bg-white', 'left-1/4 top-1/4 size-1/2 rounded-full']] },
  { bg: 'bg-brand-300', parts: [['bg-brand-700', 'inset-0 rounded-tl-full'], ['bg-white', 'left-1/4 top-1/4 size-1/2 rounded-full']] },
  { bg: 'bg-brand-200', parts: [['bg-white', 'left-0 top-0 size-1/2 rounded-br-full'], ['bg-brand-500', 'right-0 bottom-0 size-1/2 rounded-tl-full']] },
  { bg: 'bg-brand-200', parts: [['bg-brand-500', 'right-0 top-0 h-full w-1/2 rounded-l-full'], ['bg-white', 'left-0 top-1/4 size-1/2 rounded-full']] },
  { bg: 'bg-white', parts: [['bg-brand-500', 'left-0 top-0 h-full w-1/2 rounded-l-full'], ['bg-brand-700', 'right-0 top-0 h-full w-1/2 rounded-r-full']] },
  { bg: 'bg-white', parts: [['bg-brand-700', 'left-0 top-0 h-full w-1/2 rounded-r-full'], ['bg-brand-300', 'right-0 top-1/4 size-1/2 rounded-full']] },
  { bg: 'bg-brand-300', parts: [['bg-brand-700', 'left-0 top-0 h-full w-1/2 rounded-l-full'], ['bg-white', 'right-0 bottom-0 h-1/2 w-full rounded-t-full']] },
  { bg: 'bg-brand-200', parts: [['bg-brand-700', 'right-0 top-0 size-1/2'], ['bg-white', 'left-0 bottom-0 size-1/2']] },
  { bg: 'bg-white', parts: [['bg-brand-700', 'left-0 top-0 h-1/2 w-full rounded-b-full'], ['bg-brand-500', 'left-0 bottom-0 h-1/2 w-full rounded-t-full']] },
  { bg: 'bg-white', parts: [['bg-brand-500', 'inset-0 rounded-br-full'], ['bg-brand-700', 'left-1/4 top-1/4 size-1/2 rounded-full']] },
];

function BauhausTile({ t }: { t: Tile }) {
  return (
    <div className={cx('relative size-full overflow-hidden', t.bg)}>
      {t.parts.map(([c, pos], i) => (
        <span key={i} className={cx('absolute', c, pos)} />
      ))}
    </div>
  );
}

/** Geometric shapes 03 (4×4 of 180px) / 04 (8×2 of 152px) Bauhaus tile grid. */
export function BauhausGrid({ cols, rows, className }: { cols: number; rows: number; className?: string }) {
  return (
    <div className={cx('grid w-full', className)} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
      {Array.from({ length: cols * rows }, (_, i) => (
        <div key={i} className="aspect-square">
          <BauhausTile t={bauhaus[(i * 5 + Math.floor(i / cols)) % bauhaus.length]} />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Abstract angles background                                          */
/* ------------------------------------------------------------------ */

/** Angled brand bands that extend the brand-50 header area below its bottom edge (Figma "Abstract angles"). */
export function AbstractAngles({ className }: { className?: string }) {
  // Figma frame: 1440 wide, starts 64px above the bottom of the brand-50 section and runs 388px down.
  const band = (x: number, y: number, w: number, h: number, t: number) => {
    const rise = h - t;
    return `${x},${y + rise} ${x + w},${y} ${x + w},${y + t} ${x},${y + h}`;
  };
  return (
    <svg viewBox="0 0 1440 452" preserveAspectRatio="xMidYMin slice" className={cx('pointer-events-none absolute left-1/2 h-[452px] w-[max(1440px,100%)] -translate-x-1/2', className)} aria-hidden>
      <polygon points="-480,0 1920,0 1920,-60 1920,0 1920,0 -480,388" className="fill-brand-50" />
      <polygon points={band(-249, 300, 467, 129, 54)} className="fill-brand-300" />
      <polygon points={band(-80, 208, 467, 129, 54)} className="fill-brand-100" />
      <polygon points={band(1018, 0, 467, 129, 54)} className="fill-brand-300" />
      <polygon points={band(840, 66, 680, 156, 46)} className="fill-brand-200" />
      <polygon points={band(1320, 104, 467, 129, 54)} className="fill-brand-100" />
    </svg>
  );
}
