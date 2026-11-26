import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { SearchLg } from '../../icons';
import { cx } from '../../utils/cx';
import { renderIcon, type IconSlot } from '../../utils/renderIcon';
import { FeaturedIcon } from '../featured-icons/FeaturedIcon';
import { BackgroundPattern } from './BackgroundPattern';
import { EmptyStateIllustration, type IllustrationColor, type IllustrationStyle } from './EmptyStateIllustration';

export type EmptyStateIconType = 'featured-icon' | 'illustration' | 'file-type-icon';
export type EmptyStateSize = 'sm' | 'md' | 'lg';

export interface EmptyStateProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Figma: Icon (Featured icon / Illustration / File type icon) */
  iconType?: EmptyStateIconType;
  /** Figma: Size */
  size?: EmptyStateSize;
  /** iconType="featured-icon": the icon (default search-lg). Also used as fallback for "file-type-icon". */
  icon?: IconSlot;
  /** iconType="featured-icon": FeaturedIcon colour. Default "brand". */
  iconColor?: 'brand' | 'gray' | 'error' | 'warning' | 'success';
  /** iconType="illustration": style name or a custom node. Default "cloud". */
  illustration?: IllustrationStyle | ReactNode;
  /** iconType="illustration": Primary / Gray. Default "gray". */
  illustrationColor?: IllustrationColor;
  /** iconType="file-type-icon": the file icon node, e.g. `<FileTypeIcon type="folder" variant="solid" />`. */
  fileIcon?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons row (Figma: secondary-gray + primary, size lg). */
  actions?: ReactNode;
  /** Decorative background pattern (circles; grid for illustrations). Default true. */
  pattern?: boolean;
}

const illustrationStyles: IllustrationStyle[] = ['cloud', 'credit-card', 'documents', 'box'];

/** EmptyState — Figma "Empty states/Empty state". Centred icon, title, description and actions. */
export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(function EmptyState(
  {
    iconType = 'featured-icon',
    size = 'md',
    icon = SearchLg,
    iconColor = 'brand',
    illustration = 'cloud',
    illustrationColor = 'gray',
    fileIcon,
    title,
    description,
    actions,
    pattern = true,
    className,
    ...props
  },
  ref,
) {
  let visual: ReactNode;
  let visualH: number;
  if (iconType === 'featured-icon') {
    visual = <FeaturedIcon icon={icon} size={size === 'lg' ? 'xl' : 'lg'} color={iconColor} theme="modern" />;
    visualH = size === 'lg' ? 56 : 48;
  } else if (iconType === 'illustration') {
    visual =
      typeof illustration === 'string' && (illustrationStyles as string[]).includes(illustration) ? (
        <EmptyStateIllustration type={illustration as IllustrationStyle} color={illustrationColor} size={size} />
      ) : (
        (illustration as ReactNode)
      );
    visualH = size === 'sm' ? 118 : size === 'md' ? 128 : 160;
  } else {
    visual = (
      <div className="flex size-[104px] items-center justify-center rounded-full bg-gradient-to-b from-gray-100 to-gray-50">
        {fileIcon ?? renderIcon(icon, 'size-10 text-gray-400')}
      </div>
    );
    visualH = 104;
  }

  const sm = size === 'sm';
  return (
    <div
      ref={ref}
      className={cx('relative isolate flex w-full flex-col items-center text-center', sm ? 'gap-6' : 'gap-8', className)}
      {...props}
    >
      {pattern && (
        <BackgroundPattern
          type={iconType === 'illustration' ? 'grid' : 'circles'}
          size="md"
          className="absolute left-1/2 -z-10 -translate-x-1/2"
          style={{ top: visualH / 2 - 240 }}
        />
      )}
      <div className={cx('flex w-full flex-col items-center', sm ? 'gap-4' : iconType === 'illustration' && size === 'lg' ? 'gap-6' : 'gap-5')}>
        {visual}
        <div className={cx('flex w-full max-w-[352px] flex-col', sm ? 'gap-1' : 'gap-2')}>
          <h3
            className={cx(
              'text-gray-900',
              iconType === 'file-type-icon' ? 'font-semibold' : 'font-medium',
              size === 'sm' ? 'text-md' : size === 'md' ? 'text-lg' : 'text-xl',
            )}
          >
            {title}
          </h3>
          {description != null && <div className={cx('text-gray-600', size === 'lg' ? 'text-md' : 'text-sm')}>{description}</div>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap justify-center gap-3">{actions}</div>}
    </div>
  );
});
