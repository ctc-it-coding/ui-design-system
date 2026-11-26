import { forwardRef, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MarketingSection, Container, ImagePlaceholder } from '../_shared';
import { ContactText, type ContactTextType } from './ContactText';
import { ContactForm, type ContactFormProps } from './ContactForm';
import { ContactMapMockup, ContactVectorMap, type VectorMapLocation } from './Maps';
import { KitHeading } from './_kit';
import { contactCards, contactMethods, contactPageHeaderCopy, contactServices, retailLocations, supportContacts, type ContactItem } from './defaults';

export type ContactPageHeaderType =
  | 'form-and-image-01'
  | 'form-and-image-02'
  | 'form-and-map'
  | 'simple-form'
  | 'simple-links-01'
  | 'simple-links-02'
  | 'map-01'
  | 'map-02';

export interface ContactPageHeaderProps {
  /** Figma: Type */
  type?: ContactPageHeaderType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Contact methods ("_Contact text" items). */
  items?: ContactItem[];
  /** Photo for the image types. */
  imageSrc?: string;
  /** Real map image / custom map element. */
  mapSrc?: string;
  map?: ReactNode;
  /** Vector map markers (Map 02). */
  mapLocations?: VectorMapLocation[];
  /** Props forwarded to the form. */
  formProps?: Partial<ContactFormProps>;
  id?: string;
  className?: string;
}

function Items({ items, type, className }: { items: ContactItem[]; type: ContactTextType; className?: string }) {
  return (
    <div className={className}>
      {items.map((it, i) => (
        <ContactText key={i} type={type} icon={it.icon} title={it.title} supportingText={it.supportingText ?? null} link={it.link ?? null} href={it.href} />
      ))}
    </div>
  );
}

/** ContactPageHeader — Figma "Contact page header" (8 types): page heading + form / links / map. */
export const ContactPageHeader = forwardRef<HTMLElement, ContactPageHeaderProps>(function ContactPageHeader(props, ref) {
  const { type = 'simple-form', id, className, formProps } = props;
  const copy = contactPageHeaderCopy[type] ?? {};
  const h = {
    subheading: props.subheading !== undefined ? props.subheading : copy.subheading,
    title: props.title !== undefined ? props.title : copy.title,
    supportingText: props.supportingText !== undefined ? props.supportingText : copy.supportingText,
  };

  if (type === 'form-and-image-01') {
    return (
      <MarketingSection ref={ref} as="header" id={id} spacing="none" className={cx('pt-12 pb-16 md:pt-16 md:pb-24', className)}>
        <Container className="flex items-center gap-16">
          <div className="flex flex-1 justify-center">
            <div className="flex w-full max-w-[480px] flex-col gap-12">
              <KitHeading {...h} as="h1" />
              <ContactForm {...formProps} />
            </div>
          </div>
          <ImagePlaceholder src={props.imageSrc} tone="gray" className="hidden min-h-[800px] flex-1 self-stretch lg:block" />
        </Container>
      </MarketingSection>
    );
  }

  if (type === 'form-and-image-02' || type === 'form-and-map') {
    const isMap = type === 'form-and-map';
    return (
      <MarketingSection ref={ref} as="header" id={id} spacing="none" className={className}>
        <div className="flex">
          {!isMap && <ImagePlaceholder src={props.imageSrc} tone="gray" className="hidden flex-1 lg:block" />}
          <div className="flex flex-1 justify-center px-4 py-16 md:px-8 md:py-24">
            <div className={cx('flex w-full flex-col gap-12', isMap ? 'max-w-[480px]' : 'max-w-[512px]')}>
              <KitHeading {...h} as="h1" size={isMap ? 'lg' : 'md'} />
              <ContactForm {...(isMap ? {} : { services: contactServices, privacy: false as const, submitLabel: 'Get started' })} {...formProps} />
            </div>
          </div>
          {isMap && <ContactMapMockup src={props.mapSrc} className="hidden flex-1 lg:block">{props.map}</ContactMapMockup>}
        </div>
      </MarketingSection>
    );
  }

  const leftHeader = type === 'simple-links-02';
  return (
    <MarketingSection ref={ref} as="header" id={id} spacing="none" className={cx('pb-16 md:pb-24', className)}>
      <Container className="py-16 md:py-24">
        <KitHeading {...h} as="h1" size="lg" align={leftHeader ? 'left' : 'center'} />
      </Container>
      <Container>
        {type === 'simple-form' && <ContactForm className="mx-auto max-w-[480px]" {...formProps} />}
        {type === 'simple-links-01' && (
          <Items items={props.items ?? contactMethods} type="featured-icon-top-centered" className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8" />
        )}
        {type === 'simple-links-02' && (
          <Items items={props.items ?? contactCards} type="featured-icon-card" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" />
        )}
        {type === 'map-01' && (
          <div className="flex flex-col gap-12 md:gap-16">
            <ContactMapMockup src={props.mapSrc} className="h-60 w-full md:h-[400px]">{props.map}</ContactMapMockup>
            <Items items={props.items ?? retailLocations} type="icon-top-centered" className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8" />
          </div>
        )}
        {type === 'map-02' && (
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="flex justify-center">
              <ContactVectorMap locations={props.mapLocations} />
            </div>
            <Items items={props.items ?? supportContacts} type="text-only-center-aligned" className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8" />
          </div>
        )}
      </Container>
    </MarketingSection>
  );
});
