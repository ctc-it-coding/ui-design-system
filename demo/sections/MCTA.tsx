import type { ReactNode } from 'react';
import { CTASection, ctaSectionTypes, type CTATheme } from '../../src/marketing/cta';
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

const themed: [string, CTATheme[]][] = [
  ['simple-centered', ['brand', 'gray-dark']],
  ['simple-left', ['brand', 'gray-dark']],
  ['card-horizontal', ['gray-dark', 'brand']],
  ['card-vertical', ['gray-dark', 'brand']],
  ['card-horizontal-split', ['brand']],
  ['simple-logos-01', ['brand', 'gray-dark']],
  ['simple-logos-02', ['brand', 'gray-dark']],
  ['abstract-images', ['gray-dark', 'brand']],
];

export default function MCTADemo() {
  return (
    <Section id="m-cta" title="CTA sections" figma="CTA section (Type × Theme)">
      {ctaSectionTypes.filter(show).map((t) => (
        <Item key={t} label={`<CTASection type="${t}" />`}>
          <CTASection type={t} />
        </Item>
      ))}
      {(!only || only.includes('themes')) &&
        themed.flatMap(([t, ths]) =>
          ths.map((th) => (
            <Item key={t + th} label={`<CTASection type="${t}" theme="${th}" />`}>
              <CTASection type={t as never} theme={th} />
            </Item>
          )),
        )}
    </Section>
  );
}
