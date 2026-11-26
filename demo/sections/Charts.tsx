import { ActivityGauge, BarChart, DonutChart, LineChart, PieChart, RadarChart, type ActivityGaugeSize, type PieChartSize } from '../../src/components/charts';
import { Section, Row } from '../ui';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const lineSeries = [
  { name: 'Series 1', data: [420, 480, 510, 470, 560, 600, 640, 620, 700, 760, 820, 880] },
  { name: 'Series 2', data: [300, 320, 340, 360, 350, 380, 400, 420, 430, 450, 470, 500] },
  { name: 'Series 3', data: [150, 180, 170, 210, 240, 230, 260, 300, 280, 320, 340, 360] },
];
const barSeries = [
  { name: 'Series 1', data: [280, 340, 220, 300, 320, 260, 380, 300, 350, 280, 330, 360] },
  { name: 'Series 2', data: [240, 250, 160, 210, 240, 200, 230, 220, 260, 200, 240, 260] },
  { name: 'Series 3', data: [380, 440, 320, 420, 360, 400, 460, 380, 420, 360, 400, 440] },
];
const pie = [
  { label: 'Series 1', value: 30 },
  { label: 'Series 2', value: 22 },
  { label: 'Series 3', value: 16 },
  { label: 'Series 4', value: 12 },
  { label: 'Series 5', value: 10 },
  { label: 'Series 6', value: 10 },
];
const gauge = [
  { label: 'Series 1', value: 80 },
  { label: 'Series 2', value: 65 },
  { label: 'Series 3', value: 50 },
];

export default function ChartsDemo() {
  return (
    <Section id="charts" title="Charts" figma="Charts/Line and bar chart · Pie chart · Activity gauge · Radar chart">
      <Row label="line · legend top · axis labels" className="block">
        <LineChart labels={months} series={lineSeries} legend="top" axisLabels xAxisLabel="Month" yAxisLabel="Active users" />
      </Row>
      <Row label="bar · legend right · axis labels" className="block">
        <BarChart labels={months} series={barSeries} legend="right" axisLabels xAxisLabel="Month" yAxisLabel="Active users" />
      </Row>
      <Row label="line · no legend · no axis labels (volatile) / bar mobile width" className="grid grid-cols-[1fr_343px] gap-8">
        <LineChart labels={months} series={lineSeries.slice(0, 2)} curve="linear" />
        <BarChart labels={months} series={barSeries} legend="top" />
      </Row>
      <Row label="pie chart · hole 0 / 25 / 50 / 75">
        {([0, 25, 50, 75] as const).map((h) => (
          <PieChart key={h} data={pie} size="xs" hole={h} />
        ))}
      </Row>
      <Row label="donut sizes xxs → lg · legend" className="flex flex-wrap items-start gap-8">
        {(['xxs', 'xs', 'sm', 'md', 'lg'] as PieChartSize[]).map((s) => (
          <DonutChart key={s} data={pie} size={s} legend={s === 'xxs' || s === 'md'} />
        ))}
      </Row>
      <Row label="activity gauge xs → lg" className="flex flex-wrap items-start gap-8">
        {(['xs', 'sm', 'md', 'lg'] as ActivityGaugeSize[]).map((s) => (
          <ActivityGauge key={s} size={s} data={gauge} label="Active users" value="1,000" />
        ))}
      </Row>
      <Row label="activity gauge legend bottom / right" className="flex flex-wrap items-start gap-8">
        <ActivityGauge size="sm" data={gauge} value="1,000" legend="bottom" />
        <ActivityGauge size="md" data={gauge} label="Active users" value="1,000" legend="right" />
      </Row>
      <Row label="radar · legend right / bottom" className="flex flex-wrap items-start gap-8">
        <RadarChart
          axes={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          series={[
            { name: 'Series 1', data: [80, 60, 90, 70, 50, 40, 70] },
            { name: 'Series 2', data: [50, 90, 60, 40, 80, 70, 30] },
            { name: 'Series 3', data: [30, 40, 50, 90, 60, 30, 50] },
          ]}
          legend="right"
        />
        <RadarChart
          width={300}
          axes={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
          series={[{ name: 'Series 1', data: [80, 60, 90, 70, 50, 40, 70] }]}
          legend="bottom"
          scaleLabels={false}
        />
      </Row>
    </Section>
  );
}
