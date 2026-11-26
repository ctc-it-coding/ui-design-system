import { useState } from 'react';
import {
  Calendar,
  DatePicker,
  DatePickerPanel,
  DateRangePicker,
  DateRangePickerPanel,
  type DateRange,
} from '../../src/components/date-picker';
import { Row, Section } from '../ui';

// Fixed "today" so the demo matches the Figma frames (January 2024).
const today = new Date(2024, 0, 17);

export default function DatePickersDemo() {
  const [single, setSingle] = useState<Date | null>(new Date(2024, 0, 6));
  const [range, setRange] = useState<DateRange>({ start: new Date(2024, 0, 10), end: new Date(2024, 0, 16) });
  return (
    <Section id="date-pickers" title="Date pickers" figma="_Calendar cell · _Date picker list item · _Date picker menu · Date picker dropdown">
      <Row label="Calendar — today, selected, range, disabled weekends, marked dates" className="flex flex-wrap items-start gap-10">
        <Calendar today={today} defaultMonth={today} selected={new Date(2024, 0, 6)} markedDates={[new Date(2024, 0, 25)]} />
        <Calendar today={today} defaultMonth={today} range={{ start: new Date(2024, 0, 10), end: new Date(2024, 0, 16) }} />
        <Calendar today={today} defaultMonth={today} isDateDisabled={(d) => d.getDay() === 0 || d.getDay() === 6} />
      </Row>
      <Row label="Date picker menu — single date (actions / no actions)" className="flex flex-wrap items-start gap-10">
        <DatePickerPanel today={today} value={new Date(2024, 0, 6)} />
        <DatePickerPanel today={today} value={new Date(2024, 0, 6)} actions={false} />
      </Row>
      <Row label="Date picker menu — dual dates" className="flex flex-col items-start gap-10">
        <DateRangePickerPanel today={today} value={{ start: new Date(2024, 0, 10), end: new Date(2024, 0, 16) }} />
        <DateRangePickerPanel today={today} value={{ start: new Date(2024, 0, 15), end: new Date(2024, 0, 21) }} />
      </Row>
      <Row label="Date picker dropdown — closed (placeholder / active) and open" className="flex flex-wrap items-start gap-6">
        <DatePicker today={today} placeholder="Select date" align="left" />
        <DatePicker today={today} value={single} onChange={setSingle} align="left" />
        <DateRangePicker today={today} align="left" />
        <DateRangePicker today={today} value={range} onChange={setRange} align="left" />
      </Row>
      <Row label="Dropdown opened" className="flex h-[560px] items-start gap-6">
        <DatePicker today={today} value={single} onChange={setSingle} align="left" defaultOpen />
      </Row>
    </Section>
  );
}
