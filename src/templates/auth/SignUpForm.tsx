import { useState, type FormEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { SocialButton, type SocialButtonPlatform } from '../../components/buttons/SocialButton';
import { Input } from '../../components/inputs/Input';
import { ContentDivider } from '../../components/content-divider/ContentDivider';
import { CheckIcon } from '../../components/misc-icons/CheckIcon';

export interface SignUpValues {
  name: string;
  email: string;
  password: string;
}

export type SignUpFormVariant =
  /** labelled Name*, Email*, Password* + Get started + social */
  | 'default'
  /** fields without labels (Figma "Card combined") */
  | 'no-labels'
  /** password with live requirement checks (Figma Sign up "Simple") */
  | 'checks'
  /** email + Get started, OR divider, stacked social buttons */
  | 'email-first'
  /** social button(s), divider, email + Get started */
  | 'social-first';

const platformName: Record<SocialButtonPlatform, string> = { google: 'Google', facebook: 'Facebook', apple: 'Apple', figma: 'Figma', dribbble: 'Dribbble', x: 'X' };

export interface PasswordRule {
  label: ReactNode;
  test: (password: string) => boolean;
}

export const defaultPasswordRules: PasswordRule[] = [
  { label: 'Must be at least 8 characters', test: (p) => p.length >= 8 },
  { label: 'Must contain one special character', test: (p) => /[^A-Za-z0-9]/.test(p) },
];

/** Requirement list with check icons that turn green when met (Figma "Checks"). */
export function PasswordChecks({ password, rules = defaultPasswordRules, className }: { password: string; rules?: PasswordRule[]; className?: string }) {
  return (
    <ul className={cx('flex flex-col gap-3', className)}>
      {rules.map((r, i) => {
        const ok = r.test(password);
        return (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
            <CheckIcon type="filled" size="xs" color={ok ? 'success' : 'gray'} className={ok ? undefined : 'bg-gray-300'} />
            <span className="flex-1">{r.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

export interface SignUpFormProps {
  variant?: SignUpFormVariant;
  values?: SignUpValues;
  defaultValues?: Partial<SignUpValues>;
  onValuesChange?: (values: SignUpValues) => void;
  /** Called with `{ name, email, password }` on submit. */
  onSubmit?: (values: SignUpValues) => void;
  onSocialLogin?: (platform: SocialButtonPlatform) => void;
  /** Social providers (default Google; email-first shows Facebook, Google, Apple). */
  socialPlatforms?: SocialButtonPlatform[];
  socialLabel?: (platform: SocialButtonPlatform) => ReactNode;
  submitLabel?: ReactNode;
  passwordRules?: PasswordRule[];
  error?: string;
  loading?: boolean;
  className?: string;
}

/** SignUpForm — the form block shared by every Figma "Sign up" screen. */
export function SignUpForm({
  variant = 'default',
  values,
  defaultValues,
  onValuesChange,
  onSubmit,
  onSocialLogin,
  socialPlatforms,
  socialLabel,
  submitLabel = 'Get started',
  passwordRules,
  error,
  loading,
  className,
}: SignUpFormProps) {
  const [inner, setInner] = useState<SignUpValues>({ name: '', email: '', password: '', ...defaultValues });
  const v = values ?? inner;
  const set = (patch: Partial<SignUpValues>) => {
    const next = { ...v, ...patch };
    if (!values) setInner(next);
    onValuesChange?.(next);
  };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(v);
  };
  const platforms = socialPlatforms ?? (variant === 'email-first' ? ['facebook', 'google', 'apple'] : ['google']);
  const label = socialLabel ?? ((p: SocialButtonPlatform) => `Sign up with ${platformName[p]}`);
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
      {submitLabel}
    </Button>
  );

  if (variant === 'email-first' || variant === 'social-first') {
    const emailBlock = (
      <div className="flex flex-col gap-4">
        <Input type="email" name="email" autoComplete="email" aria-label="Email" placeholder="Enter your email" value={v.email} onChange={(e) => set({ email: e.target.value })} error={error} />
        {primary}
      </div>
    );
    const stacked = platforms.length > 1;
    return (
      <form onSubmit={submit} className={cx('flex w-full flex-col gap-6', className)}>
        {variant === 'email-first' ? (
          <>
            {emailBlock}
            <ContentDivider type="text">OR</ContentDivider>
            {social}
          </>
        ) : (
          <>
            {social}
            {stacked ? <ContentDivider type="text">OR</ContentDivider> : <hr className="border-gray-200" />}
            {emailBlock}
          </>
        )}
      </form>
    );
  }

  const labels = variant !== 'no-labels';
  return (
    <form onSubmit={submit} className={cx('flex w-full flex-col gap-6', className)}>
      <div className="flex flex-col gap-5">
        <Input
          name="name"
          autoComplete="name"
          label={labels ? 'Name' : undefined}
          aria-label={labels ? undefined : 'Name'}
          required
          placeholder="Enter your name"
          value={v.name}
          onChange={(e) => set({ name: e.target.value })}
        />
        <Input
          type="email"
          name="email"
          autoComplete="email"
          label={labels ? 'Email' : undefined}
          aria-label={labels ? undefined : 'Email'}
          required
          placeholder="Enter your email"
          value={v.email}
          onChange={(e) => set({ email: e.target.value })}
        />
        <Input
          type="password"
          name="password"
          autoComplete="new-password"
          label={labels ? 'Password' : undefined}
          aria-label={labels ? undefined : 'Password'}
          required
          placeholder="Create a password"
          hint={variant === 'checks' ? undefined : 'Must be at least 8 characters.'}
          error={error}
          value={v.password}
          onChange={(e) => set({ password: e.target.value })}
        />
        {variant === 'checks' && <PasswordChecks password={v.password} rules={passwordRules} />}
      </div>
      <div className="flex flex-col gap-4">
        {primary}
        {social}
      </div>
    </form>
  );
}
