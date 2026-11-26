import { LoadingIndicator, type LoadingIndicatorSize, type LoadingIndicatorStyle } from '../../src/components/loading';
import { Section, Row } from '../ui';

const styles: LoadingIndicatorStyle[] = ['line-simple', 'line-spinner', 'dot-circle'];
const sizes: LoadingIndicatorSize[] = ['sm', 'md', 'lg', 'xl'];

export default function LoadingIndicatorsDemo() {
  return (
    <Section id="loading-indicators" title="Loading indicators" figma="Loading indicators/Loading indicator">
      {styles.map((st) => (
        <Row key={st} label={st} className="flex flex-wrap items-end gap-16">
          {sizes.map((s) => (
            <LoadingIndicator key={s} variant={st} size={s} label="Loading..." />
          ))}
          <LoadingIndicator variant={st} size="md" />
        </Row>
      ))}
    </Section>
  );
}
