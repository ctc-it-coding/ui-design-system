import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ChevronLeft, ChevronRight } from '../../icons';
import { Button } from '../buttons/Button';
import { useControlled } from './hooks';
import {
  addDays,
  addMonths,
  compareDay,
  formatLong,
  formatMonth,
  isSameDay,
  isSameMonth,
  isWithin,
  monthGrid,
  normalizeRange,
  startOfMonth,
  weekdayLabels,
  type DateRange,
} from './dateUtils';

export interface CalendarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Visible month (controlled). Any date inside the month. */
  month?: Date;
  /** Initially visible month (uncontrolled). Defaults to the selected date or today. */
  defaultMonth?: Date;
  onMonthChange?: (month: Date) => void;
  /** Selected single date (Figma _Calendar cell Type=Active, Position=Leading/trailing). */
  selected?: Date | null;
  /** Selected range — start/end render as filled circles, days in between as "Position=Middle". */
  range?: DateRange | null;
  /** Fired when a day is clicked or chosen with the keyboard. */
  onSelect?: (date: Date) => void;
  /** Fired when the pointer enters a day (used for range previews). */
  onDayHover?: (date: Date | null) => void;
  /** Disables individual days (Figma State=Disabled). */
  isDateDisabled?: (date: Date) => boolean;
  minDate?: Date;
  maxDate?: Date;
  /** Days that show the small "Active dot" indicator. Today always gets one. */
  markedDates?: Date[];
  /** Overrides "today" (useful for demos/tests). */
  today?: Date;
  /** 1 = Monday (Figma default), 0 = Sunday. */
  weekStartsOn?: 0 | 1;
  /** Hide the previous / next month buttons (e.g. inner sides of a dual-month picker). */
  hidePrev?: boolean;
  hideNext?: boolean;
  /** Content rendered between the month header and the day grid (e.g. date input + "Today" button). */
  headerExtra?: ReactNode;
}

/**
 * Calendar — month grid built from Figma "_Calendar cell": today (gray fill + dot), selected (brand fill),
 * range start / middle / end, disabled and outside-month days, with prev/next month navigation.
 * Arrow keys move the focused day, Home/End jump to week edges, PageUp/PageDown change month.
 */
