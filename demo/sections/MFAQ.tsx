import { Section, Row } from '../ui';
import { FAQSection, FaqItem, type FAQSectionType } from '../../src/marketing/faq';

const types: FAQSectionType[] = ['simple-01', 'simple-02', 'simple-03', 'simple-04', 'accordion-01', 'accordion-02', 'accordion-03', 'accordion-04'];

export default function MFAQ() {
  return (
    <>
      <Section id="m-faq-item" title="FAQ item" figma="_FAQ item">
        <div data-demo="faq-item" className="flex max-w-3xl flex-col gap-8">
          <FaqItem defaultExpanded />
          <FaqItem divider />
          <FaqItem defaultExpanded divider iconPosition="left" />
          <FaqItem iconPosition="left" />
        </div>
      </Section>
      <Section id="m-faq-sections" title="FAQ sections" figma="FAQ section">
        {types.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={type}>
              <FAQSection type={type} />
            </div>
          </Row>
        ))}
        <Row label="themes — gray-dark / brand" className="-mx-6 lg:-mx-10 flex flex-col">
          <div data-demo="themes">
            <FAQSection type="simple-01" theme="gray-dark" />
            <FAQSection type="accordion-01" theme="brand" />
            <FAQSection type="accordion-02" theme="gray-dark" />
          </div>
        </Row>
      </Section>
    </>
  );
}
