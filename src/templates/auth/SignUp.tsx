import { forwardRef, useState, type FormEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { SocialButton, type SocialButtonPlatform } from '../../components/buttons/SocialButton';
import { Input } from '../../components/inputs/Input';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { PaginationDots } from '../../components/pagination/PaginationDots';
import { ProgressIconsWithText } from '../../components/progress-steps/ProgressIconsWithText';
import { ProgressIconsCentered } from '../../components/progress-steps/ProgressIconsCentered';
import { ProgressTextWithLine } from '../../components/progress-steps/ProgressTextWithLine';
import { ProgressMinimalIcons } from '../../components/progress-steps/ProgressMinimalIcons';
import type { IconSlot } from '../../utils/renderIcon';
import { ArrowLeft, ArrowRight, Check, Lock01, Mail01, Stars02, User01, UsersPlus } from '../../icons';
import { ImagePlaceholder } from '../../marketing/_shared';
import {
  AuthHeader,
  AuthLogo,
  AuthLogomark,
  AuthPage,
  AuthSwitchRow,
  AuthBackground,
  CenteredLayout,
  CenteredQuote,
  AuthQuoteImagePanel,
  SplitFormColumn,
  SplitVisual,
  useCycle,
} from './_shared';
import { AppMockupVisual, ArrowHero, HandDrawnArrow, ImageBackgroundHero, MockupQuoteVisual, MockupVisual, SignupCarouselVisual } from './_visuals';
import { SignUpForm, type SignUpFormVariant, type SignUpValues } from './SignUpForm';
import { aliah, authCopy, caitlyn, fleur, henley, heroCopy, lori, moreTestimonials, signupSlides } from './defaults';
import type { AuthScreenBaseProps } from './LogIn';

export type SignUpType =
  | 'split-quote-carousel'
  | 'split-image-background'
  | 'sidebar-progress-01'
  | 'sidebar-progress-02'
  | 'split-app-mockup'
  | 'split-image'
  | 'split-mockup'
  | 'split-mockup-quote'
  | 'split-carousel'
  | 'split-arrow'
  | 'card-separated'
  | 'card-combined'
  | 'simple-header-navigation'
  | 'simple-social-login-leading'
  | 'simple-social-logins'
  | 'simple'
  | 'simple-progress-01'
  | 'simple-progress-02'
  | 'simple-progress-03'
  | 'split-quote-image-01'
  | 'split-quote-image-02';

/* ------------------------------------------------------------------------------------------------
 * Multi-step flow (Sidebar progress / Simple progress types)
 * ---------------------------------------------------------------------------------------------- */

export interface SignUpStep {
  title: ReactNode;
  description: ReactNode;
  icon: IconSlot;
}

export const defaultSignUpSteps: SignUpStep[] = [
  { title: 'Your details', description: 'Please provide your name and email', icon: User01 },
  { title: 'Choose a password', description: 'Choose a secure password', icon: Lock01 },
  { title: 'Invite your team', description: 'Start collaborating with your team', icon: UsersPlus },
  { title: 'Add your socials', description: 'Share posts to your social accounts', icon: Stars02 },
];

export interface SignUpFlowValues {
  name: string;
  email: string;
  password: string;
  invites: string[];
}

interface FlowState {
  step: number;
  setStep: (s: number) => void;
}

function useStep(step: number | undefined, defaultStep: number, onStepChange?: (s: number) => void): FlowState {
  const [inner, setInner] = useState(defaultStep);
  const cur = step ?? inner;
  return {
    step: cur,
    setStep: (s) => {
      if (step === undefined) setInner(s);
      onStepChange?.(s);
    },
  };
}

/** Body of one step of the sign-up flow (heading + fields + Continue). */
function FlowStep({
  flow,
  steps,
  mark,
  values,
  setValues,
  onComplete,
  onSocialLogin,
}: {
  flow: FlowState;
  steps: SignUpStep[];
  mark: ReactNode;
  values: SignUpFlowValues;
  setValues: (v: SignUpFlowValues) => void;
  onComplete?: (v: SignUpFlowValues) => void;
  onSocialLogin?: (p: SocialButtonPlatform) => void;
}) {
  const { step, setStep } = flow;
  const [confirm, setConfirm] = useState('');
  const [err, setErr] = useState<string | undefined>();
  const last = step >= steps.length - 1;
  const headings: [ReactNode, ReactNode][] = [
    ['Your details', 'Please provide your name and email.'],
    ['Choose a password', 'Must be at least 8 characters.'],
    ['Invite your team', 'Start collaborating with your team.'],
    ['Add your socials', 'Share posts to your social accounts.'],
  ];
  const [title, sub] = headings[step] ?? [steps[step]?.title, steps[step]?.description];
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (step === 1 && values.password !== confirm) {
      setErr('Passwords do not match.');
      return;
    }
    setErr(undefined);
    if (last) onComplete?.(values);
    else setStep(step + 1);
  };
  let fields: ReactNode;
  if (step === 0) {
    fields = (
      <>
        <Input aria-label="Name" placeholder="Enter your name" autoComplete="name" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />
        <Input type="email" aria-label="Email" placeholder="Enter your email" autoComplete="email" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />
      </>
    );
  } else if (step === 1) {
    fields = (
      <>
        <Input type="password" aria-label="Password" placeholder="Choose a password" autoComplete="new-password" value={values.password} onChange={(e) => setValues({ ...values, password: e.target.value })} />
        <Input type="password" aria-label="Confirm password" placeholder="Confirm password" autoComplete="new-password" value={confirm} onChange={(e) => setConfirm(e.target.value)} error={err} />
      </>
    );
  } else if (step === 2) {
    fields = values.invites.map((inv, i) => (
      <Input
        key={i}
        type="email"
        iconLeading={Mail01}
        aria-label={`Team member ${i + 1}`}
        placeholder="you@example.com"
        value={inv}
        onChange={(e) => setValues({ ...values, invites: values.invites.map((x, j) => (j === i ? e.target.value : x)) })}
      />
    ));
  } else {
    fields = (['x', 'facebook', 'dribbble'] as SocialButtonPlatform[]).map((p) => (
      <SocialButton key={p} platform={p} theme="color" className="w-full" onClick={() => onSocialLogin?.(p)}>
        Connect {p === 'x' ? 'X' : p[0].toUpperCase() + p.slice(1)}
      </SocialButton>
    ));
  }
  return (
    <form onSubmit={submit} className="flex w-full max-w-[360px] flex-col items-center gap-8">
      <AuthHeader mark={mark} title={title} supportingText={sub} />
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-5">{fields}</div>
        <Button type="submit" size="lg" className="w-full">
          {last ? 'Finish' : 'Continue'}
        </Button>
        {step > 0 && (
          <Button hierarchy="link-gray" iconLeading={ArrowLeft} className="self-center" onClick={() => setStep(step - 1)}>
            Back
          </Button>
        )}
      </div>
    </form>
  );
}

