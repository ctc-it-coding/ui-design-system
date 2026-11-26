import { forwardRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Avatar } from '../../components/avatars/Avatar';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { HelpCircle } from '../../icons';
import { MarketingSection, Container, ImagePlaceholder } from '../_shared';
import { KitHeading, sectionStack, useKit } from '../contact/_kit';
import { FaqItem } from './FaqItem';
import { faqAccordion, faqCta, faqs, faqSectionCopy, type FaqData } from './defaults';

export type FAQSectionType = 'simple-01' | 'simple-02' | 'simple-03' | 'simple-04' | 'accordion-01' | 'accordion-02' | 'accordion-03' | 'accordion-04';
export type FAQSectionTheme = 'default' | 'gray-dark' | 'brand';

export interface FAQSectionProps {
  /** Figma: Type */
  type?: FAQSectionType;
  /** Figma: Theme */
  theme?: FAQSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Questions; defaults to the Figma copy. */
  items?: FaqData[];
  /** Accordion: allow several items open at once (default: one at a time). */
  multiple?: boolean;
  /** Accordion: index opened initially (default 0, `-1` = none). */
  defaultOpen?: number;
  /** "Still have questions?" box; `null` hides it. */
  cta?: { title?: ReactNode; supportingText?: ReactNode; action?: ReactNode; href?: string; avatars?: { src?: string; initials?: string }[] } | null;
  /** Photo for Simple 03. */
  imageSrc?: string;
  id?: string;
  className?: string;
}

/** FAQ variant of "_Feature text": featured icon + question + answer. */
function FaqFeature({ item, layout }: { item: FaqData; layout: 'top-centered' | 'top-left' | 'left' }) {
  const { k, theme } = useKit();
  const icon = (
    <FeaturedIcon
      icon={item.icon ?? HelpCircle}
      size="lg"
      theme={k.dark ? 'dark-outline' : 'light-outline'}
      color={theme === 'gray-dark' ? 'gray' : 'brand'}
    />
  );
  const text = (
    <div className={cx('flex flex-col gap-1 md:gap-2', layout === 'top-centered' && 'items-center text-center', layout === 'left' && 'pt-2 md:pt-2.5')}>
      <h3 className={cx('text-lg font-medium md:text-xl', k.heading)}>{item.question}</h3>
      <p className={cx('text-md', k.text)}>{item.answer}</p>
    </div>
  );
  if (layout === 'left')
    return (
      <div className="flex gap-4">
        {icon}
        {text}
      </div>
    );
  return (
    <div className={cx('flex flex-col gap-4 md:gap-5', layout === 'top-centered' && 'items-center')}>
      {icon}
      {text}
    </div>
  );
}

function Cta({ cta, layout }: { cta: NonNullable<FAQSectionProps['cta']>; layout: 'center' | 'row' }) {
  const { k, theme } = useKit();
  const box = theme === 'gray-dark' ? 'border border-gray-600 bg-gray-950' : theme === 'brand' ? 'bg-brand-700' : 'bg-gray-50';
  const avatars = cta.avatars ?? [{ initials: 'AL' }, { initials: 'OR' }, { initials: 'NG' }];
  const button = (
    <Button as="a" href={cta.href ?? '#'} size="xl" hierarchy={theme === 'gray-dark' ? 'secondary-gray' : 'primary'} className="w-full sm:w-auto">
      {cta.action ?? faqCta.action}
    </Button>
  );
  const text = (
    <div className={cx('flex flex-col gap-2', layout === 'center' && 'items-center text-center')}>
      <h3 className={cx('text-lg font-medium md:text-xl', k.heading)}>{cta.title ?? faqCta.title}</h3>
      <p className={cx('text-md md:text-lg', k.text)}>{cta.supportingText ?? faqCta.supportingText}</p>
    </div>
  );
  if (layout === 'row')
    return (
      <div className={cx('flex flex-col gap-6 rounded-2xl px-5 py-8 md:flex-row md:items-center md:justify-between md:gap-8 md:p-8', box)}>
        {text}
        {button}
      </div>
    );
  return (
    <div className={cx('flex flex-col items-center gap-6 rounded-2xl px-5 py-8 md:gap-8 md:px-8 md:pt-8 md:pb-10', box)}>
      <div className="flex items-end" aria-hidden>
        {avatars.slice(0, 3).map((a, i) => (
          <Avatar
            key={i}
            size={i === 1 ? 'xl' : 'lg'}
            src={a.src}
            initials={a.initials}
            className={cx('ring-[1.5px] ring-white', i === 1 ? 'z-10 -mx-4' : 'z-0')}
          />
        ))}
      </div>
      {text}
      {button}
    </div>
  );
}

