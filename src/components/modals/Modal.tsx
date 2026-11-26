import { forwardRef, useContext, type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import { cx } from '../../utils/cx';
import { BackgroundPattern, type BackgroundPatternType } from '../empty-state/BackgroundPattern';
import { DialogContext, Overlay, useControllableState } from './overlay';

export type ModalWidth = 'sm' | 'md' | 'lg';

/** Figma modal widths: sm 400 (stacked), md 480 (forms), lg 544 (horizontal). */
const widthCls: Record<ModalWidth, string> = {
  sm: 'sm:max-w-[400px]',
  md: 'sm:max-w-[480px]',
  lg: 'sm:max-w-[544px]',
};

export interface ModalPanelProps extends HTMLAttributes<HTMLDivElement> {
  /** Panel width (Figma 400 / 480 / 544). Mobile is always full width. */
  width?: ModalWidth;
  /** Figma "Background pattern decorative" behind the header. `false` hides it. */
  pattern?: BackgroundPatternType | false;
  /** Where the pattern is centred: on a left-aligned icon or the horizontal centre. */
  patternPosition?: 'left' | 'center';
  children?: ReactNode;
}

/**
 * ModalPanel — the white Figma "Modal" box without the overlay. Use it inline (e.g. docs)
 * or let `<Modal>` render it inside the overlay.
 */
export const ModalPanel = forwardRef<HTMLDivElement, ModalPanelProps>(function ModalPanel(
  { width = 'sm', pattern = false, patternPosition = 'left', className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'relative isolate flex w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-white shadow-xl',
        widthCls[width],
        className,
      )}
      {...props}
    >
      {pattern && (
        <BackgroundPattern
          type={pattern}
          size="sm"
          className={cx(
            'absolute -z-10',
            patternPosition === 'left' ? '-top-[124px] -left-[124px] sm:-top-[120px] sm:-left-[120px]' : 'top-[-116px] left-1/2 -translate-x-1/2',
          )}
        />
      )}
      {children}
    </div>
  );
});

export interface ModalBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
/** ModalBody — the "Content" frame between header and actions (px-6, 20px below header). */
export const ModalBody = forwardRef<HTMLDivElement, ModalBodyProps>(function ModalBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx('flex flex-col gap-5 px-4 pt-5 sm:px-6', className)} {...props} />;
});

export interface ModalProps extends Omit<ModalPanelProps, 'title'> {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Close when clicking the backdrop. Default true. */
  closeOnOverlayClick?: boolean;
  /** Close on Escape. Default true. */
  closeOnEscape?: boolean;
  /** Element to focus when opened (defaults to `[data-autofocus]`, then first focusable). */
  initialFocus?: RefObject<HTMLElement | null>;
  /** Accessible role. Use `alertdialog` for destructive confirmations. */
  role?: 'dialog' | 'alertdialog';
  /** Extra classes for the overlay root. */
  overlayClassName?: string;
}

/**
 * Modal — Figma "Modals/Modal". Portal + blurred gray-950/70 backdrop, focus trap,
 * Escape / outside-click close, body scroll lock and enter/exit transition.
 * Desktop: centred. Mobile (<640px): anchored to the bottom with 16px gutters.
 * Compose with `ModalHeader`, `ModalBody`, `ModalActions` — they read `onClose` and aria ids from context.
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal(
  {
    open: openProp,
    defaultOpen = false,
    onOpenChange,
    closeOnOverlayClick = true,
    closeOnEscape = true,
    initialFocus,
    role = 'dialog',
    overlayClassName,
    className,
    children,
    ...panelProps
  },
  ref,
) {
  const [open, setOpen] = useControllableState(openProp, defaultOpen, onOpenChange);
  return (
    <Overlay
      open={open}
      onClose={() => setOpen(false)}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      initialFocus={initialFocus}
      className={overlayClassName}
      positionClassName="flex min-h-full items-end justify-center px-4 pt-4 pb-20 sm:items-center sm:p-8"
    >
      {({ visible, titleId, descriptionId }) => (
        <ModalPanel
          ref={ref}
          role={role}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cx(
            'transition duration-200 ease-out',
            visible ? 'translate-y-0 opacity-100 sm:scale-100' : 'translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95',
            className,
          )}
          {...panelProps}
        >
          {children}
        </ModalPanel>
      )}
    </Overlay>
  );
});

/** Hook for custom modal parts: returns `{ onClose, titleId, descriptionId }` or null outside a Modal. */
export function useModal() {
  return useContext(DialogContext);
}
