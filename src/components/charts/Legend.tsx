import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { colorProps, type ChartColor } from './utils';

export interface LegendItem {
  label: ReactNode;
  color: ChartColor;
}

export interface LegendProps extends HTMLAttributes<HTMLUListElement> {
  items: LegendItem[];
  /** Figma _Legend: Orientation */
  orientation?: 'vertical' | 'horizontal';
}

/** Legend — Figma "Charts/_Legend". 8px colour dot + text-sm gray-600 label. */
export const Legend = forwardRef<HTMLUListElement, LegendProps>(function Legend(
  { items, orientation = 'vertical', className, ...props },
  ref,
) {
  const vertical = orientation === 'vertical';
  return (
    <ul
      ref={ref}
      className={cx(vertical ? 'flex flex-col gap-1' : 'flex flex-wrap items-center gap-x-3 gap-y-1', className)}
      {...props}
    >
      {items.map((it, i) => {
        const c = colorProps(it.color);
        return (
          <li key={i} className={cx('flex gap-2 text-sm text-gray-600', vertical ? 'items-start' : 'items-center')}>
            <span className={cx('flex shrink-0', vertical && 'py-1.5')} aria-hidden>
              <span className={cx('size-2 rounded-full bg-current', c.className)} style={c.style} />
            </span>
            <span className="whitespace-nowrap">{it.label}</span>
          </li>
        );
      })}
    </ul>
  );
});
