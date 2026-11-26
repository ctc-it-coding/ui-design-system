import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ImagePlaceholder } from '../../marketing/_shared';
import { ScreenMockup } from '../../components/mockups/ScreenMockup';
import { IPhoneMockup } from '../../components/mockups/IPhoneMockup';
import { LineChart } from '../../components/charts/LineChart';
import { ActivityGauge } from '../../components/charts/ActivityGauge';
import { CarouselArrow, PaginationDots } from '../../components/pagination/PaginationDots';
import { RatingStars } from '../../components/misc-icons/StarIcon';
import { BackgroundPattern } from '../../components/empty-state/BackgroundPattern';
import { ArrowUp } from '../../icons';
import { LinePattern, ReviewsRow, StarsArt, TestimonialArrow, useCycle, type AuthTestimonial } from './_shared';
import type { AuthSlide } from './defaults';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/* ---------------------------------------------------------------------------------------------- */

/** Log in "Split quote image 01": photo with rounded left corners, dark gradient and a large quote. */
export function QuoteImageHero({ testimonials, imageSrc }: { testimonials: AuthTestimonial[]; imageSrc?: string }) {
  const { index, prev, next } = useCycle(testimonials.length);
  const t = testimonials[index];
  return (
    <ImagePlaceholder src={t?.imageSrc ?? imageSrc} tone="cool" className="flex size-full flex-col justify-end rounded-l-[80px]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-0% to-black/80 to-80%" />
      <figure className="relative flex flex-col gap-6 px-14 pb-16 text-white">
        <blockquote className="text-[50px] leading-[1.3] font-normal tracking-[-0.02em]">{t?.quote}</blockquote>
        <figcaption className="flex flex-col gap-3">
          <span className="text-[28px] leading-[1.5] font-medium">{t?.name}</span>
          <div className="flex items-center gap-3">
            <div className="flex flex-1 flex-col gap-0.5">
              <span className="text-lg font-medium">{t?.title}</span>
              <span className="text-md">{t?.company}</span>
            </div>
            <div className="flex gap-8">
              <TestimonialArrow direction="left" onClick={prev} />
              <TestimonialArrow direction="right" onClick={next} />
            </div>
          </div>
        </figcaption>
      </figure>
    </ImagePlaceholder>
  );
}

/** "Split mockup": gray-100 panel with line patterns and a 3:2 screen mockup bleeding off the right edge. */
export function MockupVisual({ screen }: { screen?: ReactNode }) {
  return (
    <div className="relative size-full bg-gray-100">
      <LinePattern className="top-0 left-0" />
      <LinePattern className="right-0 bottom-0 rotate-180" />
      <div className="absolute top-1/2 left-24 w-[1024px] -translate-y-1/2">
        <ScreenMockup size="xl">{screen}</ScreenMockup>
      </div>
    </div>
  );
}

/** "Split mockup quote": quote with gray stars above a 3:2 mockup that bleeds off the bottom right. */
export function MockupQuoteVisual({ testimonial, screen }: { testimonial: AuthTestimonial; screen?: ReactNode }) {
  return (
    <div className="relative flex size-full flex-col gap-24 bg-gray-100 pt-24 pr-16 pl-20">
      <figure className="flex flex-col gap-6">
        <blockquote className="text-display-sm font-medium text-gray-900">{testimonial.quote}</blockquote>
        <figcaption className="flex items-start gap-3">
          <div className="flex flex-1 flex-col">
            <span className="text-lg font-semibold text-gray-900">{testimonial.name}</span>
            <span className="text-md text-gray-600">{testimonial.title}</span>
          </div>
          <RatingStars value={testimonial.rating ?? 5} color="gray" className="gap-0.5" />
        </figcaption>
      </figure>
      <div className="w-[1024px] shrink-0">
        <ScreenMockup size="xl">{screen}</ScreenMockup>
      </div>
    </div>
  );
}

/** "Split geometric shapes": 3×4 grid of colourful shapes (desktop) / a 75px strip (mobile, rendered separately). */
const shapes: { bg: string; shape: string; wide?: boolean; photo?: boolean }[] = [
  { bg: 'bg-[#d6cfb7]', shape: 'rounded-tr-full', photo: true },
  { bg: 'bg-[#efefef]', shape: 'rounded-full' },
  { bg: 'bg-[#cbd3e7]', shape: 'rounded-bl-full' },
  { bg: 'bg-[#d4b5ad]', shape: 'rounded-t-full', photo: true },
  { bg: 'bg-[#fcd0bb]', shape: 'rounded-br-full' },
  { bg: 'bg-[#cbd3e7]', shape: 'rounded-tl-full' },
  { bg: 'bg-[#efefef]', shape: 'rounded-full' },
  { bg: 'bg-[#dcccbd]', shape: 'rounded-b-full', photo: true },
  { bg: 'bg-[#efefef]', shape: 'rounded-tl-full' },
  { bg: 'bg-[#dbc0dd]', shape: 'rounded-r-full', wide: true, photo: true },
  { bg: 'bg-[#fcd0bb]', shape: 'rounded-tl-full' },
];

