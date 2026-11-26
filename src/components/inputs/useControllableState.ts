import { useCallback, useRef, useState } from 'react';

/**
 * Internal helper for controlled + uncontrolled props (`value`/`defaultValue`, `checked`/`defaultChecked`, `open`/`defaultOpen`).
 * When `controlled` is not `undefined` the component is controlled and the internal state is ignored.
 */
export function useControllableState<T>(
  controlled: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, (next: T) => void] {
  const [inner, setInner] = useState<T>(defaultValue);
  const isControlled = controlled !== undefined;
  const value = isControlled ? (controlled as T) : inner;
  const cb = useRef(onChange);
  cb.current = onChange;
  const set = useCallback(
    (next: T) => {
      if (!isControlled) setInner(next);
      cb.current?.(next);
    },
    [isControlled],
  );
  return [value, set];
}
