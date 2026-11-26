import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { Play } from '../../icons';
import { cx } from '../../utils/cx';
import { Button, type ButtonProps } from '../buttons/Button';

export interface InlineCTAAction extends Omit<Partial<ButtonProps>, 'children'> {
  label: ReactNode;
}

export interface InlineCTAProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  description?: ReactNode;
  /** Figma Type=Image: media shown left (desktop, 239px) / on top (mobile, 200px). Pass an `<img>` or any node. */
  media?: ReactNode;
  /** Glass play button over the media (video teaser). */
  playButton?: boolean;
  /** Secondary-gray button (md). On mobile buttons stack full width with the primary on top. */
  secondaryAction?: InlineCTAAction;
  /** Primary button (md). */
  primaryAction?: InlineCTAAction;
  /** Custom actions node; replaces secondaryAction / primaryAction. */
  actions?: ReactNode;
  /** Content between the heading and the actions (form row, plan card, list …). */
  children?: ReactNode;
}

/** Responsive button pair used by inline CTAs. */
export function InlineCTAButtons({ secondary, primary, size = 'md' }: { secondary?: InlineCTAAction; primary?: InlineCTAAction; size?: ButtonProps['size'] }) {
  if (!secondary && !primary) return null;
  const render = (a: InlineCTAAction, hierarchy: ButtonProps['hierarchy']) => {
    const { label, className, ...rest } = a;
    return (
      <Button size={size} hierarchy={hierarchy} {...rest} className={cx('w-full sm:w-auto', className)}>
        {label}
      </Button>
    );
  };
  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row">
      {secondary && render(secondary, 'secondary-gray')}
      {primary && render(primary, 'primary')}
    </div>
  );
}

function PlayGlass() {
  return (
    <span className="flex size-14 items-center justify-center rounded-full bg-white/30 text-white ring-1 ring-white/40 backdrop-blur-md sm:size-12">
      <Play className="size-6 translate-x-px fill-current sm:size-5" />
    </span>
  );
}

/**
 * InlineCTA — Figma "Inline CTAs/Inline CTA": white card (r12, shadow-xs) with heading,
 * supporting text, optional media and actions. Building block for the typed variants.
 */
export const InlineCTA = forwardRef<HTMLDivElement, InlineCTAProps>(function InlineCTA(
  { title, description, media, playButton = false, secondaryAction, primaryAction, actions, children, className, ...props },
  ref,
) {
  const acts = actions !== undefined ? actions : <InlineCTAButtons secondary={secondaryAction} primary={primaryAction} />;
  return (
    <div
      ref={ref}
      className={cx('flex w-full overflow-hidden rounded-xl bg-white shadow-xs ring-1 ring-gray-200', media ? 'flex-col sm:flex-row' : 'flex-col', className)}
      {...props}
    >
      {media && (
        <div className="relative h-[200px] shrink-0 sm:h-auto sm:min-h-40 sm:w-[239px]">
          <div className="absolute inset-0 overflow-hidden rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl [&>img]:size-full [&>img]:object-cover">
            {media}
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-black/8" />
          </div>
          {playButton && (
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayGlass />
            </div>
          )}
        </div>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-5 px-4 py-5 sm:p-6">
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {description != null && <div className="text-sm text-gray-600">{description}</div>}
        </div>
        {children}
        {acts}
      </div>
    </div>
  );
});