export function GeometricShapes({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('grid size-full grid-cols-3 grid-rows-4', className)}>
      {shapes.map((s, i) => (
        <div key={i} className={cx('relative overflow-hidden', s.bg, s.shape, s.wide && 'col-span-2')}>
          {s.photo && <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-black/5 to-black/20" />}
        </div>
      ))}
    </div>
  );
}

const strip = ['bg-brand-300', 'bg-brand-200 rounded-tr-full', 'bg-[#d6cfb7] rounded-t-full', 'bg-[#fcd0bb] rounded-bl-full', 'bg-[#dcccbd]', 'bg-[#efefef] rounded-full', 'bg-[#cbd3e7] rounded-full', 'bg-brand-200 rounded-[38px]', 'bg-brand-300 rounded-tl-full'];
export function GeometricStrip({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cx('flex h-[75px] justify-center overflow-hidden', className)}>
      {strip.map((c, i) => (
        <div key={i} className={cx('size-[75px] shrink-0', c)} />
      ))}
    </div>
  );
}

/** Chart card used inside the carousel mockups. */
function UsersChartCard() {
  return (
    <div className="flex w-[432px] flex-col gap-0 rounded-xl bg-white p-5 shadow-2xl">
      <span className="text-sm font-semibold text-gray-900">Users over time</span>
      <LineChart
        labels={months}
        series={[
          { name: 'This year', data: [12, 18, 15, 24, 22, 30, 28, 34, 33, 40, 38, 46] },
          { name: 'Last year', data: [8, 10, 12, 14, 13, 18, 20, 19, 24, 26, 25, 30] },
        ]}
        legend="none"
        axisLabels={false}
        tooltip={false}
        height={200}
      />
    </div>
  );
}

function SlideText({ slide, large }: { slide?: AuthSlide; large?: boolean }) {
  return (
    <div className={cx('flex flex-col items-center gap-2 text-center', large ? 'max-w-[456px]' : 'max-w-[400px]')}>
      <p className={cx('font-medium text-white', large ? 'text-xl' : 'text-lg')}>{slide?.title}</p>
      <p className={cx('text-brand-200', large ? 'text-md font-medium' : 'text-md')}>{slide?.supportingText}</p>
    </div>
  );
}

function SlidePager({ count, index, setIndex, prev, next }: { count: number; index: number; setIndex: (i: number) => void; prev: () => void; next: () => void }) {
  return (
    <div className="flex items-center justify-center gap-16">
      <CarouselArrow direction="left" onClick={prev} />
      <PaginationDots count={count} index={index} onIndexChange={setIndex} size="lg" />
      <CarouselArrow direction="right" onClick={next} />
    </div>
  );
}

/** Log in "Split carousel": brand gradient with dashboard cards, slide text and pager. */
export function LoginCarouselVisual({ slides }: { slides: AuthSlide[] }) {
  const c = useCycle(slides.length);
  return (
    <div className="relative flex size-full flex-col items-center justify-center gap-12 bg-gradient-to-tr from-brand-900 to-brand-600 px-8">
      <LinePattern light className="top-0 left-0" />
      <LinePattern light className="right-0 bottom-0 rotate-180" />
      <div className="relative h-[300px] w-[432px]">
        <UsersChartCard />
        <div className="absolute -right-24 -bottom-8 rounded-xl bg-white/90 p-4 shadow-xl backdrop-blur-md">
          <ActivityGauge size="xs" label="Active users" value="1,000" data={[{ label: 'A', value: 80 }, { label: 'B', value: 60 }, { label: 'C', value: 40 }]} />
        </div>
      </div>
      <SlideText slide={slides[c.index]} />
      <SlidePager count={slides.length} {...c} />
    </div>
  );
}

