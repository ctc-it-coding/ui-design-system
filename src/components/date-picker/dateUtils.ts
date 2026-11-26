/** Small native-Date helpers used by the date pickers (no date library). */

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}
export function startOfMonth(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
export function addDays(d: Date, n: number): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
}
export function addMonths(d: Date, n: number): Date {
  const target = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const last = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  return new Date(target.getFullYear(), target.getMonth(), Math.min(d.getDate(), last));
}
export function isSameDay(a: Date | null | undefined, b: Date | null | undefined): boolean {
  return !!a && !!b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}
export function compareDay(a: Date, b: Date): number {
  return startOfDay(a).getTime() - startOfDay(b).getTime();
}
/** Inclusive "is d within [start, end]" by calendar day. */
export function isWithin(d: Date, start: Date, end: Date): boolean {
  return compareDay(d, start) >= 0 && compareDay(d, end) <= 0;
}
/** Orders a range so start <= end. */
export function normalizeRange(r: DateRange): DateRange {
  if (r.start && r.end && compareDay(r.start, r.end) > 0) return { start: r.end, end: r.start };
  return r;
}
export function startOfWeek(d: Date, weekStartsOn: 0 | 1 = 1): Date {
  const diff = (d.getDay() - weekStartsOn + 7) % 7;
  return addDays(startOfDay(d), -diff);
}

/** 6×7 grid of days for the month containing `month`, starting on `weekStartsOn` (Monday by default). */
export function monthGrid(month: Date, weekStartsOn: 0 | 1 = 1): Date[][] {
  const first = startOfWeek(startOfMonth(month), weekStartsOn);
  return Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(first, w * 7 + d)));
}

const shortFmt = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
const longFmt = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

/** "Jan 10, 2024" */
export function formatDate(d: Date | null | undefined): string {
  return d ? shortFmt.format(d) : '';
}
/** "January 2024" */
export function formatMonth(d: Date): string {
  return monthFmt.format(d);
}
/** Accessible label, "Wednesday, January 10, 2024" */
export function formatLong(d: Date): string {
  return longFmt.format(d);
}
/** Parses user-typed text ("Jan 10, 2024", "2024-01-10", "1/10/2024"). Returns null when invalid. */
export function parseDate(text: string): Date | null {
  const t = text.trim();
  if (!t) return null;
  const iso = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t);
  if (iso) return new Date(+iso[1], +iso[2] - 1, +iso[3]);
  const ms = Date.parse(t);
  return Number.isNaN(ms) ? null : startOfDay(new Date(ms));
}

export const weekdayLabels = (weekStartsOn: 0 | 1 = 1): string[] => {
  const base = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  return weekStartsOn === 1 ? [...base.slice(1), base[0]] : base;
};

export interface DateRangePreset {
  label: string;
  /** Returns the range for this preset, evaluated relative to `today`. */
  range: (today: Date) => DateRange;
}

/** Figma "_Date picker list item" presets of the range picker. */
export const defaultDateRangePresets: DateRangePreset[] = [
  { label: 'Today', range: (t) => ({ start: t, end: t }) },
  { label: 'Yesterday', range: (t) => ({ start: addDays(t, -1), end: addDays(t, -1) }) },
  { label: 'This week', range: (t) => ({ start: startOfWeek(t), end: addDays(startOfWeek(t), 6) }) },
  { label: 'Last week', range: (t) => ({ start: addDays(startOfWeek(t), -7), end: addDays(startOfWeek(t), -1) }) },
  { label: 'This month', range: (t) => ({ start: startOfMonth(t), end: new Date(t.getFullYear(), t.getMonth() + 1, 0) }) },
  { label: 'Last month', range: (t) => ({ start: new Date(t.getFullYear(), t.getMonth() - 1, 1), end: new Date(t.getFullYear(), t.getMonth(), 0) }) },
  { label: 'This year', range: (t) => ({ start: new Date(t.getFullYear(), 0, 1), end: new Date(t.getFullYear(), 11, 31) }) },
  { label: 'Last year', range: (t) => ({ start: new Date(t.getFullYear() - 1, 0, 1), end: new Date(t.getFullYear() - 1, 11, 31) }) },
  { label: 'All time', range: () => ({ start: null, end: null }) },
];
