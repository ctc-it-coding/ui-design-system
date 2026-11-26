import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Container, MarketingSection } from '../_shared';
import { TestimonialArrows } from '../testimonials/TestimonialCarouselArrow';
import { scrollerClass, useScrollCarousel } from '../testimonials/useCarousel';
import { BlogPostCard, type BlogPostCardType } from './BlogPostCard';
import { blogPostDefaults, type BlogPost } from './defaults';

export type BlogSectionType =
  | 'split-layout-01'
  | 'split-layout-02'
  | 'simple-left-aligned-01'
  | 'simple-left-aligned-02'
  | 'simple-center-aligned-01'
  | 'simple-center-aligned-02'
  | 'carousel-layout-01'
  | 'carousel-layout-02';

export interface BlogSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: BlogSectionType;
  /** Eyebrow above the heading (types that have one). Pass `null` to hide. */
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Posts; defaults to the Figma posts. */
  posts?: BlogPost[];
  /** Call to action; defaults to a primary "View all posts" button. `null` hides it. */
  action?: ReactNode;
  /** Href of the default "View all posts" button. */
  viewAllHref?: string;
}

const copy: Record<BlogSectionType, { subheading?: string; title: string; supportingText: string }> = {
  'split-layout-01': { subheading: 'Latest', title: 'From the blog', supportingText: 'The latest industry news, interviews, technologies, and resources.' },
  'split-layout-02': { title: 'From the blog', supportingText: 'The latest industry news, interviews, technologies, and resources.' },
  'simple-left-aligned-01': { subheading: 'Our blog', title: 'Lastest blog posts', supportingText: 'Tool and strategies modern teams need to help their companies grow.' },
  'simple-left-aligned-02': { title: 'From the blog', supportingText: 'The latest industry news, interviews, technologies, and resources.' },
  'simple-center-aligned-01': { subheading: 'Latest posts', title: 'Tinicorn blog', supportingText: 'Interviews, tips, guides, industry best practices, and news.' },
  'simple-center-aligned-02': { title: 'Latest writings', supportingText: 'The latest news, technologies, and resources from our team.' },
  'carousel-layout-01': { subheading: 'Latest posts', title: 'Tinicorn blog', supportingText: 'Interviews, tips, guides, industry best practices, and news.' },
  'carousel-layout-02': { title: 'Latest writings', supportingText: 'The latest news, technologies, and resources from our team.' },
};

const cardFor: Record<BlogSectionType, { type: BlogPostCardType; orientation: 'vertical' | 'horizontal'; count: number }> = {
  'split-layout-01': { type: 'simple-02', orientation: 'vertical', count: 2 },
  'split-layout-02': { type: 'simple-01', orientation: 'horizontal', count: 2 },
  'simple-left-aligned-01': { type: 'simple-01', orientation: 'vertical', count: 3 },
  'simple-left-aligned-02': { type: 'simple-04', orientation: 'vertical', count: 4 },
  'simple-center-aligned-01': { type: 'simple-03', orientation: 'vertical', count: 3 },
  'simple-center-aligned-02': { type: 'simple-01', orientation: 'horizontal', count: 4 },
  'carousel-layout-01': { type: 'simple-04', orientation: 'vertical', count: 9 },
  'carousel-layout-02': { type: 'simple-03', orientation: 'vertical', count: 4 },
};

const tones = ['gray', 'warm', 'cool', 'brand'] as const;

/** Heading block shared by blog sections (subheading 16/24, heading 36/44, supporting text 20/30). */
export function BlogSectionHeading({
  subheading,
  title,
  supportingText,
  align = 'left',
  textSize = 'xl',
  className,
}: {
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  align?: 'left' | 'center';
  textSize?: 'lg' | 'xl';
  className?: string;
}) {
  return (
    <div className={cx('flex max-w-3xl flex-col gap-4 md:gap-5', align === 'center' && 'mx-auto items-center text-center', className)}>
      <div className="flex flex-col gap-3">
        {subheading != null && <p className="text-sm font-semibold text-brand-700 md:text-md">{subheading}</p>}
        {title != null && <h2 className="text-display-sm font-semibold text-gray-900 md:text-display-md">{title}</h2>}
      </div>
      {supportingText != null && <p className={cx('text-lg text-gray-600', textSize === 'xl' && 'md:text-xl')}>{supportingText}</p>}
    </div>
  );
}

