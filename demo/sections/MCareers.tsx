import { Section, Row } from '../ui';
import { CareersSection, JobPost, type CareersSectionType } from '../../src/marketing/careers';

const types: CareersSectionType[] = ['simple-01', 'simple-02', 'simple-03', 'simple-04', 'card-01', 'card-02', 'card-03', 'card-04'];

export default function MCareers() {
  return (
    <>
      <Section id="m-job-post" title="Job post" figma="_Job post">
        <div data-demo="job-post" className="flex max-w-3xl flex-col gap-6">
          <JobPost type="simple" />
          <JobPost type="card-01" />
          <JobPost type="card-02" />
        </div>
      </Section>
      <Section id="m-careers-sections" title="Careers sections" figma="Careers section">
        {types.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={type}>
              <CareersSection type={type} />
            </div>
          </Row>
        ))}
        <Row label='type="simple-01" — gray-dark / brand' className="-mx-6 lg:-mx-10 flex flex-col">
          <div data-demo="themes">
            <CareersSection type="simple-01" theme="gray-dark" />
            <CareersSection type="simple-02" theme="brand" />
          </div>
        </Row>
      </Section>
    </>
  );
}
