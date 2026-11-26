import { useEffect, type RefObject } from 'react';

/** Calls `onDismiss` on pointer-down outside `ref` or on Escape while `open`. */
export function useDismiss(ref: RefObject<HTMLElement | null>, open: boolean, onDismiss: (reason: 'outside' | 'escape') => void) {
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onDismiss('outside');
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss('escape');
    };
    document.addEventListener('pointerdown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, open, onDismiss]);
}
