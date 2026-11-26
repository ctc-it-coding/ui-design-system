import { forwardRef, useId, useMemo, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MarkerPin02 } from '../../icons';
import { AvatarLabelGroup } from '../../components/avatars/Avatar';
import { BadgeGroup } from '../../components/badges/BadgeGroup';
import { Button } from '../../components/buttons/Button';
import { HandDrawnArrow, HandDrawnLine } from '../../components/decorations/HandDrawn';
import { Input } from '../../components/inputs/Input';
import { Tabs } from '../../components/tabs/Tabs';
import { Container, ImagePlaceholder } from '../_shared';
import { BlogSubscribeCard } from '../blog/BlogSubscribeCard';
import type { BlogPostTag } from '../blog/defaults';
import { TestimonialArrows } from '../testimonials/TestimonialCarouselArrow';
import { GlassPlayButton, initialsOf } from '../testimonials/_parts';
import { scrollerClass, useScrollCarousel } from '../testimonials/useCarousel';
import { ContentRichText, contentSlug, type ContentBlock } from './ContentItem';
import { ArticleFooter, AuthorBlock, ShareButtons, TableOfContents, TagList, type TocItem } from './_parts';
import { articleBlocks, leadArticleBlocks, policyBlocks } from './defaults';

export type BlogPostPageHeaderType =
  | 'large-image-01'
  | 'large-image-02'
  | 'large-image-03'
  | 'large-image-04'
  | 'split-image-01'
  | 'split-image-02'
  | 'split-image-03'
  | 'split-image-04'
  | 'alternative-01'
  | 'alternative-02'
  | 'alternative-03'
  | 'simple';

export interface BlogPostPageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: BlogPostPageHeaderType;
  /** Eyebrow: publish date, category, "date • read time" … (depends on type). */
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Category badge text of types with a badge group (e.g. "Design"). */
  badge?: string;
  /** Badge group message (e.g. "8 min read"). */
  badgeMessage?: string;
  author?: { name: string; title?: string; avatarSrc?: string };
  date?: string;
  tags?: BlogPostTag[];
  /** Hero image URL. */
  imageSrc?: string;
  /** The article body. Defaults to the Figma article. `[]` renders the header only. */
  blocks?: ContentBlock[];
  /** Extra content appended after the article body. */
  children?: ReactNode;
}

interface Preset {
  sub?: string;
  title: string;
  text: string;
  badge?: string;
  badgeMessage?: string;
  author?: { name: string; title?: string };
  date?: string;
  tags?: BlogPostTag[];
  blocks: () => ContentBlock[];
}

const T_DRP: BlogPostTag[] = [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }, { label: 'Presentation', color: 'pink' }];
const T_PTS: BlogPostTag[] = [{ label: 'Product', color: 'blue-light' }, { label: 'Tools', color: 'pink' }, { label: 'SaaS', color: 'pink' }];
const UX = 'UX review presentations';

