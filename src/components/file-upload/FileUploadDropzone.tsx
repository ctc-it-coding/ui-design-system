import { forwardRef, useRef, useState, type DragEvent, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cx } from '../../utils/cx';
import { type IconSlot } from '../../utils/renderIcon';
import { UploadCloud02 } from '../../icons';
import { Button } from '../buttons/Button';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';

export interface FileUploadDropzoneProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onDrop'> {
  /** Called with the chosen / dropped files. */
  onFiles?: (files: File[]) => void;
  /** `accept` attribute of the file input (e.g. "image/*,.pdf"). */
  accept?: string;
  multiple?: boolean;
  /** Figma State=Disabled */
  disabled?: boolean;
  /** Supporting text, e.g. "SVG, PNG, JPG or GIF (max. 800x400px)". */
  hint?: ReactNode;
  /** Link label (default "Click to upload"). */
  actionLabel?: ReactNode;
  /** Text after the link (default "or drag and drop"). */
  dragLabel?: ReactNode;
  /** Featured icon (default upload-cloud-02). */
  icon?: IconSlot;
  /** Name for the hidden file input (forms). */
  name?: string;
}

/**
 * FileUploadDropzone — Figma "_File upload base". Click (or Enter/Space) to browse, or drag & drop files.
 * While dragging over it shows the Figma "Hover" state (2px brand border).
 */
export const FileUploadDropzone = forwardRef<HTMLDivElement, FileUploadDropzoneProps>(function FileUploadDropzone(
  {
    onFiles,
    accept,
    multiple = true,
    disabled,
    hint = 'SVG, PNG, JPG or GIF (max. 800x400px)',
    actionLabel = 'Click to upload',
    dragLabel = 'or drag and drop',
    icon = UploadCloud02,
    name,
    className,
    ...props
  },
  ref,
) {
  const input = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const depth = useRef(0);

  const browse = () => {
    if (!disabled) input.current?.click();
  };
  const emit = (list: FileList | null) => {
    if (!list || disabled) return;
    const files = Array.from(list);
    if (files.length) onFiles?.(multiple ? files : files.slice(0, 1));
  };
  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (disabled) return;
    depth.current += 1;
    setDragging(true);
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    depth.current = Math.max(0, depth.current - 1);
    if (depth.current === 0) setDragging(false);
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    depth.current = 0;
    setDragging(false);
    emit(e.dataTransfer.files);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      browse();
    }
  };

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      data-dragging={dragging || undefined}
      onClick={browse}
      onKeyDown={onKeyDown}
      onDragEnter={onDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      className={cx(
        'flex w-full flex-col items-center gap-1 rounded-xl border border-gray-200 bg-white px-6 py-4 text-center outline-none transition-colors',
        'cursor-pointer focus-visible:ring-4 focus-visible:ring-brand-500/24',
        'data-dragging:border-brand-600 data-dragging:ring-1 data-dragging:ring-brand-600 data-dragging:ring-inset',
        disabled && 'cursor-not-allowed bg-gray-50',
        className,
      )}
      {...props}
    >
      <input
        ref={input}
        type="file"
        name={name}
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        className="hidden"
        onChange={(e) => {
          emit(e.target.files);
          e.target.value = '';
        }}
      />
      <div className="flex w-full flex-col items-center gap-3">
        <FeaturedIcon icon={icon} size="md" color="brand" theme="modern" />
        <div className="flex w-full flex-col items-center gap-1">
          <div className="flex flex-wrap justify-center gap-1 text-sm">
            <Button
              hierarchy="link-color"
              size="md"
              disabled={disabled}
              tabIndex={-1}
              onClick={(e) => {
                e.stopPropagation();
                browse();
              }}
            >
              {actionLabel}
            </Button>
            <span className="text-gray-600">{dragLabel}</span>
          </div>
          {hint != null && <p className="text-xs text-gray-600">{hint}</p>}
        </div>
      </div>
    </div>
  );
});
