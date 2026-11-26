import { useEffect, useState, useSyncExternalStore } from 'react';
import { cx } from '../../utils/cx';
import { Portal } from '../modals/overlay';
import { Notification, type NotificationProps } from './Notification';

export interface ToastOptions extends Omit<NotificationProps, 'onClose'> {
  /** Stable id (re-using an id replaces that toast). */
  id?: string;
  /** Auto-dismiss after ms. Default 5000; `Infinity` keeps it until closed. */
  duration?: number;
  /** Called after the toast is dismissed. */
  onDismiss?: () => void;
}
interface ToastRecord extends ToastOptions {
  id: string;
  closing?: boolean;
}

let toasts: ToastRecord[] = [];
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((l) => l());
let seq = 0;

function remove(id: string) {
  const t = toasts.find((x) => x.id === id);
  toasts = toasts.filter((x) => x.id !== id);
  emit();
  t?.onDismiss?.();
}

/** Show a toast notification; returns its id. Requires a mounted `<Toaster />`. */
export function toast(options: ToastOptions): string {
  const id = options.id ?? `toast-${++seq}`;
  const rec: ToastRecord = { ...options, id };
  toasts = toasts.some((t) => t.id === id) ? toasts.map((t) => (t.id === id ? rec : t)) : [...toasts, rec];
  emit();
  return id;
}
/** Dismiss one toast (animated) or all when no id is given. */
toast.dismiss = (id?: string) => {
  toasts = toasts.map((t) => (id === undefined || t.id === id ? { ...t, closing: true } : t));
  emit();
  const ids = toasts.filter((t) => t.closing).map((t) => t.id);
  window.setTimeout(() => ids.forEach(remove), 200);
};

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};
const getSnapshot = () => toasts;

export type ToasterPosition = 'top-right' | 'top-center' | 'bottom-right' | 'bottom-center';

export interface ToasterProps {
  /** Where the stack appears. Default "top-right" (mobile: full width at the top/bottom). */
  position?: ToasterPosition;
  /** Max simultaneously visible toasts. Default 4. */
  max?: number;
  className?: string;
}

const posCls: Record<ToasterPosition, string> = {
  'top-right': 'top-0 right-0 sm:items-end',
  'top-center': 'top-0 inset-x-0 sm:items-center',
  'bottom-right': 'bottom-0 right-0 flex-col-reverse sm:items-end',
  'bottom-center': 'bottom-0 inset-x-0 flex-col-reverse sm:items-center',
};

function ToastItem({ t, fromTop }: { t: ToastRecord; fromTop: boolean }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const r = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(r);
  }, []);
  useEffect(() => {
    const d = t.duration ?? 5000;
    if (!Number.isFinite(d)) return;
    const timer = window.setTimeout(() => toast.dismiss(t.id), d);
    return () => window.clearTimeout(timer);
  }, [t.id, t.duration]);
  const { id: _id, duration: _d, onDismiss: _o, closing, ...rest } = t;
  const visible = shown && !closing;
  return (
    <div
      className={cx(
        'pointer-events-auto w-full transition duration-200 ease-out sm:w-auto',
        visible ? 'translate-y-0 opacity-100' : cx('opacity-0', fromTop ? '-translate-y-2' : 'translate-y-2'),
      )}
    >
      <Notification {...rest} className={cx('sm:w-[400px]', rest.type === 'image' && 'sm:w-[440px]', rest.className)} onClose={() => toast.dismiss(t.id)} />
    </div>
  );
}

/** Toaster — renders toasts created with `toast()` as Figma "Notification" cards. Mount once. */
export function Toaster({ position = 'top-right', max = 4, className }: ToasterProps) {
  const list = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  const shown = list.slice(-max);
  return (
    <Portal>
      <div
        aria-live="polite"
        className={cx('pointer-events-none fixed z-[60] flex w-full flex-col gap-3 p-2 sm:w-auto sm:p-6', posCls[position], className)}
      >
        {shown.map((t) => (
          <ToastItem key={t.id} t={t} fromTop={position.startsWith('top')} />
        ))}
      </div>
    </Portal>
  );
}
