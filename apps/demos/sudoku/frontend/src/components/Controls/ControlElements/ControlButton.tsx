import React from 'react';
import { Icon } from '@iconify/react';

import { Flex } from '@portfolio/ui';

interface ControlButtonProps extends React.PropsWithChildren {
  icon?: string;
}

export default function ControlButton({ icon, children }: ControlButtonProps) {
  return (
    <Flex
      grow
      justify="center"
      align="center"
      className="max-w-16 aspect-square border-2 border-primary bg-primary-light rounded-lg text-5xl font-semibold font-mono text-primary"
    >
      {icon && <Icon icon={icon} />}
      {children}
    </Flex>
  );
}
