import {
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { DotsVertical } from '../../icons';
import { Avatar, AvatarLabelGroup } from '../avatars/Avatar';
import { CheckboxBase } from '../checkboxes/CheckboxBase';
import { useControllableState } from '../inputs/useControllableState';
import { useDismiss } from './useDismiss';

/** One row of the menu — Figma "_Dropdown list item". */
export interface DropdownMenuItem {
  /** "Text" */
  label?: ReactNode;
  /** Figma: Icon=True (16px leading icon). */
  icon?: IconSlot;
  /** Keyboard shortcut hint, e.g. "⌘K->P". */
  shortcut?: ReactNode;
  /** Called when the item is chosen (click / Enter / Space). */
  onSelect?: () => void;
  /** Figma: Divider=True — renders a separator instead of an item. */
  divider?: boolean;
  disabled?: boolean;
  /** Figma: Checkbox=True — renders a checkbox; the menu stays open on select. */
  checkbox?: boolean;
  checked?: boolean;
  /** Render the item as a link. */
  href?: string;
}

export interface DropdownMenuProps {
  /** Figma: Type=Button / Icon / Avatar — the element that toggles the menu (Button, DropdownIconTrigger, DropdownAvatarTrigger…). */
  trigger: ReactElement;
  items: DropdownMenuItem[];
  /** Figma "_Dropdown list header": a string (Type=Header) or any node, e.g. `<DropdownAvatarHeader …/>` (Type=Avatar group). */
  header?: ReactNode;
  /** Horizontal alignment of the menu relative to the trigger. Figma menus align to the trigger's end. */
  align?: 'start' | 'end';
  /** Menu open state (controlled). */
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Accessible name for the menu. */
  'aria-label'?: string;
  /** Class for the outer wrapper. */
  className?: string;
  /** Class for the floating menu (default width 240px). */
  menuClassName?: string;
}

/** Type=Header — "Account menu" title row. */
export function DropdownMenuHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('border-b border-gray-200 px-4 py-3 text-sm font-medium text-gray-700', className)}>{children}</div>;
}

/** Type=Avatar group — avatar label group (md, online status) header. */
export function DropdownAvatarHeader({
  name,
  email,
  src,
  initials,
  status = 'online',
  className,
}: {
  name: ReactNode;
  email?: ReactNode;
  src?: string;
  initials?: string;
  status?: 'online' | 'offline' | null;
  className?: string;
}) {
  return (
    <div className={cx('border-b border-gray-200 px-4 py-3', className)}>
      <AvatarLabelGroup size="md" title={name} subtitle={email} src={src} initials={initials} status={status ?? undefined} />
    </div>
  );
}

/** Figma Dropdown Type=Icon trigger — a 20px dots-vertical icon button. */
export const DropdownIconTrigger = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement> & { icon?: IconSlot }>(
  function DropdownIconTrigger({ icon = DotsVertical, className, ...props }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label="Open menu"
        className={cx(
          'flex cursor-pointer items-center justify-center rounded-md text-gray-400 outline-none transition-colors hover:text-gray-500',
          'focus-visible:ring-4 focus-visible:ring-gray-400/14 aria-expanded:text-gray-500',
          className,
        )}
        {...props}
      >
        {renderIcon(icon, 'size-5')}
      </button>
    );
  },
);

/** Figma Dropdown Type=Avatar trigger — a 40px avatar with a gray focus ring while open. */
export const DropdownAvatarTrigger = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { src?: string; initials?: string; alt?: string }
>(function DropdownAvatarTrigger({ src, initials, alt, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={alt ?? 'Open account menu'}
      className={cx(
        'flex cursor-pointer rounded-full outline-none transition-shadow',
        'focus-visible:ring-4 focus-visible:ring-gray-400/14 aria-expanded:ring-4 aria-expanded:ring-gray-400/14',
        className,
      )}
      {...props}
    >
      <Avatar size="md" src={src} initials={initials} alt={alt} />
    </button>
  );
});

/**
 * DropdownMenu — Figma "Dropdown" (Type=Button / Icon / Avatar) with "_Dropdown list item" rows
 * and an optional "_Dropdown list header". Keyboard: ↑/↓/Home/End move, Enter/Space select, Esc closes.
 */
