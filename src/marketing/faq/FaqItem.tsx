import { forwardRef, useId, useState, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { MinusCircle, PlusCircle } from '../../icons';
import { useMarketingTheme } from '../_shared';

export interface FaqItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onToggle'> {
  question?: ReactNode;
  answer?: ReactNode;
  /** Figma: Expanded (controlled). */
  expanded?: boolean;
  /** Initial state when uncontrolled. */
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
  /** Figma: Divider — top border + 24px padding. */
  divider?: boolean;
  /** Figma: Icon position */
  iconPosition?: 'left' | 'right';
  /** Static (always open, no toggle button) — used by the "Simple 04" grid. */
  static?: boolean;
  /** Heading level for the question. */
  headingLevel?: 'h3' | 'h4';
}

const themeCls = {
  light: { q: 'text-gray-900', a: 'text-gray-600', icon: 'text-gray-400', border: 'border-gray-200' },
  'gray-dark': { q: 'text-white', a: 'text-gray-200', icon: 'text-gray-400', border: 'border-gray-600' },
  brand: { q: 'text-white', a: 'text-brand-200', icon: 'text-brand-200', border: 'border-brand-600' },
} as const;

/** FaqItem — Figma "_FAQ item": accessible accordion item (button with aria-expanded + region). */
export const FaqItem = forwardRef<HTMLDivElement, FaqItemProps>(function FaqItem(
  {
    question = 'Is there a free trial available?',
    answer = 'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
    expanded,
    defaultExpanded = false,
    onExpandedChange,
    divider = false,
    iconPosition = 'right',
    static: isStatic = false,
    headingLevel: H = 'h3',
    className,
    ...props
  },
  ref,
) {
  const { theme } = useMarketingTheme();
  const c = theme === 'gray-dark' || theme === 'brand' ? themeCls[theme] : themeCls.light;
  const [inner, setInner] = useState(defaultExpanded);
  const open = isStatic || (expanded ?? inner);
  const id = useId();
  const toggle = () => {
    const next = !open;
    if (expanded === undefined) setInner(next);
    onExpandedChange?.(next);
  };
  const Icon = open ? MinusCircle : PlusCircle;
  const icon = !isStatic && (
    <span className="flex shrink-0 py-0.5" aria-hidden>
      <Icon className={cx('size-6', c.icon)} />
    </span>
  );

  return (
    <div ref={ref} data-expanded={open || undefined} className={cx('relative flex flex-col', divider && cx('border-t pt-6', c.border), className)} {...props}>
      <div className={cx('flex gap-6', iconPosition === 'left' && 'flex-row-reverse')}>
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <H className={cx('text-lg font-medium', c.q)}>
            {isStatic ? (
              question
            ) : (
              <button
                type="button"
                id={`${id}-q`}
                aria-expanded={open}
                aria-controls={`${id}-a`}
                onClick={toggle}
                className="w-full cursor-pointer rounded-sm text-left outline-none after:absolute after:inset-0 focus-visible:ring-4 focus-visible:ring-brand-500/24"
              >
                {question}
              </button>
            )}
          </H>
          <div id={`${id}-a`} role={isStatic ? undefined : 'region'} aria-labelledby={isStatic ? undefined : `${id}-q`} hidden={!open} className={cx('text-md', c.a)}>
            {answer}
          </div>
        </div>
        {icon}
      </div>
    </div>
  );
});
