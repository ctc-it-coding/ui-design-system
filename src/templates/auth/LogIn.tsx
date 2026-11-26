import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import type { SocialButtonPlatform } from '../../components/buttons/SocialButton';
import { EmptyStateIllustration } from '../../components/empty-state/EmptyStateIllustration';
import {
  AuthHeader,
  AuthLogo,
  AuthLogomark,
  AuthPage,
  AuthSwitchRow,
  CenteredLayout,
  CenteredQuote,
  AuthQuoteImagePanel,
  SplitFormColumn,
  SplitVisual,
  type AuthTestimonial,
} from './_shared';
import { GeometricShapes, GeometricStrip, LoginCarouselVisual, MockupQuoteVisual, MockupVisual, QuoteImageHero } from './_visuals';
import { LoginForm, type LoginFormVariant, type LoginValues } from './LoginForm';
import { aliah, amelie, authCopy, fleur, loginSlides, lula, moreTestimonials, pippa, type AuthSlide } from './defaults';
import { ImagePlaceholder } from '../../marketing/_shared';

export type LogInType =
  | 'card-separated'
  | 'card-combined'
  | 'simple-header-navigation'
  | 'simple'
  | 'simple-illustration'
  | 'simple-minimal'
  | 'simple-social-logins'
  | 'simple-social-login-leading'
  | 'split-quote-image-01'
  | 'split-quote-image-02'
  | 'split-quote-image-03'
  | 'split-mockup'
  | 'split-image'
  | 'split-mockup-quote'
  | 'split-geometric-shapes'
  | 'split-quote'
  | 'split-carousel';

/** Props shared by the full-page LogIn and SignUp screens. */
export interface AuthScreenBaseProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'onSubmit'> {
  /** Heading (default per type, Figma copy). */
  title?: ReactNode;
  /** Text under the heading. */
  supportingText?: ReactNode;
  /** Brand logo (default `<AuthLogo />`). */
  logo?: ReactNode;
  /** Brand mark above the heading (default `<AuthLogomark />`). */
  logomark?: ReactNode;
  /** Footer copyright on split layouts. */
  copyright?: ReactNode;
  /** Support e-mail shown in split-layout footers. */
  supportEmail?: ReactNode;
  /** Social providers for the social buttons. */
  socialPlatforms?: SocialButtonPlatform[];
  onSocialLogin?: (platform: SocialButtonPlatform) => void;
  /** Testimonial(s) for quote panels; an array makes the arrows cycle through them. */
  testimonials?: AuthTestimonial[];
  /** Slides for the carousel types. */
  slides?: AuthSlide[];
  /** Photo for image panels. */
  imageSrc?: string;
  /** Screen content inside device mockups. */
  mockupScreen?: ReactNode;
  /** Replaces the whole visual half of split layouts. */
  aside?: ReactNode;
}

export interface LogInProps extends AuthScreenBaseProps {
  /** Figma: Type */
  type?: LogInType;
  /** Called with `{ email, password, remember }` on submit. */
  onSubmit?: (values: LoginValues) => void;
  onForgotPassword?: () => void;
  /** "Sign up" link. */
  onSignUp?: () => void;
  signUpHref?: string;
  /** "Continue with SAML SSO" link (header-navigation / social-login-leading types). */
  onSso?: () => void;
  /** Error message under the password field. */
  error?: string;
  loading?: boolean;
}

const formVariant: Partial<Record<LogInType, LoginFormVariant>> = {
  'card-combined': 'no-labels',
  'simple-minimal': 'grouped',
  'simple-social-logins': 'email-first',
  'simple-social-login-leading': 'social-first',
};

const patternOf: Partial<Record<LogInType, 'grid' | 'circles' | 'squares'>> = {
  'card-separated': 'grid',
  simple: 'grid',
  'simple-illustration': 'circles',
  'simple-social-logins': 'circles',
  'simple-social-login-leading': 'squares',
};

/**
 * LogIn — Figma "Log in" (Shared assets / Log in and sign up pages). Full-page responsive screen
 * (1440×960 desktop, 375 mobile) with a working, controlled login form.
 */