const presets: Record<BlogPostPageHeaderType, Preset> = {
  'large-image-01': {
    sub: 'Published 20 Jan 2024',
    title: UX,
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers? Find out with our in-depth guide on UX presentations.',
    author: { name: 'Olivia Rhye', title: 'Product Designer, Tinicorn' },
    tags: T_DRP,
    blocks: () => articleBlocks(),
  },
  'alternative-02': {
    sub: 'Published 13 Jan 2024',
    title: 'A conversation with Lucy Bond',
    text: 'Lucy Bond is an interior designer who started her career in New Zealand, working for large architectural firms. We chatted to her about design and life.',
    author: { name: 'Rene Wells', title: 'Content Writer' },
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Architecture', color: 'indigo' }, { label: 'Interviews', color: 'pink' }],
    blocks: () => articleBlocks(['Image courtesy of Laura Davidson via Unsplash', 'Image courtesy of Helena Lopes via Pexels'], ['image-portrait', 'image-landscape']),
  },
  'large-image-02': {
    sub: 'Design',
    title: UX,
    text: 'How do you create compelling presentations that wow your colleagues and impress your managers? Here’s how to get started.',
    author: { name: 'Olivia Rhye', title: '20 Jan 2024' },
    tags: T_PTS,
    blocks: () => leadArticleBlocks(),
  },
  simple: {
    sub: 'Current as of 20 Jan 2024',
    title: 'Privacy Policy',
    text: 'Your privacy is important to us at Tinicorn. We respect your privacy regarding any information we may collect from you across our website.',
    blocks: () => policyBlocks,
  },
  'large-image-03': {
    title: 'Bill Walsh leadership lessons',
    text: 'Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    badge: 'Leadership',
    badgeMessage: '8 min read',
    author: { name: 'Alec Whitten' },
    date: '17 Jan 2024',
    blocks: () => articleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Leon via Unsplash'], ['image-landscape', 'image-landscape']).filter((b) => b.type !== 'feature-text'),
  },
  'split-image-04': {
    sub: '20 Jan 2024 • 10 min read',
    title: 'Building your API Stack',
    text: 'The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.',
    author: { name: 'Lana Steiner', title: 'Engineering Manager, Layers' },
    blocks: () => leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  },
  'alternative-03': {
    title: 'Roy’s Peak Wanaka, New Zealand',
    text: 'New Zealand is famous for its breathtaking hiking trails that weave their way through its beautiful landscapes.',
    author: { name: 'Olivia Rhye', title: 'Published in Adventure' },
    blocks: () => leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  },
  'split-image-02': {
    sub: '13 Jan 2024 • 10 min read',
    title: 'Our top 10 Javascript frameworks to use',
    text: 'JavaScript frameworks make development easy with extensive features and functionalities.',
    author: { name: 'Drew Cano', title: 'Frontend Engineer' },
    blocks: () => leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  },
  'split-image-03': {
    title: 'Migrating to Linear 101',
    text: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
    badge: 'Product',
    badgeMessage: '8 min read',
    blocks: () => leadArticleBlocks(['Image courtesy of Vlada Karpovich via Pexels', 'Image courtesy of Jasmin Chew via Pexels'], ['image-landscape', 'image-portrait']),
  },
  'alternative-01': {
    title: 'Podcast: Creating a better CX Community',
    text: 'Starting a community doesn’t need to be complicated, but how do you get started? Learn how with the best.',
    badge: '12 Jan 2024',
    badgeMessage: 'Customer Success',
    author: { name: 'Orlando Diggs', title: 'CX Lead, Layers' },
    tags: T_PTS,
    blocks: () => leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  },
  'split-image-01': {
    title: 'How collaboration makes us better designers',
    text: 'Collaboration can make our teams stronger, and our individual designs better. Here’s how to do it well.',
    badge: 'Design',
    badgeMessage: '8 min read',
    author: { name: 'Natali Craig', title: 'Published 14 Jan 2024' },
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }],
    blocks: () => leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  },
  'large-image-04': {
    sub: 'Design',
    title: 'What is Wireframing?',
    text: 'Introduction to Wireframing and its Principles. Learn from the best in the industry with tips, tools, and best practices from those in the know.',
    author: { name: 'Olivia Rhye', title: '20 Jan 2024' },
    tags: [{ label: 'Design', color: 'brand' }, { label: 'Research', color: 'indigo' }],
    blocks: () => articleBlocks(),
  },
};

/** Table-of-contents entries derived from the article headings and feature-text titles. */
function tocFrom(blocks: ContentBlock[]): TocItem[] {
  return blocks
    .filter((b) => (b.type === 'heading' && (b.size === 'lg' || b.size === 'md' || b.size === 'xl')) || b.type === 'feature-text')
    .map((b) => {
      const label = b.type === 'feature-text' ? b.title : b.children;
      return { id: b.id ?? contentSlug(label) ?? '', label };
    })
    .filter((t) => t.id);
}

function Sub({ children, center, dark }: { children?: ReactNode; center?: boolean; dark?: boolean }) {
  if (children == null) return null;
  return <p className={cx('text-sm font-semibold md:text-md', dark ? 'text-brand-200' : 'text-brand-700', center && 'text-center')}>{children}</p>;
}

