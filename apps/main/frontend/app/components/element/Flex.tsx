import clsx from 'clsx';
import React from 'react';

import { resolveResponsiveProp, type ResponsiveProp } from '~/utils';

export interface FlexProps extends React.PropsWithChildren {
  as?: React.ElementType;
  id?: string;
  direction?: ResponsiveProp<'row' | 'row-reverse' | 'col' | 'col-reverse'>;
  flex?: ResponsiveProp<number | 'auto' | 'initial' | 'none'>;
  grow?: ResponsiveProp<boolean | number>;
  shrink?: ResponsiveProp<boolean | number>;
  wrap?: ResponsiveProp<boolean | 'wrap' | 'nowrap' | 'wrap-reverse'>;
  justify?: ResponsiveProp<
    'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'stretch'
  >;
  align?: ResponsiveProp<'start' | 'center' | 'end' | 'baseline' | 'stretch'>;
  style?: React.CSSProperties;
  className?: string;
}

const flexValidation = <T extends FlexProps['flex']>(value: T) =>
  typeof value === 'number' ? 0 < value && value < 6 : true;
const growValidation = <T extends FlexProps['grow']>(value: T) =>
  typeof value === 'number' ? -1 < value && value < 6 : true;
const shrinkValidation = <T extends FlexProps['shrink']>(value: T) =>
  typeof value === 'number' ? -1 < value && value < 6 : true;

export const Flex = React.forwardRef<HTMLElement, FlexProps>(
  (
    {
      as: Component = 'div',
      id,
      direction,
      flex,
      grow,
      shrink,
      wrap,
      justify,
      align,
      style,
      className,
      children
    }: FlexProps,
    ref
  ) => (
    <Component
      ref={ref}
      id={id}
      style={style}
      className={clsx(
        'flex',
        resolveResponsiveProp(direction, 'flex'),
        resolveResponsiveProp(flex, 'flex', flexValidation),
        resolveResponsiveProp(grow, 'grow', growValidation, (value) =>
          value ? 'grow' : 'grow-0'
        ),
        resolveResponsiveProp(shrink, 'shrink', shrinkValidation, (value) =>
          value ? 'shrink' : 'shrink-0'
        ),
        resolveResponsiveProp(wrap, 'flex', undefined, (value) =>
          value ? 'flex-wrap' : 'flex-nowrap'
        ),
        resolveResponsiveProp(justify, 'justify'),
        resolveResponsiveProp(align, 'items'),
        className
      )}
    >
      {children}
    </Component>
  )
);
