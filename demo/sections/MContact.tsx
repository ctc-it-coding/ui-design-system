import { Section, Row } from '../ui';
import {
  ContactSection,
  ContactPageHeader,
  ContactText,
  MapLocationMarker,
  type ContactSectionType,
  type ContactPageHeaderType,
  type ContactTextType,
} from '../../src/marketing/contact';
import { Mail01 } from '../../src/icons';

const types: ContactSectionType[] = [
  'simple-icons-01', 'simple-icons-02', 'simple-icons-03', 'simple-icons-04',
  'simple-form-01', 'simple-form-02', 'simple-form-03', 'simple-form-04', 'simple-form-05',
  'icon-cards-01', 'icon-cards-02', 'icon-cards-03',
  'icons-and-form', 'icons-and-map-01', 'icons-and-map-02', 'icons-and-image',
  'tabs-map-01', 'tabs-map-02', 'center-map', 'vector-map-03',
];
const headers: ContactPageHeaderType[] = ['form-and-image-01', 'form-and-image-02', 'form-and-map', 'simple-form', 'simple-links-01', 'simple-links-02', 'map-01', 'map-02'];
const textTypes: ContactTextType[] = [
  'featured-icon-box', 'featured-icon-top-left', 'icon-top-left', 'featured-icon-top-centered', 'icon-top-centered', 'text-only-center-aligned',
  'featured-icon-left', 'icon-left', 'text-only-left-aligned', 'featured-icon-card', 'icon-card',
];

export default function MContact() {
  return (
    <>
      <Section id="m-contact-text" title="Contact text" figma="_Contact text · _Map location marker">
        <div data-demo="contact-text" className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {textTypes.map((t) => (
            <div key={t} className="flex flex-col gap-2">
              <span className="font-mono text-xs text-gray-400">{t}</span>
              <ContactText type={t} icon={Mail01} />
            </div>
          ))}
        </div>
        <Row label="Map location marker (default / open)">
          <div className="flex items-end gap-16 pt-32">
            <MapLocationMarker label="Melbourne, AUS" supportingText="100 Smith Street Collingwood VIC 3066 AU" flag="AU" />
            <MapLocationMarker label="Melbourne, AUS" supportingText="100 Smith Street Collingwood VIC 3066 AU" flag="AU" open />
          </div>
        </Row>
      </Section>
      <Section id="m-contact-sections" title="Contact sections" figma="Contact sections">
        {types.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={type}>
              <ContactSection type={type} />
            </div>
          </Row>
        ))}
        {(['simple-icons-01', 'simple-icons-04', 'icons-and-form', 'icons-and-map-01', 'icons-and-image'] as const).map((type) => (
          <Row key={type} label={`type="${type}" — themes`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={`${type}-themes`}>
              {type.startsWith('simple') && <ContactSection type={type} theme="gray-dark" />}
              <ContactSection type={type} theme="brand" />
            </div>
          </Row>
        ))}
      </Section>
      <Section id="m-contact-page-header" title="Contact page header" figma="Contact page header">
        {headers.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={`ph-${type}`}>
              <ContactPageHeader type={type} />
            </div>
          </Row>
        ))}
      </Section>
    </>
  );
}
