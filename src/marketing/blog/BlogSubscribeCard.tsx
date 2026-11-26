import { forwardRef, useId, type FormEvent, type FormHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Mail01 } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { Input } from '../../components/inputs/Input';
import { blogSubscribeDefaults as D } from './defaults';

export interface BlogSubscribeCardProps extends Omit<FormHTMLAttributes<HTMLFormElement>, 'title' | 'onSubmit'> {
  /** Figma: Type — `default` (bordered card) or `line` (brand top border). */
  type?: 'default' | 'line';
  title?: ReactNode;
  supportingText?: ReactNode;
  placeholder?: string;
  /** Hint under the email field. */
  hint?: ReactNode;
  buttonLabel?: ReactNode;
  /** Called with the entered email on submit. */
  onSubscribe?: (email: string) => void;
}

/** BlogSubscribeCard — Figma "Blog subscribe card": newsletter sign-up card shown inside blog grids / sidebars. */
export const BlogSubscribeCard = forwardRef<HTMLFormElement, BlogSubscribeCardProps>(function BlogSubscribeCard(
  { type = 'default', title = D.title, supportingText = D.supportingText, placeholder = D.placeholder, hint = D.hint, buttonLabel = D.button, onSubscribe, className, ...props },
  ref,
) {
  const id = useId();
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const v = new FormData(e.currentTarget).get('email');
    onSubscribe?.(typeof v === 'string' ? v : '');
  };
  return (
    <form
      ref={ref}
      aria-labelledby={`${id}-t`}
      onSubmit={submit}
      className={cx(
        'flex flex-col gap-8 bg-gray-50 px-6 pt-6 pb-10 md:px-8 md:pt-8',
        type === 'line' ? 'rounded-b-2xl border-t-4 border-brand-700' : 'rounded-2xl border border-gray-200 shadow-xs',
        className,
      )}
      {...props}
    >
      <FeaturedIcon icon={Mail01} size="xl" color="brand" theme="modern" />
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h3 id={`${id}-t`} className="text-display-xs font-semibold text-gray-900">{title}</h3>
          <p className="text-md text-gray-600">{supportingText}</p>
        </div>
        <div className="flex flex-col gap-4">
          <Input name="email" type="email" required aria-label="Email" placeholder={placeholder} hint={hint} />
          <Button type="submit" size="xl" className="w-full">{buttonLabel}</Button>
        </div>
      </div>
    </form>
  );
});
