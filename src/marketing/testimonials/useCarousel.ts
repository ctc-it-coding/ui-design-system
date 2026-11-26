import { useCallback, useEffect, useRef, useState } from 'react';

/** Index state for "one slide at a time" carousels (quote sliders). Loops by default. */
export function useSlideIndex(count: number, { loop = true, initial = 0 }: { loop?: boolean; initial?: number } = {}) {
  const [index, setIndex] = useState(initial);
  const safe = count > 0 ? Math.min(index, count - 1) : 0;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const prev = useCallback(() => setIndex((i) => (loop ? (i - 1 + count) % count : Math.max(0, i - 1))), [count, loop]);
  const next = useCallback(() => setIndex((i) => (loop ? (i + 1) % count : Math.min(count - 1, i + 1))), [count, loop]);
  return {
    index: safe,
    go,
    prev,
    next,
    canPrev: loop ? count > 1 : safe > 0,
    canNext: loop ? count > 1 : safe < count - 1,
  };
}

/**
 * Horizontal scroll-snap carousel: returns a ref for the scroll container plus prev/next handlers
 * that scroll by one item, and whether each direction is still possible (for the disabled state).
 */
export function useScrollCarousel<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState({ canPrev: false, canNext: true });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const canPrev = el.scrollLeft > 4;
    const canNext = el.scrollLeft + el.clientWidth < el.scrollWidth - 4;
    setState((s) => (s.canPrev === canPrev && s.canNext === canNext ? s : { canPrev, canNext }));
  }, []);

  useEffect(() => {
    const el = ref.current;
    update();
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      el.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, [update]);

  const scroll = useCallback((dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    const step = item ? item.offsetWidth + gap : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  }, []);

  return {
    ref,
    canPrev: state.canPrev,
    canNext: state.canNext,
    prev: useCallback(() => scroll(-1), [scroll]),
    next: useCallback(() => scroll(1), [scroll]),
  };
}

/** Tailwind classes for a horizontal scroller that bleeds to the right viewport edge and hides its scrollbar. */
export const scrollerClass =
  'flex snap-x snap-mandatory overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ' +
  'mr-[calc(50%-50vw)] pr-4 md:pr-8';
