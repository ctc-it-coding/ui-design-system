import { cloneElement, isValidElement, type ComponentType, type ReactElement, type ReactNode } from 'react';
import { cx } from './cx';

/** An icon can be passed as a component (`ArrowRight`) or as an element (`<ArrowRight />`). */
export type IconSlot = ComponentType<{ className?: string }> | ReactNode;

export function renderIcon(icon: IconSlot | undefined, className?: string): ReactNode {
  if (icon == null || icon === false) return null;
  if (isValidElement(icon)) {
    const el = icon as ReactElement<{ className?: string }>;
    return cloneElement(el, { className: cx(className, el.props.className) });
  }
  if (typeof icon === 'function' || (typeof icon === 'object' && icon !== null && '$$typeof' in (icon as object))) {
    const Icon = icon as ComponentType<{ className?: string }>;
    return <Icon className={className} />;
  }
  return icon as ReactNode;
}
