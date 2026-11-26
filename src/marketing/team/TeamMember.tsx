import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Avatar } from '../../components/avatars/Avatar';
import { SocialIcon } from '../../components/misc-icons/SocialIcon';
import { ArrowUpRight } from '../../icons';
import { ImagePlaceholder, type ImagePlaceholderProps } from '../_shared';
import { useKit } from '../contact/_kit';
import { defaultTeamSocials, type TeamSocialLink } from './defaults';

export type TeamMemberType =
  | 'simple-left'
  | 'simple-left-top'
  | 'simple-center-aligned'
  | 'image-top'
  | 'image-left'
  | 'image-glass-floating'
  | 'image-glass-full-width';

export interface TeamMemberProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'role'> {
  /** Figma: Type */
  type?: TeamMemberType;
  name?: ReactNode;
  role?: ReactNode;
  /** Figma "Supporting text" — pass `null` to hide. */
  bio?: ReactNode;
  /** Photo (image types) or avatar (simple types). */
  imageSrc?: string;
  /** Initials for the avatar placeholder (simple types). Defaults to the name's initials. */
  initials?: string;
  /** Social links — pass `[]` to hide the row. */
  socials?: TeamSocialLink[];
  /** Profile link (arrow on the glass cards). */
  href?: string;
  /** Placeholder tint when there is no image. */
  tone?: ImagePlaceholderProps['tone'];
  /** Compact glass card (collage small tiles): smaller name. */
  compact?: boolean;
}

const initialsOf = (n: ReactNode) =>
  typeof n === 'string'
    ? n
        .split(/\s+/)
        .map((w) => w[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : undefined;

function Socials({ socials, size, variant, center }: { socials: TeamSocialLink[]; size: 20 | 24; variant: 'gray' | 'white'; center?: boolean }) {
  if (!socials.length) return null;
  return (
    <div className={cx('flex items-center', size === 20 ? 'gap-4' : 'gap-5', center && 'justify-center')}>
      {socials.map((s) => (
        <a key={s.platform} href={s.href ?? '#'} className="rounded-sm outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24">
          <SocialIcon platform={s.platform} variant={variant} size={size} />
        </a>
      ))}
    </div>
  );
}

/** TeamMember — Figma "_Team member" (7 types): avatar / photo, name, role, bio and social links. */
export const TeamMember = forwardRef<HTMLDivElement, TeamMemberProps>(function TeamMember(
  {
    type = 'simple-left-top',
    name = 'Olivia Rhye',
    role = 'Founder & CEO',
    bio = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageSrc,
    initials,
    socials = defaultTeamSocials,
    href,
    tone = 'gray',
    compact = false,
    className,
    ...props
  },
  ref,
) {
  const { k } = useKit();

  if (type === 'image-glass-floating' || type === 'image-glass-full-width') {
    const floating = type === 'image-glass-floating';
    return (
      <div ref={ref} className={cx('relative flex min-h-[432px] flex-col justify-end overflow-hidden md:min-h-[480px]', className)} {...props}>
        <ImagePlaceholder src={imageSrc} alt={typeof name === 'string' ? name : ''} tone={tone} className="absolute inset-0" />
        <div className={cx('relative bg-gradient-to-b from-transparent to-black/40', floating ? 'px-4 pt-16 pb-4 md:px-6 md:pt-24 md:pb-6' : 'pt-16 md:pt-24')}>
          <div
            className={cx(
              'flex flex-col gap-6 bg-white/30 backdrop-blur-xl md:gap-8',
              floating ? 'border border-white/30 px-4 py-6 md:px-5' : 'border-t border-white/30 px-4 pt-6 pb-8 md:px-6',
            )}
          >
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex items-start gap-4">
                <h3 className={cx('flex-1 font-semibold text-white', compact ? 'text-xl md:text-display-xs' : 'text-display-xs md:text-display-sm')}>{name}</h3>
                <a
                  href={href ?? '#'}
                  aria-label={typeof name === 'string' ? `${name} profile` : 'Profile'}
                  className="rounded-sm py-1 text-white outline-none focus-visible:ring-4 focus-visible:ring-white/40 md:py-1.5"
                >
                  <ArrowUpRight className="size-6" />
                </a>
              </div>
              <div className="flex flex-col gap-1">
                {role != null && <p className="text-md font-semibold text-white md:text-lg">{role}</p>}
                {bio != null && <p className="text-md text-white">{bio}</p>}
              </div>
            </div>
            <Socials socials={socials} size={24} variant="white" />
          </div>
        </div>
      </div>
    );
  }

  if (type === 'image-top' || type === 'image-left') {
    const left = type === 'image-left';
    return (
      <div ref={ref} className={cx('flex flex-col gap-6', left && 'md:flex-row', className)} {...props}>
        <ImagePlaceholder
          src={imageSrc}
          alt={typeof name === 'string' ? name : ''}
          tone={tone}
          className={cx('w-full aspect-[343/312] md:aspect-square', left && 'md:w-[296px] md:shrink-0')}
        />
        <div className={cx('flex flex-col gap-6', left && 'md:flex-1')}>
          <div className="flex flex-col gap-4">
            <div className={cx('flex flex-col', left ? 'gap-1 md:gap-2' : 'gap-1')}>
              <h3 className={cx('font-medium', left ? 'text-lg md:text-xl' : 'text-xl md:text-lg', k.heading)}>{name}</h3>
              {role != null && <p className={cx(left ? 'text-md md:text-lg' : 'text-lg md:text-md', k.dark ? k.subheading : 'text-brand-700')}>{role}</p>}
            </div>
            {bio != null && <p className={cx('text-md', k.text)}>{bio}</p>}
          </div>
          <Socials socials={socials} size={24} variant="gray" />
        </div>
      </div>
    );
  }

  const row = type === 'simple-left';
  const center = type === 'simple-center-aligned';
  return (
    <div ref={ref} className={cx('flex', row ? 'flex-row gap-5' : 'flex-col gap-4 md:gap-5', center && 'items-center text-center', className)} {...props}>
      <Avatar size="2xl" src={imageSrc} alt={typeof name === 'string' ? name : undefined} initials={initials ?? initialsOf(name)} className="size-20 md:size-24" />
      <div className={cx('flex min-w-0 flex-col gap-4', row && 'flex-1', center && 'items-center')}>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <h3 className={cx('text-lg font-medium', k.heading)}>{name}</h3>
            {role != null && <p className={cx('text-md', k.dark ? k.subheading : 'text-brand-700')}>{role}</p>}
          </div>
          {bio != null && <p className={cx('text-md', k.text)}>{bio}</p>}
        </div>
        <Socials socials={socials} size={20} variant="gray" center={center} />
      </div>
    </div>
  );
});