function Accordion({ items, multiple, defaultOpen, variant, iconPosition }: { items: FaqData[]; multiple?: boolean; defaultOpen: number; variant: 'divider' | 'plain' | 'card'; iconPosition: 'left' | 'right' }) {
  const [open, setOpen] = useState<number[]>(defaultOpen >= 0 ? [defaultOpen] : []);
  const { k } = useKit();
  const set = (i: number, v: boolean) => setOpen((o) => (v ? (multiple ? [...o, i] : [i]) : o.filter((x) => x !== i)));
  return (
    <div className={cx('flex flex-col', variant === 'card' ? 'gap-2 md:gap-4' : 'gap-6 md:gap-8')}>
      {items.map((it, i) => {
        const isOpen = open.includes(i);
        const item = (
          <FaqItem
            key={i}
            question={it.question}
            answer={it.answer}
            expanded={isOpen}
            onExpandedChange={(v) => set(i, v)}
            divider={variant === 'divider' && i > 0}
            iconPosition={iconPosition}
          />
        );
        return variant === 'card' ? (
          <div key={i} className={cx('rounded-2xl p-5 transition-colors md:p-8', isOpen && k.card)}>
            {item}
          </div>
        ) : (
          item
        );
      })}
    </div>
  );
}

/** FAQSection — Figma "FAQ section" (8 types × Default / Gray dark / Brand): icon grids and accessible accordions. */
export const FAQSection = forwardRef<HTMLElement, FAQSectionProps>(function FAQSection(props, ref) {
  const { type = 'accordion-01', theme = 'default', multiple, defaultOpen = 0, id, className } = props;
  const copy = faqSectionCopy[type] ?? {};
  const h = {
    subheading: props.subheading !== undefined ? props.subheading : copy.subheading,
    title: props.title !== undefined ? props.title : copy.title,
    supportingText: props.supportingText !== undefined ? props.supportingText : copy.supportingText,
  };
  const items = props.items ?? (type.startsWith('accordion') ? faqAccordion : faqs);
  const cta = props.cta === undefined ? {} : props.cta;

  let body: ReactNode;
  switch (type) {
    case 'simple-01':
    case 'simple-02':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} align={type === 'simple-01' ? 'center' : 'left'} />
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:grid-cols-3">
            {items.map((it, i) => <FaqFeature key={i} item={it} layout={type === 'simple-01' ? 'top-centered' : 'top-left'} />)}
          </div>
          {cta && <Cta cta={cta} layout={type === 'simple-01' ? 'center' : 'row'} />}
        </Container>
      );
      break;
    case 'simple-03':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="flex flex-col gap-10 md:gap-12 lg:flex-1">
              {items.slice(0, props.items ? undefined : 4).map((it, i) => <FaqFeature key={i} item={it} layout="left" />)}
            </div>
            <ImagePlaceholder src={props.imageSrc} tone="gray" className="h-60 w-full md:h-[560px] lg:w-[592px] lg:shrink-0" />
          </div>
        </Container>
      );
      break;
    case 'simple-04':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-y-16 lg:grid-cols-3">
            {items.map((it, i) => <FaqItem key={i} static question={it.question} answer={it.answer} />)}
          </div>
          {cta && <Cta cta={cta} layout="row" />}
        </Container>
      );
      break;
    case 'accordion-01':
    case 'accordion-02':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" />
          <div className="mx-auto w-full max-w-3xl">
            <Accordion
              items={items}
              multiple={multiple}
              defaultOpen={defaultOpen}
              variant={type === 'accordion-01' ? 'divider' : 'card'}
              iconPosition={type === 'accordion-01' ? 'right' : 'left'}
            />
          </div>
          {type === 'accordion-01' && cta && <Cta cta={cta} layout="center" />}
        </Container>
      );
      break;
    case 'accordion-03':
    case 'accordion-04':
      body = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <KitHeading {...h} className="lg:flex-1" />
          <div className="lg:flex-1">
            <Accordion items={items} multiple={multiple} defaultOpen={defaultOpen} variant={type === 'accordion-03' ? 'plain' : 'card'} iconPosition="right" />
          </div>
        </Container>
      );
      break;
  }

  return (
    <MarketingSection ref={ref} id={id} theme={theme} className={className}>
      {body}
    </MarketingSection>
  );
});

