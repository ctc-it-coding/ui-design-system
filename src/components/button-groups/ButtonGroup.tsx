import {
  createContext,
  forwardRef,
  useContext,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';

interface GroupCtx {
  value: string | null | undefined;
  select: (v: string) => void;
  selectable: boolean;
}
const Ctx = createContext<GroupCtx>({ value: undefined, select: () => {}, selectable: false });

export interface ButtonGroupProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** Controlled selected item value (marks that item Current=True). */
  value?: string | null;
  /** Uncontrolled initial selected value. */
  defaultValue?: string | null;
  /** Called when an item with a `value` is clicked. */
  onChange?: (value: string) => void;
  children?: ReactNode;
}

/** ButtonGroup — Figma "Button groups/Button group": segmented row of buttons sharing a border. */
export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(function ButtonGroup(
  { value: valueProp, defaultValue, onChange, className, children, ...props },
  ref,
) {
  const [inner, setInner] = useState<string | null | undefined>(defaultValue);
  const value = valueProp !== undefined ? valueProp : inner;
  const selectable = valueProp !== undefined || defaultValue !== undefined || !!onChange;
  const select = (v: string) => {
    if (valueProp === undefined) setInner(v);
    onChange?.(v);
  };
  return (
    <Ctx.Provider value={{ value, select, selectable }}>
      <div
        ref={ref}
        role="group"
        className={cx(
          'relative inline-flex w-max items-stretch rounded-lg shadow-xs after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-lg after:ring-1 after:ring-gray-300 after:ring-inset',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </Ctx.Provider>
  );
});

export interface ButtonGroupItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Value used for selection inside a selectable ButtonGroup. */
  value?: string;
  /** Figma: Current=True (overrides group selection). */
  current?: boolean;
  /** Figma: Icon=Leading (or Icon=Only when there is no label). */
  iconLeading?: IconSlot;
  /** Figma: Icon=Dot */
  dot?: boolean;
  children?: ReactNode;
}

/** ButtonGroupItem — Figma "_Button group base". */
export const ButtonGroupItem = forwardRef<HTMLButtonElement, ButtonGroupItemProps>(function ButtonGroupItem(
  { value, current, iconLeading, dot, className, children, onClick, type, ...props },
  ref,
) {
  const ctx = useContext(Ctx);
  const isCurrent = current ?? (value !== undefined && ctx.value === value);
  const iconOnly = !children && !!iconLeading && !dot;
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-pressed={ctx.selectable || current !== undefined ? isCurrent : undefined}
      data-current={isCurrent || undefined}
      onClick={(e: MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        if (!e.defaultPrevented && value !== undefined) ctx.select(value);
      }}
      className={cx(
        'relative inline-flex h-10 cursor-pointer items-center justify-center gap-2 border-r border-gray-300 text-sm font-medium whitespace-nowrap outline-none transition-colors duration-100 first:rounded-l-lg last:rounded-r-lg last:border-r-0',
        'hover:bg-gray-50 hover:text-gray-800 focus-visible:z-10 focus-visible:ring-4 focus-visible:ring-gray-400/14',
        'disabled:cursor-not-allowed disabled:text-gray-400 disabled:hover:bg-white',
        isCurrent ? 'bg-gray-50 text-gray-800 disabled:hover:bg-gray-50' : 'bg-white text-gray-700',
        iconOnly ? 'px-3' : iconLeading ? 'pr-4 pl-3.5' : 'px-4',
        className,
      )}
      {...props}
    >
      {renderIcon(iconLeading, 'size-5 shrink-0')}
      {dot && (
        <span className="flex size-2.5 items-center justify-center" aria-hidden>
          <span className="size-2 rounded-full bg-success-500" />
        </span>
      )}
      {children}
    </button>
  );
});
