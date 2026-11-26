import { useMemo, useState, type ComponentType } from 'react';
import { colors, shadows } from '../../src/tokens';
import * as Icons from '../../src/icons';
import { iconMeta } from '../../src/icons';
import { Section, Row } from '../ui';

const families = Object.keys(colors).filter((k) => k !== 'white' && k !== 'black') as (keyof typeof colors)[];

export function ColorsDemo() {
  return (
    <Section id="colors" title="Colors" figma="↳ Colors — 29 palettes, shades 25–950">
      <div className="flex flex-col gap-3">
        {families.map((f) => (
          <div key={f} className="grid grid-cols-[120px_repeat(12,minmax(0,1fr))] items-center gap-1.5">
            <div className="text-sm font-medium text-gray-700">{f}</div>
            {Object.entries(colors[f] as Record<string, string>).map(([shade, hex]) => (
              <div key={shade} className="flex flex-col gap-1">
                <div className="h-10 rounded-md ring-1 ring-black/5 ring-inset" style={{ background: hex }} title={`${f}-${shade} ${hex}`} />
                <div className="text-[10px] leading-3 text-gray-500">{shade}<br />{hex}</div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Section>
  );
}

const typeScale = [
  ['text-display-2xl', 'Display 2xl', '72 / 90'], ['text-display-xl', 'Display xl', '60 / 72'], ['text-display-lg', 'Display lg', '48 / 60'],
  ['text-display-md', 'Display md', '36 / 44'], ['text-display-sm', 'Display sm', '30 / 38'], ['text-display-xs', 'Display xs', '24 / 32'],
  ['text-xl', 'Text xl', '20 / 30'], ['text-lg', 'Text lg', '18 / 28'], ['text-md', 'Text md', '16 / 24'], ['text-sm', 'Text sm', '14 / 20'], ['text-xs', 'Text xs', '12 / 18'],
] as const;

export function TypographyDemo() {
  return (
    <Section id="typography" title="Typography" figma="↳ Typography — Inter">
      <div className="flex flex-col divide-y divide-gray-200">
        {typeScale.map(([cls, name, metric]) => (
          <div key={cls} className="grid grid-cols-[160px_1fr] items-baseline gap-6 py-4">
            <div><div className="text-sm font-semibold text-gray-900">{name}</div><div className="font-mono text-xs text-gray-500">{cls} · {metric}</div></div>
            <div className="flex flex-wrap gap-x-8 text-gray-900">
              <span className={`${cls} font-normal`}>Regular</span><span className={`${cls} font-medium`}>Medium</span>
              <span className={`${cls} font-semibold`}>Semibold</span><span className={`${cls} font-bold`}>Bold</span>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

export function EffectsDemo() {
  return (
    <Section id="effects" title="Shadows & focus rings" figma="↳ Effect styles">
      <Row className="grid grid-cols-2 gap-8 bg-gray-50 p-8 sm:grid-cols-4">
        {(Object.keys(shadows) as (keyof typeof shadows)[]).map((k) => (
          <div key={k} className="flex h-28 items-end rounded-xl bg-white p-4 text-sm font-medium text-gray-700" style={{ boxShadow: shadows[k] }}>shadow-{k}</div>
        ))}
      </Row>
      <Row label="focus rings">
        <div className="rounded-lg border border-brand-300 bg-white px-4 py-2.5 text-sm shadow-xs ring-4 ring-brand-500/24">ring-brand-500/24</div>
        <div className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm shadow-xs ring-4 ring-gray-400/14">ring-gray-400/14</div>
        <div className="rounded-lg border border-error-300 bg-white px-4 py-2.5 text-sm shadow-xs ring-4 ring-error-500/24">ring-error-500/24</div>
      </Row>
    </Section>
  );
}

export function IconsDemo() {
  const [q, setQ] = useState('');
  const list = useMemo(() => iconMeta.filter((m) => !q || m.name.toLowerCase().includes(q.toLowerCase()) || m.figma.includes(q.toLowerCase())), [q]);
  const reg = Icons as unknown as Record<string, ComponentType<{ className?: string }>>;
  return (
    <Section id="icons" title={`Icons (${iconMeta.length})`} figma="↳ Icons — 24×24, 2px stroke, currentColor">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search icons…" className="w-full max-w-sm rounded-lg border border-gray-300 px-3.5 py-2.5 text-md shadow-xs outline-none focus:border-brand-300 focus:ring-4 focus:ring-brand-500/24" />
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-2">
        {list.slice(0, 600).map((m) => { const I = reg[m.name]; return (
          <div key={m.name} className="flex flex-col items-center gap-2 rounded-lg border border-gray-200 p-3 text-gray-700 hover:border-brand-300 hover:text-brand-600" title={m.figma}>
            <I className="size-6" /><span className="w-full truncate text-center text-[11px] text-gray-500">{m.name}</span>
          </div>
        ); })}
      </div>
      {list.length > 600 && <p className="text-sm text-gray-500">Showing 600 of {list.length} — refine the search.</p>}
    </Section>
  );
}

export default function Foundations() {
  return (<><ColorsDemo /><TypographyDemo /><EffectsDemo /><IconsDemo /></>);
}
