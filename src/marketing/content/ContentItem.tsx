import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Link01 } from '../../icons';
import { Avatar, AvatarLabelGroup } from '../../components/avatars/Avatar';
import { ImagePlaceholder, type ImagePlaceholderProps } from '../_shared';
import { initialsOf } from '../testimonials/_parts';

export type ContentItemType =
  | 'heading'
  | 'paragraph'
  | 'image-landscape'
  | 'image-square'
  | 'image-portrait'
  | 'quote-left'
  | 'quote-center'
  | 'divider'
  | 'feature-text';

export type ContentItemSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ContentItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: ContentItemType;
  /** Figma: Size (heading / paragraph / divider / feature text / quote). Images only come in md. */
  size?: ContentItemSize;
  /**
   * Content: heading text, paragraph text (a string is split into paragraphs on line breaks), quote text,
   * or the body of a feature-text box.
   */
  children?: ReactNode;
  /** Heading level for Type=Heading (default h2) and the feature-text title (default h3). */
  as?: 'h2' | 'h3' | 'h4';
  /** Image URL (Type=Image …). */
  src?: string;
  alt?: string;
  /** Image caption ("Image courtesy of …"); `null` hides it. */
  caption?: ReactNode;
  /** Placeholder tone without `src`. */
  imageTone?: ImagePlaceholderProps['tone'];
  /** Quote author. */
  author?: { name: string; title?: string; avatarSrc?: string };
  /** How the quote is attributed: an avatar label group, an "— Name, Title" line, or both. Default `text`. */
  attribution?: 'avatar' | 'text' | 'both';
  /** Feature text heading. */
  title?: ReactNode;
}

const headingCls: Record<ContentItemSize, string> = {
  sm: 'pt-5 pb-2 text-lg md:pt-8 md:pb-3 md:text-xl',
  md: 'pt-8 pb-3 text-xl md:pb-4 md:text-display-xs',
  lg: 'pt-8 pb-4 text-display-xs md:pt-10 md:pb-5 md:text-display-sm',
  xl: 'pt-10 pb-5 text-display-sm md:pt-12 md:pb-6 md:text-display-md',
  '2xl': 'pt-10 pb-5 text-display-sm md:pt-12 md:pb-6 md:text-display-md',
};
const paraCls: Record<ContentItemSize, { text: string; gap: string; pb: string }> = {
  sm: { text: 'text-md', gap: 'mt-4', pb: 'pb-3.5' },
  md: { text: 'text-md md:text-lg', gap: 'mt-4', pb: 'pb-4' },
  lg: { text: 'text-md md:text-lg', gap: 'mt-4 md:mt-[18px]', pb: 'pb-4 md:pb-[18px]' },
  xl: { text: 'text-lg md:text-xl', gap: 'mt-4 md:mt-[18px]', pb: 'pb-4 md:pb-[18px]' },
  '2xl': { text: 'text-lg md:text-xl', gap: 'mt-4 md:mt-[18px]', pb: 'pb-4 md:pb-[18px]' },
};
const dividerPad: Record<ContentItemSize, string> = { sm: 'py-6', md: 'py-6 md:py-8', lg: 'py-8 md:py-10', xl: 'py-8 md:py-12', '2xl': 'py-12 md:py-16' };
const quoteCls: Record<ContentItemSize, { pad: string; text: string; gap: string; small: boolean }> = {
  sm: { pad: 'py-8 md:py-10', text: 'text-md', gap: 'gap-5', small: true },
  md: { pad: 'py-8 md:py-10', text: 'text-md md:text-lg', gap: 'gap-5 md:gap-6', small: true },
  lg: { pad: 'py-10 md:py-12', text: 'text-lg md:text-xl', gap: 'gap-6', small: false },
  xl: { pad: 'py-10 md:py-12', text: 'text-xl md:text-display-xs md:leading-9', gap: 'gap-6 md:gap-8', small: false },
  '2xl': { pad: 'py-10 md:py-12', text: 'text-display-xs md:text-display-sm md:leading-[44px]', gap: 'gap-6 md:gap-8', small: false },
};
const ratio: Record<string, string> = { 'image-landscape': '3/2', 'image-square': '1/1', 'image-portrait': '6/7' };

/** Slug used for heading ids (table of contents anchors). */
export const contentSlug = (s: ReactNode) =>
  typeof s === 'string' ? s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : undefined;

function Paragraphs({ children, size }: { children: ReactNode; size: ContentItemSize }) {
  const p = paraCls[size];
  if (typeof children === 'string') {
    const parts = children.split(/\n|⏎/).map((s) => s.trim()).filter(Boolean);
    return (
      <>
        {parts.map((t, i) => (
          <p key={i} className={cx(i > 0 && p.gap)}>{t}</p>
        ))}
      </>
    );
  }
  return <>{children}</>;
}

/**
 * ContentItem — Figma "Content item": the building blocks of long-form content (rich text / prose).
 * Each item carries its own vertical rhythm (top/bottom padding); the first item drops its top padding.
 */
