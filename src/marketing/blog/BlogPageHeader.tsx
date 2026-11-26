import { forwardRef, useId, useMemo, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowUpRight, SearchLg } from '../../icons';
import { AvatarLabelGroup } from '../../components/avatars/Avatar';
import { Badge } from '../../components/badges/Badge';
import { Button } from '../../components/buttons/Button';
import { Select } from '../../components/dropdowns/Select';
import { Input } from '../../components/inputs/Input';
import { Pagination } from '../../components/pagination/Pagination';
import { Tabs, type TabsType } from '../../components/tabs/Tabs';
import { VerticalTabs, type VerticalTabsType } from '../../components/tabs/VerticalTabs';
import { Container, ImagePlaceholder } from '../_shared';
import { initialsOf } from '../testimonials/_parts';
import { BlogPostCard, type BlogPostCardType } from './BlogPostCard';
import { BlogSubscribeCard } from './BlogSubscribeCard';
import { blogCategoryDefaults, blogPostDefaults, blogSidebarCategoryDefaults, featuredPostDefault, type BlogPost } from './defaults';

export type BlogPageHeaderType =
  | 'simple-01'
  | 'simple-02'
  | 'simple-03'
  | 'simple-04'
  | 'simple-05'
  | 'simple-06'
  | 'featured-post-01'
  | 'featured-post-02'
  | 'featured-post-03'
  | 'featured-post-04'
  | 'sidebar-01'
  | 'sidebar-02'
  | 'alt-layout-01'
  | 'alt-layout-02'
  | 'alt-layout-03'
  | 'alt-layout-04';

export interface BlogPageHeaderProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: BlogPageHeaderType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Posts listed in the grid (filtered by the selected category tab). */
  posts?: BlogPost[];
  /** The featured post of featured / alt / sidebar layouts. */
  featuredPost?: BlogPost;
  /** Category tab labels; the first one ("View all") shows every post. */
  categories?: string[];
  /** Number of pages in the pagination. */
  totalPages?: number;
  /** Called with the email of the header email capture. */
  onSubscribe?: (email: string) => void;
  /** Called with the search query (search bar / sidebar search). */
  onSearch?: (query: string) => void;
}

/* ------------------------------------------------------------------ header block (Figma "Header section") */

type HeaderColor = 'default' | 'gray-light' | 'brand' | 'gray-dark';
type HeaderAlign = 'left' | 'center' | 'space-between';
type HeaderAction = 'none' | 'search' | 'email';

const headerColor: Record<HeaderColor, { bg: string; heading: string; sub: string; text: string; dark: boolean }> = {
  default: { bg: 'bg-white', heading: 'text-gray-900', sub: 'text-brand-700', text: 'text-gray-600', dark: false },
  'gray-light': { bg: 'bg-gray-50', heading: 'text-gray-900', sub: 'text-brand-700', text: 'text-gray-600', dark: false },
  brand: { bg: 'bg-brand-800', heading: 'text-white', sub: 'text-brand-200', text: 'text-brand-200', dark: true },
  'gray-dark': { bg: 'bg-gray-950', heading: 'text-white', sub: 'text-gray-200', text: 'text-gray-200', dark: true },
};

function EmailCapture({ button, dark, onSubscribe, className }: { button: string; dark: boolean; onSubscribe?: (email: string) => void; className?: string }) {
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get('email');
    onSubscribe?.(typeof v === 'string' ? v : '');
  };
  return (
    <form onSubmit={submit} className={cx('flex w-full max-w-[480px] flex-col gap-4 sm:flex-row', className)}>
      <Input
        name="email"
        type="email"
        required
        aria-label="Email"
        placeholder="Enter your email"
        className={cx('flex-1', dark && '[&_p]:text-current')}
        hint={
          <span className={dark ? 'text-current' : undefined}>
            We care about your data in our <a href="#" className="underline underline-offset-2">privacy policy</a>.
          </span>
        }
      />
      <Button type="submit" size="xl" className="max-sm:w-full">{button}</Button>
    </form>
  );
}

