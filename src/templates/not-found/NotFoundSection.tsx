import { forwardRef, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { Badge } from '../../components/badges/Badge';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { BackgroundPattern } from '../../components/empty-state/BackgroundPattern';
import { EmptyStateIllustration } from '../../components/empty-state/EmptyStateIllustration';
import { ScreenMockup } from '../../components/mockups/ScreenMockup';
import { ArrowLeft, ArrowRight, BookOpen01, FileCode01, MessageChatCircle, SearchLg } from '../../icons';
import { ImagePlaceholder } from '../../marketing/_shared';

export type NotFoundType =
  | 'simple-01'
  | 'simple-02'
  | 'simple-03'
  | 'simple-04'
  | 'simple-05'
  | 'simple-06'
  | 'split-image-01'
  | 'split-image-02'
  | 'split-image-03'
  | 'split-image-04'
  | 'split-image-05'
  | 'illustration'
  | 'screen-mockup'
  | 'under-maintenance';

export interface NotFoundLink {
  icon?: IconSlot;
  title: ReactNode;
  description?: ReactNode;
  /** Card link label (simple-04). */
  linkLabel?: ReactNode;
  href?: string;
  onClick?: () => void;
}

export const defaultNotFoundLinks: NotFoundLink[] = [
  { icon: FileCode01, title: 'Documentation', description: 'Dive in to learn all about our product.', linkLabel: 'Start learning', href: '#' },
  { icon: BookOpen01, title: 'Our blog', description: 'Read the latest posts on our blog.', linkLabel: 'View lastest posts', href: '#' },
  { icon: MessageChatCircle, title: 'Chat to us', description: 'Can’t find what you’re looking for?', linkLabel: 'Chat to our team', href: '#' },
];
const resourceLinks: NotFoundLink[] = [
  { ...defaultNotFoundLinks[0] },
  { ...defaultNotFoundLinks[1] },
  { icon: MessageChatCircle, title: 'Chat to support', description: 'Our friendly team is here to help.', href: '#' },
];

const SEARCH_TEXT = 'Sorry, the page you are looking for doesn\'t exist or has been moved. Try searching our site:';
const LINKS_TEXT = 'Sorry, the page you are looking for doesn\'t exist. Here are some helpful links:';

/** Figma copy per type: [subheading kind, subheading, title, supporting text, primary label]. */
const copy: Record<NotFoundType, { sub?: 'text' | 'badge'; title: string; text: string; primary?: string }> = {
  'simple-01': { sub: 'text', title: 'We can’t find that page', text: 'Sorry, the page you are looking for doesn\'t exist or has been moved.', primary: 'Take me home' },
  'simple-02': { sub: 'badge', title: 'Page not found', text: 'Sorry, the page you are looking for doesn\'t exist.' },
  'simple-03': { title: 'Page not found', text: 'The page you are looking for doesn\'t exist. Here are some helpful links:', primary: 'Take me home' },
  'simple-04': { sub: 'text', title: 'We lost this page', text: 'We searched high and low, but couldn’t find what you’re looking for. Let’s find a better place for you to go.' },
  'simple-05': { title: 'We lost this page', text: 'The page you are looking for doesn\'t exist or has been moved.' },
  'simple-06': { sub: 'badge', title: 'We can’t find this page', text: 'The page you are looking for doesn\'t exist or has been moved.' },
  'split-image-01': { title: '404 error', text: SEARCH_TEXT },
  'split-image-02': { title: 'Page not found', text: 'Sorry, the page you are looking for doesn\'t exist or has been moved. Here are some helpful links:', primary: 'Take me home' },
  'split-image-03': { title: 'Uh oh, we can’t find that page...', text: SEARCH_TEXT },
  'split-image-04': { sub: 'badge', title: 'Page not found', text: LINKS_TEXT },
  'split-image-05': { sub: 'text', title: 'We lost this page', text: 'Sorry, the page you are looking for doesn\'t exist.' },
  illustration: { sub: 'text', title: 'Page not found', text: LINKS_TEXT, primary: 'Take me home' },
  'screen-mockup': { sub: 'text', title: 'Under maintenance', text: 'The page you’re looking for is currently under maintenance and will be back soon. Stay tuned!' },
  'under-maintenance': { sub: 'text', title: 'Under maintenance', text: SEARCH_TEXT },
};

export interface NotFoundSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: NotFoundType;
  /** Eyebrow text / badge label (default "404 error"). */
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** "Go back" button (default `history.back()`). */
  onGoBack?: () => void;
  /** Primary button ("Go home" / "Take me home"). */
  onGoHome?: () => void;
  homeHref?: string;
  homeLabel?: ReactNode;
  /** Called with the query from the search field (types with a search). */
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  /** Helpful links (simple-02/03/04/06, split-image-05). */
  links?: NotFoundLink[];
  /** Photo for the split-image types. */
  imageSrc?: string;
  /** Screen content for `screen-mockup`. */
  mockupScreen?: ReactNode;
}

