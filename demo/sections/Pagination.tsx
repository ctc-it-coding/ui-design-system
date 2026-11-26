import { useState } from 'react';
import { Pagination, PaginationDots, CarouselArrow, CarouselImage, type PaginationType } from '../../src/components/pagination';
import { Section, Row } from '../ui';

const types: PaginationType[] = [
  'page-default',
  'page-minimal-center',
  'card-default',
  'card-minimal-left',
  'card-minimal-center',
  'card-minimal-right',
  'card-button-group-left',
  'card-button-group-center',
  'card-button-group-right',
];

const slide = (from: string, to: string, label: string) => ({
  content: (
    <div className={`flex size-full items-center justify-center bg-linear-to-br ${from} ${to} text-display-xs font-semibold text-white`}>{label}</div>
  ),
});
const slides = [slide('from-brand-400', 'to-brand-700', 'Slide 1'), slide('from-blue-400', 'to-indigo-700', 'Slide 2'), slide('from-pink-400', 'to-orange-500', 'Slide 3')];

export default function PaginationDemo() {
  const [page, setPage] = useState(1);
  return (
    <Section id="pagination" title="Pagination" figma="Pagination · Pagination dot group · _Carousel arrow · Carousel image">
      {types.map((t) => (
        <Row key={t} label={t} className="flex flex-col">
          <Pagination type={t} total={10} defaultPage={t === 'card-default' ? 5 : 1} />
        </Row>
      ))}
      <Row label="shape circle · controlled" className="flex flex-col">
        <Pagination type="card-default" shape="circle" total={10} page={page} onPageChange={setPage} />
        <Pagination type="page-default" shape="circle" total={4} page={Math.min(page, 4)} onPageChange={setPage} />
      </Row>
      <Row label="dot groups (dot / line × md / lg, framed)">
        <PaginationDots count={3} />
        <PaginationDots count={3} size="lg" />
        <PaginationDots count={3} dotStyle="line" />
        <PaginationDots count={3} dotStyle="line" size="lg" />
        <div className="flex flex-wrap gap-4 rounded-lg bg-gray-400 p-4">
          <PaginationDots framed count={3} />
          <PaginationDots framed count={3} size="lg" />
          <PaginationDots framed count={3} dotStyle="line" />
          <PaginationDots framed count={3} dotStyle="line" size="lg" />
        </div>
      </Row>
      <Row label="carousel arrows">
        <div className="flex gap-3 rounded-lg bg-gray-400 p-4">
          <CarouselArrow direction="left" />
          <CarouselArrow direction="right" />
          <CarouselArrow direction="left" size="lg" />
          <CarouselArrow direction="right" size="lg" />
        </div>
      </Row>
      <Row label="carousel image md / lg" className="grid gap-6 md:grid-cols-2">
        <CarouselImage slides={slides} />
        <CarouselImage slides={slides} size="lg" defaultIndex={1} />
      </Row>
    </Section>
  );
}
