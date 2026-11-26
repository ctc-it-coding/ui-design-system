import { forwardRef, type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { CloseButton } from '../buttons/CloseButton';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { Overlay, useControllableState, useDialogContext } from '../modals/overlay';

/* ------------------------------ Panel ------------------------------ */

export interface SlideoutPanelProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/** SlideoutPanel — Figma "Slide out menu / Panel": white, full-height, 400px, left border + shadow-xl. */
export const SlideoutPanel = forwardRef<HTMLDivElement, SlideoutPanelProps>(function SlideoutPanel(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx(
        'flex h-full w-full max-w-[400px] flex-col gap-6 overflow-hidden border-l border-gray-200 bg-white shadow-xl',
        className,
      )}
      {...props}
    />
  );
});

/* ------------------------------ Header ----------------------------- */

export interface SlideoutHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Featured icon (md, modern). */
  icon?: IconSlot;
  title: ReactNode;
  description?: ReactNode;
  /** Figma: Tabs=True — tab bar rendered under the heading (e.g. `<Tabs type="button-white-border" fullWidth …/>`). */
  tabs?: ReactNode;
  /** Show the close X (md). Default true. */
  closeButton?: boolean;
  /** Defaults to closing the parent SlideoutMenu. */
  onClose?: () => void;
}

/** SlideoutHeader — Figma "_Slide out menu header" (Tabs=False / True). */
export const SlideoutHeader = forwardRef<HTMLDivElement, SlideoutHeaderProps>(function SlideoutHeader(
  { icon, title, description, tabs, closeButton = true, onClose, className, ...props },
  ref,
) {
  const ctx = useDialogContext();
  const close = onClose ?? ctx?.onClose;
  return (
    <div ref={ref} className={cx('relative flex shrink-0 flex-col', tabs && 'gap-5 pb-4 sm:gap-6', className)} {...props}>
      <div className={cx('flex flex-col gap-5 px-4 sm:gap-6', tabs ? 'sm:pr-3 sm:pl-6' : 'sm:px-6')}>
        <div className="flex gap-4 pt-6 pb-6 pr-10">
          {icon && <FeaturedIcon icon={icon} size="md" color="brand" theme="modern" />}
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h2 id={ctx?.titleId} className={cx('text-lg font-medium text-gray-900', tabs && 'sm:text-xl')}>
              {title}
            </h2>
            {description != null && (
              <div id={ctx?.descriptionId} className="text-sm text-gray-600">
                {description}
              </div>
            )}
          </div>
        </div>
        {tabs}
      </div>
      {closeButton && close && <CloseButton size="md" onClick={close} className="absolute top-3 right-3" />}
    </div>
  );
});

/* ------------------------------ Body / Footer ---------------------- */

export interface SlideoutBodyProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}
/** SlideoutBody — scrollable "Content" area (sections separated by 24px gaps). */
export const SlideoutBody = forwardRef<HTMLDivElement, SlideoutBodyProps>(function SlideoutBody({ className, ...props }, ref) {
  return <div ref={ref} className={cx('flex min-h-0 flex-1 flex-col gap-6 overflow-y-auto px-4 sm:px-6', className)} {...props} />;
});

export interface SlideoutFooterProps extends HTMLAttributes<HTMLDivElement> {
  /** Left-aligned slot (e.g. a link button "Reset"). */
  leading?: ReactNode;
  children?: ReactNode;
}
/** SlideoutFooter — Figma "Footer": top border, actions right-aligned (optional leading slot). */
export const SlideoutFooter = forwardRef<HTMLDivElement, SlideoutFooterProps>(function SlideoutFooter(
  { leading, className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cx('flex shrink-0 items-center gap-4 border-t border-gray-200 px-4 py-4 sm:px-6', leading ? 'justify-between' : 'justify-end', className)}
      {...props}
    >
      {leading && <div className="flex items-center gap-4">{leading}</div>}
      <div className="flex items-center gap-3">{children}</div>
    </div>
  );
});

/** SlideoutSection — a labelled block inside the body. */
export function SlideoutSection({
  label,
  description,
  children,
  className,
}: {
  label?: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx('flex flex-col gap-4', className)}>
      {(label || description) && (
        <div className="flex flex-col gap-1">
          {label && <h3 className="text-sm font-medium text-gray-700">{label}</h3>}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      )}
      {children}
    </section>
  );
}

/* ------------------------------ Menu (overlay) --------------------- */

export interface SlideoutMenuProps extends SlideoutPanelProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  initialFocus?: RefObject<HTMLElement | null>;
}

/**
 * SlideoutMenu — Figma "Slide out menu": right-side drawer over the blurred overlay.
 * Same a11y as Modal (focus trap, Escape, outside click, scroll lock). Compose with
 * `SlideoutHeader`, `SlideoutBody`, `SlideoutFooter`.
 */
export const SlideoutMenu = forwardRef<HTMLDivElement, SlideoutMenuProps>(function SlideoutMenu(
  { open: openProp, defaultOpen = false, onOpenChange, closeOnOverlayClick = true, closeOnEscape = true, initialFocus, className, ...props },
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
      duration={300}
      positionClassName="flex justify-end overflow-hidden pl-12 sm:pl-0"
    >
      {({ visible, titleId, descriptionId }) => (
        <SlideoutPanel
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          className={cx('transition-transform duration-300 ease-out', visible ? 'translate-x-0' : 'translate-x-full', className)}
          {...props}
        />
      )}
    </Overlay>
  );
});
