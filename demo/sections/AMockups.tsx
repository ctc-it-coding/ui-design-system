import { IPhoneMockup, MacbookMockup, ScreenMockup, type ScreenMockupSize } from '../../src/components/mockups';
import { Section, Row } from '../ui';

const sizes: ScreenMockupSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

export default function MockupsDemo() {
  return (
    <Section id="mockups" title="Mockups" figma="3:2 screen mockup · iPhone mockup · Macbook Pro mockup">
      <Row label="3:2 screen mockup · xs / sm / md (light + dark)" className="flex flex-wrap items-start gap-10 p-4">
        {sizes.slice(0, 3).map((s) => <ScreenMockup key={s} size={s} />)}
        {sizes.slice(0, 2).map((s) => <ScreenMockup key={s + 'd'} size={s} dark />)}
      </Row>
      <Row label="lg / xl" className="flex flex-col items-start gap-10 p-4">
        <ScreenMockup size="lg" dark />
        <ScreenMockup size="xl" />
      </Row>
      <Row label="iPhone mockup · light / dark / custom children" className="flex flex-wrap items-start gap-10 p-4">
        <IPhoneMockup className="w-[300px]" />
        <IPhoneMockup dark className="w-[300px]" />
        <IPhoneMockup className="w-[300px]">
          <div className="flex size-full flex-col gap-3 bg-brand-50 p-4">
            <div className="text-lg font-semibold text-gray-900">Custom screen</div>
            <div className="h-32 rounded-xl bg-brand-200" />
          </div>
        </IPhoneMockup>
      </Row>
      <Row label="Macbook Pro mockup · light / dark" className="flex flex-col items-start gap-10 p-4">
        <MacbookMockup />
        <MacbookMockup dark className="max-w-[640px]" />
      </Row>
    </Section>
  );
}