/**
 * BlogSection — Figma "Blog section" (split, left / center aligned and carousel layouts).
 */
export const BlogSection = forwardRef<HTMLElement, BlogSectionProps>(function BlogSection(
  { type = 'split-layout-01', subheading, title, supportingText, posts, action, viewAllHref, className, ...props },
  ref,
) {
  const c = copy[type];
  const cfg = cardFor[type];
  const list = (posts ?? blogPostDefaults).slice(0, posts ? undefined : cfg.count);
  const sc = useScrollCarousel<HTMLUListElement>();
  const heading = {
    subheading: subheading === undefined ? c.subheading : subheading,
    title: title ?? c.title,
    supportingText: supportingText ?? c.supportingText,
  };
  const btn =
    action === null ? null : (
      action ?? (
        <Button size="xl" as={viewAllHref ? 'a' : 'button'} href={viewAllHref}>
          View all posts
        </Button>
      )
    );
  const card = (p: BlogPost, i: number, extra?: string) => (
    <BlogPostCard key={i} type={cfg.type} orientation={cfg.orientation} imageTone={tones[i % tones.length]} className={extra} {...p} />
  );
  const desktopBtn = btn && <div className="hidden shrink-0 md:flex">{btn}</div>;
  const mobileBtn = btn && <div className="flex md:hidden [&>*]:w-full">{btn}</div>;

  let body: ReactNode;
  switch (type) {
    case 'split-layout-01':
    case 'split-layout-02':
      body = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[400px] lg:shrink-0">
            <BlogSectionHeading {...heading} textSize="lg" />
            {desktopBtn}
          </div>
          <div className={cx('flex flex-1 flex-col gap-12', type === 'split-layout-01' && 'md:flex-row md:gap-8')}>
            {list.map((p, i) => card(p, i, 'flex-1'))}
          </div>
          {mobileBtn}
        </Container>
      );
      break;
    case 'simple-left-aligned-01':
    case 'carousel-layout-01':
    case 'carousel-layout-02': {
      const carousel = type !== 'simple-left-aligned-01';
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <BlogSectionHeading {...heading} />
            {desktopBtn}
          </div>
          {carousel ? (
            <div className="flex flex-col gap-8" role="region" aria-roledescription="carousel" aria-label="Blog posts">
              <ul ref={sc.ref} className={cx(scrollerClass, 'gap-6 md:gap-8')}>
                {list.map((p, i) => (
                  <li key={i} className="flex w-[300px] shrink-0 snap-start md:w-[384px]">
                    {card(p, i, 'w-full')}
                  </li>
                ))}
              </ul>
              <TestimonialArrows onPrev={sc.prev} onNext={sc.next} canPrev={sc.canPrev} canNext={sc.canNext} />
            </div>
          ) : (
            <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">{list.map((p, i) => card(p, i))}</div>
          )}
          {mobileBtn}
        </Container>
      );
      break;
    }
    case 'simple-left-aligned-02':
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          <BlogSectionHeading {...heading} />
          <div className="flex flex-col gap-8 md:gap-16">
            <div className="grid gap-12 md:grid-cols-2 md:gap-8">{list.map((p, i) => card(p, i))}</div>
            {btn && <div className="flex justify-end border-t border-gray-200 pt-4 max-md:[&>*]:w-full">{btn}</div>}
          </div>
        </Container>
      );
      break;
    case 'simple-center-aligned-01':
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          <BlogSectionHeading {...heading} align="center" />
          <div className="grid gap-12 md:grid-cols-2 md:gap-8 lg:grid-cols-3">{list.map((p, i) => card(p, i))}</div>
          {btn && <div className="flex justify-center max-md:[&>*]:w-full">{btn}</div>}
        </Container>
      );
      break;
    case 'simple-center-aligned-02':
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          <BlogSectionHeading {...heading} align="center" />
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-x-8">{list.map((p, i) => card(p, i))}</div>
        </Container>
      );
      break;
  }

  return (
    <MarketingSection ref={ref} className={className} data-type={type} {...props}>
      {body}
    </MarketingSection>
  );
});
