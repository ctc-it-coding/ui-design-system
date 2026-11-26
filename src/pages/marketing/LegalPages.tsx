/* Generated from the Figma "Legal pages" example page — composition of marketing sections. */
import { CTASection, ContentSection, HeaderSection, MarketingBanner, MarketingFooter, MarketingHeaderNav, SectionDivider } from '../../marketing';

/** Figma "Legal pages" example 1 (1440×3816, node 1646:387689). */
export function LegalPage01() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeaderNav variant="dropdown" type="featured-card" />
      <HeaderSection alignment="center" actions="tabs" color="brand" />
      <ContentSection type="rich-text-02" />
      <SectionDivider />
      <CTASection type="card-horizontal" theme="brand" />
      <SectionDivider />
      <MarketingFooter type="large-07" theme="default" />
    </div>
  );
}

/** Figma "Legal pages" example 2 (1440×4765, node 1646:386533). */
export function LegalPage02() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeaderNav variant="dropdown" type="featured-card" />
      <HeaderSection alignment="center" actions="email-capture" color="gray-dark" />
      <ContentSection type="rich-text-02" />
      <CTASection type="split-image-03" theme="default" />
      <SectionDivider />
      <MarketingFooter type="large-09" theme="default" />
    </div>
  );
}

/** Figma "Legal pages" example 3 (1440×4012, node 1646:384737). */
export function LegalPage03() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingBanner type="slim" theme="brand" size="full-width" />
      <MarketingHeaderNav variant="dropdown" type="featured-card" />
      <HeaderSection alignment="space-between" actions="search-bar" color="default" />
      <SectionDivider />
      <ContentSection type="rich-text-02" />
      <SectionDivider />
      <CTASection type="simple-logos-02" theme="default" />
      <MarketingFooter type="large-06" theme="brand" />
    </div>
  );
}

/** Figma "Legal pages" example 4 (1440×3752, node 1646:383471). */
export function LegalPage04() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeaderNav variant="dropdown" type="featured-card" />
      <HeaderSection alignment="center" actions="tabs" color="default" />
      <ContentSection type="rich-text-02" />
      <CTASection type="simple-centered" theme="default" />
      <MarketingFooter type="large-02" theme="gray-dark" />
    </div>
  );
}

/** Figma "Legal pages" example 5 (1440×3151, node 1646:379018). */
export function LegalPage05() {
  return (
    <div className="min-h-screen bg-white">
      <MarketingHeaderNav variant="dropdown" type="featured-card" />
      <HeaderSection alignment="center" actions="false" color="default" />
      <ContentSection type="rich-text-02" />
      <SectionDivider />
      <MarketingFooter type="large-16" theme="default" />
    </div>
  );
}
