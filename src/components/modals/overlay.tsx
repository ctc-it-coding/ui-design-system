import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { cx } from '../../utils/cx';

/* ------------------------------------------------------------------ */
/* Shared overlay plumbing for Modal, SlideoutMenu and CommandMenu.    */
/* ------------------------------------------------------------------ */

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/** Controlled / uncontrolled state helper. */
export function useControllableState<T>(
  value: T | undefined,
  defaultValue: T,
  onChange?: (v: T) => void,
): [T, (v: T) => void] {
  const [inner, setInner] = useState<T>(defaultValue);
  const controlled = value !== undefined;
  const current = controlled ? (value as T) : inner;
  const set = useCallback(
    (v: T) => {
      if (!controlled) setInner(v);
      onChange?.(v);
    },
    [controlled, onChange],
  );
  return [current, set];
}

/** Keeps an element mounted during its exit transition. `visible` flips one frame after mount. */
export function usePresence(open: boolean, duration = 200): { mounted: boolean; visible: boolean } {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (open) {
      setMounted(true);
      let raf2 = 0;
      const raf1 = requestAnimationFrame(() => {
        raf2 = requestAnimationFrame(() => setVisible(true));
      });
      return () => {
        cancelAnimationFrame(raf1);
        cancelAnimationFrame(raf2);
      };
    }
    setVisible(false);
    const t = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(t);
  }, [open, duration]);
  return { mounted, visible };
}

let scrollLocks = 0;
let prevOverflow = '';
let prevPadding = '';
/** Locks `<body>` scrolling while active (reference counted for nested overlays). */
export function useScrollLock(active: boolean) {
  useIsoLayoutEffect(() => {
    if (!active || typeof document === 'undefined') return;
    const body = document.body;
    if (scrollLocks === 0) {
      prevOverflow = body.style.overflow;
      prevPadding = body.style.paddingRight;
      const gap = window.innerWidth - document.documentElement.clientWidth;
      body.style.overflow = 'hidden';
      if (gap > 0) body.style.paddingRight = `${gap}px`;
    }
    scrollLocks++;
    return () => {
      scrollLocks--;
      if (scrollLocks === 0) {
        body.style.overflow = prevOverflow;
        body.style.paddingRight = prevPadding;
      }
    };
  }, [active]);
}

const FOCUSABLE =
  'a[href],area[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),iframe,[tabindex]:not([tabindex="-1"]),[contenteditable="true"]';

function focusables(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true' && el.offsetParent !== null,
  );
}

/** Traps Tab focus inside `ref` while active; restores focus to the previously focused element afterwards. */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  active: boolean,
  initialFocus?: RefObject<HTMLElement | null>,
) {
  useEffect(() => {
    if (!active) return;
    const root = ref.current;
    if (!root) return;
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => {
      if (root.contains(document.activeElement)) return;
      const target = initialFocus?.current ?? root.querySelector<HTMLElement>('[data-autofocus]') ?? focusables(root)[0] ?? root;
      target.focus({ preventScroll: true });
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const list = focusables(root);
      if (list.length === 0) {
        e.preventDefault();
        root.focus();
        return;
      }
      const first = list[0];
      const last = list[list.length - 1];
      const activeEl = document.activeElement;
      if (e.shiftKey && (activeEl === first || !root.contains(activeEl))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (activeEl === last || !root.contains(activeEl))) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('keydown', onKey);
      if (previous && typeof previous.focus === 'function') previous.focus({ preventScroll: true });
    };
  }, [active, ref, initialFocus]);
}

/** Renders children into `document.body`. */
export function Portal({ children, container }: { children: ReactNode; container?: Element | null }) {
  // Render synchronously on the client so refs inside the portal exist in the parent's effects.
  const [ready, setReady] = useState(() => typeof document !== 'undefined');
  useEffect(() => setReady(true), []);
  if (!ready || typeof document === 'undefined') return null;
  return createPortal(children, container ?? document.body);
}

/* ------------------------------------------------------------------ */
/* Dialog context: lets headers/actions close the dialog & label it.   */
/* ------------------------------------------------------------------ */

export interface DialogContextValue {
  onClose?: () => void;
  titleId: string;
  descriptionId: string;
}
export const DialogContext = createContext<DialogContextValue | null>(null);
export const useDialogContext = () => useContext(DialogContext);

/* ------------------------------------------------------------------ */
/* Overlay: portal + backdrop + transitions + a11y behaviour.          */
/* ------------------------------------------------------------------ */

export interface OverlayProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  open: boolean;
  onClose: () => void;
  /** Close when the backdrop is clicked. Default true. */
  closeOnOverlayClick?: boolean;
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean;
  /** Element to focus first (defaults to `[data-autofocus]` or first focusable). */
  initialFocus?: RefObject<HTMLElement | null>;
  /** Figma "Background overlay / Background blur". Default true. */
  blur?: boolean;
  /** Layout classes for the positioning wrapper (where the panel sits). */
  positionClassName?: string;
  /** Transition duration in ms. */
  duration?: number;
  /** Render function receiving `visible` (for enter/exit classes) and the dialog context ids. */
  children: (state: { visible: boolean; titleId: string; descriptionId: string }) => ReactNode;
}

/**
 * Overlay — Figma "Background overlay" (gray-950 @ 70 %, background blur).
 * Handles portal, scroll lock, focus trap, Escape and outside click.
 */
export function Overlay({
  open,
  onClose,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  initialFocus,
  blur = true,
  positionClassName,
  duration = 200,
  className,
  children,
  ...props
}: OverlayProps) {
  const { mounted, visible } = usePresence(open, duration);
  const wrapRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  useScrollLock(mounted && open);
  useFocusTrap(wrapRef, mounted && open, initialFocus);

  useEffect(() => {
    if (!open || !closeOnEscape) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, closeOnEscape, onClose]);

  const downOnBackdrop = useRef(false);
  if (!mounted) return null;

  const onMouseDown = (e: ReactMouseEvent) => {
    downOnBackdrop.current = e.target === e.currentTarget;
  };
  const onClick = (e: ReactMouseEvent) => {
    if (closeOnOverlayClick && downOnBackdrop.current && e.target === e.currentTarget) onClose();
    downOnBackdrop.current = false;
  };

  return (
    <Portal>
      <DialogContext.Provider value={{ onClose, titleId, descriptionId }}>
        <div className={cx('fixed inset-0 z-50', className)} {...props}>
          <div
            aria-hidden
            className={cx(
              'absolute inset-0 bg-gray-950/70 transition-opacity ease-out',
              blur && 'backdrop-blur-sm',
              visible ? 'opacity-100' : 'opacity-0',
            )}
            style={{ transitionDuration: `${duration}ms` }}
          />
          <div
            ref={wrapRef}
            className={cx('absolute inset-0 overflow-y-auto outline-none', positionClassName)}
            onMouseDown={onMouseDown}
            onClick={onClick}
            tabIndex={-1}
          >
            {children({ visible, titleId, descriptionId })}
          </div>
        </div>
      </DialogContext.Provider>
    </Portal>
  );
}
