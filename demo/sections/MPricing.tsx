import type { ReactNode } from 'react';
import {
  PricingPageHeader,
  PricingSection,
  PricingTierCard,
  pricingPageHeaderTypes,
  pricingSectionTypes,
  type PricingTierCardType,
} from '../../src/marketing/pricing';
import { Section } from '../ui';

const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.hash.slice(1)) : null;
const only = params?.get('types')?.split(',') ?? null;
const show = (t: string) => !only || only.includes(t);

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="-mx-6 lg:-mx-10 flex flex-col">
      <div className="bg-gray-100 px-8 py-2 font-mono text-xs text-gray-500">{label}</div>
      {children}
    </div>
  );
}

const cardTypes: PricingTierCardType[] = [
  'dual-action', 'dual-check-items', 'icon', 'primary-card-icon', 'badge-group', 'badge', 'banner', 'call-out', 'primary-card-simple', 'icon-offset',
];

export default function MPricingDemo() {
  return (
    <>
      {show('cards') && (
        <Section id="m-pricing-cards" title="Pricing tier cards" figma="_Pricing tier card (Type)">
          <div className="flex flex-wrap items-start gap-8 pt-10">
            {cardTypes.map((t) => (
              <div key={t} className={t === 'dual-check-items' ? 'w-[576px]' : 'w-[360px]'}>
                <div className="mb-2 font-mono text-xs text-gray-500">type="{t}"</div>
                <PricingTierCard type={t} />
              </div>
            ))}
          </div>
        </Section>
      )}
      <Section id="m-pricing-sections" title="Pricing sections" figma="Pricing section (Type)">
        {pricingSectionTypes.filter(show).map((t) => (
          <Item key={t} label={`<PricingSection type="${t}" />`}>
            <PricingSection type={t} />
          </Item>
        ))}
      </Section>
      <Section id="m-pricing-headers" title="Pricing page headers" figma="Pricing page header (Type)">
        {pricingPageHeaderTypes.filter(show).map((t) => (
          <Item key={t} label={`<PricingPageHeader type="${t}" />`}>
            <PricingPageHeader type={t} />
          </Item>
        ))}
      </Section>
    </>
  );
}
