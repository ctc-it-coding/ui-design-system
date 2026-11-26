import { forwardRef, useEffect, useRef, useState, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Calendar as CalendarIcon } from '../../icons';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Calendar, type CalendarProps } from './Calendar';
import { useControlled, useDismiss } from './hooks';
import {
  addMonths,
  compareDay,
  defaultDateRangePresets,
  formatDate,
  isSameDay,
  normalizeRange,
  parseDate,
  startOfDay,
  startOfMonth,
  type DateRange,
  type DateRangePreset,
} from './dateUtils';

type CalendarPassThrough = Pick<CalendarProps, 'isDateDisabled' | 'minDate' | 'maxDate' | 'markedDates' | 'weekStartsOn'>;

export interface DatePickerListItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma: Selected */
  selected?: boolean;
}

/** DatePickerListItem — Figma "_Date picker list item" (preset in the range picker sidebar). */
export const DatePickerListItem = forwardRef<HTMLButtonElement, DatePickerListItemProps>(function DatePickerListItem(
  { selected, className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-pressed={selected}
      className={cx(
        'flex h-10 w-full cursor-pointer items-center rounded-md px-4 py-2 text-left text-sm outline-none transition-colors',
        'focus-visible:ring-4 focus-visible:ring-gray-400/14',
        selected ? 'bg-gray-50 font-medium text-gray-800 hover:bg-gray-100' : 'font-normal text-gray-700 hover:bg-gray-50 hover:text-gray-800',
        className,
      )}
      {...props}
    />
  );
});

const sameRange = (a: DateRange, b: DateRange) =>
  (a.start === b.start || isSameDay(a.start, b.start)) && (a.end === b.end || isSameDay(a.end, b.end));

export interface DateRangePickerPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, CalendarPassThrough {
  /** Initial (committed) range. */
  value?: DateRange;
  /** Preset list on the left (Figma "_Date picker list item"). Pass `[]` to hide. */
  presets?: DateRangePreset[];
  /** Figma: Actions — date inputs + Cancel / Apply bottom panel. */
  actions?: boolean;
  onApply?: (range: DateRange) => void;
  onCancel?: () => void;
  /** Overrides "today". */
  today?: Date;
  cancelLabel?: ReactNode;
  applyLabel?: ReactNode;
}

/**
 * DateRangePickerPanel — Figma "_Date picker menu" Type=Dual dates: presets sidebar, two months side by side,
 * start/end inputs and Cancel / Apply. Below `md` the sidebar and second month are hidden (Figma mobile layout).
 */
