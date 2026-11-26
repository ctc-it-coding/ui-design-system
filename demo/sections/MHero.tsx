import { HeroHeaderSection, heroHeaderTypes, type HeroHeaderType } from '../../src/marketing/hero';
import { Section } from '../ui';

const only = (typeof window !== 'undefined' && new URLSearchParams(window.location.hash.slice(1)).get('types')?.split(',')) || null;

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="-mx-6 lg:-mx-10 flex flex-col">
      <div className="bg-gray-100 px-8 py-2 font-mono text-xs text-gray-500">{label}</div>
      {children}
    </div>
  );
}

export default function MHeroDemo() {
  const types = (only ?? heroHeaderTypes) as HeroHeaderType[];
  return (
    <Section id="m-hero" title="Hero header sections" figma="Hero header section (Type × Theme)">
      {types.map((t) => (
        <Item key={t} label={`type="${t}"`}>
          <HeroHeaderSection type={t} />
        </Item>
      ))}
      {(!only || only.includes('simple-text')) &&
        (['gray-light', 'gray-dark', 'brand'] as const).map((th) => (
          <Item key={th} label={`type="simple-text" theme="${th}"`}>
            <HeroHeaderSection type="simple-text" theme={th} />
          </Item>
        ))}
    </Section>
  );
}
