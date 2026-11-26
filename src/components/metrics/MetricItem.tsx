import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { ArrowDown, ArrowUp, DotsVertical } from '../../icons';
import { Badge } from '../badges/Badge';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { useElementWidth } from '../charts/utils';
import { MetricChange, type MetricTrend } from './MetricChange';
import { MiniChart, type MiniChartType } from './MiniChart';

export type MetricItemType = 'simple' | 'icon-01' | 'icon-02' | 'icon-03' | 'chart-01' | 'chart-02' | 'chart-03';
export type MetricIconColor = 'brand' | 'gray' | 'success' | 'warning' | 'error';

export interface MetricItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Type */
  type?: MetricItemType;
  /** Heading, e.g. "Views 24 hours". */
  title: ReactNode;
  /** Big number, e.g. "2,000". */
  value: ReactNode;
  /** Change value, e.g. "100%". */
  change?: ReactNode;
  /** Direction of the change (colours + arrows). */
  trend?: MetricTrend;
  /** Text after the change, e.g. "vs last month" (Icon 02/03, Chart 01/03). */
  changeText?: ReactNode;
  /** Featured icon for the Icon 01/02/03 and Chart 02 types. */
  icon?: IconSlot;
  /** Featured icon colour (light-outline themes). Defaults: Icon 01 success, Icon 02 brand. */
  iconColor?: MetricIconColor;
  /** Sparkline data for the Chart types (defaults to a preset shape). */
  chartData?: number[];
  /** Override the sparkline style (defaults: Chart 01 realistic, Chart 02 layers, Chart 03 wavy). */
  chartType?: MiniChartType;
  /** Figma: Actions=True — footer content (buttons). */
  actions?: ReactNode;
  /** Top-right actions menu slot (e.g. a DropdownMenu). */
  menu?: ReactNode;
  /** When `menu` is not given, renders a default "⋮" button calling this handler. */
  onMenuClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

function OutlineIcon({ icon, color }: { icon: IconSlot; color: MetricIconColor }) {
  return <FeaturedIcon icon={icon} size="lg" color={color} theme="light-outline" />;
}
function ModernIcon({ icon }: { icon: IconSlot }) {
  return <FeaturedIcon icon={icon} size="lg" color="gray" theme="modern" />;
}

function WideChart(props: { type: MiniChartType; trend: MetricTrend; data?: number[] }) {
  const [ref, w] = useElementWidth<HTMLDivElement>(340);
  return (
    <div ref={ref} className="w-full">
      <MiniChart type={props.type} trend={props.trend} data={props.data} width={Math.max(40, w)} height={72} />
    </div>
  );
}

const numberCls = 'text-display-sm font-semibold text-gray-900 md:text-display-md';

