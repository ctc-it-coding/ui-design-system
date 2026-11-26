import {
  createContext,
  forwardRef,
  useContext,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import { cx } from '../../utils/cx';
import { ArrowDown, ArrowUp } from '../../icons';
import { HelpIcon } from '../tooltips/HelpIcon';

export type TableDividers = 'line' | 'alternating';
export type SortDirection = 'asc' | 'desc';

const TableContext = createContext<{ dividers: TableDividers }>({ dividers: 'line' });
const BodyContext = createContext(false);

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** Figma "Table" Dividers — `line` (Divider line, gray header) or `alternating` (Alternating fills, white header). */
  dividers?: TableDividers;
}

/**
 * Table — Figma "Table". Semantic `<table>` styled per spec: 44px header cells (gray-50 with dividers=line),
 * 72px body cells with 1px gray-200 row dividers, row hover gray-50, optional alternating fills.
 */
export const Table = forwardRef<HTMLTableElement, TableProps>(function Table({ dividers = 'line', className, ...props }, ref) {
  return (
    <TableContext.Provider value={{ dividers }}>
      <table ref={ref} data-dividers={dividers} className={cx('w-full border-collapse text-left', className)} {...props} />
    </TableContext.Provider>
  );
});

export const TableHeader = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableHeader(
  { className, ...props },
  ref,
) {
  const { dividers } = useContext(TableContext);
  return <thead ref={ref} className={cx(dividers === 'line' ? 'bg-gray-50' : 'bg-white', className)} {...props} />;
});

export const TableBody = forwardRef<HTMLTableSectionElement, HTMLAttributes<HTMLTableSectionElement>>(function TableBody(
  { className, ...props },
  ref,
) {
  return (
    <BodyContext.Provider value={true}>
      <tbody ref={ref} className={className} {...props} />
    </BodyContext.Provider>
  );
});

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Highlights the row (e.g. checked in a selectable table). */
  selected?: boolean;
}

/** TableRow — 1px gray-200 bottom divider; hover gray-50 (Figma Table cell State=Hover). */
export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(function TableRow({ selected, className, ...props }, ref) {
  const { dividers } = useContext(TableContext);
  const inBody = useContext(BodyContext);
  return (
    <tr
      ref={ref}
      data-selected={selected || undefined}
      aria-selected={selected}
      className={cx(
        'border-b border-gray-200 transition-colors',
        inBody && 'last:border-b-0 hover:bg-gray-50',
        inBody && dividers === 'alternating' && 'odd:bg-gray-50',
        'data-selected:bg-gray-50',
        className,
      )}
      {...props}
    />
  );
});

export interface TableHeadProps extends Omit<ThHTMLAttributes<HTMLTableCellElement>, 'onClick'> {
  /** Figma Table header: Arrow — current sort direction of this column (false/undefined = unsorted). */
  sortDirection?: SortDirection | false;
  /** Makes the label a button; called when the user clicks to sort. */
  onSort?: () => void;
  /** Figma Table header: Help icon — tooltip text shown from a help-circle icon. */
  tooltip?: ReactNode;
  /** Supporting text for the help tooltip. */
  tooltipSupportingText?: ReactNode;
  /** Leading control (Figma Table header cell Checkbox=True), e.g. a select-all `<Checkbox size="md" />`. */
  checkbox?: ReactNode;
}

/**
 * TableHead — Figma "Table header cell" + "Table header": 12px Medium gray-600 label (gray-700 on hover),
 * optional sort arrow, help icon tooltip and leading checkbox.
 */
export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(function TableHead(
  { sortDirection, onSort, tooltip, tooltipSupportingText, checkbox, className, children, scope, ...props },
  ref,
) {
  const Arrow = sortDirection === 'asc' ? ArrowUp : ArrowDown;
  const label = (
    <>
      <span>{children}</span>
      {tooltip != null && (
        <HelpIcon title={tooltip} supportingText={tooltipSupportingText} iconClassName="size-4 text-gray-400" className="shrink-0" />
      )}
      {(sortDirection || onSort) && (
        <Arrow aria-hidden className={cx('size-4 shrink-0 text-gray-400', !sortDirection && 'opacity-0 group-hover/th:opacity-100')} />
      )}
    </>
  );
  return (
    <th
      ref={ref}
      scope={scope ?? 'col'}
      aria-sort={sortDirection === 'asc' ? 'ascending' : sortDirection === 'desc' ? 'descending' : undefined}
      className={cx('group/th h-11 px-6 py-3 align-middle text-xs font-medium whitespace-nowrap text-gray-600', className)}
      {...props}
    >
      <div className="flex items-center gap-3">
        {checkbox}
        {onSort ? (
          <button
            type="button"
            onClick={onSort}
            className="flex cursor-pointer items-center gap-1 rounded-sm outline-none hover:text-gray-700 focus-visible:ring-4 focus-visible:ring-gray-400/14"
          >
            {label}
          </button>
        ) : children != null || tooltip != null ? (
          <div className="flex items-center gap-1">{label}</div>
        ) : null}
      </div>
    </th>
  );
});

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** `compact` = 16px side padding (Figma Action icons / Star ratings cells). */
  padding?: 'default' | 'compact';
}

/** TableCell — Figma "Table cell": 72px tall, 16/24px padding, 14px gray-600 text. */
export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(function TableCell(
  { padding = 'default', className, ...props },
  ref,
) {
  return (
    <td
      ref={ref}
      className={cx('h-18 py-4 align-middle text-sm whitespace-nowrap text-gray-600', padding === 'compact' ? 'px-4' : 'px-6', className)}
      {...props}
    />
  );
});
