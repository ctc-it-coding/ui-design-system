import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';

export interface MessageReactionProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** The emoji (Figma "Emoji" instance), e.g. "❤️". */
  emoji: ReactNode;
  /** Figma: Count — shown when > 1 (or when explicitly passed). */
  count?: number;
  /** The current user reacted with this emoji. */
  selected?: boolean;
}

/** MessageReaction — Figma "_Message reaction": emoji pill with an optional count. */
export const MessageReaction = forwardRef<HTMLButtonElement, MessageReactionProps>(function MessageReaction(
  { emoji, count, selected, className, type, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type ?? 'button'}
      aria-pressed={selected}
      className={cx(
        'inline-flex h-6 cursor-pointer items-center justify-center gap-1 rounded-2xl bg-gray-50 px-2 py-0.5 outline-none transition-colors',
        'hover:bg-gray-100 focus-visible:ring-4 focus-visible:ring-gray-400/14',
        selected && 'bg-brand-50 hover:bg-brand-100',
        className,
      )}
      {...props}
    >
      <span className="flex size-4 items-center justify-center text-[14px] leading-none" aria-hidden={typeof emoji === 'string' ? undefined : true}>
        {emoji}
      </span>
      {count != null && <span className="text-sm font-medium text-gray-700">{count}</span>}
    </button>
  );
});
