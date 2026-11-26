import { useState, type ReactNode } from 'react';
import { NewsletterCTASection, newsletterCTASectionTypes } from '../../src/marketing/newsletter';
import type { CTATheme } from '../../src/marketing/cta';
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
];

export default function MNewsletterDemo() {
  const [last, setLast] = useState<string | null>(null);
  return (
    <Section id="m-newsletter" title="Newsletter CTA sections" figma="Newsletter CTA section (Type × Theme)">
      <p className="text-sm text-gray-600">Last submitted email: <span className="font-mono">{last ?? '—'}</span></p>
      {newsletterCTASectionTypes.filter(show).map((t) => (
        <Item key={t} label={`<NewsletterCTASection type="${t}" />`}>
          <NewsletterCTASection type={t} onSubmit={setLast} />
        </Item>
      ))}
      {(!only || only.includes('themes')) &&
        themed.flatMap(([t, ths]) =>
          ths.map((th) => (
            <Item key={t + th} label={`<NewsletterCTASection type="${t}" theme="${th}" />`}>
              <NewsletterCTASection type={t as never} theme={th} onSubmit={setLast} />
            </Item>
          )),
        )}
    </Section>
  );
}