export const ContentItem = forwardRef<HTMLElement, ContentItemProps>(function ContentItem(
  {
    type = 'paragraph',
    size = 'md',
    children,
    as,
    src,
    alt = '',
    caption = 'Image courtesy of Alex Loup via Unsplash',
    imageTone = 'gray',
    author = { name: 'Olivia Rhye', title: 'Product Designer' },
    attribution = 'text',
    title = 'Heading text',
    className,
    id,
    ...props
  },
  ref,
) {
  const r = ref as never;
  switch (type) {
    case 'heading': {
      const H = as ?? 'h2';
      const text = children ?? 'Heading text';
      return (
        <H ref={r} id={id ?? contentSlug(text)} className={cx('scroll-mt-24 font-semibold text-gray-900 first:pt-0', headingCls[size], className)} {...props}>
          {text}
        </H>
      );
    }
    case 'paragraph': {
      const p = paraCls[size];
      return (
        <div ref={r} id={id} className={cx('text-gray-600', p.text, p.pb, className)} {...props}>
          <Paragraphs size={size}>
            {children ??
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non. Ultrices praesent amet ipsum justo massa. Eu dolor aliquet risus gravida nunc at feugiat consequat purus. Non massa enim vitae duis mattis. Vel in ultricies vel fringilla.'}
          </Paragraphs>
        </div>
      );
    }
    case 'image-landscape':
    case 'image-square':
    case 'image-portrait':
      return (
        <figure ref={r} id={id} className={cx('flex flex-col gap-4 py-8 first:pt-0 md:py-12', className)} {...props}>
          <ImagePlaceholder src={src} alt={alt} ratio={ratio[type]} tone={imageTone} className="w-full rounded-xl" />
          {caption != null && (
            <figcaption className="flex items-center gap-1.5 text-sm text-gray-600">
              <Link01 className="size-4 shrink-0 text-gray-400" aria-hidden />
              {caption}
            </figcaption>
          )}
        </figure>
      );
    case 'quote-left':
    case 'quote-center': {
      const q = quoteCls[size];
      const center = type === 'quote-center';
      const quote = (
        <p className={cx('font-medium text-gray-900 italic', q.text)}>
          {children ?? '“In a world older and more complete than ours they move finished and complete, gifted with extensions of the senses we have lost or never attained, living by voices we shall never hear.”'}
        </p>
      );
      const showAvatar = attribution !== 'text';
      const showText = attribution !== 'avatar';
      const line = showText && (
        <p className={cx('text-gray-600', q.small ? 'text-sm' : 'text-md')}>
          — {author.name}
          {author.title ? `, ${author.title}` : ''}
        </p>
      );
      return (
        <figure ref={r} id={id} className={cx(q.pad, 'first:pt-0', className)} {...props}>
          {center ? (
            <div className={cx('flex flex-col items-center text-center', q.gap)}>
              <blockquote>{quote}</blockquote>
              <figcaption className={cx('flex flex-col items-center', q.gap)}>
                {showAvatar && (
                  <div className="flex flex-col items-center gap-3">
                    <Avatar size="md" src={author.avatarSrc} initials={initialsOf(author.name)} alt={author.name} />
                    <div className={cx('flex flex-col', !q.small && 'gap-0.5', q.small ? 'text-sm' : 'text-md')}>
                      <span className="font-semibold text-gray-900">{author.name}</span>
                      {author.title && <span className="text-gray-600">{author.title}</span>}
                    </div>
                  </div>
                )}
                {line}
              </figcaption>
            </div>
          ) : (
            <div className="flex gap-4 md:gap-5">
              <span className="w-0.5 shrink-0 bg-brand-700" aria-hidden />
              <div className={cx('flex flex-col py-2', q.gap)}>
                <blockquote>{quote}</blockquote>
                <figcaption className={cx('flex flex-col', q.gap)}>
                  {showAvatar && (
                    <AvatarLabelGroup size={q.small ? 'md' : 'lg'} src={author.avatarSrc} initials={initialsOf(author.name)} title={author.name} subtitle={author.title} />
                  )}
                  {line}
                </figcaption>
              </div>
            </div>
          )}
        </figure>
      );
    }
    case 'divider':
      return (
        <div ref={r} id={id} role="separator" className={cx(dividerPad[size], 'first:pt-0', className)} {...props}>
          <hr className="border-gray-200" />
        </div>
      );
    case 'feature-text': {
      const small = size === 'sm';
      const H = as ?? 'h3';
      return (
        <aside ref={r} id={id} className={cx('py-8 first:pt-0 md:py-12', className)} {...props}>
          <div className={cx('rounded-2xl bg-gray-50', small ? 'p-5 md:p-6' : 'p-5 md:p-8')}>
            <H id={contentSlug(title)} className={cx('scroll-mt-24 pb-4 font-semibold text-gray-900 md:pb-5', small ? 'text-xl md:text-display-xs' : 'text-display-xs md:text-display-sm')}>
              {title}
            </H>
            <div className={cx('text-gray-600', paraCls[small ? 'md' : 'lg'].text)}>
              <Paragraphs size={small ? 'md' : 'lg'}>{children ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}</Paragraphs>
            </div>
          </div>
        </aside>
      );
    }
  }
});

/** One block of rich text = the props of a ContentItem. */
export type ContentBlock = Omit<ContentItemProps, 'ref'> & { key?: string };

export interface ContentRichTextProps extends HTMLAttributes<HTMLDivElement> {
  /** Blocks rendered in order (Figma "Rich text" frame = a column of Content items). */
  blocks: ContentBlock[];
}

/** ContentRichText — a 720px-max prose column of ContentItems. */
export const ContentRichText = forwardRef<HTMLDivElement, ContentRichTextProps>(function ContentRichText({ blocks, className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cx('flex w-full max-w-[720px] flex-col', className)} {...props}>
      {blocks.map(({ key, ...b }, i) => (
        <ContentItem key={key ?? i} {...b} />
      ))}
      {children}
    </div>
  );
});