/** Vertical stepper on the dark brand sidebar (Figma Sidebar progress 02). */
function DarkSteps({ steps, current, onSelect }: { steps: SignUpStep[]; current: number; onSelect: (i: number) => void }) {
  return (
    <ol className="flex flex-col">
      {steps.map((s, i) => {
        const done = i < current;
        const cur = i === current;
        return (
          <li key={i} className="flex gap-4">
            <div className="flex flex-col items-center gap-1 pb-1">
              <button
                type="button"
                aria-current={cur ? 'step' : undefined}
                aria-label={typeof s.title === 'string' ? s.title : `Step ${i + 1}`}
                onClick={() => i <= current && onSelect(i)}
                className={cx(
                  'flex size-8 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-4 focus-visible:ring-white/30',
                  done ? 'bg-white text-brand-800' : cur ? 'bg-white/10 ring-2 ring-white ring-inset' : 'ring-2 ring-brand-600 ring-inset',
                )}
              >
                {done ? <Check className="size-4" /> : <span className={cx('size-2.5 rounded-full', cur ? 'bg-white' : 'bg-brand-600')} />}
              </button>
              {i < steps.length - 1 && <span className={cx('w-0.5 flex-1 rounded-sm', done ? 'bg-white' : 'bg-brand-600')} />}
            </div>
            <div className="flex flex-col pt-1 pb-8">
              <span className={cx('text-md font-semibold', cur || done ? 'text-white' : 'text-brand-200')}>{s.title}</span>
              <span className={cx('text-md', cur || done ? 'text-brand-200' : 'text-brand-300')}>{s.description}</span>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/* ------------------------------------------------------------------------------------------------
 * SignUp
 * ---------------------------------------------------------------------------------------------- */

export interface SignUpProps extends AuthScreenBaseProps {
  /** Figma: Type */
  type?: SignUpType;
  /** Called with `{ name, email, password }` (single-step types). */
  onSubmit?: (values: SignUpValues) => void;
  /** "Log in" link. */
  onLogIn?: () => void;
  logInHref?: string;
  /** "Continue with SAML SSO" link. */
  onSso?: () => void;
  error?: string;
  loading?: boolean;
  /** Multi-step types: steps shown in the progress indicator. */
  steps?: SignUpStep[];
  /** Multi-step types: current step (controlled, 0-based). Figma shows step 1 ("Choose a password"). */
  step?: number;
  defaultStep?: number;
  onStepChange?: (step: number) => void;
  /** Multi-step types: called after the last step. */
  onComplete?: (values: SignUpFlowValues) => void;
}

const formVariant: Partial<Record<SignUpType, SignUpFormVariant>> = {
  'card-combined': 'no-labels',
  simple: 'checks',
  'simple-social-logins': 'email-first',
  'simple-social-login-leading': 'social-first',
  'split-quote-image-02': 'social-first',
};

/**
 * SignUp — Figma "Sign up" (Shared assets / Log in and sign up pages). Full-page responsive screen
 * with a working sign-up form; the progress types run a 4-step flow.
 */
export const SignUp = forwardRef<HTMLDivElement, SignUpProps>(function SignUp(
  {
    type = 'simple',
    title,
    supportingText,
    logo = <AuthLogo />,
    logomark = <AuthLogomark />,
    copyright = authCopy.copyright,
    supportEmail = authCopy.email,
    socialPlatforms,
    onSocialLogin,
    testimonials,
    slides = signupSlides,
    imageSrc,
    mockupScreen,
    aside,
    onSubmit,
    onLogIn,
    logInHref,
    onSso,
    error,
    loading,
    steps = defaultSignUpSteps,
    step,
    defaultStep = 1,
    onStepChange,
    onComplete,
    className,
    ...props
  },
  ref,
) {
  const flow = useStep(step, defaultStep, onStepChange);
  const [flowValues, setFlowValues] = useState<SignUpFlowValues>({ name: '', email: '', password: '', invites: ['', '', ''] });
  const quotes = useCycle((testimonials ?? [lori]).length);

  const variant = formVariant[type] ?? 'default';
  const form = (
    <SignUpForm
      variant={variant}
      onSubmit={onSubmit}
      onSocialLogin={onSocialLogin}
      socialPlatforms={socialPlatforms ?? (type === 'split-quote-image-02' ? ['facebook', 'google', 'apple'] : undefined)}
      error={error}
      loading={loading}
    />
  );
  const logInRow = <AuthSwitchRow text="Already have an account?" action="Log in" onAction={onLogIn} href={logInHref} />;
  const sso = (
    <Button hierarchy="link-color" onClick={onSso} className="self-center">
      Continue with SAML SSO
    </Button>
  );
  const sup = supportingText ?? authCopy.signupSupporting;
  const flowStep = (mark: ReactNode) => (
    <FlowStep flow={flow} steps={steps} mark={mark} values={flowValues} setValues={setFlowValues} onComplete={onComplete} onSocialLogin={onSocialLogin} />
  );
  const progressItems = steps.map((s) => ({ title: s.title, description: s.description, icon: s.icon }));

  /* ------------------------------------------------ multi-step: simple progress */
  if (type === 'simple-progress-01' || type === 'simple-progress-02' || type === 'simple-progress-03') {
    const pattern = type === 'simple-progress-01' ? 'circles' : type === 'simple-progress-02' ? 'squares' : 'grid';
    let progress: ReactNode;
    if (type === 'simple-progress-01') progress = <ProgressMinimalIcons className="justify-center" steps={steps.length} current={flow.step} size="sm" connected />;
    else if (type === 'simple-progress-02')
      progress = (
        <>
          <ProgressIconsCentered className="hidden md:flex" items={progressItems} current={flow.step} size="sm" type="featured-icon" />
          <ProgressIconsCentered className="md:hidden" items={progressItems} current={flow.step} size="sm" type="featured-icon" orientation="vertical" />
        </>
      );
    else
      progress = (
        <>
          <ProgressTextWithLine className="hidden md:flex" items={progressItems} current={flow.step} size="sm" />
          <ProgressTextWithLine className="md:hidden" items={progressItems} current={flow.step} size="sm" orientation="vertical" />
        </>
      );
    return (
      <AuthPage ref={ref} className={cx('flex-col justify-between', className)} {...props}>
        <CenteredLayout pattern={pattern}>{flowStep(logomark)}</CenteredLayout>
        <div className="relative mx-auto w-full max-w-[1280px] px-4 pb-12 md:px-8 md:pb-16">{progress}</div>
      </AuthPage>
    );
  }

  /* ------------------------------------------------ multi-step: sidebar progress */
  if (type === 'sidebar-progress-01' || type === 'sidebar-progress-02') {
    const dark = type === 'sidebar-progress-02';
    const cur = steps[flow.step];
    const mark = dark ? logomark : <FeaturedIcon icon={cur?.icon ?? Lock01} size="xl" color="brand" theme="modern" />;
    return (
      <AuthPage ref={ref} className={className} {...props}>
        <aside className={cx('relative hidden w-[440px] shrink-0 flex-col justify-between lg:flex', dark ? 'bg-brand-800' : 'bg-gray-50')}>
          <div className="flex flex-col gap-20 p-8">
            {dark ? <AuthLogo dark /> : logo}
            <div className="pr-8">
              {dark ? (
                <DarkSteps steps={steps} current={flow.step} onSelect={flow.setStep} />
              ) : (
                <ProgressIconsWithText items={progressItems} current={flow.step} type="featured-icon" size="md" />
              )}
            </div>
          </div>
          <div className={cx('flex items-center justify-between p-8 text-sm', dark ? 'text-brand-200' : 'text-gray-600')}>
            <span>{copyright}</span>
            <span className="flex items-center gap-2">
              <Mail01 className="size-4" />
              {supportEmail}
            </span>
          </div>
        </aside>
        <main className="relative flex flex-1 flex-col items-center justify-between gap-12 px-4 pt-12 pb-12 md:px-8 lg:pt-40 lg:pb-12">
          <AuthBackground pattern={dark ? 'circles' : 'grid'} />
          <div className="relative flex w-full flex-col items-center">{flowStep(mark)}</div>
          {dark ? (
            <PaginationDots className="relative w-full max-w-[360px] [&>*]:flex-1" count={steps.length} index={flow.step} onIndexChange={(i) => i <= flow.step && flow.setStep(i)} dotStyle="line" size="lg" />
          ) : (
            <PaginationDots className="relative" count={steps.length} index={flow.step} onIndexChange={(i) => i <= flow.step && flow.setStep(i)} size="lg" />
          )}
        </main>
      </AuthPage>
    );
  }

  /* ------------------------------------------------ centred single-step */
  if (!type.startsWith('split')) {
    if (type === 'card-separated') {
      return (
        <AuthPage ref={ref} bg="bg-gray-50" className={cx('flex-col', className)} {...props}>
          <CenteredLayout pattern="grid" width="max-w-[440px]" className="px-0 md:px-8">
            <AuthHeader mark={logomark} title={title ?? 'Create an account'} supportingText={sup} className="px-4 md:px-0" />
            <div className="w-full bg-white px-4 py-8 shadow-md md:rounded-xl md:px-10">{form}</div>
            {logInRow}
          </CenteredLayout>
        </AuthPage>
      );
    }
    if (type === 'card-combined') {
      return (
        <AuthPage ref={ref} bg="bg-white md:bg-gray-50" className={cx('flex-col', className)} {...props}>
          <CenteredLayout width="max-w-[440px]">
            <div className="flex w-full flex-col gap-6 md:rounded-xl md:bg-white md:px-10 md:py-8 md:shadow-sm">
              <AuthHeader mark={logomark} title={title ?? 'Start your free trial'} supportingText={supportingText ?? 'Sign up in less than 2 minutes.'} size="sm" />
              {form}
              {logInRow}
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
              <AuthSwitchRow text="Already have an account?" action="Log in" onAction={onLogIn} href={logInHref} size="lg" />
            </div>
          </header>
          <CenteredLayout>
            <AuthHeader mark={<div className="md:hidden">{logomark}</div>} title={title ?? 'Create an account'} supportingText={sup} />
            {form}
            <div className="hidden md:flex">{sso}</div>
            <div className="md:hidden">{logInRow}</div>
          </CenteredLayout>
        </AuthPage>
      );
    }
    const pattern = type === 'simple-social-logins' ? 'circles' : 'grid';
    return (
      <AuthPage ref={ref} className={cx('flex-col', className)} {...props}>
        <CenteredLayout pattern={pattern}>
          <AuthHeader mark={logomark} title={title ?? 'Create an account'} supportingText={type === 'simple-social-login-leading' ? supportingText : sup} />
          {form}
          {type === 'simple-social-login-leading' ? sso : logInRow}
        </CenteredLayout>
      </AuthPage>
    );
  }

  /* ------------------------------------------------ split layouts */
  const header = (t: ReactNode, opts: { center?: boolean; size?: 'md' | 'lg'; markDesktop?: boolean; noSupporting?: boolean } = {}) => (
    <AuthHeader
      mark={logomark}
      markMobileOnly={!opts.markDesktop}
      align={opts.center ? 'center' : 'left'}
      size={opts.size ?? 'md'}
      title={title ?? t}
      supportingText={opts.noSupporting ? supportingText : sup}
    />
  );
  const body = (h: ReactNode) => (
    <>
      {h}
      {form}
      {logInRow}
    </>
  );
  const col = (h: ReactNode, extra?: ReactNode) => (
    <SplitFormColumn logo={logo} copyright={copyright} email={supportEmail}>
      {body(h)}
      {extra}
    </SplitFormColumn>
  );

  let formCol: ReactNode = col(header('Sign up'));
  let visual: ReactNode = null;
  let visualFirst = false;
  let formWeight = '';
  let visualWeight = '';

  switch (type) {
    case 'split-quote-carousel': {
      const list = testimonials ?? [lori, ...moreTestimonials.map((t) => ({ ...t, quote: String(t.quote).replace(/[“”]/g, '') }))];
      const t = list[quotes.index] ?? lori;
      visualFirst = true;
      formCol = <SplitFormColumn>{body(header('Sign up'))}</SplitFormColumn>;
      visual = (
        <div className="relative flex size-full items-center justify-center bg-gray-50 px-8">
          <div className="absolute top-8 left-8">{logo}</div>
          <CenteredQuote testimonial={t} starsFirst>
            <div className="flex items-center justify-center gap-16">
              <Button size="sm" hierarchy="tertiary-gray" iconLeading={ArrowLeft} aria-label="Previous testimonial" onClick={quotes.prev} />
              <PaginationDots count={list.length} index={quotes.index} onIndexChange={quotes.setIndex} size="lg" />
              <Button size="sm" hierarchy="tertiary-gray" iconLeading={ArrowRight} aria-label="Next testimonial" onClick={quotes.next} />
            </div>
          </CenteredQuote>
          <div className="absolute right-8 bottom-8 left-8 flex justify-between text-sm text-gray-600">
            <span>{copyright}</span>
            <span className="flex items-center gap-2">
              <Mail01 className="size-4 text-gray-500" />
              {supportEmail}
            </span>
          </div>
        </div>
      );
      break;
    }
    case 'split-image-background':
      visualFirst = true;
      visualWeight = 'lg:flex-[880]';
      formWeight = 'lg:flex-[560]';
      formCol = <SplitFormColumn>{body(header('Sign up', { markDesktop: true }))}</SplitFormColumn>;
      visual = <ImageBackgroundHero title={heroCopy.title} supportingText={heroCopy.supportingText} imageSrc={imageSrc} />;
      break;
    case 'split-app-mockup':
      visual = <AppMockupVisual screen={mockupScreen} />;
      break;
    case 'split-image':
      visual = <ImagePlaceholder src={imageSrc} tone="warm" className="size-full rounded-l-[80px]" />;
      break;
    case 'split-mockup':
      formCol = col(header('Sign up', { size: 'lg' }));
      visual = <MockupVisual screen={mockupScreen} />;
      break;
    case 'split-mockup-quote':
      formWeight = 'lg:flex-[640]';
      visualWeight = 'lg:flex-[800]';
      formCol = col(header('Sign up', { size: 'lg' }));
      visual = <MockupQuoteVisual testimonial={testimonials?.[0] ?? aliah} screen={mockupScreen} />;
      break;
    case 'split-carousel':
      formCol = col(header('Sign up', { size: 'lg' }));
      visual = <SignupCarouselVisual slides={slides} />;
      break;
    case 'split-arrow':
      formCol = (
        <SplitFormColumn logo={logo} copyright={copyright} email={supportEmail}>
          {body(
            <AuthHeader
              mark={logomark}
              markMobileOnly
              align="left"
              size="lg"
              title={title ?? 'Sign up'}
              supportingText={<span className="lg:hidden">{supportingText ?? heroCopy.title}</span>}
            />,
          )}
          <HandDrawnArrow className="pointer-events-none absolute right-0 bottom-[72px] hidden w-[220px] xl:block" />
        </SplitFormColumn>
      );
      visual = <ArrowHero title={heroCopy.title} supportingText={heroCopy.supportingTextArrow} imageSrc={imageSrc} />;
      break;
    case 'split-quote-image-01':
      formCol = <SplitFormColumn logo={logo}>{body(header('Sign up'))}</SplitFormColumn>;
      visual = <AuthQuoteImagePanel variant="floating" testimonials={testimonials ?? [caitlyn, fleur]} />;
      break;
    case 'split-quote-image-02':
    default:
      formCol = <SplitFormColumn>{body(header('Create an account', { center: true, markDesktop: true }))}</SplitFormColumn>;
      visual = (
        <div className="flex size-full py-6 pr-6">
          <AuthQuoteImagePanel variant="full-width" testimonials={testimonials ?? [henley, caitlyn]} rounded="rounded-[20px]" />
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
