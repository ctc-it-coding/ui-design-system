import { forwardRef, useState, type FormEvent, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { CheckCircle, Key01, Lock01, Mail01 } from '../../icons';
import { AuthPage, AuthSwitchRow, StepShell } from './_shared';
import { PasswordChecks, defaultPasswordRules, type PasswordRule } from './SignUpForm';

/* ------------------------------------------------------------------------------------------------ */

export type ForgotPasswordStep = 'forgot-password' | 'check-email' | 'set-new-password' | 'success';

export interface ForgotPasswordProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSubmit'> {
  /** Figma: Step (controlled). Without it the screen walks through the steps itself. */
  step?: ForgotPasswordStep;
  defaultStep?: ForgotPasswordStep;
  onStepChange?: (step: ForgotPasswordStep) => void;
  /** E-mail shown in "Check your email" (also the initial input value). */
  email?: string;
  /** Step 1 submit. */
  onRequestReset?: (email: string) => void;
  /** "Open email app" (step 2). */
  onOpenEmailApp?: () => void;
  /** "Click to resend" (step 2). */
  onResend?: () => void;
  /** Step 3 submit with the new password. */
  onResetPassword?: (password: string) => void;
  /** "Continue" on the success step. */
  onContinue?: () => void;
  /** "Back to log in" link. */
  onBackToLogin?: () => void;
  passwordRules?: PasswordRule[];
}

/** ForgotPassword — Figma "Forgot password" (4 steps). Full-page, responsive. */
export const ForgotPassword = forwardRef<HTMLDivElement, ForgotPasswordProps>(function ForgotPassword(
  {
    step,
    defaultStep = 'forgot-password',
    onStepChange,
    email: emailProp = 'olivia@untitledui.com',
    onRequestReset,
    onOpenEmailApp,
    onResend,
    onResetPassword,
    onContinue,
    onBackToLogin,
    passwordRules = defaultPasswordRules,
    className,
    ...props
  },
  ref,
) {
  const [inner, setInner] = useState<ForgotPasswordStep>(defaultStep);
  const cur = step ?? inner;
  const go = (s: ForgotPasswordStep) => {
    if (step === undefined) setInner(s);
    onStepChange?.(s);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState<string>();
  const shownEmail = email || emailProp;

  let content: ReactNode;
  if (cur === 'forgot-password') {
    const submit = (e: FormEvent) => {
      e.preventDefault();
      onRequestReset?.(email);
      go('check-email');
    };
    content = (
      <StepShell icon={Key01} title="Forgot password?" supportingText="No worries, we’ll send you reset instructions." onBack={onBackToLogin}>
        <form onSubmit={submit} className="flex w-full flex-col gap-6">
          <Input type="email" label="Email" placeholder="Enter your email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Button type="submit" size="lg" className="w-full">
            Reset password
          </Button>
        </form>
      </StepShell>
    );
  } else if (cur === 'check-email') {
    content = (
      <StepShell
        icon={Mail01}
        title="Check your email"
        supportingText={
          <>
            We sent a password reset link to
            <br />
            <span className="font-medium">{shownEmail}</span>
          </>
        }
        onBack={onBackToLogin}
      >
        <Button size="lg" className="w-full" onClick={() => (onOpenEmailApp ? onOpenEmailApp() : go('set-new-password'))}>
          Open email app
        </Button>
        <AuthSwitchRow text="Didn’t receive the email?" action="Click to resend" onAction={onResend} />
      </StepShell>
    );
  } else if (cur === 'set-new-password') {
    const submit = (e: FormEvent) => {
      e.preventDefault();
      if (password !== confirm) return setErr('Passwords do not match.');
      setErr(undefined);
      onResetPassword?.(password);
      go('success');
    };
    content = (
      <StepShell icon={Lock01} title="Set new password" supportingText="Your new password must be different to previously used passwords." onBack={onBackToLogin}>
        <form onSubmit={submit} className="flex w-full flex-col gap-6">
          <div className="flex flex-col gap-5">
            <Input type="password" label="Password" placeholder="••••••••" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input type="password" label="Confirm password" placeholder="••••••••" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={err} />
            <PasswordChecks password={password} rules={passwordRules} />
          </div>
          <Button type="submit" size="lg" className="w-full">
            Reset password
          </Button>
        </form>
      </StepShell>
    );
  } else {
    content = (
      <StepShell icon={CheckCircle} title="Password reset" supportingText="Your password has been successfully reset. Click below to log in magically." onBack={onBackToLogin}>
        <Button size="lg" className="w-full" onClick={onContinue}>
          Continue
        </Button>
      </StepShell>
    );
  }
  return (
    <AuthPage ref={ref} className={cx('flex-col', className)} {...props}>
      {content}
    </AuthPage>
  );
});

