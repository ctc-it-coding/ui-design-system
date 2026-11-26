import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowLeft, ArrowRight } from '../../icons';
import { Button } from '../buttons/Button';

export type PaginationType =
  | 'page-default'
  | 'page-minimal-center'
  | 'card-default'
  | 'card-minimal-left'
  | 'card-minimal-center'
  | 'card-minimal-right'
  | 'card-button-group-left'
  | 'card-button-group-center'
  | 'card-button-group-right';
export type PaginationShape = 'square' | 'circle';

export type PageRangeItem = number | 'ellipsis-start' | 'ellipsis-end';

/**
 * Page list with ellipses, always `slots` entries long when total > slots (Figma shows 1 2 3 … 8 9 10).
 * Near the edges the edge block grows; in the middle: 1 … p-1 p p+1 … total.
 */
export function getPageRange(page: number, total: number, slots = 7): PageRangeItem[] {
  if (total <= slots) return Array.from({ length: total }, (_, i) => i + 1);
  const head = Math.ceil((slots - 1) / 2);
  const tail = slots - 1 - head;
  if (page <= head || page > total - tail) {
    return [
      ...Array.from({ length: head }, (_, i) => i + 1),
      'ellipsis-end' as const,
      ...Array.from({ length: tail }, (_, i) => total - tail + 1 + i),
    ];
  }
  const side = Math.max(0, Math.floor((slots - 5) / 2));
  return [1, 'ellipsis-start', ...Array.from({ length: side * 2 + 1 }, (_, i) => page - side + i), 'ellipsis-end', total];
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
  /** Current page, 1-based (controlled). */
  page?: number;
  /** Initial page (uncontrolled). */
  defaultPage?: number;
  /** Total number of pages. */
  total: number;
  /** Called with the new page. */
  onPageChange?: (page: number) => void;
  /** Figma: Type */
  type?: PaginationType;
  /** Figma: Shape — page number buttons are rounded squares or circles. */
  shape?: PaginationShape;
  /** Label of the previous button. */
  previousLabel?: ReactNode;
  /** Label of the next button. */
  nextLabel?: ReactNode;
}

const numberBase =
  'inline-flex size-10 shrink-0 items-center justify-center text-sm font-medium text-gray-600 outline-none transition-colors duration-100 ' +
  'hover:bg-gray-50 hover:text-gray-800 focus-visible:bg-gray-50 focus-visible:ring-4 focus-visible:ring-gray-400/14 ' +
  'aria-[current=page]:bg-gray-50 aria-[current=page]:text-gray-800 cursor-pointer';