export function DropdownMenu({
  trigger,
  items,
  header,
  align = 'end',
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  'aria-label': ariaLabel,
  className,
  menuClassName,
}: DropdownMenuProps) {
  const [open, setOpen] = useControllableState<boolean>(openProp, defaultOpen, onOpenChange);
  const [focusIdx, setFocusIdx] = useState(-1);
  const rootRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);
  const menuId = useId();
  const enabled = items.map((it, i) => (!it.divider && !it.disabled ? i : -1)).filter((i) => i >= 0);

  const focusTrigger = () => rootRef.current?.querySelector<HTMLElement>('[data-dropdown-trigger]')?.focus();
  const close = (refocus = false) => {
    setOpen(false);
    setFocusIdx(-1);
    if (refocus) focusTrigger();
  };
  useDismiss(rootRef, open, (reason) => close(reason === 'escape'));

  useEffect(() => {
    if (open && focusIdx >= 0) itemRefs.current[focusIdx]?.focus();
  }, [open, focusIdx]);

  const move = (dir: 1 | -1 | 'first' | 'last') => {
    if (!enabled.length) return;
    if (dir === 'first') return setFocusIdx(enabled[0]);
    if (dir === 'last') return setFocusIdx(enabled[enabled.length - 1]);
    const pos = enabled.indexOf(focusIdx);
    const next = pos < 0 ? (dir === 1 ? 0 : enabled.length - 1) : (pos + dir + enabled.length) % enabled.length;
    setFocusIdx(enabled[next]);
  };

  const triggerEl = isValidElement(trigger)
    ? cloneElement(trigger as ReactElement<Record<string, unknown>>, {
        'data-dropdown-trigger': '',
        'aria-haspopup': 'menu',
        'aria-expanded': open,
        'aria-controls': open ? menuId : undefined,
        onClick: (e: MouseEvent<HTMLElement>) => {
          (trigger.props as { onClick?: (e: MouseEvent<HTMLElement>) => void }).onClick?.(e);
          if (open) close();
          else setOpen(true);
        },
        onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
          (trigger.props as { onKeyDown?: (e: KeyboardEvent<HTMLElement>) => void }).onKeyDown?.(e);
          if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            e.preventDefault();
            setOpen(true);
            setFocusIdx(e.key === 'ArrowDown' ? enabled[0] : enabled[enabled.length - 1]);
          }
        },
      })
    : trigger;

  const choose = (it: DropdownMenuItem) => {
    if (it.disabled) return;
    it.onSelect?.();
    if (!it.checkbox) close(true);
  };

  return (
    <div ref={rootRef} className={cx('relative inline-flex', className)}>
      {triggerEl}
      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={ariaLabel}
          className={cx(
            'absolute top-full z-50 mt-2 w-60 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg outline-none',
            align === 'end' ? 'right-0' : 'left-0',
            menuClassName,
          )}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') (e.preventDefault(), move(1));
            else if (e.key === 'ArrowUp') (e.preventDefault(), move(-1));
            else if (e.key === 'Home') (e.preventDefault(), move('first'));
            else if (e.key === 'End') (e.preventDefault(), move('last'));
            else if (e.key === 'Tab') close();
          }}
        >
          {header != null && (typeof header === 'string' ? <DropdownMenuHeader>{header}</DropdownMenuHeader> : header)}
          <div className="py-1">
            {items.map((it, i) => {
              if (it.divider) return <div key={i} role="separator" className="my-1 h-px bg-gray-200" />;
              const setRef = (el: HTMLElement | null) => {
                itemRefs.current[i] = el;
              };
              const common = {
                role: it.checkbox ? 'menuitemcheckbox' : 'menuitem',
                'aria-checked': it.checkbox ? !!it.checked : undefined,
                'aria-disabled': it.disabled || undefined,
                tabIndex: focusIdx === i ? 0 : -1,
                onClick: () => choose(it),
                onMouseEnter: () => !it.disabled && setFocusIdx(i),
                className: cx(
                  'group/item flex w-full items-center gap-3 rounded-md px-2.5 py-[9px] text-left outline-none transition-colors duration-75',
                  it.disabled ? 'cursor-not-allowed' : 'cursor-pointer hover:bg-gray-50 focus-visible:bg-gray-50',
                ),
              };
              const inner = (
                <>
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    {it.checkbox && <CheckboxBase size="sm" checked={!!it.checked} disabled={it.disabled} />}
                    {!it.checkbox &&
                      renderIcon(it.icon, cx('size-4 shrink-0', it.disabled ? 'text-gray-300' : 'text-gray-500 group-hover/item:text-gray-600'))}
                    <span
                      className={cx(
                        'truncate text-sm font-medium',
                        it.disabled ? 'text-gray-400' : 'text-gray-700 group-hover/item:text-gray-800 group-focus-visible/item:text-gray-800',
                      )}
                    >
                      {it.label}
                    </span>
                  </span>
                  {it.shortcut != null && <span className={cx('shrink-0 text-xs', it.disabled ? 'text-gray-400' : 'text-gray-500')}>{it.shortcut}</span>}
                </>
              );
              return (
                <div key={i} className="px-1.5 py-px">
                  {it.href && !it.disabled ? (
                    <a ref={setRef} href={it.href} {...common}>
                      {inner}
                    </a>
                  ) : (
                    <button ref={setRef} type="button" {...common}>
                      {inner}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