function SearchBar({ onSearch, className }: { onSearch?: (q: string) => void; className?: string }) {
  return (
    <Input
      type="search"
      aria-label="Search"
      placeholder="Search"
      iconLeading={SearchLg}
      className={className}
      onChange={(e) => onSearch?.(e.currentTarget.value)}
    />
  );
}

function BlogHeaderBlock({
  subheading,
  title,
  supportingText,
  align,
  action,
  color,
  button = 'Get started',
  overlap,
  compact,
  onSubscribe,
  onSearch,
}: {
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  align: HeaderAlign;
  action: HeaderAction;
  color: HeaderColor;
  button?: string;
  /** Extra bottom padding so the next section can overlap it (Figma gap -96). */
  overlap?: boolean;
  /** 64px bottom padding instead of 96px. */
  compact?: boolean;
  onSubscribe?: (email: string) => void;
  onSearch?: (q: string) => void;
}) {
  const c = headerColor[color];
  const center = align === 'center';
  const sub = subheading != null && <p className={cx('text-sm font-semibold md:text-md', c.sub)}>{subheading}</p>;
  const h1 = <h1 className={cx('text-display-md font-semibold md:text-display-lg', c.heading)}>{title}</h1>;
  const text = supportingText != null && <p className={cx('text-lg md:text-xl', c.text)}>{supportingText}</p>;
  const act =
    action === 'email' ? (
      <EmailCapture button={button} dark={c.dark} onSubscribe={onSubscribe} className={cx(center && 'mx-auto', c.dark && 'text-gray-200')} />
    ) : action === 'search' ? (
      <SearchBar onSearch={onSearch} className={cx('w-full md:w-80', center && 'mx-auto')} />
    ) : null;
  return (
    <header className={cx('pt-16 md:pt-24', overlap ? 'pb-40 md:pb-40' : compact ? 'pb-12 md:pb-16' : 'pb-16 md:pb-24', c.bg)}>
      <Container>
        {align === 'space-between' ? (
          <div className="flex flex-col gap-3">
            {sub}
            <div className="flex flex-col gap-4 md:gap-8 lg:flex-row lg:justify-between">
              <div className="flex flex-col gap-8 lg:flex-1">
                {h1}
                <div className="max-lg:order-last">{act}</div>
              </div>
              <div className="lg:w-[480px] lg:py-3">{text}</div>
            </div>
          </div>
        ) : (
          <div className={cx('flex flex-col gap-8 md:gap-12', center && 'items-center text-center')}>
            <div className={cx('flex max-w-3xl flex-col gap-4 md:gap-6', center && 'items-center')}>
              <div className="flex flex-col gap-3">
                {sub}
                {h1}
              </div>
              {text}
            </div>
            {act}
          </div>
        )}
      </Container>
    </header>
  );
}

/* ------------------------------------------------------------------ shared parts */

const tones = ['gray', 'warm', 'cool', 'brand', 'dark'] as const;
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function useCategoryFilter(categories: string[], posts: BlogPost[]) {
  const [cat, setCat] = useState(slug(categories[0] ?? 'view-all'));
  const filtered = useMemo(() => {
    if (cat === slug(categories[0] ?? '')) return posts;
    const f = posts.filter((p) => p.category && slug(p.category) === cat);
    return f;
  }, [cat, categories, posts]);
  const items = categories.map((c) => ({ id: slug(c), label: c }));
  return { cat, setCat, filtered, items };
}

