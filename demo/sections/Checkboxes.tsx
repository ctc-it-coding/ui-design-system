import { Checkbox, Radio, RadioGroup } from '../../src/components/checkboxes';
import { Section, Row } from '../ui';

export default function CheckboxesDemo() {
  return (
    <Section id="checkboxes" title="Checkboxes" figma="Checkboxes/Checkbox · _Checkbox base">
      {(['sm', 'md'] as const).map((s) => (
        <Row key={s} label={`checkbox · ${s}`}>
          <Checkbox size={s} aria-label="Unchecked" />
          <Checkbox size={s} defaultChecked aria-label="Checked" />
          <Checkbox size={s} checked indeterminate aria-label="Indeterminate" />
          <Checkbox size={s} disabled aria-label="Disabled" />
          <Checkbox size={s} disabled defaultChecked aria-label="Disabled checked" />
          <Checkbox size={s} disabled checked indeterminate aria-label="Disabled indeterminate" />
          <span className="w-8" />
          <Radio size={s} name={`r-${s}`} aria-label="Radio" />
          <Radio size={s} name={`r2-${s}`} defaultChecked aria-label="Radio checked" />
          <Radio size={s} disabled aria-label="Radio disabled" />
          <Radio size={s} disabled defaultChecked aria-label="Radio disabled checked" />
        </Row>
      ))}
      {(['sm', 'md'] as const).map((s) => (
        <Row key={s} label={`with text · ${s}`} className="grid grid-cols-3 gap-8">
          <Checkbox size={s} label="Remember me" hint="Save my login details for next time." />
          <Checkbox size={s} defaultChecked label="Remember me" hint="Save my login details for next time." />
          <Checkbox size={s} disabled defaultChecked label="Remember me" hint="Save my login details for next time." />
        </Row>
      ))}
      <Row label="radio group" className="grid grid-cols-3 gap-8">
        <RadioGroup defaultValue="a" size="md" label="Notifications">
          <Radio value="a" label="Remember me" hint="Save my login details for next time." />
          <Radio value="b" label="Email me" hint="Send occasional product updates." />
          <Radio value="c" disabled label="Disabled" hint="Not available on your plan." />
        </RadioGroup>
        <RadioGroup defaultValue="x" size="sm">
          <Radio value="x" label="Small selected" />
          <Radio value="y" label="Small option" />
        </RadioGroup>
      </Row>
    </Section>
  );
}
