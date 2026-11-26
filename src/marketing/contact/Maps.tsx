import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Flag, type FlagCode } from '../../components/misc-icons/Flag';

/* ------------------------------------------------------------------------------------------------
 * _Map location marker
 * ---------------------------------------------------------------------------------------------- */

export interface MapLocationMarkerProps extends HTMLAttributes<HTMLDivElement> {
  /** Tooltip title, e.g. "Melbourne, AUS". */
  label?: ReactNode;
  /** Tooltip supporting text (address). */
  supportingText?: ReactNode;
  /** Country flag in the tooltip. */
  flag?: FlagCode;
  /** Pin the tooltip open (Figma State=Hover is shown on the page). Otherwise it shows on hover / focus. */
  open?: boolean;
}

/** MapLocationMarker — Figma "_Map location marker": pulsing brand dot with an address tooltip on hover. */
export const MapLocationMarker = forwardRef<HTMLDivElement, MapLocationMarkerProps>(function MapLocationMarker(
  { label, supportingText, flag, open = false, className, ...props },
  ref,
) {
  const tipId = useId();
  const hasTip = label != null || supportingText != null;
  return (
    <div
      ref={ref}
      tabIndex={hasTip ? 0 : undefined}
      aria-describedby={hasTip ? tipId : undefined}
      aria-label={typeof label === 'string' ? label : undefined}
      data-open={open || undefined}
      className={cx('group/marker relative flex size-10 cursor-pointer items-center justify-center rounded-full outline-none hover:z-20 focus-visible:z-20 data-open:z-10', className)}
      {...props}
    >
      <span className="absolute size-10 rounded-full bg-brand-500/10 transition-all duration-150 group-hover/marker:size-12 group-focus-visible/marker:size-12 group-data-open/marker:size-12" aria-hidden />
      <span className="absolute size-6 rounded-full bg-brand-500/20 transition-all duration-150 group-hover/marker:size-7 group-focus-visible/marker:size-7 group-data-open/marker:size-7" aria-hidden />
      <span className="relative size-2 rounded-full bg-brand-500" aria-hidden />
      {hasTip && (
        <div
          id={tipId}
          role="tooltip"
          className={cx(
            'pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 w-45 -translate-x-1/2 opacity-0 transition-opacity duration-150',
            'group-hover/marker:opacity-100 group-focus-visible/marker:opacity-100 group-data-open/marker:opacity-100',
          )}
        >
          <div className="flex flex-col items-center gap-2 rounded-lg bg-white px-4 py-3 text-center shadow-lg">
            {flag && <Flag code={flag} size={20} title="" />}
            <div className="flex flex-col gap-1">
              {label != null && <p className="text-sm font-medium text-gray-900">{label}</p>}
              {supportingText != null && <p className="text-sm text-gray-600">{supportingText}</p>}
            </div>
          </div>
          <svg className="mx-auto -mt-px block h-1.5 w-4 text-white" viewBox="0 0 16 6" aria-hidden>
            <path d="M0 0h16L9.4 5.3a2 2 0 0 1-2.8 0z" fill="currentColor" />
          </svg>
        </div>
      )}
    </div>
  );
});

/* ------------------------------------------------------------------------------------------------
 * _Vector map — stylised dotted world map (equirectangular, lon -180…180, lat 86…-56)
 * ---------------------------------------------------------------------------------------------- */

