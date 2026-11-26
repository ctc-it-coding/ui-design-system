import { forwardRef, useId, type FormEvent, type FormHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Button } from '../../components/buttons/Button';
import { Checkbox } from '../../components/checkboxes/Checkbox';
import { Input } from '../../components/inputs/Input';
import { Textarea } from '../../components/inputs/Textarea';
import { InputSelect } from '../../components/inputs/Field';

export interface ContactFormProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  /** Show the "Phone number" field with a country dropdown (Figma Input Type=Leading dropdown). */
  phone?: boolean;
  /** Service checkboxes (Figma "Services" group). Omit / empty to hide. */
  services?: string[];
  /** Privacy-policy checkbox label; `false` hides it. */
  privacy?: ReactNode | false;
  /** Submit button label (Figma "Send message"). */
  submitLabel?: ReactNode;
  /** Country codes for the phone dropdown. */
  countries?: string[];
  /** Called with the form values on submit (default browser submit is prevented). */
  onSubmit?: (values: Record<string, FormDataEntryValue | FormDataEntryValue[]>, event: FormEvent<HTMLFormElement>) => void;
}

const defaultPrivacy = (
  <>
    You agree to our friendly{' '}
    <a href="#" className="underline underline-offset-2 hover:text-gray-700">
      privacy policy
    </a>
    .
  </>
);

/** ContactForm — the form used by Contact sections (first / last name, email, phone, message, services, privacy). */
export const ContactForm = forwardRef<HTMLFormElement, ContactFormProps>(function ContactForm(
  { phone = true, services, privacy = defaultPrivacy, submitLabel = 'Send message', countries = ['US', 'CA', 'EU', 'AU'], onSubmit, className, ...props },
  ref,
) {
  const id = useId();
  const handle = (e: FormEvent<HTMLFormElement>) => {
    if (!onSubmit) return;
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const values: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};
    fd.forEach((v, key) => {
      const prev = values[key];
      values[key] = prev === undefined ? v : Array.isArray(prev) ? [...prev, v] : [prev, v];
    });
    onSubmit(values, e);
  };
  return (
    <form ref={ref} onSubmit={handle} className={cx('flex w-full flex-col gap-8', className)} {...props}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-6 md:flex-row md:gap-8">
          <Input label="First name" name="firstName" placeholder="First name" autoComplete="given-name" className="flex-1" />
          <Input label="Last name" name="lastName" placeholder="Last name" autoComplete="family-name" className="flex-1" />
        </div>
        <Input label="Email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
        {phone && (
          <Input
            label="Phone number"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            autoComplete="tel"
            leadingDropdown={<InputSelect aria-label="Country" name="country" options={countries} />}
          />
        )}
        <Textarea label="Message" name="message" placeholder="Leave us a message..." rows={5} textareaClassName="min-h-[110px]" />
        {services && services.length > 0 && (
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-4 text-sm font-medium text-gray-700">Services</legend>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-16">
              {services.map((s, i) => (
                <Checkbox size="md" key={s} id={`${id}-svc-${i}`} name="services" value={s} label={s} />
              ))}
            </div>
          </fieldset>
        )}
        {privacy !== false && privacy != null && <Checkbox size="md" name="privacy" value="yes" label={<span className="font-normal text-gray-600">{privacy}</span>} />}
      </div>
      <Button type="submit" size="xl" hierarchy="primary" className="w-full">
        {submitLabel}
      </Button>
    </form>
  );
});
