import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { Check, File04, Trash01 } from '../../icons';
import { Button } from '../buttons/Button';
import { LoadingIndicator } from '../loading/LoadingIndicator';
import { FileTypeIcon, fileTypes, type FileType } from '../misc-icons/FileTypeIcon';
import { ProgressBar } from '../progress/ProgressBar';

export type FileUploadItemType = 'progress-bar' | 'progress-fill';
export type FileUploadItemIconType = 'file-type' | 'simple';
export type FileUploadItemState = 'in-progress' | 'error' | 'complete';

export interface FileUploadItemProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Type — progress bar under the text, or a background fill. */
  type?: FileUploadItemType;
  /** Figma: Icon type — colored file-type icon or a simple file-04 icon. */
  iconType?: FileUploadItemIconType;
  /** Figma: State */
  state?: FileUploadItemState;
  /** File name. */
  name: ReactNode;
  /** Human readable size ("200 KB"). */
  size?: ReactNode;
  /** Upload progress 0–100. */
  progress?: number;
  /** FileTypeIcon type; defaults to the file name's extension. */
  fileType?: FileType;
  /** Delete / cancel button (hidden when complete). */
  onRemove?: () => void;
  /** "Try again" link in the error state. */
  onRetry?: () => void;
  errorText?: ReactNode;
  retryLabel?: ReactNode;
}

function guessType(name: ReactNode): FileType {
  const m = typeof name === 'string' ? /\.([a-z0-9]+)$/i.exec(name) : null;
  const e = m ? m[1].toLowerCase() : '';
  return (fileTypes as string[]).includes(e) ? (e as FileType) : 'empty';
}

/** Small checked box shown when an upload is complete (Figma: Checkbox Checked=True, Size=sm). */
function DoneCheck() {
  return (
    <span role="img" aria-label="Upload complete" className="flex size-4 shrink-0 items-center justify-center rounded-sm bg-brand-600 text-white">
      <Check className="size-3" strokeWidth={3} />
    </span>
  );
}

/**
 * FileUploadItem — Figma "_File upload item base": a queued file with a progress bar or progress fill,
 * file-type or simple icon, and In progress / Error (retry) / Complete states.
 */
export const FileUploadItem = forwardRef<HTMLDivElement, FileUploadItemProps>(function FileUploadItem(
  {
    type = 'progress-bar',
    iconType = 'file-type',
    state = 'in-progress',
    name,
    size,
    progress = 0,
    fileType,
    onRemove,
    onRetry,
    errorText = 'Upload failed, please try again',
    retryLabel = 'Try again',
    className,
    ...props
  },
  ref,
) {
  const pct = Math.max(0, Math.min(100, state === 'complete' ? 100 : progress));
  const error = state === 'error';
  const fill = type === 'progress-fill';
  const ft = fileType ?? guessType(name);
  const icon =
    iconType === 'file-type' ? (
      <FileTypeIcon type={ft} variant={fill ? 'solid' : 'default'} className="size-10 shrink-0" />
    ) : (
      <File04 className="size-5 shrink-0 text-gray-500" />
    );

  const supporting = error
    ? errorText
    : fill
      ? [size, `${Math.round(pct)}% uploaded`].filter((x) => x != null && x !== '').reduce<ReactNode[]>((acc, x, i) => (i ? [...acc, ' – ', x] : [x]), [])
      : size;

  const removeBtn = onRemove && (
    <Button size="sm" hierarchy="tertiary-gray" destructive={error} iconLeading={Trash01} aria-label="Remove file" onClick={onRemove} />
  );

  return (
    <div
      ref={ref}
      data-state={state}
      className={cx(
        'relative flex w-full overflow-hidden rounded-xl bg-white p-4',
        error ? 'border-2 border-error-600 p-[15px]' : 'border border-gray-200',
        className,
      )}
      {...props}
    >
      {fill && !error && state !== 'complete' && (
        <span aria-hidden className="absolute inset-y-0 left-0 bg-gray-50 transition-[width]" style={{ width: `${pct}%` }} />
      )}
      <div className={cx('relative flex min-w-0 flex-1 items-start', iconType === 'file-type' ? 'gap-3' : 'gap-2', fill && !error && 'items-center')}>
        {icon}
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className={cx('flex min-w-0 flex-col text-sm', !fill && 'pr-8')}>
            <span className="truncate font-medium text-gray-700">{name}</span>
            {supporting != null && <span className="text-gray-600">{supporting}</span>}
          </div>
          {error ? (
            onRetry && (
              <div className="flex">
                <Button size="sm" hierarchy="link-gray" onClick={onRetry}>
                  {retryLabel}
                </Button>
              </div>
            )
          ) : (
            !fill && <ProgressBar value={pct} label="right" aria-label="Upload progress" />
          )}
        </div>
        {fill && !error && (
          <div className="flex shrink-0 items-center">
            {state === 'complete' ? <DoneCheck /> : <LoadingIndicator variant="line-simple" size="sm" aria-label="Uploading" />}
          </div>
        )}
        {fill && error && removeBtn}
      </div>
      {!fill && (
        <div className="absolute top-2 right-2">
          {state === 'complete' ? (
            <span className="flex size-9 items-center justify-center">
              <DoneCheck />
            </span>
          ) : (
            removeBtn
          )}
        </div>
      )}
    </div>
  );
});
