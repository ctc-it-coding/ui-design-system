import type { ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button, type ButtonSize, type ButtonHierarchy } from '../../components/buttons/Button';
import { NavMenuItem, type NavMenuItemIcon } from './NavMenuItem';
import { NavMenuItemCard } from './NavMenuItemCard';
import type { MarketingHeaderNavType, NavLink, NavMenuCardData, NavMenuContent, NavMenuLinkData, NavMenuSection } from './types';

export const FULL_WIDTH_TYPES: readonly MarketingHeaderNavType[] = [
  '2-col-with-sidebar', '3-col-with-sidebar', '4-col-with-footer', '2-col-with-links', '4-col-slim-with-footer', 'blog-posts-with-footer', 'blog-posts-with-sidebar',
];
export const isFullWidthType = (t: MarketingHeaderNavType) => FULL_WIDTH_TYPES.includes(t);

/* ------------------------------------------------------------------ small shared pieces */

const PANEL = 'overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg';
/** White left / gray-50 right background so the sidebar color bleeds to the viewport edge. */
const SPLIT_BG = 'bg-[linear-gradient(90deg,var(--color-white)_50%,var(--color-gray-50)_50%)]';

function SectionTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cx('text-sm font-semibold text-brand-600', className)}>{children}</p>;
}

function ItemList({ items, iconStyle, className, mobile, hideDescription }: {
  items: NavMenuLinkData[]; iconStyle?: NavMenuItemIcon; className?: string; mobile?: boolean; hideDescription?: boolean;
}) {
  return (
    <ul className={cx('flex flex-col', className ?? 'gap-1')}>
      {items.map((it, i) => (
        <li key={i}>
          <NavMenuItem
            mobile={mobile}
            iconStyle={it.icon ? iconStyle : 'false'}
            icon={it.icon}
            title={it.title}
            description={hideDescription ? undefined : it.description}
            badge={it.badge}
            action={it.action}
            href={it.href}
          />
        </li>
      ))}
    </ul>
  );
}

function Section({ section, iconStyle, className, titleClassName }: { section: NavMenuSection; iconStyle?: NavMenuItemIcon; className?: string; titleClassName?: string }) {
  return (
    <div className={cx('flex min-w-0 flex-1 flex-col gap-3', className)}>
      {section.title != null && <SectionTitle className={titleClassName}>{section.title}</SectionTitle>}
      <ItemList items={section.items} iconStyle={iconStyle} />
    </div>
  );
}

function LinkButton({ link, size = 'lg', hierarchy = 'link-color', className }: { link: NavLink; size?: ButtonSize; hierarchy?: ButtonHierarchy; className?: string }) {
  return (
    <Button size={size} hierarchy={hierarchy} as={link.href ? 'a' : 'button'} href={link.href} onClick={link.onClick} iconLeading={link.icon} className={className}>
      {link.label}
    </Button>
  );
}

function LinksColumn({ links, className }: { links: NonNullable<NavMenuContent['links']>; className?: string }) {
  return (
    <div className={cx('flex flex-col gap-3', className)}>
      {links.title != null && <SectionTitle>{links.title}</SectionTitle>}
      <ul className="flex flex-col items-start gap-3">
        {links.items.map((l, i) => (
          <li key={i}><LinkButton link={l} hierarchy="link-gray" /></li>
        ))}
      </ul>
    </div>
  );
}

function Card({ card, stacked, mobile, className }: { card: NavMenuCardData; stacked: 'horizontal' | 'vertical'; mobile?: boolean; className?: string }) {
  return (
    <NavMenuItemCard
      type={card.type}
      stacked={stacked}
      title={card.title}
      description={card.description}
      href={card.href}
      imageSrc={card.imageSrc}
      actions={card.actions}
      mobile={mobile}
      className={className}
    />
  );
}

const allItems = (c: NavMenuContent) => (c.sections ?? []).flatMap((s) => s.items);

