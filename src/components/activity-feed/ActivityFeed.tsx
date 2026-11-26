import { Children, cloneElement, forwardRef, isValidElement, type HTMLAttributes, type ReactElement, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { FeedItem, type FeedItemProps, type FeedItemSize } from './FeedItem';

export type ActivityFeedDivider = 'line' | 'connector' | 'none';

export interface ActivityFeedProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Figma: Divider — `line` (Figma "Line" / "Divider": 1px rules between items, 16px gap),
   * `connector` (vertical connectors under avatars) or `none` (32px gap).
   */
  divider?: ActivityFeedDivider;
  /** Size applied to items rendered from `items`. */
  size?: FeedItemSize;
  /** Items to render; alternatively pass `<FeedItem>` children. */
  items?: (FeedItemProps & { id?: string | number })[];
  children?: ReactNode;
}

/** ActivityFeed — Figma "Activity feed": a list of feed items separated by lines, connectors or whitespace. */
export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(function ActivityFeed(
  { divider = 'line', size = 'md', items, children, className, ...props },
  ref,
) {
  const nodes: ReactNode[] = items
    ? items.map(({ id, ...it }, i) => <FeedItem key={id ?? i} size={size} {...it} />)
    : Children.toArray(children);
  const count = nodes.length;
  return (
    <div
      ref={ref}
      role="feed"
      className={cx('flex flex-col', divider === 'line' ? 'gap-4' : divider === 'none' ? 'gap-8' : 'gap-0', className)}
      {...props}
    >
      {nodes.map((n, i) => {
        let node = n;
        if (divider === 'connector' && isValidElement(n) && n.type === FeedItem) {
          const el = n as ReactElement<FeedItemProps>;
          node = cloneElement(el, { connector: el.props.connector ?? i < count - 1 });
        }
        return (
          <div key={isValidElement(n) && n.key != null ? n.key : i} role="article" className="contents">
            {divider === 'line' && i > 0 && <hr className="h-px border-0 bg-gray-200" />}
            {node}
          </div>
        );
      })}
    </div>
  );
});
