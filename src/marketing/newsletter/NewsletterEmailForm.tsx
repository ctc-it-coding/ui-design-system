import { forwardRef, useState, type FormEvent, type FormHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';

export interface NewsletterEmailFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Called with the trimmed email when a valid address is submitted. May return a promise (button shows loading). */
  onSubmit?: (email: string) => void | Promise<void>;
  placeholder?: string;
  /** Button label. Default "Subscribe". */
  buttonLabel?: ReactNode;
  /** Hint under the input. Default "We care about your data in our privacy policy." */
  hint?: ReactNode;
  /** Link target of "privacy policy" in the default hint. */
  privacyHref?: string;
  /** Hint text color class (theme-aware). */
  hintClassName?: string;
  /** Controlled value. */
  value?: string;
  defaultValue?: string;
  onValueChange?: (email: string) => void;
  /** Message shown after a successful submit (replaces the hint). */
  successMessage?: ReactNode;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * NewsletterEmailForm — Figma "Email capture": md input with hint + xl primary button.
 * Side by side from `md`, stacked full-width below. Validates the address before calling `onSubmit(email)`.
 */
export const NewsletterEmailForm = forwardRef<HTMLFormElement, NewsletterEmailFormProps>(function NewsletterEmailForm(
  {
    onSubmit,
    placeholder = 'Enter your email',
    buttonLabel = 'Subscribe',
    hint,
    privacyHref = '#',
    hintClassName = 'text-gray-600',
    value,
    defaultValue,
    onValueChange,
    successMessage = 'Thanks for subscribing!',
    className,
    ...props
  },
  ref,
) {
  const [inner, setInner] = useState(defaultValue ?? '');
  const email = value ?? inner;
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const setEmail = (v: string) => {
    if (value === undefined) setInner(v);
    onValueChange?.(v);
    if (error) setError(null);
    if (done) setDone(false);
  };
  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = email.trim();
    if (!EMAIL_RE.test(v)) {
      setError('Please enter a valid email address.');
      return;
    }
    try {
      setBusy(true);
      await onSubmit?.(v);
      setDone(true);
      if (value === undefined) setInner('');
    } finally {
      setBusy(false);
    }
  };
  const hintNode = error ? (
    <span className="text-error-600" role="alert">{error}</span>
  ) : done ? (
    <span role="status">{successMessage}</span>
  ) : (
    hint ?? (
      <>
        We care about your data in our{' '}
        <a href={privacyHref} className="underline underline-offset-2 hover:opacity-80">
          privacy policy
        </a>
        .
      </>
    )
  );
  return (
    <form ref={ref} noValidate onSubmit={submit} className={cx('flex w-full flex-col gap-4 md:max-w-[480px] md:flex-row md:items-start', className)} {...props}>
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <Input
          type="email"
          name="email"
          autoComplete="email"
          aria-label="Email address"
          placeholder={placeholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={!!error}
          aria-invalid={!!error || undefined}
        />
        <p className={cx('text-sm', hintClassName)}>{hintNode}</p>
      </div>
      <Button type="submit" size="xl" loading={busy} className="w-full md:w-auto">
        {buttonLabel}
      </Button>
    </form>
  );
});
