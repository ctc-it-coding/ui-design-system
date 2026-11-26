import { forwardRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MarketingSection, Container, ImagePlaceholder, MarketingThemeProvider } from '../_shared';
import { SocialIcon, type SocialPlatform } from '../../components/misc-icons/SocialIcon';
import { ContactText, type ContactTextType } from './ContactText';
import { ContactForm, type ContactFormProps } from './ContactForm';
import { ContactMapMockup, ContactVectorMap, type VectorMapLocation } from './Maps';
import { KitHeading, sectionStack, useKit } from './_kit';
import {
  contactCards,
  contactCards3,
  contactMethods,
  contactMethodsWithChat,
  contactSectionCopy,
  contactServices,
  officeLocations,
  sidePanelContacts,
  simpleForm05Panel,
  storeLocations,
  supportContacts,
  tabLocations,
  type ContactItem,
  type ContactLocation,
} from './defaults';

export type ContactSectionType =
  | 'simple-icons-01'
  | 'simple-icons-02'
  | 'simple-icons-03'
  | 'simple-icons-04'
  | 'simple-form-01'
  | 'simple-form-02'
  | 'simple-form-03'
  | 'simple-form-04'
  | 'simple-form-05'
  | 'icon-cards-01'
  | 'icon-cards-02'
  | 'icon-cards-03'
  | 'icons-and-form'
  | 'icons-and-map-01'
  | 'icons-and-map-02'
  | 'icons-and-image'
  | 'tabs-map-01'
  | 'tabs-map-02'
  | 'center-map'
  | 'vector-map-03';

/** Figma "Theme" of Contact sections (Simple icons 01–04 have all three, Icons and … have Default + Brand). */
export type ContactSectionTheme = 'default' | 'gray-dark' | 'brand';

export interface ContactSectionProps {
  /** Figma: Type */
  type?: ContactSectionType;
  /** Figma: Theme */
  theme?: ContactSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Contact methods / locations ("_Contact text" items). Defaults per type. */
  items?: ContactItem[];
  /** Tabs-map locations ("_Feature tab"). */
  locations?: ContactLocation[];
  /** Markers of the vector map. */
  mapLocations?: VectorMapLocation[];
  /** Real map image for the "Google maps" mockup. */
  mapSrc?: string;
  /** Custom map element (e.g. an iframe) — replaces the mockup. */
  map?: ReactNode;
  /** Photo for image types. */
  imageSrc?: string;
  /** Props forwarded to the form (phone, services, submitLabel, onSubmit…). */
  formProps?: Partial<ContactFormProps>;
  /** Social links of Simple form 04/05. */
  socials?: { platform: SocialPlatform; href?: string }[];
  id?: string;
  className?: string;
}

const defaultSocials: { platform: SocialPlatform; href?: string }[] = [
  { platform: 'facebook', href: '#' },
  { platform: 'x', href: '#' },
  { platform: 'linkedin', href: '#' },
  { platform: 'youtube', href: '#' },
  { platform: 'dribbble', href: '#' },
];

function Items({ items, type, className }: { items: ContactItem[]; type: ContactTextType; className?: string }) {
  return (
    <div className={className}>
      {items.map((it, i) => (
        <ContactText key={i} type={type} icon={it.icon} title={it.title} supportingText={it.supportingText ?? null} link={it.link ?? null} href={it.href} />
      ))}
    </div>
  );
}

function MapBlock({ map, mapSrc, className }: { map?: ReactNode; mapSrc?: string; className?: string }) {
  return <ContactMapMockup src={mapSrc} className={className}>{map}</ContactMapMockup>;
}

/* ---------------- feature tabs (Tabs map 01 / 02) ---------------- */

