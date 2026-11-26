import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Avatar } from '../avatars/Avatar';
import { Badge, type BadgeColor } from '../badges/Badge';
import { FileTypeIcon, fileTypes, type FileType } from '../misc-icons/FileTypeIcon';

export type FeedItemSize = 'sm' | 'md';

export interface FeedItemFile {
  name: ReactNode;
  size?: ReactNode;
  /** FileTypeIcon type; defaults to the file extension. */
  fileType?: FileType;
}

export interface FeedItemLabel {
  label: ReactNode;
  color?: BadgeColor;
}

export interface FeedItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Size — md uses a 48px avatar, sm a 32px avatar. */
  size?: FeedItemSize;
  /** Figma: Connector — vertical line under the avatar linking to the next item. */
  connector?: boolean;
  /** Actor name ("Olivia Rhye"). */
  name: ReactNode;
  /** Timestamp ("2 mins ago"). */
  time?: ReactNode;
  /** Supporting text ("Invited Lana Steiner to the team"). */
  action?: ReactNode;
  avatarSrc?: string;
  avatarInitials?: string;
  /** Online indicator on the avatar. */
  online?: boolean;
  /** Unread dot in the top-right corner (Figma "_Dot"). */
  unread?: boolean;
  /** Figma Supporting item=File */
  file?: FeedItemFile;
  /** Figma Supporting item=Labels */
  labels?: FeedItemLabel[];
  /** Figma Supporting item=Text — quoted message bubble. */
  message?: ReactNode;
  /** Any custom supporting content. */
  children?: ReactNode;
}

function ext(name: ReactNode): FileType {
  const m = typeof name === 'string' ? /\.([a-z0-9]+)$/i.exec(name) : null;
  const e = m ? m[1].toLowerCase() : '';
  return (fileTypes as string[]).includes(e) ? (e as FileType) : 'empty';
}

/** FeedItem — Figma "_Feed item base": avatar, name + timestamp, action text and an optional supporting item. */
export const FeedItem = forwardRef<HTMLDivElement, FeedItemProps>(function FeedItem(
  {
    size = 'md',
    connector = false,
    name,
    time,
    action,
    avatarSrc,
    avatarInitials,
    online = true,
    unread = false,
    file,
    labels,
    message,
    children,
    className,
    ...props
  },
  ref,
) {
  const avatar = (
    <Avatar
      size={size === 'md' ? 'lg' : 'sm'}
      src={avatarSrc}
      initials={avatarInitials}
      alt={typeof name === 'string' ? name : undefined}
      status={online ? 'online' : undefined}
    />
  );
  return (
    <div ref={ref} className={cx('relative flex gap-3', className)} {...props}>
      {connector ? (
        <div className="flex shrink-0 flex-col items-center gap-1 pb-1">
          {avatar}
          <span aria-hidden className="w-0.5 grow rounded-full bg-gray-200" />
        </div>
      ) : (
        <div className="shrink-0">{avatar}</div>
      )}
      <div className={cx('flex min-w-0 flex-1 flex-col gap-3', connector && 'pb-8', unread && 'pr-4')}>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="truncate text-sm font-medium text-gray-700">{name}</span>
            {time != null && <span className="shrink-0 text-xs text-gray-600">{time}</span>}
          </div>
          {action != null && <div className="text-sm text-gray-600">{action}</div>}
        </div>
        {file && (
          <div className="flex items-center gap-3">
            <FileTypeIcon type={file.fileType ?? ext(file.name)} className="size-10 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col text-sm">
              <span className="truncate font-medium text-gray-700">{file.name}</span>
              {file.size != null && <span className="text-gray-600">{file.size}</span>}
            </div>
          </div>
        )}
        {labels && labels.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {labels.map((l, i) => (
              <Badge key={i} size="sm" type="pill-color" color={l.color ?? 'gray'}>
                {l.label}
              </Badge>
            ))}
          </div>
        )}
        {message != null && (
          <div
            className={cx(
              'rounded-lg rounded-tl-none border border-gray-200 bg-white text-sm text-gray-700 shadow-xs',
              connector ? 'px-3 py-2.5' : 'p-3',
            )}
          >
            {message}
          </div>
        )}
        {children}
      </div>
      {unread && (
        <span className="absolute top-0 right-0 flex size-2.5 items-center justify-center" aria-label="Unread">
          <span className="size-2 rounded-full bg-success-500" />
        </span>
      )}
    </div>
  );
});
