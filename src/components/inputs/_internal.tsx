import type { ReactNode, Ref } from 'react';
import { cx } from '../../utils/cx';
import { XClose } from '../../icons';

/**
 * Minimal avatar used inside form controls (select items, tags, choice cards).
 * Renders an image when `src` is given, otherwise initials on a gray circle.
 */
export function MiniAvatar({ src, initials, alt = '', className }: { src?: string; initials?: string; alt?: string; className?: string }) {
  return (
    <span
      className={cx(
        'relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 text-xs font-semibold text-gray-600',
        'after:pointer-events-none after:absolute after:inset-0 after:rounded-full after:border after:border-black/8',
        className,
      )}
    >
      {src ? <img src={src} alt={alt} className="size-full object-cover" /> : <span className="leading-none">{initials}</span>}
    </span>
  );
}

/** Small status dot (Figma "_Dot", md = 10px frame with an 8px dot). */
export function StatusDot({ className }: { className?: string }) {
  return (
    <span className="flex size-2.5 shrink-0 items-center justify-center" aria-hidden>
      <span className={cx('size-2 rounded-full bg-success-500', className)} />
    </span>
  );
}

/** Tag chip used by TagInput / MultiSelect — mirrors Figma "Tag" (Size=md, Action=X close). */
export function InputTag({
  children,
  avatarSrc,
  avatarInitials,
  onRemove,
  disabled,
}: {
  children: ReactNode;
  avatarSrc?: string;
  avatarInitials?: string;
  onRemove?: () => void;
  disabled?: boolean;
}) {
  const hasAvatar = avatarSrc != null || avatarInitials != null;
  return (
    <span
      className={cx(
        'inline-flex h-6 shrink-0 items-center gap-[3px] rounded-md border border-gray-300 bg-white py-0.5 pr-1 text-sm font-medium text-gray-700',
        hasAvatar ? 'pl-[5px]' : 'pl-[9px]',
      )}
    >
      <span className="flex items-center gap-[5px]">
        {hasAvatar && <MiniAvatar src={avatarSrc} initials={avatarInitials} className="size-4 text-[7px]" />}
        <span className="whitespace-nowrap">{children}</span>
      </span>
      {onRemove && (
        <button
          type="button"
          tabIndex={-1}
          disabled={disabled}
          aria-label={`Remove ${typeof children === 'string' ? children : 'tag'}`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="flex size-4 items-center justify-center rounded-[3px] p-0.5 text-gray-400 outline-none hover:bg-gray-100 hover:text-gray-500 disabled:cursor-not-allowed"
        >
          <XClose className="size-3" strokeWidth={3} />
        </button>
      )}
    </span>
  );
}

/** Combine several refs into one callback ref. */
export function mergeRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T | null) => {
    for (const r of refs) {
      if (typeof r === 'function') r(node);
      else if (r && typeof r === 'object') (r as { current: T | null }).current = node;
    }
  };
}

