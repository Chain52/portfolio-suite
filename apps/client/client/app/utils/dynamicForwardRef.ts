import {
  type Ref,
  type ReactNode,
  type RefAttributes,
  type PropsWithoutRef,
  forwardRef,
  type ForwardRefExoticComponent
} from "react";

export const dynamicForwardRef = <T, P = {}>(
  render: (props: PropsWithoutRef<P>, ref: Ref<T>) => ReactNode
): ForwardRefExoticComponent<PropsWithoutRef<P> & RefAttributes<T>> =>
  forwardRef<T, P>(render);
