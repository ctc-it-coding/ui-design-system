import { Section, Row } from '../ui';
import { BlogPostCard, BlogSubscribeCard, BlogSection, BlogPageHeader, type BlogPostCardType, type BlogSectionType, type BlogPageHeaderType } from '../../src/marketing/blog';

const cardTypes: BlogPostCardType[] = ['simple-01', 'simple-02', 'simple-03', 'simple-04', 'card-full-width-image-01', 'card-full-width-image-02', 'card-full-width-image-03', 'card-full-width-image-04'];
const sectionTypes: BlogSectionType[] = ['split-layout-01', 'split-layout-02', 'simple-left-aligned-01', 'simple-left-aligned-02', 'simple-center-aligned-01', 'simple-center-aligned-02', 'carousel-layout-01', 'carousel-layout-02'];
const headerTypes: BlogPageHeaderType[] = [
  'simple-01', 'simple-02', 'simple-03', 'simple-04', 'simple-05', 'simple-06',
  'featured-post-01', 'featured-post-02', 'featured-post-03', 'featured-post-04',
  'sidebar-01', 'sidebar-02', 'alt-layout-01', 'alt-layout-02', 'alt-layout-03', 'alt-layout-04',
];

export default function MBlog() {
  return (
    <>
      <Section id="blog-cards" title="Blog post card" figma="Blog post card · Blog subscribe card">
        <Row label="Vertical" className="grid grid-cols-4 gap-8">
          {cardTypes.map((t) => <BlogPostCard key={t} type={t} />)}
        </Row>
        <Row label="Horizontal" className="grid grid-cols-2 gap-8">
          {cardTypes.map((t) => <BlogPostCard key={t} type={t} orientation="horizontal" />)}
        </Row>
        <Row label="Subscribe card — default / line" className="grid grid-cols-3 gap-8">
          <BlogSubscribeCard />
          <BlogSubscribeCard type="line" />
        </Row>
      </Section>
      {sectionTypes.map((t) => (
        <Section key={t} id={`bs-${t}`} title={`Blog section — ${t}`} figma={`Blog section / Type=${t}`}>
          <div className="-mx-6 lg:-mx-10"><BlogSection type={t} /></div>
        </Section>
      ))}
      {headerTypes.map((t) => (
        <Section key={t} id={`bh-${t}`} title={`Blog page header — ${t}`} figma={`Blog page header / Type=${t}`}>
          <div className="-mx-6 lg:-mx-10"><BlogPageHeader type={t} /></div>
        </Section>
      ))}
    </>
  );
}
