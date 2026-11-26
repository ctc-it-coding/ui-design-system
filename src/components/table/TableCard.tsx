import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Badge } from '../badges/Badge';

export interface TableCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Card header title ("Team members"). Omit title, description and actions to hide the header. */
  title?: ReactNode;
  /** Badge next to the title — a string renders a brand pill badge ("100 users"), or pass any node. */
  badge?: ReactNode;
  /** Supporting text under the title. */
  description?: ReactNode;
  /** Header actions (buttons, dropdown). */
  actions?: ReactNode;
  /** Footer slot, e.g. `<Pagination type="card-default" />`. Gets a top divider. */
  footer?: ReactNode;
  /** The table (scrolls horizontally when too wide). */
  children?: ReactNode;
}

/**
 * TableCard — Figma "Table" frame: white card (r12, gray-200 border, shadow-xs) with a "Card header"
 * (title + badge, supporting text, actions) and a footer slot for pagination.
 */
export const TableCard = forwardRef<HTMLDivElement, TableCardProps>(function TableCard(
  { title, badge, description, actions, footer, children, className, ...props },
  ref,
) {
  const hasHeader = title != null || description != null || actions != null;
  return (
    <div ref={ref} className={cx('overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xs', className)} {...props}>
      {hasHeader && (
        <div className="flex flex-col gap-4 border-b border-gray-200 px-4 py-5 md:flex-row md:items-start md:px-6">
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex items-center gap-2">
              {title != null && <h3 className="text-lg font-semibold text-gray-900">{title}</h3>}
              {badge != null &&
                (typeof badge === 'string' || typeof badge === 'number' ? (
                  <Badge size="sm" type="pill-color" color="brand">
                    {badge}
                  </Badge>
                ) : (
                  badge
                ))}
            </div>
            {description != null && <p className="text-sm text-gray-600">{description}</p>}
          </div>
          {actions != null && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
        </div>
      )}
      <div className="overflow-x-auto">{children}</div>
      {footer != null && <div className="border-t border-gray-200">{footer}</div>}
    </div>
  );
});
