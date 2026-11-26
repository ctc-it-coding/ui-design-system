import { forwardRef, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { VerificationCodeInput } from '../../components/inputs/VerificationCodeInput';
import { CheckCircle, Mail01 } from '../../icons';
import { AuthPage, AuthSwitchRow, StepShell } from './_shared';

export type EmailVerificationStep = 'check-email' | 'enter-code' | 'success';

export interface EmailVerificationProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Step (controlled). */
  step?: EmailVerificationStep;
  defaultStep?: EmailVerificationStep;
  onStepChange?: (step: EmailVerificationStep) => void;
  email?: string;
  /** Number of code digits (Figma 4). */
  digits?: 4 | 6;
  /** Called with the code on "Verify email". */
  onVerify?: (code: string) => void;
  onResend?: () => void;
  onContinue?: () => void;
  onBackToLogin?: () => void;
}

/** EmailVerification — Figma "Email verification" (3 steps). Full-page, responsive. */
export const EmailVerification = forwardRef<HTMLDivElement, EmailVerificationProps>(function EmailVerification(
  { step, defaultStep = 'check-email', onStepChange, email = 'olivia@untitledui.com', digits = 4, onVerify, onResend, onContinue, onBackToLogin, className, ...props },
  ref,
) {
  const [inner, setInner] = useState<EmailVerificationStep>(defaultStep);
  const cur = step ?? inner;
  const go = (s: EmailVerificationStep) => {
    if (step === undefined) setInner(s);
    onStepChange?.(s);
  };
  const [code, setCode] = useState('');
  const sent = (
    <>
      We sent a verification link to
      <br />
      <span className="font-medium">{email}</span>
    </>
  );
  const resend = <AuthSwitchRow text="Didn’t receive the email?" action="Click to resend" onAction={onResend} />;

  let content: ReactNode;
  if (cur === 'check-email') {
    content = (
      <StepShell icon={Mail01} title="Check your email" supportingText={sent} onBack={onBackToLogin}>
        <Button size="lg" className="w-full" onClick={() => go('enter-code')}>
          Enter code manually
        </Button>
      </StepShell>
    );
  } else if (cur === 'enter-code') {
    const submit = (e: FormEvent) => {
      e.preventDefault();
      onVerify?.(code);
      go('success');
    };
    content = (
      <StepShell icon={Mail01} title="Check your email" supportingText={sent} onBack={onBackToLogin}>
        <form onSubmit={submit} className="flex w-full flex-col items-center gap-6 md:gap-8">
          <VerificationCodeInput digits={digits} size="sm" value={code} onChange={setCode} className="md:hidden" aria-label="Verification code" />
          <VerificationCodeInput digits={digits} size="md" value={code} onChange={setCode} className="hidden md:flex" aria-label="Verification code" />
          <Button type="submit" size="lg" className="w-full" disabled={code.length < digits}>
            Verify email
          </Button>
        </form>
        {resend}
      </StepShell>
    );
  } else {
    content = (
      <StepShell icon={CheckCircle} title="Email verified" supportingText="Your password has been successfully reset. Click below to log in magically." onBack={onBackToLogin}>
        <Button size="lg" className="w-full" onClick={onContinue}>
          Continue
        </Button>
        {resend}
      </StepShell>
    );
  }
  return (
    <AuthPage ref={ref} className={cx('flex-col', className)} {...props}>
      {content}
    </AuthPage>
  );
});