function Title({ children, size = 'lg', dark }: { children: ReactNode; size?: 'lg' | 'xl'; dark?: boolean }) {
  return <h1 className={cx('font-semibold', size === 'xl' ? 'text-display-md md:text-display-xl' : 'text-display-md md:text-display-lg', dark ? 'text-white' : 'text-gray-900')}>{children}</h1>;
}

function Lead({ children, dark, className }: { children: ReactNode; dark?: boolean; className?: string }) {
  return <p className={cx('text-lg md:text-xl', dark ? 'text-brand-200' : 'text-gray-600', className)}>{children}</p>;
}

function Author({ a, size = 'xl', dark }: { a?: { name: string; title?: string; avatarSrc?: string }; size?: 'lg' | 'xl'; dark?: boolean }) {
  if (!a) return null;
  return (
    <AvatarLabelGroup
      size={size}
      src={a.avatarSrc}
      initials={initialsOf(a.name)}
      title={<span className={dark ? 'text-white' : 'text-gray-900'}>{a.name}</span>}
      subtitle={a.title && <span className={dark ? 'text-brand-200' : undefined}>{a.title}</span>}
    />
  );
}

function SidebarNewsletter() {
  const id = useId();
  return (
    <form className="flex flex-col gap-4" aria-labelledby={id} onSubmit={(e: FormEvent) => e.preventDefault()}>
      <p id={id} className="text-md font-semibold text-brand-600">Subscribe to our newsletter</p>
      <Input name="email" type="email" required aria-label="Email" placeholder="Enter your email" />
      <Button type="submit" size="xl" className="w-full">Subscribe</Button>
    </form>
  );
}

function Contributors() {
  const people = [
    { name: 'Phoenix Baker', title: 'Product Manager' },
    { name: 'Lori Bryson', title: 'Product Manager' },
    { name: 'Loki Bright', title: 'Frontend Engineer' },
  ];
  return (
    <div className="flex flex-col gap-6">
      <p className="text-md font-semibold text-brand-600">Contributors</p>
      {people.map((p) => (
        <AuthorBlock key={p.name} size="lg" name={p.name} title={p.title} />
      ))}
    </div>
  );
}

function ImageGallery() {
  const sc = useScrollCarousel<HTMLUListElement>();
  const imgs = [
    ['w-[240px] md:w-[480px]', 'h-[360px] md:h-[720px]', 'warm'],
    ['w-[300px] md:w-[720px]', 'h-[200px] md:h-[480px]', 'cool'],
    ['w-[300px] md:w-[840px]', 'h-[200px] md:h-[560px]', 'gray'],
  ] as const;
  return (
    <div className="flex flex-col gap-8" role="region" aria-roledescription="carousel" aria-label="Images">
      <ul ref={sc.ref} className={cx(scrollerClass, 'items-start gap-6 md:gap-8')}>
        {imgs.map(([w, h, tone], i) => (
          <li key={i} className={cx('shrink-0 snap-start', w)}>
            <ImagePlaceholder tone={tone} className={cx('w-full', h)} />
          </li>
        ))}
      </ul>
      <TestimonialArrows onPrev={sc.prev} onNext={sc.next} canPrev={sc.canPrev} canNext={sc.canNext} />
    </div>
  );
}

/**
 * BlogPostPageHeader — Figma "Blog post page header": a complete article page (hero header, featured image and the
 * article body built from ContentItems, with author / tags / share footer). Split image 01/03 add a sticky sidebar with
 * a scroll-spying table of contents.
 */
