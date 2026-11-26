import { ProgressBar, ProgressCircle } from '../../src/components/progress';
import { Section, Row } from '../ui';

export default function ProgressIndicatorsDemo() {
  return (
    <Section id="progress-indicators" title="Progress indicators" figma="Progress indicators/Progress bar · Progress circle">
      <Row label="progress bar" className="grid max-w-[320px] grid-cols-1 gap-8">
        <ProgressBar value={40} />
        <ProgressBar value={40} label="right" />
        <ProgressBar value={60} label="bottom" />
        <div className="pt-10">
          <ProgressBar value={70} label="top-floating" />
        </div>
        <div className="pb-10">
          <ProgressBar value={30} label="bottom-floating" />
        </div>
      </Row>
      <Row label="progress circle" className="flex flex-wrap items-end gap-8">
        {(['xxs', 'xs', 'sm', 'md', 'lg'] as const).map((s) => (
          <ProgressCircle key={s} size={s} value={40} label="Active users" />
        ))}
      </Row>
      <Row label="half circle" className="flex flex-wrap items-end gap-8">
        {(['xxs', 'xs', 'sm', 'md', 'lg'] as const).map((s) => (
          <ProgressCircle key={s} size={s} value={40} shape="half" label="Active users" />
        ))}
      </Row>
    </Section>
  );
}
