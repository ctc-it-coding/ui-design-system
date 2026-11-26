import type { ReactNode } from 'react';
import { PressMentionsSection, SocialProofSection, socialProofSectionTypes } from '../../src/marketing/social-proof';
import { Section } from '../ui';

function Item({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="-mx-6 lg:-mx-10 flex flex-col">
      <div className="bg-gray-100 px-8 py-2 font-mono text-xs text-gray-500">{label}</div>
      {children}
    </div>
  );
}
const themes = ['default', 'brand', 'gray-dark'] as const;

export default function MSocialProofDemo() {
  return (
    <Section id="m-social-proof" title="Social proof & press mentions" figma="Social proof section (Type × Theme) · Press mentions section">
      {socialProofSectionTypes.flatMap((t) =>
        themes.map((th) => (
          <Item key={t + th} label={`<SocialProofSection type="${t}" theme="${th}" />`}>
            <SocialProofSection type={t} theme={th} />
          </Item>
        )),
      )}
      {themes.map((th) => (
        <Item key={th} label={`<PressMentionsSection theme="${th}" />`}>
          <PressMentionsSection theme={th} />
        </Item>
      ))}
    </Section>
  );
}
