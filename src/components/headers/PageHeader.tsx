import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { ArrowLeft } from '../../icons';
import { Button } from '../buttons/Button';
import { Avatar } from '../avatars/Avatar';
import { AvatarProfilePhoto } from '../avatars/AvatarProfilePhoto';

export type PageHeaderStyle =
  | 'simple'
  | 'avatar'
  | 'banner-simple'
  | 'banner-simple-centered'
  | 'banner-avatar'
  | 'banner-avatar-centered';

export interface PageHeaderBack {
  label?: ReactNode;
  href?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
}

export interface PageHeaderProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Style */
  variant?: PageHeaderStyle;
  /** Heading, e.g. "Team members". */
  title: ReactNode;
  supportingText?: ReactNode;
  /** Breadcrumbs slot (e.g. `<Breadcrumbs type="button-gray" … />`), shown from `md`. */
  breadcrumbs?: ReactNode;
  /** Figma Breakpoint=Mobile "Back" link shown instead of breadcrumbs below `md`. */
  back?: PageHeaderBack;
  /** Action buttons slot. */
  actions?: ReactNode;
  /** Search input slot (320px on desktop, full width on mobile). */
  search?: ReactNode;
  /** Tabs slot rendered under the heading. */
  tabs?: ReactNode;
  /** Avatar styles: image src / initials. */
  avatarSrc?: string;
  avatarInitials?: string;
  /** Banner styles: image src or custom node. Defaults to a brand gradient. */
  banner?: string | ReactNode;
  /** Bottom divider (Figma Divider). Defaults to true unless `tabs` is set. */
  divider?: boolean;
  /** Heading level element (default h1). */
  headingAs?: 'h1' | 'h2' | 'h3';
}

/** PageHeader — Figma "Page header" (Simple, Avatar, Banner simple / avatar, centered variants). */
export const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(function PageHeader(
  {
    variant = 'simple',
    title,
    supportingText,
    breadcrumbs,
    back,
    actions,
    search,
    tabs,
    avatarSrc,
    avatarInitials,
    banner,
    divider,
    headingAs: H = 'h1',
    className,
    ...props
  },
  ref,
) {
  const centered = variant.endsWith('centered');
  const isBanner = variant.startsWith('banner');
  const showDivider = divider ?? !tabs;

  const nav = (
    <>
      {breadcrumbs != null && <div className={cx(back && 'max-md:hidden', centered && 'flex justify-center')}>{breadcrumbs}</div>}
      {back && (
        <div className={cx(breadcrumbs != null && 'md:hidden')}>
          <Button hierarchy="link-gray" size="md" iconLeading={ArrowLeft} as={back.href ? 'a' : 'button'} href={back.href} onClick={back.onClick}>
            {back.label ?? 'Back'}
          </Button>
        </div>
      )}
    </>
  );

  const text = (
    <div className={cx('flex min-w-0 flex-col gap-1', centered && 'items-center text-center')}>
      <H className="text-display-xs font-medium text-gray-900 md:text-display-sm">{title}</H>
      {supportingText != null && <p className="text-md text-gray-600">{supportingText}</p>}
    </div>
  );

  const actionsEl = actions != null && <div className={cx('flex flex-wrap items-center gap-3', centered && 'justify-center')}>{actions}</div>;
  const searchEl = search != null && <div className={cx('w-full md:w-80 md:shrink-0', centered && 'md:mx-auto')}>{search}</div>;

  const bannerEl = isBanner && (
    <div className="h-40 w-full overflow-hidden md:h-60">
      {typeof banner === 'string' ? (
        <img src={banner} alt="" className="size-full object-cover" />
      ) : (
        banner ?? <div className="size-full bg-linear-to-br from-brand-200 via-brand-100 to-pink-100" />
      )}
    </div>
  );

  const dividerEl = showDivider && <div className="h-px w-full bg-gray-200" />;

  /* Heading row for left-aligned styles: text (+avatar) | actions | search */
  const headingRow = (withAvatar: boolean) => (
    <div className="flex flex-col gap-4 md:flex-row md:items-start">
      <div className={cx('flex min-w-0 flex-1 gap-4 md:gap-5', withAvatar && 'items-center')}>
        {withAvatar && (
          <Avatar size="2xl" src={avatarSrc} initials={avatarInitials} alt="" className="max-md:size-14" />
        )}
        <div className="min-w-0 flex-1">{text}</div>
      </div>
      {actionsEl}
      {searchEl}
    </div>
  );

  let body: ReactNode;
  if (variant === 'simple' || variant === 'avatar') {
    body = (
      <div className="flex flex-col gap-5">
        {nav}
        {headingRow(variant === 'avatar')}
        {tabs}
        {dividerEl}
      </div>
    );
  } else if (variant === 'banner-simple' || variant === 'banner-simple-centered') {
    body = (
      <div className="flex flex-col">
        {bannerEl}
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-4 px-4 pt-5 md:gap-6 md:px-8 md:pt-0">
          <div className={cx('flex flex-col gap-5', centered ? 'items-center md:py-8' : 'md:py-6')}>
            {nav}
            {centered ? (
              <div className="flex w-full flex-col items-center gap-5">
                {text}
                {actionsEl}
                {searchEl}
              </div>
            ) : (
              headingRow(false)
            )}
          </div>
          {tabs}
          {dividerEl}
        </div>
      </div>
    );
  } else if (variant === 'banner-avatar') {
    body = (
      <div className="flex flex-col">
        {bannerEl}
        <div className="mx-auto -mt-12 flex w-full max-w-[1280px] flex-col gap-4 px-4 md:-mt-10 md:gap-6 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row">
            <AvatarProfilePhoto size="lg" src={avatarSrc} initials={avatarInitials} alt="" className="max-md:size-24" />
            <div className="flex min-w-0 flex-1 flex-col gap-5 md:pt-16">
              {nav}
              {headingRow(false)}
            </div>
          </div>
          {tabs}
          {dividerEl}
        </div>
      </div>
    );
  } else {
    body = (
      <div className="flex flex-col">
        {bannerEl}
        <div className="relative mx-auto -mt-12 flex w-full max-w-[1280px] flex-col items-center gap-6 px-4 md:-mt-16 md:px-8">
          {breadcrumbs != null && <div className={cx('w-full md:absolute md:top-22 md:left-8 md:w-auto', back && 'max-md:hidden')}>{breadcrumbs}</div>}
          <AvatarProfilePhoto size="lg" src={avatarSrc} initials={avatarInitials} alt="" className="max-md:size-24" />
          {back && <div className={cx('w-full', breadcrumbs != null && 'md:hidden')}>{nav}</div>}
          <div className="flex w-full flex-col items-center gap-5">
            {text}
            {actionsEl}
            {searchEl}
          </div>
          {tabs != null && <div className="w-full">{tabs}</div>}
          {dividerEl}
        </div>
      </div>
    );
  }

  return (
    <div ref={ref} className={cx('w-full', className)} {...props}>
      {body}
    </div>
  );
});