function PostGrid({ posts, type, cols = 3, insert, orientation = 'vertical' }: { posts: BlogPost[]; type: BlogPostCardType; cols?: 1 | 2 | 3; insert?: { at: number; node: ReactNode }; orientation?: 'vertical' | 'horizontal' }) {
  const cards: ReactNode[] = posts.map((p, i) => <BlogPostCard key={i} type={type} orientation={orientation} imageTone={tones[i % tones.length]} {...p} />);
  if (insert) cards.splice(Math.min(insert.at, cards.length), 0, <div key="insert">{insert.node}</div>);
  if (!posts.length) return <p className="py-12 text-center text-md text-gray-600">No posts in this category yet.</p>;
  return (
    <div
      className={cx(
        'grid gap-x-8 gap-y-12',
        cols === 3 && 'md:grid-cols-2 lg:grid-cols-3',
        cols === 2 && 'md:grid-cols-2',
        orientation === 'horizontal' && cols === 1 && 'gap-y-12',
      )}
    >
      {cards}
    </div>
  );
}

function Sidebar({ items, value, onChange, tabsType, onSearch }: { items: { id: string; label: string }[]; value: string; onChange: (v: string) => void; tabsType: VerticalTabsType; onSearch?: (q: string) => void }) {
  const id = useId();
  return (
    <aside className="flex w-full shrink-0 flex-col gap-8 lg:sticky lg:top-8 lg:w-[280px] lg:self-start">
      <SearchBar onSearch={onSearch} />
      <div className="flex flex-col gap-5">
        <p id={id} className="text-sm font-semibold text-brand-700">Blog categories</p>
        <VerticalTabs items={items} type={tabsType} size="md" value={value} onChange={onChange} mobileSelect aria-label="Blog categories" />
      </div>
    </aside>
  );
}

function TabsRow({ items, value, onChange, tabsType, trailing }: { items: { id: string; label: string }[]; value: string; onChange: (v: string) => void; tabsType: TabsType; trailing?: ReactNode }) {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">
      <Tabs items={items} type={tabsType} size="md" value={value} onChange={onChange} mobileSelect aria-label="Blog categories" className="min-w-0 flex-1" />
      {trailing}
    </div>
  );
}

function SortSelect() {
  return (
    <Select
      size="md"
      className="w-full md:w-80"
      defaultValue="recent"
      items={[
        { value: 'recent', label: 'Most recent' },
        { value: 'popular', label: 'Most popular' },
        { value: 'oldest', label: 'Oldest' },
      ]}
    />
  );
}

