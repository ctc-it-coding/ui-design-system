import { Button } from '../../src/components/buttons';
import { EmptyState, EmptyStateIllustration, type EmptyStateIconType, type EmptyStateSize, type IllustrationStyle } from '../../src/components/empty-state';
import { Folder, Plus } from '../../src/icons';
import { Section, Row } from '../ui';

const sizes: EmptyStateSize[] = ['sm', 'md', 'lg'];
const types: EmptyStateIconType[] = ['featured-icon', 'illustration', 'file-type-icon'];
const styles: IllustrationStyle[] = ['cloud', 'credit-card', 'documents', 'box'];


export default function EmptyStatesDemo() {
  return (
    <Section id="empty-states" title="Empty states" figma="Empty states/Empty state · Illustration">
      {types.map((t) => (
        <Row key={t} label={t} className="grid grid-cols-3 gap-6">
          {sizes.map((s) => (
            <div key={s} className="flex justify-center overflow-hidden rounded-xl border border-gray-200 px-4 pt-6 pb-8">
              <EmptyState
                iconType={t}
                size={s}
                icon={t === 'file-type-icon' ? Folder : undefined}
                title="No projects found"
                description="Your search “Landing page design” did not match any projects. Please try again."
                actions={
                  <>
                    <Button size="lg" hierarchy="secondary-gray">Clear search</Button>
                    <Button size="lg" iconLeading={Plus}>New project</Button>
                  </>
                }
              />
            </div>
          ))}
        </Row>
      ))}
      <Row label="Illustrations — primary / gray (lg) and sizes">
        {styles.map((st) => (
          <EmptyStateIllustration key={st} type={st} color="primary" />
        ))}
        {styles.map((st) => (
          <EmptyStateIllustration key={`g${st}`} type={st} color="gray" />
        ))}
        <EmptyStateIllustration size="md" />
        <EmptyStateIllustration size="sm" color="gray" />
      </Row>
    </Section>
  );
}
