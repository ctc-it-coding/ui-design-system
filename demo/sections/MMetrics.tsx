import type { ReactNode } from 'react';
import { MarketingMetricItem, MetricsSection, metricsSectionTypes, type MarketingMetricItemType, type MetricsSectionType } from '../../src/marketing/metrics';
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

const itemTypes: MarketingMetricItemType[] = [
  'card-text-and-supporting-text', 'card-text', 'centered-with-supporting-text', 'centered-text',
  'left-aligned-with-supporting-text', 'left-aligned-text', 'small-featured-icon', 'small-accent-line',
];
const themed: [MetricsSectionType, 'gray-dark' | 'brand'][] = [
  ['simple-accent-line', 'gray-dark'], ['simple-accent-line', 'brand'], ['simple-centered-text', 'gray-dark'], ['simple-centered-text', 'brand'],
  ['minimal-centered-text', 'gray-dark'], ['minimal-centered-text', 'brand'], ['split-image-01', 'gray-dark'], ['split-image-02', 'brand'],
];
const cardTheme: Partial<Record<MetricsSectionType, 'gray-light' | 'brand-light' | 'gray-dark' | 'brand'>> = {
  'card-gray-light': 'gray-light', 'card-brand-light': 'brand-light', 'card-gray-dark': 'gray-dark', 'card-brand-dark': 'brand',
};

export default function MMetricsDemo() {
  return (
    <Section id="m-metrics" title="Metrics sections" figma="Metrics section (Type × Theme) · _Metric item">
      {(!only || only.includes('parts')) && (
        <Row label="_Metric item (MarketingMetricItem type=…)" className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4">
          {itemTypes.map((t) => (
            <div key={t} className="flex flex-col gap-2">
              <span className="font-mono text-xs text-gray-400">{t}</span>
              <MarketingMetricItem type={t} actionLabel="Learn more" />
            </div>
          ))}
        </Row>
      )}
      {metricsSectionTypes.filter((t) => !only || only.includes(t)).map((t) => (
        <Item key={t} label={`type="${t}"${cardTheme[t] ? ` theme="${cardTheme[t]}"` : ''}`}>
          <MetricsSection type={t} theme={cardTheme[t]} />
        </Item>
      ))}
      {themed.filter(([t, th]) => !only || only.includes('themes') || only.includes(`${t}:${th}`)).map(([t, th]) => (
        <Item key={t + th} label={`type="${t}" theme="${th}"`}>
          <MetricsSection type={t} theme={th} />
        </Item>
      ))}
    </Section>
  );
}
