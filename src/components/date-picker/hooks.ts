import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

/** Controlled/uncontrolled state: `controlled === undefined` means uncontrolled. */
export function useControlled<T>(controlled: T | undefined, defaultValue: T, onChange?: (v: T) => void): [T, (v: T) => void] {
  const [inner, setInner] = useState<T>(defaultValue);
  const isControlled = controlled !== undefined;
  const cb = useRef(onChange);
  cb.current = onChange;
  const set = useCallback(
    (v: T) => {
      if (!isControlled) setInner(v);
      cb.current?.(v);
    },
    [isControlled],
  );
  return [isControlled ? (controlled as T) : inner, set];
}

/** Calls `onDismiss` on pointer-down outside `ref` and on Escape while `active`. */
export function useDismiss(ref: RefObject<HTMLElement | null>, active: boolean, onDismiss: () => void) {
  const cb = useRef(onDismiss);
  cb.current = onDismiss;
  useEffect(() => {
    if (!active) return;
    const down = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) cb.current();
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') cb.current();
    };
    document.addEventListener('pointerdown', down);
    document.addEventListener('keydown', key);
    return () => {
      document.removeEventListener('pointerdown', down);
      document.removeEventListener('keydown', key);
    };
  }, [active, ref]);
}
