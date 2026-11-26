import { CloseButton, SocialButton, SocialButtonGroup, type SocialButtonPlatform } from '../../src/components/buttons';
import { Section, Row } from '../ui';

const platforms: SocialButtonPlatform[] = ['google', 'facebook', 'apple', 'figma', 'dribbble', 'x'];

export default function SocialButtonsDemo() {
  return (
    <Section id="social-buttons" title="Social buttons & close X" figma="Buttons/Social button · Social button groups · Button close X">
      {(['brand', 'color', 'gray'] as const).map((t) => (
        <div key={t} className="flex flex-col gap-3">
          <Row label={`theme ${t}`}>
            {platforms.map((p) => <SocialButton key={p} platform={p} theme={t} />)}
          </Row>
          <Row label={`theme ${t} · icon only`}>
            {platforms.map((p) => <SocialButton key={p} platform={p} theme={t} supportingText={false} />)}
          </Row>
        </div>
      ))}
      <Row label="social button groups" className="grid grid-cols-3 gap-8">
        <SocialButtonGroup theme="color" className="max-w-[360px]" />
        <SocialButtonGroup theme="gray" className="max-w-[360px]" />
        <SocialButtonGroup theme="brand" className="max-w-[360px]" />
        <SocialButtonGroup variant="icons" theme="color" className="max-w-[360px]" />
        <SocialButtonGroup variant="icons" theme="gray" className="max-w-[360px]" />
        <SocialButtonGroup variant="icons" theme="brand" className="max-w-[360px]" />
      </Row>
      <Row label="close X (light / dark background)">
        <CloseButton size="sm" />
        <CloseButton size="md" />
        <CloseButton size="lg" />
        <div className="flex gap-4 rounded-lg bg-gray-900 p-3">
          <CloseButton size="sm" dark />
          <CloseButton size="md" dark />
          <CloseButton size="lg" dark />
        </div>
      </Row>
    </Section>
  );
}
