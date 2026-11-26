import { forwardRef, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Select } from '../dropdowns/Select';
import { wysiwygIconData, type WysiwygCommand } from './wysiwygIcons.data';

export type { WysiwygCommand };

export const wysiwygCommands: WysiwygCommand[] = ['bold', 'italic', 'h1', 'h2', 'quote', 'link', 'photo', 'list-bullet', 'list-numbers'];

const labels: Record<WysiwygCommand, string> = {
  bold: 'Bold', italic: 'Italic', h1: 'Heading 1', h2: 'Heading 2', quote: 'Quote', link: 'Link', photo: 'Insert image', 'list-bullet': 'Bulleted list', 'list-numbers': 'Numbered list',
};

export interface WysiwygIconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** Figma: Type */
  command: WysiwygCommand;
  /** Figma: Active */
  active?: boolean;
  /** Figma: Theme */
  theme?: 'light' | 'dark';
  /** 32px (desktop) or 28px (mobile). Default: responsive 28 → 32. */
  size?: 'sm' | 'md' | 'responsive';
}

/** WysiwygIconButton — Figma "_WYSIWYG editor icon". Keeps the editor selection (prevents focus on mousedown). */
export const WysiwygIconButton = forwardRef<HTMLButtonElement, WysiwygIconButtonProps>(function WysiwygIconButton(
  { command, active = false, theme = 'light', size = 'responsive', className, onMouseDown, title, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={labels[command]}
      aria-pressed={active}
      title={title ?? labels[command]}
      onMouseDown={(e) => { e.preventDefault(); onMouseDown?.(e); }}
      className={cx(
        'inline-flex shrink-0 items-center justify-center rounded-md transition duration-100 outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
        size === 'md' ? 'size-8' : size === 'sm' ? 'size-7' : 'size-7 md:size-8',
        theme === 'light'
          ? cx('focus-visible:ring-brand-500/24', active ? 'bg-gray-50 text-gray-500' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-500')
          : cx('focus-visible:ring-white/30', active ? 'bg-gray-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'),
        className,
      )}
      {...props}
    >
      <svg viewBox="0 0 32 32" className="size-full" aria-hidden fill="none" dangerouslySetInnerHTML={{ __html: wysiwygIconData[command] }} />
    </button>
  );
});

export interface WysiwygToolbarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Which commands are currently active (pressed). */
  active?: Partial<Record<WysiwygCommand, boolean>>;
  onCommand?: (command: WysiwygCommand) => void;
  /** Buttons to show (default: all 9 Figma icons). */
  commands?: WysiwygCommand[];
  theme?: 'light' | 'dark';
  /** Font dropdown (Figma "Input dropdown" in the toolbar). Pass `false` to hide. */
  fonts?: string[] | false;
  font?: string;
  onFontChange?: (font: string) => void;
  /** Extra content at the end of the toolbar. */
  children?: ReactNode;
}

/**
 * WysiwygToolbar — Figma "WYSIWYG toolbar": font dropdown + formatting icon buttons.
 * Desktop: one row (gap 12, icons 32px gap 4). Mobile: dropdown full width above a row of 28px icons.
 */
export const WysiwygToolbar = forwardRef<HTMLDivElement, WysiwygToolbarProps>(function WysiwygToolbar(
  { active = {}, onCommand, commands = wysiwygCommands, theme = 'light', fonts = ['Inter', 'Georgia', 'Courier New'], font, onFontChange, className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} role="toolbar" aria-label="Formatting" className={cx('flex flex-col gap-2 md:flex-row md:items-center md:gap-3', className)} {...props}>
      {fonts && (
        <div className="w-full md:w-60 md:shrink-0">
          <Select
            items={fonts.map((f) => ({ value: f, label: f }))}
            value={font ?? fonts[0]}
            onChange={(v) => onFontChange?.(v)}
          />
        </div>
      )}
      <div className="flex flex-wrap items-center gap-0.5 md:gap-1">
        {commands.map((c) => <WysiwygIconButton key={c} command={c} theme={theme} active={!!active[c]} onClick={() => onCommand?.(c)} />)}
        {children}
      </div>
    </div>
  );
});

export interface WysiwygTooltipProps extends Omit<WysiwygToolbarProps, 'theme' | 'fonts' | 'font' | 'onFontChange'> {
  /** Figma: Arrow position */
  arrow?: 'center' | 'left' | 'right' | 'none';
}

/** WysiwygTooltip — Figma "WYSIWYG tooltip": floating dark (gray-900) formatting bar with an arrow pointing down. */
export const WysiwygTooltip = forwardRef<HTMLDivElement, WysiwygTooltipProps>(function WysiwygTooltip(
  { active = {}, onCommand, commands = wysiwygCommands, arrow = 'center', className, children, ...props },
  ref,
) {
  return (
    <div ref={ref} role="toolbar" aria-label="Formatting" className={cx('relative inline-flex rounded-lg bg-gray-900 p-1.5 shadow-lg md:p-2', className)} {...props}>
      <div className="flex items-center gap-0.5 md:gap-1">
        {commands.map((c) => <WysiwygIconButton key={c} command={c} theme="dark" active={!!active[c]} onClick={() => onCommand?.(c)} />)}
        {children}
      </div>
      {arrow !== 'none' && (
        <span
          aria-hidden
          className={cx(
            'absolute -bottom-1 size-3 rotate-45 rounded-[1px] bg-gray-900',
            arrow === 'center' && 'left-1/2 -translate-x-1/2',
            arrow === 'left' && 'left-5',
            arrow === 'right' && 'right-5',
          )}
        />
      )}
    </div>
  );
});
