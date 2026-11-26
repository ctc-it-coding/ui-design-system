import { forwardRef, useCallback, useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { PlayButton } from './PlayButton';

export interface VideoPlayerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Size — lg 560×315 (r8), sm 240×136 (r6). Fluid up to that width (16:9). */
  size?: 'sm' | 'lg';
  /** Video URL. Without it the player simulates playback over `duration`. */
  src?: string;
  /** Poster image URL (otherwise a soft gradient placeholder). */
  poster?: string;
  /** Figma: Playing (controlled) */
  playing?: boolean;
  defaultPlaying?: boolean;
  onPlayingChange?: (playing: boolean) => void;
  /** Title shown while paused (Figma "How to get started"). */
  title?: ReactNode;
  /** Badge (lg) / supporting text (sm) shown while paused (Figma "Part 1"). */
  label?: ReactNode;
  /** Duration in seconds used when there is no `src` (Figma 8:24). */
  duration?: number;
  /** Play button style. */
  playButton?: 'glassmorphism' | 'outline';
}

const fmt = (s: number) => {
  if (!Number.isFinite(s)) return '0:00';
  const m = Math.floor(s / 60), sec = Math.floor(s % 60);
  return `${m}:${String(sec).padStart(2, '0')}`;
};

/** VideoPlayer — Figma "Video player" + "_Video progress": poster with title & play button, custom progress bar/scrubber. */
export const VideoPlayer = forwardRef<HTMLDivElement, VideoPlayerProps>(function VideoPlayer(
  { size = 'lg', src, poster, playing: playingProp, defaultPlaying = false, onPlayingChange, title = 'How to get started', label = 'Part 1', duration = 504, playButton = 'glassmorphism', className, ...props },
  ref,
) {
  const [inner, setInner] = useState(defaultPlaying);
  const playing = playingProp ?? inner;
  const setPlaying = useCallback((p: boolean) => { if (playingProp === undefined) setInner(p); onPlayingChange?.(p); }, [playingProp, onPlayingChange]);
  const video = useRef<HTMLVideoElement>(null);
  const [time, setTime] = useState(0);
  const [total, setTotal] = useState(src ? 0 : duration);
  const [buffered, setBuffered] = useState(src ? 0 : duration * 0.8);

  // sync <video> with playing state
  useEffect(() => {
    const v = video.current; if (!v) return;
    if (playing) void v.play().catch(() => setPlaying(false)); else v.pause();
  }, [playing, setPlaying]);
  // simulated playback without src
  useEffect(() => {
    if (src || !playing) return;
    const t = setInterval(() => setTime((x) => { if (x + 1 >= duration) { setPlaying(false); return 0; } return x + 1; }), 1000);
    return () => clearInterval(t);
  }, [src, playing, duration, setPlaying]);

  const seek = (ratio: number) => {
    const t = Math.max(0, Math.min(1, ratio)) * total;
    if (video.current) video.current.currentTime = t;
    setTime(t);
  };
  const onBar = (e: MouseEvent<HTMLDivElement>) => { const r = e.currentTarget.getBoundingClientRect(); seek((e.clientX - r.left) / r.width); };
  const onBarKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); seek((time + 5) / total); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); seek((time - 5) / total); }
  };
  const lg = size === 'lg';
  const pct = total ? (time / total) * 100 : 0;
  const bpct = total ? (buffered / total) * 100 : 0;

  return (
    <div
      ref={ref}
      className={cx('group/video relative aspect-video w-full overflow-hidden bg-gradient-to-b from-blue-light-300 via-purple-200 to-pink-300', lg ? 'max-w-[560px] rounded-lg' : 'max-w-[240px] rounded-md', className)}
      {...props}
    >
      {src ? (
        <video
          ref={video}
          src={src}
          poster={poster}
          playsInline
          className="absolute inset-0 size-full object-cover"
          onClick={() => setPlaying(!playing)}
          onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setTotal(e.currentTarget.duration)}
          onProgress={(e) => { const b = e.currentTarget.buffered; if (b.length) setBuffered(b.end(b.length - 1)); }}
          onEnded={() => setPlaying(false)}
        />
      ) : poster ? (
        <img src={poster} alt="" className="absolute inset-0 size-full object-cover" />
      ) : null}
      {!playing && <div className="pointer-events-none absolute inset-0 bg-black/10" />}
      {lg && <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[37%] bg-gradient-to-b from-black/0 to-black/40" />}

      {!playing && (title != null || label != null) && (
        <div className={cx('pointer-events-none absolute flex flex-col text-white', lg ? 'bottom-[76px] left-6 gap-1' : 'bottom-3 left-3 gap-0.5')}>
          {label != null && (lg
            ? <span className="w-fit rounded-full border border-white/30 bg-white/30 px-2.5 py-0.5 text-sm font-medium">{label}</span>
            : <span className="text-xs font-medium opacity-80">{label}</span>)}
          {title != null && <span className={cx(lg ? 'text-xl font-semibold sm:text-display-md sm:leading-none' : 'text-sm font-medium')}>{title}</span>}
        </div>
      )}
      {!playing && (
        <PlayButton
          variant={playButton}
          size={lg ? 80 : 56}
          onClick={() => setPlaying(true)}
          className={cx('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2', lg && 'max-sm:size-14!')}
        />
      )}
      {playing && !src && <button type="button" aria-label="Pause" className="absolute inset-0" onClick={() => setPlaying(false)} />}

      {lg && (
        <div className="absolute inset-x-4 bottom-2 flex flex-col">
          <div className="flex h-5 items-center gap-3">
            <button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={() => setPlaying(!playing)} className="flex size-4 shrink-0 items-center justify-center rounded-sm text-white outline-none focus-visible:ring-2 focus-visible:ring-white/60">
              {playing ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><rect x="0.5" width="4" height="12" rx="1" /><rect x="7.5" width="4" height="12" rx="1" /></svg>
              ) : (
                <svg width="12" height="14" viewBox="0 0 11.5 13.5" fill="currentColor"><path d="M0 1.6C0 .4 1.3-.3 2.3.3l8.6 5.1c1 .6 1 2 0 2.6L2.3 13.2C1.3 13.8 0 13.1 0 11.9V1.6Z" /></svg>
              )}
            </button>
            <div
              role="slider"
              tabIndex={0}
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={Math.round(total)}
              aria-valuenow={Math.round(time)}
              aria-valuetext={`${fmt(time)} of ${fmt(total)}`}
              onClick={onBar}
              onKeyDown={onBarKey}
              className="relative h-2 flex-1 cursor-pointer rounded outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            >
              <div className="absolute inset-0 rounded bg-white/30" />
              <div className="absolute inset-y-0 left-0 rounded bg-white/50" style={{ width: `${bpct}%` }} />
              <div className="absolute inset-y-0 left-0 min-w-2 rounded bg-white" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <div className="flex justify-between text-xs font-semibold text-white">
            <span>{fmt(time)}</span>
            <span>{fmt(total)}</span>
          </div>
        </div>
      )}
    </div>
  );
});
