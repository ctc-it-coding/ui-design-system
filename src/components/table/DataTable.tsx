import { useMemo, useState, type Key, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Checkbox } from '../checkboxes/Checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type SortDirection, type TableDividers, type TableProps } from './Table';

export interface DataTableColumn<T> {
  /** Unique column id. */
  key: string;
  /** Header label. */
  header?: ReactNode;
  /** Cell renderer; defaults to `String(row[key])`. */
  cell?: (row: T, index: number) => ReactNode;
  /** Enables sorting on this column. */
  sortable?: boolean;
  /** Value used for sorting (defaults to `row[key]`). */
  sortValue?: (row: T) => string | number | Date | null | undefined;
  /** Help-icon tooltip in the header. */
  tooltip?: ReactNode;
  /** `compact` cell padding (action icon columns). */
  padding?: 'default' | 'compact';
  headClassName?: string;
  cellClassName?: string;
}

export interface DataTableSort {
  key: string;
  direction: SortDirection;
}

export interface DataTableProps<T> extends Omit<TableProps, 'children' | 'onSelect'> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Stable row key. */
  rowKey: (row: T, index: number) => Key;
  /** Adds a checkbox to the header and to the first cell of each row. */
  selectable?: boolean;
  /** Selected row keys (controlled). */
  selectedKeys?: Key[];
  defaultSelectedKeys?: Key[];
  onSelectionChange?: (keys: Key[]) => void;
  /** Sort state (controlled). With `onSortChange` and no `sort`, sorting is uncontrolled and done client-side. */
  sort?: DataTableSort | null;
  defaultSort?: DataTableSort | null;
  onSortChange?: (sort: DataTableSort | null) => void;
  /** When true, rows are rendered in the given order even if a sort is set (server-side sorting). */
  manualSort?: boolean;
  dividers?: TableDividers;
  /** Rendered in a full-width row when `data` is empty. */
  empty?: ReactNode;
}

function compare(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  if (a instanceof Date && b instanceof Date) return a.getTime() - b.getTime();
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

/**
 * DataTable — convenience wrapper over the Table primitives: column config, click-to-sort headers
 * (asc → desc → none) and checkbox row selection with an indeterminate select-all.
 */
export function DataTable<T>({
  columns,
  data,
  rowKey,
  selectable,
  selectedKeys,
  defaultSelectedKeys = [],
  onSelectionChange,
  sort: sortProp,
  defaultSort = null,
  onSortChange,
  manualSort,
  dividers = 'line',
  empty,
  className,
  ...props
}: DataTableProps<T>) {
  const [innerSel, setInnerSel] = useState<Key[]>(defaultSelectedKeys);
  const selected = selectedKeys ?? innerSel;
  const setSelected = (keys: Key[]) => {
    if (selectedKeys === undefined) setInnerSel(keys);
    onSelectionChange?.(keys);
  };
  const [innerSort, setInnerSort] = useState<DataTableSort | null>(defaultSort);
  const sort = sortProp !== undefined ? sortProp : innerSort;
  const setSort = (s: DataTableSort | null) => {
    if (sortProp === undefined) setInnerSort(s);
    onSortChange?.(s);
  };

  const rows = useMemo(() => {
    const indexed = data.map((row, i) => ({ row, i }));
    if (!sort || manualSort) return indexed;
    const col = columns.find((c) => c.key === sort.key);
    if (!col) return indexed;
    const get = col.sortValue ?? ((r: T) => (r as Record<string, unknown>)[col.key] as string | number);
    const dir = sort.direction === 'asc' ? 1 : -1;
    return [...indexed].sort((a, b) => dir * compare(get(a.row), get(b.row)));
  }, [data, sort, manualSort, columns]);

  const keys = data.map((r, i) => rowKey(r, i));
  const selSet = new Set(selected);
  const allChecked = keys.length > 0 && keys.every((k) => selSet.has(k));
  const someChecked = !allChecked && keys.some((k) => selSet.has(k));

  const cycleSort = (key: string) => {
    if (!sort || sort.key !== key) setSort({ key, direction: 'asc' });
    else if (sort.direction === 'asc') setSort({ key, direction: 'desc' });
    else setSort(null);
  };

  return (
    <Table dividers={dividers} className={className} {...props}>
      <TableHeader>
        <TableRow>
          {columns.map((c, ci) => (
            <TableHead
              key={c.key}
              className={cx(c.padding === 'compact' && 'px-4', c.headClassName)}
              tooltip={c.tooltip}
              sortDirection={sort?.key === c.key ? sort.direction : false}
              onSort={c.sortable ? () => cycleSort(c.key) : undefined}
              checkbox={
                selectable && ci === 0 ? (
                  <Checkbox
                    size="md"
                    aria-label="Select all rows"
                    checked={allChecked}
                    indeterminate={someChecked}
                    onChange={(v) => setSelected(v ? keys : [])}
                  />
                ) : undefined
              }
            >
              {c.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.length === 0 && empty != null && (
          <TableRow>
            <TableCell colSpan={columns.length} className="h-auto py-10 text-center">
              {empty}
            </TableCell>
          </TableRow>
        )}
        {rows.map(({ row, i }) => {
          const k = rowKey(row, i);
          const isSel = selSet.has(k);
          return (
            <TableRow key={k} selected={selectable ? isSel : undefined}>
              {columns.map((c, ci) => {
                const content = c.cell ? c.cell(row, i) : String((row as Record<string, unknown>)[c.key] ?? '');
                return (
                  <TableCell key={c.key} padding={c.padding} className={c.cellClassName}>
                    {selectable && ci === 0 ? (
                      <div className="flex items-center gap-3">
                        <Checkbox
                          size="md"
                          aria-label="Select row"
                          checked={isSel}
                          onChange={(v) => setSelected(v ? [...selected, k] : selected.filter((x) => x !== k))}
                        />
                        {content}
                      </div>
                    ) : (
                      content
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