export const LogIn = forwardRef<HTMLDivElement, LogInProps>(function LogIn(
  {
    type = 'simple',
    title,
    supportingText,
    logo = <AuthLogo />,
    logomark = <AuthLogomark />,
    copyright = authCopy.copyright,
    supportEmail,
    socialPlatforms,
    onSocialLogin,
    testimonials,
    slides = loginSlides,
    imageSrc,
    mockupScreen,
    aside,
    onSubmit,
    onForgotPassword,
    onSignUp,
    signUpHref,
    onSso,
    error,
    loading,
    className,
    ...props
  },
  ref,
) {
  const form = (
    <LoginForm
      variant={formVariant[type] ?? 'default'}
      onSubmit={onSubmit}
      onForgotPassword={onForgotPassword}
      onSocialLogin={onSocialLogin}
      socialPlatforms={socialPlatforms}
      error={error}
      loading={loading}
    />
  );
  const signUpRow = <AuthSwitchRow text="Don’t have an account?" action="Sign up" onAction={onSignUp} href={signUpHref} />;
  const sso = (
    <Button hierarchy="link-color" size="md" onClick={onSso} className="self-center">
      Continue with SAML SSO
    </Button>
  );
  const sup = supportingText ?? authCopy.loginSupporting;

  /* ---------------------------------------------------------------- centred layouts */
  if (!type.startsWith('split')) {
    const pattern = patternOf[type] ?? 'none';
    if (type === 'card-separated') {
      return (
        <AuthPage ref={ref} bg="bg-gray-50" className={cx('flex-col', className)} {...props}>
          <CenteredLayout pattern={pattern} width="max-w-[440px]" className="px-0 md:px-8">
            <AuthHeader mark={logomark} title={title ?? 'Log in to your account'} supportingText={sup} className="px-4 md:px-0" />
            <div className="w-full bg-white px-4 pt-8 pb-10 shadow-sm md:rounded-xl md:px-10">{form}</div>
            {signUpRow}
          </CenteredLayout>
        </AuthPage>
      );
    }
    if (type === 'card-combined') {
      return (
        <AuthPage ref={ref} bg="bg-white md:bg-gray-50" className={cx('flex-col', className)} {...props}>
          <CenteredLayout width="max-w-[440px]">
            <div className="flex w-full flex-col gap-6 md:rounded-xl md:bg-white md:px-10 md:py-8 md:shadow-sm">
              <AuthHeader mark={logomark} title={title ?? 'Welcome back'} supportingText={supportingText ?? 'Please enter your details.'} size="sm" />
              {form}
              {signUpRow}
            </div>
          </CenteredLayout>
        </AuthPage>
      );
    }
    if (type === 'simple-header-navigation') {
      return (
        <AuthPage ref={ref} className={cx('flex-col', className)} {...props}>
          <header className="hidden h-[72px] w-full items-center md:flex">
            <div className="mx-auto flex w-full max-w-[1280px] items-center justify-between px-8">
              {logo}
              <AuthSwitchRow text="Don’t have an account?" action="Sign up" onAction={onSignUp} href={signUpHref} size="lg" />
            </div>
          </header>
          <CenteredLayout className="md:pt-24">
            <AuthHeader mark={<div className="md:hidden">{logomark}</div>} title={title ?? 'Log in to your account'} supportingText={sup} />
            {form}
            <div className="hidden md:flex">{sso}</div>
            <div className="md:hidden">{signUpRow}</div>
          </CenteredLayout>
        </AuthPage>
      );
    }
    const mark =
      type === 'simple-illustration' ? <EmptyStateIllustration type="cloud" color="gray" size="sm" /> : type === 'simple-minimal' ? logo : logomark;
    return (
      <AuthPage ref={ref} className={cx('flex-col', className)} {...props}>
        <CenteredLayout pattern={pattern}>
          <AuthHeader
            mark={mark}
            markGap={type === 'simple-illustration' ? 'gap-8' : type === 'simple-minimal' ? 'gap-8 md:gap-16' : 'gap-6'}
            title={title ?? 'Log in to your account'}
            supportingText={type === 'simple-social-login-leading' ? supportingText : sup}
          />
          {form}
          {type === 'simple-minimal' ? (
            <div className="flex flex-col items-center gap-3">
              {signUpRow}
              <Button hierarchy="link-color" onClick={onForgotPassword}>
                Forgot password
              </Button>
            </div>
          ) : type === 'simple-social-login-leading' ? (
            sso
          ) : (
            signUpRow
          )}
        </CenteredLayout>
      </AuthPage>
    );
  }

  /* ---------------------------------------------------------------- split layouts */
  const header = (opts: { title: ReactNode; center?: boolean; size?: 'md' | 'lg'; markMobileOnly?: boolean; noMark?: boolean }) => (
    <AuthHeader
      mark={opts.noMark ? undefined : logomark}
      markMobileOnly={opts.markMobileOnly ?? true}
      align={opts.center ? 'center' : 'left'}
      size={opts.size ?? 'md'}
      title={title ?? opts.title}
      supportingText={sup}
    />
  );
  const inflowLogo = <div className="hidden lg:mb-12 lg:block">{logo}</div>;
  const body = (h: ReactNode) => (
    <>
      {h}
      {form}
      {signUpRow}
    </>
  );

  let formCol: ReactNode;
  let visual: ReactNode;
  let visualFirst = false;
  let formWeight = '';
  let visualWeight = '';

  switch (type) {
    case 'split-quote-image-01':
      formWeight = 'lg:flex-[640]';
      visualWeight = 'lg:flex-[800]';
      formCol = <SplitFormColumn logo={logo} copyright={copyright} email={supportEmail}>{body(header({ title: 'Welcome back' }))}</SplitFormColumn>;
      visual = <QuoteImageHero testimonials={testimonials ?? [amelie, ...moreTestimonials]} imageSrc={imageSrc} />;
      break;
    case 'split-mockup':
      formCol = <SplitFormColumn copyright={copyright} email={supportEmail}>{inflowLogo}{body(header({ title: 'Log in', size: 'lg' }))}</SplitFormColumn>;
      visual = <MockupVisual screen={mockupScreen} />;
      break;
    case 'split-mockup-quote':
      formWeight = 'lg:flex-[640]';
      visualWeight = 'lg:flex-[800]';
      formCol = <SplitFormColumn copyright={copyright} email={supportEmail}>{inflowLogo}{body(header({ title: 'Log in', size: 'lg' }))}</SplitFormColumn>;
      visual = <MockupQuoteVisual testimonial={testimonials?.[0] ?? aliah} screen={mockupScreen} />;
      break;
    case 'split-carousel':
      formCol = <SplitFormColumn copyright={copyright} email={supportEmail}>{inflowLogo}{body(header({ title: 'Log in', size: 'lg' }))}</SplitFormColumn>;
      visual = <LoginCarouselVisual slides={slides} />;
      break;
    case 'split-image':
      formCol = <SplitFormColumn copyright={copyright} pattern="grid">{body(header({ title: 'Welcome back', center: true, markMobileOnly: false }))}</SplitFormColumn>;
      visual = <ImagePlaceholder src={imageSrc} tone="cool" className="size-full" />;
      break;
    case 'split-geometric-shapes':
      formCol = (
        <div className="flex min-w-0 flex-1 flex-col">
          <GeometricStrip className="lg:hidden" />
          <div className="hidden p-8 lg:block">{logo}</div>
          <div className="flex flex-1 flex-col items-center px-4 pt-10 pb-12 md:px-8 lg:justify-center lg:py-0">
            <div className="flex w-full max-w-[360px] flex-col gap-8">{body(header({ title: 'Log in', noMark: true }))}</div>
          </div>
          <div className="hidden p-8 text-md text-gray-600 lg:block">{copyright}</div>
        </div>
      );
      visual = (
        <div className="size-full p-6">
          <GeometricShapes />
        </div>
      );
      break;
    case 'split-quote':
      visualFirst = true;
      formCol = <SplitFormColumn>{body(header({ title: 'Welcome back' }))}</SplitFormColumn>;
      visual = (
        <div className="relative flex size-full items-center justify-center bg-gray-50 px-8">
          <div className="absolute top-8 left-8">{logo}</div>
          <CenteredQuote testimonial={testimonials?.[0] ?? pippa} />
          <div className="absolute bottom-8 left-8 text-sm text-gray-600">{copyright}</div>
        </div>
      );
      break;
    case 'split-quote-image-02':
      formCol = <SplitFormColumn logo={logo} copyright={copyright} email={supportEmail}>{body(header({ title: 'Welcome back' }))}</SplitFormColumn>;
      visual = <AuthQuoteImagePanel variant="floating" testimonials={testimonials ?? [fleur, lula]} />;
      break;
    case 'split-quote-image-03':
    default:
      formCol = <SplitFormColumn>{body(header({ title: 'Welcome back', center: true, markMobileOnly: false }))}</SplitFormColumn>;
      visual = (
        <div className="flex size-full py-6 pr-6">
          <AuthQuoteImagePanel variant="full-width" testimonials={testimonials ?? [lula, fleur]} rounded="rounded-[20px]" />
        </div>
      );
      break;
  }

  const visualCol = <SplitVisual className={visualWeight}>{aside ?? visual}</SplitVisual>;
  return (
    <AuthPage ref={ref} className={className} {...props}>
      {visualFirst && visualCol}
      <div className={cx('flex min-w-0 flex-1', formWeight)}>{formCol}</div>
      {!visualFirst && visualCol}
    </AuthPage>
  );
});