export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(function Calendar(
  {
    month: monthProp,
    defaultMonth,
    onMonthChange,
    selected,
    range,
    onSelect,
    onDayHover,
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    today: todayProp,
    weekStartsOn = 1,
    hidePrev,
    hideNext,
    headerExtra,
    className,
    ...props
  },
  ref,
) {
  const today = todayProp ?? new Date();
  const [month, setMonth] = useControlled<Date>(
    monthProp,
    startOfMonth(defaultMonth ?? selected ?? range?.start ?? today),
    onMonthChange,
  );
  const [focusDate, setFocusDate] = useState<Date | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const r = range ? normalizeRange(range) : null;
  const weeks = monthGrid(month, weekStartsOn);

  const disabled = (d: Date) =>
    (!!minDate && compareDay(d, minDate) < 0) || (!!maxDate && compareDay(d, maxDate) > 0) || !!isDateDisabled?.(d);

  // The roving tab stop: focused day > selected > range start > today > 1st of month (if visible).
  const tabDate =
    [focusDate, selected, r?.start, today].find((d): d is Date => !!d && isSameMonth(d, month)) ?? startOfMonth(month);

  useEffect(() => {
    if (!focusDate) return;
    const el = gridRef.current?.querySelector<HTMLButtonElement>(`[data-day="${focusDate.toDateString()}"]`);
    el?.focus();
  }, [focusDate, month]);

  const moveFocus = (d: Date) => {
    if (!isSameMonth(d, month)) setMonth(startOfMonth(d));
    setFocusDate(d);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, d: Date) => {
    const map: Record<string, () => Date> = {
      ArrowLeft: () => addDays(d, -1),
      ArrowRight: () => addDays(d, 1),
      ArrowUp: () => addDays(d, -7),
      ArrowDown: () => addDays(d, 7),
      Home: () => addDays(d, -((d.getDay() - weekStartsOn + 7) % 7)),
      End: () => addDays(d, 6 - ((d.getDay() - weekStartsOn + 7) % 7)),
      PageUp: () => addMonths(d, -1),
      PageDown: () => addMonths(d, 1),
    };
    const fn = map[e.key];
    if (fn) {
      e.preventDefault();
      moveFocus(fn());
    }
  };

  return (
    <div ref={ref} className={cx('flex w-70 flex-col gap-3', className)} {...props}>
      <div className="flex h-9 items-center justify-between">
        {hidePrev ? (
          <span className="size-9" />
        ) : (
          <Button size="sm" hierarchy="tertiary-gray" iconLeading={ChevronLeft} aria-label="Previous month" onClick={() => setMonth(addMonths(month, -1))} />
        )}
        <div className="text-md font-medium text-gray-700" aria-live="polite">
          {formatMonth(month)}
        </div>
        {hideNext ? (
          <span className="size-9" />
        ) : (
          <Button size="sm" hierarchy="tertiary-gray" iconLeading={ChevronRight} aria-label="Next month" onClick={() => setMonth(addMonths(month, 1))} />
        )}
      </div>
      {headerExtra}
      <div ref={gridRef} role="grid" aria-label={formatMonth(month)} className="flex flex-col gap-1" onMouseLeave={() => onDayHover?.(null)}>
        <div role="row" className="grid grid-cols-7">
          {weekdayLabels(weekStartsOn).map((w) => (
            <div key={w} role="columnheader" className="flex size-10 items-center justify-center text-sm font-medium text-gray-700">
              {w}
            </div>
          ))}
        </div>
        {weeks.map((week, wi) => (
          <div key={wi} role="row" className="grid grid-cols-7">
            {week.map((d, di) => {
              const outside = !isSameMonth(d, month);
              const isDisabled = disabled(d);
              const isToday = isSameDay(d, today);
              const hasRange = !!(r?.start && r?.end && !isSameDay(r.start, r.end));
              const isStart = !!r?.start && isSameDay(d, r.start);
              const isEnd = !!r?.end && isSameDay(d, r.end);
              const isSel = isSameDay(d, selected) || isStart || isEnd;
              const inMiddle = hasRange && !isStart && !isEnd && isWithin(d, r!.start!, r!.end!);
              const marked = isToday || !!markedDates?.some((m) => isSameDay(m, d));
              return (
                <div key={di} role="gridcell" aria-selected={isSel || inMiddle || undefined} className="relative flex size-10 items-center justify-center">
                  {/* Range "Connection" fill */}
                  {hasRange && (inMiddle || isStart || isEnd) && (
                    <span
                      aria-hidden
                      className={cx(
                        'absolute inset-y-0 bg-gray-50',
                        inMiddle && 'inset-x-0',
                        inMiddle && di === 0 && 'rounded-l-full',
                        inMiddle && di === 6 && 'rounded-r-full',
                        isStart && 'right-0 left-1/2',
                        isEnd && 'right-1/2 left-0',
                      )}
                    />
                  )}
                  <button
                    type="button"
                    data-day={d.toDateString()}
                    tabIndex={isSameDay(d, tabDate) ? 0 : -1}
                    disabled={isDisabled}
                    aria-label={formatLong(d)}
                    aria-current={isToday ? 'date' : undefined}
                    aria-pressed={isSel}
                    onClick={() => {
                      setFocusDate(d);
                      onSelect?.(d);
                    }}
                    onMouseEnter={() => onDayHover?.(d)}
                    onKeyDown={(e) => onKeyDown(e, d)}
                    className={cx(
                      'relative z-10 flex size-10 cursor-pointer items-center justify-center rounded-full text-sm font-normal text-gray-700 outline-none transition-colors',
                      'hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-4 focus-visible:ring-brand-500/24',
                      outside && 'text-gray-500',
                      isToday && !isSel && 'bg-gray-100 font-medium hover:bg-gray-100',
                      inMiddle && 'font-medium hover:bg-gray-100',
                      isSel && 'bg-brand-600 font-medium text-white hover:bg-brand-700 hover:text-white',
                      'disabled:cursor-not-allowed disabled:bg-transparent disabled:font-normal disabled:text-gray-500',
                      isDisabled && isToday && 'disabled:bg-gray-50',
                    )}
                  >
                    {d.getDate()}
                    {marked && (
                      <span
                        aria-hidden
                        className={cx(
                          'absolute bottom-1 left-1/2 size-[5px] -translate-x-1/2 rounded-full',
                          isDisabled ? 'bg-gray-400' : isSel ? 'bg-white' : 'bg-brand-600',
                        )}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});
