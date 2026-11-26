import { forwardRef, useState, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Tabs } from '../../components/tabs/Tabs';
import { Select } from '../../components/dropdowns/Select';
import { MarkerPin01 } from '../../icons';
import { MarketingSection, Container, ImagePlaceholder } from '../_shared';
import { KitHeading, sectionStack } from '../contact/_kit';
import { JobPost, type JobPostType } from './JobPost';
import { careersSectionCopy, jobCategories, jobGroups, jobLocations, jobPosts, simpleJobPosts, type JobCategory, type JobPostData } from './defaults';

export type CareersSectionType = 'simple-01' | 'simple-02' | 'simple-03' | 'simple-04' | 'card-01' | 'card-02' | 'card-03' | 'card-04';
/** Figma "Theme" — Simple 01–04 exist in Default / Gray dark / Brand, Card types only in Default. */
export type CareersSectionTheme = 'default' | 'gray-dark' | 'brand';

export interface CareersSectionProps {
  /** Figma: Type */
  type?: CareersSectionType;
  /** Figma: Theme */
  theme?: CareersSectionTheme;
  subheading?: ReactNode;
  title?: ReactNode;
  supportingText?: ReactNode;
  /** Job posts (flat list types). */
  jobs?: JobPostData[];
  /** Category tabs (Card 01); `id: "all"` shows everything. */
  categories?: JobCategory[];
  /** Grouped jobs (Card 03 / Card 04). */
  groups?: (JobCategory & { jobs: JobPostData[] })[];
  /** Location filter options (Card 02 / Card 04). */
  locations?: string[];
  /** Called when the location filter changes. */
  onLocationChange?: (location: string) => void;
  /** Photo for the image types. */
  imageSrc?: string;
  id?: string;
  className?: string;
}

function Post({ job, type }: { job: JobPostData; type: JobPostType }) {
  return (
    <JobPost
      type={type}
      title={job.title}
      badge={job.badge ?? null}
      badgeColor={job.badgeColor}
      department={job.department ?? null}
      description={job.description ?? null}
      location={job.location ?? null}
      country={job.country ?? null}
      flag={job.flag}
      workType={job.workType ?? null}
      salary={job.salary ?? null}
      href={job.href}
    />
  );
}

function LocationFilter({ label, locations, onChange }: { label: string; locations: string[]; onChange?: (l: string) => void }) {
  return (
    <div className="flex w-full items-center gap-4 sm:w-auto sm:justify-end">
      <span className={cx('shrink-0 font-medium text-gray-600', label.endsWith(':') ? 'text-md' : 'text-lg md:text-xl')}>{label}</span>
      <Select
        className="w-full sm:w-60"
        items={locations.map((l) => ({ value: l, label: l }))}
        defaultValue={locations[0]}
        iconLeading={MarkerPin01}
        onChange={(v) => onChange?.(v)}
      />
    </div>
  );
}

