import { forwardRef, useEffect, useRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Calendar as CalendarIcon } from '../../icons';
import { Button } from '../buttons/Button';
import { Input } from '../inputs/Input';
import { Calendar, type CalendarProps } from './Calendar';
import { useControlled, useDismiss } from './hooks';
import { formatDate, parseDate, startOfDay, startOfMonth } from './dateUtils';

type CalendarPassThrough = Pick<CalendarProps, 'isDateDisabled' | 'minDate' | 'maxDate' | 'markedDates' | 'today' | 'weekStartsOn'>;

export interface DatePickerPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, CalendarPassThrough {
  /** Initial (committed) date shown when the panel opens. */
  value?: Date | null;
  /** Figma: Actions — show the Cancel / Apply bottom panel. Without it a click applies immediately. */
  actions?: boolean;
  /** Called with the chosen date on Apply (or on click when `actions` is false). */
  onApply?: (date: Date | null) => void;
  onCancel?: () => void;
  cancelLabel?: ReactNode;
  applyLabel?: ReactNode;
  todayLabel?: ReactNode;
}

/**
 * DatePickerPanel — Figma "_Date picker menu" Type=Single date: month header, date input + "Today" button,
 * the calendar, and the Cancel / Apply bottom panel. Used inside `DatePicker`, or inline.
 */
export const DatePickerPanel = forwardRef<HTMLDivElement, DatePickerPanelProps>(function DatePickerPanel(
  {
    value = null,
    actions = true,
    onApply,
    onCancel,
    cancelLabel = 'Cancel',
    applyLabel = 'Apply',
    todayLabel = 'Today',
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    today: todayProp,
    weekStartsOn,
    className,
    ...props
  },
  ref,
) {
  const today = startOfDay(todayProp ?? new Date());
  const [draft, setDraft] = useState<Date | null>(value);
  const [month, setMonth] = useState<Date>(startOfMonth(value ?? today));
  const [text, setText] = useState(formatDate(value));
  useEffect(() => setText(formatDate(draft)), [draft]);

  const pick = (d: Date | null) => {
    setDraft(d);
    if (d) setMonth(startOfMonth(d));
    if (!actions) onApply?.(d);
  };
  const commitText = () => {
    const d = parseDate(text);
    if (d) pick(d);
    else setText(formatDate(draft));
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Choose date"
      className={cx('flex w-82 flex-col rounded-xl border border-gray-200 bg-white shadow-xl', className)}
      {...props}
    >
      <div className="px-6 py-5">
        <Calendar
          month={month}
          onMonthChange={setMonth}
          selected={draft}
          onSelect={pick}
          isDateDisabled={isDateDisabled}
          minDate={minDate}
          maxDate={maxDate}
          markedDates={markedDates}
          today={today}
          weekStartsOn={weekStartsOn}
          headerExtra={
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <Input
                  size="sm"
                  aria-label="Date"
                  placeholder="Select date"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onBlur={commitText}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitText();
                  }}
                />
              </div>
              <Button size="md" hierarchy="secondary-gray" onClick={() => pick(today)}>
                {todayLabel}
              </Button>
            </div>
          }
        />
      </div>
      {actions && (
        <div className="flex gap-3 border-t border-gray-200 p-4">
          <Button size="md" hierarchy="secondary-gray" className="flex-1" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button size="md" hierarchy="primary" className="flex-1" onClick={() => onApply?.(draft)}>
            {applyLabel}
          </Button>
        </div>
      )}
    </div>
  );
});

export interface DatePickerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'>, CalendarPassThrough {
  /** Selected date (controlled). `null` = nothing selected. */
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  /** Popover open state (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Trigger label when no date is selected. Figma State=Placeholder. */
  placeholder?: ReactNode;
  /** Figma: Actions — Cancel / Apply buttons. */
  actions?: boolean;
  /** Popover alignment relative to the trigger (Figma aligns the menu to the trigger's right edge). */
  align?: 'left' | 'right';
  disabled?: boolean;
}

/**
 * DatePicker — Figma "Date picker dropdown" Type=Single date: a secondary button showing the date that opens
 * the single-date menu. Closes on outside click / Escape; Apply commits, Cancel discards.
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(function DatePicker(
  {
    value,
    defaultValue = null,
    onChange,
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    placeholder = 'Select date',
    actions = true,
    align = 'right',
    disabled,
    isDateDisabled,
    minDate,
    maxDate,
    markedDates,
    today,
    weekStartsOn,
    className,
    ...props
  },
  ref,
) {
  const [date, setDate] = useControlled<Date | null>(value, defaultValue, onChange);
  const [open, setOpen] = useControlled<boolean>(openProp, defaultOpen, onOpenChange);
  const wrap = useRef<HTMLDivElement>(null);
  useDismiss(wrap, open, () => setOpen(false));

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
          {date ? formatDate(date) : placeholder}
        </Button>
        {open && (
          <DatePickerPanel
            className={cx('absolute top-full z-50 mt-2', align === 'right' ? 'right-0' : 'left-0')}
            value={date}
            actions={actions}
            isDateDisabled={isDateDisabled}
            minDate={minDate}
            maxDate={maxDate}
            markedDates={markedDates}
            today={today}
            weekStartsOn={weekStartsOn}
            onCancel={() => setOpen(false)}
            onApply={(d) => {
              setDate(d);
              setOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
});
