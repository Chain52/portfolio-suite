import invariant from 'tiny-invariant';
import type { TailwindBreakpoint } from '~/constants';

export type ResponsiveProp<T> = T | { [key in TailwindBreakpoint]?: T };

export const resolveResponsiveProp = <T>(
  prop: ResponsiveProp<T> | undefined,
  prefix: string,
  isValid: (value: T) => boolean = () => true,
  booleanHandler?: (value: T) => string
) => {
  if (!prop) return [];
  const result = (value: T) => {
    if (typeof value === 'boolean') {
      if (booleanHandler) return booleanHandler(value);
      return `${prefix}-${value ? 1 : 0}`;
    }
    return `${prefix}-${value}`;
  };

  if (typeof prop !== 'object') {
    invariant(
      isValid(prop),
      `Invalid responsive prop (${prop}) passed to component`
    );
    return result(prop);
  }

  return Object.entries(prop).flatMap(([breakpoint, value]) => {
    if (!value) return [];
    invariant(
      isValid(value),
      `Invalid ${breakpoint} responsive prop (${value}) passed to component`
    );
    if (breakpoint === 'base') return result(value);
    return `${breakpoint}:${result(value)}`;
  });
};
