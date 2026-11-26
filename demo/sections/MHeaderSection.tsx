import { HeaderSection, type HeaderSectionAlignment, type HeaderSectionActions, type HeaderSectionColor } from '../../src/marketing/header-section';
import { Section } from '../ui';

const alignments: HeaderSectionAlignment[] = ['center', 'left', 'space-between'];
const actions: HeaderSectionActions[] = ['buttons', 'false', 'tabs', 'email-capture', 'search-bar'];
const colors: HeaderSectionColor[] = ['default', 'gray-dark', 'brand'];

const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.hash.slice(1)) : null;
const onlyColors = (params?.get('colors')?.split(',') as HeaderSectionColor[] | undefined) ?? null;

function Item({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="-mx-6 lg:-mx-10 flex flex-col">
      <div className="bg-gray-100 px-8 py-2 font-mono text-xs text-gray-500">{label}</div>
      {children}
    </div>
  );
}

export default function MHeaderSectionDemo() {
  const cs = onlyColors ?? ['default'];
  return (
    <Section id="m-header-section" title="Header sections" figma="Header section (Alignment × Actions × Color)">
      {cs.map((color) =>
        alignments.map((alignment) =>
          actions.map((a) => (
            <Item key={`${color}-${alignment}-${a}`} label={`alignment="${alignment}" actions="${a}" color="${color}"`}>
              <HeaderSection alignment={alignment} actions={a} color={color} />
            </Item>
          )),
        ),
      )}
      {!onlyColors &&
        colors.slice(1).map((color) =>
          (['buttons', 'tabs', 'email-capture'] as const).map((a, i) => (
            <Item key={`${color}-${a}`} label={`alignment="${alignments[i]}" actions="${a}" color="${color}"`}>
              <HeaderSection alignment={alignments[i]} actions={a} color={color} />
            </Item>
          )),
        )}
    </Section>
  );
}
