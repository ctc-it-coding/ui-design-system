import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { CheckCircle, File04, Mail01, Zap } from '../../icons';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { Button } from '../buttons/Button';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { Input } from '../inputs/Input';
import { InlineCTA, InlineCTAButtons, type InlineCTAAction, type InlineCTAProps } from './InlineCTA';

type Base = Omit<InlineCTAProps, 'children' | 'media' | 'playButton'>;

/* ---------------- Email field ---------------- */

export interface EmailCTAProps extends Omit<Base, 'onSubmit'> {
  /** Submit button label. Default "Subscribe". */
  submitLabel?: ReactNode;
  placeholder?: string;
  /** Hint under the input (e.g. privacy note). */
  hint?: ReactNode;
  onSubmit?: (email: string) => void;
}
/** EmailCTA — Figma Inline CTA Type="Email field". */
export function EmailCTA({ submitLabel = 'Subscribe', placeholder = 'Enter your email', hint, onSubmit, ...rest }: EmailCTAProps) {
  const [email, setEmail] = useState('');
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
  };
  return (
    <InlineCTA {...rest} actions={null}>
      <form onSubmit={submit} className="flex w-full flex-col gap-3 sm:max-w-[400px] sm:flex-row sm:items-start sm:gap-4">
        <div className="min-w-0 flex-1">
          <Input
            size="md"
            type="email"
            required
            aria-label="Email"
            iconLeading={Mail01}
            placeholder={placeholder}
            hint={typeof hint === 'string' ? hint : undefined}
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          />
        </div>
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {submitLabel}
        </Button>
      </form>
    </InlineCTA>
  );
}

/* ---------------- Change plan ---------------- */

export interface ChangePlanCTAProps extends Base {
  planName: ReactNode;
  price: ReactNode;
  /** Default "per month". */
  period?: ReactNode;
  planDescription?: ReactNode;
  planIcon?: IconSlot;
}
/** ChangePlanCTA — Figma Inline CTA Type="Change plan" (nested plan card with actions). */
export function ChangePlanCTA({
  planName,
  price,
  period = 'per month',
  planDescription,
  planIcon = Zap,
  secondaryAction,
  primaryAction,
  actions,
  ...rest
}: ChangePlanCTAProps) {
  return (
    <InlineCTA {...rest} actions={null}>
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center gap-4 border-b border-gray-200 py-4 pr-5 pl-4">
          <FeaturedIcon icon={planIcon} size="sm" color="brand" theme="light-outline" />
          <p className="flex-1 text-md font-medium text-gray-700">{planName}</p>
        </div>
        <div className="flex flex-col gap-6 p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-end gap-1">
              <span className="text-display-sm font-medium text-gray-700">{price}</span>
              <span className="pb-[3px] text-sm text-gray-600">{period}</span>
            </div>
            {planDescription && <p className="text-sm text-gray-600">{planDescription}</p>}
          </div>
          {actions ?? <InlineCTAButtons secondary={secondaryAction} primary={primaryAction} />}
        </div>
      </div>
    </InlineCTA>
  );
}

/* ---------------- Upgrade plan ---------------- */

export interface UpgradePlanFeature {
  title: ReactNode;
  description?: ReactNode;
}
export interface UpgradePlanCTAProps extends Base {
  features: UpgradePlanFeature[];
}
/** UpgradePlanCTA — Figma Inline CTA Type="Upgrade plan" (check-icon feature list). */
export function UpgradePlanCTA({ features, ...rest }: UpgradePlanCTAProps) {
  return (
    <InlineCTA {...rest}>
      <ul className="flex flex-col gap-4">
        {features.map((f, i) => (
          <li key={i} className="flex gap-3">
            <CheckCircle className="size-6 shrink-0 text-success-600" />
            <div className="flex flex-col gap-0.5 text-md">
              <span className="font-medium text-gray-700">{f.title}</span>
              {f.description && <span className="text-gray-600">{f.description}</span>}
            </div>
          </li>
        ))}
      </ul>
    </InlineCTA>
  );
}

/* ---------------- Payment method ---------------- */

export interface PaymentMethodCTAProps extends Base {
  /** Card brand logo, e.g. `<PaymentIcon method="visa" size="lg" />`. */
  methodIcon?: ReactNode;
  cardLabel: ReactNode;
  expiry?: ReactNode;
  email?: ReactNode;
  /** Button inside the card. Default `{ label: 'Edit' }`. */
  editAction?: InlineCTAAction;
}
/** PaymentMethodCTA — Figma Inline CTA Type="Payment method". */
export function PaymentMethodCTA({ methodIcon, cardLabel, expiry, email, editAction = { label: 'Edit' }, actions, ...rest }: PaymentMethodCTAProps) {
  const { label, className, ...btn } = editAction;
  return (
    <InlineCTA {...rest} actions={actions ?? null}>
      <div className="flex gap-2 rounded-lg border border-gray-200 bg-white p-4 sm:gap-4">
        {methodIcon ?? <div className="h-6 w-[34px] shrink-0 rounded-sm border border-gray-100 bg-gray-50 sm:h-10 sm:w-[58px] sm:rounded-md" />}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="flex min-w-0 flex-1 flex-col text-sm">
              <span className="font-medium text-gray-700">{cardLabel}</span>
              {expiry && <span className="text-gray-600">{expiry}</span>}
            </div>
            <Button size="md" hierarchy="secondary-gray" {...btn} className={cx(className)}>
              {label}
            </Button>
          </div>
          {email && (
            <div className="flex items-center gap-1.5 text-sm text-gray-600">
              <Mail01 className="size-4 shrink-0 text-gray-400" />
              <span className="truncate">{email}</span>
            </div>
          )}
        </div>
      </div>
    </InlineCTA>
  );
}

/* ---------------- Receipt ---------------- */

export interface ReceiptCTAProps extends Base {
  /** File icon, e.g. `<FileTypeIcon type="pdf" />`. */
  fileIcon?: ReactNode;
  fileName: ReactNode;
  fileSize?: ReactNode;
}
/** ReceiptCTA — Figma Inline CTA Type="Receipt" (file row; actions inside the card on desktop). */
export function ReceiptCTA({ fileIcon, fileName, fileSize, secondaryAction, primaryAction, actions, ...rest }: ReceiptCTAProps) {
  const acts = actions ?? <InlineCTAButtons secondary={secondaryAction} primary={primaryAction} />;
  return (
    <InlineCTA {...rest} actions={<div className="sm:hidden">{acts}</div>}>
      <div className="flex items-center gap-4 sm:rounded-lg sm:border sm:border-gray-200 sm:p-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {fileIcon ?? <File04 className="size-10 shrink-0 text-gray-400" />}
          <div className="flex min-w-0 flex-col text-sm">
            <span className="truncate font-medium text-gray-700">{fileName}</span>
            {fileSize && <span className="text-gray-600">{fileSize}</span>}
          </div>
        </div>
        <div className="hidden sm:block">{acts}</div>
      </div>
    </InlineCTA>
  );
}