/** _Pagination number base */
function PageNumbers({
  page,
  total,
  shape,
  onSelect,
  slots,
  className,
}: {
  page: number;
  total: number;
  shape: PaginationShape;
  onSelect: (p: number) => void;
  slots?: number;
  className?: string;
}) {
  const r = shape === 'circle' ? 'rounded-full' : 'rounded-lg';
  return (
    <ul className={cx('flex items-center gap-0.5', className)}>
      {getPageRange(page, total, slots).map((p) =>
        typeof p === 'number' ? (
          <li key={p}>
            <button
              type="button"
              className={cx(numberBase, r)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              onClick={() => onSelect(p)}
            >
              {p}
            </button>
          </li>
        ) : (
          <li key={p} aria-hidden className={cx('inline-flex size-10 items-center justify-center text-sm font-medium text-gray-600', r)}>
            …
          </li>
        ),
      )}
    </ul>
  );
}

const groupItem =
  'inline-flex h-10 shrink-0 items-center justify-center gap-2 border-r border-gray-300 bg-white text-sm font-medium text-gray-700 outline-none transition-colors duration-100 last:border-r-0 ' +
  'hover:bg-gray-50 hover:text-gray-800 focus-visible:z-10 focus-visible:bg-gray-50 focus-visible:ring-4 focus-visible:ring-gray-400/14 ' +
  'aria-[current=page]:bg-gray-50 aria-[current=page]:text-gray-800 disabled:cursor-not-allowed disabled:text-gray-300 disabled:hover:bg-white cursor-pointer';

/** _Pagination button group base */
function ButtonGroupPagination({
  page,
  total,
  onSelect,
  previousLabel,
  nextLabel,
}: {
  page: number;
  total: number;
  onSelect: (p: number) => void;
  previousLabel: ReactNode;
  nextLabel: ReactNode;
}) {
  const nums = (slots: number, cls: string) =>
    getPageRange(page, total, slots).map((p) =>
      typeof p === 'number' ? (
        <button
          key={`${slots}-${p}`}
          type="button"
          className={cx(groupItem, 'w-10 p-2', cls)}
          aria-label={`Page ${p}`}
          aria-current={p === page ? 'page' : undefined}
          onClick={() => onSelect(p)}
        >
          {p}
        </button>
      ) : (
        <span key={`${slots}-${p}`} aria-hidden className={cx(groupItem, 'w-10 p-2 hover:bg-white', cls)}>
          …
        </span>
      ),
    );
  return (
    <div className="inline-flex max-w-full overflow-hidden rounded-lg border border-gray-300 shadow-xs">
      <button type="button" className={cx(groupItem, 'px-2.5 md:px-4')} disabled={page <= 1} onClick={() => onSelect(page - 1)} aria-label="Previous page">
        <ArrowLeft className="size-5" />
        <span className="max-md:hidden">{previousLabel}</span>
      </button>
      {nums(7, 'max-md:hidden')}
      {nums(5, 'md:hidden')}
      <button type="button" className={cx(groupItem, 'px-2.5 md:px-4')} disabled={page >= total} onClick={() => onSelect(page + 1)} aria-label="Next page">
        <span className="max-md:hidden">{nextLabel}</span>
        <ArrowRight className="size-5" />
      </button>
    </div>
  );
}

/**
 * Pagination — Figma "Pagination" (+ "_Pagination number base", "_Pagination button group base").
 * Below `md` the mobile layout ("Page 1 of 10" with arrow buttons) is used.
 */
export const Pagination = forwardRef<HTMLElement, PaginationProps>(function Pagination(
  {
    page: pageProp,
    defaultPage = 1,
    total,
    onPageChange,
    type = 'page-default',
    shape = 'square',
    previousLabel = 'Previous',
    nextLabel = 'Next',
    className,
    'aria-label': ariaLabel = 'Pagination',
    ...props
  },
  ref,
) {
  const [inner, setInner] = useState(defaultPage);
  const page = Math.min(Math.max(pageProp ?? inner, 1), Math.max(total, 1));
  const go = (p: number) => {
    const next = Math.min(Math.max(p, 1), total);
    if (next === page) return;
    if (pageProp === undefined) setInner(next);
    onPageChange?.(next);
  };

  const isCard = type.startsWith('card');
  const pageOf = (weight: 'medium' | 'regular') => (
    <span className={cx('text-sm whitespace-nowrap text-gray-700', weight === 'medium' ? 'font-medium' : 'font-normal')}>
      Page {page} of {total}
    </span>
  );

  const prevBtn = (hier: 'link-gray' | 'secondary-gray', icon = true) => (
    <Button size="sm" hierarchy={hier} iconLeading={icon ? ArrowLeft : undefined} disabled={page <= 1} onClick={() => go(page - 1)}>
      {previousLabel}
    </Button>
  );
  const nextBtn = (hier: 'link-gray' | 'secondary-gray', icon = true) => (
    <Button size="sm" hierarchy={hier} iconTrailing={icon ? ArrowRight : undefined} disabled={page >= total} onClick={() => go(page + 1)}>
      {nextLabel}
    </Button>
  );
  const mobileArrows = (
    <div className="flex w-full items-center justify-between gap-3 md:hidden">
      <Button size="sm" hierarchy="secondary-gray" iconLeading={ArrowLeft} aria-label="Previous page" disabled={page <= 1} onClick={() => go(page - 1)} />
      {pageOf(isCard ? 'medium' : 'regular')}
      <Button size="sm" hierarchy="secondary-gray" iconLeading={ArrowRight} aria-label="Next page" disabled={page >= total} onClick={() => go(page + 1)} />
    </div>
  );

  let desktop: ReactNode;
  let mobile: ReactNode = mobileArrows;
  switch (type) {
    case 'page-default':
    case 'page-minimal-center':
    case 'card-default': {
      const hier = type === 'page-default' ? 'link-gray' : 'secondary-gray';
      desktop = (
        <div className="flex w-full items-center gap-3 max-md:hidden">
          <div className="flex flex-1 items-center">{prevBtn(hier)}</div>
          <PageNumbers page={page} total={total} shape={shape} onSelect={go} />
          <div className="flex flex-1 items-center justify-end">{nextBtn(hier)}</div>
        </div>
      );
      break;
    }
    case 'card-minimal-left':
    case 'card-minimal-right':
    case 'card-minimal-center': {
      const buttons = (
        <div className="flex items-center gap-3">
          {prevBtn('secondary-gray', false)}
          {nextBtn('secondary-gray', false)}
        </div>
      );
      desktop =
        type === 'card-minimal-center' ? (
          <div className="flex w-full items-center gap-3 max-md:hidden">
            <div className="flex flex-1">{prevBtn('secondary-gray', false)}</div>
            {pageOf('medium')}
            <div className="flex flex-1 justify-end">{nextBtn('secondary-gray', false)}</div>
          </div>
        ) : type === 'card-minimal-right' ? (
          <div className="flex w-full items-center justify-between gap-3 max-md:hidden">
            {pageOf('medium')}
            {buttons}
          </div>
        ) : (
          <div className="flex w-full items-center justify-between gap-3 max-md:hidden">
            {buttons}
            {pageOf('medium')}
          </div>
        );
      mobile =
        type === 'card-minimal-center' ? (
          mobileArrows
        ) : (
          <div className={cx('flex w-full items-center justify-between gap-3 md:hidden', type === 'card-minimal-left' && 'flex-row-reverse')}>
            {pageOf('medium')}
            <div className="flex items-center gap-3">
              <Button size="sm" hierarchy="secondary-gray" iconLeading={ArrowLeft} aria-label="Previous page" disabled={page <= 1} onClick={() => go(page - 1)} />
              <Button size="sm" hierarchy="secondary-gray" iconLeading={ArrowRight} aria-label="Next page" disabled={page >= total} onClick={() => go(page + 1)} />
            </div>
          </div>
        );
      break;
    }
    default: {
      const align = type.endsWith('left') ? 'justify-start' : type.endsWith('center') ? 'justify-center' : 'justify-end';
      desktop = (
        <div className={cx('flex w-full', align)}>
          <ButtonGroupPagination page={page} total={total} onSelect={go} previousLabel={previousLabel} nextLabel={nextLabel} />
        </div>
      );
      mobile = null;
    }
  }

  return (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={cx(
        'flex w-full items-center border-t border-gray-200',
        isCard ? 'px-4 py-3 md:px-6 md:pt-3 md:pb-4' : 'pt-4 pb-4 md:pt-5 md:pb-5',
        className,
      )}
      {...props}
    >
      {desktop}
      {mobile}
    </nav>
  );
});