export const BlogPostPageHeader = forwardRef<HTMLElement, BlogPostPageHeaderProps>(function BlogPostPageHeader(
  { type = 'large-image-01', subheading, title, supportingText, badge, badgeMessage, author, date, tags, imageSrc, blocks, children, className, ...props },
  ref,
) {
  const p = presets[type];
  const sub = subheading === undefined ? p.sub : subheading;
  const ttl = title ?? p.title;
  const text = supportingText ?? p.text;
  const auth = author ?? p.author;
  const tg = tags ?? p.tags;
  const bdg = badge ?? p.badge;
  const bdgMsg = badgeMessage ?? p.badgeMessage;
  const dt = date ?? p.date;
  const body = useMemo(() => blocks ?? p.blocks(), [blocks, p]);
  const [policyTab, setPolicyTab] = useState('full');
  const policyBody = useMemo(
    () => (policyTab === 'full' ? body : body.filter((b, i) => b.type === 'heading' || (b.type === 'paragraph' && i > 0 && typeof b.children === 'string' && b.children.length < 260))),
    [policyTab, body],
  );
  const toc = useMemo(() => tocFrom(body), [body]);
  const badgeGroup = (modern?: boolean) =>
    bdg ? (
      <BadgeGroup static theme={modern ? 'modern' : 'light'} badge={bdg} className="self-start">
        {bdgMsg}
      </BadgeGroup>
    ) : null;
  const rich = (extra?: ReactNode, cls?: string) =>
    body.length || extra ? (
      <ContentRichText blocks={type === 'simple' ? policyBody : body} className={cls}>
        {extra}
        {children}
      </ContentRichText>
    ) : null;
  const tagsRow = tg && (
    <div className="mb-8 border-t border-gray-200 pt-6">
      <TagList tags={tg} />
    </div>
  );
  const sharePost = (
    <div className="flex flex-col gap-4 border-t border-gray-200 py-6 md:flex-row md:items-center md:justify-between">
      <p className="text-md font-semibold text-gray-600">Share this post</p>
      <ShareButtons />
    </div>
  );
  const articleSection = (content: ReactNode, cls?: string) => (
    <div className={cx('pb-16 md:pb-24', cls)}>
      <Container className="flex justify-center">{content}</Container>
    </div>
  );

  let out: ReactNode;
  switch (type) {
    case 'large-image-01':
    case 'large-image-02':
    case 'large-image-04': {
      const dark = type === 'large-image-04';
      out = (
        <>
          <header className={cx('pt-16 md:pt-24', dark ? 'bg-brand-800 pb-40' : 'pb-12 md:pb-16')}>
            <Container className="flex flex-col items-center gap-8 text-center">
              <div className="flex max-w-3xl flex-col items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-3">
                  <Sub center dark={dark}>{sub}</Sub>
                  <Title dark={dark}>{ttl}</Title>
                </div>
                <Lead dark={dark}>{text}</Lead>
              </div>
              {type === 'large-image-01' && tg && <TagList tags={tg} className="justify-center" />}
              {type !== 'large-image-01' && <Author a={auth} size={dark ? 'lg' : 'xl'} dark={dark} />}
            </Container>
          </header>
          <div className={cx('pb-16 md:pb-24', dark && '-mt-24')}>
            <Container className="flex justify-center">
              <ImagePlaceholder src={imageSrc} tone="cool" className={cx('h-60 w-full md:h-[640px]', type === 'large-image-02' && 'max-w-5xl md:h-[560px]')} />
            </Container>
          </div>
          {articleSection(
            rich(
              type === 'large-image-01' ? (
                <ArticleFooter className="mt-4" left={auth && <AuthorBlock name={auth.name} title={auth.title} />} />
              ) : (
                <ArticleFooter className="mt-4" left={tg && <TagList tags={tg} />} />
              ),
            ),
          )}
        </>
      );
      break;
    }
    case 'alternative-02':
      out = (
        <>
          <header className="pt-16 pb-12 md:pt-24 md:pb-16">
            <Container className="flex flex-col gap-12 md:gap-16">
              <div className="flex max-w-3xl flex-col gap-4 md:gap-6">
                <div className="flex flex-col gap-3">
                  <Sub>{sub}</Sub>
                  <Title>{ttl}</Title>
                </div>
                <Lead>{text}</Lead>
              </div>
              <ImageGallery />
            </Container>
          </header>
          {articleSection(rich(<ArticleFooter className="mt-4" share={false} left={<div className="flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between">{auth && <AuthorBlock name={auth.name} title={auth.title} />}{tg && <TagList tags={tg} />}</div>} />))}
        </>
      );
      break;
    case 'simple':
      out = (
        <>
          <header className="pt-16 pb-12 md:pt-24 md:pb-16">
            <Container className="flex flex-col items-center gap-8 text-center md:gap-12">
              <div className="flex max-w-3xl flex-col items-center gap-4 md:gap-6">
                <div className="flex flex-col gap-3">
                  <Sub center>{sub}</Sub>
                  <Title>{ttl}</Title>
                </div>
                <Lead>{text}</Lead>
              </div>
              <Tabs
                type="button-white-border"
                size="md"
                value={policyTab}
                onChange={setPolicyTab}
                aria-label="Policy version"
                items={[
                  { id: 'full', label: 'Full version' },
                  { id: 'simple', label: 'Simplified' },
                ]}
              />
            </Container>
          </header>
          {articleSection(rich())}
        </>
      );
      break;
    case 'large-image-03':
      out = (
        <>
          <header className="pt-16 pb-16 md:pt-24 md:pb-24">
            <Container className="flex flex-col gap-12 md:gap-16">
              <div className="flex max-w-3xl flex-col gap-4 md:gap-6">
                <div className="flex flex-col gap-4">
                  {badgeGroup()}
                  <Title>{ttl}</Title>
                </div>
                <Lead>{text}</Lead>
              </div>
              <div className="flex flex-col gap-8">
                <ImagePlaceholder src={imageSrc} tone="cool" className="h-60 w-full md:h-[640px]" />
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <dl className="flex gap-12">
                    <div className="flex flex-col gap-3">
                      <dt className="text-sm font-semibold text-brand-600">Written by</dt>
                      <dd className="text-lg font-medium text-gray-900">{auth?.name}</dd>
                    </div>
                    <div className="flex flex-col gap-3">
                      <dt className="text-sm font-semibold text-brand-600">Published on</dt>
                      <dd className="text-lg font-medium text-gray-900">{dt}</dd>
                    </div>
                  </dl>
                  <ShareButtons />
                </div>
              </div>
            </Container>
          </header>
          <div className="pb-16 md:pb-24">
            <Container className="flex flex-col gap-12 lg:flex-row lg:justify-center lg:gap-24">
              {rich(undefined, 'lg:flex-1')}
              <aside className="w-full lg:sticky lg:top-8 lg:w-96 lg:self-start">
                <BlogSubscribeCard />
              </aside>
            </Container>
          </div>
        </>
      );
      break;
    case 'split-image-04':
    case 'alternative-03':
    case 'split-image-02': {
      const imageLeft = type === 'alternative-03';
      const content = (
        <div className={cx('flex w-full flex-col gap-8 md:gap-12', imageLeft ? 'max-w-[640px] md:px-8' : 'max-w-[640px] md:pr-8')}>
          <div className="flex flex-col gap-4 md:gap-6">
            <div className="flex flex-col gap-3 md:gap-4">
              {type === 'alternative-03' ? <MarkerPin02 className="size-6 text-gray-500" aria-hidden /> : <Sub>{sub}</Sub>}
              <Title>{ttl}</Title>
            </div>
            <Lead className="max-w-[480px]">{text}</Lead>
          </div>
          <Author a={auth} />
        </div>
      );
      const image =
        type === 'split-image-02' ? (
          <div className="flex items-center justify-center bg-gray-50 p-4 md:w-1/2 md:p-8">
            <ImagePlaceholder src={imageSrc} tone="warm" className="h-[400px] w-full max-w-[400px] md:h-[560px]" />
          </div>
        ) : (
          <ImagePlaceholder src={imageSrc} tone={imageLeft ? 'cool' : 'warm'} className={cx('h-60 md:h-auto md:w-1/2', imageLeft ? 'md:min-h-[800px]' : 'md:min-h-[720px]')} />
        );
      out = (
        <>
          <header className={cx('flex flex-col gap-12 md:flex-row md:gap-0', imageLeft && 'md:flex-row-reverse')}>
            <div className={cx('flex px-4 pt-16 md:w-1/2 md:px-8 md:py-24', imageLeft ? 'md:items-center md:justify-start md:pl-16' : 'md:justify-end', type === 'split-image-02' ? 'md:items-end' : 'md:items-center')}>
              {content}
            </div>
            <div className="max-md:px-4 md:contents">{image}</div>
          </header>
          {articleSection(rich(<div className="mt-4">{sharePost}</div>), 'pt-16 md:pt-24')}
        </>
      );
      break;
    }
    case 'split-image-03':
    case 'split-image-01': {
      const s3 = type === 'split-image-03';
      out = (
        <>
          <header className="pt-12 pb-16 md:pt-16 md:pb-24">
            <Container className="flex flex-col gap-12 md:flex-row md:items-center md:gap-8">
              <div className="flex flex-col gap-8 md:flex-1 md:gap-12 md:pr-8">
                <div className="flex flex-col gap-4 md:gap-6">
                  <div className="flex flex-col gap-4">
                    {badgeGroup(s3)}
                    <Title size={s3 ? 'lg' : 'xl'}>{ttl}</Title>
                  </div>
                  <Lead className="max-w-[560px]">{text}</Lead>
                </div>
                {!s3 && <Author a={auth} />}
              </div>
              <div className="relative md:flex-1">
                <ImagePlaceholder src={imageSrc} tone="cool" className="h-[400px] md:h-[640px]" />
                {s3 ? (
                  <HandDrawnLine variant="squiggle" className="pointer-events-none absolute bottom-[-40px] left-[-20%] hidden w-[144%] text-brand-600 md:block" width="144%" />
                ) : (
                  <HandDrawnArrow variant="41" className="pointer-events-none absolute -bottom-16 -left-56 hidden rotate-[141deg] text-gray-900 lg:block" width={230} />
                )}
              </div>
            </Container>
          </header>
          <div className="pb-16 md:pb-24">
            <Container className={cx('flex flex-col gap-12 lg:flex-row lg:gap-16', s3 ? 'lg:justify-center' : 'mx-auto max-w-[1088px] lg:justify-start')}>
              <aside className={cx('flex w-full shrink-0 flex-col gap-8 lg:sticky lg:top-8 lg:self-start', s3 ? 'lg:w-[280px]' : 'lg:w-60')}>
                <hr className="border-gray-200" />
                <TableOfContents items={toc} />
                <hr className="border-gray-200" />
                {s3 && (
                  <>
                    <Contributors />
                    <hr className="border-gray-200" />
                    <SidebarNewsletter />
                    <hr className="border-gray-200" />
                  </>
                )}
                <ShareButtons copy={false} platforms={['x', 'facebook', 'linkedin', 'instagram']} />
              </aside>
              {s3 ? (
                rich(undefined, 'lg:flex-1')
              ) : (
                <div className="flex w-full max-w-[720px] flex-col lg:flex-1">
                  {tagsRow}
                  <ContentRichText blocks={body}>{children}</ContentRichText>
                </div>
              )}
            </Container>
          </div>
        </>
      );
      break;
    }
    case 'alternative-01':
      out = (
        <div className="pt-12 pb-16 md:pt-16 md:pb-24">
          <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="relative lg:sticky lg:top-8 lg:flex-1 lg:self-start">
              <ImagePlaceholder src={imageSrc} tone="warm" className="flex h-[400px] items-center justify-center md:h-[640px]">
                <GlassPlayButton size={128} className="relative max-md:size-20!" />
              </ImagePlaceholder>
              <HandDrawnLine variant="squiggle" className="pointer-events-none absolute bottom-[-32px] left-[-8%] hidden w-[108%] text-brand-600 lg:block" width="108%" />
            </div>
            <div className="flex flex-col gap-16 lg:flex-1 lg:gap-32 lg:py-32">
              <div className="flex flex-col gap-8 md:gap-12">
                <div className="flex flex-col gap-6 md:gap-8">
                  <div className="flex flex-col gap-4">
                    {badgeGroup(true)}
                    <Title>{ttl}</Title>
                  </div>
                  <Lead>{text}</Lead>
                </div>
                <Author a={auth} />
              </div>
              <div className="flex flex-col">
                {tagsRow}
                <ContentRichText blocks={body}>{children}</ContentRichText>
              </div>
            </div>
          </Container>
        </div>
      );
      break;
  }

  return (
    <article ref={ref} className={cx('w-full overflow-x-clip bg-white', className)} data-type={type} {...props}>
      {out}
    </article>
  );
});
