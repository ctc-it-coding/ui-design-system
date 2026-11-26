import { Section, Row } from '../ui';
import { TeamSection, TeamMember, type TeamSectionType, type TeamMemberType } from '../../src/marketing/team';

const types: TeamSectionType[] = [
  'simple-01', 'simple-02', 'simple-03', 'simple-04',
  'image-card-01', 'image-card-02', 'image-card-03', 'image-card-04',
  'image-glass-01', 'image-glass-02', 'image-glass-03', 'image-glass-04',
  'image-collage-01', 'image-collage-02',
];
const memberTypes: TeamMemberType[] = ['simple-left', 'simple-left-top', 'simple-center-aligned', 'image-top', 'image-left', 'image-glass-floating', 'image-glass-full-width'];

export default function MTeam() {
  return (
    <>
      <Section id="m-team-member" title="Team member" figma="_Team member">
        <div data-demo="team-member" className="grid grid-cols-1 items-start gap-8 md:grid-cols-3">
          {memberTypes.map((t, i) => (
            <div key={t} className={t === 'image-left' ? 'md:col-span-2' : ''}>
              <p className="mb-2 font-mono text-xs text-gray-400">{t}</p>
              <TeamMember type={t} tone={i % 2 ? 'warm' : 'cool'} />
            </div>
          ))}
        </div>
      </Section>
      <Section id="m-team-sections" title="Team sections" figma="Team section">
        {types.map((type) => (
          <Row key={type} label={`type="${type}"`} className="-mx-6 lg:-mx-10 flex flex-col">
            <div data-demo={type}>
              <TeamSection type={type} />
            </div>
          </Row>
        ))}
      </Section>
    </>
  );
}
