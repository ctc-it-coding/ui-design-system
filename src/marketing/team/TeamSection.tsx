import { forwardRef, useRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { ArrowLeft, ArrowRight } from '../../icons';
import { MarketingSection, Container, ImagePlaceholder, type ImagePlaceholderProps } from '../_shared';
import { KitHeading, sectionStack } from '../contact/_kit';
import { TeamMember, type TeamMemberType } from './TeamMember';
import { teamCollageMembers, teamGlassMembers, teamMembers, teamSectionCopy, type TeamMemberData } from './defaults';

export type TeamSectionType =
  | 'simple-01'
  | 'simple-02'
  | 'simple-03'
  | 'simple-04'
  | 'image-card-01'
  | 'image-card-02'
  | 'image-card-03'
  | 'image-card-04'
  | 'image-glass-01'
  | 'image-glass-02'
  | 'image-glass-03'
  | 'image-glass-04'
  | 'image-collage-01'
  | 'image-collage-02';

export interface TeamSectionProps {
  /** Figma: Type */
  type?: TeamSectionType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Team members; defaults to the Figma people for the type. */
  members?: TeamMemberData[];
  /** Custom actions; pass `null` to hide. Defaults to the two Figma buttons. */
  actions?: ReactNode;
  /** Photos of Image collage 02 (5 images). */
  collageImages?: string[];
  id?: string;
  className?: string;
}

const tones: NonNullable<ImagePlaceholderProps['tone']>[] = ['cool', 'warm', 'gray', 'brand'];
const glassTones: NonNullable<ImagePlaceholderProps['tone']>[] = ['dark', 'brand', 'dark', 'cool'];

/** "_Testiomonial carousel arrow" (Size=lg, Type=Button arrow). */
function CarouselButton({ dir, onClick }: { dir: 'left' | 'right'; onClick: () => void }) {
  const Icon = dir === 'left' ? ArrowLeft : ArrowRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous' : 'Next'}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full border border-gray-200 text-gray-500 outline-none transition-colors hover:bg-gray-50 focus-visible:ring-4 focus-visible:ring-gray-400/14 md:size-14"
    >
      <Icon className="size-5 md:size-6" />
    </button>
  );
}

function Carousel({ children, itemClass }: { children: ReactNode; itemClass: string }) {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (d: number) => {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: d * ((first?.offsetWidth ?? 300) + 32), behavior: 'smooth' });
  };
  return (
    <div className="flex flex-col gap-8">
      <div
        ref={track}
        className={cx(
          'flex snap-x snap-mandatory gap-8 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          '-mr-4 md:-mr-8 xl:-mr-[calc((100vw-1280px)/2+2rem)]',
          itemClass,
        )}
      >
        {children}
      </div>
      <div className="flex gap-4 md:gap-8">
        <CarouselButton dir="left" onClick={() => scroll(-1)} />
        <CarouselButton dir="right" onClick={() => scroll(1)} />
      </div>
    </div>
  );
}

