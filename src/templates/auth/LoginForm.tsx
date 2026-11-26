import { useState, type FormEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { SocialButton, type SocialButtonPlatform } from '../../components/buttons/SocialButton';
import { Input } from '../../components/inputs/Input';
import { Checkbox } from '../../components/checkboxes/Checkbox';
import { ContentDivider } from '../../components/content-divider/ContentDivider';

export interface LoginValues {
  email: string;
  password: string;
  remember: boolean;
}

export type LoginFormVariant =
  /** labelled email + password, remember row, Sign in + social */
  | 'default'
  /** same without field labels (Figma "Card combined") */
  | 'no-labels'
  /** both fields in one bordered box, no remember row (Figma "Simple minimal") */
  | 'grouped'
  /** email + "Continue with email", OR divider, stacked social buttons (Figma "Simple social logins") */
  | 'email-first'
  /** social button, divider line, email + "Continue with email" (Figma "Simple social login leading") */
  | 'social-first';

const platformName: Record<SocialButtonPlatform, string> = { google: 'Google', facebook: 'Facebook', apple: 'Apple', figma: 'Figma', dribbble: 'Dribbble', x: 'X' };

export interface LoginFormProps {
  variant?: LoginFormVariant;
  /** Controlled values. */
  values?: LoginValues;
  defaultValues?: Partial<LoginValues>;
  onValuesChange?: (values: LoginValues) => void;
  /** Called with the form values on submit. */
  onSubmit?: (values: LoginValues) => void;
  onForgotPassword?: () => void;
  onSocialLogin?: (platform: SocialButtonPlatform) => void;
  /** Social providers (default Google; email-first shows Facebook, Google, Apple). */
  socialPlatforms?: SocialButtonPlatform[];
  /** Social button label (default "Sign in with X" / "Continue with X"). */
  socialLabel?: (platform: SocialButtonPlatform) => ReactNode;
  submitLabel?: ReactNode;
  emailLabel?: ReactNode;
  emailPlaceholder?: string;
  passwordLabel?: ReactNode;
  rememberLabel?: ReactNode;
  forgotLabel?: ReactNode;
  /** Error message shown under the password field. */
  error?: string;
  loading?: boolean;
  className?: string;
}

/** LoginForm — the "Form + Row + Actions" block shared by every Figma "Log in" screen. */
export function LoginForm({
  variant = 'default',
  values,
  defaultValues,
  onValuesChange,
  onSubmit,
  onForgotPassword,
  onSocialLogin,
  socialPlatforms,
  socialLabel,
  submitLabel,
  emailLabel = 'Email',
  emailPlaceholder = 'Enter your email',
  passwordLabel = 'Password',
  rememberLabel = 'Remember for 30 days',
  forgotLabel = 'Forgot password',
  error,
  loading,
  className,
}: LoginFormProps) {
  const [inner, setInner] = useState<LoginValues>({ email: '', password: '', remember: false, ...defaultValues });
  const v = values ?? inner;
  const set = (patch: Partial<LoginValues>) => {
    const next = { ...v, ...patch };
    if (!values) setInner(next);
    onValuesChange?.(next);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(v);
  };

  const emailOnly = variant === 'email-first' || variant === 'social-first';
  const platforms = socialPlatforms ?? (variant === 'email-first' ? ['facebook', 'google', 'apple'] : ['google']);
  const label = socialLabel ?? ((p: SocialButtonPlatform) => (emailOnly ? `Continue with ${platformName[p]}` : `Sign in with ${platformName[p]}`));
  const social = (
    <div className="flex w-full flex-col gap-3">
      {platforms.map((p) => (
        <SocialButton key={p} platform={p} theme="color" className="w-full" onClick={() => onSocialLogin?.(p)}>
          {label(p)}
        </SocialButton>
      ))}
    </div>
  );
  const primary = (
    <Button type="submit" size="lg" className="w-full" loading={loading}>
      {submitLabel ?? (emailOnly ? 'Continue with email' : 'Sign in')}
    </Button>
  );
  const showLabels = variant === 'default';

  if (emailOnly) {
    const emailBlock = (
      <div className="flex flex-col gap-4">
        <Input type="email" name="email" autoComplete="email" aria-label="Email" placeholder={emailPlaceholder} value={v.email} onChange={(e) => set({ email: e.target.value })} error={error} required />
        {primary}
      </div>
    );
    return (
      <form onSubmit={submit} className={cx('flex w-full flex-col gap-6', className)} noValidate={false}>
        {variant === 'email-first' ? (
          <>
            {emailBlock}
            <ContentDivider type="text">OR</ContentDivider>
            {social}
          </>
        ) : (
          <>
            {social}
            <hr className="border-gray-200" />
            {emailBlock}
          </>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={submit} className={cx('flex w-full flex-col gap-6', className)}>
      {variant === 'grouped' ? (
        <div className="flex flex-col overflow-hidden rounded-[9px] bg-white shadow-xs ring-1 ring-gray-300 ring-inset focus-within:ring-2 focus-within:ring-brand-500">
          <input
            type="email"
            name="email"
            autoComplete="email"
            aria-label={typeof emailLabel === 'string' ? emailLabel : 'Email'}
            placeholder={emailPlaceholder}
            value={v.email}
            onChange={(e) => set({ email: e.target.value })}
            required
            className="w-full border-b border-gray-300 bg-transparent px-3.5 py-2.5 text-md text-gray-900 outline-none placeholder:text-gray-500"
          />
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            aria-label={typeof passwordLabel === 'string' ? passwordLabel : 'Password'}
            placeholder="••••••••"
            value={v.password}
            onChange={(e) => set({ password: e.target.value })}
            required
            className="w-full bg-transparent px-3.5 py-2.5 text-md text-gray-900 outline-none placeholder:text-gray-500"
          />
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            label={showLabels ? emailLabel : undefined}
            aria-label={showLabels ? undefined : 'Email'}
            placeholder={emailPlaceholder}
            value={v.email}
            onChange={(e) => set({ email: e.target.value })}
          />
          <Input
            type="password"
            name="password"
            autoComplete="current-password"
            label={showLabels ? passwordLabel : undefined}
            aria-label={showLabels ? undefined : 'Password'}
            placeholder="••••••••"
            value={v.password}
            onChange={(e) => set({ password: e.target.value })}
            error={error}
          />
        </div>
      )}
      {variant !== 'grouped' && (
        <div className="flex items-center gap-2">
          <Checkbox size="sm" label={rememberLabel} checked={v.remember} onChange={(c) => set({ remember: c })} className="flex-1" />
          <Button hierarchy="link-color" size="md" onClick={onForgotPassword}>
            {forgotLabel}
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-4">
        {primary}
        {social}
      </div>
    </form>
  );
}