function LocationTabs({ locations, orientation }: { locations: ContactLocation[]; orientation: 'vertical' | 'horizontal' }) {
  const [current, setCurrent] = useState(0);
  const { k } = useKit();
  const vertical = orientation === 'vertical';
  return (
    <div role="tablist" aria-label="Locations" className={cx('flex flex-col', vertical ? 'gap-10 md:flex-row md:gap-0' : '')}>
      {locations.map((l, i) => {
        const on = i === current;
        return (
          <div
            key={i}
            role="tab"
            tabIndex={on ? 0 : -1}
            aria-selected={on}
            onClick={() => setCurrent(i)}
            onKeyDown={(e) => {
              const next = e.key === 'ArrowRight' || e.key === 'ArrowDown' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowUp' ? -1 : 0;
              if (next) {
                e.preventDefault();
                const n = (i + next + locations.length) % locations.length;
                setCurrent(n);
                ((e.currentTarget.parentElement?.children[n] as HTMLElement | undefined) ?? null)?.focus();
              }
            }}
            className={cx(
              'flex cursor-pointer flex-col gap-4 outline-none transition-colors focus-visible:ring-4 focus-visible:ring-brand-500/24 md:gap-5',
              vertical ? 'flex-1 items-center border-t-4 py-6 text-center md:px-4' : 'border-l-4 px-6 py-4',
              on ? 'border-brand-600' : 'border-gray-100 hover:border-gray-200',
            )}
          >
            <div className={cx('flex flex-col gap-2', vertical && 'items-center')}>
              <h3 className={cx('text-lg font-medium md:text-xl', k.heading)}>{l.title}</h3>
              <p className={cx('text-md', k.text)}>{l.address}</p>
            </div>
            {!vertical && l.link && (
              <a href={l.href ?? '#'} className="self-start text-md font-semibold text-brand-700 hover:text-brand-800" onClick={(e) => e.stopPropagation()}>
                {l.link}
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}

function Socials({ socials, variant }: { socials: { platform: SocialPlatform; href?: string }[]; variant: 'white' | 'gray' }) {
  return (
    <div className="flex items-center gap-8">
      {socials.map((s) => (
        <a key={s.platform} href={s.href ?? '#'} className="rounded-sm outline-none focus-visible:ring-4 focus-visible:ring-brand-500/24">
          <SocialIcon platform={s.platform} variant={variant} />
        </a>
      ))}
    </div>
  );
}

/**
 * ContactSection — Figma "Contact sections" (20 types × Default / Gray dark / Brand).
 * `<ContactSection type="simple-form-05" />` renders the Figma placeholder copy.
 */
export const ContactSection = forwardRef<HTMLElement, ContactSectionProps>(function ContactSection(props, ref) {
  const { type = 'simple-icons-01', theme = 'default', id, className } = props;
  const copy = contactSectionCopy[type] ?? {};
  const heading = {
    subheading: props.subheading !== undefined ? props.subheading : copy.subheading,
    title: props.title !== undefined ? props.title : copy.title,
    supportingText: props.supportingText !== undefined ? props.supportingText : copy.supportingText,
  };
  const p = { ...props, type, theme, heading };

  // Split layouts manage their own vertical padding / backgrounds.
  const split = type === 'simple-form-03' || type === 'simple-form-04' || type === 'simple-form-05' || type === 'icons-and-image' || type === 'icons-and-map-02';
  const sectionTheme = type === 'icons-and-image' || type === 'icons-and-map-02' ? 'default' : theme;

  return (
    <MarketingSection ref={ref} id={id} theme={sectionTheme} spacing={split ? 'none' : 'md'} className={className}>
      {renderType(p)}
    </MarketingSection>
  );
});

type P = ContactSectionProps & { type: ContactSectionType; theme: ContactSectionTheme; heading: { subheading?: ReactNode; title?: ReactNode; supportingText?: ReactNode } };

function renderType(p: P): ReactNode {
  const { heading: h, formProps } = p;
  switch (p.type) {
    case 'simple-icons-01':
    case 'simple-icons-02':
    case 'simple-icons-03': {
      const centered = p.type !== 'simple-icons-03';
      return (
        <Container className={sectionStack}>
          {p.type !== 'simple-icons-01' && <KitHeading {...h} align={centered ? 'center' : 'left'} />}
          <Items
            items={p.items ?? contactMethods}
            type={centered ? 'featured-icon-top-centered' : 'featured-icon-top-left'}
            className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8"
          />
        </Container>
      );
    }
    case 'simple-icons-04':
      return (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <KitHeading {...h} className="lg:flex-1" />
          <Items items={p.items ?? storeLocations} type="text-only-left-aligned" className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-x-16 sm:gap-y-8 lg:w-[792px] lg:shrink-0" />
        </Container>
      );
    case 'simple-form-01':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" />
          <ContactForm className="mx-auto max-w-[480px]" {...formProps} />
        </Container>
      );
    case 'simple-form-02':
      return (
        <Container className="flex items-center gap-16">
          <ImagePlaceholder src={p.imageSrc} tone="gray" className="hidden min-h-[768px] flex-1 self-stretch lg:block" />
          <div className="flex flex-1 justify-center">
            <div className="flex w-full max-w-[480px] flex-col gap-12">
              <KitHeading {...h} />
              <ContactForm {...formProps} />
            </div>
          </div>
        </Container>
      );
    case 'simple-form-03':
      return (
        <div className="flex">
          <div className="flex flex-1 justify-center px-4 py-16 md:px-8 md:py-24">
            <div className="flex w-full max-w-[480px] flex-col gap-12">
              <KitHeading {...h} />
              <ContactForm services={contactServices} privacy={false} submitLabel="Get started" {...formProps} />
            </div>
          </div>
          <ImagePlaceholder src={p.imageSrc} tone="gray" className="hidden flex-1 lg:block" />
        </div>
      );
    case 'simple-form-04':
    case 'simple-form-05': {
      const brandPanel = p.type === 'simple-form-05';
      const panelHeading = brandPanel ? simpleForm05Panel : p.heading;
      return (
        <div className="flex">
          <MarketingThemeProvider value={brandPanel ? 'brand' : 'default'}>
            <aside className={cx('hidden w-[416px] shrink-0 flex-col justify-evenly gap-8 p-12 lg:flex', brandPanel ? 'bg-brand-800' : 'bg-gray-50')}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                  <h2 className={cx('font-semibold', brandPanel ? 'text-display-sm text-white' : 'text-display-xs text-gray-900')}>{panelHeading.title}</h2>
                  <p className={cx('text-lg', brandPanel ? 'text-brand-200' : 'text-gray-600')}>{panelHeading.supportingText}</p>
                </div>
                <Items items={p.items ?? sidePanelContacts} type="icon-left" className="flex flex-col gap-8" />
              </div>
              <Socials socials={p.socials ?? defaultSocials} variant={brandPanel ? 'white' : 'gray'} />
            </aside>
          </MarketingThemeProvider>
          <div className="flex flex-1 justify-center px-4 py-16 md:px-8 md:py-24 lg:items-center">
            <div className="flex w-full max-w-[480px] flex-col gap-12">
              {brandPanel ? <KitHeading {...p.heading} /> : <KitHeading {...p.heading} className="lg:hidden" />}
              <ContactForm {...(brandPanel ? { services: contactServices, privacy: false as const, submitLabel: 'Get started' } : {})} {...formProps} />
            </div>
          </div>
        </div>
      );
    }
    case 'icon-cards-01':
    case 'icon-cards-03':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} align={p.type === 'icon-cards-03' ? 'center' : 'left'} badge={p.type === 'icon-cards-03' ? { color: 'brand' } : undefined} />
          {p.type === 'icon-cards-03' && (
            <div className="flex flex-col gap-12 md:gap-24">
              <ImagePlaceholder src={p.imageSrc} tone="gray" className="h-60 w-full md:h-[480px]" />
              <Items items={p.items ?? contactCards3} type="featured-icon-card" className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8" />
            </div>
          )}
          {p.type === 'icon-cards-01' && <Items items={p.items ?? contactCards} type="featured-icon-card" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4" />}
        </Container>
      );
    case 'icon-cards-02':
      return (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-8">
          <KitHeading {...h} className="lg:flex-1" />
          <Items
            items={p.items ?? contactCards.map((c, i) => (i === 2 ? { ...c, link: '100 Smith St, Collingwood VIC 3066 AU' } : c))}
            type="icon-card"
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:w-[824px] lg:shrink-0"
          />
        </Container>
      );
    case 'icons-and-form':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
            <Items items={p.items ?? contactMethodsWithChat} type="icon-top-left" className="grid flex-1 grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12" />
            <div className={cx('flex-1 rounded-2xl md:px-8 md:py-10', p.theme === 'brand' ? 'bg-white px-5 py-8' : 'md:bg-gray-50')}>
              <MarketingThemeProvider value="default">
                <ContactForm phone={false} {...formProps} />
              </MarketingThemeProvider>
            </div>
          </div>
        </Container>
      );
    case 'icons-and-map-01':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <Items items={p.items ?? contactMethods} type="featured-icon-left" className="flex flex-col gap-10 md:gap-12 lg:w-[348px] lg:shrink-0" />
            <MapBlock map={p.map} mapSrc={p.mapSrc} className="h-60 w-full flex-1 md:h-[468px]" />
          </div>
        </Container>
      );
    case 'icons-and-map-02':
    case 'icons-and-image': {
      const isMap = p.type === 'icons-and-map-02';
      const top = p.theme === 'brand' ? 'brand' : 'gray-light';
      return (
        <>
          <MarketingSection as="div" theme={top} spacing="none" className="pt-16 pb-28 md:pt-24 md:pb-40">
            <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
              <KitHeading {...h} className="lg:flex-1" />
              <Items
                items={p.items ?? officeLocations}
                type={isMap ? 'featured-icon-left' : 'icon-left'}
                className="flex flex-col gap-10 md:gap-8 lg:w-[560px] lg:shrink-0"
              />
            </Container>
          </MarketingSection>
          <Container className="-mt-16 pb-16 md:-mt-24 md:pb-24">
            {isMap ? (
              <MapBlock map={p.map} mapSrc={p.mapSrc} className="h-60 w-full md:h-[516px]" />
            ) : (
              <ImagePlaceholder src={p.imageSrc} tone="gray" className="h-60 w-full shadow-2xl md:h-[560px]" />
            )}
          </Container>
        </>
      );
    }
    case 'tabs-map-01':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" badge={{ color: 'gray' }} />
          <div className="flex flex-col gap-12 md:gap-20">
            <MapBlock map={p.map} mapSrc={p.mapSrc} className="h-60 w-full md:h-[480px]" />
            <LocationTabs locations={p.locations ?? tabLocations} orientation="vertical" />
          </div>
        </Container>
      );
    case 'tabs-map-02':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <div className="lg:w-80 lg:shrink-0">
              <LocationTabs locations={p.locations ?? tabLocations} orientation="horizontal" />
            </div>
            <MapBlock map={p.map} mapSrc={p.mapSrc} className="h-60 w-full flex-1 md:h-auto md:min-h-[486px]" />
          </div>
        </Container>
      );
    case 'center-map': {
      const items = p.items ?? [storeLocations[0], storeLocations[2], storeLocations[1], storeLocations[3], storeLocations[4], storeLocations[5]];
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" />
          <div className="flex flex-col gap-12 lg:flex-row lg:gap-16">
            <Items items={items.slice(0, 3)} type="text-only-left-aligned" className="flex flex-col justify-center gap-6 md:gap-12 lg:flex-1" />
            <MapBlock map={p.map} mapSrc={p.mapSrc} className="order-last h-60 w-full md:h-[354px] lg:order-none lg:w-[560px] lg:shrink-0" />
            <Items items={items.slice(3)} type="text-only-left-aligned" className="-mt-6 flex flex-col justify-center gap-6 md:gap-12 lg:mt-0 lg:flex-1" />
          </div>
        </Container>
      );
    }
    case 'vector-map-03':
      return (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" badge={{ type: 'pill-outline', color: 'brand' }} />
          <div className="flex justify-center">
            <ContactVectorMap locations={p.mapLocations} />
          </div>
          <Items items={p.items ?? supportContacts} type="text-only-center-aligned" className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8" />
        </Container>
      );
    default:
      return null;
  }
}
