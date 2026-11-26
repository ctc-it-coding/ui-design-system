import { Toggle } from '../../src/components/toggles';
import { Section, Row } from '../ui';

export default function TogglesDemo() {
  return (
    <Section id="toggles" title="Toggles" figma="Toggles/Toggle · _Toggle base">
      {(['sm', 'md'] as const).map((s) => (
        <Row key={s} label={`size ${s}`}>
          <Toggle size={s} aria-label="Off" />
          <Toggle size={s} defaultChecked aria-label="On" />
          <Toggle size={s} disabled aria-label="Disabled off" />
          <Toggle size={s} disabled defaultChecked aria-label="Disabled on" />
        </Row>
      ))}
      {(['sm', 'md'] as const).map((s) => (
        <Row key={s} label={`with text · ${s}`} className="grid grid-cols-3 gap-8">
          <Toggle size={s} label="Remember me" hint="Save my login details for next time." />
          <Toggle size={s} defaultChecked label="Remember me" hint="Save my login details for next time." />
          <Toggle size={s} disabled defaultChecked label="Remember me" hint="Save my login details for next time." />
        </Row>
      ))}
    </Section>
  );
}
