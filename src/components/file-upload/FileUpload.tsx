import { forwardRef, type Key } from 'react';
import { cx } from '../../utils/cx';
import { FileUploadDropzone, type FileUploadDropzoneProps } from './FileUploadDropzone';
import { FileUploadItem, type FileUploadItemIconType, type FileUploadItemProps, type FileUploadItemType } from './FileUploadItem';

export interface FileUploadProps extends FileUploadDropzoneProps {
  /** Figma: Files queued — the files shown under the dropzone. */
  files?: (Omit<FileUploadItemProps, 'id'> & { id: Key })[];
  /** Figma: Type — applied to every item. */
  type?: FileUploadItemType;
  iconType?: FileUploadItemIconType;
  /** Class for the outer wrapper (className goes to the dropzone). */
  wrapperClassName?: string;
}

/** FileUpload — Figma "File upload": the dropzone with the queue of uploading files below it. */
export const FileUpload = forwardRef<HTMLDivElement, FileUploadProps>(function FileUpload(
  { files = [], type = 'progress-bar', iconType = 'file-type', wrapperClassName, ...dropzone },
  ref,
) {
  return (
    <div ref={ref} className={cx('flex w-full flex-col gap-4', wrapperClassName)}>
      <FileUploadDropzone {...dropzone} />
      {files.length > 0 && (
        <ul className="flex flex-col gap-3" aria-label="Uploaded files">
          {files.map(({ id, ...f }) => (
            <li key={id}>
              <FileUploadItem type={type} iconType={iconType} {...f} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});
