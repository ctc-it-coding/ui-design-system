import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Avatar } from '../avatars/Avatar';
import { FileTypeIcon, fileTypes, type FileType } from '../misc-icons/FileTypeIcon';
import { MessageReaction } from './MessageReaction';

export interface MessageAttachment {
  /** File name, e.g. "Tech design requirements.pdf". */
  name: ReactNode;
  /** Supporting text, e.g. "200 KB". */
  size?: ReactNode;
  /** FileTypeIcon type ("pdf", "jpg", …). Defaults to the file extension. */
  fileType?: FileType;
  /** Custom icon instead of the FileTypeIcon. */
  icon?: ReactNode;
}

export interface MessageReactionItem {
  emoji: ReactNode;
  count?: number;
  selected?: boolean;
  onClick?: () => void;
}

export interface MessageProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type — received (avatar left, gray bubble) or sent (brand bubble, right aligned). */
  type?: 'received' | 'sent';
  /** Sender name ("Phoenix Baker" / "You"). */
  name?: ReactNode;
  /** Timestamp ("Friday 2:20pm"). Hidden while `writing`. */
  time?: ReactNode;
  /** Avatar of a received message. */
  avatarSrc?: string;
  avatarInitials?: string;
  /** Online dot on the avatar. */
  online?: boolean;
  /** Figma Type=… attachment — shows a file bubble instead of text. */
  attachment?: MessageAttachment;
  /** Figma Type=Writing — typing indicator bubble. */
  writing?: boolean;
  /** Figma: Reactions */
  reactions?: MessageReactionItem[];
  /** Message text. */
  children?: ReactNode;
}

function extension(name: ReactNode): FileType {
  const m = typeof name === 'string' ? /\.([a-z0-9]+)$/i.exec(name) : null;
  const e = m ? m[1].toLowerCase() : '';
  return (fileTypes as string[]).includes(e) ? (e as FileType) : 'empty';
}

/** Three-dot typing indicator (Figma "Loading dot frame"s). */
function Typing() {
  const dots = ['self-end bg-gray-600', 'self-start bg-gray-400', 'self-end bg-gray-600'];
  return (
    <span className="flex h-2 items-stretch gap-1" role="status" aria-label="Typing">
      {dots.map((c, i) => (
        <span key={i} className={cx('size-1 animate-pulse rounded-full', c)} style={{ animationDelay: `${i * 160}ms` }} />
      ))}
    </span>
  );
}

/**
 * Message — Figma "Message": received / sent chat message with a text bubble, file attachment bubble or
 * "writing" indicator, plus optional reactions.
 */
export const Message = forwardRef<HTMLDivElement, MessageProps>(function Message(
  { type = 'received', name, time, avatarSrc, avatarInitials, online = true, attachment, writing, reactions, children, className, ...props },
  ref,
) {
  const sent = type === 'sent';
  const corner = sent ? 'rounded-lg rounded-tr-none' : 'rounded-lg rounded-tl-none';
  let bubble: ReactNode;
  if (writing) {
    bubble = (
      <div className={cx('flex w-fit items-center border border-gray-200 bg-gray-50 p-2.5', corner)}>
        <Typing />
      </div>
    );
  } else if (attachment) {
    const ft = attachment.fileType ?? extension(attachment.name);
    bubble = (
      <div className={cx('flex items-center gap-3 border border-gray-200 bg-white px-3.5 py-2.5', corner)}>
        {attachment.icon ?? <FileTypeIcon type={ft} className="size-10 shrink-0" />}
        <div className="flex min-w-0 flex-1 flex-col text-sm">
          <span className="truncate font-medium text-gray-700">{attachment.name}</span>
          {attachment.size != null && <span className="text-gray-600">{attachment.size}</span>}
        </div>
      </div>
    );
  } else {
    bubble = (
      <div
        className={cx(
          'px-3.5 py-2.5 text-md',
          corner,
          sent ? 'bg-brand-600 text-white' : 'border border-gray-200 bg-gray-50 text-gray-900',
        )}
      >
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={cx('flex w-full gap-3', sent && 'justify-end', className)} {...props}>
      {!sent && (
        <Avatar size="md" src={avatarSrc} initials={avatarInitials} alt={typeof name === 'string' ? name : undefined} status={online ? 'online' : undefined} />
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {(name != null || time != null) && (
          <div className="flex items-center gap-2">
            <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-700">{name}</span>
            {!writing && time != null && <span className="shrink-0 text-xs text-gray-600">{time}</span>}
          </div>
        )}
        {bubble}
        {reactions && reactions.length > 0 && (
          <div className="flex items-center justify-end gap-1">
            {reactions.map((r, i) => (
              <MessageReaction key={i} emoji={r.emoji} count={r.count} selected={r.selected} onClick={r.onClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
});
