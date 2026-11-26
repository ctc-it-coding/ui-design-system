import { Section, Row } from '../ui';
import { TestimonialSection, TestimonialCarouselArrow, QuoteImagePanel, type TestimonialSectionType } from '../../src/marketing/testimonials';
import { ImagePlaceholder } from '../../src/marketing/_shared';

const types: TestimonialSectionType[] = [
  'simple-centered-01',
  'simple-centered-02',
  'simple-centered-03',
  'simple-left-aligned',
  'card',
  'split-image-01',
  'split-image-02',
  'split-image-03',
  'abstract-image',
  'card-split-image',
  'glassmorphic-cards-01',
  'glassmorphic-cards-02',
  'glassmorphic-cards-03',
  'case-study-cards',
];

export default function MTestimonials() {
  return (
    <>
      <Section id="testimonial-parts" title="Testimonial parts" figma="_Testiomonial carousel arrow · _Quote image bottom panel">
        <Row label="Carousel arrow — button chevron / button arrow / arrow, md + lg, disabled">
          {(['button-chevron', 'button-arrow', 'arrow'] as const).map((t) => (
            <div key={t} className="flex items-center gap-4">
              <TestimonialCarouselArrow type={t} size="md" direction="left" />
              <TestimonialCarouselArrow type={t} size="lg" direction="right" />
              <TestimonialCarouselArrow type={t} size="lg" direction="right" disabled />
            </div>
          ))}
        </Row>
        <Row label="Quote image bottom panel — md/sm × full-width/floating × quote" className="grid grid-cols-4 gap-6">
          {(['md', 'sm'] as const).flatMap((size) =>
            (['full-width', 'floating'] as const).map((type) => (
              <ImagePlaceholder key={size + type} tone="warm" className="h-[480px]">
                <QuoteImagePanel size={size} type={type} quote={type === 'floating' ? '“Tinicorn has saved us thousands of hours of work.”' : undefined} name="Olivia Rhye" title="Designer, Layers" supportingText="Web Design Agency" onPrev={() => {}} onNext={() => {}} />
              </ImagePlaceholder>
            )),
          )}
        </Row>
      </Section>
      {types.map((type) => (
        <Section key={type} id={`t-${type}`} title={`Testimonial section — ${type}`} figma={`Testimonial section / Type=${type}`}>
          <div className="-mx-6 lg:-mx-10">
            <TestimonialSection type={type} />
          </div>
        </Section>
      ))}
      <Section id="t-themes" title="Testimonial section — themes" figma="Theme=Brand / Gray dark / Gray light">
        <div className="-mx-6 lg:-mx-10 flex flex-col gap-6">
          <TestimonialSection type="simple-centered-01" theme="brand" />
          <TestimonialSection type="simple-left-aligned" theme="gray-dark" />
          <TestimonialSection type="card" theme="brand" />
          <TestimonialSection type="card-split-image" theme="gray-dark" />
          <TestimonialSection type="simple-centered-03" theme="gray-dark" />
        </div>
      </Section>
    </>
  );
}
