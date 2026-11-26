import {
  ProgressIconsCentered,
  ProgressIconsWithText,
  ProgressMinimalIcons,
  ProgressTextWithLine,
  Step,
  StepIcon,
  type ProgressStepItem,
  type StepSize,
  type StepStatus,
} from '../../src/components/progress-steps';
import { Flag05, Star01, User01, Users01 } from '../../src/icons';
import { Row, Section } from '../ui';

const sizes: StepSize[] = ['sm', 'md', 'lg'];
const statuses: StepStatus[] = ['incomplete', 'current', 'complete'];

const items: ProgressStepItem[] = [
  { title: 'Your details', description: 'Please provide your name and email', icon: User01 },
  { title: 'Company details', description: 'A few details about your company', icon: Flag05 },
  { title: 'Invite your team', description: 'Start collaborating with your team', icon: Users01 },
  { title: 'Add your socials', description: 'Share posts to your social accounts', icon: Star01 },
];

export default function ProgressStepsDemo() {
  return (
    <Section id="progress-steps" title="Progress steps" figma="_Step icon base · _Step base · Progress steps / *">
      <Row label="_Step icon base — incomplete / current / complete × sm / md / lg">
        {sizes.map((s) => statuses.map((st) => <StepIcon key={s + st} size={s} status={st} />))}
      </Row>

      <Row label="Progress minimal icons connected (sm / md / lg)" className="flex flex-col items-center gap-6">
        {sizes.map((s) => (
          <ProgressMinimalIcons key={s} size={s} steps={4} current={2} connected />
        ))}
      </Row>
      <Row label="Progress minimal icons (text on / off)" className="flex flex-col items-center gap-6">
        {sizes.map((s) => (
          <ProgressMinimalIcons key={s} size={s} steps={4} current={2} text={s !== 'sm'} />
        ))}
      </Row>

      <Row label="Progress text with line (sm / md / lg)" className="flex flex-col gap-8">
        {sizes.map((s) => (
          <ProgressTextWithLine key={s} size={s} items={items} current={1} />
        ))}
      </Row>

      <Row label="Progress icons centered — icon (sm / md / lg)" className="flex flex-col gap-10">
        {sizes.map((s) => (
          <ProgressIconsCentered key={s} size={s} items={items} current={1} className="mx-auto w-full max-w-[1008px]" />
        ))}
      </Row>
      <Row label="Progress icons centered — featured icon, 3 steps" className="flex flex-col gap-10">
        {sizes.map((s) => (
          <ProgressIconsCentered
            key={s}
            size={s}
            type="featured-icon"
            items={items.slice(0, 3)}
            current={1}
            className="mx-auto w-full max-w-[992px]"
          />
        ))}
      </Row>

      <Row label="Progress icons with text — vertical (icon sm / md / lg, featured md, no connector)" className="flex flex-wrap items-start gap-10">
        {sizes.map((s) => (
          <ProgressIconsWithText key={s} size={s} items={items} current={2} className="w-[360px]" />
        ))}
        <ProgressIconsWithText size="md" type="featured-icon" items={items} current={2} className="w-[360px]" />
        <ProgressIconsWithText size="sm" items={items} current={2} connector={false} className="w-[360px]" />
      </Row>

      <Row label="Text line / vertical mobile" className="flex flex-wrap items-start gap-10">
        <ProgressTextWithLine size="md" orientation="vertical" items={items} current={1} className="w-[343px]" />
        <ProgressIconsCentered size="md" orientation="vertical" type="featured-icon" items={items.slice(0, 3)} current={1} className="w-[343px]" />
        <div className="flex flex-col gap-4">
          {statuses.map((st) => (
            <Step key={st} type="icon-top" status={st} title="Your details" description="Please provide your name and email" className="w-[320px]" />
          ))}
        </div>
      </Row>
    </Section>
  );
}
