import { Section, Row } from '../ui';
import { MarketingBanner, type MarketingBannerType } from '../../src/marketing/banners';
import { SectionDivider } from '../../src/marketing/section-divider';

const types: MarketingBannerType[] = ['text-field', 'single-action', 'dual-action', 'slim'];

export default function MBanners() {
  return (
    <>
      <Section id="m-banners-full" title="Banners — full-width" figma="Banner (Size=Full-width)">
        {types.map((type) => (
          <Row key={type} label={`type="${type}" — default / brand`} className="flex flex-col gap-4">
            <MarketingBanner type={type} size="full-width" />
            <MarketingBanner type={type} theme="brand" size="full-width" />
          </Row>
        ))}
      </Section>
      <Section id="m-banners-floating" title="Banners — floating" figma="Banner (Size=Floating)">
        {types.map((type) => (
          <Row key={type} label={`type="${type}" — default / brand`} className="flex flex-col gap-6 bg-gray-50 py-6">
            <MarketingBanner type={type} size="floating" />
            <MarketingBanner type={type} theme="brand" size="floating" />
          </Row>
        ))}
        <Row label="Not dismissible">
          <MarketingBanner type="single-action" size="floating" dismissible={false} />
        </Row>
      </Section>
      <Section id="m-section-divider" title="Section divider" figma="–––– Section divider ––––">
        <div className="py-8"><SectionDivider /></div>
      </Section>
    </>
  );
}
