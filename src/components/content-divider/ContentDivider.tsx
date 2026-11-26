import { forwardRef, type HTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { Button } from '../buttons/Button';
import { ButtonGroup, ButtonGroupItem } from '../button-groups/ButtonGroup';

export type ContentDividerType = 'text' | 'heading' | 'button' | 'button-icon' | 'button-group' | 'button-group-icon';
export type ContentDividerStyle = 'single-line' | 'dual-line' | 'background-fill';

export interface ContentDividerGroupItem {
  label?: ReactNode;
  icon?: IconSlot;
  /** Accessible label (required for icon-only items). */
  'aria-label'?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Marks the item as selected (aria-pressed + gray-50 background). */
  selected?: boolean;
}

export interface ContentDividerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Figma: Type */
  type?: ContentDividerType;
  /** Figma: Style */
  variant?: ContentDividerStyle;
  /** Text / heading label, or the Button label for `type="button"`. Custom content for other types. */
  children?: ReactNode;
  /** Icon for `type="button"` (leading) or `type="button-icon"`. */
  icon?: IconSlot;
  /** Click handler of the button (`button`, `button-icon`). */
  onButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  /** Accessible label of the icon-only button. */
  buttonLabel?: string;
  /** Items of the button group (`button-group`, `button-group-icon`). */
  items?: ContentDividerGroupItem[];
}

function DividerButtonGroup({ items, iconOnly }: { items: ContentDividerGroupItem[]; iconOnly: boolean }) {
  return (
    <ButtonGroup className="shrink-0">
      {items.map((it, i) => (
        <ButtonGroupItem
          key={i}
          iconLeading={it.icon}
          aria-label={it['aria-label']}
          current={it.selected}
          onClick={it.onClick}
        >
          {iconOnly ? undefined : it.label}
        </ButtonGroupItem>
      ))}
    </ButtonGroup>
  );
}

const line = <span aria-hidden className="h-px min-w-4 flex-1 bg-gray-200" />;

/** ContentDivider — Figma "Content dividers/Content divider" (Type × Style). */
export const ContentDivider = forwardRef<HTMLDivElement, ContentDividerProps>(function ContentDivider(
  { type = 'text', variant = 'single-line', children, icon, onButtonClick, buttonLabel, items, className, ...props },
  ref,
) {
  let content: ReactNode;
  switch (type) {
    case 'text':
      content = <span className="text-center text-sm text-gray-600">{children}</span>;
      break;
    case 'heading':
      content = <span className="text-center text-lg font-medium text-gray-900">{children}</span>;
      break;
    case 'button':
      content = (
        <Button size="md" hierarchy="secondary-gray" iconLeading={icon} onClick={onButtonClick}>
          {children}
        </Button>
      );
      break;
    case 'button-icon':
      content = children ?? <Button size="md" hierarchy="secondary-gray" iconLeading={icon} aria-label={buttonLabel} onClick={onButtonClick} />;
      break;
    case 'button-group':
    case 'button-group-icon':
      content = children ?? <DividerButtonGroup items={items ?? []} iconOnly={type === 'button-group-icon'} />;
      break;
  }
  const isText = type === 'text' || type === 'heading';
  return (
    <div
      ref={ref}
      role={isText ? 'separator' : undefined}
      aria-label={isText && typeof children === 'string' ? children : undefined}
      className={cx(
        'flex w-full items-center',
        variant === 'single-line' && (type === 'button-icon' ? 'gap-1' : 'gap-2'),
        variant === 'dual-line' &&
          cx('flex-col justify-center border-y border-gray-200', type === 'button-icon' ? 'py-2.5' : 'py-3'),
        variant === 'background-fill' && 'flex-col justify-center rounded-lg bg-gray-50 py-2',
        className,
      )}
      {...props}
    >
      {variant === 'single-line' && line}
      {content}
      {variant === 'single-line' && line}
    </div>
  );
});
