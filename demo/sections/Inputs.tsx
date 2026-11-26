import { Input, InputSelect, Textarea, TagInput, VerificationCodeInput } from '../../src/components/inputs';
import { Button } from '../../src/components/buttons';
import { Copy01, Mail01 } from '../../src/icons';
import { Section, Row } from '../ui';

const grid = 'grid grid-cols-3 items-start gap-8';
function CardMark() {
  return (
    <span className="flex h-6 w-[34px] items-center justify-center rounded border border-gray-100 bg-white">
      <span className="size-3 rounded-full bg-error-500" />
      <span className="-ml-1 size-3 rounded-full bg-warning-400/90" />
    </span>
  );
}

export default function InputsDemo() {
  return (
    <Section id="inputs" title="Inputs" figma="Inputs/Input field · Textarea input field · Verification code input field">
      {(['md', 'sm'] as const).map((s) => (
        <Row key={s} label={`size ${s} · default / filled / disabled`} className={grid}>
          <Input size={s} label="Email" placeholder="olivia@untitledui.com" hint="This is a hint text to help user." tooltip="We'll never share your email." />
          <Input size={s} label="Email" defaultValue="olivia@untitledui.com" hint="This is a hint text to help user." tooltip="Help" iconLeading={Mail01} />
          <Input size={s} label="Email" placeholder="olivia@untitledui.com" hint="This is a hint text to help user." disabled iconLeading={Mail01} />
        </Row>
      ))}
      <Row label="destructive / focused" className={grid}>
        <Input label="Email" placeholder="olivia@untitledui.com" error="This is an error message." />
        <Input label="Email" defaultValue="olivia@untitledui.com" iconLeading={Mail01} error="This is an error message." />
        <Input label="Email" defaultValue="olivia@untitledui.com" autoFocus hint="Focused state (autoFocus)." tooltip="Help" />
      </Row>
      <Row label="leading dropdown / trailing dropdown / leading text" className={grid}>
        <Input label="Phone number" placeholder="+1 (555) 000-0000" hint="This is a hint text to help user." tooltip="Help" leadingDropdown={<InputSelect options={['US', 'CA', 'EU']} aria-label="Country" />} />
        <Input label="Sale amount" placeholder="1,000.00" prefixText="$" hint="This is a hint text to help user." tooltip="Help" trailingDropdown={<InputSelect side="trailing" options={['USD', 'EUR', 'GBP']} aria-label="Currency" />} />
        <Input label="Website" placeholder="www.untitledui.com" leadingText="http://" hint="This is a hint text to help user." tooltip="Help" />
      </Row>
      <Row label="sm · leading dropdown / payment input / trailing button" className={grid}>
        <Input size="sm" label="Phone number" placeholder="+1 (555) 000-0000" leadingDropdown={<InputSelect size="sm" options={['US', 'CA']} aria-label="Country" />} error="This is an error message." />
        <Input label="Card number" placeholder="Card number" paymentIcon={<CardMark />} hint="This is a hint text to help user." tooltip="Help" />
        <Input label="Website" placeholder="www.untitledui.com" hint="This is a hint text to help user." trailingButton={<Button size="lg" hierarchy="secondary-gray" iconLeading={Copy01}>Copy</Button>} />
      </Row>
      <Row label="tags / textarea / textarea tags" className={grid}>
        <TagInput label="Users" placeholder="Add users" defaultValue={['Olivia', 'Phoenix']} hint="Type and press Enter to add." tooltip="Help" />
        <Textarea label="Description" placeholder="Enter a description..." hint="This is a hint text to help user." />
        <TagInput multiline label="Tags" placeholder="Add tags..." defaultValue={['Design', 'Software']} hint="This is a hint text to help user." />
      </Row>
      <Row label="textarea · destructive / disabled · tags sm destructive" className={grid}>
        <Textarea label="Description" defaultValue="A little about the company and the team that you'll be working with." error="This is an error message." />
        <Textarea label="Description" placeholder="Enter a description..." disabled hint="This is a hint text to help user." />
        <TagInput size="sm" label="Users" placeholder="Add users" defaultValue={['Olivia']} error="This is an error message." />
      </Row>
      <Row label="verification code · sm / md / lg" className="flex flex-col items-start gap-8">
        <VerificationCodeInput size="sm" digits={4} label="Secure code" hint="This is a hint text to help user." defaultValue="12" />
        <VerificationCodeInput size="md" digits={6} label="Secure code" hint="This is a hint text to help user." />
        <VerificationCodeInput size="lg" digits={4} label="Secure code" defaultValue="1234" />
        <VerificationCodeInput size="sm" digits={6} label="Secure code" disabled />
      </Row>
    </Section>
  );
}
