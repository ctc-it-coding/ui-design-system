import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MarketingSection, type MarketingTheme } from '../_shared';
import { Button } from '../../components/buttons/Button';
import { Input } from '../../components/inputs/Input';
import { Tabs, type TabItem } from '../../components/tabs';
import { SearchLg } from '../../icons';
import { EmailCapture } from '../hero/_parts';
import { headerSectionDefaults, headerSectionTabs, type HeaderSectionActions } from './defaults';

export type HeaderSectionAlignment = 'center' | 'left' | 'space-between';
/** Figma "Header section" → Color */
export type HeaderSectionColor = 'default' | 'gray-dark' | 'brand';

export interface HeaderSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'color'> {
  /** Figma: Alignment */
  alignment?: HeaderSectionAlignment;
  /** Figma: Actions (Buttons / False / Tabs / Email capture / Search bar) */
  actions?: HeaderSectionActions;
  /** Figma: Color */
  color?: HeaderSectionColor;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Buttons: primary + secondary labels. Email capture: submit label = primaryLabel. */
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  /** Tabs action items + state. */
  tabs?: TabItem[];
  tabValue?: string;
  defaultTabValue?: string;
  onTabChange?: (id: string) => void;
  /** Email capture / search placeholder. */
  placeholder?: string;
  emailHint?: ReactNode;
  onEmailSubmit?: (email: string) => void;
  onSearch?: (query: string) => void;
  /** Replaces the default action element. */
  action?: ReactNode;
  /** Heading level (default h1). */
  as?: 'h1' | 'h2';
}

const colors: Record<HeaderSectionColor, { theme: MarketingTheme; bg: string; sub: string; heading: string; text: string; tone: 'light' | 'gray-dark' | 'brand-dark'; tabs: string }> = {
  default: { theme: 'default', bg: 'bg-white', sub: 'text-brand-700', heading: 'text-gray-900', text: 'text-gray-600', tone: 'light', tabs: '' },
  'gray-dark': {
    theme: 'gray-dark', bg: 'bg-gray-950', sub: 'text-gray-200', heading: 'text-white', text: 'text-gray-200', tone: 'gray-dark',
    tabs: 'bg-transparent border-gray-200 [&_[aria-selected=false]]:text-gray-200 [&_[aria-selected=false]:hover]:text-gray-900',
  },
  brand: {
    theme: 'brand', bg: 'bg-brand-800', sub: 'text-brand-200', heading: 'text-white', text: 'text-brand-200', tone: 'brand-dark',
    tabs: 'bg-transparent border-brand-100 [&_[aria-selected=false]]:text-brand-100 [&_[aria-selected=false]:hover]:text-gray-900',
  },
};

/**
 * HeaderSection — Figma "Header section": subheading, page heading, supporting text and an optional action
 * (buttons, billing tabs, email capture or search bar), centered, left aligned or split ("space between").
 */
export const HeaderSection = forwardRef<HTMLElement, HeaderSectionProps>(function HeaderSection(
  {
    alignment = 'center',
    actions = 'buttons',
    color = 'default',
    subheading,
    title,
    supportingText,
    primaryLabel,
    secondaryLabel = 'Chat to sales',
    onPrimaryClick,
    onSecondaryClick,
    tabs = headerSectionTabs,
    tabValue,
    defaultTabValue,
    onTabChange,
    placeholder,
    emailHint,
    onEmailSubmit,
    onSearch,
    action,
    as: H = 'h1',
    className,
    ...props
  },
  ref,
) {
  const c = colors[color];
  const d = headerSectionDefaults[actions];
  const center = alignment === 'center';
  const split = alignment === 'space-between';
  // Figma quirk: left / space-between "False" variants use the "Pricing" subheading.
  const sub = subheading ?? (actions === 'false' && !center ? 'Pricing' : d.subheading);

  const actionEl =
    action ??
    (actions === 'buttons' ? (
      <div className="flex w-full flex-col-reverse gap-3 sm:w-auto sm:flex-row">
        <Button size="xl" hierarchy="secondary-gray" className="w-full sm:w-auto" onClick={onSecondaryClick}>
          {secondaryLabel}
        </Button>
        <Button size="xl" className="w-full sm:w-auto" onClick={onPrimaryClick}>
          {primaryLabel ?? 'Get started'}
        </Button>
      </div>
    ) : actions === 'tabs' ? (
      <Tabs
        type="button-white-border"
        size="md"
        items={tabs}
        value={tabValue}
        defaultValue={defaultTabValue ?? tabs[0]?.id}
        onChange={onTabChange}
        aria-label="Billing period"
        className="w-full sm:w-auto"
        listClassName={cx('max-sm:w-full max-sm:[&>*]:flex-1', c.tabs)}
      />
    ) : actions === 'email-capture' ? (
      <EmailCapture placeholder={placeholder} hint={emailHint} buttonLabel={primaryLabel ?? 'Get started'} tone={c.tone} onSubmit={onEmailSubmit} />
    ) : actions === 'search-bar' ? (
      <form
        role="search"
        className="w-full md:w-80"
        onSubmit={(e) => {
          e.preventDefault();
          const q = new FormData(e.currentTarget).get('q');
          onSearch?.(typeof q === 'string' ? q : '');
        }}
      >
        <Input name="q" type="search" aria-label="Search" placeholder={placeholder ?? 'Search'} iconLeading={SearchLg} />
      </form>
    ) : null);

  const subEl = sub != null && sub !== '' && <p className={cx('text-sm font-semibold md:text-md', c.sub)}>{sub}</p>;
  const titleEl = <H className={cx('text-display-md font-semibold md:text-display-lg', c.heading)}>{title ?? d.title}</H>;
  const textEl = <p className={cx('text-lg md:text-xl', c.text)}>{supportingText ?? d.supportingText}</p>;

  return (
    <MarketingSection ref={ref} theme={c.theme} spacing="md" className={cx(c.bg, className)} {...props}>
      <div className="mx-auto w-full max-w-[1280px] px-4 md:px-8">
        {split ? (
          <div className="flex flex-col gap-3">
            {subEl}
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
              <div className={cx('flex flex-col lg:flex-1', actions === 'email-capture' || actions === 'search-bar' ? 'gap-8 max-lg:contents' : 'gap-8 max-lg:contents md:gap-12')}>
                {titleEl}
                {actionEl && <div className="max-lg:order-last max-lg:mt-4">{actionEl}</div>}
              </div>
              <div className="lg:w-[480px] lg:shrink-0 lg:py-3">{textEl}</div>
            </div>
          </div>
        ) : (
          <div className={cx('flex flex-col gap-8 md:gap-12', center && 'items-center text-center')}>
            <div className={cx('flex max-w-[768px] flex-col gap-4 md:gap-6', center && 'items-center')}>
              <div className="flex flex-col gap-3">
                {subEl}
                {titleEl}
              </div>
              {textEl}
            </div>
            {actionEl}
          </div>
        )}
      </div>
    </MarketingSection>
  );
});
