import { Fragment, forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Minus } from '../../icons';
import { Button } from '../../components/buttons/Button';
import { Badge } from '../../components/badges/Badge';
import { FeaturedIcon } from '../../components/featured-icons/FeaturedIcon';
import { CheckIcon } from '../../components/misc-icons/CheckIcon';
import { HelpIcon } from '../../components/tooltips/HelpIcon';
import {
  pricingTablePlans,
  pricingTablePlans02,
  pricingTableSections,
  pricingTableSections02,
  type PricingTableSectionData,
  type PricingTableValue,
  type PricingTier,
} from './defaults';
import type { PricingBilling } from './PricingTierCard';

/* ------------------------------------------------------------------ */
/* Cells                                                                */
/* ------------------------------------------------------------------ */

export interface PricingTableHeaderCellProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma `_Pricing table cell header` → Type (Row header = feature name, Column header = section title). */
  type?: 'row-header' | 'column-header';
  /** Help-icon tooltip; omit to hide the icon. */
  tooltip?: ReactNode;
  /** Striped (gray-50) background. */
  striped?: boolean;
}

/** PricingTableHeaderCell — Figma `_Pricing table cell header`. */
export function PricingTableHeaderCell({ type = 'row-header', tooltip, striped, className, children, ...props }: PricingTableHeaderCellProps) {
  return (
    <div
      className={cx(
        'flex items-center gap-1 px-4 md:px-6',
        type === 'row-header' ? 'h-14 text-sm font-medium text-gray-900 md:h-16' : 'h-9 pb-4 text-sm font-medium text-brand-700',
        striped && 'bg-gray-50',
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {tooltip != null && type === 'row-header' && <HelpIcon title={children} supportingText={tooltip} placement="top" className="text-gray-400" />}
    </div>
  );
}

export interface PricingTableCellProps extends HTMLAttributes<HTMLDivElement> {
  /** `true` = check (Figma Icon=Check), `false` = minus (Icon=Minus), string = Text only. */
  value: PricingTableValue;
  /** Optional text next to an icon (Figma Text=True with Icon=Check/Minus). */
  text?: ReactNode;
  /** Figma: Alignment */
  alignment?: 'left' | 'center';
  striped?: boolean;
}

function ValueContent({ value, text }: { value: PricingTableValue; text?: ReactNode }) {
  if (typeof value === 'string') return <span className="text-sm text-gray-600">{value}</span>;
  return (
    <>
      {value ? (
        <CheckIcon type="line" size="sm" color="success" aria-label="Included" role="img" aria-hidden={false} />
      ) : (
        <Minus className="size-5 shrink-0 text-gray-400" aria-label="Not included" role="img" />
      )}
      {text != null && <span className="text-sm text-gray-600">{text}</span>}
    </>
  );
}

/** PricingTableCell — Figma `_Pricing table cell` (desktop: 64px tall, centered or left aligned). */
export function PricingTableCell({ value, text, alignment = 'center', striped, className, ...props }: PricingTableCellProps) {
  return (
    <div
      className={cx('flex h-16 items-center gap-3 px-6', alignment === 'center' && 'justify-center', striped && 'bg-gray-50', className)}
      {...props}
    >
      <ValueContent value={value} text={text} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Table                                                                */
/* ------------------------------------------------------------------ */

export interface PricingTableProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma Pricing page header "Large table 01" (badge headings + dual actions) or "Large table 02" (icon headings, highlighted column). */
  variant?: '01' | '02';
  /** Plan columns. */
  plans?: PricingTier[];
  /** Feature sections and rows (one value per plan). */
  sections?: PricingTableSectionData[];
  /** Index of the plan column outlined in brand color (variant 02). Default 1. */
  highlightIndex?: number;
  billing?: PricingBilling;
}

/**
 * PricingTable — feature comparison table used by Pricing page header "Large table 01/02".
 * Desktop (lg+): a grid with one column per plan. Below lg: one stacked block per plan with label/value rows.
 */
export const PricingTable = forwardRef<HTMLDivElement, PricingTableProps>(function PricingTable(
  { variant = '01', plans: plansProp, sections: sectionsProp, highlightIndex = 1, billing = 'monthly', className, ...props },
  ref,
) {
  const plans = plansProp ?? (variant === '01' ? pricingTablePlans : pricingTablePlans02);
  const sections = sectionsProp ?? (variant === '01' ? pricingTableSections : pricingTableSections02);
  const n = plans.length;
  const amount = (p: PricingTier) => (billing === 'annual' ? p.priceAnnual ?? p.price : p.price);
  const cur = (p: PricingTier) => p.currency ?? '$';

  const actions = (p: PricingTier, withSecondary: boolean) => (
    <div className="flex flex-col gap-3">
      <Button size="xl" className="w-full" as={p.ctaHref ? 'a' : 'button'} href={p.ctaHref} onClick={p.onCtaClick}>
        {p.ctaLabel ?? 'Get started'}
      </Button>
      {withSecondary && (
        <Button size="xl" hierarchy="secondary-gray" className="w-full" as={p.secondaryHref ? 'a' : 'button'} href={p.secondaryHref} onClick={p.onSecondaryClick}>
          {p.secondaryLabel ?? 'Chat to sales'}
        </Button>
      )}
    </div>
  );

  const head01 = (p: PricingTier) => (
    <div className="flex flex-col gap-4">
      <div className="flex items-end gap-1">
        <span className="text-display-md font-semibold text-gray-900 lg:text-display-lg">
          {cur(p)}
          {amount(p)}
        </span>
        <span className="pb-[7px] text-md font-medium text-gray-600">{p.period ?? 'per month'}</span>
      </div>
      {p.description && <p className="text-sm text-gray-600">{p.description}</p>}
    </div>
  );
  const head02 = (p: PricingTier, align: 'center' | 'left') => (
    <div className={cx('flex flex-col gap-2', align === 'center' && 'items-center text-center')}>
      <div className={cx('flex flex-col gap-5', align === 'center' && 'items-center')}>
        {p.icon != null && <FeaturedIcon icon={p.icon} size="md" color="brand" theme="modern" />}
        <h3 className="text-xl font-semibold text-brand-700">{p.name}</h3>
      </div>
      <p className="text-display-sm font-semibold text-gray-900 md:text-display-md lg:text-display-lg">
        {cur(p)}
        {amount(p)}
        {p.periodShort ?? '/mth'}
      </p>
      {p.description && <p className="text-md text-gray-600">{p.description}</p>}
    </div>
  );

  /* ---------- desktop grid ---------- */
  const cells: ReactNode[] = [];
  let rows = 0;
  const push = (row: ReactNode[]) => {
    cells.push(...row);
    rows += 1;
  };
  if (variant === '01') {
    push([
      <div key="h0" className="border-b border-gray-200" />,
      ...plans.map((p, i) => (
        <div key={`h${i + 1}`} className="flex items-center gap-2 border-b border-gray-200 px-6 pb-4">
          <h3 className={cx('text-xl font-semibold text-gray-900')}>{p.name}</h3>
          {p.badge && <Badge size="md" color="brand">{p.badge}</Badge>}
        </div>
      )),
    ]);
    push([
      <div key="c0" />,
      ...plans.map((p, i) => (
        <div key={`c${i + 1}`} className="flex flex-col gap-6 px-6 pb-12 pt-8">
          {head01(p)}
          {actions(p, true)}
        </div>
      )),
    ]);
  } else {
    push([
      <div key="h0" />,
      ...plans.map((p, i) => (
        <div key={`h${i + 1}`} className="flex flex-col gap-8 px-6 pb-10 pt-6">
          {head02(p, 'center')}
          {actions(p, false)}
        </div>
      )),
    ]);
  }
  sections.forEach((s, si) => {
    if (si > 0) {
      cells.push(<div key={`gap${si}`} className="col-span-full h-10" aria-hidden />);
      rows += 1;
    }
    if (s.title) {
      push([
        <PricingTableHeaderCell key={`t${si}`} type="column-header">{s.title}</PricingTableHeaderCell>,
        ...plans.map((_, i) => <div key={`t${si}-${i}`} />),
      ]);
    }
    s.rows.forEach((r, ri) => {
      const striped = ri % 2 === 0;
      const last = variant === '01' && ri === s.rows.length - 1;
      push([
        <PricingTableHeaderCell key={`r${si}-${ri}`} striped={striped} tooltip={r.tooltip} className={cx(last && 'border-b border-gray-200')}>
          {r.label}
        </PricingTableHeaderCell>,
        ...plans.map((_, i) => (
          <PricingTableCell key={`r${si}-${ri}-${i}`} value={r.values[i] ?? false} striped={striped} className={cx(last && 'border-b border-gray-200')} />
        )),
      ]);
    });
  });
  push([
    <div key="f0" />,
    ...plans.map((p, i) => (
      <div key={`f${i + 1}`} className={cx('px-6 pb-8', variant === '01' ? 'pt-10' : 'pt-8')}>
        {actions(p, variant === '01')}
      </div>
    )),
  ]);
  const gridStyle: CSSProperties = { gridTemplateColumns: `repeat(${n + 1}, minmax(0, 1fr))` };

  /* ---------- mobile stacks ---------- */
  const mobile = (
    <div className="flex flex-col gap-16 lg:hidden">
      {plans.map((p, pi) => (
        <div key={pi} className="flex flex-col gap-8">
          <div className="flex flex-col gap-8 px-4 md:px-8">
            {variant === '01' ? (
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-semibold text-gray-900">{p.name}</h3>
                  {p.badge && <Badge size="md" color="brand">{p.badge}</Badge>}
                </div>
                {head01(p)}
              </div>
            ) : (
              head02(p, 'left')
            )}
            {actions(p, variant === '01')}
          </div>
          <div className="flex flex-col gap-8">
            {sections.map((s, si) => (
              <div key={si} className="flex flex-col">
                {s.title && <PricingTableHeaderCell type="column-header">{s.title}</PricingTableHeaderCell>}
                {s.rows.map((r, ri) => (
                  <div key={ri} className={cx('flex h-14 items-center gap-3 px-4 md:px-8', ri % 2 === 0 && 'bg-gray-50')}>
                    <span className="flex-1 text-sm font-medium text-gray-900">{r.label}</span>
                    <span className="flex items-center gap-3">
                      <ValueContent value={r.values[pi] ?? false} />
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="px-4 md:px-8">{actions(p, variant === '01')}</div>
        </div>
      ))}
    </div>
  );

  return (
    <div ref={ref} className={cx('w-full', className)} {...props}>
      <div className="mx-auto hidden w-full max-w-[1280px] px-8 lg:block">
        <div className="relative grid" style={gridStyle}>
          {cells.map((c, i) => (
            <Fragment key={i}>{c}</Fragment>
          ))}
          {variant === '02' && highlightIndex >= 0 && highlightIndex < n && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-brand-600"
              style={{ gridColumn: `${highlightIndex + 2} / span 1`, gridRow: `1 / span ${rows}` }}
            />
          )}
        </div>
      </div>
      {mobile}
    </div>
  );
});
