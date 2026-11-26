import { CheckboxGroup, ChoiceCard, RadioGroup } from '../../src/components/checkboxes';
import { Button } from '../../src/components/buttons';
import { Badge } from '../../src/components/badges';
import { LayersTwo01, Zap } from '../../src/icons';
import { Section, Row } from '../ui';

const desc = 'Includes up to 10 users, 20GB individual data and access to all features.';
function Visa() {
  return (
    <span className="flex h-8 w-[46px] items-center justify-center rounded-md border border-gray-100 bg-white text-[11px] font-extrabold italic text-blue-dark-700">
      VISA
    </span>
  );
}

export default function CheckboxGroupsDemo() {
  return (
    <Section id="checkbox-groups" title="Checkbox groups" figma="Checkbox groups/Checkbox group · Checkbox group item">
      <Row label="radio button · checkbox (md)" className="grid grid-cols-2 items-start gap-8">
        <RadioGroup defaultValue="basic" size="md">
          <ChoiceCard type="radio-button" value="basic" title="Basic plan" subtext="$10/month" description={desc} />
          <ChoiceCard type="radio-button" value="business" title="Business plan" subtext="$20/month" description={desc} />
          <ChoiceCard type="radio-button" value="enterprise" title="Enterprise plan" subtext="$40/month" description={desc} disabled />
        </RadioGroup>
        <CheckboxGroup defaultValue={['basic', 'enterprise']} size="sm">
          <ChoiceCard type="checkbox" value="basic" title="Basic plan" subtext="$10/month" description={desc} />
          <ChoiceCard type="checkbox" value="business" title="Business plan" subtext="$20/month" description={desc} />
          <ChoiceCard type="checkbox" value="enterprise" title="Enterprise plan" subtext="$40/month" description={desc} disabled defaultChecked />
        </CheckboxGroup>
      </Row>
      <Row label="icon simple · avatar" className="grid grid-cols-2 items-start gap-8">
        <CheckboxGroup defaultValue={['basic']}>
          <ChoiceCard type="icon-simple" icon={LayersTwo01} value="basic" title="Basic plan" subtext="$10/month" description={desc} />
          <ChoiceCard type="icon-simple" icon={Zap} value="business" title="Business plan" subtext="$20/month" description={desc} />
        </CheckboxGroup>
        <CheckboxGroup defaultValue={['olivia']} size="sm">
          <ChoiceCard type="avatar" avatarInitials="OR" value="olivia" title="Olivia Rhye" subtext="@olivia" description="Product Manager, Integrations" />
          <ChoiceCard type="avatar" avatarInitials="PB" value="phoenix" title="Phoenix Baker" subtext="@phoenix" description="Engineering Manager" />
        </CheckboxGroup>
      </Row>
      <Row label="payment icon · icon card" className="grid grid-cols-2 items-start gap-8">
        <RadioGroup defaultValue="1234">
          {['1234', '5678'].map((n) => (
            <ChoiceCard
              key={n}
              type="payment-icon"
              value={n}
              paymentIcon={<Visa />}
              title={`Visa ending in ${n}`}
              description="Expiry 06/2024"
              actions={
                <>
                  <Button hierarchy="link-gray">Set as default</Button>
                  <Button hierarchy="link-color">Edit</Button>
                </>
              }
            />
          ))}
        </RadioGroup>
        <RadioGroup defaultValue="basic">
          <ChoiceCard type="icon-card" icon={LayersTwo01} value="basic" title="Basic plan" price="$10" period="per month" description={desc} badge={<Badge size="md" type="badge-modern" color="success" dot>Limited time only</Badge>} />
          <ChoiceCard type="icon-card" size="sm" icon={Zap} value="business" title="Business plan" price="$20" period="per month" description={desc} badge={<Badge size="sm" type="badge-modern" color="success" dot>Limited time only</Badge>} />
        </RadioGroup>
      </Row>
    </Section>
  );
}