/** TeamSection — Figma "Team section" (14 types): heading + team member grid / carousel / collage. */
export const TeamSection = forwardRef<HTMLElement, TeamSectionProps>(function TeamSection(props, ref) {
  const { type = 'simple-01', id, className } = props;
  const copy = teamSectionCopy[type] ?? {};
  const h = {
    subheading: props.subheading !== undefined ? props.subheading : copy.subheading,
    title: props.title !== undefined ? props.title : copy.title,
    supportingText: props.supportingText !== undefined ? props.supportingText : copy.supportingText,
  };
  const actions =
    props.actions !== undefined ? (
      props.actions
    ) : copy.primaryAction ? (
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button size="xl" hierarchy="secondary-gray">{copy.secondaryAction}</Button>
        <Button size="xl">{copy.primaryAction}</Button>
      </div>
    ) : null;

  const glass = type.startsWith('image-glass') || type === 'image-collage-01';
  const people = props.members ?? (type === 'image-collage-01' ? teamCollageMembers : glass ? teamGlassMembers : teamMembers);

  const member = (m: TeamMemberData, i: number, t: TeamMemberType, opts: { bio?: boolean; socials?: boolean; className?: string; compact?: boolean } = {}) => (
    <TeamMember
      key={i}
      type={t}
      name={m.name}
      role={m.role}
      bio={opts.bio === false ? null : (m.bio ?? null)}
      imageSrc={m.imageSrc}
      href={m.href}
      socials={opts.socials === false ? [] : m.socials}
      tone={(glass ? glassTones : tones)[i % 4]}
      compact={opts.compact}
      className={opts.className}
    />
  );

  const centeredHeader = (
    <div className="flex flex-col items-center gap-8 md:gap-10">
      <KitHeading {...h} align="center" />
      {actions}
    </div>
  );
  const splitHeader = (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
      <KitHeading {...h} />
      {actions}
    </div>
  );

  let body: ReactNode;
  switch (type) {
    case 'simple-01':
      body = (
        <Container className={sectionStack}>
          {centeredHeader}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-4">
            {people.map((m, i) => member(m, i, 'simple-center-aligned', { bio: false, socials: false }))}
          </div>
        </Container>
      );
      break;
    case 'simple-02':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-4">
            {people.map((m, i) => member(m, i, 'simple-left-top'))}
          </div>
        </Container>
      );
      break;
    case 'simple-03':
      body = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-24">
          <div className="flex flex-col gap-8 lg:w-[360px] lg:shrink-0">
            <KitHeading {...h} />
            {actions}
          </div>
          <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-16 xl:grid-cols-3">
            {people.slice(0, props.members ? undefined : 6).map((m, i) => member(m, i, 'simple-left-top'))}
          </div>
        </Container>
      );
      break;
    case 'simple-04':
      body = (
        <Container className={sectionStack}>
          {centeredHeader}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {people.map((m, i) => (
              <div key={i} className="bg-gray-50 p-5 md:p-6">
                {member(m, i, 'simple-center-aligned')}
              </div>
            ))}
          </div>
        </Container>
      );
      break;
    case 'image-card-01':
    case 'image-card-02':
      body = (
        <Container className={sectionStack}>
          {type === 'image-card-01' ? centeredHeader : splitHeader}
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 md:gap-y-12 lg:grid-cols-4">
            {people.map((m, i) => member(m, i, 'image-top', type === 'image-card-02' ? { bio: false, socials: false } : {}))}
          </div>
        </Container>
      );
      break;
    case 'image-card-03':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:gap-y-12 lg:grid-cols-2">{people.map((m, i) => member(m, i, 'image-left'))}</div>
        </Container>
      );
      break;
    case 'image-card-04':
    case 'image-glass-04':
      body = (
        <Container className={sectionStack}>
          {splitHeader}
          <Carousel itemClass={type === 'image-card-04' ? '*:w-[280px] *:shrink-0 *:snap-start' : '*:w-[343px] md:*:w-[384px] *:shrink-0 *:snap-start'}>
            {people.map((m, i) => member(m, i, type === 'image-card-04' ? 'image-top' : 'image-glass-full-width'))}
          </Carousel>
        </Container>
      );
      break;
    case 'image-glass-01':
    case 'image-glass-02':
      body = (
        <Container className={sectionStack}>
          {type === 'image-glass-01' ? centeredHeader : splitHeader}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
            {people.map((m, i) => member(m, i, type === 'image-glass-01' ? 'image-glass-floating' : 'image-glass-full-width'))}
          </div>
        </Container>
      );
      break;
    case 'image-glass-03':
      body = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:w-[360px] lg:shrink-0">
            <KitHeading {...h} />
            {actions}
          </div>
          <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8">
            {people.slice(0, props.members ? undefined : 4).map((m, i) => member(m, i, 'image-glass-floating'))}
          </div>
        </Container>
      );
      break;
    case 'image-collage-01': {
      // 3-column / 5-row bento grid from the Figma frame (tiles 390×360 with 24px gaps).
      const place = [
        'lg:col-span-2 lg:row-span-2',
        'lg:col-start-2 lg:col-span-2 lg:row-start-4 lg:row-span-2',
        'lg:col-start-3 lg:row-start-1',
        'lg:col-start-3 lg:row-start-2',
        'lg:col-start-1 lg:row-start-3 lg:row-span-2',
        'lg:col-start-2 lg:row-start-3',
        'lg:col-start-1 lg:row-start-5',
        'lg:col-start-3 lg:row-start-3',
      ];
      body = (
        <Container className={sectionStack}>
          {centeredHeader}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:grid-rows-[repeat(5,360px)]">
            {people.map((m, i) => {
              const big = i < 2 || i === 4;
              return member(m, i, 'image-glass-floating', { bio: big, socials: big, compact: !big, className: cx('min-h-[432px] lg:min-h-0', place[i % place.length]) });
            })}
          </div>
        </Container>
      );
      break;
    }
    case 'image-collage-02': {
      const imgs = props.collageImages ?? [];
      // Absolute positions (px) inside the 576×496 Figma frame.
      const tiles: [number, number, number, number][] = [
        [296, 0, 160, 240],
        [384, 256, 192, 176],
        [0, 256, 192, 192],
        [208, 256, 160, 240],
        [120, 80, 160, 160],
      ];
      body = (
        <Container className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="flex flex-col gap-8 lg:flex-1">
            <KitHeading {...h} />
            {actions}
          </div>
          <div className="relative w-full max-w-[576px] overflow-hidden lg:flex-1 lg:overflow-visible" style={{ aspectRatio: '576/496' }}>
            {tiles.map(([x, y, w, hh], i) => (
              <ImagePlaceholder
                key={i}
                src={imgs[i]}
                tone={tones[i % 4]}
                className="absolute"
                style={{ left: `${(x / 576) * 100}%`, top: `${(y / 496) * 100}%`, width: `${(w / 576) * 100}%`, height: `${(hh / 496) * 100}%` }}
              />
            ))}
          </div>
        </Container>
      );
      break;
    }
  }

  return (
    <MarketingSection ref={ref} id={id} className={cx(type === 'image-card-04' || type === 'image-glass-04' ? 'overflow-hidden' : '', className)}>
      {body}
    </MarketingSection>
  );
});
