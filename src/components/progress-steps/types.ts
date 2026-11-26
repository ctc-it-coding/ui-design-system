import { type HTMLAttributes, type ReactNode } from 'react';
import { type IconSlot } from '../../utils/renderIcon';
import { type StepSize, type StepStatus } from './StepIcon';

export type ProgressOrientation = 'horizontal' | 'vertical';

export interface ProgressStepItem {
  title?: ReactNode;
  description?: ReactNode;
  /** Icon for featured-icon layouts. */
  icon?: IconSlot;
  /** Explicit status; by default derived from `current`. */
  status?: StepStatus;
}

/** Status of step `i` given the index of the current step. */
export function stepStatus(i: number, current: number): StepStatus {
  return i < current ? 'complete' : i === current ? 'current' : 'incomplete';
}

export interface ProgressBaseProps extends HTMLAttributes<HTMLDivElement> {
  /** Figma: Size */
  size?: StepSize;
  /** Index of the current step (0-based). Earlier steps are complete, later ones incomplete. */
  current?: number;
}

