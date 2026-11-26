import { Breadcrumbs, type BreadcrumbItem, type BreadcrumbsType } from '../../src/components/breadcrumbs';
import { Section, Row } from '../ui';

const items: BreadcrumbItem[] = [
  { label: 'Settings', href: '#' },
  { label: 'Projects', href: '#' },
  { label: 'Marketing', href: '#' },
  { label: 'Team' },
];
const types: BreadcrumbsType[] = ['text', 'text-with-line', 'button-brand', 'button-gray'];

export default function BreadcrumbsDemo() {
  return (
    <Section id="breadcrumbs" title="Breadcrumbs" figma="Breadcrumbs · _Breadcrumb button base">
      {types.map((t) => (
        <Row key={t} label={t} className="grid gap-8 md:grid-cols-2">
          <Breadcrumbs type={t} divider="slash" home="#" items={items} maxItems={3} />
          <Breadcrumbs type={t} divider="chevron" home="#" items={items} maxItems={3} />
        </Row>
      ))}
      <Row label="no collapse / without home" className="flex flex-col gap-4">
        <Breadcrumbs type="text" divider="chevron" home="#" items={items} />
        <Breadcrumbs type="button-gray" divider="slash" items={items} />
      </Row>
      <Row label="below md, middle crumbs collapse to …" className="flex flex-col gap-4">
        <p className="text-xs text-gray-500">Resize the viewport below 768px to see the collapsed “…” crumb.</p>
      </Row>
    </Section>
  );
}
