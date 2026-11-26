import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { ImagePlaceholder } from '../_shared';
import { Play } from '../../icons';
import type { NavLink, NavMenuCardType } from './types';

export interface NavMenuItemCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type (Video card / Feature card / Image card) */
  type?: NavMenuCardType;
  /** Figma: Stacked (Horizontal = image left, Vertical = image on top). Mobile always stacks vertically. */
  stacked?: 'horizontal' | 'vertical';
  title: ReactNode;
  description?: ReactNode;
  href?: string;
  imageSrc?: string;
  imageAlt?: string;
  /** Link buttons (two → link-gray + link-color, one → link-color). */
  actions?: NavLink[];
  /** Figma: Breakpoint=Mobile */
  mobile?: boolean;
}

/** Glassmorphism "_Play button". */
function PlayButton({ size = 'md' }: { size?: 'md' | 'lg' }) {
  return (
    <span
      className={cx(
        'absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/30 shadow-[0_4px_16px_rgba(0,0,0,0.25)] ring-1 ring-white/40 backdrop-blur-md',
        size === 'lg' ? 'size-14' : 'size-12',
      )}
      aria-hidden
    >
      <Play className={cx('ml-0.5 fill-white text-white', size === 'lg' ? 'size-6' : 'size-5')} />
    </span>
  );
}

/** NavMenuItemCard — Figma "_Nav menu item card" (video / feature / image card inside menus). */
export const NavMenuItemCard = forwardRef<HTMLDivElement, NavMenuItemCardProps>(function NavMenuItemCard(
  { type = 'feature', stacked = 'horizontal', title, description, href, imageSrc, imageAlt, actions = [], mobile, className, ...props },
  ref,
) {
  const horizontal = stacked === 'horizontal' && !mobile;
  const imgBox = horizontal
    ? type === 'image' ? 'h-20 w-36' : 'h-[104px] w-44'
    : mobile && type === 'feature' ? 'h-[200px] w-full' : 'h-[136px] w-full';
  return (
    <div
      ref={ref}
      className={cx(
        'group/card relative flex transition-colors duration-100 hover:bg-gray-50',
        horizontal ? 'flex-row gap-6' : 'flex-col gap-6',
        mobile ? 'px-4 py-3' : 'rounded-lg p-3',
        className,
      )}
      {...props}
    >
      <ImagePlaceholder
        src={imageSrc}
        alt={imageAlt}
        tone={type === 'video' ? 'cool' : type === 'feature' ? 'brand' : 'gray'}
        className={cx('shrink-0 rounded-md', imgBox)}
      >
        {type !== 'image' && <PlayButton size={mobile && type === 'feature' ? 'lg' : 'md'} />}
      </ImagePlaceholder>
      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1">
          <p className="text-md font-medium text-gray-900">
            {href ? (
              <a href={href} className="outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-4 focus-visible:after:ring-gray-400/14">
                {title}
              </a>
            ) : (
              title
            )}
          </p>
          {description != null && <p className="line-clamp-2 text-sm text-gray-600">{description}</p>}
        </div>
        {actions.length > 0 && (
          <div className="relative z-10 flex gap-3">
            {actions.map((a, i) => (
              <Button
                key={i}
                size="sm"
                hierarchy={actions.length > 1 && i === 0 ? 'link-gray' : 'link-color'}
                as={a.href ? 'a' : 'button'}
                href={a.href}
                onClick={a.onClick}
                iconLeading={a.icon}
              >
                {a.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
