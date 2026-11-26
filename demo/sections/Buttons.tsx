import { Button, type ButtonHierarchy, type ButtonSize } from '../../src/components/buttons';
import { ArrowRight, Plus, Trash01 } from '../../src/icons';
import { Section, Row } from '../ui';

const hs: ButtonHierarchy[] = ['primary', 'secondary-gray', 'secondary-color', 'tertiary-gray', 'tertiary-color', 'link-gray', 'link-color'];
const sizes: ButtonSize[] = ['sm', 'md', 'lg', 'xl', '2xl'];

export default function ButtonsDemo() {
  return (
    <Section id="buttons" title="Buttons" figma="Buttons/Button · Buttons/Button destructive">
      {hs.map((h) => (
        <Row key={h} label={h}>
          <Button hierarchy={h} iconLeading={Plus}>Button CTA</Button>
          <Button hierarchy={h} iconTrailing={ArrowRight}>Button CTA</Button>
          <Button hierarchy={h} dot>Button CTA</Button>
          <Button hierarchy={h} iconLeading={Plus} aria-label="Add" />
          <Button hierarchy={h} disabled>Disabled</Button>
        </Row>
      ))}
      <Row label="sizes">{sizes.map((s) => <Button key={s} size={s} iconLeading={Plus}>Size {s}</Button>)}</Row>
      <Row label="icon only">{sizes.map((s) => <Button key={s} size={s} hierarchy="secondary-gray" iconLeading={Plus} aria-label="Add" />)}</Row>
      <Row label="destructive">
        {(['primary', 'secondary-gray', 'tertiary-gray', 'link-gray'] as const).map((h) => <Button key={h} destructive hierarchy={h} iconLeading={Trash01}>Delete</Button>)}
        <Button destructive disabled>Disabled</Button>
        <Button loading>Saving</Button>
      </Row>
    </Section>
  );
}
