import { ContentDivider, type ContentDividerStyle } from '../../src/components/content-divider';
import { AlignCenter, AlignLeft, AlignRight, Plus } from '../../src/icons';
import { Section, Row } from '../ui';

const styles: ContentDividerStyle[] = ['single-line', 'dual-line', 'background-fill'];

export default function ContentDividersDemo() {
  return (
    <Section id="content-dividers" title="Content dividers" figma="Content dividers/Content divider">
      {styles.map((v) => (
        <Row key={v} label={v} className="flex flex-col gap-6">
          <ContentDivider variant={v} type="text">Today</ContentDivider>
          <ContentDivider variant={v} type="heading">Notifications</ContentDivider>
          <ContentDivider variant={v} type="button" icon={Plus}>Button</ContentDivider>
          <ContentDivider variant={v} type="button-icon" icon={Plus} buttonLabel="Add" />
          <ContentDivider
            variant={v}
            type="button-group"
            items={[{ label: 'Leading' }, { label: 'Middle' }, { label: 'Trailing' }]}
          />
          <ContentDivider
            variant={v}
            type="button-group-icon"
            items={[{ icon: AlignLeft, 'aria-label': 'Left' }, { icon: AlignCenter, 'aria-label': 'Center' }, { icon: AlignRight, 'aria-label': 'Right' }]}
          />
        </Row>
      ))}
    </Section>
  );
}
