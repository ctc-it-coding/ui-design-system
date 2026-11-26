import { clsx, type ClassValue } from 'clsx';
import { twMerge, extendTailwindMerge } from 'tailwind-merge';

const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['md', 'display-xs', 'display-sm', 'display-md', 'display-lg', 'display-xl', 'display-2xl'] }],
    },
  },
});

/** clsx + tailwind-merge aware of the Tinicorn type scale. */
export function cx(...inputs: ClassValue[]) {
  return merge(clsx(inputs));
}
void twMerge;
