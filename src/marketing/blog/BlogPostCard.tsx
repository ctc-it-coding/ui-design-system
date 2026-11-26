import { forwardRef, type HTMLAttributes } from 'react';
import { cx } from '../../utils/cx';
import { ArrowUpRight } from '../../icons';
import { AvatarLabelGroup } from '../../components/avatars/Avatar';
import { Badge } from '../../components/badges/Badge';
import { BadgeGroup } from '../../components/badges/BadgeGroup';
import { ImagePlaceholder, type ImagePlaceholderProps } from '../_shared';
import { initialsOf } from '../testimonials/_parts';
import { blogPostDefaults, type BlogPost } from './defaults';

export type BlogPostCardType =
  | 'simple-01'
  | 'simple-02'
  | 'simple-03'
  | 'simple-04'
  | 'card-full-width-image-01'
  | 'card-full-width-image-02'
  | 'card-full-width-image-03'
  | 'card-full-width-image-04';

export interface BlogPostCardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'>, Partial<BlogPost> {
  /** Figma: Type */
  type?: BlogPostCardType;
  /** Figma: Orientation (horizontal cards stack vertically below `sm`). */
  orientation?: 'vertical' | 'horizontal';
  /** Overrides the image box classes (e.g. a taller image for a featured post). */
  imageClassName?: string;
  /** Overrides the heading size classes (e.g. `text-display-sm` for a featured post). */
  headingClassName?: string;
  /** Placeholder gradient tone when there is no `imageSrc`. */
  imageTone?: ImagePlaceholderProps['tone'];
  /** Featured layout: larger image share and heading, no excerpt clamping, content vertically centred (horizontal). */
  featured?: boolean;
  /** Label of the "Read post" link (Type=Simple 04 / Card 04). */
  linkLabel?: string;
}

const d = blogPostDefaults[0]!;

/**
 * BlogPostCard — Figma "Blog post card" (Simple 01–04 and Card full-width image 01–04, vertical / horizontal).
 * The heading is the link; its pseudo-element covers the whole card so the card is clickable.
 */
export const BlogPostCard = forwardRef<HTMLElement, BlogPostCardProps>(function BlogPostCard(
  {
    type = 'simple-01',
    orientation = 'vertical',
    title = d.title,
    excerpt = d.excerpt,
    category = d.category,
    readTime = d.readTime,
    author = d.author,
    date = d.date,
    tags = d.tags,
    imageSrc,
    href = '#',
    imageClassName,
    headingClassName,
    imageTone = 'gray',
    linkLabel = 'Read post',
    featured = false,
    className,
    ...props
  },
  ref,
) {
  const card = type.startsWith('card');
  const variant = type.slice(-2) as '01' | '02' | '03' | '04';
  const horizontal = orientation === 'horizontal';
  const rounded = !card && (variant === '01' || variant === '03');

  // heading size per Figma
  const headingSize =
    headingClassName ??
    (featured ? 'text-display-xs md:text-display-sm' : horizontal ? (card ? 'text-lg' : 'text-xl md:text-display-xs') : variant === '02' && !card ? 'text-lg md:text-xl' : 'text-lg md:text-display-xs');
  const withIcon = !horizontal && variant !== '04';

  const heading = (
    <h3 className={cx('flex items-start gap-4 font-semibold text-gray-900', headingSize)}>
      <a href={href} className="flex-1 rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-4 focus-visible:ring-brand-500/24 group-hover/post:underline">
        {title}
      </a>
      {withIcon && <ArrowUpRight className="mt-1 size-6 shrink-0 text-gray-400" aria-hidden />}
    </h3>
  );
  const text = excerpt ? <p className={cx('text-md text-gray-600', horizontal && !featured && 'line-clamp-2')}>{excerpt}</p> : null;
  const authorRow = author ? <AvatarLabelGroup size="md" src={author.avatarSrc} initials={initialsOf(author.name)} title={author.name} subtitle={date} /> : null;

  let body;
  if (variant === '01') {
    body = (
      <>
        <div className="flex flex-col gap-2">
          {category && <p className="text-sm font-semibold text-brand-700">{category}</p>}
          <div className="flex flex-col gap-2">
            {heading}
            {text}
          </div>
        </div>
        {authorRow}
      </>
    );
  } else if (variant === '02') {
    body = (
      <>
        <div className="flex flex-col gap-4">
          {category && (
            <BadgeGroup static badge={category} className="relative z-[1] self-start">
              {readTime}
            </BadgeGroup>
          )}
          <div className="flex flex-col gap-2">
            {heading}
            {text}
          </div>
        </div>
        {authorRow}
      </>
    );
  } else if (variant === '03') {
    body = (
      <>
        <div className="flex flex-col gap-2">
          <p className="text-sm font-semibold text-brand-700">
            {[author?.name, date].filter(Boolean).join(' • ')}
          </p>
          {heading}
          {text}
        </div>
        {tags && tags.length > 0 && (
          <div className="relative z-[1] flex flex-wrap gap-2">
            {tags.map((tg) => (
              <Badge key={tg.label} size="md" type="pill-color" color={tg.color ?? 'gray'}>
                {tg.label}
              </Badge>
            ))}
          </div>
        )}
      </>
    );
  } else {
    body = (
      <>
        <div className="flex flex-col gap-2">
          {heading}
          {text}
        </div>
        <span className="inline-flex items-center gap-2 self-start text-md font-semibold text-brand-700" aria-hidden>
          {linkLabel}
          <ArrowUpRight className="size-5" />
        </span>
      </>
    );
  }

  const image = (
    <ImagePlaceholder
      src={imageSrc}
      tone={imageTone}
      className={cx(
        'shrink-0',
        rounded && 'rounded-2xl',
        horizontal ? (featured ? 'h-60 w-full sm:h-auto sm:min-h-[320px] sm:w-auto sm:flex-[2]' : 'h-60 w-full sm:h-auto sm:min-h-[200px] sm:w-[320px] sm:max-w-[45%]') : variant === '04' ? 'h-60 md:h-[280px]' : 'h-60',
        imageClassName,
      )}
    >
      {variant === '04' && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/0 to-black/40">
          <div className="flex items-start justify-between gap-6 border-t border-white/30 bg-white/30 p-4 backdrop-blur-lg md:p-6">
            <div className="flex flex-col text-sm text-white">
              <span className={card ? 'font-semibold' : 'font-medium'}>{author?.name}</span>
              <span>{date}</span>
            </div>
            <span className="text-sm font-semibold text-white">{category}</span>
          </div>
        </div>
      )}
    </ImagePlaceholder>
  );

  return (
    <article
      ref={ref}
      className={cx(
        'group/post relative flex',
        horizontal ? 'flex-col sm:flex-row' : 'flex-col',
        card ? 'overflow-hidden rounded-2xl border border-gray-200 bg-white' : featured && horizontal ? 'gap-5 sm:gap-8' : 'gap-5',
        className,
      )}
      {...props}
    >
      {image}
      <div className={cx('flex min-w-0 flex-1 flex-col gap-6', card && 'p-5 md:p-6', featured && horizontal && 'justify-center')}>{body}</div>
    </article>
  );
});
