import React from 'react';
import { Cell } from '../Cell';
import { Flex } from '@portfolio/ui';

interface RowProps {}

export default function Row({}: RowProps) {
  const cells = ['cell1', 'cell2', 'cell3']; // TODO: determine where cells will come from
  return (
    <Flex as="td">
      {cells.map((cell) => (
        <Cell id={1} />
      ))}
    </Flex>
  );
}
