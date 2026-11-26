import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { TabButton, TabsMobileSelect, TabsProvider, useTabsState, type TabButtonType, type TabItem, type TabsSize } from './Tabs';

export type VerticalTabsType = 'button-primary' | 'button-gray' | 'button-gray-border' | 'line';

export interface VerticalTabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Tabs to render. */
  items: TabItem[];
  /** Figma: Type */
  type?: VerticalTabsType;
  /** Figma: Size */
  size?: TabsSize;
  /** Selected tab id (controlled). */
  value?: string;
  /** Initially selected tab id (uncontrolled). */
  defaultValue?: string;
  /** Called with the newly selected tab id. */
  onChange?: (id: string) => void;
  /** Figma: Breakpoint=Mobile — below `md` render a native select instead of the tab column. */
  mobileSelect?: boolean;
  /** Accessible name of the tab list. */
  'aria-label'?: string;
  /** `<TabPanel>` elements, rendered to the right of the tab list. */
  children?: ReactNode;
  /** Class name applied to the tab list (e.g. a width such as `w-60`). */
  listClassName?: string;
}

const buttonTypeFor: Record<VerticalTabsType, TabButtonType> = {
  'button-primary': 'button-primary',
  'button-gray': 'button-gray',
  'button-gray-border': 'button-white',
  line: 'line',
};

const listStyle: Record<VerticalTabsType, string> = {
  'button-primary': 'gap-1',
  'button-gray': 'gap-1',
  'button-gray-border': 'gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1.5',
  line: 'gap-1',
};

/**
 * VerticalTabs — Figma "Vertical tabs". Arrow Up/Down, Home and End move between tabs.
 */
export const VerticalTabs = forwardRef<HTMLDivElement, VerticalTabsProps>(function VerticalTabs(
  {
    items,
    type = 'button-primary',
    size = 'sm',
    value,
    defaultValue,
    onChange,
    mobileSelect = false,
    children,
    className,
    listClassName,
    'aria-label': ariaLabel,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const baseId = id ?? autoId.replace(/:/g, '');
  const { selected, select, refs, onKeyDown } = useTabsState(items, value, defaultValue, onChange, 'vertical');

  return (
    <TabsProvider baseId={baseId} selected={selected}>
      <div ref={ref} className={cx('flex gap-8', mobileSelect && 'max-md:flex-col max-md:gap-6', className)} {...props}>
        {mobileSelect && <TabsMobileSelect className="md:hidden" items={items} selected={selected} onSelect={select} label={ariaLabel} />}
        <div
          role="tablist"
          aria-orientation="vertical"
          aria-label={ariaLabel}
          onKeyDown={onKeyDown}
          className={cx('flex w-fit min-w-40 shrink-0 flex-col', listStyle[type], mobileSelect && 'max-md:hidden', listClassName)}
        >
          {items.map((item) => (
            <TabButton
              key={item.id}
              item={item}
              type={buttonTypeFor[type]}
              size={size}
              current={item.id === selected}
              baseId={baseId}
              justify="start"
              onSelect={select}
              buttonRef={(el) => {
                refs.current[item.id] = el;
              }}
            />
          ))}
        </div>
        {children != null && <div className="min-w-0 flex-1">{children}</div>}
      </div>
    </TabsProvider>
  );
});
