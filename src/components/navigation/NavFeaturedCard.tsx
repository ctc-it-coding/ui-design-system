import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { CloseButton } from '../buttons/CloseButton';
import { Play } from '../../icons';
import { useNavTheme, type NavTheme } from './navTheme';

export type NavFeaturedCardType = 'progress-bar' | 'image' | 'progress-circle';

export interface NavFeaturedCardAction {
  label: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface NavFeaturedCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: NavFeaturedCardType;
  /** Figma: Theme — defaults to the surrounding navigation's theme. */
  theme?: NavTheme;
  title: ReactNode;
  supportingText?: ReactNode;
  /** Progress value 0–100 for the progress bar / circle types. */
  progress?: number;
  /** Image type: image src or custom node. */
  image?: string | ReactNode;
  imageAlt?: string;
  /** Image type: shows the glass play button over the image. */
  playButton?: boolean;
  /** Shows the close X; called on click. */
  onDismiss?: () => void;
  /** Figma "_Nav featured card button" Hierarchy=Secondary (left). */
  secondaryAction?: NavFeaturedCardAction;
  /** Figma "_Nav featured card button" Hierarchy=Primary (right). */
  primaryAction?: NavFeaturedCardAction;
}

const themeSt: Record<NavTheme, { card: string; title: string; text: string; primary: string; secondary: string; track: string; fill: string; imageBg: string }> = {
  default: {
    card: 'bg-gray-50',
    title: 'text-gray-900',
    text: 'text-gray-600',
    primary: 'text-brand-700 hover:text-brand-800',
    secondary: 'text-gray-600 hover:text-gray-700',
    track: 'stroke-gray-200 bg-gray-200',
    fill: 'stroke-brand-600 bg-brand-600',
    imageBg: 'bg-gray-200',
  },
  brand: {
    card: 'bg-brand-600',
    title: 'text-white',
    text: 'text-brand-200',
    primary: 'text-white hover:text-brand-200',
    secondary: 'text-brand-200 hover:text-brand-300',
    track: 'stroke-brand-500 bg-brand-500',
    fill: 'stroke-white bg-white',
    imageBg: 'bg-brand-100',
  },
  dark: {
    card: 'bg-gray-800',
    title: 'text-white',
    text: 'text-gray-200',
    primary: 'text-white hover:text-gray-200',
    secondary: 'text-gray-300 hover:text-gray-200',
    track: 'stroke-gray-600 bg-gray-600',
    fill: 'stroke-brand-500 bg-brand-500',
    imageBg: 'bg-gray-700',
  },
};

function ActionLink({ action, cls, ring }: { action: NavFeaturedCardAction; cls: string; ring: string }) {
  const c = cx('cursor-pointer rounded-sm text-sm font-medium outline-none transition-colors duration-100 focus-visible:ring-4', ring, cls);
  return action.href ? (
    <a href={action.href} onClick={action.onClick} className={c}>
      {action.label}
    </a>
  ) : (
    <button type="button" onClick={action.onClick} className={c}>
      {action.label}
    </button>
  );
}

/** NavFeaturedCard — Figma "_Nav featured card" (progress bar / image / progress circle). */
export const NavFeaturedCard = forwardRef<HTMLDivElement, NavFeaturedCardProps>(function NavFeaturedCard(
  {
    type = 'progress-bar',
    theme,
    title,
    supportingText,
    progress = 80,
    image,
    imageAlt = '',
    playButton = true,
    onDismiss,
    secondaryAction = { label: 'Dismiss' },
    primaryAction = { label: 'Upgrade plan' },
    className,
    ...props
  },
  ref,
) {
  const t = useNavTheme(theme);
  const st = themeSt[t];
  const pct = Math.min(100, Math.max(0, progress));
  const ring = t === 'brand' ? 'focus-visible:ring-brand-500/24' : 'focus-visible:ring-gray-400/14';

  const close = onDismiss && (
    <CloseButton
      size="sm"
      dark={t !== 'default'}
      label="Dismiss"
      onClick={onDismiss}
      className={cx('absolute', type === 'progress-circle' ? 'top-2 right-2' : 'top-2 right-2')}
    />
  );

  const text = (
    <div className={cx('flex flex-col gap-1', onDismiss && type !== 'progress-circle' && 'pr-6')}>
      <p className={cx('text-sm font-medium', st.title)}>{title}</p>
      {supportingText != null && <p className={cx('text-sm', st.text)}>{supportingText}</p>}
    </div>
  );

  const r = 27; // 64px box, 6px stroke
  const circ = 2 * Math.PI * r;

  return (
    <div ref={ref} className={cx('relative flex flex-col gap-4 rounded-lg px-4 py-5', st.card, className)} {...props}>
      {close}
      {type === 'progress-circle' && (
        <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} className="relative size-16">
          <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
            <circle cx="32" cy="32" r={r} fill="none" strokeWidth="6" className={st.track.split(' ')[0]} />
            <circle
              cx="32"
              cy="32"
              r={r}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - pct / 100)}
              className={st.fill.split(' ')[0]}
            />
          </svg>
          <span className={cx('absolute inset-0 flex items-center justify-center text-sm font-semibold', st.title)}>{Math.round(pct)}%</span>
        </div>
      )}
      {text}
      {type === 'progress-bar' && (
        <div role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100} className={cx('h-2 w-full overflow-hidden rounded-full', st.track.split(' ')[1])}>
          <div className={cx('h-full rounded-full', st.fill.split(' ')[1])} style={{ width: `${pct}%` }} />
        </div>
      )}
      {type === 'image' && (
        <div className={cx('relative h-34 w-full overflow-hidden rounded-md', st.imageBg)}>
          {typeof image === 'string' ? <img src={image} alt={imageAlt} className="size-full object-cover" /> : image}
          <span className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-black/8 ring-inset" />
          {playButton && (
            <span className="absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 text-white backdrop-blur" aria-hidden>
              <Play className="size-5 fill-current" />
            </span>
          )}
        </div>
      )}
      {(secondaryAction || primaryAction) && (
        <div className="flex items-center gap-3">
          {secondaryAction && <ActionLink action={secondaryAction} cls={st.secondary} ring={ring} />}
          {primaryAction && <ActionLink action={primaryAction} cls={st.primary} ring={ring} />}
        </div>
      )}
    </div>
  );
});
