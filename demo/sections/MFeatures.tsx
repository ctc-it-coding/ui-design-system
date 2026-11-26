import type { ReactNode } from 'react';
import { FeaturesSection, FeatureText, FeatureTab, featuresSectionTypes, type FeaturesSectionType, type FeatureTextType } from '../../src/marketing/features';
import { Section, Row } from '../ui';

const only = (typeof window !== 'undefined' && new URLSearchParams(window.location.hash.slice(1)).get('types')?.split(',')) || null;

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="-mx-6 lg:-mx-10 flex flex-col">
      <div className="bg-gray-100 px-8 py-2 font-mono text-xs text-gray-500">{label}</div>
      {children}
    </div>
  );
}

const textTypes: FeatureTextType[] = [
  'featured-icon-box', 'integration-icon-box', 'featured-icon-top-left', 'icon-top-left', 'integration-icon-top-left',
  'featured-icon-top-centered', 'icon-top-centered', 'integration-icon-top-centered', 'text-centered',
  'featured-icon-left', 'icon-left', 'text-left', 'integration-icon-left', 'featured-icon-card', 'icon-card',
];

const themed: [FeaturesSectionType, 'gray-dark' | 'brand'][] = [
  ['simple-icons-01', 'brand'], ['simple-icons-01', 'gray-dark'], ['simple-icons-02', 'brand'], ['simple-icons-02', 'gray-dark'],
  ['simple-icons-03', 'brand'], ['simple-icons-03', 'gray-dark'], ['simple-icons-04', 'brand'], ['simple-icons-04', 'gray-dark'],
  ['large-screen-mockup-01', 'brand'], ['large-screen-mockup-02', 'brand'],
];

export default function MFeaturesDemo() {
  const types = (only ?? featuresSectionTypes) as string[];
  return (
    <Section id="m-features" title="Features sections" figma="Features section (Type × Theme) · _Feature text · _Feature tab">
      {(!only || only.includes('parts')) && (
        <>
          <Row label="_Feature text (FeatureText type=…)" className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {textTypes.map((t) => (
              <div key={t} className="flex flex-col gap-2">
                <span className="font-mono text-xs text-gray-400">{t}</span>
                <FeatureText type={t} />
              </div>
            ))}
          </Row>
          <Row label="_Feature tab (FeatureTab)" className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <FeatureTab orientation="vertical" current />
            <FeatureTab orientation="vertical" />
            <FeatureTab orientation="horizontal" current />
            <FeatureTab orientation="horizontal" />
          </Row>
        </>
      )}
      {featuresSectionTypes.filter((t) => types.includes(t)).map((t) => (
        <Item key={t} label={`type="${t}"`}>
          <FeaturesSection type={t} />
        </Item>
      ))}
      {themed.filter(([t, th]) => !only || only.includes(`${t}:${th}`) || only.includes('themes')).map(([t, th]) => (
        <Item key={t + th} label={`type="${t}" theme="${th}"`}>
          <FeaturesSection type={t} theme={th} />
        </Item>
      ))}
    </Section>
  );
}