/** Sign up "Split carousel": rounded gradient card with frosted analytics mockup. */
export function SignupCarouselVisual({ slides }: { slides: AuthSlide[] }) {
  const c = useCycle(slides.length);
  return (
    <div className="flex size-full py-4 pr-4">
      <div className="relative flex flex-1 flex-col items-center justify-center gap-20 overflow-hidden rounded-[20px] bg-gradient-to-tr from-brand-900 to-brand-600 px-8">
        <div className="relative rounded-[40px] border border-white/20 bg-white/10 p-6 backdrop-blur-sm">
          <div className="w-[416px] rounded-2xl bg-white p-5">
            <LineChart
              labels={months}
              series={[{ name: 'Revenue', data: [20, 26, 22, 30, 34, 31, 40, 44, 41, 50, 54, 60] }, { name: 'Last year', data: [14, 16, 18, 17, 22, 24, 26, 25, 30, 32, 31, 36] }]}
              legend="none"
              axisLabels={false}
              tooltip={false}
              height={216}
            />
          </div>
          <div className="absolute -top-12 -left-12 w-[280px] rounded-xl bg-white/90 p-4 shadow-2xl backdrop-blur-md">
            <p className="text-md font-semibold text-gray-900">Sales account</p>
            <div className="mt-3 flex items-end gap-2">
              <span className="text-display-sm font-semibold text-gray-900">$288k</span>
              <span className="mb-1 inline-flex items-center gap-0.5 text-sm font-medium text-success-700">
                <ArrowUp className="size-4 text-success-500" />
                20%
              </span>
            </div>
            <p className="text-sm text-gray-600">vs last month</p>
          </div>
          <div className="absolute -right-20 -bottom-24 w-[216px] rounded-xl bg-white/90 p-4 shadow-3xl backdrop-blur-md">
            <p className="text-display-xs font-semibold text-gray-900">$58,144.00</p>
            <span className="mt-4 inline-flex items-center gap-0.5 text-sm font-medium text-success-700">
              <ArrowUp className="size-4 text-success-500" />
              $2,264.00 (+14%)
            </span>
          </div>
        </div>
        <div className="flex w-full max-w-[640px] flex-col items-center gap-8">
          <SlideText slide={slides[c.index]} large />
          <SlidePager count={slides.length} {...c} />
        </div>
      </div>
    </div>
  );
}

/** Sign up "Split image background": brand-tinted photo with headline, stars and reviews. */
export function ImageBackgroundHero({ title, supportingText, imageSrc }: { title: ReactNode; supportingText: ReactNode; imageSrc?: string }) {
  return (
    <ImagePlaceholder src={imageSrc} tone="dark" className="flex size-full items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-950 opacity-80" />
      <div className="relative flex w-full max-w-[640px] flex-col gap-12 px-8">
        <StarsArt />
        <div className="flex flex-col gap-6">
          <h2 className="text-display-xl font-medium text-white">{title}</h2>
          <p className="text-lg font-medium text-brand-200">{supportingText}</p>
        </div>
        <ReviewsRow />
      </div>
    </ImagePlaceholder>
  );
}

/** Sign up "Split arrow": photo + grid pattern + gradient bottom panel. */
export function ArrowHero({ title, supportingText, imageSrc }: { title: ReactNode; supportingText: ReactNode; imageSrc?: string }) {
  return (
    <ImagePlaceholder src={imageSrc} tone="cool" className="flex size-full flex-col justify-end">
      <BackgroundPattern type="grid" size="lg" className="absolute top-0 left-1/2 -translate-x-1/2 text-white opacity-40" />
      <div className="relative flex flex-col gap-8 bg-gradient-to-b from-transparent to-black/60 px-16 py-24">
        <StarsArt />
        <div className="flex flex-col gap-5">
          <h2 className="text-display-xl font-semibold text-white">{title}</h2>
          <p className="text-lg font-medium text-white">{supportingText}</p>
        </div>
        <ReviewsRow accent="text-white" />
      </div>
    </ImagePlaceholder>
  );
}

/** Figma "Hand-drawn arrow" (Arrow=33): loose curved arrow pointing down-left. */
export function HandDrawnArrow({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 240 159" fill="none" className={cx('text-gray-400', className)}>
      <path d="M232 6c-30 60-86 104-152 114-22 3-45 1-66-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 96 12 114l24 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Sign up "Split app mockup": gray-50 panel with a phone. */
export function AppMockupVisual({ screen }: { screen?: ReactNode }) {
  return (
    <div className="flex size-full items-center justify-center bg-gray-50">
      <div className="w-[392px]">
        <IPhoneMockup>{screen}</IPhoneMockup>
      </div>
    </div>
  );
}
