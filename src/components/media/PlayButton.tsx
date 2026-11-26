import { forwardRef, useId, type ButtonHTMLAttributes } from 'react';
import { cx } from '../../utils/cx';

export interface PlayButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Style — glassmorphism (frosted disc with a cut-out triangle) or outline (3px white ring) */
  variant?: 'glassmorphism' | 'outline';
  /** Diameter px (Figma 80; sm video player uses 56). */
  size?: number;
  /** Shows a pause glyph instead of play. */
  playing?: boolean;
  label?: string;
}

const PLAY = 'M0 3.6C0 .9 2.9-.8 5.3.5l20.6 11.5c2.4 1.4 2.4 4.8 0 6.1L5.3 29.5C2.9 30.8 0 29.1 0 26.4V3.6Z';

/** PlayButton — Figma "_Play button". Hover state via CSS. */
export const PlayButton = forwardRef<HTMLButtonElement, PlayButtonProps>(function PlayButton(
  { variant = 'glassmorphism', size = 80, playing = false, label, className, style, type = 'button', ...props },
  ref,
) {
  const mid = 'pb' + useId().replace(/:/g, '');
  const glyph = playing ? (
    <g fill="#fff"><rect x="29" y="25" width="8" height="30" rx="2.5" /><rect x="43" y="25" width="8" height="30" rx="2.5" /></g>
  ) : null;
  return (
    <button
      ref={ref}
      type={type}
      aria-label={label ?? (playing ? 'Pause' : 'Play')}
      className={cx(
        'group/play inline-flex shrink-0 items-center justify-center rounded-full backdrop-blur-sm transition duration-100 outline-none focus-visible:ring-4 focus-visible:ring-white/40',
        variant === 'outline' && 'shadow-[inset_0_0_0_3px_#fff] hover:bg-white/10',
        className,
      )}
      style={{ width: size, height: size, ...style }}
      {...props}
    >
      <svg viewBox="0 0 80 80" className="size-full" aria-hidden>
        {variant === 'glassmorphism' ? (
          <>
            <defs>
              <mask id={mid}>
                <rect width="80" height="80" fill="#fff" />
                {playing ? <g fill="#000"><rect x="29" y="25" width="8" height="30" rx="2.5" /><rect x="43" y="25" width="8" height="30" rx="2.5" /></g> : <path d={PLAY} transform="translate(30 25)" fill="#000" />}
              </mask>
            </defs>
            <g mask={`url(#${mid})`}>
              <circle cx="40" cy="40" r="40" fill="#000" fillOpacity="0.1" />
              <circle cx="40" cy="40" r="40" className="fill-white/30 transition-colors group-hover/play:fill-white/50" />
            </g>
          </>
        ) : (
          glyph ?? <path d={PLAY} transform="translate(30 25)" fill="#fff" />
        )}
      </svg>
    </button>
  );
});