/** MetricItem — Figma "Metrics/Metric item" (Type × Actions × Breakpoint). Breakpoint is responsive CSS. */
export const MetricItem = forwardRef<HTMLDivElement, MetricItemProps>(function MetricItem(
  {
    type = 'simple',
    title,
    value,
    change,
    trend = 'positive',
    changeText,
    icon,
    iconColor,
    chartData,
    chartType,
    actions,
    menu,
    onMenuClick,
    className,
    ...props
  },
  ref,
) {
  const up = trend === 'positive';
  const badge =
    change != null ? (
      <span className="flex shrink-0 pb-1 md:pb-2">
        <Badge size="md" type="pill-color" color={up ? 'success' : 'error'} iconLeading={up ? ArrowUp : ArrowDown}>
          {change}
        </Badge>
      </span>
    ) : null;
  const change01 = change != null ? <MetricChange type="01" trend={trend}>{change}</MetricChange> : null;
  const change02 = change != null ? <MetricChange type="02" trend={trend}>{change}</MetricChange> : null;
  const sub = (c: ReactNode, textCls: string) =>
    c || changeText ? (
      <div className="flex min-w-0 items-center gap-2">
        {c}
        {changeText != null && <span className={cx('truncate text-sm font-medium text-gray-600', textCls)}>{changeText}</span>}
      </div>
    ) : null;
  const smallHeading = <div className="pr-8 text-sm font-medium text-gray-600">{title}</div>;
  const bigHeading = (cls?: string) => <div className={cx('min-w-0 flex-1 pr-8 text-md font-medium text-gray-900', cls)}>{title}</div>;
  const numberWithBadge = (
    <div className="flex items-end gap-4">
      <div className={cx('min-w-0 flex-1', numberCls)}>{value}</div>
      {badge}
    </div>
  );
  const numberWithChange02 = (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
      <div className={numberCls}>{value}</div>
      {sub(change02, 'text-gray-600')}
    </div>
  );

  let body: ReactNode;
  switch (type) {
    case 'simple':
      body = (
        <div className="flex flex-col gap-2">
          {smallHeading}
          {numberWithBadge}
        </div>
      );
      break;
    case 'icon-01':
      body = (
        <div className="flex flex-col gap-5 md:gap-6">
          {icon != null && <OutlineIcon icon={icon} color={iconColor ?? 'success'} />}
          <div className="flex flex-col gap-2">
            {smallHeading}
            {numberWithBadge}
          </div>
        </div>
      );
      break;
    case 'icon-02':
      body = (
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-4">
            {icon != null && <OutlineIcon icon={icon} color={iconColor ?? 'brand'} />}
            {bigHeading()}
          </div>
          <div className="flex flex-col gap-3 md:gap-4">
            <div className={numberCls}>{value}</div>
            {sub(change01, '')}
          </div>
        </div>
      );
      break;
    case 'icon-03':
      body = (
        <div className="flex flex-col gap-5">
          {icon != null && <ModernIcon icon={icon} />}
          <div className="flex flex-col gap-2">
            {smallHeading}
            {numberWithChange02}
          </div>
        </div>
      );
      break;
    case 'chart-01':
      body = (
        <div className="flex flex-col gap-5 md:gap-6">
          {bigHeading()}
          <div className="flex items-end gap-4">
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <div className={numberCls}>{value}</div>
              {sub(change01, '')}
            </div>
            <MiniChart type={chartType ?? 'realistic'} trend={trend} data={chartData} className="max-md:hidden" />
            <MiniChart type={chartType ?? 'realistic'} trend={trend} data={chartData} width={96} height={48} className="md:hidden" />
          </div>
        </div>
      );
      break;
    case 'chart-02':
      body = (
        <div className="flex flex-col gap-5 md:gap-6">
          <div className="flex items-center gap-3">
            {icon != null && <ModernIcon icon={icon} />}
            {bigHeading()}
          </div>
          <div className="flex items-end gap-4">
            <div className="flex min-w-0 flex-1 items-center gap-2 self-start">
              <div className={numberCls}>{value}</div>
              {change02}
            </div>
            <MiniChart type={chartType ?? 'layers'} trend={trend} data={chartData} className="max-md:hidden" />
            <MiniChart type={chartType ?? 'layers'} trend={trend} data={chartData} width={96} height={48} className="md:hidden" />
          </div>
        </div>
      );
      break;
    case 'chart-03':
      body = (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            {smallHeading}
            {numberWithChange02}
          </div>
          <WideChart type={chartType ?? 'wavy'} trend={trend} data={chartData} />
        </div>
      );
      break;
  }

  return (
    <div
      ref={ref}
      className={cx('relative flex flex-col rounded-xl bg-white shadow-xs ring-1 ring-inset ring-gray-200', className)}
      {...props}
    >
      <div className="px-4 py-5 md:p-6">{body}</div>
      {actions != null && (
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-4 py-4 md:px-6">{actions}</div>
      )}
      {(menu != null || onMenuClick) && (
        <div className="absolute top-4 right-4 md:top-5 md:right-5">
          {menu ?? (
            <button
              type="button"
              aria-label="Open menu"
              onClick={onMenuClick}
              className="flex rounded-md text-gray-400 outline-none hover:text-gray-500 focus-visible:ring-4 focus-visible:ring-gray-400/14"
            >
              <DotsVertical className="size-5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
});
