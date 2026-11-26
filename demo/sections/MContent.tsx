import { Section, Row } from '../ui';
import { ContentItem, ContentSection, BlogPostPageHeader, type ContentSectionType, type BlogPostPageHeaderType, type ContentItemSize } from '../../src/marketing/content';

const sectionTypes: ContentSectionType[] = ['simple-01', 'simple-02', 'simple-03', 'simple-04', 'simple-05', 'split-image-01', 'split-image-02', 'split-image-03', 'rich-text-01', 'rich-text-02'];
const postTypes: BlogPostPageHeaderType[] = ['large-image-01', 'large-image-02', 'large-image-03', 'large-image-04', 'split-image-01', 'split-image-02', 'split-image-03', 'split-image-04', 'alternative-01', 'alternative-02', 'alternative-03', 'simple'];
const sizes: ContentItemSize[] = ['sm', 'md', 'lg', 'xl'];

export default function MContent() {
  return (
    <>
      <Section id="content-items" title="Content item" figma="Content item (Type × Size)">
        <Row label="Heading sm / md / lg / xl · Paragraph sm / md / lg / xl" className="grid grid-cols-2 gap-12">
          <div className="max-w-[720px]">{sizes.map((s) => <ContentItem key={s} type="heading" size={s}>{`Heading ${s}`}</ContentItem>)}</div>
          <div className="max-w-[720px]">{sizes.map((s) => <ContentItem key={s} type="paragraph" size={s} />)}</div>
        </Row>
        <Row label="Quote left / center (sm, xl, 2xl) · avatar / text attribution" className="grid grid-cols-2 gap-12">
          <div>
            <ContentItem type="quote-left" size="sm" attribution="both" />
            <ContentItem type="quote-left" size="xl" />
            <ContentItem type="quote-left" size="2xl" attribution="avatar" />
          </div>
          <div>
            <ContentItem type="quote-center" size="sm" attribution="both" />
            <ContentItem type="quote-center" size="xl" />
            <ContentItem type="quote-center" size="2xl" attribution="avatar" />
          </div>
        </Row>
        <Row label="Images · dividers · feature text" className="grid grid-cols-3 gap-12">
          <ContentItem type="image-landscape" />
          <ContentItem type="image-square" imageTone="warm" />
          <ContentItem type="image-portrait" imageTone="cool" />
          <div>{(['sm', 'md', 'lg', 'xl', '2xl'] as const).map((s) => <ContentItem key={s} type="divider" size={s} />)}</div>
          <ContentItem type="feature-text" size="sm" title="Conclusion" />
          <ContentItem type="feature-text" size="md" title="Conclusion" />
        </Row>
      </Section>
      {sectionTypes.map((t) => (
        <Section key={t} id={`cs-${t}`} title={`Content section — ${t}`} figma={`Content section / Type=${t}`}>
          <div className="-mx-6 lg:-mx-10"><ContentSection type={t} /></div>
        </Section>
      ))}
      {postTypes.map((t) => (
        <Section key={t} id={`bp-${t}`} title={`Blog post page header — ${t}`} figma={`Blog post page header / Type=${t}`}>
          <div className="-mx-6 lg:-mx-10"><BlogPostPageHeader type={t} /></div>
        </Section>
      ))}
    </>
  );
}
