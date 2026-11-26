import { forwardRef, useState, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { User01 } from '../../icons';
import { VerifiedTick } from './Avatar';

export type AvatarProfilePhotoSize = 'sm' | 'md' | 'lg';

export interface AvatarProfilePhotoProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma: Size (sm 72px, md 96px, lg 160px) */
  size?: AvatarProfilePhotoSize;
  src?: string;
  alt?: string;
  /** Figma: Text=True — initials when there is no image. */
  initials?: string;
  /** Shows the verified tick. */
  verified?: boolean;
}

const s: Record<AvatarProfilePhotoSize, { box: string; ring: string; shadow: string; icon: string; text: string; tick: string }> = {
  sm: { box: 'size-18', ring: 'ring-3', shadow: 'shadow-md', icon: 'size-9', text: 'text-display-sm', tick: 'size-5 right-0 bottom-0' },
  md: { box: 'size-24', ring: 'ring-4', shadow: 'shadow-lg', icon: 'size-12', text: 'text-display-md', tick: 'size-6 right-0.5 bottom-0.5' },
  lg: { box: 'size-40', ring: 'ring-4', shadow: 'shadow-lg', icon: 'size-20', text: 'text-display-lg', tick: 'size-8 right-2 bottom-2' },
};

/** Figma "Avatars/Avatar profile photo" — large avatar with a white ring and shadow, for profile headers. */
export const AvatarProfilePhoto = forwardRef<HTMLSpanElement, AvatarProfilePhotoProps>(function AvatarProfilePhoto(
  { size = 'md', src, alt, initials, verified, className, ...props },
  ref,
) {
  const [failed, setFailed] = useState(false);
  const c = s[size];
  return (
    <span ref={ref} className={cx('relative inline-flex shrink-0', c.box, className)} {...props}>
      <span className={cx('relative flex size-full items-center justify-center rounded-full bg-gray-100 ring-white', c.ring, c.shadow)}>
        {src && !failed ? (
          <img src={src} alt={alt ?? ''} onError={() => setFailed(true)} className="size-full rounded-full object-cover" />
        ) : initials ? (
          <span className={cx('select-none font-semibold text-gray-600', c.text)}>{initials}</span>
        ) : (
          <User01 className={cx('text-gray-500', c.icon)} aria-label={alt} />
        )}
        <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-black/10" aria-hidden />
      </span>
      {verified && <VerifiedTick className={cx('absolute', c.tick)} />}
    </span>
  );
});
