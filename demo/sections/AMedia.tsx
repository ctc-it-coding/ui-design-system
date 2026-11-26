import { CreditCardMockup, PlayButton, VideoPlayer, creditCardThemes } from '../../src/components/media';
import { Section, Row } from '../ui';

export default function MediaDemo() {
  return (
    <Section id="media" title="Media" figma="Video player · _Video progress · _Play button · Credit card mockup">
      <Row label="Video player · lg paused / lg playing (simulated) / sm" className="flex flex-wrap items-start gap-6">
        <VideoPlayer />
        <VideoPlayer defaultPlaying />
        <VideoPlayer size="sm" />
        <VideoPlayer size="sm" playButton="outline" title="Onboarding tour" label="Part 2" />
      </Row>
      <Row label="Play button · glassmorphism / outline / pause" className="flex gap-6 rounded-xl bg-gradient-to-br from-brand-400 to-pink-300 p-6">
        <PlayButton />
        <PlayButton variant="outline" />
        <PlayButton playing />
        <PlayButton variant="outline" playing size={56} />
      </Row>
      <Row label="Credit card mockup · all themes" className="flex flex-wrap gap-6 rounded-xl bg-gray-100 p-6">
        {creditCardThemes.map((t) => (
          <div key={t} className="flex flex-col gap-1">
            <CreditCardMockup theme={t} />
            <span className="text-xs text-gray-500">{t}</span>
          </div>
        ))}
      </Row>
      <Row label="Lines=True · custom props · width 420" className="flex flex-wrap gap-6 p-2">
        <CreditCardMockup theme="brand-dark" lines width={420} className="max-w-full" cardHolder="JANE COOPER" cardNumber="4242 4242 4242 4242" expiry="11/28" company="Tinicorn" />
        <CreditCardMockup theme="gray-light" lines />
        <CreditCardMockup theme="transparent-gradient" lines />
      </Row>
    </Section>
  );
}
