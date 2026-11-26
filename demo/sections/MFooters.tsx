import { Section, Row } from '../ui';
import { MarketingFooter, FooterLink, FooterLinksColumn, type MarketingFooterType } from '../../src/marketing/footers';
import { MarketingSection } from '../../src/marketing/_shared';

const types: MarketingFooterType[] = [
  'large-01', 'large-02', 'large-03', 'large-04', 'large-05', 'large-06', 'large-07', 'large-08',
  'large-09', 'large-10', 'large-11', 'large-12', 'large-13', 'large-14', 'large-15', 'large-16',
  'small-01', 'small-02', 'small-03', 'small-04',
];
const links = [{ label: 'Overview' }, { label: 'Features' }, { label: 'Solutions', badge: 'New' }, { label: 'Tutorials' }];

export default function MFooters() {
  return (
    <>
      <Section id="m-footer-links" title="Footer links" figma="_Footer link · _Footer links column">
        <div data-demo="footer-links" className="grid grid-cols-2 gap-0 md:grid-cols-4">
          {(['default', 'gray-dark', 'brand'] as const).map((th) => (
            <MarketingSection key={th} theme={th} spacing="none" as="div" className="flex gap-8 p-6">
              <FooterLinksColumn heading="Product" links={links} />
              {th === 'default' && <FooterLinksColumn heading="Product" links={links} color="brand" />}
            </MarketingSection>
          ))}
          <div className="flex items-center gap-4 p-6">
            <FooterLink>Overview</FooterLink>
            <FooterLink badge="New">Solutions</FooterLink>
          </div>
        </div>
      </Section>
      <Section id="m-footers" title="Footers" figma="Footer">
        {types.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={type}>
              <MarketingFooter type={type} />
            </div>
          </Row>
        ))}
        {(['large-02', 'large-06', 'large-11', 'small-01'] as const).map((type) => (
          <Row key={type} label={`type="${type}" — gray-dark / brand`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={`${type}-themes`}>
              <MarketingFooter type={type} theme="gray-dark" />
              <MarketingFooter type={type} theme="brand" />
            </div>
          </Row>
        ))}
      </Section>
    </>
  );
}
