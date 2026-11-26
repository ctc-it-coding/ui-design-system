import {
  BackgroundMask,
  BackgroundOverlay,
  BackgroundPatternDecorative,
  LinePattern,
  SectionBackgroundPattern,
  linePatternStyles,
  type BackgroundMaskDirection,
  type BackgroundPatternDecorativeType,
  type SectionBackgroundPatternType,
} from '../../src/components/backgrounds';
import { Section, Row } from '../ui';

const decoTypes: BackgroundPatternDecorativeType[] = ['circles', 'squares', 'grid', 'grid-dot'];
const secTypes: SectionBackgroundPatternType[] = ['grid-check', 'grid', 'grid-dot', 'empty'];
const dirs: BackgroundMaskDirection[] = ['radial-center', 'radial-down', 'radial-up', 'linear-down', 'linear-up'];

export default function BackgroundsDemo() {
  return (
    <Section id="backgrounds" title="Background elements" figma="Background pattern · Background pattern decorative · _Background mask · Background overlay · Line pattern">
      <Row label="SectionBackgroundPattern · md / sm" className="grid grid-cols-2 gap-6">
        {secTypes.flatMap((t) => (['md', 'sm'] as const).map((s) => (
          <div key={t + s} className="relative h-[300px] overflow-hidden rounded-xl border border-gray-200 bg-white">
            <SectionBackgroundPattern type={t} size={s} />
            <span className="absolute bottom-2 left-3 text-xs text-gray-500">{t} · {s}</span>
          </div>
        )))}
      </Row>
      <Row label="BackgroundPatternDecorative · sm" className="flex flex-wrap gap-6">
        {decoTypes.map((t) => <BackgroundPatternDecorative key={t} type={t} size="sm" />)}
      </Row>
      <Row label="md / lg" className="flex flex-wrap items-start gap-6">
        <BackgroundPatternDecorative type="squares" size="md" />
        <BackgroundPatternDecorative type="grid-dot" size="md" />
        <BackgroundPatternDecorative type="circles" size="lg" className="max-w-full" />
      </Row>
      <Row label="BackgroundMask directions" className="flex flex-wrap gap-4">
        {dirs.map((d) => (
          <div key={d} className="flex flex-col items-center gap-1">
            <BackgroundMask direction={d} className="size-40 bg-brand-600" />
            <span className="text-xs text-gray-500">{d}</span>
          </div>
        ))}
      </Row>
      <Row label="BackgroundOverlay · default / gradient / transparent+blur / default no blur" className="flex flex-wrap gap-4">
        {([['default', true], ['gradient', true], ['transparent', true], ['default', false]] as const).map(([t, b], i) => (
          <div key={i} className="relative h-40 w-60 overflow-hidden rounded-xl bg-gradient-to-br from-brand-300 via-orange-200 to-blue-light-300">
            <div className="p-4 text-display-xs font-semibold text-gray-900">Content behind</div>
            <BackgroundOverlay type={t} blur={b} />
          </div>
        ))}
      </Row>
      <Row label="LinePattern" className="flex flex-wrap items-start gap-6">
        {linePatternStyles.map((s) => <LinePattern key={s} variant={s} height={200} className="text-gray-400" />)}
      </Row>
    </Section>
  );
}