export const DateRangePickerPanel = forwardRef<HTMLDivElement, DateRangePickerPanelProps>(function DateRangePickerPanel(
  {
    value = { start: null, end: null },
    presets = defaultDateRangePresets,
    actions = true,
    onApply,
    onCancel,
    today: todayProp,
    cancelLabel = 'Cancel',
    applyLabel = 'Apply',
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    weekStartsOn,
    className,
    ...props
  },
  ref,
) {
  const today = startOfDay(todayProp ?? new Date());
  const [draft, setDraft] = useState<DateRange>(value);
  const [hover, setHover] = useState<Date | null>(null);
  const [month, setMonth] = useState<Date>(startOfMonth(value.start ?? today));
  const [startText, setStartText] = useState(formatDate(value.start));
  const [endText, setEndText] = useState(formatDate(value.end));
  useEffect(() => {
    setStartText(formatDate(draft.start));
    setEndText(formatDate(draft.end));
  }, [draft]);

  const update = (r: DateRange) => {
    const n = normalizeRange(r);
    setDraft(n);
    if (!actions && n.start && n.end) onApply?.(n);
  };
  const pick = (d: Date) => {
    if (!draft.start || draft.end) update({ start: d, end: null });
    else update({ start: draft.start, end: d });
  };
  const applyPreset = (p: DateRangePreset) => {
    const r = p.range(today);
    setDraft(r);
    if (r.start) setMonth(startOfMonth(r.start));
    if (!actions) onApply?.(r);
  };
  const commit = (which: 'start' | 'end') => {
    const d = parseDate(which === 'start' ? startText : endText);
    if (d) {
      update({ ...draft, [which]: d });
      if (which === 'start') setMonth(startOfMonth(d));
    } else {
      setStartText(formatDate(draft.start));
      setEndText(formatDate(draft.end));
    }
  };

  // Preview the range while choosing the end date.
  const shown: DateRange =
    draft.start && !draft.end && hover && compareDay(hover, draft.start) !== 0 ? normalizeRange({ start: draft.start, end: hover }) : draft;
  const calendarProps = {
    range: shown,
    onSelect: pick,
    onDayHover: setHover,
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    today,
    weekStartsOn,
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Choose date range"
      className={cx('flex w-82 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl md:w-auto', className)}
      {...props}
    >
      {presets.length > 0 && (
        <div className="hidden w-48 shrink-0 flex-col gap-1 border-r border-gray-200 px-4 py-3 md:flex">
          {presets.map((p) => (
            <DatePickerListItem key={p.label} selected={sameRange(p.range(today), draft)} onClick={() => applyPreset(p)}>
              {p.label}
            </DatePickerListItem>
          ))}
        </div>
      )}
      <div className="flex min-w-0 flex-col">
        <div className="flex">
          <div className="px-6 py-5 md:border-r md:border-gray-200">
            <Calendar month={month} onMonthChange={setMonth} {...calendarProps} />
          </div>
          <div className="hidden px-6 py-5 md:block">
            <Calendar month={addMonths(month, 1)} onMonthChange={(m) => setMonth(addMonths(m, -1))} {...calendarProps} />
          </div>
        </div>
        {actions && (
          <div className="flex flex-col gap-3 border-t border-gray-200 p-4 md:flex-row md:items-center md:justify-between">
            <div className="hidden items-center gap-3 md:flex">
              <div className="w-34">
                <Input
                  size="md"
                  aria-label="Start date"
                  placeholder="Start date"
                  value={startText}
                  onChange={(e) => setStartText(e.target.value)}
                  onBlur={() => commit('start')}
                  onKeyDown={(e) => e.key === 'Enter' && commit('start')}
                />
              </div>
              <span className="text-md text-gray-500">–</span>
              <div className="w-34">
                <Input
                  size="md"
                  aria-label="End date"
                  placeholder="End date"
                  value={endText}
                  onChange={(e) => setEndText(e.target.value)}
                  onBlur={() => commit('end')}
                  onKeyDown={(e) => e.key === 'Enter' && commit('end')}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button size="md" hierarchy="secondary-gray" className="flex-1 md:flex-none" onClick={onCancel}>
                {cancelLabel}
              </Button>
              <Button size="md" hierarchy="primary" className="flex-1 md:flex-none" onClick={() => onApply?.(draft)}>
                {applyLabel}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

export interface DateRangePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, CalendarPassThrough {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger label when nothing is selected (Figma State=Placeholder). */
  placeholder?: ReactNode;
  presets?: DateRangePreset[];
  actions?: boolean;
  align?: 'left' | 'right';
  today?: Date;
  disabled?: boolean;
}

/** DateRangePicker — Figma "Date picker dropdown" Type=Dual dates (trigger button + range menu popover). */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(function DateRangePicker(
  {
    value,
    defaultValue = { start: null, end: null },
    onChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placeholder = 'Select dates',
    presets,
    actions = true,
    align = 'right',
    today,
    disabled,
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    weekStartsOn,
    className,
    ...props
  },
  ref,
) {
  const [range, setRange] = useControlled<DateRange>(value, defaultValue, onChange);
  const [open, setOpen] = useControlled<boolean>(openProp, defaultOpen, onOpenChange);
  const wrap = useRef<HTMLDivElement>(null);
  useDismiss(wrap, open, () => setOpen(false));
  const label = range.start ? `${formatDate(range.start)} – ${formatDate(range.end ?? range.start)}` : placeholder;

  return (
    <div ref={ref} className={cx('relative inline-flex flex-col', align === 'right' ? 'items-end' : 'items-start', className)} {...props}>
      <div ref={wrap} className="contents">
        <Button
          size="md"
          hierarchy="secondary-gray"
          iconLeading={CalendarIcon}
          aria-haspopup="dialog"
          aria-expanded={open}
          disabled={disabled}
          onClick={() => setOpen(!open)}
          className={open ? 'ring-4 ring-gray-400/14' : undefined}
        >
          {label}
        </Button>
        {open && (
          <DateRangePickerPanel
            className={cx('absolute top-full z-50 mt-2', align === 'right' ? 'right-0' : 'left-0')}
            value={range}
            presets={presets}
            actions={actions}
            today={today}
            isDateDisabled={isDateDisabled}
            minDate={minDate}
            maxDate={maxDate}
            markedDates={markedDates}
            weekStartsOn={weekStartsOn}
            onCancel={() => setOpen(false)}
            onApply={(r) => {
              setRange(r);
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
});