/** CareersSection — Figma "Careers section" (8 types): open positions lists, tabs / location filter, grouped cards. */
export const CareersSection = forwardRef<HTMLElement, CareersSectionProps>(function CareersSection(props, ref) {
  const { type = 'simple-01', theme = 'default', id, className } = props;
  const [tab, setTab] = useState(props.categories?.[0]?.id ?? 'all');
  const copy = careersSectionCopy[type] ?? {};
  const h = {
    subheading: props.subheading !== undefined ? props.subheading : copy.subheading,
    title: props.title !== undefined ? props.title : copy.title,
    supportingText: props.supportingText !== undefined ? props.supportingText : copy.supportingText,
  };
  const simpleJobs = props.jobs ?? simpleJobPosts;
  const cardJobs = props.jobs ?? jobPosts;
  const groups = props.groups ?? jobGroups;
  const locations = props.locations ?? jobLocations;
  const sectionTheme = type.startsWith('card') ? 'default' : theme;

  let body: ReactNode;
  switch (type) {
    case 'simple-01':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
            {simpleJobs.slice(0, props.jobs ? undefined : 5).map((j, i) => <Post key={i} job={j} type="simple" />)}
          </div>
        </Container>
      );
      break;
    case 'simple-02':
    case 'card-02':
      body = (
        <Container className="flex flex-col gap-12 lg:flex-row lg:gap-16">
          <KitHeading {...h} className="lg:flex-1" />
          <div className={cx('flex flex-col lg:flex-1', type === 'card-02' ? 'gap-6' : 'gap-8')}>
            {type === 'card-02' && <LocationFilter label="Filter by location" locations={locations} onChange={props.onLocationChange} />}
            {(type === 'card-02' ? cardJobs : simpleJobs).slice(0, props.jobs ? undefined : 5).map((j, i) => <Post key={i} job={j} type={type === 'card-02' ? 'card-01' : 'simple'} />)}
          </div>
        </Container>
      );
      break;
    case 'simple-03':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="grid grid-cols-1 gap-y-8 md:grid-cols-2 md:gap-x-16 md:gap-y-12">
            {simpleJobs.map((j, i) => <Post key={i} job={j} type="simple" />)}
          </div>
        </Container>
      );
      break;
    case 'simple-04':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} />
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-col gap-8 lg:flex-1">
              {simpleJobs.slice(0, props.jobs ? undefined : 4).map((j, i) => <Post key={i} job={j} type="simple" />)}
            </div>
            <ImagePlaceholder src={props.imageSrc} tone="gray" className="h-60 w-full md:h-[624px] lg:flex-1" />
          </div>
        </Container>
      );
      break;
    case 'card-01': {
      const cats = props.categories ?? jobCategories;
      const shown = tab === 'all' ? cardJobs.slice(0, props.jobs ? undefined : 5) : cardJobs.filter((j) => j.category === tab);
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" />
          <div className="flex flex-col items-center gap-8 md:gap-12">
            <div className="flex max-w-full justify-center overflow-x-auto">
              <Tabs
                type="button-white-border"
                size="md"
                items={cats.map((c) => ({ id: c.id, label: c.label }))}
                value={tab}
                onChange={setTab}
                mobileSelect
                aria-label="Job categories"
              />
            </div>
            <div className="flex w-full max-w-3xl flex-col gap-6">
              {shown.map((j, i) => <Post key={`${tab}-${i}`} job={j} type="card-01" />)}
              {shown.length === 0 && <p className="text-center text-md text-gray-600">No open positions in this team right now.</p>}
            </div>
          </div>
        </Container>
      );
      break;
    }
    case 'card-03':
      body = (
        <Container className={sectionStack}>
          <KitHeading {...h} align="center" badge={{ color: 'brand' }} />
          <ImagePlaceholder src={props.imageSrc} tone="gray" className="h-60 w-full md:h-[560px]" />
          <div className="mx-auto flex w-full max-w-3xl flex-col gap-12 md:gap-16">
            {groups.map((g) => (
              <div key={g.id} className="flex flex-col gap-6 md:gap-8">
                <h3 className="text-lg font-medium text-gray-900 md:text-xl">{g.label}</h3>
                <div className="flex flex-col gap-6">{g.jobs.map((j, i) => <Post key={i} job={j} type="card-02" />)}</div>
              </div>
            ))}
          </div>
        </Container>
      );
      break;
    case 'card-04':
      body = (
        <Container className={sectionStack}>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <KitHeading {...h} />
            <LocationFilter label="Location:" locations={locations} onChange={props.onLocationChange} />
          </div>
          <div className="flex flex-col gap-12">
            {groups.map((g) => (
              <div key={g.id} className="flex flex-col gap-8 border-t border-gray-200 pt-8 md:gap-8 md:pt-12 lg:flex-row lg:justify-between">
                <div className="flex flex-col gap-2 lg:w-80">
                  <h3 className="text-lg font-medium text-gray-900 md:text-xl">{g.label}</h3>
                  {g.description && <p className="text-md text-gray-600">{g.description}</p>}
                </div>
                <div className="flex flex-col gap-6 lg:w-[768px]">{g.jobs.map((j, i) => <Post key={i} job={j} type="card-02" />)}</div>
              </div>
            ))}
          </div>
          <ImagePlaceholder src={props.imageSrc} tone="gray" className="h-60 w-full md:h-[480px]" />
        </Container>
      );
      break;
  }

  return (
    <MarketingSection ref={ref} id={id} theme={sectionTheme} className={className}>
      {body}
    </MarketingSection>
  );
});
