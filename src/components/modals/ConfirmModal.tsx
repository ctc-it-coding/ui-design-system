import { forwardRef, type ReactNode } from 'react';
import { AlertCircle, AlertTriangle, CheckCircle } from '../../icons';
import { type IconSlot } from '../../utils/renderIcon';
import { Modal, ModalPanel, type ModalPanelProps, type ModalProps } from './Modal';
import { ModalActions, type ModalActionsProps } from './ModalActions';
import { ModalHeader, type ModalIconColor } from './ModalHeader';

export type ConfirmModalLayout = 'horizontal' | 'stacked';
export type ConfirmModalIntent = 'default' | 'warning' | 'destructive';

export interface ConfirmContentProps {
  /** Figma Type "Horizontal" (544px, icon left of text, right-aligned actions) vs "Stacked left aligned" (400px). */
  layout?: ConfirmModalLayout;
  /** Figma Type prefix: (none) / Warning / Destructive. */
  intent?: ConfirmModalIntent;
  /** Override the featured icon (defaults per intent). */
  icon?: IconSlot;
  /** Override the featured icon colour (defaults per intent). */
  iconColor?: ModalIconColor;
  title: ReactNode;
  description?: ReactNode;
  confirmLabel?: ReactNode;
  cancelLabel?: ReactNode | null;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** Checkbox slot (horizontal layout only), e.g. "Don't show again". */
  checkbox?: ReactNode;
  /** Tertiary link slot (horizontal layout only). */
  tertiary?: ReactNode;
  /** Extra content between header and actions. */
  children?: ReactNode;
  confirmProps?: ModalActionsProps['confirmProps'];
  /** Close handler for the header X when used outside a Modal. */
  onClose?: () => void;
}

const intentIcon: Record<ConfirmModalIntent, { icon: IconSlot; color: ModalIconColor }> = {
  default: { icon: CheckCircle, color: 'success' },
  warning: { icon: AlertTriangle, color: 'warning' },
  destructive: { icon: AlertCircle, color: 'error' },
};

/** Header + optional body + actions of a confirm-style modal (no panel / overlay). */
export function ConfirmContent({
  layout = 'stacked',
  intent = 'default',
  icon,
  iconColor,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  checkbox,
  tertiary,
  children,
  confirmProps,
  onClose,
}: ConfirmContentProps) {
  const d = intentIcon[intent];
  const horizontal = layout === 'horizontal';
  return (
    <>
      <ModalHeader
        type={horizontal ? 'horizontal-left-aligned' : 'left-aligned'}
        icon={icon ?? d.icon}
        iconColor={iconColor ?? d.color}
        title={title}
        description={description}
        onClose={onClose}
      />
      {children && <div className="flex flex-col gap-5 px-4 sm:px-6">{children}</div>}
      <ModalActions
        type={horizontal ? 'horizontal-right-aligned' : 'horizontal-fill'}
        destructive={intent === 'destructive'}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
        onConfirm={onConfirm}
        onCancel={onCancel}
        checkbox={horizontal ? checkbox : undefined}
        tertiary={horizontal ? tertiary : undefined}
        confirmProps={confirmProps}
      />
    </>
  );
}

export interface ConfirmModalPanelProps extends ConfirmContentProps, Pick<ModalPanelProps, 'pattern' | 'className'> {}

/** ConfirmModalPanel — the confirm modal box rendered inline (no overlay). */
export const ConfirmModalPanel = forwardRef<HTMLDivElement, ConfirmModalPanelProps>(function ConfirmModalPanel(
  { pattern = 'circles', className, ...content },
  ref,
) {
  return (
    <ModalPanel ref={ref} width={content.layout === 'horizontal' ? 'lg' : 'sm'} pattern={pattern} className={className}>
      <ConfirmContent {...content} />
    </ModalPanel>
  );
});

export interface ConfirmModalProps
  extends ConfirmContentProps,
    Pick<ModalProps, 'open' | 'defaultOpen' | 'onOpenChange' | 'closeOnOverlayClick' | 'closeOnEscape' | 'pattern' | 'className'> {}

/**
 * ConfirmModal — Figma Modal types "Horizontal", "Warning horizontal", "Destructive horizontal",
 * "Stacked left aligned", "Warning stacked left aligned", "Destructive stacked left aligned".
 */
export function ConfirmModal({
  open,
  defaultOpen,
  onOpenChange,
  closeOnOverlayClick,
  closeOnEscape,
  pattern = 'circles',
  className,
  ...content
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      closeOnOverlayClick={closeOnOverlayClick}
      closeOnEscape={closeOnEscape}
      role={content.intent === 'destructive' ? 'alertdialog' : 'dialog'}
      width={content.layout === 'horizontal' ? 'lg' : 'sm'}
      pattern={pattern}
      className={className}
    >
      <ConfirmContent {...content} />
    </Modal>
  );
}
