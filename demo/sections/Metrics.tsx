import { Button } from '../../src/components/buttons';
import { MetricChange, MetricItem, MiniChart, type MetricItemType, type MiniChartType } from '../../src/components/metrics';
import { ArrowRight, BarChart01, Settings01, Users01 } from '../../src/icons';
import { Section, Row } from '../ui';

const types: MetricItemType[] = ['simple', 'icon-01', 'icon-02', 'icon-03', 'chart-01', 'chart-02', 'chart-03'];
const noop = () => {};

function footer(t: MetricItemType) {
  return t === 'icon-03' || t === 'chart-02' || t === 'chart-03' ? (
    <div className="flex w-full items-center justify-between">
      <Button size="sm" hierarchy="tertiary-gray" iconLeading={Settings01} aria-label="Settings" />
      <Button size="sm" hierarchy="secondary-gray">View report</Button>
    </div>
  ) : (
    <Button hierarchy="link-color" iconTrailing={ArrowRight}>View all</Button>
  );
}

export default function MetricsDemo() {
  return (
    <Section id="metrics" title="Metrics" figma="Metrics/Metric item · _Change · _Chart mini">
      <Row label="metric item · actions=false" className="grid grid-cols-3 items-start gap-6">
        {types.map((t) => (
          <MetricItem
            key={t}
            type={t}
            title="Views 24 hours"
            value="2,000"
            change="100%"
            changeText="vs last month"
            icon={t === 'icon-01' || t === 'icon-02' ? Users01 : BarChart01}
            onMenuClick={noop}
          />
        ))}
      </Row>
      <Row label="metric item · actions=true · negative" className="grid grid-cols-3 items-start gap-6">
        {types.map((t) => (
          <MetricItem
            key={t}
            type={t}
            trend="negative"
            title="Views 24 hours"
            value="2,000"
            change="12%"
            changeText="vs last month"
            icon={BarChart01}
            onMenuClick={noop}
            actions={footer(t)}
          />
        ))}
      </Row>
      <Row label="mobile width (343)" className="flex flex-wrap items-start gap-6 [&>*]:w-[343px]">
        <MetricItem type="simple" title="Views 24 hours" value="2,000" change="100%" onMenuClick={noop} />
        <MetricItem type="chart-01" title="Views 24 hours" value="2,000" change="100%" changeText="vs last month" onMenuClick={noop} />
      </Row>
      <Row label="_Change 01 / 02 · positive / negative">
        <MetricChange type="01">100%</MetricChange>
        <MetricChange type="02">100%</MetricChange>
        <MetricChange type="01" trend="negative">100%</MetricChange>
        <MetricChange type="02" trend="negative">100%</MetricChange>
      </Row>
      {(['positive', 'negative'] as const).map((tr) => (
        <Row key={tr} label={`_Chart mini · ${tr}`} className="flex flex-wrap items-center gap-8">
          {(['wavy', 'realistic', 'straight', 'layers'] as MiniChartType[]).map((t) => (
            <MiniChart key={t} type={t} trend={tr} label={`${t} ${tr}`} />
          ))}
        </Row>
      ))}
    </Section>
  );
}
