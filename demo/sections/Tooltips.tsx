import { Tooltip, TooltipBubble, HelpIcon } from '../../src/components/tooltips';
import { Button } from '../../src/components/buttons';
import { Section, Row } from '../ui';

const sup = 'Tooltips are used to describe or identify an element. In most scenarios, tooltips help the user understand meaning, function or alt-text.';
const arrows = [
  ['none', 'center'],
  ['bottom', 'center'],
  ['bottom', 'start'],
  ['bottom', 'end'],
  ['top', 'center'],
  ['left', 'center'],
  ['right', 'center'],
] as const;

export default function TooltipsDemo() {
  return (
    <Section id="tooltips" title="Tooltips" figma="Tooltips/Tooltip · Help icon">
      {(['dark', 'light'] as const).map((theme) => (
        <div key={theme} className="flex flex-col gap-6">
          <Row label={`${theme} · arrow variants`} className="flex flex-wrap items-center gap-8 bg-gray-50 p-6">
            {arrows.map(([side, align]) => (
              <TooltipBubble key={side + align} theme={theme} title="This is a tooltip" arrowSide={side} arrowAlign={align} />
            ))}
          </Row>
          <Row label={`${theme} · supporting text`} className="flex flex-wrap items-start gap-8 bg-gray-50 p-6">
            <TooltipBubble theme={theme} title="This is a tooltip" supportingText={sup} arrowSide="bottom" className="w-80" />
            <TooltipBubble theme={theme} title="This is a tooltip" supportingText={sup} arrowSide="left" className="w-80" />
          </Row>
        </div>
      ))}
      <Row label="interactive (hover / focus)" className="flex flex-wrap items-center gap-6 pt-28 pb-28">
        <Tooltip title="This is a tooltip" defaultOpen>
          <Button hierarchy="secondary-gray">Top (open)</Button>
        </Tooltip>
        <Tooltip title="This is a tooltip" placement="bottom" defaultOpen>
          <Button hierarchy="secondary-gray">Bottom (open)</Button>
        </Tooltip>
        <Tooltip title="This is a tooltip" placement="right" theme="light" defaultOpen>
          <Button hierarchy="secondary-gray">Right light</Button>
        </Tooltip>
        <div className="w-40" />
        <Tooltip title="This is a tooltip" placement="left">
          <Button hierarchy="secondary-gray">Left</Button>
        </Tooltip>
        <Tooltip title="This is a tooltip" supportingText={sup} align="start">
          <Button hierarchy="secondary-gray">With supporting text</Button>
        </Tooltip>
        <HelpIcon title="This is a tooltip" />
        <HelpIcon title="This is a tooltip" supportingText={sup} placement="bottom" />
      </Row>
    </Section>
  );
}
