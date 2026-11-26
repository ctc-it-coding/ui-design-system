import {
  CheckIcon,
  FileTypeIcon,
  Flag,
  PaymentIcon,
  RatingStars,
  SocialIcon,
  StarIcon,
  fileTypes,
  flagCodes,
  paymentMethods,
  socialPlatforms,
  type CheckIconColor,
  type CheckIconSize,
  type CheckIconType,
} from '../../src/components/misc-icons';
import { Section, Row } from '../ui';

export default function MiscIconsDemo() {
  return (
    <Section id="misc-icons" title="Misc icons" figma="Misc icons/Social icon · Payment method icon · File type icon · Flags · Star icon · Check icon">
      <Row label="social · brand / gray">
        {socialPlatforms.map((p) => <SocialIcon key={p} platform={p} />)}
      </Row>
      <Row>
        {socialPlatforms.map((p) => <SocialIcon key={p} platform={p} variant="gray" />)}
      </Row>
      <Row label="social · white" className="flex flex-wrap gap-4 rounded-lg bg-gray-900 p-3">
        {socialPlatforms.map((p) => <SocialIcon key={p} platform={p} variant="white" />)}
      </Row>
      <Row label="payment method · md (+ sm / lg)">
        {paymentMethods.map((m) => <PaymentIcon key={m} method={m} />)}
      </Row>
      <Row>
        <PaymentIcon method="visa" size="sm" />
        <PaymentIcon method="visa" size="md" />
        <PaymentIcon method="visa" size="lg" />
        <PaymentIcon method="mastercard" size="lg" />
      </Row>
      {(['default', 'gray', 'solid'] as const).map((v) => (
        <Row key={v} label={`file type · ${v}`} className="flex flex-wrap gap-3">
          {fileTypes.map((t) => <FileTypeIcon key={t} type={t} variant={v} />)}
        </Row>
      ))}
      <Row label={`flags (${flagCodes.length})`} className="flex flex-wrap gap-2">
        {flagCodes.map((c) => <Flag key={c} code={c} />)}
      </Row>
      <Row label="star icon · fill 0–100 · yellow / gray">
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((f) => <StarIcon key={f} fill={f} />)}
        {[0, 30, 50, 80, 100].map((f) => <StarIcon key={'g' + f} fill={f} color="gray" />)}
        <RatingStars value={3.6} />
      </Row>
      {(['primary', 'gray', 'success'] as CheckIconColor[]).map((c) => (
        <Row key={c} label={`check icon · ${c}`}>
          {(['default', 'filled', 'line'] as CheckIconType[]).flatMap((t) =>
            (['xs', 'sm', 'md', 'lg'] as CheckIconSize[]).map((s) => <CheckIcon key={t + s} type={t} size={s} color={c} />),
          )}
        </Row>
      ))}
    </Section>
  );
}
