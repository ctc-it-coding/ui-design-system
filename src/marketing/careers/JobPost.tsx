import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge, type BadgeColor } from '../../components/badges/Badge';
import { Button } from '../../components/buttons/Button';
import { Flag, type FlagCode } from '../../components/misc-icons/Flag';
import { ArrowUpRight, Clock, CurrencyDollarCircle, MarkerPin02 } from '../../icons';
import { useMarketingTheme } from '../_shared';

export type JobPostType = 'simple' | 'card-01' | 'card-02';

export interface JobPostProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  /** Figma: Type */
  type?: JobPostType;
  title?: ReactNode;
  /** Category badge label. */
  badge?: ReactNode;
  badgeColor?: BadgeColor;
  /** Department label above the title (Card 01). */
  department?: ReactNode;
  description?: ReactNode;
  /** Location (Simple / Card 01). */
  location?: ReactNode;
  /** Country badge text + flag (Card 02). */
  country?: ReactNode;
  flag?: FlagCode;
  /** Type of work, e.g. "Full-time". */
  workType?: ReactNode;
  /** Salary (Card 02). */
  salary?: ReactNode;
  /** Link to the job. */
  href?: string;
  /** Card 01 link label. */
  linkLabel?: ReactNode;
}

const dark = {
  'gray-dark': { title: 'text-white', text: 'text-gray-200', icon: 'text-gray-300', border: 'border-gray-600' },
  brand: { title: 'text-white', text: 'text-brand-200', icon: 'text-brand-400', border: 'border-brand-600' },
} as const;

/** JobPost — Figma "_Job post" (Simple / Card 01 / Card 02): an open position with badges and details. */
export const JobPost = forwardRef<HTMLElement, JobPostProps>(function JobPost(
  {
    type = 'simple',
    title = 'Product Designer',
    badge = 'Design',
    badgeColor = 'blue',
    department = 'Design',
    description = 'We’re looking for a mid-level product designer to join our team.',
    location = 'Remote',
    country = 'Melbourne, AU',
    flag = 'AU',
    workType = 'Full-time',
    salary = '80k - 100k',
    href = '#',
    linkLabel = 'View job',
    className,
    ...props
  },
  ref,
) {
  const { theme } = useMarketingTheme();
  const d = type === 'simple' && (theme === 'gray-dark' || theme === 'brand') ? dark[theme] : null;
  const c = d ?? { title: 'text-gray-900', text: 'text-gray-600', icon: 'text-gray-400', border: 'border-gray-200' };

  const detail = (Icon: typeof Clock, label: ReactNode) =>
    label != null ? (
      <span className={cx('flex items-center gap-2 text-md font-medium', c.text)}>
        <Icon className={cx('size-5 shrink-0', c.icon)} aria-hidden />
        {label}
      </span>
    ) : null;

  const titleEl = (
    <h3 className={cx('text-lg font-medium', c.title)}>
      <a href={href} className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-4 focus-visible:ring-brand-500/24">
        {title}
      </a>
    </h3>
  );
  const pill = badge != null ? <Badge size="md" type="pill-color" color={badgeColor} dot className="shrink-0">{badge}</Badge> : null;

  if (type === 'simple') {
    return (
      <article ref={ref} className={cx('relative flex flex-col gap-6 border-t pt-6', c.border, className)} {...props}>
        <div className="flex flex-col gap-4 md:gap-2">
          <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
            {titleEl}
            {pill}
          </div>
          {description != null && <p className={cx('text-md', c.text)}>{description}</p>}
        </div>
        <div className="flex flex-wrap items-center gap-5">
          {detail(MarkerPin02, location)}
          {detail(Clock, workType)}
        </div>
      </article>
    );
  }

  if (type === 'card-01') {
    return (
      <article ref={ref} className={cx('relative flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-6 md:px-6 md:pt-6 md:pb-7', className)} {...props}>
        <div className="flex gap-4">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              {department != null && <p className="flex-1 text-sm font-semibold text-brand-700 md:flex-none">{department}</p>}
              <span className="md:hidden">{pill}</span>
            </div>
            <div className="flex items-center gap-2">
              {titleEl}
              <span className="hidden md:inline-flex">{pill}</span>
            </div>
          </div>
          <Button as="a" href={href} size="sm" hierarchy="link-color" iconTrailing={ArrowUpRight} className="relative z-10 hidden self-start md:inline-flex">
            {linkLabel}
          </Button>
        </div>
        {description != null && <p className="text-md text-gray-600">{description}</p>}
        <div className="flex flex-wrap items-center gap-5">
          {detail(MarkerPin02, location)}
          {detail(Clock, workType)}
        </div>
      </article>
    );
  }

  return (
    <article ref={ref} className={cx('relative flex flex-col gap-8 rounded-2xl border border-gray-200 bg-white px-5 pt-5 pb-6 md:px-6 md:pt-6 md:pb-7', className)} {...props}>
      <div className="flex flex-col gap-4 md:gap-2">
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <div className="flex flex-1 items-center gap-2">
            {titleEl}
            {badge != null && (
              <Badge size="md" type="badge-modern" color={badgeColor} dot className="hidden shrink-0 md:inline-flex">
                {badge}
              </Badge>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {country != null && (
              <Badge size="md" type="badge-modern" color="gray" flag={flag ? <Flag code={flag} size={16} title="" /> : undefined} className="shrink-0">
                {country}
              </Badge>
            )}
            {badge != null && (
              <Badge size="md" type="badge-modern" color={badgeColor} dot className="shrink-0 md:hidden">
                {badge}
              </Badge>
            )}
          </div>
        </div>
        {description != null && <p className="text-md text-gray-600">{description}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-5">
        {detail(Clock, workType)}
        {detail(CurrencyDollarCircle, salary)}
      </div>
    </article>
  );
});
