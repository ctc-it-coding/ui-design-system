import { ButtonGroup, ButtonGroupItem } from '../../src/components/button-groups';
import { Plus, Placeholder } from '../../src/icons';
import { Section, Row } from '../ui';

export default function ButtonGroupsDemo() {
  return (
    <Section id="button-groups" title="Button groups" figma="Button groups/Button group · _Button group base">
      <Row label="text (selectable)">
        <ButtonGroup defaultValue="a">
          <ButtonGroupItem value="a">Text</ButtonGroupItem>
          <ButtonGroupItem value="b">Text</ButtonGroupItem>
          <ButtonGroupItem value="c">Text</ButtonGroupItem>
        </ButtonGroup>
      </Row>
      <Row label="icon leading">
        <ButtonGroup>
          <ButtonGroupItem current iconLeading={Plus}>Text</ButtonGroupItem>
          <ButtonGroupItem iconLeading={Plus}>Text</ButtonGroupItem>
          <ButtonGroupItem iconLeading={Plus}>Text</ButtonGroupItem>
        </ButtonGroup>
      </Row>
      <Row label="dot">
        <ButtonGroup>
          <ButtonGroupItem current dot>Text</ButtonGroupItem>
          <ButtonGroupItem dot>Text</ButtonGroupItem>
          <ButtonGroupItem dot>Text</ButtonGroupItem>
        </ButtonGroup>
      </Row>
      <Row label="icon only">
        <ButtonGroup>
          <ButtonGroupItem current iconLeading={Placeholder} aria-label="One" />
          <ButtonGroupItem iconLeading={Placeholder} aria-label="Two" />
          <ButtonGroupItem iconLeading={Placeholder} aria-label="Three" />
        </ButtonGroup>
      </Row>
      <Row label="disabled">
        <ButtonGroup>
          <ButtonGroupItem current disabled>Text</ButtonGroupItem>
          <ButtonGroupItem disabled>Text</ButtonGroupItem>
          <ButtonGroupItem>Text</ButtonGroupItem>
        </ButtonGroup>
      </Row>
    </Section>
  );
}
