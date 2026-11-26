import { useState } from 'react';
import { Slider, type SliderValue } from '../../src/components/sliders';
import { Section, Row } from '../ui';

export default function SlidersDemo() {
  const [v, setV] = useState<SliderValue>([25, 75]);
  return (
    <Section id="sliders" title="Sliders" figma="Sliders/Slider">
      <Row label="no label" className="grid max-w-[320px] gap-8">
        <Slider defaultValue={50} thumbLabels="Volume" />
        <Slider defaultValue={[25, 75]} />
      </Row>
      <Row label="label bottom" className="grid max-w-[320px] gap-6">
        <Slider defaultValue={25} label="bottom" />
        <Slider value={v} onChange={setV} label="bottom" />
      </Row>
      <Row label="label top floating" className="grid max-w-[320px] gap-16 pt-12">
        <Slider defaultValue={50} label="top-floating" />
        <Slider defaultValue={[0, 75]} label="top-floating" />
      </Row>
      <Row label="disabled" className="grid max-w-[320px]">
        <Slider defaultValue={40} disabled />
      </Row>
    </Section>
  );
}
