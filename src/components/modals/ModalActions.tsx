import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button, type ButtonProps } from '../buttons/Button';
import { useDialogContext } from './overlay';

export type ModalActionsType = 'vertical-fill' | 'horizontal-fill' | 'horizontal-right-aligned';

export interface ModalActionsProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type (Vertical fill container / Horizontal fill container / Horizontal right aligned (checkbox)) */
  type?: ModalActionsType;
  /** Figma: Destructive — confirm button uses the error palette. */
  destructive?: boolean;
  /** Primary button label. Default "Confirm". */
  confirmLabel?: ReactNode;
  /** Secondary button label. Default "Cancel". `null` hides it. */
  cancelLabel?: ReactNode | null;
  onConfirm?: () => void;
  /** Defaults to closing the parent Modal. */
  onCancel?: () => void;
  /** Extra props for the confirm / cancel buttons (type="submit", form, loading, disabled …). */
  confirmProps?: Partial<ButtonProps>;
  cancelProps?: Partial<ButtonProps>;
  /** Leading slot for type="horizontal-right-aligned", e.g. `<Checkbox label="Don't show again" />`. */
  checkbox?: ReactNode;
  /** Link-style tertiary action next to the checkbox, e.g. `<Button hierarchy="link-gray" size="lg">Learn more</Button>`. */
  tertiary?: ReactNode;
  /** Figma "Divider-wrap": gray-200 rule above the buttons. */
  divider?: boolean;
  /** Replace the generated buttons entirely. */
  children?: ReactNode;
}

/**
 * ModalActions — Figma "_Modal actions". Desktop layouts per `type`; on mobile buttons always
 * stack full width with the primary action on top.
 */
export const ModalActions = forwardRef<HTMLDivElement, ModalActionsProps>(function ModalActions(
  {
    type = 'horizontal-fill',
    destructive = false,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    onConfirm,
    onCancel,
    confirmProps,
    cancelProps,
    checkbox,
    tertiary,
    divider = false,
    className,
    children,
    ...props
  },
  ref,
) {
  const ctx = useDialogContext();
  const cancel = onCancel ?? ctx?.onClose;
  const fill = type !== 'horizontal-right-aligned';

  const confirmBtn = (
    <Button
      size="lg"
      hierarchy="primary"
      destructive={destructive}
      onClick={onConfirm}
      {...confirmProps}
      className={cx('w-full', fill ? 'sm:flex-1' : 'sm:w-auto', confirmProps?.className)}
    >
      {confirmLabel}
    </Button>
  );
  const cancelBtn =
    cancelLabel === null ? null : (
      <Button
        size="lg"
        hierarchy="secondary-gray"
        onClick={cancel}
        {...cancelProps}
        className={cx('w-full', fill ? 'sm:flex-1' : 'sm:w-auto', cancelProps?.className)}
      >
        {cancelLabel}
      </Button>
    );

  let content: ReactNode;
  if (children) content = children;
  else if (type === 'vertical-fill') {
    content = (
      <div className="flex flex-col gap-3">
        {confirmBtn}
        {cancelBtn}
      </div>
    );
  } else if (type === 'horizontal-fill') {
    content = (
      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        {cancelBtn}
        {confirmBtn}
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {(checkbox || tertiary) && (
          <div className="order-last flex items-center justify-between gap-3 sm:order-first sm:justify-start">
            {checkbox && <div className="min-w-0 flex-1 sm:flex-none">{checkbox}</div>}
            {tertiary}
          </div>
        )}
        <div className="flex flex-col-reverse gap-3 sm:ml-auto sm:flex-row sm:items-center">
          {cancelBtn}
          {confirmBtn}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cx('flex w-full flex-col pt-6 sm:pt-8', className)} {...props}>
      {divider && <div className="mb-4 h-px w-full bg-gray-200 sm:mb-6" />}
      <div className="px-4 pb-4 sm:px-6 sm:pb-6">{content}</div>
    </div>
  );
});
