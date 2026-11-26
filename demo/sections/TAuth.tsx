import type { ReactNode } from 'react';
import { Section } from '../ui';
import { LogIn, SignUp, ForgotPassword, EmailVerification, type LogInType, type SignUpType, type ForgotPasswordStep, type EmailVerificationStep } from '../../src/templates/auth';

const loginTypes: LogInType[] = [
  'card-separated', 'card-combined', 'simple-header-navigation', 'simple', 'simple-illustration', 'simple-minimal',
  'simple-social-logins', 'simple-social-login-leading', 'split-quote-image-01', 'split-quote-image-02', 'split-quote-image-03',
  'split-mockup', 'split-image', 'split-mockup-quote', 'split-geometric-shapes', 'split-quote', 'split-carousel',
];

const signupTypes: SignUpType[] = [
  'split-quote-carousel', 'split-image-background', 'sidebar-progress-01', 'sidebar-progress-02', 'split-app-mockup', 'split-image',
  'split-mockup', 'split-mockup-quote', 'split-carousel', 'split-arrow', 'card-separated', 'card-combined', 'simple-header-navigation',
  'simple-social-login-leading', 'simple-social-logins', 'simple', 'simple-progress-01', 'simple-progress-02', 'simple-progress-03',
  'split-quote-image-01', 'split-quote-image-02',
];
const forgotSteps: ForgotPasswordStep[] = ['forgot-password', 'check-email', 'set-new-password', 'success'];
const verifySteps: EmailVerificationStep[] = ['check-email', 'enter-code', 'success'];

/** A 960px-tall screen frame (auto height on small screens). */
function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="font-mono text-xs text-gray-500">{label}</div>
      <div className="overflow-hidden rounded-xl ring-1 ring-gray-200 [&>*]:min-h-[812px] lg:[&>*]:h-[960px] lg:[&>*]:min-h-0">{children}</div>
    </div>
  );
}

const filter = typeof location !== 'undefined' ? location.hash.slice(1) : '';
const show = (key: string) => !filter || key.includes(filter);

export default function TAuth() {
  return (
    <>
      <Section id="log-in" title="Log in" figma="Log in and sign up pages / Log in">
        {loginTypes.filter((t) => show('login-' + t)).map((t) => (
          <Frame key={t} label={`<LogIn type="${t}" />`}>
            <LogIn type={t} />
          </Frame>
        ))}
      </Section>
      <Section id="sign-up" title="Sign up" figma="Log in and sign up pages / Sign up">
        {signupTypes.filter((t) => show('signup-' + t)).map((t) => (
          <Frame key={t} label={`<SignUp type="${t}" />`}>
            <SignUp type={t} />
          </Frame>
        ))}
      </Section>
      <Section id="forgot-password" title="Forgot password" figma="Log in and sign up pages / Forgot password">
        {forgotSteps.filter((t) => show('forgot-' + t)).map((t) => (
          <Frame key={t} label={`<ForgotPassword defaultStep="${t}" />`}>
            <ForgotPassword defaultStep={t} />
          </Frame>
        ))}
      </Section>
      <Section id="email-verification" title="Email verification" figma="Log in and sign up pages / Email verification">
        {verifySteps.filter((t) => show('verify-' + t)).map((t) => (
          <Frame key={t} label={`<EmailVerification defaultStep="${t}" />`}>
            <EmailVerification defaultStep={t} />
          </Frame>
        ))}
      </Section>
    </>
  );
}
