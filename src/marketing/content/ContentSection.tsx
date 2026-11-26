import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { BarChartSquare02 } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Container, ImagePlaceholder, MarketingSection } from '../_shared';
import { QuoteImagePanel } from '../testimonials/QuoteImagePanel';
import { ContentRichText, type ContentBlock } from './ContentItem';
import { AuthorBlock, ArticleFooter } from './_parts';
import { P, leadArticleBlocks, policyBlocks } from './defaults';

export type ContentSectionType =
  | 'simple-01'
  | 'simple-02'
  | 'simple-03'
  | 'simple-04'
  | 'simple-05'
  | 'split-image-01'
  | 'split-image-02'
  | 'split-image-03'
  | 'rich-text-01'
  | 'rich-text-02';

export interface ContentSectionProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: ContentSectionType;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Rich text blocks (main column). For two-column text types this is the left column. */
  blocks?: ContentBlock[];
  /** Second text column (Simple 02 / 03 / 04). */
  secondaryBlocks?: ContentBlock[];
  /** Buttons; defaults to the Figma actions of the type. `null` hides them. */
  actions?: ReactNode;
  imageSrc?: string;
}

const copy: Partial<Record<ContentSectionType, { sub?: string; title?: string; text?: string }>> = {
  'split-image-01': { sub: 'Why we’re different', title: 'We bring honesty and transparency to financial services technology', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non.' },
  'simple-01': { title: 'Beautiful analytics to grow smarter', text: 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users.' },
  'simple-02': { sub: 'Our mission', title: 'Transforming marketplaces', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ullamcorper mattis lorem non.' },
  'simple-03': { sub: 'Features', title: 'Beautiful analytics to grow smarter', text: 'Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.' },
  'split-image-02': { sub: 'Case study', title: 'How we helped Hourglass' },
  'split-image-03': { sub: 'Our studio', title: 'People first. Design later.' },
};

const defaultBlocks: Record<ContentSectionType, ContentBlock[]> = {
  'split-image-01': [
    { type: 'paragraph', size: 'lg', children: P.dolor },
    { type: 'heading', size: 'lg', children: 'Why we’re better' },
    { type: 'paragraph', size: 'lg', children: P.mi2 },
  ],
  'simple-01': [
    { type: 'paragraph', size: 'lg', children: P.dolor },
    { type: 'heading', size: 'lg', children: 'How we can help' },
    { type: 'paragraph', size: 'lg', children: P.mi2 },
  ],
  'simple-02': [
    { type: 'divider', size: 'sm' },
    { type: 'paragraph', size: 'lg', children: P.mi2short + '\n' + 'Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Sapien, dictum molestie sem tempor.' },
  ],
  'simple-03': [{ type: 'paragraph', size: 'lg', children: P.mi3 }],
  'simple-04': [{ type: 'paragraph', size: 'lg', children: P.mi3 }],
  'simple-05': [{ type: 'quote-center', size: 'xl', children: P.morbiShort, attribution: 'avatar' }],
  'split-image-02': [
    { type: 'divider', size: 'sm' },
    { type: 'paragraph', size: 'lg', children: P.mi2short },
    { type: 'heading', size: 'md', children: 'Closing more clients' },
    { type: 'paragraph', size: 'lg', children: P.dolor },
  ],
  'split-image-03': [{ type: 'paragraph', size: 'lg', children: P.studio }],
  'rich-text-01': leadArticleBlocks(['Image courtesy of Fauxels via Pexels', 'Image courtesy of Michael Burrows via Pexels'], ['image-landscape', 'image-portrait'], 'quote-left'),
  'rich-text-02': policyBlocks,
};
const defaultSecondary: Partial<Record<ContentSectionType, ContentBlock[]>> = {
  'simple-02': [{ type: 'paragraph', size: 'lg', children: P.sagittisLong }],
  'simple-03': [{ type: 'paragraph', size: 'lg', children: P.sagittisLong }],
  'simple-04': [{ type: 'paragraph', size: 'lg', children: P.sagittisLong }],
};

function Heading({ sub, title, text, className, icon }: { sub?: ReactNode; title?: ReactNode; text?: ReactNode; className?: string; icon?: boolean }) {
  return (
    <div className={cx('flex flex-col gap-4 md:gap-5', className)}>
      <div className={cx('flex flex-col', icon ? 'gap-6' : 'gap-3')}>
        {icon && <FeaturedIcon icon={BarChartSquare02} size="xl" color="brand" theme="light-outline" className="max-md:hidden" />}
        {icon && <FeaturedIcon icon={BarChartSquare02} size="lg" color="brand" theme="light-outline" className="md:hidden" />}
        {sub != null && <p className="text-sm font-semibold text-brand-700 md:text-md">{sub}</p>}
        {title != null && <h2 className="text-display-sm font-semibold text-gray-900 md:text-display-md">{title}</h2>}
      </div>
      {text != null && <p className="text-lg text-gray-600 md:text-xl">{text}</p>}
    </div>
  );
}

/**
 * ContentSection — Figma "Content section": prose blocks for marketing pages (two-column text, split image, quote, full rich text).
 */
export const ContentSection = forwardRef<HTMLElement, ContentSectionProps>(function ContentSection(
  { type = 'simple-01', subheading, title, supportingText, blocks, secondaryBlocks, actions, imageSrc, className, ...props },
  ref,
) {
  const c = copy[type] ?? {};
  const sub = subheading === undefined ? c.sub : subheading;
  const ttl = title ?? c.title;
  const txt = supportingText === undefined ? c.text : supportingText;
  const main = blocks ?? defaultBlocks[type];
  const second = secondaryBlocks ?? defaultSecondary[type] ?? [];
  const twoButtons = (a: string, b: string) =>
    actions === null ? null : (
      actions ?? (
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <Button size="xl" hierarchy="secondary-gray">{a}</Button>
          <Button size="xl">{b}</Button>
        </div>
      )
    );

  let body: ReactNode;
  switch (type) {
    case 'split-image-01':
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-12">
            <Heading sub={sub} title={ttl} text={txt} className="max-w-3xl" />
            {actions === null ? null : actions ?? <Button size="xl" className="max-md:w-full">Get started</Button>}
          </div>
          <div className="flex flex-col gap-12 md:flex-row md:gap-16">
            <ContentRichText blocks={main} className="flex-1" />
            <ImagePlaceholder src={imageSrc} tone="cool" className="h-60 md:h-[560px] md:flex-1" />
          </div>
        </Container>
      );
      break;
    case 'simple-01':
      body = (
        <Container className="flex flex-col gap-12 md:flex-row md:gap-16">
          <Heading icon title={ttl} text={txt} className="md:flex-1" />
          <ContentRichText blocks={main} className="md:flex-1" />
        </Container>
      );
      break;
    case 'simple-02':
      body = (
        <Container className="flex flex-col gap-0 md:flex-row md:gap-16">
          <div className="flex flex-col gap-12 md:flex-1 md:gap-10">
            <Heading sub={sub} title={ttl} text={txt} />
            <ContentRichText blocks={main} />
          </div>
          <ContentRichText blocks={second} className="md:flex-1" />
        </Container>
      );
      break;
    case 'simple-03':
    case 'simple-04':
      body = (
        <Container className="flex flex-col gap-12 md:gap-16">
          {type === 'simple-03' && <Heading sub={sub} title={ttl} text={txt} className="max-w-3xl" />}
          <div className="flex flex-col md:flex-row md:gap-16">
            <ContentRichText blocks={main} className="md:flex-1" />
            <ContentRichText blocks={second} className="md:flex-1" />
          </div>
        </Container>
      );
      break;
    case 'simple-05':
      body = (
        <Container className="flex justify-center">
          <ContentRichText blocks={main} />
        </Container>
      );
      break;
    case 'split-image-02':
    case 'split-image-03':
      body = (
        <Container className="flex flex-col gap-12 md:flex-row md:items-center md:gap-16">
          <div className="flex flex-col gap-8 md:flex-1 md:gap-12">
            <Heading sub={sub} title={ttl} />
            <ContentRichText blocks={main} />
            <div className="max-md:hidden">{type === 'split-image-02' ? twoButtons('Chat to us', 'Read case study') : twoButtons('Get in touch', 'Our process')}</div>
          </div>
          <ImagePlaceholder src={imageSrc} tone="warm" className={cx('md:flex-1', type === 'split-image-02' ? 'h-[560px] md:h-[640px]' : 'h-60 md:h-[654px]')}>
            {type === 'split-image-02' && <QuoteImagePanel size="md" type="full-width" name="Lulu Meyers" title="PM, Hourglass" supportingText="Web Design Agency" />}
          </ImagePlaceholder>
          <div className="md:hidden [&_button]:w-full">{type === 'split-image-02' ? twoButtons('Chat to us', 'Read case study') : twoButtons('Get in touch', 'Our process')}</div>
        </Container>
      );
      break;
    case 'rich-text-01':
    case 'rich-text-02':
      body = (
        <Container className="flex justify-center">
          <ContentRichText blocks={main}>
            {type === 'rich-text-01' && <ArticleFooter className="mt-4" left={<AuthorBlock name="Olivia Rhye" title="Product Designer, Tinicorn" />} />}
          </ContentRichText>
        </Container>
      );
      break;
  }

  return (
    <MarketingSection ref={ref} className={className} data-type={type} {...props}>
      {body}
    </MarketingSection>
  );
});