/** NotFoundSection — Figma "404 section" (Shared assets / 404 pages). Responsive Desktop/Mobile. */
export const NotFoundSection = forwardRef<HTMLElement, NotFoundSectionProps>(function NotFoundSection(
  {
    type = 'simple-01',
    subheading = '404 error',
    title,
    supportingText,
    onGoBack,
    onGoHome,
    homeHref,
    homeLabel,
    onSearch,
    searchPlaceholder = 'Search our site',
    links,
    imageSrc,
    mockupScreen,
    className,
    ...props
  },
  ref,
) {
  const c = copy[type];
  const [query, setQuery] = useState('');
  const centered = ['simple-03', 'simple-04', 'simple-05', 'simple-06'].includes(type);
  const big = type.startsWith('simple');
  const isSplitHalf = type === 'split-image-01' || type === 'split-image-02' || type === 'split-image-03';

  const back = () => (onGoBack ? onGoBack() : typeof window !== 'undefined' && window.history.back());
  const actions = (
    <div className={cx('flex w-full flex-col-reverse gap-3 md:w-auto md:flex-row', centered && 'md:justify-center')}>
      <Button hierarchy="secondary-gray" size={big ? '2xl' : 'xl'} iconLeading={ArrowLeft} onClick={back} className="max-md:h-12 max-md:px-[18px] max-md:text-md">
        Go back
      </Button>
      <Button size={big ? '2xl' : 'xl'} as={homeHref ? 'a' : 'button'} href={homeHref} onClick={onGoHome} className="max-md:h-12 max-md:px-[18px] max-md:text-md">
        {homeLabel ?? c.primary ?? 'Go home'}
      </Button>
    </div>
  );
  const searchPrimary = !(type === 'simple-05' || type === 'simple-06');
  const search = (
    <form
      role="search"
      onSubmit={(e: FormEvent) => {
        e.preventDefault();
        onSearch?.(query);
      }}
      className={cx('flex w-full max-w-[480px] flex-col gap-4 md:flex-row', centered && 'mx-auto')}
    >
      <Input iconLeading={SearchLg} aria-label="Search" placeholder={searchPlaceholder} value={query} onChange={(e) => setQuery(e.target.value)} className="md:flex-1" inputClassName="md:py-0.5" />
      <Button type="submit" size="xl" hierarchy={searchPrimary ? 'primary' : 'secondary-gray'}>
        Search
      </Button>
    </form>
  );

  const sub =
    c.sub === 'text' ? (
      <p className="text-md font-semibold text-brand-700">{subheading}</p>
    ) : c.sub === 'badge' ? (
      <Badge size="lg" type="badge-modern" color="brand" dot>
        {subheading}
      </Badge>
    ) : null;
  const heading = (
    <div className={cx('relative flex flex-col gap-4 md:gap-6', centered && 'items-center text-center')}>
      <div className={cx('flex flex-col', c.sub === 'badge' ? 'gap-3 md:gap-4' : 'gap-3', centered && 'items-center')}>
        {sub}
        <h1 className="text-display-md font-semibold text-gray-900 md:text-display-xl">{title ?? c.title}</h1>
      </div>
      <p className={cx('text-lg text-gray-600 md:text-xl', !big && 'max-w-[480px]')}>{supportingText ?? c.text}</p>
    </div>
  );
  const featured = (size: 'lg' | 'xl') => <FeaturedIcon icon={SearchLg} size={size} color="brand" theme="modern" />;

  const resources = (list: NotFoundLink[]) => (
    <ul className="flex flex-col gap-6">
      {list.map((l, i) => (
        <li key={i} className="flex flex-col gap-1">
          <Button hierarchy="link-color" size="xl" iconTrailing={ArrowRight} as={l.href ? 'a' : 'button'} href={l.href} onClick={l.onClick} className="self-start">
            {l.title}
          </Button>
          <p className="text-md text-gray-600">{l.description}</p>
        </li>
      ))}
    </ul>
  );

  const sectionCls = 'relative isolate w-full overflow-hidden bg-white';

  /* ------------------------------------------------ split half-page (image fills the right half) */
  if (isSplitHalf) {
    return (
      <section ref={ref} className={cx(sectionCls, 'flex flex-col gap-16 py-16 lg:min-h-[960px] lg:flex-row lg:gap-0 lg:py-0', className)} {...props}>
        <div className="flex flex-1 items-center justify-center px-4 md:px-8 lg:py-24">
          <div className={cx('relative flex w-full max-w-[560px] flex-col gap-8 md:gap-12', type !== 'split-image-02' && 'lg:pr-8')}>
            {type === 'split-image-01' ? (
              <div className="relative flex flex-col gap-4 md:gap-6">
                <BackgroundPattern type="circles" size="lg" aria-hidden className="pointer-events-none absolute -top-[360px] -left-[360px] -z-10 text-gray-200" />
                <span className="md:hidden">{featured('lg')}</span>
                <span className="hidden md:block">{featured('xl')}</span>
                {heading}
              </div>
            ) : (
              heading
            )}
            {type === 'split-image-02' ? actions : search}
          </div>
        </div>
        <div className={cx('flex flex-1 px-4 md:px-8 lg:px-0', type === 'split-image-01' && 'lg:py-6 lg:pr-6')}>
          <ImagePlaceholder src={imageSrc} tone="cool" className="h-60 w-full lg:h-auto" />
        </div>
      </section>
    );
  }

  /* ------------------------------------------------ two columns inside the 1280 container */
  if (type === 'split-image-04' || type === 'split-image-05' || type === 'illustration' || type === 'screen-mockup' || type === 'under-maintenance') {
    let right: ReactNode;
    if (type === 'illustration')
      right = (
        <div className="flex h-[160px] items-center justify-start md:h-[349px] lg:justify-center">
          <EmptyStateIllustration type="cloud" color="gray" size="lg" className="origin-left scale-[0.7] md:scale-[2.18] lg:origin-center" />
        </div>
      );
    else if (type === 'under-maintenance') right = <MaintenanceIllustration className="w-[280px] md:w-[514px]" />;
    else if (type === 'screen-mockup')
      right = (
        <div className="relative h-[228px] w-full md:h-[598px]">
          <div className="absolute top-0 left-0 w-[342px] md:w-[1024px]">
            <ScreenMockup size="xl" className="max-md:rounded-md max-md:ring-4">{mockupScreen}</ScreenMockup>
          </div>
        </div>
      );
    else right = <ImagePlaceholder src={imageSrc} tone="warm" className="h-[280px] w-full lg:h-[800px]" />;

    const illustrationFirstMobile = type === 'illustration' || type === 'under-maintenance';
    return (
      <section ref={ref} className={cx(sectionCls, 'py-16 md:pt-16 md:pb-24', (type === 'illustration' || type === 'under-maintenance') && 'md:py-24', className)} {...props}>
        <div className="mx-auto flex max-w-[1280px] flex-col gap-16 px-4 md:px-8 lg:flex-row lg:items-center lg:gap-8">
          <div className={cx('flex flex-1 flex-col gap-8 md:gap-12', (type === 'illustration' || type === 'under-maintenance') && 'lg:pr-8', type === 'screen-mockup' && 'lg:pr-8')}>
            {illustrationFirstMobile && <div className="lg:hidden">{right}</div>}
            {heading}
            {type === 'split-image-05' ? (
              <>
                {search}
                {resources(links ?? resourceLinks)}
              </>
            ) : type === 'under-maintenance' ? (
              search
            ) : (
              actions
            )}
          </div>
          <div className={cx('flex min-w-0 flex-1 justify-center', illustrationFirstMobile && 'hidden lg:flex', type === 'screen-mockup' && 'overflow-visible')}>{right}</div>
        </div>
      </section>
    );
  }

  /* ------------------------------------------------ simple (single column) */
  const list = links ?? defaultNotFoundLinks;
  return (
    <section ref={ref} className={cx(sectionCls, 'py-16 md:py-24', (type === 'simple-01' || type === 'simple-02' || type === 'simple-03' || type === 'simple-05') && 'md:flex md:min-h-[960px] md:items-center', className)} {...props}>
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-16 px-4 md:gap-24 md:px-8">
        <div className={cx('relative flex flex-col gap-8 md:gap-12', centered ? 'mx-auto max-w-[768px] items-center' : 'max-w-[768px]')}>
          {type === 'simple-05' && <FourOhFour className="pointer-events-none absolute top-1/2 left-1/2 -z-10 w-[343px] -translate-x-1/2 -translate-y-1/2 md:w-[880px]" />}
          {type === 'simple-03' && (
            <div className="relative flex flex-col items-center gap-4 md:gap-6">
              <BackgroundPattern type="grid" size="lg" aria-hidden className="pointer-events-none absolute -top-[356px] left-1/2 -z-10 hidden -translate-x-1/2 text-gray-200 md:block" />
              <BackgroundPattern type="grid" size="md" aria-hidden className="pointer-events-none absolute -top-[216px] left-1/2 -z-10 -translate-x-1/2 text-gray-200 md:hidden" />
              <span className="md:hidden">{featured('lg')}</span>
              <span className="hidden md:block">{featured('xl')}</span>
            </div>
          )}
          {type === 'simple-06' && (
            <>
              <BackgroundPattern type="grid" size="lg" aria-hidden className="pointer-events-none absolute -top-[370px] left-1/2 -z-10 hidden -translate-x-1/2 text-gray-200 md:block" />
              <BackgroundPattern type="grid" size="md" aria-hidden className="pointer-events-none absolute -top-[226px] left-1/2 -z-10 -translate-x-1/2 text-gray-200 md:hidden" />
            </>
          )}
          {heading}
          {(type === 'simple-05' || type === 'simple-06') && <div className="w-full md:hidden">{search}</div>}
          {type === 'simple-05' && <div className="hidden w-full md:block">{search}</div>}
          {actions}
          {type === 'simple-02' && resources(links ?? resourceLinks)}
        </div>

        {type === 'simple-04' && (
          <ul className="grid gap-4 md:grid-cols-3 md:gap-8">
            {list.map((l, i) => (
              <li key={i} className="flex flex-col gap-8 bg-gray-50 p-5 md:gap-12 md:p-6">
                <FeaturedIcon icon={l.icon ?? FileCode01} size="lg" color="brand" theme="modern" />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold text-gray-900 md:text-xl">{l.title}</h3>
                  <p className="text-md text-gray-600">{l.description}</p>
                  <Button hierarchy="link-color" size="lg" iconTrailing={ArrowRight} as={l.href ? 'a' : 'button'} href={l.href} onClick={l.onClick} className="mt-3 self-start md:mt-3">
                    {l.linkLabel ?? 'Learn more'}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {type === 'simple-03' && (
          <ul className="flex flex-col gap-10 md:hidden">
            {list.map((l, i) => (
              <li key={i} className="flex flex-col items-center gap-4 text-center">
                <FeaturedIcon icon={l.icon ?? FileCode01} size="lg" color="brand" theme="modern" />
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold text-gray-900">{l.title}</h3>
                  <p className="text-md text-gray-600">{l.description}</p>
                </div>
                <Button hierarchy="link-color" size="lg" iconTrailing={ArrowRight} as={l.href ? 'a' : 'button'} href={l.href} onClick={l.onClick}>
                  {l.linkLabel ?? 'Learn more'}
                </Button>
              </li>
            ))}
          </ul>
        )}

        {type === 'simple-06' && (
          <ul className="mx-auto flex w-full max-w-[560px] flex-col gap-5 border-t border-gray-200 pt-5">
            {list.map((l, i) => {
              const Comp = l.href ? 'a' : 'button';
              return (
                <li key={i} className="border-b border-gray-200 pb-5">
                  <Comp
                    {...(l.href ? { href: l.href } : { type: 'button' as const })}
                    onClick={l.onClick}
                    className="group flex w-full flex-col items-start gap-4 rounded-lg text-left outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24 md:flex-row md:items-center md:gap-5"
                  >
                    <span className="md:hidden">
                      <FeaturedIcon icon={l.icon ?? FileCode01} size="md" color="brand" theme="modern" />
                    </span>
                    <span className="hidden md:block">
                      <FeaturedIcon icon={l.icon ?? FileCode01} size="lg" color="brand" theme="modern" />
                    </span>
                    <span className="flex w-full flex-1 items-center gap-2">
                      <span className="flex flex-1 flex-col gap-2">
                        <span className="text-lg font-semibold text-gray-900 md:text-xl">{l.title}</span>
                        <span className="text-md text-gray-600">{l.description}</span>
                      </span>
                      {renderIcon(ArrowRight, 'size-6 shrink-0 text-brand-600 transition-transform group-hover:translate-x-0.5')}
                    </span>
                  </Comp>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
});

/** Huge gray "404" behind the Simple 05 heading. */
function FourOhFour({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 880 356" className={className}>
      <text x="440" y="300" textAnchor="middle" fontSize="400" fontWeight="700" letterSpacing="-16" className="fill-gray-100" style={{ fontFamily: 'inherit' }}>
        404
      </text>
    </svg>
  );
}

/** Figma "404 illustration" — a line drawing of "404" built from circles and lines (gray-500, 2px). */
function MaintenanceIllustration({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 514 164" fill="none" className={cx('text-gray-500', className)}>
      <g stroke="currentColor" strokeWidth="2">
        <line x1="0.5" y1="1" x2="513.5" y2="1" />
        <line x1="0.5" y1="163" x2="513.5" y2="163" />
        {/* left 4 */}
        <path d="M120 2 L20 122 L160 122" />
        <line x1="120" y1="2" x2="120" y2="162" />
        <circle cx="40" cy="42" r="20" />
        <circle cx="80" cy="82" r="20" />
        <circle cx="140" cy="142" r="20" />
        {/* 0 */}
        <circle cx="257" cy="82" r="80" />
        <circle cx="257" cy="82" r="40" />
        <circle cx="217" cy="22" r="20" />
        <circle cx="297" cy="142" r="20" />
        {/* right 4 */}
        <path d="M454 2 L354 122 L494 122" />
        <line x1="454" y1="2" x2="454" y2="162" />
        <circle cx="374" cy="42" r="20" />
        <circle cx="414" cy="82" r="20" />
        <circle cx="474" cy="142" r="20" />
      </g>
    </svg>
  );
}