function FooterBar({ footer, className, center }: { footer: NonNullable<NavMenuContent['footer']>; className?: string; center?: boolean }) {
  const { text, primary = [], secondary = [] } = footer;
  return (
    <div className={cx('flex items-center', center || !secondary.length ? 'justify-center' : 'justify-between', className)}>
      {(text != null || primary.length > 0) && (
        <div className="flex items-center gap-2">
          {text != null && <span className="text-md font-medium text-gray-600">{text}</span>}
          {primary.map((l, i) => <LinkButton key={i} link={l} />)}
        </div>
      )}
      {secondary.length > 0 && (
        <div className="flex items-center gap-6">
          {secondary.map((l, i) => <LinkButton key={i} link={l} />)}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ desktop: dropdown menus */

function DropdownSimple({ c, footer }: { c: NavMenuContent; footer?: boolean }) {
  return (
    <div className={cx(PANEL, 'w-[336px]')}>
      <div className="p-3"><ItemList items={allItems(c)} iconStyle="small" /></div>
      {footer && c.footer && <FooterBar footer={c.footer} center className="bg-gray-50 px-8 py-7" />}
    </div>
  );
}

function DropdownSimple2Col({ c }: { c: NavMenuContent }) {
  return (
    <div className={cx(PANEL, 'w-[640px] p-3')}>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1">
        {allItems(c).map((it, i) => (
          <li key={i}><NavMenuItem iconStyle="small" icon={it.icon} title={it.title} description={it.description} badge={it.badge} action={it.action} href={it.href} /></li>
        ))}
      </ul>
    </div>
  );
}

function DropdownSimple2ColFooter({ c }: { c: NavMenuContent }) {
  return (
    <div className={cx(PANEL, 'flex w-[640px] flex-col gap-6 px-5 pt-6 pb-5')}>
      <div className="flex gap-6">
        {(c.sections ?? []).map((s, i) => <Section key={i} section={s} iconStyle="featured" />)}
      </div>
      {c.footer && <FooterBar footer={c.footer} className="rounded-md bg-gray-50 px-8 py-7" />}
    </div>
  );
}

function DropdownFeaturedCard({ c }: { c: NavMenuContent }) {
  return (
    <div className={cx(PANEL, 'flex w-[640px]')}>
      <div className="flex-1 px-5 py-6"><ItemList items={allItems(c)} iconStyle="small" /></div>
      {c.cards?.[0] && (
        <div className="w-[304px] shrink-0 bg-gray-50 p-5">
          <Card card={c.cards[0]} stacked="vertical" />
        </div>
      )}
    </div>
  );
}

function Dropdown2ColLinksFooter({ c }: { c: NavMenuContent }) {
  return (
    <div className={cx(PANEL, 'w-[792px]')}>
      <div className="flex flex-col gap-8 p-8">
        {(c.heading != null || c.supportingText != null) && (
          <div className="flex flex-col gap-1">
            {c.heading != null && <p className="text-md font-semibold text-gray-900">{c.heading}</p>}
            {c.supportingText != null && <p className="text-sm text-gray-600">{c.supportingText}</p>}
          </div>
        )}
        <div className="flex gap-12">
          {c.links && <LinksColumn links={c.links} className="w-[166px] shrink-0" />}
          <div className="flex flex-1 gap-6">
            {(c.sections ?? []).map((s, i) => <Section key={i} section={s} iconStyle="small" />)}
          </div>
        </div>
      </div>
      {c.footer?.columns && (
        <div className="flex justify-between bg-gray-50 px-8 py-6">
          {c.footer.columns.map((col, i) => (
            <div key={i} className="flex flex-col items-start gap-6">
              {col.map((l, j) => <LinkButton key={j} link={l} />)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DropdownFeaturedPosts({ c }: { c: NavMenuContent }) {
  const s = c.sections?.[0];
  return (
    <div className={cx(PANEL, 'flex w-[768px]')}>
      <div className="flex w-[320px] shrink-0 flex-col gap-3 px-5 pt-8 pb-6">
        {s?.title != null && <SectionTitle className="px-3">{s.title}</SectionTitle>}
        <ItemList items={allItems(c)} iconStyle="small" />
      </div>
      <div className="flex flex-1 flex-col gap-4 bg-gray-50 px-5 py-8">
        <div className="flex flex-col gap-3">
          {c.cardsTitle != null && <SectionTitle className="px-3">{c.cardsTitle}</SectionTitle>}
          <div className="flex flex-col gap-1">
            {(c.cards ?? []).map((card, i) => <Card key={i} card={{ ...card, actions: [] }} stacked="horizontal" />)}
          </div>
        </div>
        {c.cardsAction && <div className="px-3"><LinkButton link={c.cardsAction} size="md" /></div>}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ desktop: full-width menus */

const FW = 'w-full bg-white shadow-lg';
const FW_CONTAINER = 'mx-auto flex w-full max-w-[1280px]';

function FullSidebar({ c, cols }: { c: NavMenuContent; cols: 2 | 3 }) {
  return (
    <div className={cx(FW, SPLIT_BG)}>
      <div className={FW_CONTAINER}>
        <div className="flex flex-1 gap-6 bg-white p-8">
          {(c.sections ?? []).map((s, i) => <Section key={i} section={s} iconStyle="small" />)}
        </div>
        {cols === 2 ? (
          <div className="flex w-[560px] shrink-0 flex-col gap-4 bg-gray-50 py-8 pr-8 pl-5">
            <div className="flex flex-col gap-3">
              {c.cardsTitle != null && <SectionTitle className="px-3">{c.cardsTitle}</SectionTitle>}
              <div className="flex flex-col gap-1">
                {(c.cards ?? []).map((card, i) => <Card key={i} card={card} stacked="horizontal" />)}
              </div>
            </div>
            {c.cardsAction && <div className="px-3"><LinkButton link={c.cardsAction} size="md" /></div>}
          </div>
        ) : (
          <div className="w-[316px] shrink-0 bg-gray-50 py-5 pr-8 pl-5">
            {c.cards?.[0] && <Card card={c.cards[0]} stacked="vertical" />}
          </div>
        )}
      </div>
    </div>
  );
}

function FullFooter({ c }: { c: NavMenuContent }) {
  if (!c.footer) return null;
  return (
    <div className="w-full bg-gray-50">
      <div className="mx-auto max-w-[1280px] px-8 py-7">
        <FooterBar footer={c.footer} />
      </div>
    </div>
  );
}

function Full4Col({ c }: { c: NavMenuContent }) {
  return (
    <div className={FW}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-4 gap-6 px-8 py-8">
        {(c.sections ?? []).map((s, i) => <Section key={i} section={s} iconStyle="featured" />)}
      </div>
      <FullFooter c={c} />
    </div>
  );
}

function Full2ColLinks({ c }: { c: NavMenuContent }) {
  return (
    <div className={cx(FW, SPLIT_BG)}>
      <div className={FW_CONTAINER}>
        <div className="flex flex-1 gap-6 bg-white p-8">
          {(c.sections ?? []).map((s, i) => <Section key={i} section={s} iconStyle="small" />)}
        </div>
        <div className="w-[230px] shrink-0 bg-gray-50 p-8">{c.links && <LinksColumn links={c.links} />}</div>
      </div>
    </div>
  );
}

function Full4ColSlim({ c }: { c: NavMenuContent }) {
  return (
    <div className={FW}>
      <ul className="mx-auto grid max-w-[1280px] grid-cols-4 gap-2 px-8 py-8">
        {allItems(c).map((it, i) => (
          <li key={i}><NavMenuItem iconStyle="featured" icon={it.icon} title={it.title} description={it.description} badge={it.badge} action={it.action} href={it.href} /></li>
        ))}
      </ul>
      <FullFooter c={c} />
    </div>
  );
}

function FullBlogFooter({ c }: { c: NavMenuContent }) {
  return (
    <div className={FW}>
      <div className="mx-auto grid max-w-[1280px] grid-cols-3 gap-2 px-8 pt-5 pb-8">
        {(c.cards ?? []).map((card, i) => <Card key={i} card={{ ...card, actions: [] }} stacked="horizontal" />)}
      </div>
      <FullFooter c={c} />
    </div>
  );
}

function FullBlogSidebar({ c }: { c: NavMenuContent }) {
  const s = c.sections?.[0];
  return (
    <div className={FW}>
      <div className="mx-auto flex max-w-[1280px] gap-8 px-8">
        {s && (
          <div className="flex w-[200px] shrink-0 flex-col gap-3 pt-8 pb-10">
            {s.title != null && <SectionTitle>{s.title}</SectionTitle>}
            <ItemList items={s.items} iconStyle="false" />
          </div>
        )}
        <div className="grid flex-1 grid-cols-2 content-start gap-2 pt-5 pb-8">
          {(c.cards ?? []).map((card, i) => <Card key={i} card={{ ...card, actions: [] }} stacked="horizontal" />)}
        </div>
      </div>
    </div>
  );
}

/** Desktop dropdown / mega-menu panel for a header `type`. */
export function DesktopMenu({ type, content }: { type: MarketingHeaderNavType; content: NavMenuContent }) {
  const c = content;
  switch (type) {
    case 'simple': return <DropdownSimple c={c} />;
    case 'simple-with-footer': return <DropdownSimple c={c} footer />;
    case 'simple-2-col': return <DropdownSimple2Col c={c} />;
    case 'simple-2-col-with-footer': return <DropdownSimple2ColFooter c={c} />;
    case 'featured-card': return <DropdownFeaturedCard c={c} />;
    case '2-col-with-links-and-footer': return <Dropdown2ColLinksFooter c={c} />;
    case 'featured-posts': return <DropdownFeaturedPosts c={c} />;
    case '2-col-with-sidebar': return <FullSidebar c={c} cols={2} />;
    case '3-col-with-sidebar': return <FullSidebar c={c} cols={3} />;
    case '4-col-with-footer': return <Full4Col c={c} />;
    case '2-col-with-links': return <Full2ColLinks c={c} />;
    case '4-col-slim-with-footer': return <Full4ColSlim c={c} />;
    case 'blog-posts-with-footer': return <FullBlogFooter c={c} />;
    case 'blog-posts-with-sidebar': return <FullBlogSidebar c={c} />;
  }
}

/* ------------------------------------------------------------------ mobile sub navigation */

/** Collapsible mobile sub-nav content ("Mobile subnav open=True"). */
export function MobileSubMenu({ content: c, framed, compact }: {
  content: NavMenuContent;
  /** Dropdown variant: content sits in a bordered card with 12px side margin. */
  framed?: boolean;
  /** Full-width variant: items show their title only. */
  compact?: boolean;
}) {
  const sections = c.sections ?? [];
  const footerLinks = c.footer ? [...(c.footer.primary ?? []), ...(c.footer.secondary ?? []), ...(c.footer.columns ?? []).flat()] : [];
  const body = (
    <>
      {(c.heading != null || c.supportingText != null) && (
        <div className="flex flex-col gap-1 px-4 pt-6">
          {c.heading != null && <p className="text-md font-semibold text-gray-900">{c.heading}</p>}
          {c.supportingText != null && <p className="text-sm text-gray-600">{c.supportingText}</p>}
        </div>
      )}
      {sections.length > 0 && (
        <div className={cx('flex flex-col gap-6', framed ? 'pt-3 pb-4' : 'pt-4 pb-6')}>
          {sections.map((s, i) => (
            <div key={i} className="flex flex-col gap-3">
              {s.title != null && <SectionTitle className="px-4">{s.title}</SectionTitle>}
              <ItemList items={s.items} iconStyle={s.items.some((x) => x.icon) ? 'small' : 'false'} mobile hideDescription={compact} className="gap-2" />
            </div>
          ))}
        </div>
      )}
      {c.links && <LinksColumn links={c.links} className="bg-gray-50 px-4 py-8" />}
      {c.cards && c.cards.length > 0 && (
        <div className={cx('flex flex-col gap-4 bg-gray-50', c.cardsTitle != null ? 'py-8' : 'py-5')}>
          {c.cardsTitle != null && <SectionTitle className="px-4">{c.cardsTitle}</SectionTitle>}
          <div className="flex flex-col gap-2">
            {c.cards.map((card, i) => <Card key={i} card={card} stacked="vertical" mobile />)}
          </div>
          {c.cardsAction && <div className="px-4"><LinkButton link={c.cardsAction} size="md" /></div>}
        </div>
      )}
      {(c.footer?.text != null || footerLinks.length > 0) && (
        <div className="flex flex-col items-start gap-6 bg-gray-50 px-4 py-7">
          {c.footer?.text != null && <span className="text-md font-medium text-gray-600">{c.footer.text}</span>}
          {footerLinks.map((l, i) => <LinkButton key={i} link={l} />)}
        </div>
      )}
    </>
  );
  if (framed) return <div className="px-3"><div className={cx(PANEL, 'rounded-xl')}>{body}</div></div>;
  return <div className="bg-white">{body}</div>;
}