/** Featured article with a large photo and glass attribution panel (Featured post 01 / 02). */
function FeaturedArticle({ post, variant }: { post: BlogPost; variant: '01' | '02' }) {
  return (
    <article className={cx('group/post relative overflow-hidden', variant === '01' && 'rounded-2xl')}>
      <ImagePlaceholder src={post.imageSrc} tone="cool" className="h-[480px] md:h-[720px]">
        {variant === '02' && (
          <svg viewBox="0 0 80 80" className="absolute top-0 left-0 size-12 md:size-20" aria-hidden>
            <path d="M0 0H80L0 80Z" className="fill-white" />
            <path d="M80 0V80H0Z" className="fill-gray-900" />
          </svg>
        )}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-b from-black/0 to-black/40 pt-16 md:pt-24">
          <div className="flex flex-col gap-6 border-t border-white/30 bg-white/30 p-5 backdrop-blur-lg md:p-8">
            {variant === '01' ? (
              <>
                <div className="flex flex-col gap-2">
                  <h2 className="flex items-start gap-4 text-xl font-semibold text-white md:text-display-xs">
                    <a href={post.href ?? '#'} className="flex-1 outline-none after:absolute after:inset-0 group-hover/post:underline focus-visible:underline">{post.title}</a>
                    <ArrowUpRight className="mt-1 size-6 shrink-0" aria-hidden />
                  </h2>
                  <p className="text-md text-white">{post.excerpt}</p>
                </div>
                <dl className="flex flex-col gap-6 text-white md:flex-row md:justify-between">
                  <div className="flex gap-8">
                    <div className="flex flex-col gap-2">
                      <dt className="text-sm font-semibold">Written by</dt>
                      <dd>{post.author && <AvatarLabelGroup size="md" initials={initialsOf(post.author.name)} src={post.author.avatarSrc} title={<span className="text-white">{post.author.name}</span>} />}</dd>
                    </div>
                    <div className="flex flex-col gap-2">
                      <dt className="text-sm font-semibold">Published on</dt>
                      <dd className="py-2 text-md font-semibold">{post.date}</dd>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <dt className="text-sm font-semibold">File under</dt>
                    <dd className="relative z-[1] flex h-10 flex-wrap items-center gap-2">
                      {post.tags?.map((t) => (
                        <Badge key={t.label} size="md" type="pill-outline" color="gray" className="border-white bg-transparent text-white ring-white">
                          {t.label}
                        </Badge>
                      ))}
                    </dd>
                  </div>
                </dl>
              </>
            ) : (
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-white md:text-display-xs">
                    <a href={post.href ?? '#'} className="outline-none after:absolute after:inset-0 group-hover/post:underline focus-visible:underline">{post.title}</a>
                  </h2>
                  <p className="text-md text-white">{post.excerpt}</p>
                </div>
                {post.author && (
                  <AvatarLabelGroup
                    size="md"
                    className="shrink-0"
                    initials={initialsOf(post.author.name)}
                    src={post.author.avatarSrc}
                    title={<span className="text-white">{post.author.name}</span>}
                    subtitle={<span className="text-white">{post.date}</span>}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </ImagePlaceholder>
    </article>
  );
}

/* ------------------------------------------------------------------ copy per type */

const B = 'Our blog';
const T1 = 'The latest industry news, interviews, technologies, and resources.';
const T2 = 'Subscribe to learn about new product features, the latest in technology, solutions, and updates.';
const T3 = 'Tool and strategies modern teams need to help their companies grow.';

const header: Record<
  BlogPageHeaderType,
  { sub: string; title: string; text: string; align: HeaderAlign; action: HeaderAction; color: HeaderColor; button?: string; overlap?: boolean; compact?: boolean }
> = {
  'simple-01': { sub: B, title: 'The latest writings from our team', text: T1, align: 'center', action: 'search', color: 'default' },
  'simple-02': { sub: 'Blog', title: 'Resource library', text: T2, align: 'center', action: 'email', color: 'gray-light', button: 'Subscribe', overlap: true },
  'simple-03': {
    sub: B,
    title: 'Stories and interviews',
    text: 'The blog is the best source of information for interviews, tips, guides, industry best practices, and news. Subscribe for updates in your inbox every week.',
    align: 'center',
    action: 'email',
    color: 'brand',
    overlap: true,
  },
  'simple-04': { sub: 'Resources', title: 'Tinicorn blog', text: T3, align: 'center', action: 'email', color: 'brand' },
  'simple-05': { sub: 'Blog', title: 'Resource library', text: T2, align: 'space-between', action: 'email', color: 'gray-light', button: 'Subscribe' },
  'simple-06': { sub: B, title: 'Stories and interviews', text: T2, align: 'space-between', action: 'email', color: 'default' },
  'featured-post-01': { sub: B, title: 'Resources and insights', text: T1, align: 'left', action: 'none', color: 'default', compact: true },
  'featured-post-02': { sub: B, title: 'The latest writings from our team', text: T1, align: 'center', action: 'none', color: 'default', compact: true },
  'featured-post-03': { sub: B, title: 'Resources and insights', text: T1, align: 'center', action: 'email', color: 'default' },
  'featured-post-04': { sub: B, title: 'Resources and insights', text: T1, align: 'center', action: 'email', color: 'gray-dark', overlap: true },
  'sidebar-01': { sub: 'Resources', title: 'Tinicorn blog', text: T3, align: 'left', action: 'email', color: 'gray-light' },
  'sidebar-02': { sub: B, title: 'Resources and insights', text: T1, align: 'left', action: 'none', color: 'default' },
  'alt-layout-01': { sub: 'Blog', title: 'Resource library', text: T2, align: 'left', action: 'email', color: 'gray-light' },
  'alt-layout-02': { sub: B, title: 'Stories and interviews', text: T2, align: 'center', action: 'email', color: 'default' },
  'alt-layout-03': { sub: 'Blog', title: 'Resource library', text: T2, align: 'left', action: 'email', color: 'default' },
  'alt-layout-04': { sub: 'Resources', title: 'Tinicorn blog', text: T3, align: 'center', action: 'email', color: 'default' },
};

/* ------------------------------------------------------------------ component */

/**
 * BlogPageHeader — Figma "Blog page header": a complete blog index page top (header section, optional featured post,
 * category tabs or sidebar, post grid and pagination / load more). Category tabs filter the posts.
 */
export const BlogPageHeader = forwardRef<HTMLElement, BlogPageHeaderProps>(function BlogPageHeader(
  { type = 'simple-01', subheading, title, supportingText, posts = blogPostDefaults, featuredPost, categories, totalPages = 10, onSubscribe, onSearch, className, ...props },
  ref,
) {
  const h = header[type];
  const sidebarType = type === 'sidebar-01' || type === 'sidebar-02' || type === 'featured-post-02';
  const cats = categories ?? (sidebarType ? blogSidebarCategoryDefaults : blogCategoryDefaults);
  const f = useCategoryFilter(cats, posts);
  const feat = featuredPost ?? (type.startsWith('featured-post-0') && (type.endsWith('1') || type.endsWith('2')) ? featuredPostDefault : posts[0]!);
  const pageShape = ['simple-01', 'featured-post-01', 'simple-03', 'simple-02', 'featured-post-04'].includes(type) ? 'circle' : 'square';
  const minimal = ['featured-post-02', 'simple-05', 'sidebar-02', 'sidebar-01', 'simple-06'].includes(type);
  const pagination = <Pagination total={totalPages} type={minimal ? 'page-minimal-center' : 'page-default'} shape={pageShape} />;
  const loadMore = (
    <div className="flex justify-center">
      <Button size="xl" hierarchy="secondary-color" className="max-sm:w-full">Load more</Button>
    </div>
  );
  const list = f.filtered;

  let body: ReactNode;
  switch (type) {
    case 'simple-01':
      body = (
        <>
          <TabsRow items={f.items} value={f.cat} onChange={f.setCat} tabsType="underline" trailing={<SortSelect />} />
          <PostGrid posts={list.slice(0, 8)} type="simple-01" insert={{ at: 3, node: <BlogSubscribeCard className="h-full" /> }} />
          {pagination}
        </>
      );
      break;
    case 'featured-post-01':
      body = (
        <>
          <FeaturedArticle post={feat} variant="01" />
          <TabsRow items={f.items} value={f.cat} onChange={f.setCat} tabsType="underline" trailing={<SortSelect />} />
          <PostGrid posts={list} type="simple-01" />
          {pagination}
        </>
      );
      break;
    case 'featured-post-02':
    case 'sidebar-01':
    case 'sidebar-02':
      body = (
        <>
          {type === 'featured-post-02' && <FeaturedArticle post={feat} variant="02" />}
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <Sidebar items={f.items} value={f.cat} onChange={f.setCat} tabsType={type === 'featured-post-02' ? 'line' : 'button-gray'} onSearch={onSearch} />
            <div className="flex min-w-0 flex-1 flex-col gap-12 md:gap-16">
              {type === 'sidebar-02' && <BlogPostCard type="simple-02" orientation="horizontal" featured headingClassName="text-lg md:text-xl" imageTone="warm" {...feat} />}
              <PostGrid posts={type === 'sidebar-02' ? list.slice(1) : list.slice(0, 8)} type={type === 'sidebar-01' ? 'simple-04' : 'simple-02'} cols={2} />
              {pagination}
            </div>
          </div>
        </>
      );
      break;
    case 'simple-05':
    case 'simple-06':
      body = (
        <>
          <TabsRow items={f.items} value={f.cat} onChange={f.setCat} tabsType={type === 'simple-05' ? 'button-gray' : 'button-primary'} />
          <PostGrid posts={list.slice(0, 8)} type={type === 'simple-05' ? 'simple-04' : 'simple-01'} orientation={type === 'simple-06' ? 'horizontal' : 'vertical'} cols={2} />
          {pagination}
        </>
      );
      break;
    case 'alt-layout-01':
    case 'alt-layout-03':
      body = (
        <>
          <BlogPostCard
            type="simple-02"
            orientation="horizontal"
            featured
            imageTone="warm"
            imageClassName={cx('sm:min-h-[400px]', type === 'alt-layout-03' && 'rounded-2xl')}
            {...(type === 'alt-layout-03' ? { ...feat, category: 'New feature' } : feat)}
          />
          {type === 'alt-layout-03' ? (
            <div className="flex flex-col gap-12">
              <TabsRow items={f.items} value={f.cat} onChange={f.setCat} tabsType="button-primary" trailing={<SearchBar onSearch={onSearch} className="w-full md:w-[280px]" />} />
              <PostGrid posts={list.slice(0, 6)} type="simple-03" />
            </div>
          ) : (
            <PostGrid posts={list.slice(0, 8)} type="simple-02" cols={2} />
          )}
          {type === 'alt-layout-03' ? loadMore : pagination}
        </>
      );
      break;
    case 'alt-layout-02':
      body = (
        <>
          <div className="flex flex-col gap-8">
            <h2 className="text-display-xs font-semibold text-gray-900 md:text-display-sm">Recent blog posts</h2>
            <div className="grid gap-8 lg:grid-cols-2">
              <BlogPostCard type="simple-03" imageTone="cool" {...posts[0]!} />
              <div className="flex flex-col gap-8">
                {posts.slice(1, 3).map((p, i) => (
                  <BlogPostCard key={i} type="simple-03" orientation="horizontal" imageTone={tones[i + 1]} {...p} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-display-xs font-semibold text-gray-900 md:text-display-sm">All blog posts</h2>
            <PostGrid posts={posts.slice(3, 9)} type="simple-03" />
          </div>
          {pagination}
        </>
      );
      break;
    case 'featured-post-03':
    case 'featured-post-04':
      body = (
        <>
          <BlogPostCard type="simple-03" imageTone="cool" imageClassName="h-60 md:h-[620px]" headingClassName="text-xl md:text-display-xs" {...feat} />
          <PostGrid posts={posts.slice(1, 7)} type="simple-03" />
          {pagination}
        </>
      );
      break;
    case 'alt-layout-04':
      body = (
        <>
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
            {list.map((p, i) => (
              <BlogPostCard key={i} type="simple-01" orientation="horizontal" imageTone={tones[i % tones.length]} {...p} />
            ))}
          </div>
          {pagination}
        </>
      );
      break;
    case 'simple-02':
    case 'simple-03':
    case 'simple-04':
      body = (
        <>
          <PostGrid posts={list} type={type === 'simple-02' ? 'simple-02' : type === 'simple-03' ? 'simple-03' : 'simple-04'} />
          {type === 'simple-04' ? loadMore : pagination}
        </>
      );
      break;
  }

  return (
    <section ref={ref} className={cx('w-full overflow-x-clip bg-white', className)} data-type={type} {...props}>
      <BlogHeaderBlock
        subheading={subheading === undefined ? h.sub : subheading}
        title={title ?? h.title}
        supportingText={supportingText ?? h.text}
        align={h.align}
        action={h.action}
        color={h.color}
        button={h.button}
        overlap={h.overlap}
        compact={h.compact}
        onSubscribe={onSubscribe}
        onSearch={onSearch}
      />
      <div className={cx('relative pb-16 md:pb-24', h.overlap ? '-mt-24' : h.color !== 'default' ? 'pt-16 md:pt-24' : '')}>
        <Container className="flex flex-col gap-12 md:gap-16">{body}</Container>
      </div>
    </section>
  );
});
