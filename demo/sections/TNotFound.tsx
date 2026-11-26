import { Section } from '../ui';
import { NotFoundSection, type NotFoundType } from '../../src/templates/not-found';

const types: NotFoundType[] = [
  'simple-01', 'simple-02', 'simple-03', 'simple-04', 'simple-05', 'simple-06',
  'split-image-01', 'split-image-02', 'split-image-03', 'split-image-04', 'split-image-05',
  'illustration', 'screen-mockup', 'under-maintenance',
];
const filter = typeof location !== 'undefined' ? location.hash.slice(1) : '';

export default function TNotFound() {
  return (
    <Section id="404" title="404 section" figma="Shared assets / 404 pages / 404 section">
      {types.filter((t) => !filter || t.includes(filter)).map((t) => (
        <div key={t} className="flex flex-col gap-2">
          <div className="font-mono text-xs text-gray-500">{`<NotFoundSection type="${t}" />`}</div>
          <div className="overflow-hidden rounded-xl ring-1 ring-gray-200">
            <NotFoundSection type={t} />
          </div>
        </div>
      ))}
    </Section>
  );
}