type Poly = [number, number][];
// Coarse continent outlines in [lon, lat]. Hand-drawn approximation — the dots hide the coarseness.
const LAND: Poly[] = [
  // North America
  [[-168, 66], [-160, 71], [-140, 70], [-120, 72], [-95, 72], [-80, 73], [-62, 66], [-55, 52], [-66, 45], [-75, 40], [-81, 31], [-80, 25], [-90, 29], [-97, 26], [-97, 20], [-87, 21], [-83, 10], [-78, 8], [-85, 12], [-92, 15], [-105, 20], [-112, 30], [-118, 34], [-124, 40], [-124, 48], [-133, 56], [-150, 60], [-165, 60]],
  // Arctic islands
  [[-120, 75], [-95, 82], [-70, 82], [-80, 74], [-100, 74]],
  // Greenland
  [[-73, 78], [-60, 82], [-30, 83], [-20, 75], [-40, 65], [-50, 62], [-58, 70]],
  // South America
  [[-80, 8], [-72, 12], [-60, 8], [-50, 0], [-35, -6], [-38, -15], [-48, -26], [-58, -38], [-65, -42], [-68, -52], [-74, -50], [-72, -35], [-71, -18], [-81, -5]],
  // Europe
  [[-10, 36], [-9, 43], [-2, 44], [-5, 48], [2, 51], [8, 54], [5, 58], [12, 65], [20, 70], [30, 71], [40, 67], [45, 55], [40, 45], [28, 41], [22, 37], [15, 38], [12, 44], [5, 43], [-2, 36]],
  // UK + Ireland
  [[-5, 50], [1, 51], [-1, 55], [-3, 58], [-6, 57], [-5, 54]],
  [[-10, 52], [-6, 52], [-6, 55], [-10, 54]],
  // Iceland
  [[-24, 64], [-14, 64], [-14, 66], [-22, 66.5]],
  // Africa
  [[-17, 15], [-17, 21], [-10, 30], [-6, 36], [10, 37], [20, 32], [32, 31], [35, 28], [43, 12], [51, 12], [42, -2], [40, -15], [35, -25], [20, -35], [17, -30], [12, -17], [13, -5], [9, 4], [-8, 5], [-15, 10]],
  // Madagascar
  [[44, -25], [47, -25], [50, -15], [49, -12], [44, -16]],
  // Asia
  [[36, 36], [40, 45], [45, 55], [40, 67], [60, 70], [80, 73], [100, 78], [120, 73], [140, 72], [160, 70], [180, 68], [178, 62], [160, 60], [155, 52], [142, 47], [135, 43], [128, 38], [122, 30], [120, 22], [108, 18], [106, 10], [100, 13], [98, 8], [93, 20], [88, 22], [80, 13], [77, 8], [72, 20], [66, 25], [57, 25], [52, 27], [48, 30], [44, 13], [35, 28]],
  // Arabia
  [[35, 28], [44, 13], [52, 16], [59, 22], [56, 26], [50, 25], [48, 30]],
  // Japan
  [[130, 31], [135, 34], [140, 36], [142, 40], [141, 45], [139, 40], [133, 34]],
  // Indonesia / PNG
  [[95, 5], [105, -6], [115, -8], [125, -9], [135, -4], [148, -8], [141, -3], [130, 0], [118, 5], [108, 2], [100, 2]],
  // Philippines
  [[120, 18], [124, 13], [126, 7], [122, 8], [120, 13]],
  // Australia
  [[114, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [151, -34], [146, -39], [140, -38], [135, -35], [129, -32], [115, -34], [113, -26]],
  // New Zealand
  [[172, -34], [178, -38], [175, -42], [170, -46], [167, -46], [172, -41]],
];

const MAP_W = 1024;
const MAP_H = 488;
/** lon/lat → px in the 1024×488 Figma map frame (fitted to the Figma marker positions). */
const project = (lon: number, lat: number): [number, number] => [((48.3 + lon * 0.2764) / 100) * MAP_W, ((60.4 - lat * 0.7025) / 100) * MAP_H];
const PROJECTED = LAND.map((p) => p.map(([lo, la]) => project(lo, la)));

function inside(x: number, y: number, poly: [number, number][]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

let dotCache: string | null = null;
/** One SVG path with all land dots (computed once). */
function landDots(step = 9.6, r = 2.4) {
  if (dotCache) return dotCache;
  let d = '';
  for (let y = step / 2; y < MAP_H; y += step) {
    for (let x = step / 2; x < MAP_W; x += step) {
      if (PROJECTED.some((p) => inside(x, y, p))) d += `M${(x - r).toFixed(1)} ${y.toFixed(1)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
    }
  }
  dotCache = d;
  return d;
}

export interface VectorMapLocation {
  /** Position in % of the map width / height (0–100). */
  x: number;
  y: number;
  label?: ReactNode;
  supportingText?: ReactNode;
  flag?: FlagCode;
  /** Tooltip pinned open. */
  open?: boolean;
}

export interface ContactVectorMapProps extends HTMLAttributes<HTMLDivElement> {
  /** Markers (Figma "_Map location marker"). */
  locations?: VectorMapLocation[];
}

/** Default marker positions from the Figma "Vector map" sections. */
export const defaultContactMapLocations: VectorMapLocation[] = [
  { x: 88.4, y: 87.3, label: 'Melbourne, AUS', supportingText: '100 Smith Street Collingwood VIC 3066 AU', flag: 'AU', open: true },
  { x: 95.5, y: 91, label: 'Auckland, NZ', supportingText: '100 Queen Street Auckland 1010 NZ', flag: 'NZ' },
  { x: 14.6, y: 36.3, label: 'San Francisco, USA', supportingText: '100 Market Street San Francisco, CA 94105', flag: 'US' },
  { x: 17.4, y: 45.9, label: 'Los Angeles, USA', supportingText: '100 Sunset Blvd Los Angeles, CA 90028', flag: 'US' },
  { x: 52.8, y: 24, label: 'London, UK', supportingText: '100 Oxford Street London W1D 1LL UK', flag: 'GB' },
  { x: 68.2, y: 50, label: 'Mumbai, IN', supportingText: '100 Marine Drive Mumbai 400020 IN', flag: 'IN' },
  { x: 84.3, y: 44.9, label: 'Tokyo, JP', supportingText: '100 Chuo-dori Ginza Tokyo 104-0061 JP', flag: 'JP' },
  { x: 58.7, y: 19, label: 'Stockholm, SE', supportingText: 'Drottninggatan 100 111 60 Stockholm SE', flag: 'SE' },
  { x: 52, y: 40.2, label: 'Algiers, DZ', supportingText: '100 Rue Didouche Mourad Algiers DZ', flag: 'DZ' },
];

/** ContactVectorMap — Figma "_Vector map" + markers: a dotted world map (1024×488 aspect). */
export const ContactVectorMap = forwardRef<HTMLDivElement, ContactVectorMapProps>(function ContactVectorMap(
  { locations = defaultContactMapLocations, className, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('relative w-full max-w-[1024px]', className)} style={{ aspectRatio: `${MAP_W}/${MAP_H}` }} {...props}>
      <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 size-full" aria-hidden>
        <path d={landDots()} className="fill-gray-300" />
      </svg>
      {locations.map((l, i) => (
        <MapLocationMarker
          key={i}
          label={l.label}
          supportingText={l.supportingText}
          flag={l.flag}
          open={l.open}
          className="absolute -translate-x-1/2 -translate-y-1/2 scale-75 md:scale-100"
          style={{ left: `${l.x}%`, top: `${l.y}%` }}
        />
      ))}
    </div>
  );
});

/* ------------------------------------------------------------------------------------------------
 * _Google maps mockup — stylised street map placeholder (no network / no real tiles)
 * ---------------------------------------------------------------------------------------------- */

export interface ContactMapMockupProps extends HTMLAttributes<HTMLDivElement> {
  /** Real map image / iframe screenshot; replaces the drawn placeholder. */
  src?: string;
  alt?: string;
  /** Hide the zoom / map-type controls. */
  hideControls?: boolean;
  /** Embed your own map (e.g. an `<iframe>`); replaces the placeholder. */
  children?: ReactNode;
}

/** ContactMapMockup — Figma "_Google maps mockup": a stylised street map with a pin and map controls. */
export const ContactMapMockup = forwardRef<HTMLDivElement, ContactMapMockupProps>(function ContactMapMockup(
  { src, alt = 'Map', hideControls = false, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} className={cx('relative min-h-60 overflow-hidden bg-[#e9ecef]', className)} {...props}>
      {children ?? (src ? (
        <img src={src} alt={alt} className="absolute inset-0 size-full object-cover" />
      ) : (
        <>
          <svg viewBox="0 0 720 720" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" role="img" aria-label={alt}>
            <rect width="720" height="720" fill="#eef0f2" />
            {/* blocks */}
            <g fill="#e2e5e9">
              {Array.from({ length: 7 }).map((_, r) =>
                Array.from({ length: 8 }).map((__, c) => (r * 8 + c) % 5 === 0 ? null : (
                  <rect key={`${r}-${c}`} x={c * 92 + 14} y={r * 74 + 10} width="64" height="46" rx="4" />
                )),
              )}
            </g>
            {/* parks + water */}
            <path d="M-20 520 C 80 480 160 560 260 540 S 420 600 520 560 740 600 740 600 V 740 H -20 Z" fill="#c9e7f5" />
            <rect x="420" y="120" width="150" height="110" rx="10" fill="#d4ecd0" />
            <rect x="70" y="250" width="110" height="130" rx="10" fill="#d4ecd0" />
            <circle cx="600" cy="420" r="46" fill="#d4ecd0" />
            {/* streets */}
            <g stroke="#ffffff" strokeLinecap="round">
              {Array.from({ length: 8 }).map((_, i) => <line key={`h${i}`} x1="-10" x2="730" y1={i * 74 + 66} y2={i * 74 + 66} strokeWidth="9" />)}
              {Array.from({ length: 9 }).map((_, i) => <line key={`v${i}`} y1="-10" y2="730" x1={i * 92 + 4} x2={i * 92 + 4} strokeWidth="9" />)}
            </g>
            {/* main roads */}
            <path d="M-20 140 L 300 300 L 740 330" stroke="#fde293" strokeWidth="14" fill="none" strokeLinecap="round" />
            <path d="M-20 140 L 300 300 L 740 330" stroke="#f9d36b" strokeWidth="2" fill="none" opacity=".6" />
            <path d="M260 -20 L 340 740" stroke="#ffffff" strokeWidth="16" fill="none" />
            <path d="M260 -20 L 340 740" stroke="#e5e7eb" strokeWidth="1" fill="none" />
          </svg>
          {/* pin */}
          <svg viewBox="0 0 24 32" className="absolute top-1/2 left-1/2 h-9 w-7 -translate-x-1/2 -translate-y-full drop-shadow" aria-hidden>
            <ellipse cx="12" cy="30" rx="4" ry="2" fill="rgb(0 0 0 / 0.12)" />
            <path d="M12 1C6.5 1 2 5.3 2 10.7 2 18 12 27 12 27s10-9 10-16.3C22 5.3 17.5 1 12 1Z" fill="#ea382e" stroke="#b3261e" strokeWidth="1" />
            <circle cx="12" cy="10.5" r="4" fill="rgb(0 0 0 / 0.4)" />
          </svg>
        </>
      ))}
      {!hideControls && !children && (
        <>
          <div className="absolute top-2.5 left-2.5 flex h-[29px] items-stretch overflow-hidden rounded-sm bg-white text-[11px] shadow-[0_1px_3px_rgb(0_0_0/0.2)]" aria-hidden>
            <span className="flex items-center px-2.5 font-medium text-black">Map</span>
            <span className="my-1 w-px bg-[#f2f2f2]" />
            <span className="flex items-center px-2.5 text-[#565656]">Satellite</span>
          </div>
          <div className="absolute right-2.5 bottom-6 flex w-7 flex-col items-center overflow-hidden rounded-sm bg-white shadow-[0_1px_3px_rgb(0_0_0/0.2)]" aria-hidden>
            <span className="flex h-[26px] items-center text-lg leading-none text-[#666]">+</span>
            <span className="h-px w-5 bg-[#e6e6e6]" />
            <span className="flex h-[26px] items-center text-lg leading-none text-[#666]">−</span>
          </div>
        </>
      )}
    </div>
  );
});
