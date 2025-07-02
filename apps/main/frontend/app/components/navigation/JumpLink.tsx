import React from 'react';

import { Link } from 'react-router';
import clsx from 'clsx';

import { Flex } from '../element';
import type { TailwindBreakpoint } from '~/constants';

interface JumpLinkProps extends React.PropsWithChildren {
  anchor: string;
  name: string;
  textBreakpoint?: TailwindBreakpoint;
  variant?: 'navbar' | 'cta';
  className?: string;
}

export default function JumpLink({
  anchor,
  name,
  textBreakpoint,
  variant = 'navbar',
  className = 'font-medium',
  children
}: JumpLinkProps) {
  return (
    <Link
      to={`#${anchor}`}
      className={clsx(
        variant === 'cta' &&
          'rounded-full bg-blue-600 px-4 py-3 text-white hover:bg-blue-700',
        className
      )}
    >
      <Flex direction="col" grow shrink align="center" className="px-2">
        <Flex align="center" className="gap-2">
          {children}
          <span
            className={clsx(
              'text-nowrap',
              textBreakpoint && `${textBreakpoint}:block hidden`
            )}
          >
            {name}
          </span>
        </Flex>
      </Flex>
    </Link>
  );
}
