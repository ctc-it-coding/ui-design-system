import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';

export type TooltipTheme = 'dark' | 'light';
export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';
export type TooltipAlign = 'center' | 'start' | 'end';

export interface TooltipProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'title'> {
  /** Figma: Text */
  title: ReactNode;
  /** Figma: Supporting text=True */
  supportingText?: ReactNode;
  /** Figma: Theme */
  theme?: TooltipTheme;
  /** Side of the trigger the tooltip appears on (Figma Arrow=Bottom * → placement top, Arrow=Left → placement right …). */
  placement?: TooltipPlacement;
  /** Alignment along the trigger for top/bottom placements (Figma Arrow=Bottom left/right). */
  align?: TooltipAlign;
  /** Figma: Arrow≠None */
  arrow?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Initial open state when uncontrolled. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Delay before showing on hover, ms. */
  delay?: number;
  /** Disable the tooltip entirely. */
  disabled?: boolean;
  /** Class for the tooltip bubble. */
  tooltipClassName?: string;
  /** The trigger. */
  children: ReactNode;
}

const placementCls: Record<TooltipPlacement, Record<TooltipAlign, string>> = {
  top: {
    center: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    start: 'bottom-full left-0 mb-2',
    end: 'bottom-full right-0 mb-2',
  },
  bottom: {
    center: 'top-full left-1/2 -translate-x-1/2 mt-2',
    start: 'top-full left-0 mt-2',
    end: 'top-full right-0 mt-2',
  },
  left: {
    center: 'right-full top-1/2 -translate-y-1/2 mr-2',
    start: 'right-full top-1/2 -translate-y-1/2 mr-2',
    end: 'right-full top-1/2 -translate-y-1/2 mr-2',
  },
  right: {
    center: 'left-full top-1/2 -translate-y-1/2 ml-2',
    start: 'left-full top-1/2 -translate-y-1/2 ml-2',
    end: 'left-full top-1/2 -translate-y-1/2 ml-2',
  },
};

/* Arrow: a 12px rotated square (Figma "Tooltip shape") half-hidden behind the bubble edge, keyed by the bubble side it sits on. */
const arrowCls: Record<'bottom' | 'top' | 'left' | 'right', Record<TooltipAlign, string>> = {
  bottom: {
    center: 'top-full left-1/2 -translate-x-1/2 -translate-y-1/2',
    start: 'top-full left-2.5 -translate-y-1/2',
    end: 'top-full right-2.5 -translate-y-1/2',
  },
  top: {
    center: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1/2',
    start: 'bottom-full left-2.5 translate-y-1/2',
    end: 'bottom-full right-2.5 translate-y-1/2',
  },
  right: {
    center: 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2',
    start: 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2',
    end: 'left-full top-1/2 -translate-x-1/2 -translate-y-1/2',
  },
  left: {
    center: 'right-full top-1/2 translate-x-1/2 -translate-y-1/2',
    start: 'right-full top-1/2 translate-x-1/2 -translate-y-1/2',
    end: 'right-full top-1/2 translate-x-1/2 -translate-y-1/2',
  },
};

export interface TooltipBubbleProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode;
  supportingText?: ReactNode;
  theme?: TooltipTheme;
  /** Which side the arrow points to (the trigger side), or none. */
  arrowSide?: 'bottom' | 'top' | 'left' | 'right' | 'none';
  arrowAlign?: TooltipAlign;
}

/** The static tooltip bubble (Figma "Tooltips/Tooltip"); used by `Tooltip` and for docs/static display. */
export function TooltipBubble({ title, supportingText, theme = 'dark', arrowSide = 'none', arrowAlign = 'center', className, ...props }: TooltipBubbleProps) {
  const dark = theme === 'dark';
  return (
    <div
      className={cx(
        'relative w-max rounded-lg text-xs shadow-lg',
        dark ? 'bg-gray-900' : 'bg-white',
        supportingText ? 'max-w-80 p-3' : 'max-w-80 px-3 py-2 text-center',
        className,
      )}
      {...props}
    >
      {arrowSide !== 'none' && (
        <span
          aria-hidden
          className={cx(
            'absolute size-3 rotate-45 rounded-[1px]',
            dark ? 'bg-gray-900' : 'bg-white',
            arrowCls[arrowSide][arrowAlign],
          )}
        />
      )}
      <div className={cx('relative flex flex-col', supportingText && 'gap-1')}>
        <span className={cx('font-medium', dark ? 'text-white' : 'text-gray-700')}>{title}</span>
        {supportingText && <span className={cx('font-normal', dark ? 'text-gray-300' : 'text-gray-600')}>{supportingText}</span>}
      </div>
    </div>
  );
}

/**
 * Tooltip — wraps a trigger and shows the bubble on hover / keyboard focus. Escape hides it.
 */
export function Tooltip({
  title,
  supportingText,
  theme = 'dark',
  placement = 'top',
  align = 'center',
  arrow = true,
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  delay = 150,
  disabled,
  tooltipClassName,
  className,
  children,
  ...props
}: TooltipProps) {
  const id = useId();
  const [inner, setInner] = useState(defaultOpen);
  const controlled = openProp !== undefined;
  const open = !disabled && (controlled ? !!openProp : inner);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const setOpen = useCallback(
    (v: boolean) => {
      if (!controlled) setInner(v);
      onOpenChange?.(v);
    },
    [controlled, onOpenChange],
  );
  const clear = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
  };
  const show = (immediate?: boolean) => {
    clear();
    if (immediate || delay <= 0) setOpen(true);
    else timer.current = setTimeout(() => setOpen(true), delay);
  };
  const hide = () => {
    clear();
    setOpen(false);
  };
  useEffect(() => clear, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') hide();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ 'aria-describedby'?: string }>, { 'aria-describedby': open ? id : undefined })
    : children;
  const arrowSide = !arrow ? 'none' : placement === 'top' ? 'bottom' : placement === 'bottom' ? 'top' : placement === 'left' ? 'right' : 'left';

  return (
    <span
      className={cx('relative inline-flex', className)}
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      onFocus={(e) => {
        if ((e.target as HTMLElement).matches?.(':focus-visible')) show(true);
      }}
      onBlur={hide}
      {...props}
    >
      {trigger}
      {open && (
        <span className={cx('pointer-events-none absolute z-50', placementCls[placement][align])}>
          <TooltipBubble
            id={id}
            role="tooltip"
            title={title}
            supportingText={supportingText}
            theme={theme}
            arrowSide={arrowSide}
            arrowAlign={align}
            className={cx(!supportingText && 'whitespace-nowrap', supportingText && 'w-80', tooltipClassName)}
          />
        </span>
      )}
    </span>
  );
}
